(function(){
var D=[[1936.96,"Dec 1936",59,38,null,null,null],[1937.96,"Dec 1937",60,33,null,null,null],[1953.88,"Nov 1953",68,25,69,71,65],[1956.21,"Mar 1956",53,34,59,49,51],[1957.62,"Aug 1957",47,34,47,47,46],[1960.21,"Mar 1960",53,36,54,54,51],[1965.04,"Jan 1965",45,43,49,47,42],[1966.38,"May 1966",42,47,51,41,39],[1967.46,"Jun 1967",54,38,59,54,51],[1969.04,"Jan 1969",51,40,55,50,49],[1971.79,"Oct 1971",49,40,52,54,44],[1972.21,"Mar 1972",50,41,59,44,48],[1972.88,"Nov 1972",57,32,62,59,52],[1976.29,"Apr 1976",66,26,74,66,62],[1978.21,"Mar 1978",62,27,72,61,59],[1981.04,"Jan 1981",66,25,73,66,64],[1985.04,"Jan 1985",72,20,82,71,65],[1985.88,"Nov 1985",75,17,84,76,66],[1986.04,"Jan 1986",70,22,82,69,62],[1988.71,"Sep 1988",79,16,90,81,68],[1988.71,"Sep 1988",79,16,90,81,69],[1991.46,"Jun 1991",76,18,83,78,67],[1994.71,"Sep 1994",80,16,84,79,75],[1995.38,"May 1995",77,13,89,76,67],[1999.12,"Feb 1999",71,22,79,75,61],[2000.12,"Feb 2000",66,28,82,63,57],[2000.46,"Jun 2000",66,26,81,65,53],[2000.62,"Aug 2000",67,28,80,68,56],[2001.12,"Feb 2001",67,25,79,69,52],[2001.79,"Oct 2001",68,26,79,67,59],[2002.79,"Oct 2002",70,25,80,65,65],[2003.38,"May 2003",70,28,null,null,null],[2003.79,"Oct 2003",64,32,84,58,51],[2004.79,"Oct 2004",64,31,81,58,52],[2005.79,"Oct 2005",64,30,77,62,56],[2006.38,"May 2006",65,28,84,63,52],[2006.79,"Oct 2006",67,28,82,64,55],[2007.79,"Oct 2007",69,27,81,67,60],[2008.79,"Oct 2008",64,30,78,66,52],[2009.79,"Oct 2009",65,31,81,66,48],[2010.79,"Oct 2010",64,29,78,63,54],[2011.79,"Oct 2011",61,35,73,65,45],[2012.96,"Dec 2012",63,32,80,65,51],[2013.79,"Oct 2013",60,35,81,60,47],[2014.79,"Oct 2014",63,33,76,62,49],[2015.79,"Oct 2015",61,37,82,58,49],[2016.79,"Oct 2016",60,37,82,56,42],[2017.79,"Oct 2017",55,41,72,58,39],[2018.79,"Oct 2018",56,41,80,55,39],[2019.79,"Oct 2019",56,42,80,53,39],[2020.71,"Sep 2020",55,43,82,49,39],[2021.79,"Oct 2021",54,43,77,53,34],[2022.79,"Oct 2022",55,42,77,54,35],[2023.79,"Oct 2023",53,44,81,51,32],[2024.79,"Oct 2024",53,43,77,51,29],[2025.79,"Oct 2025",52,44,81,47,32],[2026.79,"Oct 2026",49,45,73,50,28]];
var G='#007a55',INK='#13241b',SUB='#4a5550',RC='#b5413a',IC='#7a8580',DC='#2f6fb0',ID='#nid-dp';
function go(){var b=document.getElementById('nid-dp');if(!b)return;
var W=700,H=400,L=44,R=16,T=14,B=34,X0=1934,X1=2028,NS='http://www.w3.org/2000/svg';
function X(v){return L+(v-X0)/(X1-X0)*(W-L-R)}function Y(v){return T+(100-v)/100*(H-T-B)}
var css=ID+'{max-width:700px;margin:2.2em auto;font-family:Georgia,"Times New Roman",serif;color:'+INK+'}'+
ID+' .hd{text-align:center;margin-bottom:8px}'+ID+' .hd b{display:block;font-size:1.2em}'+ID+' .hd span{font-size:.92em;color:'+SUB+';font-style:italic}'+
ID+' .tg{display:flex;justify-content:center;gap:6px;margin:10px 0 8px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}'+
ID+' .tg button{font:inherit;font-size:13px;padding:6px 14px;border-radius:999px;border:1px solid #cfd9d3;background:#fff;color:'+INK+';cursor:pointer}'+
ID+' .tg button.on{background:'+G+';border-color:'+G+';color:#fff}'+
ID+' svg{width:100%;height:auto;display:block;touch-action:pan-y;cursor:crosshair}'+
ID+' svg text{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:12px;fill:'+SUB+';letter-spacing:0!important;word-spacing:0!important}'+
ID+' .ln{fill:none;stroke-width:2.6;stroke-linejoin:round;transition:opacity .3s}'+
ID+' .card{margin-top:8px;padding:12px 16px;border:1px solid #e3eee7;border-radius:10px;background:#f7faf8;min-height:78px}'+
ID+' .card h4{margin:0 0 6px;font-size:1.05em}'+ID+' .card .row{display:flex;flex-wrap:wrap;gap:18px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:13px;color:'+SUB+'}'+
ID+' .card .row div b{display:block;font-family:Georgia,serif;font-size:22px}'+
ID+' .nt{font-size:12px;color:'+SUB+';margin-top:8px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
b.innerHTML='<div class="hd"><b>Ninety Years Of Answers To One Question</b><span>Share in favor of the death penalty for a person convicted of murder. Slide across the chart to read any poll.</span></div><div class="tg"><button data-m="a" class="on">All adults</button><button data-m="p">By party</button></div><svg viewBox="0 0 '+W+' '+H+'"></svg><div class="card"></div><div class="nt">Source: Gallup, 57 polls from 1936 to 2026. Party figures start in 1953. The latest poll has a margin of error of plus or minus 4 points; party groups have more.</div>';
var svg=b.querySelector('svg'),card=b.querySelector('.card'),mode='a';
function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);(p||svg).appendChild(e);return e}
el('rect',{x:X(1965),y:T,width:X(1972)-X(1965),height:H-T-B,fill:'#f1ede4'});
[0,25,50,75,100].forEach(function(v){el('line',{x1:L,x2:W-R,y1:Y(v),y2:Y(v),stroke:v===50?'#8a958f':'#e6ebe8','stroke-width':v===50?1.2:1,'stroke-dasharray':v===50?'5 4':''});var t=el('text',{x:L-6,y:Y(v)+4,'text-anchor':'end'});t.textContent=v+(v?'%':'')});
for(var y=1940;y<=2020;y+=10){var t=el('text',{x:X(y),y:H-12,'text-anchor':'middle'});t.textContent=y}
function path(i){var s='',pen=false;D.forEach(function(r){if(r[i]==null)return;s+=(pen?'L':'M')+X(r[0]).toFixed(1)+' '+Y(r[i]).toFixed(1);pen=true});return s}
var P={a:el('path',{'class':'ln',d:path(2),stroke:G}),r:el('path',{'class':'ln',d:path(4),stroke:RC}),i:el('path',{'class':'ln',d:path(5),stroke:IC}),d:el('path',{'class':'ln',d:path(6),stroke:DC})};
var cur=el('line',{y1:T,y2:H-B,stroke:INK,'stroke-width':1,'stroke-opacity':.5});
var dots=[el('circle',{r:5,fill:G,stroke:'#fff','stroke-width':2}),el('circle',{r:5,fill:RC,stroke:'#fff','stroke-width':2}),el('circle',{r:5,fill:IC,stroke:'#fff','stroke-width':2}),el('circle',{r:5,fill:DC,stroke:'#fff','stroke-width':2})];
function paint(){P.a.style.opacity=mode==='a'?1:.25;['r','i','d'].forEach(function(k){P[k].style.opacity=mode==='p'?1:0})}
function cell(v,l,c){return v==null?'':'<div><b style="color:'+c+'">'+v+'%</b>'+l+'</div>'}
function show(k){var r=D[k];cur.setAttribute('x1',X(r[0]));cur.setAttribute('x2',X(r[0]));
[2,4,5,6].forEach(function(i,n){var on=r[i]!=null&&(mode==='p'?true:n===0);dots[n].setAttribute('visibility',on?'visible':'hidden');if(on){dots[n].setAttribute('cx',X(r[0]));dots[n].setAttribute('cy',Y(r[i]))}});
card.innerHTML='<h4>'+r[1]+'</h4><div class="row">'+cell(r[2],mode==='a'?'in favor':'all adults',G)+(mode==='a'?cell(r[3],'opposed',INK):cell(r[4],'Republicans',RC)+cell(r[5],'independents',IC)+cell(r[6],'Democrats',DC))+'</div>'}
var last=D.length-1;
function near(ev){var bb=svg.getBoundingClientRect(),cx=(ev.touches?ev.touches[0].clientX:ev.clientX)-bb.left,v=X0+(cx/bb.width*W-L)/(W-L-R)*(X1-X0),best=0,bd=1e9;D.forEach(function(r,k){var dd=Math.abs(r[0]-v);if(dd<bd){bd=dd;best=k}});last=best;show(best)}
svg.addEventListener('mousemove',near);svg.addEventListener('touchstart',near,{passive:true});svg.addEventListener('touchmove',near,{passive:true});svg.addEventListener('click',near);
[].forEach.call(b.querySelectorAll('.tg button'),function(bt){bt.addEventListener('click',function(){mode=bt.getAttribute('data-m');[].forEach.call(b.querySelectorAll('.tg button'),function(o){o.classList.toggle('on',o===bt)});paint();show(last)})});
paint();show(last);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
