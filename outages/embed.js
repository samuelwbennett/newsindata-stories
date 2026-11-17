/* The News in Data: "Six outages in six days" live timeline.
   Reads outages/status.json on every load (falls back to the copy below), draws one bar per outage
   on an Eastern clock from Thu Nov 12 to Wed Nov 18, 2026, and keeps the NSA bar growing until
   status.json reports the network back. Fills #nid-out (chart) and the text slots named below. */
(function(){
if(window.__nidOut)return; window.__nidOut=1;
var BASE=window.NID_OUT_BASE||'https://stories.thenewsindata.com/outages/';
var FALLBACK=null; /* status.json is required; the static image stays if it cannot load */
var T0=Date.UTC(2026,10,12,5,0,0); /* midnight Eastern, Thu Nov 12 */
var GREEN='#007a55',GRAY='#9aaba2',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0';
var DAYS=['Thu 12','Fri 13','Sat 14','Sun 15','Mon 16','Tue 17'];
function nowH(){return (Date.now()-T0)/36e5;}
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function fmtDur(h){h=Math.max(0,h);var H=Math.floor(h),M=Math.round((h-H)*60);if(M==60){H++;M=0;}return H+' hr '+M+' min';}
function clock(h){var d=Math.floor(h/24),x=h-d*24,H=Math.floor(x),M=Math.round((x-H)*60);if(M==60){H++;M=0;}var ap=H>=12?'p.m.':'a.m.',h12=H%12||12;return h12+':'+(M<10?'0':'')+M+' '+ap+' '+['Thu','Fri','Sat','Sun','Mon','Tue','Wed'][d];}
function set(id,html,text){var n=document.getElementById(id);if(!n)return;if(text)n.textContent=html;else n.innerHTML=html;}

function css(){
 if(document.getElementById('nid-out-css'))return;
 var s=document.createElement('style');s.id='nid-out-css';
 s.textContent='#nid-out{font-family:"Times New Roman",Times,serif;color:'+INK+';max-width:720px;margin:2em auto}'+
 '#nid-out .no-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '#nid-out .no-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .8em}'+
 '#nid-out .no-live{display:flex;align-items:center;justify-content:center;gap:.5em;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:.82em;color:'+INK+';margin:0 0 .6em}'+
 '#nid-out .no-dot{width:9px;height:9px;border-radius:50%;background:'+GREEN+';animation:nopulse 1.6s infinite}'+
 '@keyframes nopulse{0%{box-shadow:0 0 0 0 rgba(0,122,85,.5)}70%{box-shadow:0 0 0 9px rgba(0,122,85,0)}100%{box-shadow:0 0 0 0 rgba(0,122,85,0)}}'+
 '#nid-out svg{width:100%;height:auto;display:block;overflow:visible}'+
 '#nid-out .no-row{cursor:pointer}#nid-out .no-row:hover .no-bg{fill:'+FAINT+'}'+
 '#nid-out .no-card{font-family:"Times New Roman",Times,serif;background:#fff;border:1px solid '+RULE+';border-left:5px solid '+GREEN+';border-radius:6px;padding:.8em 1em;margin:.6em 0 0;font-size:.98em;line-height:1.45;min-height:3.2em}'+
 '#nid-out .no-card b{color:'+GREEN+'}'+
 '#nid-out .no-tiles{display:flex;gap:.6em;margin:1em 0 0}#nid-out .no-tile{flex:1;text-align:center;border-top:2px solid '+GREEN+';padding:.5em .2em 0}'+
 '#nid-out .no-tile b{display:block;font-size:1.6em;color:'+GREEN+';line-height:1.1}#nid-out .no-tile span{font-size:.82em;color:'+MUTED+';line-height:1.3;display:block}'+
 '#nid-out .no-src{font-size:.78em;color:'+MUTED+';margin:.8em 0 0;line-height:1.4}'+
 '#nid-out .no-btn{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:.78em;border:1px solid '+GREEN+';color:'+GREEN+';background:#fff;border-radius:999px;padding:.3em .9em;cursor:pointer;display:block;margin:.6em auto 0}';
 document.head.appendChild(s);
}

function draw(box,S){
 css();
 var O=S.outages,W=720,L=190,R=700,TOP=46,ROW=62,H=TOP+O.length*ROW+34,X=function(h){return L+(Math.min(Math.max(h,0),144)/144)*(R-L);};
 var nsaEnd=S.nsa_end!=null?S.nsa_end:null;
 box.innerHTML='';
 var hd=document.createElement('div');
 hd.innerHTML='<p class="no-h" style="font-family:&quot;Times New Roman&quot;,Times,serif !important;font-weight:700 !important;font-size:1.35em !important;line-height:1.2 !important;text-align:center !important;color:#13241B !important;margin:0 0 .2em !important">Six Major U.S. Tech Outages In Six Days</p><p class="no-d" style="font-family:&quot;Times New Roman&quot;,Times,serif !important;font-style:italic !important;text-align:center !important;color:#5F7268 !important">Each bar is one outage on an Eastern clock. Tap a bar for what failed and why.</p><div class="no-live"><span class="no-dot"></span><span id="no-livetxt"></span></div>';
 box.appendChild(hd);
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Timeline of six U.S. technology outages from Nov. 12 to Nov. 17, 2026'});
 box.appendChild(svg);
 for(var d=0;d<=6;d++){var x=X(d*24);svg.appendChild(el('line',{x1:x,x2:x,y1:TOP-14,y2:H-30,stroke:RULE,'stroke-width':d%6?1:1.5}));
  if(d<6)svg.appendChild(el('text',{x:X(d*24+12),y:TOP-22,'text-anchor':'middle','font-size':14,fill:MUTED,'font-family':'Times New Roman,serif'},DAYS[d]));}
 var defs=el('defs',{});
 var g=el('linearGradient',{id:'no-fade',x1:0,x2:1,y1:0,y2:0});g.appendChild(el('stop',{offset:'0','stop-color':GRAY,'stop-opacity':1}));g.appendChild(el('stop',{offset:'1','stop-color':GRAY,'stop-opacity':0}));defs.appendChild(g);
 var p=el('pattern',{id:'no-hatch',width:6,height:6,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'});p.appendChild(el('rect',{width:6,height:6,fill:'#fff'}));p.appendChild(el('line',{x1:0,y1:0,x2:0,y2:6,stroke:GRAY,'stroke-width':2.4}));defs.appendChild(p);
 svg.appendChild(defs);
 var nowX=X(nsaEnd!=null?nsaEnd:nowH());
 var nowLine=el('line',{x1:nowX,x2:nowX,y1:TOP-10,y2:H-30,stroke:INK,'stroke-width':1.2,'stroke-dasharray':'3 3'});svg.appendChild(nowLine);
 var nowTxt=el('text',{x:nowX,y:H-12,'text-anchor':'end','font-size':12.5,fill:INK,'font-family':'Times New Roman,serif'},nsaEnd!=null?'':'Now');svg.appendChild(nowTxt);
 var card=document.createElement('div');card.className='no-card';
 var bars=[],nsaBar=null,nsaLab=null,nsaY=0;
 O.forEach(function(o,i){
  var y=TOP+i*ROW,bh=24,by=y+(ROW-bh)/2-6,isN=o.key==='nsa';
  var row=el('g',{'class':'no-row',tabindex:0});
  row.appendChild(el('rect',{'class':'no-bg',x:0,y:y,width:W,height:ROW-6,fill:'transparent',rx:6}));
  row.appendChild(el('text',{x:L-12,y:by+11,'text-anchor':'end','font-size':17,'font-weight':isN?'bold':'normal',fill:isN?GREEN:INK,'font-family':'Times New Roman,serif'},o.name));
  row.appendChild(el('text',{x:L-12,y:by+29,'text-anchor':'end','font-size':12,fill:MUTED,'font-family':'Times New Roman,serif'},o.sub));
  if(o.lead!=null)row.appendChild(el('rect',{x:X(o.lead),y:by,width:Math.max(X(o.start)-X(o.lead),1),height:bh,fill:'url(#no-hatch)',rx:3,'class':'no-anim'}));
  var end=isN?(nsaEnd!=null?nsaEnd:nowH()):(o.end!=null?o.end:o.start);
  var b=el('rect',{x:X(o.start),y:by,width:0,height:bh,fill:isN?GREEN:GRAY,rx:3});row.appendChild(b);
  var tailR=null;if(o.tail!=null){tailR=el('rect',{x:X(end),y:by,width:0,height:bh,fill:'url(#no-fade)',rx:3});row.appendChild(tailR);}
  var labX=X(Math.max(end,o.tail||0))+8,lab=el('text',{x:labX,y:by+17,'font-size':14,fill:isN?GREEN:MUTED,'font-weight':isN?'bold':'normal','font-family':'Times New Roman,serif'},isN?'':o.label);
  /* keep labels inside the frame */
  if(!isN&&(labX>X(96)||labX>R-120)){lab.setAttribute('x',X(o.lead!=null?o.lead:o.start)-8);lab.setAttribute('text-anchor','end');}
  row.appendChild(lab);
  svg.appendChild(row);
  bars.push({b:b,tail:tailR,s:o.start,e:end,t:o.tail,lab:lab});
  if(isN){nsaBar=b;nsaLab=lab;nsaY=by;}
  var pick=function(){card.innerHTML='<b>'+o.name+'.</b> '+o.note;};
  row.addEventListener('click',pick);row.addEventListener('keydown',function(ev){if(ev.key==='Enter')pick();});
  if(isN)pick();
 });
 box.appendChild(card);
 var tiles=document.createElement('div');tiles.className='no-tiles';
 (S.facts||[]).forEach(function(f){var t=document.createElement('div');t.className='no-tile';t.innerHTML='<b>'+f[0]+'</b><span>'+f[1]+'</span>';tiles.appendChild(t);});
 box.appendChild(tiles);
 var src=document.createElement('p');src.className='no-src';src.textContent='Sources: Microsoft, FAA, Workday, JPMorgan Chase and United statements as reported by AP, CNN, CBS, NBC and Fox; CNN for NSA Net. Start and end times are as reported; hatched and fading segments mark times that were not given. Updated '+S.updated+'.';
 box.appendChild(src);
 var btn=document.createElement('button');btn.className='no-btn';btn.textContent='Replay';box.appendChild(btn);

 function live(){
  var e=nsaEnd!=null?nsaEnd:nowH(),x=X(e);
  if(nsaBar&&nsaBar.__done){nsaBar.setAttribute('width',Math.max(x-X(S.nsa_start),2));}
  if(nsaLab){nsaLab.setAttribute('x',Math.min(x+8,R-4));nsaLab.textContent=nsaEnd!=null?fmtDur(nsaEnd-S.nsa_start):'Still down';if(x+8>R-80){nsaLab.setAttribute('x',X(S.nsa_start)-8);nsaLab.setAttribute('text-anchor','end');}}
  nowLine.setAttribute('x1',x);nowLine.setAttribute('x2',x);nowTxt.setAttribute('x',x);
  var lt=document.getElementById('no-livetxt');
  if(lt)lt.textContent=nsaEnd!=null?('NSA Net was reported back at '+(S.nsa_end_label||clock(nsaEnd))+', '+fmtDur(nsaEnd-S.nsa_start)+' after it was first reported down'):('NSA Net has been reported down for at least '+fmtDur(nowH()-S.nsa_start)+' and counting');
 }
 function play(){
  var t0=null,dur=600,stag=420;
  bars.forEach(function(r){r.b.__done=false;r.b.setAttribute('width',0);if(r.tail)r.tail.setAttribute('width',0);r.lab.style.opacity=0;});
  function step(ts){if(!t0)t0=ts;var all=true;
   bars.forEach(function(r,i){var k=Math.min(Math.max((ts-t0-i*stag)/dur,0),1),ez=1-Math.pow(1-k,3);
    var w=(X(r.e)-X(r.s))*ez;r.b.setAttribute('width',Math.max(w,k>0?3:0));
    if(r.tail){r.tail.setAttribute('x',X(r.e));r.tail.setAttribute('width',Math.max(X(r.t)-X(r.e),0)*ez);}
    r.lab.style.opacity=k;if(k<1)all=false;else r.b.__done=true;});
   live();if(!all)requestAnimationFrame(step);}
  requestAnimationFrame(step);
 }
 btn.addEventListener('click',play);
 var started=false;
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!started){started=true;play();io.disconnect();}});},{threshold:.3});io.observe(svg);}
 else{started=true;play();}
 live();setInterval(live,30000);
}

function fill(S){
 set('nid-out-updated-t','Updated '+S.updated,true);
 set('nid-out-updated-s',S.headline_status,true);
 if(S.status_html)set('nid-out-status',S.status_html);
 if(S.notknown_html)set('nid-out-notknown',S.notknown_html);
 var box=document.getElementById('nid-out');if(box)draw(box,S);
}
function go(){
 fetch(BASE+'status.json?t='+Math.floor(Date.now()/60000),{cache:'no-store'}).then(function(r){return r.json();}).then(fill).catch(function(){if(FALLBACK)fill(FALLBACK);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
