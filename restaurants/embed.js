/* The News in Data: Forbes "America's Favorite Restaurants 2027" (Nov. 17, 2026).
   Mounts: #nid-fr-big (biggest chains vs. favorites), #nid-fr-grid (the 100, explorable),
   #nid-fr-why (what diners rated highest), #nid-fr-home (compact). */
(function(){
if(window.__nidFr)return;window.__nidFr=1;
var GREEN='#007a55',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#b9c6bf',RUST='#b5462f';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
var CATS={B:['Burgers & chicken','#0b6e4f'],C:['American & Italian sit-down','#3f6fb5'],K:['Steakhouses','#8a3b2e'],F:['Seafood','#2a8fa8'],P:['Pizza','#d9822b'],S:['Sandwiches & delis','#c9a227'],X:['Mexican','#c4573a'],W:['Breakfast & cafés','#b06aa0'],Q:['Barbecue','#6b4a3a'],D:['Coffee, tea & smoothies','#5a9e6f'],T:['Sweets & snacks','#e07aa0'],A:['Bowls & Asian','#7a6fc2']};
var ORDER=['B','P','S','X','A','Q','D','T','W','C','K','F'];
var RAW='Culver’s|B|0|Prairie Du Sac, Wisconsin|Taste, Quality|1984~In-N-Out Burger|B|0|Irvine, California|Value, Price|1948~HTeaO|D|0|Fort Worth, Texas|Taste, Value|2009~Texas Roadhouse|K|1|Louisville, Kentucky|Value, Menu|1993~Chick-fil-A|B|0|Atlanta, Georgia|Speed, Taste|1946~Mission BBQ|Q|0|Glen Burnie, Maryland|Quality, Atmosphere|2011~Jersey Mike’s Subs|S|0|Tinton Falls, New Jersey|Quality, Taste|1956~Jason’s Deli|S|0|Beaumont, Texas|Menu, Speed|1976~Seasons52|C|1|Orlando, Florida|Atmosphere, Quality|2003~The Original Pancake House|W|1|Portland, Oregon|Menu, Quality|1953~First Watch Restaurants|W|1|Bradenton, Florida|Atmosphere, Quality|1983~Cava Grill|A|0|Washington, District of Columbia|Quality, Speed|2011~LongHorn Steakhouse|K|1|Orlando, Florida|Quality, Atmosphere|1981~Blaze Pizza|P|0|Pasadena, California|Speed, Quality|2011~Texas de Brazil Churrascaria Steakhouse|K|1|Dallas, Texas|Atmosphere, Quality|1998~7 Brew Drive Thru Coffee|D|0|Springdale, Arkansas|Menu, Speed|2017~Firehouse Subs|S|0|Toronto, Ontario|Taste, Quality|1994~Maggiano’s|C|1|Coppell, Texas|Atmosphere, Menu|1991~Cheddar’s Scratch Kitchen|C|1|Orlando, Florida|Menu, Value|1979~Potbelly|S|0|Chicago, Illinois|Quality, Taste|1977~Braum’s|B|0|Oklahoma City, Oklahoma|Value, Price|1968~Philly Pretzel Factory|T|0|Bensalem, Pennsylvania|Value, Speed|1998~MOD Pizza|P|0|Bellevue, Washington|Speed, Quality|2008~Chuy’s|X|1|Austin, Texas|Speed, Value|1982~Cooper’s Hawk Winery & Restaurants|C|1|Downers Grove, Illinois|Atmosphere, Menu|2005~Bubba’s 33|C|1|Louisville, Kentucky|Menu, Atmosphere|2013~Carrabba’s Italian Grill|C|1|Tampa, Florida|Menu, Atmosphere|1986~Papa Murphy’s Take ’N’ Bake Pizza|P|0|Salinas, California|Speed, Value, Price|1995~Torchy’s Tacos|X|0|Austin, Texas|Taste, Menu|2006~Capital Grille|K|1|Orlando, Florida|Quality, Atmosphere|1990~Mellow Mushroom|P|1|Atlanta, Georgia|Taste, Menu|1974~Roosters|B|1|Dublin, Ohio|Value, Price|1988~Pappadeaux Seafood Kitchen|F|1|Houston, Texas|Menu, Atmosphere|1986~Din Tai Fung|A|1|Taipei|Taste, Quality, Atmosphere|1958~Einstein Bros. Bagels|W|0|Denver, Colorado|Quality, Taste|1995~Firebirds Wood Fired Grill|C|1|Charlotte, North Carolina|Atmosphere, Menu|2000~Marco’s Pizza|P|0|Toledo, Ohio|Value, Speed|1978~Rita’s Ice|T|0|Trevose, Pennsylvania|Taste, Speed|1984~Dutch Bros. Coffee|D|0|Tempe, Arizona|Menu, Quality|1992~Perry’s Steakhouse & Grille|K|1|Houston, Texas|Atmosphere, Quality|1993~McAlister’s Deli|S|0|Atlanta, Georgia|Menu, Atmosphere|1989~Bonefish Grill|F|1|Tampa, Florida|Atmosphere, Quality|2000~Yard House|C|1|Orlando, Florida|Menu, Atmosphere|1996~Jimmy John’s|S|0|Champaign, Illinois|Speed, Quality|1983~Chili’s|C|1|Dallas, Texas|Value, Price|1975~Tropical Smoothie Cafe|D|0|Atlanta, Georgia|Taste, Quality, Speed|1997~Fogo de Chao|K|1|Dallas, Texas|Atmosphere, Quality|1979~Schlotzsky’s|S|0|Atlanta, Georgia|Taste, Quality|1971~Jet’s Pizza|P|0|Sterling Heights, Michigan|Taste, Speed|1978~Raising Cane’s Chicken Fingers|B|0|Baton Rouge, Louisiana|Speed, Taste|1996~Skyline Chili|B|0|Cincinnati, Ohio|Speed, Taste|1949~Cracker Barrel Old Country Store|C|1|Lebanon, Tennessee|Menu, Price, Value|1969~Qdoba Mexican Eats|X|0|San Diego, California|Speed, Price|1995~Cold Stone Creamery|T|0|Scottsdale, Arizona|Taste, Quality, Menu|1988~Ruth’s Chris Steak House|K|1|Orlando, Florida|Atmosphere, Quality|1965~Smoothie King|D|0|Dallas, Texas|Taste, Speed|1973~Another Broken Egg Cafe|W|1|Orlando, Florida|Menu, Atmosphere|1996~Grand Lux Cafe|C|1|Calabasas Hills, California|Menu, Atmosphere|1999~Morton’s The Steakhouse|K|1|Houston, Texas|Quality, Atmosphere|1978~Swig|D|0|Lehi, Utah|Menu, Speed|2010~Freddy’s Frozen Custard & Steakburgers|B|0|Wichita, Kansas|Taste, Speed|2002~Eddie V’s|F|1|Orlando, Florida|Quality, Atmosphere, Taste|2000~Saltgrass Steak House|K|1|Houston, Texas|Atmosphere, Menu|1991~Baskin Robbins|T|0|Atlanta, Georgia|Taste, Speed|1945~J. Alexander’s|C|1|Nashville, Tennessee|Atmosphere, Quality|1991~LaRosa’s Pizzeria|P|1|Cincinnati, Ohio|Value, Price|1954~Hungry Howie’s Pizza|P|0|Madison Heights, Michigan|Price, Value|1973~Olive Garden|C|1|Orlando, Florida|Atmosphere, Value|1969~Portillo’s Restaurants|S|0|Oak Brook, Illinois|Taste, Quality|1963~City Barbeque|Q|0|Dublin, Ohio|Speed, Taste|1999~Fleming’s|K|1|Tampa, Florida|Atmosphere, Quality|1998~Krispy Kreme Doughnuts|T|0|Charlotte, North Carolina|Taste, Speed|1937~Fuzzy’s Taco Shop|X|0|Pasadena, California|Speed, Price|2003~Panda Express|A|0|Rosemead, California|Speed, Value|1983~Menchie’s Frozen Yogurt|T|0|Woodland Hills, California|Taste, Speed|2007~Paris Baguette|W|0|Seoul|Atmosphere, Taste|1988~Sonny’s BBQ|Q|0|Winter Park, Florida|Value, Speed|1968~Red Robin Gourmet Burgers|B|1|Englewood, Colorado|Menu, Value|1969~Scooter’s Coffee|D|0|Omaha, Nebraska|Speed, Quality|1998~Yogurtland|T|0|Farmers Branch, Texas|Taste, Speed|2006~Pappasito’s Cantina|X|1|Houston, Texas|Quality, Menu|1983~Anthony’s Coal Fired Pizza|P|1|Fort Lauderdale, Florida|Quality, Taste|2002~Waffle House|W|1|Norcross, Georgia|Price, Speed, Value|1955~Tim Hortons|D|0|Toronto, Ontario|Value, Price|1964~McCormick & Schmick’s|F|1|Houston, Texas|Atmosphere, Quality|1974~Sweetgreen|A|0|Los Angeles, California|Quality, Atmosphere|2007~BJ’s Restaurants|C|1|Huntington Beach, California|Menu, Atmosphere|1978~Chipotle Mexican Grill|X|0|Newport Beach, California|Speed, Taste|1993~Jamba Juice|D|0|Emeryville, California|Taste, Quality|1990~Gyu-Kaku Japanese BBQ|A|1|Torrance, California|Quality, Menu|1996~Cafe Rio Mexican Grill|X|0|Salt Lake City, Utah|Value, Speed|1997~Cinnabon|T|0|Atlanta, Georgia|Taste, Speed|1985~Penn Station East Coast Subs|S|0|Milford, Ohio|Taste, Quality|1985~Pollo Tropical|B|0|Miami, Florida|Price, Value|1988~Auntie Anne’s|T|0|Atlanta, Georgia|Taste, Speed|1988~Moe’s Southwest Grill|X|0|Atlanta, Georgia|Speed, Value|2000~la Madeleine Country French Cafe|W|0|Dallas, Texas|Atmosphere, Quality|1983~The Cheesecake Factory|C|1|Calabasas Hills, California|Menu, Atmosphere|1972~Village Inn|W|1|Nashville, Tennessee|Value, Price|1958~Dairy Queen / Orange Julius|B|0|Burlington, Ontario|Taste, Speed|1940';
var R=RAW.split('~').map(function(l,i){var a=l.split('|');return {rank:i+1,name:a[0],cat:a[1],sit:a[2]=='1',loc:a[3],praise:a[4],yr:a[5]};});
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}
function svgText(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.sans?SANS:SERIF,'font-weight':o.w||'normal'},txt);if(o.op!=null)t.setAttribute('opacity',o.op);g.appendChild(t);return t;}
function css(){
 if(document.getElementById('nid-fr-css'))return;var s=document.createElement('style');s.id='nid-fr-css';
 s.textContent='.nid-fr{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2em auto;position:relative}'+
 '.nid-fr .fr-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '.nid-fr .fr-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .9em;line-height:1.35}'+
 '.nid-fr svg{width:100%;height:auto;display:block;overflow:visible}'+
 '.nid-fr .fr-chips{display:flex;flex-wrap:wrap;gap:.35em;justify-content:center;margin:0 0 .8em;font-family:'+SANS+';font-size:12px}'+
 '.nid-fr .fr-chips button{border:1px solid '+RULE+';background:#fff;border-radius:999px;padding:.35em .8em;font:inherit;color:'+INK+';cursor:pointer;display:inline-flex;align-items:center;gap:.4em}'+
 '.nid-fr .fr-chips button i{width:9px;height:9px;border-radius:50%;display:inline-block}'+
 '.nid-fr .fr-chips button.on{background:'+INK+';color:#fff;border-color:'+INK+'}'+
 '.nid-fr input.fr-find{display:block;margin:0 auto .8em;border:1px solid '+RULE+';border-radius:999px;padding:.5em 1em;font:14px '+SANS+';width:min(320px,90%)}'+
 '.nid-fr .fr-card{background:#fff;border:1px solid '+RULE+';border-radius:10px;padding:.8em 1em;margin:.8em 0 0;font-size:.98em;line-height:1.45;min-height:3.2em}'+
 '.nid-fr .fr-src{font-size:.78em;color:'+MUTED+';margin:.8em 0 0;line-height:1.4}'+
 '.nid-fr .fr-tip{position:absolute;pointer-events:none;background:#fff;border:1px solid '+RULE+';border-radius:8px;padding:.4em .65em;font-size:.86em;line-height:1.35;box-shadow:0 2px 8px rgba(0,0,0,.08);display:none;z-index:5;max-width:230px}'+
 '.nid-fr circle.fr-dot{transition:opacity .3s ease,transform .5s cubic-bezier(.2,.9,.3,1.2)}';
 document.head.appendChild(s);
}
function frame(box,title,dek){css();box.innerHTML='';box.classList.add('nid-fr');var h=document.createElement('p');h.className='fr-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);if(dek){var d=document.createElement('p');d.className='fr-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}}
function src(box,html){var p=document.createElement('p');p.className='fr-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function tipper(box){var t=document.createElement('div');t.className='fr-tip';box.appendChild(t);return {show:function(h,ev){t.innerHTML=h;t.style.display='block';var r=box.getBoundingClientRect(),x=ev.clientX-r.left+12,y=ev.clientY-r.top+12;if(x+240>r.width)x=ev.clientX-r.left-242;t.style.left=Math.max(0,x)+'px';t.style.top=y+'px';},hide:function(){t.style.display='none';}};}
function seen(node,fn){if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){fn();io.disconnect();}},{threshold:.25});io.observe(node);}else fn();}

