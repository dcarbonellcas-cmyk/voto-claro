"""Cuentas locales y resultados privados; contraseñas derivadas, sesiones revocables."""
from contextlib import contextmanager
import hashlib
import hmac
import json
import re
import secrets
import sqlite3
import threading
import time
from pathlib import Path

SESSION_SECONDS = 7 * 24 * 3600

class AccountError(Exception):
    def __init__(self, message, status=400):
        super().__init__(message)
        self.status = status

class Accounts:
    def __init__(self, path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.lock = threading.Lock()
        self.attempts = {}
        with self.connect() as db:
            db.executescript('''
                PRAGMA foreign_keys=ON;
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE,
                    salt TEXT NOT NULL, password_hash TEXT NOT NULL);
                CREATE TABLE IF NOT EXISTS sessions (
                    token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id),
                    expires INTEGER NOT NULL);
                CREATE TABLE IF NOT EXISTS results (
                    id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id),
                    saved_at INTEGER NOT NULL, request_id TEXT NOT NULL, snapshot TEXT NOT NULL,
                    UNIQUE(user_id, request_id));
                CREATE INDEX IF NOT EXISTS results_user ON results(user_id, saved_at);
            ''')

            if 'is_admin' not in {r['name'] for r in db.execute('PRAGMA table_info(users)')}:
                db.execute('ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0')

    def create_admin(self, username, password):
        salt = secrets.token_hex(16)
        derived = self.derive(password, salt)
        with self.connect() as db:
            existing = db.execute('SELECT is_admin FROM users WHERE username=?', (username,)).fetchone()
            if existing:
                raise AccountError('La cuenta ya existe; no se modifica ni se eleva automáticamente.', 409)
            db.execute('INSERT INTO users(username,salt,password_hash,is_admin) VALUES (?,?,?,1)', (username, salt, derived))

    @contextmanager
    def connect(self):
        db = sqlite3.connect(self.path, timeout=15)
        db.row_factory = sqlite3.Row
        try:
            with db:
                yield db
        finally:
            db.close()

    @staticmethod
    def digest(token):
        return hashlib.sha256(token.encode()).hexdigest()

    @staticmethod
    def derive(password, salt):
        return hashlib.scrypt(password.encode(), salt=bytes.fromhex(salt), n=2**14, r=8, p=5, maxmem=64*1024*1024).hex()

    def authenticate(self, data, register, client):
        username = data.get('username', '')
        password = data.get('password', '')
        if not isinstance(username, str) or not re.fullmatch(r'[a-zA-Z0-9_.-]{3,32}', username):
            raise AccountError('El usuario debe tener entre 3 y 32 letras, números, puntos, guiones o guiones bajos.')
        username = username.lower()
        if not isinstance(password, str) or not (12 if register else 1) <= len(password) <= 128:
            raise AccountError('La contraseña debe tener entre 12 y 128 caracteres.')
        # Límite en memoria, sin registrar direcciones ni credenciales.
        now = time.time()
        with self.lock:
            self.attempts = {k:v for k,v in self.attempts.items() if v[0] > now - 900}
            key = self.digest(client)
            start, count = self.attempts.get(key, (now, 0))
            if count >= 15:
                raise AccountError('Demasiados intentos. Vuelve a intentarlo en 15 minutos.', 429)
            self.attempts[key] = (start, count + 1)
        with self.connect() as db:
            row = db.execute('SELECT * FROM users WHERE username=?', (username,)).fetchone()
            if register:
                salt = secrets.token_hex(16)
                derived = self.derive(password, salt)
                try:
                    cursor = db.execute('INSERT INTO users(username,salt,password_hash) VALUES (?,?,?)', (username, salt, derived))
                except sqlite3.IntegrityError:
                    raise AccountError('Ese nombre de usuario no está disponible.', 409)
                user_id = cursor.lastrowid
            else:
                salt = row['salt'] if row else '00' * 16
                valid = hmac.compare_digest(self.derive(password, salt), row['password_hash'] if row else '00' * 64)
                if not row or not valid:
                    raise AccountError('Usuario o contraseña incorrectos.', 401)
                user_id = row['id']
            token = secrets.token_urlsafe(32)
            db.execute('DELETE FROM sessions WHERE expires <= ?', (int(now),))
            db.execute('INSERT INTO sessions VALUES (?,?,?)', (self.digest(token), user_id, int(now) + SESSION_SECONDS))
        return token, {'username': username, 'is_admin': bool(row['is_admin']) if row and not register else False}

    def user(self, token):
        if not token or len(token) > 128:
            return None
        with self.connect() as db:
            row = db.execute('SELECT users.id,username,is_admin FROM sessions JOIN users ON users.id=sessions.user_id WHERE token_hash=? AND expires>?', (self.digest(token), int(time.time()))).fetchone()
        return dict(row) if row else None

    def logout(self, token):
        with self.connect() as db:
            db.execute('DELETE FROM sessions WHERE token_hash=?', (self.digest(token),))

    @staticmethod
    def validate_snapshot(s):
        def text(v, maximum):
            return isinstance(v, str) and 0 < len(v) <= maximum
        def number(v):
            return type(v) is int and 0 <= v <= 35
        if not isinstance(s, dict) or set(s) != {'version','province','scope','questions','results'}:
            raise AccountError('Resultado no válido.')
        if not text(s['version'], 80) or not text(s['province'], 80) or s['scope'] not in ('all','votes'):
            raise AccountError('Resultado no válido.')
        if not isinstance(s['questions'], list) or len(s['questions']) != 35 or not isinstance(s['results'], list) or not 0 <= len(s['results']) <= 100:
            raise AccountError('Resultado incompleto.')
        for q in s['questions']:
            if not isinstance(q, dict) or set(q) != {'question','topic','answer'} or not text(q['question'], 2000) or not text(q['topic'], 200) or not (q['answer'] is None or type(q['answer']) is int and q['answer'] in (0,1,2)):
                raise AccountError('Respuesta no válida.')
        for r in s['results']:
            if not isinstance(r, dict) or set(r) != {'id','name','matches','comparable','documented'} or not text(r['id'], 100) or not text(r['name'], 250) or not all(number(r[k]) for k in ('matches','comparable','documented')) or not r['matches'] <= r['comparable'] <= r['documented']:
                raise AccountError('Comparación no válida.')
        return s

    def save(self, user_id, data):
        request_id = data.get('requestId')
        if not isinstance(request_id, str) or not re.fullmatch(r'[a-zA-Z0-9-]{16,80}', request_id):
            raise AccountError('Identificador no válido.')
        snapshot = json.dumps(self.validate_snapshot(data.get('snapshot')), ensure_ascii=False)
        with self.connect() as db:
            db.execute('INSERT OR IGNORE INTO results VALUES (?,?,?,?,?)', (secrets.token_hex(16), user_id, int(time.time()), request_id, snapshot))
            row = db.execute('SELECT id,saved_at FROM results WHERE user_id=? AND request_id=?', (user_id, request_id)).fetchone()
        return dict(row)

    def list_results(self, user_id):
        with self.connect() as db:
            rows = db.execute('SELECT id,saved_at,snapshot FROM results WHERE user_id=? ORDER BY saved_at DESC,id DESC', (user_id,)).fetchall()
        return [{'id':r['id'], 'saved_at':r['saved_at'], **{k:json.loads(r['snapshot'])[k] for k in ('province','scope','version')}} for r in rows]

    def result(self, user_id, result_id, delete=False):
        with self.connect() as db:
            row = db.execute('SELECT id,saved_at,snapshot FROM results WHERE id=? AND user_id=?', (result_id, user_id)).fetchone()
            if not row:
                raise AccountError('Resultado no encontrado.', 404)
            if delete:
                db.execute('DELETE FROM results WHERE id=? AND user_id=?', (result_id, user_id))
                return {'deleted': True}
        return {'id':row['id'], 'saved_at':row['saved_at'], 'snapshot':json.loads(row['snapshot'])}
