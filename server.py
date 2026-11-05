"""Servidor de Voto Claro con recuentos agregados persistentes, con cuentas opcionales."""
from contextlib import closing
import argparse
import json
import os
import sqlite3
from http.cookies import SimpleCookie
from accounts import Accounts, AccountError, SESSION_SECONDS
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, unquote

ROOT = Path(__file__).resolve().parent
CHOICES = ('not_voting', 'undecided', 'dont_know')

def is_public_file(path):
    filename = unquote(path).lstrip('/') or 'index.html'
    logo_prefix = 'assets/party-logos/'
    if filename.startswith(logo_prefix):
        name = filename[len(logo_prefix):]
        return bool(name) and '/' not in name and '\\' not in name and not name.startswith('.') and Path(name).suffix.lower() in ('.svg', '.png', '.jpg')
    return '/' not in filename and '\\' not in filename and not filename.startswith('.') and Path(filename).suffix in ('.html', '.js', '.css', '.svg')

class Statistics:
    def __init__(self, path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with closing(sqlite3.connect(self.path)) as db, db:
            db.execute('CREATE TABLE IF NOT EXISTS counts (choice TEXT PRIMARY KEY, amount INTEGER NOT NULL DEFAULT 0 CHECK(amount >= 0))')
            db.executemany('INSERT OR IGNORE INTO counts(choice) VALUES (?)', [(c,) for c in CHOICES])
            db.executescript('CREATE TABLE IF NOT EXISTS test_totals (key TEXT PRIMARY KEY, amount INTEGER NOT NULL DEFAULT 0); CREATE TABLE IF NOT EXISTS test_leaders (party TEXT PRIMARY KEY, name TEXT NOT NULL, amount INTEGER NOT NULL DEFAULT 0); CREATE TABLE IF NOT EXISTS test_receipts (token TEXT PRIMARY KEY);')
            db.executemany('INSERT OR IGNORE INTO test_totals(key) VALUES (?)', [(k,) for k in ('completed','unscored','tied')])

    def snapshot(self):
        with closing(sqlite3.connect(self.path)) as db, db:
            values = dict(db.execute('SELECT choice, amount FROM counts'))
        return {'counts': values, 'total': sum(values.values()), 'unit': 'responses'}

    def add(self, choice):
        if choice not in CHOICES:
            raise ValueError('Opción no válida')
        with closing(sqlite3.connect(self.path)) as db, db:
            db.execute('UPDATE counts SET amount = amount + 1 WHERE choice = ?', (choice,))
        return self.snapshot()


    def record_test(self, data):
        import re
        import hashlib
        token, leaders = data.get('receipt'), data.get('leaders')
        if not isinstance(token, str) or not re.fullmatch(r'[a-zA-Z0-9-]{16,80}', token) or not isinstance(leaders, list) or len(leaders) > 100:
            raise AccountError('Recuento no válido.')
        for leader in leaders:
            if not isinstance(leader, dict) or set(leader) != {'id','name'} or not all(isinstance(leader[k], str) and 0 < len(leader[k]) <= 250 for k in ('id','name')):
                raise AccountError('Opción no válida.')
        if len({p['id'] for p in leaders}) != len(leaders):
            raise AccountError('Opciones duplicadas.')
        # Solo agregados. El recibo no contiene usuario, fecha, respuestas ni partido.
        with closing(sqlite3.connect(self.path)) as db, db:
            added = db.execute('INSERT OR IGNORE INTO test_receipts VALUES (?)', (hashlib.sha256(token.encode()).hexdigest(),)).rowcount
            if added:
                db.execute("UPDATE test_totals SET amount=amount+1 WHERE key='completed'")
                if not leaders:
                    db.execute("UPDATE test_totals SET amount=amount+1 WHERE key='unscored'")
                if len(leaders) > 1:
                    db.execute("UPDATE test_totals SET amount=amount+1 WHERE key='tied'")
                for leader in leaders:
                    db.execute('INSERT INTO test_leaders VALUES (?,?,1) ON CONFLICT(party) DO UPDATE SET amount=amount+1', (leader['id'],leader['name']))
        return {'recorded': True}

    def test_snapshot(self):
        with closing(sqlite3.connect(self.path)) as db:
            totals = dict(db.execute('SELECT key,amount FROM test_totals'))
            leaders = [{'party':party,'name':name,'count':amount} for party,name,amount in db.execute('SELECT party,name,amount FROM test_leaders WHERE amount>=5 ORDER BY amount DESC,name')]
        return {**totals, 'leaders': leaders if totals['completed'] >= 5 else [], 'minimum_group': 5}

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *_):
        # No escribir direcciones IP, rutas de visitas ni respuestas en registros.
        pass

    def send_json(self, data, status=200, cookie=None):
        payload = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        if cookie:
            self.send_header('Set-Cookie', cookie)
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        path = urlparse(self.path).path
        if path.startswith('/api/') and path != '/api/participation':
            return self.account_get(path)
        if path == '/api/participation':
            return self.send_json(self.server.statistics.snapshot())
        # Servir solo recursos de la app, nunca la base de datos o el servidor.
        if not is_public_file(path):
            return self.send_error(404)
        super().do_GET()

    def do_HEAD(self):
        path = urlparse(self.path).path
        if not is_public_file(path):
            return self.send_error(404)
        super().do_HEAD()

    def do_POST(self):
        if urlparse(self.path).path.startswith('/api/') and urlparse(self.path).path != '/api/participation':
            return self.account_post(urlparse(self.path).path)
        if urlparse(self.path).path != '/api/participation':
            return self.send_json({'error': 'Ruta no disponible'}, 404)
        origin = self.headers.get('Origin')
        if origin and urlparse(origin).netloc != self.headers.get('Host'):
            return self.send_json({'error': 'Origen no permitido'}, 403)
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if not 0 < size <= 256 or self.headers.get('Content-Type', '').split(';')[0] != 'application/json':
                return self.send_json({'error': 'Solicitud no válida'}, 400)
            data = json.loads(self.rfile.read(size))
            if not isinstance(data, dict) or set(data) != {'choice'} or data['choice'] not in CHOICES:
                return self.send_json({'error': 'Opción no válida'}, 400)
            return self.send_json(self.server.statistics.add(data['choice']), 201)
        except (ValueError, TypeError, UnicodeDecodeError):
            return self.send_json({'error': 'Solicitud no válida'}, 400)


    def session_token(self):
        cookie = SimpleCookie()
        try:
            cookie.load(self.headers.get('Cookie', ''))
            return cookie['voto_session'].value if 'voto_session' in cookie else ''
        except Exception:
            return ''

    def session_cookie(self, token, clear=False):
        secure = '; Secure' if self.server.secure_cookies else ''
        return f'voto_session={token}; Path=/; HttpOnly; SameSite=Strict; Max-Age={0 if clear else SESSION_SECONDS}{secure}'

    def account_get(self, path):
        user = self.server.accounts.user(self.session_token())
        if path == '/api/session':
            return self.send_json({'user': {'username': user['username'], 'is_admin': bool(user['is_admin'])} if user else None})
        if not user:
            return self.send_json({'error': 'Inicia sesión para consultar tus resultados.'}, 401)
        try:
            if path == '/api/admin/statistics':
                if not user['is_admin']:
                    raise AccountError('Acceso reservado a administración.', 403)
                return self.send_json({'tests': self.server.statistics.test_snapshot(), 'participation': self.server.statistics.snapshot()})
            if path == '/api/results':
                return self.send_json({'results': self.server.accounts.list_results(user['id'])})
            if path.startswith('/api/results/'):
                return self.send_json(self.server.accounts.result(user['id'], path.removeprefix('/api/results/')))
            return self.send_json({'error': 'Ruta no disponible'}, 404)
        except AccountError as error:
            return self.send_json({'error': str(error)}, error.status)

    def account_post(self, path):
        origin = urlparse(self.headers.get('Origin', ''))
        if origin.scheme not in ('http', 'https') or origin.netloc != self.headers.get('Host') or self.headers.get('X-Voto-Request') != '1':
            return self.send_json({'error': 'Origen no permitido'}, 403)
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if not 0 < size <= 262144 or self.headers.get('Content-Type', '').split(';')[0] != 'application/json':
                raise AccountError('Solicitud no válida.')
            data = json.loads(self.rfile.read(size))
            if not isinstance(data, dict):
                raise AccountError('Solicitud no válida.')
            if path == '/api/test-completions':
                return self.send_json(self.server.statistics.record_test(data), 201)
            token = self.session_token()
            if path in ('/api/register', '/api/login'):
                new_token, user = self.server.accounts.authenticate(data, path == '/api/register', self.client_address[0])
                self.server.accounts.logout(token)
                return self.send_json({'user': user}, 201 if path == '/api/register' else 200, self.session_cookie(new_token))
            if path == '/api/logout':
                self.server.accounts.logout(token)
                return self.send_json({'user': None}, cookie=self.session_cookie('', True))
            user = self.server.accounts.user(token)
            if not user:
                raise AccountError('Tu sesión ha caducado. Vuelve a iniciar sesión.', 401)
            if path == '/api/results':
                return self.send_json(self.server.accounts.save(user['id'], data), 201)
            if path.startswith('/api/results/') and path.endswith('/delete'):
                return self.send_json(self.server.accounts.result(user['id'], path[len('/api/results/'):-len('/delete')], delete=True))
            return self.send_json({'error': 'Ruta no disponible'}, 404)
        except AccountError as error:
            return self.send_json({'error': str(error)}, error.status)
        except (ValueError, TypeError, UnicodeDecodeError):
            return self.send_json({'error': 'Solicitud no válida'}, 400)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8089)
    parser.add_argument('--host', default='127.0.0.1')
    args = parser.parse_args()
    db = os.environ.get('VOTO_CLARO_DB', str(ROOT / '.data' / 'participation.sqlite3'))
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    server.statistics = Statistics(db)
    server.accounts = Accounts(os.environ.get('VOTO_CLARO_ACCOUNTS_DB', str(ROOT / '.data' / 'accounts.sqlite3')))
    server.secure_cookies = os.environ.get('VOTO_CLARO_SECURE_COOKIES') == '1'
    print(f'Voto Claro: http://{args.host}:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

if __name__ == '__main__':
    main()
