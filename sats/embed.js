/* The News in Data: 1 million satellites (Nov. 26, 2026). Mounts: #nid-st-grid, #nid-st-orbit, #nid-st-pace, #nid-st-home */
(function(){
if(window.__nidSt)return;window.__nidSt=1;
var GREEN='#007a55',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#b9c6bf',GOLD='#d9a441',RUST='#b8483a',LIGHT='#9fcbb6',SKY='#0d1b2a';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
/* CelesTrak SATCAT, Nov. 25, 2026: active payloads */
var ACT={total:17566,starlink:11192,oneweb:651,kuiper:427,china:545,other:4751},EVER=28453,TRACKED=35298;
var H=[[180, 0, 1], [190, 0, 3], [200, 0, 2], [210, 1, 3], [220, 1, 1], [230, 1, 2], [240, 2, 2], [250, 0, 6], [260, 3, 5], [270, 5, 12], [280, 16, 7], [290, 19, 9], [300, 8, 9], [310, 30, 21], [320, 39, 19], [330, 49, 28], [340, 27, 109], [350, 47, 585], [360, 13, 269], [370, 21, 69], [380, 32, 46], [390, 34, 38], [400, 29, 47], [410, 42, 84], [420, 47, 61], [430, 51, 78], [440, 98, 127], [450, 99, 153], [460, 101, 4981], [470, 92, 942], [480, 140, 3236], [490, 206, 54], [500, 288, 50], [510, 197, 33], [520, 114, 71], [530, 92, 9], [540, 87, 10], [550, 75, 0], [560, 80, 0], [570, 305, 10], [580, 157, 0], [590, 131, 0], [600, 41, 0], [610, 94, 0], [620, 431, 0], [630, 35, 0], [640, 36, 0], [650, 35, 0], [660, 13, 0], [670, 18, 0], [680, 32, 0], [690, 35, 0], [700, 13, 0], [710, 6, 0], [720, 6, 0], [730, 9, 0], [740, 14, 0], [750, 12, 0], [760, 9, 0], [770, 80, 0], [780, 19, 0], [790, 29, 0], [800, 22, 0], [810, 27, 0], [820, 23, 0], [830, 4, 0], [840, 10, 0], [850, 12, 0], [860, 7, 0], [870, 2, 0], [880, 8, 0], [890, 22, 0], [900, 20, 0], [910, 2, 0], [920, 1, 0], [930, 8, 0], [940, 77, 0], [950, 34, 0], [960, 25, 0], [970, 13, 0], [980, 8, 0], [990, 10, 0], [1000, 3, 0], [1020, 4, 0], [1030, 3, 0], [1040, 16, 0], [1050, 12, 0], [1060, 201, 0], [1070, 16, 0], [1080, 40, 0], [1090, 7, 0], [1100, 24, 0], [1110, 5, 0], [1120, 2, 0], [1130, 7, 0], [1140, 156, 0], [1150, 2, 0], [1160, 62, 0], [1170, 52, 0], [1180, 131, 0], [1190, 135, 0], [1200, 159, 0], [1210, 122, 0], [1220, 58, 0], [1240, 1, 0], [1310, 1, 0], [1330, 2, 0], [1340, 1, 0], [1410, 25, 0], [1420, 1, 0], [1440, 4, 0], [1480, 9, 0], [1490, 50, 0], [1500, 3, 0], [1540, 1, 0], [1570, 1, 0], [1710, 1, 0], [1820, 1, 0]],Y=[[1957, 2, 0], [1958, 8, 0], [1959, 15, 0], [1960, 21, 0], [1961, 41, 0], [1962, 77, 0], [1963, 72, 0], [1964, 104, 0], [1965, 158, 0], [1966, 145, 0], [1967, 157, 0], [1968, 139, 0], [1969, 138, 0], [1970, 129, 0], [1971, 156, 0], [1972, 130, 0], [1973, 135, 0], [1974, 126, 0], [1975, 155, 0], [1976, 159, 0], [1977, 136, 0], [1978, 166, 0], [1979, 123, 0], [1980, 130, 0], [1981, 159, 0], [1982, 143, 0], [1983, 161, 0], [1984, 173, 0], [1985, 166, 0], [1986, 136, 0], [1987, 139, 0], [1988, 143, 0], [1989, 137, 0], [1990, 166, 0], [1991, 136, 0], [1992, 129, 0], [1993, 109, 0], [1994, 123, 0], [1995, 101, 0], [1996, 98, 0], [1997, 152, 0], [1998, 573, 0], [1999, 127, 0], [2000, 119, 0], [2001, 84, 0], [2002, 94, 0], [2003, 88, 0], [2004, 72, 0], [2005, 73, 0], [2006, 91, 0], [2007, 109, 0], [2008, 103, 0], [2009, 123, 0], [2010, 121, 0], [2011, 127, 0], [2012, 126, 0], [2013, 204, 0], [2014, 193, 0], [2015, 174, 0], [2016, 176, 0], [2017, 390, 0], [2018, 413, 0], [2019, 337, 120], [2020, 403, 833], [2021, 794, 989], [2022, 707, 1690], [2023, 888, 1984], [2024, 839, 1964], [2025, 1326, 3169], [2026, 1536, 2301]];
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}
function T(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.serif?SERIF:SANS,'font-weight':o.w||'normal'},txt);g.appendChild(t);return t;}
function css(){if(document.getElementById('nid-st-css'))return;var s=document.createElement('style');s.id='nid-st-css';
 s.textContent='.nid-st{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2em auto;position:relative}.nid-st .st-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .25em}.nid-st .st-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .8em;line-height:1.35}.nid-st svg,.nid-st canvas{width:100%;display:block}.nid-st .st-src{font-size:.78em;color:'+MUTED+';margin:.7em 0 0;line-height:1.4}.nid-st .st-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:0 0 .7em}.nid-st .st-btns button{font:13px '+SANS+';padding:.42em .95em;border-radius:99px;border:1px solid '+RULE+';background:#fff;color:'+INK+';cursor:pointer}.nid-st .st-btns button.on{background:'+GREEN+';color:#fff;border-color:'+GREEN+'}.nid-st .st-key{display:flex;flex-wrap:wrap;gap:.3em 1.1em;justify-content:center;margin:0 0 .6em;font:12px '+SANS+';color:'+MUTED+'}.nid-st .st-key i{width:11px;height:11px;border-radius:2px;display:inline-block;margin-right:.35em;vertical-align:-1px}.nid-st .st-big{text-align:center;font:600 15px '+SANS+';margin:.2em 0 .6em;min-height:1.3em}';document.head.appendChild(s);}
