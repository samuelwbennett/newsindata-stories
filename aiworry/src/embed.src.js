/* The News in Data: Americans are more concerned than excited about AI.
   Pew Research Center (U.S. trend 2021-2026, ages), Our World in Data roundup (Nov. 16, 2026),
   Ipsos AI Monitor 2025 and Stanford AI Index 2026 (countries). */
(function(){
var YR=[2021,2022,2023,2024,2025,2026];
var CON=[37,38,52,51,50,52],EQ=[45,46,36,38,38,37],EXC=[18,15,10,11,10,9];
var AGE=[['Ages 18–29',31,55],['30–49',34,51],['50–64',41,47],['65 and older',43,59]];
var ASK=[
 ['Pew, June 2026','More concerned than excited','More excited than concerned',52,9],
 ['Quinnipiac, March 2026','More harm than good in daily life','More good than harm',55,34],
 ['Ipsos, Oct. 2026','Extremely bad for society','Extremely good',17,2],
 ['Ipsos, Oct. 2026','Extremely bad for you personally','Extremely good',15,3]
];
/* Ipsos AI Monitor 2025: "Products and services using AI have more benefits than drawbacks" (% agree). China from Stanford AI Index 2026. */
var CTY=[['China',86.9],['30-country average',56],['Italy',53],['Spain',53],['Poland',50],['Germany',49],['Hungary',48],['Britain',43],['Netherlands',43],['Sweden',43],['United States',42],['France',41],['Belgium',41]];
var INK='#13241B',SUB='#5F7268',G='#007A55',RUST='#B5462F',PALE='#D5DFD9',SERIF='"Times New Roman",Times,serif',SANS='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif';
function ratio(i){return (CON[i]/EXC[i]).toFixed(1)}

/* ---------- stacked bars, one per survey year ---------- */
function trend(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,L=(o.lpad||58)*fs,R=W-(o.rpad||96)*fs,T=46*fs,RH=(o.rh||52)*fs,BH=30*fs,H=T+YR.length*RH+8*fs,s='',sc=(R-L)/100;
  s+='<text x="'+L+'" y="'+(16*fs)+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+RUST+'">More concerned</text>';
  s+='<text x="'+((L+R)/2)+'" y="'+(16*fs)+'" text-anchor="middle" font-size="'+(13*fs)+'" font-weight="700" fill="'+SUB+'">Equally</text>';
  s+='<text x="'+R+'" y="'+(16*fs)+'" text-anchor="end" font-size="'+(13*fs)+'" font-weight="700" fill="'+G+'">More excited</text>';
  s+='<text x="'+(R+12*fs)+'" y="'+(T-12*fs)+'" font-size="'+(11.5*fs)+'" font-style="italic" fill="'+SUB+'">Ratio</text>';
  YR.forEach(function(y,i){var yy=T+i*RH,last=i===YR.length-1,x=L,segs=[[CON[i],RUST,'#fff'],[EQ[i],PALE,INK],[EXC[i],G,'#fff']];
    s+='<g class="row" data-i="'+i+'" style="cursor:pointer"><rect x="0" y="'+(yy-6*fs)+'" width="'+W+'" height="'+RH+'" fill="transparent"/>';
    s+='<text x="'+(L-10*fs)+'" y="'+(yy+BH/2+5*fs)+'" text-anchor="end" font-size="'+(15*fs)+'" font-weight="'+(last?700:400)+'" fill="'+INK+'">'+y+'</text>';
    segs.forEach(function(g,k){var w=g[0]*sc;s+='<rect class="sg" style="--d:'+(i*90+k*60)+'ms" x="'+x.toFixed(1)+'" y="'+yy+'" width="'+Math.max(w-1.5*fs,0).toFixed(1)+'" height="'+BH+'" fill="'+g[1]+'"'+(last?'':' opacity=".82"')+'/>';
      if(w>26*fs)s+='<text class="sl" style="--d:'+(i*90+300)+'ms" x="'+(x+w/2).toFixed(1)+'" y="'+(yy+BH/2+5*fs)+'" text-anchor="middle" font-size="'+(14*fs)+'" font-weight="700" fill="'+g[2]+'">'+g[0]+'%</text>';x+=w});
    s+='<text x="'+(R+12*fs)+'" y="'+(yy+BH/2+6*fs)+'" font-size="'+((last?19:15)*fs)+'" font-weight="700" fill="'+(last?RUST:SUB)+'">'+ratio(i)+' to 1</text></g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Pew surveys of U.S. adults, 2021 to 2026. More concerned than excited about AI rose from 37% to 52%; more excited than concerned fell from 18% to 9%. The ratio rose from 2.1 to 1 to 5.8 to 1.">'+s+'</svg>'};
}

/* ---------- ages: slope 2021 -> 2026, more concerned ---------- */
function ages(o){
  o=o||{};var W=o.W||560,fs=o.fs||1,H=o.H||340,L=(o.lpad||150)*fs,R=W-(o.rpad||150)*fs,T=40*fs,B=H-26*fs,lo=25,hi=62,Y=function(v){return B-(v-lo)/(hi-lo)*(B-T)},s='',hl=o.hl==null?0:o.hl;
  s+='<text x="'+L+'" y="'+(T-18*fs)+'" text-anchor="middle" font-size="'+(15*fs)+'" font-weight="700" fill="'+SUB+'">2021</text><text x="'+R+'" y="'+(T-18*fs)+'" text-anchor="middle" font-size="'+(15*fs)+'" font-weight="700" fill="'+SUB+'">2026</text>';
  s+='<line x1="'+L+'" x2="'+L+'" y1="'+(T-6*fs)+'" y2="'+B+'" stroke="#E5EBE7" stroke-width="'+(1.5*fs)+'"/><line x1="'+R+'" x2="'+R+'" y1="'+(T-6*fs)+'" y2="'+B+'" stroke="#E5EBE7" stroke-width="'+(1.5*fs)+'"/>';
  var lab=function(arr,k){var p=arr.map(function(a,i){return {i:i,y:Y(a[k])}}).sort(function(a,b){return a.y-b.y});for(var j=1;j<p.length;j++)if(p[j].y-p[j-1].y<19*fs)p[j].y=p[j-1].y+19*fs;var m={};p.forEach(function(q){m[q.i]=q.y});return m};
  var l0=lab(AGE,1),l1=lab(AGE,2);
  AGE.forEach(function(a,i){var on=i===hl,c=on?RUST:'#9FB1A7',sw=(on?4:2.4)*fs;
    s+='<g class="ag" data-i="'+i+'" style="cursor:pointer"><line x1="'+L+'" y1="'+Y(a[1])+'" x2="'+R+'" y2="'+Y(a[2])+'" stroke="transparent" stroke-width="'+(18*fs)+'"/>';
    s+='<line class="dr" x1="'+L+'" y1="'+Y(a[1])+'" x2="'+R+'" y2="'+Y(a[2])+'" stroke="'+c+'" stroke-width="'+sw+'" stroke-linecap="round"/>';
    s+='<circle cx="'+L+'" cy="'+Y(a[1])+'" r="'+(5*fs)+'" fill="'+c+'"/><circle cx="'+R+'" cy="'+Y(a[2])+'" r="'+(5*fs)+'" fill="'+c+'"/>';
    s+='<text x="'+(L-12*fs)+'" y="'+(l0[i]+5*fs)+'" text-anchor="end" font-size="'+(14*fs)+'" font-weight="'+(on?700:400)+'" fill="'+(on?RUST:INK)+'">'+a[0]+' '+a[1]+'%</text>';
    s+='<text x="'+(R+12*fs)+'" y="'+(l1[i]+5*fs)+'" font-size="'+(14*fs)+'" font-weight="'+(on?700:400)+'" fill="'+(on?RUST:INK)+'">'+a[2]+'% '+(o.short?'':a[0].replace('Ages ',''))+'</text></g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Share of U.S. adults more concerned than excited about AI, 2021 and 2026, by age: 18 to 29, 31% to 55%; 30 to 49, 34% to 51%; 50 to 64, 41% to 47%; 65 and older, 43% to 59%.">'+s+'</svg>'};
}

/* ---------- no matter how you ask: negative vs positive ---------- */
function asks(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,RH=(o.rh||78)*fs,T=30*fs,H=T+ASK.length*RH,mid=W/2,sc=(W/2-(o.pad||70)*fs)/60,s='';
  s+='<text x="'+(mid-10*fs)+'" y="'+(14*fs)+'" text-anchor="end" font-size="'+(13*fs)+'" font-weight="700" fill="'+RUST+'">← Negative</text><text x="'+(mid+10*fs)+'" y="'+(14*fs)+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+G+'">Positive →</text>';
  s+='<line x1="'+mid+'" x2="'+mid+'" y1="'+(T-6*fs)+'" y2="'+H+'" stroke="'+INK+'" stroke-width="'+(1.3*fs)+'"/>';
  ASK.forEach(function(a,i){var y=T+i*RH,wn=a[3]*sc,wp=a[4]*sc,by=y+28*fs,bh=20*fs;
    s+='<text x="'+mid+'" y="'+(y+15*fs)+'" text-anchor="middle" font-size="'+(13.5*fs)+'" font-weight="700" fill="'+INK+'" stroke="#fff" stroke-width="'+(4*fs)+'" paint-order="stroke">'+a[0]+'</text>';
    s+='<rect class="sg" style="--d:'+(i*120)+'ms" x="'+(mid-wn)+'" y="'+by+'" width="'+wn+'" height="'+bh+'" rx="'+(2*fs)+'" fill="'+RUST+'"/>';
    s+='<rect class="sg" style="--d:'+(i*120+80)+'ms" x="'+mid+'" y="'+by+'" width="'+wp+'" height="'+bh+'" rx="'+(2*fs)+'" fill="'+G+'"/>';
    s+='<text x="'+(mid-wn-6*fs)+'" y="'+(by+15*fs)+'" text-anchor="end" font-size="'+(15*fs)+'" font-weight="700" fill="'+RUST+'">'+a[3]+'%</text>';
    s+='<text x="'+(mid+wp+6*fs)+'" y="'+(by+15*fs)+'" font-size="'+(15*fs)+'" font-weight="700" fill="'+G+'">'+a[4]+'%</text>';
    s+='<text x="'+(mid-8*fs)+'" y="'+(by+bh+15*fs)+'" text-anchor="end" font-size="'+(11.5*fs)+'" fill="'+SUB+'">'+a[1]+'</text><text x="'+(mid+8*fs)+'" y="'+(by+bh+15*fs)+'" font-size="'+(11.5*fs)+'" fill="'+SUB+'">'+a[2]+'</text>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Negative vs. positive answers in four 2026 surveys: Pew 52% more concerned vs. 9% more excited; Quinnipiac 55% more harm vs. 34% more good; Ipsos 17% extremely bad for society vs. 2% extremely good; Ipsos 15% extremely bad for you personally vs. 3% extremely good.">'+s+'</svg>'};
}

/* ---------- countries: Ipsos benefits vs drawbacks ---------- */
function world(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,L=(o.lpad||160)*fs,R=W-(o.rpad||60)*fs,T=34*fs,RH=(o.rh||30)*fs,H=T+CTY.length*RH+26*fs,sc=(R-L)/100,s='',hide=o.hide,g=o.guess;
  [0,25,50,75,100].forEach(function(v){var x=L+v*sc;s+='<line x1="'+x+'" x2="'+x+'" y1="'+(T-8*fs)+'" y2="'+(H-6*fs)+'" stroke="'+(v===50?'#9FB1A7':'#E5EBE7')+'" stroke-width="'+(v===50?1.4:1)*fs+'"'+(v===50?' stroke-dasharray="'+(4*fs)+' '+(3*fs)+'"':'')+'/><text x="'+x+'" y="'+(T-14*fs)+'" text-anchor="middle" font-size="'+(12*fs)+'" fill="'+SUB+'">'+v+'%</text>'});
  CTY.forEach(function(c,i){var y=T+i*RH+(i?16*fs:0),us=c[0]==='United States',cn=c[0]==='China',avg=i===1,col=cn?G:us?RUST:avg?'#7C8F85':'#A9BCB2',v=c[1],w=v*sc,bh=RH*.62;
    s+='<text x="'+(L-10*fs)+'" y="'+(y+bh/2+5*fs)+'" text-anchor="end" font-size="'+(14*fs)+'" font-weight="'+(us||cn?700:400)+'" font-style="'+(avg?'italic':'normal')+'" fill="'+(us?RUST:cn?G:INK)+'">'+c[0]+'</text>';
    if(cn&&hide){s+='<rect x="'+L+'" y="'+y+'" width="'+(R-L)+'" height="'+bh+'" rx="'+(2*fs)+'" fill="none" stroke="'+G+'" stroke-width="'+(1.2*fs)+'" stroke-dasharray="'+(4*fs)+' '+(3*fs)+'"/><text x="'+((L+R)/2)+'" y="'+(y+bh/2+5*fs)+'" text-anchor="middle" font-size="'+(13*fs)+'" font-weight="700" fill="'+G+'">?</text>';return}
    s+='<rect class="sg" style="--d:'+(i*45)+'ms" x="'+L+'" y="'+y+'" width="'+w+'" height="'+bh+'" rx="'+(2*fs)+'" fill="'+col+'"/>';
    s+='<text x="'+(L+w+6*fs)+'" y="'+(y+bh/2+5*fs)+'" font-size="'+(14*fs)+'" font-weight="700" fill="'+(us?RUST:cn?G:INK)+'">'+(cn?'87':Math.round(v))+'%</text>';
    if(cn&&g!=null){var gx=L+g*sc;s+='<line x1="'+gx+'" x2="'+gx+'" y1="'+(y-4*fs)+'" y2="'+(y+bh+4*fs)+'" stroke="'+INK+'" stroke-width="'+(2.5*fs)+'"/><text x="'+gx+'" y="'+(y+bh+19*fs)+'" text-anchor="middle" font-size="'+(11.5*fs)+'" font-weight="700" fill="'+INK+'">Your guess '+g+'%</text>'}});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Share saying AI products and services have more benefits than drawbacks, Ipsos 2025: China 87%, 30-country average 56%, Italy 53%, Spain 53%, Poland 50%, Germany 49%, Hungary 48%, Britain 43%, Netherlands 43%, Sweden 43%, United States 42%, France 41%, Belgium 41%.">'+s+'</svg>'};
}
window.NIDAIW={trend:trend,ages:ages,asks:asks,world:world};
if(window.NIDAIW_STATIC)return;

/* ---------- page ---------- */
var CSS='.nid-aw{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2.2em auto;position:relative}.nid-aw svg{display:block;width:100%;height:auto;overflow:visible}.nid-aw text{font-family:'+SERIF+'}'+
'.nid-aw .det{min-height:56px;margin:10px auto 0;max-width:640px;border-left:3px solid '+RUST+';background:#FBF5F3;border-radius:0 8px 8px 0;padding:10px 14px;line-height:1.4}.nid-aw .det .k{font:700 12px/1.3 '+SANS+';color:'+RUST+';letter-spacing:.05em;text-transform:uppercase;display:block;margin-bottom:3px}'+
'.nid-aw .gs{max-width:560px;margin:6px auto 14px;text-align:center;font-family:'+SANS+'}.nid-aw .gs input{width:100%;accent-color:'+G+'}.nid-aw .gs .gv{font:700 34px/1.1 '+SERIF+';color:'+G+';margin:6px 0}'+
'.nid-aw .gs button{font:600 15px/1 '+SANS+';border:0;background:'+G+';color:#fff;border-radius:999px;padding:12px 20px;cursor:pointer;min-height:44px;margin:6px 4px 0}.nid-aw .gs button.sk{background:#fff;color:'+G+';border:1.5px solid '+G+'}'+
'.nid-aw .sg{transition:transform .7s cubic-bezier(.2,.8,.2,1),opacity .5s ease;transition-delay:var(--d);transform-box:fill-box;transform-origin:left center}.nid-aw.pre .sg{transform:scaleX(0);opacity:0}.nid-aw .sl{transition:opacity .4s ease;transition-delay:var(--d)}.nid-aw.pre .sl{opacity:0}'+
'@media (prefers-reduced-motion:no-preference){.nid-aw .dr{stroke-dasharray:600;stroke-dashoffset:0;transition:stroke-dashoffset 1.2s ease}.nid-aw.pre .dr{stroke-dashoffset:600}}'+
'@media (prefers-reduced-motion:reduce){.nid-aw .sg,.nid-aw .sl{transition:none}}'+
'.nid-aw button:focus-visible,.nid-aw input:focus-visible{outline:3px solid #7FC4A6;outline-offset:2px}';
function css(){if(document.getElementById('nid-aw-css'))return;var st=document.createElement('style');st.id='nid-aw-css';st.textContent=CSS;document.head.appendChild(st)}
function hardStyle(root){var D={ti:'font-family:"Times New Roman",Times,serif;font-size:clamp(1.3em,4.4vw,1.75em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center;color:#13241B;font-style:normal',su:'font-family:"Times New Roman",Times,serif;font-style:italic;font-size:clamp(.95em,3vw,1.05em);line-height:1.35;margin:0 auto .9em;text-align:center;color:#5F7268;max-width:600px',q:'font-family:"Times New Roman",Times,serif;font-size:1.15em;font-weight:700;line-height:1.3;margin:0 0 .4em;text-align:center;color:#13241B;font-style:normal'};
  ['ti','su','q'].forEach(function(c){[].forEach.call(root.querySelectorAll('p.'+c),function(p){D[c].split(';').forEach(function(d){var i=d.indexOf(':');if(i>0)p.style.setProperty(d.slice(0,i),d.slice(i+1),'important')})})});
  [].forEach.call(root.querySelectorAll('.det'),function(p){p.style.setProperty('font-family','"Times New Roman",Times,serif','important')})}
function reveal(root){root.classList.add('pre');if(!('IntersectionObserver' in window)){root.classList.remove('pre');return}var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){setTimeout(function(){root.classList.remove('pre')},60);io.disconnect()}},{threshold:.3});io.observe(root)}
function act(n){try{window.dispatchEvent(new CustomEvent('nid:act',{detail:n}))}catch(e){}}
function narrow(root){return (root.clientWidth||700)<520}
function resize(root,draw){var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}})}

