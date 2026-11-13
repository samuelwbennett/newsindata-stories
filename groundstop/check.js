const fs=require("fs"),p=__dirname+"/";let S;
try{S=JSON.parse(fs.readFileSync(p+"status.json","utf8"))}catch(e){console.log("FAIL: status.json is not valid JSON: "+e.message);process.exit(1)}
const bad=[];const need=["updated","headline_status","now","now_label","moments","facts","status_html","compare_html","notknown_html","home_stat"];
need.forEach(k=>{if(S[k]==null||S[k]==="")bad.push("missing "+k)});
if(typeof S.now!=="number"||S.now<15.9||S.now>72)bad.push("now out of range");
if(S.lift!=null&&(typeof S.lift!=="number"||S.lift<15.9||S.lift>72))bad.push("lift out of range");
if(S.lift!=null&&S.now<S.lift)bad.push("now is before lift");
if(!Array.isArray(S.moments)||S.moments.length<3||S.moments[0][0]!==14)bad.push("moments must start at 14");
else for(let i=1;i<S.moments.length;i++){if(!(S.moments[i][0]>=S.moments[i-1][0]))bad.push("moments out of order at "+i);if(S.moments[i].length!==3)bad.push("moment "+i+" needs 3 parts")}
if(!Array.isArray(S.facts)||S.facts.length!==3)bad.push("facts must have 3 tiles");
if(!Array.isArray(S.home_stat)||S.home_stat.length!==2)bad.push("home_stat needs 2 parts");
const all=JSON.stringify(S);if(/<script|<style|onerror=|onclick=|javascript:/i.test(all))bad.push("script or style found");
if(/unprecedented|chaos|shocking|massive|staggering/i.test(all))bad.push("hype word found");
const built=fs.readFileSync(p+"embed.js","utf8");if(built.indexOf(JSON.stringify(S.updated))<0)bad.push("embed.js not rebuilt (run node groundstop/src/build.js)");
try{new Function(built)}catch(e){bad.push("embed.js does not parse")}
console.log(bad.length?"FAIL: "+bad.join("; "):"OK");process.exit(bad.length?1:0);