function frame(box,title,dek){css();box.innerHTML='';box.classList.add('nid-st');var h=document.createElement('p');h.className='st-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);if(dek){var d=document.createElement('p');d.className='st-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}}
function src(box,html){var p=document.createElement('p');p.className='st-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function key(box,items){var k=document.createElement('div');k.className='st-key';k.innerHTML=items.map(function(i){return '<span><i style="background:'+i[0]+'"></i>'+i[1]+'</span>';}).join('');box.appendChild(k);return k;}
function seen(node,fn){if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){fn();io.disconnect();}},{threshold:.25});io.observe(node);}else fn();}
function fmt(n){return Math.round(n).toLocaleString('en-US');}
function hiDPI(cv,w,h){var r=Math.min(window.devicePixelRatio||1,2);cv.width=w*r;cv.height=h*r;cv.style.aspectRatio=w+'/'+h;var c=cv.getContext('2d');c.setTransform(r,0,0,r,0,0);return c;}

/* ---------- 1. the inventory grid: each square = 100 satellites ---------- */
function grid(box,compact){
 frame(box,'SpaceX Can Now Launch 1 Million Satellites, 35 Times As Many As Have Been Launched Since Sputnik',compact?null:'Each square is 100 satellites.');
 var groups=[['starlink',Math.round(ACT.starlink/100),GREEN,'Starlink, working today'],['other',Math.round((ACT.total-ACT.starlink)/100),'#55656b','Every other working satellite'],['starmind',10000,GOLD,'SpaceX Starmind, approved Nov. 25']];
 if(!compact)key(box,groups.map(function(g){return [g[2],g[3]];}));
 var big=document.createElement('div');big.className='st-big';box.appendChild(big);
 var btns=document.createElement('div');btns.className='st-btns';if(!compact)box.appendChild(btns);
 var narrow=box.clientWidth<520,W=narrow?360:760,cols=+(box.dataset.cols||100),cell=W/cols,gap=narrow?0.5:0.9,rows=Math.ceil((112+64+10000)/cols),H=rows*cell+2;
 var cv=document.createElement('canvas');box.appendChild(cv);var c=hiDPI(cv,W,H);
 var seq=[];groups.forEach(function(g){for(var i=0;i<g[1];i++)seq.push(g[2]);});
 var everIdx=Math.round(EVER/100);
 function paint(n,fadeStar){c.clearRect(0,0,W,H);for(var i=0;i<seq.length;i++){var x=(i%cols)*cell,y=Math.floor(i/cols)*cell;c.fillStyle=i<n?seq[i]:(i<176?'#eef3f0':'#f5f7f6');if(i>=176&&i>=n&&fadeStar)continue;c.fillRect(x+gap/2,y+gap/2,cell-gap,cell-gap);}
  /* bracket: all satellites ever launched */
  if(n>=everIdx){var ey=Math.floor(everIdx/cols)*cell,ex=(everIdx%cols)*cell;c.strokeStyle=INK;c.lineWidth=1.4;c.beginPath();c.moveTo(0,ey+cell+1.5);c.lineTo(ex,ey+cell+1.5);c.lineTo(ex,ey+1.5);c.lineTo(W,ey+1.5);c.stroke();var lt=(W<500?'Squares above the line = every satellite ever launched':'Squares above the line = 28,453, every satellite launched since 1957');c.font='600 '+(W<500?10:13)+'px '+SANS;var tw=c.measureText(lt).width;c.fillStyle='rgba(19,36,27,.85)';c.fillRect(W-tw-16,ey+cell+6,tw+12,W<500?16:20);c.fillStyle='#fff';c.textAlign='left';c.fillText(lt,W-tw-10,ey+cell+(W<500?18:21));}}
 var anim=null;function run(target,dur){if(anim)cancelAnimationFrame(anim);var t0=null,from=state;function f(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;state=Math.round(from+(target-from)*e);paint(state,true);label();if(p<1)anim=requestAnimationFrame(f);}anim=requestAnimationFrame(f);}
 var state=0;function label(){var sats=state<=176?(state>=176?ACT.total:state*100):ACT.total+(state-176)*100;big.innerHTML=state<=176?'<span style="color:'+GREEN+'">'+fmt(Math.min(ACT.total,sats))+'</span> working satellites today':'<span style="color:#a8751e">'+fmt(Math.min(1017566,sats))+'</span> with Starmind';}
 [['Today',176],['Add 1 million Starmind satellites',seq.length]].forEach(function(b,i){var e=document.createElement('button');e.textContent=b[0];e.addEventListener('click',function(){[].forEach.call(btns.children,function(x){x.className='';});e.className='on';run(b[1],i?3200:800);});btns.appendChild(e);});
 paint(0,true);label();
 seen(cv,function(){run(176,900);if(btns.children[0])btns.children[0].className='on';setTimeout(function(){if(btns.children[1])btns.children[1].className='on';if(btns.children[0])btns.children[0].className='';run(seq.length,3600);},2200);});
 if(!compact)src(box,'Sources: CelesTrak satellite catalog, Nov. 25, 2026 (17,566 working satellites; 28,453 satellites launched since 1957); FCC authorization of SpaceX’s Starmind orbital data center constellation, Nov. 25, 2026.');
}

