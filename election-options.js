// Resultados electorales, separados de las referencias históricas documentales.
// Solo se muestran opciones con listas proclamadas en el BOE del 03/11/2026.
// Una coalición no hereda programas, votos ni logotipos de sus integrantes.
const ELECTION_REVIEW_DATE='05/11/2026';
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
function electionReferencePeriod(p){return p.sourceName?PARTIES.find(x=>x.name===p.sourceName)?.period??'Referencia documental':p.id==='FA'?'Propuesta propia de Frente Amplio · 28/10/2026':'Documentación propia de la candidatura pendiente'}

// Fuente propia de la nueva coalición. No se copian las posiciones de Sumar.
const ELECTION_GENERAL_POSITIONS={
 FA:{11:evidence(0,'Propone invertir hasta el 1 % del PIB en ampliar el parque público de vivienda asequible, con protección permanente, mediante construcción, adquisición y rehabilitación.','https://frenteamplio.info/noticias/frente-amplio-propone-impuesto-acumulacion-vivienda/','Frente Amplio · propuesta de vivienda · 28/10/2026 · apartado final')}
};
