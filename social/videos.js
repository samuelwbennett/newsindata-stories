/* The News in Data: Videos page.
   Renders a grid of our chart Reels into <div id="nid-videos"></div> on thenewsindata.com/videos.
   The list comes from REELS in social/ig.js (window.NID_REELS), newest first, so adding a Reel there
   is the only step. Each card's line comes from its story's excerpt; Reels without a story use NOTE.
   Every card has its own link (/videos#key), a Share button (shares the video file on phones that
   allow it, otherwise the link), Read the story, and Watch on Instagram. */
(function(){
if(window.__nidVideos)return; window.__nidVideos=1;
var root=document.getElementById('nid-videos'); if(!root)return;
/* Lift the grid out of Squarespace's block grid so it can use the full page width. */
(function(){var sec=root.closest('section'),fe=root.closest('.fluid-engine');
  if(sec&&fe){var host=document.createElement('div');host.className='nvid-host';fe.parentNode.insertBefore(host,fe);host.appendChild(root);fe.style.display='none';}})();
var REELS=window.NID_REELS||{}, IG=window.NID_IG||'https://www.instagram.com/thenewsindata/';
var BASE=window.NID_BASE||'https://stories.thenewsindata.com/social/web/';
var SITE='https://www.thenewsindata.com';
/* One line for Reels that have no story on the site yet (verified figures, see project notes). */
var NOTE={
  senate:'The average senator will be about three years younger in January, and the number under 50 will roughly double, from 8 to as many as 16.',
  youth:'Voters under 30 backed House Democrats by 35 points in 2026, up from 14 in 2024, in an early NORC estimate that may shift.'
};
var KEEP={nfl:'NFL',nba:'NBA','u.s.':'U.S.',us:'U.S.'};
function title(t){return t.split(' ').map(function(w){var k=KEEP[w.toLowerCase().replace(/[^a-z.]/g,'')];if(k)return w.replace(/[a-z.]+/i,k);
  return w.split('-').map(function(p){return p.charAt(0).toUpperCase()+p.slice(1);}).join('-');}).join(' ');}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function strip(h){var d=document.createElement('div');d.innerHTML=h||'';return (d.textContent||'').replace(/\s+/g,' ').trim();}
var IGI='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.25" fill="currentColor"/></svg>';
var SHI='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var PLAY='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';

var CSS=[
'.nvid{--g:#007a55;--ink:#1d1d1f;--sub:#6e6e73;--tile:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;color:var(--ink);max-width:1080px;margin:0 auto;padding:8px 0 40px}',
'.nvid *{box-sizing:border-box}',
'.nvid-host{width:100%;padding:0 max(20px,env(safe-area-inset-left,0px))}',
'.nvid-top{text-align:center;max-width:720px;margin:24px auto 40px}',
'.nvid-top .k{font-size:14px;font-weight:600;color:var(--g);margin:0 0 8px}',
'.nvid h1.nvid-h{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Helvetica,Arial,sans-serif!important;font-size:clamp(32px,4vw,48px)!important;line-height:1.08!important;font-weight:600!important;letter-spacing:-.022em!important;margin:0 0 14px!important;color:var(--ink)!important}',
'.nvid-top p.d{font-size:19px!important;line-height:1.45!important;color:var(--sub)!important;margin:0 auto 22px!important}',
'.nvid a.nvid-f{display:inline-flex;align-items:center;gap:8px;background:var(--g);color:#fff!important;text-decoration:none!important;border-radius:980px;padding:10px 18px;font-size:15px}',
'.nvid a.nvid-f:hover{background:#00684a}',
'.nvid-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}',
'.nvid-card{background:var(--tile);border-radius:22px;padding:14px 14px 18px;display:flex;flex-direction:column;scroll-margin-top:90px;transition:box-shadow .3s ease}',
'.nvid-card.hl{box-shadow:0 0 0 3px var(--g)}',
'.nvid-v{position:relative;aspect-ratio:9/16;border-radius:14px;overflow:hidden;background:#fbfcfa;cursor:pointer}',
'.nvid-v img,.nvid-v video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}',
'.nvid-v button.p{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;border:0;background:rgba(0,0,0,.55);color:#fff;display:flex;align-items:center;justify-content:center;padding:0 0 0 4px;cursor:pointer;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);transition:transform .2s ease,background .2s ease}',
'.nvid-v:hover button.p{transform:translate(-50%,-50%) scale(1.06);background:rgba(0,0,0,.7)}',
'.nvid-v.on button.p{display:none}',
'.nvid-card h2.t{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Helvetica,Arial,sans-serif!important;font-size:19px!important;line-height:1.22!important;font-weight:600!important;letter-spacing:-.015em!important;margin:14px 4px 6px!important;color:var(--ink)!important}',
'.nvid-card p.l{font-size:15px!important;line-height:1.45!important;color:var(--sub)!important;margin:0 4px 14px!important;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}',
'.nvid-b{margin-top:auto;display:flex;flex-wrap:wrap;gap:8px;padding:0 4px}',
'.nvid-b a,.nvid-b button{display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:14px!important;line-height:1.2!important;border-radius:980px;padding:8px 13px;cursor:pointer;text-decoration:none!important;border:1px solid #d2d2d7;background:#fff;color:var(--ink)!important}',
'.nvid-b button.s{background:var(--g);border-color:var(--g);color:#fff!important}',
'.nvid-b button.s:hover{background:#00684a}',
'.nvid-b a:hover{border-color:#86868b}',
'.nvid-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#1d1d1f;color:#fff;border-radius:980px;padding:10px 18px;font-size:14px;z-index:9999;opacity:0;transition:opacity .2s ease;pointer-events:none}',
'.nvid-toast.on{opacity:1}',
'@media(max-width:900px){.nvid-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}}',
'@media(max-width:560px){.nvid-grid{gap:12px}.nvid-card{border-radius:18px;padding:10px 10px 14px}.nvid-v{border-radius:12px}.nvid-card h2.t{font-size:16px!important;margin:10px 2px 4px!important}.nvid-card p.l{font-size:13.5px!important;-webkit-line-clamp:3;margin:0 2px 10px!important}.nvid-b{padding:0 2px;gap:6px}.nvid-b a,.nvid-b button{font-size:13px!important;padding:7px 10px}.nvid-b .x{display:none}.nvid-v button.p{width:52px;height:52px}.nvid-top p.d{font-size:17px!important}}'
].join('\n');

function toast(msg){var t=document.querySelector('.nvid-toast');if(!t){t=document.createElement('div');t.className='nvid-toast';document.body.appendChild(t);}
  t.textContent=msg;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('on');},2200);}

