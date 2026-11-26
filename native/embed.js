/* The News in Data: Native American population, before 1492 to 2020 (Nov. 25, 2026). Redo of the Nov. 2016 archive post.
   Mounts: #nid-na-arc, #nid-na-count, #nid-na-home. */
(function(){
if(window.__nidNa)return;window.__nidNa=1;
var GREEN='#007a55',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#b9c6bf',RUST='#b8483a',LIGHT='#9fcbb6';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
/* Estimates for North America north of Mexico around 1492 (Thornton, in America Becoming, NRC 2001, Table 5-1) */
var EST=[['Kroeber','1939',0.9],['Mooney','1928',1.153],['Ubelaker','1988',1.894],['Driver','1969',3.5],['Denevan','1976',4.4],['Thornton','1987',7],['Dobyns','1966',11.15,'9.8 to 12.5 million'],['Ramenofsky','1987',12],['Dobyns','1983',18]];
/* U.S. census counts, American Indian and Alaska Native (alone from 2000) */
var CEN=[[1900,0.266732],[1910,0.291014],[1920,0.270995],[1930,0.36238],[1940,0.366427],[1950,0.377273],[1960,0.551669],[1970,0.827268],[1980,1.4204],[1990,1.959234],[2000,2.475956],[2010,2.932248],[2020,3.727135]];
var COMBO=[[2000,4.119301],[2010,5.220579],[2020,9.666058]];
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}
function T(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.sans?SANS:SERIF,'font-weight':o.w||'normal'},txt);g.appendChild(t);return t;}
function css(){
 if(document.getElementById('nid-na-css'))return;var s=document.createElement('style');s.id='nid-na-css';
 s.textContent='.nid-na{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2em auto;position:relative}'+
 '.nid-na .na-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '.nid-na .na-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .9em;line-height:1.35}'+
 '.nid-na svg{width:100%;height:auto;display:block;overflow:visible}'+
 '.nid-na .na-key{display:flex;flex-wrap:wrap;gap:.3em 1.1em;justify-content:center;margin:0 0 .6em;font:12px '+SANS+';color:'+MUTED+'}'+
 '.nid-na .na-key i{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:.35em;vertical-align:-1px}'+
 '.nid-na .na-src{font-size:.78em;color:'+MUTED+';margin:.8em 0 0;line-height:1.4}'+
 '.nid-na .na-card{background:#fff;border:1px solid '+RULE+';border-radius:10px;padding:.7em 1em;margin:.7em 0 0;font-size:.95em;line-height:1.45;min-height:2.6em}'+
 '.nid-na .na-tabs{display:flex;gap:.4em;justify-content:center;margin:0 0 .8em}'+
 '.nid-na .na-tabs button{font:13px '+SANS+';border:1px solid '+RULE+';background:#fff;border-radius:999px;padding:.35em .9em;cursor:pointer;color:'+INK+'}'+
 '.nid-na .na-tabs button.on{background:'+INK+';color:#fff;border-color:'+INK+'}'+
 '.nid-na .na-tip{position:absolute;pointer-events:none;background:#fff;border:1px solid '+RULE+';border-radius:8px;padding:.4em .65em;font-size:.86em;line-height:1.35;box-shadow:0 2px 8px rgba(0,0,0,.08);display:none;z-index:5;max-width:240px}';
 document.head.appendChild(s);
}
function frame(box,title,dek){css();box.innerHTML='';box.classList.add('nid-na');var h=document.createElement('p');h.className='na-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);if(dek){var d=document.createElement('p');d.className='na-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}}
function src(box,html){var p=document.createElement('p');p.className='na-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function seen(node,fn){if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){fn();io.disconnect();}},{threshold:.2});io.observe(node);}else fn();}
function tipper(box){var t=document.createElement('div');t.className='na-tip';box.appendChild(t);return {show:function(h,ev){t.innerHTML=h;t.style.display='block';var r=box.getBoundingClientRect(),x=ev.clientX-r.left+12,y=ev.clientY-r.top+12;if(x+250>r.width)x=ev.clientX-r.left-252;t.style.left=Math.max(0,x)+'px';t.style.top=y+'px';},hide:function(){t.style.display='none';}};}
function fm(v){return v>=1?(Math.round(v*10)/10)+' million':Math.round(v*1000)+',000';}

/* ---------- 1. before 1492 vs. the census ---------- */
function arc(box,compact){
 var narrow=box.clientWidth<520;
 frame(box,'Native Americans Numbered Fewer Than 300,000 In 1900, And The 2020 Census Counted 9.7 Million',compact?null:'Left: scholars’ estimates of the Native population north of Mexico around 1492. Right: U.S. census counts since 1900, on the same scale.');
 if(!compact){var k=document.createElement('div');k.className='na-key';k.innerHTML='<span><i style="background:'+GRAY+'"></i>Estimate for 1492</span><span><i style="background:'+INK+'"></i>Native American alone</span><span><i style="background:'+GREEN+'"></i>Alone or with another race</span>';box.appendChild(k);}
 var W=narrow?400:760,top=20,H=narrow?380:430,bot=H-34,L=narrow?40:52,R=narrow?10:20;
 var pw=narrow?118:230,gx=L+pw+(narrow?26:44);
 var Y=function(v){return bot-v/20*(bot-top);};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);var tip=tipper(box);
 [0,5,10,15,20].forEach(function(v){svg.appendChild(el('line',{x1:L,x2:W-R,y1:Y(v),y2:Y(v),stroke:v?FAINT:RULE}));T(svg,L-6,Y(v)+4,v?v+'M':'0',{a:'end',s:10.5,f:MUTED,sans:1});});
 T(svg,L+pw/2,bot+18,'Around 1492',{a:'middle',s:narrow?11:12,f:INK,sans:1,w:'600'});
 /* break marks */
 var bx=L+pw+(gx-L-pw)/2;svg.appendChild(el('rect',{x:L+pw+4,y:top-6,width:gx-L-pw-8,height:bot-top+12,fill:'#fff'}));
 svg.appendChild(el('path',{d:'M'+(bx-5)+' '+(bot+6)+'l5 -12M'+(bx+1)+' '+(bot+6)+'l5 -12',stroke:MUTED,'stroke-width':1.2,fill:'none'}));
 /* estimates as a dot strip */
 var dots=[],lastLy=1e9;
 EST.forEach(function(e,i){var cx=L+12+(i%2)*(narrow?16:24)+(narrow?6:30),cy=Y(e[2]);
  var c=el('circle',{cx:cx,cy:cy,r:0,fill:GRAY,stroke:'#fff','stroke-width':1.2,style:'cursor:pointer'});svg.appendChild(c);dots.push([c,narrow?5:6]);
  var h='<b>'+e[0]+' ('+e[1]+')</b><br>'+(e[3]||fm(e[2]))+' people north of Mexico';c.addEventListener('mousemove',function(ev){tip.show(h,ev);});c.addEventListener('mouseleave',tip.hide);c.addEventListener('click',function(ev){tip.show(h,ev);});
  var ly=Math.min(cy+4,lastLy-14);if(!narrow||[0,5,8].indexOf(i)>=0){lastLy=ly;T(svg,(narrow?cx:L+(narrow?52:84))+12,ly,e[0]+' '+e[1]+': '+(e[3]?'9.8-12.5M':(e[2]>=1?e[2].toFixed(e[2]%1?1:0)+'M':'0.9M')),{s:narrow?10:11.5,f:MUTED,sans:1});}
 });
 /* census panel */
 var X=function(y){return gx+(y-1900)/120*(W-R-gx-(narrow?44:70));};
 [1900,1940,1980,2020].forEach(function(y){T(svg,X(y),bot+18,String(y),{a:'middle',s:10.5,f:MUTED,sans:1});});
 var d='';CEN.forEach(function(p,i){d+=(i?'L':'M')+X(p[0])+' '+Y(p[1]);});
 var line=el('path',{d:d,fill:'none',stroke:INK,'stroke-width':2});svg.appendChild(line);
 CEN.forEach(function(p){var c=el('circle',{cx:X(p[0]),cy:Y(p[1]),r:narrow?3:3.5,fill:INK,style:'cursor:pointer'});svg.appendChild(c);var h='<b>'+p[0]+' census</b><br>'+(p[1]<1?Math.round(p[1]*1e6).toLocaleString('en-US'):fm(p[1]))+(p[0]>=2000?' alone':'');c.addEventListener('mousemove',function(ev){tip.show(h,ev);});c.addEventListener('mouseleave',tip.hide);});
 var dc='';COMBO.forEach(function(p,i){dc+=(i?'L':'M')+X(p[0])+' '+Y(p[1]);});
 var cl=el('path',{d:dc,fill:'none',stroke:GREEN,'stroke-width':2.5});svg.appendChild(cl);
 COMBO.forEach(function(p){var c=el('circle',{cx:X(p[0]),cy:Y(p[1]),r:narrow?4:5,fill:GREEN,style:'cursor:pointer'});svg.appendChild(c);var h='<b>'+p[0]+' census</b><br>'+fm(p[1])+' alone or with another race';c.addEventListener('mousemove',function(ev){tip.show(h,ev);});c.addEventListener('mouseleave',tip.hide);});
 T(svg,X(2020)+8,Y(9.666)+4,'9.7M',{s:narrow?12:14,w:'bold',f:GREEN,sans:1});
 T(svg,X(2020)+8,Y(3.727)+4,'3.7M',{s:narrow?11:13,w:'bold',f:INK,sans:1});
 T(svg,X(1900)+4,Y(0.27)-12,narrow?'1900: 267,000':'1900: 267,000, the low point',{s:narrow?10.5:12,f:RUST,w:'600',sans:1});
 var ln=line.getTotalLength?line.getTotalLength():0;line.style.strokeDasharray=ln;line.style.strokeDashoffset=ln;
 var lc=cl.getTotalLength?cl.getTotalLength():0;cl.style.strokeDasharray=lc;cl.style.strokeDashoffset=lc;
 seen(svg,function(){dots.forEach(function(d,i){setTimeout(function(){d[0].style.transition='r .35s';d[0].setAttribute('r',d[1]);},i*90);});setTimeout(function(){line.style.transition='stroke-dashoffset 1.3s ease';line.style.strokeDashoffset=0;},500);setTimeout(function(){cl.style.transition='stroke-dashoffset .9s ease';cl.style.strokeDashoffset=0;},1600);});
 if(!compact)src(box,'Sources: estimates compiled by Russell Thornton, “Trends Among American Indians in the United States,” National Research Council (2001), for North America north of Mexico, which includes Canada and Greenland; U.S. Census Bureau counts of American Indians and Alaska Natives, 1900-2020 (1980 from Thornton). Before 2000, census forms allowed only one race.');
}

