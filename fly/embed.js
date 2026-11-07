(function(){
var CAR=0.509e-8, AIR=1.15e-11, ROAD=1.2;
var P=[["Atlanta \u2192 New York",760],["Dallas \u2192 Chicago",802],["Houston \u2192 Denver",862],["Los Angeles \u2192 Seattle",954],["Chicago \u2192 Orlando",1005],["New York \u2192 Los Angeles",2475]];
var NAVY='#1f3a5f',TERRA='#c0583f',INK='#14211b',SUB='#4a5550';
function fmt(n){return Math.round(n).toLocaleString('en-US')}
function odds(p){var n=1/p;if(n>=1e6){var m=n/1e6;return (m>=10?Math.round(m):m.toFixed(1))+' million'}return fmt(Math.round(n/1000)*1000)}
function go(){var b=document.getElementById('nid-fly-calc');if(!b)return;
var css='#nid-fly-calc{max-width:680px;margin:2.4em auto;border:1px solid #e6e3dd;border-radius:12px;overflow:hidden;font-family:Georgia,"Times New Roman",serif;color:'+INK+';background:#fff}'+
'#nid-fly-calc .h{padding:20px 22px 16px;background:linear-gradient(180deg,#1f3a5f 0%,#3d5a80 55%,#e6a15c 100%);color:#fff}'+
'#nid-fly-calc .h b{font-size:1.25em;display:block}#nid-fly-calc .h span{font-size:.9em;opacity:.92}'+
'#nid-fly-calc .bd{padding:18px 22px 20px}#nid-fly-calc .pr{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}'+
'#nid-fly-calc .pr button{font:inherit;font-size:.82em;padding:5px 10px;border:1px solid #cfd6dc;border-radius:999px;background:#f6f7f8;color:'+INK+';cursor:pointer}'+
'#nid-fly-calc .pr button.on{background:'+NAVY+';color:#fff;border-color:'+NAVY+'}'+
'#nid-fly-calc label{display:block;font-size:.92em;margin:10px 0 2px}#nid-fly-calc label b{color:'+NAVY+'}'+
'#nid-fly-calc input[type=range]{width:100%;accent-color:'+NAVY+'}'+
'#nid-fly-calc .row{margin-top:16px}#nid-fly-calc .lab{display:flex;justify-content:space-between;align-items:baseline;font-size:.95em;gap:10px}'+
'#nid-fly-calc .lab strong{font-size:1.35em}#nid-fly-calc .lab span:last-child{white-space:nowrap}#nid-fly-calc .bar{height:22px;background:#f1efeb;border-radius:4px;margin-top:5px;display:flex;overflow:hidden}'+
'#nid-fly-calc .bar i{display:block;height:100%}#nid-fly-calc .key{font-size:.8em;color:'+SUB+';margin-top:5px}'+
'#nid-fly-calc .key em{display:inline-block;width:10px;height:10px;border-radius:2px;margin:0 4px 0 8px;vertical-align:-1px}'+
'#nid-fly-calc .big{margin-top:18px;padding:14px 16px;background:#f6f4f0;border-radius:8px;font-size:1em;line-height:1.45}'+
'#nid-fly-calc .big strong{color:'+NAVY+'}#nid-fly-calc .ft{font-size:.75em;color:'+SUB+';margin-top:12px;line-height:1.4}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
b.innerHTML='<div class="h"><b>Your holiday trip: drive it or fly it?</b><span>Pick a trip or slide to your own distance</span></div><div class="bd"><div class="pr"></div>'+
'<label>Flight distance: <b class="vm"></b> miles (about <span class="vr"></span> miles by road)</label><input type="range" class="m" min="100" max="2800" step="1" value="802">'+
'<label>Driving to and from the airports, both ends combined: <b class="va"></b> miles</label><input type="range" class="a" min="0" max="120" step="2" value="40">'+
'<div class="row"><div class="lab"><span>Drive the whole way</span><span>1 in <strong class="od" style="color:'+TERRA+'"></strong></span></div><div class="bar"><i class="bd1" style="background:'+TERRA+'"></i></div></div>'+
'<div class="row"><div class="lab"><span>Fly, plus the drives to the airport</span><span>1 in <strong class="of" style="color:'+NAVY+'"></strong></span></div><div class="bar"><i class="bf1" style="background:'+TERRA+';opacity:.55"></i><i class="bf2" style="background:'+NAVY+'"></i></div>'+
'<div class="key"><em style="background:'+TERRA+';opacity:.55"></em>airport drives<em style="background:'+NAVY+'"></em>the flight</div></div>'+
'<div class="big"></div><div class="ft">Odds of dying on the trip, for one traveler, at average U.S. death rates per passenger-mile: 5.1 per billion miles in cars and light trucks (2015\u20132024) and 0.012 per billion on U.S. airlines (2016\u20132025, including the January 2025 D.C. collision). Road distance assumed to be 1.2 times the flight distance. Bars are drawn to the same scale.</div></div>';
var q=function(s){return b.querySelector(s)},pr=q('.pr');
P.forEach(function(p){var x=document.createElement('button');x.type='button';x.textContent=p[0];x.onclick=function(){q('.m').value=p[1];up()};x.dataset.m=p[1];pr.appendChild(x)});
function up(){var m=+q('.m').value,a=+q('.a').value,r=m*ROAD;
var pd=r*CAR,pg=a*CAR,pa=m*AIR,pf=pg+pa;
q('.vm').textContent=fmt(m);q('.vr').textContent=fmt(Math.round(r/10)*10);q('.va').textContent=a;
q('.od').textContent=odds(pd);q('.of').textContent=odds(pf);
q('.bd1').style.width='100%';
var wg=pg/pd*100,wa=pa/pd*100;q('.bf1').style.width=wg+'%';q('.bf2').style.width=Math.max(wa,0.6)+'%';
var eq=pa/CAR;var times=pd/pf;
q('.big').innerHTML='For this trip, flying is about <strong>'+(times>=100?fmt(Math.round(times/10)*10):times.toFixed(0))+' times</strong> safer than driving. '+
(a>0?'Most of the flying risk is in the car: the airport drives account for <strong>'+Math.round(pg/pf*100)+'%</strong> of it. ':'')+
'The flight itself carries about the same risk as driving <strong>'+(eq<10?eq.toFixed(1):fmt(eq))+' miles</strong>.';
[].forEach.call(pr.children,function(x){x.className=(+x.dataset.m===m)?'on':''});}
q('.m').oninput=up;q('.a').oninput=up;up();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
