const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const elements=new Map();
function element(){return {innerHTML:'',dataset:{},focus(){},scrollIntoView(){},setAttribute(){},addEventListener(){},querySelector(){return element()},querySelectorAll(){return []}}}
const context=vm.createContext({document:{getElementById:id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id)}},window:{scrollTo(){}},clearTimeout,setTimeout,candidateCatalog:()=>'',bindCandidateFilters(){}});
for(const file of ['questions.js','positions.js','expanded-positions.js','research-positions.js','party-logos.js','scoring.js','candidacies.js','advanced-data.js','election-options.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
vm.runInContext(`
if(GENERAL_SELECTION.length!==25||PARLIAMENT_QUESTIONS.length!==15)throw Error('Deben ser 25 + 15');
if(new Set(GENERAL_SELECTION).size!==25||GENERAL_SELECTION.some(i=>!questions[i]))throw Error('Selección general inválida');
if(new Set(PARLIAMENT_QUESTIONS.map(q=>q.id)).size!==15)throw Error('Votaciones duplicadas');
if(PARTIES.some(p=>p.positions.length!==questions.length))throw Error('Posiciones desalineadas');
if(ADVANCED_PARTIES.length!==19)throw Error('Referencias incompletas');
for(const q of PARLIAMENT_QUESTIONS){
 if(!q.explanation||!q.stage||!q.result||!q.date||!q.official.startsWith('https://')||!q.source.startsWith('https://'))throw Error('Falta contexto o fuente');
 if(Object.values(q.votes).some(a=>a!==null&&![0,1,2].includes(a)))throw Error('Voto inválido');
}
for(const p of PARTIES)for(const pos of p.positions.filter(Boolean))if(![0,1].includes(pos.answer)||!pos.reason||!pos.source||!pos.url.startsWith('https://'))throw Error('Evidencia incompleta');
PARTIES.push({name:'Fixture',positions:Array.from({length:questions.length},()=>({answer:0,url:'https://example.org',source:'Fixture'}))});
PARLIAMENT_QUESTIONS.forEach(q=>q.votes.Fixture=0);
`,context);
const source=fs.readFileSync('advanced.js','utf8').replace(/intro\(\);\s*\}\)\(\);\s*$/,'globalThis.testing={calculate,partyPosition,sourceRows,items,intro,quiz,results,recordCompletion,setAnswers:a=>{answers=a},setStep:i=>{step=i},setProvince:p=>{province=p}};\n})();');
vm.runInContext(source,context);
const t=context.testing;
t.setAnswers(Array(40).fill(0));assert.equal(t.calculate({id:'Fixture'},'all').percent,100);
t.setAnswers([...Array(7).fill(0),...Array(33).fill(1)]);assert.equal(t.calculate({id:'Fixture'},'all').percent,17.5);
t.setAnswers(Array(40).fill(0));assert.equal(t.calculate({id:'Fixture'},'votes').percent,37.5);
assert.equal(t.calculate({id:'Fixture'},'votes').total,15);
assert.equal(t.calculate({id:'NoData'},'all').percent,null);
t.setAnswers(Array(40).fill(null));assert.equal(t.calculate({id:'Fixture'},'all').percent,null);
assert.equal(t.calculate({id:'Fixture'},'all').unanswered,40);
t.setAnswers(Array(40).fill(2));assert.equal(t.calculate({id:'Fixture'},'all').total,15);
const arts=t.items.find(q=>q.id==='artisticas');assert.equal(t.partyPosition({id:'VOX'},arts),null);assert.equal(t.partyPosition({id:'PP'},arts).answer,2);
assert.equal(t.partyPosition({id:'Podemos'},t.items.find(q=>q.id==='clientela')),null);
assert.ok(t.partyPosition({id:'CC'},t.items.find(q=>q.original===16)));
for(const id of ['PACMA','Compromís','Más Madrid','PCTE','Adelante Andalucía','Nueva Canarias-BC','Ciudadanos']){assert.ok(t.items.some(q=>q.kind==='general'&&t.partyPosition({id},q)));assert.ok(t.items.filter(q=>q.kind==='vote').every(q=>t.partyPosition({id},q)===null))}
t.setAnswers(Array(40).fill(0));assert.match(t.sourceRows(t.calculate({id:'VOX'},'all')),/Voto dividido: 32 en contra/);
t.intro();assert.match(elements.get('app').innerHTML,/<strong>25<\/strong>/);
for(let i=0;i<40;i++){t.setStep(i);t.quiz();assert.ok(elements.get('app').innerHTML.includes(`${i+1} de 40`))}
t.results();assert.match(elements.get('app').innerHTML,/Revisar o cambiar mis 40 respuestas/);assert.match(elements.get('app').innerHTML,/Compromís/);
const home=fs.readFileSync('app.js','utf8');assert.doesNotMatch(home,/Test básico|function quiz\(/);assert.match(home,/location.replace\('avanzado.html'\)/);
for(const page of ['index.html','avanzado.html']){const html=fs.readFileSync(page,'utf8');for(const [,path] of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|svg))/g))assert.ok(fs.existsSync(path),path)}
console.log('OK: 25 generales + 15 votaciones; base 40, omisiones, abstenciones, voto dividido, referencias propias, 40 pantallas y resultados.');

