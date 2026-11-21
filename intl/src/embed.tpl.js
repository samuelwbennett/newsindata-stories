/* The News in Data: NFL international games, 2005-2026 (Nov. 21, 2026).
   Mounts: #nid-ig-grow (games abroad by season), #nid-ig-teams (home games each team gave up),
   #nid-ig-money (what a home date is worth), #nid-ig-home (compact grow). */
(function(){
if(window.__nidIg)return;window.__nidIg=1;
var GREEN='#007a55',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#b9c6bf';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
var CO={'United Kingdom':['U.K.','#007a55'],'Mexico':['Mexico','#c4573a'],'Canada':['Canada','#7d8b94'],'Germany':['Germany','#c9a227'],'Brazil':['Brazil','#5a9e6f'],'Ireland':['Ireland','#2a8fa8'],'Spain':['Spain','#d9822b'],'France':['France','#3f6fb5'],'Australia':['Australia','#7a6fc2']};
var CORDER=['United Kingdom','Mexico','Canada','Germany','Brazil','Spain','Ireland','France','Australia'];
var TEAMS={ARI:'Cardinals',ATL:'Falcons',BAL:'Ravens',BUF:'Bills',CAR:'Panthers',CHI:'Bears',CIN:'Bengals',CLE:'Browns',DAL:'Cowboys',DEN:'Broncos',DET:'Lions',GB:'Packers',HOU:'Texans',IND:'Colts',JAX:'Jaguars',KC:'Chiefs',LA:'Rams',LAC:'Chargers',LV:'Raiders',MIA:'Dolphins',MIN:'Vikings',NE:'Patriots',NO:'Saints',NYG:'Giants',NYJ:'Jets',PHI:'Eagles',PIT:'Steelers',SEA:'Seahawks',SF:'49ers',TB:'Buccaneers',TEN:'Titans',WAS:'Commanders'};
var RAW='__DATA__';
var G=RAW.split('~').map(function(l){var a=l.split('|');return {yr:+a[0],date:a[1],city:a[2],co:a[3],h:a[4],a:a[5],hs:a[6],as:a[7],hn:a[8],an:a[9]};});
var MON=['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
function fdate(d){var p=d.split('-');return MON[+p[1]-1]+' '+(+p[2])+', '+p[0];}
function gameLine(g){var res=g.hs===''?'scheduled':(+g.hs>+g.as?g.hn+' won '+g.hs+'-'+g.as:g.an+' won '+g.as+'-'+g.hs);return '<b>'+g.an+' at '+g.hn+'</b><br>'+g.city+' · '+fdate(g.date)+'<br>'+res;}
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}
function T(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.sans?SANS:SERIF,'font-weight':o.w||'normal'},txt);g.appendChild(t);return t;}
function css(){
 if(document.getElementById('nid-ig-css'))return;var s=document.createElement('style');s.id='nid-ig-css';
 s.textContent='.nid-ig{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2em auto;position:relative}'+
 '.nid-ig .ig-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '.nid-ig .ig-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .9em;line-height:1.35}'+
 '.nid-ig svg{width:100%;height:auto;display:block;overflow:visible}'+
 '.nid-ig .ig-key{display:flex;flex-wrap:wrap;gap:.3em 1em;justify-content:center;margin:0 0 .6em;font:12px '+SANS+';color:'+MUTED+'}'+
 '.nid-ig .ig-key i{width:9px;height:9px;border-radius:50%;display:inline-block;margin-right:.35em;vertical-align:-1px}'+
 '.nid-ig .ig-card{background:#fff;border:1px solid '+RULE+';border-radius:10px;padding:.7em 1em;margin:.7em 0 0;font-size:.95em;line-height:1.45;min-height:2.6em;color:'+INK+'}'+
 '.nid-ig .ig-src{font-size:.78em;color:'+MUTED+';margin:.8em 0 0;line-height:1.4}'+
 '.nid-ig .ig-tip{position:absolute;pointer-events:none;background:#fff;border:1px solid '+RULE+';border-radius:8px;padding:.4em .65em;font-size:.86em;line-height:1.35;box-shadow:0 2px 8px rgba(0,0,0,.08);display:none;z-index:5;max-width:240px}'+
 '.nid-ig circle.ig-dot{cursor:pointer;transition:opacity .25s}';
 document.head.appendChild(s);
}
function frame(box,title,dek){css();box.innerHTML='';box.classList.add('nid-ig');var h=document.createElement('p');h.className='ig-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);if(dek){var d=document.createElement('p');d.className='ig-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}}
function src(box,html){var p=document.createElement('p');p.className='ig-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function key(box,list){var k=document.createElement('div');k.className='ig-key';list.forEach(function(c){var s=document.createElement('span');s.innerHTML='<i style="background:'+CO[c][1]+'"></i>'+CO[c][0];k.appendChild(s);});box.appendChild(k);}
function tipper(box){var t=document.createElement('div');t.className='ig-tip';box.appendChild(t);return {show:function(h,ev){t.innerHTML=h;t.style.display='block';var r=box.getBoundingClientRect(),x=ev.clientX-r.left+12,y=ev.clientY-r.top+12;if(x+250>r.width)x=ev.clientX-r.left-252;t.style.left=Math.max(0,x)+'px';t.style.top=y+'px';},hide:function(){t.style.display='none';}};}
function seen(node,fn){if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){fn();io.disconnect();}},{threshold:.2});io.observe(node);}else fn();}
function card(box,html){var c=document.createElement('div');c.className='ig-card';c.innerHTML=html;hard(c,'.95em');box.appendChild(c);return c;}

