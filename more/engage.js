/* The News in Data: reader engagement layer (added Nov. 14, 2026). Loaded on every page.
   On a story it adds: anonymous measurement (scroll depth, seconds read, taps and clicks, where the visit came from),
   a follow line, a one-tap reaction, a vote on the next chart, links that open a chart on a reader's state or slider
   setting, a shareable result card, a link to the story's topic hub, and a "next story" bar on phones.
   On /stories#<hub> it shows that hub's stories at the top of the page.
   Measurement stores no IP address, cookie or account; visit /#notrack once to leave your own visits out.
   EDIT HERE: NEXT (the three candidate charts) and HUBS (which stories belong to which topic). */
(function(){
if(window.top!==window.self||window.__nidEngage)return;window.__nidEngage=1;
var DB='https://dtkrnyberbpfdmikpdnw.supabase.co/rest/v1/rpc/',KEY='sb_publishable_6-GJy2aRL6_4QNyUdCAFvg_0FwgXnTS';
var G='#007a55',INK='#13241b',SF='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif',TNR='"Times New Roman",Times,serif';

var NEXT={id:'next:2026-11-14',opts:[
 ['tgdinner','What Thanksgiving dinner costs this year, item by item'],
 ['winter','The winter outlook for your town'],
 ['tgtravel','The busiest travel days of Thanksgiving week']]};
var HUBS={
 travel:['Travel',['the-faa-has-halted-every-us-departure-only-three-times-and-the-nov-13-stop-is-the-first-to-start-after-noon','the-drive-to-the-airport-is-the-riskiest-part-of-a-holiday-flight','credit-card-partners-paid-american-airlines-62-billion-in-2025-four-times-its-operating-profit','canadians-made-25-fewer-trips-to-the-us-this-year-than-in-2024-while-their-trips-elsewhere-rose-12','americans-are-living-on-two-different-dates-for-21-hours-of-every-day']],
 health:['Health',['one-in-10-us-adults-took-a-glp-1-drug-in-the-past-year-and-nearly-half-of-those-with-diabetes-did','us-measles-cases-passed-5400-in-2026-the-most-since-1991-and-four-times-the-2019-outbreak','health-influencers-promote-something-in-38-of-their-posts-and-how-to-guides-are-the-most-common-pitch','opioids-killed-44564-americans-in-2025-cannabis-alone-killed-almost-no-one','in-the-worlds-largest-flourishing-study-8-of-the-10-richest-countries-rank-in-the-bottom-half']],
 crime:['Crime And Policing',['reported-hate-crimes-fell-for-a-second-straight-year-and-33-states-saw-declines-in-2025','georgia-has-80-flock-license-plate-cameras-per-100000-residents-the-most-of-any-state','americans-reported-19-fewer-property-crimes-and-25-fewer-serious-violent-crimes-to-a-federal-survey-in-2025-than-in-2024','support-for-the-death-penalty-fell-to-49-the-first-reading-below-half-since-1971']],
 money:['Prices And Pay',['candy-prices-are-up-49-since-2020-while-overall-prices-rose-29-and-wages-28','wages-rose-31-over-the-year-to-september-but-fell-06-after-inflation','households-spent-8-more-on-shelter-in-2025-about-three-times-the-rise-in-consumer-prices','worry-about-gas-prices-jumped-from-43-to-74-this-year-as-the-price-rose-155-a-gallon','42-of-americans-now-go-a-typical-week-without-paying-cash-up-from-24-in-2015','women-earned-86-of-what-men-earned-in-2025-and-each-group-of-women-falls-further-behind-as-it-ages','employers-added-165000-jobs-in-october-more-than-three-times-the-monthly-average-of-the-past-year']],
 nba:['NBA',['the-first-nba-team-to-lead-by-10-points-wins-three-games-out-of-four','luka-doncic-is-scoring-401-points-a-game-a-pace-only-wilt-chamberlain-has-topped','rappers-have-named-manu-ginbili-in-at-least-1489-songs-and-most-came-after-he-retired']],
 climate:['Climate And Energy',['chinas-emissions-have-been-flat-or-falling-since-march-2024-and-69-countries-now-emit-at-least-10-less-than-at-their-peak','medan-indonesia-sank-about-a-foot-in-nine-years-seven-times-faster-than-the-sea-is-rising','renewables-now-generate-more-than-three-times-as-much-of-the-worlds-electricity-as-nuclear-power-does','amazon-deforestation-has-fallen-to-its-lowest-level-in-a-decade','winter-is-coming-when-the-first-snow-usually-falls-in-your-state','2026-tied-1905-for-the-latest-first-atlantic-hurricane-since-tracking-began-in-1851']]
};

function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}}
function uid(){return (window.crypto&&crypto.randomUUID)?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g,function(){return (Math.random()*16|0).toString(16)})}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function rpc(fn,body,keep){return fetch(DB+fn,{method:'POST',keepalive:!!keep,headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify(body)})}
function hashGet(k){var m=location.hash.match(new RegExp('[#&]'+k+'=([^&]*)'));return m?decodeURIComponent(m[1]):null}
function hashSet(k,v){try{history.replaceState(null,'',location.pathname+location.search+'#'+k+'='+encodeURIComponent(v))}catch(e){}}
function copy(btn,text){var t=btn.textContent;(navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(function(){btn.textContent='Link copied'},function(){btn.textContent=text});setTimeout(function(){btn.textContent=t},2200)}

if(/#notrack/.test(location.hash))ls('nidNoTrack','1');
var m=location.pathname.match(/^\/stories\/([^\/?#]+)\/?$/),slug=m&&!/^(category|tag)$/.test(m[1])?m[1]:null;
var hubKey=null;if(slug)for(var hk in HUBS)if(HUBS[hk][1].indexOf(slug)>-1){hubKey=hk;break}

/* ---------- where the visit came from (kept for the whole session) ---------- */
var q=new URLSearchParams(location.search),refHost='';try{refHost=document.referrer?new URL(document.referrer).hostname.replace(/^www\./,''):''}catch(e){}
function classify(){var u=(q.get('utm_source')||'').toLowerCase();if(u)return u.slice(0,24);var r=document.referrer||'';
  if(/reddit/i.test(r))return 'reddit';if(!r)return 'direct';if(refHost==='thenewsindata.com'||/thenewsindata\.com$/.test(refHost))return 'internal';
  if(/google\.|bing\.|duckduckgo|yahoo\.|ecosia|brave\.com/.test(refHost))return 'search';
  if(/instagram|facebook|fb\.|t\.co$|twitter|x\.com$|threads|bsky|linkedin|tiktok|youtube/.test(refHost))return 'social';return 'referral'}
var src=ss('nidSrc'),sub=ss('nidSub')||'';
if(!src||q.get('utm_source')){src=classify();sub=(q.get('utm_campaign')||q.get('utm_content')||'').slice(0,60);ss('nidSrc',src);ss('nidSub',sub)}

/* ---------- measurement ---------- */
var T={pv:uid(),sid:ss('nidSid')||(function(){var s=uid();ss('nidSid',s);return s})(),n:(+ss('nidN')||0)+1,story:slug||location.pathname.slice(0,200)||'/',
  src:src,sub:sub,ref:refHost.slice(0,80),device:innerWidth<=760?'m':'d',vw:Math.min(innerWidth,9999),scroll:0,secs:0,acts:{}};
ss('nidN',T.n);
var trackOn=!ls('nidNoTrack')&&!/bot|crawl|spider|preview|headless|lighthouse/i.test(navigator.userAgent),dirty=true,since=Date.now(),vis=!document.hidden;
function act(k){T.acts[k]=(T.acts[k]||0)+1;dirty=true}
function tick(){if(vis){T.secs+=Math.round((Date.now()-since)/1000)}since=Date.now()}
function send(keep){if(!trackOn)return;tick();if(!dirty&&!keep)return;dirty=false;try{rpc('nid_track',{p:T},keep).catch(function(){})}catch(e){}}
function body(){return document.querySelector('.blog-item-content')||document.querySelector('main')||document.body}
function depth(){var b=body().getBoundingClientRect(),h=b.height||1,p=Math.round((innerHeight-b.top)/h*100);p=Math.max(0,Math.min(100,p));if(p>T.scroll){T.scroll=p;dirty=true}return p}
var sT=0;addEventListener('scroll',function(){if(sT)return;sT=setTimeout(function(){sT=0;depth();onScroll()},250)},{passive:true});
document.addEventListener('visibilitychange',function(){tick();vis=!document.hidden;if(!vis)send(true)});
addEventListener('pagehide',function(){send(true)});
setTimeout(function(){depth();send()},1500);setInterval(function(){if(vis){dirty=true;send()}},20000);
var lastI=0;
function onUse(ev){var t=ev.target;if(!t||!t.closest)return;
  if(ev.type==='click'){var a=t.closest('a,button');
    if(a){var r=a.closest('.nid-rel');if(r){act('rel'+([].indexOf.call(document.querySelectorAll('.nid-rel'),r)+1))}
      else if(a.closest('.npc'))act('play');else if(a.closest('.nid-more'))act('keepreading');else if(a.closest('.nid-use'))act('usechart');
      else if(a.closest('.nnv,.nnv-panel'))act('nav');else if(a.closest('.nie'))act(a.getAttribute('data-act')||'engage');
      else if(a.href&&a.hostname&&!/thenewsindata\.com$/.test(a.hostname))act('outbound');}}
  if(t.closest('.nie,.npc,.nid-rel,.nid-more,.nid-use'))return;
  if(t.closest('.nid-a [id^="nid-"],.blog-item-content svg,.blog-item-content canvas,.blog-item-content select,.blog-item-content input')){var n=Date.now();if(n-lastI>1500){lastI=n;act('interact')}}}
['click','change','input'].forEach(function(e){document.addEventListener(e,onUse,true)});

/* ---------- styles ---------- */
var CSS='.nie{font-family:'+SF+';color:'+INK+';box-sizing:border-box}.nie *{box-sizing:border-box}.nie a{color:'+G+'!important;text-decoration:none!important;font-weight:600}.nie a:hover{text-decoration:underline!important}'+
'.nie-follow{font-size:13.5px;line-height:1.5;color:#5f7268;margin:0 auto 1.3em;display:flex;flex-wrap:wrap;gap:4px 14px;align-items:center}.nie-follow b{color:'+INK+';font-weight:700}.nie-follow .new{background:#eaf5f0;border-radius:999px;padding:2px 10px}'+
'.nie-box{max-width:620px;margin:2em auto;padding:14px 16px;border:1px solid #e6e3dd;border-radius:10px;background:#fff}'+
'.nie .nie-k{font-family:'+SF+'!important;font-size:12px!important;font-weight:700!important;letter-spacing:.07em!important;text-transform:uppercase;color:'+G+'!important;margin:0 0 6px!important;line-height:1.3!important}'+
'.nie .nie-q{font-family:'+TNR+'!important;font-size:21px!important;font-weight:700!important;line-height:1.2!important;margin:0 0 12px!important;color:'+INK+'!important;letter-spacing:0!important}'+
'.nie-opts{display:flex;flex-wrap:wrap;gap:8px}.nie-opts.col{flex-direction:column}'+
'.nie button{font:inherit;font-size:14.5px;font-weight:600;color:'+INK+';background:#fff;border:1px solid #c9d6cf;border-radius:999px;padding:9px 16px;cursor:pointer;line-height:1.25;text-align:left}.nie button:hover{border-color:'+G+'}.nie button:focus-visible{outline:3px solid #7fc4a6;outline-offset:2px}'+
'.nie-opts.col button{border-radius:10px;width:100%}'+
'.nie-res{display:grid;gap:7px}.nie-bar{position:relative;border-radius:8px;background:#f2f5f3;overflow:hidden;padding:8px 12px;font-size:14.5px;display:flex;justify-content:space-between;gap:12px}.nie-bar i{position:absolute;left:0;top:0;bottom:0;background:#cfe8dd;width:0;transition:width .6s ease}.nie-bar.me i{background:#9fd1b8}.nie-bar span,.nie-bar b{position:relative}.nie-bar.me span::after{content:" (you)";color:#5f7268}'+
'.nie .nie-note{font-family:'+SF+'!important;font-size:13px!important;color:#5f7268!important;margin:10px 0 0!important;line-height:1.45!important}'+
'.nie-share{max-width:620px;margin:10px auto 0;display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13.5px;color:#5f7268}.nie-share button{padding:7px 14px;font-size:13.5px}.nie-share .pr{background:'+G+';border-color:'+G+';color:#fff}'+
'.nie-hub{max-width:620px;margin:-1.4em auto 2em;font-size:13.5px;text-align:right}'+
'.nie-next{position:fixed;left:8px;right:8px;bottom:8px;z-index:9990;background:#fff;border:1px solid #d9e6df;border-left:4px solid '+G+';border-radius:12px;box-shadow:0 8px 28px rgba(19,36,27,.18);display:none;align-items:center;gap:8px;padding:9px 6px 9px 12px;transform:translateY(140%);transition:transform .35s ease}.nie-next.on{transform:none}'+
'.nie-next a{flex:1;min-width:0;color:'+INK+'!important;font-weight:400}.nie-next a:hover{text-decoration:none!important}.nie-next small{display:block;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:'+G+'}.nie-next .t{display:block;font-family:'+TNR+';font-size:16px;font-weight:700;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nie-next button{border:0;padding:6px 10px;font-size:20px;line-height:1;color:#5f7268;background:none}'+
'@media(max-width:760px){.nie-next{display:flex}.nie-hub{text-align:left}}@media(prefers-reduced-motion:reduce){.nie-next,.nie-bar i{transition:none}}'+
'.nie-hubview{max-width:1000px;margin:0 auto 44px;padding:24px 4vw 36px;border-bottom:3px solid '+INK+';scroll-margin-top:90px}.nie-hubview h2{font-family:'+TNR+'!important;font-size:34px!important;font-weight:700!important;margin:0 0 4px!important;color:'+INK+'!important}.nie-hubview p{font-family:'+SF+'!important;color:#5f7268!important;margin:0 0 18px!important;font-size:15px!important}.nie-hubview .g{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.nie-hubview .c{display:block;border:1px solid #e6e3dd;border-radius:8px;overflow:hidden;background:#fff;color:'+INK+'!important;font-weight:400}.nie-hubview .c img{display:block;width:100%;aspect-ratio:1200/630;object-fit:contain;border-bottom:1px solid #eee}.nie-hubview .c span{display:block;padding:10px 12px 14px;font-family:'+TNR+';font-size:18px;font-weight:700;line-height:1.22}.nie-hubview .tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}.nie-hubview .tabs a{border:1px solid #c9d6cf;border-radius:999px;padding:6px 14px;font-size:14px}.nie-hubview .tabs a.on{background:'+G+';border-color:'+G+';color:#fff!important}@media(max-width:760px){.nie-hubview .g{grid-template-columns:1fr;gap:12px}.nie-hubview h2{font-size:28px}}';
var st=el('style');st.id='nie-css';st.textContent=CSS;document.head.appendChild(st);

/* ---------- one-tap polls (reaction, next-chart vote) ---------- */
function bars(box,opts,counts,mine,after){var tot=0;opts.forEach(function(o){tot+=(counts[o[0]]||0)});
  var h='<div class="nie-res">';opts.forEach(function(o){var p=tot?Math.round((counts[o[0]]||0)/tot*100):0;h+='<div class="nie-bar'+(o[0]===mine?' me':'')+'"><i data-w="'+p+'"></i><span>'+esc(o[1])+'</span><b>'+p+'%</b></div>'});
  h+='</div><div class="nie-note">'+tot.toLocaleString('en-US')+(tot===1?' reader has':' readers have')+' answered. '+(after||'')+'</div>';
  box.querySelector('.nie-body').innerHTML=h;setTimeout(function(){[].forEach.call(box.querySelectorAll('.nie-bar i'),function(i){i.style.width=i.getAttribute('data-w')+'%'})},30)}
function poll(id,kicker,question,opts,col,after,actName){
  var box=el('aside','nie nie-box'),mine=ls('nie:'+id);box.setAttribute('aria-label',kicker);
  box.innerHTML='<div class="nie-k">'+esc(kicker)+'</div><div class="nie-q">'+esc(question)+'</div><div class="nie-body"><div class="nie-opts'+(col?' col':'')+'">'+opts.map(function(o){return '<button type="button" data-act="'+actName+'" data-c="'+o[0]+'">'+esc(o[1])+'</button>'}).join('')+'</div></div>';
  function show(c){rpc('nid_poll',{p:id,c:c}).then(function(r){return r.json()}).then(function(j){if(c&&!j[c])j[c]=1;bars(box,opts,j||{},mine,after)}).catch(function(){var j={};if(mine)j[mine]=1;bars(box,opts,j,mine,after)})}
  if(mine)show(null);
  box.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('button[data-c]');if(!b||mine)return;mine=b.getAttribute('data-c');ls('nie:'+id,mine);show(mine)});
  return box}

/* ---------- result card image (state lookups) ---------- */
function wrap(ctx,text,w){var out=[],line='';String(text).split(' ').forEach(function(wd){var t=line?line+' '+wd:wd;if(ctx.measureText(t).width>w&&line){out.push(line);line=wd}else line=t});if(line)out.push(line);return out}
function resultCard(title,name,stats,url){var W=1080,H=1080,M=72,c=document.createElement('canvas');c.width=W;c.height=H;var x=c.getContext('2d');
  x.fillStyle='#fff';x.fillRect(0,0,W,H);x.fillStyle=G;x.fillRect(0,0,W,16);
  x.fillStyle=G;x.font='700 30px Helvetica,Arial,sans-serif';x.fillText('THE NEWS IN DATA',M,96);
  x.fillStyle='#5f7268';x.font='400 34px "Times New Roman",Times,serif';var y=160;wrap(x,title,W-2*M).slice(0,3).forEach(function(l){x.fillText(l,M,y);y+=44});
  x.fillStyle=INK;x.font='700 112px "Times New Roman",Times,serif';y+=110;x.fillText(name,M,y);y+=50;
  stats.slice(0,3).forEach(function(s){x.strokeStyle='#e3eee7';x.lineWidth=2;x.beginPath();x.moveTo(M,y);x.lineTo(W-M,y);x.stroke();
    x.fillStyle=G;x.font='700 84px "Times New Roman",Times,serif';x.fillText(s[0],M,y+100);
    x.fillStyle='#34473c';x.font='400 32px Helvetica,Arial,sans-serif';wrap(x,s[1],W-2*M).slice(0,1).forEach(function(l){x.fillText(l,M,y+148)});y+=188});
  x.fillStyle='#f6faf8';x.fillRect(0,H-120,W,120);x.fillStyle=INK;x.font='700 30px Helvetica,Arial,sans-serif';x.fillText('Find your state',M,H-66);
  x.fillStyle=G;x.font='600 28px Helvetica,Arial,sans-serif';x.fillText(url.replace(/^https?:\/\/(www\.)?/,'').slice(0,58),M,H-28);
  return new Promise(function(res){c.toBlob(res,'image/png')})}

/* ---------- deep links and sharing for the story's interactive ---------- */
function shareRow(after,label,getCard){var row=after.parentNode.querySelector('.nie-share')||el('div','nie nie-share');
  row.innerHTML='<span>'+esc(label)+'</span>'+(getCard?'<button type="button" class="pr" data-act="shareresult">Share this card</button>':'')+'<button type="button" class="cl" data-act="copyview">Copy link to this view</button>';
  if(!row.parentNode)after.parentNode.insertBefore(row,after.nextSibling);
  row.querySelector('.cl').onclick=function(){copy(this,location.href)};
  var p=row.querySelector('.pr');if(p)p.onclick=function(){var b=this;b.textContent='Preparing…';getCard().then(function(blob){var f=new File([blob],'the-news-in-data-'+slug+'.png',{type:'image/png'}),d={files:[f],text:document.title.split(' — ')[0]+' '+location.href};
    if(navigator.canShare&&navigator.canShare(d))return navigator.share(d);var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=f.name;document.body.appendChild(a);a.click();a.remove()}).catch(function(){}).then(function(){b.textContent='Share this card'})}}
function wireInteractive(root){
  var maps=[].filter.call(root.querySelectorAll('[id^="nid-"]'),function(c){return c.querySelector('g.s text.ab')&&c.querySelector('.card')});
  maps.forEach(function(c){if(c.__nie)return;c.__nie=1;var card=c.querySelector('.card');
    c.addEventListener('click',function(e){var g=e.target.closest&&e.target.closest('g.s');if(!g)return;var ab=g.querySelector('text.ab').textContent.trim();hashSet('s',ab);
      setTimeout(function(){var name=(card.querySelector('h4')||{}).textContent||ab,stats=[].map.call((card.querySelector('.row')||card).children,function(d){var b=d.querySelector('b'),v=b?b.textContent.trim():'';return [v,d.textContent.replace(v,'').trim()]});
        shareRow(card,'Share '+name+':',function(){return resultCard(document.title.split(' — ')[0],name,stats,location.href)})},60)});});
  var ctl=null;[].some.call(root.querySelectorAll('[id^="nid-"]'),function(c){if(maps.indexOf(c)>-1)return false;var i=c.querySelector('input[type=range],select');if(i){ctl=[c,i];return true}});
  if(ctl&&!ctl[0].__nie){ctl[0].__nie=1;var dT=0;['input','change'].forEach(function(ev){ctl[1].addEventListener(ev,function(e){if(!e.isTrusted)return;clearTimeout(dT);dT=setTimeout(function(){hashSet('v',ctl[1].value);shareRow(ctl[0],'Share this setting:')},400)})})}
  var s=hashGet('s'),v=hashGet('v');
  if(s&&!root.__nieS){var g=null;maps.forEach(function(c){[].forEach.call(c.querySelectorAll('g.s'),function(x){if(x.querySelector('text.ab').textContent.trim()===s.toUpperCase())g=x})});
    if(g){root.__nieS=1;act('deeplink');g.dispatchEvent(new MouseEvent('click',{bubbles:true}));[400,1800].forEach(function(d){setTimeout(function(){g.closest('[id^="nid-"]').scrollIntoView({block:'center'})},d)})}}
  if(v!=null&&ctl&&!root.__nieV){root.__nieV=1;act('deeplink');ctl[1].value=v;['input','change'].forEach(function(ev){ctl[1].dispatchEvent(new Event(ev,{bubbles:true}))});setTimeout(function(){ctl[0].scrollIntoView({block:'center'})},400)}
  return maps.length||ctl}

/* ---------- story page furniture ---------- */
var nextBar=null,nextShown=false;
function onScroll(){if(nextBar&&!nextShown&&T.scroll>=50&&!ss('nieNextX')){var kr=document.querySelector('.nid-more');if(kr&&kr.getBoundingClientRect().top<innerHeight)return;nextShown=true;nextBar.classList.add('on');act('nextshown')}
  if(nextBar&&nextShown){var k=document.querySelector('.nid-more');if(k&&k.getBoundingClientRect().top<innerHeight*0.8)nextBar.classList.remove('on')}}
function story(){
  var b=document.querySelector('.blog-item-content');if(!b)return false;var root=b.querySelector('.nid-a')||b;if(root.__nieDone)return true;
  if(!root.querySelector('p'))return false;root.__nieDone=1;
  /* 1. follow line */
  var links={reddit:'<a data-act="follow_reddit" target="_blank" rel="noopener" href="https://www.reddit.com/user/profcyclist/">Reddit</a>',ig:'<a data-act="follow_instagram" target="_blank" rel="noopener" href="https://www.instagram.com/thenewsindata/">Instagram</a>',
    rss:'<a data-act="follow_rss" target="_blank" rel="noopener" href="https://www.thenewsindata.com/stories?format=rss">RSS</a>',em:'<a data-act="follow_email" href="/#get-in-touch">Email</a>'};
  var order=src==='reddit'?['reddit','ig','rss','em']:['ig','em','reddit','rss'];
  var fl=el('div','nie nie-follow','<span><b>Follow new charts</b> on '+order.map(function(k){return links[k]}).join(' · ')+'</span>');root.insertBefore(fl,root.firstChild);
  /* 8. returning readers: how many stories are new since the last visit */
  var last=+ls('nieLast')||0;if(!ss('nieSeen')){ss('nieSeen','1');ss('niePrev',last);ls('nieLast',Date.now())}var prev=+ss('niePrev')||0;
  if(prev&&Date.now()-prev>432e5)fetch('/stories?format=json',{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(j){var n=(j.items||[]).filter(function(i){return i.publishOn>prev}).length;
    if(n){act('returning');var a=el('span','new','<a data-act="newsince" href="/stories">'+n+(n>=20?'+':'')+' new chart'+(n===1?'':'s')+' since your last visit →</a>');fl.appendChild(a)}}).catch(function(){});
  /* 2. reaction, placed before the first related card or the first section heading */
  var h2=root.querySelector('h2'),rel=root.querySelector('.nid-rel'),anchor=(rel&&(!h2||rel.compareDocumentPosition(h2)&4))?rel:h2;
  var re=poll('react:'+slug,'Quick take','Did this chart surprise you?',[['yes','Yes'],['some','A little'],['no','No']],false,'','react');
  if(anchor)anchor.parentNode.insertBefore(re,anchor);else{var f=root.querySelector('figure,.nid-fig');if(f)f.parentNode.insertBefore(re,f.nextSibling);else root.appendChild(re)}
  /* 6. hub link under the first related card */
  if(hubKey){var hl=el('div','nie nie-hub','<a data-act="hub" href="/stories#'+hubKey+'">All '+esc(HUBS[hubKey][0])+' stories →</a>');if(rel)rel.parentNode.insertBefore(hl,rel.nextSibling);else re.parentNode.insertBefore(hl,re.nextSibling);if(!rel)hl.style.marginTop='-1em'}
  /* 3. vote on the next chart, before the method note */
  var mth=root.querySelector('.nid-method'),vt=poll(NEXT.id,'You choose','Which chart should we make next?',NEXT.opts,true,'<a data-act="vote_email" href="/#get-in-touch">Get it by email when it is published →</a>','vote');
  if(mth)mth.parentNode.insertBefore(vt,mth);else root.appendChild(vt);
  /* 7. next-story bar on phones */
  var t=rel&&rel.querySelector('.nid-rel-t'),a=rel&&rel.querySelector('a');
  function bar(href,title){nextBar=el('div','nie nie-next','<a data-act="nextbar" href="'+esc(href)+'"><small>Next chart</small><span class="t">'+esc(title)+'</span></a><button type="button" data-act="nextclose" aria-label="Close">×</button>');
    nextBar.querySelector('button').onclick=function(){nextBar.classList.remove('on');ss('nieNextX','1')};document.body.appendChild(nextBar)}
  if(innerWidth>760){}
  else if(a&&t)bar(a.getAttribute('href'),t.textContent);
  else if(hubKey){var sib=HUBS[hubKey][1].filter(function(s){return s!==slug})[0];if(sib)fetch('/stories/'+sib+'?format=json',{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(j){if(j.item)bar('/stories/'+sib,j.item.title)}).catch(function(){})}
  /* 4 and 5. state lookups and sliders: link to this view, share the result */
  var tries=0;(function w(){if(wireInteractive(root)&&tries>3)return;if(++tries<30)setTimeout(w,400)})();
  return true}

/* ---------- hub view on /stories#<hub> ---------- */
function hub(){var k=location.hash.slice(1),old=document.querySelector('.nie-hubview');if(old)old.remove();if(!HUBS[k])return;
  var host=document.querySelector('main section .content-wrapper, main section, main')||document.body,v=el('div','nie nie-hubview');
  v.innerHTML='<div class="tabs">'+Object.keys(HUBS).map(function(x){return '<a data-act="hubtab" class="'+(x===k?'on':'')+'" href="/stories#'+x+'">'+esc(HUBS[x][0])+'</a>'}).join('')+'</div><h2>'+esc(HUBS[k][0])+'</h2><p>Every chart we have made on this topic, newest first.</p><div class="g"></div>';
  host.insertBefore(v,host.firstChild);act('hubview');var g=v.querySelector('.g');
  Promise.all(HUBS[k][1].map(function(s){return fetch('/stories/'+s+'?format=json',{credentials:'same-origin'}).then(function(r){return r.ok?r.json():null}).catch(function(){return null})})).then(function(a){
    a.filter(function(j){return j&&j.item}).map(function(j){return j.item}).sort(function(x,y){return y.publishOn-x.publishOn}).forEach(function(i){
      g.appendChild(el('a','c','<img src="'+esc(i.assetUrl)+'?format=750w" alt="Chart: '+esc(i.title)+'" loading="lazy"><span>'+esc(i.title)+'</span>')).href='/stories/'+i.urlId});
    v.scrollIntoView({block:'start'})})}

function start(){if(slug){var n=0;(function f(){if(story()||++n>25)return;setTimeout(f,300)})()}
  else if(/^\/stories\/?$/.test(location.pathname)){hub();addEventListener('hashchange',hub)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
