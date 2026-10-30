/* The News in Data: "Use This Chart" box (share, download, embed, credit) + Keep Reading.
   Cards use each story's real featured chart, pulled live from the blog feed.
   PICKS sets the order and the card headline; any other published story fills in after them. */
(function(){
var BASE='https://stories.thenewsindata.com/more/';
var SITE='https://www.thenewsindata.com';
var PICKS=[
 ['spend','Business',"Households Spent 8% More On Shelter, Three Times The Rise In Prices",'households-spent-8-more-on-shelter-in-2025-about-three-times-the-rise-in-consumer-prices'],
 ['wages','Business',"Wages Rose 3.1% But Fell 0.6% After Inflation",'wages-rose-31-over-the-year-to-september-but-fell-06-after-inflation'],
 ['engage','Trending',"A Record 56% Have Given The Midterm 'Quite A Lot' Of Thought",'a-record-56-of-americans-say-they-have-given-quite-a-lot-of-thought-to-the-midterm'],
 ['air','Business',"Card Partners Paid American Airlines Four Times Its Profit",'credit-card-partners-paid-american-airlines-62-billion-in-2025-four-times-its-operating-profit'],
 ['tz','Trending',"Americans Live On Two Different Dates For 21 Hours A Day",'americans-are-living-on-two-different-dates-for-21-hours-of-every-day'],
 ['agency','Trending',"Americans Rate The Park Service Highest Of 12 Agencies And ICE Lowest",'americans-rate-the-national-park-service-highest-of-12-federal-agencies-and-ice-lowest'],
 ['crime','Trending',"Serious Violent Crime Fell 25% In A Federal Victims Survey",'americans-reported-19-fewer-property-crimes-and-25-fewer-serious-violent-crimes-to-a-federal-survey-in-2025-than-in-2024'],
 ['mmc','Culture',"One Mickey Mouse Club Cast Produced Five Major-Award Winners",'one-mickey-mouse-club-cast-produced-five-major-award-winners-and-nearly-half-its-members-never-got-a-wikipedia-page'],
 ['renew','Science',"Renewables Now Make 3.8 Times As Much Electricity As Nuclear",'renewables-now-generate-more-than-three-times-as-much-of-the-worlds-electricity-as-nuclear-power-does'],
 ['values','Culture',"34% Say The Country Needs Honesty, And 13% Say Most Americans Share It",'americans-say-honesty-is-the-value-the-country-needs-most-yet-only-13-think-most-americans-share-it'],
 ['manu','Culture',"Rappers Have Named Ginóbili In 1,489 Songs, Mostly After He Retired",'rappers-have-named-manu-ginbili-in-at-least-1489-songs-and-most-came-after-he-retired'],
 ['paygap','Business',"Women Earned 86% Of Men’s Pay, And Each Group Falls Further Behind",'women-earned-86-of-what-men-earned-in-2025-and-each-group-of-women-falls-further-behind-as-it-ages'],
 ['turnout','Trending',"Midterm Turnout Ranged From 31% To 62% By State",'midterm-turnout-in-2022-ranged-from-31-in-tennessee-to-62-in-oregon'],
 ['midterms','Trending',"The President's Party Lost House Seats In 18 Of 20 Midterms",'the-presidents-party-has-lost-house-seats-in-18-of-the-20-midterms-since-world-war-ii'],
 ['darkmoney','Trending',"Undisclosed Donors Supplied 28% Of Leadership Super PAC Money",'nonprofits-that-dont-name-their-donors-supplied-28-of-the-money-behind-congresss-leadership-super-pacs'],
 ['donors','Trending',"Musk Has Given $369M, More Than The Next Three Donors",'elon-musk-has-given-369-million-this-cycle-more-than-the-next-three-donors-combined'],
 ['cash','Business','42% Of Americans Now Go A Week Without Paying Cash','42-of-americans-now-go-a-typical-week-without-paying-cash-up-from-24-in-2015'],
 ['gas','Business','Worry About Gas Prices Jumped From 43% To 74% This Year','worry-about-gas-prices-jumped-from-43-to-74-this-year-as-the-price-rose-155-a-gallon'],
 ['agents','Trending','A Fleet Of AI Agents Spent 11 Days Looking For The Zoo’s Front Door','a-fleet-of-ai-agents-spent-11-days-looking-for-the-zoos-front-door'],
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
"@media(max-width:760px){.nid-more .g{grid-template-columns:1fr;gap:12px}.nid-more a{display:grid;grid-template-columns:44% 1fr;align-items:center}.nid-more .im{border-bottom:0;border-right:1px solid #eee;height:100%;display:flex;align-items:center}.nid-more .t{padding:8px 10px}.nid-more .k{font-size:11px}.nid-more .h{font-size:16px}}",
".nid-use{margin:44px 0 0;padding:22px;border:1px solid #d9e6df;border-radius:10px;background:#f6faf8;font-family:'Times New Roman',Times,serif;color:#13241b}",
".nid-use .top{display:grid;grid-template-columns:200px 1fr;gap:20px;align-items:center}",
".nid-use .th{display:block;width:100%;border:1px solid #e3ece7;border-radius:6px;background:#fff;margin:0}",
".nid-use .ti{font-size:24px;font-weight:700;margin:0 0 4px;line-height:1.15}",
".nid-use .sb{font-size:16px;line-height:1.4;margin:0;color:#34473c}",
".nid-use .row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}",
".nid-use .lbl{width:100%;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#007a55;margin-top:6px}",
".nid-use a,.nid-use button{font:inherit;font-size:15px;font-weight:700;color:#13241b!important;text-decoration:none!important;background:#fff;border:1px solid #c9d6cf;border-radius:999px;padding:8px 16px;cursor:pointer;line-height:1.2}",
".nid-use a:hover,.nid-use button:hover{border-color:#13241b}",
".nid-use .pr{background:#007a55;border-color:#007a55;color:#fff!important}",
".nid-use .pr:hover{background:#00653f;border-color:#00653f}",
".nid-use .nat{display:none}",
".nid-use.can .nat{display:inline-block}",
".nid-use .cr{margin-top:14px;font-size:14px;color:#34473c;background:#fff;border:1px dashed #c9d6cf;border-radius:6px;padding:8px 12px;word-break:break-word}",
"@media(max-width:640px){.nid-use{padding:16px}.nid-use .top{grid-template-columns:1fr;gap:12px}.nid-use .ti{font-size:21px}.nid-use a,.nid-use button{font-size:14px;padding:8px 13px}}"
].join('\n');

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
function plain(s){return s.replace(/&#8209;/g,'-').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&');}

/* The story's chart: its featured image (og:image), else the first image in the article. */
function chartUrl(){
  var m=document.querySelector('meta[property="og:image"]'), s=m&&m.content;
  if(!s){var i=document.querySelector('article img[data-src],article img');s=i&&(i.getAttribute('data-src')||i.src);}
  if(!s)return '';
  return s.replace(/^http:/,'https:').replace(/^\/\//,'https://').split('?')[0];
}

function copy(btn,text,done){
  var reset=btn.textContent;
  (navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(function(){btn.textContent=done;},function(){prompt('Copy this',text);});
  setTimeout(function(){btn.textContent=reset;},2200);
}

function useBox(){
  var url=SITE+location.pathname.replace(/\/$/,''), t=document.title.split(' — ')[0];
  var slug=location.pathname.replace(/\/$/,'').split('/').pop();
  var img=chartUrl(), big=img?img+'?format=2500w':'', thumb=img?img+'?format=500w':'';
  var u=encodeURIComponent(url), tt=encodeURIComponent(t);
  var credit='Chart: Samuel W. Bennett, The News in Data ('+url.replace('https://www.','')+')';
  var embed='<figure style="margin:0"><a href="'+url+'"><img src="'+(img?img+'?format=1500w':'')+'" alt="'+esc(t)+'" style="max-width:100%;height:auto"></a>'+
            '<figcaption>Chart: <a href="'+url+'">The News in Data</a></figcaption></figure>';
  var d=document.createElement('div'); d.className='nid-use';
  d.innerHTML=
   '<div class="top">'+(img?'<img class="th" src="'+thumb+'" alt="" loading="lazy">':'<span></span>')+
   '<div><p class="ti">Use This Chart</p><p class="sb">Free to share, post or republish. Just credit The News in Data and link back to this story.</p></div></div>'+
   '<div class="row"><span class="lbl">Share it</span>'+
    '<button class="nat pr" type="button">Share chart</button>'+
    '<a target="_blank" rel="noopener" href="https://www.reddit.com/submit?url='+u+'&title='+tt+'">Reddit</a>'+
    '<a target="_blank" rel="noopener" href="https://x.com/intent/post?url='+u+'&text='+tt+'">X</a>'+
    '<a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+u+'">Facebook</a>'+
    '<a target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url='+u+'">LinkedIn</a>'+
    '<a href="mailto:?subject='+tt+'&body='+encodeURIComponent(t+'\n\n'+url)+'">Email</a>'+
    '<button class="cl" type="button">Copy link</button></div>'+
   '<div class="row"><span class="lbl">Use it</span>'+
    (img?'<button class="dl" type="button">Download chart</button>':'')+
    '<a class="csv" style="display:none" href="'+BASE.replace('/more/','/data/')+slug+'.csv" download>Download data (CSV)</a>'+
    (img?'<button class="em" type="button">Copy embed code</button>':'')+
    '<button class="cc" type="button">Copy credit line</button></div>'+
   '<div class="cr">'+esc(credit)+'</div>';

  d.querySelector('.cl').onclick=function(){copy(this,url,'Link copied');};
  d.querySelector('.cc').onclick=function(){copy(this,credit,'Credit copied');};
  var em=d.querySelector('.em'); if(em)em.onclick=function(){copy(this,embed,'Embed copied');};

  var blob=null;
  /* The CDN may answer with WebP; convert anything that isn't PNG/JPEG to PNG so it opens and posts everywhere. */
  function toPng(b){
    if(/png|jpe?g/.test(b.type)||!window.createImageBitmap)return Promise.resolve(b);
    return createImageBitmap(b).then(function(bm){var c=document.createElement('canvas');c.width=bm.width;c.height=bm.height;
      c.getContext('2d').drawImage(bm,0,0);return new Promise(function(res){c.toBlob(function(p){res(p||b);},'image/png');});});
  }
  function getBlob(){return blob?Promise.resolve(blob):fetch(big).then(function(r){if(!r.ok)throw 0;return r.blob();}).then(toPng).then(function(b){blob=b;return b;});}
  function ext(b){return /jpe?g/.test(b.type)?'.jpg':'.png';}
  var dl=d.querySelector('.dl');
  if(dl)dl.onclick=function(){var b0=this;b0.textContent='Preparing…';
    getBlob().then(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='the-news-in-data-'+slug+ext(b);
      document.body.appendChild(a);a.click();a.remove();b0.textContent='Downloaded';},function(){window.open(big,'_blank');b0.textContent='Download chart';})
    .then(function(){setTimeout(function(){b0.textContent='Download chart';},2200);});};

  /* Phones: share the chart image itself (Instagram, Messages, WhatsApp), with the link. */
  if(navigator.share){d.classList.add('can');
    d.querySelector('.nat').onclick=function(){
      getBlob().then(function(b){var f=new File([b],'the-news-in-data-'+slug+ext(b),{type:b.type});
        var data={title:t,text:t+' '+url,files:[f]};
        if(navigator.canShare&&navigator.canShare(data))return navigator.share(data);
        return navigator.share({title:t,url:url});
      },function(){return navigator.share({title:t,url:url});}).catch(function(){});};}

  /* Show the data button only when a CSV has been published for this story. */
  var csv=d.querySelector('.csv');
  fetch(csv.href,{method:'HEAD'}).then(function(r){if(r.ok)csv.style.display='';}).catch(function(){});
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
var all=[].slice.call(document.querySelectorAll('.nid-more[data-auto]'));
/* Site-wide injection (data-inject) yields to a block placed in the article itself. */
if(all.some(function(e){return !e.hasAttribute('data-inject');})){
  all.filter(function(e){return e.hasAttribute('data-inject');}).forEach(function(e){e.parentNode.removeChild(e);});
} else if(all.length>1){ all.slice(1).forEach(function(e){e.parentNode.removeChild(e);}); }
var els=[].slice.call(document.querySelectorAll('.nid-more[data-auto]')).filter(function(e){return !e.getAttribute('data-done');});
if(!els.length)return;
els.forEach(function(e){e.setAttribute('data-done','1');
  if(e.getAttribute('data-share')!=='0')e.parentNode.insertBefore(useBox(),e);});
fetch('/stories?format=json',{credentials:'same-origin'}).then(function(r){return r.json();})
 .then(function(j){els.forEach(function(e){cards(e,j.items||[]);});})
 .catch(function(){els.forEach(function(e){cards(e,null);});});
})();
