# Voto Claro

Aplicación web en español para explorar preferencias políticas y consultar coincidencias documentadas con propuestas y votaciones del Congreso de los Diputados de España.

## Contenido

- Pantalla de elección, accesible desde el dibujo grande o «Elegir cómo empezar», con tres puntos de partida: «Tengo claro más o menos, pero quiero especificar mi voto», «No sé qué votar» y «No quiero votar». La última opción permite continuar sin realizar un test; la elección no altera ninguna puntuación.

- **Test básico:** 20 preguntas generales y una comparación documental provisional con cuatro partidos.
- **Test avanzado:** 12 preguntas generales y 8 votaciones de la XV Legislatura (selección de 2024–2025), con explicación del trámite que se votaba.
- **12 partidos o grupos en el avanzado:** PP, PSOE, VOX, Sumar (grupo parlamentario), Podemos, ERC, Junts, EAJ-PNV, EH Bildu, BNG, Coalición Canaria y UPN.
- Resultados con fuentes, número de preguntas comparadas y posibilidad de consultar solo las votaciones para utilizar una base común.
- Estética en azul y morado, logo SVG y fuente de estilos en SCSS.

## Ejecutar

Los tests pueden abrirse como archivos estáticos. Para guardar y consultar estadísticas compartidas de las opciones de inicio, ejecuta el servidor incluido (Python 3, sin paquetes externos):

```sh
python3 server.py --port 8080
```

Después abre `http://localhost:8080`. El test avanzado está en `avanzado.html`.

## Estilos

Edita `styles.scss` y ejecuta:

```sh
node build-styles.mjs
```

Actualmente el SCSS contiene únicamente sintaxis compatible con CSS y el script sincroniza el archivo que carga el navegador. No es un compilador Sass: si se introducen variables `$`, anidación u otras funciones de Sass, será necesario añadir su compilación.

## Archivos

- `index.html`, `app.js`: portada y test básico.
- `avanzado.html`, `advanced.js`: presentación, preguntas y resultados del test avanzado.
- `questions.js`: preguntas generales compartidas.
- `positions.js`: posiciones documentales provisionales del test básico.
- `advanced-data.js`: partidos, explicaciones, fechas, fuentes y votos históricos del test avanzado.
- `scoring.js`: cálculo del test básico.
- `styles.scss`, `styles.css`, `build-styles.mjs`: estilos y sincronización.
- `logo.svg`: identidad visual.

## Cómo se calculan los resultados

El porcentaje es el número de coincidencias exactas dividido entre el número de respuestas comparables, multiplicado por 100. Se requieren al menos tres preguntas comparables; este umbral es una decisión del prototipo y no una validación estadística.

En las votaciones, una abstención es una posición independiente y solo coincide con una abstención documentada. «No lo sé / Saltar» queda fuera del cálculo. Las ausencias o datos no localizados no se convierten en abstenciones. En las preguntas generales, la neutralidad se excluye porque la base documental no la clasifica.

La cobertura de las preguntas generales varía entre partidos; los porcentajes combinados no deben ordenarse como un ranking. La opción «Solo votaciones» limita la comparación a los mismos ocho asuntos.

## Estado de los datos y límites

**Prototipo provisional.** Los documentos generales incorporados son de 2023–2026 y no equivalen a los programas de unas próximas elecciones. La selección de asuntos no cubre toda la legislatura ni todos los partidos o candidaturas. El filtro territorial sirve para consultar y no comprueba candidaturas por provincia.

La última revisión consignada en la aplicación es del 24 de octubre de 2026 para el test avanzado y del 23 de octubre para las posiciones generales. No existe actualización automática. La publicación del código en GitHub no implica una nueva revisión de los datos.

Los textos legales y registros oficiales se enlazan en las preguntas. La descarga de los registros nominales del Congreso devolvió errores de acceso durante la elaboración; las distribuciones por partido se consultaron en las fuentes secundarias enlazadas. **No se ha realizado una auditoría nominal independiente de todos los votos.** Debe completarse esa comprobación antes de presentar el proyecto como una herramienta electoral validada.

Un voto sobre la tramitación o sobre un paquete legislativo no se interpreta como una opinión sobre cada medida individual. En la pregunta de jornada laboral se reproduce la votación de devolución del proyecto al Gobierno, sin invertir su significado.

Los porcentajes describen coincidencias dentro de esta muestra; no representan una probabilidad, una afinidad ideológica completa ni una recomendación de voto.

## Estadísticas de las opciones de inicio

Al seleccionar una de las tres opciones, el navegador envía únicamente su categoría a `POST /api/participation`. `GET /api/participation` devuelve los tres totales y su suma. La página «Ver estadísticas» muestra los recuentos y porcentajes reales, incluidos los ceros iniciales.

El servidor guarda únicamente tres contadores en `.data/participation.sqlite3`. No guarda filas individuales, marcas de tiempo, nombres, correos, direcciones IP, identificadores ni respuestas a los tests. La base no se sirve por HTTP ni se publica en GitHub. Una marca booleana en `sessionStorage` evita repetir el registro en la misma pestaña; no identifica personas y no impide que otra sesión vuelva a responder. Se cuentan respuestas, no visitantes únicos ni una muestra representativa. Las opciones de duda no significan que una persona vaya a votar.

Los contadores persisten tras reiniciar el servidor. Se puede elegir una ubicación con `VOTO_CLARO_DB`. Para compartir el recuento entre visitantes, debe desplegarse este servidor con almacenamiento persistente y servir la app desde el mismo origen. **GitHub aloja el código; GitHub Pages por sí solo no ejecuta esta API.** En una versión solo estática, la app informa de la indisponibilidad y no simula una estadística global usando datos del navegador.

El servidor incluido es para desarrollo o despliegue detrás de un servicio HTTPS. No incorpora protección contra respuestas automatizadas; no debe presentarse como una encuesta verificada.

## Privacidad

La aplicación no solicita registro. Las respuestas de los tests no se envían a un servidor. Las opciones de inicio sí se suman a un recuento agregado, con aviso previo visible. Se mantienen en memoria durante la sesión y se borran al recargar o cerrar la página. Los enlaces a fuentes externas conducen a servicios con sus propias políticas.
