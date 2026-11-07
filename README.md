# Voto Claro

Aplicación en español para explorar preferencias políticas y contrastarlas con documentos y votaciones históricas del Congreso. Sin registro ni recomendación de voto.

## Un único test

El test básico se ha retirado. La portada ofrece solamente el avanzado: **25 preguntas generales + 15 votaciones de la XV Legislatura (2024–2025)**. El enlace antiguo `index.html#test` redirige a `avanzado.html`.

Las siete votaciones añadidas cubren enseñanzas artísticas, desperdicio alimentario, bomberos forestales, derecho de defensa, organización de la justicia, atención a la clientela y permisos de nacimiento. Cada ficha identifica fecha, trámite, contexto y fuentes. No se confunde tramitar un proyecto con aprobar definitivamente una ley.

El banco documental conserva 19 referencias históricas: PP, PSOE, VOX, Sumar (grupo parlamentario), Podemos, ERC, Junts, EAJ-PNV, EH Bildu, BNG, Coalición Canaria, UPN, PACMA, Compromís, Más Madrid, PCTE, Adelante Andalucía, Nueva Canarias-BC y Ciudadanos. Compromís y Más Madrid utilizan programas autonómicos de 2023, identificados como referencias territoriales. No se les atribuyen los votos del grupo Sumar ni de sus coaliciones. Las referencias sin desglose parlamentario propio solo tienen posiciones generales y una cobertura reducida. Ciudadanos se presenta como referencia histórica, sin afirmar que concurra a las próximas elecciones.

## Resultados y coaliciones

Los resultados muestran 21 opciones electorales revisadas que tienen listas proclamadas en el BOE del 03/11/2026. Las referencias históricas que no concurren solas quedan fuera de las tarjetas: Sumar y Más Madrid se sustituyen por Frente Amplio; Compromís por Compromís: Front Valencià; Nueva Canarias-BC por Unidad del Pueblo Canario; CC por CC–Municipalistas Primero Canarias; UPN por UPN-PP y Ciudadanos por Democracia para el siglo 21. También se contemplan AraMés–Front Ampli, EH Bildu–ERC en Navarra y PSC-PSOE. El selector de provincia filtra listas reales, sin incluir automáticamente opciones estatales que no se presenten allí.

La revisión del 07/11/2026 incorpora al test el límite al alquiler en zonas tensionadas, la reducción de jornada sin rebaja salarial, el límite a pisos turísticos, la mejora de cercanías y la inclusión de perros de caza en la ley de bienestar animal. Son las mismas preguntas para todas las candidaturas. Las fuentes de cada respuesta están en el detalle de resultados y en `election-options.js`.

Las propuestas de la candidatura tienen prioridad. Frente Amplio y AraMés–Front Ampli usan como referencia las posiciones de Sumar de 2023 disponibles para las preguntas del test y el desglose histórico del grupo parlamentario Sumar. Las fichas distinguen el programa de los votos del grupo. Front Valencià incorpora siete propuestas generales de Compromís y conserva su declaración propia sobre bienestar animal. Hay nuevas fuentes para CC–Primero Canarias, UPC, AraMés–Front Ampli, PSC y D21, entre otras. Sin evidencia, las opciones siguen pendientes. Véase la [revisión anterior de candidaturas](FUENTES-COALICIONES-2026-11-05.md).

## Puntuación

Coincidencias exactas / **40** × 100, redondeado a un decimal al final. Cada coincidencia suma 2,5 puntos porcentuales. «Solo votaciones» conserva la base de 40 y su máximo es 15/40 = 37,5 %.

Los datos ausentes y las respuestas omitidas no suman, pero se distinguen de los desacuerdos. Sin respuestas comparables no se muestra porcentaje. Una abstención parlamentaria solo coincide con otra abstención. La neutralidad en preguntas generales no puntúa. Los votos divididos localizados quedan sin una postura única (ejemplo: VOX en enseñanzas artísticas, 32 en contra y una abstención).