// La portada utiliza la misma selección y conserva las rutas de entrada.
vm.runInContext("globalThis.location={hash:'#inicio',replace:url=>{globalThis.redirected=url}};window.addEventListener=()=>{};document.addEventListener=()=>{}",context);
vm.runInContext(home,context);
assert.match(elements.get('app').innerHTML,/25 preguntas generales y 15 votaciones/);
for(const hash of ['#voto-indeciso','#no-se-que-votar']){context.location.hash=hash;vm.runInContext('route()',context);assert.match(elements.get('app').innerHTML,/25 generales \+ 15 votaciones/);assert.doesNotMatch(elements.get('app').innerHTML,/Test básico/)}
context.location.hash='#test';vm.runInContext('route()',context);assert.equal(context.redirected,'avanzado.html');
console.log('OK: portada, las dos entradas al test y redirección del enlace antiguo.');

vm.runInContext(`
if(RESEARCH_POSITIONS.length!==26)throw Error('Ampliación documental incompleta');
for(const [name,index] of RESEARCH_POSITIONS){
 if(!GENERAL_SELECTION.includes(index))throw Error('Evidencia fuera del test');
 if(!PARTIES.find(p=>p.name===name)?.positions[index]?.reviewedAt)throw Error('Falta fecha de revisión');
}
for(const p of ADVANCED_PARTIES)if(!PARTY_LOGOS[p.id])throw Error('Falta logotipo: '+p.id);
`,context);
const logos=JSON.parse(fs.readFileSync('party-logos.json','utf8'));
for(const logo of Object.values(logos))assert.ok(fs.existsSync(logo.path),logo.path);
assert.equal(Object.keys(logos).length,19);
console.log('OK: 26 evidencias nuevas y 19 logotipos locales con atribución.');

