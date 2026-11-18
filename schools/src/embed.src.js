/* The News in Data: school closures story (Nov. 18, 2026).
   Mounts: #nid-sc-plans (district votes), #nid-sc-years (national closures by year),
   #nid-sc-kids (births and enrollment), #nid-sc-states (tile map), #nid-sc-home (home poster). */
(function(){
if(window.__nidSc)return; window.__nidSc=1;
var GREEN='#007a55',LIGHT='#7fbfa6',PALE='#d4ebe1',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#b9c6bf';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function fmt(n){return n.toLocaleString('en-US');}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}

/* ---------- data ---------- */
var PLANS=[ /* K-12 Dive closure tracker, updated Nov. 16, 2026: board-approved plans */
 ['Cleveland','OH',29,1,'Dec. 9, 2025','Enrollment fell by about half, from 70,000 in 2004 to 34,000 in 2025.'],
 ['Philadelphia','PA',17,1,'Apr. 30, 2026','Closures are phased in over a decade, starting in 2026-27. Enrollment fell 12%, or 15,546 students, from 2014-15 to 2024-25.'],
 ['Tulsa','OK',17,2,'Oct. 19, 2026','14 elementary schools, two middle schools and an alternative program. Enrollment fell from about 40,900 in 2016 to 32,500 in 2026.'],
 ['Atlanta','GA',16,2,'Dec. 3, 2025','Schools will close or be repurposed. About 50,000 students in buildings with 70,000 seats.'],
 ['Houston','TX',12,1,'Feb. 26, 2026','The state-appointed board voted unanimously.'],
 ['Pittsburgh','PA',12,2,'May 27, 2026','Twelve schools in nine buildings. Enrollment fell by about a quarter from 2013-14 to 2023-24.'],
 ['Austin','TX',10,1,'Nov. 20, 2025','Down about 10,000 students over the past decade, with 21,000 empty seats.'],
 ['Miami-Dade','FL',9,1,'June 17, 2026','Enrollment fell 4% in one year, from 326,279 to 313,220.'],
 ['St. Louis','MO',9,2,'Nov. 10, 2026','A 4-3 vote. Enrollment fell 58.5% from 1991 to 2025, to 17,981.'],
 ['Poudre (Fort Collins)','CO',8,2,'Oct. 27, 2026','Six closures and two consolidations. About 10,500 open seats.'],
 ['Fort Bend','TX',7,1,'Mar. 9, 2026','79,970 students in 2025-26, 1,801 fewer than the budget assumed.'],
 ['Corpus Christi','TX',7,1,'Jan. 12, 2026','A 4-3 vote. Enrollment fell from 36,342 to 32,073 between 2019-20 and 2025-26.'],
 ['Cedar Rapids','IA',7,2,'Apr. 27, 2026','Five closures and two consolidations. Enrollment fell 4.3% in one year.'],
 ['Broward','FL',6,1,'Jan. 21, 2026','Six consolidations. Enrollment fell about 17%, or 37,707 students, from 2015-16 to 2025-26. The superintendent has since recommended closing 10 more.'],
 ['Adams 12 (Thornton)','CO',6,2,'Oct. 7, 2026','The district lost about 6,400 students over the past decade.'],
 ['Olathe','KS',6,2,'Oct. 1, 2026','Five elementary schools and a middle school. Enrollment fell 7% from 2019-20 to 2025-26.'],
 ['Kyrene','AZ',6,1,'Dec. 16, 2025','Closures over 2026-27 and 2027-28. About 12,000 students in space for 20,000.'],
 ['San Jose Unified','CA',5,1,'Mar. 26, 2026','Enrollment fell about 20%, or 6,000 students, since 2017-18.'],
 ['Judson','TX',4,1,'Feb. 9, 2026','Three elementary schools and a middle school, near San Antonio.']
];
var YEARS=[[2009,2123],[2010,2033],[2011,2178],[2012,1557],[2013,1774],[2014,1574],[2015,1160],[2016,1237],[2017,1436],[2018,1189],[2019,1230],[2020,940],[2021,849],[2022,878],[2023,1025],[2024,1064]];
var BIRTHS=[[2007,4.316],[2010,3.999],[2011,3.954],[2012,3.953],[2013,3.932],[2014,3.988],[2015,3.978],[2016,3.946],[2017,3.856],[2018,3.792],[2019,3.748],[2020,3.614],[2021,3.664],[2022,3.668],[2023,3.596],[2024,3.629],[2025,3.606]];
var ENROLL=[[2012,49.771],[2013,50.045],[2014,50.313],[2015,50.438],[2016,50.615],[2017,50.686],[2018,50.694],[2019,50.796],[2020,49.375],[2021,49.433],[2022,49.618],[2023,49.012],[2024,48.707],[2025,48.228],[2026,47.644],[2027,47.37],[2028,47.184],[2029,47.028],[2030,46.94],[2031,46.89]];
var ST='AL,6,4,1512;AK,9,6,492;AZ,4,3,2399;AR,11,16,1081;CA,56,49,10279;CO,17,42,1889;CT,11,7,1006;DE,0,1,228;DC,2,1,243;FL,94,77,4184;GA,20,8,2308;HI,0,0,295;ID,13,1,792;IL,40,32,4376;IN,9,29,1892;IA,16,21,1306;KS,14,13,1342;KY,9,16,1526;LA,17,34,1301;ME,5,9,585;MD,6,7,1403;MA,20,18,1819;MI,34,41,3469;MN,79,50,2646;MS,18,19,1019;MO,24,16,2457;MT,5,7,821;NE,18,3,1089;NV,2,6,752;NH,13,3,499;NJ,17,16,2547;NM,7,4,886;NY,33,14,4788;NC,30,21,2698;ND,8,10,501;OH,66,86,3548;OK,7,16,1765;OR,8,6,1280;PA,10,26,2914;RI,2,5,310;SC,12,10,1254;SD,14,19,698;TN,15,18,1880;TX,150,156,9078;UT,10,13,1089;VT,2,0,301;VA,20,16,2116;WA,21,23,2525;WV,18,3,681;WI,39,22,2214;WY,3,2,355';
var NAMES={AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'};
var GRID={AK:[0,0],ME:[11,0],VT:[10,1],NH:[11,1],WA:[1,2],ID:[2,2],MT:[3,2],ND:[4,2],MN:[5,2],IL:[6,2],WI:[7,2],MI:[8,2],NY:[9,2],RI:[10,2],MA:[11,2],OR:[1,3],NV:[2,3],WY:[3,3],SD:[4,3],IA:[5,3],IN:[6,3],OH:[7,3],PA:[8,3],NJ:[9,3],CT:[10,3],CA:[1,4],UT:[2,4],CO:[3,4],NE:[4,4],MO:[5,4],KY:[6,4],WV:[7,4],VA:[8,4],MD:[9,4],DE:[10,4],AZ:[2,5],NM:[3,5],KS:[4,5],AR:[5,5],TN:[6,5],NC:[7,5],SC:[8,5],DC:[9,5],OK:[4,6],LA:[5,6],MS:[6,6],AL:[7,6],GA:[8,6],HI:[0,7],TX:[4,7],FL:[9,7]};

/* ---------- shared UI ---------- */
function css(){
 if(document.getElementById('nid-sc-css'))return;
 var s=document.createElement('style');s.id='nid-sc-css';
 s.textContent='.nid-sc{font-family:'+SERIF+';color:'+INK+';max-width:720px;margin:2em auto}'+
 '.nid-sc .sc-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '.nid-sc .sc-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .8em;line-height:1.35}'+
 '.nid-sc svg{width:100%;height:auto;display:block;overflow:visible}'+
 '.nid-sc .sc-hit{cursor:pointer}.nid-sc .sc-hit:hover .sc-bg,.nid-sc .sc-hit.on .sc-bg{fill:'+FAINT+'}'+
 '.nid-sc .sc-card{background:#fff;border:1px solid '+RULE+';border-left:5px solid '+GREEN+';border-radius:6px;padding:.75em 1em;margin:.6em 0 0;font-size:.98em;line-height:1.45}'+
 '.nid-sc .sc-card b{color:'+GREEN+'}'+
 '.nid-sc .sc-key{display:flex;justify-content:center;gap:1.2em;font-family:'+SANS+';font-size:.78em;color:'+MUTED+';margin:0 0 .5em;flex-wrap:wrap}'+
 '.nid-sc .sc-key i{display:inline-block;width:12px;height:12px;border-radius:2px;vertical-align:-1px;margin-right:.35em}'+
 '.nid-sc .sc-src{font-size:.78em;color:'+MUTED+';margin:.7em 0 0;line-height:1.4}'+
 '.nid-sc .sc-tip{position:absolute;pointer-events:none;background:#fff;border:1px solid '+RULE+';border-radius:6px;padding:.45em .7em;font-size:.88em;line-height:1.35;box-shadow:0 2px 8px rgba(0,0,0,.08);max-width:240px;display:none;z-index:5}';
 document.head.appendChild(s);
}
function frame(box,title,dek){
 css();box.innerHTML='';box.classList.add('nid-sc');box.style.position='relative';
 var h=document.createElement('p');h.className='sc-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);
 if(dek){var d=document.createElement('p');d.className='sc-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}
}
function src(box,html){var p=document.createElement('p');p.className='sc-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function tip(box){var t=document.createElement('div');t.className='sc-tip';box.appendChild(t);return {show:function(html,ev){t.innerHTML=html;t.style.display='block';var r=box.getBoundingClientRect(),x=ev.clientX-r.left+12,y=ev.clientY-r.top+12;if(x+250>r.width)x=Math.max(0,ev.clientX-r.left-252);t.style.left=x+'px';t.style.top=y+'px';},hide:function(){t.style.display='none';}};}
function svgText(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.sans?SANS:SERIF,'font-weight':o.w||'normal'},txt);g.appendChild(t);return t;}

/* ---------- 1. district votes ---------- */
function plans(box,compact){
 var total=PLANS.reduce(function(a,p){return a+p[2];},0);
 frame(box,'Big School Districts Have Voted To Close '+total+' Schools In The Past Year',compact?null:'Board-approved closure plans tracked by K-12 Dive since November 2025. Tap a district for details.');
 var key=document.createElement('div');key.className='sc-key';key.innerHTML='<span><i style="background:'+GREEN+'"></i>Starting in 2026-27</span><span><i style="background:'+LIGHT+'"></i>Starting in 2027-28</span>';box.appendChild(key);
 var nar=box.clientWidth<520,W=nar?400:720,L=nar?150:(compact?150:178),R=nar?362:(compact?690:660),ROW=compact?24:28,TOP=6,H=TOP+PLANS.length*ROW+4,max=30;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Bar chart of schools that 19 large districts voted to close'});box.appendChild(svg);
 var card=null;if(!compact){card=document.createElement('div');card.className='sc-card';card.innerHTML='Cleveland voted to close <b>29 schools</b>, the most of any district on the list.';box.appendChild(card);}
 var rows=[];
 PLANS.forEach(function(p,i){
  var y=TOP+i*ROW,g=el('g',{class:'sc-hit'});svg.appendChild(g);
  g.appendChild(el('rect',{class:'sc-bg',x:0,y:y,width:W,height:ROW,fill:'transparent',rx:4}));
  svgText(g,L-10,y+ROW/2+5,p[0],{a:'end',s:compact?13:14,w:i==0?'bold':'normal'});
  var bw=(R-L)*p[2]/max;
  var bar=el('rect',{x:L,y:y+4,width:0,height:ROW-8,fill:p[3]==1?GREEN:LIGHT,rx:2});g.appendChild(bar);
  setTimeout(function(){bar.style.transition='width .7s ease '+(i*35)+'ms';bar.setAttribute('width',bw);},30);
  svgText(g,L+bw+6,y+ROW/2+5,p[2]+(p[0]=='Philadelphia'?' over 10 years':''),{s:compact?12:13,f:MUTED,sans:true});
  g.addEventListener('click',function(){if(!card)return;rows.forEach(function(r){r.classList.remove('on');});g.classList.add('on');card.innerHTML='<b>'+p[0]+', '+p[1]+': '+p[2]+' schools.</b> Approved '+p[4]+', starting in '+(p[3]==1?'2026-27':'2027-28')+'. '+p[5];});
  rows.push(g);
 });
 if(!compact)src(box,'Source: <a href="https://www.k12dive.com/news/public-schools-closure-tracker-enrollment/809364/">K-12 Dive school closure tracker</a>, updated Nov. 16, 2026. Counts include consolidations and, in Atlanta, repurposed buildings.');
}

/* ---------- 2. closures by year ---------- */
function years(box){
 frame(box,'Public School Closures Are Rising Again','Schools that closed before each school year, all 50 states and D.C. Hover for the count.');
 var nar=box.clientWidth<520,t=tip(box),W=nar?400:720,L=46,R=W-8,T=16,B=250,H=286,max=2400,n=YEARS.length,bw=(R-L)/n;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Column chart of public school closures by school year, 2009-10 to 2024-25'});box.appendChild(svg);
 [0,500,1000,1500,2000].forEach(function(v){var y=B-(B-T)*v/max;svg.appendChild(el('line',{x1:L,x2:R,y1:y,y2:y,stroke:v?RULE:'#9aaba2','stroke-width':1}));svgText(svg,L-6,y+4,fmt(v),{a:'end',s:11,f:MUTED,sans:true});});
 YEARS.forEach(function(d,i){
  var x=L+i*bw+bw*.14,w=bw*.72,h=(B-T)*d[1]/max,recent=d[0]>=2022,low=d[0]==2021;
  var r=el('rect',{x:x,y:B-h,width:w,height:h,fill:recent?GREEN:(low?LIGHT:GRAY),rx:2});svg.appendChild(r);
  var lab=d[0]+'–'+String(d[0]+1).slice(2);
  if((nar?i%5==0:i%3==0)||i==n-1)svgText(svg,i==n-1?x+w:x+w/2,B+16,lab,{a:i==n-1?'end':'middle',s:11,f:MUTED,sans:true});
  var hit=el('rect',{x:L+i*bw,y:T,width:bw,height:B-T,fill:'transparent'});svg.appendChild(hit);
  hit.addEventListener('mousemove',function(ev){t.show('<b>'+lab+'</b><br>'+fmt(d[1])+' schools closed',ev);});hit.addEventListener('mouseleave',t.hide);
 });
 var last=YEARS[n-1],lx=L+(n-1)*bw+bw/2,ly=B-(B-T)*last[1]/max;
 svgText(svg,lx,ly-8,fmt(last[1]),{a:'middle',s:13,w:'bold',f:GREEN});
 var lo=YEARS[12],ox=L+12*bw+bw/2,oy=B-(B-T)*lo[1]/max;
 svgText(svg,ox,oy-8,fmt(lo[1]),{a:'middle',s:12,f:MUTED});
 svgText(svg,L+1.5*bw,B-(B-T)*2178/max-10,'After the Great Recession',{a:'middle',s:12,f:MUTED});
 svgText(svg,ox-4,oy-26,'Pandemic low',{a:'middle',s:12,f:MUTED});
 src(box,'Source: National Center for Education Statistics, Common Core of Data school directory, via the <a href="https://educationdata.urban.org/">Urban Institute Education Data Portal</a>. Schools listed as closed in each year’s directory; includes charter, special education and alternative schools. 2024-25 is the latest year available.');
}

/* ---------- 3. births and enrollment ---------- */
function panel(svg,x0,w,title,data,lo,hi,fmtv,opt){
 var dy=opt.dy||0,T=34+dy,B=230+dy,X=function(yr){return x0+(yr-opt.y0)/(opt.y1-opt.y0)*w;},Y=function(v){return B-(B-T)*(v-lo)/(hi-lo);};
 svgText(svg,x0,16+dy,title,{s:14,w:'bold'});
 opt.ticks.forEach(function(v){svg.appendChild(el('line',{x1:x0,x2:x0+w,y1:Y(v),y2:Y(v),stroke:RULE}));svgText(svg,x0+w,Y(v)-4,fmtv(v),{a:'end',s:11,f:MUTED,sans:true});});
 opt.xt.forEach(function(yr){svgText(svg,X(yr),B+16,String(yr),{a:'middle',s:11,f:MUTED,sans:true});});
 var solid=data.filter(function(d){return !opt.proj||d[0]<=opt.proj;}),dash=data.filter(function(d){return opt.proj&&d[0]>=opt.proj;});
 function path(arr){return arr.map(function(d,i){return (i?'L':'M')+X(d[0]).toFixed(1)+','+Y(d[1]).toFixed(1);}).join('');}
 if(opt.gap){var a=solid.filter(function(d){return d[0]>opt.gap;});var g0=solid.filter(function(d){return d[0]==opt.gap;})[0];svg.appendChild(el('path',{d:'M'+X(g0[0])+','+Y(g0[1])+'L'+X(a[0][0])+','+Y(a[0][1]),fill:'none',stroke:GRAY,'stroke-width':1.5,'stroke-dasharray':'2 4'}));svg.appendChild(el('path',{d:path(a),fill:'none',stroke:GREEN,'stroke-width':2.5}));}
 else svg.appendChild(el('path',{d:path(solid),fill:'none',stroke:GREEN,'stroke-width':2.5}));
 if(dash.length)svg.appendChild(el('path',{d:path(dash),fill:'none',stroke:GREEN,'stroke-width':2.5,'stroke-dasharray':'5 4'}));
 (opt.dots||[]).forEach(function(dd){var d=data.filter(function(q){return q[0]==dd[0];})[0];svg.appendChild(el('circle',{cx:X(d[0]),cy:Y(d[1]),r:4,fill:GREEN}));svgText(svg,X(d[0])+(dd[2]||0),Y(d[1])+(dd[3]||-10),dd[1],{a:dd[4]||'middle',s:12,w:'bold',f:GREEN});});
 return {X:X,Y:Y};
}
function kids(box){
 frame(box,'Fewer Babies, Then Fewer Students','The record birth year, 2007, graduated from high school in 2025. Every class behind it is smaller.');
 var nar=box.clientWidth<520,svg=el('svg',{viewBox:nar?'0 0 400 530':'0 0 720 260',role:'img','aria-label':'Line charts of U.S. births since 2007 and public school enrollment with federal projections to 2031'});box.appendChild(svg);
 panel(svg,10,nar?370:320,'U.S. births, millions',BIRTHS,3.4,4.4,function(v){return v.toFixed(1);},{y0:2006,y1:2026,ticks:[3.5,4.0],xt:[2007,2015,2025],gap:2007,dots:[[2007,'4.32M in 2007',4,-10,'start'],[2025,'3.61M',0,-12]]});
 var p=panel(svg,nar?10:390,nar?370:320,'Public school students, millions',ENROLL,45,52,function(v){return v.toFixed(0);},{dy:nar?270:0,y0:2011,y1:2032,ticks:[46,48,50],xt:[2012,2022,2031],proj:2022,dots:[[2019,'50.8M in 2019',0,-12],[2031,'46.9M',-2,18,'end']]});
 svgText(svg,p.X(2026.6),p.Y(48.6),'Projected',{a:'start',s:12,f:MUTED});
 src(box,'Sources: CDC National Center for Health Statistics (births; 2025 is provisional; 2008 and 2009 not shown); NCES <a href="https://nces.ed.gov/programs/digest/d23/tables/dt23_203.10.asp">Digest table 203.10</a> (enrollment, fall of each school year; 2023 onward projected, made before recent immigration changes).');
}

/* ---------- 4. state tile map ---------- */
function states(box){
 frame(box,'Where Public Schools Closed In The Last Two Years','Closures before the 2023-24 and 2024-25 school years per 1,000 schools. Hover or tap a state.');
 var data={};ST.split(';').forEach(function(r){var a=r.split(','),n=+a[1]+(+a[2]);data[a[0]]={n:n,open:+a[3],rate:n/(+a[3])*1000};});
 var bins=[[0,10,'#eef3f0'],[10,20,PALE],[20,30,LIGHT],[30,40,'#2f9a73'],[40,99,GREEN]];
 var key=document.createElement('div');key.className='sc-key';key.innerHTML=bins.map(function(b){return '<span><i style="background:'+b[2]+';border:1px solid '+RULE+'"></i>'+(b[1]==99?'40+':b[0]+'–'+b[1])+'</span>';}).join('');box.appendChild(key);
 var t=tip(box),S=56,G=4,W=12*(S+G),H=8*(S+G);
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Tile map of school closures per 1,000 schools by state'});box.appendChild(svg);
 var card=document.createElement('div');card.className='sc-card';card.innerHTML='<b>Minnesota</b> had the highest rate: 129 closures, or about 49 for every 1,000 schools.';box.appendChild(card);
 Object.keys(GRID).forEach(function(s){
  var d=data[s],c=GRID[s],x=c[0]*(S+G),y=c[1]*(S+G),fill=bins.filter(function(b){return d.rate>=b[0]&&d.rate<b[1];})[0][2],dark=d.rate>=30;
  var g=el('g',{class:'sc-hit'});svg.appendChild(g);
  g.appendChild(el('rect',{x:x,y:y,width:S,height:S,rx:5,fill:fill,stroke:'#fff'}));
  svgText(g,x+S/2,y+24,s,{a:'middle',s:15,w:'bold',f:dark?'#fff':INK,sans:true});
  svgText(g,x+S/2,y+42,String(Math.round(d.rate)),{a:'middle',s:12,f:dark?'#fff':MUTED,sans:true});
  var html='<b>'+NAMES[s]+'</b><br>'+fmt(d.n)+' closures, '+Math.round(d.rate)+' per 1,000 schools';
  g.addEventListener('mousemove',function(ev){t.show(html,ev);});g.addEventListener('mouseleave',t.hide);
  g.addEventListener('click',function(){card.innerHTML='<b>'+NAMES[s]+'</b>: '+fmt(d.n)+' schools closed before 2023-24 or 2024-25, about '+Math.round(d.rate)+' for every 1,000 open schools.';});
 });
 src(box,'Source: NCES Common Core of Data via the Urban Institute. Rate uses schools open in 2023-24. States report closures differently, including how they count charter, virtual and alternative programs, so small differences are not meaningful.');
}

function boot(){
 var m={'nid-sc-plans':function(b){plans(b,false);},'nid-sc-home':function(b){plans(b,true);},'nid-sc-years':years,'nid-sc-kids':kids,'nid-sc-states':states};
 Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});
}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,1500);
})();
