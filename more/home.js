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
