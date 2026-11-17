/* The News in Data: October 2026 retail sales by store type.
   Census Bureau, Advance Monthly Retail Trade, October 2026 (released Nov. 17, 2026), seasonally adjusted, not adjusted for prices.
   Gas prices: BLS average price, unleaded regular (APU000074714) via FRED. */
(function(){
/* [label, % change Oct 2025 -> Oct 2026, sales Oct 2026 ($M), sales Oct 2025 ($M), sub-category flag] */
var K=[
 ['Gas stations',30.3,68608,52637],
 ['Miscellaneous stores',13.3,16539,14598],
 ['Online and other nonstore',11.8,128232,114735],
 ['Electronics and appliances',7.7,7818,7259],
 ['Sporting goods, hobby, books',7.1,8670,8099],
 ['Restaurants and bars',7.0,92921,86805],
 ['Building and garden',5.6,44164,41826],
 ['General merchandise',3.5,81828,79029],
 ['Clothing',3.1,26377,25576],
 ['Furniture',2.5,10685,10423],
 ['Cars and auto parts',1.3,136994,135216],
 ['Health and personal care',1.0,40327,39915],
 ['Grocery and beverage stores',0.9,85057,84309],
 ['Department stores',-1.6,3972,4036,1]
];
var TOT=[748220,700427],EXG=[679612,647790],ALL=6.8,XG=4.9;
/* monthly, Jan 2025 - Oct 2026: gas station sales ($M, SA) and average price of regular gas ($/gal) */
var MO=['2025-01','2025-02','2025-03','2025-04','2025-05','2025-06','2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07','2026-08','2026-09','2026-10'];
var GS=[54144,53679,51983,51873,51386,51997,52399,52840,53119,52637,54172,54476,52755,53408,60359,63594,65205,61634,61509,63781,67581,68608];
var GP=[3.211,3.261,3.232,3.330,3.306,3.306,3.285,3.295,3.339,3.239,3.228,3.050,2.961,3.065,3.843,4.263,4.651,4.195,4.094,4.200,4.482,4.454];
var INK='#13241B',SUB='#5F7268',G='#007A55',GRAY='#B9C6BF',PALE='#E3EAE6',SERIF='"Times New Roman",Times,serif',SANS='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif';
var MN=['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
function fmtB(m){return '$'+(m/1000).toFixed(1)+' billion'}

/* ---------- lead: sorted bars ---------- */
function bars(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,L=(o.lpad||200)*fs,R=W-(o.rpad||56)*fs,T=34*fs,RH=(o.rh||34)*fs,BOT=T+K.length*RH,H=BOT+46*fs,lo=-5,hi=32,X=function(v){return L+(v-lo)/(hi-lo)*(R-L)},s='',sel=o.sel;
  [0,10,20,30].forEach(function(v){s+='<line x1="'+X(v)+'" x2="'+X(v)+'" y1="'+(T-8*fs)+'" y2="'+(BOT-4*fs)+'" stroke="'+(v===0?'#9FB1A7':'#EDF2EF')+'" stroke-width="'+(v===0?1.2:1)*fs+'"/><text x="'+X(v)+'" y="'+(T-14*fs)+'" text-anchor="middle" font-size="'+(12*fs)+'" fill="'+SUB+'">'+(v>0?'+':'')+v+'%</text>'});
  /* reference lines: all retail and excluding gas */
  var xa=X(ALL),xg=X(XG);
  s+='<line x1="'+xa+'" x2="'+xa+'" y1="'+(T-4*fs)+'" y2="'+(BOT+20*fs)+'" stroke="'+INK+'" stroke-width="'+(2.6*fs)+'"/>';
  s+='<line x1="'+xg+'" x2="'+xg+'" y1="'+(T+RH*1.5)+'" y2="'+(BOT+4*fs)+'" stroke="'+INK+'" stroke-width="'+(1.4*fs)+'" stroke-dasharray="'+(4*fs)+' '+(3*fs)+'" opacity=".7"/>';
  
  K.forEach(function(k,i){var y=T+i*RH,gas=i===0,sub=k[4],bh=RH*.6,x0=X(Math.min(0,k[1])),x1=X(Math.max(0,k[1])),on=sel===i;
    s+='<g class="rw" data-i="'+i+'" style="cursor:pointer"><rect x="0" y="'+(y-RH*.2)+'" width="'+W+'" height="'+RH+'" fill="'+(on?'#F1F8F4':'transparent')+'"/>';
    s+='<text x="'+(L-10*fs)+'" y="'+(y+bh/2+5*fs)+'" text-anchor="end" font-size="'+(14*fs)+'" font-weight="'+(gas?700:400)+'" font-style="'+(sub?'italic':'normal')+'" fill="'+(gas?G:INK)+'">'+k[0]+'</text>';
    s+='<rect class="sg" style="--d:'+(i*40)+'ms;transform-origin:'+X(0)+'px 0" x="'+x0+'" y="'+y+'" width="'+Math.max(x1-x0,1.5)+'" height="'+bh+'" rx="'+(2*fs)+'" fill="'+(gas?G:on?'#7FA493':GRAY)+'"/>';
    var lx=k[1]>=0?x1+6*fs:X(0)+6*fs;s+='<text x="'+lx+'" y="'+(y+bh/2+5*fs)+'" text-anchor="start" font-size="'+((gas?16:13.5)*fs)+'" font-weight="700" fill="'+(gas?G:INK)+'" stroke="#fff" stroke-width="'+(7*fs)+'" paint-order="stroke">'+(k[1]>0?'+':'')+k[1].toFixed(1)+'%</text></g>'});
  s+='<text x="'+(xa+6*fs)+'" y="'+(BOT+34*fs)+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+INK+'" stroke="#fff" stroke-width="'+(4*fs)+'" paint-order="stroke">All retail +6.8%</text>';
  s+='<text x="'+(xg-6*fs)+'" y="'+(BOT+18*fs)+'" text-anchor="end" font-size="'+(12*fs)+'" font-style="italic" fill="'+INK+'" stroke="#fff" stroke-width="'+(4*fs)+'" paint-order="stroke">Without gas +4.9%</text>';
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Percent change in sales from October 2025 to October 2026 by store type: gas stations up 30.3%, miscellaneous stores 13.3%, online and nonstore 11.8%, electronics 7.7%, sporting goods 7.1%, restaurants and bars 7.0%, building and garden 5.6%, general merchandise 3.5%, clothing 3.1%, furniture 2.5%, cars and parts 1.3%, health and personal care 1.0%, grocery and beverage 0.9%, department stores down 1.6%. All retail rose 6.8%, or 4.9% without gas stations.">'+s+'</svg>'};
}

/* ---------- share of sales vs share of the increase ---------- */
function share(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,L=(o.lpad||150)*fs,R=W-12*fs,BH=(o.bh||46)*fs,s='',inc=TOT[0]-TOT[1];
  var parts=[['Gas stations',K[0][2],K[0][2]-K[0][3],G],['Online',K[2][2],K[2][2]-K[2][3],'#5E8F78'],['Restaurants',K[5][2],K[5][2]-K[5][3],'#9DBBAD']];
  var rs=TOT[0]-parts.reduce(function(a,p){return a+p[1]},0),ri=inc-parts.reduce(function(a,p){return a+p[2]},0);parts.push(['Everything else',rs,ri,PALE]);
  var rows=[['Share of October sales',1,TOT[0]],['Share of the increase from a year earlier',2,inc]],y=26*fs;
  rows.forEach(function(r,ri2){var x=L,yy=y+ri2*(BH+52*fs);
    s+='<text x="'+L+'" y="'+(yy-8*fs)+'" font-size="'+(14*fs)+'" font-weight="700" fill="'+INK+'">'+r[0]+(o.compact?'<tspan font-weight="400" fill="'+SUB+'">, '+(ri2?fmtB(inc):fmtB(TOT[0]))+'</tspan>':'')+'</text>';
    if(!o.compact)s+='<text x="'+(L-10*fs)+'" y="'+(yy+BH/2+5*fs)+'" text-anchor="end" font-size="'+(13*fs)+'" fill="'+SUB+'">'+(ri2?fmtB(inc)+' more':fmtB(TOT[0]))+'</text>';
    parts.forEach(function(p,k){var v=p[r[1]],w=(R-L)*v/r[2],pc=Math.round(100*v/r[2]);
      s+='<rect class="sg" style="--d:'+(ri2*200+k*80)+'ms" x="'+x+'" y="'+yy+'" width="'+Math.max(w-1.5*fs,0)+'" height="'+BH+'" fill="'+p[3]+'"/>';
      if(w>26*fs)s+='<text x="'+(x+7*fs)+'" y="'+(yy+BH/2+6*fs)+'" font-size="'+(15*fs)+'" font-weight="700" fill="'+(k<2?'#fff':INK)+'">'+pc+'%</text>';x+=w})});
  var ly=y+2*(BH+52*fs)-24*fs,lx=L;
  parts.forEach(function(p){var pw=(p[0].length*6.6+34)*fs;if(lx+pw>W){lx=L;ly+=20*fs}s+='<rect x="'+lx+'" y="'+(ly-10*fs)+'" width="'+(12*fs)+'" height="'+(12*fs)+'" rx="'+(2*fs)+'" fill="'+p[3]+'"'+(p[3]===PALE?' stroke="#C9D7CF"':'')+'/><text x="'+(lx+17*fs)+'" y="'+ly+'" font-size="'+(12.5*fs)+'" fill="'+INK+'">'+p[0]+'</text>';lx+=pw});
  var H=ly+12*fs;
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Gas stations were 9% of October retail sales but 33% of the increase from a year earlier. Online and nonstore retailers were 17% of sales and 28% of the increase; restaurants and bars 12% and 13%.">'+s+'</svg>'};
}

/* ---------- price vs sales since the war ---------- */
function gas(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,L=(o.lpad||46)*fs,R=W-(o.rpad||118)*fs,T=24*fs,B=(o.H||330)*fs-30*fs,H=(o.H||330)*fs,n=MO.length,base=9,
    ix=function(a,i){return 100*a[i]/a[base]},lo=85,hi=150,X=function(i){return L+i/(n-1)*(R-L)},Y=function(v){return B-(v-lo)/(hi-lo)*(B-T)},s='',upto=o.upto==null?n-1:o.upto;
  [90,100,110,120,130,140,150].forEach(function(v){s+='<line x1="'+L+'" x2="'+R+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="'+(v===100?'#9FB1A7':'#EDF2EF')+'" stroke-width="'+fs+'"/><text x="'+(L-6*fs)+'" y="'+(Y(v)+4*fs)+'" text-anchor="end" font-size="'+(11.5*fs)+'" fill="'+SUB+'">'+(v===100?'Oct. ’25':(v>100?'+':'')+(v-100)+'%')+'</text>'});
  /* war marker between Feb and March 2026 */
  var xw=(X(13)+X(14))/2;s+='<line x1="'+xw+'" x2="'+xw+'" y1="'+T+'" y2="'+B+'" stroke="'+INK+'" stroke-width="'+(1.2*fs)+'" stroke-dasharray="'+(3*fs)+' '+(3*fs)+'"/><text x="'+(xw-6*fs)+'" y="'+(T+12*fs)+'" text-anchor="end" font-size="'+(12*fs)+'" font-style="italic" fill="'+INK+'">Iran war begins, Feb. 28</text>';
  (o.ticks||[0,6,12,18,21]).forEach(function(i){var m=MO[i].split('-');s+='<text x="'+X(i)+'" y="'+(B+18*fs)+'" text-anchor="middle" font-size="'+(11.5*fs)+'" fill="'+SUB+'">'+MN[+m[1]-1]+' ’'+m[0].slice(2)+'</text>'});
  function line(a,c,w,dash){var d='';for(var i=0;i<=upto;i++)d+=(i?'L':'M')+X(i).toFixed(1)+','+Y(ix(a,i)).toFixed(1);return '<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(w*fs)+'" stroke-linejoin="round" stroke-linecap="round"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>'}
  s+=line(GP,INK,2.2);s+=line(GS,G,3.2);
  var e=upto,yp=Y(ix(GP,e)),ys=Y(ix(GS,e));if(Math.abs(yp-ys)<30*fs){var m2=(yp+ys)/2;yp=m2-15*fs;ys=m2+15*fs}
  s+='<circle cx="'+X(e)+'" cy="'+Y(ix(GP,e))+'" r="'+(3.5*fs)+'" fill="'+INK+'"/><circle cx="'+X(e)+'" cy="'+Y(ix(GS,e))+'" r="'+(4*fs)+'" fill="'+G+'"/>';
  s+='<text x="'+(X(e)+8*fs)+'" y="'+(yp+4*fs)+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+INK+'">Gas price</text><text x="'+(X(e)+8*fs)+'" y="'+(yp+19*fs)+'" font-size="'+(12.5*fs)+'" fill="'+INK+'">+'+(ix(GP,e)-100).toFixed(1)+'%, $'+GP[e].toFixed(2)+'</text>';
  s+='<text x="'+(X(e)+8*fs)+'" y="'+(ys+4*fs)+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+G+'">Gas station sales</text><text x="'+(X(e)+8*fs)+'" y="'+(ys+19*fs)+'" font-size="'+(12.5*fs)+'" fill="'+G+'">+'+(ix(GS,e)-100).toFixed(1)+'%</text>';
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Average price of regular gasoline and gas station sales, January 2025 to October 2026, as change from October 2025. Both jumped after the Iran war began Feb. 28, 2026. By October 2026 the price was up 37.5% to $4.45 a gallon and gas station sales were up 30.3%.">'+s+'</svg>'};
}
window.NIDRT={bars:bars,share:share,gas:gas,K:K};
if(window.NIDRT_STATIC)return;

/* ---------- page ---------- */
var CSS='.nid-rt{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2.2em auto;position:relative}.nid-rt svg{display:block;width:100%;height:auto;overflow:visible}.nid-rt text{font-family:'+SERIF+'}'+
'.nid-rt .det{min-height:56px;margin:10px auto 0;max-width:640px;border-left:3px solid '+G+';background:#F1F8F4;border-radius:0 8px 8px 0;padding:10px 14px;line-height:1.4}.nid-rt .det .k{font:700 12px/1.3 '+SANS+';color:'+G+';letter-spacing:.05em;text-transform:uppercase;display:block;margin-bottom:3px}'+
'.nid-rt .sg{transition:transform .7s cubic-bezier(.2,.8,.2,1),opacity .5s ease;transition-delay:var(--d);transform-box:view-box}.nid-rt.pre .sg{transform:scaleX(0);opacity:0}'+
'.nid-rt .ctl{display:flex;justify-content:center;gap:8px;margin:2px 0 8px}.nid-rt .ctl button{font:600 14px/1 '+SANS+';border:1.5px solid '+G+';background:#fff;color:'+G+';border-radius:999px;padding:10px 16px;cursor:pointer;min-height:40px}.nid-rt .ctl button:focus-visible{outline:3px solid #7FC4A6;outline-offset:2px}'+
'@media (prefers-reduced-motion:no-preference){.nid-rt .ln{stroke-dasharray:2000;stroke-dashoffset:0;transition:stroke-dashoffset 2s ease}.nid-rt.pre .ln{stroke-dashoffset:2000}}@media (prefers-reduced-motion:reduce){.nid-rt .sg{transition:none}}';
function css(){if(document.getElementById('nid-rt-css'))return;var st=document.createElement('style');st.id='nid-rt-css';st.textContent=CSS;document.head.appendChild(st)}
function hardStyle(root){var D={ti:'font-family:"Times New Roman",Times,serif;font-size:clamp(1.3em,4.4vw,1.75em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center;color:#13241B;font-style:normal',su:'font-family:"Times New Roman",Times,serif;font-style:italic;font-size:clamp(.95em,3vw,1.05em);line-height:1.35;margin:0 auto .9em;text-align:center;color:#5F7268;max-width:600px'};
  ['ti','su'].forEach(function(c){[].forEach.call(root.querySelectorAll('p.'+c),function(p){D[c].split(';').forEach(function(d){var i=d.indexOf(':');if(i>0)p.style.setProperty(d.slice(0,i),d.slice(i+1),'important')})})});
  [].forEach.call(root.querySelectorAll('.det'),function(p){p.style.setProperty('font-family','"Times New Roman",Times,serif','important')})}
function reveal(root){root.classList.add('pre');if(!('IntersectionObserver' in window)){root.classList.remove('pre');return}var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){setTimeout(function(){root.classList.remove('pre')},60);io.disconnect()}},{threshold:.3});io.observe(root)}
function act(n){try{window.dispatchEvent(new CustomEvent('nid:act',{detail:n}))}catch(e){}}
function narrow(root){return (root.clientWidth||700)<520}
function resize(root,draw){var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}})}