var blobs={};
function prefetch(k){if(!blobs[k])blobs[k]=fetch(BASE+k+'.mp4').then(function(r){if(!r.ok)throw 0;return r.blob();}).catch(function(){blobs[k]=null;return null;});return blobs[k];}

function share(k,btn){
  var r=REELS[k], url=SITE+'/videos#'+k, text=title(r.t)+' (The News in Data)';
  function link(){
    if(navigator.share){return navigator.share({title:title(r.t),text:text,url:url}).catch(function(){});}
    return (navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(function(){toast('Link copied');},function(){prompt('Copy this link:',url);});
  }
  /* Phones that can share files get the video itself plus the link; everything else gets the link. */
  if(navigator.canShare&&navigator.share&&blobs[k]){
    return blobs[k].then(function(b){
      if(!b)return link();
      var f=new File([b],k+'-thenewsindata.mp4',{type:'video/mp4'});
      if(!navigator.canShare({files:[f]}))return link();
      return navigator.share({files:[f],title:title(r.t),text:text+' '+url}).catch(function(e){if(e&&e.name!=='AbortError')return link();});
    });
  }
  return link();
}

var current=null;
function play(card){
  var k=card.getAttribute('data-k'), box=card.querySelector('.nvid-v');
  if(current&&current!==box){var ov=current.querySelector('video');if(ov){ov.pause();}}
  var v=box.querySelector('video');
  if(!v){v=document.createElement('video');v.src=BASE+k+'.mp4';v.poster=BASE+k+'-poster.jpg';v.playsInline=true;v.setAttribute('playsinline','');v.controls=true;v.preload='auto';box.appendChild(v);
    v.addEventListener('play',function(){box.classList.add('on');});}
  box.classList.add('on'); current=box; prefetch(k);
  v.play().catch(function(){v.muted=true;v.play().catch(function(){});});
}

function card(k,line,story){
  var r=REELS[k], t=title(r.t), has=story&&r.s&&r.s!=='-';
  return '<article class="nvid-card" id="'+esc(k)+'" data-k="'+esc(k)+'">'+
    '<div class="nvid-v" role="button" tabindex="0" aria-label="Play: '+esc(t)+'"><img src="'+BASE+esc(k)+'-poster.jpg" alt="" loading="lazy"><button class="p" type="button" tabindex="-1" aria-hidden="true">'+PLAY+'</button></div>'+
    '<h2 class="t">'+esc(t)+'</h2>'+(line?'<p class="l">'+esc(line)+'</p>':'')+
    '<div class="nvid-b"><button class="s" type="button">'+SHI+'Share</button>'+
    (has?'<a class="r" href="/stories/'+esc(r.s)+'">Read the story</a>':'')+
    '<a class="i" href="'+IG+'" target="_blank" rel="noopener" aria-label="Watch on Instagram">'+IGI+'<span class="x">Instagram</span></a></div></article>';
}

function render(byslug){
  var keys=Object.keys(REELS);
  var h='<div class="nvid"><div class="nvid-top"><p class="k">Videos</p><h1 class="nvid-h">Our Charts, Animated</h1>'+
    '<p class="d">Each video turns one of our stories into a chart you can watch in under a minute. Tap to play, send one to a friend, or read the full story behind it.</p>'+
    '<a class="nvid-f" href="'+IG+'" target="_blank" rel="noopener">'+IGI+'Follow @thenewsindata</a></div><div class="nvid-grid">';
  keys.forEach(function(k){var r=REELS[k],it=byslug[r.s];var line=it?strip(it.excerpt):(NOTE[k]||'');h+=card(k,line,it);});
  root.innerHTML=h+'</div></div>';
  [].forEach.call(root.querySelectorAll('.nvid-card'),function(c){
    var k=c.getAttribute('data-k'), box=c.querySelector('.nvid-v');
    box.addEventListener('click',function(e){if(!box.classList.contains('on'))play(c);});
    box.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();play(c);}});
    var b=c.querySelector('button.s');
    b.addEventListener('pointerdown',function(){prefetch(k);});
    b.addEventListener('click',function(){share(k,b);});
  });
  var h0=location.hash.slice(1), t=h0&&document.getElementById(h0);
  if(t&&t.classList.contains('nvid-card')){setTimeout(function(){t.scrollIntoView({behavior:'smooth',block:'start'});t.classList.add('hl');setTimeout(function(){t.classList.remove('hl');},2600);},200);}
}

if(!document.getElementById('nvid-css')){var st=document.createElement('style');st.id='nvid-css';st.textContent=CSS;document.head.appendChild(st);}
fetch('/stories?format=json',{credentials:'same-origin'}).then(function(r){return r.json();}).then(function(j){
  var m={};(j.items||[]).forEach(function(i){m[i.urlId]=i;});
  /* stories older than the first page of the feed: fetch them one by one */
  var miss=Object.keys(REELS).map(function(k){return REELS[k].s;}).filter(function(s){return s&&s!=='-'&&!m[s];});
  return Promise.all(miss.filter(function(s,i,a){return a.indexOf(s)===i;}).map(function(s){
    return fetch('/stories/'+s+'?format=json',{credentials:'same-origin'}).then(function(r){return r.json();}).then(function(x){if(x&&x.item)m[s]=x.item;}).catch(function(){});
  })).then(function(){return m;});
}).catch(function(){return {};}).then(render);
})();
