/* The News in Data: GTA VI and internet traffic records (Nov. 22, 2026).
   Mounts: #nid-gt-ladder, #nid-gt-streams, #nid-gt-dl, #nid-gt-home. */
(function(){
if(window.__nidGt)return;window.__nidGt=1;
var GREEN='#007a55',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#a9b6af',PURPLE='#6b4fb3',SOCCER='#2f8f5b';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
/* [date, Tbps, series F=Frankfurt G=global, cause key, note] */
var REC=[
 ['2020-11-03',10,'F','x','First 10 Tbps. DE-CIX cited a possible mix of Champions League, the U.S. election, software updates and Germany’s lockdown.'],
 ['2022-02-01',11,'F','x','No single cause given; traffic had grown sharply since the pandemic began.'],
 ['2022-08-09',12,'F','x','No cause given.'],
 ['2022-12-14',14,'F','s','World Cup semifinal, France vs. Morocco.'],
 ['2023-09-20',15.29,'F','s','Start of the Champions League season, the same week as a new iOS release.'],
 ['2024-04-16',17.09,'F','s','Champions League quarterfinals.'],
 ['2024-11-20',18.11,'F','x','No single cause given.'],
 ['2026-09-18',20.02,'F','x','First 20 Tbps in Frankfurt; global traffic passed 30 Tbps the same day.'],
 ['2026-10-13',21.47,'F','s','20 minutes after kickoff of Champions League matches.'],
 ['2026-11-10',22.30,'F','g','GTA VI pre-downloads open.'],
 ['2025-04-08',25,'G','x','Live sports and large software updates across Frankfurt, Madrid, Istanbul and Dallas.'],
 ['2026-10-13',32.10,'G','s','Champions League night.'],
 ['2026-11-10',33.01,'G','g','GTA VI pre-downloads open.'],
 ['2026-11-18',33.03,'G','g','Hours before GTA VI’s midnight launch in the U.S., at 8:20 p.m. in Frankfurt.']
];
var CAUSE={s:['Soccer',SOCCER],g:['GTA VI',PURPLE],x:['Other or not stated',GRAY]};
var MON=['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
function fdate(d){var p=d.split('-');return MON[+p[1]-1]+' '+(+p[2])+', '+p[0];}
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}
function T(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.sans?SANS:SERIF,'font-weight':o.w||'normal'},txt);g.appendChild(t);return t;}
function css(){
 if(document.getElementById('nid-gt-css'))return;var s=document.createElement('style');s.id='nid-gt-css';
 s.textContent='.nid-gt{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2em auto;position:relative}'+
 '.nid-gt .gt-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '.nid-gt .gt-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .9em;line-height:1.35}'+
 '.nid-gt svg{width:100%;height:auto;display:block;overflow:visible}'+
 '.nid-gt .gt-key{display:flex;flex-wrap:wrap;gap:.3em 1.1em;justify-content:center;margin:0 0 .6em;font:12px '+SANS+';color:'+MUTED+'}'+
 '.nid-gt .gt-key i{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:.35em;vertical-align:-1px}'+
 '.nid-gt .gt-card{background:#fff;border:1px solid '+RULE+';border-radius:10px;padding:.7em 1em;margin:.7em 0 0;font-size:.95em;line-height:1.45;min-height:2.6em}'+
 '.nid-gt .gt-src{font-size:.78em;color:'+MUTED+';margin:.8em 0 0;line-height:1.4}'+
 '.nid-gt .gt-tip{position:absolute;pointer-events:none;background:#fff;border:1px solid '+RULE+';border-radius:8px;padding:.4em .65em;font-size:.86em;line-height:1.35;box-shadow:0 2px 8px rgba(0,0,0,.08);display:none;z-index:5;max-width:250px}'+
 '.nid-gt .gt-big{font-size:3em;font-weight:bold;color:'+GREEN+';text-align:center;line-height:1.05;margin:.2em 0 0}'+
 '.nid-gt .gt-sub{text-align:center;color:'+MUTED+';font-size:.95em;margin:.2em 0 .8em}'+
 '.nid-gt input[type=range]{width:100%;accent-color:'+GREEN+';margin:.4em 0}'+
 '.nid-gt .gt-chips{display:flex;flex-wrap:wrap;gap:.4em;justify-content:center;margin:.5em 0 0}'+
 '.nid-gt .gt-chips button{font:13px '+SANS+';border:1px solid '+RULE+';background:#fff;border-radius:999px;padding:.35em .8em;cursor:pointer;color:'+INK+'}'+
 '.nid-gt .gt-chips button.on{background:'+GREEN+';color:#fff;border-color:'+GREEN+'}';
 document.head.appendChild(s);
}
function frame(box,title,dek){css();box.innerHTML='';box.classList.add('nid-gt');var h=document.createElement('p');h.className='gt-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);if(dek){var d=document.createElement('p');d.className='gt-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}}
function src(box,html){var p=document.createElement('p');p.className='gt-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function tipper(box){var t=document.createElement('div');t.className='gt-tip';box.appendChild(t);return {show:function(h,ev){t.innerHTML=h;t.style.display='block';var r=box.getBoundingClientRect(),x=ev.clientX-r.left+12,y=ev.clientY-r.top+12;if(x+260>r.width)x=ev.clientX-r.left-262;t.style.left=Math.max(0,x)+'px';t.style.top=y+'px';},hide:function(){t.style.display='none';}};}
function seen(node,fn){if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){fn();io.disconnect();}},{threshold:.2});io.observe(node);}else fn();}
function card(box,html){var c=document.createElement('div');c.className='gt-card';c.innerHTML=html;hard(c,'.95em');box.appendChild(c);return c;}
function dnum(d){var p=d.split('-');return +p[0]+((+p[1]-1)+(+p[2]-1)/31)/12;}

