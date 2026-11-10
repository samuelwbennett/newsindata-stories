(function(){
var D=[[6150,3308,0,0,0,0,0,0,3174,1867,2976,1441],[6150,3305,0,0,0,0,0,0,3169,1863,2981,1442],[6150,3388,0,0,0,0,0,0,3200,1920,2950,1468],[6128,3540,22,11,0,0,0,0,3173,1988,2977,1563],[5994,3594,152,101,4,3,0,0,3216,2083,2934,1615],[5599,3504,511,343,38,26,2,1,3238,2182,2912,1692],[5035,3264,952,660,137,96,23,20,3301,2298,2846,1742],[4364,2919,1359,970,338,251,67,59,3289,2376,2839,1823],[3662,2541,1704,1258,525,404,168,153,3284,2470,2775,1886],[3038,2161,1866,1402,745,583,290,271,3235,2503,2704,1914],[2501,1820,1944,1505,913,745,400,381,3142,2518,2616,1933],[2020,1509,1928,1535,1054,894,495,473,3011,2491,2486,1920],[1617,1245,1874,1526,1092,961,561,536,2849,2422,2295,1846],[1282,1009,1784,1479,1125,1005,617,597,2675,2328,2133,1762],[1010,813,1661,1399,1129,1025,673,661,2518,2229,1955,1669],[794,662,1500,1286,1111,1032,703,694,2312,2101,1796,1573],[641,549,1304,1140,1097,1036,714,705,2131,1971,1625,1459],[484,414,1159,1032,1069,1011,702,698,1946,1824,1468,1331],[360,309,1041,929,1033,994,659,657,1770,1679,1323,1210],[258,227,891,810,980,950,672,669,1594,1538,1207,1118],[176,154,763,710,921,891,673,669,1434,1395,1099,1029],[125,112,648,613,846,823,627,623,1282,1254,964,917],[87,80,561,537,756,734,604,603,1162,1142,846,812],[65,62,470,454,697,683,570,569,1057,1043,745,725],[47,46,396,384,604,594,550,550,945,935,652,639],[39,38,313,306,545,541,509,509,838,831,568,563],[28,28,268,263,460,458,482,482,742,736,496,495],[24,24,224,220,396,395,450,450,659,655,435,434],[12,12,186,184,361,360,413,413,583,581,389,388],[6,6,143,141,334,334,380,380,517,516,346,345]];var G='#007a55',INK='#13241b',SUB='#4a5550';
function fmt(n){return n.toLocaleString('en-US')}
function go(){var b=document.getElementById('nid-nba-lead');if(!b)return;
var css='#nid-nba-lead{max-width:680px;margin:2.2em auto;border:1px solid #e3eee7;border-radius:12px;overflow:hidden;font-family:Georgia,"Times New Roman",serif;color:'+INK+';background:#fff}'+
'#nid-nba-lead .h{padding:18px 22px 14px;background:#f1f8f4;border-bottom:1px solid #e3eee7}#nid-nba-lead .h b{display:block;font-size:1.25em}#nid-nba-lead .h span{font-size:.92em;color:'+SUB+';font-style:italic}'+
'#nid-nba-lead .bd{padding:18px 22px 20px}'+
'#nid-nba-lead label{display:block;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:14px;margin:0 0 4px}#nid-nba-lead label b{color:'+G+';font-size:18px}'+
'#nid-nba-lead input[type=range]{width:100%;accent-color:'+G+';margin:0 0 14px}'+
'#nid-nba-lead .tg{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 6px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}'+
'#nid-nba-lead .tg span{font-size:12px;color:'+SUB+';width:100%;margin-bottom:-2px}'+
'#nid-nba-lead .tg button{font:inherit;font-size:13px;padding:6px 12px;border-radius:999px;border:1px solid #cfd9d3;background:#fff;color:'+INK+';cursor:pointer}'+
'#nid-nba-lead .tg button.on{background:'+G+';border-color:'+G+';color:#fff}'+
'#nid-nba-lead .res{display:flex;align-items:baseline;gap:14px;margin:16px 0 6px}#nid-nba-lead .res strong{font-size:64px;line-height:1;color:'+G+'}#nid-nba-lead .res em{font-style:normal;font-size:1.02em;line-height:1.35}'+
'#nid-nba-lead .bar{height:22px;border-radius:5px;background:#e9e3d8;overflow:hidden}#nid-nba-lead .bar i{display:block;height:100%;background:'+G+';transition:width .35s}'+
'#nid-nba-lead .ky{display:flex;justify-content:space-between;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:12px;color:'+SUB+';margin-top:5px}'+
'#nid-nba-lead .dots{display:grid;grid-template-columns:repeat(20,1fr);gap:3px;margin-top:14px}#nid-nba-lead .dots i{aspect-ratio:1;border-radius:50%;background:#e9e3d8;transition:background .25s}#nid-nba-lead .dots i.w{background:'+G+'}'+
'#nid-nba-lead .nt{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:12px;color:'+SUB+';margin-top:12px;line-height:1.4}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
b.innerHTML='<div class="h"><b>How safe is that lead?</b><span>Pick a lead and when the first team got there</span></div><div class="bd">'+
'<label>The first team to lead by <b class="lv"></b></label><input type="range" min="1" max="30" value="10" class="L">'+
'<div class="tg q"><span>When it first got there</span><button data-k="all" class="on">Any time</button><button data-k="0">1st quarter</button><button data-k="1">2nd quarter</button><button data-k="2">3rd quarter</button><button data-k="3">4th or overtime</button></div>'+
'<div class="tg s"><span>Who got there first</span><button data-k="all" class="on">Either team</button><button data-k="h">Home team</button><button data-k="a">Road team</button></div>'+
'<div class="res"><strong></strong><em></em></div><div class="bar"><i></i></div><div class="ky"><span>Went on to win</span><span>Blew the lead and lost</span></div><div class="dots"></div>'+
'<div class="nt">Each dot is one game out of 100. Based on all 6,150 NBA regular-season games from 2021\u201322 through 2025\u201326. Quarter and home-or-road filters can\u2019t be combined.</div></div>';
var q=function(s){return b.querySelector(s)},dots=q('.dots'),Q='all',S='all';
for(var i=0;i<100;i++)dots.appendChild(document.createElement('i'));
function up(){var L=+q('.L').value,d=D[L-1],n,w;
if(Q!=='all'){n=d[Q*2];w=d[Q*2+1]}else if(S==='h'){n=d[8];w=d[9]}else if(S==='a'){n=d[10];w=d[11]}else{n=d[8]+d[10];w=d[9]+d[11]}
q('.lv').textContent=L+(L===1?' point':' points');
var st=q('.res strong'),em=q('.res em'),bar=q('.bar i');
if(n<20){st.textContent='\u2014';em.textContent=n?('Only '+n+' game'+(n===1?'':'s')+' in five seasons, too few to say.'):'It never happened in five seasons.';bar.style.width='0%';[].forEach.call(dots.children,function(x){x.className=''});return}
var p=w/n*100,sh=p>=99.95&&w<n?'99.9':(p>=99?p.toFixed(1):Math.round(p));
st.textContent=sh+'%';em.innerHTML='won the game: <b>'+fmt(w)+'</b> of '+fmt(n)+' games.'+(w<n?' '+fmt(n-w)+' lost.':' None lost.');
bar.style.width=p+'%';var k=Math.min(100,Math.round(p));if(k===100&&w<n)k=99;[].forEach.call(dots.children,function(x,i){x.className=i<k?'w':''})}
function grp(sel,set){[].forEach.call(b.querySelectorAll(sel+' button'),function(x){x.onclick=function(){set(x.dataset.k);paintBtns();up()}})}
function paintBtns(){[].forEach.call(b.querySelectorAll('.q button'),function(x){x.classList.toggle('on',x.dataset.k===String(Q))});[].forEach.call(b.querySelectorAll('.s button'),function(x){x.classList.toggle('on',x.dataset.k===S)})}
grp('.q',function(k){Q=k==='all'?'all':+k;if(Q!=='all')S='all'});grp('.s',function(k){S=k;if(S!=='all')Q='all'});
q('.L').oninput=up;up();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();