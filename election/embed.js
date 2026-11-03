/* The News in Data: Election 2026 hub. Renders into #nid-election. Data: /election/data/*.json, refreshed hourly. */
(function () {
  var BASE = 'https://stories.thenewsindata.com/election/data/';
  var el = document.getElementById('nid-election');
  if (!el || el.dataset.ready) return; el.dataset.ready = 1;
  var CSS = '#nid-election{--g:#007a55;--ink:#13241b;--mut:#5f7268;--line:#e3e8e5;--pass:#007a55;--fail:#9b3b2f;--pend:#c9d1cc;--D:#3a6ea5;--R:#b8473e;color:var(--ink);container-type:inline-size;line-height:1.45}' +
  '#nid-election *{box-sizing:border-box}#nid-election .ne-serif{font-family:"Times New Roman",Times,serif}' +
  '#nid-election .ne-top{border-bottom:2px solid var(--ink);padding-bottom:14px;margin-bottom:8px}#nid-election .ne-kick{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--g);font-weight:700}' +
  '#nid-election .ne-live{display:inline-block;width:9px;height:9px;border-radius:50%;background:#c2410c;margin-right:6px;animation:nep 1.6s infinite}@keyframes nep{50%{opacity:.25}}' +
  '#nid-election .ne-upd{font-size:14px;color:var(--mut);margin-top:6px}#nid-election .ne-nav{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 6px}' +
  '#nid-election .ne-nav a{font-size:14px;padding:6px 12px;border:1.5px solid var(--ink);border-radius:20px;text-decoration:none;color:var(--ink)}#nid-election .ne-nav a:hover{background:var(--ink);color:#fff}' +
  '#nid-election section{padding:30px 0 10px;border-bottom:1px solid var(--line)}#nid-election h2.ne-h{font-family:"Times New Roman",Times,serif;font-size:clamp(26px,5cqi,34px);line-height:1.15;margin:0 0 6px}' +
  '#nid-election .ne-dek{color:#34473c;margin:0 0 14px;font-size:16px}' +
  '#nid-election .ne-sum{display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 12px}#nid-election .ne-stat{flex:1 1 120px;border:1px solid var(--line);border-radius:8px;padding:10px 12px}' +
  '#nid-election .ne-stat b{display:block;font-family:"Times New Roman",Times,serif;font-size:34px;line-height:1}#nid-election .ne-stat span{font-size:13px;color:var(--mut)}' +
  '#nid-election .ne-bar{height:12px;border-radius:6px;overflow:hidden;display:flex;background:var(--pend);margin-bottom:14px}#nid-election .ne-bar i{display:block;height:100%}' +
  '#nid-election .ne-filters{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}#nid-election .ne-chip{font:inherit;font-size:13px;padding:5px 10px;border:1px solid #b9c4be;border-radius:16px;background:#fff;color:var(--ink);cursor:pointer}' +
  '#nid-election .ne-chip[aria-pressed=true]{background:var(--ink);border-color:var(--ink);color:#fff}#nid-election select,#nid-election input[type=search]{font:inherit;font-size:14px;padding:6px 8px;border:1px solid #b9c4be;border-radius:6px;background:#fff;color:var(--ink)}' +
  '#nid-election .ne-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}@container (max-width:760px){#nid-election .ne-grid{grid-template-columns:repeat(2,1fr)}}@container (max-width:480px){#nid-election .ne-grid{grid-template-columns:1fr}}' +
  '#nid-election .ne-card{border:1px solid var(--line);border-left:5px solid var(--pend);border-radius:8px;padding:10px 12px;background:#fff}#nid-election .ne-card.pass{border-left-color:var(--pass)}#nid-election .ne-card.fail{border-left-color:var(--fail)}' +
  '#nid-election .ne-card .st{font-size:12px;font-weight:700;letter-spacing:.06em;color:var(--mut)}#nid-election .ne-card .nm{font-weight:700;font-size:15px;margin:2px 0}#nid-election .ne-card .ds{font-size:13.5px;color:#34473c}' +
  '#nid-election .pill{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:10px;background:#eef1ef;color:var(--mut);margin-top:6px}' +
  '#nid-election .pill.pass{background:#dff1e8;color:var(--pass)}#nid-election .pill.fail{background:#f6e3df;color:var(--fail)}' +
  '#nid-election .yn{position:relative;height:8px;background:#f0e0dc;border-radius:4px;margin-top:7px;overflow:visible}#nid-election .yn i{display:block;height:100%;background:var(--g);border-radius:4px 0 0 4px}#nid-election .yn em{position:absolute;top:-3px;width:2px;height:14px;background:var(--ink)}' +
  '#nid-election .ne-more{font:inherit;font-size:14px;margin-top:12px;padding:7px 14px;border:1.5px solid var(--ink);border-radius:20px;background:#fff;cursor:pointer}' +
  '#nid-election table{width:100%;border-collapse:collapse;font-size:14.5px}#nid-election td,#nid-election th{padding:8px 6px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}#nid-election th{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mut)}' +
  '#nid-election .ne-races{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:14px}@container (max-width:600px){#nid-election .ne-races{grid-template-columns:1fr}}' +
  '#nid-election .ne-race{border:1px solid var(--line);border-radius:8px;padding:12px}#nid-election .ne-race h3{font-family:"Times New Roman",Times,serif;font-size:20px;margin:0 0 8px}' +
  '#nid-election .cr{display:grid;grid-template-columns:1fr 54px;gap:2px 8px;align-items:center;margin-bottom:6px;font-size:14px}#nid-election .cr .b{grid-column:1/3;height:8px;background:#eef1ef;border-radius:4px;overflow:hidden}#nid-election .cr .b i{display:block;height:100%}' +
  '#nid-election .cr .v{text-align:right;font-weight:700}#nid-election .ne-note{font-size:13px;color:var(--mut);margin-top:10px}#nid-election svg{width:100%;height:auto;display:block}#nid-election svg text{font-family:"Times New Roman",Times,serif}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  var STATES = {AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NM:'New Mexico',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',RI:'Rhode Island',SD:'South Dakota',TN:'Tennessee',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'};
  var PCOL = {D:'var(--D)',R:'var(--R)'};
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function fmtTime(iso){if(!iso)return '';var d=new Date(iso);return d.toLocaleString('en-US',{timeZone:'America/Denver',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})+' MT';}
  function get(n){return fetch(BASE+n+'.json?t='+Math.floor(Date.now()/300000)).then(function(r){return r.json();});}
  el.innerHTML = '<div class="ne-top"><div class="ne-kick"><span class="ne-live"></span>Election 2026 · Live data</div>' +
    '<h1 class="ne-serif" style="font-size:clamp(30px,6.5cqi,46px);line-height:1.08;margin:8px 0 6px">The Midterms In Data</h1>' +
    '<div class="ne-upd">Loading the latest numbers…</div>' +
    '<div class="ne-nav"><a href="#ne-measures">145 ballot measures</a><a href="#ne-colorado">Colorado</a><a href="#ne-house">The House in history</a><a href="#ne-turnout">Turnout</a></div></div>' +
    '<section id="ne-measures"></section><section id="ne-colorado"></section><section id="ne-house"></section><section id="ne-turnout"></section>' +
    '<p class="ne-note">Results are unofficial and change as ballots are counted; a measure or race is marked decided only after a major news organization or the state calls it. This page refreshes hourly once results start coming in, starting when the first polls close at 6 p.m. Eastern. By Samuel W. Bennett, The News in Data.</p>';
  var state = {topic:'all', st:'all', q:'', showAll:false};
  function load(){
    Promise.all(['measures','colorado','house','turnout'].map(get)).then(function(a){
      var M=a[0],C=a[1],H=a[2],T=a[3];
      var upd=[M.updated,C.updated,H.updated,T.updated].sort().pop();
      el.querySelector('.ne-upd').innerHTML='Last updated '+fmtTime(upd)+'. Updates hourly after polls close.';
      measures(M); colorado(C); house(H); turnout(T);
    }).catch(function(){el.querySelector('.ne-upd').textContent='Could not load the latest data. Refresh to try again.';});
  }
  function measures(M){
    var s=document.getElementById('ne-measures'),ms=M.measures;
    var n={pass:0,fail:0,pending:0};ms.forEach(function(m){n[m.status==='passed'?'pass':m.status==='failed'?'fail':'pending']++;});
    var topics=Object.keys(M.topics).map(function(k){return [k,M.topics[k],ms.filter(function(m){return m.topic===k;}).length];}).sort(function(a,b){return b[2]-a[2];});
    var states=Object.keys(STATES).filter(function(k){return ms.some(function(m){return m.state===k;});});
    s.innerHTML='<h2 class="ne-h">Every Statewide Ballot Measure, Decided And Pending</h2>' +
      '<p class="ne-dek">Voters in '+states.length+' states are deciding '+ms.length+' statewide measures today. Taxes and election rules make up '+(topics[0][2]+topics[1][2])+' of them.</p>' +
      '<div class="ne-sum"><div class="ne-stat"><b style="color:var(--pass)">'+n.pass+'</b><span>passed</span></div><div class="ne-stat"><b style="color:var(--fail)">'+n.fail+'</b><span>failed</span></div><div class="ne-stat"><b>'+n.pending+'</b><span>not yet decided</span></div></div>' +
      '<div class="ne-bar" role="img" aria-label="'+n.pass+' passed, '+n.fail+' failed, '+n.pending+' pending"><i style="width:'+(100*n.pass/ms.length)+'%;background:var(--pass)"></i><i style="width:'+(100*n.fail/ms.length)+'%;background:var(--fail)"></i></div>' +
      '<div class="ne-filters" id="ne-tchips"></div><div class="ne-filters"><select id="ne-st" aria-label="Choose a state"><option value="all">All states</option>'+states.map(function(k){return '<option value="'+k+'">'+STATES[k]+'</option>';}).join('')+'</select>' +
      '<input type="search" id="ne-q" placeholder="Search measures" aria-label="Search measures"></div><div class="ne-grid" id="ne-mgrid"></div><button class="ne-more" id="ne-more"></button>' +
      '<p class="ne-note">'+esc(M.source)+' Passing thresholds differ by state (Colorado amendments need 55%, Florida amendments 60%). Topics are our grouping.</p>';
    var tc=s.querySelector('#ne-tchips');
    tc.innerHTML=[['all','All topics',ms.length]].concat(topics).map(function(t){return '<button class="ne-chip" data-t="'+t[0]+'">'+esc(t[1])+' <span style="opacity:.6">'+t[2]+'</span></button>';}).join('');
    function draw(){
      tc.querySelectorAll('.ne-chip').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.t===state.topic);});
      var q=state.q.toLowerCase();
      var list=ms.filter(function(m){return (state.topic==='all'||m.topic===state.topic)&&(state.st==='all'||m.state===state.st)&&(!q||(m.name+' '+m.desc+' '+STATES[m.state]).toLowerCase().indexOf(q)>=0);});
      var order={passed:0,failed:1,pending:2};list.sort(function(a,b){return (order[a.status]||2)-(order[b.status]||2)||a.state.localeCompare(b.state);});
      var cap=state.showAll||state.st!=='all'||q?list.length:Math.min(list.length,24);
      s.querySelector('#ne-mgrid').innerHTML=list.slice(0,cap).map(function(m){
        var cls=m.status==='passed'?'pass':m.status==='failed'?'fail':'';var lab=m.status==='passed'?'Passed':m.status==='failed'?'Failed':'Not yet decided';
        var bar=m.yes_pct!=null?'<div class="yn" title="Yes '+m.yes_pct+'%"><i style="width:'+m.yes_pct+'%"></i><em style="left:'+(m.threshold||50)+'%"></em></div><div style="font-size:12.5px;margin-top:3px">Yes '+m.yes_pct+'%</div>':'';
        return '<div class="ne-card '+cls+'"><div class="st">'+esc(STATES[m.state]).toUpperCase()+'</div><div class="nm">'+esc(m.name)+'</div><div class="ds">'+esc(m.desc)+'</div>'+bar+'<span class="pill '+cls+'">'+lab+'</span></div>';}).join('')||'<p>No measures match.</p>';
      var more=s.querySelector('#ne-more');more.style.display=cap<list.length?'':'none';more.textContent='Show all '+list.length+' measures';
    }
    tc.onclick=function(e){var b=e.target.closest('.ne-chip');if(b){state.topic=b.dataset.t;draw();}};
    s.querySelector('#ne-st').value=state.st;s.querySelector('#ne-st').onchange=function(e){state.st=e.target.value;draw();};
    s.querySelector('#ne-q').value=state.q;s.querySelector('#ne-q').oninput=function(e){state.q=e.target.value;draw();};
    s.querySelector('#ne-more').onclick=function(){state.showAll=true;draw();};
    draw();
  }
  function colorado(C){
    var s=document.getElementById('ne-colorado');
    var rows=C.measures.map(function(m){var tot=(m.yes||0)+(m.no||0),y=tot?100*m.yes/tot:null;
      var cls=m.status==='passed'?'pass':m.status==='failed'?'fail':'';var lab=m.status==='passed'?'Passed':m.status==='failed'?'Failed':(tot?'Counting':'No results yet');
      return '<tr><td style="width:34%"><b>'+esc(m.name)+'</b><div style="font-size:13px;color:#34473c">'+esc(m.desc)+'</div></td><td>'+(y==null?'<div class="yn" style="background:#eef1ef"><em style="left:'+m.threshold+'%"></em></div>':'<div class="yn"><i style="width:'+y.toFixed(1)+'%"></i><em style="left:'+m.threshold+'%"></em></div><div style="font-size:12.5px;margin-top:3px">Yes '+y.toFixed(1)+'% · '+tot.toLocaleString()+' votes</div>')+'<div style="font-size:11.5px;color:var(--mut)">Needs '+m.threshold+'%</div></td><td style="width:92px"><span class="pill '+cls+'">'+lab+'</span></td></tr>';}).join('');
    var races=C.races.map(function(r){var tot=r.candidates.reduce(function(a,c){return a+(c.votes||0);},0);
      var cs=r.candidates.slice().sort(function(a,b){return (b.votes||0)-(a.votes||0);});
      var main=cs.slice(0,3),rest=cs.slice(3),restV=rest.reduce(function(a,c){return a+(c.votes||0);},0);
      var html=main.map(function(c){var p=tot?100*(c.votes||0)/tot:0;return '<div class="cr"><span>'+esc(c.name)+' <span style="color:var(--mut)">('+esc(c.party)+')</span>'+(r.called&&r.called===c.name.replace('*','')?' <span class="pill pass" style="margin:0">Winner</span>':'')+'</span><span class="v">'+(tot?p.toFixed(1)+'%':'–')+'</span><div class="b"><i style="width:'+p+'%;background:'+(PCOL[c.party]||'#8f9a94')+'"></i></div></div>';}).join('');
      if(rest.length)html+='<div class="cr"><span style="color:var(--mut)">'+rest.length+(rest.length===1?' other':' others')+'</span><span class="v">'+(tot?(100*restV/tot).toFixed(1)+'%':'–')+'</span></div>';
      return '<div class="ne-race"><h3>'+esc(r.race)+'</h3>'+html+'<div style="font-size:12.5px;color:var(--mut)">'+(tot?tot.toLocaleString()+' votes counted':'No votes counted yet')+'</div></div>';}).join('');
    s.innerHTML='<h2 class="ne-h">Colorado: 14 Ballot Measures And The Top Races</h2><p class="ne-dek">Colorado votes by mail, and polls close at 7 p.m. Mountain. Most counties post their first results within the hour, and the counts keep growing for days.</p>' +
      '<table><thead><tr><th>Measure</th><th>Yes share</th><th>Status</th></tr></thead><tbody>'+rows+'</tbody></table>' +
      '<div class="ne-races">'+races+'</div><p class="ne-note">'+esc(C.note)+' '+esc(C.source)+' Candidate order follows the vote count; party labels: D Democratic, R Republican, L Libertarian, U unaffiliated, AV Approval Voting, ACP American Constitution, Forward, Unity.</p>';
  }
  function house(H){
    var s=document.getElementById('ne-house'),h=H.history.slice(),y=H.y2026;
    var W=760,Hh=360,L=46,R=10,Tp=20,B=40,n=h.length+1,bw=(W-L-R)/n,x=function(i){return L+i*bw;},yS=function(v){return Tp+(10-v)*(Hh-Tp-B)/(75);};
    var bars=h.map(function(d,i){var y0=yS(0),y1=yS(d.change);return '<rect x="'+(x(i)+2)+'" y="'+Math.min(y0,y1)+'" width="'+(bw-4)+'" height="'+Math.abs(y1-y0)+'" fill="'+(d.change>0?'#007a55':'#a9b8b0')+'"><title>'+d.year+' ('+d.president+'): '+(d.change>0?'+':'')+d.change+'</title></rect>'+(i%2===0?'<text x="'+(x(i)+bw/2)+'" y="'+(Hh-B+18)+'" font-size="12" text-anchor="middle" fill="#13241b">\''+String(d.year).slice(2)+'</text>':'');}).join('');
    var i26=h.length,p=y.projected_change,b26=p==null?'<rect x="'+(x(i26)+2)+'" y="'+yS(0)+'" width="'+(bw-4)+'" height="'+(yS(-26)-yS(0))+'" fill="none" stroke="#13241b" stroke-dasharray="4 3"/><text x="'+(x(i26)+bw/2)+'" y="'+(yS(-26)+16)+'" font-size="12" text-anchor="middle" fill="#13241b">?</text>':'<rect x="'+(x(i26)+2)+'" y="'+Math.min(yS(0),yS(p))+'" width="'+(bw-4)+'" height="'+Math.abs(yS(p)-yS(0))+'" fill="#c2410c"/>';
    var grid=[10,0,-20,-40,-60].map(function(v){return '<line x1="'+L+'" x2="'+(W-R)+'" y1="'+yS(v)+'" y2="'+yS(v)+'" stroke="'+(v===0?'#000':'#e3eee7')+'" stroke-width="'+(v===0?2:1)+'"/><text x="'+(L-6)+'" y="'+(yS(v)+4)+'" font-size="12" text-anchor="end" font-weight="700" fill="#13241b">'+(v>0?'+':'')+v+'</text>';}).join('');
    s.innerHTML='<h2 class="ne-h">Where 2026 Lands Among Postwar Midterms</h2><p class="ne-dek">The president\'s party lost House seats in 18 of the 20 midterms from 1946 to 2022, an average of 25.7 seats. The dashed outline for 2026 marks that average until networks project the House.</p>' +
      '<svg viewBox="0 0 '+W+' '+Hh+'" role="img" aria-label="House seats gained or lost by the president\'s party in midterms, 1946 to 2022, with 2026 pending">'+grid+bars+b26+'<text x="'+(x(i26)+bw/2)+'" y="'+(Hh-B+18)+'" font-size="12" font-weight="700" text-anchor="middle" fill="#c2410c">\'26</text><line x1="'+L+'" x2="'+L+'" y1="'+Tp+'" y2="'+(Hh-B)+'" stroke="#000" stroke-width="2"/><text x="'+(L+6)+'" y="'+(Tp+4)+'" font-size="12" font-weight="700" fill="#13241b">SEATS GAINED OR LOST</text></svg>' +
      '<p style="font-size:16px;margin-top:10px">'+(p==null?'<b>2026:</b> No projection yet. '+esc(y.note||''):'<b>2026 (as of '+esc(y.as_of)+'):</b> Republicans '+(p>0?'gain ':'lose ')+Math.abs(p)+' seats in the projection, with '+y.uncalled+' races not yet called.')+'</p><p class="ne-note">'+esc(H.source)+' Gerald Ford counted as president in 1974.</p>';
  }
  function turnout(T){
    var s=document.getElementById('ne-turnout'),sr=T.series,y=T.y2026;
    var W=760,Hh=320,L=40,R=60,Tp=20,B=34,x=function(v){return L+(v-1902)*(W-L-R)/(2026-1902);},yS=function(v){return Tp+(60-v)*(Hh-Tp-B)/(60-30);};
    var path='M'+sr.map(function(d){return x(d[0])+','+yS(d[1]);}).join('L');
    var dots=sr.map(function(d){return '<circle cx="'+x(d[0])+'" cy="'+yS(d[1])+'" r="3.2" fill="#007a55"><title>'+d[0]+': '+d[1]+'%</title></circle>';}).join('');
    var grid=[30,40,50,60].map(function(v){return '<line x1="'+L+'" x2="'+(W-R)+'" y1="'+yS(v)+'" y2="'+yS(v)+'" stroke="#e3eee7"/><text x="'+(L-6)+'" y="'+(yS(v)+4)+'" font-size="12" font-weight="700" text-anchor="end" fill="#13241b">'+v+'%</text>';}).join('')+[1910,1950,1990,2026].map(function(v){return '<text x="'+x(v)+'" y="'+(Hh-B+18)+'" font-size="12" font-weight="700" text-anchor="middle" fill="#13241b">'+v+'</text>';}).join('');
    var e=y.estimate_pct,p26=e==null?'<line x1="'+x(2026)+'" x2="'+x(2026)+'" y1="'+yS(58)+'" y2="'+yS(32)+'" stroke="#c2410c" stroke-dasharray="4 3"/><text x="'+(x(2026)+6)+'" y="'+yS(56)+'" font-size="12" fill="#c2410c">2026</text><text x="'+(x(2026)+6)+'" y="'+(yS(56)+14)+'" font-size="12" fill="#c2410c">pending</text>':'<circle cx="'+x(2026)+'" cy="'+yS(e)+'" r="6" fill="#c2410c"/><text x="'+(x(2026)+9)+'" y="'+(yS(e)+4)+'" font-size="13" font-weight="700" fill="#c2410c">'+e+'%</text>';
    s.innerHTML='<h2 class="ne-h">Will Turnout Beat 2018?</h2><p class="ne-dek">Midterm turnout hit 50.1% of eligible voters in 2018, the highest since 1914, and 46.1% in 2022. '+(e==null?'By '+esc(y.early_as_of)+', '+y.early_votes_m+' million people had already voted early, '+Math.round(100*y.early_votes_m/y.ballots_2022_m)+'% of all 2022 ballots.':'The first 2026 estimate, as of '+esc(y.as_of)+', is '+e+'%.')+'</p>' +
      '<svg viewBox="0 0 '+W+' '+Hh+'" role="img" aria-label="Midterm turnout 1902 to 2022 with 2026 pending">'+grid+'<path d="'+path+'" fill="none" stroke="#007a55" stroke-width="2.5"/>'+dots+p26+'<line x1="'+L+'" x2="'+L+'" y1="'+Tp+'" y2="'+(Hh-B)+'" stroke="#000" stroke-width="2"/><line x1="'+L+'" x2="'+(W-R)+'" y1="'+(Hh-B)+'" y2="'+(Hh-B)+'" stroke="#000" stroke-width="2"/><text x="'+(L+6)+'" y="'+(Tp+4)+'" font-size="12" font-weight="700" fill="#13241b">SHARE OF ELIGIBLE VOTERS</text></svg>' +
      '<p class="ne-note">'+esc(T.source)+'</p>';
  }
  load(); setInterval(load, 10*60*1000);
})();
