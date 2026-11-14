/* The News in Data: top navigation for computer screens (added Nov. 14, 2026).
   Replaces the links in the Squarespace header with a symmetric bar: four links, the site name in the center,
   three links and Subscribe. Hovering or tabbing to a link opens a full-width panel with that section's newest
   stories. Phones keep the Squarespace menu. EDIT HERE: LEFT, RIGHT, HUB, EXTRA and GAMES. */
(function(){
if(window.top!==window.self||window.__nidNav)return;window.__nidNav=1;
var dd=document.querySelector('.header-display-desktop'),hd=document.querySelector('header#header')||document.querySelector('header');if(!dd||!hd)return;
var PLAY='https://stories.thenewsindata.com/play/',SF='-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif',TNR='"Times New Roman",Times,serif',G='#007a55',INK='#13241b';
var LEFT=['Play','Trending','Science','Sports'],RIGHT=['Business','AI & Tech','Culture'];
var HUB={Trending:[['Travel','travel'],['Crime And Policing','crime']],Science:[['Health','health'],['Climate And Energy','climate']],Sports:[['NBA','nba']],Business:[['Prices And Pay','money']]};
var EXTRA={Trending:[['Election 2026','/election-2026']]};
var GAMES=[['Today’s Chart','today/','A new chart puzzle with six guesses'],['Candy Prices','candy/','Guess how much they rose since 2020'],['Luka Dončić','luka/','Guess his points a game'],
 ['Canadian Trips','canada/','Guess the change from 2024'],['Manu Ginóbili','manu/','Guess how many rap songs name him'],['Japan','japan/','Guess how many adults have no one close']];

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function cat(k){return '/stories?category='+encodeURIComponent(k).replace(/%20/g,'+')}
function link(k){return '<a class="nnv-a" data-k="'+esc(k)+'" href="'+(k==='Play'?PLAY:cat(k))+'" aria-expanded="false">'+esc(k)+'</a>'}

var CSS='.header-display-desktop.nnv-on>*:not(.nnv){display:none!important}'+
'.nnv{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;flex:1 1 100%;width:100%;height:48px;font-family:'+SF+'}@media(max-width:1000px){.nnv .nnv-home{margin:0 12px}.nnv .nnv-a{padding:16px 4px}}'+
'.nnv-s{display:flex;justify-content:space-evenly;align-items:center}'+
'.nnv a{text-decoration:none!important}'+
'.nnv-a{font-size:12px;font-weight:400;letter-spacing:-.12px;line-height:16px;padding:16px 8px;color:rgba(0,0,0,.8)!important;transition:color .2s;white-space:nowrap}'+
'.nnv-a:hover,.nnv-a[aria-expanded=true]{color:#000!important}.nnv.open .nnv-a[aria-expanded=false]{color:rgba(0,0,0,.48)!important}'+
'.nnv-a:focus-visible,.nnv-home:focus-visible,.nnv-sub:focus-visible{outline:2px solid #7fc4a6;outline-offset:-2px;border-radius:6px}'+
'.nnv-home{font-family:"Hanken Grotesk",'+SF+';font-size:13px;font-weight:800;line-height:1.3;color:#fff!important;background:'+G+';border-radius:6px;padding:5px 10px;margin:0 30px;white-space:nowrap}'+
'.nnv-sub{font-size:12px;font-weight:500;line-height:1.4;color:'+G+'!important;border:1px solid '+G+';border-radius:980px;padding:3px 12px;transition:background .2s,color .2s;white-space:nowrap}.nnv-sub:hover{background:'+G+';color:#fff!important}'+
'.nnv-panel{position:absolute;left:0;right:0;top:100%;z-index:20;background:rgba(255,255,255,.97);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px);border-top:1px solid rgba(0,0,0,.06);border-bottom:1px solid rgba(0,0,0,.1);box-shadow:0 18px 40px rgba(19,36,27,.1);opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .22s ease,transform .22s ease,visibility 0s .22s;font-family:'+SF+'}'+
'.nnv-panel.on{opacity:1;visibility:visible;transform:none;transition:opacity .22s ease,transform .22s ease,visibility 0s}'+
'.nnv-panel a{text-decoration:none!important}'+
'.nnv-in{max-width:1080px;margin:0 auto;padding:26px 24px 32px;display:grid;grid-template-columns:210px 1fr;gap:40px;text-align:left}'+
'.nnv-lb{font-size:12px;color:#6e6e73;margin:0 0 10px;line-height:1.3}'+
'.nnv-big{display:block;font-family:'+TNR+';font-size:24px;font-weight:700;line-height:1.2;color:'+INK+'!important;margin:0 0 14px}.nnv-big:hover{color:'+G+'!important}'+
'.nnv-sm{display:block;font-size:13px;font-weight:600;line-height:1.3;color:'+G+'!important;margin:0 0 9px}.nnv-sm:hover{text-decoration:underline!important}'+
'.nnv-sm.q{color:#5f7268!important;font-weight:400}.nnv-rule{height:1px;background:#e6e3dd;margin:12px 0}'+
'.nnv-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}'+
'.nnv-c{display:block;color:'+INK+'!important}.nnv-c img{display:block;width:100%;aspect-ratio:1200/630;object-fit:contain;background:#fff;border:1px solid #e6e3dd;border-radius:6px}'+
'.nnv-c span{display:block;font-family:'+TNR+';font-size:15px;font-weight:700;line-height:1.22;margin-top:8px}.nnv-c:hover span{text-decoration:underline}'+
'.nnv-sk{aspect-ratio:1200/630;border-radius:6px;background:#f1f4f2}'+
'.nnv-games{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.nnv-g{display:block;border:1px solid #e6e3dd;border-radius:10px;padding:12px 14px;background:#fff;color:'+INK+'!important;transition:border-color .2s}.nnv-g:hover{border-color:'+G+'}'+
'.nnv-g b{display:block;font-family:'+TNR+';font-size:17px;line-height:1.2}.nnv-g i{display:block;font-style:normal;font-size:12.5px;color:#5f7268;margin-top:3px;line-height:1.35}'+
'@media(prefers-reduced-motion:reduce){.nnv-panel,.nnv-panel.on{transition:none}}';
var st=el('style');st.id='nnv-css';st.textContent=CSS;document.head.appendChild(st);

var nav=el('nav','nnv','<div class="nnv-s">'+LEFT.map(link).join('')+'</div><a class="nnv-home" href="/">The News in Data</a><div class="nnv-s">'+RIGHT.map(link).join('')+'<a class="nnv-sub" href="/#get-in-touch">Subscribe</a></div>');
nav.setAttribute('aria-label','Main');[].forEach.call(dd.children,function(c){c.style.setProperty('display','none','important')});dd.appendChild(nav);dd.classList.add('nnv-on');
var pn=el('div','nnv-panel','<div class="nnv-in"></div>'),box=pn.firstChild;hd.appendChild(pn);
if(getComputedStyle(hd).position==='static')hd.style.position='relative';

var cache={},cur=null,tO=0,tC=0;
function side(k){var h='<div><div class="nnv-lb">'+(k==='Play'?'Data games':'Section')+'</div>';
  if(k==='Play')return h+'<a class="nnv-big" href="'+PLAY+'">All Games</a><span class="nnv-sm q">Guess first, then see how every other reader guessed.</span></div>';
  h+='<a class="nnv-big" href="'+cat(k)+'">All '+esc(k)+'</a>';
  (HUB[k]||[]).forEach(function(x){h+='<a class="nnv-sm" href="/stories#'+x[1]+'">'+esc(x[0])+' →</a>'});
  (EXTRA[k]||[]).forEach(function(x){h+='<a class="nnv-sm" href="'+x[1]+'">'+esc(x[0])+' →</a>'});
  return h+'<div class="nnv-rule"></div><a class="nnv-sm q" href="/stories">All Stories</a><a class="nnv-sm q" href="/videos">Videos</a></div>'}
function cards(items){return '<div class="nnv-cards">'+(items?items.slice(0,4).map(function(i){return '<a class="nnv-c" href="/stories/'+esc(i.urlId)+'"><img src="'+esc(i.assetUrl)+'?format=500w" alt="" loading="lazy"><span>'+esc(i.title)+'</span></a>'}).join(''):'<div class="nnv-sk"></div><div class="nnv-sk"></div><div class="nnv-sk"></div><div class="nnv-sk"></div>')+'</div>'}
function render(k){
  if(k==='Play'){box.innerHTML=side(k)+'<div class="nnv-games">'+GAMES.map(function(g){return '<a class="nnv-g" href="'+PLAY+g[1]+'"><b>'+esc(g[0])+'</b><i>'+esc(g[2])+'</i></a>'}).join('')+'</div>';return}
  box.innerHTML=side(k)+cards(cache[k]&&cache[k].items);
  if(!cache[k]){cache[k]={p:fetch('/stories?category='+encodeURIComponent(k)+'&format=json',{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(j){cache[k].items=(j.items||[]).filter(function(i){return i.assetUrl});if(cur===k)render(k)}).catch(function(){cache[k]=null})}}}
function mark(){[].forEach.call(nav.querySelectorAll('.nnv-a'),function(a){a.setAttribute('aria-expanded',a.getAttribute('data-k')===cur?'true':'false')});nav.classList.toggle('open',!!cur)}
function open(k){clearTimeout(tC);if(cur===k)return;cur=k;render(k);pn.classList.add('on');mark()}
function close(){clearTimeout(tO);if(!cur)return;cur=null;pn.classList.remove('on');mark()}
nav.addEventListener('mouseover',function(e){var a=e.target.closest('.nnv-a');clearTimeout(tO);
  if(a){clearTimeout(tC);var k=a.getAttribute('data-k');tO=setTimeout(function(){open(k)},cur?0:110)}
  else if(e.target.closest('.nnv-home,.nnv-sub')){clearTimeout(tC);tC=setTimeout(close,120)}});
[nav,pn].forEach(function(x){x.addEventListener('mouseleave',function(){clearTimeout(tO);clearTimeout(tC);tC=setTimeout(close,240)});x.addEventListener('mouseenter',function(){clearTimeout(tC)})});
nav.addEventListener('focusin',function(e){var a=e.target.closest('.nnv-a');if(a)open(a.getAttribute('data-k'))});
document.addEventListener('focusin',function(e){if(cur&&!nav.contains(e.target)&&!pn.contains(e.target))close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
addEventListener('scroll',function(){if(cur&&!pn.matches(':hover')&&!nav.matches(':hover'))close()},{passive:true});
})();
