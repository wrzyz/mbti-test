const fs=require("fs"); const path=require("path");
const code=fs.readFileSync("data.js","utf8");
const vm=require("vm");
const sb={window:{},console};
vm.createContext(sb);
vm.runInContext(code+"\nthis.QUESTION_BANK=QUESTION_BANK; this.CATEGORIES=CATEGORIES;", sb);
const bank=sb.QUESTION_BANK;
const sets=new Map();
let bad=0, salt=0, shortOpt=0;
for(const q of bank){
  if(!q||!q.text||!q.text.zh||!Array.isArray(q.options)||q.options.length!==4){bad++;continue;}
  const vals=q.options.map(o=>o&&o.value).filter(Boolean);
  const poles=new Set(vals);
  if(poles.size<2) bad++;
  if(q.options.some(o=>!(o&&o.label&&o.label.zh))) bad++;
  const key=q.options.map(o=>(o.label&&o.label.zh)||"").join("||");
  sets.set(key,(sets.get(key)||0)+1);
  if(/回应\d+/.test(JSON.stringify(q))) salt++;
  if(q.options.some(o=>((o.label&&o.label.zh)||"").length<4)) shortOpt++;
}
const multi=[...sets.values()].filter(v=>v>1).length;
const topics={};
for(const q of bank) topics[q.topic]=(topics[q.topic]||0)+1;
console.log(JSON.stringify({n:bank.length,bad,dupOptionSets:multi,salt,shortOpt,topics,fileMB:(fs.statSync("data.js").size/1024/1024).toFixed(2)},null,2));
const sample=bank.filter((_,i)=>i%1500===0).slice(0,5);
for(const q of sample){
  console.log("---",q.id,q.axis,q.topic);
  console.log("Q:", q.text.zh);
  console.log("A:", q.options.map(o=>o.value+":"+o.label.zh).join(" | "));
  console.log("金句:", q.quote&&q.quote.zh);
}
