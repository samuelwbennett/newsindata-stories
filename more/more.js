/* The News in Data: share bar + Keep Reading.
   Cards use each story's real featured chart, pulled live from the blog feed.
   PICKS sets the order and the card headline; any other published story fills in after them. */
(function(){
var BASE='https://stories.thenewsindata.com/more/';
var SITE='https://www.thenewsindata.com';
var PICKS=[
 ['candy','Trending','Candy Prices Are Up 49% Since 2020','candy-prices-are-up-49-since-2020-while-overall-prices-rose-29-and-wages-28'],
 ['snow','Science','When Does Your State Usually Get Its First Snow?','winter-is-coming-when-the-first-snow-usually-falls-in-your-state'],
 ['bowling','Trending','Bowling Leagues Have Lost Nearly 9 In 10 Members Since 1980','league-bowling-has-about-one-member-today-for-every-nine-it-had-in-1980'],
 ['social','Trending','A Quarter Fewer Americans Socialize On A Typical Day Than In 2003','about-a-quarter-fewer-americans-socialize-on-an-average-day-than-in-2003-but-those-who-do-still-spend-about-two-hours'],
 ['primetime','Sports','Over Five Seasons, The Cowboys Got 22 Prime&#8209;Time Games. The Browns Got 3.','who-owns-prime-time-the-nfl-books-audiences-not-records'],
 ['hurricane','Science','2026 Tied 1905 For The Latest First Atlantic Hurricane','2026-tied-1905-for-the-latest-first-atlantic-hurricane-since-tracking-began-in-1851'],
 ['hot100','Culture','Six Of The 7 Longest&#8209;Running No.&nbsp;1 Hits Came In The Streaming Era','six-of-the-seven-songs-with-the-most-weeks-at-no-1-on-the-hot-100-came-in-the-streaming-era']
];
var CSS=[
".nid-more{margin:56px 0 8px;font-family:'Times New Roman',Times,serif}",
".nid-more .hd{font-size:28px;font-weight:700;margin:0 0 18px;padding-top:18px;border-top:3px solid #111}",
".nid-more .g{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}",
".nid-more a{display:block;text-decoration:none!important;color:#13241b!important;border:1px solid #e6e3dd;border-radius:6px;overflow:hidden;background:#fff;transition:box-shadow .15s}",
".nid-more a:hover{box-shadow:0 6px 18px rgba(0,0,0,.08)}",
".nid-more a:hover .h{text-decoration:underline}",
".nid-more .im{background:#fff;border-bottom:1px solid #eee}",
".nid-more img{display:block;width:100%;aspect-ratio:1200/630;object-fit:contain;margin:0}",
".nid-more .t{padding:10px 12px 14px}",
".nid-more .k{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#007a55}",
".nid-more .h{font-size:18px;font-weight:700;line-height:1.22;margin-top:4px}",
"@media(max-width:760px){.nid-more .g{grid-template-columns:1fr;gap:16px}.nid-more .h{font-size:18px}}",
".nid-share{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:40px 0 0;font-family:'Times New Roman',Times,serif}",
".nid-share .lb{font-size:15px;font-weight:700;margin-right:4px}",
".nid-share a,.nid-share button{font:inherit;font-size:14px;font-weight:700;color:#13241b!important;text-decoration:none!important;background:#fff;border:1px solid #cfcac2;border-radius:999px;padding:6px 14px;cursor:pointer;line-height:1.2}",
".nid-share a:hover,.nid-share button:hover{border-color:#13241b}",
".nid-share .nat{display:none;background:#13241b;color:#fff!important;border-color:#13241b}",
".nid-share.can .nat{display:inline-block}"
].join('\n');

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
function plain(s){return s.replace(/&#8209;/g,'-').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&');}

function shareBar(){
  var url=SITE+location.pathname, t=document.title.split(' — ')[0];
  var u=encodeURIComponent(url), tt=encodeURIComponent(t);
  var d=document.createElement('div'); d.className='nid-share';
  d.innerHTML='<span class="lb">Share this chart</span>'+
   '<button class="nat" type="button">Share</button>'+
   '<a target="_blank" rel="noopener" href="https://www.reddit.com/submit?url='+u+'&title='+tt+'">Reddit</a>'+
   '<a target="_blank" rel="noopener" href="https://x.com/intent/post?url='+u+'&text='+tt+'">X</a>'+
   '<a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+u+'">Facebook</a>'+
   '<a target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url='+u+'">LinkedIn</a>'+
   '<a href="mailto:?subject='+tt+'&body='+u+'">Email</a>'+
   '<button class="cp" type="button">Copy link</button>';
  if(navigator.share){d.classList.add('can');
    d.querySelector('.nat').onclick=function(){navigator.share({title:t,url:url}).catch(function(){});};}
  d.querySelector('.cp').onclick=function(){var b=this;
    (navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(function(){b.textContent='Copied';},function(){prompt('Copy this link',url);});
    setTimeout(function(){b.textContent='Copy link';},2000);};
  return d;
}

function cards(el,feed){
  var here=location.pathname.replace(/\/$/,'');
  var n=parseInt(el.getAttribute('data-count')||'6',10);
  var bySlug={}; (feed||[]).forEach(function(i){bySlug[i.urlId]=i;});
  var list=PICKS.map(function(p){var f=bySlug[p[3]];
    return {slug:p[3],kick:p[1],head:p[2],img:f&&f.assetUrl?f.assetUrl+'?format=750w':BASE+'icon-'+p[0]+'.png',live:!feed||!!f};});
  (feed||[]).forEach(function(i){
    if(!i.assetUrl||PICKS.some(function(p){return p[3]===i.urlId;}))return;
    list.push({slug:i.urlId,kick:(i.categories&&i.categories[0])||'Stories',head:esc(i.title),img:i.assetUrl+'?format=750w',live:true});
  });
  list=list.filter(function(s){return s.live&&here.indexOf(s.slug)===-1;}).slice(0,n);
  var h='<div class="hd">Keep Reading</div><div class="g">';
  list.forEach(function(s){
    h+='<a href="/stories/'+s.slug+'"><div class="im"><img src="'+s.img+'" alt="Chart: '+esc(plain(s.head))+'" loading="lazy"></div><div class="t"><div class="k">'+esc(s.kick)+'</div><div class="h">'+s.head+'</div></div></a>';
  });
  el.innerHTML=h+'</div>';
}

if(!document.getElementById('nid-more-css')){var st=document.createElement('style');st.id='nid-more-css';st.textContent=CSS;document.head.appendChild(st);}
var els=[].slice.call(document.querySelectorAll('.nid-more[data-auto]')).filter(function(e){return !e.getAttribute('data-done');});
if(!els.length)return;
els.forEach(function(e){e.setAttribute('data-done','1');
  if(e.getAttribute('data-share')!=='0')e.parentNode.insertBefore(shareBar(),e);});
fetch('/stories?format=json',{credentials:'same-origin'}).then(function(r){return r.json();})
 .then(function(j){els.forEach(function(e){cards(e,j.items||[]);});})
 .catch(function(){els.forEach(function(e){cards(e,null);});});
})();
