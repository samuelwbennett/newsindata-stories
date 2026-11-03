/* Breaking-news banner (site-wide, temporary): Election 2026 live hub. Hidden on the hub itself,
   dismissible for the session, and switches itself off after Nov. 8, 2026. */
(function(){
  try{
    if(Date.now()>Date.UTC(2026,10,8,7))return;
    if(/^\/election-2026/.test(location.pathname))return;
    if(window.top!==window.self)return;            /* not inside the Squarespace editor preview */
    try{if(sessionStorage.getItem('nidElecBanner')==='x')return;}catch(e){}
    var css='#nid-breaking{position:relative;z-index:99999;background:#b3261e;color:#fff;font:600 15px/1.35 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;padding:10px 44px}'+
      '#nid-breaking a{color:#fff;text-decoration:none}#nid-breaking a:hover u{text-decoration-thickness:2px}'+
      '#nid-breaking .k{display:inline-block;background:#fff;color:#b3261e;font-weight:800;font-size:12px;letter-spacing:.08em;padding:2px 7px;border-radius:3px;margin-right:8px;vertical-align:1px}'+
      '#nid-breaking .d{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;color:#fff;font-size:22px;line-height:1;cursor:pointer;padding:4px 8px}'+
      '#nid-breaking .lg{display:inline}#nid-breaking .sm{display:none}@media(max-width:640px){#nid-breaking{font-size:14px;padding:9px 40px 9px 12px;text-align:left}#nid-breaking .lg{display:none}#nid-breaking .sm{display:inline}}'+
      '#nid-breaking .dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#fff;margin-right:6px;animation:nidbp 1.4s infinite}@keyframes nidbp{50%{opacity:.2}}';
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var b=document.createElement('div');b.id='nid-breaking';b.setAttribute('role','region');b.setAttribute('aria-label','Breaking news');
    b.innerHTML='<a href="/election-2026"><span class="k"><span class="dot"></span>LIVE</span>'+
      '<span class="lg">Election 2026: Results for all 145 statewide ballot measures and Colorado’s races, updated hourly. <u>See the data →</u></span>'+
      '<span class="sm">Election 2026: Live results for 145 ballot measures <u>→</u></span></a>'+
      '<button class="d" aria-label="Dismiss">×</button>';
    b.querySelector('.d').onclick=function(){b.remove();try{sessionStorage.setItem('nidElecBanner','x');}catch(e){}};
    function put(){if(document.getElementById('nid-breaking'))return;document.body.insertBefore(b,document.body.firstChild);}
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
