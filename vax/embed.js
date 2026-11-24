/* The News in Data: childhood vaccine attitudes (Gallup, Nov. 24, 2026) with MMR coverage and measles cases.
   Mounts: #nid-vx-time, #nid-vx-gap, #nid-vx-autism, #nid-vx-home. */
(function(){
if(window.__nidVx)return;window.__nidVx=1;
var GREEN='#007a55',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#b9c6bf',DEM='#3f6fb5',REP='#b8483a',AMBER='#c9a227';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
/* Gallup: % extremely/very important, % extremely important (survey start dates) */
var IMP=[[2001.5,94,64,'June 2001'],[2015.15,84,54,'Feb. 2015'],[2019.92,84,58,'Dec. 2019'],[2024.5,69,40,'July 2024'],[2026.75,72,47,'Oct. 2026']];
/* CDC SchoolVaxView: kindergartners with 2 MMR doses, national estimate, by school year (fall year) */
var MMR=[[2009,94.4],[2011,94.7],[2012,94.1],[2013,94.0],[2014,94.0],[2015,94.7],[2016,95.0],[2017,95.0],[2018,94.7],[2019,95.2],[2020,93.9],[2021,93.0],[2022,93.1],[2023,92.7],[2024,92.5],[2025,92.4]];
/* CDC confirmed measles cases by year; 2026 through Nov. 19 */
var CASES=[[2000,85],[2001,116],[2002,44],[2003,56],[2004,37],[2005,66],[2006,55],[2007,43],[2008,140],[2009,72],[2010,63],[2011,220],[2012,55],[2013,187],[2014,667],[2015,191],[2016,86],[2017,120],[2018,381],[2019,1274],[2020,13],[2021,49],[2022,121],[2023,59],[2024,285],[2025,2289],[2026,5838]];
var GAP={
 imp:{lab:'Extremely important',q:'Say it is extremely important for parents to vaccinate their children',rows:[['2001',66,62],['2015',59,52],['2019',67,52],['2024',63,26],['2026',66,27]]},
 safe:{lab:'Safer than the disease',q:'Say vaccines are not more dangerous than the diseases they prevent',rows:[['2001',92,91],['2015',89,88],['2019',88,85],['2024',94,63],['2026',93,61]]},
 req:{lab:'Require vaccines',q:'Say the government should require parents to vaccinate children against diseases like measles',rows:[['2019',72,53],['2024',69,36],['2026',68,42]]}
};
var AUT=[['All adults',16,46,38],['Democrats',5,70,24],['Republicans',29,18,53]];
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}
function T(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.sans?SANS:SERIF,'font-weight':o.w||'normal'},txt);g.appendChild(t);return t;}
function css(){
 if(document.getElementById('nid-vx-css'))return;var s=document.createElement('style');s.id='nid-vx-css';
 s.textContent='.nid-vx{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2em auto;position:relative}'+
 '.nid-vx .vx-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '.nid-vx .vx-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .9em;line-height:1.35}'+
 '.nid-vx svg{width:100%;height:auto;display:block;overflow:visible}'+
 '.nid-vx .vx-key{display:flex;flex-wrap:wrap;gap:.3em 1.1em;justify-content:center;margin:0 0 .6em;font:12px '+SANS+';color:'+MUTED+'}'+
 '.nid-vx .vx-key i{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:.35em;vertical-align:-1px}'+
 '.nid-vx .vx-src{font-size:.78em;color:'+MUTED+';margin:.8em 0 0;line-height:1.4}'+
 '.nid-vx .vx-tabs{display:flex;flex-wrap:wrap;gap:.4em;justify-content:center;margin:0 0 .8em}'+
 '.nid-vx .vx-tabs button{font:13px '+SANS+';border:1px solid '+RULE+';background:#fff;border-radius:999px;padding:.35em .85em;cursor:pointer;color:'+INK+'}'+
 '.nid-vx .vx-tabs button.on{background:'+INK+';color:#fff;border-color:'+INK+'}'+
 '.nid-vx .vx-q{text-align:center;font-size:.95em;margin:0 0 .4em;color:'+INK+'}';
 document.head.appendChild(s);
}
function frame(box,title,dek){css();box.innerHTML='';box.classList.add('nid-vx');var h=document.createElement('p');h.className='vx-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);if(dek){var d=document.createElement('p');d.className='vx-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}}
function src(box,html){var p=document.createElement('p');p.className='vx-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function seen(node,fn){if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){fn();io.disconnect();}},{threshold:.2});io.observe(node);}else fn();}
function fmt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',');}

