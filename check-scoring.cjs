const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const elements=new Map();
function element(){return {innerHTML:'',dataset:{},focus(){},scrollIntoView(){},setAttribute(){},addEventListener(){},querySelector(){return element()},querySelectorAll(){return []}}}
const context=vm.createContext({document:{getElementById:id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id)}},window:{scrollTo(){}},clearTimeout,setTimeout,candidateCatalog:()=>'',bindCandidateFilters(){}});
for(const file of ['questions.js','positions.js','expanded-positions.js','research-positions.js','party-logos.js','scoring.js','advanced-data.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
vm.runInContext(`
if(GENERAL_SELECTION.length!==20||PARLIAMENT_QUESTIONS.length!==15)throw Error('Deben ser 20 + 15');
if(new Set(GENERAL_SELECTION).size!==20||GENERAL_SELECTION.some(i=>!questions[i]))throw Error('Selección general inválida');
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
const source=fs.readFileSync('advanced.js','utf8').replace(/intro\(\);\s*\}\)\(\);\s*$/,'globalThis.testing={calculate,partyPosition,sourceRows,items,intro,quiz,results,setAnswers:a=>{answers=a},setStep:i=>{step=i}};\n})();');
vm.runInContext(source,context);
const t=context.testing;
t.setAnswers(Array(35).fill(0));assert.equal(t.calculate({id:'Fixture'},'all').percent,100);
t.setAnswers([...Array(7).fill(0),...Array(28).fill(1)]);assert.equal(t.calculate({id:'Fixture'},'all').percent,20);
t.setAnswers(Array(35).fill(0));assert.equal(t.calculate({id:'Fixture'},'votes').percent,42.9);
assert.equal(t.calculate({id:'Fixture'},'votes').total,15);
assert.equal(t.calculate({id:'NoData'},'all').percent,null);
t.setAnswers(Array(35).fill(null));assert.equal(t.calculate({id:'Fixture'},'all').percent,null);
assert.equal(t.calculate({id:'Fixture'},'all').unanswered,35);
t.setAnswers(Array(35).fill(2));assert.equal(t.calculate({id:'Fixture'},'all').total,15);
const arts=t.items.find(q=>q.id==='artisticas');assert.equal(t.partyPosition({id:'VOX'},arts),null);assert.equal(t.partyPosition({id:'PP'},arts).answer,2);
assert.equal(t.partyPosition({id:'Podemos'},t.items.find(q=>q.id==='clientela')),null);
assert.ok(t.partyPosition({id:'CC'},t.items.find(q=>q.original===16)));
for(const id of ['PACMA','Compromís','Más Madrid','PCTE','Adelante Andalucía','Nueva Canarias-BC','Ciudadanos']){assert.ok(t.items.some(q=>q.kind==='general'&&t.partyPosition({id},q)));assert.ok(t.items.filter(q=>q.kind==='vote').every(q=>t.partyPosition({id},q)===null))}
t.setAnswers(Array(35).fill(0));assert.match(t.sourceRows(t.calculate({id:'VOX'},'all')),/Voto dividido: 32 en contra/);
t.intro();assert.match(elements.get('app').innerHTML,/<strong>20<\/strong>/);
for(let i=0;i<35;i++){t.setStep(i);t.quiz();assert.ok(elements.get('app').innerHTML.includes(`${i+1} de 35`))}
t.results();assert.match(elements.get('app').innerHTML,/Revisar o cambiar mis 35 respuestas/);assert.match(elements.get('app').innerHTML,/Compromís/);
const home=fs.readFileSync('app.js','utf8');assert.doesNotMatch(home,/Test básico|function quiz\(/);assert.match(home,/location.replace\('avanzado.html'\)/);
for(const page of ['index.html','avanzado.html']){const html=fs.readFileSync(page,'utf8');for(const [,path] of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|svg))/g))assert.ok(fs.existsSync(path),path)}
console.log('OK: 20 generales + 15 votaciones; base 35, omisiones, abstenciones, voto dividido, referencias propias, 35 pantallas y resultados.');

// La portada utiliza la misma selección y conserva las rutas de entrada.
vm.runInContext("globalThis.location={hash:'#inicio',replace:url=>{globalThis.redirected=url}};window.addEventListener=()=>{};document.addEventListener=()=>{}",context);
vm.runInContext(home,context);
assert.match(elements.get('app').innerHTML,/20 preguntas generales y 15 votaciones/);
for(const hash of ['#voto-indeciso','#no-se-que-votar']){context.location.hash=hash;vm.runInContext('route()',context);assert.match(elements.get('app').innerHTML,/20 generales \+ 15 votaciones/);assert.doesNotMatch(elements.get('app').innerHTML,/Test básico/)}
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
