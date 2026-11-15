/* The News in Data: remote work, 2025 ACS. Built by wfh/src/build.js (inlines data.json). */
(function(){
var D=__DATA__,ST=D.st,MET=D.m;
var G='#007A55',GD='#005C40',INK='#13241B',SUB='#5F7268',GOLD='#C8962E',SERIF='"Times New Roman",Times,serif',SANS='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif';
var GRID={AK:[0,0],ME:[11,0],VT:[10,1],NH:[11,1],WA:[1,2],ID:[2,2],MT:[3,2],ND:[4,2],MN:[5,2],IL:[6,2],WI:[7,2],MI:[8,2],NY:[9,2],RI:[10,2],MA:[11,2],OR:[1,3],NV:[2,3],WY:[3,3],SD:[4,3],IA:[5,3],IN:[6,3],OH:[7,3],PA:[8,3],NJ:[9,3],CT:[10,3],CA:[1,4],UT:[2,4],CO:[3,4],NE:[4,4],MO:[5,4],KY:[6,4],WV:[7,4],VA:[8,4],MD:[9,4],DE:[10,4],AZ:[2,5],NM:[3,5],KS:[4,5],AR:[5,5],TN:[6,5],NC:[7,5],SC:[8,5],DC:[9,5],OK:[4,6],LA:[5,6],MS:[6,6],AL:[7,6],GA:[8,6],HI:[0,7],TX:[4,7],FL:[9,7]};
var YRS=[2021,2022,2023,2024,2025];
/* sequential green by 2025 share */
function col(v){var s=[[6,'#E4F1EA'],[10,'#BFE3D1'],[13,'#8FCBB0'],[16,'#4FA883'],[19,'#007A55'],[23,'#0B4D36']];for(var i=s.length-1;i>=0;i--)if(v>=s[i][0])return s[i][1];return s[0][1]}
function inkOn(v){return v>=16?'#fff':INK}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function f1(v){return v==null?'n/a':v.toFixed(1)+'%'}

/* ---------- laptop tile map ---------- */
function laptops(o){
  o=o||{};var CW=o.cw||64,CH=o.ch||56,gap=o.gap||6,fs=o.fs||1,top=o.top||8,W=12*CW+11*gap,H=top+8*CH+7*gap+4,s='';
  Object.keys(GRID).forEach(function(ab){var d=ST[ab];if(!d)return;var gx=GRID[ab][0]*(CW+gap),gy=top+GRID[ab][1]*(CH+gap),v=d[5],sw=CW*.86,sh=CH*.66,sx=gx+(CW-sw)/2,sy=gy+2;
    var t=inkOn(v),c=col(v);
    s+='<g class="lp" data-s="'+ab+'" tabindex="0" role="button" aria-label="'+esc(d[0])+': '+f1(v)+' worked from home in 2025, down from '+f1(d[1])+' in 2021">';
    s+='<rect x="'+sx+'" y="'+sy+'" width="'+sw+'" height="'+sh+'" rx="'+(4*fs)+'" fill="'+c+'" stroke="'+INK+'" stroke-width="'+(1.4*fs)+'"/>';
    /* base of the laptop */
    s+='<path d="M'+(gx+1)+' '+(sy+sh+2)+'h'+(CW-2)+'l'+(-3*fs)+' '+(5*fs)+'h'+(-(CW-2)+6*fs)+'z" fill="#C9D3CD" stroke="'+INK+'" stroke-width="'+(1.1*fs)+'"/>';
    /* sparkline 2021-2025 on the screen, scaled 0-50% */
    var px=function(i){return sx+5*fs+i*(sw-10*fs)/4},py=function(val){return sy+sh-5*fs-(Math.min(val,26)/26)*(sh-22*fs)},pd='';
    d.slice(1,6).forEach(function(val,i){if(val!=null)pd+=(pd?'L':'M')+px(i).toFixed(1)+' '+py(val).toFixed(1)});
    if(o.stack){s+='<text x="'+(sx+sw/2)+'" y="'+(sy+sh*.42)+'" text-anchor="middle" font-size="'+(10*fs)+'" font-weight="700" fill="'+t+'" font-family="'+SANS+'">'+ab+'</text><text x="'+(sx+sw/2)+'" y="'+(sy+sh*.88)+'" text-anchor="middle" font-size="'+(11*fs)+'" font-weight="700" fill="'+t+'">'+Math.round(v)+'</text></g>';return}
    s+='<path d="'+pd+'" fill="none" stroke="'+t+'" stroke-width="'+(1.6*fs)+'" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/><circle cx="'+px(4)+'" cy="'+py(v)+'" r="'+(2.2*fs)+'" fill="'+t+'"/>';
    s+='<text x="'+(sx+5*fs)+'" y="'+(sy+12.5*fs)+'" font-size="'+(11*fs)+'" font-weight="700" fill="'+t+'" font-family="'+SANS+'">'+ab+'</text>';
    s+='<text x="'+(sx+sw-5*fs)+'" y="'+(sy+12.5*fs)+'" text-anchor="end" font-size="'+(11.5*fs)+'" font-weight="700" fill="'+t+'">'+Math.round(v)+'%</text>';
    s+='</g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Map of the share of workers who mostly worked from home in 2025, by state, drawn as laptops. Colorado is highest at 18.8% and North Dakota lowest at 6.3%. Each screen shows the line from 2021 to 2025.">'+s+'</svg>'};
}
function legend(fs){fs=fs||1;var b=[[6,'Under 10%'],[10,'10–13'],[13,'13–16'],[16,'16–19'],[19,'19–23'],[23,'23+']],s='',x=0;b.forEach(function(k){s+='<rect x="'+x+'" y="0" width="'+(16*fs)+'" height="'+(12*fs)+'" rx="2" fill="'+col(k[0])+'" stroke="#9FB1A7" stroke-width=".6"/><text x="'+(x+20*fs)+'" y="'+(10*fs)+'" font-size="'+(12*fs)+'" fill="'+INK+'" font-family="'+SANS+'">'+k[1]+'</text>';x+=(k[1].length*6.3+34)*fs});return {w:x,svg:s}}

/* ---------- national line with 2019 baseline ---------- */
function natLine(o){
  o=o||{};var W=o.W||620,H=o.H||250,fs=o.fs||1,L=40*fs,R=W-60*fs,T=26*fs,B=H-30*fs,pts=[[2019,5.7],[2021,17.9],[2022,15.2],[2023,13.8],[2024,13.3],[2025,12.9]];
  var X=function(y){return L+(y-2019)/6*(R-L)},Y=function(v){return B-v/20*(B-T)},s='';
  [0,5,10,15,20].forEach(function(v){s+='<line x1="'+L+'" x2="'+R+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="#E3E9E5"/><text x="'+(L-8*fs)+'" y="'+(Y(v)+4*fs)+'" text-anchor="end" font-size="'+(12*fs)+'" fill="'+SUB+'">'+v+'%</text>'});
  pts.forEach(function(p){s+='<text x="'+X(p[0])+'" y="'+(B+20*fs)+'" text-anchor="middle" font-size="'+(12.5*fs)+'" fill="'+SUB+'">'+p[0]+'</text>'});
  s+='<path d="M'+X(2019)+' '+Y(5.7)+'L'+X(2021)+' '+Y(17.9)+'" stroke="'+G+'" stroke-width="'+(2.5*fs)+'" stroke-dasharray="'+(5*fs)+' '+(5*fs)+'" fill="none"/>';
  s+='<path d="'+pts.slice(1).map(function(p,i){return (i?'L':'M')+X(p[0])+' '+Y(p[1])}).join('')+'" stroke="'+G+'" stroke-width="'+(3*fs)+'" fill="none"/>';
  pts.forEach(function(p){s+='<circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="'+(4.5*fs)+'" fill="'+G+'" stroke="#fff" stroke-width="'+(1.5*fs)+'"/><text x="'+X(p[0])+'" y="'+(Y(p[1])-11*fs)+'" text-anchor="middle" font-size="'+(14*fs)+'" font-weight="700" fill="'+INK+'">'+p[1]+'%</text>'});
  s+='<text x="'+((X(2019)+X(2021))/2+6*fs)+'" y="'+(Y(10)+4*fs)+'" font-size="'+(11.5*fs)+'" font-style="italic" fill="'+SUB+'">No standard 2020 estimate</text>';
  if(o.guess!=null){var gy=Y(Math.min(o.guess,20));s+='<line x1="'+(X(2025)-16*fs)+'" x2="'+(X(2025)+16*fs)+'" y1="'+gy+'" y2="'+gy+'" stroke="'+GOLD+'" stroke-width="'+(3*fs)+'"/><text x="'+(X(2025)+20*fs)+'" y="'+(gy+4*fs)+'" font-size="'+(12.5*fs)+'" font-weight="700" fill="'+GOLD+'">You: '+o.guess+'%</text>'}
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Share of U.S. workers who mostly worked from home: 5.7% in 2019, 17.9% in 2021, then 15.2%, 13.8%, 13.3% and 12.9% in 2025.">'+s+'</svg>'};
}

/* ---------- metro strip ---------- */
function strip(o){
  o=o||{};var W=o.W||700,fs=o.fs||1,H=(o.H||120)*fs,L=14*fs,R=W-14*fs,r=(o.r||4.2)*fs,cy=H/2+6*fs;
  var X=function(v){return L+(v-4)/(26-4)*(R-L)},pts=MET.map(function(m,i){return {i:i,x:X(m[4]),y:0}}).sort(function(a,b){return a.x-b.x}),pl=[],d=2*r+.8*fs,s='',lim=H/2-r-14*fs;
  pts.forEach(function(q){for(var k=0;k<160;k++){var off=(k%2?1:-1)*Math.ceil(k/2)*d*.5;if(Math.abs(off)>lim)off=Math.sign(off)*lim;var ok=pl.every(function(p){var dx=p.x-q.x,dy=p.y-off;return dx*dx+dy*dy>=d*d*.97});if(ok||Math.abs(off)>=lim){q.y=off;break}}pl.push(q)});
  [5,10,15,20,25].forEach(function(v){s+='<line x1="'+X(v)+'" x2="'+X(v)+'" y1="'+(10*fs)+'" y2="'+(H-14*fs)+'" stroke="#E3E9E5"/><text x="'+X(v)+'" y="'+(H)+'" text-anchor="middle" font-size="'+(12*fs)+'" fill="'+SUB+'">'+v+'%</text>'});
  var us=X(12.9);s+='<line x1="'+us+'" x2="'+us+'" y1="'+(4*fs)+'" y2="'+(H-14*fs)+'" stroke="'+INK+'" stroke-dasharray="'+(3*fs)+' '+(3*fs)+'"/><text x="'+us+'" y="'+(2*fs)+'" text-anchor="middle" font-size="'+(11.5*fs)+'" font-weight="700" fill="'+INK+'">U.S. 12.9%</text>';
  pts.forEach(function(q){var m=MET[q.i];s+='<circle class="md" data-i="'+q.i+'" cx="'+q.x.toFixed(1)+'" cy="'+(cy+q.y).toFixed(1)+'" r="'+r+'" fill="'+col(m[4])+'" stroke="'+(m[4]>=13?'#fff':'#9FB1A7')+'" stroke-width="'+(.8*fs)+'"/>'});
  return {W:W,H:H+6*fs,svg:'<svg viewBox="0 '+(-12*fs)+' '+W+' '+(H+18*fs)+'" role="img" aria-label="All 224 metro areas by the share of workers who worked from home in 2025.">'+s+'</svg>'};
}
window.NIDWFH={laptops:laptops,legend:legend,natLine:natLine,strip:strip,ST:ST,MET:MET};
if(window.NIDWFH_STATIC)return;

/* ---------- page ---------- */
var CSS='.nid-wf{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2.2em auto;position:relative}'+
'.nid-wf p.ti{font-family:'+SERIF+'!important;font-size:clamp(1.3em,4.4vw,1.75em)!important;font-weight:700!important;line-height:1.12!important;margin:0 0 .3em!important;text-align:center;color:'+INK+'!important}'+
'.nid-wf p.su{font-family:'+SERIF+'!important;font-style:italic!important;font-size:clamp(.95em,2.6vw,1.08em)!important;line-height:1.3!important;color:'+SUB+'!important;margin:0 auto .9em!important;text-align:center;max-width:600px}'+
'.nid-wf svg{display:block;width:100%;height:auto;overflow:visible}.nid-wf text{font-family:'+SERIF+'}'+
'.nid-wf .lp,.nid-wf .md{cursor:pointer}.nid-wf .lp:hover rect,.nid-wf .lp.on rect{stroke-width:3}.nid-wf .md.on{stroke:'+INK+';stroke-width:2.5}'+
'.nid-wf .det{min-height:64px;margin:10px auto 0;max-width:640px;border-left:3px solid '+G+';background:#F4F8F5;border-radius:0 8px 8px 0;padding:10px 14px;font-size:1em;line-height:1.4}'+
'.nid-wf .det .k{font:700 12px/1.3 '+SANS+';color:'+G+';letter-spacing:.05em;text-transform:uppercase;display:block;margin-bottom:3px}'+
'.nid-wf .gs{background:#fff;border:1px solid #DCE7E0;border-radius:16px;padding:20px;box-shadow:0 10px 28px rgba(19,36,27,.07);max-width:620px;margin:0 auto}'+
'.nid-wf p.q{font-family:'+SERIF+'!important;font-size:1.35em!important;font-weight:700!important;line-height:1.22!important;margin:0 0 10px!important;color:'+INK+'!important}'+
'.nid-wf .row{display:flex;align-items:center;gap:14px}.nid-wf .val{font-size:44px;font-weight:700;color:'+G+';min-width:2.4em;font-variant-numeric:tabular-nums;line-height:1}'+
'.nid-wf input[type=range]{flex:1;min-width:0;accent-color:'+G+';height:36px}'+
'.nid-wf .go{font:700 15px/1.2 '+SANS+';background:'+G+';color:#fff;border:0;border-radius:999px;padding:12px 20px;cursor:pointer;margin-top:10px}.nid-wf .go:hover{background:'+GD+'}'+
'.nid-wf .ans p{font-family:'+SERIF+'!important;font-size:1.05em!important;line-height:1.45!important;margin:.6em 0 0!important}'+
'@media(max-width:520px){.nid-wf .wide{display:none}}.nid-wf .lg{display:flex;justify-content:center;margin:0 0 6px}.nid-wf .lg svg{width:auto;max-width:100%}'+
'.nid-wf .srch{display:block;margin:0 auto 10px;max-width:420px;width:100%;font:600 16px/1.2 '+SANS+';padding:11px 14px;border:1.5px solid '+G+';border-radius:10px;box-sizing:border-box}'+
'.nid-wf .big{font-size:2.2em;font-weight:700;color:'+G+';line-height:1}'+
'.nid-wf button:focus-visible,.nid-wf input:focus-visible,.nid-wf .lp:focus-visible,.nid-wf .md:focus-visible{outline:3px solid #7FC4A6;outline-offset:2px}';
function css(){if(document.getElementById('nid-wf-css'))return;var st=document.createElement('style');st.id='nid-wf-css';st.textContent=CSS;document.head.appendChild(st)}
function act(n){try{window.dispatchEvent(new CustomEvent('nid:act',{detail:n}))}catch(e){}}

function guess(root){
  css();root.classList.add('nid-wf');
  root.innerHTML='<div class="gs"><p class="q">In 2021, 17.9% of U.S. workers mostly worked from home. What share did in 2025?</p><div class="row"><span class="val" aria-live="polite">10%</span><label style="position:absolute;left:-9999px" for="nid-wf-r">Your guess</label><input id="nid-wf-r" type="range" min="0" max="25" step="0.5" value="10"></div><button type="button" class="go">Lock in my guess</button><div class="ans" hidden></div></div>';
  var r=root.querySelector('input'),v=root.querySelector('.val'),b=root.querySelector('.go'),a=root.querySelector('.ans');
  r.oninput=function(){v.textContent=r.value+'%'};
  b.onclick=function(){var g=+r.value,dif=Math.abs(g-12.9);a.hidden=false;a.innerHTML=natLine({guess:g}).svg+'<p>The answer is <b style="color:'+G+'">12.9%</b>, about 21.3 million people. '+(dif<=1?'You nailed it.':g>12.9?'Remote work has slipped every year since 2021, but slowly.':'It has fallen four years in a row, yet it’s still more than twice the 2019 share.')+'</p>';
    b.disabled=true;b.textContent='Locked in';b.style.opacity=.6;r.disabled=true;act('guess')};
}

function mapBlock(root){
  css();root.classList.add('nid-wf');var lg=legend();
  root.innerHTML='<p class="ti">Where Remote Work Held On</p><p class="su">Share of workers who mostly worked from home in 2025. <span class="wide">Each screen traces the line from 2021 to 2025. </span>Tap a state.</p><div class="lg"><svg viewBox="0 -2 '+lg.w+' 16" style="height:16px">'+lg.svg+'</svg></div><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function show(ab){var d=ST[ab];det.innerHTML='<span class="k">'+esc(d[0])+'</span><span class="big">'+f1(d[5])+'</span> of workers mostly worked from home in 2025, about '+(Math.round(d[6]*d[5]/100000)*1000).toLocaleString('en-US')+' people. That’s '+(d[5]<d[1]?'down':'up')+' from '+f1(d[1])+' in 2021 and ranks <b>'+rank(ab)+'</b> among the 50 states and D.C.'}
  function rank(ab){var k=Object.keys(GRID).filter(function(x){return ST[x]}).sort(function(a,b){return ST[b][5]-ST[a][5]});var n=k.indexOf(ab)+1;return n+(n%10===1&&n!==11?'st':n%10===2&&n!==12?'nd':n%10===3&&n!==13?'rd':'th')}
  function draw(){var narrow=(root.clientWidth||700)<520,m=laptops(narrow?{cw:64,ch:66,gap:4,fs:2.1,stack:1}:{});cv.innerHTML=m.svg;
    [].forEach.call(cv.querySelectorAll('.lp'),function(g){function pick(){[].forEach.call(cv.querySelectorAll('.lp'),function(x){x.classList.remove('on')});g.classList.add('on');show(g.getAttribute('data-s'));act('tap')}g.addEventListener('click',pick);g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}})})}
  draw();show('CO');var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}});
}

