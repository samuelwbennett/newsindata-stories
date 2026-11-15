/* The News in Data: rent burden, 2025 ACS. Built by rent/src/build.js (inlines data.json). */
(function(){
var D=__DATA__,ST=D.st,MET=D.m; /* st: [name,b30,b50,b30_2021,medRent,renterIncome,renters]; m: [cbsa,name,b30,b50,b50moe,medRent,income,renters] */
var G='#007A55',GD='#005C40',INK='#13241B',SUB='#5F7268',RUST='#B5462F',GOLD='#C8962E',SERIF='"Times New Roman",Times,serif',SANS='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif';
var GRID={AK:[0,0],ME:[11,0],VT:[10,1],NH:[11,1],WA:[1,2],ID:[2,2],MT:[3,2],ND:[4,2],MN:[5,2],IL:[6,2],WI:[7,2],MI:[8,2],NY:[9,2],RI:[10,2],MA:[11,2],OR:[1,3],NV:[2,3],WY:[3,3],SD:[4,3],IA:[5,3],IN:[6,3],OH:[7,3],PA:[8,3],NJ:[9,3],CT:[10,3],CA:[1,4],UT:[2,4],CO:[3,4],NE:[4,4],MO:[5,4],KY:[6,4],WV:[7,4],VA:[8,4],MD:[9,4],DE:[10,4],AZ:[2,5],NM:[3,5],KS:[4,5],AR:[5,5],TN:[6,5],NC:[7,5],SC:[8,5],DC:[9,5],OK:[4,6],LA:[5,6],MS:[6,6],AL:[7,6],GA:[8,6],HI:[0,7],TX:[4,7],FL:[9,7]};
var C30='#7FBF9E',C50='#0B4D36';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function f1(v){return v==null?'n/a':v.toFixed(1)+'%'}
function money(v){return '$'+Math.round(v).toLocaleString('en-US')}

/* ---------- house tile map: each house fills to the share paying 30%+ (light) and 50%+ (dark) ---------- */
function houses(o){
  o=o||{};var CW=o.cw||64,CH=o.ch||62,gap=o.gap||6,fs=o.fs||1,top=o.top||6,W=12*CW+11*gap,H=top+8*CH+7*gap+2,s='',id=0;
  Object.keys(GRID).forEach(function(ab){var d=ST[ab];if(!d)return;var gx=GRID[ab][0]*(CW+gap),gy=top+GRID[ab][1]*(CH+gap),w=CW*.84,x=gx+(CW-w)/2,roof=CH*.28,y0=gy+roof+1,bh=CH-roof-3,bot=y0+bh;
    var path='M'+x+' '+y0+'L'+(x+w/2)+' '+(gy+1)+'L'+(x+w)+' '+y0+'V'+bot+'H'+x+'Z',cid='rc'+(o.p||'')+(id++);
    var full=bot-(gy+1),h30=full*d[1]/100,h50=full*d[2]/100;
    s+='<g class="hs" data-s="'+ab+'" tabindex="0" role="button" aria-label="'+esc(d[0])+': '+f1(d[1])+' of renters pay 30% or more of income on rent, '+f1(d[2])+' pay half or more">';
    s+='<clipPath id="'+cid+'"><path d="'+path+'"/></clipPath><path d="'+path+'" fill="#F3F6F4"/>';
    s+='<g clip-path="url(#'+cid+')"><rect x="'+x+'" y="'+(bot-h30)+'" width="'+w+'" height="'+h30+'" fill="'+C30+'"/><rect x="'+x+'" y="'+(bot-h50)+'" width="'+w+'" height="'+h50+'" fill="'+C50+'"/></g>';
    s+='<path d="'+path+'" fill="none" stroke="'+INK+'" stroke-width="'+(o.stack?1.6:1.3*fs)+'" stroke-linejoin="round"/>';
    if(o.stack){s+='<text x="'+(x+w/2)+'" y="'+(gy+roof*.92)+'" text-anchor="middle" font-size="'+(6.8*fs)+'" font-weight="700" fill="'+INK+'" font-family="'+SANS+'">'+ab+'</text>'}
    else{s+='<text x="'+(x+w/2)+'" y="'+(y0+11*fs)+'" text-anchor="middle" font-size="'+(10.5*fs)+'" font-weight="700" fill="'+INK+'" font-family="'+SANS+'" stroke="#F3F6F4" stroke-width="3" paint-order="stroke">'+ab+'</text>'}
    s+='<text x="'+(x+w/2)+'" y="'+(bot-4*fs)+'" text-anchor="middle" font-size="'+(12*fs)+'" font-weight="700" fill="#fff">'+Math.round(d[1])+'%</text></g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Map of rent burden by state, drawn as houses filled to the share of renters paying 30% or more of income on rent. Florida is highest at 61.3% and North Dakota lowest at 34.7%.">'+s+'</svg>'};
}
function legend(fs){fs=fs||1;return {w:440*fs,svg:'<rect x="0" y="0" width="'+(16*fs)+'" height="'+(12*fs)+'" fill="'+C30+'"/><text x="'+(21*fs)+'" y="'+(10*fs)+'" font-size="'+(12.5*fs)+'" fill="'+INK+'" font-family="'+SANS+'">Pay 30% or more of income</text><rect x="'+(200*fs)+'" y="0" width="'+(16*fs)+'" height="'+(12*fs)+'" fill="'+C50+'"/><text x="'+(221*fs)+'" y="'+(10*fs)+'" font-size="'+(12.5*fs)+'" fill="'+INK+'" font-family="'+SANS+'">Pay half or more</text>'}}

/* ---------- scatter: rent vs. burden, big metros ---------- */
var LAB={'33100':['Miami',1],'41940':['San Jose',1],'41860':['San Francisco',1],'35620':['New York',1],'31080':['Los Angeles',0],'40140':['Riverside',0],'36740':['Orlando',0],'41740':['San Diego',1],'14460':['Boston',1],'47900':['Washington',0],'12420':['Austin',0],'28140':['Kansas City',0],'16980':['Chicago',0],'38300':['Pittsburgh',0],'19740':['Denver',1],'45300':['Tampa',0],'42660':['Seattle',0]};
function scatter(o){
  o=o||{};var W=o.W||720,H=o.H||460,fs=o.fs||1,L=58*fs,R=W-20*fs,T=24*fs,B=H-48*fs,minR=o.minR||100000;
  var pts=MET.filter(function(m){return m[7]>=minR});
  var X=function(v){return L+(v-1000)/(3000-1000)*(R-L)},Y=function(v){return B-(v-40)/(70-40)*(B-T)},s='';
  [1000,1500,2000,2500,3000].forEach(function(v){s+='<line x1="'+X(v)+'" x2="'+X(v)+'" y1="'+T+'" y2="'+B+'" stroke="#E8EDEA"/><text x="'+X(v)+'" y="'+(B+20*fs)+'" text-anchor="middle" font-size="'+(12.5*fs)+'" fill="'+SUB+'">'+money(v)+'</text>'});
  [40,45,50,55,60,65,70].forEach(function(v){s+='<line x1="'+L+'" x2="'+R+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="#E8EDEA"/><text x="'+(L-8*fs)+'" y="'+(Y(v)+4*fs)+'" text-anchor="end" font-size="'+(12.5*fs)+'" fill="'+SUB+'">'+v+'%</text>'});
  s+='<line x1="'+L+'" x2="'+R+'" y1="'+Y(51.8)+'" y2="'+Y(51.8)+'" stroke="'+INK+'" stroke-dasharray="'+(4*fs)+' '+(4*fs)+'"/><text x="'+(R-4*fs)+'" y="'+(Y(51.8)-6*fs)+'" text-anchor="end" font-size="'+(12*fs)+'" font-weight="700" fill="'+INK+'">U.S. 51.8%</text>';
  s+='<text x="'+((L+R)/2)+'" y="'+(B+40*fs)+'" text-anchor="middle" font-size="'+(13.5*fs)+'" font-weight="700" fill="'+INK+'">Median monthly rent, including utilities</text>';
  s+='<text transform="translate('+(14*fs)+','+((T+B)/2)+') rotate(-90)" text-anchor="middle" font-size="'+(13.5*fs)+'" font-weight="700" fill="'+INK+'">Renters paying 30%+ of income</text>';
  pts.forEach(function(m){var i=MET.indexOf(m),r=Math.max(3.2,Math.sqrt(m[7]/4000))*fs,lab=LAB[m[0]],c=lab?(m[0]==='33100'?RUST:m[0]==='41940'?G:'#4D6B5C'):'#A9BAB0';
    s+='<circle class="sd" data-i="'+i+'" cx="'+X(Math.min(m[5],3000)).toFixed(1)+'" cy="'+Y(Math.max(40,Math.min(m[2],70))).toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+c+'" fill-opacity="'+(lab?.9:.55)+'" stroke="#fff" stroke-width="'+fs+'"/>'});
  pts.forEach(function(m){var lab=LAB[m[0]];if(!lab||(o.few&&!lab[1]))return;var x=X(m[5]),y=Y(m[2]),r=Math.max(3.2,Math.sqrt(m[7]/4000))*fs,right=x<R-110*fs;
    s+='<text x="'+(right?x+r+4*fs:x-r-4*fs)+'" y="'+(y+4*fs)+'" text-anchor="'+(right?'start':'end')+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+(m[0]==='33100'?RUST:m[0]==='41940'?G:INK)+'" stroke="#fff" stroke-width="'+(3*fs)+'" paint-order="stroke">'+lab[0]+'</text>'});
  return {W:W,H:H,n:pts.length,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Scatter plot of metro areas by median rent and share of renters paying 30% or more of income. San Jose has the highest rent, $2,889, but one of the lowest burden rates, 44.3%. Miami has the highest burden rate among big metros, 66.8%.">'+s+'</svg>'};
}
window.NIDRENT={houses:houses,legend:legend,scatter:scatter,ST:ST,MET:MET};
if(window.NIDRENT_STATIC)return;

/* ---------- page ---------- */
var CSS='.nid-rt{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2.2em auto;position:relative}'+
'.nid-rt p.ti{font-family:'+SERIF+'!important;font-size:clamp(1.3em,4.4vw,1.75em)!important;font-weight:700!important;line-height:1.12!important;margin:0 0 .3em!important;text-align:center;color:'+INK+'!important}'+
'.nid-rt p.su{font-family:'+SERIF+'!important;font-style:italic!important;font-size:clamp(.95em,2.6vw,1.08em)!important;line-height:1.3!important;color:'+SUB+'!important;margin:0 auto .9em!important;text-align:center;max-width:600px}'+
'.nid-rt svg{display:block;width:100%;height:auto;overflow:visible}.nid-rt text{font-family:'+SERIF+'}'+
'.nid-rt .hs,.nid-rt .sd{cursor:pointer}.nid-rt .hs:hover path,.nid-rt .hs.on path{stroke-width:3}.nid-rt .sd.on{stroke:'+INK+';stroke-width:2.5}'+
'.nid-rt .det{min-height:64px;margin:10px auto 0;max-width:640px;border-left:3px solid '+G+';background:#F4F8F5;border-radius:0 8px 8px 0;padding:10px 14px;font-size:1em;line-height:1.4}'+
'.nid-rt .det .k{font:700 12px/1.3 '+SANS+';color:'+G+';letter-spacing:.05em;text-transform:uppercase;display:block;margin-bottom:3px}'+
'.nid-rt .big{font-size:2.2em;font-weight:700;color:'+G+';line-height:1}'+
'.nid-rt .lg{display:flex;justify-content:center;margin:0 0 6px}.nid-rt .lg svg{width:auto;max-width:100%}'+
'.nid-rt .srch{display:block;margin:0 auto 12px;max-width:420px;width:100%;font:600 16px/1.2 '+SANS+';padding:11px 14px;border:1.5px solid '+G+';border-radius:10px;box-sizing:border-box}'+
'.nid-rt .doors{display:flex;justify-content:center;gap:6px;margin:6px 0 4px}.nid-rt .doors svg{width:42px;max-width:9%;height:auto}'+
'.nid-rt .fc{text-align:center;font-size:1.15em;line-height:1.45;max-width:600px;margin:6px auto 0}.nid-rt .fc b{color:'+G+'}'+
'.nid-rt .cmp{font:600 13px/1.4 '+SANS+';color:'+SUB+';text-align:center;margin-top:8px}'+
'.nid-rt input:focus-visible,.nid-rt .hs:focus-visible,.nid-rt .sd:focus-visible{outline:3px solid #7FC4A6;outline-offset:2px}';
function css(){if(document.getElementById('nid-rt-css'))return;var st=document.createElement('style');st.id='nid-rt-css';st.textContent=CSS;document.head.appendChild(st)}
function act(n){try{window.dispatchEvent(new CustomEvent('nid:act',{detail:n}))}catch(e){}}

function mapBlock(root){
  css();root.classList.add('nid-rt');var lg=legend();
  root.innerHTML='<p class="ti">How Full The House Is</p><p class="su">Each house fills to the share of renters who spent at least 30% of their income on rent and utilities in 2025. The dark band is the share spending half or more. Tap a state.</p><div class="lg"><svg viewBox="0 -2 '+lg.w+' 16" style="height:16px">'+lg.svg+'</svg></div><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function show(ab){var d=ST[ab];det.innerHTML='<span class="k">'+esc(d[0])+'</span><span class="big">'+f1(d[1])+'</span> of renters paid 30% or more of their income on rent in 2025, and '+f1(d[2])+' paid half or more. Median rent: '+money(d[4])+' a month. Median renter household income: '+money(d[5])+' a year.'}
  function draw(){var narrow=(root.clientWidth||700)<520,m=houses(narrow?{cw:64,ch:78,gap:3,fs:1.9,stack:1,p:'n'}:{p:'w'});cv.innerHTML=m.svg;
    [].forEach.call(cv.querySelectorAll('.hs'),function(g){function pick(){[].forEach.call(cv.querySelectorAll('.hs'),function(x){x.classList.remove('on')});g.classList.add('on');show(g.getAttribute('data-s'));act('tap')}g.addEventListener('click',pick);g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}})})}
  draw();show('FL');var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}});
}
function scatterBlock(root){
  css();root.classList.add('nid-rt');
  root.innerHTML='<p class="ti">Higher Rent Doesn’t Mean A Bigger Burden</p><p class="su">Metro areas with at least 100,000 renter households. Circles are sized by the number of renter households. Tap a circle.</p><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function show(i){var m=MET[i];det.innerHTML='<span class="k">'+esc(m[1])+' metro</span><b>'+f1(m[2])+'</b> of renters pay 30% or more of income; '+f1(m[3])+' pay half or more. Median rent '+money(m[5])+' a month; median renter household income '+money(m[6])+'.';
    [].forEach.call(cv.querySelectorAll('.sd'),function(c){c.classList.toggle('on',+c.getAttribute('data-i')===i)})}
  function draw(){var narrow=(root.clientWidth||700)<520,sc=scatter(narrow?{W:420,H:440,fs:.95,few:1}:{W:720,H:470});cv.innerHTML=sc.svg;
    [].forEach.call(cv.querySelectorAll('.sd'),function(c){c.addEventListener('click',function(){show(+c.getAttribute('data-i'));act('tap')})})}
  draw();show(MET.findIndex(function(m){return m[0]==='41940'}));var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}});
}
function door(f30,f50){var id='dg'+Math.random().toString(36).slice(2,7);return '<svg viewBox="0 0 40 64" aria-hidden="true"><defs><clipPath id="'+id+'"><rect x="4" y="4" width="32" height="56" rx="3"/></clipPath></defs><rect x="4" y="4" width="32" height="56" rx="3" fill="#F3F6F4"/><g clip-path="url(#'+id+')"><rect x="4" y="'+(60-56*f30)+'" width="32" height="'+(56*f30)+'" fill="'+C30+'"/><rect x="4" y="'+(60-56*f50)+'" width="32" height="'+(56*f50)+'" fill="'+C50+'"/></g><rect x="4" y="4" width="32" height="56" rx="3" fill="none" stroke="'+INK+'" stroke-width="2"/><circle cx="29" cy="34" r="2.4" fill="'+INK+'"/></svg>'}
function findBlock(root){
  css();root.classList.add('nid-rt');
  var opts=MET.map(function(m){return '<option value="'+esc(m[1])+'">'}).join('');
  root.innerHTML='<p class="ti">Ten Renters In Your Metro</p><p class="su">Search any of the 392 metro areas the Census published in 2025.</p><label style="position:absolute;left:-9999px" for="nid-rt-s">Metro area</label><input class="srch" id="nid-rt-s" list="nid-rt-l" placeholder="Type a city…" autocomplete="off"><datalist id="nid-rt-l">'+opts+'</datalist><div class="doors" aria-hidden="true"></div><div class="fc" aria-live="polite"></div><div class="cmp"></div>';
  var dr=root.querySelector('.doors'),fc=root.querySelector('.fc'),cmp=root.querySelector('.cmp'),inp=root.querySelector('input');
  var order=MET.map(function(m,i){return i}).sort(function(a,b){return MET[b][2]-MET[a][2]});
  function show(i){var m=MET[i],a=m[2]/10,b=m[3]/10,h='';
    /* door k is dark if within the half-or-more share, light if within the 30%+ share */
    for(var k=0;k<10;k++){var sev=Math.max(0,Math.min(1,b-k)),bur=Math.max(0,Math.min(1,a-k));h+=door(bur,sev)}
    dr.innerHTML=h;var rk=order.indexOf(i)+1;
    fc.innerHTML='In <b>'+esc(m[1].split(',')[0].split('-')[0])+'</b>, about <b>'+(m[2]/10).toFixed(1)+' in 10</b> renter households spend 30% or more of their income on rent, and about <b>'+(m[3]/10).toFixed(1)+' in 10</b> spend half or more.';
    cmp.innerHTML='Median rent '+money(m[5])+' · Median renter income '+money(m[6])+' · Rank '+rk+' of 392 for share paying 30%+ (U.S. 5.2 in 10)'}
  inp.addEventListener('change',function(){var q=inp.value.trim().toLowerCase();if(!q)return;var i=MET.findIndex(function(m){return m[1].toLowerCase()===q});if(i<0)i=MET.findIndex(function(m){return m[1].toLowerCase().indexOf(q)>=0});if(i>=0){show(i);act('search')}});
  show(MET.findIndex(function(m){return m[0]==='33100'}));
}
function hardStyle(root){var S={ti:'font-family:"Times New Roman",Times,serif;font-size:clamp(1.3em,4.4vw,1.75em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center;color:#13241B;font-style:normal;letter-spacing:0;text-transform:none',su:'font-family:"Times New Roman",Times,serif;font-style:italic;font-size:clamp(.95em,2.6vw,1.08em);line-height:1.3;color:#5F7268;margin:0 auto .9em;text-align:center;max-width:600px',q:'font-family:"Times New Roman",Times,serif;font-size:1.35em;font-weight:700;line-height:1.22;margin:0 0 10px;color:#13241B'};
  [].forEach.call(root.querySelectorAll('p.ti,p.su,p.q'),function(p){var k=p.classList.contains('ti')?'ti':p.classList.contains('su')?'su':'q';S[k].split(';').forEach(function(d){var i=d.indexOf(':');if(i>0)p.style.setProperty(d.slice(0,i),d.slice(i+1),'important')})});
  [].forEach.call(root.querySelectorAll('.ans p,.det,.fc'),function(p){p.style.setProperty('font-family','"Times New Roman",Times,serif','important')})}
function boot(){var m={'nid-rent-map':mapBlock,'nid-rent-scatter':scatterBlock,'nid-rent-find':findBlock};Object.keys(m).forEach(function(id){var el=document.getElementById(id);if(el&&!el.__d){el.__d=1;m[id](el);hardStyle(el);try{new MutationObserver(function(){hardStyle(el)}).observe(el,{childList:true,subtree:true})}catch(e){}}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