/* ---------- 1. biggest vs favorite ---------- */
var BIG=[['McDonald’s',0],['Starbucks',0],['Chick-fil-A',5],['Taco Bell',0],['Dunkin’',0],['Wendy’s',0],['Chipotle',88],['Burger King',0],['Domino’s',0],['Subway',0]];
function big(box,compact){
 frame(box,'Only 2 Of America’s 10 Biggest Restaurant Chains Made The List Of Its 100 Favorites',compact?null:'Left: the 10 chains Americans spent the most at in 2025. Right: where each landed on Forbes’ first ranking of favorite restaurants, from a survey of 100,000+ diners.');
 var nar=box.clientWidth<520,W=nar?400:760,H=compact?440:470,XL=nar?150:210,XR=nar?280:520,T=40,B=H-60,Y1=function(i){return T+12+i*(B-T-12)/9;},Y2=function(r){return T+12+(r-1)*(B-T-12)/99;};
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Slope chart: of the 10 biggest U.S. restaurant chains by sales, only Chick-fil-A (No. 5) and Chipotle (No. 88) appear on Forbes’ list of America’s 100 favorite restaurants'});box.appendChild(svg);
 svgText(svg,XL,20,'Biggest by sales',{a:'end',s:15,w:'bold'});svgText(svg,XR,20,'Forbes favorites',{s:15,w:'bold'});
 svg.appendChild(el('line',{x1:XR,x2:XR,y1:T,y2:B,stroke:RULE,'stroke-width':6,'stroke-linecap':'round'}));
 [1,25,50,75,100].forEach(function(r){svgText(svg,XR-12,Y2(r)+4,'No. '+r,{a:'end',s:10,f:MUTED,sans:true});});
 // top 5 favorites labels
 if(!nar)R.slice(0,5).forEach(function(d,i){svgText(svg,XR+14,T+12+i*17,(i+1)+'. '+d.name,{s:12,f:d.rank==5?INK:MUTED,w:d.rank==5?'bold':'normal',sans:true});});
 var lines=[];
 BIG.forEach(function(b,i){var y=Y1(i),on=b[1]>0,g=el('g',{});svg.appendChild(g);
  svgText(g,XL-14,y+5,(i+1)+'. '+b[0],{a:'end',s:15,w:on?'bold':'normal',f:on?INK:MUTED});
  g.appendChild(el('circle',{cx:XL,cy:y,r:5,fill:on?GREEN:GRAY}));
  if(on){var p=el('path',{d:'M'+XL+','+y+' C'+(XL+(XR-XL)*.45)+','+y+' '+(XR-(XR-XL)*.45)+','+Y2(b[1])+' '+XR+','+Y2(b[1]),fill:'none',stroke:GREEN,'stroke-width':3});g.appendChild(p);lines.push(p);
   g.appendChild(el('circle',{cx:XR,cy:Y2(b[1]),r:7,fill:GREEN}));
   if(b[1]>20||nar)svgText(g,XR+14,Y2(b[1])+5,b[1]+'. '+b[0],{s:14,w:'bold',f:GREEN,sans:true});}
  else{var x=el('path',{d:'M'+(XL+12)+','+(y-5)+' l10,10 M'+(XL+22)+','+(y-5)+' l-10,10',stroke:GRAY,'stroke-width':2});g.appendChild(x);}
 });
 svgText(svg,XL,B+40,'\u00d7  not in the top 100',{a:'middle',s:12,f:MUTED,sans:true});
 lines.forEach(function(p){var L=p.getTotalLength?p.getTotalLength():400;p.style.strokeDasharray=L;p.style.strokeDashoffset=L;});
 seen(svg,function(){lines.forEach(function(p,i){p.style.transition='stroke-dashoffset 1.1s ease '+(i*400)+'ms';p.style.strokeDashoffset=0;});});
 if(!compact)src(box,'Sources: Forbes, America’s Favorite Restaurants 2027, from a HundredX survey of more than 100,000 customers, October 2025 to September 2026; Circana, 2026 Definitive U.S. Restaurant Ranking (2025 consumer spending).');
}

