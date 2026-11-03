# Voto Claro

Aplicación en español para explorar preferencias políticas y contrastarlas con documentos y votaciones históricas del Congreso. Sin registro ni recomendación de voto.

## Un único test

El test básico se ha retirado. La portada ofrece solamente el avanzado: **20 preguntas generales + 15 votaciones de la XV Legislatura (2024–2025)**. El enlace antiguo `index.html#test` redirige a `avanzado.html`.

Las siete votaciones añadidas cubren enseñanzas artísticas, desperdicio alimentario, bomberos forestales, derecho de defensa, organización de la justicia, atención a la clientela y permisos de nacimiento. Cada ficha identifica fecha, trámite, contexto y fuentes. No se confunde tramitar un proyecto con aprobar definitivamente una ley.

Se muestran 19 referencias históricas: PP, PSOE, VOX, Sumar (grupo parlamentario), Podemos, ERC, Junts, EAJ-PNV, EH Bildu, BNG, Coalición Canaria, UPN, PACMA, Compromís, Más Madrid, PCTE, Adelante Andalucía, Nueva Canarias-BC y Ciudadanos. Compromís y Más Madrid utilizan programas autonómicos de 2023, identificados como referencias territoriales. No se les atribuyen los votos del grupo Sumar ni de sus coaliciones. Las referencias sin desglose parlamentario propio solo tienen posiciones generales y una cobertura reducida. Ciudadanos se presenta como referencia histórica, sin afirmar que concurra a las próximas elecciones.

## Puntuación

Coincidencias exactas / **35** × 100, redondeado a un decimal al final. Cada coincidencia pesa 100/35: 35/35 = 100 % y 7/35 = 20 %. «Solo votaciones» conserva la base de 35; su máximo es 15/35 = 42,9 %.

Los datos ausentes y las respuestas omitidas no suman, pero se distinguen de los desacuerdos. Sin respuestas comparables no se muestra porcentaje. Una abstención parlamentaria solo coincide con otra abstención. La neutralidad en preguntas generales no puntúa. Los votos divididos localizados quedan sin una postura única (ejemplo: VOX en enseñanzas artísticas, 32 en contra y una abstención).

La documentación varía entre partidos: con menos datos, su techo de puntuación es menor. Los porcentajes no estiman las respuestas desconocidas ni constituyen un ranking global. Se mantiene esta metodología del proyecto, adaptando el denominador al nuevo tamaño del test.

## Datos y fuentes

`questions.js` conserva un banco documental de 30 preguntas con índices estables para las evidencias anteriores. **Solo las 20 de `GENERAL_SELECTION` se presentan al usuario.** `positions.js`, `expanded-positions.js` y `research-positions.js` contienen las posiciones; `advanced-data.js`, las votaciones y la selección del test.

Revisión: 03/11/2026. Véase [FUENTES-2026-11-03.md](FUENTES-2026-11-03.md) para las incorporaciones y los límites. Se usan documentos de 2023–2026; no se presentan como programas actuales de próximas elecciones. Las tablas parlamentarias utilizan fuentes secundarias identificadas y documentos oficiales para los trámites y resultados. Las descargas nominales oficiales consultadas devolvieron 403 o no estuvieron disponibles; no se afirma una auditoría individual de todos los diputados. No se asigna el voto del Grupo Mixto a sus partidos.

El catálogo permite buscar las 87 denominaciones y 52 circunscripciones ya incluidas en `candidacies.js`. Son denominaciones presentadas, no 87 partidos diferentes ni candidaturas definitivamente proclamadas. Las coaliciones nuevas no heredan posiciones de sus integrantes. Se preserva el catálogo previo, sin renovar aquí su verificación electoral. Para regenerarlo: `python3 import-candidacies.py /ruta/BOE.html`.

## Ejecutar y comprobar

Con Python 3, sin paquetes externos:

```sh
python3 -B server.py --port 8089
```

Abre http://127.0.0.1:8089/index.html. El código en GitHub no supone un despliegue público: GitHub Pages no ejecuta las estadísticas de este servidor.

```sh
node check-scoring.cjs
```

Comprueba la selección 20+15, la puntuación sobre 35, omisiones, neutralidad y abstenciones, votos divididos, falta de evidencia, referencias propias y renderizado de las 35 preguntas y resultados. No sustituye una revisión visual en navegador.

Para estilos, edita `styles.scss` y ejecuta `node build-styles.mjs`; el script sincroniza sintaxis compatible con CSS, no compila Sass.

## Estadísticas y privacidad

Las tres opciones de inicio suman contadores agregados con aviso previo. `GET/POST /api/participation` consultan o aumentan los totales de `.data/participation.sqlite3`. No se guardan filas individuales, nombres, IP, correos ni respuestas del test. Una marca de sesión limita duplicados en la misma pestaña; no verifica personas únicas. Las elecciones iniciales no alteran la puntuación. Las respuestas se mantienen en memoria y se borran al recargar o cerrar. No hay conexión de correo activa. El servidor debe desplegarse detrás de HTTPS para uso por internet.

## Segunda ampliación y logotipos

Se añaden 26 posiciones generales en 10 referencias, cuatro de ellas nuevas. Consulta [DATOS-PARTIDOS.md](DATOS-PARTIDOS.md) para ver cada incorporación y su fuente. El test conserva las mismas 20+15 preguntas y el denominador de 35.

Los 19 resultados muestran un logotipo local a la izquierda del nombre, sin recortar ni recolorear el emblema. La fecha y ámbito del documento y la cobertura documental se ven en la tarjeta. [logos.html](logos.html) permite consultar autoría, licencia indicada y ficha de origen. `party-logos.json` conserva URL y SHA-256; `fetch-party-logos.py` permite regenerar los archivos desde Wikimedia. Si una imagen falla, se retira y el nombre sigue legible. El servidor permite estas imágenes únicamente dentro de `assets/party-logos/`.
