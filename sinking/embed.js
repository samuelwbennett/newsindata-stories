/* Sinking cities (Nov. 2026). Mounts: #nid-sk-globe, #nid-sk-drop, #nid-sk-find.
   Data: Wang et al., Nature Cities 2026 (github.com/LandSinking/GlobalUrbanSubsidence). */
(function(){
  var BASE='https://stories.thenewsindata.com/sinking/';
  var V='?v=1';
  var INK='#14211b',SUB='#5f6b66',LINE='#e6e3dd',GRID='#efeee9',LAND='#d9dbd6',OCEAN='#f4f5f2',
      GREEN='#1f7a5c',SEA='#2a6fb0',SOIL='#ece4d6',SOILEDGE='#9c8566',F='"Times New Roman",Times,serif';
  var SEA_RATE=4.5, START=2014, END=2023;
  var RAMP=['#f6d46b','#f09a3e','#d8492b','#8c1d1d'];
  function heat(v){ // 1..33 mm/yr, linear across four stops
    var t=Math.max(0,Math.min(1,(v-1)/32))*3,i=Math.min(2,Math.floor(t)),f=t-i;
    var a=hex(RAMP[i]),b=hex(RAMP[i+1]);
    return 'rgb('+[0,1,2].map(function(k){return Math.round(a[k]+(b[k]-a[k])*f);}).join(',')+')';}
  function hex(h){return [1,3,5].map(function(i){return parseInt(h.substr(i,2),16);});}
  function rgba(rgb,a){return rgb.replace('rgb(','rgba(').replace(')',','+a+')');}
  var COUNTRY_SHORT={'United States':'U.S.','United Kingdom':'U.K.'};
  function place(r){return r[0]+', '+(COUNTRY_SHORT[r[1]]||r[1]);}
  function inch(mm){return (mm/25.4).toFixed(1);}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  function css(){if(document.getElementById('nid-sk-css'))return;var s=document.createElement('style');s.id='nid-sk-css';
    s.textContent=
    '.nid-sk{font-family:'+F+';color:'+INK+';margin:2.4em auto;max-width:860px}'+
    '.nid-sk h3{text-align:center;font-size:1.35em;line-height:1.2;margin:0 0 .2em;text-wrap:balance}'+
    '.nid-sk .sub{text-align:center;color:'+SUB+';font-size:.95em;margin:0 0 .9em;text-wrap:balance}'+
    '.nid-sk .gw{position:relative;width:min(560px,100%);aspect-ratio:1/1;margin:0 auto;touch-action:none;cursor:grab;-webkit-user-select:none;user-select:none}'+
    '.nid-sk .gw:active{cursor:grabbing}.nid-sk canvas{position:absolute;inset:0;width:100%;height:100%}'+
    '.nid-sk .hint{position:absolute;left:50%;bottom:7%;transform:translateX(-50%);background:'+INK+';color:#fff;font-size:15px;font-weight:bold;padding:7px 14px 7px 12px;border-radius:20px;white-space:nowrap;pointer-events:none;display:flex;align-items:center;gap:8px;box-shadow:0 2px 10px rgba(0,0,0,.18);animation:nidskp 2.2s ease-in-out infinite;transition:opacity .4s}'+
    '.nid-sk .hint.off{opacity:0;animation:none}'+
    '@keyframes nidskp{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.05)}}'+
    '.nid-sk .gtip{position:absolute;z-index:3;background:#fff;border:1px solid #bdb8ad;border-radius:6px;padding:6px 9px;font-size:14px;line-height:1.35;box-shadow:0 2px 8px rgba(0,0,0,.12);pointer-events:none;white-space:nowrap;transform:translate(-50%,calc(-100% - 12px))}'+
    '.nid-sk .leg{width:min(380px,100%);margin:.6em auto 0}.nid-sk .leg .cap{font-size:11px;font-weight:bold;letter-spacing:.06em;text-align:center;margin-bottom:3px}'+
    '.nid-sk .leg .bar{height:11px;border:1.5px solid '+INK+';background:linear-gradient(90deg,'+RAMP.join(',')+')}'+
    '.nid-sk .leg .tk{position:relative;height:16px}.nid-sk .leg .tk span{position:absolute;transform:translateX(-50%);font-size:12px;font-weight:bold}'+
    '.nid-sk .note{font-size:13px;color:'+SUB+';text-align:center;margin-top:.4em}'+
    '.nid-sk .ctl{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:center;margin:0 0 .6em}'+
    '.nid-sk .ctl b{font-variant-numeric:tabular-nums;font-size:1.15em;min-width:2.4em}'+
    '.nid-sk input[type=range]{width:min(280px,55vw);accent-color:'+GREEN+'}'+
    '.nid-sk button.play{font-family:'+F+';font-size:15px;font-weight:bold;background:'+GREEN+';color:#fff;border:0;border-radius:16px;padding:6px 14px;cursor:pointer}'+
    '.nid-sk .scr{overflow-x:auto;-webkit-overflow-scrolling:touch}.nid-sk .scr svg{display:block;min-width:620px;width:100%;height:auto}'+
    '.nid-sk .swipe{display:none;font-size:12px;color:'+SUB+';text-align:center;margin-top:.3em}@media (max-width:640px){.nid-sk .swipe{display:block}}'+
    '.nid-sk .panel{border:1px solid '+LINE+';border-radius:8px;padding:14px}'+
    '.nid-sk .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center;margin-bottom:.5em}'+
    '.nid-sk input.q{font-family:'+F+';font-size:16px;padding:6px 10px;border:1px solid #bdb8ad;border-radius:6px;width:min(260px,100%)}'+
    '.nid-sk .chip{font-family:'+F+';font-size:14px;padding:4px 10px;border:1px solid #bdb8ad;border-radius:14px;background:#fff;color:'+INK+';cursor:pointer}.nid-sk .chip:hover{background:#f3f1ec}'+
    '.nid-sk .card{display:grid;grid-template-columns:1.25fr 1fr;gap:12px 22px;align-items:center;margin:.6em 0 .4em}'+
    '.nid-sk .card .big{font-size:1.3em;font-weight:bold;line-height:1.2;text-wrap:balance}.nid-sk .card p{margin:.35em 0 0;font-size:.98em}'+
    '.nid-sk .stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px}.nid-sk .stat b{display:block;font-size:1.4em;line-height:1.1;font-variant-numeric:tabular-nums}.nid-sk .stat span{display:block;font-size:12.5px;color:'+SUB+';line-height:1.25}'+
    '@media (max-width:600px){.nid-sk .card{grid-template-columns:1fr}}'+
    '.nid-sk .strip{position:relative;height:150px}.nid-sk .strip .lab{position:absolute;font-size:12.5px;font-weight:bold;transform:translateX(-50%);white-space:nowrap;background:rgba(255,255,255,.85);padding:0 3px}'+
    '.nid-sk .xa{position:relative;height:34px;border-top:2.5px solid '+INK+'}.nid-sk .xa .t{position:absolute;top:4px;font-size:12px;font-weight:bold;transform:translateX(-50%)}.nid-sk .xa .c{position:absolute;left:0;right:0;top:20px;text-align:center;font-size:11px;font-weight:bold;letter-spacing:.06em}'+
    '@media (prefers-reduced-motion:reduce){.nid-sk .hint{animation:none}}';
    document.head.appendChild(s);}

  function load(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
  function getJSON(u){return fetch(u).then(function(r){return r.json();});}
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STATE={rows:null,select:null,focus:null};

  /* ---------- globe ---------- */
  function globe(mount,rows,world){
    var d3=window.d3;
    mount.className='nid-sk';
    mount.innerHTML='<h3>The Fastest-Sinking Cities, On A Globe You Can Spin</h3><p class="sub">Each spot is one of 465 cities, colored by how fast its ground sank each year, 2014–2023</p>'+
      '<div class="gw" role="img" aria-label="Globe of 465 cities colored by sinking rate. The hottest spots are Medan and Bandung in Indonesia, Torreón and Mexico City in Mexico, and Isfahan in Iran."><canvas></canvas><div class="gtip" hidden></div><div class="hint"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11V5a2 2 0 0 1 4 0v6"/><path d="M13 10a2 2 0 0 1 4 0v2"/><path d="M17 11a2 2 0 0 1 4 0v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7L4.6 15a2 2 0 0 1 3.2-2.3L9 14"/></svg>Touch the globe to spin it</div></div>'+
      '<div class="leg" aria-hidden="true"><div class="cap">CITYWIDE MEDIAN SINKING, MILLIMETERS PER YEAR</div><div class="bar"></div><div class="tk"><span style="left:0%">1</span><span style="left:12.5%">5</span><span style="left:28.1%">10</span><span style="left:59.4%">20</span><span style="left:90.6%">30</span></div></div>'+
      '<p class="note">Drag to spin, tap a city for its numbers. Gray dots sank less than 1 mm a year or rose.</p>';
    var wrap=mount.querySelector('.gw'),cv=mount.querySelector('canvas'),tip=mount.querySelector('.gtip'),hint=mount.querySelector('.hint');
    var land=topojson.merge(world,world.objects.countries.geometries),borders=topojson.mesh(world,world.objects.countries,function(a,b){return a!==b;});
    var proj=d3.geoOrthographic().clipAngle(90).rotate([-100,-8]),grat=d3.geoGraticule10();
    var pts=rows.map(function(r){return {r:r,lon:r[6],lat:r[7],v:r[2]};}).sort(function(a,b){return a.v-b.v;});
    var W=0,dpr=1,hover=null,spin=!reduce,drag=null,last=0,touched=false;
    var LAB={'Medan':1,'Bandung':1,'Torreón':1,'Isfahan':1,'Mexico City':1};
    function size(){var b=wrap.getBoundingClientRect();if(!b.width)return;dpr=window.devicePixelRatio||1;W=b.width;cv.width=W*dpr;cv.height=W*dpr;proj.scale(W/2-4).translate([W/2,W/2]);paint();}
    function ctr(){var r=proj.rotate();return [-r[0],-r[1]];}
    function vis(p,c){return d3.geoDistance([p.lon,p.lat],c)<Math.PI/2-0.02;}
    function paint(){
      var g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,W);var path=d3.geoPath(proj,g),k=W/560,c=ctr();
      g.beginPath();path({type:'Sphere'});g.fillStyle=OCEAN;g.fill();
      g.beginPath();path(grat);g.strokeStyle='#e4e6e1';g.lineWidth=.7;g.stroke();
      g.beginPath();path(land);g.fillStyle=LAND;g.fill();
      g.beginPath();path(borders);g.strokeStyle='#fff';g.lineWidth=.6;g.stroke();
      g.beginPath();path({type:'Sphere'});g.strokeStyle=INK;g.lineWidth=2;g.stroke();
      var on=pts.filter(function(p){return vis(p,c);});
      on.forEach(function(p){if(p.v>=1)return;var xy=proj([p.lon,p.lat]);g.beginPath();g.arc(xy[0],xy[1],2.1*k,0,7);g.fillStyle='rgba(95,107,102,.55)';g.fill();});
      on.forEach(function(p){if(p.v<1)return;var xy=proj([p.lon,p.lat]),x=xy[0],y=xy[1],rad=(5+Math.sqrt(p.v)*5.2)*k,col=heat(p.v);
        var gr=g.createRadialGradient(x,y,0,x,y,rad);gr.addColorStop(0,rgba(col,.95));gr.addColorStop(.35,rgba(col,.6));gr.addColorStop(1,rgba(col,0));
        g.fillStyle=gr;g.beginPath();g.arc(x,y,rad,0,7);g.fill();g.beginPath();g.arc(x,y,Math.max(2,1.4*Math.sqrt(p.v))*k,0,7);g.fillStyle=col;g.fill();});
      g.font='bold '+Math.max(11,13*k)+'px '+F;g.textAlign='left';g.lineJoin='round';
      on.forEach(function(p){var f=STATE.focus===p.r;if(!LAB[p.r[0]]&&!f)return;var xy=proj([p.lon,p.lat]),t=place(p.r);
        g.lineWidth=3.5;g.strokeStyle='#fff';g.strokeText(t,xy[0]+9,xy[1]-7);g.fillStyle=INK;g.fillText(t,xy[0]+9,xy[1]-7);
        if(f){g.beginPath();g.arc(xy[0],xy[1],10*k+3,0,7);g.strokeStyle=GREEN;g.lineWidth=3;g.stroke();}});
      if(hover&&vis(hover,c)){var xy=proj([hover.lon,hover.lat]);tip.hidden=false;tip.style.left=xy[0]+'px';tip.style.top=xy[1]+'px';
        tip.innerHTML='<b>'+esc(place(hover.r))+'</b><br>'+(hover.v<0?'Rising '+Math.abs(hover.v):hover.v)+' mm a year · rank '+hover.r[5]+' of 465';}else tip.hidden=true;
    }
    function nearest(e){var b=wrap.getBoundingClientRect(),mx=e.clientX-b.left,my=e.clientY-b.top,c=ctr(),best=null,bd=256;
      pts.forEach(function(p){if(!vis(p,c))return;var xy=proj([p.lon,p.lat]),d=(xy[0]-mx)*(xy[0]-mx)+(xy[1]-my)*(xy[1]-my);if(d<bd){bd=d;best=p;}});return best;}
    function frame(t){if(spin&&!drag){var dt=last?Math.min(t-last,50):16,r=proj.rotate();proj.rotate([r[0]+dt*0.006,r[1]]);paint();}last=t;requestAnimationFrame(frame);}
    function touch(){if(!touched){touched=true;hint.classList.add('off');}}
    wrap.addEventListener('pointerdown',function(e){touch();drag={x:e.clientX,y:e.clientY,r:proj.rotate()};spin=false;try{wrap.setPointerCapture(e.pointerId);}catch(_){}});
    wrap.addEventListener('pointermove',function(e){
      if(drag){var s=75/proj.scale();proj.rotate([drag.r[0]+(e.clientX-drag.x)*s,Math.max(-70,Math.min(70,drag.r[1]-(e.clientY-drag.y)*s))]);paint();return;}
      var b=nearest(e);if(b!==hover){hover=b;paint();}});
    wrap.addEventListener('pointerup',function(e){var moved=drag&&Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y)>5;drag=null;
      if(!moved){var p=nearest(e);if(p){hover=p;if(STATE.select)STATE.select(p.r,true);else{STATE.focus=p.r;paint();}}}});
    wrap.addEventListener('pointerleave',function(){if(hover&&!drag){hover=null;paint();}});
    STATE.globeTo=function(r){var p=pts.filter(function(q){return q.r===r;})[0];if(!p)return;spin=false;
      var from=proj.rotate(),to=[-p.lon,Math.max(-55,Math.min(55,-p.lat))],it=d3.interpolate(from,to),t0=performance.now(),dur=reduce?0:900;
      (function step(now){var k=dur?Math.min(1,(now-t0)/dur):1;proj.rotate(it(d3.easeCubicInOut(k)));paint();if(k<1)requestAnimationFrame(step);})(t0);};
    STATE.globePaint=paint;
    if(window.ResizeObserver)new ResizeObserver(size).observe(wrap);window.addEventListener('resize',size);
    size();requestAnimationFrame(frame);
  }

  /* ---------- sinking skylines ---------- */
  function drop(mount,rows){
    var NS='http://www.w3.org/2000/svg';
    function sv(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
    var picks=['Medan','Bandung','Torreón','Isfahan','Chittagong','Tianjin','Mexico City','Houston','New York','London','Tokyo'];
    var by={};rows.forEach(function(r){by[r[0]]=r;});
    var cs=picks.map(function(n){return by[n];});
    mount.className='nid-sk';
    mount.innerHTML='<h3>How Far The Ground Dropped In Nine Years</h3><p class="sub">Citywide median change in ground level since 2014, in millimeters</p>'+
      '<div class="ctl"><label for="nid-sk-yr">Ground level in</label><input type="range" id="nid-sk-yr" min="'+START+'" max="'+END+'" step="1" value="'+END+'"><b>'+END+'</b><button type="button" class="play">Play 2014–2023</button></div>'+
      '<div class="scr"></div><div class="swipe">Swipe sideways to see every city</div>';
    var W=780,H=500,L=62,R=10,TOP=118,PXMM=1.0,BOT=TOP+305,n=cs.length,cw=(W-L-R)/n,bw=cw-10;
    var svg=sv('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Medan, Indonesia, sank 294 millimeters from 2014 to 2023, Bandung 197, Torreón 156 and Houston 43, while New York and London sank about 4 millimeters and Tokyo rose slightly.','font-family':F});
    mount.querySelector('.scr').appendChild(svg);
    // soil body and axis
    sv('rect',{x:L,y:TOP,width:W-L-R,height:BOT-TOP+8,fill:'#fbfaf7'},svg);
    [50,100,150,200,250,300].forEach(function(v){sv('line',{x1:L,x2:W-R,y1:TOP+v*PXMM,y2:TOP+v*PXMM,stroke:GRID,'stroke-width':1},svg);});
    var cols=cs.map(function(r,i){
      var x=L+i*cw+5,g=sv('g',{},svg),seed=0;for(var j=0;j<r[0].length;j++)seed=(seed*31+r[0].charCodeAt(j))>>>0;
      function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
      var lost=sv('rect',{x:x,y:TOP,width:bw,height:0,fill:heat(Math.max(1,r[2])),opacity:.9},svg);
      var mov=sv('g',{},svg);
      var soil=sv('rect',{x:x,y:0,width:bw,height:BOT-TOP,fill:SOIL},mov);
      sv('line',{x1:x,x2:x+bw,y1:0,y2:0,stroke:SOILEDGE,'stroke-width':2.5},mov);
      // skyline: 4-5 buildings
      var bx=x+3,widths=[],tot=0,k=4+(rnd()<.5?1:0);for(var q=0;q<k;q++){var w0=6+rnd()*9;widths.push(w0);tot+=w0;}
      var sc=(bw-6)/tot;widths.forEach(function(w0,q){var w=w0*sc-1.5,h=14+rnd()*(q===Math.floor(k/2)?42:26);
        sv('rect',{x:bx,y:-h,width:w,height:h,fill:INK},mov);
        for(var wy=-h+4;wy<-4;wy+=6)sv('rect',{x:bx+2,y:wy,width:Math.max(1,w-4),height:1.6,fill:'#fff',opacity:.35},mov);
        bx+=w0*sc;});
      var nm=r[0]==='Mexico City'?['Mexico','City']:r[0]==='New York'?['New','York']:[r[0]];
      var ty=TOP-80;nm.forEach(function(s,q){var t=sv('text',{x:x+bw/2,y:ty-(nm.length-1-q)*14,'text-anchor':'middle','font-size':13.5,'font-weight':'bold',fill:INK},svg);t.textContent=s;});
      var ct=sv('text',{x:x+bw/2,y:ty+14,'text-anchor':'middle','font-size':11.5,fill:SUB},svg);ct.textContent=COUNTRY_SHORT[r[1]]||r[1];
      var v1=sv('text',{x:x+bw/2,y:BOT+30,'text-anchor':'middle','font-size':14,'font-weight':'bold',fill:INK},svg);
      var v2=sv('text',{x:x+bw/2,y:BOT+46,'text-anchor':'middle','font-size':11.5,fill:SUB},svg);
      return {r:r,lost:lost,mov:mov,soil:soil,v1:v1,v2:v2};});
    // axis
    sv('line',{x1:L-4,x2:L-4,y1:TOP,y2:BOT,stroke:INK,'stroke-width':2.5},svg);
    [0,50,100,150,200,250,300].forEach(function(v){var y=TOP+v*PXMM;sv('line',{x1:L-10,x2:L-4,y1:y,y2:y,stroke:INK,'stroke-width':2},svg);
      var t=sv('text',{x:L-13,y:y+4,'text-anchor':'end','font-size':12,'font-weight':'bold',fill:INK},svg);t.textContent=v;});
    var at=sv('text',{x:14,y:(TOP+BOT)/2,'text-anchor':'middle','font-size':11.5,'font-weight':'bold','letter-spacing':'.06em',fill:INK,transform:'rotate(-90 14 '+(TOP+BOT)/2+')'},svg);at.textContent='DROP SINCE 2014 (MM)';
    var base=sv('line',{x1:L-4,x2:W-R,y1:TOP,y2:TOP,stroke:INK,'stroke-width':2,'stroke-dasharray':'6 4'},svg);
    var bl=sv('text',{x:L+4,y:TOP-7,'text-anchor':'start','font-size':12,'font-weight':'bold',fill:INK},svg);bl.textContent='Ground level in 2014';
    var seaL=sv('line',{x1:L-4,x2:W-R,y1:TOP,y2:TOP,stroke:SEA,'stroke-width':2.5},svg);
    var seaBg=sv('rect',{x:0,y:0,width:0,height:17,fill:'#fff',opacity:.92},svg);
    var seaT=sv('text',{x:W-R-4,y:TOP,'text-anchor':'end','font-size':12.5,'font-weight':'bold',fill:SEA},svg);
    var mu=sv('text',{x:L-13,y:BOT+30,'text-anchor':'end','font-size':11,'font-weight':'bold',fill:SUB},svg);mu.textContent='DROP';
    var yr=mount.querySelector('input'),out=mount.querySelector('.ctl b');
    function render(year){var y=year-START;out.textContent=year;
      cols.forEach(function(c){var mm=c.r[2]*y,d=Math.max(0,mm)*PXMM;c.lost.setAttribute('height',d);c.mov.setAttribute('transform','translate(0,'+(TOP+mm*PXMM)+')');c.soil.setAttribute('height',Math.max(0,BOT+8-(TOP+mm*PXMM)));
        c.v1.textContent=y?(mm<0?'+'+Math.abs(mm).toFixed(0)+' mm':Math.round(mm)+' mm'):'0 mm';c.v2.textContent=y?(mm<0?'rose':inch(Math.abs(mm))+' in'):'';});
      var sy=TOP+SEA_RATE*y*PXMM;seaL.setAttribute('y1',sy);seaL.setAttribute('y2',sy);
      seaT.setAttribute('y',sy+15);seaT.textContent=y?'The sea rose '+Math.round(SEA_RATE*y)+' mm in the same years':'';
      try{var bb=seaT.getBBox();seaBg.setAttribute('x',bb.x-3);seaBg.setAttribute('y',bb.y-1);seaBg.setAttribute('width',y?bb.width+6:0);seaBg.setAttribute('height',bb.height+2);}catch(_){}}
    yr.addEventListener('input',function(){render(+yr.value);});
    var timer=null;mount.querySelector('.play').addEventListener('click',function(){clearInterval(timer);var y=START;yr.value=y;render(y);
      timer=setInterval(function(){y++;yr.value=y;render(y);if(y>=END)clearInterval(timer);},reduce?0:420);});
    render(END);
  }

  /* ---------- finder ---------- */
  function finder(mount,rows){
    mount.className='nid-sk';
    mount.innerHTML='<h3>Is Your City One Of Them?</h3><p class="sub">All 465 cities by citywide median sinking rate, millimeters per year</p>'+
      '<div class="panel"><div class="row"><label for="nid-sk-q"><b>Find a city</b></label><input class="q" id="nid-sk-q" list="nid-sk-list" placeholder="Type a city name" autocomplete="off"><datalist id="nid-sk-list"></datalist></div>'+
      '<div class="row chips"></div><div class="card"></div><div class="strip"><canvas></canvas></div><div class="xa"></div></div>';
    var dl=mount.querySelector('datalist'),byPlace={};
    rows.slice().sort(function(a,b){return a[0].localeCompare(b[0]);}).forEach(function(r){var o=document.createElement('option');o.value=r[0]+', '+r[1];dl.appendChild(o);byPlace[o.value]=r;});
    function find(n){return rows.filter(function(r){return r[0]===n;})[0];}
    var chips=mount.querySelector('.chips');
    ['Houston','New York','Los Angeles','Denver','Jakarta','Mexico City','London','Tokyo'].forEach(function(n){var b=document.createElement('button');b.type='button';b.className='chip';b.textContent=n;b.addEventListener('click',function(){select(find(n),true);});chips.appendChild(b);});
    var XMIN=-6,XMAX=34;function xp(v){return (Math.max(XMIN,Math.min(XMAX,v))-XMIN)/(XMAX-XMIN);}
    var xa=mount.querySelector('.xa');[-5,0,5,10,15,20,25,30].forEach(function(v){var t=document.createElement('div');t.className='t';t.style.left=xp(v)*100+'%';t.textContent=v;xa.appendChild(t);});
    xa.insertAdjacentHTML('beforeend','<div class="c">← RISING &nbsp; MM PER YEAR &nbsp; SINKING →</div>');
    var jit=rows.map(function(r,i){var s=Math.sin(i*12.9898)*43758.5453;return s-Math.floor(s);});
    var strip=mount.querySelector('.strip'),cv=strip.querySelector('canvas'),sel=null;
    function draw(){var b=strip.getBoundingClientRect();if(!b.width)return;var dpr=window.devicePixelRatio||1;cv.width=b.width*dpr;cv.height=b.height*dpr;
      var g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);var W=b.width,H=b.height,top=30;
      function yy(i){return top+8+jit[i]*(H-top-16);}
      g.strokeStyle=SEA;g.lineWidth=2;g.beginPath();g.moveTo(xp(SEA_RATE)*W,top-6);g.lineTo(xp(SEA_RATE)*W,H);g.stroke();
      g.fillStyle=SEA;g.font='bold 12px '+F;g.textAlign='left';g.fillText('Faster than the sea is rising →',xp(SEA_RATE)*W+5,top-10);
      rows.forEach(function(r,i){g.beginPath();g.arc(xp(r[2])*W,yy(i),3.3,0,7);g.fillStyle=r[2]>=1?heat(r[2]):'#c4c8c3';g.fill();});
      strip.querySelectorAll('.lab').forEach(function(e){e.remove();});
      var m=find('Medan'),mi=rows.indexOf(m);g.fillStyle=INK;g.textAlign='right';g.fillText('Medan, Indonesia',xp(m[2])*W-7,yy(mi)+4);
      if(sel){var i=rows.indexOf(sel),x=xp(sel[2])*W,y=yy(i);g.beginPath();g.arc(x,y,7.5,0,7);g.strokeStyle=GREEN;g.lineWidth=3;g.stroke();
        var l=document.createElement('div');l.className='lab';l.textContent=sel[0];l.style.left=Math.max(40,Math.min(W-40,x))+'px';l.style.top=(y-27)+'px';strip.appendChild(l);}}
    function select(r,fromUser){if(!r)return;sel=r;STATE.focus=r;var card=mount.querySelector('.card'),nine=r[2]*9,ratio=r[2]/SEA_RATE,line;
      if(r[2]<0)line=esc(place(r))+'’s ground rose slightly, about '+Math.abs(r[2])+' mm a year.';
      else if(r[2]===0)line=esc(place(r))+'’s ground held steady at the median.';
      else line=esc(place(r))+' sank '+r[2]+' mm a year, '+(ratio>=1?ratio.toFixed(1)+' times':Math.round(ratio*100)+'% of')+' the rate the sea is rising.';
      card.innerHTML='<div><div class="big">'+line+'</div><p>It ranks '+r[5]+' of 465 for fastest sinking. Its fastest-sinking 5% of ground dropped at least '+r[3]+' mm a year.</p></div>'+
        '<div class="stats"><div class="stat"><b>'+(nine<0?'+':'−')+Math.abs(nine).toFixed(0)+' mm</b><span>Change at the median, 2014–2023 ('+inch(Math.abs(nine))+' in)</span></div><div class="stat"><b>'+r[4]+'%</b><span>Share of the city sinking faster than 10 mm a year</span></div></div>';
      draw();if(fromUser&&STATE.globeTo)STATE.globeTo(r);else if(STATE.globePaint)STATE.globePaint();}
    STATE.select=select;
    mount.querySelector('input').addEventListener('change',function(e){var v=e.target.value.trim(),r=byPlace[v]||rows.filter(function(x){return x[0].toLowerCase()===v.toLowerCase();})[0];if(r){select(r,true);e.target.value='';}});
    if(window.ResizeObserver)new ResizeObserver(draw).observe(strip);window.addEventListener('resize',draw);
    select(find('Houston'),false);
  }

  function init(){
    var gm=document.getElementById('nid-sk-globe'),dm=document.getElementById('nid-sk-drop'),fm=document.getElementById('nid-sk-find');
    if(!gm&&!dm&&!fm)return;css();
    var libs=(window.d3&&window.topojson)?Promise.resolve():load('https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js').then(function(){return load('https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js');});
    Promise.all([getJSON(BASE+'sinking-data.json'+V),gm?getJSON(BASE+'world-110m.json'+V):null]).then(function(a){
      var rows=a[0].rows;STATE.rows=rows;
      if(dm)drop(dm,rows);if(fm)finder(fm,rows);
      if(gm)libs.then(function(){globe(gm,rows,a[1]);if(STATE.focus&&STATE.globePaint)STATE.globePaint();}).catch(function(){gm.innerHTML='';});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
