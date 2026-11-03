// Ampliación documental del 03/11/2026. Resúmenes editoriales, no respuestas
// oficiales al test. Solo posiciones generales: nunca se generan votos del Congreso.
const RESEARCH_DOCUMENTS={
 pp:SOURCE_URLS.pp,psoe:SOURCE_URLS.psoe,bng:EXTRA_DOCUMENTS.BNG,pnv:EXTRA_DOCUMENTS.PNV,
 podemos:EXTRA_DOCUMENTS.Podemos,
 compromis:'https://28m.compromis.net/programa/habitatge',
 pcte:'https://www.pcte.es/wp-content/uploads/2023/07/PROGRAMA%20DE%20LUCHA%202023-2027.pdf',
 adelante:'https://adelanteandalucia.org/wp-content/uploads/2026/04/50Medidas-AA.pdf',
 nc:'https://www.nuevacanariasbc.org/wp-content/uploads/2023/05/LF_Programa_Electoral_Nueva_Canarias-1.pdf',
 ncMental:'https://www.eldiario.es/canariasahora/politica/nueva-canarias-exige-gobierno-regional-adopte-medidas-ambito-salud-mental_1_10432466.html',
 cs:'https://www.ciudadanos-cs.org/por-los-tuyos-propuestas-2023-28m'
};
const NEW_DOCUMENTED_PARTIES=[
 {name:'PCTE',period:'Programa de lucha 2023–2027 · presentado en julio de 2023',region:'Estatal'},
 {name:'Adelante Andalucía',period:'50 medidas · autonómicas andaluzas 2026',region:'Andalucía'},
 {name:'Nueva Canarias-BC',period:'Autonómicas 2023 · lectura fácil y declaración recogida en prensa',region:'Canarias'},
 {name:'Ciudadanos',period:'Propuestas del 28M de 2023 · referencia histórica',region:'Estatal'}
];
for(const p of NEW_DOCUMENTED_PARTIES){
 if(PARTIES.some(x=>x.name===p.name))throw Error('Referencia duplicada: '+p.name);
 PARTIES.push({name:p.name,period:p.period,positions:positions([])});
}
// [partido, índice estable, apoyo=0/oposición=1, documento, localización, motivo]
const RESEARCH_POSITIONS=[
 ['PP',19,0,'pp','página PDF 58 · mayores en soledad','Propone ampliar los servicios de salud mental y apoyo psicológico; la medida se refiere especialmente a mayores en soledad.'],
 ['PP',21,0,'pp','página PDF 51 · medida 155','Amplía las becas y prevé fondos para estudiantes con escasos recursos.'],
 ['PSOE',20,0,'psoe','página PDF 103 · sistema educativo','Propone una oferta suficiente de plazas públicas gratuitas desde los 0 años.'],
 ['PSOE',21,0,'psoe','página PDF 183 · becas','Propone mejorar las becas atendiendo a la situación económica del hogar.'],
 ['PSOE',14,0,'psoe','página PDF 160 · derechos reproductivos','Propone garantizar la interrupción voluntaria del embarazo y el acceso a sus métodos en todas las comunidades.'],
 ['PSOE',29,0,'psoe','página PDF 131 · vivienda joven','Amplía financiación y beneficiarios del Bono de Alquiler Joven.'],
 ['BNG',0,0,'bng','página PDF 39 · fiscalidad','Propone aumentar la progresividad del IRPF para las rentas altas.'],
 ['BNG',2,0,'bng','página PDF 35 · sanidad','Propone elevar la financiación sanitaria al menos a la media europea por habitante.'],
 ['BNG',9,0,'bng','página PDF 11 · soberanía política','Reclama competencias fiscales, laborales y de Seguridad Social para Galicia.'],
 ['BNG',25,0,'bng','página PDF 14 · inclusión','Reclama gestionar el ingreso mínimo vital en Galicia para agilizarlo. Se clasifica como apoyo a una gestión más accesible.'],
 ['EAJ-PNV',11,0,'pnv','página PDF 45 · vivienda','Propone vivienda pública de alquiler suficiente y atender emergencias sociales.'],
 ['Podemos',14,0,'podemos','página PDF 33 · salud','Defiende la interrupción del embarazo gratuita y segura en la red pública. Programa europeo, no de generales.'],
 ['Podemos',19,0,'podemos','páginas PDF 34–35 · salud mental','Propone financiación europea para incorporar la salud mental a la sanidad pública.'],
 ['Compromís',7,0,'compromis','medida 262','Amplía ayudas a rehabilitación y paneles solares de autoconsumo. Ámbito valenciano.'],
 ['Compromís',11,0,'compromis','medidas 243–245','Propone más de 5.000 viviendas de alquiler social y ampliar el parque público.'],
 ['Compromís',29,0,'compromis','medida 255','Amplía ayudas al alquiler para jóvenes y facilita el acceso a quienes cumplan los requisitos.'],
 ['PCTE',3,1,'pcte','página PDF 7 · punto 6','Defiende un sistema de enseñanza único y público; se interpreta como oposición a financiar una red privada concertada.'],
 ['PCTE',19,0,'pcte','página PDF 7 · punto 7','Propone una red de atención psicológica dentro del sistema sanitario público.'],
 ['Adelante Andalucía',11,0,'adelante','página PDF 6 · parque público','Propone incorporar los inmuebles de la SAREB al parque público de alquiler andaluz.'],
 ['Adelante Andalucía',19,0,'adelante','página PDF 5 · salud mental','Propone aumentar psicología, psiquiatría y enfermería especializada en el sistema público andaluz.'],
 ['Adelante Andalucía',27,0,'adelante','página PDF 6 · FP pública','Propone prácticas remuneradas en FP. El documento concreta esta etapa, no todas las prácticas universitarias.'],
 ['Nueva Canarias-BC',9,0,'nc','página PDF 13 · aeropuertos','Propone participar en la gestión de aeropuertos canarios. Apoyo territorial a mayor capacidad de decisión, limitado a ese ámbito.'],
 ['Nueva Canarias-BC',19,0,'ncMental','6/08/2023 · declaración de NC-BC recogida en elDiario.es','Pide mejorar las ratios de psicología en centros de salud. Fuente periodística, no programa electoral.'],
 ['Ciudadanos',3,0,'cs','Educación · punto 5','Defiende equiparar las condiciones de docentes de la concertada y la pública. Se interpreta como respaldo a mantener la concertada.'],
 ['Ciudadanos',12,0,'cs','Medioambiente · punto 2','Propone mantener la vida útil de las nucleares como respaldo en la transición.'],
 ['Ciudadanos',19,0,'cs','Sanidad · punto 2','Propone más inversión en salud mental, formación y plazas.']
];
for(const [name,index,answer,document,location,reason] of RESEARCH_POSITIONS){
 const party=PARTIES.find(p=>p.name===name);
 if(!party||party.positions[index])throw Error('No se puede incorporar evidencia: '+name+' / '+index);
 const url=RESEARCH_DOCUMENTS[document];
 const page=location.match(/^página PDF (\d+)/)?.[1];
 party.positions[index]={...evidence(answer,reason,url+(page?'#page='+page:''),name+' · '+party.period+' · '+location),reviewedAt:'2026-11-03'};
}
PARTIES.sort((a,b)=>a.name.localeCompare(b.name,'es'));