/* ---------- 1. record ladder ---------- */
function ladder(box,compact){
 var narrow=box.clientWidth<520;
 frame(box,'GTA VI Pushed DE-CIX’s Global Internet Traffic To A Record 33 Terabits Per Second',compact?null:'Every record peak at DE-CIX, a network of internet exchanges based in Frankfurt, colored by what DE-CIX said was happening at the time.');
 if(!compact){var k=document.createElement('div');k.className='gt-key';['s','g','x'].forEach(function(c){var s=document.createElement('span');s.innerHTML='<i style="background:'+CAUSE[c][1]+'"></i>'+CAUSE[c][0];k.appendChild(s);});box.appendChild(k);}
 var W=narrow?400:760,L=narrow?30:44,R=narrow?84:150,top=18,H=narrow?340:410,bot=H-(narrow?48:40);
 var DATES=REC.map(function(r){return r[0];}).filter(function(d,i,a){return a.indexOf(d)===i;}).sort(),y1=36;
 var X=function(d){return L+(DATES.indexOf(d)+.5)/DATES.length*(W-L-R);},Y=function(v){return bot-(v/y1)*(bot-top);};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 [0,10,20,30].forEach(function(v){svg.appendChild(el('line',{x1:L,x2:W-R+10,y1:Y(v),y2:Y(v),stroke:v?FAINT:RULE}));T(svg,L-6,Y(v)+4,String(v),{a:'end',s:narrow?10:11,f:MUTED,sans:1});});
 T(svg,L-6,top-4,narrow?'Tbps':'Terabits per second',{s:narrow?10:11,f:MUTED,sans:1});
 var prevY='';DATES.forEach(function(d,i){var p=d.split('-'),m=MON[+p[1]-1].replace('.','').slice(0,3)+(p[0]==='2026'?' '+(+p[2]):'');var yy=narrow&&i%2?bot+28:bot+15;T(svg,X(d),yy,m,{a:'middle',s:narrow?9:10.5,f:p[0]==='2026'?INK:MUTED,sans:1});if(p[0]!==prevY){T(svg,X(d),narrow?bot+41:bot+29,narrow?"'"+p[0].slice(2):p[0],{a:'middle',s:narrow?9:10.5,f:MUTED,sans:1,w:'600'});prevY=p[0];}if(!narrow&&i)svg.appendChild(el('line',{x1:X(d),x2:X(d),y1:bot,y2:bot+4,stroke:RULE}));});
 var tip=tipper(box),cardEl=compact?null:card(box,'Hover or tap a dot for the record.');
 var marks=[];
 ['F','G'].forEach(function(sr){
  var pts=REC.filter(function(r){return r[2]===sr;}).sort(function(a,b){return a[0].localeCompare(b[0]);});
  var d='';pts.forEach(function(r,i){var x=X(r[0]),y=Y(r[1]);d+=(i?'H'+x+'V'+y:'M'+x+' '+y);});
  d+='h'+(narrow?6:14);
  var p=el('path',{d:d,fill:'none',stroke:sr==='G'?INK:MUTED,'stroke-width':sr==='G'?1.6:1.3,'stroke-dasharray':sr==='G'?'':'3 3',opacity:.5});svg.appendChild(p);
  var last=pts[pts.length-1];
  T(svg,X(last[0])+(narrow?10:20),Y(last[1])+4,sr==='G'?(narrow?'All exchanges':'All DE-CIX exchanges'):'Frankfurt',{s:narrow?10.5:12,f:INK,sans:1,w:'600'});
  if(!narrow)T(svg,X(last[0])+20,Y(last[1])+19,last[1].toFixed(2)+' Tbps',{s:11,f:MUTED,sans:1});
  pts.forEach(function(r){var c=el('circle',{cx:X(r[0]),cy:Y(r[1]),r:0,fill:CAUSE[r[3]][1],stroke:'#fff','stroke-width':1.5,style:'cursor:pointer'});
   var h='<b>'+r[1]+' Tbps'+(sr==='G'?' worldwide':' in Frankfurt')+'</b><br>'+fdate(r[0])+'<br>'+r[4];
   c.addEventListener('mousemove',function(ev){tip.show(h,ev);});c.addEventListener('mouseleave',tip.hide);c.addEventListener('click',function(){if(cardEl)cardEl.innerHTML=h.replace(/<br>/g,' · ');});
   svg.appendChild(c);marks.push(c);});
 });
 
 seen(svg,function(){marks.forEach(function(c,i){setTimeout(function(){c.style.transition='r .35s';c.setAttribute('r',narrow?4.5:5.5);},i*60);});});
 if(!compact)src(box,'Source: DE-CIX press releases, 2020-2026. Global records across all DE-CIX exchanges are shown from 2025, when DE-CIX began announcing them. Causes are as DE-CIX described them; DE-CIX has not published every record. Records are spaced evenly, not to a time scale.');
}

