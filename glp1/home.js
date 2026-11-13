/* The News in Data: home page hero for the GLP-1 story.
   Renders "Out of every 100" into <div id="nid-glp1-home"> : one large 100-dot cluster that cycles
   through groups on its own until the reader picks one. Figures: CDC MMWR, Nov. 12, 2026. */
(function(){
var D=[['All adults','U.S. adults',9.8],['Women','women',11.9],['Men','men',7.6],['Ages 18 to 39','adults 18 to 39',4.8],['Ages 40 to 64','adults 40 to 64',13.7],['Ages 65+','adults 65 and older',11.1],['Severe obesity','adults with severe obesity',24.1],['Diabetes','adults who have had diabetes',47.4]];
var G='#007a55',PALE='#d9e2dd',ID='#nid-glp1-home';
function go(){var b=document.getElementById('nid-glp1-home');if(!b||b.getAttribute('data-on'))return;b.setAttribute('data-on','1');
var NS='http://www.w3.org/2000/svg',GA=2.399963;
var css=ID+'{text-align:center;padding:clamp(16px,2.6vw,28px)!important}'+
ID+' .ey{font-size:13px;font-weight:600;color:'+G+';letter-spacing:.02em;margin:0 0 2px}'+
ID+' svg{width:min(100%,360px);height:auto;display:block;margin:0 auto;overflow:visible}'+
ID+' svg circle{transition:fill .45s}'+
ID+' .big{font-size:clamp(44px,6vw,68px);font-weight:700;letter-spacing:-.03em;line-height:1;color:'+G+';font-variant-numeric:tabular-nums}'+
ID+' .big small{font-size:.42em;font-weight:600;color:#1d1d1f;letter-spacing:-.01em;margin-left:6px}'+
ID+' .ln{font-family:"Newsreader",Georgia,serif;font-size:clamp(17px,1.9vw,20px);color:#6e6e73;margin:6px auto 14px;max-width:30ch;line-height:1.35;min-height:2.7em}'+
ID+' .ch{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}'+
ID+' .ch button{font:inherit;font-size:13px;font-weight:500;padding:6px 12px;border-radius:980px;border:1px solid #d2d2d7;background:#fff;color:#1d1d1f;cursor:pointer;transition:background .2s,color .2s,border-color .2s}'+
ID+' .ch button.on{background:'+G+';border-color:'+G+';color:#fff}'+
ID+' .sr{font-size:12px;color:#6e6e73;margin-top:12px}'+ID+' .sr a{color:'+G+';font-weight:600}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var href=(b.querySelector('a')||{}).href||'#';
b.innerHTML='<p class="ey">Out of every 100</p><svg viewBox="-1.12 -1.12 2.24 2.24" role="img" aria-label="100 dots showing the share who took a GLP-1 drug"></svg><div class="big"><span class="n">0</span><small>in 100</small></div><p class="ln"></p><div class="ch"></div><p class="sr">CDC survey of 8,118 adults, 2025. <a href="'+href+'">Find your group in the story &rsaquo;</a></p>';
var svg=b.querySelector('svg'),num=b.querySelector('.n'),ln=b.querySelector('.ln'),ch=b.querySelector('.ch'),dots=[],cur=-1,auto=true,vis=true,shown=0;
for(var k=0;k<100;k++){var r=0.1*Math.sqrt(k+0.5),t=k*GA,c=document.createElementNS(NS,'circle');c.setAttribute('cx',(r*Math.cos(t)).toFixed(3));c.setAttribute('cy',(-r*Math.sin(t)).toFixed(3));c.setAttribute('r',0.062);c.setAttribute('fill',PALE);svg.appendChild(c);dots.push(c)}
function show(i){if(i===cur)return;cur=i;var d=D[i],n=Math.round(d[2]),from=shown;shown=n;
dots.forEach(function(o,k){var up=n>from;o.style.transitionDelay=(up?(k>=from&&k<n?(k-from)*14:0):(k>=n&&k<from?(from-1-k)*8:0))+'ms';o.setAttribute('fill',k<n?G:PALE)});
var t0=null,a=from;function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/600);num.textContent=Math.round(a+(n-a)*p);if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step);
ln.innerHTML='<b style="color:#1d1d1f">'+d[2].toFixed(1)+'%</b> of '+d[1]+' took a GLP-1 drug in the past year';
[].forEach.call(ch.children,function(o,k){o.classList.toggle('on',k===i)})}
D.forEach(function(d,i){var bt=document.createElement('button');bt.type='button';bt.textContent=d[0];bt.addEventListener('click',function(){auto=false;show(i)});ch.appendChild(bt)});
show(0);
if('IntersectionObserver' in window){new IntersectionObserver(function(e){vis=e[0].isIntersecting},{threshold:.3}).observe(b)}
var red=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!red)setInterval(function(){if(auto&&vis&&!document.hidden)show((cur+1)%D.length)},3200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
