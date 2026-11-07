const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [cfg,out,only]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1350}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>console.log('LOG',m.text()));
await p.goto('http://localhost:8766/render.html');const n=await p.evaluate(c=>go(c),cfg);console.log('frames',n);
fs.mkdirSync(out,{recursive:true});const N=only?+only:n;
for(let i=0;i<N;i++){const d=await p.evaluate(()=>{F.step();return document.getElementById('c').toDataURL('image/jpeg',0.92);});
 if(only===undefined||i%Math.max(1,Math.floor(N/1))===0||true)fs.writeFileSync(`${out}/f${String(i).padStart(4,'0')}.jpg`,Buffer.from(d.split(',')[1],'base64'));}
await b.close();})();
