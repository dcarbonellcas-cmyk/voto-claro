"""Importa solo denominaciones y provincias del Congreso; nunca nombres de candidatos.
Uso: python3 scripts/import-candidacies.py /ruta/al/BOE-A-2026-22607.html
"""
import re, html, json, sys
from pathlib import Path
source=Path(sys.argv[1]).read_text()
active=False; province=''; entries={}; provinces=set()
for cls,raw in re.findall(r'<p class="([^"]*)">(.*?)</p>',source,re.S):
 text=' '.join(html.unescape(re.sub('<[^>]+>','',raw)).split())
 if cls=='centro_negrita' and text.startswith('JUNTA ELECTORAL DE '):
  province=text.removeprefix('JUNTA ELECTORAL DE ').title(); active=False
 if text=='CONGRESO DE LOS DIPUTADOS': active=True; provinces.add(province)
 elif text=='SENADO': active=False
 elif active and cls=='centro_redonda' and re.match(r'^\d+\.',text):
  name=re.sub(r'^\d+\.\s*','',text)
  key=name.casefold()
  if key not in entries: entries[key]={'name':name,'provinces':[]}
  if province not in entries[key]['provinces']: entries[key]['provinces'].append(province)
assert len(provinces)==52, f'Se esperaban 52 circunscripciones, hay {len(provinces)}'
items=sorted(entries.values(),key=lambda p:p['name'])
output='// Denominaciones del Congreso; no se importan datos personales.\nconst CANDIDACY_SOURCE="https://www.boe.es/buscar/doc.php?id=BOE-A-2026-22607&lang=es";\nconst CANDIDACY_DATE="28/10/2026";\nconst CANDIDACIES='+json.dumps(items,ensure_ascii=False,indent=2)+';\n'
Path('candidacies.js').write_text(output)
print(f'{len(items)} denominaciones; {len(provinces)} circunscripciones. Se conservan variantes territoriales y coaliciones distintas.')
