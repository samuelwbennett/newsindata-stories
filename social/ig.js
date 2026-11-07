/* The News in Data on Instagram: a full-width follow band on the home page and a compact
   follow card at the end of every story, each with a phone that plays our chart Reels.
   Loaded by more/home.js, which the site loads on every page. */
(function(){
if(window.top!==window.self)return;                     /* skip the Squarespace editor preview */
if(window.__nidIG)return; window.__nidIG=1;
var IG='https://www.instagram.com/thenewsindata/';
var BASE='https://stories.thenewsindata.com/social/web/';
var REELS={
  luka:{t:'The 10 highest-scoring seasons in NBA history',s:'luka-doncic-is-scoring-401-points-a-game-a-pace-only-wilt-chamberlain-has-topped'},
  midterms:{t:"The president's party lost House seats in 18 of 20 midterms",s:'the-presidents-party-has-lost-house-seats-in-18-of-the-20-midterms-since-world-war-ii'},
  solar:{t:'Which countries make the most solar power?',s:'renewables-now-generate-more-than-three-times-as-much-of-the-worlds-electricity-as-nuclear-power-does'},
  turnout:{t:'Which states vote the most in midterm elections?',s:'midterm-turnout-in-2022-ranged-from-31-in-tennessee-to-62-in-oregon'},
  coal:{t:'Which countries burn the most coal?',s:'chinas-emissions-have-been-flat-or-falling-since-march-2024-and-69-countries-now-emit-at-least-10-less-than-at-their-peak'},
  travel:{t:'How deadly is each way to travel?',s:'the-drive-to-the-airport-is-the-riskiest-part-of-a-holiday-flight'},
  aging:{t:'Which presidents appeared to age fastest in office?',s:'carter-clinton-and-nixon-appeared-to-age-fastest-in-office-in-a-face-models-reading-of-7000-photos'},
  trust:{t:"Trust in national news is up to 62%, below 2016's 76%",s:'trust-in-national-news-rose-6-points-in-the-past-year-to-62-still-well-below-the-76-of-2016'},
  renew:{t:'Renewables passed coal as a power source in 2025',s:'renewables-now-generate-more-than-three-times-as-much-of-the-worlds-electricity-as-nuclear-power-does'}
};
var HOME_ORDER=['luka','midterms','solar','turnout','coal','travel'];
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var GLYPH='<svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.25" fill="currentColor"/></svg>';

var CSS=[
'.nig{--g:#007A55;--gd:#005C40;--ink:#13241B;--paper:#FBFCFA;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;color:#fff;box-sizing:border-box}',
'.nig *{box-sizing:border-box}',
'.nig a{text-decoration:none!important}',
/* graph-paper green: the band is a chart */
'.nig-band{position:relative;width:100vw;margin:72px 0 72px calc(50% - 50vw);overflow:hidden;background-color:var(--g);background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px),radial-gradient(120% 90% at 85% 40%,rgba(255,255,255,.10),transparent 60%);background-size:44px 44px,44px 44px,100% 100%}',
'.nig-band .in{max-width:1080px;margin:0 auto;padding:72px max(24px,env(safe-area-inset-right,0px)) 76px max(24px,env(safe-area-inset-left,0px));display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:48px;align-items:center}',
'.nig .nig-pill{display:inline-flex;align-items:center;gap:8px;color:#fff!important;line-height:1.2!important;border:1px solid rgba(255,255,255,.5);border-radius:999px;padding:5px 12px 5px 10px;font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}',
'.nig-pill i{width:8px;height:8px;border-radius:50%;background:#fff;animation:nigp 1.8s ease-in-out infinite}',
'@keyframes nigp{0%,100%{opacity:1}50%{opacity:.3}}',
'.nig h2.nig-h{font-family:"Times New Roman",Times,serif!important;font-weight:700!important;color:#fff!important;font-size:clamp(42px,6vw,72px)!important;line-height:1.02!important;letter-spacing:-.01em!important;margin:24px 0 18px!important;text-wrap:balance;text-transform:none!important}',
'.nig h2.nig-h em{font-family:inherit!important;font-style:italic!important;font-weight:700!important;color:#CFEBDD!important}',
'.nig p.nig-p{color:rgba(255,255,255,.92)!important;font-size:19px!important;line-height:1.5!important;margin:0 0 30px!important;max-width:30em}',
'.nig a.nig-cta{display:inline-flex!important;align-items:center;gap:10px;white-space:nowrap!important;line-height:1.2!important;background:#fff!important;color:var(--ink)!important;border-radius:999px;padding:16px 26px 16px 22px;font-size:18px!important;font-weight:700!important;box-shadow:0 10px 30px rgba(0,0,0,.18);transition:transform .15s ease,box-shadow .15s ease}',
'.nig a.nig-cta:hover{transform:translateY(-2px);box-shadow:0 14px 34px rgba(0,0,0,.24)}',
'.nig a.nig-cta:focus-visible{outline:3px solid #fff;outline-offset:3px}',
'.nig a.nig-cta svg{color:var(--g)!important;width:22px!important;height:22px!important;flex:none!important;max-width:none!important}',
'.nig .nig-who{line-height:1.35!important;display:flex;align-items:center;gap:12px;margin-top:26px;font-size:15px;color:rgba(255,255,255,.88)}',
'.nig-who img{width:40px;height:40px;border-radius:50%;box-shadow:0 0 0 2px rgba(255,255,255,.8)}',
'.nig-who b{color:#fff}',
/* the phone and the fanned covers behind it */
'.nig-stage{position:relative;height:560px;display:flex;justify-content:center;align-items:center}',
'.nig-card{position:absolute;width:190px;aspect-ratio:3/4;border-radius:12px;background:#fff center/cover no-repeat;box-shadow:0 18px 40px rgba(0,0,0,.25);transition:transform .6s cubic-bezier(.2,.8,.2,1)}',
'.nig-card.l{transform:translate(-150px,30px) rotate(-11deg)}',
'.nig-card.r{transform:translate(150px,40px) rotate(9deg)}',
'.nig-band:hover .nig-card.l{transform:translate(-175px,22px) rotate(-14deg)}',
'.nig-band:hover .nig-card.r{transform:translate(175px,30px) rotate(12deg)}',
'.nig-phone{position:relative;z-index:2;width:258px;aspect-ratio:9/19.5;border-radius:42px;background:#0d1612;padding:10px;box-shadow:0 30px 60px rgba(0,0,0,.35),inset 0 0 0 2px #2a3a31;transform:rotate(-2.5deg)}',
'.nig-phone .scr{position:relative;width:100%;height:100%;border-radius:33px;overflow:hidden;background:#FBFCFA}',
'.nig-phone video,.nig-phone img.pv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
'.nig-phone .notch{position:absolute;z-index:3;top:9px;left:50%;transform:translateX(-50%);width:84px;height:24px;border-radius:14px;background:#0d1612}',
'.nig-phone .ui{position:absolute;z-index:3;left:0;right:0;bottom:0;padding:38px 14px 14px;background:linear-gradient(transparent,rgba(13,22,18,.82) 45%);color:#fff!important;font-size:12.5px!important;line-height:1.3!important;text-align:left}','.nig-phone .ui *{color:#fff!important}',
'.nig-phone .ui b{display:flex;align-items:center;gap:7px;font-size:13px;margin-bottom:4px}',
'.nig-phone .ui b img{width:22px;height:22px;border-radius:50%}',
'.nig-phone .ui .fb{margin-left:4px;border:1px solid rgba(255,255,255,.8);border-radius:6px;padding:1px 7px;font-size:11.5px}',
'.nig-dots{position:absolute;z-index:3;bottom:-34px;left:50%;transform:translateX(-50%);display:flex;gap:7px}',
'.nig-dots span{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.4);transition:background .3s,width .3s}',
'.nig-dots span.on{width:20px;border-radius:4px;background:#fff}',
'@media(max-width:820px){.nig-band .in{grid-template-columns:1fr;gap:28px;padding-top:56px;padding-bottom:70px;text-align:center}.nig p{margin-left:auto;margin-right:auto}.nig-who{justify-content:center}.nig-stage{height:500px}.nig-card{width:150px}.nig-card.l{transform:translate(-112px,30px) rotate(-11deg)}.nig-card.r{transform:translate(112px,40px) rotate(9deg)}.nig-phone{width:220px}}',
/* end-of-story card */
'.nig-story{position:relative;margin:48px 0 8px;border-radius:18px;overflow:hidden;background-color:var(--g);background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:36px 36px;display:grid;grid-template-columns:auto minmax(0,1fr);gap:28px;align-items:center;padding:26px 30px 26px 26px}',
'.nig-story .nig-phone{width:150px;border-radius:28px;padding:7px;transform:rotate(-3deg)}',
'.nig-story .nig-phone .scr{border-radius:22px}',
'.nig-story .nig-phone .notch{width:50px;height:15px;top:6px}',
'.nig-story h3.nig-h{font-family:"Times New Roman",Times,serif!important;color:#fff!important;font-size:30px!important;line-height:1.1!important;font-weight:700!important;margin:12px 0 10px!important;text-wrap:balance;text-transform:none!important;letter-spacing:0!important}',
'.nig-story p.nig-p{font-size:16.5px!important;margin:0 0 18px!important}',
'.nig-story a.nig-cta{font-size:16px!important;padding:13px 22px 13px 18px}',
'@media(max-width:600px){.nig-story{grid-template-columns:1fr;justify-items:center;text-align:center;padding:26px 20px}.nig-story .nig-phone{width:140px}}',
'@media(prefers-reduced-motion:reduce){.nig *{animation:none!important;transition:none!important}}'
].join('\n');

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

function phone(keys,big){
  var k0=keys[0];
  var dots=big&&keys.length>1?'<div class="nig-dots">'+keys.map(function(_,i){return '<span'+(i?'':' class="on"')+'></span>';}).join('')+'</div>':'';
  return '<div class="nig-phone"><div class="scr">'+
    '<img class="pv" src="'+BASE+k0+'-poster.jpg" alt="" loading="lazy">'+
    (reduce?'':'<video muted playsinline preload="none" poster="'+BASE+k0+'-poster.jpg" aria-hidden="true"></video>')+
    '<span class="notch"></span>'+
    (big?'<div class="ui"><b><img src="'+BASE+'avatar.png" alt="">thenewsindata<span class="fb">Follow</span></b><span class="cap">'+esc(REELS[k0].t)+'</span></div>':'')+
    '</div>'+dots+'</div>';
}

/* play the reels in turn while the phone is on screen */
function wire(root,keys){
  var v=root.querySelector('video'); if(!v)return;
  var cap=root.querySelector('.cap'), dots=root.querySelectorAll('.nig-dots span'), i=0, started=false;
  function load(k){v.src=BASE+keys[k]+'.mp4';v.poster=BASE+keys[k]+'-poster.jpg';
    if(cap)cap.textContent=REELS[keys[k]].t;
    [].forEach.call(dots,function(d,j){d.className=j===k?'on':'';});}
  v.addEventListener('ended',function(){i=(i+1)%keys.length;load(i);v.play().catch(function(){});});
  if(keys.length===1)v.loop=true;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){if(!started){load(0);started=true;}v.play().catch(function(){});}
    else v.pause();});},{threshold:.35});
  io.observe(v);
}

