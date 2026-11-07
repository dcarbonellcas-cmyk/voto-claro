// Catálogo electoral: solo listas proclamadas al Congreso.
function safeText(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function candidateCatalog(){
 const provinces=[...new Set(CANDIDACIES.flatMap(c=>c.provinces))].sort((a,b)=>a.localeCompare(b,'es'));
 return `<section class="candidate-catalog" id="catalogo-nacional"><div class="eyebrow">También sin escaños</div><h3>Todas las candidaturas proclamadas al Congreso</h3><p>${CANDIDACY_TOTAL} listas proclamadas: ${CANDIDACIES.length} denominaciones en ${provinces.length} circunscripciones. Incluye partidos, coaliciones y variantes territoriales; no son ${CANDIDACIES.length} partidos diferentes.</p><p>Fuente: BOE del ${CANDIDACY_DATE}. Se excluyen las ${CANDIDACY_EXCLUDED} listas al Congreso que ese documento marca como no proclamadas. <a href="${CANDIDACY_SOURCE}" target="_blank" rel="noopener noreferrer">Consultar candidaturas proclamadas ↗</a></p><p>Cada coalición se muestra con su denominación electoral. Cuando no tenemos fuentes propias, su comparación queda pendiente. Las posiciones de sus integrantes no se copian a la candidatura conjunta.</p><div class="catalog-filters"><label>Buscar candidatura<input id="candidate-search" type="search" placeholder="Por ejemplo: Frente Amplio, Compromís, PACMA…"></label><label>Provincia o circunscripción<select id="candidate-province"><option value="">Toda España</option>${provinces.map(p=>`<option value="${safeText(p)}">${safeText(p)}</option>`).join('')}</select></label></div><label class="catalog-pending"><input type="checkbox" id="candidate-pending"> Mostrar solo candidaturas sin porcentaje comparable</label><p id="candidate-count" role="status" aria-live="polite"></p><ul id="candidate-list" class="candidate-list"></ul></section>`;
}
function bindCandidateFilters(scoreCandidate=()=>null,initialProvince='Todas'){
 const search=document.getElementById('candidate-search'),province=document.getElementById('candidate-province'),pending=document.getElementById('candidate-pending');
 if(!search||!province)return;
 province.value=initialProvince==='Todas'?'':initialProvince;
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
 function update(){
  const rows=CANDIDACIES.filter(c=>normalize(c.name).includes(normalize(search.value.trim()))&&(!province.value||c.provinces.includes(province.value))&&(!pending.checked||scoreCandidate(c.name)?.percent==null));
  document.getElementById('candidate-count').textContent=`${rows.length} de ${CANDIDACIES.length} denominaciones proclamadas`;
  document.getElementById('candidate-list').innerHTML=rows.length?rows.map(c=>{
   const option=candidateReference(c.name),result=scoreCandidate(c.name);
   const status=!option||!result||result.documented===0?'Comparación pendiente: faltan posiciones propias documentadas.':`${result.percent===null?'Sin porcentaje: sin respuestas comparables':formatPercent(result.percent)+' % de coincidencias'} · ${result.matches} coincidencias de ${result.denominator} preguntas. Datos comparables: ${result.comparable}/${result.denominator}. ${option.sourceName?'Referencia histórica de '+safeText(option.sourceName)+'; no equivale a su programa actual.':'Consulta las fuentes y su ámbito en la tarjeta de la candidatura.'}`;
   return `<li><strong>${safeText(c.name)}</strong><p>${safeText(c.provinces.join(' · '))}</p><span class="note">${status}</span></li>`;
  }).join(''):'<li>No se han encontrado candidaturas con estos filtros.</li>';
 }
 search.addEventListener('input',update);province.addEventListener('change',update);pending.addEventListener('change',update);update();
 document.getElementById('jump-catalog')?.addEventListener('click',event=>{event.preventDefault();document.getElementById('catalogo-nacional').scrollIntoView({behavior:'smooth'});search.focus({preventScroll:true})});
}
function candidateReference(name){return electionOptionForName(name)}
