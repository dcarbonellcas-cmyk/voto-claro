"""Servidor de Voto Claro con recuentos agregados persistentes, sin perfiles."""
import argparse
import json
import os
import sqlite3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
CHOICES = ('not_voting', 'undecided', 'dont_know')

class Statistics:
    def __init__(self, path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with sqlite3.connect(self.path) as db:
            db.execute('CREATE TABLE IF NOT EXISTS counts (choice TEXT PRIMARY KEY, amount INTEGER NOT NULL DEFAULT 0 CHECK(amount >= 0))')
            db.executemany('INSERT OR IGNORE INTO counts(choice) VALUES (?)', [(c,) for c in CHOICES])

    def snapshot(self):
        with sqlite3.connect(self.path) as db:
            values = dict(db.execute('SELECT choice, amount FROM counts'))
        return {'counts': values, 'total': sum(values.values()), 'unit': 'responses'}

    def add(self, choice):
        if choice not in CHOICES:
            raise ValueError('Opción no válida')
        with sqlite3.connect(self.path) as db:
            db.execute('UPDATE counts SET amount = amount + 1 WHERE choice = ?', (choice,))
        return self.snapshot()

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *_):
        # No escribir direcciones IP, rutas de visitas ni respuestas en registros.
        pass

    def send_json(self, data, status=200):
        payload = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == '/api/participation':
            return self.send_json(self.server.statistics.snapshot())
        # Servir solo recursos de la app, nunca la base de datos o el servidor.
        filename = path.lstrip('/') or 'index.html'
        if '/' in filename or filename.startswith('.') or Path(filename).suffix not in ('.html', '.js', '.css', '.svg'):
            return self.send_error(404)
        super().do_GET()

    def do_HEAD(self):
        path = urlparse(self.path).path
        filename = path.lstrip('/') or 'index.html'
        if '/' in filename or filename.startswith('.') or Path(filename).suffix not in ('.html', '.js', '.css', '.svg'):
            return self.send_error(404)
        super().do_HEAD()

    def do_POST(self):
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

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8089)
    parser.add_argument('--host', default='127.0.0.1')
    args = parser.parse_args()
    db = os.environ.get('VOTO_CLARO_DB', str(ROOT / '.data' / 'participation.sqlite3'))
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    server.statistics = Statistics(db)
    print(f'Voto Claro: http://{args.host}:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

if __name__ == '__main__':
    main()