/* ---------- 1. games abroad by season ---------- */
function grow(box,compact){
 var narrow=box.clientWidth<520;
 frame(box,'The NFL Is Playing A Record 9 Regular-Season Games Abroad This Season',compact?null:'One dot per regular-season game played outside the U.S., by season, colored by country. The league’s stated goal is 16 a year.');
 if(!compact)key(box,CORDER);
 var yrs=[];for(var y=2005;y<=2026;y++)yrs.push(y);
 var W=narrow?400:760,L=narrow?6:30,R=narrow?40:70,cw=(W-L-R)/(yrs.length+1.6),r=Math.min(cw*.4,narrow?6.5:11),step=r*2+(narrow?2:3);
 var top=24,base=top+16*step+4,H=base+(narrow?34:40);
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 var tip=tipper(box),cardEl=compact?null:card(box,'Hover or tap a dot for the game.');
 // goal column
 var gx=L+(yrs.length+1.1)*cw;
 for(var i=0;i<16;i++)svg.appendChild(el('circle',{cx:gx,cy:base-r-i*step,r:r-.8,fill:'none',stroke:GRAY,'stroke-width':1.2,'stroke-dasharray':'2 2'}));
 T(svg,gx,base+16,'Goal',{a:'middle',s:narrow?10:12,f:MUTED,sans:1,w:'600'});
 T(svg,gx,base-r-15*step-r-6,'16',{a:'middle',s:narrow?10:12,f:MUTED,sans:1});
 var dots=[];
 yrs.forEach(function(y,yi){
  var cx=L+(yi+.5)*cw,gs=G.filter(function(g){return g.yr===y;});
  gs.sort(function(a,b){return CORDER.indexOf(a.co)-CORDER.indexOf(b.co)||a.date.localeCompare(b.date);});
  gs.forEach(function(g,k){var c=el('circle',{cx:cx,cy:base-r-k*step,r:r,fill:CO[g.co][1],'class':'ig-dot',opacity:0});
   if(g.hs==='')c.setAttribute('fill-opacity','.35'),c.setAttribute('stroke',CO[g.co][1]),c.setAttribute('stroke-width',1.4);
   var h=gameLine(g);c.addEventListener('mousemove',function(ev){tip.show(h,ev);});c.addEventListener('mouseleave',tip.hide);c.addEventListener('click',function(){if(cardEl)cardEl.innerHTML=h.replace(/<br>/g,' · ');});
   svg.appendChild(c);dots.push([c,yi,k]);});
  if(y===2005||y===2026||(y%5===0&&y!==2025))T(svg,cx,base+16,narrow?("'"+String(y).slice(2)):String(y),{a:'middle',s:narrow?9.5:11,f:y===2026?INK:MUTED,sans:1,w:y===2026?'700':'normal'});
  if(!gs.length)T(svg,cx,base-4,'–',{a:'middle',s:10,f:GRAY,sans:1});
  if(y===2026)T(svg,cx,base-r-(gs.length-1)*step-r-6,String(gs.length),{a:'middle',s:narrow?11:13,f:INK,sans:1,w:'700'});
 });
 svg.appendChild(el('line',{x1:L,x2:W-R+20,y1:base+2,y2:base+2,stroke:RULE}));
 seen(svg,function(){dots.forEach(function(d){setTimeout(function(){d[0].setAttribute('opacity',1);},d[1]*45+d[2]*30);});});
 if(!compact)src(box,'Sources: Pro-Football-Reference and nflverse game results; NFL 2026 international schedule. Includes the Bills’ Toronto games (2008-13). The 2018 Mexico City game moved to Los Angeles and is not counted. Hollow dot: scheduled.');
}