/* ---------- 2. the 100 ---------- */
var SHORT={"Jersey Mike's Subs":"Jersey Mike's","The Original Pancake House":"Orig. Pancake","First Watch Restaurants":"First Watch","LongHorn Steakhouse":"LongHorn","Texas de Brazil Churrascaria Steakhouse":"Texas de Brazil","7 Brew Drive Thru Coffee":"7 Brew","Cheddar's Scratch Kitchen":"Cheddar's","Philly Pretzel Factory":"Philly Pretzel","Cooper's Hawk Winery & Restaurants":"Cooper's Hawk","Carrabba's Italian Grill":"Carrabba's","Papa Murphy's Take 'N' Bake Pizza":"Papa Murphy's","Torchy's Tacos":"Torchy's","Mellow Mushroom":"Mellow Mush.","Pappadeaux Seafood Kitchen":"Pappadeaux","Einstein Bros. Bagels":"Einstein Bros.","Firebirds Wood Fired Grill":"Firebirds","Perry's Steakhouse & Grille":"Perry's","Dutch Bros. Coffee":"Dutch Bros.","Tropical Smoothie Cafe":"Trop. Smoothie","Raising Cane's Chicken Fingers":"Raising Cane's","Cracker Barrel Old Country Store":"Cracker Barrel","Qdoba Mexican Eats":"Qdoba","Cold Stone Creamery":"Cold Stone","Ruth's Chris Steak House":"Ruth's Chris","Another Broken Egg Cafe":"Broken Egg","Grand Lux Cafe":"Grand Lux","Morton's The Steakhouse":"Morton's","Freddy's Frozen Custard & Steakburgers":"Freddy's","Saltgrass Steak House":"Saltgrass","LaRosa's Pizzeria":"LaRosa's","Hungry Howie's Pizza":"Hungry Howie's","Portillo's Restaurants":"Portillo's","Krispy Kreme Doughnuts":"Krispy Kreme","Fuzzy's Taco Shop":"Fuzzy's","Menchie's Frozen Yogurt":"Menchie's","Red Robin Gourmet Burgers":"Red Robin","Scooter's Coffee":"Scooter's","Pappasito's Cantina":"Pappasito's","Anthony's Coal Fired Pizza":"Anthony's","McCormick & Schmick's":"McCormick's","BJ's Restaurants":"BJ's","Chipotle Mexican Grill":"Chipotle","Gyu-Kaku Japanese BBQ":"Gyu-Kaku","Cafe Rio Mexican Grill":"Cafe Rio","Penn Station East Coast Subs":"Penn Station","Moe's Southwest Grill":"Moe's","la Madeleine Country French Cafe":"la Madeleine","The Cheesecake Factory":"Cheesecake Fac.","Dairy Queen / Orange Julius":"Dairy Queen","City Barbeque":"City BBQ","Tim Hortons":"Tim Hortons","Baskin Robbins":"Baskin-Robbins"};
function shortName(n){n=n.trim();return SHORT[n]||(n.length>14?n.slice(0,13)+'\u2026':n);}
function grid(box){
 frame(box,'America’s 100 Favorite Restaurants','One dot per chain, ranked left to right and top to bottom. Tap a category or a dot, or search.');
 var sel=null,t=tipper(box);
 var chips=document.createElement('div');chips.className='fr-chips';box.appendChild(chips);
 var all=document.createElement('button');all.type='button';all.textContent='All 100';all.className='on';chips.appendChild(all);
 var btns=[all];
 ORDER.forEach(function(k){var n=R.filter(function(d){return d.cat==k;}).length,b=document.createElement('button');b.type='button';b.innerHTML='<i style="background:'+CATS[k][1]+'"></i>'+CATS[k][0]+' '+n;b.onclick=function(){sel=sel===k?null:k;btns.forEach(function(x){x.className='';});(sel?b:all).className='on';paint();};chips.appendChild(b);btns.push(b);});
 all.onclick=function(){sel=null;btns.forEach(function(x){x.className='';});all.className='on';paint();};
 var inp=document.createElement('input');inp.className='fr-find';inp.placeholder='Find a restaurant';box.appendChild(inp);
 var nar=box.clientWidth<520,W=nar?400:760,COLS=nar?5:10,CW=W/COLS,RH=nar?62:58,H=Math.ceil(100/COLS)*RH+10;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Grid of 100 dots, one per restaurant chain, colored by category'});box.appendChild(svg);
 var card=document.createElement('div');card.className='fr-card';card.innerHTML='<b>No. 1: Culver’s</b>, the Wisconsin ButterBurger and frozen custard chain. Customers rated it highest for taste and quality.';box.appendChild(card);
 var nodes=[];
 R.forEach(function(d,i){var cx=CW*(i%COLS)+CW/2,cy=Math.floor(i/COLS)*RH+28,g=el('g',{style:'cursor:pointer'});svg.appendChild(g);
  var c=el('circle',{cx:cx,cy:cy,r:15,fill:CATS[d.cat][1],class:'fr-dot'});c.style.transformOrigin=cx+'px '+cy+'px';c.style.transform='scale(0)';c.style.transitionDelay=(i*12)+'ms';g.appendChild(c);
  var n=svgText(g,cx,cy+4.5,String(d.rank),{a:'middle',s:12,f:'#fff',w:'bold',sans:true});n.style.pointerEvents='none';
  var lab=svgText(g,cx,cy+28,shortName(d.name),{a:'middle',s:9.5,f:MUTED,sans:true});lab.style.pointerEvents='none';
  var html='<b>'+d.rank+'. '+d.name+'</b><br>'+CATS[d.cat][0]+' · '+(d.sit?'sit-down':'counter or drive-thru')+'<br>Rated highest for: '+d.praise.toLowerCase();
  g.addEventListener('mousemove',function(ev){t.show(html,ev);});g.addEventListener('mouseleave',t.hide);
  g.addEventListener('click',function(){card.innerHTML='<b>No. '+d.rank+': '+d.name+'</b> · '+CATS[d.cat][0]+'. Headquarters: '+d.loc+(d.yr?'; founded '+d.yr:'')+'. Customers rated it highest for '+d.praise.toLowerCase()+'.';});
  nodes.push({d:d,c:c,n:n,lab:lab});
 });
 function paint(q){q=(q||'').toLowerCase();nodes.forEach(function(o){var on=(!sel||o.d.cat===sel)&&(!q||o.d.name.toLowerCase().indexOf(q)>=0);o.c.style.opacity=on?1:.12;o.n.setAttribute('opacity',on?1:.25);o.lab.setAttribute('opacity',on?1:.25);});
  if(sel&&!q){var L=R.filter(function(d){return d.cat==sel;});card.innerHTML='<b>'+CATS[sel][0]+'</b>: '+L.length+' chains, led by '+L[0].name+' at No. '+L[0].rank+'.';}}
 inp.oninput=function(){paint(inp.value.trim());var q=inp.value.trim().toLowerCase();if(q.length>1){var m=R.filter(function(d){return d.name.toLowerCase().indexOf(q)>=0;});card.innerHTML=m.length?m.slice(0,3).map(function(d){return '<b>No. '+d.rank+': '+d.name+'</b> ('+d.loc+'), rated highest for '+d.praise.toLowerCase();}).join('<br>'):'Not on the list.';}};
 seen(svg,function(){nodes.forEach(function(o){o.c.style.transform='scale(1)';});});
 src(box,'Source: Forbes, America’s Favorite Restaurants 2027. Categories and sit-down labels are The News in Data’s. “Rated highest for” lists the two areas Forbes reports each chain scored best in.');
}

