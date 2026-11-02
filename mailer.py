"""Entrega transaccional por SMTP. No persiste correos ni resultados."""
import html
import os
import re
import smtplib
import ssl
import threading
import time
from email.message import EmailMessage

class MailUnavailable(Exception):
    pass

class MailBusy(Exception):
    pass

class ResultMailer:
    def __init__(self, smtp_factory=None):
        self.host = os.environ.get('VOTO_SMTP_HOST', '')
        self.port = int(os.environ.get('VOTO_SMTP_PORT', '587'))
        self.username = os.environ.get('VOTO_SMTP_USER', '')
        self.password = os.environ.get('VOTO_SMTP_PASSWORD', '')
        self.sender = os.environ.get('VOTO_SMTP_FROM', '')
        self.factory = smtp_factory
        self.lock = threading.Lock()
        self.last_sent = None

    @property
    def available(self):
        return bool(self.host and self.username and self.password and valid_email(self.sender) and self.port in (465, 587))

    def send(self, payload):
        email, test, total, rows = validate_report(payload)
        if not self.available:
            raise MailUnavailable('El envío automático todavía no está configurado en Voto Claro.')
        with self.lock:
            now = time.monotonic()
            if self.last_sent is not None and now - self.last_sent < 10:
                raise MailBusy('Hay otro envío en curso. Espera unos segundos y vuelve a intentarlo.')
            message = create_message(self.sender, email, test, total, rows)
            context = ssl.create_default_context()
            factory = self.factory or (smtplib.SMTP_SSL if self.port == 465 else smtplib.SMTP)
            kwargs = {'timeout': 20}
            if self.port == 465:
                kwargs['context'] = context
            with factory(self.host, self.port, **kwargs) as connection:
                if self.port == 587:
                    connection.ehlo()
                    connection.starttls(context=context)
                    connection.ehlo()
                connection.login(self.username, self.password)
                refused = connection.send_message(message)
                if refused:
                    raise MailUnavailable('El proveedor ha rechazado la dirección de destino.')
            self.last_sent = time.monotonic()


def valid_email(value):
    return isinstance(value, str) and len(value) <= 254 and re.fullmatch(r'[A-Za-z0-9.!#$%&\x27*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}', value) is not None


def validate_report(payload):
    if not isinstance(payload, dict) or payload.get('consent') is not True:
        raise ValueError('Debes autorizar el envío de los resultados a tu correo.')
    email = payload.get('email')
    if not valid_email(email):
        raise ValueError('Escribe una dirección de correo válida.')
    test, total, rows = payload.get('test'), payload.get('total'), payload.get('rows')
    if test not in ('Básico', 'Avanzado') or type(total) is not int or total != 30 or not isinstance(rows, list) or not 1 <= len(rows) <= 100:
        raise ValueError('El resumen del test no es válido.')
    cleaned = []
    for row in rows:
        if not isinstance(row, dict):
            raise ValueError('Tabla no válida.')
        name = row.get('name')
        if not isinstance(name, str) or not name.strip() or len(name) > 150 or any(ord(c) < 32 for c in name):
            raise ValueError('Nombre de partido no válido.')
        matches, comparable, unknown = row.get('matches'), row.get('comparable'), row.get('unknown')
        if any(type(v) is not int for v in (matches, comparable, unknown)) or not 0 <= matches <= comparable <= total or not 0 <= unknown <= total or comparable + unknown > total:
            raise ValueError('Los recuentos de la tabla no son válidos.')
        cleaned.append((name, matches, comparable, unknown))
    return email, test, total, cleaned


def create_message(sender, recipient, test, total, rows):
    message = EmailMessage()
    message['From'] = sender
    message['To'] = recipient
    message['Subject'] = 'Tu tabla de resultados de Voto Claro'
    plain = [f'Voto Claro · Test {test} · {total} preguntas', '', 'Coincidencias documentadas sobre el test completo. Los datos ausentes no son desacuerdos.', '']
    table = []
    for name, matches, comparable, unknown in rows:
        percentage = f'{matches / total * 100:.1f}'.replace('.', ',') + ' %' if comparable else 'Pendiente / sin comparación'
        plain.append(f'{name}: {percentage} | Coincidencias {matches}/{total} | Comparables {comparable}/{total} | Sin datos {unknown}')
        cells = [html.escape(name), percentage, f'{matches}/{total}', f'{comparable}/{total}', str(unknown)]
        table.append('<tr>' + ''.join('<td style="padding:10px;border:1px solid #dad7ef">' + cell + '</td>' for cell in cells) + '</tr>')
    note = 'Referencia provisional con documentos históricos y cobertura desigual. No es una recomendación de voto. No se adjuntan tus respuestas individuales. Has solicitado este único correo al terminar el test; no es una suscripción. Si no lo has solicitado, puedes ignorarlo.'
    message.set_content('\n'.join(plain) + '\n\n' + note)
    message.add_alternative('<html lang="es"><body style="font-family:Arial,sans-serif;color:#29284f"><h1>Tu resumen de Voto Claro</h1><p>Test ' + test + ' · ' + str(total) + ' preguntas. Coincidencias sobre el total del test.</p><table style="border-collapse:collapse"><thead><tr>' + ''.join('<th style="padding:10px;background:#eeebfa">' + label + '</th>' for label in ['Partido', 'Porcentaje', 'Coincidencias', 'Comparables', 'Sin datos']) + '</tr></thead><tbody>' + ''.join(table) + '</tbody></table><p>' + note + '</p></body></html>', subtype='html')
    return message
