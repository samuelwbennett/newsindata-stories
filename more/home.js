/* Breaking-news banner (site-wide, temporary): Election 2026 live hub. Hidden on the hub itself,
   dismissible for the session, and switches itself off after Nov. 8, 2026. */
(function(){
  try{
    return; /* turned off Nov. 7, 2026 at Samuel's request */
    if(Date.now()>Date.UTC(2026,10,8,7))return;
    if(/^\/election-2026/.test(location.pathname))return;
    if(window.top!==window.self)return;            /* not inside the Squarespace editor preview */
    try{if(sessionStorage.getItem('nidElecBanner')==='x')return;}catch(e){}
    var css='#nid-breaking{position:relative;z-index:99999;pointer-events:auto;background:rgba(19,36,27,.84);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#f4f7f5;font:500 14.5px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;padding:9px 44px;border-bottom:1px solid rgba(255,255,255,.12)}'+
      '#nid-breaking a{color:#f4f7f5;text-decoration:none}#nid-breaking a:hover u{text-decoration-thickness:2px}#nid-breaking u{text-underline-offset:3px;text-decoration-color:rgba(244,247,245,.55)}'+
      '#nid-breaking .k{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.45);color:#fff;font-weight:700;font-size:11.5px;letter-spacing:.1em;padding:2px 8px 2px 7px;border-radius:999px;margin-right:9px;vertical-align:1px}'+
      '#nid-breaking .dot{width:7px;height:7px;border-radius:50%;background:#ef4444;box-shadow:0 0 0 0 rgba(239,68,68,.6);animation:nidbp 1.6s ease-in-out infinite}'+
      '@keyframes nidbp{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(239,68,68,.55)}50%{opacity:.35;box-shadow:0 0 0 4px rgba(239,68,68,0)}}'+
      '#nid-breaking .d{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;color:rgba(244,247,245,.75);font-size:20px;line-height:1;cursor:pointer;padding:4px 8px}#nid-breaking .d:hover{color:#fff}'+
      '#nid-breaking .lg{display:inline}#nid-breaking .sm{display:none}@media(max-width:640px){#nid-breaking{font-size:13.5px;padding:8px 40px 8px 12px;text-align:left}#nid-breaking .lg{display:none}#nid-breaking .sm{display:inline}}'+
      '@media(prefers-reduced-motion:reduce){#nid-breaking .dot{animation:none}}';
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var b=document.createElement('div');b.id='nid-breaking';b.setAttribute('role','region');b.setAttribute('aria-label','Breaking news');
    b.innerHTML='<a href="/election-2026"><span class="k"><span class="dot"></span>LIVE</span>'+
      '<span class="lg">Election 2026: Democrats win the House and Senate. See every Senate race and 145 ballot measures. <u>See the data →</u></span>'+
      '<span class="sm">Democrats win the House and Senate <u>→</u></span></a>'+
      '<button class="d" aria-label="Dismiss">×</button>';
    b.querySelector('.d').onclick=function(){b.remove();try{sessionStorage.setItem('nidElecBanner','x');}catch(e){}};
    function put(){if(document.getElementById('nid-breaking'))return;var h=document.querySelector('header#header, header.header, header');if(h){h.insertBefore(b,h.firstChild);}else{document.body.insertBefore(b,document.body.firstChild);}setTimeout(function(){try{window.dispatchEvent(new Event('resize'));}catch(e){}},50);}
    if(document.body)put();else document.addEventListener('DOMContentLoaded',put);
  }catch(e){}
})();
/* Home page "Latest" grid: fills the cards with the newest published stories,
   so every new story lands on the home page automatically. The hand-built cards
   in the home page Code Block stay as the fallback if the feed can't load.
   Loaded site-wide (Settings > Developer tools > Code injection > Footer); runs on the home page only. */
(function(){
if(location.pathname!=='/'&&location.pathname!=='')return;
var N=4;
function strip(h){var d=document.createElement('div');d.innerHTML=h||'';return (d.textContent||'').replace(/\s+/g,' ').trim();}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function run(){
  var first=document.querySelector('.grid a.story');
  if(!first)return;
  var grid=first.parentElement;
  /* The top story (hero) is the first link on the page that points to a story. */
  var hero=null;
  [].some.call(document.querySelectorAll('a[href*="/stories/"]'),function(a){
    if(grid.contains(a))return false; hero=a.getAttribute('href').split('?')[0].replace(/\/$/,'').split('/').pop(); return true;});
  fetch('/stories?format=json',{credentials:'same-origin'}).then(function(r){return r.json();}).then(function(j){
    var items=(j.items||[]).filter(function(i){return i.urlId&&i.urlId!==hero&&i.assetUrl;}).slice(0,N);
    if(items.length<N)return;
    grid.innerHTML=items.map(function(i){
      var cat=(i.categories&&i.categories[0])||'Stories';
      var dek=strip(i.excerpt);
      return '<a class="story" href="/stories/'+esc(i.urlId)+'"><div class="viz"><img src="'+esc(i.assetUrl)+'?format=750w" alt="Chart: '+esc(i.title)+'" loading="lazy"></div>'+
        '<p class="cat">'+esc(cat)+'</p><h3>'+esc(i.title)+'</h3>'+(dek?'<p>'+esc(dek)+'</p>':'')+'</a>';
    }).join('');
  }).catch(function(){});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
/* Instagram follow band (home page) and follow card (end of every story): social/ig.js */
(function(){
  if(window.top!==window.self)return;
  var s=document.createElement('script');s.src='https://stories.thenewsindata.com/social/ig.js';s.defer=true;
  (document.body||document.head).appendChild(s);
})();
/* Play band (home page, under the top story): play/home-band.js */
(function(){
  if(window.top!==window.self)return;
  var s=document.createElement('script');s.src='https://stories.thenewsindata.com/play/home-band.js?v=2';s.defer=true;
  (document.body||document.head).appendChild(s);
})();
