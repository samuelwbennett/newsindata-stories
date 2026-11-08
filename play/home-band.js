/* The News in Data: "Play" band on the home page, right under the top story.
   Readers can lock in a guess here; the button opens the full game with that guess.
   The Today's Chart tile draws the newest puzzle from /play/today/puzzles.js.
   Loaded by more/home.js. To feature a different guess game, edit GUESS below. */
(function(){
if(window.top!==window.self)return;
if(location.pathname!=='/'&&location.pathname!=='')return;
if(window.__nidPlay)return;window.__nidPlay=1;
var BASE='https://stories.thenewsindata.com/play/';
/* The slider game rotates on each visit; the side tile shows a different game. */
var GAMES=[
 {slug:'luka',k:'Guess the number \u00b7 Sports',q:'Through nine games, how many points a game is Luka Don\u010di\u0107 scoring?',min:20,max:55,start:30,unit:' pts'},
 {slug:'manu',k:'Guess the number \u00b7 Culture',q:'Rappers have named Manu Gin\u00f3bili in how many songs?',min:0,max:3000,step:25,start:300,unit:''},
 {slug:'candy',k:'Guess the number \u00b7 Trending',q:'From August 2020 to August 2026, how much did candy prices rise?',min:0,max:100,start:15,unit:'%'}
];
var gi=Math.floor(Math.random()*GAMES.length),GUESS=GAMES[gi],SIDE=GAMES[(gi+1)%GAMES.length];

var CSS=[
'.npl{--g:#007A55;--gd:#005C40;--gl:#E6F2EC;--ink:#13241B;--mute:#5F7268;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;color:var(--ink);box-sizing:border-box}',
'.npl *{box-sizing:border-box}',
'.npl a{text-decoration:none!important}',
'.npl-band{position:relative;width:100vw;margin:64px 0 8px calc(50% - 50vw);background-color:#F4F8F5;background-image:linear-gradient(rgba(0,122,85,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,122,85,.06) 1px,transparent 1px);background-size:28px 28px;border-top:1px solid #DCE7E0;border-bottom:1px solid #DCE7E0}',
'.npl-in{max-width:1080px;margin:0 auto;padding:60px 24px 64px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:48px;align-items:center}',
'.npl .npl-pill{display:inline-flex;align-items:center;gap:8px;color:var(--g)!important;border:1px solid rgba(0,122,85,.45);border-radius:999px;padding:5px 12px 5px 10px;font-size:13px!important;font-weight:700;letter-spacing:.06em;text-transform:uppercase;line-height:1.2!important;background:#fff}',
'.npl-pill i{width:8px;height:8px;border-radius:50%;background:var(--g);animation:nplp 1.8s ease-in-out infinite}',
'@keyframes nplp{0%,100%{opacity:1}50%{opacity:.3}}',
'.npl h2.npl-h{font-family:"Times New Roman",Times,serif!important;font-weight:700!important;color:var(--ink)!important;font-size:clamp(38px,5.4vw,62px)!important;line-height:1.04!important;letter-spacing:-.01em!important;margin:18px 0 14px!important}',
'.npl h2.npl-h em{font-style:italic!important;color:var(--g)!important;font-family:inherit!important}',
'.npl p.npl-p{font-size:18px!important;line-height:1.5!important;color:#33463B!important;margin:0 0 24px!important;max-width:30em}',
'.npl-try{background:#fff;border:1px solid #DCE7E0;border-radius:16px;padding:20px 20px 18px;box-shadow:0 10px 30px rgba(19,36,27,.07)}',
'.npl .npl-q{font-family:"Times New Roman",Times,serif!important;font-size:20px!important;font-weight:700;line-height:1.25!important;margin:0 0 8px!important;color:var(--ink)!important}',
'.npl-row{display:flex;align-items:center;gap:16px}',
'.npl-val{font-family:"Times New Roman",Times,serif;font-size:46px;font-weight:700;color:var(--g);min-width:2.6em;font-variant-numeric:tabular-nums;line-height:1}',
'.npl-range{flex:1;accent-color:#007A55;height:36px;min-width:0}',
'.npl a.npl-cta{display:inline-flex!important;align-items:center;gap:10px;background:var(--g)!important;color:#fff!important;border-radius:999px;padding:14px 22px;font-size:16px!important;font-weight:700;line-height:1.2!important;margin-top:10px;transition:transform .2s,box-shadow .2s,background .2s}',
'.npl a.npl-cta:hover{background:var(--gd)!important;transform:translateY(-2px);box-shadow:0 12px 26px rgba(0,92,64,.25)}',
'.npl a.npl-cta:focus-visible,.npl a.npl-tile:focus-visible,.npl-range:focus-visible{outline:3px solid #7FC4A6;outline-offset:3px}',
'.npl-note{font-size:13px;color:var(--mute);margin-top:10px}',
'.npl-tiles{display:grid;gap:14px}',
'.npl a.npl-tile{display:block;background:#fff;border:1px solid #DCE7E0;border-radius:16px;padding:18px 20px;color:var(--ink)!important;transition:transform .2s,box-shadow .2s,border-color .2s}',
'.npl a.npl-tile:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(19,36,27,.10);border-color:var(--g)}',
'.npl-tile small{display:block;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--g);margin-bottom:6px}',
'.npl-tile b{display:block;font-family:"Times New Roman",Times,serif;font-size:22px;line-height:1.2;margin-bottom:6px}',
'.npl-tile span{font-size:14px;color:var(--g);font-weight:700}',
'.npl-tile svg{display:block;width:100%;height:auto;margin:6px 0 10px}',
'.npl a.npl-all{display:inline-block;color:var(--g)!important;font-weight:700;font-size:15px!important;margin-top:4px}',
'@media (max-width:820px){.npl-in{grid-template-columns:1fr;gap:28px;padding:44px 20px 48px}.npl-band{margin-top:44px}}'
].join('');

function css(){if(document.getElementById('npl-css'))return;var s=document.createElement('style');s.id='npl-css';s.textContent=CSS;document.head.appendChild(s)}
function fmt(v){return Number(v).toLocaleString('en-US')+GUESS.unit}

/* mini beeswarm of the newest Today's Chart puzzle; the mystery is the green dot */
function mini(p){
  var W=420,H=86,r=3.6,tv=function(v){return p.log?Math.log10(Math.max(v,1)):v},vals=p.items.map(function(i){return tv(i[1])}),lo=Math.min.apply(0,vals),hi=Math.max.apply(0,vals);
  var x=function(v){return 8+(tv(v)-lo)/(hi-lo||1)*(W-16)},pts=p.items.map(function(it){return {it:it,x:x(it[1]),y:0}}).sort(function(a,b){return a.x-b.x}),placed=[],d=2*r+.8;
  pts.forEach(function(q){for(var k=0;k<120;k++){var off=(k%2?1:-1)*Math.ceil(k/2)*d*.9;if(Math.abs(off)>34)off=Math.sign(off)*34;var ok=placed.every(function(o){var dx=o.x-q.x,dy=o.y-off;return dx*dx+dy*dy>=d*d});if(ok||Math.abs(off)>=34){q.y=off;break}}placed.push(q)});
  var s='<svg viewBox="0 0 '+W+' '+H+'" aria-hidden="true">',a;
  pts.forEach(function(q){if(q.it[0]===p.answer){a=q;return}s+='<circle cx="'+q.x+'" cy="'+(H/2+q.y)+'" r="'+r+'" fill="#D3DBD6"/>'});
  if(a)s+='<circle cx="'+a.x+'" cy="'+(H/2+a.y)+'" r="'+(r+4)+'" fill="#007A55" stroke="#fff" stroke-width="2"/><text x="'+a.x+'" y="'+(H/2+a.y-14)+'" text-anchor="middle" stroke="#fff" stroke-width="4" paint-order="stroke" font-family="Times New Roman,serif" font-weight="700" font-size="16" fill="#007A55">?</text>';
  return s+'</svg>';
}

function band(){
  var nid=document.querySelector('div.nid'),lead=nid&&nid.querySelector(':scope > .lead');
  if(!lead)return false;if(document.querySelector('.npl-band'))return true;
  css();
  var p=(window.NID_PUZZLES||[]).slice(-1)[0];
  var d=document.createElement('section');d.className='npl npl-band';d.setAttribute('aria-label','Play: guess the numbers behind the news');
  d.innerHTML='<div class="npl-in"><div>'+
    '<span class="npl-pill"><i></i>New · Play</span>'+
    '<h2 class="npl-h">Guess first, <em>then</em> see the data.</h2>'+
    '<p class="npl-p">Commit to a number before the chart appears. Then see how close you were, how every other reader guessed, and share your result.</p>'+
    '<div class="npl-try"><p class="npl-q">'+GUESS.q+'</p>'+
    '<div class="npl-row"><span class="npl-val" aria-live="polite">'+fmt(GUESS.start)+'</span><label style="position:absolute;left:-9999px" for="npl-r">Your guess</label><input class="npl-range" id="npl-r" type="range" min="'+GUESS.min+'" max="'+GUESS.max+'" step="'+(GUESS.step||1)+'" value="'+GUESS.start+'"></div>'+
    '<a class="npl-cta" href="'+BASE+GUESS.slug+'/">Lock in my guess →</a><div class="npl-note">Opens the full game with your answer, the chart and the crowd.</div></div>'+
    '</div><div class="npl-tiles">'+
    (p?'<a class="npl-tile" href="'+BASE+'today/"><small>Today’s Chart #'+p.n+' · '+p.topic+'</small><b>'+p.ask+'</b>'+mini(p)+'<span>Find it in six guesses →</span></a>':'')+
    '<a class="npl-tile" href="'+BASE+SIDE.slug+'/"><small>'+SIDE.k+'</small><b>'+SIDE.q+'</b><span>Make your guess →</span></a>'+
    '<a class="npl-all" href="'+BASE+'">All games →</a>'+
    '</div></div>';
  lead.parentNode.insertBefore(d,lead.nextSibling);
  var r=d.querySelector('.npl-range'),v=d.querySelector('.npl-val'),a=d.querySelector('.npl-cta'),moved=false;
  r.oninput=function(){moved=true;v.textContent=fmt(r.value);a.href=BASE+GUESS.slug+'/?g='+r.value};
  a.onclick=function(){if(!moved)a.href=BASE+GUESS.slug+'/'};
  return true;
}
function load(){var s=document.createElement('script');s.src=BASE+'today/puzzles.js?v=4';s.onload=s.onerror=go;document.head.appendChild(s)}
var tries=0;function go(){if(band()||++tries>20)return;setTimeout(go,300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load);else load();
})();
