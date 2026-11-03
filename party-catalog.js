// Catálogo al final del test. El cálculo se recibe del test avanzado.

function safeText(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function candidateCatalog(){
 const provinces=[...new Set(CANDIDACIES.flatMap(c=>c.provinces))].sort((a,b)=>a.localeCompare(b,'es'));
 return `<section class="candidate-catalog" id="catalogo-nacional"><div class="eyebrow">También sin escaños</div><h3>Todas las candidaturas presentadas al Congreso</h3><p>${CANDIDACIES.length} denominaciones en ${provinces.length} circunscripciones. Incluye partidos, coaliciones y agrupaciones. Algunas variantes territoriales se muestran por separado: no son ${CANDIDACIES.length} partidos diferentes.</p><p>Lista presentada el ${CANDIDACY_DATE}; no equivale a candidaturas definitivamente proclamadas. <a href="${CANDIDACY_SOURCE}" target="_blank" rel="noopener noreferrer">Consultar lista oficial del BOE ↗</a></p><p>Estar en esta lista no significa tener un porcentaje calculado. Las candidaturas sin una referencia propia contrastada quedan pendientes; no reciben un 0 % ni las respuestas de otra formación.</p><div class="catalog-filters"><label>Buscar partido o coalición<input id="candidate-search" type="search" placeholder="Por ejemplo: Compromís, Frente Amplio, PACMA…"></label><label>Provincia o circunscripción<select id="candidate-province"><option value="">Toda España</option>${provinces.map(p=>`<option value="${safeText(p)}">${safeText(p)}</option>`).join('')}</select></label></div><label class="catalog-pending"><input type="checkbox" id="candidate-pending"> Mostrar solo candidaturas sin datos suficientes</label><p id="candidate-count" role="status" aria-live="polite"></p><ul id="candidate-list" class="candidate-list"></ul></section>`;
}
function bindCandidateFilters(scoreCandidate=()=>null){
 const search=document.getElementById('candidate-search'),province=document.getElementById('candidate-province'),pending=document.getElementById('candidate-pending');
 if(!search||!province)return;
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
 function update(){
  const rows=CANDIDACIES.filter(c=>normalize(c.name).includes(normalize(search.value.trim()))&&(!province.value||c.provinces.includes(province.value))&&(!pending.checked||scoreCandidate(c.name)?.percent==null));
  document.getElementById('candidate-count').textContent=`${rows.length} de ${CANDIDACIES.length} denominaciones presentadas`;
  document.getElementById('candidate-list').innerHTML=rows.length?rows.map(c=>{const party=candidateReference(c.name);const result=scoreCandidate(c.name);return `<li><strong>${safeText(c.name)}</strong><p>${safeText(c.provinces.join(' · '))}</p><span class="note">${party&&result?`${result.percent===null?'Sin porcentaje: sin respuestas comparables':formatPercent(result.percent)+' % de coincidencias'} · ${result.matches} coincidencias de ${result.denominator} preguntas del test. Datos comparables: ${result.comparable}/${result.denominator}. Referencia histórica de ${safeText(party.name)}; no acredita su programa actual.`:'Porcentaje pendiente: falta una referencia propia documentada.'}</span></li>`}).join(''):'<li>No se han encontrado candidaturas con estos filtros.</li>';
 }
 search.addEventListener('input',update);province.addEventListener('change',update);pending.addEventListener('change',update);update();
 document.getElementById('jump-catalog')?.addEventListener('click',event=>{event.preventDefault();document.getElementById('catalogo-nacional').scrollIntoView({behavior:'smooth'});search.focus({preventScroll:true})});
}

function candidateReference(name){
 const aliases={
 'ADELANTE ANDALUCÍA (ADELANTE ANDALUCÍA)':'Adelante Andalucía',
 'PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA (PCTE)':'PCTE',
 'PARTIDO POPULAR (PP)':'PP','PARTIT POPULAR/PARTIDO POPULAR (PP)':'PP',
 'PARTIDO SOCIALISTA OBRERO ESPAÑOL (PSOE)':'PSOE',
 'VOX (VOX)':'VOX','VOX':'VOX',
 'PODEMOS (PODEMOS)':'Podemos','PODEMOS':'Podemos','PODEMOS (PAZ, CASA Y TRABAJO)':'Podemos',
 'ESQUERRA REPUBLICANA DE CATALUNYA (ERC)':'ERC',
 'JUNTS PER CATALUNYA (JxCat)':'Junts',
 'EUZKO ALDERDI JELTZALEA-PARTIDO NACIONALISTA VASCO (EAJ-PNV)':'EAJ-PNV',
 'EUSKAL HERRIA BILDU (EH Bildu)':'EH Bildu','EUSKAL HERRIA BILDU (EH BILDU)':'EH Bildu','EUSKAL HERRIA BILDU (EH-Bildu)':'EH Bildu',
 'BLOQUE NACIONALISTA GALEGO (BNG)':'BNG',
 'PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE (PACMA)':'PACMA','PARTIT ANIMALISTA AMB EL MEDI AMBIENT (PACMA)':'PACMA'
 };
 return PARTIES.find(p=>p.name===aliases[name])??null;
}