function css(){if(document.getElementById('nig-css'))return;var s=document.createElement('style');s.id='nig-css';s.textContent=CSS;document.head.appendChild(s);}

function homeBand(){
  var nid=document.querySelector('div.nid'), anchor=nid&&nid.querySelector(':scope > .head');
  if(!anchor||document.querySelector('.nig-band'))return false;
  css();
  var d=document.createElement('section'); d.className='nig nig-band'; d.setAttribute('aria-label','Follow The News in Data on Instagram');
  d.innerHTML='<div class="in"><div>'+
    '<span class="nig-pill"><i></i>Now on Instagram</span>'+
    '<h2 class="nig-h">Our charts <em>move</em> now.</h2>'+
    '<p class="nig-p">Every day we turn one of our stories into a short animated chart, from the midterms to Luka Dončić’s scoring run. Follow along and they’ll show up in your feed, each one linked back to the full story here.</p>'+
    '<a class="nig-cta" href="'+IG+'" target="_blank" rel="noopener">'+GLYPH+'Follow @thenewsindata</a>'+
    '<div class="nig-who"><img src="'+BASE+'avatar.png" alt=""><span><b>@thenewsindata</b> · a new chart every day · making charts since 2016</span></div>'+
    '</div><a class="nig-stage" href="'+IG+'" target="_blank" rel="noopener" aria-label="Watch our charts on Instagram">'+
    '<span class="nig-card l" style="background-image:url('+BASE+'coal-grid.jpg)"></span>'+
    '<span class="nig-card r" style="background-image:url('+BASE+'trust-grid.jpg)"></span>'+
    phone(HOME_ORDER,true)+'</a></div>';
  nid.insertBefore(d,anchor);
  wire(d,HOME_ORDER);
  return true;
}