function metroBlock(root){
  css();root.classList.add('nid-wf');
  var opts=MET.map(function(m){return '<option value="'+esc(m[1])+'">'}).join('');
  root.innerHTML='<p class="ti">Find Your Metro</p><p class="su">All 224 metro areas the Census published, by 2025 share working from home. Search, or tap a dot.</p><label style="position:absolute;left:-9999px" for="nid-wf-s">Metro area</label><input class="srch" id="nid-wf-s" list="nid-wf-l" placeholder="Type a city…" autocomplete="off"><datalist id="nid-wf-l">'+opts+'</datalist><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det'),inp=root.querySelector('input'),sel=null;
  var order=MET.map(function(m,i){return i}).sort(function(a,b){return MET[b][4]-MET[a][4]});
  function show(i){sel=i;var m=MET[i],rk=order.indexOf(i)+1,tr=m[2]!=null?' In 2023 it was '+f1(m[2])+(m[3]!=null?', and in 2024 '+f1(m[3]):'')+'.':'';
    det.innerHTML='<span class="k">'+esc(m[1])+' metro</span><span class="big">'+f1(m[4])+'</span> worked from home in 2025 (±'+m[6]+' pts), about '+(Math.round(m[5]*m[4]/100000)*1000).toLocaleString('en-US')+' people. Rank: <b>'+rk+'</b> of 224.'+tr;
    [].forEach.call(cv.querySelectorAll('.md'),function(c){var on=+c.getAttribute('data-i')===i;c.classList.toggle('on',on);if(on){c.setAttribute('r',7);c.parentNode.appendChild(c)}else c.setAttribute('r',c.__r||c.getAttribute('r'))})}
  function draw(){var narrow=(root.clientWidth||700)<520,s=strip(narrow?{W:420,fs:1.05,H:190,r:3.4}:{W:740,H:160});cv.innerHTML=s.svg;
    [].forEach.call(cv.querySelectorAll('.md'),function(c){c.__r=c.getAttribute('r');c.addEventListener('click',function(){show(+c.getAttribute('data-i'));act('tap')})});if(sel!=null)show(sel)}
  inp.addEventListener('change',function(){var q=inp.value.trim().toLowerCase();if(!q)return;var i=MET.findIndex(function(m){return m[1].toLowerCase()===q});if(i<0)i=MET.findIndex(function(m){return m[1].toLowerCase().indexOf(q)>=0});if(i>=0){show(i);act('search')}});
  draw();show(MET.findIndex(function(m){return m[0]==='19740'}));var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}});
}
function hardStyle(root){var S={ti:'font-family:"Times New Roman",Times,serif;font-size:clamp(1.3em,4.4vw,1.75em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center;color:#13241B;font-style:normal;letter-spacing:0;text-transform:none',su:'font-family:"Times New Roman",Times,serif;font-style:italic;font-size:clamp(.95em,2.6vw,1.08em);line-height:1.3;color:#5F7268;margin:0 auto .9em;text-align:center;max-width:600px',q:'font-family:"Times New Roman",Times,serif;font-size:1.35em;font-weight:700;line-height:1.22;margin:0 0 10px;color:#13241B'};
  [].forEach.call(root.querySelectorAll('p.ti,p.su,p.q'),function(p){var k=p.classList.contains('ti')?'ti':p.classList.contains('su')?'su':'q';S[k].split(';').forEach(function(d){var i=d.indexOf(':');if(i>0)p.style.setProperty(d.slice(0,i),d.slice(i+1),'important')})});
  [].forEach.call(root.querySelectorAll('.ans p,.det,.fc'),function(p){p.style.setProperty('font-family','"Times New Roman",Times,serif','important')})}
function boot(){var m={'nid-wfh-guess':guess,'nid-wfh-map':mapBlock,'nid-wfh-metro':metroBlock};Object.keys(m).forEach(function(id){var el=document.getElementById(id);if(el&&!el.__d){el.__d=1;m[id](el);hardStyle(el);try{new MutationObserver(function(){hardStyle(el)}).observe(el,{childList:true,subtree:true})}catch(e){}}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
