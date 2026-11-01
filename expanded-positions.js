// Ampliación revisada el 01/11/2026. Interpretación editorial de documentos anteriores.
// No se transfieren posiciones a coaliciones distintas ni se infieren respuestas por ideología.
const EXTRA_DOCUMENTS={
 ERC:'https://static.esquerra.cat/uploads/20230905/e2023-programa.pdf',
 BNG:'https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf',
 Bildu:'https://www.newtral.es/wp-content/uploads/2023/07/Programa-electoral-EHBildu-23j-2023.pdf',
 Junts:'https://img.beteve.cat/wp-content/uploads/2023/07/programa-junts-per-catalunya-eleccions-generals-2023.pdf',
 Podemos:'https://www.newtral.es/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf',
 PNV:'https://www.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j',
 UPN:'https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf',
 PACMA:'https://pacma.es/wp-content/uploads/2023/07/PACMA_PE_GENERALES_23J23.pdf'
};
function documentedParty(name,key,period,rows){
 return {name,period,positions:positions(rows.map(([index,answer,page,reason])=>[index,evidence(answer,reason,EXTRA_DOCUMENTS[key]+'#page='+page,`${name} · ${period} · página PDF ${page}`)]))};
}
PARTIES.push(
 documentedParty('ERC','ERC','Generales 2023',[
 [1,0,52,'Defiende limitar y reducir los precios del alquiler.'],
 [4,0,90,'Propone elevar el salario mínimo a 1.250 euros. El documento no cuantifica aquí el coste empresarial.'],
 [11,0,114,'Propone aumentar el parque protegido, prioritariamente de alquiler social.'],
 [17,0,92,'Propone cotización reducida para autónomos con facturación inferior al salario mínimo. Facturación e ingresos netos no son lo mismo.']]),
 documentedParty('BNG','BNG','Generales 2023',[
 [4,0,16,'Propone elevar el salario mínimo al 60 % del salario medio.'],
 [5,0,18,'Propone revalorizar anualmente las pensiones según el IPC real.'],
 [10,0,16,'Propone una jornada de 35 horas sin reducción salarial.'],
 [11,0,15,'Propone transferir viviendas de la SAREB para ampliar el parque público.']]),
 documentedParty('EH Bildu','Bildu','Generales 2023 · copia del programa en Newtral',[
 [1,0,2,'Reivindica la aprobación de la Ley de Vivienda con límites de alquiler en zonas tensionadas.'],
 [4,0,3,'Propone aumentar el salario mínimo a 1.200 euros.'],
 [9,0,4,'Reclama transferir competencias de Inspección de Trabajo y políticas pasivas de empleo.'],
 [10,0,3,'Propone reducir la jornada a 32 horas sin reducción salarial.']]),
 documentedParty('Junts','Junts','Generales 2023 · copia del programa en Betevé',[
 [4,0,63,'Considera insuficiente el salario mínimo de 2023 y propone un mínimo catalán superior.'],
 [11,0,95,'Propone ampliar el parque público de alquiler con más fondos y cesión de pisos de la SAREB.'],
 [9,0,95,'Reclama transferir a la Generalitat los fondos estatales de vivienda.']]),
 documentedParty('Podemos','Podemos','Europeas 2024 · copia del programa en Newtral',[
 [1,0,37,'Propone mecanismos europeos de control de alquileres vinculados a los ingresos del hogar. Es una propuesta europea, no un programa de generales.'],
 [11,0,37,'Propone ampliar parques públicos de alquiler asequible.'],
 [12,1,77,'Propone una hoja de ruta para abandonar la energía nuclear de fisión.'],
 [15,0,38,'Propone limitar los alojamientos turísticos al 2 % del total residencial.']]),
 documentedParty('EAJ-PNV','PNV','Generales 2023',[
 [5,0,33,'Defiende vincular las pensiones al IPC para mantener su poder adquisitivo.'],
 [9,0,6,'Defiende ampliar el autogobierno y completar las transferencias pendientes.']]),
 documentedParty('UPN','UPN','Generales 2023',[
 [3,0,4,'Defiende la educación concertada y eliminar limitaciones a la concertación según el modelo educativo.']]),
 documentedParty('PACMA','PACMA','Generales 2023',[
 [11,0,65,'Propone aumentar la vivienda social para compra y alquiler y acuerdos de alquiler social con entidades financieras.']]),
 {name:'Coalición Canaria',period:'Posiciones generales pendientes de documentar',positions:positions([])}
);
PARTIES.sort((a,b)=>a.name.localeCompare(b.name,'es'));
