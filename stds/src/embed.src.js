/* The News in Data: STIs ten years after the 2016 "all-time high" story. CDC STI Surveillance 2024 (provisional). */
(function(){
var Y=[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
var S=[
 {k:'cs',n:'Newborn (congenital) syphilis',u:'cases',v:[495,642,951,1330,1888,2168,2886,3773,3878,3941],c:'#B5462F'},
 {k:'ps',n:'Primary & secondary syphilis',u:'per 100,000',v:[7.4,8.6,9.4,10.7,11.9,12.6,16.2,17.7,15.8,12.2],c:'#C8962E'},
 {k:'gc',n:'Gonorrhea',u:'per 100,000',v:[123,145,170.6,178.3,187.8,204.5,214,194.4,179.5,159.8],c:'#007A55'},
 {k:'ct',n:'Chlamydia',u:'per 100,000',v:[475,494.7,524.6,537.5,551,476.7,495.5,495,492.2,445.7],c:'#4D6B5C'}
];
var INK='#13241B',SUB='#5F7268',G='#007A55',RUST='#B5462F',SERIF='"Times New Roman",Times,serif',SANS='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif';
function fmt(v,u){return u==='cases'?Math.round(v).toLocaleString('en-US')+' cases':(v%1?v.toFixed(1):v)+' per 100,000'}
function idx(s){return s.v.map(function(x){return x/s.v[0]*100})}

/* ---------- index chart, log scale ---------- */
function trend(o){
  o=o||{};var W=o.W||720,H=o.H||430,fs=o.fs||1,L=46*fs,R=W-(o.rpad||190)*fs,T=24*fs,B=H-34*fs,hl=o.hl;
  var lo=Math.log(80),hi=Math.log(900),X=function(i){return L+i/9*(R-L)},Yp=function(v){return B-(Math.log(v)-lo)/(hi-lo)*(B-T)},s='';
  [100,200,400,800].forEach(function(v){s+='<line x1="'+L+'" x2="'+R+'" y1="'+Yp(v)+'" y2="'+Yp(v)+'" stroke="'+(v===100?'#9FB1A7':'#E5EBE7')+'" stroke-width="'+(v===100?1.4:1)*fs+'"/><text x="'+(L-7*fs)+'" y="'+(Yp(v)+4*fs)+'" text-anchor="end" font-size="'+(12*fs)+'" fill="'+SUB+'">'+(v===100?'2015':(v/100)+'×')+'</text>'});
  Y.forEach(function(y,i){if(o.few&&i%3&&i!==9)return;s+='<text x="'+X(i)+'" y="'+(B+20*fs)+'" text-anchor="middle" font-size="'+(12*fs)+'" fill="'+SUB+'">'+(y===2024?'2024*':y)+'</text>'});
  s+='<text x="'+L+'" y="'+(T-10*fs)+'" font-size="'+(11.5*fs)+'" font-style="italic" fill="'+SUB+'">Multiple of the 2015 level (log scale)</text>';
  var ends=S.map(function(sr){var d=idx(sr);return {sr:sr,y:Yp(d[9]),d:d}});
  /* keep end labels from colliding */
  ends.sort(function(a,b){return a.y-b.y});for(var i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<34*fs)ends[i].y=ends[i-1].y+34*fs;
  ends.forEach(function(e){var sr=e.sr,d=e.d,on=!hl||hl===sr.k,p=d.map(function(v,i){return (i?'L':'M')+X(i).toFixed(1)+' '+Yp(v).toFixed(1)}).join('');
    s+='<g class="ln" data-k="'+sr.k+'" opacity="'+(on?1:.18)+'" style="cursor:pointer"><path d="'+p+'" fill="none" stroke="transparent" stroke-width="'+(16*fs)+'"/><path class="dr" d="'+p+'" fill="none" stroke="'+sr.c+'" stroke-width="'+((sr.k==='cs'?4:2.8)*fs)+'" stroke-linejoin="round" stroke-linecap="round"/>';
    s+='<circle cx="'+X(9)+'" cy="'+Yp(d[9])+'" r="'+(4.5*fs)+'" fill="'+sr.c+'"/>';
    var mult=d[9]/100,lab=mult>=1.995?(Math.round(mult*10)/10)+'×':(mult>=1?'+':'−')+Math.abs(Math.round(mult*100-100))+'%';
    s+='<text x="'+(X(9)+10*fs)+'" y="'+(e.y+1*fs)+'" font-size="'+(17*fs)+'" font-weight="700" fill="'+sr.c+'">'+lab+'</text><text x="'+(X(9)+10*fs)+'" y="'+(e.y+16*fs)+'" font-size="'+(12*fs)+'" fill="'+INK+'">'+(o.short?sr.n.replace(' (congenital)','').replace('Primary & secondary','P&S'):sr.n)+'</text></g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Change in U.S. STI rates since 2015. Newborn syphilis cases are about 8 times the 2015 level; primary and secondary syphilis is up 65%, gonorrhea up 30%, and chlamydia down 6%.">'+s+'</svg>'};
}

/* ---------- newborn syphilis: one dot per 10 cases ---------- */
function babies(o){
  o=o||{};var cs=S[0].v,per=10,cols=o.cols||6,r=(o.r||3.1),gap=r*2+1.6,colW=cols*gap,W=o.W||720,fs=o.fs||1,T=30*fs,B,s='',maxRows=Math.ceil(cs[9]/per/cols);
  var spacing=(W-40*fs)/10,H=T+maxRows*gap+58*fs;B=H-40*fs;
  cs.forEach(function(v,i){var n=Math.round(v/per),cx=20*fs+i*spacing+(spacing-colW)/2;
    s+='<g class="yr" data-i="'+i+'" style="cursor:pointer"><rect x="'+(cx-4)+'" y="'+T+'" width="'+(colW+8)+'" height="'+(B-T+34*fs)+'" fill="transparent"/>';
    for(var k=0;k<n;k++){var row=Math.floor(k/cols),col=k%cols;s+='<circle class="bd" style="--d:'+(row*14+i*20)+'ms" cx="'+(cx+col*gap+r).toFixed(1)+'" cy="'+(B-row*gap-r).toFixed(1)+'" r="'+r+'" fill="'+RUST+'"/>'}
    var top=B-Math.ceil(n/cols)*gap;
    s+='<text x="'+(cx+colW/2)+'" y="'+(top-7*fs)+'" text-anchor="middle" font-size="'+(12.5*fs)+'" font-weight="700" fill="'+INK+'">'+v.toLocaleString('en-US')+'</text>';
    s+='<text x="'+(cx+colW/2)+'" y="'+(B+20*fs)+'" text-anchor="middle" font-size="'+(12.5*fs)+'" fill="'+SUB+'">'+(Y[i]===2024?'2024*':Y[i])+'</text></g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Newborn syphilis cases in the U.S. by year, one dot per 10 cases: 495 in 2015 rising every year to 3,941 in 2024.">'+s+'</svg>'};
}

/* ---------- syphilis by stage and sex, change 2023 to 2024 ---------- */
var STG=[['Primary & secondary (newest infections)',-24.5,-13.8],['Early, past the first stages',-17.5,7.9],['Late or unknown duration',-5.2,4.1]];
function bySex(o){
  o=o||{};var W=o.W||640,fs=o.fs||1,RH=74*fs,T=34*fs,H=T+STG.length*RH+10*fs,mid=W*.5,sc=(W*(o.k||.42))/30,s='';
  s+='<text x="'+(mid-sc*15)+'" y="'+(T-14*fs)+'" text-anchor="middle" font-size="'+(13*fs)+'" font-weight="700" fill="'+SUB+'">← Fewer cases</text><text x="'+(mid+sc*15)+'" y="'+(T-14*fs)+'" text-anchor="middle" font-size="'+(13*fs)+'" font-weight="700" fill="'+SUB+'">More cases →</text>';
  s+='<line x1="'+mid+'" x2="'+mid+'" y1="'+(T-4*fs)+'" y2="'+(H-6*fs)+'" stroke="'+INK+'" stroke-width="'+(1.4*fs)+'"/>';
  STG.forEach(function(g,i){var y=T+i*RH;s+='<text x="'+mid+'" y="'+(y+14*fs)+'" text-anchor="middle" font-size="'+(14*fs)+'" font-weight="700" fill="'+INK+'" stroke="#fff" stroke-width="'+(4*fs)+'" paint-order="stroke">'+g[0]+'</text>';
    [[g[1],'Men','#4D6B5C',22],[g[2],'Women',RUST,46]].forEach(function(b){var w=Math.abs(b[0])*sc,x=b[0]<0?mid-w:mid,yy=y+b[3]*fs;
      s+='<rect x="'+x+'" y="'+yy+'" width="'+w+'" height="'+(18*fs)+'" rx="'+(3*fs)+'" fill="'+b[2]+'"/>';
      s+='<text x="'+(b[0]<0?x-6*fs:x+w+6*fs)+'" y="'+(yy+13.5*fs)+'" text-anchor="'+(b[0]<0?'end':'start')+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+b[2]+'">'+b[1]+' '+(b[0]>0?'+':'−')+Math.abs(b[0]).toFixed(1)+'%</text>'})});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Change in syphilis cases from 2023 to 2024 by stage and sex. Men fell in every stage. Women fell 13.8% for primary and secondary syphilis but rose 7.9% for early syphilis past the first stages and 4.1% for late syphilis.">'+s+'</svg>'};
}
window.NIDSTD={trend:trend,babies:babies,bySex:bySex,S:S,Y:Y};
if(window.NIDSTD_STATIC)return;

/* ---------- page ---------- */
var CSS='.nid-sd{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2.2em auto;position:relative}.nid-sd svg{display:block;width:100%;height:auto;overflow:visible}.nid-sd text{font-family:'+SERIF+'}'+
'.nid-sd .tg{display:flex;justify-content:center;gap:8px;margin:0 0 8px;flex-wrap:wrap}.nid-sd .tg button{font:600 14px/1 '+SANS+';border:1.5px solid '+G+';background:#fff;color:'+G+';border-radius:999px;padding:9px 13px;cursor:pointer;min-height:40px}.nid-sd .tg button[aria-pressed=true]{background:'+G+';color:#fff}'+
'.nid-sd .det{min-height:60px;margin:10px auto 0;max-width:640px;border-left:3px solid '+RUST+';background:#FBF5F3;border-radius:0 8px 8px 0;padding:10px 14px;line-height:1.4}.nid-sd .det .k{font:700 12px/1.3 '+SANS+';color:'+RUST+';letter-spacing:.05em;text-transform:uppercase;display:block;margin-bottom:3px}'+
'.nid-sd .bd{transition:opacity .35s ease;transition-delay:var(--d)}.nid-sd.pre .bd{opacity:0}'+
'@media (prefers-reduced-motion:no-preference){.nid-sd .dr{stroke-dasharray:2000;stroke-dashoffset:0;transition:stroke-dashoffset 1.6s ease}.nid-sd.pre .dr{stroke-dashoffset:2000}}'+
'.nid-sd button:focus-visible{outline:3px solid #7FC4A6;outline-offset:2px}';
function css(){if(document.getElementById('nid-sd-css'))return;var st=document.createElement('style');st.id='nid-sd-css';st.textContent=CSS;document.head.appendChild(st)}
function hardStyle(root){var D={ti:'font-family:"Times New Roman",Times,serif;font-size:clamp(1.3em,4.4vw,1.75em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center;color:#13241B;font-style:normal',su:'font-family:"Times New Roman",Times,serif;font-style:italic;font-size:clamp(.95em,2.6vw,1.08em);line-height:1.3;color:#5F7268;margin:0 auto .9em;text-align:center;max-width:600px'};
  [].forEach.call(root.querySelectorAll('p.ti,p.su'),function(p){D[p.classList.contains('ti')?'ti':'su'].split(';').forEach(function(d){var i=d.indexOf(':');if(i>0)p.style.setProperty(d.slice(0,i),d.slice(i+1),'important')})});
  [].forEach.call(root.querySelectorAll('.det'),function(p){p.style.setProperty('font-family','"Times New Roman",Times,serif','important')})}
function reveal(root){root.classList.add('pre');if(!('IntersectionObserver' in window)){root.classList.remove('pre');return}var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){setTimeout(function(){root.classList.remove('pre')},60);io.disconnect()}},{threshold:.3});io.observe(root)}
function act(n){try{window.dispatchEvent(new CustomEvent('nid:act',{detail:n}))}catch(e){}}
function narrow(root){return (root.clientWidth||700)<520}

function trendBlock(root){
  css();root.classList.add('nid-sd');var hl=null;
  root.innerHTML='<p class="ti">Ten Years After The Warnings</p><p class="su">Change since 2015 in U.S. STI rates, and in newborn syphilis cases. Tap a line or a button.</p><div class="tg" role="group" aria-label="Highlight an infection">'+S.map(function(s){return '<button type="button" data-k="'+s.k+'" aria-pressed="false">'+s.n.replace(' (congenital)','').replace('Primary & secondary','P&S')+'</button>'}).join('')+'</div><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function show(k){var s=S.filter(function(x){return x.k===k})[0],mx=Math.max.apply(0,s.v),pi=s.v.indexOf(mx);
    det.innerHTML='<span class="k">'+s.n+'</span>'+fmt(s.v[0],s.u)+' in 2015. '+(pi===9?'It has risen every year since, to '+fmt(s.v[9],s.u)+' in 2024.':'Peaked at '+fmt(mx,s.u)+' in '+Y[pi]+'; '+fmt(s.v[9],s.u)+' in 2024, '+Math.round((1-s.v[9]/mx)*100)+'% below the peak.')}
  function draw(){var n=narrow(root);cv.innerHTML=trend(n?{W:440,H:420,fs:1,rpad:120,few:1,short:1,hl:hl}:{hl:hl}).svg;
    [].forEach.call(cv.querySelectorAll('.ln'),function(g){g.addEventListener('click',function(){pick(g.getAttribute('data-k'))})})}
  function pick(k){hl=hl===k?null:k;[].forEach.call(root.querySelectorAll('.tg button'),function(b){b.setAttribute('aria-pressed',b.getAttribute('data-k')===hl?'true':'false')});draw();show(k);act('tap')}
  [].forEach.call(root.querySelectorAll('.tg button'),function(b){b.addEventListener('click',function(){pick(b.getAttribute('data-k'))})});
  draw();show('cs');reveal(root);var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}});
}
function babyBlock(root){
  css();root.classList.add('nid-sd');
  root.innerHTML='<p class="ti">Every Dot Is 10 Babies Born With Syphilis</p><p class="su">Reported congenital syphilis cases, United States. Tap a year.</p><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det'),cs=S[0].v;
  function show(i){det.innerHTML='<span class="k">'+(Y[i]===2024?'2024 (provisional)':Y[i])+'</span>'+cs[i].toLocaleString('en-US')+' babies were reported with congenital syphilis'+(i?', '+(cs[i]>cs[i-1]?'up ':'down ')+Math.abs(Math.round((cs[i]/cs[i-1]-1)*100))+'% from the year before.':'.')+(i===9?' That’s eight times the 2015 count.':'')}
  function draw(){var n=narrow(root);cv.innerHTML=babies(n?{W:440,cols:4,r:2.3,fs:.95}:{W:720,cols:6,r:3.1}).svg;
    [].forEach.call(cv.querySelectorAll('.yr'),function(g){g.addEventListener('click',function(){show(+g.getAttribute('data-i'));act('tap')})})}
  draw();show(9);reveal(root);var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}});
}
function sexBlock(root){
  css();root.classList.add('nid-sd');
  root.innerHTML='<p class="ti">Men’s Syphilis Cases Fell In Every Stage, Women’s Didn’t</p><p class="su">Change in reported syphilis cases from 2023 to 2024, by stage and sex.</p><div class="cv"></div>';
  var cv=root.querySelector('.cv');function draw(){cv.innerHTML=bySex(narrow(root)?{W:380,fs:1,k:.3}:{W:640}).svg}draw();
  var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}});
}
function boot(){var m={'nid-std-trend':trendBlock,'nid-std-babies':babyBlock,'nid-std-sex':sexBlock};Object.keys(m).forEach(function(id){var el=document.getElementById(id);if(el&&!el.__d){el.__d=1;m[id](el);hardStyle(el);try{new MutationObserver(function(){hardStyle(el)}).observe(el,{childList:true,subtree:true})}catch(e){}}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