/* ---------- 2. home games given up, by team ---------- */
function teams(box){
 var narrow=box.clientWidth<520;
 frame(box,'27 Of 32 Teams Have Given Up A Home Game To Play Abroad','Home games each team has moved overseas or to Toronto as the designated home team, 2005 to 2026. Tap a team for its games.');
 key(box,CORDER);
 var by={};Object.keys(TEAMS).forEach(function(k){by[k]=[];});
 G.forEach(function(g){by[g.h].push(g);});
 var list=Object.keys(TEAMS).sort(function(a,b){return by[b].length-by[a].length||TEAMS[a].localeCompare(TEAMS[b]);});
 var W=narrow?400:760,lab=narrow?110:130,rh=narrow?18:19,r=narrow?6:7,step=r*2+3,cols=narrow?1:2;
 var per=Math.ceil(list.length/cols),colW=W/cols,H=per*rh+8;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 var tip=tipper(box),cardEl=card(box,'The Jaguars have given up 14 home games, all in London, playing there almost every year since 2013.');
 var dots=[];
 list.forEach(function(k,i){
  var col=Math.floor(i/per),row=i%per,x0=col*colW,y=row*rh+rh/2+4,gs=by[k];
  var gEl=el('g',{style:'cursor:pointer'});svg.appendChild(gEl);
  gEl.appendChild(el('rect',{x:x0,y:y-rh/2,width:colW-6,height:rh,fill:'#fff','fill-opacity':0}));
  T(gEl,x0+lab-8,y+4,TEAMS[k],{a:'end',s:narrow?11.5:13,f:gs.length?INK:MUTED});
  if(!gs.length)T(gEl,x0+lab,y+4,'none',{s:narrow?10:11,f:GRAY,sans:1});
  var maxFit=Math.floor((colW-lab-30)/step);
  gs.slice().sort(function(a,b){return a.date.localeCompare(b.date);}).forEach(function(g,j){
   var c=el('circle',{cx:x0+lab+r+j*step,cy:y,r:r,fill:CO[g.co][1],'class':'ig-dot',opacity:0});
   if(g.hs==='')c.setAttribute('fill-opacity','.35'),c.setAttribute('stroke',CO[g.co][1]);
   var h=gameLine(g);c.addEventListener('mousemove',function(ev){tip.show(h,ev);});c.addEventListener('mouseleave',tip.hide);
   gEl.appendChild(c);dots.push([c,i,j]);});
  if(gs.length)T(gEl,x0+lab+r+gs.length*step+2,y+4,String(gs.length),{s:narrow?10:11,f:MUTED,sans:1,w:'600'});
  gEl.addEventListener('click',function(){
   if(!gs.length){cardEl.innerHTML='<b>'+TEAMS[k]+'</b> have never been the designated home team abroad. League rules require every team to give up a home game at least once every eight years.';return;}
   cardEl.innerHTML='<b>'+TEAMS[k]+'</b>, '+gs.length+' home game'+(gs.length>1?'s':'')+' abroad: '+gs.map(function(g){return g.city+' '+g.yr+' vs. '+g.an+(g.hs===''?' (scheduled)':' ('+(+g.hs>+g.as?'W ':'L ')+g.hs+'-'+g.as+')');}).join('; ')+'.';});
 });
 seen(svg,function(){dots.forEach(function(d){setTimeout(function(){d[0].setAttribute('opacity',1);},d[1]*25+d[2]*40);});});
 src(box,'Sources: Pro-Football-Reference and nflverse game results; NFL 2026 schedule. Current team names; the Rams count St. Louis, the Raiders Oakland and the Chargers San Diego. Includes the 49ers’ scheduled Nov. 22 game in Mexico City (hollow dot).');
}

