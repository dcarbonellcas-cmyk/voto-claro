/* Solo recuentos agregados: no se envían respuestas a los tests ni identificadores. */
const Participation = (()=>{
 const labels={not_voting:'No quiero votar',undecided:'No tengo claro mi voto',dont_know:'No sé qué votar'};
 const key='voto-claro-participation-counted';
 let counted=false,busy=false;
 try{counted=sessionStorage.getItem(key)==='1'}catch{}
 async function record(choice){
  if(counted)return {state:'already_counted'};
  if(busy)return {state:'pending'};
  if(!Object.hasOwn(labels,choice))return {state:'error'};
  busy=true;
  try{
   const response=await fetch('/api/participation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({choice}),signal:AbortSignal.timeout(5000)});
   if(!response.ok)throw new Error('No disponible');
   const data=await response.json();
   if(!data.counts||!Number.isSafeInteger(data.total))throw new Error('Respuesta no válida');
   counted=true;try{sessionStorage.setItem(key,'1')}catch{}
   return {state:'saved'};
  }catch{return {state:'error'}}finally{busy=false}
 }
 async function render(container){
  container.innerHTML='<p role="status">Consultando estadísticas…</p>';
  try{
   const response=await fetch('/api/participation',{cache:'no-store',signal:AbortSignal.timeout(5000)});
   if(!response.ok)throw new Error('No disponible');
   const data=await response.json();
   if(!data.counts||!Number.isSafeInteger(data.total)||data.total<0||Object.keys(labels).some(k=>!Number.isSafeInteger(data.counts[k])||data.counts[k]<0)||Object.keys(labels).reduce((n,k)=>n+data.counts[k],0)!==data.total)throw new Error('Datos no válidos');
   container.innerHTML=`<p><strong>${data.total} respuestas registradas</strong></p>${Object.entries(labels).map(([k,label])=>{const count=data.counts[k],percent=data.total?Math.round(count/data.total*1000)/10:0;return `<div class="participation-row"><div><strong>${label}</strong><span>${count} · ${percent.toLocaleString('es-ES')} %</span></div><div class="match-bar" aria-hidden="true"><span style="width:${percent}%"></span></div></div>`}).join('')}${!data.total?'<p>Todavía no hay respuestas. No se han añadido datos de ejemplo.</p>':''}<p class="note">Se cuentan respuestas de inicio, no personas verificadas ni intención de voto representativa. Las dos opciones de duda no equivalen a afirmar que se vaya a votar. Solo se intenta registrar una respuesta por sesión de esta pestaña; otra pestaña o sesión puede volver a contar.</p>`;
  }catch{container.innerHTML='<p role="status">Las estadísticas compartidas no están disponibles en esta versión. No se ha sustituido el recuento real por datos locales ni de ejemplo.</p>'}
 }
 return {record,render};
})();
