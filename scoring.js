function calculateMatch(answers,positions){
 let matches=0,differences=0,unverified=0,skipped=0;
 for(let i=0;i<answers.length;i++){
  const p=positions[i];
  if(!p||!p.url||!p.source||![0,1].includes(p.answer)){unverified++;continue}
  if(![0,1].includes(answers[i])){skipped++;continue}
  if(answers[i]===p.answer)matches++;else differences++;
 }
 const comparable=matches+differences;
 return {matches,differences,comparable,unverified,skipped,denominator:answers.length,percent:comparable>0?fixedTestPercent(matches,answers.length):null};
}

function formatPercent(value){return value.toLocaleString("es-ES",{minimumFractionDigits:1,maximumFractionDigits:1})}

function fixedTestPercent(matches,total=20){return total>0?Math.round(matches/total*1000)/10:0}
