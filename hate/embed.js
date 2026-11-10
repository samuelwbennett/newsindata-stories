(function(){
var S=[["AL","Alabama",6,7,10,183,147,2.9,26,99],["AK","Alaska",0,0,8,32,24,3.3,21,100],["AZ","Arizona",5,2,276,215,245,3.3,19,98],["AR","Arkansas",5,5,5,10,28,0.9,50,98],["CA","California",4,1,837,2018,1948,4.9,8,100],["CO","Colorado",4,3,107,268,205,3.4,16,99],["CT","Connecticut",3,10,93,99,96,2.6,32,100],["DE","Delaware",4,10,11,19,14,1.3,47,100],["DC","District of Columbia",5,9,65,169,145,20.9,1,100],["FL","Florida",7,8,72,214,208,1.0,49,85],["GA","Georgia",6,8,44,95,131,1.3,48,91],["HI","Hawaii",7,0,0,84,40,2.8,27,100],["ID","Idaho",2,2,34,57,41,2.0,39,99],["IL","Illinois",2,6,90,385,376,3.1,22,95],["IN","Indiana",3,6,63,170,165,2.7,31,88],["IA","Iowa",3,5,6,65,85,2.7,29,97],["KS","Kansas",5,4,62,116,107,3.8,13,95],["KY","Kentucky",4,6,188,131,109,2.4,35,100],["LA","Louisiana",6,5,38,67,86,2.4,34,78],["ME","Maine",0,11,38,44,55,3.9,11,99],["MD","Maryland",4,9,41,261,277,4.4,10,100],["MA","Massachusetts",2,11,411,472,432,6.1,6,100],["MI","Michigan",2,8,309,478,452,4.6,9,97],["MN","Minnesota",2,5,109,228,224,3.8,12,100],["MS","Mississippi",6,6,0,18,59,2.5,33,82],["MO","Missouri",4,5,100,252,216,3.5,14,99],["MT","Montana",2,3,45,11,4,0.3,51,100],["NE","Nebraska",4,4,19,45,33,1.6,44,99],["NV","Nevada",3,2,58,139,248,7.6,4,100],["NH","New Hampshire",1,11,13,31,41,2.9,25,100],["NJ","New Jersey",3,9,330,1221,752,8.1,2,98],["NM","New Mexico",5,3,13,60,54,2.7,30,94],["NY","New York",2,9,500,915,654,3.3,17,99],["NC","North Carolina",5,7,161,287,375,3.4,15,97],["ND","North Dakota",2,4,36,22,26,3.3,18,99],["OH","Ohio",3,7,416,380,364,3.3,20,94],["OK","Oklahoma",6,4,37,82,88,2.1,38,100],["OR","Oregon",3,1,65,334,318,7.6,3,98],["PA","Pennsylvania",3,8,57,276,195,1.5,45,99],["RI","Rhode Island",2,10,18,21,26,2.4,36,99],["SC","South Carolina",5,8,55,123,93,1.7,43,96],["SD","South Dakota",3,4,16,25,19,2.3,37,90],["TN","Tennessee",5,6,221,99,104,1.4,46,100],["TX","Texas",7,4,191,471,625,2.0,41,99],["UT","Utah",4,2,47,82,96,2.7,28,99],["VT","Vermont",1,10,8,33,44,6.8,5,100],["VA","Virginia",4,8,158,346,263,3.0,24,100],["WA","Washington",2,1,275,489,450,5.8,7,98],["WV","West Virginia",4,7,41,64,48,3.1,23,88],["WI","Wisconsin",2,7,43,119,109,1.9,42,97],["WY","Wyoming",3,3,2,23,11,2.0,40,92]];
var G='#007a55',INK='#13241b',SUB='#4a5550';
function chCol(v){return v<=-25?'#0b4a33':v<=-10?'#2e8b62':v<0?'#8fcbb0':v<25?'#e3d3bb':'#cfae84'}
function rtCol(v){return v<1.5?'#e6f2ec':v<2.5?'#c3e0d0':v<3.5?'#8cc5a9':v<5?'#4ea47f':v<8?'#1f7f58':'#0b4a33'}
function pct(a,b){return a?Math.round((b-a)/a*100):null}
function fmt(n){return n.toLocaleString('en-US')}
function sg(v){return v==null?'n/a':(v>0?'+':v<0?'\u2212':'')+Math.abs(v)+'%'}
function go(){var b=document.getElementById('nid-hate-map');if(!b)return;
var PY=1.22,R0=0.40,NS='http://www.w3.org/2000/svg';
var css='#nid-hate-map{max-width:680px;margin:2.2em auto;font-family:Georgia,"Times New Roman",serif;color:'+INK+'}'+
'#nid-hate-map .hd{text-align:center;margin-bottom:10px}#nid-hate-map .hd b{display:block;font-size:1.25em}#nid-hate-map .hd span{font-size:.92em;color:'+SUB+';font-style:italic}'+
'#nid-hate-map .tg{display:flex;justify-content:center;gap:6px;margin:10px 0 8px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}'+
'#nid-hate-map .tg button{font:inherit;font-size:13px;padding:6px 14px;border-radius:999px;border:1px solid #cfd9d3;background:#fff;color:'+INK+';cursor:pointer}'+
'#nid-hate-map .tg button.on{background:'+G+';border-color:'+G+';color:#fff}'+
'#nid-hate-map svg{width:100%;height:auto;display:block;overflow:visible}'+
'#nid-hate-map .s{cursor:pointer}#nid-hate-map .s .d{transition:r .9s cubic-bezier(.3,1.4,.5,1),fill .5s}'+
'#nid-hate-map .s .rg{fill:none;stroke:'+INK+';stroke-opacity:.5;stroke-width:.012;stroke-dasharray:.035 .03}'+
'#nid-hate-map .s.sel .rg,#nid-hate-map .s:hover .rg{stroke-opacity:1;stroke-width:.03;stroke-dasharray:none}'+
'#nid-hate-map .s text{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;text-anchor:middle;pointer-events:none;letter-spacing:0!important;word-spacing:0!important}'+
'#nid-hate-map .s .ab{font-size:.26px;font-weight:700;paint-order:stroke;stroke-linejoin:round}#nid-hate-map .s .vl{font-size:.2px;font-weight:700;paint-order:stroke;stroke:#fff;stroke-width:.06px;stroke-linejoin:round}'+
'#nid-hate-map .card{margin-top:10px;padding:14px 16px;border:1px solid #e3eee7;border-radius:10px;background:#f7faf8;min-height:92px}'+
'#nid-hate-map .card h4{margin:0 0 6px;font-size:1.15em}#nid-hate-map .card .row{display:flex;flex-wrap:wrap;gap:18px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:13px;color:'+SUB+'}'+
'#nid-hate-map .card .row div b{display:block;font-family:Georgia,serif;font-size:22px;color:'+INK+'}'+
'#nid-hate-map .lg{text-align:center;margin-top:4px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:12px;color:'+SUB+'}'+
'#nid-hate-map .nt{font-size:12px;color:'+SUB+';margin-top:8px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
b.innerHTML='<div class="hd"><b>Find your state</b><span>Tap or hover over a state</span></div><div class="tg"><button data-m="ch" class="on">Change, 2024 to 2025</button><button data-m="rt">Rate per 100,000, 2025</button></div><svg viewBox="-0.2 -0.2 12.4 10.1"></svg><div class="lg"></div><div class="card"></div><div class="nt">Incidents reported by law enforcement agencies to the FBI. Rates use the population those agencies cover. Circle sizes are capped at double the ring. Big swings in small states can reflect a handful of incidents or changes in reporting.</div>';
var svg=b.querySelector('svg'),card=b.querySelector('.card'),lg=b.querySelector('.lg'),mode='ch',sel=null,grown=false;
function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
var N={};
S.slice().sort(function(a,c){return c[6]/c[5]-a[6]/a[5]}).forEach(function(s){var x=s[3]+0.5,y=s[2]*PY+0.5;var g=el('g',{'class':'s'},svg);
var d=el('circle',{'class':'d',cx:x,cy:y,r:R0},g);el('circle',{'class':'rg',cx:x,cy:y,r:R0},g);
var ab=el('text',{'class':'ab',x:x,y:y+0.09},g);ab.textContent=s[0];var vl=el('text',{'class':'vl',x:x,y:y},g);
N[s[0]]={g:g,d:d,ab:ab,vl:vl,y:y};
g.addEventListener('mouseenter',function(){show(s)});g.addEventListener('click',function(){if(sel)N[sel].g.classList.remove('sel');sel=s[0];g.classList.add('sel');show(s)});});
function paint(){S.forEach(function(s){var n=N[s[0]],v,c,r,dark,small;
if(mode==='ch'){v=pct(s[5],s[6]);c=chCol(v);r=grown?R0*Math.sqrt(Math.min(s[6]/s[5],2)):R0;dark=v<=-10;n.vl.textContent=sg(v);n.vl.setAttribute('fill',v<0?G:'#8a6a3c')}
else{v=s[7];c=rtCol(v);r=grown?R0*Math.sqrt(Math.min(v/3.3,2)):R0;dark=v>=3.5;n.vl.textContent=v.toFixed(1);n.vl.setAttribute('fill',INK)}
small=r<R0*0.75;n.d.setAttribute('r',r);n.d.style.r=r+'px';n.d.setAttribute('fill',c);n.ab.setAttribute('fill',(dark&&!small)?'#fff':INK);n.ab.setAttribute('stroke',small?'#fff':'none');n.ab.setAttribute('stroke-width',small?'.07':'0');
n.vl.setAttribute('y',n.y+Math.max(r,R0)+0.24)});
lg.textContent=mode==='ch'?'Dashed ring: 2024 level. Green circles shrank, tan circles grew.':'Dashed ring: U.S. rate of 3.3. Bigger, darker circles have higher rates.'}
function show(s){var v=pct(s[5],s[6]);card.innerHTML='<h4>'+s[1]+'</h4><div class="row"><div><b>'+fmt(s[6])+'</b>incidents in 2025</div><div><b style="color:'+(v<0?G:'#9a6f3a')+'">'+sg(v)+'</b>vs. 2024 ('+fmt(s[5])+')</div><div><b>'+s[7].toFixed(1)+'</b>per 100,000 (rank '+s[8]+' of 51)</div><div><b>'+fmt(s[4])+'</b>in 2015</div></div>'}
[].forEach.call(b.querySelectorAll('.tg button'),function(x){x.onclick=function(){mode=x.dataset.m;[].forEach.call(b.querySelectorAll('.tg button'),function(y){y.classList.toggle('on',y===x)});paint()}});
paint();show(S.filter(function(s){return s[0]==='NJ'})[0]);
function grow(){if(grown)return;grown=true;paint()}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){setTimeout(grow,350);io.disconnect()}},{threshold:.4});io.observe(svg)}else grow();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
