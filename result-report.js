// El correo y los porcentajes solo se envían tras el consentimiento explícito del visitante.
const ResultReport=(()=>{
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function html(){return `<section class="result-report"><div class="eyebrow">Tu resumen</div><h3>Compara tus resultados y recíbelos por correo</h3><p>La tabla muestra el test completo de 30 preguntas. Las posiciones sin datos no se consideran desacuerdos. Un porcentaje bajo puede deberse a una cobertura limitada.</p><div class="comparison-scroll" tabindex="0" role="region" aria-label="Tabla comparativa de resultados"><table class="comparison-table"><caption>Comparación de partidos · test completo</caption><thead><tr><th scope="col">Partido</th><th scope="col">Porcentaje sobre 30</th><th scope="col">Coincidencias</th><th scope="col">Preguntas comparables</th><th scope="col">Sin datos del partido</th></tr></thead><tbody id="report-table-body"></tbody></table></div><form id="result-email-form"><label for="result-email">Tu correo electrónico</label><input id="result-email" type="email" name="email" autocomplete="email" maxlength="254" placeholder="nombre@ejemplo.com" required><label class="email-consent"><input id="result-email-consent" type="checkbox" required><span>Autorizo el envío de esta tabla de resultados políticos al correo indicado. Entiendo que el proveedor de correo tratará mi dirección y el resumen para entregarlo.</span></label><p class="note">Solo para este envío. Voto Claro no guarda tu dirección ni la tabla en su base de datos y no te suscribe a publicidad. Tu proveedor de correo conservará el mensaje según sus condiciones.</p><button class="primary" id="send-result-email" type="submit" disabled>Enviarme mis resultados</button><p id="result-email-status" role="status" aria-live="polite">Comprobando disponibilidad del envío automático…</p></form></section>`}
 async function bind(getReport){
  const body=document.getElementById('report-table-body'),form=document.getElementById('result-email-form'),status=document.getElementById('result-email-status'),button=document.getElementById('send-result-email');if(!body||!form)return;
  const report=getReport();body.innerHTML=report.rows.map(r=>`<tr><th scope="row">${escape(r.name)}</th><td>${r.percent===null?'Pendiente / sin comparación':formatPercent(r.percent)+' %'}</td><td>${r.matches}/${report.total}</td><td>${r.comparable}/${report.total}</td><td>${r.unverified??r.unknown??report.total}</td></tr>`).join('');
  let available=false;
  try{const response=await fetch('/api/email-status',{cache:'no-store'});const data=await response.json();available=response.ok&&data.available===true}catch{}
  if(!form.isConnected)return;
  button.disabled=!available;status.textContent=available?'El envío automático está disponible. Escribe tu correo y autoriza este envío.':'El envío automático aún no está conectado. Puedes consultar la tabla aquí; no se enviará ningún correo hasta configurar el servicio de Voto Claro.';
  form.addEventListener('submit',async event=>{
   event.preventDefault();if(!available||!form.reportValidity())return;
   button.disabled=true;status.textContent='Enviando tu tabla de resultados…';
   const latest=getReport();
   try{
    const response=await fetch('/api/email-results',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:document.getElementById('result-email').value.trim(),consent:document.getElementById('result-email-consent').checked,test:latest.test,total:latest.total,rows:latest.rows.map(r=>({name:r.name,matches:r.matches,comparable:r.comparable,unknown:r.unverified??r.unknown??latest.total}))})});
    const result=await response.json();if(!response.ok)throw Error(result.error||'No se ha podido enviar el correo.');
    status.textContent='El servicio de correo ha aceptado el envío. Revisa tu bandeja de entrada y la carpeta de spam.';form.reset();
   }catch(error){status.textContent=error.message||'No se ha podido confirmar el envío. Inténtalo más tarde.'}finally{button.disabled=false}
  });
 }
 return {html,bind};
})();
