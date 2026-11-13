/* The News in Data: "The three times the U.S. grounded every flight".
   Fills <div id="nid-gs"> (story replay), <div id="nid-gs-2020"> (TSA chart) and <div id="nid-gs-home"> (home page hero).
   Plane positions are illustrative; only the Sept. 11, 2001 count follows FAA figures.
   TO UPDATE WHEN THE NOV. 13, 2026 STOP ENDS: edit NOW below and the e2026 moments/facts, then bump ?v= on the script tags. */
(function(){
"use strict";
var NOW={t:17.0,label:"5:00 p.m."};           /* last time checked, hours Eastern on Nov. 13, 2026; stop still in effect */
var MAP=__MAP__;
var G="#007a55",INK="#13241b",SUB="#4a5550",PALE="#dde6e1",SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
var NS="http://www.w3.org/2000/svg";
function fmt(h){var m=Math.round(h*60),H=Math.floor(m/60)%24,M=m%60;return (H%12||12)+":"+(M<10?"0":"")+M+" "+(H<12?"a.m.":"p.m.")}
function dur(h){var m=Math.round(h*60);return (m>=60?Math.floor(m/60)+" hr ":"")+(m%60)+" min"}
function rng(s){return function(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function miles(a,b){var R=3959,r=Math.PI/180,dl=(b.la-a.la)*r,dn=(b.lo-a.lo)*r,x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a.la*r)*Math.cos(b.la*r)*Math.sin(dn/2)*Math.sin(dn/2);return 2*R*Math.asin(Math.sqrt(x))}
function interp(p,t){if(t<=p[0][0])return p[0][1];for(var i=1;i<p.length;i++)if(t<=p[i][0]){var a=p[i-1],b=p[i];return a[1]+(b[1]-a[1])*(t-a[0])/(b[0]-a[0])}return p[p.length-1][1]}
var H=MAP.H,C=MAP.C;
/* FAA airborne counts, Sept. 11, 2001: hour of day (Eastern), aircraft */
var C01=[[9.483,5102],[9.75,4546],[10.25,2803],[10.65,1693],[11.1,1305],[12.267,0]];
var EV={
 e2001:{name:"Sept. 11, 2001",short:"2001",cause:"Terrorist attacks",t0:8.5,t1:13,stop:9+25/60,lift:Infinity,landAll:9.75,n:210,seed:11,
  bar:[9+25/60,24],barLab:"Began 9:25 a.m.",barIn:"to Sept. 13 →",
  moments:[[8.5,"8:30 a.m.","A Tuesday morning, with flights departing on schedule across the country."],
   [8+46/60,"8:46 a.m.","The first hijacked plane strikes the World Trade Center."],
   [9.1,"9:06 a.m.","The FAA stops takeoffs bound for New York airspace from the Northeast."],
   [9+25/60,"9:25 a.m.","National ground stop: no civilian aircraft may take off anywhere in the country."],
   [9.75,"9:45 a.m.","Every aircraft is ordered to land at the nearest airport. The FAA counts 4,546 in the air."],
   [10.65,"10:39 a.m.","A notice halts takeoffs and landings at all airports, with 1,693 aircraft still airborne."],
   [12.267,"12:16 p.m.","The sky over the lower 48 states is clear of commercial and private flights."]],
  facts:[["4,546","aircraft in the air when the FAA ordered all of them to land at 9:45 a.m."],["2 hr 31 min","from that order until the lower-48 sky was clear at 12:16 p.m."],["About 2 days","until commercial flights were allowed again, at 11 a.m. on Sept. 13"]]},
 e2023:{name:"Jan. 11, 2023",short:"2023",cause:"Pilot-alert (NOTAM) system failure",t0:6,t1:11.5,stop:7.5,lift:9,n:120,seed:23,
  bar:[7.5,9],barLab:"About 7:30 to 9 a.m.",
  moments:[[6,"6:00 a.m.","The FAA system that sends safety notices to pilots has been failing since Tuesday night."],
   [7.5,"About 7:30 a.m.","The FAA pauses all domestic departures, and flights already in the air continue to their destinations."],
   [9,"About 9:00 a.m.","The stop is lifted after about 90 minutes and departures resume gradually."],
   [10.5,"10:30 a.m.","Airports work through the backlog while delays keep growing for the rest of the day."]],
  facts:[["About 90 min","length of the stop, on a Wednesday morning"],["1,300+","flights canceled that day, according to FlightAware"],["About 10,000","flights delayed that day, according to FlightAware"]]},
 e2026:{name:"Nov. 13, 2026",short:"2026",cause:"Air traffic control communication failure",t0:14,t1:NOW.t,stop:15.9,lift:Infinity,chi:15+10/60,n:124,seed:26,now:true,
  bar:[15.9,NOW.t],barLab:"Began 3:54 p.m.",open:[NOW.t,23.5],
  moments:[[14,"2:00 p.m.","A Friday afternoon, with flights departing on schedule across the country."],
   [15+10/60,"About 3:10 p.m.","Flights bound for Chicago O’Hare are stopped over communications problems, and Midway follows three minutes later."],
   [15.9,"3:54 p.m.","Nationwide ground stop. More than 3,100 flights already in the air are allowed to continue to their destinations."],
   [16+16/60,"4:16 p.m.","The transportation secretary says a communication issue is affecting air route traffic control centers."],
   [16.9,"4:54 p.m.","The FAA advisory now runs to 11:30 p.m. Eastern, and no end time is confirmed."]],
  unknown:"<b>What is not known.</b> The FAA has not named a cause or said when departures will resume. This replay ends at "+NOW.label+" Eastern on Nov. 13, the last time we checked, with the stop still in effect. Three days earlier, on Nov. 10, the agency expanded SMART, an AI tool that suggests flight reroutes, to all 22 centers. Neither the FAA nor the transportation secretary has connected the tool to the stop, and no reporting so far shows a link.",
  facts:[["3:54 p.m.","Eastern start time, the only one of the three stops to begin after noon"],["3,100+","flights in the air when the stop began, allowed to finish their trips"],["11:30 p.m.","end of the FAA advisory period, with no confirmed end to the stop as of "+NOW.label+" Eastern"]]}
};
var ORDER=["e2001","e2023","e2026"];
function build(ev){
  var r=rng(ev.seed),tot=0,i;for(i=0;i<H.length;i++)tot+=H[i].w;
  function pick(){var x=r()*tot;for(var i=0;i<H.length;i++){x-=H[i].w;if(x<=0)return i}return 0}
  function pair(){for(;;){var o=pick(),d=pick();if(o===d)continue;var mi=miles(H[o],H[d]);if(mi<180)continue;return{o:o,d:d,dur:mi/460+0.4}}}
  var s=0;for(i=0;i<400;i++)s+=pair().dur;var rate=ev.n/(s/400),fl=[],t=ev.t0-7,step=1/rate,q=0;
  while(t<ev.t1){var p=pair(),sched=t+(r()-.5)*step;p.sched=sched;p.dep=sched;
    var chi=ev.chi&&sched>=ev.chi&&(H[p.d].c==="ORD"||H[p.d].c==="MDW");
    if(sched>=ev.stop||chi){if(ev.lift===Infinity||(chi&&sched<ev.stop))p.dep=Infinity;else{q=Math.max(sched,Math.max(ev.lift,q)+step/1.7);p.dep=q}}
    p.arr=p.dep+p.dur;fl.push(p);t+=step}
  if(ev.landAll){var T=ev.landAll,air=fl.filter(function(f){return f.dep<=T&&f.arr>T}).sort(function(a,b){return a.arr-b.arr}),n=air.length,base=interp(C01,T);
    air.forEach(function(f,k){var target=base*(n-k-.5)/n,L=T,j;
      for(j=1;j<C01.length;j++){var a=C01[j-1],b=C01[j];if(target<=a[1]&&target>=b[1]){L=a[0]+(b[0]-a[0])*(a[1]-target)/(a[1]-b[1]);break}}
      L=Math.max(L,T+.03);var u0=(T-f.dep)/f.dur,o=H[f.o],d=H[f.d];f.p0={x:o.x+(d.x-o.x)*u0,y:o.y+(d.y-o.y)*u0};
      if(L>=f.arr)f.tg={x:d.x,y:d.y};else{var u=(L-f.dep)/f.dur,px=o.x+(d.x-o.x)*u,py=o.y+(d.y-o.y)*u,best=0,bd=1e9;
        H.forEach(function(h,hi){var dd=(h.x-px)*(h.x-px)+(h.y-py)*(h.y-py);if(dd<bd){bd=dd;best=hi}});f.tg={x:H[best].x,y:H[best].y}}
      f.L=L;f.arr=L})}
  return fl}
var built=false;function ensure(){if(built)return;built=true;ORDER.forEach(function(k){EV[k].flights=build(EV[k])})}

function css(id){return id+'{font-family:"Times New Roman",Times,Georgia,serif;color:'+INK+';margin:2.2em auto;max-width:760px;text-align:left}'+id+' *{box-sizing:border-box}'+
id+' .ti{font-size:clamp(1.35em,4.6vw,2em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center}'+
id+' .su{font-size:clamp(.92em,2.6vw,1.08em);color:'+SUB+';font-style:italic;line-height:1.3;margin:0 auto 1em;max-width:620px;text-align:center}'+
id+' .rows{display:flex;flex-direction:column;gap:7px}'+
id+' .row{display:grid;grid-template-columns:minmax(140px,210px) 1fr;gap:14px;align-items:center;width:100%;font:inherit;color:inherit;text-align:left;background:#fff;border:1.5px solid #cfd9d3;border-radius:10px;padding:9px 12px;cursor:pointer;transition:border-color .2s,background .2s}'+
id+' .row:hover{border-color:'+G+'}'+id+' .row[aria-pressed="true"]{border-color:'+G+';background:#f1f7f4;box-shadow:inset 4px 0 0 '+G+'}'+
id+' .row b{display:block;font-size:1.08em}'+id+' .row .c{display:block;font-size:.84em;color:'+SUB+';line-height:1.2}'+
id+' .track{position:relative;display:block;height:30px;border-left:2px solid '+INK+';border-bottom:2px solid '+INK+';background:repeating-linear-gradient(90deg,transparent 0,transparent calc(12.5% - 1px),'+PALE+' calc(12.5% - 1px),'+PALE+' 12.5%)}'+
id+' .bar{position:absolute;top:5px;height:18px;background:#9fb0a8;border-radius:2px}'+id+' .row.now .bar{background:'+G+'}'+
id+' .row.now .bar.open{background:repeating-linear-gradient(135deg,'+G+' 0 2px,transparent 2px 8px);border:1.5px dashed '+G+';border-left:0;border-radius:0 2px 2px 0}'+
id+' .bar .lab{position:absolute;white-space:nowrap;font-size:.8em;top:0;color:'+INK+'}'+id+' .bar .lab.l{right:calc(100% + 6px)}'+id+' .bar .lab.r{left:calc(100% + 6px)}'+id+' .bar .lab.in{right:8px;color:#fff;font-weight:700}'+
id+' .axis{display:grid;grid-template-columns:minmax(140px,210px) 1fr;gap:14px;padding:0 13px;margin-top:3px}'+id+' .axis div{display:flex;justify-content:space-between;font-size:.76em;font-weight:700}'+
id+' .stage{margin-top:16px;border:1px solid #cfd9d3;border-radius:12px;background:#fff;overflow:hidden}'+
id+' .hud{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 16px;padding:12px 14px 8px}'+
id+' .clock{font-size:clamp(30px,6vw,46px);font-weight:700;font-variant-numeric:tabular-nums;line-height:1;letter-spacing:-.01em}'+id+' .clock small{font-size:.4em;font-weight:400;color:'+SUB+';margin-left:7px;letter-spacing:0}'+
id+' .pill{display:inline-block;font-family:'+SANS+';font-size:11.5px;font-weight:700;letter-spacing:.07em;padding:5px 11px;border:1.5px solid #cfd9d3;border-radius:999px;white-space:nowrap;color:'+SUB+'}'+
id+' .pill.stop{background:'+G+';border-color:'+G+';color:#fff}'+id+' .pill.clear{background:'+INK+';border-color:'+INK+';color:#fff}'+
id+' .stat{font-size:.95em;color:'+SUB+';font-variant-numeric:tabular-nums}'+id+' .stat b{color:'+G+';font-size:1.35em}'+
id+' .mapwrap{position:relative;width:100%;aspect-ratio:975/610}'+id+' .mapwrap svg,'+id+' .mapwrap canvas{position:absolute;left:0;top:0;width:100%;height:100%}'+
id+' .nation{fill:#eef3f0;stroke:#8fa39a;stroke-width:1.1;stroke-linejoin:round}'+id+' .borders{fill:none;stroke:#fff;stroke-width:1.1}'+id+' .hub{fill:#6f857b}'+
id+' .ctr{fill:none;stroke:'+G+';stroke-width:1.6;opacity:0;transition:opacity .3s}'+id+' .ctr.on{opacity:.9;animation:nidgsp 1.8s ease-in-out infinite}'+
id+' .tip{position:absolute;pointer-events:none;background:'+INK+';color:#fff;font-family:'+SANS+';font-size:12px;padding:3px 8px;border-radius:4px;transform:translate(-50%,-150%);white-space:nowrap;display:none;z-index:2}'+
id+' .cap{padding:10px 14px;border-top:1px solid '+PALE+';font-size:1.02em;min-height:3.5em;line-height:1.32;margin:0}'+id+' .cap b{color:'+G+';font-variant-numeric:tabular-nums}'+
id+' .ctl{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center;padding:8px 14px 2px;border-top:1px solid '+PALE+'}'+
id+' .play{font-family:'+SANS+';font-size:14px;font-weight:600;background:'+G+';color:#fff;border:0;border-radius:999px;padding:9px 18px;cursor:pointer;min-width:84px}'+id+' .play:hover{background:#00573d}'+
id+' .scr{position:relative;height:36px}'+id+' .scr .win{position:absolute;top:13px;height:10px;background:rgba(0,122,85,.16);border-left:2px solid '+G+'}'+id+' .scr .win.closed{border-right:2px solid '+G+'}'+
id+' .scr input{position:absolute;left:0;top:0;width:100%;height:100%;margin:0;background:transparent;-webkit-appearance:none;appearance:none;cursor:pointer}'+
id+' .scr input::-webkit-slider-runnable-track{height:3px;background:'+INK+';border-radius:2px}'+id+' .scr input::-moz-range-track{height:3px;background:'+INK+';border-radius:2px}'+
id+' .scr input::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;margin-top:-9px;background:#fff;border:3px solid '+G+';border-radius:50%}'+id+' .scr input::-moz-range-thumb{width:15px;height:15px;background:#fff;border:3px solid '+G+';border-radius:50%}'+
id+' .chips{display:flex;flex-wrap:wrap;gap:6px;padding:4px 14px 12px;font-family:'+SANS+'}'+
id+' .chips button{font:inherit;font-size:12.5px;background:#fff;color:'+INK+';border:1px solid #cfd9d3;border-radius:999px;padding:5px 11px;cursor:pointer;font-variant-numeric:tabular-nums}'+id+' .chips button:hover{border-color:'+G+'}'+
id+' .chips button[aria-current="true"]{background:'+G+';border-color:'+G+';color:#fff}'+
id+' .leg{display:flex;flex-wrap:wrap;gap:4px 16px;justify-content:center;font-family:'+SANS+';font-size:12px;color:'+SUB+';padding:9px 6px 0}'+id+' .leg i{display:inline-block;vertical-align:-2px;margin-right:5px}'+
id+' .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin-top:16px}'+id+' .fact{border-top:3px solid '+G+';padding:8px 2px 0}'+
id+' .fact b{display:block;font-size:1.6em;color:'+G+';font-variant-numeric:tabular-nums;line-height:1.1}'+id+' .fact span{font-size:.9em;color:'+SUB+';line-height:1.25;display:block;margin-top:3px}'+
id+' .unk{font-size:.95em;line-height:1.4;margin:14px 0 0;padding:10px 14px;background:#f1f7f4;border-radius:8px}'+
id+' button:focus-visible,'+id+' input:focus-visible{outline:3px solid '+G+';outline-offset:2px}'+
'@keyframes nidgsp{50%{stroke-width:4;opacity:.3}}@media(prefers-reduced-motion:reduce){'+id+' .ctr.on{animation:none}}'+
'@media(max-width:560px){'+id+' .row,'+id+' .axis{grid-template-columns:1fr;gap:5px}'+id+' .axis>span{display:none}}'}

function mount(root,mini){
  ensure();var id="#"+root.id,st=document.createElement("style");
  st.textContent=css(id)+(mini?id+'{margin:clamp(20px,3vw,32px) 0 0;max-width:none;padding:clamp(12px,2vw,20px)!important;background:#fff}'+id+' .stage{margin-top:0;border:0}'+id+' .hud{padding:0 2px 6px}'+id+' .clock{font-size:clamp(26px,3.6vw,40px)}'+id+' .cap{border:0;padding:6px 2px 8px;min-height:4em;font-size:.98em}'+id+' .chips{padding:0 2px;justify-content:center}'+id+' .sr{font-family:'+SANS+';font-size:12px;color:'+SUB+';margin:10px 0 0;text-align:center}'+id+' .sr a{color:'+G+';font-weight:600}':"");
  document.head.appendChild(st);
  var href=(root.querySelector("a")||{}).href||"#";
  var stage='<div class="stage"><div class="hud"><div class="clock"></div><span class="pill"></span>'+(mini?'':'<div class="stat"></div>')+'</div>'+
    '<div class="mapwrap"><svg viewBox="0 0 975 610" aria-hidden="true"><path class="nation"/><path class="borders"/><g class="cs"></g><g class="hs"></g></svg><canvas role="img" aria-label="Animated map of illustrative flights over the United States on the selected day"></canvas><div class="tip"></div></div>'+
    '<p class="cap" aria-live="'+(mini?'off':'polite')+'"></p>'+(mini?'':'<div class="ctl"><button class="play" type="button">Play</button><div class="scr"><div class="win"></div><input type="range" min="0" max="1000" value="0" aria-label="Time of day"></div></div>')+'<div class="chips"></div></div>';
  root.innerHTML=mini?stage+'<p class="sr">Plane positions are illustrative. <a href="'+href+'">Replay each day in the story &rsaquo;</a></p>':
    '<p class="ti">Replay Each Nationwide Ground Stop</p><p class="su">Pick a day, then press play. Bars show when each stop began and how long it ran on its first day, Eastern time.</p><div class="rows"></div><div class="axis"><span></span><div><span>12 a.m.</span><span>6 a.m.</span><span>Noon</span><span>6 p.m.</span><span>12 a.m.</span></div></div>'+stage+
    '<div class="leg"><span><i style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:11px solid '+INK+'"></i>Flights in the air</span><span><i style="width:13px;height:13px;border-radius:50%;background:rgba(0,122,85,.25);border:1.5px solid '+G+'"></i>Departures held at an airport</span><span class="lc"><i style="width:12px;height:12px;border-radius:50%;border:2px solid '+G+'"></i>Air route traffic control center</span><span>Plane positions are illustrative, not real flight tracks</span></div><div class="facts"></div><p class="unk"></p>';
  var q=function(s){return root.querySelector(s)},cv=q("canvas"),ctx=cv.getContext("2d"),tip=q(".tip"),cur,t=0,playing=false,last=0,S=1,vis=true;
  q(".nation").setAttribute("d",MAP.nation);q(".borders").setAttribute("d",MAP.borders);
  H.forEach(function(h){var c=document.createElementNS(NS,"circle");c.setAttribute("class","hub");c.setAttribute("cx",h.x);c.setAttribute("cy",h.y);c.setAttribute("r",1.5+h.w*.16);q(".hs").appendChild(c)});
  var cel=C.map(function(c,i){var e=document.createElementNS(NS,"circle");e.setAttribute("class","ctr");e.setAttribute("cx",c.x);e.setAttribute("cy",c.y);e.setAttribute("r",9);e.style.animationDelay=(i%5)*.2+"s";q(".cs").appendChild(e);return e});
  var btn={};
  if(!mini){var pct=function(h){return h/24*100+"%"};ORDER.forEach(function(k){var e=EV[k],b=document.createElement("button");b.type="button";b.className="row"+(e.now?" now":"");
    b.innerHTML='<span><b>'+e.name+'</b><span class="c">'+e.cause+'</span></span><span class="track"><span class="bar" style="left:'+pct(e.bar[0])+';width:'+pct(e.bar[1]-e.bar[0])+'"><span class="lab '+(e.bar[0]<8?"r":"l")+'">'+e.barLab+'</span>'+(e.barIn?'<span class="lab in">'+e.barIn+'</span>':'')+'</span>'+(e.open?'<span class="bar open" title="FAA advisory runs to 11:30 p.m." style="left:'+pct(e.open[0])+';width:'+pct(e.open[1]-e.open[0])+'"></span>':'')+'</span>';
    b.addEventListener("click",function(){select(k);t=cur.t0;start()});q(".rows").appendChild(b);btn[k]=b})}
  function resize(){var r=q(".mapwrap").getBoundingClientRect();if(!r.width)return;var d=Math.min(window.devicePixelRatio||1,2);S=r.width/975;cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);ctx.setTransform(d*S,0,0,d*S,0,0);draw()}
  function pos(f){if(f.L&&t>cur.landAll){var u=(t-cur.landAll)/(f.L-cur.landAll);return{x:f.p0.x+(f.tg.x-f.p0.x)*u,y:f.p0.y+(f.tg.y-f.p0.y)*u,a:Math.atan2(f.tg.y-f.p0.y,f.tg.x-f.p0.x),div:1}}
    var o=H[f.o],d=H[f.d],u2=(t-f.dep)/f.dur;return{x:o.x+(d.x-o.x)*u2,y:o.y+(d.y-o.y)*u2,a:Math.atan2(d.y-o.y,d.x-o.x),ox:o.x,oy:o.y}}
  function draw(){if(!cur)return;ctx.clearRect(0,0,975,610);var fl=cur.flights,held=[],i,f;for(i=0;i<H.length;i++)held[i]=0;
    for(i=0;i<fl.length;i++){f=fl[i];if(f.sched<=t&&f.dep>t&&f.sched>=Math.min(cur.stop,cur.chi||99))held[f.o]++}
    for(i=0;i<H.length;i++)if(held[i]){ctx.beginPath();ctx.arc(H[i].x,H[i].y,4+Math.sqrt(held[i])*3.2,0,7);ctx.fillStyle="rgba(0,122,85,.2)";ctx.fill();ctx.lineWidth=1.2;ctx.strokeStyle=G;ctx.stroke()}
    var k=Math.max(1,.75/Math.max(S,.45));
    for(i=0;i<fl.length;i++){f=fl[i];if(f.dep>t||f.arr<=t)continue;var p=pos(f);
      if(!p.div){var g=ctx.createLinearGradient(p.ox,p.oy,p.x,p.y);g.addColorStop(0,"rgba(19,36,27,0)");g.addColorStop(1,"rgba(19,36,27,.25)");ctx.strokeStyle=g;ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(p.ox,p.oy);ctx.lineTo(p.x,p.y);ctx.stroke()}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.scale(k,k);ctx.fillStyle=p.div?G:INK;ctx.beginPath();ctx.moveTo(8,0);ctx.lineTo(1,1.6);ctx.lineTo(-2,7);ctx.lineTo(-4,7);ctx.lineTo(-2.4,1.5);ctx.lineTo(-6,1.2);ctx.lineTo(-7.5,3.4);ctx.lineTo(-8.6,3.4);ctx.lineTo(-7.8,0);ctx.lineTo(-8.6,-3.4);ctx.lineTo(-7.5,-3.4);ctx.lineTo(-6,-1.2);ctx.lineTo(-2.4,-1.5);ctx.lineTo(-4,-7);ctx.lineTo(-2,-7);ctx.lineTo(1,-1.6);ctx.closePath();ctx.fill();ctx.restore()}
    hud()}
  function hud(){var e=cur,pill=q(".pill"),stopped=t>=e.stop&&t<e.lift;q(".clock").innerHTML=fmt(t)+"<small>Eastern"+(mini?", "+e.name:"")+"</small>";pill.className="pill";
    if(e.landAll&&t>=12.267){pill.textContent="SKY CLEAR";pill.className="pill clear"}else if(e.landAll&&t>=e.landAll){pill.textContent="ALL AIRCRAFT ORDERED TO LAND";pill.className="pill stop"}
    else if(stopped){pill.textContent="NO TAKEOFFS NATIONWIDE";pill.className="pill stop"}else if(e.chi&&t>=e.chi){pill.textContent="CHICAGO ARRIVALS STOPPED";pill.className="pill stop"}
    else if(t>=e.lift)pill.textContent="DEPARTURES RESUMING";else pill.textContent="FLYING NORMALLY";
    var m=e.moments,idx=0,i;for(i=0;i<m.length;i++)if(t>=m[i][0]-1e-6)idx=i;
    if(idx!==e["_i"+root.id]){e["_i"+root.id]=idx;q(".cap").innerHTML="<b>"+m[idx][1]+"</b> &nbsp;"+m[idx][2];if(!mini)[].forEach.call(q(".chips").children,function(c,ci){c.setAttribute("aria-current",ci===idx?"true":"false")})}
    if(!mini){var s=q(".stat");if(e.landAll)s.innerHTML=t>=C01[0][0]?"<b>"+Math.round(interp(C01,t)).toLocaleString("en-US")+"</b> aircraft in the air (FAA count)":"FAA count begins at 9:29 a.m.";
      else if(stopped)s.innerHTML="Stopped for <b>"+dur(t-e.stop)+"</b>"+(e.now?" and counting":"");else if(t>=e.lift)s.innerHTML="Stop lasted <b>about 90 min</b>";else s.innerHTML="Stop begins in <b>"+dur(e.stop-t)+"</b>";
      var inp=q(".scr input");inp.value=Math.round((t-e.t0)/(e.t1-e.t0)*1000);inp.setAttribute("aria-valuetext",fmt(t)+" Eastern")}
    cel.forEach(function(el,ci){var on=!!e.chi&&(t>=e.stop||(t>=e.chi&&C[ci].n==="Chicago"));if(el._on!==on){el._on=on;el.setAttribute("class","ctr"+(on?" on":""))}})}
  function select(k){cur=EV[k];cur["_i"+root.id]=-1;var ch=q(".chips");ch.innerHTML="";
    if(mini){ORDER.forEach(function(o){var b=document.createElement("button");b.type="button";b.textContent=EV[o].name;b.setAttribute("aria-current",o===k?"true":"false");b.addEventListener("click",function(){auto=false;select(o);t=cur.t0;start()});ch.appendChild(b)});return}
    ORDER.forEach(function(o){btn[o].setAttribute("aria-pressed",o===k?"true":"false")});
    cur.moments.forEach(function(m){var b=document.createElement("button");b.type="button";b.textContent=m[1];b.addEventListener("click",function(){stop();t=m[0];draw()});ch.appendChild(b)});
    var w=q(".win"),a=(cur.stop-cur.t0)/(cur.t1-cur.t0),b2=(Math.min(cur.lift,cur.t1)-cur.t0)/(cur.t1-cur.t0);w.style.left=a*100+"%";w.style.width=(b2-a)*100+"%";w.className="win"+(cur.lift<cur.t1?" closed":"");
    q(".facts").innerHTML=cur.facts.map(function(f){return'<div class="fact"><b>'+f[0]+"</b><span>"+f[1]+"</span></div>"}).join("");
    var u=q(".unk");u.innerHTML=cur.unknown||"";u.style.display=cur.unknown?"":"none";q(".lc").style.display=cur.chi?"":"none"}
  var auto=mini,hold=0;
  function start(){if(t>=cur.t1-1e-6)t=cur.t0;playing=true;last=0;if(!mini)q(".play").textContent="Pause";requestAnimationFrame(tick)}
  function stop(){playing=false;if(!mini)q(".play").textContent="Play"}
  function tick(ts){if(!playing)return;if(!vis){last=0;requestAnimationFrame(tick);return}
    if(last){var dt=(ts-last)/1000;if(t>=cur.t1){hold+=dt;if(mini&&hold>2.2){hold=0;if(auto){var n=ORDER[(ORDER.indexOf(cur===EV.e2001?"e2001":cur===EV.e2023?"e2023":"e2026")+1)%3];select(n)}t=cur.t0}else if(!mini){draw();stop();return}}
      else{t=Math.min(cur.t1,t+dt*(cur.t1-cur.t0)/(mini?10:22))}}
    last=ts;draw();requestAnimationFrame(tick)}
  if(!mini){q(".play").addEventListener("click",function(){playing?stop():start()});q(".scr input").addEventListener("input",function(){stop();t=cur.t0+(+this.value/1000)*(cur.t1-cur.t0);draw()})}
  cv.addEventListener("pointermove",function(ev){var r=cv.getBoundingClientRect(),x=(ev.clientX-r.left)/S,y=(ev.clientY-r.top)/S,best=null,bd=196/(S*S);
    H.forEach(function(h){var d=(h.x-x)*(h.x-x)+(h.y-y)*(h.y-y);if(d<bd){bd=d;best={x:h.x,y:h.y,s:h.n+" ("+h.c+")"}}});
    if(cur.chi)C.forEach(function(c){var d=(c.x-x)*(c.x-x)+(c.y-y)*(c.y-y);if(d<bd){bd=d;best={x:c.x,y:c.y,s:c.n+" Center"}}});
    if(best){tip.textContent=best.s;tip.style.left=best.x*S+"px";tip.style.top=best.y*S+"px";tip.style.display="block"}else tip.style.display="none"});
  cv.addEventListener("pointerleave",function(){tip.style.display="none"});
  window.addEventListener("resize",resize);
  if("IntersectionObserver" in window)new IntersectionObserver(function(en){vis=en[0].isIntersecting},{threshold:.05}).observe(root);
  select("e2026");t=cur.t1;resize();
  var calm=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(mini&&!calm){t=cur.t0;start()}
  root._nidgs={go:function(k,tt){stop();select(k);t=tt==null?cur.t1:tt;resize()}};
}

/* 2020: TSA checkpoint throughput, Mar. 13 to Apr. 28, 2020 */
var TSA=[1714372,1485553,1519192,1257823,953699,779631,620883,593167,548132,454516,331431,279018,239234,203858,199644,184027,180002,154080,146348,136023,124021,129763,118302,122029,108310,97130,94931,104090,108977,93645,90510,102184,87534,90784,95085,106385,97236,105382,99344,92859,98968,111627,123464,114459,128875,119854,110913];
function tsa(root){var id="#"+root.id,st=document.createElement("style");
  st.textContent=id+'{font-family:"Times New Roman",Times,Georgia,serif;color:'+INK+';max-width:760px;margin:2.2em auto;position:relative}'+id+' .ti{font-size:clamp(1.25em,4.2vw,1.7em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center}'+id+' .su{font-size:clamp(.92em,2.6vw,1.05em);color:'+SUB+';font-style:italic;margin:0 auto .8em;text-align:center;max-width:600px;line-height:1.3}'+
  id+' .yl{font-size:.74em;font-weight:700;letter-spacing:.05em;margin:0 0 4px}'+id+' .box{position:relative;border-left:2.5px solid '+INK+';border-bottom:2.5px solid '+INK+'}'+id+' svg{display:block;width:100%;height:auto;overflow:visible}'+id+' text{font-family:"Times New Roman",Times,Georgia,serif;fill:'+INK+'}'+id+' rect{transition:opacity .15s}'+id+' rect:hover{opacity:.7}'+
  id+' .tip{position:absolute;pointer-events:none;background:'+INK+';color:#fff;font-family:'+SANS+';font-size:12px;padding:3px 8px;border-radius:4px;transform:translate(-50%,-150%);white-space:nowrap;display:none}';
  document.head.appendChild(st);
  root.innerHTML='<p class="ti">In 2020, Passengers Stayed Home While The Airspace Stayed Open</p><p class="su">People screened at TSA checkpoints each day, March 13 to April 28, 2020</p><p class="yl">PEOPLE SCREENED PER DAY</p><div class="box"><div class="tip"></div></div>';
  var box=root.querySelector(".box"),w=(root.getBoundingClientRect().width||700)<560?440:900,h=w<500?270:300,pad=4,n=TSA.length,bw=(w-pad*2)/n,max=1800000,s="";
  [500000,1000000,1500000].forEach(function(v){var y=h-v/max*h;s+='<line x1="0" x2="'+w+'" y1="'+y+'" y2="'+y+'" stroke="'+PALE+'"/><text x="'+(w-6)+'" y="'+(y-5)+'" font-size="14" text-anchor="end">'+(v/1e6)+" million</text>"});
  TSA.forEach(function(v,i){var bh=Math.max(1.5,v/max*h);s+='<rect data-i="'+i+'" x="'+(pad+i*bw+1)+'" y="'+(h-bh)+'" width="'+(bw-2)+'" height="'+bh+'" fill="'+(v===87534?G:"#b9c6bf")+'"/>'});
  var lx=pad+32*bw+bw/2;s+='<line x1="'+lx+'" x2="'+lx+'" y1="'+(h-18)+'" y2="'+(h-112)+'" stroke="'+INK+'" stroke-width="1.5"/><text x="'+lx+'" y="'+(h-136)+'" font-size="17" font-weight="700" text-anchor="middle" style="fill:'+G+'">April 14: 87,534</text><text x="'+lx+'" y="'+(h-118)+'" font-size="15" text-anchor="middle">96% below a year earlier</text><text x="'+(pad+bw*2.4)+'" y="16" font-size="15">March 13: 1.71 million</text>';
  [[0,"Mar. 13"],[19,"Apr. 1"],[32,"Apr. 14"],[46,"Apr. 28"]].forEach(function(d){s+='<text x="'+(pad+d[0]*bw+bw/2)+'" y="'+(h+20)+'" font-size="14" font-weight="700" text-anchor="'+(d[0]===0?"start":d[0]===46?"end":"middle")+'">'+d[1]+"</text>"});
  var el=document.createElementNS(NS,"svg");el.setAttribute("viewBox","0 -4 "+w+" "+(h+30));el.setAttribute("role","img");el.setAttribute("aria-label","TSA checkpoint screenings fell from 1.71 million on March 13, 2020 to 87,534 on April 14, 2020.");el.innerHTML=s;box.appendChild(el);
  var ct=box.querySelector(".tip"),d0=new Date(2020,2,13);
  el.addEventListener("pointermove",function(ev){var i=ev.target.getAttribute&&ev.target.getAttribute("data-i");if(i==null){ct.style.display="none";return}var d=new Date(d0.getTime()+i*864e5),r=box.getBoundingClientRect();
    ct.textContent=d.toLocaleDateString("en-US",{month:"long",day:"numeric"})+": "+TSA[i].toLocaleString("en-US")+" screened";ct.style.left=Math.min(Math.max(ev.clientX-r.left,90),r.width-90)+"px";ct.style.top=(ev.clientY-r.top)+"px";ct.style.display="block"});
  el.addEventListener("pointerleave",function(){ct.style.display="none"})}

function go(){[["nid-gs",0],["nid-gs-home",1]].forEach(function(x){var b=document.getElementById(x[0]);if(b&&!b.getAttribute("data-on")){b.setAttribute("data-on","1");mount(b,!!x[1])}});
  var c=document.getElementById("nid-gs-2020");if(c&&!c.getAttribute("data-on")){c.setAttribute("data-on","1");tsa(c)}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
})();