vm.runInContext(`
if(CANDIDACY_TOTAL!==534||CANDIDACY_EXCLUDED!==21)throw Error('Recuento electoral inesperado');
if(CANDIDACIES.reduce((n,c)=>n+c.provinces.length,0)!==534)throw Error('Listas electorales duplicadas o ausentes');
if(ELECTION_OPTIONS.length!==21)throw Error('Falta una candidatura o coalición revisada');
if(ELECTION_OPTIONS.some(p=>!p.entries.length||!p.provinces.length))throw Error('Opción no proclamada');
if(ELECTION_OPTIONS.some(p=>['Sumar','Más Madrid','Compromís','CC','UPN','Nueva Canarias-BC','Ciudadanos'].includes(p.id)))throw Error('Referencia histórica presentada como opción electoral');
if(ELECTION_OPTIONS.some(p=>p.coalition&&(p.sourceName||p.voteReference)))throw Error('Una coalición tiene una referencia automática a un partido o a sus votos');
if(electionOptionsForProvince('Navarra').some(p=>['PP','Bildu'].includes(p.id)))throw Error('Papeleta individual inexistente en Navarra');
for(const id of ['UPN-PP','EH-ERC'])if(!electionOptionsForProvince('Navarra').some(p=>p.id===id))throw Error('Falta coalición navarra');
if(electionOptionsForProvince('Barcelona').some(p=>p.id==='PACMA'))throw Error('PACMA no proclamada en Barcelona');
if(electionOptionsForProvince('Teruel').some(p=>p.id==='FA'))throw Error('FA no se presenta en Teruel');
for(const name of ['Alicante','Castellón','Valencia'])if(electionOptionsForProvince(name).some(p=>p.id==='Podemos'))throw Error('Podemos va en coalición en Valencia');
for(const name of ['Las Palmas','Santa Cruz De Tenerife'])if(electionOptionsForProvince(name).some(p=>p.id==='Podemos'))throw Error('Podemos va en UPC en Canarias');
`,context);
const getOption=id=>vm.runInContext('ELECTION_OPTIONS.find(p=>p.id==='+JSON.stringify(id)+')',context);
t.setAnswers(Array(40).fill(0));
const sumar={id:'Sumar'};
for(const [id,ownGeneral] of [['FA',[11,30]],['AraMés-FA',[1]]]){
 const option=getOption(id);
 const result=t.calculate(option,'all');
 for(const row of result.rows){
  const historical=t.partyPosition(sumar,row.q);
  if(row.q.kind==='general'&&ownGeneral.includes(row.q.original)){
   assert.ok(row.pos);
   assert.equal(row.pos.component,undefined);
  }else{
   assert.equal(row.pos?.answer,historical?.answer);
   if(historical)assert.match(row.pos.component,/^Sumar/);
  }
 }
 assert.equal(result.componentSources,23);
 assert.equal(t.calculate(option,'votes').total,15);
 assert.match(t.sourceRows(result),/Referencia histórica de Sumar \(grupo parlamentario\)/);
}
const frontValencia=t.calculate(getOption('Front Valencià'),'all');
assert.equal(frontValencia.componentSources,7);
assert.equal(frontValencia.matches,8);
assert.equal(frontValencia.percent,20);
assert.match(t.sourceRows(frontValencia),/Referencia histórica de Compromís/);
assert.equal(t.calculate(getOption('Front Valencià'),'votes').percent,null);
for(const id of ['CC-1CAN','UPC','PSC','D21']){
 assert.ok(t.calculate(getOption(id),'all').percent>0);
 assert.equal(t.calculate(getOption(id),'votes').percent,null);
}
for(const id of ['UPN-PP','EH-ERC'])assert.equal(t.calculate(getOption(id),'all').percent,null);
t.results();
const resultHtml=elements.get('app').innerHTML;
assert.match(resultHtml,/<h3>Frente Amplio<\/h3>/);
assert.match(resultHtml,/<h3>AraMés–Front Ampli<\/h3>/);
assert.match(resultHtml,/<h3>Compromís: Front Valencià<\/h3>/);
assert.match(resultHtml,/assets\/party-logos\/frente-amplio.svg/);
for(const name of ['Sumar (grupo parlamentario)','Más Madrid','Compromís','Coalición Canaria','UPN','Nueva Canarias-BC','Ciudadanos'])assert.ok(!resultHtml.includes('<h3>'+name+'</h3>'),name);
t.setProvince('Navarra');t.results();assert.match(elements.get('app').innerHTML,/<h3>UPN-PP<\/h3>/);assert.doesNotMatch(elements.get('app').innerHTML,/<h3>PP<\/h3>/);
t.setProvince('Barcelona');t.results();assert.doesNotMatch(elements.get('app').innerHTML,/<h3>PACMA<\/h3>/);
t.setProvince('Todas');
assert.ok(fs.existsSync('assets/party-logos/frente-amplio.svg'));
console.log('OK: opciones proclamadas, fuentes propias, referencias históricas identificadas, exclusiones y filtrado provincial.');

