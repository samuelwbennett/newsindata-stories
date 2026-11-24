/* The News in Data: Thanksgiving week football, three stories (Nov. 24, 2026).
   Mounts: #nid-tg-ribbon, #nid-tg-week, #nid-tg-home1 (games per year)
           #nid-tg-clock, #nid-tg-home2 (dinner vs. kickoff)
           #nid-tg-strip, #nid-tg-teams, #nid-tg-home3 (Lions) */
(function(){
if(window.__nidTg)return;window.__nidTg=1;
var GREEN='#007a55',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#b9c6bf',RUST='#b8483a',LIGHT='#9fcbb6',GOLD='#d9a441';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}
function T(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.serif?SERIF:SANS,'font-weight':o.w||'normal'},txt);g.appendChild(t);return t;}
function css(){
 if(document.getElementById('nid-tg-css'))return;var s=document.createElement('style');s.id='nid-tg-css';
 s.textContent='.nid-tg{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2em auto;position:relative}'+
 '.nid-tg .tg-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '.nid-tg .tg-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .9em;line-height:1.35}'+
 '.nid-tg svg{width:100%;height:auto;display:block;overflow:visible}'+
 '.nid-tg .tg-key{display:flex;flex-wrap:wrap;gap:.3em 1.1em;justify-content:center;margin:0 0 .6em;font:12px '+SANS+';color:'+MUTED+'}'+
 '.nid-tg .tg-key i{width:11px;height:11px;border-radius:2px;display:inline-block;margin-right:.35em;vertical-align:-1px}'+
 '.nid-tg .tg-src{font-size:.78em;color:'+MUTED+';margin:.8em 0 0;line-height:1.4}'+
 '.nid-tg .tg-card{background:#fff;border:1px solid '+RULE+';border-left:4px solid '+GREEN+';border-radius:10px;padding:.7em 1em;margin:.8em 0 0;font-size:.95em;line-height:1.45;min-height:2.6em}'+
 '.nid-tg .tg-tip{position:absolute;pointer-events:none;background:#fff;border:1px solid '+RULE+';border-radius:8px;padding:.4em .65em;font:13px/1.35 '+SANS+';box-shadow:0 2px 8px rgba(0,0,0,.08);display:none;z-index:5;max-width:240px}';
 document.head.appendChild(s);
}
function frame(box,title,dek){css();box.innerHTML='';box.classList.add('nid-tg');var h=document.createElement('p');h.className='tg-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);if(dek){var d=document.createElement('p');d.className='tg-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}}
function key(box,items){var k=document.createElement('div');k.className='tg-key';k.innerHTML=items.map(function(i){return '<span><i style="background:'+i[0]+(i[2]?';outline:1.5px solid '+i[2]+';outline-offset:-1.5px':'')+'"></i>'+i[1]+'</span>';}).join('');box.appendChild(k);}
function src(box,html){var p=document.createElement('p');p.className='tg-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function card(box){var c=document.createElement('div');c.className='tg-card';hard(c,'.95em');box.appendChild(c);return c;}
function seen(node,fn){if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){fn();io.disconnect();}},{threshold:.2});io.observe(node);}else fn();}
function tipper(box){var t=document.createElement('div');t.className='tg-tip';box.appendChild(t);return {show:function(h,ev){t.innerHTML=h;t.style.display='block';var r=box.getBoundingClientRect(),x=ev.clientX-r.left+12,y=ev.clientY-r.top+12;if(x+250>r.width)x=ev.clientX-r.left-252;t.style.left=Math.max(0,x)+'px';t.style.top=y+'px';},hide:function(){t.style.display='none';}};}
function clock(h){var hh=Math.floor(h),m=Math.round((h-hh)*60);if(m==60){hh++;m=0;}var ap=hh>=12&&hh<24?'p.m.':'a.m.';var d=hh%12||12;if(hh==12&&!m)return 'noon';if(hh==24&&!m)return 'midnight';return d+(m?':'+(m<10?'0':'')+m:'')+' '+ap;}