/* ---------- 2. the shell: every working satellite in low orbit, drawn at its altitude ---------- */
function orbit(box){
 frame(box,'The Approved Satellites Would Fill A Band Between 500 And 1,002 Kilometers Up','Every working satellite below 2,000 km, drawn at its altitude above Earth. Each gold dot is about '+(box.clientWidth<520?17:8)+' Starmind satellites.');
 var btns=document.createElement('div');btns.className='st-btns';box.appendChild(btns);
 var narrow=box.clientWidth<520,W=narrow?360:760,Ht=narrow?330:440,surf=Ht-40,px=(surf-30)/2000,R=6371*px,cx=W/2,cy=surf+R;
 var cv=document.createElement('canvas');box.appendChild(cv);var c=hiDPI(cv,W,Ht);
 function rnd(s){return function(){s=(s*16807)%2147483647;return (s-1)/2147483646;};}
 var amax=Math.asin(Math.min(1,(W/2+20)/(R+2000*px)));
 function pts(seed,n,a0,a1){var r=rnd(seed),o=[];for(var i=0;i<n;i++){var alt=a0+(a1-a0)*r(),th=(r()*2-1)*amax;o.push([cx+Math.sin(th)*(R+alt*px),cy-Math.cos(th)*(R+alt*px)]);}return o;}
 var today=[];H.forEach(function(b,i){today.push([pts(100+i,b[1],b[0],b[0]+10),'rgba(235,240,238,.85)']);today.push([pts(900+i,b[2],b[0],b[0]+10),'#4fd1a1']);});
 var star=pts(7,narrow?60000:125000,500,1002);
 var mode=0,prog=0;
 function draw(){c.fillStyle=SKY;c.fillRect(0,0,W,Ht);
  /* Earth */
  var g=c.createRadialGradient(cx,cy,R*.9,cx,cy,R);g.addColorStop(0,'#123f5a');g.addColorStop(1,'#1f6f8b');c.fillStyle=g;c.beginPath();c.arc(cx,cy,R,0,Math.PI*2);c.fill();
  c.strokeStyle='rgba(120,200,255,.35)';c.lineWidth=6;c.beginPath();c.arc(cx,cy,R+3,0,Math.PI*2);c.stroke();
  /* altitude rings */
  c.font='11px '+SANS;c.textAlign='left';[500,1000,1500,2000].forEach(function(a){c.strokeStyle='rgba(255,255,255,.10)';c.lineWidth=1;c.setLineDash([3,4]);c.beginPath();c.arc(cx,cy,R+a*px,0,Math.PI*2);c.stroke();c.setLineDash([]);c.fillStyle='rgba(255,255,255,.55)';c.fillText(a.toLocaleString()+' km',8,cy-(R+a*px)*Math.cos(Math.asin((cx-8)/(R+a*px)))-4);});
  if(mode&&prog>0){var n=Math.floor(star.length*prog);c.fillStyle='rgba(217,164,65,.22)';for(var i=0;i<n;i++){c.fillRect(star[i][0],star[i][1],1.3,1.3);}}
  today.forEach(function(p){c.fillStyle=p[1];p[0].forEach(function(q){c.fillRect(q[0]-0.9,q[1]-0.9,1.8,1.8);});});
  c.textAlign='right';c.font='600 12px '+SANS;c.fillStyle='#4fd1a1';c.fillText('Starlink',W-10,cy-(R+470*px)*Math.cos(0)+(narrow?-2:0)+ (surf-cy+R) - (surf-cy+R));
  c.fillStyle='rgba(235,240,238,.9)';c.fillText(mode?'':'',W-10,20);
  if(mode&&prog>=1){c.fillStyle=GOLD;c.font='600 13px '+SANS;c.textAlign='center';c.font=(narrow?'600 11px ':'600 13px ')+SANS;c.fillText(narrow?'Gold band: 1 million Starmind satellites':'Gold band: 1,000,000 Starmind satellites, 500 to 1,002 km',cx,22);}
  c.textAlign='center';c.font='12px '+SANS;c.fillStyle='rgba(255,255,255,.75)';c.fillText('Earth',cx,Ht-14);}
 var anim=null;function go(m){mode=m;if(anim)cancelAnimationFrame(anim);if(!m){prog=0;draw();return;}var t0=null;function f(ts){if(!t0)t0=ts;prog=Math.min(1,(ts-t0)/2600);draw();if(prog<1)anim=requestAnimationFrame(f);}anim=requestAnimationFrame(f);}
 [['Today: 16,696 in low orbit',0],['With Starmind',1]].forEach(function(b){var e=document.createElement('button');e.textContent=b[0];e.addEventListener('click',function(){[].forEach.call(btns.children,function(x){x.className='';});e.className='on';go(b[1]);});btns.appendChild(e);});
 btns.children[0].className='on';draw();
 seen(cv,function(){setTimeout(function(){btns.children[0].className='';btns.children[1].className='on';go(1);},1400);});
 src(box,'Sources: CelesTrak satellite catalog, Nov. 25, 2026; altitude is the average of each satellite’s highest and lowest point, and positions around the Earth are illustrative. Starmind altitudes are from the FCC authorization. Another 870 working satellites orbit higher, mostly 36,000 km up.');
}