/* ---------- 2. livestream records ---------- */
var STR=[['Jan. 2009','Obama inauguration','Akamai, all streams on its network',7],['May 2018','IPL cricket','Hotstar',10.3],['May 2019','IPL cricket','Hotstar',18.6],['July 2019','Cricket World Cup semifinal','Hotstar',25.3],['Nov. 2023','Cricket World Cup final','Disney+ Hotstar',59],['Nov. 2024','Jake Paul vs. Mike Tyson','Netflix',65],['March 2026','T20 World Cup final','JioHotstar',73],['Nov. 2026','GTA VI launch streams','Twitch, YouTube and Kick',7.9,1]];
function streams(box){
 var narrow=box.clientWidth<520;
 frame(box,'The Biggest Live Streams Have Grown From 7 Million To 73 Million Viewers Since 2009','Record peak concurrent streams or viewers for one live event, as reported by the platform. Circle area is the audience.');
 var W=narrow?400:760,rh=narrow?52:56,cx=narrow?52:70,maxR=narrow?40:44,H=STR.length*rh+14;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 var circ=[];
 STR.forEach(function(d,i){var y=i*rh+rh/2+6,r=Math.sqrt(d[3]/73)*maxR*0.62+2;
  if(d[4])svg.appendChild(el('line',{x1:0,x2:W,y1:y-rh/2,y2:y-rh/2,stroke:RULE,'stroke-dasharray':'3 3'}));
  var c=el('circle',{cx:cx,cy:y,r:0,fill:d[4]?PURPLE:GREEN,opacity:d[4]?1:.85});svg.appendChild(c);circ.push([c,r]);
  var tx=cx+maxR*0.62+16;
  T(svg,tx,y-3,d[1],{s:narrow?14:16,w:'bold',f:d[4]?PURPLE:INK});
  T(svg,tx,y+15,d[0]+' · '+d[2],{s:narrow?11:12.5,f:MUTED,sans:1});
  T(svg,W-4,y+6,d[3]+'M',{a:'end',s:narrow?15:18,w:'bold',f:d[4]?PURPLE:GREEN,sans:1});
 });
 seen(svg,function(){circ.forEach(function(c,i){setTimeout(function(){c[0].style.transition='r .5s cubic-bezier(.2,.8,.2,1)';c[0].setAttribute('r',c[1]);},i*90);});});
 src(box,'Sources: Akamai via CircleID (2009, "more than 7 million" streams); Streaming Media Blog list of the largest live-streamed events (2018-2026); Streams Charts via mxdwn Games (GTA VI, combined peak across tracked platforms). Platforms measure audiences differently, so figures are not strictly comparable.');
}

