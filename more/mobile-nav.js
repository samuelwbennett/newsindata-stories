/* The News in Data: phone menu (added Nov. 15, 2026).
   Fixes the Squarespace phone menu, which opened inside the 54px header because the header's blur
   (backdrop-filter) traps fixed-position children, so readers saw only an X. Replaces it with a full-screen
   sheet: the sections in large type, each with its newest story, a Play card, and quick links.
   Loaded site-wide by more/home.js. EDIT HERE: SECTIONS and QUICK. */
(function(){
if(window.__nidMNav)return;window.__nidMNav=1;
var BP=1024; /* menu is used whenever the Squarespace burger is visible */
var PLAY='https://stories.thenewsindata.com/play/';
var SECTIONS=[['Trending','Travel, crime, money and what people are talking about'],['Science','Health, climate and energy'],['Sports','NBA, NFL, college football and more'],['Business','Prices, pay, jobs and companies'],['AI & Tech','AI, platforms and the internet'],['Culture','Music, film, TV and how we live']];
var QUICK=[['All Stories','/stories'],['Videos','/videos'],['Election 2026','/election-2026'],['About','/about']];
var G='#007a55',INK='#13241b',SUB='#5f7268',SF='-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif',TNR='"Times New Roman",Times,serif';

var CSS=
/* safety net: never let the header blur trap the Squarespace menu either */
'body.header--menu-open header.header,body.header--menu-open #header{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}'+
'.nmn{position:fixed;inset:0;z-index:100000;display:flex;flex-direction:column;background:#fbfcfb;background-image:linear-gradient(rgba(0,122,85,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(0,122,85,.045) 1px,transparent 1px);background-size:26px 26px;font-family:'+SF+';color:'+INK+';opacity:0;visibility:hidden;transform:translateY(-10px);transition:opacity .28s ease,transform .32s cubic-bezier(.2,.8,.2,1),visibility 0s .32s;overscroll-behavior:contain}'+
'.nmn.on{opacity:1;visibility:visible;transform:none;transition:opacity .28s ease,transform .32s cubic-bezier(.2,.8,.2,1),visibility 0s}'+
'.nmn *{box-sizing:border-box}.nmn a{text-decoration:none!important;-webkit-tap-highlight-color:transparent}'+
'.nmn-top{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid rgba(0,0,0,.06);background:rgba(251,252,251,.92)}'+
'.nmn-home{font-family:"Hanken Grotesk",'+SF+';font-size:14px;font-weight:800;color:#fff!important;background:'+G+';border-radius:6px;padding:6px 11px}'+
'.nmn-x{width:44px;height:44px;border:0;background:none;position:relative;cursor:pointer;border-radius:50%}.nmn-x:active{background:rgba(0,0,0,.05)}.nmn-x:focus{outline:none}.nmn-x:focus-visible{outline:2px solid #7fc4a6}'+
'.nmn-x:before,.nmn-x:after{content:"";position:absolute;left:12px;right:12px;top:21px;height:2px;border-radius:2px;background:'+INK+';transform:rotate(45deg)}.nmn-x:after{transform:rotate(-45deg)}'+
'.nmn-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 20px 28px}'+
'.nmn-k{font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:'+G+';margin:16px 0 4px}'+
'.nmn-sec{display:grid;grid-template-columns:1fr auto;align-items:center;gap:4px 12px;padding:13px 0;border-bottom:1px solid #e3e9e5;color:'+INK+'!important}'+
'.nmn-sec b{font-family:'+TNR+';font-size:30px;font-weight:700;line-height:1.05;letter-spacing:-.01em}'+
'.nmn-sec i{grid-column:1;font-style:normal;font-size:13px;line-height:1.35;color:'+SUB+';min-height:1.35em}'+
'.nmn-sec i.new{color:'+INK+'}.nmn-sec i.new:before{content:"New: ";color:'+G+';font-weight:700}'+
'.nmn-sec .ar{grid-row:1/span 2;grid-column:2;width:34px;height:34px;border-radius:50%;border:1px solid #cfdcd4;display:flex;align-items:center;justify-content:center;color:'+G+';font-size:17px;transition:background .2s,color .2s}'+
'.nmn-sec:active .ar{background:'+G+';color:#fff}'+
'.nmn-play{display:flex;align-items:center;gap:12px;margin:18px 0 6px;padding:14px 16px;border-radius:14px;color:'+INK+'!important;border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(115deg,#E2B94F,#EBB8D6,#8FD3C4,#A9BCEF,#E2B94F) border-box;box-shadow:0 8px 22px rgba(19,36,27,.07)}'+
'.nmn-play svg{width:26px;height:26px;flex:none}.nmn-play>span{display:block}.nmn-play b{display:block;font-family:'+TNR+';font-size:20px;line-height:1.15;color:'+INK+'}.nmn-play span span{display:block;font-size:12.5px;color:'+SUB+';margin-top:2px}'+
'.nmn-q{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.nmn-q a{font-size:14px;font-weight:600;color:'+G+'!important;border:1px solid #cfdcd4;background:#fff;border-radius:999px;padding:9px 14px}'+
'.nmn-foot{display:flex;gap:10px;align-items:center;margin-top:22px}'+
'.nmn-sub{flex:1;text-align:center;font-size:15px;font-weight:700;color:#fff!important;background:'+G+';border-radius:999px;padding:13px 16px}'+
'.nmn-ig{font-size:14px;font-weight:600;color:'+INK+'!important;padding:12px 6px}'+
/* staggered entrance */
'@media(prefers-reduced-motion:no-preference){.nmn .st{opacity:0;transform:translateY(10px);transition:opacity .35s ease,transform .45s cubic-bezier(.2,.8,.2,1)}.nmn.on .st{opacity:1;transform:none}}'+
'@media(prefers-reduced-motion:reduce){.nmn,.nmn.on{transition:none;transform:none}}'+
'html.nmn-lock,html.nmn-lock body{overflow:hidden!important}';

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function cat(k){return '/stories?category='+encodeURIComponent(k).replace(/%20/g,'+')}
var SPARK='<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="nmnG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3D27A"/><stop offset=".45" stop-color="#E9B949"/><stop offset=".75" stop-color="#E7B8D3"/><stop offset="1" stop-color="#9FD8CC"/></linearGradient></defs><path d="M12 1.5c.6 4.9 2.6 7.4 9 10.5-6.4 3.1-8.4 5.6-9 10.5-.6-4.9-2.6-7.4-9-10.5 6.4-3.1 8.4-5.6 9-10.5z" fill="url(#nmnG)"/></svg>';

var sheet=null,loaded=false,lastFocus=null;
function build(){
  var st=document.createElement('style');st.id='nmn-css';st.textContent=CSS;document.head.appendChild(st);
  var n=0,d=function(){return ' style="transition-delay:'+(60+(n++)*40)+'ms"'};
  var h='<div class="nmn-top"><a class="nmn-home" href="/">The News in Data</a><button type="button" class="nmn-x" aria-label="Close menu"></button></div><div class="nmn-body">';
  h+='<div class="nmn-k st"'+d()+'>Sections</div>';
  SECTIONS.forEach(function(s){h+='<a class="nmn-sec st"'+d()+' href="'+cat(s[0])+'" data-k="'+esc(s[0])+'"><b>'+esc(s[0])+'</b><span class="ar" aria-hidden="true">→</span><i>'+esc(s[1])+'</i></a>'});
  h+='<a class="nmn-play st"'+d()+' href="'+PLAY+'">'+SPARK+'<span><b>Play</b><span>Guess the number first, then see the chart and how everyone else guessed</span></span></a>';
  h+='<div class="nmn-q st"'+d()+'>'+QUICK.map(function(q){return '<a href="'+q[1]+'">'+esc(q[0])+'</a>'}).join('')+'</div>';
  h+='<div class="nmn-foot st"'+d()+'><a class="nmn-sub" href="/#get-in-touch">Get new charts by email</a><a class="nmn-ig" href="https://www.instagram.com/thenewsindata/" rel="noopener">Instagram</a></div></div>';
  sheet=document.createElement('div');sheet.className='nmn';sheet.id='nid-mnav';sheet.setAttribute('role','dialog');sheet.setAttribute('aria-modal','true');sheet.setAttribute('aria-label','Site menu');sheet.innerHTML=h;
  document.body.appendChild(sheet);
  sheet.querySelector('.nmn-x').addEventListener('click',close);
  sheet.addEventListener('click',function(e){var a=e.target.closest('a');if(a){try{window.dispatchEvent(new CustomEvent('nid:act',{detail:'mnav'}))}catch(x){}setTimeout(close,10)}});
}
/* newest story per section, fetched once when the menu first opens */
function fill(){
  if(loaded)return;loaded=true;
  [].forEach.call(sheet.querySelectorAll('.nmn-sec'),function(a){var k=a.getAttribute('data-k');
    fetch('/stories?category='+encodeURIComponent(k)+'&format=json',{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(j){var it=(j.items||[])[0];if(!it)return;var i=a.querySelector('i'),t=it.title.length>78?it.title.slice(0,76).replace(/\s+\S*$/,'')+'…':it.title;i.textContent=t;i.className='new'}).catch(function(){})});
}
function open(){if(!sheet)build();lastFocus=document.activeElement;sheet.classList.add('on');document.documentElement.classList.add('nmn-lock');fill();setTimeout(function(){var x=sheet.querySelector('.nmn-x');if(x)x.focus()},50)}
function close(){if(!sheet||!sheet.classList.contains('on'))return;sheet.classList.remove('on');document.documentElement.classList.remove('nmn-lock');document.body.classList.remove('header--menu-open');if(lastFocus&&lastFocus.focus)try{lastFocus.focus()}catch(e){}}
/* take over the Squarespace burger (capture phase, before Squarespace's own handler) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.header-burger-btn');if(!b)return;e.preventDefault();e.stopImmediatePropagation();document.body.classList.remove('header--menu-open');open()},true);
document.addEventListener('keydown',function(e){if(!sheet||!sheet.classList.contains('on'))return;if(e.key==='Escape'){close();return}
  if(e.key==='Tab'){var f=sheet.querySelectorAll('a,button');if(!f.length)return;var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
addEventListener('resize',function(){if(innerWidth>BP)close()});
addEventListener('pageshow',function(){close()});
})();