/* ================= STORY 1: games per Thanksgiving ================= */
/* Games involving NFL teams on Thanksgiving Day (Wikipedia, NFL on Thanksgiving Day), rival-league games, and the added Black Friday / Thanksgiving Eve games */
var NFLX={1920:6,1921:2,1922:5,1923:4,1924:5,1925:4,1926:8,1927:4,1928:4,1929:3,1930:4,1931:3,1932:3,1933:2,1934:3,1935:3,1936:3,1937:2,1938:2,1939:1,1940:3,1950:2,1952:2};
var RIVAL={1946:1,1947:2,1948:2,1949:2,1960:1,1961:1,1962:1,1963:1,1964:1,1965:1,1966:1,1967:2,1968:2,1969:2};
var EXTRA={2023:1,2024:1,2025:1,2026:2};
function nflN(y){if(NFLX[y]!=null)return NFLX[y];if(y>=1941&&y<=1944)return 0;if(y<1966)return 1;if(y<2006)return 2;return 3;}
function ribbon(box,compact){
 var narrow=box.clientWidth<520;
 frame(box,'Pro Football Fell To One Thanksgiving Game In The 1950s, And This Week The NFL Is Playing Five',compact?null:'Each square is one game, 1920 to 2026.');
 if(!compact)key(box,[[GREEN,'NFL, Thanksgiving Day'],[GRAY,'Rival leagues (AAFC, AFL)'],[LIGHT,'NFL, Thanksgiving Eve or Black Friday',GREEN]]);
 var W=narrow?400:760,L=narrow?22:30,R=narrow?6:12,u=narrow?17:20,top=narrow?44:40,bot=top+8*u,H=bot+(compact?22:26);
 var step=(W-L-R)/107,bw=Math.max(1.6,step-(narrow?0.7:1.3));
 var X=function(y){return L+(y-1920)*step;};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);var tip=tipper(box);
 [2,4,6,8].forEach(function(v){svg.appendChild(el('line',{x1:L,x2:W-R,y1:bot-v*u,y2:bot-v*u,stroke:FAINT}));T(svg,L-5,bot-v*u+4,String(v),{a:'end',s:10,f:MUTED});});
 svg.appendChild(el('line',{x1:L,x2:W-R,y1:bot,y2:bot,stroke:RULE}));
 (narrow?[1920,1960,2000,2026]:[1920,1940,1960,1980,2000,2026]).forEach(function(y){T(svg,X(y)+bw/2,bot+16,String(y),{a:y==2026?'end':'middle',s:10.5,f:MUTED});});
 var rects=[];
 for(var y=1920;y<=2026;y++){(function(y){
  var n=nflN(y),r=RIVAL[y]||0,e=EXTRA[y]||0,k=0;
  function sq(fill,stroke){var rc=el('rect',{x:X(y),y:bot-(k+1)*u+1,width:bw,height:u-2,rx:narrow?0.6:1.2,fill:fill,opacity:0});if(stroke){rc.setAttribute('stroke',stroke);rc.setAttribute('stroke-width',1);}svg.appendChild(rc);rects.push([rc,y]);k++;}
  for(var i=0;i<n;i++)sq(GREEN);for(i=0;i<r;i++)sq(GRAY);for(i=0;i<e;i++)sq(LIGHT,GREEN);
  var h='<b>'+y+'</b><br>'+(n?n+' NFL game'+(n>1?'s':'')+' on Thanksgiving':'No NFL game on Thanksgiving')+(r?'<br>'+r+' in the '+(y<1950?'AAFC':'AFL'):'')+(y==2026?'<br>Plus Thanksgiving Eve and Black Friday':e?'<br>Plus a Black Friday game':'')+(y==1920?'<br>Some 1920s games were against teams outside the league':'');
  var hit=el('rect',{x:X(y)-(step-bw)/2,y:top-30,width:step,height:bot-top+30,fill:'transparent',style:'cursor:pointer'});svg.appendChild(hit);
  hit.addEventListener('mousemove',function(ev){tip.show(h,ev);});hit.addEventListener('mouseleave',tip.hide);hit.addEventListener('click',function(ev){tip.show(h,ev);});
 })(y);}
 var ann=narrow?[[1926,8,'8 games, 1926','start',-26],[1942.5,0,'None, 1941-44','start',-100],[1956,1,'One a year, 1953-59','start',-42],[2026,5,'5 games, 2026','end',-16]]
  :[[1926,8,'8 games in 1926','start',-12],[1942.5,0,'None in 1941-44, during World War II','middle',-120],[1956,1,'One a year, 1953-59, in Detroit','end',-66],[1966,3,'Dallas joins, 1966','middle',-34],[2006,3,'Third game, at night, 2006','end',-34],[2026,5,'Five games in 2026, Wednesday to Friday','end',-18]];
 if(!compact||1)ann.forEach(function(a){var x=X(Math.floor(a[0]))+(a[0]%1?step/2:bw/2),yb=bot-a[1]*u,ly=yb+a[4];svg.appendChild(el('line',{x1:x,x2:x,y1:ly+3,y2:yb-3,stroke:MUTED,'stroke-width':.8}));T(svg,a[3]=='start'?x-3:a[3]=='end'?x+3:x,ly-2,a[2],{a:a[3],s:narrow?10:11.5,f:INK,w:'600'});});
 seen(svg,function(){rects.forEach(function(p){setTimeout(function(){p[0].style.transition='opacity .25s';p[0].setAttribute('opacity',1);},(p[1]-1920)*14);});});
 if(!compact)src(box,'Source: Wikipedia, NFL on Thanksgiving Day, game lists through 2026; NFL schedule. 1920s counts include games against teams outside the league.');
}
/* 2026 holiday week, Eastern time; game lengths assumed 3 hours 15 minutes */
var WEEK=[['Wed., Nov. 25',[[20,'Packers at Rams','Netflix','GB at LAR']]],['Thu., Nov. 26',[[13,'Bears at Lions','CBS','CHI at DET'],[16.5,'Eagles at Cowboys','Fox','PHI at DAL'],[20.333,'Chiefs at Bills','NBC','KC at BUF']]],['Fri., Nov. 27',[[15,'Broncos at Steelers','Prime Video','DEN at PIT']]]];
function week(box){
 var narrow=box.clientWidth<520;
 frame(box,'The NFL’s Thanksgiving Now Runs From Wednesday Night To Friday Afternoon','Kickoff times for 2026, Eastern time. Each block is about three hours and 15 minutes.');
 var W=narrow?400:760,L=narrow?58:96,R=narrow?8:16,rowH=narrow?58:54,top=26,H=top+3*rowH+8;
 var x0=11,x1=24,X=function(h){return L+(h-x0)/(x1-x0)*(W-L-R);};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);var tip=tipper(box);
 (narrow?[12,15,18,21,24]:[11,13,15,17,19,21,23]).forEach(function(h){svg.appendChild(el('line',{x1:X(h),x2:X(h),y1:top-4,y2:H-6,stroke:FAINT}));T(svg,X(h),top-10,narrow?clock(h).replace(' p.m.','p').replace('noon','12p').replace('midnight','12a'):clock(h),{a:'middle',s:10.5,f:MUTED});});
 var blocks=[];
 WEEK.forEach(function(d,i){var y=top+i*rowH;svg.appendChild(el('line',{x1:0,x2:W-R,y1:y+rowH,y2:y+rowH,stroke:RULE}));
  var lab=d[0].split(', ');T(svg,0,y+rowH/2-2,lab[0],{s:narrow?11:12.5,w:'700'});T(svg,0,y+rowH/2+13,lab[1],{s:narrow?10:11.5,f:MUTED});
  d[1].forEach(function(g){var bx=X(g[0]),bwid=X(g[0]+3.25)-bx;var r=el('rect',{x:bx,y:y+7,width:0,height:rowH-14,rx:5,fill:GREEN,style:'cursor:pointer'});svg.appendChild(r);blocks.push([r,bwid]);
   var t1=T(svg,bx+6,y+rowH/2-1,narrow?g[3]:g[1],{s:narrow?9.5:12,f:'#fff',w:'700'}),t2=T(svg,bx+6,y+rowH/2+13,narrow?g[2].replace('Prime Video','Prime'):g[2],{s:narrow?9:11,f:'#e3f1ea'});t1.style.opacity=t2.style.opacity=0;blocks.push([t1]);blocks.push([t2]);
   var h='<b>'+g[1]+'</b><br>'+d[0]+', '+clock(g[0])+' ET on '+g[2];r.addEventListener('mousemove',function(ev){tip.show(h,ev);});r.addEventListener('mouseleave',tip.hide);r.addEventListener('click',function(ev){tip.show(h,ev);});});
 });
 seen(svg,function(){blocks.forEach(function(b,i){setTimeout(function(){if(b[1]!=null){b[0].style.transition='width .6s ease';b[0].setAttribute('width',b[1]);}else{b[0].style.transition='opacity .4s';b[0].style.opacity=1;}},200+Math.floor(i/3)*260);});});
 src(box,'Source: NFL 2026 schedule. End times are estimates.');
}

