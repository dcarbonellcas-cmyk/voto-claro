// Resultados electorales, separados de las referencias históricas documentales.
// Solo se muestran opciones con listas proclamadas en el BOE del 03/11/2026.
// Las fuentes propias y las referencias históricas de integrantes se identifican por separado.
const ELECTION_REVIEW_DATE='07/11/2026';
const ELECTION_LOGOS={FA:{path:'assets/party-logos/frente-amplio.svg',source:'https://frenteamplio.info/',original:'https://frenteamplio.info/img/logo.svg'}};
const ELECTION_PROVINCES=[...new Set(CANDIDACIES.flatMap(c=>c.provinces))].sort((a,b)=>a.localeCompare(b,'es'));
function electionKey(name){return name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z0-9]/g,'')}
const ELECTION_DEFINITIONS=[
 {id:'PP',name:'PP',sourceName:'PP',voteReference:'PP',aliases:['PARTIDO POPULAR (PP)','PARTIT POPULAR / PARTIDO POPULAR (PP)']},
 {id:'PSOE',name:'PSOE',sourceName:'PSOE',voteReference:'PSOE',aliases:['PARTIDO SOCIALISTA OBRERO ESPAÑOL (PSOE)','PARTIDO DOS SOCIALISTAS DE GALICIA-PSOE (PSdeG-PSOE)','PARTIDO SOCIALISTA DE EUSKADI-EUSKADIKO EZKERRA (PSOE) PSE-EE (PSOE)','PARTIDO SOCIALISTA DE HUELVA (PSOE)','PARTIDO SOCIALISTA DE LAS ISLAS BALEARES (PSIB-PSOE)','PARTIDO SOCIALISTA DE NAVARRA-PSOE (PSN-PSOE)']},
 {id:'PSC',name:'PSC-PSOE',aliases:['PARTIT DELS SOCIALISTES DE CATALUNYA (PSC-PSOE) (PSC)']},
 {id:'VOX',name:'VOX',sourceName:'VOX',voteReference:'VOX',aliases:['VOX','VOX (VOX)']},
 {id:'Podemos',name:'Podemos',sourceName:'Podemos',voteReference:'Podemos',aliases:['PODEMOS','PODEMOS (PODEMOS)','PODEMOS (PAZ,CASA Y TRABAJO)']},
 {id:'ERC',name:'ERC',sourceName:'ERC',voteReference:'ERC',aliases:['ESQUERRA REPUBLICANA DE CATALUNYA (ERC)']},
 {id:'Junts',name:'Junts per Catalunya',sourceName:'Junts',voteReference:'Junts',aliases:['JUNTS PER CATALUNYA (JxCat)']},
 {id:'PNV',name:'EAJ-PNV',sourceName:'EAJ-PNV',voteReference:'PNV',aliases:['EUZKO ALDERDI JELTZALEA-PARTIDO NACIONALISTA VASCO (EAJ-PNV)']},
 {id:'Bildu',name:'EH Bildu',sourceName:'EH Bildu',voteReference:'Bildu',aliases:['EUSKAL HERRIA BILDU (EH BILDU)']},
 {id:'EH-ERC',name:'EH Bildu–ERC',coalition:true,aliases:['EUSKAL HERRIA BILDU-ESQUERRA REPUBLICANA DE CATALUNYA (EH BILDU-ERC)']},
 {id:'BNG',name:'BNG',sourceName:'BNG',voteReference:'BNG',aliases:['BLOQUE NACIONALISTA GALEGO (BNG)','BLOQUE NACIONALISTA GALEGO (B.N.G.)']},
 {id:'PACMA',name:'PACMA',sourceName:'PACMA',aliases:['PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE (PACMA)','PARTIT ANIMALISTA AMB EL MEDI AMBIENT (PACMA)']},
 {id:'Adelante Andalucía',name:'Adelante Andalucía',sourceName:'Adelante Andalucía',aliases:['ADELANTE ANDALUCÍA (ADELANTE ANDALUCÍA)']},
 {id:'PCTE',name:'PCTE',sourceName:'PCTE',aliases:['PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA (PCTE)']},
 {id:'FA',name:'Frente Amplio',coalition:true,aliases:['FRENTE AMPLIO (FA)','FRENTE AMPLIO ANDALUZ (FA)','FRENTE AMPLIO-FRONTE AMPLA (FRENTE AMPLIO-FRONTE AMPLA)','FRENTE AMPLIO-FRONTE ZABALA (FRENTE AMPLIO-FRONTE ZABALA)','FRENTE AMPLIU POR ASTURIES (FA)','COMUNS-FRONT AMPLI (COMUNS-FRONT AMPLI)','CHUNTA ARAGONESISTA-FRENTE AMPLIO ARAGÓN (CHA-IU-MS-FRENTE AMPLIO)']},
 {id:'Front Valencià',name:'Compromís: Front Valencià',coalition:true,aliases:['COMPROMÍS: FRONT VALENCIÀ (COMPROMIS-EUPV-PODEM-ERPV)']},
 {id:'UPC',name:'Unidad del Pueblo Canario',coalition:true,aliases:['UNIDAD DEL PUEBLO CANARIO UPC (NC-BC, PODEMOS, IU, SUMAR)']},
 {id:'CC-1CAN',name:'Coalición Canaria–Municipalistas Primero Canarias',coalition:true,aliases:['COALICIÓN CANARIA-MUNICIPALISTAS PRIMERO CANARIAS (CCa-1.ºCAN)','MUNICIPALISTAS PRIMERO CANARIAS-COALICIÓN CANARIA (1.ºCAN-CCa)']},
 {id:'UPN-PP',name:'UPN-PP',coalition:true,aliases:['UNIÓN DEL PUEBLO NAVARRO EN COALICIÓN CON EL PARTIDO POPULAR (UPN-PP)']},
 {id:'D21',name:'Democracia para el siglo 21',coalition:true,aliases:['DEMOCRACIA PARA EL SIGLO 21 (D21)']},
 {id:'AraMés-FA',name:'AraMés–Front Ampli',coalition:true,aliases:['ARAMÉS-FRONT AMPLI (ARAMÉS-EU-MS)']}
];
const ELECTION_OPTIONS=ELECTION_DEFINITIONS.map(definition=>{
 const keys=new Set(definition.aliases.map(electionKey));
 const entries=CANDIDACIES.filter(c=>keys.has(electionKey(c.name)));
 return {...definition,electoral:true,entries,provinces:[...new Set(entries.flatMap(c=>c.provinces))].sort((a,b)=>a.localeCompare(b,'es'))};
}).filter(p=>p.entries.length);
function electionOptionForName(name){const key=electionKey(name);return ELECTION_OPTIONS.find(p=>p.entries.some(c=>electionKey(c.name)===key))??null}
function electionOptionsForProvince(province='Todas'){return ELECTION_OPTIONS.filter(p=>province==='Todas'||p.provinces.includes(province))}
function electionReferencePeriod(p){
 if(p.sourceName)return PARTIES.find(x=>x.name===p.sourceName)?.period??'Referencia documental';
 if(ELECTION_COMPONENT_REFERENCES[p.id])return 'Propuestas propias y referencias históricas identificadas';
 return ELECTION_GENERAL_POSITIONS[p.id]?'Propuestas y declaraciones documentadas':'Documentación propia de la candidatura pendiente';
}

