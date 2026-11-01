// 0 = acuerdo; 1 = desacuerdo. Una ausencia de evidencia se representa con null.
// Clasificación editorial conservadora: no se deducen posturas por ideología.
const SOURCE_URLS={pp:'https://www.pp.es/wp-content/uploads/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf',psoe:'https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf',sumar:'https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf',sumarWeb:'https://movimientosumar.es/programa-electoral-23j/',vox:'https://www.voxespana.es/wp-content/uploads/2025/10/Programa-WEB-021025.pdf'};
function evidence(answer,reason,url,source){return {answer,reason,url,source}}
function positions(entries){const result=Array(20).fill(null);for(const [index,value] of entries)result[index]=value;return result}
const PARTIES=[
{name:'PP',period:'Programa 2023 y declaración 2026',positions:positions([
[3,evidence(0,'Defiende el pago de las subidas salariales a los docentes de la concertada. Interpretamos respaldo a su financiación pública; no es un programa nacional de 2026.','https://www.pp.es/actualidad/articulos/el-pp-denuncia-el-abandono-de-la-educacion-concertada-en-ceuta-y-melilla-el-gobierno-debe-a-los-profesores-las-subidas-salariales-desde-2024/','PP · declaración del 26/05/2026 · Ceuta y Melilla')],
[11,evidence(0,'Propone suelo público para alquiler asequible y promover vivienda social.',SOURCE_URLS.pp+'#page=34','Programa PP 2023 · medidas 93–94 · página PDF 34')],
[12,evidence(0,'Propone prolongar las centrales existentes, con aprobación del Consejo de Seguridad Nuclear.',SOURCE_URLS.pp+'#page=38','Programa PP 2023 · medida 114 · página PDF 38')]
])},
{name:'PSOE',period:'Programa de generales 2023',positions:positions([
[1,evidence(0,'Respalda límites de alquiler en la Ley de Vivienda. No implica que esa regulación siga vigente hoy.',SOURCE_URLS.psoe+'#page=181','Programa PSOE 2023 · página PDF 181')],
[5,evidence(0,'Propone garantizar el poder adquisitivo de las pensiones conforme al IPC.',SOURCE_URLS.psoe+'#page=170','Programa PSOE 2023 · página PDF 170')],
[11,evidence(0,'Propone construir viviendas públicas para alquiler.',SOURCE_URLS.psoe+'#page=131','Programa PSOE 2023 · página PDF 131')],
[12,evidence(1,'Prevé el desmantelamiento progresivo de las centrales nucleares.',SOURCE_URLS.psoe+'#page=75','Programa PSOE 2023 · página PDF 75')],
[16,evidence(0,'Propone ampliar descuentos de transporte público y gratuidad para determinados jóvenes.',SOURCE_URLS.psoe+'#page=131','Programa PSOE 2023 · página PDF 131')],
[19,evidence(0,'Propone reforzar especialistas y atención pública en salud mental.',SOURCE_URLS.psoe+'#page=131','Programa PSOE 2023 · página PDF 131')]
])},
{name:'Sumar',period:'Programa de generales 2023',positions:positions([
[1,evidence(0,'Propone regular precios del alquiler en zonas tensionadas.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · control de alquileres')],
[4,evidence(0,'Propone garantizar la subida anual del salario mínimo. No cuantifica en este apartado el efecto en las empresas.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · salario mínimo')],
[7,evidence(0,'Propone un fondo público de inversión en energías renovables.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · fondo renovable')],
[10,evidence(0,'Propone reducir la jornada laboral sin reducir salarios.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · jornada laboral')],
[11,evidence(0,'Propone ampliar el parque de vivienda pública de alquiler asequible.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · vivienda social')],
[12,evidence(1,'Propone mantener el calendario de cierre de centrales nucleares.',SOURCE_URLS.sumar+'#page=48','Programa Sumar 2023 · página PDF 48 · apartado 9')],
[15,evidence(0,'Propone regular las viviendas turísticas para evitar que eludan la regulación residencial.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · alquiler turístico')],
[16,evidence(0,'Propone una reducción permanente del precio de los abonos de transporte.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · transporte')],
[18,evidence(0,'Propone una prestación universal de 200 euros mensuales por menor de 18 años.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · prestación por hijo')],
[19,evidence(0,'Propone ampliar la psicoterapia en los servicios sanitarios públicos.',SOURCE_URLS.sumarWeb,'Sumar · propuestas electorales 23J 2023 · servicios sanitarios')]
])},
{name:'VOX',period:'Programa económico y de vivienda 2025',positions:positions([
[1,evidence(1,'Propone derogar las medidas de intervención en el mercado de alquiler.',SOURCE_URLS.vox+'#page=45','VOX · programa económico 2025 · página PDF 45')],
[6,evidence(1,'Propone revisar regularizaciones y priorizar expulsiones de quienes acceden irregularmente.',SOURCE_URLS.vox+'#page=43','VOX · programa económico 2025 · página PDF 43')],
[12,evidence(0,'Propone mantener las centrales actuales y estudiar otras nuevas.',SOURCE_URLS.vox+'#page=41','VOX · programa económico 2025 · página PDF 41')],
[15,evidence(0,'Propone regular la proliferación de viviendas turísticas e inspeccionar pisos ilegales.',SOURCE_URLS.vox+'#page=45','VOX · programa económico 2025 · página PDF 45')],
[17,evidence(0,'Propone eliminar la cuota para autónomos que ingresen menos que el salario mínimo.',SOURCE_URLS.vox+'#page=37','VOX · programa económico 2025 · página PDF 37')]
])}
];