/* ---------- 2. two ways to count ---------- */
function count(box){
 var narrow=box.clientWidth<520;
 frame(box,'Most Of The Growth Since 2010 Came From People Who Also Named Another Race','Each square is 100,000 people counted as American Indian or Alaska Native.');
 var k=document.createElement('div');k.className='na-key';k.innerHTML='<span><i style="background:'+INK+';border-radius:2px"></i>Native American alone</span><span><i style="background:'+GREEN+';border-radius:2px"></i>Native American and another race</span>';box.appendChild(k);
 var tabs=document.createElement('div');tabs.className='na-tabs';box.appendChild(tabs);
 var cols=narrow?10:20,cell=narrow?24:26,W=cols*cell,rows=Math.ceil(97/cols),H=rows*cell+6;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,style:'max-width:'+(narrow?260:520)+'px;margin:0 auto'});box.appendChild(svg);
 var sq=[];for(var i=0;i<97;i++){var r=el('rect',{x:(i%cols)*cell+2,y:Math.floor(i/cols)*cell+2,width:cell-5,height:cell-5,rx:3,fill:INK,opacity:0});svg.appendChild(r);sq.push(r);}
 var cd=document.createElement('div');cd.className='na-card';hard(cd,'.95em');box.appendChild(cd);
 var DATA={2000:[2.475956,4.119301],2010:[2.932248,5.220579],2020:[3.727135,9.666058]};
 function show(y){[].forEach.call(tabs.children,function(b){b.className=b.dataset.y==y?'on':'';});var a=Math.round(DATA[y][0]*10),t=Math.round(DATA[y][1]*10);
  sq.forEach(function(r,i){r.style.transition='opacity .3s, fill .3s';r.style.transitionDelay=(i*6)+'ms';if(i<a){r.setAttribute('fill',INK);r.setAttribute('opacity',1);}else if(i<t){r.setAttribute('fill',GREEN);r.setAttribute('opacity',1);}else r.setAttribute('opacity',0);});
  cd.innerHTML='<b>'+y+':</b> '+fm(DATA[y][1])+' in all, including '+fm(DATA[y][0])+' who named only American Indian or Alaska Native'+(y==2020?'. The multiracial group grew 160% from 2010, partly because the Census Bureau changed how it asked about and coded race.':'.');}
 [2000,2010,2020].forEach(function(y){var b=document.createElement('button');b.dataset.y=y;b.textContent=y;b.onclick=function(){show(y);};tabs.appendChild(b);});
 seen(svg,function(){show(2020);});
 src(box,'Source: U.S. Census Bureau, 2000, 2010 and 2020 censuses. Squares are rounded to the nearest 100,000.');
}