La documentación varía entre partidos: con menos datos, su techo de puntuación es menor. Los porcentajes no estiman las respuestas desconocidas ni constituyen un ranking global. Se mantiene esta metodología del proyecto, adaptando el denominador al nuevo tamaño del test.

## Datos y fuentes

`questions.js` conserva un banco documental de 32 preguntas con índices estables para las evidencias anteriores. **Solo las 25 de `GENERAL_SELECTION` se presentan al usuario.** `positions.js`, `expanded-positions.js` y `research-positions.js` contienen las posiciones; `advanced-data.js`, las votaciones y la selección del test. `election-options.js` define las identidades electorales, sus provincias y la evidencia propia de coaliciones. Las identidades históricas permanecen disponibles como fuentes, sin aparecer automáticamente como candidaturas.

Revisión: 03/11/2026. Véase [FUENTES-2026-11-03.md](FUENTES-2026-11-03.md) para las incorporaciones y los límites. Se usan documentos de 2022–2026; no se presentan como programas actuales de próximas elecciones. Las tablas parlamentarias utilizan fuentes secundarias identificadas y documentos oficiales para los trámites y resultados. Las descargas nominales oficiales consultadas devolvieron 403 o no estuvieron disponibles; no se afirma una auditoría individual de todos los diputados. No se asigna el voto del Grupo Mixto a sus partidos.

El catálogo actualizado contiene las 534 listas proclamadas al Congreso en 52 circunscripciones, agrupadas en 82 denominaciones. No son 82 partidos distintos. Se excluyen las 21 listas que el BOE del 03/11/2026 marca como no proclamadas. Para regenerarlo: `python3 import-candidacies.py /ruta/BOE-A-2026-23103.html`. Solo se exportan denominaciones y provincias, sin nombres de personas ni candidaturas al Senado.

## Ejecutar y comprobar

Con Python 3, sin paquetes externos:

```sh
python3 -B server.py --port 8089
```

Abre http://127.0.0.1:8089/index.html. El código en GitHub no supone un despliegue público: GitHub Pages no ejecuta las cuentas, el historial ni las estadísticas de este servidor.

```sh
node check-scoring.cjs
```

Comprueba la selección 25+15, la puntuación sobre 40, omisiones, neutralidad y abstenciones, votos divididos, falta de evidencia, referencias propias y renderizado de las 40 preguntas y resultados. No sustituye una revisión visual en navegador.

Para estilos, edita `styles.scss` y ejecuta `node build-styles.mjs`; el script sincroniza sintaxis compatible con CSS, no compila Sass.

## Estadísticas y privacidad

Las tres opciones de inicio suman contadores agregados con aviso previo. `GET/POST /api/participation` consultan o aumentan los totales de `.data/participation.sqlite3`. Estos contadores no guardan filas individuales, nombres, IP, correos ni respuestas del test. Una marca de sesión limita duplicados en la misma pestaña; no verifica personas únicas. Las elecciones iniciales no alteran la puntuación. Las respuestas no guardadas se mantienen en memoria y se borran al recargar o cerrar. No hay conexión de correo activa. El servidor debe desplegarse detrás de HTTPS para uso por internet.

## Segunda ampliación y logotipos

Se añaden 26 posiciones generales en 10 referencias, cuatro de ellas nuevas. Consulta [DATOS-PARTIDOS.md](DATOS-PARTIDOS.md) para ver cada incorporación y su fuente. En aquella revisión el test conservó las 20+15 preguntas.