/* ---------- 3. what a home date is worth ---------- */
var GATE=[['49ers',176,'SF'],['Cowboys',136],['Eagles',130,'PHI'],['Broncos',129],['Dolphins',127],['Cardinals',83.4],['Colts',83.3],['Titans',81]];
function money(box){
 var narrow=box.clientWidth<520;
 frame(box,'The 49ers Took In $176 Million At The Gate In 2024, The Most In The NFL','2024 ticket revenue for the eight teams whose figures have been reported. Giving up one home game costs the 49ers an estimated $15 million to $20 million.');
 var W=narrow?400:760,lab=narrow?78:110,rh=narrow?30:34,R=narrow?70:230,H=GATE.length*rh+30;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 var sc=function(v){return (W-lab-R)*v/180;};
 [0,50,100,150].forEach(function(v){var x=lab+sc(v);svg.appendChild(el('line',{x1:x,x2:x,y1:0,y2:GATE.length*rh,stroke:FAINT}));T(svg,x,GATE.length*rh+16,'$'+v+'M',{a:'middle',s:narrow?10:11,f:MUTED,sans:1});});
 var bars=[];
 GATE.forEach(function(d,i){var y=i*rh+rh/2,hi=d[2];
  T(svg,lab-8,y+5,d[0],{a:'end',s:narrow?12.5:14,w:hi?'bold':'normal'});
  var b=el('rect',{x:lab,y:y-(rh*.32),width:0,height:rh*.64,rx:3,fill:hi?GREEN:'#a9c9b9'});svg.appendChild(b);bars.push([b,sc(d[1])]);
  T(svg,lab+sc(d[1])+6,y+5,'$'+d[1]+'M',{s:narrow?11:12.5,f:hi?GREEN:MUTED,sans:1,w:'600'});
  if(!narrow&&d[2]==='SF')T(svg,lab+sc(d[1])+62,y+5,'Mexico City “home” game',{s:12,f:INK,sans:1});
  if(!narrow&&d[2]==='PHI')T(svg,lab+sc(d[1])+62,y+5,'Gave up a 2024 home game to Brazil',{s:12,f:INK,sans:1});
 });
 if(narrow){var n=document.createElement('p');n.className='ig-d';n.style.marginTop='.6em';n.textContent='49ers: Mexico City “home” game Nov. 22. Eagles: gave up a 2024 home game to Brazil.';hard(n,'.9em');box.appendChild(n);}
 seen(svg,function(){bars.forEach(function(b,i){setTimeout(function(){b[0].style.transition='width .7s cubic-bezier(.2,.8,.2,1)';b[0].setAttribute('width',b[1]);},i*70);});});
 src(box,'Sources: Sportico (Kurt Badenhausen, Aug. 5, 2025), citing the NFL’s internal 2024 gate report; the other 24 teams’ figures have not been reported. The 49ers’ $176 million is net gate receipts from general and club seats, excluding luxury suites. Per-game estimate: The Athletic (Jonathan Jones), Nov. 2026.');
}

function boot(){var m={'nid-ig-grow':function(b){grow(b,false);},'nid-ig-home':function(b){grow(b,true);},'nid-ig-teams':teams,'nid-ig-money':money};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,1500);
})();
