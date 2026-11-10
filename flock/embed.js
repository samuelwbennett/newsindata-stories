(function(){
var S=[["GA","Georgia",6,8,80.0,8944,11180878,1],["OH","Ohio",3,7,51.0,6024,11883304,2],["TX","Texas",7,4,49.0,15318,31290831,3],["IN","Indiana",3,6,48.0,3328,6924275,4],["AL","Alabama",6,7,47.0,2448,5157699,5],["KS","Kansas",5,4,43.0,1272,2970606,6],["TN","Tennessee",5,6,43.0,3083,7227750,7],["IL","Illinois",2,6,42.0,5320,12710158,8],["MO","Missouri",4,5,40.0,2481,6245466,9],["CA","California",4,1,39.0,15450,39431263,10],["CO","Colorado",4,3,36.0,2124,5957493,11],["KY","Kentucky",4,6,35.0,1607,4588372,12],["SC","South Carolina",5,8,35.0,1893,5478831,13],["LA","Louisiana",6,5,34.0,1553,4597740,14],["NM","New Mexico",5,3,33.0,705,2130256,15],["MS","Mississippi",6,6,33.0,968,2943045,16],["FL","Florida",7,8,32.0,7520,23372215,17],["DE","Delaware",4,10,31.0,327,1051917,18],["AR","Arkansas",5,5,31.0,943,3088354,19],["NC","North Carolina",5,7,30.0,3281,11046024,20],["MI","Michigan",2,8,30.0,3001,10140459,21],["AZ","Arizona",5,2,29.0,2231,7582384,22],["OK","Oklahoma",6,4,28.0,1133,4095393,23],["VA","Virginia",4,8,28.0,2433,8811195,24],["WI","Wisconsin",2,7,27.0,1618,5960975,25],["RI","Rhode Island",2,10,26.0,294,1112308,26],["WA","Washington",2,1,25.0,1959,7958180,27],["IA","Iowa",3,5,25.0,796,3241488,28],["UT","Utah",4,2,22.0,787,3503613,29],["NV","Nevada",3,2,22.0,725,3267467,30],["MN","Minnesota",2,5,22.0,1249,5793151,31],["NE","Nebraska",4,4,19.0,380,2005465,32],["CT","Connecticut",3,10,17.0,640,3675069,33],["ID","Idaho",2,2,17.0,337,2001619,34],["ND","North Dakota",2,4,15.0,123,796568,35],["SD","South Dakota",3,4,14.0,133,924669,36],["MA","Massachusetts",2,11,14.0,987,7136171,37],["DC","District of Columbia",5,9,13.0,90,702250,38],["NJ","New Jersey",3,9,12.0,1151,9500851,39],["MD","Maryland",4,9,11.0,718,6263220,40],["WY","Wyoming",3,3,11.0,66,587618,41],["WV","West Virginia",4,7,11.0,189,1769979,42],["PA","Pennsylvania",3,8,11.0,1389,13078751,43],["NY","New York",2,9,10.0,2033,19867248,44],["OR","Oregon",3,1,8.0,324,4272371,45],["MT","Montana",2,3,5.0,58,1137233,46],["HI","Hawaii",7,0,4.0,65,1446146,47],["ME","Maine",0,11,3.0,46,1405012,48],["VT","Vermont",1,10,3.0,19,648493,49],["NH","New Hampshire",1,11,1.0,13,1409032,50],["AK","Alaska",0,0,0.1,1,740133,51]];
var G='#007a55',INK='#13241b',SUB='#4a5550',ID='#nid-flock-map';
function fmt(n){return n.toLocaleString('en-US')}
function go(){var b=document.getElementById('nid-flock-map');if(!b)return;
var PY=1.36,C=0.056,RD=0.034,GA=2.399963,NS='http://www.w3.org/2000/svg';
var css=ID+'{max-width:700px;margin:2.2em auto;font-family:Georgia,"Times New Roman",serif;color:'+INK+'}'+
ID+' .hd{text-align:center;margin-bottom:8px}'+ID+' .hd b{display:block;font-size:1.25em}'+ID+' .hd span{font-size:.92em;color:'+SUB+';font-style:italic}'+
ID+' .tg{display:flex;justify-content:center;gap:6px;margin:10px 0 4px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;flex-wrap:wrap}'+
ID+' .tg button{font:inherit;font-size:13px;padding:6px 14px;border-radius:999px;border:1px solid #cfd9d3;background:#fff;color:'+INK+';cursor:pointer}'+
ID+' .tg button.on{background:'+G+';border-color:'+G+';color:#fff}'+
ID+' .key{text-align:center;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:13px;color:'+SUB+';margin:6px 0 2px}'+ID+' .key i{display:inline-block;width:9px;height:9px;border-radius:50%;background:'+G+';margin-right:6px}'+
ID+' svg{width:100%;height:auto;display:block;overflow:visible}'+
ID+' .s{cursor:pointer}'+ID+' .s .hit{fill:#fff;fill-opacity:0;stroke:'+G+';stroke-opacity:0;stroke-width:.02}'+
ID+' .s.sel .hit,'+ID+' .s:hover .hit{stroke-opacity:.9;fill:#f1f8f4;fill-opacity:1}'+
ID+' .s .dt{fill:'+G+';transition:opacity .35s,r .35s}'+
ID+' .s text{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;pointer-events:none;letter-spacing:0!important;word-spacing:0!important;font-size:.23px}'+
ID+' .s .ab{font-weight:700;text-anchor:end;fill:'+INK+'}'+ID+' .s .vl{text-anchor:start;fill:'+SUB+'}'+ID+' .s .vl.top{fill:'+G+';font-weight:700}'+
ID+' .card{margin-top:10px;padding:14px 16px;border:1px solid #e3eee7;border-radius:10px;background:#f7faf8;min-height:92px}'+
ID+' .card h4{margin:0 0 6px;font-size:1.15em}'+ID+' .card .row{display:flex;flex-wrap:wrap;gap:18px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:13px;color:'+SUB+'}'+
ID+' .card .row div b{display:block;font-family:Georgia,serif;font-size:22px;color:'+INK+'}'+
ID+' .nt{font-size:12px;color:'+SUB+';margin-top:8px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
b.innerHTML='<div class="hd"><b>Flock Cameras Per Resident In The U.S.</b><span>Flock license plate cameras mapped on OpenStreetMap, September 2026. Tap a state.</span></div><div class="tg"><button data-m="r" class="on">Per 100,000 residents</button><button data-m="c">Total cameras</button></div><div class="key"></div><svg viewBox="0 -0.75 12 11.25"></svg><div class="card"></div><div class="nt">Counts come from a volunteer-built map and are likely an undercount. Flock says it has more than 120,000 cameras; this count found 109,577.</div>';
var svg=b.querySelector('svg'),card=b.querySelector('.card'),key=b.querySelector('.key'),mode='r',sel=null,shown=false;
function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
var N={};
function cnt(s,m){return m==='r'?Math.floor(s[4]):Math.round(s[5]/200)}
S.forEach(function(s){var x=s[3]+0.5,y=s[2]*PY;var g=el('g',{'class':'s'},svg);
el('rect',{'class':'hit',x:x-0.5,y:y-0.56,width:1,height:1.3,rx:.08},g);
var dots=[];for(var k=0;k<80;k++){var r=C*Math.sqrt(k+0.5),t=k*GA;dots.push(el('circle',{'class':'dt',cx:(x+r*Math.cos(t)).toFixed(3),cy:(y-r*Math.sin(t)).toFixed(3),r:RD,opacity:0},g))}
var ab=el('text',{'class':'ab',x:x-0.04,y:y+0.66},g);ab.textContent=s[0];var vl=el('text',{'class':'vl',x:x+0.04,y:y+0.66},g);
N[s[0]]={g:g,dots:dots,vl:vl};
g.addEventListener('mouseenter',function(){show(s)});g.addEventListener('click',function(){if(sel)N[sel].g.classList.remove('sel');sel=s[0];g.classList.add('sel');show(s)});});
function lab(s){return mode==='r'?String(s[4]):(s[5]>=1000?(s[5]/1000).toFixed(1)+'k':String(s[5]))}
function paint(){key.innerHTML='<i></i>'+(mode==='r'?'= 1 camera per 100,000 residents':'= 200 cameras');
S.forEach(function(s){var n=N[s[0]],c=shown?Math.min(80,cnt(s,mode)):0;
n.dots.forEach(function(d,k){d.style.transitionDelay=(k<c?k*8:0)+'ms';d.setAttribute('opacity',k<c?1:0)});
n.vl.textContent=lab(s);n.vl.setAttribute('class','vl'+((mode==='r'?s[4]>=47:s[5]>=6000)?' top':''))})}
function show(s){card.innerHTML='<h4>'+s[1]+'</h4><div class="row"><div><b style="color:'+G+'">'+s[4]+'</b>cameras per 100,000 residents</div><div><b>'+fmt(s[5])+'</b>'+(s[5]===1?'camera':'cameras')+' mapped</div><div><b>'+s[7]+' of 51</b>rank per resident</div><div><b>'+(s[6]/1e6).toFixed(1)+'M</b>residents</div></div>'}
[].forEach.call(b.querySelectorAll('.tg button'),function(bt){bt.addEventListener('click',function(){mode=bt.getAttribute('data-m');[].forEach.call(b.querySelectorAll('.tg button'),function(o){o.classList.toggle('on',o===bt)});paint()})});
paint();show(S[0]);N[S[0][0]].g.classList.add('sel');sel=S[0][0];
function grow(){if(shown)return;shown=true;paint()}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){setTimeout(grow,300);io.disconnect()}},{threshold:.3});io.observe(svg)}else grow();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
