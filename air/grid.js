/* The News in Data: "Each square is $100 million" interactive for the airline credit card story.
   Mount: <div class="ag" data-npc-after></div><script src="https://stories.thenewsindata.com/air/grid.js?v=1" defer></script>
   1) operating profit squares, 2) card-partner cash fills in when scrolled into view,
   3) the reader taps where they think unspent miles owed to members ends, then sees the answer
      and how other readers guessed. Values: 2025 10-Ks, $ millions (data/credit-card-partners-...csv). */
(function(){
var mounts=document.querySelectorAll('.ag');if(!mounts.length)return;
var AIR={
  aa:{name:'American',full:'American Airlines',profit:1467,card:6200,miles:10564},
  dl:{name:'Delta',full:'Delta Air Lines',profit:5822,card:8200,miles:9262}
};
var COLS=20,CAP=120,CROWD={url:'https://dtkrnyberbpfdmikpdnw.supabase.co',key:'sb_publishable_6-GJy2aRL6_4QNyUdCAFvg_0FwgXnTS'};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var CSS=[
'.ag{--g:#007A55;--gd:#005C40;--ink:#13241B;--mute:#5F7268;--gold:#D9A93B;--line:#E3E8E4;--empty:#EEF2EF;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;color:var(--ink);max-width:620px;margin:2em auto!important;border:1px solid var(--line);border-radius:16px;padding:20px 18px 18px;background:#fff;box-shadow:0 10px 28px rgba(19,36,27,.07);box-sizing:border-box}',
'.ag *{box-sizing:border-box}',
'.ag .ag-k{font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--g);margin:0 0 6px;line-height:1.2}',
'.ag .ag-h{font-family:"Times New Roman",Times,serif;font-weight:700;font-size:26px;line-height:1.15;margin:0 0 12px}',
'.ag .ag-tabs{display:inline-flex;background:#F1F4F2;border-radius:999px;padding:4px;margin:0 0 16px}',
'.ag .ag-tabs button{border:0;background:transparent;font:600 15px/1 inherit;font-family:inherit;color:var(--ink);padding:10px 16px;border-radius:999px;cursor:pointer;min-height:40px}',
'.ag .ag-tabs button[aria-pressed="true"]{background:#fff;color:var(--g);box-shadow:0 1px 4px rgba(19,36,27,.12)}',
'.ag .ag-sec{margin:0 0 16px}',
'.ag .ag-row{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin:0 0 6px}',
'.ag .ag-lab{font-size:15px;font-weight:600}',
'.ag .ag-val{font-family:"Times New Roman",Times,serif;font-size:22px;font-weight:700;white-space:nowrap}',
'.ag .ag-sub{font-size:13px;color:var(--mute);margin:4px 0 0}',
'.ag svg{display:block;width:100%;height:auto;overflow:visible}',
'.ag svg rect.sq{transition:opacity .35s ease,transform .35s ease;transform-box:fill-box;transform-origin:center}',
'.ag svg rect.off{opacity:0;transform:scale(.4)}',
'.ag .ag-q{margin:4px 0 8px;padding:10px 12px;border-left:3px solid var(--gold);background:#FBF6EA;border-radius:0 10px 10px 0;font-size:15px}',
'.ag .ag-q b{font-weight:700}',
'.ag .ag-tap{cursor:pointer}',
'.ag .ag-ctrl{display:flex;gap:10px;align-items:center;margin-top:10px}',
'.ag .ag-ctrl input{flex:1;min-width:0;accent-color:#D9A93B;height:32px}',
'.ag .ag-ctrl button{border:0;border-radius:999px;background:var(--g);color:#fff;font:600 15px/1 inherit;font-family:inherit;padding:11px 16px;cursor:pointer;min-height:42px;white-space:nowrap}',
'.ag .ag-ctrl button:hover{background:var(--gd)}',
'.ag button:focus-visible,.ag input:focus-visible{outline:3px solid #7FC4A6;outline-offset:2px}',
'.ag .ag-res{font-family:"Times New Roman",Times,serif;font-size:20px;line-height:1.3;margin:10px 0 0}',
'.ag .ag-res b{color:#9A6B00}',
'.ag .ag-crowd{font-size:14px;color:var(--mute);margin:6px 0 0}',
'.ag .ag-again{background:none;border:0;color:var(--g);font:600 14px inherit;font-family:inherit;padding:0;margin-top:8px;cursor:pointer;text-decoration:underline}',
'.ag .ag-note{font-size:12px;color:var(--mute);margin:14px 0 0;line-height:1.4}',
'@keyframes agSheen{0%{transform:translateX(-120%)}100%{transform:translateX(220%)}}',
'.ag .ag-gold{position:relative;overflow:hidden;border-radius:10px}',
'.ag .ag-gold.shine::after{content:"";position:absolute;inset:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);animation:agSheen 1.4s ease-out 1;pointer-events:none}'
].join('');
function css(){if(document.getElementById('ag-css'))return;var s=document.createElement('style');s.id='ag-css';s.textContent=CSS;document.head.appendChild(s)}
function store(k,v){try{if(v===undefined){var x=localStorage.getItem(k);return x==null?null:JSON.parse(x)}localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function bil(m){return '$'+(m/1000).toFixed(1)+' billion'}
function cellW(){return 100/COLS}
/* returns svg string for `val` ($M) as squares; cls applied to each filled square */
function squares(val,color,opts){
  opts=opts||{};var n=val/100,full=Math.floor(n),frac=n-full,total=opts.cap||Math.ceil(n),rows=Math.ceil(total/COLS);
  var W=COLS*10,H=rows*10,s='<svg viewBox="-0.5 -0.5 '+(W+1)+' '+(H+1)+'"'+(opts.label?' role="img" aria-label="'+opts.label+'"':' aria-hidden="true"')+(opts.cls?' class="'+opts.cls+'"':'')+'>';
  for(var i=0;i<total;i++){
    var x=(i%COLS)*10,y=Math.floor(i/COLS)*10,sq=8.4;
    if(opts.cap){
      s+='<rect class="cell" data-i="'+(i+1)+'" x="'+x+'" y="'+y+'" width="'+sq+'" height="'+sq+'" rx="1.4" fill="#fff" stroke="#CBD5CF" stroke-width=".6" stroke-dasharray="1.4 1"/>';
    }else if(i<full){
      s+='<rect class="sq'+(opts.hidden?' off':'')+'" style="transition-delay:'+(reduce?0:i*12)+'ms" x="'+x+'" y="'+y+'" width="'+sq+'" height="'+sq+'" rx="1.4" fill="'+color+'"/>';
    }else{
      s+='<rect x="'+x+'" y="'+y+'" width="'+sq+'" height="'+sq+'" rx="1.4" fill="#EEF2EF"/><rect class="sq'+(opts.hidden?' off':'')+'" style="transition-delay:'+(reduce?0:i*12)+'ms" x="'+x+'" y="'+y+'" width="'+(sq*frac).toFixed(2)+'" height="'+sq+'" rx="1.4" fill="'+color+'"/>';
    }
  }
  return s+'</svg>';
}
function crowd(game,mine,ans){
  return fetch(CROWD.url+'/rest/v1/nid_guesses',{method:'POST',headers:{apikey:CROWD.key,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({game:game,value:mine})})
   .catch(function(){}).then(function(){return fetch(CROWD.url+'/rest/v1/rpc/nid_guess_stats',{method:'POST',headers:{apikey:CROWD.key,'Content-Type':'application/json'},body:JSON.stringify({g:game,lo:0,hi:CAP*100,nb:12,mine:mine,ans:ans})})})
   .then(function(r){return r&&r.ok?r.json():null}).catch(function(){return null});
}
function mount(el){
  css();var cur='aa';
  el.innerHTML='<div class="ag-k">Interactive · Each square is $100 million</div><div class="ag-h">What Two Airlines Earned, Got From Card Partners And Owe In Miles</div>'+
    '<div class="ag-tabs" role="group" aria-label="Choose an airline"><button type="button" data-a="aa" aria-pressed="true">American</button><button type="button" data-a="dl" aria-pressed="false">Delta</button></div><div class="ag-body"></div>'+
    '<div class="ag-note">2025 figures from each airline’s annual report. Card cash is what co-branded card and other partners paid; Delta’s is its American Express payments. Unspent miles are the loyalty-program liability on the balance sheet at Dec. 31, 2025. The last square in each group is filled in proportion.</div>';
  var body=el.querySelector('.ag-body');
  el.querySelectorAll('.ag-tabs button').forEach(function(b){b.onclick=function(){cur=b.getAttribute('data-a');el.querySelectorAll('.ag-tabs button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});render(true)}});
  function render(animate){
    var a=AIR[cur],x=(a.card/a.profit).toFixed(1),key='nid-air-miles-'+cur,prev=store(key);
    body.innerHTML=
      '<div class="ag-sec"><div class="ag-row"><span class="ag-lab">Operating profit</span><span class="ag-val">'+bil(a.profit)+'</span></div>'+squares(a.profit,'#13241B',{label:a.full+' operating profit, '+bil(a.profit)})+'</div>'+
      '<div class="ag-sec ag-card"><div class="ag-row"><span class="ag-lab" style="color:#007A55">Paid by credit card partners</span><span class="ag-val" style="color:#007A55">'+bil(a.card)+'</span></div>'+squares(a.card,'#007A55',{hidden:animate&&!reduce,label:a.full+' cash from card partners, '+bil(a.card)})+'<div class="ag-sub">'+x+' times its operating profit.</div></div>'+
      '<div class="ag-sec ag-miles"><div class="ag-row"><span class="ag-lab" style="color:#9A6B00">Owed to members in unspent miles</span><span class="ag-val ag-mv" style="color:#9A6B00">?</span></div>'+
      '<div class="ag-q"><b>Your turn.</b> Every mile a bank buys and a member hasn’t spent is a debt the airline owes. Tap the square where you think '+a.name+'’s ends.</div>'+
      '<div class="ag-gold"><div class="ag-grid ag-tap">'+squares(0,'',{cap:CAP})+'</div></div>'+
      '<div class="ag-ctrl"><label class="sr-only" style="position:absolute;left:-9999px" for="ag-r-'+cur+'">Your guess in billions</label><input id="ag-r-'+cur+'" type="range" min="1" max="'+CAP+'" value="40" aria-valuetext="$4.0 billion"><button type="button" class="ag-lock">Lock in $4.0B</button></div>'+
      '<div class="ag-out" aria-live="polite"></div></div>';
    var card=body.querySelector('.ag-card svg');
    if(animate&&!reduce){
      var shown=false,io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!shown){shown=true;card.querySelectorAll('.off').forEach(function(r){r.classList.remove('off')});io.disconnect()}})},{threshold:.35}):null;
      if(io)io.observe(card);else card.querySelectorAll('.off').forEach(function(r){r.classList.remove('off')});
    }
    var grid=body.querySelector('.ag-grid svg'),rng=body.querySelector('input'),lock=body.querySelector('.ag-lock');
    function preview(n){grid.querySelectorAll('.cell').forEach(function(c){var i=+c.getAttribute('data-i');c.setAttribute('fill',i<=n?'#F6E7BF':'#fff');c.setAttribute('stroke',i<=n?'#D9A93B':'#CBD5CF')});var t='$'+(n/10).toFixed(1)+'B';lock.textContent='Lock in '+t;rng.setAttribute('aria-valuetext',t.replace('B',' billion'))}
    rng.oninput=function(){preview(+rng.value)};
    grid.addEventListener('pointermove',function(e){if(e.pointerType==='mouse'){var c=e.target.closest&&e.target.closest('.cell');if(c){rng.value=c.getAttribute('data-i');preview(+rng.value)}}});
    grid.addEventListener('click',function(e){var c=e.target.closest&&e.target.closest('.cell');if(c)reveal(+c.getAttribute('data-i'),true)});
    lock.onclick=function(){reveal(+rng.value,true)};
    if(prev!=null)reveal(prev,false);
    function reveal(n,fresh){
      store(key,n);
      var guess=n*100,ans=a.miles,off=Math.abs(guess-ans);
      body.querySelector('.ag-q').style.display='none';body.querySelector('.ag-ctrl').style.display='none';
      body.querySelector('.ag-mv').textContent=bil(ans);
      var wrap=body.querySelector('.ag-grid');wrap.classList.remove('ag-tap');
      wrap.innerHTML=squares(ans,'#D9A93B',{hidden:fresh&&!reduce,label:a.full+' owed '+bil(ans)+' in unspent miles'});
      var svg=wrap.querySelector('svg'),i=n-1,gx=(i%COLS)*10,gy=Math.floor(i/COLS)*10;
      var rows=Math.ceil(Math.max(n,ans/100)/COLS);
      svg.setAttribute('viewBox','-0.5 -0.5 '+(COLS*10+1)+' '+(rows*10+1));
      svg.insertAdjacentHTML('beforeend','<rect x="'+(gx-1.2)+'" y="'+(gy-1.2)+'" width="10.8" height="10.8" rx="2.4" fill="none" stroke="#B5462F" stroke-width="1.4"/><text x="'+(gx+4.2)+'" y="'+(gy-2.6)+'" text-anchor="'+(i%COLS>16?'end':i%COLS<3?'start':'middle')+'" font-size="4.6" font-weight="700" fill="#B5462F" stroke="#fff" stroke-width="1.6" paint-order="stroke" style="font-family:-apple-system,Helvetica,Arial,sans-serif">Your guess</text>');
      if(fresh&&!reduce){requestAnimationFrame(function(){requestAnimationFrame(function(){svg.querySelectorAll('.off').forEach(function(r){r.classList.remove('off')});setTimeout(function(){body.querySelector('.ag-gold').classList.add('shine')},Math.min(1400,ans/100*12+200))})})}
      var times=(ans/a.profit).toFixed(1),dir=guess<ans?'low':'high';
      var out=body.querySelector('.ag-out');
      out.innerHTML='<div class="ag-res">'+(off<=500?'Close. ':'')+'You guessed '+bil(guess)+'. '+a.name+' owed members <b>'+bil(ans)+'</b> in unspent miles, '+times+' times its operating profit'+(off>500?', so your guess was '+bil(off)+' too '+dir:'')+'.</div><div class="ag-crowd"></div><button type="button" class="ag-again">'+(cur==='aa'?'Now try Delta →':'Try American again')+'</button>';
      out.querySelector('.ag-again').onclick=function(){var other=cur==='aa'?'dl':'aa';if(other==='aa')store('nid-air-miles-aa',null);el.querySelector('[data-a="'+other+'"]').click()};
      if(fresh)crowd('air-miles-'+cur,guess,ans).then(function(s){if(!s||!s.total)return;var p=out.querySelector('.ag-crowd');
        p.textContent=s.total>1?'You were closer than '+Math.round(100*s.further/Math.max(1,s.total-1))+'% of the '+s.total.toLocaleString('en-US')+' readers who guessed.':'You’re one of the first readers to guess.'});
    }
  }
  render(true);
}
for(var i=0;i<mounts.length;i++)mount(mounts[i]);
})();