/* ---------- 1. three stacked panels on one timeline ---------- */
function timeline(box,compact){
 var narrow=box.clientWidth<520;
 frame(box,'As Fewer Americans Call Childhood Vaccines Important, Measles Shots Have Slipped And Cases Have Soared',compact?null:'Three measures on one timeline. Drag or hover across the chart to compare a year.');
 var W=narrow?400:760,L=narrow?10:14,R=narrow?54:70,x0=1999.6,x1=2027.2;
 var X=function(v){return L+(v-x0)/(x1-x0)*(W-L-R);};
 var P1=[30,narrow?150:170],P2=[P1[1]+(narrow?62:66),P1[1]+(narrow?62:66)+(narrow?100:110)],P3=[P2[1]+(narrow?62:66),P2[1]+(narrow?62:66)+(narrow?120:140)];
 if(compact){P3=null;}
 var H=(compact?P2[1]:P3[1])+30;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 var fs=narrow?11.5:13;
 /* panel 1 */
 var y1=function(v){return P1[1]-(v-60)/(100-60)*(P1[1]-P1[0]);};
 T(svg,L,P1[0]-14,narrow?'Say vaccinating kids is extremely or very important':'Americans who say vaccinating children is extremely or very important',{s:fs,w:'bold'});
 [60,80,100].forEach(function(v){svg.appendChild(el('line',{x1:L,x2:W-R,y1:y1(v),y2:y1(v),stroke:v===60?RULE:FAINT}));T(svg,W-R+6,y1(v)+4,v+'%',{s:10.5,f:MUTED,sans:1});});
 var d1='';IMP.forEach(function(p,i){d1+=(i?'L':'M')+X(p[0])+' '+y1(p[1]);});
 var l1=el('path',{d:d1,fill:'none',stroke:GREEN,'stroke-width':2});svg.appendChild(l1);
 var dots1=IMP.map(function(p){var c=el('circle',{cx:X(p[0]),cy:y1(p[1]),r:narrow?4.5:5.5,fill:GREEN,stroke:'#fff','stroke-width':1.5});svg.appendChild(c);var low=p[1]===69;T(svg,X(p[0]),low?y1(p[1])+20:y1(p[1])-10,p[1]+'%',{a:'middle',s:narrow?11:12.5,w:'bold',f:GREEN,sans:1});return c;});
 /* panel 2 */
 var y2=function(v){return P2[1]-(v-91)/(96-91)*(P2[1]-P2[0]);};
 T(svg,L,P2[0]-14,'Kindergartners with both measles (MMR) shots',{s:fs,w:'bold'});
 [92,94,96].forEach(function(v){svg.appendChild(el('line',{x1:L,x2:W-R,y1:y2(v),y2:y2(v),stroke:FAINT}));T(svg,W-R+6,y2(v)+4,v+'%',{s:10.5,f:MUTED,sans:1});});
 svg.appendChild(el('line',{x1:L,x2:W-R,y1:y2(95),y2:y2(95),stroke:INK,'stroke-dasharray':'3 3',opacity:.5}));
 T(svg,L+2,y2(95)-5,'95% target',{s:10.5,f:MUTED,sans:1});
 var d2='';MMR.forEach(function(p,i){d2+=(i&&MMR[i-1][0]===p[0]-1?'L':'M')+X(p[0]+.7)+' '+y2(p[1]);});
 svg.appendChild(el('path',{d:d2,fill:'none',stroke:INK,'stroke-width':2}));
 var lm=MMR[MMR.length-1];T(svg,X(lm[0]+.7)-4,y2(lm[1])+18,lm[1]+'%',{a:'end',s:narrow?11:12.5,w:'bold',sans:1});svg.appendChild(el('circle',{cx:X(MMR[0][0]+.7),cy:y2(MMR[0][1]),r:2.5,fill:INK}));svg.appendChild(el('circle',{cx:X(lm[0]+.7),cy:y2(lm[1]),r:3.5,fill:INK}));
 /* panel 3 */
 var bars=[];
 if(!compact){
  var y3=function(v){return P3[1]-v/6000*(P3[1]-P3[0]);};
  T(svg,L,P3[0]-14,'Confirmed U.S. measles cases',{s:fs,w:'bold'});
  [2000,4000,6000].forEach(function(v){svg.appendChild(el('line',{x1:L,x2:W-R,y1:y3(v),y2:y3(v),stroke:FAINT}));T(svg,W-R+6,y3(v)+4,fmt(v),{s:10.5,f:MUTED,sans:1});});
  var bw=(X(2001)-X(2000))*.72;
  CASES.forEach(function(p){var b=el('rect',{x:X(p[0]+.5)-bw/2,y:P3[1],width:bw,height:0,fill:p[0]===2026?REP:'#d9a59d'});svg.appendChild(b);bars.push([b,y3(p[1]),P3[1]-y3(p[1])]);});
  T(svg,X(2026.5),y3(5838)-6,'5,838',{a:'end',s:narrow?11:12.5,w:'bold',f:REP,sans:1});
  T(svg,X(2019.5),y3(1274)-6,'1,274',{a:'middle',s:narrow?10:11.5,f:MUTED,sans:1});
 }
 var axY=(compact?P2[1]:P3[1]);
 [2000,2005,2010,2015,2020,2025].forEach(function(y){T(svg,X(y+.5),axY+18,narrow&&y!==2000?"'"+String(y).slice(2):String(y),{a:'middle',s:10.5,f:MUTED,sans:1});});
 /* scrubber */
 var g=el('g',{opacity:0});svg.appendChild(g);
 var ln=el('line',{y1:P1[0]-4,y2:axY,stroke:INK,'stroke-width':1,opacity:.35});g.appendChild(ln);
 var lab=T(g,0,P1[0]-26,'',{a:'middle',s:12,w:'bold',sans:1});
 var cap=el('text',{'font-family':SANS,'font-size':11.5,fill:INK});g.appendChild(cap);
 function at(yr){
  var mm=null,cc=null,ii=null;MMR.forEach(function(p){if(p[0]===yr)mm=p[1];});CASES.forEach(function(p){if(p[0]===yr)cc=p[1];});
  IMP.forEach(function(p){if(Math.floor(p[0])===yr)ii=p;});
  var x=X(yr+.5);ln.setAttribute('x1',x);ln.setAttribute('x2',x);lab.setAttribute('x',Math.min(Math.max(x,40),W-60));lab.textContent=String(yr);
  var parts=[];if(ii)parts.push(ii[1]+'% important ('+ii[3]+')');if(mm!==null)parts.push(mm+'% of kindergartners ('+yr+'-'+String(yr+1).slice(2)+')');if(cc!==null&&!compact)parts.push(fmt(cc)+' cases'+(yr===2026?' through Nov. 19':''));
  cap.textContent=parts.join(' · ');var cx=Math.min(Math.max(x,10),W-10);cap.setAttribute('x',cx);cap.setAttribute('y',H-2);cap.setAttribute('text-anchor',x<W/3?'start':(x>W*2/3?'end':'middle'));
  g.setAttribute('opacity',1);
 }
 function ev(e){var r=svg.getBoundingClientRect(),cx=(e.touches?e.touches[0].clientX:e.clientX);var vx=(cx-r.left)*W/r.width;var yr=Math.round(x0+(vx-L)/(W-L-R)*(x1-x0)-.5);yr=Math.min(Math.max(yr,2000),2026);at(yr);}
 svg.addEventListener('mousemove',ev);svg.addEventListener('touchmove',function(e){ev(e);},{passive:true});svg.addEventListener('touchstart',ev,{passive:true});
 svg.addEventListener('mouseleave',function(){g.setAttribute('opacity',0);});
 var len=l1.getTotalLength?l1.getTotalLength():0;l1.style.strokeDasharray=len;l1.style.strokeDashoffset=len;
 seen(svg,function(){l1.style.transition='stroke-dashoffset 1.4s ease';l1.style.strokeDashoffset=0;bars.forEach(function(b,i){setTimeout(function(){b[0].style.transition='y .5s, height .5s';b[0].setAttribute('y',b[1]);b[0].setAttribute('height',b[2]);},300+i*35);});});
 if(!compact)src(box,'Sources: Gallup polls (2001-2026); CDC SchoolVaxView, kindergartners with two MMR doses, national estimate by school year (no 2010-11 estimate); CDC confirmed measles cases, 2026 through Nov. 19.');
}