// Solo preguntas generales, con precedencia para las fuentes de la candidatura.
const CC_HOUSING='https://coalicioncanaria.org/cristina-valido-exige-limitar-la-compra-de-vivienda-por-extranjeros-para-garantizar-el-acceso-a-un-hogar-a-quienes-viven-en-canarias/';
const CC_AGREEMENT='https://coalicioncanaria.org/coalicion-canaria-primero-canarias-y-una-veintena-de-fuerzas-sellan-la-unidad-para-defender-canarias-en-madrid/';
const UPC_MANIFESTO='https://unidadpueblocanario.org/manifiesto';
const ELECTION_GENERAL_POSITIONS={
 FA:{
  11:evidence(0,'Propone ampliar el parque público de alquiler asequible y con protección permanente.','https://frenteamplio.info/noticias/frente-amplio-propone-impuesto-acumulacion-vivienda/','Frente Amplio · vivienda · 28/10/2026'),
  30:evidence(0,'Propone un pacto estatal para invertir en el ferrocarril y mejorar la frecuencia, la fiabilidad y la seguridad de cercanías.','https://frenteamplio.info/noticias/frente-amplio-pide-pacto-estado-tren-incluya-unificacion-adif-renfe/','Frente Amplio · Pacto de Estado por el Tren · 02/11/2026')
 },
 'Front Valencià':{
  31:evidence(0,'Su candidato Alberto Ibáñez anuncia que la candidatura promoverá la inclusión de los perros de caza en la ley.','https://compromis.net/36753/compromis-front-valencia-modificara-la-llei-de-benestar-animal-per-a-incloure-als-gossos-de-caca/','Compromís: Front Valencià · declaración de campaña · 06/11/2026')
 },
 'CC-1CAN':{
  9:evidence(0,'El acuerdo reclama el pleno desarrollo del Estatuto de Autonomía de Canarias. La posición se refiere a Canarias.',CC_AGREEMENT,'Declaración por la unidad canaria en Madrid · 17/10/2026'),
  11:evidence(0,'Su candidata propone un fondo estatal para ampliar la vivienda pública y asequible en Canarias.',CC_HOUSING,'CC–Primero Canarias · declaración de campaña · 04/11/2026'),
  15:evidence(0,'Su candidata propone dar a Canarias y a sus municipios cobertura legal para limitar el uso turístico de la vivienda donde exista presión residencial.',CC_HOUSING,'CC–Primero Canarias · declaración de campaña · 04/11/2026'),
  16:evidence(0,'El acuerdo defiende la gratuidad del transporte público en Canarias.',CC_AGREEMENT,'Declaración por la unidad canaria en Madrid · 17/10/2026')
 },
 UPC:{
  1:evidence(0,'Su manifiesto propone regular los precios del alquiler en zonas tensionadas de Canarias.',UPC_MANIFESTO,'Unidad del Pueblo Canario · manifiesto electoral 2026 · eje 5'),
  11:evidence(0,'Su manifiesto propone ampliar el parque público de vivienda con protección permanente.',UPC_MANIFESTO,'Unidad del Pueblo Canario · manifiesto electoral 2026 · eje 5')
 },
 D21:{
  1:evidence(0,'La cabeza de lista de la coalición defiende limitar temporalmente los alquileres en zonas tensionadas, con garantías para pequeños propietarios.','https://www.articulo14.es/politica/democracia-21-quien-es-miriam-gonzalez-y-con-que-partidos-concurre-al-29n-20261107.html','D21 · propuesta de su candidata recogida por Artículo 14 · 07/11/2026')
 },
 'AraMés-FA':{
  1:evidence(0,'La candidatura propone poner topes al precio del alquiler en Baleares.','https://mespermallorca.cat/noticies/aramesfront-ampli-presenta-viure-be-viure-aqui-com-a-lema-de-campanya-per-a-les-eleccions-del-29-de-novembre/','AraMés–Front Ampli · declaración de campaña · 06/11/2026')
 },
 PSC:{
  30:evidence(0,'Ferran Pedret defiende la ampliación de la inversión en la red de Rodalies en Cataluña.','https://www.socialistes.cat/actualitat/ferran-pedret-el-traspas-de-rodalies-es-una-oportunitat-per-crear-una-nova-cultura-organitzativa-i-un-nou-model-de-gestio-mes-modern/','PSC · declaración sobre Rodalies · 2026 · Cataluña')
 },
 PP:{
  30:evidence(0,'Propone un plan de choque para mejorar el servicio de cercanías en todas las comunidades autónomas.','https://www.pp.es/sites/default/files/documentos/programa_electoral_pp_23j_feijoo_2023.pdf','PP · generales 2023 · medida 88'),
  31:evidence(1,'Su grupo parlamentario pidió limitar el ámbito de la ley y mantener a los perros de caza bajo la normativa anterior.','https://www.pp.es/actualidad/articulos/gpp-destaca-gran-consenso-contra-ley-bienestar-animal-reflejado-las-657-enmiendas/','Grupo Popular · enmiendas de 2022 al proyecto de ley')
 },
 PSOE:{
  30:evidence(0,'Propone modernizar cercanías, ampliar sus redes y aumentar la inversión y el número de trenes.',SOURCE_URLS.psoe,'PSOE · generales 2023 · bloque II, Cercanías y Rodalies')
 },
 VOX:{
  31:evidence(1,'Su grupo parlamentario apoyó la enmienda que excluía a los perros de caza de la ley.','https://www.voxespana.es/grupo_parlamentario/actividad-parlamentaria/vox-explica-su-presencia-en-la-comision-que-debate-la-ley-de-bienestar-animal-apoyar-una-enmienda-que-excluye-a-los-perros-de-caza-de-la-ley-20221222','Grupo VOX · declaración de 22/12/2022')
 },
 PACMA:{
  31:evidence(0,'Su campaña pide modificar la ley estatal para incluir a los perros de caza.','https://pacma.es/notas-de-prensa/pacma-presenta-la-campana-psoe-y-sumar-los-dejan-atras-para-exigir-la-inclusion-de-los-perros-de-caza-en-la-ley-de-proteccion-animal/','PACMA · campaña de 23/10/2025')
 }
};

// Los programas y los votos del antiguo grupo se muestran con su autor original.
const ELECTION_COMPONENT_REFERENCES={
 FA:{general:'Sumar',votes:'Sumar'},
 'AraMés-FA':{general:'Sumar',votes:'Sumar'},
 'Front Valencià':{general:'Compromís'}
};
function electionGeneralPosition(p,index){
 const own=ELECTION_GENERAL_POSITIONS[p.id]?.[index];
 if(own)return own;
 if(p.sourceName)return PARTIES.find(x=>x.name===p.sourceName)?.positions[index]??null;
 const component=ELECTION_COMPONENT_REFERENCES[p.id]?.general;
 const position=PARTIES.find(x=>x.name===component)?.positions[index];
 return position?{...position,component}:null;
}