function barsBlock(root){
  css();root.classList.add('nid-rt');var sel=0;
  root.innerHTML='<p class="ti">Gas Stations Rang Up 30% More Than A Year Earlier</p><p class="su">Change in October 2026 sales from October 2025, by type of store. Seasonally adjusted, not adjusted for inflation. Tap a store type.</p><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function show(i){var k=K[i],d=k[2]-k[3];det.innerHTML='<span class="k">'+k[0]+'</span>'+fmtB(k[2])+' in October, '+(d>=0?'up ':'down ')+'$'+(Math.abs(d)/1000).toFixed(1)+' billion from '+fmtB(k[3])+' a year earlier ('+(k[1]>0?'+':'')+k[1].toFixed(1)+'%).'+(i===0?' That is more than four times the growth rate of all retail and food services (6.8%).':i===12?' Grocery stores alone also grew 0.9%.':'')}
  function draw(){var n=narrow(root);cv.innerHTML=bars(n?{W:420,fs:.9,lpad:178,rpad:44,rh:32,sel:sel}:{sel:sel}).svg;
    [].forEach.call(cv.querySelectorAll('.rw'),function(g){g.addEventListener('click',function(){sel=+g.getAttribute('data-i');draw();show(sel);act('tap')})})}
  draw();show(0);reveal(root);resize(root,draw);
}
function shareBlock(root){
  css();root.classList.add('nid-rt');
  root.innerHTML='<p class="ti">A Third Of The Growth Came From Gas</p><p class="su">Retail and food services sales in October 2026, and the $47.8 billion increase from October 2025.</p><div class="cv"></div>';
  var cv=root.querySelector('.cv');function draw(){cv.innerHTML=share(narrow(root)?{W:420,fs:.95,lpad:6,bh:44,compact:1}:{}).svg}
  draw();reveal(root);resize(root,draw);
}
function gasBlock(root){
  css();root.classList.add('nid-rt');var timer=null;
  root.innerHTML='<p class="ti">The Pump Price Rose Even Faster Than Gas Station Sales</p><p class="su">Average price of regular gas and gas station sales, change from October 2025.</p><div class="ctl"><button type="button" class="rp">Replay</button></div><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function draw(u){var n=narrow(root);cv.innerHTML=gas(Object.assign(n?{W:420,fs:.95,lpad:52,rpad:104,H:320,ticks:[0,6,12,21]}:{},{upto:u}))
    .svg}
  function play(){clearInterval(timer);var u=8;draw(u);timer=setInterval(function(){u++;draw(u);if(u>=MO.length-1){clearInterval(timer)}},140);act('tap')}
  root.querySelector('.rp').addEventListener('click',play);
  det.innerHTML='<span class="k">Price vs. sales</span>Regular gas averaged $4.45 a gallon in October, up 37.5% from $3.24 a year earlier. Gas station sales rose 30.3%, less than the price, which suggests stations sold less fuel. Their sales also include snacks and other goods.';
  draw(MO.length-1);
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){play();io.disconnect()}},{threshold:.4});io.observe(root)}
  resize(root,function(){draw(MO.length-1)});
}
function boot(){var m={'nid-rt-bars':barsBlock,'nid-rt-share':shareBlock,'nid-rt-gas':gasBlock};Object.keys(m).forEach(function(id){var el=document.getElementById(id);if(el&&!el.__d){el.__d=1;m[id](el);hardStyle(el);try{new MutationObserver(function(){hardStyle(el)}).observe(el,{childList:true,subtree:true})}catch(e){}}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
