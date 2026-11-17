// node outages/check.js  -> prints OK if status.json is valid and within length limits
const fs=require('fs'),path=require('path');
const S=JSON.parse(fs.readFileSync(path.join(__dirname,'status.json'),'utf8'));
const err=[];const lim={status_html:650,notknown_html:1400,headline_status:140};
for(const k in lim){if(typeof S[k]!=='string')err.push(k+' missing');else if(S[k].length>lim[k])err.push(k+' is '+S[k].length+' chars, limit '+lim[k]);}
if(!/Eastern on Nov\. \d+, 2026$/.test(S.updated||''))err.push('updated must look like "1:05 p.m. Eastern on Nov. 17, 2026"');
if(typeof S.nsa_start!=='number')err.push('nsa_start must be a number');
if(S.nsa_end!==null&&(typeof S.nsa_end!=='number'||S.nsa_end<S.nsa_start))err.push('nsa_end must be null or a number after nsa_start');
if(S.nsa_end!==null&&!S.nsa_end_label)err.push('nsa_end_label needed when nsa_end is set');
if(!Array.isArray(S.outages)||!S.outages.length)err.push('outages missing');
(S.outages||[]).forEach(o=>{['key','name','sub','start','label','note'].forEach(k=>{if(o[k]==null)err.push(o.key+': '+k+' missing');});if(o.note&&o.note.length>420)err.push(o.key+': note over 420 chars');});
if(!Array.isArray(S.facts)||S.facts.length!==3)err.push('facts must have 3 tiles');
const all=JSON.stringify(S);if(/<script|<style|javascript:/i.test(all))err.push('no scripts or styles');
const bad=all.match(/\b(massive|unprecedented|chaos|shocking|meltdown)\b/i);if(bad)err.push('hype word: '+bad[0]);
console.log(err.length?'FAIL\n'+err.join('\n'):'OK');process.exit(err.length?1:0);