Las opciones con un logotipo propio verificado lo muestran a la izquierda del nombre, sin recortar ni recolorear el emblema. Las nuevas coaliciones no usan el logotipo de uno de sus integrantes. Frente Amplio utiliza el de su web oficial. La fecha y ámbito del documento y la cobertura documental se ven en la tarjeta. [logos.html](logos.html) permite consultar autoría, licencia indicada y ficha de origen. `party-logos.json` conserva URL y SHA-256; `fetch-party-logos.py` permite regenerar los archivos desde Wikimedia. Si una imagen falla, se retira y el nombre sigue legible. El servidor permite estas imágenes únicamente dentro de `assets/party-logos/`.

Revisión electoral del 05/11/2026: las comprobaciones incluyen ausencia de las siglas que no concurren solas, coaliciones sin herencia automática de datos, filtrado por provincia y exclusión de listas no proclamadas. En aquella revisión se mantuvo la base de 35 preguntas.


## Cuentas e historial personal

El enlace «Iniciar sesión» permite crear una cuenta con usuario (3–32 caracteres) y contraseña (12–128). No se pide correo; esta versión no ofrece recuperación de contraseña. El test sigue disponible sin cuenta. Al terminar, «Guardar resultado» conserva explícitamente las respuestas, puntuaciones, cobertura, provincia, filtro y versión documental. «Mi cuenta» permite consultar y eliminar cada resultado. Las consultas muestran la instantánea original, sin recalcularla cuando cambian los datos de partidos. Los resultados antiguos conservan su base de 35 preguntas.

Las cuentas y resultados están en `.data/accounts.sqlite3`, excluida de Git y de la carpeta pública. Haz copias de seguridad privadas de esta base para conservarlos en un despliegue; cambiar de ordenador sin migrarla no transfiere las cuentas. `VOTO_CLARO_ACCOUNTS_DB` permite elegir una ubicación persistente. Las contraseñas usan scrypt con sal individual; las sesiones duran siete días, se revocan al salir y usan cookies HttpOnly y SameSite=Strict. No se guardan credenciales ni resultados en localStorage. Las rutas de historial comprueban la propiedad en el servidor y los cambios requieren solicitudes JSON del mismo origen. Hay límite de intentos de acceso. No se registran contraseñas, respuestas ni direcciones IP en logs.

Para un despliegue por internet, servir detrás de HTTPS y configurar `VOTO_CLARO_SECURE_COOKIES=1`. El historial contiene respuestas políticas personales; su base y copias de seguridad deben permanecer privadas. No se ha configurado un despliegue público ni correo.

Pruebas adicionales: `python3 -B check-accounts.py` verifica registro, login, logout, caducidad, persistencia, aislamiento entre usuarios, eliminación, validación, origen y bloqueo de archivos privados. `node check-scoring.cjs` comprueba también el guardado desde resultados y la conservación de los filtros.


## Administración y estadísticas agregadas

`admin.html` requiere una sesión con el rol `is_admin`, comprobado también en `GET /api/admin/statistics`. El registro público nunca concede ese rol. La cuenta de administración se provisiona localmente con `Accounts.create_admin(usuario, contraseña)`; las credenciales no se incluyen en el repositorio ni se cambian automáticamente si el usuario ya existe.

Al completar el test se envían, sin cookies, un recibo aleatorio de deduplicación y las opciones que empatan en el máximo de coincidencias sobre el total de preguntas de cada versión, antes de filtros. No se envían respuestas, usuario, porcentajes individuales, provincia ni fecha. En la base de estadísticas solo se mantienen contadores por opción y recibos independientes, sin relación entre ellos. Los grupos con menos de cinco apariciones no se muestran. No se consultan historiales privados para construir el panel ni se reconstruyen tests anteriores. Las estadísticas cuentan tests, no personas únicas, y los datos enviados por el navegador no están verificados independientemente en el servidor.

El panel reutiliza el contador existente de «No quiero votar». No se interpreta como desacuerdo con la política actual porque el motivo no se ha preguntado. Los empates pueden hacer que la suma por opciones supere el total de tests. Los tests sin respuestas comparables se contabilizan aparte. El aviso de recuento anónimo aparece antes de empezar el test.
