/* The News in Data: Play card on every story page.
   Placed right after the story's first chart. Each listed story gets a related game whose answer it doesn't
   already show; every other story gets the newest Today's Chart. Loaded site-wide by more/home.js.
   To give a new story its own game: add its slug to STORY below. */
(function(){
if(window.top!==window.self)return;
var m=location.pathname.match(/^\/stories\/([^\/?#]+)/);if(!m)return;
if(window.__nidPlayCard)return;window.__nidPlayCard=1;
var slug=m[1],BASE='https://stories.thenewsindata.com/play/';

/* guess games that can be started from the card */
var GUESS={
 japan:{k:'Guess the number',q:'What share of Japanese adults say there is no one special person they feel very close to?',min:0,max:60,start:10,unit:'%'},
 candy:{k:'Guess the number',q:'From August 2020 to August 2026, how much did candy prices rise?',min:0,max:100,start:15,unit:'%'},
 canada:{k:'Guess the number',q:'How did Canadian trips to the U.S. this year compare with 2024?',min:-60,max:20,start:0,unit:'%',signed:true},
 luka:{k:'Guess the number',q:'Through nine games, how many points a game is Luka Dončić scoring?',min:20,max:55,start:30,unit:' pts'},
 manu:{k:'Guess the number',q:'Rappers have named Manu Ginóbili in how many songs?',min:0,max:3000,step:25,start:300,unit:''}
};
/* story slug -> game. Anything not listed gets the newest Today's Chart. */
var STORY={
 /* Each story offers a related game whose answer it doesn't already show. */
 'chinas-emissions-have-been-flat-or-falling-since-march-2024-and-69-countries-now-emit-at-least-10-less-than-at-their-peak':{today:2},
 'in-the-worlds-largest-flourishing-study-8-of-the-10-richest-countries-rank-in-the-bottom-half':{guess:'japan'},
 'one-in-three-japanese-adults-say-theres-no-one-they-feel-very-close-to-more-than-twice-the-us-share':{today:5},
 'candy-prices-are-up-49-since-2020-while-overall-prices-rose-29-and-wages-28':{guess:'canada'},
 'canadians-made-25-fewer-trips-to-the-us-this-year-than-in-2024-while-their-trips-elsewhere-rose-12':{guess:'candy'},
 'luka-doncic-is-scoring-401-points-a-game-a-pace-only-wilt-chamberlain-has-topped':{today:3},
 'who-owns-prime-time-the-nfl-books-audiences-not-records':{guess:'luka'},
 'rappers-have-named-manu-ginbili-in-at-least-1489-songs-and-most-came-after-he-retired':{today:4},
 'one-mickey-mouse-club-cast-produced-five-major-award-winners-and-nearly-half-its-members-never-got-a-wikipedia-page':{guess:'manu'},
 'midterm-turnout-in-2022-ranged-from-31-in-tennessee-to-62-in-oregon':{guess:'candy'},
 'credit-card-partners-paid-american-airlines-62-billion-in-2025-four-times-its-operating-profit':{guess:'canada'},
 'the-faa-ground-stop-moved-nine-college-football-games-one-all-the-way-to-sunday':{guess:'luka'}
};

var CSS=[
'.npc{--g:#007A55;--gd:#005C40;--ink:#13241B;--mute:#5F7268;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;color:var(--ink);box-sizing:border-box;margin:2.2em auto!important;max-width:620px;position:relative;border-radius:16px;padding:20px 20px 18px;',
/* the one bit of shine: a thin iridescent edge that drifts slowly */
'border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(115deg,#E2B94F,#EBB8D6,#8FD3C4,#A9BCEF,#E2B94F,#EBB8D6) border-box;background-size:100% 100%,300% 100%;box-shadow:0 10px 28px rgba(19,36,27,.08)}',
'@media (prefers-reduced-motion:no-preference){.npc{animation:npcSheen 9s linear infinite}.npc-spark{animation:npcTw 3.2s ease-in-out infinite}}',
'@keyframes npcSheen{0%{background-position:0 0,0% 0}100%{background-position:0 0,300% 0}}',
'@keyframes npcTw{0%,70%,100%{transform:scale(1) rotate(0);opacity:1}82%{transform:scale(1.35) rotate(20deg);opacity:.85}}',
'.npc *{box-sizing:border-box}',
'.npc a{text-decoration:none!important}',
'.npc .npc-top{display:flex;align-items:center;gap:8px;margin:0 0 8px}',
'.npc .npc-spark{width:20px;height:20px;flex:none;display:block}',
'.npc .npc-k{font-size:12px!important;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--g)!important;line-height:1.2!important;margin:0!important}',
'.npc .npc-q{font-family:"Times New Roman",Times,serif!important;font-size:22px!important;font-weight:700!important;line-height:1.22!important;margin:0 0 10px!important;color:var(--ink)!important}',
'.npc-row{display:flex;align-items:center;gap:14px;margin:4px 0 2px}',
'.npc-val{font-family:"Times New Roman",Times,serif;font-size:40px;font-weight:700;color:var(--g);min-width:2.6em;font-variant-numeric:tabular-nums;line-height:1}',
'.npc-range{flex:1;min-width:0;accent-color:#007A55;height:36px}',
'.npc svg.npc-mini{display:block;width:100%;height:auto;margin:2px 0 6px}',
'.npc a.npc-cta{display:inline-flex!important;align-items:center;gap:8px;background:var(--g)!important;color:#fff!important;border-radius:999px;padding:12px 20px;font-size:15px!important;font-weight:700;line-height:1.2!important;margin-top:8px;transition:transform .2s,background .2s,box-shadow .2s}',
'.npc a.npc-cta:hover{background:var(--gd)!important;transform:translateY(-2px);box-shadow:0 10px 22px rgba(0,92,64,.22)}',
'.npc a.npc-cta:focus-visible,.npc-range:focus-visible{outline:3px solid #7FC4A6;outline-offset:3px}',
'.npc .npc-note{font-size:13px!important;color:var(--mute)!important;margin:10px 0 0!important;line-height:1.4!important}',
'.npc .npc-note a{color:var(--g)!important;font-weight:600}'
].join('');
var SPARK='<svg class="npc-spark" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="npcG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3D27A"/><stop offset=".45" stop-color="#E9B949"/><stop offset=".75" stop-color="#E7B8D3"/><stop offset="1" stop-color="#9FD8CC"/></linearGradient></defs><path d="M12 1.5c.6 4.9 2.6 7.4 9 10.5-6.4 3.1-8.4 5.6-9 10.5-.6-4.9-2.6-7.4-9-10.5 6.4-3.1 8.4-5.6 9-10.5z" fill="url(#npcG)"/></svg>';

function css(){if(document.getElementById('npc-css'))return;var s=document.createElement('style');s.id='npc-css';s.textContent=CSS;document.head.appendChild(s)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function mini(p){
  var W=420,H=80,r=3.6,tv=function(v){return p.log?Math.log10(Math.max(v,1)):v},vals=p.items.map(function(i){return tv(i[1])}),lo=Math.min.apply(0,vals),hi=Math.max.apply(0,vals);
  var x=function(v){return 8+(tv(v)-lo)/(hi-lo||1)*(W-16)},pts=p.items.map(function(it){return {it:it,x:x(it[1]),y:0}}).sort(function(a,b){return a.x-b.x}),placed=[],d=2*r+.8;
  pts.forEach(function(q){for(var k=0;k<120;k++){var off=(k%2?1:-1)*Math.ceil(k/2)*d*.9;if(Math.abs(off)>30)off=Math.sign(off)*30;var ok=placed.every(function(o){var dx=o.x-q.x,dy=o.y-off;return dx*dx+dy*dy>=d*d});if(ok||Math.abs(off)>=30){q.y=off;break}}placed.push(q)});
  var s='<svg class="npc-mini" viewBox="0 0 '+W+' '+H+'" aria-hidden="true">',a;
  pts.forEach(function(q){if(q.it[0]===p.answer){a=q;return}s+='<circle cx="'+q.x+'" cy="'+(H/2+q.y)+'" r="'+r+'" fill="#D3DBD6"/>'});
  if(a)s+='<circle cx="'+a.x+'" cy="'+(H/2+a.y)+'" r="'+(r+4)+'" fill="#007A55" stroke="#fff" stroke-width="2"/><text x="'+a.x+'" y="'+(H/2+a.y-13)+'" text-anchor="middle" stroke="#fff" stroke-width="4" paint-order="stroke" font-family="Times New Roman,serif" font-weight="700" font-size="16" fill="#007A55">?</text>';
  return s+'</svg>';
}
function fmt(g,v){v=+v;return (g.signed&&v>0?'+':v<0?'−':'')+Math.abs(v).toLocaleString('en-US')+g.unit}

function build(){
  var pick=STORY[slug]||{},P=window.NID_PUZZLES||[],h,g,key;
  if(pick.guess&&GUESS[pick.guess]){
    key=pick.guess;g=GUESS[key];
    h='<div class="npc-top">'+SPARK+'<div class="npc-k">Play · '+esc(g.k)+'</div></div><div class="npc-q">'+esc(g.q)+'</div>'+
      '<div class="npc-row"><span class="npc-val" aria-live="polite">'+fmt(g,g.start)+'</span><label style="position:absolute;left:-9999px" for="npc-r">Your guess</label><input class="npc-range" id="npc-r" type="range" min="'+g.min+'" max="'+g.max+'" step="'+(g.step||1)+'" value="'+g.start+'"></div>'+
      '<a class="npc-cta" href="'+BASE+key+'/">Lock in my guess →</a><div class="npc-note">See the answer, how every other reader guessed, and a card to share. <a href="'+BASE+'">More games</a></div>';
  }else{
    var p=null;P.forEach(function(x){if(x.n===pick.today)p=x});if(!p)p=P[P.length-1];if(!p)return null;
    h='<div class="npc-top">'+SPARK+'<div class="npc-k">Play · Today’s Chart #'+p.n+' · '+esc(p.topic)+'</div></div><div class="npc-q">'+esc(p.ask)+'</div>'+mini(p)+
      '<a class="npc-cta" href="'+BASE+'today/?n='+p.n+'">Find it in six guesses →</a><div class="npc-note">'+esc(p.clue)+' <a href="'+BASE+'">More games</a></div>';
  }
  var d=document.createElement('aside');d.className='npc';d.setAttribute('aria-label','Play a 30-second data game');d.innerHTML=h;
  if(g){var r=d.querySelector('.npc-range'),v=d.querySelector('.npc-val'),a=d.querySelector('.npc-cta');
    r.oninput=function(){v.textContent=fmt(g,r.value);a.href=BASE+key+'/?g='+r.value}}
  return d;
}
function place(){
  if(document.querySelector('.npc'))return true;
  var body=document.querySelector('.blog-item-content');if(!body)return false;
  var root=body.querySelector('.nid-a')||body;
  var figs=root.querySelectorAll('figure, .nid-fig');var fig=root.querySelector('[data-npc-after]')||figs[Math.min(2,figs.length-1)];
  var d=build();if(!d)return false;css();
  if(fig&&fig.parentNode){fig.parentNode.insertBefore(d,fig.nextSibling)}
  else{var ps=root.querySelectorAll('p');if(ps.length>2)ps[1].parentNode.insertBefore(d,ps[1].nextSibling);else root.appendChild(d)}
  return true;
}
function go(){var t=0;(function f(){if(place()||++t>25)return;setTimeout(f,300)})()}
var s=document.createElement('script');s.src=BASE+'today/puzzles.js?v=5';s.onload=s.onerror=go;document.head.appendChild(s);
})();
