(function(){
var T=[["What they want","Share who say it is extremely or very important that a partner...",[["Is caring and compassionate",82,93,88],["Is romantic",68,82,75],["Helps with household chores",62,78,71],["Believes in God",62,76,69],["Is financially stable",50,81,66],["Has a close relationship with their family",42,59,51],["Wants to have children",32,36,34],["Has a college degree",16,22,19]],100],["Dealbreakers","Share who would probably or definitely not consider a relationship with someone who...",[["Has a significant amount of debt",48,64,56],["Lives far away",40,46,43],["Is raising children from another relationship",40,36,38],["Has different religious views",30,45,38],["Does not vote",26,42,34],["Makes significantly less money",18,42,31],["Is of a different race or ethnicity",11,19,15],["Makes significantly more money",12,10,11]],80],["Why they are single","Share who say it is a major reason they are not in a relationship",[["Haven't had luck with dating or relationships",30,40,35],["Just like being single",25,23,24],["Not financially stable enough",30,19,24],["Feel like no one would be interested in them",22,17,20],["Too busy",20,15,18],["Not ready after ending a relationship",20,15,18],["Just like dating without commitment",14,15,14],["Feel like they are too old",7,7,7]],60]];
var G='#007a55',TAN='#b98a4e',INK='#13241b',SUB='#4a5550',ID='#nid-dating';
function go(){var b=document.getElementById('nid-dating');if(!b)return;
var css=ID+'{max-width:700px;margin:2.2em auto;font-family:Georgia,"Times New Roman",serif;color:'+INK+'}'+
ID+' .hd{text-align:center;margin-bottom:8px}'+ID+' .hd b{display:block;font-size:1.25em}'+ID+' .hd span{font-size:.92em;color:'+SUB+';font-style:italic}'+
ID+' .tg{display:flex;justify-content:center;gap:6px;margin:10px 0;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;flex-wrap:wrap}'+
ID+' .tg button{font:inherit;font-size:13px;padding:6px 14px;border-radius:999px;border:1px solid #cfd9d3;background:#fff;color:'+INK+';cursor:pointer}'+
ID+' .tg button.on{background:'+G+';border-color:'+G+';color:#fff}'+
ID+' .key{text-align:center;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:13px;color:'+SUB+';margin-bottom:6px}'+ID+' .key i{display:inline-block;width:11px;height:11px;border-radius:50%;margin:0 6px 0 14px;vertical-align:-1px}'+
ID+' .sub{text-align:center;font-size:.95em;color:'+SUB+';font-style:italic;margin:2px 0 10px;min-height:2.6em}'+
ID+' .rw{display:grid;grid-template-columns:42% 1fr;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #eef2ef;cursor:default}'+
ID+' .rw .lb{font-size:.98em;line-height:1.25;text-align:right}'+
ID+' .tr{position:relative;height:30px}'+ID+' .tr .ln{position:absolute;top:13px;height:5px;border-radius:3px;background:#d5ddd8;transition:left .5s,width .5s}'+
ID+' .tr .dt{position:absolute;top:6px;width:18px;height:18px;border-radius:50%;margin-left:-9px;transition:left .5s}'+
ID+' .tr .nm{position:absolute;top:5px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:13px;font-weight:700;transition:left .5s;white-space:nowrap}'+
ID+' .nt{font-size:12px;color:'+SUB+';margin-top:10px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;text-align:center}'+
'@media(max-width:560px){'+ID+' .rw{grid-template-columns:1fr}'+ID+' .rw .lb{text-align:left}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
b.innerHTML='<div class="hd"><b>Where Single Black Men And Women Agree And Differ</b><span>Single Black adults who are looking for a relationship or dates</span></div><div class="tg"></div><div class="sub"></div><div class="key"><i style="background:'+G+'"></i>Women<i style="background:'+TAN+'"></i>Men</div><div class="rows"></div><div class="nt">Source: Pew Research Center survey of 4,271 Black adults, June 16 to 29, 2025. Rows are sorted by the gap between women and men.</div>';
var tg=b.querySelector('.tg'),rows=b.querySelector('.rows'),sub=b.querySelector('.sub');
function show(k){var t=T[k];[].forEach.call(tg.children,function(o,i){o.classList.toggle('on',i===k)});sub.textContent=t[1];
var rs=t[2].slice().sort(function(a,c){return Math.abs(c[2]-c[1])-Math.abs(a[2]-a[1])}),mx=t[3];rows.innerHTML='';
rs.forEach(function(r){var m=r[1],w=r[2],lo=Math.min(m,w),hi=Math.max(m,w),d=document.createElement('div');d.className='rw';
var P=function(v){return (v/mx*86+7)+'%'};
d.innerHTML='<div class="lb">'+r[0]+'</div><div class="tr"><div class="ln" style="left:'+P(lo)+';width:0"></div><div class="dt" style="background:'+TAN+';left:'+P(lo)+'"></div><div class="dt" style="background:'+G+';left:'+P(lo)+'"></div><div class="nm a"></div><div class="nm c"></div></div>';
rows.appendChild(d);var ln=d.querySelector('.ln'),ds=d.querySelectorAll('.dt'),na=d.querySelector('.nm.a'),nc=d.querySelector('.nm.c');
var loM=m<=w;na.textContent=lo+'%';na.style.color=loM?TAN:G;na.style.left='calc('+P(lo)+' - 46px)';nc.textContent=hi+'%';nc.style.color=loM?G:TAN;nc.style.left='calc('+P(hi)+' + 14px)';
if(hi-lo<5){na.style.display='none';nc.textContent=m+'% men, '+w+'% women';nc.style.color=SUB;nc.style.fontWeight='400'}
setTimeout(function(){ln.style.width=((hi-lo)/mx*86)+'%';ds[0].style.left=P(m);ds[1].style.left=P(w)},40)})}
T.forEach(function(t,k){var bt=document.createElement('button');bt.textContent=t[0];bt.addEventListener('click',function(){show(k)});tg.appendChild(bt)});
show(0);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
