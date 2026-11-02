import smtplib
import unittest
from unittest.mock import patch
from mailer import ResultMailer, MailUnavailable, MailBusy, create_message, validate_report

class FakeSMTP:
    messages = []
    def __init__(self, *args, **kwargs): self.secure = False
    def __enter__(self): return self
    def __exit__(self, *args): pass
    def ehlo(self): pass
    def starttls(self, **kwargs): self.secure = True
    def login(self, *args): assert self.secure
    def send_message(self, message): self.messages.append(message); return {}

class MailerTests(unittest.TestCase):
    def setUp(self):
        self.payload = {'email':'visitor@example.org','consent':True,'test':'Básico','total':30,'rows':[{'name':'Partido <A>','matches':15,'comparable':20,'unknown':10}]}

    def test_requires_consent_and_valid_email(self):
        for replacement in [{'consent':False},{'email':'visitor@example.org\nBcc: other@example.org'},{'total':20},{'rows':[{'name':'A','matches':31,'comparable':30,'unknown':0}]}]:
            with self.assertRaises(ValueError): validate_report(dict(self.payload, **replacement))

    def test_table_calculated_by_server_and_html_escaped(self):
        recipient, test, total, rows = validate_report(self.payload)
        message = create_message('sender@example.org', recipient, test, total, rows)
        self.assertIn('50,0 %', message.get_body(preferencelist=('plain',)).get_content())
        self.assertIn('Partido &lt;A&gt;', message.get_body(preferencelist=('html',)).get_content())
        self.assertEqual(message['To'], recipient)

    def test_unconfigured_does_not_send(self):
        with patch.dict('os.environ', {}, clear=True):
            mailer = ResultMailer(FakeSMTP)
            self.assertFalse(mailer.available)
            with self.assertRaises(MailUnavailable): mailer.send(self.payload)

    def test_send_securely_and_throttle(self):
        config = {'VOTO_SMTP_HOST':'smtp.example.org','VOTO_SMTP_USER':'test','VOTO_SMTP_PASSWORD':'fixture','VOTO_SMTP_FROM':'sender@example.org'}
        with patch.dict('os.environ', config, clear=True):
            mailer = ResultMailer(FakeSMTP)
            self.assertTrue(mailer.available)
            mailer.send(self.payload)
            self.assertEqual(FakeSMTP.messages[-1]['To'],'visitor@example.org')
            with self.assertRaises(MailBusy): mailer.send(self.payload)

if __name__ == '__main__': unittest.main()
