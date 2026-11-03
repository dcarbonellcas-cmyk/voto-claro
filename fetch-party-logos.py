"""Descarga logotipos identificados en Wikimedia y conserva su atribución."""
import hashlib
import html
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FILES = {
 'PP': ('pp', 'Logo del PP (2022).svg'),
 'PSOE': ('psoe', 'Logotipo del PSOE.svg'),
 'VOX': ('vox', 'VOX logo.svg'),
 'Sumar': ('sumar', 'Sumar logo.svg'),
 'Podemos': ('podemos', 'Podemos logo completo (2022).svg'),
 'ERC': ('erc', 'ERC logo 2025.svg'),
 'Junts': ('junts', 'Logo partit Junts per Catalunya.png'),
 'PNV': ('pnv', 'Logo PNV 2025.svg'),
 'Bildu': ('bildu', 'Logo de EH Bildu (2023).svg'),
 'BNG': ('bng', 'Bloque Nacionalista Galego.svg'),
 'CC': ('cc', 'Coalición Canaria.svg'),
 'UPN': ('upn', 'Logo UPN 2017.svg'),
 'PACMA': ('pacma', 'Nuevo Logo PACMA.jpg'),
 'Compromís': ('compromis', 'Compromís logo completo.svg'),
 'Más Madrid': ('mas-madrid', 'Logo Más Madrid 2023.svg'),
 'PCTE': ('pcte', 'LOGO PCTE RGB-06.svg'),
 'Adelante Andalucía': ('adelante', 'Adelante Andalucía 2021 logo.svg'),
 'Nueva Canarias-BC': ('nc', 'Nueva Canarias Bloque Canarista logo completo.svg'),
 'Ciudadanos': ('ciudadanos', 'Ciudadanos logo 2017.svg'),
}

def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'VotoClaro/1.0 (local educational project)'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=40) as response:
                return response.read(5_000_001)
        except urllib.error.HTTPError as error:
            if error.code != 429 or attempt == 2:
                raise
            time.sleep(8)

def clean(value):
    return html.unescape(re.sub('<[^>]+>', '', value)).strip()

def main():
    params = {'action':'query', 'prop':'imageinfo', 'iiprop':'url|extmetadata', 'iiurlwidth':330,
              'titles':'|'.join('File:'+file for _, file in FILES.values()), 'format':'json'}
    data = json.loads(fetch('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params)))
    pages = {p['title']: p for p in data['query']['pages'].values()}
    assets = ROOT/'assets'/'party-logos'
    assets.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for party, (slug, title) in FILES.items():
        info = pages.get('File:'+title, {}).get('imageinfo', [])
        if not info:
            raise RuntimeError('No se encuentra el archivo: '+title)
        info = info[0]
        url = info['url']
        if urllib.parse.urlparse(url).hostname != 'upload.wikimedia.org':
            raise RuntimeError('Origen inesperado: '+url)
        ext = Path(title).suffix.lower()
        path = assets/(slug+ext)
        if path.exists():
            raw = path.read_bytes()
        else:
            # Wikimedia recomienda miniaturas en tamaños normalizados para logos.
            url = info.get('thumburl', url)
            ext = Path(urllib.parse.urlparse(url).path).suffix.lower()
            path = assets/(slug+ext)
            time.sleep(2)
            raw = path.read_bytes() if path.exists() else fetch(url)
        if len(raw)>5_000_000:
            raise RuntimeError('Archivo demasiado grande: '+title)
        if ext == '.svg':
            tree = ET.fromstring(raw)
            if tree.tag.split('}')[-1] != 'svg':
                raise RuntimeError('SVG no válido: '+title)
            for node in tree.iter():
                if node.tag.split('}')[-1].lower() in ('script','foreignobject'):
                    raise RuntimeError('Contenido activo en '+title)
                for key, value in node.attrib.items():
                    if key.split('}')[-1].lower().startswith('on'):
                        raise RuntimeError('Evento activo en '+title)
                    if key.split('}')[-1] == 'href' and not value.startswith(('#','data:image/png;base64,','data:image/jpeg;base64,')) and node.tag.split('}')[-1] != 'a':
                        raise RuntimeError('Recurso externo en '+title)
        elif not (raw.startswith(b'\x89PNG') or raw.startswith(b'\xff\xd8')):
            raise RuntimeError('Imagen no válida: '+title)
        path.write_bytes(raw)
        meta = info.get('extmetadata', {})
        manifest[party] = {'path':path.relative_to(ROOT).as_posix(), 'file':title,
          'source':info['descriptionurl'], 'original':info['url'], 'download':url,
          'author':clean(meta.get('Artist',{}).get('value','Consultar ficha de origen')),
          'license':clean(meta.get('LicenseShortName',{}).get('value','Consultar ficha de origen')),
          'licenseUrl':meta.get('LicenseUrl',{}).get('value',''),
          'sha256':hashlib.sha256(raw).hexdigest()}
        print(party+': '+path.name)
    (ROOT/'party-logos.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (ROOT/'party-logos.js').write_text('const PARTY_LOGOS='+json.dumps(manifest,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    rows=[]
    for party,m in manifest.items():
        e=html.escape
        rows.append(f'<li><img src="{e(m["path"])}" alt="" width="80" height="64" style="object-fit:contain"><h2>{e(party)}</h2><p>Autoría: {e(m["author"])} · Licencia indicada: {e(m["license"])}</p><a href="{e(m["source"])}">Ficha del archivo y condiciones de uso</a></li>')
    (ROOT/'logos.html').write_text('<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Origen de los logotipos · Voto Claro</title><link rel="stylesheet" href="styles.css"><body><main class="card"><a href="avanzado.html">Volver al test</a><h1>Origen de los logotipos</h1><p>Identificación informativa de las referencias del test. Los emblemas no implican respaldo a esta aplicación ni acreditan una candidatura electoral actual. Originales o miniaturas proporcionadas por Wikimedia, sin modificar colores ni geometría, descargados el 3 de noviembre de 2026.</p><ul>'+''.join(rows)+'</ul></main></body></html>',encoding='utf-8')

if __name__ == '__main__':
    main()
