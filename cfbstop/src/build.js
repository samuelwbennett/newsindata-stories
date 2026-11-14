// Builds cfbstop/embed.js from src/embed.src.js and map.json. Run: node cfbstop/src/build.js
const fs=require('fs'),p=require('path'),d=p.join(__dirname,'..');
const src=fs.readFileSync(p.join(__dirname,'embed.src.js'),'utf8'),map=fs.readFileSync(p.join(d,'map.json'),'utf8');
fs.writeFileSync(p.join(d,'embed.js'),src.replace('__MAP__',map));console.log('built',fs.statSync(p.join(d,'embed.js')).size,'bytes');
