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

function boot(){var m={'nid-na-arc':function(b){arc(b,false);},'nid-na-home':function(b){arc(b,true);},'nid-na-count':count};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,1500);
})();