/* ---------- 3. download calculator ---------- */
function dl(box){
 frame(box,'How Long The 210-Gigabyte Download Takes','Pick your internet speed. Times assume the full speed the whole way, as DE-CIX did.');
 var big=document.createElement('p');big.className='gt-big';hard(big,'3em','bold');box.appendChild(big);
 var sub=document.createElement('p');sub.className='gt-sub';hard(sub,'.95em');box.appendChild(sub);
 var rng=document.createElement('input');rng.type='range';rng.min=0;rng.max=1000;rng.value=0;box.appendChild(rng);
 var chips=document.createElement('div');chips.className='gt-chips';box.appendChild(chips);
 var P=[25,50,100,300,500,1000,2000],lo=Math.log(10),hi=Math.log(2000);
 function toV(p){return Math.exp(lo+(hi-lo)*p/1000);}function toP(v){return (Math.log(v)-lo)/(hi-lo)*1000;}
 function fmt(m){var s=210*8000/m;var h=Math.floor(s/3600),mi=Math.round((s-h*3600)/60);if(mi===60){h++;mi=0;}if(h>=24){var d=Math.floor(h/24);return d+' day'+(d>1?'s':'')+' '+(h-d*24)+' hr';}return h?(h+' hr '+mi+' min'):(mi+' min');}
 function set(v){v=Math.round(v);big.textContent=fmt(v);sub.textContent='at '+(v>=1000?(v/1000).toFixed(v%1000?1:0)+' gigabit':v+' megabits')+' per second';[].forEach.call(chips.children,function(b){b.className=(+b.dataset.v===v)?'on':'';});}
 P.forEach(function(v){var b=document.createElement('button');b.dataset.v=v;b.textContent=v>=1000?(v/1000)+' Gbps':v+' Mbps';b.onclick=function(){rng.value=toP(v);set(v);};chips.appendChild(b);});
 rng.oninput=function(){set(toV(+rng.value));};
 rng.value=toP(50);set(50);
 src(box,'Download size: about 210 GB, per DE-CIX; Rockstar lists up to 212 GB of storage. Real downloads are usually slower than a connection’s advertised speed.');
}

function boot(){var m={'nid-gt-ladder':function(b){ladder(b,false);},'nid-gt-home':function(b){ladder(b,true);},'nid-gt-streams':streams,'nid-gt-dl':dl};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,1500);
})();