function storyCard(){
  var m=location.pathname.match(/^\/stories\/([^\/?#]+)/); if(!m)return false;
  if(document.querySelector('.nig-story'))return true;
  var slug=m[1], own=Object.keys(REELS).filter(function(k){return REELS[k].s===slug;});
  var keys=own.length?own:['luka','solar','midterms','travel'];
  var before=document.querySelector('.nid-use')||document.querySelector('.nid-more');
  var art=document.querySelector('.blog-item-content-wrapper, article .blog-item-content, article');
  if(!before&&!art)return false;
  css();
  var d=document.createElement('aside'); d.className='nig nig-story';
  d.innerHTML='<a href="'+IG+'" target="_blank" rel="noopener" aria-label="Watch on Instagram">'+phone(keys,false)+'</a><div>'+
    '<span class="nig-pill"><i></i>On Instagram</span>'+
    (own.length?'<h3 class="nig-h">This story is also an animated chart.</h3><p class="nig-p">Watch it move, and get a new chart in your feed every day.</p>'
               :'<h3 class="nig-h">Like this chart? Watch ours move.</h3><p class="nig-p">Follow for a new animated chart every day, each one linked back to the full story.</p>')+
    '<a class="nig-cta" href="'+IG+'" target="_blank" rel="noopener">'+GLYPH+'Follow @thenewsindata</a></div>';
  if(before)before.parentNode.insertBefore(d,before); else art.appendChild(d);
  wire(d,keys);
  return true;
}

function run(){
  var done=(location.pathname==='/'||location.pathname==='')?homeBand():storyCard();
  return done;
}
var tries=0;
(function go(){ if(run()||++tries>20)return; setTimeout(go,300); })();
})();