/* ================= STORY 2: dinner vs. kickoff ================= */
/* Pew Research Center, Nov. 12-17, 2024, preferred time to eat Thanksgiving dinner */
var PEW=[[9,12,1,'Before noon'],[12,15,36,'Noon to 3 p.m.'],[15,18,38,'3 to 6 p.m.'],[18,21,11,'After 6 p.m.']];
var GAMES=[[13,16.25,'Bears at Lions'],[16.5,19.75,'Eagles at Cowboys'],[20.333,23.583,'Chiefs at Bills']];
var ZONES=[['Eastern',0],['Central',-1],['Mountain',-2],['Pacific',-3]];
function cover(sh,a,b){var t=0;GAMES.forEach(function(g){var s=Math.max(a,g[0]+sh),e=Math.min(b,g[1]+sh);if(e>s)t+=e-s;});return t/(b-a);}
function onAt(sh,h){for(var i=0;i<GAMES.length;i++)if(h>=GAMES[i][0]+sh&&h<GAMES[i][1]+sh)return GAMES[i][2];return null;}
function dinner(box,compact){
 var narrow=box.clientWidth<520;
 frame(box,'Most Americans Prefer Thanksgiving Dinner Between Noon And 6 P.M., And An NFL Game Is On For Nearly All Of It',compact?null:'Top: when Americans say they prefer to eat. Below: Thursday’s three games in each time zone’s local time.');
 var W=narrow?400:760,L=narrow?62:84,R=narrow?40:64,top=18,pewH=narrow?70:80,gap=narrow?30:34,rowH=narrow?36:38,H=top+pewH+gap+4*rowH+30;
 var x0=9,x1=24,X=function(h){return L+(h-x0)/(x1-x0)*(W-L-R);};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);
 /* noon-6 highlight */
 var gy=top+pewH+gap;
 svg.appendChild(el('rect',{x:X(12),y:top-6,width:X(18)-X(12),height:H-top-18,fill:'#f6faf8'}));
 (narrow?[9,12,15,18,21,24]:[9,11,13,15,17,19,21,23]).forEach(function(h){svg.appendChild(el('line',{x1:X(h),x2:X(h),y1:top,y2:H-24,stroke:FAINT}));T(svg,X(h),H-8,narrow?clock(h).replace(' p.m.','p').replace(' a.m.','a').replace('noon','12p').replace('midnight','12a'):clock(h),{a:'middle',s:10.5,f:MUTED});});
 /* Pew bars */
 var pb=top+pewH;T(svg,0,top+12,narrow?'Prefer to':'Prefer to eat',{s:narrow?10.5:11.5,w:'700'});if(narrow)T(svg,0,top+26,'eat',{s:10.5,w:'700'});
 var pewR=[];PEW.forEach(function(p){var h=p[2]/38*(pewH-22),r=el('rect',{x:X(p[0])+2,y:pb,width:X(p[1])-X(p[0])-4,height:0,rx:3,fill:p[2]>20?INK:GRAY});svg.appendChild(r);pewR.push([r,h]);var t=T(svg,(X(p[0])+X(p[1]))/2,pb-h-5,p[2]+'%',{a:'middle',s:narrow?11:12.5,w:'700'});t.style.opacity=0;pewR.push([t]);});
 svg.appendChild(el('line',{x1:L,x2:W-R,y1:pb,y2:pb,stroke:RULE}));
 /* zones */
 var blocks=[];
 ZONES.forEach(function(z,i){var y=gy+i*rowH;T(svg,0,y+rowH/2+4,z[0],{s:narrow?11:12.5,w:'600'});
  GAMES.forEach(function(g,j){var a=g[0]+z[1],b=g[1]+z[1],r=el('rect',{x:X(a),y:y+6,width:0,height:rowH-12,rx:4,fill:j==1?GREEN:LIGHT});svg.appendChild(r);blocks.push([r,X(b)-X(a)]);
   {var t=T(svg,X(a)+5,y+rowH/2+4,narrow?['DET','DAL','BUF'][j]:(j==0?'Lions':j==1?'Cowboys':'Bills'),{s:narrow?9.5:11,f:j==1?'#fff':INK,w:'700'});t.style.opacity=0;blocks.push([t]);}});
  var c=Math.round(cover(z[1],12,18)*100);var ct=T(svg,W,y+rowH/2+4,c+'%',{a:'end',s:narrow?12:14,w:'700',f:GREEN});ct.style.opacity=0;blocks.push([ct]);
 });
 T(svg,W,gy-8,narrow?'Game on':'Game on, noon-6',{a:'end',s:narrow?9.5:10.5,f:MUTED});
 /* scrubber */
 var sc=el('line',{x1:0,x2:0,y1:top-6,y2:H-24,stroke:RUST,'stroke-width':1.5,'stroke-dasharray':'3 3',opacity:0});svg.appendChild(sc);
 var cd=compact?null:card(box);
 function at(h){h=Math.max(9,Math.min(23.99,h));var x=X(h);sc.setAttribute('x1',x);sc.setAttribute('x2',x);sc.setAttribute('opacity',1);if(!cd)return;
  var pew=PEW.filter(function(p){return h>=p[0]&&h<p[1];})[0];
  cd.innerHTML='<b>At '+clock(Math.round(h*4)/4)+' local time</b>'+(pew?' ('+pew[2]+'% prefer to eat '+pew[3].toLowerCase().replace('after','after').replace('before','before')+')':'')+':<br>'+ZONES.map(function(z){var g=onAt(z[1],h);return z[0]+': '+(g?'<b>'+g+'</b>':'no game');}).join(' · ');}
 var hit=el('rect',{x:L,y:top-6,width:W-L-R,height:H-top-18,fill:'transparent',style:'cursor:crosshair'});svg.appendChild(hit);
 function mv(ev){var r=svg.getBoundingClientRect(),cx=(ev.touches?ev.touches[0].clientX:ev.clientX);var vx=(cx-r.left)/r.width*W;at(x0+(vx-L)/(W-L-R)*(x1-x0));}
 hit.addEventListener('mousemove',mv);hit.addEventListener('click',mv);hit.addEventListener('touchmove',function(e){mv(e);e.preventDefault();},{passive:false});
 seen(svg,function(){pewR.forEach(function(p,i){setTimeout(function(){if(p[1]!=null){p[0].style.transition='height .6s ease, y .6s ease';p[0].setAttribute('height',p[1]);p[0].setAttribute('y',pb-p[1]);}else{p[0].style.transition='opacity .4s';p[0].style.opacity=1;}},i*110);});
  blocks.forEach(function(b,i){setTimeout(function(){if(b[1]!=null){b[0].style.transition='width .5s ease';b[0].setAttribute('width',b[1]);}else{b[0].style.transition='opacity .4s';b[0].style.opacity=1;}},700+i*55);});
  setTimeout(function(){at(15);},1500);});
 if(!compact)src(box,'Sources: Pew Research Center survey of 9,609 U.S. adults, Nov. 12-17, 2024 (5% had no preference); NFL 2026 schedule. Games are assumed to last about three hours and 15 minutes. Hover or drag across the chart to see what is on.');
}