/* ---------- 2. partisan dumbbells ---------- */
function gap(box){
 var narrow=box.clientWidth<520;
 frame(box,'The Partisan Gap On Childhood Vaccines Has Widened Since 2019',null);
 var k=document.createElement('div');k.className='vx-key';k.innerHTML='<span><i style="background:'+DEM+'"></i>Democrats and Democratic-leaning independents</span><span><i style="background:'+REP+'"></i>Republicans and Republican-leaning independents</span>';box.appendChild(k);
 var tabs=document.createElement('div');tabs.className='vx-tabs';box.appendChild(tabs);
 var q=document.createElement('p');q.className='vx-q';hard(q,'.95em');box.appendChild(q);
 var W=narrow?400:760,L=narrow?44:60,R=narrow?54:80,rh=narrow?42:46;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+(5*rh+30)});box.appendChild(svg);
 var X=function(v){return L+v/100*(W-L-R);};
 function draw(key){
  [].forEach.call(tabs.children,function(b){b.className=b.dataset.k===key?'on':'';});
  var d=GAP[key];q.textContent=d.q;svg.innerHTML='';svg.setAttribute('viewBox','0 0 '+W+' '+(d.rows.length*rh+30));
  [0,25,50,75,100].forEach(function(v){svg.appendChild(el('line',{x1:X(v),x2:X(v),y1:0,y2:d.rows.length*rh,stroke:v?FAINT:RULE}));T(svg,X(v),d.rows.length*rh+16,v+'%',{a:'middle',s:10.5,f:MUTED,sans:1});});
  d.rows.forEach(function(r,i){var y=i*rh+rh/2;T(svg,L-10,y+5,r[0],{a:'end',s:narrow?13:15,w:r[0]==='2026'?'bold':'normal'});
   var ln=el('line',{x1:X(r[1]),x2:X(r[1]),y1:y,y2:y,stroke:GRAY,'stroke-width':narrow?5:6,'stroke-linecap':'round'});svg.appendChild(ln);
   var cd=el('circle',{cx:X(r[1]),cy:y,r:narrow?6.5:7.5,fill:DEM});var cr=el('circle',{cx:X(r[1]),cy:y,r:narrow?6.5:7.5,fill:REP});svg.appendChild(ln);svg.appendChild(cd);svg.appendChild(cr);
   var td=T(svg,X(r[1])+(r[1]>=r[2]?12:-12),y+4,r[1]+'%',{a:r[1]>=r[2]?'start':'end',s:narrow?11:12,f:DEM,w:'bold',sans:1});
   var tr=T(svg,X(r[2])+(r[2]>r[1]?12:-12),y+4,r[2]+'%',{a:r[2]>r[1]?'start':'end',s:narrow?11:12,f:REP,w:'bold',sans:1});
   if(Math.abs(r[1]-r[2])<6){tr.setAttribute('y',y-10);td.setAttribute('y',y+16);}
   var gp=Math.abs(r[1]-r[2]);T(svg,W-4,y+5,gp+' pts',{a:'end',s:narrow?11:12.5,f:gp>=25?INK:MUTED,w:gp>=25?'bold':'normal',sans:1});
   setTimeout(function(){cr.style.transition='cx .7s cubic-bezier(.2,.8,.2,1)';cr.setAttribute('cx',X(r[2]));ln.style.transition='x2 .7s cubic-bezier(.2,.8,.2,1)';ln.setAttribute('x2',X(r[2]));},60+i*80);});
  T(svg,W-4,-6,'Gap',{a:'end',s:10.5,f:MUTED,sans:1});
 }
 Object.keys(GAP).forEach(function(k){var b=document.createElement('button');b.dataset.k=k;b.textContent=GAP[k].lab;b.onclick=function(){draw(k);};tabs.appendChild(b);});
 seen(svg,function(){draw('imp');});draw('imp');
 src(box,'Source: Gallup. Requirement question first asked by Gallup by party in 2019; in 1991, 81% of all adults favored requirements (Princeton Survey Research Associates).');
}

