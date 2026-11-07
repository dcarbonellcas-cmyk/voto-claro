"""Pruebas de la API real con bases temporales, sin tocar cuentas de usuarios."""
import http.client
import json
import sqlite3
import tempfile
import threading
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from accounts import Accounts
from server import Handler, Statistics

class AccountTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.path = Path(self.tmp.name) / 'accounts.sqlite3'
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        self.server.accounts = Accounts(self.path)
        self.server.statistics = Statistics(Path(self.tmp.name) / 'stats.sqlite3')
        self.server.secure_cookies = False
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.host = '127.0.0.1:' + str(self.server.server_port)

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.tmp.cleanup()

    def call(self, route, data=None, cookie='', origin=None):
        client = http.client.HTTPConnection(self.host)
        headers = {'Cookie':cookie, 'Content-Type':'application/json', 'Origin':origin or 'http://' + self.host, 'X-Voto-Request':'1'}
        client.request('GET' if data is None else 'POST', '/api/' + route, body=None if data is None else json.dumps(data), headers=headers)
        response = client.getresponse()
        status, cookie_header = response.status, response.getheader('Set-Cookie', '')
        body = response.read()
        client.close()
        return status, json.loads(body), cookie_header.split(';')[0]

    def register(self, name):
        status, body, cookie = self.call('register', {'username':name,'password':'una-clave-larga-123'})
        self.assertEqual(status,201)
        self.assertEqual(body['user']['username'],name)
        return cookie

    def payload(self):
        return {'requestId':'12345678-1234-1234-1234-123456789012', 'snapshot':{'version':'test-35','province':'Todas','scope':'all','questions':[{'question':'Pregunta','topic':'Tema','answer':i%3} for i in range(35)],'results':[{'id':'opcion','name':'Una opción','matches':7,'comparable':12,'documented':20}]}}

    def test_private_persistent_history_and_logout(self):
        alice = self.register('alice')
        bob = self.register('bob')
        self.assertEqual(self.call('results')[0],401)
        status, saved, _ = self.call('results',self.payload(),alice)
        self.assertEqual(status,201)
        self.assertEqual(self.call('results',self.payload(),alice)[1]['id'],saved['id'])
        self.assertEqual(len(self.call('results',cookie=alice)[1]['results']),1)
        self.assertEqual(self.call('results',cookie=bob)[1]['results'],[])
        route = 'results/' + saved['id']
        self.assertEqual(self.call(route,cookie=bob)[0],404)
        self.assertEqual(self.call(route+'/delete',{},bob)[0],404)
        self.assertEqual(self.call(route,cookie=alice)[1]['snapshot'],self.payload()['snapshot'])
        self.server.accounts = Accounts(self.path) # Simula reabrir la base tras reiniciar.
        self.assertEqual(len(self.call('results',cookie=alice)[1]['results']),1)
        self.assertEqual(self.call('logout',{},alice)[0],200)
        self.assertIsNone(self.call('session',cookie=alice)[1]['user'])
        status, _, new_cookie = self.call('login',{'username':'ALICE','password':'una-clave-larga-123'})
        self.assertEqual(status,200)
        self.assertEqual(len(self.call('results',cookie=new_cookie)[1]['results']),1)
        self.assertEqual(self.call(route+'/delete',{},new_cookie)[0],200)
        self.assertEqual(self.call(route,cookie=new_cookie)[0],404)

        new_payload = self.payload()
        new_payload['requestId'] += '-40'
        snapshot = new_payload['snapshot']
        snapshot['version'] = 'test-40'
        snapshot['questions'] += snapshot['questions'][:5]
        snapshot['results'][0].update(matches=40, comparable=40, documented=40)
        status, saved, _ = self.call('results',new_payload,new_cookie)
        self.assertEqual(status,201)
        self.assertEqual(self.call('results/'+saved['id'],cookie=new_cookie)[1]['snapshot'],snapshot)

    def test_admin_aggregates_and_permissions(self):
        self.server.accounts.create_admin('admin', 'test-admin-123')
        status, body, admin = self.call('login', {'username':'admin', 'password':'test-admin-123'})
        self.assertEqual(status, 200)
        self.assertTrue(body['user']['is_admin'])
        self.assertTrue(self.call('session', cookie=admin)[1]['user']['is_admin'])
        normal = self.register('normal')
        self.assertEqual(self.call('admin/statistics')[0],401)
        self.assertEqual(self.call('admin/statistics', cookie=normal)[0],403)
        data = {'receipt':'12345678-1234-1234-1234-123456789012', 'leaders':[{'id':'one','name':'Una opción'},{'id':'two','name':'Otra opción'}]}
        self.assertEqual(self.call('test-completions', data)[0],201)
        self.call('test-completions', data) # Mismo test, no duplicar.
        stats = self.call('admin/statistics', cookie=admin)[1]
        self.assertEqual(stats['tests']['completed'],1)
        self.assertEqual(stats['tests']['tied'],1)
        self.assertEqual(stats['tests']['leaders'],[])
        for i in range(4):
            self.call('test-completions', {**data, 'receipt':'another-test-receipt-'+str(i)})
        stats = self.call('admin/statistics', cookie=admin)[1]
        self.assertEqual(stats['tests']['completed'],5)
        self.assertEqual(sorted(r['count'] for r in stats['tests']['leaders']),[5,5])
        self.assertNotIn('username',json.dumps(stats))
        self.call('participation', {'choice':'not_voting'})
        self.assertEqual(self.call('admin/statistics', cookie=admin)[1]['participation']['counts']['not_voting'],1)
        self.call('test-completions', {'receipt':'no-comparable-receipt-123', 'leaders':[]})
        self.assertEqual(self.call('admin/statistics', cookie=admin)[1]['tests']['unscored'],1)
        self.server.statistics=Statistics(Path(self.tmp.name) / 'stats.sqlite3')
        self.assertEqual(self.call('admin/statistics', cookie=admin)[1]['tests']['completed'],6)

    def test_credentials_validation_csrf_expiry_and_private_files(self):
        cookie = self.register('alice')
        credentials = {'username':'alice','password':'una-clave-larga-123'}
        self.assertEqual(self.call('register',credentials)[0],409)
        self.assertEqual(self.call('login',{**credentials,'password':'una-clave-incorrecta'})[0],401)
        self.assertEqual(self.call('register',{'username':'abc','password':'corta'})[0],400)
        self.assertEqual(self.call('results',self.payload(),cookie,origin='https://otro.example')[0],403)
        payload=self.payload();payload['snapshot']['questions']=[]
        self.assertEqual(self.call('results',payload,cookie)[0],400)
        with sqlite3.connect(self.path) as db:
            salt, password_hash = db.execute('SELECT salt,password_hash FROM users').fetchone()
            self.assertNotIn(credentials['password'],salt+password_hash)
            db.execute('UPDATE sessions SET expires=0')
        db.close()
        self.assertEqual(self.call('results',cookie=cookie)[0],401)
        connection=http.client.HTTPConnection(self.host)
        for path in ('/.data/accounts.sqlite3','/accounts.py','/%2e%2e/server.py'):
            connection.request('GET',path);response=connection.getresponse();self.assertEqual(response.status,404);response.read()
        connection.close()

if __name__ == '__main__':
    unittest.main()