/* ================= STORY 3: the Lions ================= */
/* Every Detroit Lions Thanksgiving game: year|opponent|Lions points|opponent points|note (Wikipedia, NFL on Thanksgiving Day) */
var LG='1934|Bears|16|19|The first Lions Thanksgiving game, in their first season in Detroit;1935|Bears|14|2;1936|Bears|13|7;1937|Bears|0|13;1938|Bears|14|7;1945|Cleveland Rams|21|28|The game returns after World War II;1946|Boston Yanks|10|34;1947|Bears|14|34;1948|Chicago Cardinals|14|28;1949|Bears|7|28;1950|New York Yanks|49|14;1951|Packers|52|35|The start of 13 straight years against Green Bay;1952|Packers|48|24;1953|Packers|34|15;1954|Packers|28|24;1955|Packers|24|10;1956|Packers|20|24;1957|Packers|18|6;1958|Packers|24|14;1959|Packers|17|24;1960|Packers|23|10;1961|Packers|9|17;1962|Packers|26|14|Detroit handed the 13-1 Packers their only loss of the season;1963|Packers|13|13|T;1964|Bears|24|27;1965|Colts|24|24|T;1966|49ers|14|41;1967|Rams|7|31;1968|Eagles|0|12;1969|Vikings|0|27;1970|Raiders|28|14;1971|Chiefs|32|21;1972|Jets|37|20;1973|Washington|0|20;1974|Broncos|27|31;1975|Rams|0|20;1976|Bills|27|14;1977|Bears|14|31;1978|Broncos|17|14;1979|Bears|20|0;1980|Bears|17|23|Lost in overtime;1981|Chiefs|27|10;1982|Giants|6|13;1983|Steelers|45|3;1984|Packers|31|28;1985|Jets|31|20;1986|Packers|40|44;1987|Chiefs|20|27;1988|Vikings|0|23;1989|Browns|13|10;1990|Broncos|40|27;1991|Bears|16|6;1992|Oilers|21|24;1993|Bears|6|10;1994|Bills|35|21;1995|Vikings|44|38;1996|Chiefs|24|28;1997|Bears|55|20;1998|Steelers|19|16|Won in overtime after the disputed coin toss: Jerome Bettis said he called tails, and the referee heard heads;1999|Bears|21|17;2000|Patriots|34|9;2001|Packers|27|29;2002|Patriots|12|20;2003|Packers|22|14;2004|Colts|9|41|The first of nine straight Thanksgiving losses;2005|Falcons|7|27;2006|Dolphins|10|27;2007|Packers|26|37;2008|Titans|10|47|Detroit kept the game during its 0-16 season, despite calls to replace it;2009|Packers|12|34;2010|Patriots|24|45;2011|Packers|15|27;2012|Texans|31|34|Lost in overtime, the ninth straight loss;2013|Packers|40|10|Ended the nine-game losing streak;2014|Bears|34|17;2015|Eagles|45|14;2016|Vikings|16|13;2017|Vikings|23|30;2018|Bears|16|23;2019|Bears|20|24;2020|Texans|25|41;2021|Bears|14|16;2022|Bills|25|28;2023|Packers|22|29;2024|Bears|23|20|The only win in the last nine;2025|Packers|24|31';
var LIONS={};LG.split(';').forEach(function(s){var p=s.split('|');var lp=+p[2],op=+p[3];LIONS[+p[0]]={opp:p[1],lp:lp,op:op,r:lp>op?'W':lp<op?'L':'T',note:p[4]&&p[4]!='T'?p[4]:''};});
function rec(a,b){var w=0,l=0,t=0;for(var y=a;y<=b;y++){var g=LIONS[y];if(!g)continue;if(g.r=='W')w++;else if(g.r=='L')l++;else t++;}return w+'-'+l+(t?'-'+t:'');}
function strip(box,compact){
 var narrow=box.clientWidth<520;
 frame(box,'The Lions Have Lost More Thanksgiving Games Than They Have Won, And The NFL Keeps Giving Them One',compact?null:'Every Detroit Lions Thanksgiving game, one square per year, by decade.');
 if(!compact)key(box,[[GREEN,'Win'],[RUST,'Loss'],[GRAY,'Tie'],['#fff','No game',GRAY]]);
 var W=narrow?400:640,L=narrow?44:60,R=narrow?44:64,cw=(W-L-R)/10,ch=narrow?26:compact?28:32,top=narrow?18:20,H=top+10*ch+6;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,style:'max-width:'+(narrow?400:640)+'px;margin:0 auto'});box.appendChild(svg);var tip=tipper(box);
 for(var c=0;c<10;c++)T(svg,L+c*cw+cw/2,top-6,String(c),{a:'middle',s:10,f:MUTED});
 if(!narrow)T(svg,W,top-6,'Record',{a:'end',s:10,f:MUTED});
 var cells=[];var cd=compact?null:card(box);
 function def(){if(cd)cd.innerHTML='<b>38 wins, 46 losses and 2 ties</b> in 86 Thanksgiving games from 1934 to 2025, the most games and the most losses of any team. Tap a square for the score.';}
 for(var d=0;d<10;d++){var dec=1930+d*10,y0=top+d*ch;T(svg,L-8,y0+ch/2+4,dec+'s',{a:'end',s:narrow?10.5:11.5,w:'600'});
  var rr=rec(dec,dec+9);if(dec>=1930&&rr!='0-0')T(svg,W,y0+ch/2+4,rr,{a:'end',s:narrow?10.5:11.5,f:MUTED});
  for(c=0;c<10;c++){(function(yr,x,y){
   var g=LIONS[yr],pad=narrow?2:3,fill,stroke=null,dash=null;
   if(g)fill=g.r=='W'?GREEN:g.r=='L'?RUST:GRAY;else if(yr==2026){fill='#fff';stroke=INK;}else if((yr>=1939&&yr<=1944))
    {fill='#fff';stroke=GRAY;dash='3 2';}else return;
   var r=el('rect',{x:x+pad,y:y+pad,width:cw-2*pad,height:ch-2*pad,rx:3,fill:fill,opacity:0,style:'cursor:pointer'});if(stroke){r.setAttribute('stroke',stroke);r.setAttribute('stroke-width',1.2);}if(dash)r.setAttribute('stroke-dasharray',dash);svg.appendChild(r);cells.push(r);
   if(g&&g.note){svg.appendChild(el('circle',{cx:x+cw-pad-5,cy:y+pad+5,r:narrow?1.8:2.4,fill:'#fff'}));}
   if(!narrow&&!compact&&g){var t=T(svg,x+cw/2,y+ch/2+4,(g.r=='T'?'':'')+g.lp+'-'+g.op,{a:'middle',s:10.5,f:'#fff',w:'600'});t.style.pointerEvents='none';}
   if(yr==2026){T(svg,x+cw/2,y+ch/2+4,'Thu.',{a:'middle',s:narrow?9:10.5,f:INK,w:'600'});}
   var h=g?'<b>'+yr+': '+(g.r=='W'?'Won':g.r=='L'?'Lost':'Tied')+' '+Math.max(g.lp,g.op)+'-'+Math.min(g.lp,g.op)+'</b> '+(g.r=='L'?'to':g.r=='W'?'over':'with')+' the '+g.opp+(g.note?'<br>'+g.note:''):yr==2026?'<b>2026:</b> Bears at Lions, Thursday at 1 p.m. ET on CBS':'<b>'+yr+':</b> No Lions game. '+(yr==1939?'Detroit did not host in 1939':'The Lions did not play on Thanksgiving during World War II');
   r.addEventListener('mousemove',function(ev){tip.show(h,ev);});r.addEventListener('mouseleave',tip.hide);r.addEventListener('click',function(ev){if(cd){cd.innerHTML=h;}else tip.show(h,ev);});
  })(dec+c,L+c*cw,y0);}
 }
 def();
 seen(svg,function(){cells.forEach(function(r,i){setTimeout(function(){r.style.transition='opacity .3s';r.setAttribute('opacity',1);},i*22);});});
 if(!compact)src(box,'Source: Wikipedia, NFL on Thanksgiving Day, results through 2025. A white dot marks a game with a note.');
}
var TEAMS=[['Lions',38,46,2],['Cowboys',35,22,1],['Bears',20,16,2],['Packers',17,20,2],['Cardinals',6,15,2],['Giants',7,7,3],['Washington',4,9,0],['Bills',6,4,1],['Broncos',4,7,0],['Chiefs',5,6,0]];
function teams(box){
 var narrow=box.clientWidth<520;
 frame(box,'No Team Has Played Or Lost More Thanksgiving Games Than Detroit',narrow?'Thanksgiving wins, ties and losses through 2025. The 10 teams with the most games.':'Each square is one Thanksgiving game, through 2025. The 10 teams with the most games.');
 key(box,[[GREEN,'Win'],[GRAY,'Tie'],[RUST,'Loss']]);
 var W=narrow?400:760,L=narrow?70:96,R=narrow?52:70,rowH=narrow?22:26,top=6,H=top+TEAMS.length*rowH;
 var sz=Math.min(7.6,(W-L-R)/86);
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H});box.appendChild(svg);var sq=[];
 TEAMS.forEach(function(t,i){var y=top+i*rowH;T(svg,L-8,y+rowH/2+4,t[0],{a:'end',s:narrow?11:12.5,w:t[0]=='Lions'?'700':'500'});
  var seq=[];for(var a=0;a<t[1];a++)seq.push(GREEN);for(a=0;a<t[3];a++)seq.push(GRAY);for(a=0;a<t[2];a++)seq.push(RUST);
  if(narrow){var x=L;[[t[1],GREEN],[t[3],GRAY],[t[2],RUST]].forEach(function(sg,k){if(!sg[0])return;var r=el('rect',{x:x,y:y+5,width:sg[0]*sz-1,height:rowH-10,rx:2,fill:sg[1],opacity:0});svg.appendChild(r);sq.push([r,k*20]);x+=sg[0]*sz;});}else seq.forEach(function(f,j){var r=el('rect',{x:L+j*sz,y:y+(rowH-sz*1.6)/2,width:Math.max(1,sz-1),height:sz*1.6,rx:1,fill:f,opacity:0});svg.appendChild(r);sq.push([r,j]);});
  T(svg,L+seq.length*sz+6,y+rowH/2+4,t[1]+'-'+t[2]+(t[3]?'-'+t[3]:''),{s:narrow?10:11.5,f:MUTED});
 });
 seen(svg,function(){sq.forEach(function(p){setTimeout(function(){p[0].style.transition='opacity .2s';p[0].setAttribute('opacity',1);},p[1]*18);});});
 src(box,'Source: Wikipedia, NFL on Thanksgiving Day, all-time standings through 2025. Records include franchise predecessors, such as the Chicago and St. Louis Cardinals.');
}

function boot(){var m={'nid-tg-ribbon':function(b){ribbon(b,false);},'nid-tg-home1':function(b){ribbon(b,true);},'nid-tg-week':week,'nid-tg-clock':function(b){dinner(b,false);},'nid-tg-home2':function(b){dinner(b,true);},'nid-tg-strip':function(b){strip(b,false);},'nid-tg-home3':function(b){strip(b,true);},'nid-tg-teams':teams};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,1500);
})();
