(function(){
var S=[["GA","Georgia",6,8,89.1,93.1,25,10],["OH","Ohio",3,7,88.1,92.4,211,40],["TX","Texas",7,4,93.2,96.9,192,803],["IN","Indiana",3,6,90.1,94.4,136,10],["AL","Alabama",6,7,94.3,86.6,2,1],["KS","Kansas",5,4,null,90.0,5,91],["TN","Tennessee",5,6,94.4,96.8,11,8],["IL","Illinois",2,6,92.8,96.6,29,14],["MO","Missouri",4,5,89.5,94.6,24,6],["CA","California",4,1,95.7,96.5,55,26],["CO","Colorado",4,3,87.7,91.1,26,35],["KY","Kentucky",4,6,91.1,93.1,212,13],["SC","South Carolina",5,8,93.4,95.0,670,333],["LA","Louisiana",6,5,90.3,95.6,1,3],["NM","New Mexico",5,3,95.1,97.0,18,100],["MS","Mississippi",6,6,97.0,99.1,0,0],["FL","Florida",7,8,88.9,93.5,149,8],["DE","Delaware",4,10,93.5,null,25,0],["AR","Arkansas",5,5,91.5,94.3,0,8],["NC","North Carolina",5,7,93.7,95.5,22,2],["MI","Michigan",2,8,90.9,94.8,22,29],["AZ","Arizona",5,2,87.4,92.8,110,222],["OK","Oklahoma",6,4,87.8,93.0,1,17],["VA","Virginia",4,8,93.6,94.6,184,6],["WI","Wisconsin",2,7,85.1,92.8,505,36],["RI","Rhode Island",2,10,96.7,97.7,1,1],["WA","Washington",2,1,90.6,94.4,58,11],["IA","Iowa",3,5,88.9,93.2,50,9],["UT","Utah",4,2,87.2,92.7,536,189],["NV","Nevada",3,2,90.8,95.4,0,2],["MN","Minnesota",2,5,85.7,92.6,160,26],["NE","Nebraska",4,4,92.8,96.3,1,5],["CT","Connecticut",3,10,98.6,96.2,3,1],["ID","Idaho",2,2,75.2,89.1,4,14],["ND","North Dakota",2,4,88.5,94.8,38,36],["SD","South Dakota",3,4,89.3,96.0,11,16],["MA","Massachusetts",2,11,96.5,97.3,2,0],["DC","District of Columbia",5,9,94.4,null,1,0],["NJ","New Jersey",3,9,92.5,95.9,2,12],["MD","Maryland",4,9,96.6,97.9,67,3],["WY","Wyoming",3,3,92.6,94.5,2,15],["WV","West Virginia",4,7,98.9,98.2,2,0],["PA","Pennsylvania",3,8,92.7,96.6,1529,16],["NY","New York",2,9,97.7,98.6,217,41],["OR","Oregon",3,1,89.6,93.4,57,1],["MT","Montana",2,3,null,93.6,8,36],["HI","Hawaii",7,0,89.3,89.7,0,2],["ME","Maine",0,11,98.0,94.1,6,0],["VT","Vermont",1,10,93.8,94.5,3,2],["NH","New Hampshire",1,11,88.2,91.5,0,0],["AK","Alaska",0,0,89.9,null,1,4]];
var G='#007a55',T='#b98a4e',INK='#13241b',SUB='#4a5550',ID='#nid-measles';
function fmt(n){return n.toLocaleString('en-US')}
function go(){var b=document.getElementById('nid-measles');if(!b)return;
var PY=1.36,C=0.062,RD=0.038,GA=2.399963,NS='http://www.w3.org/2000/svg',SF='-apple-system,"Helvetica Neue",Arial,sans-serif';
var css=ID+'{max-width:700px;margin:2.2em auto;font-family:Georgia,"Times New Roman",serif;color:'+INK+'}'+
ID+' .hd{text-align:center;margin-bottom:8px}'+ID+' .hd b{display:block;font-size:1.25em}'+ID+' .hd span{font-size:.92em;color:'+SUB+';font-style:italic}'+
ID+' .tg{display:flex;justify-content:center;gap:6px;margin:10px 0 4px;font-family:'+SF+';flex-wrap:wrap;align-items:center}'+
ID+' .tg button,'+ID+' .tg select{font:inherit;font-size:13px;padding:6px 14px;border-radius:999px;border:1px solid #cfd9d3;background:#fff;color:'+INK+';cursor:pointer}'+
ID+' .tg button.on{background:'+INK+';border-color:'+INK+';color:#fff}'+
ID+' .key{text-align:center;font-family:'+SF+';font-size:13px;color:'+SUB+';margin:6px 0 2px}'+ID+' .key i{display:inline-block;width:9px;height:9px;border-radius:50%;margin:0 6px 0 12px}'+
ID+' svg{width:100%;height:auto;display:block;overflow:visible}'+
ID+' .s{cursor:pointer}'+ID+' .s .hit{fill:#fff;fill-opacity:0;stroke:'+G+';stroke-opacity:0;stroke-width:.02}'+
ID+' .s.sel .hit,'+ID+' .s:hover .hit{stroke-opacity:.9;fill:#f7f5ef;fill-opacity:1}'+
ID+' .s .dt{transition:opacity .35s}'+
ID+' .s text{font-family:'+SF+';pointer-events:none;letter-spacing:0!important;word-spacing:0!important;font-size:.23px}'+
ID+' .s .ab{font-weight:700;text-anchor:end;fill:'+INK+'}'+ID+' .s .vl{text-anchor:start;font-weight:700}'+
ID+' .card{margin-top:10px;padding:14px 16px;border:1px solid #e3eee7;border-radius:10px;background:#f7faf8;min-height:92px}'+
ID+' .card h4{margin:0 0 6px;font-size:1.15em}'+ID+' .card .row{display:flex;flex-wrap:wrap;gap:18px;font-family:'+SF+';font-size:13px;color:'+SUB+'}'+
ID+' .card .row div{max-width:150px}'+ID+' .card .row div b{display:block;font-family:Georgia,serif;font-size:22px;color:'+INK+'}'+
ID+' .card p{margin:8px 0 0;font-size:.95em;line-height:1.4}'+
ID+' .nt{font-size:12px;color:'+SUB+';margin-top:8px;font-family:'+SF+'}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var opts=S.slice().sort(function(a,c){return a[1]<c[1]?-1:1}).map(function(s){return '<option value="'+s[0]+'">'+s[1]+'</option>'}).join('');
b.innerHTML='<div class="hd"><b>Find Your State</b><span>Kindergarten measles vaccination in the 2025-26 school year and confirmed measles cases in 2026. Tap a state.</span></div><div class="tg"><button data-m="v" class="on">Unvaccinated kindergartners</button><button data-m="c">Cases in 2026</button><select aria-label="Choose a state">'+opts+'</select></div><div class="key"></div><svg viewBox="0 -0.75 12 11.25"></svg><div class="card"></div><div class="nt">Source: CDC, cases through Nov. 12, 2026; SchoolVaxView for vaccination. A statewide rate can hide schools and towns with far lower coverage. New York includes New York City.</div>';
var svg=b.querySelector('svg'),card=b.querySelector('.card'),key=b.querySelector('.key'),pick=b.querySelector('select'),mode='v',sel=null,shown=false;
function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
var N={};
function cnt(s){return mode==='v'?(s[4]==null?0:Math.floor(100-s[4]+0.5+1e-9)):Math.min(80,Math.ceil(s[6]/40))}
function col(s){return mode==='v'?(s[4]!=null&&s[4]>=95?G:T):G}
function choose(s){if(sel)N[sel].g.classList.remove('sel');sel=s[0];N[sel].g.classList.add('sel');pick.value=s[0];show(s)}
S.forEach(function(s){var x=s[3]+0.5,y=s[2]*PY;var g=el('g',{'class':'s'},svg);
el('rect',{'class':'hit',x:x-0.5,y:y-0.56,width:1,height:1.3,rx:.08},g);
var dots=[];for(var k=0;k<80;k++){var r=C*Math.sqrt(k+0.5),t=k*GA;dots.push(el('circle',{'class':'dt',cx:(x+r*Math.cos(t)).toFixed(3),cy:(y-r*Math.sin(t)).toFixed(3),r:RD,opacity:0},g))}
var ab=el('text',{'class':'ab',x:x-0.04,y:y+0.66},g);ab.textContent=s[0];var vl=el('text',{'class':'vl',x:x+0.04,y:y+0.66},g);
N[s[0]]={g:g,dots:dots,vl:vl};
g.addEventListener('mouseenter',function(){show(s)});g.addEventListener('click',function(){choose(s)});});
function lab(s){return mode==='v'?(s[4]==null?'n/a':String(Math.floor(100-s[4]+0.5+1e-9))):(s[6]>=1000?(s[6]/1000).toFixed(1)+'k':String(s[6]))}
function paint(){key.innerHTML=mode==='v'?'<i style="background:'+T+'"></i>= 1 kindergartner in 100 without the MMR vaccine<i style="background:'+G+'"></i>5 or fewer, the target':'<i style="background:'+G+'"></i>= 40 confirmed cases in 2026 (any count from 1 to 40 shows one dot)';
S.forEach(function(s){var n=N[s[0]],c=shown?cnt(s):0,cl=col(s);
n.dots.forEach(function(d,k){d.style.transitionDelay=(k<c?k*10:0)+'ms';d.setAttribute('fill',cl);d.setAttribute('opacity',k<c?1:0)});
n.vl.textContent=lab(s);n.vl.setAttribute('fill',s[4]==null&&mode==='v'?SUB:cl)})}
function show(s){var v=s[4],h='<h4>'+s[1]+'</h4><div class="row">';
h+=v==null?'<div><b>n/a</b>did not report 2025-26 vaccination</div>':'<div><b style="color:'+(v>=95?G:T)+'">'+v.toFixed(1)+'%</b>of kindergartners had MMR shots, 2025-26</div>';
if(s[5]!=null)h+='<div><b>'+s[5].toFixed(1)+'%</b>in 2019-20</div>';
h+='<div><b>'+fmt(s[6])+'</b>measles '+(s[6]===1?'case':'cases')+' in 2026</div><div><b>'+fmt(s[7])+'</b>in all of 2025</div></div>';
if(v!=null)h+='<p>'+(v>=95?'At or above the 95% target.':'About '+Math.floor(100-v+0.5+1e-9)+' in 100 kindergartners lack the vaccine, against a target of 5 or fewer.')+(s[5]!=null?' Coverage is '+(v<s[5]?'down ':'up ')+Math.abs(v-s[5]).toFixed(1)+' points since 2019-20.':'')+'</p>';
card.innerHTML=h}
[].forEach.call(b.querySelectorAll('.tg button'),function(bt){bt.addEventListener('click',function(){mode=bt.getAttribute('data-m');[].forEach.call(b.querySelectorAll('.tg button'),function(o){o.classList.toggle('on',o===bt)});paint()})});
pick.addEventListener('change',function(){for(var i=0;i<S.length;i++)if(S[i][0]===pick.value)choose(S[i])});
var first=S.filter(function(s){return s[0]==='ID'})[0];paint();choose(first);
function grow(){if(shown)return;shown=true;paint()}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){setTimeout(grow,300);io.disconnect()}},{threshold:.3});io.observe(svg)}else grow();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();