/* Law Dome ice core, CO2 spline fit (ppm), MacFarling Meure et al. 2006 via NOAA NCEI, every 5 years 1400-1800 */
var ICE=[[1400,280.2],[1405,280],[1410,279.7],[1415,279.1],[1420,278.8],[1425,279.2],[1430,280.9],[1435,282.7],[1440,283],[1445,282.5],[1450,281.6],[1455,280.8],[1460,280.2],[1465,279.8],[1470,279.6],[1475,279.7],[1480,280.1],[1485,280.6],[1490,281.2],[1495,281.7],[1500,282.3],[1505,282.6],[1510,282.9],[1515,283.1],[1520,283.1],[1525,283.2],[1530,283.2],[1535,283.2],[1540,283.2],[1545,283.1],[1550,282.7],[1555,282.2],[1560,281.8],[1565,281.6],[1570,281.8],[1575,282.1],[1580,282.2],[1585,281.6],[1590,279.7],[1595,277.4],[1600,275.4],[1605,273.6],[1610,272],[1615,271.6],[1620,272.3],[1625,273.4],[1630,274.7],[1635,275.8],[1640,276.6],[1645,277],[1650,277.2],[1655,277.1],[1660,276.9],[1665,276.6],[1670,276.2],[1675,276],[1680,275.9],[1685,276],[1690,276.3],[1695,276.5],[1700,276.6],[1705,276.6],[1710,276.6],[1715,276.7],[1720,277],[1725,277.5],[1730,278],[1735,278],[1740,277.2],[1745,276.8],[1750,276.8],[1755,276.7],[1760,276.5],[1770,277.3],[1780,278.2],[1790,280],[1800,282.6]];
function ice(box){
 var narrow=box.clientWidth<520;
 frame(box,'The Native Population Of The Americas Fell 90% After 1492, A Loss So Vast It Shows Up In Antarctic Ice',null);
 var W=narrow?400:760,L=narrow?40:52,R=narrow?14:24,dotTop=16,cols=narrow?20:30,dr=narrow?5.2:6.2,gap=narrow?17:21,rows=Math.ceil(60/cols);
 var dotsH=rows*gap+26,top=dotTop+dotsH+20,H=top+(narrow?220:260),bot=H-30;
 var X=function(y){return L+(y-1400)/400*(W-L-R);},lo=270,hi=285,Y=function(v){return top+(hi-v)/(hi-lo)*(bot-top);};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 /* people dots: 60 = 60.5 million before 1492; 90% gone within a century */
 var dw=(cols-1)*gap,dx0=(W-dw)/2,dots=[];
 for(var i=0;i<60;i++){var c=el('circle',{cx:dx0+(i%cols)*gap,cy:dotTop+10+Math.floor(i/cols)*gap,r:dr,fill:GREEN});svg.appendChild(c);dots.push(c);}
 var lab=T(svg,W/2,dotTop+rows*gap+18,narrow?'60.5 million before 1492 · 1 dot = 1 million':'60.5 million people in the Americas before 1492 · 1 dot = 1 million',{a:'middle',s:narrow?12:14,w:'bold'});
 /* CO2 axes */
 [272,276,280,284].forEach(function(v){svg.appendChild(el('line',{x1:L,x2:W-R,y1:Y(v),y2:Y(v),stroke:FAINT}));T(svg,L-6,Y(v)+4,v+(narrow?'':' ppm'),{a:'end',s:10.5,f:MUTED,sans:1});});
 (narrow?[1400,1500,1600,1700,1800]:[1400,1450,1500,1550,1600,1650,1700,1750,1800]).forEach(function(y){T(svg,X(y),bot+18,String(y),{a:'middle',s:10.5,f:MUTED,sans:1});});
 svg.appendChild(el('rect',{x:X(1492),y:top,width:X(1600)-X(1492),height:bot-top,fill:'#f7eeec'}));T(svg,W-R,top-8,narrow?'CO₂ in Antarctic ice (ppm)':'Carbon dioxide in Antarctic ice (ppm)',{a:'end',s:narrow?10.5:11.5,f:MUTED,sans:1,w:'bold'});
 svg.appendChild(el('line',{x1:X(1492),x2:X(1492),y1:top-4,y2:bot,stroke:RUST,'stroke-dasharray':'3 3'}));
 T(svg,X(1492),top-8,'1492',{a:'middle',s:12,f:RUST,w:'bold',sans:1});
  var d='';ICE.forEach(function(p,i){d+=(i?' L':'M')+X(p[0])+' '+Y(p[1]);});
 var area=el('path',{d:d+' L'+X(1800)+' '+bot+' L'+X(1400)+' '+bot+' Z',fill:'#e9f2ee',opacity:0,'fill-opacity':.75});svg.appendChild(area);T(svg,(X(1492)+X(1600))/2,bot-8,narrow?'90% died':'About 90% died within a century',{a:'middle',s:narrow?10.5:11.5,f:RUST,sans:1,w:'bold'});
 var ln=el('path',{d:d,fill:'none',stroke:INK,'stroke-width':2.4,'stroke-linejoin':'round'});svg.appendChild(ln);
 var lowx=X(1615),lowy=Y(271.6);var lc=el('circle',{cx:lowx,cy:lowy,r:4.5,fill:'#fff',stroke:INK,'stroke-width':2,opacity:0});svg.appendChild(lc);
 var lt=T(svg,lowx+10,lowy+4,narrow?'1610s low':'Lowest in 2,000 years of this record, 1610s',{s:narrow?11:12,w:'bold',sans:1});lt.style.opacity=0;
 var pk=T(svg,X(1545),Y(283.2)-9,narrow?'283 ppm':'283 ppm, early 1500s',{a:'middle',s:narrow?10.5:11.5,f:MUTED,sans:1});
 seen(svg,function(){var len=ln.getTotalLength();ln.style.strokeDasharray=len;ln.style.strokeDashoffset=len;ln.getBoundingClientRect();ln.style.transition='stroke-dashoffset 4s linear';ln.style.strokeDashoffset=0;
  /* fade 54 of 60 dots while the line crosses 1492-1600 (25%-50% of the draw) */
  var order=[];for(var k=0;k<60;k++)order.push(k);order.sort(function(a,b){return ((a*37)%60)-((b*37)%60);});var keep={};order.slice(0,6).forEach(function(k){keep[k]=1;});
  var n=0;order.forEach(function(k){if(keep[k])return;var t=1000+(n++)*(1150/54);setTimeout(function(){dots[k].style.transition='fill .5s, opacity .5s';dots[k].setAttribute('fill','#d9e1dc');},t);});
  setTimeout(function(){lab.textContent=narrow?'About 6 million by 1600':'About 6 million by 1600 · 1 dot = 1 million';},2200);
  setTimeout(function(){area.style.transition='opacity .8s';area.setAttribute('opacity',1);lc.style.transition='opacity .5s';lc.setAttribute('opacity',1);lt.style.transition='opacity .5s';lt.style.opacity=1;},2600);});
 src(box,'Sources: Koch et al., <a href="https://doi.org/10.1016/j.quascirev.2018.12.004">Quaternary Science Reviews</a> (2019); Law Dome ice core, MacFarling Meure et al., Geophysical Research Letters (2006).');
}
/* 2020 census, Detailed DHC-A: people naming each tribal grouping, [name, alone or in any combination, tribe alone] */
var TRIBES=[['Cherokee',1513326,214940],['Navajo Nation',423412,315086],['Blackfeet',297899,34810],['Choctaw',255557,69454],['Chippewa',130048,39057],['Apache',129589,36492],['Sioux',126571,30408],['Muscogee (Creek)',121581,40677],['Chickasaw',85511,29436],['Lumbee',79424,54293]];
function tribes(box){
 var narrow=box.clientWidth<520;
 frame(box,'Only 1 In 7 People Who Named Cherokee Listed No Other Tribe Or Race, Compared With 3 In 4 For Navajo','The 10 largest U.S. tribal groupings in the 2020 census. The full bar is everyone who named the tribe; the dark part named only that tribe.');
 var k=document.createElement('div');k.style.cssText='display:flex;gap:1.1em;justify-content:center;flex-wrap:wrap;margin:0 0 .6em;font:12px '+SANS+';color:'+MUTED;
 k.innerHTML='<span><i style="display:inline-block;width:11px;height:11px;border-radius:2px;background:'+GREEN+';margin-right:.35em;vertical-align:-1px"></i>Named only this tribe</span><span><i style="display:inline-block;width:11px;height:11px;border-radius:2px;background:'+LIGHT+';margin-right:.35em;vertical-align:-1px"></i>Also named another tribe or race</span>';box.appendChild(k);
 var W=narrow?400:760,L=narrow?104:150,R=narrow?54:70,rowH=narrow?30:34,top=6,H=top+TRIBES.length*rowH+24;
 var X=function(v){return L+v/1600000*(W-L-R);};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);var tip=tipper(box);var bars=[];
 [0,500000,1000000,1500000].forEach(function(v){svg.appendChild(el('line',{x1:X(v),x2:X(v),y1:top,y2:H-20,stroke:FAINT}));T(svg,X(v),H-6,v?(v/1e6)+(narrow?'M':' million'):'0',{a:'middle',s:10.5,f:MUTED,sans:1});});
 TRIBES.forEach(function(t,i){var y=top+i*rowH,bh=rowH-12,hl=i<2,pct=Math.round(t[2]/t[1]*100);
  T(svg,L-8,y+bh/2+5,t[0],{a:'end',s:narrow?11.5:13,w:hl?'bold':'normal'});
  var b1=el('rect',{x:L,y:y+4,width:0,height:bh,rx:3,fill:LIGHT,style:'cursor:pointer'}),b2=el('rect',{x:L,y:y+4,width:0,height:bh,rx:3,fill:GREEN,style:'cursor:pointer'});svg.appendChild(b1);svg.appendChild(b2);bars.push([b1,X(t[1])-L],[b2,X(t[2])-L]);
  var lt=T(svg,X(t[1])+6,y+bh/2+5,pct+'%',{s:narrow?11.5:13,w:'bold',f:pct>50?GREEN:INK,sans:1});lt.style.opacity=0;bars.push([lt]);
  var h='<b>'+t[0]+'</b><br>'+t[1].toLocaleString()+' named this tribe<br>'+t[2].toLocaleString()+' named only this tribe ('+pct+'%)';
  [b1,b2].forEach(function(b){b.addEventListener('mousemove',function(ev){tip.show(h,ev);});b.addEventListener('mouseleave',tip.hide);b.addEventListener('click',function(ev){tip.show(h,ev);});});});
  seen(svg,function(){bars.forEach(function(b,i){setTimeout(function(){if(b[1]!=null){b[0].style.transition='width .8s ease';b[0].setAttribute('width',Math.max(1,b[1]));}else{b[0].style.transition='opacity .4s';b[0].style.opacity=1;}},Math.floor(i/3)*110+(i%3==1?350:0));});});
 src(box,'Source: U.S. Census Bureau, 2020 Census Detailed Demographic and Housing Characteristics File A. “Cherokee” is the general Cherokee grouping; the census separately counted 77,232 people naming the Cherokee Nation and 14,090 naming the Eastern Band of Cherokee Indians. Latin American Indigenous groups such as Aztec and Maya are not shown.');
}

function boot(){var m={'nid-na-arc':function(b){arc(b,false);},'nid-na-home':function(b){arc(b,true);},'nid-na-count':count,'nid-na-ice':ice,'nid-na-tribes':tribes};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,1500);
})();