/* ---------- 3. the pace ---------- */
function pace(box){
 var narrow=box.clientWidth<520;
 frame(box,'Hitting The FCC’s Deadlines Would Take Up To 250,000 Satellites A Year, 56 Times Last Year’s Record','Satellites launched each year, on a scale where each line is 10 times the one below. Green is the Starlink share on top of all other satellites. Light bars show the average pace the deadlines would require.');
 key(box,[[GREEN,'Starlink'],['#55656b','All other satellites'],['#f6ecd9','Needed for Starmind deadlines']]);
 var W=narrow?400:760,L=narrow?44:58,R=narrow?8:16,top=10,H=narrow?300:360,bot=H-28;
 var y0=1957,y1=2040,bw=(W-L-R)/(y1-y0+1),X=function(y){return L+(y-y0)*bw;},lo=1,hi=300000,Yv=function(v){return bot-(Math.log10(Math.max(v,lo))-Math.log10(lo))/(Math.log10(hi)-Math.log10(lo))*(bot-top);};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 [1,10,100,1000,10000,100000].forEach(function(v){svg.appendChild(el('line',{x1:L,x2:W-R,y1:Yv(v),y2:Yv(v),stroke:FAINT}));T(svg,L-6,Yv(v)+4,v>=1000?(v/1000)+'K':String(v),{a:'end',s:10.5,f:MUTED});});
 (narrow?[1960,1980,2000,2026,2040]:[1957,1970,1980,1990,2000,2010,2026,2033,2040]).forEach(function(y){T(svg,X(y)+bw/2,bot+18,String(y),{a:'middle',s:10.5,f:y>2026?'#a8751e':MUTED});});
 var bars=[];
 Y.forEach(function(r){var tot=r[1]+r[2],x=X(r[0]);var b1=el('rect',{x:x+.4,y:bot,width:Math.max(1,bw-.8),height:0,fill:'#55656b'});svg.appendChild(b1);bars.push([b1,Yv(tot),bot-Yv(tot)]);if(r[2]){b1.setAttribute('fill',GREEN);var b2=el('rect',{x:x+.4,y:bot,width:Math.max(1,bw-.8),height:0,fill:'#55656b'});svg.appendChild(b2);bars.push([b2,Yv(r[1]),bot-Yv(r[1])]);}});
 /* deadline pace: 100,000 by Nov. 2035, 500,000 by Nov. 2038, 1,000,000 by Nov. 2040, launches starting 2027 */
 var need=[];for(var y=2027;y<=2040;y++)need.push([y,y<=2035?100000/9:y<=2038?400000/3:500000/2]);
 need.forEach(function(r){var x=X(r[0]),r1=el('rect',{x:x+.6,y:Yv(r[1]),width:bw-1.2,height:bot-Yv(r[1]),fill:'#f6ecd9',stroke:GOLD,'stroke-width':1,opacity:0});svg.appendChild(r1);bars.push([r1]);});
 var a1=T(svg,X(2025)+bw/2,Yv(4495)-8,narrow?'4,495':'2025 record: 4,495',{a:'end',s:narrow?10.5:11.5,w:'600'}),a2=T(svg,X(2040)+bw,Yv(250000)-6,narrow?'250K':'250,000 a year',{a:'end',s:narrow?10.5:11.5,w:'600',f:'#a8751e'});a1.style.opacity=a2.style.opacity=0;bars.push([a1]);bars.push([a2]);
 
 seen(svg,function(){bars.forEach(function(b,i){setTimeout(function(){if(b[1]!=null){b[0].style.transition='height .5s ease, y .5s ease';b[0].setAttribute('y',b[1]);b[0].setAttribute('height',Math.max(0,b[2]));}else{b[0].style.transition='opacity .4s';b[0].style.opacity=1;}},i*12);});});
 src(box,'Sources: CelesTrak satellite catalog (satellites by launch year, through Nov. 25, 2026); FCC milestones: 10% of the constellation by Nov. 25, 2035, half by Nov. 25, 2038, and the rest by Nov. 25, 2040. Required pace assumes launches begin in 2027, as SpaceX has said, and are spread evenly between deadlines.');
}
function boot(){var m={'nid-st-grid':function(b){grid(b,false);},'nid-st-home':function(b){grid(b,true);},'nid-st-orbit':orbit,'nid-st-pace':pace};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();setTimeout(boot,1500);
})();
