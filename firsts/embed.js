(function(){
  var C='https://upload.wikimedia.org/wikipedia/commons/thumb/';
  function enc(f){return encodeURIComponent(f).replace(/\(/g,'%28').replace(/\)/g,'%29');}
  function img(h,f){return C+h+'/'+enc(f)+'/500px-'+enc(f);}
  var NAVY='#1f3550',GOLD='#b8862f',D='#2f5f96',R='#a53a31',INK='#14211b',SUB='#5f6b66',LINE='#e6e3dd';
  var P=[
   {n:'Keisha Lance Bottoms',p:'D',st:'Georgia',o:'Governor',k:'gov',f:'First Black woman elected governor of any state',x:'Also Georgia’s first woman governor and first Black governor, ending 24 years of Republican control of the office.',h:'f/fe',i:'Keisha_Lance_Bottoms.jpg',c:'Executive Office of the President, public domain'},
   {n:'Byron Donalds',p:'R',st:'Florida',o:'Governor',k:'gov',f:'First Black Republican elected governor in U.S. history',x:'Also Florida’s first Black governor, 181 years after statehood.',h:'a/a7',i:'Rep._Byron_Donalds_official_photo,_117th_Congress.jpg',c:'U.S. Congress, public domain'},
   {n:'Abdul El-Sayed',p:'D',st:'Michigan',o:'Senate',k:'sen',f:'First Muslim U.S. senator',x:'Muslim Americans have served in the House since Keith Ellison’s election in 2006, but none had served in the Senate in its 237 years.',h:'8/82',i:'Abdul_El-Sayed_meet-and-greet_by_Conlan_Houston_5_(cropped).jpg',c:'Conlan Houston, CC BY-SA 4.0'},
   {n:'Hakeem Jeffries',p:'D',st:'New York',o:'House speaker (expected)',k:'house',f:'In line to be the first Black speaker of the House',x:'With Democrats in the majority, the House votes on a speaker when the new Congress meets in January.',h:'a/a6',i:'Rep-Hakeem-Jeffries-Official-Portrait_(cropped).jpg',c:'Office of Rep. Hakeem Jeffries, public domain'},
   {n:'Peggy Flanagan',p:'D',st:'Minnesota',o:'Senate',k:'sen',f:'First Native American woman in the U.S. Senate',x:'Flanagan is a citizen of the White Earth Nation. Three Native American men have served in the Senate before her.',h:'9/90',i:'2026PeggyFlanagan_(newcropped).jpg',c:'Travellers &amp; Tinkers, CC BY-SA 4.0'},
   {n:'Deb Haaland',p:'D',st:'New Mexico',o:'Governor',k:'gov',f:'First Native American woman elected governor',x:'Haaland, a citizen of the Pueblo of Laguna, was also the first Native American cabinet secretary.',h:'7/7e',i:'Secretary_Deb_Haaland,_official_headshot.jpg',c:'U.S. Department of the Interior, public domain'},
   {n:'Chris Pappas',p:'D',st:'New Hampshire',o:'Senate',k:'sen',f:'First openly gay man elected to the U.S. Senate',x:'Tammy Baldwin became the first openly gay senator in 2012.',h:'d/d5',i:'Chris_Pappas,_official_portrait,_116th_Congress_(cropped).jpg',c:'U.S. House, public domain'},
   {n:'Juliana Stratton',p:'D',st:'Illinois',o:'Senate',k:'sen',f:'Three Black women will serve in the Senate at once, a first',x:'With Tammy Duckworth, Illinois also becomes the first state represented by two women of color in the Senate.',h:'a/a8',i:'Juliana_Stratton_2023_(cropped).jpg',c:'Sgt. Trenton Fouche, public domain'},
   {n:'Amy Klobuchar',p:'D',st:'Minnesota',o:'Governor',k:'gov',f:'Minnesota’s first woman governor',x:'Klobuchar was also the first woman elected to the U.S. Senate from Minnesota, in 2006.',h:'b/b7',i:'Amy_Klobuchar,_official_portrait,_113th_Congress.jpg',c:'U.S. Senate, public domain'},
   {n:'Marsha Blackburn',p:'R',st:'Tennessee',o:'Governor',k:'gov',f:'Tennessee’s first woman governor',x:'Both major-party nominees were women, so Tennessee was certain to make history.',h:'c/c2',i:'Sen._Marsha_Blackburn_(R-TN)_official_headshot_-_116th_Congress.jpg',c:'U.S. Senate Photographic Studio, public domain'},
   {n:'Amy Acton',p:'D',st:'Ohio',o:'Governor',k:'gov',f:'First woman elected governor of Ohio',x:'Nancy Hollister served 11 days as governor in 1998–99 after succeeding to the office.',h:'7/7b',i:'Amy_Acton_2025.jpg',c:'Patricio101, CC0'}
  ];
  function css(){
    if(document.getElementById('nid-fx-css'))return;var s=document.createElement('style');s.id='nid-fx-css';
    s.textContent='.fx{font-family:Georgia,"Times New Roman",serif;color:'+INK+';max-width:760px;margin:2.4em auto}'+
    '.fx h3{font-size:1.45em;line-height:1.2;margin:0 0 .25em;text-align:center;font-weight:700}.fx .dek{text-align:center;color:'+SUB+';font-size:.95em;margin:0 0 1em}'+
    '.fx .chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:0 0 16px}.fx .chips button{font:600 14px/1 Georgia,serif;padding:8px 15px;border-radius:999px;border:1.5px solid '+NAVY+';background:#fff;color:'+NAVY+';cursor:pointer}'+
    '.fx .chips button[aria-pressed=true]{background:'+NAVY+';color:#fff}'+
    '.fx .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px}'+
    '.fx .card{position:relative;border-radius:14px;overflow:hidden;background:#fff;border:1px solid '+LINE+';box-shadow:0 1px 2px rgba(0,0,0,.04);cursor:pointer;text-align:left;padding:0;font:inherit;color:inherit;transition:transform .2s,box-shadow .2s}'+
    '.fx .card:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(20,33,27,.12)}'+
    '.fx .ph{aspect-ratio:4/4.4;background:#eef0ef center 18%/cover no-repeat;position:relative}'+
    '.fx .ph:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(10,20,30,.55))}'+
    '.fx .pt{position:absolute;left:10px;top:10px;z-index:1;font:700 11px/1 Arial,sans-serif;letter-spacing:.06em;color:#fff;padding:5px 8px;border-radius:999px}'+
    '.fx .nm{position:absolute;left:12px;right:12px;bottom:10px;z-index:1;color:#fff;font-weight:700;font-size:1.02em;line-height:1.15;text-shadow:0 1px 3px rgba(0,0,0,.4)}'+
    '.fx .tx{padding:11px 12px 13px}.fx .of{font:600 11px/1.2 Arial,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:'+GOLD+';margin-bottom:5px}'+
    '.fx .fi{font-size:.95em;line-height:1.3}.fx .more{display:none;font-size:.85em;line-height:1.4;color:'+SUB+';margin-top:8px;border-top:1px solid '+LINE+';padding-top:8px}'+
    '.fx .card[aria-expanded=true] .more{display:block}.fx .cr{font-size:.72em;color:#8a948f;margin-top:6px}'+
    '.fx .note{font-size:.8em;color:'+SUB+';text-align:center;margin-top:12px;line-height:1.4}'+
    '.fx .tog{display:flex;justify-content:center;gap:8px;margin-bottom:14px}'+
    '.fx svg text{font-family:Georgia,"Times New Roman",serif}.fx .tip{min-height:3.2em;text-align:center;font-size:.9em;color:'+INK+';margin-top:8px;line-height:1.45}'+
    '.fx .bar{cursor:pointer;transition:opacity .15s}.fx .bar:hover{opacity:.8}';
    document.head.appendChild(s);
  }
  function chips(el,opts,cur,cb){el.innerHTML=opts.map(function(o){return '<button type="button" data-k="'+o[0]+'" aria-pressed="'+(o[0]===cur)+'">'+o[1]+'</button>';}).join('');
    el.onclick=function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call(el.children,function(c){c.setAttribute('aria-pressed',c===b);});cb(b.getAttribute('data-k'));};}
  function people(root){
    root.className='fx';root.innerHTML='<h3>The People Who Made History On Tuesday</h3><p class="dek">Tap a card for the backstory</p><div class="chips"></div><div class="grid"></div><p class="note">Results are unofficial projections by AP and network decision desks as of Nov. 4, 2026. Jeffries becomes speaker only after the House votes in January. Photos via Wikimedia Commons; credits on each card.</p>';
    var g=root.querySelector('.grid');
    function draw(k){g.innerHTML=P.filter(function(p){return k==='all'||p.k===k||(k==='rep'&&p.p==='R');}).map(function(p,i){
      return '<button type="button" class="card" aria-expanded="false"><div class="ph" style="background-image:url(\''+img(p.h,p.i)+'\')"><span class="pt" style="background:'+(p.p==='D'?D:R)+'">'+(p.p==='D'?'DEMOCRAT':'REPUBLICAN')+'</span><div class="nm">'+p.n+'</div></div>'+
        '<div class="tx"><div class="of">'+p.o+' · '+p.st+'</div><div class="fi">'+p.f+'</div><div class="more">'+p.x+'<div class="cr">Photo: '+p.c+'</div></div></div></button>';}).join('');}
    g.onclick=function(e){var c=e.target.closest('.card');if(!c)return;c.setAttribute('aria-expanded',c.getAttribute('aria-expanded')!=='true');};
    chips(root.querySelector('.chips'),[['all','All 11'],['gov','Governors'],['sen','Senate'],['house','House'],['rep','Republicans']],'all',draw);draw('all');
  }
  var WAIT={us:[
    ['First Black woman governor of a state','Bottoms',250,'First state governors took office in 1776'],
    ['First Native American woman governor','Haaland',250,'First state governors took office in 1776'],
    ['First Black speaker of the House','Jeffries',238,'First speaker elected in 1789; new speaker chosen in January 2027'],
    ['First Muslim senator','El-Sayed',237,'The Senate first met in 1789'],
    ['First Native American woman senator','Flanagan',237,'The Senate first met in 1789'],
    ['First openly gay man in the Senate','Pappas',237,'The Senate first met in 1789']],
   st:[
    ['Georgia’s first woman and first Black governor','Bottoms',238,'Georgia became a state in 1788'],
    ['Tennessee’s first woman governor','Blackburn',230,'Tennessee became a state in 1796'],
    ['Ohio’s first woman elected governor','Acton',223,'Ohio became a state in 1803'],
    ['Florida’s first Black governor','Donalds',181,'Florida became a state in 1845'],
    ['Minnesota’s first woman governor','Klobuchar',168,'Minnesota became a state in 1858']]};
  function wait(root){
    root.className='fx';root.innerHTML='<h3>How Long Each Barrier Stood</h3><p class="dek">Years from the creation of the office to Tuesday’s first</p><div class="tog chips"></div><svg role="img"></svg><div class="tip">Tap a bar for details</div><p class="note">Counted from when the office first existed (state governors 1776, Congress 1789) or from statehood, to 2026; the speaker vote is in January 2027.</p>';
    var svg=root.querySelector('svg'),tip=root.querySelector('.tip');
    function draw(k){var d=WAIT[k],W=720,lh=58,top=10,L=300,Rr=W-60,H=top+d.length*lh+40,mx=260;
      var s='';for(var t=0;t<=250;t+=50){var x=L+(Rr-L)*t/mx;s+='<line x1="'+x+'" x2="'+x+'" y1="'+top+'" y2="'+(H-34)+'" stroke="'+LINE+'"/><text x="'+x+'" y="'+(H-16)+'" text-anchor="middle" font-size="13" font-weight="700" fill="'+INK+'">'+t+'</text>';}
      d.forEach(function(r,i){var y=top+i*lh,w=(Rr-L)*r[2]/mx;
        s+='<g class="bar" data-i="'+i+'"><rect x="0" y="'+y+'" width="'+W+'" height="'+lh+'" fill="transparent"/><text x="'+(L-12)+'" y="'+(y+lh/2-3)+'" text-anchor="end" font-size="14.5" font-weight="700" fill="'+INK+'">'+r[0].replace(/&/g,'&amp;')+'</text><text x="'+(L-12)+'" y="'+(y+lh/2+15)+'" text-anchor="end" font-size="13" fill="'+SUB+'">'+r[1]+'</text>'+
        '<rect x="'+L+'" y="'+(y+12)+'" width="'+w.toFixed(1)+'" height="'+(lh-24)+'" rx="5" fill="'+(k==='us'?NAVY:GOLD)+'"/><text x="'+(L+w+8)+'" y="'+(y+lh/2+5)+'" font-size="15" font-weight="700" fill="'+(k==='us'?NAVY:'#8a6420')+'">'+r[2]+'</text></g>';});
      s+='<line x1="'+L+'" x2="'+L+'" y1="'+top+'" y2="'+(H-34)+'" stroke="'+INK+'" stroke-width="2"/><text x="'+((L+Rr)/2)+'" y="'+(H)+'" text-anchor="middle" font-size="12" font-weight="700" fill="'+INK+'" letter-spacing=".06em">YEARS THE BARRIER STOOD</text>';
      svg.setAttribute('viewBox','0 0 '+W+' '+(H+6));svg.setAttribute('aria-label','Bar chart of years each barrier stood');svg.innerHTML=s;tip.textContent='Tap a bar for details';
      svg.onclick=function(e){var g=e.target.closest('.bar');if(!g)return;var r=d[+g.getAttribute('data-i')];tip.innerHTML='<b>'+r[0]+'</b>: '+r[1]+'. '+r[3]+', '+r[2]+' years earlier.';};}
    chips(root.querySelector('.tog'),[['us','National firsts'],['st','State firsts']],'us',draw);draw('us');
  }
  function women(root,data){
    root.className='fx';root.innerHTML='<h3>Women Governors Serving In Each Year, 1925–2027</h3><p class="dek">Tap or hover over a year to see who served</p><svg role="img"></svg><div class="tip"></div><p class="note">Counts every woman who served as a state governor at any point in the year (U.S. territories excluded). 2027 is the minimum based on projected winners and governors not up for election, as of Nov. 4. Data: Center for American Women and Politics, Rutgers; NBC News.</p>';
    var ys=Object.keys(data).map(Number).sort(),W=720,H=330,L=44,Rr=W-12,T=16,B=H-46,mx=18,bw=(Rr-L)/ys.length;
    var svg=root.querySelector('svg'),tip=root.querySelector('.tip'),s='';
    for(var v=0;v<=mx;v+=3){var y=B-(B-T)*v/mx;s+='<line x1="'+L+'" x2="'+Rr+'" y1="'+y+'" y2="'+y+'" stroke="'+LINE+'"/><text x="'+(L-8)+'" y="'+(y+4)+'" text-anchor="end" font-size="12" font-weight="700" fill="'+INK+'">'+v+'</text>';}
    ys.forEach(function(yr,i){var n=yr===2027?17:data[yr].length,h=(B-T)*n/mx,x=L+i*bw;
      s+='<g class="bar" data-y="'+yr+'"><rect x="'+x+'" y="'+T+'" width="'+bw+'" height="'+(B-T)+'" fill="transparent"/>'+(n?'<rect x="'+(x+.6)+'" y="'+(B-h)+'" width="'+Math.max(bw-1.2,1)+'" height="'+h+'" fill="'+(yr===2027?GOLD:yr>=2025?'#4b6b8f':'#9fb2c7')+'"'+(yr===2027?' stroke="'+GOLD+'" stroke-dasharray="3 2"':'')+'/>':'')+'</g>';});
    [1925,1950,1975,2000,2025].forEach(function(yr){var i=ys.indexOf(yr);s+='<text x="'+(L+i*bw+bw/2)+'" y="'+(B+18)+'" text-anchor="middle" font-size="12" font-weight="700" fill="'+INK+'">'+yr+'</text>';});
    var i27=ys.indexOf(2027);s+='<text x="'+(L+i27*bw-6)+'" y="'+(B-(B-T)*17/mx-8)+'" text-anchor="end" font-size="14" font-weight="700" fill="#8a6420">2027: at least 17</text>';
    s+='<line x1="'+L+'" x2="'+Rr+'" y1="'+B+'" y2="'+B+'" stroke="'+INK+'" stroke-width="2"/><text x="'+((L+Rr)/2)+'" y="'+(H-6)+'" text-anchor="middle" font-size="12" font-weight="700" letter-spacing=".06em" fill="'+INK+'">YEAR</text><text transform="translate(12,'+((T+B)/2)+') rotate(-90)" text-anchor="middle" font-size="12" font-weight="700" letter-spacing=".06em" fill="'+INK+'">WOMEN GOVERNORS</text>';
    svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.setAttribute('aria-label','Bar chart of the number of women governors serving each year from 1925 to 2027, rising to a record of at least 17 in 2027');svg.innerHTML=s;
    function show(yr){var l=data[yr]||[];tip.innerHTML='<b>'+yr+': '+(yr===2027?'at least 17':l.length)+'</b>'+(l.length?' — '+l.join(', '):' — none');}
    svg.onmousemove=svg.onclick=function(e){var g=e.target.closest('.bar');if(g)show(+g.getAttribute('data-y'));};show(2027);
  }
  function boot(){css();var a=document.getElementById('nid-fx-people');if(a)people(a);var b=document.getElementById('nid-fx-wait');if(b)wait(b);
    var c=document.getElementById('nid-fx-women');if(c)fetch('https://stories.thenewsindata.com/firsts/women-governors.json').then(function(r){return r.json();}).then(function(d){women(c,d);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
