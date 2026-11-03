# Voto Claro

Aplicación en español para explorar preferencias políticas, comparar documentos y consultar votaciones históricas del Congreso. Prototipo provisional, sin recomendación de voto.

## Tests y resultados

- Básico: 30 preguntas generales. Conserva las 20 anteriores y añade educación infantil, becas, tamaño de las clases, integración lingüística, asilo, ayudas de ingresos mínimos, dependencia, prácticas remuneradas, inspección laboral y emancipación juvenil.
- Avanzado: 22 preguntas generales y 8 votaciones de la XV Legislatura (selección de 2024–2025). Las leyes incluyen contexto y fuentes.
- Puntuación: coincidencias documentadas / 30 × 100, con un decimal. 30/30 = 100 %, 15/30 = 50 %. Cada coincidencia pesa exactamente 100/30; no se suman puntos redondeados. Los datos ausentes y las respuestas sin opinión no suman, pero no se etiquetan como desacuerdos. Si no hay ninguna respuesta comparable, no hay porcentaje. En el avanzado, «Solo votaciones» mantiene la base de 30 y su máximo es 26,7 %.
- Básico: 13 referencias de partidos; avanzado: 12 referencias parlamentarias. No todas tienen la misma cobertura. Algunas fichas carecen de posiciones generales suficientes.
- Catálogo al final de ambos tests: 87 denominaciones presentadas al Congreso en las 52 circunscripciones del [BOE de 28/10/2026](https://www.boe.es/buscar/doc.php?id=BOE-A-2026-22607&lang=es). Incluye Compromís, Frente Amplio, formaciones sin escaños, coaliciones y variantes territoriales. No son 87 partidos diferentes ni se afirma su proclamación definitiva. Buscador por nombre, provincia y datos pendientes. Las coaliciones nuevas no heredan posiciones de sus integrantes.

## Ejecutar

Python 3, sin paquetes externos:

```sh
python3 -B server.py --port 8089
```

Abre http://127.0.0.1:8089/index.html. El código en GitHub no supone un despliegue público: GitHub Pages no ejecuta las estadísticas de este servidor.

## Fuentes y límites

Documentos de 2023–2026, no programas confirmados de próximas elecciones. `positions.js` contiene la selección inicial y `expanded-positions.js` la ampliación. Las copias originales alojadas en Newtral y Betevé se identifican. Podemos usa un programa europeo de 2024. La ampliación a 30 preguntas incorpora tres posiciones adicionales de BNG localizadas en su programa de generales de 2023 (páginas PDF 19, 32 y 63); las demás casillas nuevas permanecen sin dato mientras no se verifiquen. No se rellenan por ideología.

La documentación varía entre partidos: con menos datos, su techo de puntuación es menor. Los porcentajes no estiman posiciones desconocidas, no son probabilidades y no constituyen un ranking global. Las votaciones tienen fuentes secundarias identificadas: no se ha completado una auditoría nominal independiente de todos los votos. Abstención parlamentaria, ausencia y respuesta sin opinión no se equiparan. La selección de asuntos es editorial y no abarca toda la legislatura.

`candidacies.js` solo contiene denominaciones y circunscripciones, sin nombres de candidatos. Para regenerarlo desde el HTML oficial: `python3 import-candidacies.py /ruta/BOE.html`.

## Estadísticas y privacidad

Las tres opciones de inicio suman contadores agregados con aviso previo. `GET/POST /api/participation` consultan o aumentan esos totales en `.data/participation.sqlite3`. No se guardan filas individuales, nombres, IP, correos, marcas de tiempo ni respuestas a tests en esa base. Una marca de sesión limita duplicados en la misma pestaña; no verifica personas únicas. Las elecciones iniciales no alteran la puntuación. La base no se publica ni se sirve por HTTP. Los tests mantienen sus respuestas en memoria y se pierden al recargar o cerrar.

## Estilos y comprobaciones

Edita `styles.scss` y ejecuta `node build-styles.mjs`. El SCSS actual usa sintaxis compatible con CSS y el script la sincroniza; no es un compilador Sass.

```sh
node check-scoring.cjs
```

Se comprueban 30/30, 15/30 y la base fija del avanzado. El servidor incluido debe desplegarse detrás de HTTPS para uso por internet.

## Estado actual

Se conservan ambos tests de 30 preguntas y el catálogo de candidaturas. Se han retirado la recogida de correo, el envío SMTP y los asistentes de configuración de Gmail. No hay conexión de correo activa en la aplicación.