/* ---------- 3. autism dot grids ---------- */
function autism(box){
 var narrow=box.clientWidth<520;
 frame(box,'29% Of Republicans Now Say Vaccines Cause Autism, Up From 19% In 2024','Each grid is 100 people, from Gallup’s October 2026 poll. Vaccines do not cause autism, according to decades of research.');
 var k=document.createElement('div');k.className='vx-key';k.innerHTML='<span><i style="background:'+REP+'"></i>Yes, a cause</span><span><i style="background:'+GREEN+'"></i>No, not a cause</span><span><i style="background:'+GRAY+'"></i>Unsure</span>';box.appendChild(k);
 var cols=narrow?1:3,gw=narrow?300:220,cell=narrow?20:18,r=cell*.36,W=narrow?400:760,gh=10*cell+44,H=narrow?3*(gh+16):gh+10;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 var all=[];
 AUT.forEach(function(a,gi){var ox=narrow?(W-10*cell)/2:(gi*(W/3))+(W/3-10*cell)/2,oy=narrow?gi*(gh+16):0;
  T(svg,ox+5*cell,oy+16,a[0],{a:'middle',s:narrow?15:16,w:'bold'});
  var seq=[];for(var i=0;i<a[1];i++)seq.push(REP);for(i=0;i<a[2];i++)seq.push(GREEN);for(i=0;i<a[3];i++)seq.push(GRAY);
  seq.forEach(function(c,i){var cx=ox+(i%10)*cell+cell/2,cy=oy+30+Math.floor(i/10)*cell+cell/2;var d=el('circle',{cx:cx,cy:cy,r:0,fill:c});svg.appendChild(d);all.push([d,gi,i]);});
  T(svg,ox+5*cell,oy+30+10*cell+12,a[1]+'% yes · '+a[2]+'% no · '+a[3]+'% unsure',{a:'middle',s:narrow?11.5:11.5,f:MUTED,sans:1});
 });
 seen(svg,function(){all.forEach(function(d){setTimeout(function(){d[0].style.transition='r .3s';d[0].setAttribute('r',r);},d[1]*250+d[2]*8);});});
 src(box,'Source: Gallup, Oct. 1-19, 2026; n=1,200 adults, margin of error ±4 points. Party groups include leaners. Figures may not sum to 100 because of rounding.');
}

function boot(){var m={'nid-vx-time':function(b){timeline(b,false);},'nid-vx-home':function(b){timeline(b,true);},'nid-vx-gap':gap,'nid-vx-autism':autism};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,1500);
})();