function trendBlock(root){
  css();root.classList.add('nid-aw');
  root.innerHTML='<p class="ti">Concern Has Outrun Excitement Five To One</p><p class="su">U.S. adults asked whether the increased use of AI in daily life makes them feel more concerned than excited, more excited than concerned, or both equally. Tap a year.</p><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function show(i){det.innerHTML='<span class="k">'+YR[i]+(i===0?' (Nov. 1–7)':i===5?' (June 22–28)':'')+'</span>'+CON[i]+'% more concerned, '+EQ[i]+'% equally, '+EXC[i]+'% more excited: '+ratio(i)+' concerned for every one excited.'+(i===2?' The first Pew reading after ChatGPT’s public release in November 2022.':'')}
  function draw(){var n=narrow(root);cv.innerHTML=trend(n?{W:440,fs:.92,lpad:46,rpad:84,rh:50}:{}).svg;
    [].forEach.call(cv.querySelectorAll('.row'),function(g){g.addEventListener('click',function(){show(+g.getAttribute('data-i'));act('tap')})})}
  draw();show(5);reveal(root);resize(root,draw);
}
function ageBlock(root){
  css();root.classList.add('nid-aw');var hl=0;
  root.innerHTML='<p class="ti">Under-30s Went From The Least Worried Group To A Worried Majority</p><p class="su">Share of U.S. adults more concerned than excited about AI, by age. Tap a line.</p><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det'),EX=[[25,11],[21,12],[13,8],[11,4]];
  function show(i){var a=AGE[i];det.innerHTML='<span class="k">'+a[0]+'</span>More concerned than excited: '+a[1]+'% in 2021, '+a[2]+'% in 2026. More excited than concerned: '+EX[i][0]+'% in 2021, '+EX[i][1]+'% in 2026.'}
  function draw(){var n=narrow(root);cv.innerHTML=ages(n?{W:420,H:320,lpad:128,rpad:74,short:1,hl:hl}:{W:600,H:340,hl:hl}).svg;
    [].forEach.call(cv.querySelectorAll('.ag'),function(g){g.addEventListener('click',function(){hl=+g.getAttribute('data-i');draw();show(hl);act('tap')})})}
  draw();show(0);reveal(root);resize(root,draw);
}
function askBlock(root){
  css();root.classList.add('nid-aw');
  root.innerHTML='<p class="ti">No Matter How You Ask</p><p class="su">The most negative and most positive answers in four U.S. surveys from 2026.</p><div class="cv"></div>';
  var cv=root.querySelector('.cv');function draw(){cv.innerHTML=asks(narrow(root)?{W:420,fs:.95,pad:40,rh:80}:{}).svg}
  draw();reveal(root);resize(root,draw);
}
function worldBlock(root){
  css();root.classList.add('nid-aw');var guess=null,shown=false;
  root.innerHTML='<p class="ti">Where AI Looks Better Than It Does In America</p><p class="su">Share agreeing that products and services using AI have more benefits than drawbacks, 2025.</p><div class="gs"><p class="q">First, guess: what share of people in China agree?</p><div class="gv">50%</div><input type="range" min="0" max="100" value="50" aria-label="Your guess for China, in percent"><div><button type="button" class="go">Show me</button><button type="button" class="sk">Skip</button></div></div><div class="cv"></div><div class="det" aria-live="polite" style="display:none"></div>';
  var cv=root.querySelector('.cv'),gs=root.querySelector('.gs'),inp=gs.querySelector('input'),gv=gs.querySelector('.gv'),det=root.querySelector('.det');
  inp.addEventListener('input',function(){gv.textContent=inp.value+'%'});
  function draw(){var n=narrow(root);cv.innerHTML=world(Object.assign(n?{W:420,fs:.95,lpad:128,rpad:40,rh:30}:{},{hide:!shown,guess:shown?guess:null})).svg}
  function go(g){guess=g;shown=true;gs.style.display='none';root.classList.add('pre');draw();setTimeout(function(){root.classList.remove('pre')},60);
    det.style.display='';det.innerHTML='<span class="k">China: 87%</span>'+(g!=null?'You guessed '+g+'%, '+(Math.abs(g-87)<=5?'within 5 points. ':(g<87?(87-g)+' points too low. ':(g-87)+' points too high. ')):'')+'That is about twice the U.S. share of 42%, and higher than in any European country Ipsos surveyed.';act('guess')}
  gs.querySelector('.go').addEventListener('click',function(){go(+inp.value)});gs.querySelector('.sk').addEventListener('click',function(){go(null)});
  draw();resize(root,draw);
}
function boot(){var m={'nid-aiw-trend':trendBlock,'nid-aiw-age':ageBlock,'nid-aiw-ask':askBlock,'nid-aiw-world':worldBlock};Object.keys(m).forEach(function(id){var el=document.getElementById(id);if(el&&!el.__d){el.__d=1;m[id](el);hardStyle(el);try{new MutationObserver(function(){hardStyle(el)}).observe(el,{childList:true,subtree:true})}catch(e){}}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