// El catálogo y las tarjetas usan la misma identidad electoral y el mismo filtro.
vm.runInContext(fs.readFileSync('party-catalog.js','utf8'),context);
for(const id of ['candidate-search','candidate-province'])context.document.getElementById(id).value='';
context.document.getElementById('candidate-pending').checked=false;
vm.runInContext("bindCandidateFilters(name=>{const p=electionOptionForName(name);if(!p)return null;const r=testing.calculate(p);return {...r,comparable:r.total}},'Navarra')",context);
assert.equal(elements.get('candidate-province').value,'Navarra');
assert.match(elements.get('candidate-list').innerHTML,/UPN-PP/);
assert.doesNotMatch(elements.get('candidate-list').innerHTML,/Referencia histórica de UPN/);
assert.ok(elements.get('candidate-list').innerHTML.includes('Comparación pendiente'));
vm.runInContext("bindCandidateFilters(name=>{const p=electionOptionForName(name);if(!p)return null;const r=testing.calculate(p);return {...r,comparable:r.total}},'Barcelona')",context);
assert.doesNotMatch(elements.get('candidate-list').innerHTML,/PARTIT ANIMALISTA|PARTIDO ANIMALISTA/);
console.log('OK: catálogo y resultados comparten candidaturas y provincia; sin listas no proclamadas.');

// Guardado desde la pantalla real de resultados, con sesión y reintentos.
(async()=>{
 const calls=[];
 context.crypto={randomUUID:()=>require('node:crypto').randomUUID()};
 context.Account={user:{username:'fixture'},ready:Promise.resolve(),request:async(path,data)=>{calls.push({path,data});return {id:'saved'}},login:async()=>null};
 t.setProvince('Todas');t.setAnswers(Array(40).fill(0));t.results();
 await elements.get('save-result').onclick();
 assert.equal(calls.length,1);assert.equal(calls[0].path,'results');
 const snapshot=calls[0].data.snapshot;
 assert.equal(snapshot.questions.length,40);assert.equal(snapshot.results.length,21);
 assert.equal(snapshot.province,'Todas');assert.equal(snapshot.scope,'all');
 const pp=snapshot.results.find(p=>p.id==='PP'),computed=t.calculate(getOption('PP'));
 assert.equal(pp.matches,computed.matches);assert.equal(pp.comparable,computed.total);
 await elements.get('save-result').onclick();assert.equal(calls.length,1,'No duplicar el mismo resultado');
 t.setProvince('Navarra');t.results();await elements.get('save-result').onclick();
 assert.equal(calls.length,2);assert.notEqual(calls[0].data.requestId,calls[1].data.requestId);
 assert.equal(calls[1].data.snapshot.province,'Navarra');
 context.Account.user=null;t.results();await elements.get('save-result').onclick();assert.equal(calls.length,2,'Cancelar acceso no debe guardar');
 const completions=[];context.fetch=async(path,options)=>{completions.push({path,options});return {ok:true}};
 await t.recordCompletion();await t.recordCompletion();assert.equal(completions.length,1);assert.equal(completions[0].options.credentials,'omit');
 const anonymous=JSON.parse(completions[0].options.body);assert.deepEqual(Object.keys(anonymous).sort(),['leaders','receipt']);assert.ok(anonymous.leaders.length);
 console.log('OK: recuento de finalización sin cuenta, respuestas ni cookies; sin duplicados.');
 console.log('OK: guardado voluntario, snapshot de 40 respuestas y puntuaciones, filtros y prevención de duplicados.');
})().catch(error=>{console.error(error);process.exitCode=1});