/* ---------- 3. what diners rated highest ---------- */
function why(box){
 frame(box,'Fast Food Wins On Taste, Sit-Down Wins On Atmosphere','The area each chain on the list scored highest in, by type of restaurant.');
 var F={Taste:21,Speed:14,Value:7,Quality:6,Menu:5,Price:2,Atmosphere:2},S={Atmosphere:15,Menu:12,Quality:7,Value:5,Taste:2,Speed:1,Price:1};
 var K=['Taste','Speed','Value','Quality','Menu','Atmosphere','Price'];
 var W=760,L=150,M=W/2+40,ROW=36,H=K.length*ROW+50,half=(W-L)/2-30,sc=half/22;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Paired bars: among 57 counter-service chains, taste was most often the top-rated area (21); among 43 sit-down chains, atmosphere was (15)'});box.appendChild(svg);
 var x1=L,x2=L+half+40;
 svgText(svg,x1,20,'Counter service and drive-thru (57)',{s:14,w:'bold'});svgText(svg,x2,20,'Sit-down (43)',{s:14,w:'bold'});
 K.forEach(function(k,i){var y=36+i*ROW;svgText(svg,L-12,y+ROW/2+2,k,{a:'end',s:14});
  [[x1,F[k],GREEN],[x2,S[k],'#3f6fb5']].forEach(function(c,j){var w=c[1]*sc,r=el('rect',{x:c[0],y:y+7,width:0,height:ROW-14,rx:3,fill:c[2],opacity:(j?S:F)[k]==Math.max.apply(null,Object.values(j?S:F))?1:.45});svg.appendChild(r);
   seen(svg,function(){r.style.transition='width .8s ease '+(i*80)+'ms';r.setAttribute('width',w);});
   svgText(svg,c[0]+w+6,y+ROW/2+2,String(c[1]),{s:13,w:'bold',f:c[2],sans:true});});
 });
 src(box,'Source: Forbes, America’s Favorite Restaurants 2027 (first-listed area for each chain). Restaurant type is The News in Data’s classification.');
}

function boot(){var m={'nid-fr-big':function(b){big(b,false);},'nid-fr-home':function(b){big(b,true);},'nid-fr-grid':grid,'nid-fr-why':why};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',boot);else boot();setTimeout(boot,1500);
})();