(function(){
var Y=[[2000,85],[2001,116],[2002,44],[2003,56],[2004,37],[2005,66],[2006,55],[2007,43],[2008,140],[2009,72],[2010,63],[2011,220],[2012,55],[2013,187],[2014,667],[2015,191],[2016,86],[2017,120],[2018,381],[2019,1274],[2020,13],[2021,49],[2022,121],[2023,59],[2024,285],[2025,2289],[2026,5412]];
var G='#007a55',LT='#9fd1b8',INK='#13241b',SUB='#4a5550';
function fmt(n){return n.toLocaleString('en-US')}
function mk(idn,home){var ID='#'+idn,b=document.getElementById(idn);if(!b||b.getAttribute('data-on'))return;b.setAttribute('data-on','1');
var NS='http://www.w3.org/2000/svg',SF='-apple-system,"Helvetica Neue",Arial,sans-serif',SE='Georgia,"Times New Roman",serif';
var css=ID+'{max-width:760px;margin:1.6em auto 2.2em;font-family:'+SE+';color:'+INK+'}'+ID+'>figure,'+ID+'>a{display:none}'+(home?ID+'{margin:0 auto;max-width:560px}'+ID+' .hd b{font-size:1.15em}'+ID+' .hd span{font-size:.85em}':'')+
ID+' .hd{text-align:center;margin-bottom:4px}'+ID+' .hd b{display:block;font-size:1.5em;line-height:1.2}'+ID+' .hd span{display:block;font-size:.95em;color:'+SUB+';font-style:italic;margin-top:4px}'+
ID+' svg{width:100%;height:auto;display:block;overflow:visible}'+ID+' svg text{letter-spacing:0!important;word-spacing:0!important}'+
ID+' .bar{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0);transition:transform .7s cubic-bezier(.2,.7,.2,1)}'+ID+'.go .bar{transform:scaleY(1)}'+
ID+' .hit{fill:#000;fill-opacity:0;cursor:pointer}'+ID+' .an{opacity:0;transition:opacity .6s}'+ID+'.done .an{opacity:1}'+
ID+' .ax{font-family:'+SF+';font-size:13px;fill:'+SUB+'}'+ID+' .axt{font-family:'+SF+';font-size:13px;font-weight:700;fill:'+INK+'}'+
ID+' .nt{font-family:'+SE+';font-size:15px;font-style:italic;fill:'+SUB+'}'+ID+' .lb{font-family:'+SE+';font-size:15px;font-weight:700;fill:'+INK+'}'+
ID+' .big{font-family:'+SE+';font-size:38px;font-weight:700;fill:'+G+'}'+
ID+' .ft{display:flex;justify-content:space-between;align-items:center;gap:10px;font-family:'+SF+';font-size:13px;color:'+SUB+';margin-top:6px;min-height:30px}'+
ID+' .ft b{color:'+INK+'}'+ID+' .ft button{font:inherit;padding:5px 13px;border-radius:999px;border:1px solid #cfd9d3;background:#fff;color:'+INK+';cursor:pointer;white-space:nowrap}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var w=document.createElement('div');w.innerHTML='<div class="hd"><b>U.S. Measles Cases Per Year, 2000 To 2026</b><span>Confirmed cases reported to the CDC. The 2026 count is already the most since 1991. Data: CDC, updated Nov. 12, 2026</span></div><svg viewBox="0 0 700 640" role="img" aria-label="Column chart of confirmed U.S. measles cases per year from 2000 to 2026, rising to 5,412 in 2026 through Nov. 12."></svg><div class="ft"><span class="rd">Tap or hover over a bar for that year.</span><button type="button">Replay</button></div>';
while(w.firstChild)b.appendChild(w.firstChild);
var svg=b.querySelector('svg'),rd=b.querySelector('.rd'),L=62,R=690,T=20,B=585,MAX=6000,n=Y.length,bw=(R-L)/n;
function el(t,a,txt){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;svg.appendChild(e);return e}
function y(v){return B-(B-T)*v/MAX}
for(var v=0;v<=MAX;v+=1000){el('line',{x1:L,x2:R,y1:y(v),y2:y(v),stroke:v?'#e6ebe8':INK,'stroke-width':1});el('text',{'class':'ax',x:L-8,y:y(v)+4,'text-anchor':'end'},fmt(v))}
var lab=el('text',{'class':'axt',x:16,y:(T+B)/2,'text-anchor':'middle',transform:'rotate(-90 16 '+(T+B)/2+')'},'Confirmed measles cases');
el('text',{'class':'axt',x:(L+R)/2,y:632,'text-anchor':'middle'},'Year');
var bars=[];
Y.forEach(function(d,i){var x=L+i*bw,h=Math.max(1.5,B-y(d[1]));
if(d[0]%5===0)el('text',{'class':'ax',x:x+bw/2,y:B+18,'text-anchor':'middle'},d[0]);
var r=el('rect',{'class':'bar',x:x+bw*.12,y:B-h,width:bw*.76,height:h,fill:d[0]===2026?G:LT});bars.push(r);
var hit=el('rect',{'class':'hit',x:x,y:T,width:bw,height:B-T});
function show(){bars.forEach(function(o,k){o.setAttribute('fill-opacity',k===i?1:.45)});rd.innerHTML='<b>'+d[0]+':</b> '+fmt(d[1])+' confirmed '+(d[1]===1?'case':'cases')+(d[0]===2026?' through Nov. 12':'')}
hit.addEventListener('mouseenter',show);hit.addEventListener('click',show);hit.addEventListener('mouseleave',function(){bars.forEach(function(o){o.setAttribute('fill-opacity',1)})})});
function cx(yr){return L+(yr-2000+.5)*bw}
var A=[];function an(e){e.setAttribute('class',e.getAttribute('class')+' an');A.push(e);return e}
an(el('text',{'class':'nt',x:L+12,y:T+22},'Measles was declared eliminated'));an(el('text',{'class':'nt',x:L+12,y:T+41},'in the U.S. in 2000'));
an(el('text',{'class':'nt',x:cx(2008.5),y:y(2380),'text-anchor':'middle'},'2000 to 2018:'));an(el('text',{'class':'nt',x:cx(2008.5),y:y(2380)+19,'text-anchor':'middle'},'about 140 cases'));an(el('text',{'class':'nt',x:cx(2008.5),y:y(2380)+38,'text-anchor':'middle'},'a year on average'));
an(el('line',{x1:cx(2008.5),x2:cx(2008.5),y1:y(2380)+48,y2:y(330),stroke:'#8a958f','stroke-width':1}));
an(el('text',{'class':'lb',x:cx(2019),y:y(1274)-28,'text-anchor':'middle'},'1,274'));an(el('text',{'class':'lb',x:cx(2019),y:y(1274)-9,'text-anchor':'middle'},'in 2019'));
an(el('text',{'class':'lb',x:cx(2025),y:y(2289)-9,'text-anchor':'middle'},'2,289'));
an(el('text',{'class':'lb',x:cx(2026)-bw*.6,y:y(5412)+16,'text-anchor':'end'},'2026, through Nov. 12'));
var big=el('text',{'class':'big',x:R,y:y(5412)-12,'text-anchor':'end'},'0');big.style.opacity=0;big.style.transition='opacity .3s';
var raf=null,tm=[];
function play(){tm.forEach(clearTimeout);tm=[];if(raf)cancelAnimationFrame(raf);b.classList.remove('go');b.classList.remove('done');big.style.opacity=0;
bars.forEach(function(r,i){r.style.transition='none';r.style.transitionDelay='0ms'});void svg.getBoundingClientRect();
bars.forEach(function(r,i){r.style.transition='';r.style.transitionDelay=(i*95)+'ms';if(i===n-1)r.style.transitionDuration='1.6s'});
b.classList.add('go');var t0=(n-1)*95,dur=1600;
tm.push(setTimeout(function(){big.style.opacity=1;var s=null;function step(ts){if(!s)s=ts;var p=Math.min(1,(ts-s)/dur),e=1-Math.pow(1-p,3);big.textContent=fmt(Math.round(5412*e));if(p<1)raf=requestAnimationFrame(step)}raf=requestAnimationFrame(step)},t0));
tm.push(setTimeout(function(){b.classList.add('done')},t0+dur-300))}
b.querySelector('button').addEventListener('click',play);
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){b.classList.add('go');b.classList.add('done');big.textContent='5,412';big.style.opacity=1;bars.forEach(function(r){r.style.transition='none'})}
else if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){play();io.disconnect()}},{threshold:.45});io.observe(svg)}else play();
}
function go(){mk('nid-measles-top',false);mk('nid-measles-home',true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
