(function(){
  var SRC='https://stories.thenewsindata.com/coal/coal-data.json?v=1';
  var INK='#14211b',SUB='#5f6b66',LINE='#e6e3dd',CH='#c8642a',RW='#4fa27c',F='"Times New Roman",Times,serif';
  var BINS=[[-60,'#0b4a3a'],[-40,'#1f7a5c'],[-25,'#4fa27c'],[-10,'#97c9a6'],[-2,'#e9e1c8'],[999,'#d98a3d']];
  function col(p){if(p==null)return '#d9d9d9';for(var i=0;i<BINS.length;i++)if(p<=BINS[i][0])return BINS[i][1];return '#d98a3d';}
  function fmt(v){if(v===0)return '0';return v>=100?Math.round(v).toLocaleString('en-US'):v>=10?v.toFixed(1):v.toFixed(2);}
  function css(){if(document.getElementById('nid-co-css'))return;var s=document.createElement('style');s.id='nid-co-css';
    s.textContent='.nid-co{font-family:'+F+';color:'+INK+';margin:2.4em auto;max-width:860px}.nid-co h3{text-align:center;font-size:1.35em;margin:0 0 .2em}.nid-co .sub{text-align:center;color:'+SUB+';font-size:.95em;margin:0 0 .8em}'+
    '.nid-co svg{display:block;width:100%;height:auto}.nid-co .tip{position:absolute;pointer-events:none;background:#fff;border:1px solid #bdb8ad;border-radius:6px;padding:6px 9px;font-size:14px;line-height:1.35;box-shadow:0 2px 8px rgba(0,0,0,.12);display:none;z-index:5;max-width:240px}'+
    '.nid-co .wrap{position:relative}.nid-co .leg{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 14px;font-size:13px;margin:.6em 0}.nid-co .leg i{display:inline-block;width:14px;height:10px;margin-right:5px;vertical-align:middle}'+
    '.nid-co .panel{border:1px solid '+LINE+';border-radius:8px;padding:12px 14px;margin-top:.8em}.nid-co .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center;margin-bottom:.4em}'+
    '.nid-co input{font-family:'+F+';font-size:16px;padding:6px 10px;border:1px solid #bdb8ad;border-radius:6px;width:230px}.nid-co .chip{font-family:'+F+';font-size:14px;padding:4px 10px;border:1px solid #bdb8ad;border-radius:14px;background:#fff;cursor:pointer}.nid-co .chip:hover{background:#f3f1ec}'+
    '.nid-co .big{font-size:1.15em;text-align:center;margin:.2em 0 .1em}.nid-co .note{font-size:12px;color:'+SUB+';text-align:center;margin-top:.5em}.nid-co path.c{stroke:#fff;stroke-width:.4;cursor:pointer}.nid-co path.c:hover,.nid-co path.on{stroke:'+INK+';stroke-width:1.2}';
    document.head.appendChild(s);}
  function el(t,a,h){var e=document.createElement(t);for(var k in a)e.setAttribute(k,a[k]);if(h!=null)e.innerHTML=h;return e;}
  var NS='http://www.w3.org/2000/svg';function sv(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
  function tipAt(tip,wrap,ev,h){tip.innerHTML=h;tip.style.display='block';var r=wrap.getBoundingClientRect(),x=ev.clientX-r.left+14,y=ev.clientY-r.top+14;if(x+250>r.width)x=ev.clientX-r.left-250;tip.style.left=x+'px';tip.style.top=y+'px';}
  function desc(c){if(c.p==null)return '<b>'+c.n+'</b><br>No data';var p=c.p;return '<b>'+c.n+'</b><br>'+(p>-2?'At or near its peak in '+c.py:Math.round(-p)+'% below its '+c.py+' peak')+'<br><span style="color:'+SUB+'">'+fmt(c.v)+' million tonnes in 2024</span>';}

  function map(box,D){
    box.className='nid-co';box.innerHTML='<h3>How Far Below Its Peak Is Each Country?</h3><p class="sub">Fossil CO2 in 2024 vs. each country’s highest year since 1950. Hover or tap a country, or search below.</p>';
    var wrap=el('div',{class:'wrap'});box.appendChild(wrap);var tip=el('div',{class:'tip'});wrap.appendChild(tip);
    var s=sv('svg',{viewBox:'0 0 1000 '+D.h,role:'img','aria-label':'World map of how far each country’s CO2 emissions are below their peak'});wrap.appendChild(s);
    var by={},paths={};
    D.c.forEach(function(c){by[c.n]=c;var p=sv('path',{d:c.d,fill:col(c.p),class:'c'});paths[c.n]=p;s.appendChild(p);
      p.addEventListener('mousemove',function(ev){tipAt(tip,wrap,ev,desc(c));});p.addEventListener('mouseleave',function(){tip.style.display='none';});
      p.addEventListener('click',function(){show(c);});});
    var leg=el('div',{class:'leg'});[['60% or more','#0b4a3a'],['40\u201360%','#1f7a5c'],['25\u201340%','#4fa27c'],['10\u201325%','#97c9a6'],['2\u201310%','#e9e1c8'],['At or near peak','#d98a3d'],['No data','#d9d9d9']].forEach(function(b){leg.appendChild(el('span',{},'<i style="background:'+b[1]+'"></i>'+b[0]));});
    box.appendChild(leg);
    var pan=el('div',{class:'panel'});box.appendChild(pan);
    var row=el('div',{class:'row'});pan.appendChild(row);
    var dl=el('datalist',{id:'nid-co-list'});Object.keys(by).filter(function(k){return by[k].s;}).sort().forEach(function(k){dl.appendChild(el('option',{value:k}));});row.appendChild(dl);
    var inp=el('input',{list:'nid-co-list',placeholder:'Search a country','aria-label':'Search a country'});row.appendChild(inp);
    inp.addEventListener('change',function(){if(by[inp.value])show(by[inp.value]);});
    ['United States','China','India','United Kingdom','Germany','Japan'].forEach(function(n){var b=el('button',{class:'chip',type:'button'},n.replace('United States','U.S.').replace('United Kingdom','U.K.'));b.onclick=function(){show(by[n]);};row.appendChild(b);});
    var big=el('div',{class:'big'});pan.appendChild(big);var ch=el('div');pan.appendChild(ch);
    pan.appendChild(el('p',{class:'note'},'Million tonnes of fossil CO2 per year, 1950\u20132024. Source: Global Carbon Budget via Our World in Data.'));
    var cur=null;
    function show(c){if(!c||!c.s)return;if(cur)cur.classList.remove('on');cur=paths[c.n];cur.classList.add('on');
      big.innerHTML='<b>'+c.n+'</b>: '+(c.p>-2?'at or near its peak (highest year: '+c.py+')':'<b style="color:#1f7a5c">'+Math.round(-c.p)+'% below</b> its '+c.py+' peak of '+fmt(c.pk)+' million tonnes')+(c.i==='CHN'?'<br><span style="font-size:.85em;color:'+SUB+'">Monthly estimates show China\u2019s emissions flat or falling since March 2024, down 3.1% in July\u2013Sept. 2026 (CREA).</span>':'');
      line(ch,c);}
    show(by['China']);
  }
  function line(box,c){
    var W=760,H=260,L=56,R=16,T=14,B=30,s=c.s,mx=0;s.forEach(function(v){if(v!=null&&v>mx)mx=v;});
    var nice=[1,1.5,2,2.5,3,4,5,6,8,10],m=Math.pow(10,Math.floor(Math.log10(mx))),top=0;for(var i=0;i<nice.length;i++){if(nice[i]*m>=mx){top=nice[i]*m;break;}}
    var X=function(i){return L+i*(W-L-R)/74;},Y=function(v){return T+(H-T-B)*(1-v/top);};
    var g=sv('svg',{viewBox:'0 0 '+W+' '+H});box.innerHTML='';box.appendChild(g);
    for(var k=0;k<=4;k++){var v=top*k/4,y=Y(v);g.appendChild(sv('line',{x1:L,x2:W-R,y1:y,y2:y,stroke:LINE}));var t=sv('text',{x:L-6,y:y+4,'text-anchor':'end','font-size':12,fill:SUB,'font-family':F});t.textContent=fmt(v);g.appendChild(t);}
    [1950,1970,1990,2010,2024].forEach(function(yr){var t=sv('text',{x:X(yr-1950),y:H-8,'text-anchor':'middle','font-size':12,fill:SUB,'font-family':F});t.textContent=yr;g.appendChild(t);});
    var d='',a='';s.forEach(function(v,i){if(v==null)return;d+=(d?'L':'M')+X(i).toFixed(1)+','+Y(v).toFixed(1);});
    g.appendChild(sv('path',{d:d,fill:'none',stroke:c.p>-2?CH:'#1f7a5c','stroke-width':2.4}));
    var pi=c.py-1950;g.appendChild(sv('circle',{cx:X(pi),cy:Y(c.pk),r:4.5,fill:INK}));
    var t=sv('text',{x:Math.min(X(pi),W-90),y:Y(c.pk)-8,'text-anchor':'middle','font-size':12.5,fill:INK,'font-family':F});t.textContent='Peak '+c.py;g.appendChild(t);
    g.appendChild(sv('circle',{cx:X(74),cy:Y(c.v),r:4,fill:c.p>-2?CH:'#1f7a5c'}));
  }
  function coal(box,D){
    box.className='nid-co';box.innerHTML='<h3>China vs. Everyone Else: Coal Use, 1965\u20132025</h3><p class="sub">Hover or drag across the chart. Thousand terawatt-hours of coal consumed per year.</p>';
    var wrap=el('div',{class:'wrap'});box.appendChild(wrap);var tip=el('div',{class:'tip'});wrap.appendChild(tip);
    var W=800,H=380,L=46,R=14,T=12,B=30,w=D.coal.w,c=D.coal.ch,n=w.length,top=50;
    var X=function(i){return L+i*(W-L-R)/(n-1);},Y=function(v){return T+(H-T-B)*(1-v/1000/top);};
    var g=sv('svg',{viewBox:'0 0 '+W+' '+H});wrap.appendChild(g);
    for(var k=0;k<=5;k++){var y=Y(k*10000);g.appendChild(sv('line',{x1:L,x2:W-R,y1:y,y2:y,stroke:LINE}));var t=sv('text',{x:L-6,y:y+4,'text-anchor':'end','font-size':12,fill:SUB,'font-family':F});t.textContent=k*10;g.appendChild(t);}
    for(var yr=1970;yr<=2020;yr+=10){var t2=sv('text',{x:X(yr-1965),y:H-8,'text-anchor':'middle','font-size':12,fill:SUB,'font-family':F});t2.textContent=yr;g.appendChild(t2);}
    var r='M'+X(0)+','+Y(0),ch='';for(var i=0;i<n;i++)r+='L'+X(i).toFixed(1)+','+Y(w[i]-c[i]).toFixed(1);r+='L'+X(n-1)+','+Y(0)+'Z';
    ch='M'+X(0)+','+Y(w[0]-c[0]);for(i=0;i<n;i++)ch+='L'+X(i).toFixed(1)+','+Y(w[i]).toFixed(1);for(i=n-1;i>=0;i--)ch+='L'+X(i).toFixed(1)+','+Y(w[i]-c[i]).toFixed(1);ch+='Z';
    g.appendChild(sv('path',{d:r,fill:RW}));g.appendChild(sv('path',{d:ch,fill:CH}));
    var lb=function(x,y,s){var t=sv('text',{x:x,y:y,'font-size':17,'font-weight':'bold',fill:'#fff','font-family':F});t.textContent=s;g.appendChild(t);};lb(X(8),Y(6000),'Rest of the world');lb(X(45),Y(31000),'China');
    var vl=sv('line',{y1:T,y2:H-B,stroke:INK,'stroke-width':1,opacity:0});g.appendChild(vl);
    function mv(ev){var p=ev.touches?ev.touches[0]:ev,rc=g.getBoundingClientRect(),x=(p.clientX-rc.left)*W/rc.width,i=Math.round((x-L)/(W-L-R)*(n-1));i=Math.max(0,Math.min(n-1,i));
      vl.setAttribute('x1',X(i));vl.setAttribute('x2',X(i));vl.setAttribute('opacity',1);
      var ro=w[i]-c[i];tipAt(tip,wrap,p,'<b>'+(1965+i)+'</b><br><span style="color:'+CH+'">China: '+c[i].toLocaleString('en-US')+' TWh</span><br><span style="color:#2f7d58">Rest of world: '+ro.toLocaleString('en-US')+' TWh</span><br>China’s share: '+Math.round(c[i]/w[i]*100)+'%');}
    g.addEventListener('mousemove',mv);g.addEventListener('touchmove',mv,{passive:true});g.addEventListener('mouseleave',function(){tip.style.display='none';vl.setAttribute('opacity',0);});
    box.appendChild(el('p',{class:'note'},'Source: Energy Institute Statistical Review of World Energy 2026 via Our World in Data.'));
  }
  function go(){css();fetch(SRC).then(function(r){return r.json();}).then(function(D){var a=document.getElementById('nid-co-map'),b=document.getElementById('nid-co-coal');if(a)map(a,D);if(b)coal(b,D);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
