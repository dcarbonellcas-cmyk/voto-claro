"""Importa denominaciones y provincias del Congreso, excluyendo no proclamadas.

Uso: python import-candidacies.py /ruta/BOE-A-2026-23103.html
No conserva nombres de personas ni listas al Senado.
"""
import html
import json
import re
import sys
from pathlib import Path


def parse_candidacies(source):
    active, province, current = False, '', None
    records, provinces = [], set()
    for cls, raw in re.findall(r'<p class="([^"]*)">(.*?)</p>', source, re.S):
        text = ' '.join(html.unescape(re.sub('<[^>]+>', '', raw)).split())
        if cls == 'centro_negrita' and text.startswith('JUNTA ELECTORAL DE '):
            province = text.removeprefix('JUNTA ELECTORAL DE ').title()
            active, current = False, None
        if text == 'CONGRESO DE LOS DIPUTADOS':
            active, current = True, None
            provinces.add(province)
        elif text == 'SENADO':
            active, current = False, None
        elif active and cls == 'centro_redonda' and re.match(r'^\d+\.', text):
            current = {'name': re.sub(r'^\d+\.\s*', '', text), 'province': province, 'proclaimed': True}
            records.append(current)
        elif active and current and re.fullmatch(r'No proclamad[ao]s?\.', text, re.I):
            current['proclaimed'] = False
    entries = {}
    for record in records:
        if not record['proclaimed']:
            continue
        key = record['name'].casefold()
        entries.setdefault(key, {'name': record['name'], 'provinces': []})
        if record['province'] not in entries[key]['provinces']:
            entries[key]['provinces'].append(record['province'])
    return sorted(entries.values(), key=lambda p: p['name'].casefold()), records, provinces


def main():
    source = Path(sys.argv[1]).read_text(encoding='utf-8')
    items, records, provinces = parse_candidacies(source)
    assert len(provinces) == 52, f'Se esperaban 52 circunscripciones, hay {len(provinces)}'
    total = sum(r['proclaimed'] for r in records)
    rejected = len(records) - total
    assert (total, rejected) == (534, 21), f'Revisar recuento del BOE: {total} proclamadas, {rejected} excluidas'
    output = ('// Solo denominaciones proclamadas al Congreso; sin datos personales.\n'
              'const CANDIDACY_SOURCE="https://www.boe.es/buscar/doc.php?id=BOE-A-2026-23103";\n'
              'const CANDIDACY_DATE="03/11/2026";\n'
              f'const CANDIDACY_TOTAL={total};\n'
              f'const CANDIDACY_EXCLUDED={rejected};\n'
              'const CANDIDACIES=' + json.dumps(items, ensure_ascii=False, indent=2) + ';\n')
    Path('candidacies.js').write_text(output, encoding='utf-8')
    print(f'{len(items)} denominaciones; {total} listas proclamadas; {rejected} no proclamadas excluidas; {len(provinces)} circunscripciones.')


if __name__ == '__main__':
    main()
