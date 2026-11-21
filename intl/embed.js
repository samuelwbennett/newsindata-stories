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
var RAW='2005|2005-10-02|Mexico City|Mexico|ARI|SF|31|14|Cardinals|49ers~2007|2007-10-28|London|United Kingdom|MIA|NYG|10|13|Dolphins|Giants~2008|2008-10-26|London|United Kingdom|NO|LAC|37|32|Saints|Chargers~2008|2008-12-07|Toronto|Canada|BUF|MIA|3|16|Bills|Dolphins~2009|2009-10-25|London|United Kingdom|TB|NE|7|35|Buccaneers|Patriots~2009|2009-12-03|Toronto|Canada|BUF|NYJ|13|19|Bills|Jets~2010|2010-10-31|London|United Kingdom|SF|DEN|24|16|49ers|Broncos~2010|2010-11-07|Toronto|Canada|BUF|CHI|19|22|Bills|Bears~2011|2011-10-23|London|United Kingdom|TB|CHI|18|24|Buccaneers|Bears~2011|2011-10-30|Toronto|Canada|BUF|WAS|23|0|Bills|Commanders~2012|2012-10-28|London|United Kingdom|LA|NE|7|45|Rams|Patriots~2012|2012-12-16|Toronto|Canada|BUF|SEA|17|50|Bills|Seahawks~2013|2013-09-29|London|United Kingdom|MIN|PIT|34|27|Vikings|Steelers~2013|2013-10-27|London|United Kingdom|JAX|SF|10|42|Jaguars|49ers~2013|2013-12-01|Toronto|Canada|BUF|ATL|31|34|Bills|Falcons~2014|2014-09-28|London|United Kingdom|LV|MIA|14|38|Raiders|Dolphins~2014|2014-10-26|London|United Kingdom|ATL|DET|21|22|Falcons|Lions~2014|2014-11-09|London|United Kingdom|JAX|DAL|17|31|Jaguars|Cowboys~2015|2015-10-04|London|United Kingdom|MIA|NYJ|14|27|Dolphins|Jets~2015|2015-10-25|London|United Kingdom|JAX|BUF|34|31|Jaguars|Bills~2015|2015-11-01|London|United Kingdom|KC|DET|45|10|Chiefs|Lions~2016|2016-10-02|London|United Kingdom|JAX|IND|30|27|Jaguars|Colts~2016|2016-10-23|London|United Kingdom|LA|NYG|10|17|Rams|Giants~2016|2016-10-30|London|United Kingdom|CIN|WAS|27|27|Bengals|Commanders~2016|2016-11-21|Mexico City|Mexico|LV|HOU|27|20|Raiders|Texans~2017|2017-09-24|London|United Kingdom|JAX|BAL|44|7|Jaguars|Ravens~2017|2017-10-01|London|United Kingdom|MIA|NO|0|20|Dolphins|Saints~2017|2017-10-22|London|United Kingdom|LA|ARI|33|0|Rams|Cardinals~2017|2017-10-29|London|United Kingdom|CLE|MIN|16|33|Browns|Vikings~2017|2017-11-19|Mexico City|Mexico|LV|NE|8|33|Raiders|Patriots~2018|2018-10-14|London|United Kingdom|LV|SEA|3|27|Raiders|Seahawks~2018|2018-10-21|London|United Kingdom|LAC|TEN|20|19|Chargers|Titans~2018|2018-10-28|London|United Kingdom|JAX|PHI|18|24|Jaguars|Eagles~2019|2019-10-06|London|United Kingdom|LV|CHI|24|21|Raiders|Bears~2019|2019-10-13|London|United Kingdom|TB|CAR|26|37|Buccaneers|Panthers~2019|2019-10-27|London|United Kingdom|LA|CIN|24|10|Rams|Bengals~2019|2019-11-03|London|United Kingdom|JAX|HOU|3|26|Jaguars|Texans~2019|2019-11-18|Mexico City|Mexico|LAC|KC|17|24|Chargers|Chiefs~2021|2021-10-10|London|United Kingdom|ATL|NYJ|27|20|Falcons|Jets~2021|2021-10-17|London|United Kingdom|JAX|MIA|23|20|Jaguars|Dolphins~2022|2022-10-02|London|United Kingdom|NO|MIN|25|28|Saints|Vikings~2022|2022-10-09|London|United Kingdom|GB|NYG|22|27|Packers|Giants~2022|2022-10-30|London|United Kingdom|JAX|DEN|17|21|Jaguars|Broncos~2022|2022-11-13|Munich|Germany|TB|SEA|21|16|Buccaneers|Seahawks~2022|2022-11-21|Mexico City|Mexico|ARI|SF|10|38|Cardinals|49ers~2023|2023-10-01|London|United Kingdom|JAX|ATL|23|7|Jaguars|Falcons~2023|2023-10-08|London|United Kingdom|BUF|JAX|20|25|Bills|Jaguars~2023|2023-10-15|London|United Kingdom|TEN|BAL|16|24|Titans|Ravens~2023|2023-11-05|Frankfurt|Germany|KC|MIA|21|14|Chiefs|Dolphins~2023|2023-11-12|Frankfurt|Germany|NE|IND|6|10|Patriots|Colts~2024|2024-09-06|Sao Paulo|Brazil|PHI|GB|34|29|Eagles|Packers~2024|2024-10-06|London|United Kingdom|MIN|NYJ|23|17|Vikings|Jets~2024|2024-10-13|London|United Kingdom|CHI|JAX|35|16|Bears|Jaguars~2024|2024-10-20|London|United Kingdom|JAX|NE|32|16|Jaguars|Patriots~2024|2024-11-10|Munich|Germany|CAR|NYG|20|17|Panthers|Giants~2025|2025-09-05|Sao Paulo|Brazil|LAC|KC|27|21|Chargers|Chiefs~2025|2025-09-28|Dublin|Ireland|PIT|MIN|24|21|Steelers|Vikings~2025|2025-10-05|London|United Kingdom|CLE|MIN|17|21|Browns|Vikings~2025|2025-10-12|London|United Kingdom|NYJ|DEN|11|13|Jets|Broncos~2025|2025-10-19|London|United Kingdom|JAX|LA|7|35|Jaguars|Rams~2025|2025-11-09|Berlin|Germany|IND|ATL|31|25|Colts|Falcons~2025|2025-11-16|Madrid|Spain|MIA|WAS|16|13|Dolphins|Commanders~2026|2026-09-10|Melbourne|Australia|LA|SF|7|27|Rams|49ers~2026|2026-09-27|Rio de Janeiro|Brazil|DAL|BAL|31|34|Cowboys|Ravens~2026|2026-10-04|London|United Kingdom|WAS|IND|13|30|Commanders|Colts~2026|2026-10-11|London|United Kingdom|JAX|PHI|19|17|Jaguars|Eagles~2026|2026-10-18|London|United Kingdom|JAX|HOU|31|34|Jaguars|Texans~2026|2026-10-25|Paris|France|NO|PIT|10|16|Saints|Steelers~2026|2026-11-08|Madrid|Spain|ATL|CIN|17|34|Falcons|Bengals~2026|2026-11-15|Munich|Germany|DET|NE|35|10|Lions|Patriots~2026|2026-11-22|Mexico City|Mexico|SF|MIN|||49ers|Vikings';
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
