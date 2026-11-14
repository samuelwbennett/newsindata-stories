/* The News in Data: how the Nov. 13, 2026 FAA ground stop moved Saturday's college football kickoffs.
   Fills #nid-cfbs (kickoff shift chart) and #nid-cfbs-map (travel map). Built by src/build.js, which inlines MAP.
   Static images use the same drawing functions through window.NIDCFBS (see src/static.html). */
(function(){
var MAP=__MAP__;
var G='#007A55',GD='#005C40',INK='#13241B',SUB='#5F7268',GREY='#B9C4BE',PALE='#E3E8E4',GOLD='#C9962B';
var SERIF='"Times New Roman",Times,Georgia,serif',SANS='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif';
/* [conference, away, home, original kickoff ET (hours; 12.5 = 12:30 p.m.), new kickoff ET or null; 37 = Sunday 1 p.m.]
   Saturday schedule: FBSchedules, Nov. 14, 2026. Moves: Awful Announcing and Sports Illustrated, Nov. 14, 2026. */
var GAMES=[
["ACC","Duke","Miami",12,null],["ACC","Wake Forest","SMU",12,null],["ACC","Syracuse","NC State",12,null],["ACC","Georgia Tech","Clemson",12.5,null],["ACC","California","Virginia",15.5,null],["ACC","Boston College","Notre Dame",15.5,null],["ACC","Louisville","North Carolina",19,null],["ACC","Stanford","Virginia Tech",19.5,null],
["American","East Carolina","Charlotte",13,null],["American","UAB","Temple",13,null],["American","Tulane","Rice",14,16.5],["American","FAU","Tulsa",15.5,19.25],["American","North Texas","UTSA",21,null],
["Big 12","Cincinnati","Iowa State",12,null],["Big 12","Kansas State","TCU",14,null],["Big 12","Kansas","West Virginia",17.5,15.5],["Big 12","Arizona State","UCF",15.5,17.5],["Big 12","Baylor","BYU",15.5,19],["Big 12","Texas Tech","Oklahoma State",21.5,null],["Big 12","Utah","Arizona",19.5,22.5],
["Big Ten","Northwestern","Ohio State",12,null],["Big Ten","Wisconsin","Maryland",12,null],["Big Ten","Nebraska","Rutgers",12.5,null],["Big Ten","Michigan","Oregon",15.5,null],["Big Ten","USC","Indiana",15.5,null],["Big Ten","Washington","Michigan State",16.25,17.5],["Big Ten","Minnesota","Penn State",19,null],["Big Ten","Purdue","Iowa",19.5,null],
["C-USA","Kennesaw State","Sam Houston",14,null],["C-USA","FIU","Delaware",15,null],["C-USA","New Mexico State","Missouri State",15,null],["C-USA","Jacksonville State","WKU",15.5,null],["C-USA","Middle Tennessee","Liberty",15.5,null],
["Independent","James Madison","UConn",12,null],
["Mountain West","Nevada","Northern Illinois",15.5,null],["Mountain West","San Jose State","Air Force",19,null],["Mountain West","UNLV","New Mexico",19.5,null],["Mountain West","Wyoming","UTEP",22,null],["Mountain West","North Dakota State","Hawaii",23,null],
["Pac-12","Fresno State","Texas State",16,null],["Pac-12","Oregon State","Boise State",18,null],["Pac-12","Utah State","San Diego State",21.5,null],["Pac-12","Colorado State","Washington State",22.5,null],
["SEC","Alabama","Vanderbilt",12.75,null],["SEC","Tennessee","Texas A&M",15,null],["SEC","Missouri","Georgia",15.5,null],["SEC","Auburn","Mississippi State",12,16.25],["SEC","Florida","Kentucky",18.25,null],["SEC","Texas","LSU",19.5,null],["SEC","South Carolina","Arkansas",19.75,null],["SEC","Ole Miss","Oklahoma",16.25,37],
["Sun Belt","Arkansas State","Coastal Carolina",13,null],["Sun Belt","Georgia Southern","Georgia State",15.5,null],["Sun Belt","Southern Miss","Louisiana Tech",17,null],["Sun Belt","App State","Marshall",18,null],["Sun Belt","Troy","South Alabama",19,null]
];
/* What happened to each moved game's road team, from ESPN and SI reports on Nov. 13 and the moves above. Miles are straight-line, campus to campus. */
var NOTE={
"Ole Miss":["452","Ole Miss's charter to Oklahoma couldn't leave Friday, and players were sent home. The SEC moved the game to Sunday at 1 p.m. ET and told Oklahoma it would forfeit if it refused; Oklahoma's athletic director called the decision unfair."],
"Auburn":["200","Auburn's flight was delayed, so the team took buses to Starkville. Kickoff moved from noon to 4:15 p.m. ET."],
"Washington":["1,854","Washington hadn't boarded when departures stopped, and busing from Seattle was ruled out. Kickoff moved from 4:15 to 5:30 p.m. ET on Big Ten Network."],
"Arizona State":["1,844","Arizona State got off its plane and went home Friday, planning to fly to Orlando Saturday morning. Kickoff moved from 3:30 to 5:30 p.m. ET, and from ESPN2 to ESPNU."],
"Kansas":["818","Kansas landed in Pittsburgh at 3:50 p.m. ET Friday, four minutes before the stop. Its game moved up two hours, to 3:30 p.m. ET, to take the ESPN2 window Arizona State–UCF gave up."],
"Baylor":["1,009","Baylor was one of four Big 12 teams still waiting to fly out Friday. Kickoff at No. 10 BYU moved from 3:30 to 7 p.m. ET on Fox."],
"Utah":["592","No. 2 Utah's trip was disrupted. Kickoff moved from 7:30 to 10:30 p.m. ET, which is 8:30 p.m. in Tucson, with Fox's lead broadcast crew on the call."],
"Tulane":["318","Tulane was grounded Friday. Kickoff moved from 2 to 4:30 p.m. ET on ESPN+."],
"FAU":["1,151","Kickoff moved from 3:30 to 7:15 p.m. ET on ESPN+, one of the American's two ground-stop changes."]
};
/* road trips for the map: [away, home, kind] kind m = game moved, g = team went by road and the game stayed on time */
var TRIPS=[["Ole Miss","Oklahoma","m"],["Auburn","Mississippi State","m"],["Washington","Michigan State","m"],["Arizona State","UCF","m"],["Kansas","West Virginia","m"],["Baylor","BYU","m"],["Utah","Arizona","m"],["Tulane","Rice","m"],["FAU","Tulsa","m"],
 ["Purdue","Iowa","g","256","Purdue switched to buses after its flight to Iowa City was delayed. Its 7:30 p.m. ET kickoff stayed put."],["Alabama","Vanderbilt","g","207","Alabama drove to Nashville instead of flying. Its 12:45 p.m. ET kickoff stayed put."],["North Texas","UTSA","g","272","North Texas took buses to San Antonio after its flight was grounded. Its 9 p.m. ET kickoff stayed put."]];

function fmtT(v){if(v>=36)return 'Sun. '+((v-24)>12?(v-36)+' p.m.':'');var h=Math.floor(v),mi=Math.round((v-h)*60),ap=h>=12?'p.m.':'a.m.',hh=h>12?h-12:h;return hh+(mi?':'+(mi<10?'0':'')+mi:'')+' '+ap}
function fmtK(v){return v===37?'Sun. 1 p.m.':fmtT(v)}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function moved(){return GAMES.filter(function(g){return g[4]!==null}).sort(function(a,b){return (b[4]-b[3])-(a[4]-a[3])})}

/* ---------- kickoff shift chart (SVG string) ---------- */
function timeline(o){
  o=o||{};var all=o.all,W=o.W||760,fs=o.fs||1,rows=all?GAMES.slice().sort(function(a,b){return a[3]-b[3]||(a[1]<b[1]?-1:1)}):moved();
  var ST=o.stack&&!all,LW=ST?0:(o.LW||(all?190:215)*fs),RH=(all?21:46)*fs*(o.rh||1)*(ST?1.45:1),top=(o.top||40)*fs,x0=LW+10,x1=W-12,sun0=x1-(o.sunW||86)*fs;
  var X=function(v){return v>=36?sun0+(x1-sun0)*0.5:x0+(v-11)/(24-11)*(sun0-14-x0)};
  var H=top+rows.length*RH+(o.axisB||34)*fs,s='';
  s+='<rect x="'+(sun0-4)+'" y="'+(top-8*fs)+'" width="'+(x1-sun0+4)+'" height="'+(rows.length*RH+8*fs)+'" fill="#F4F8F5"/>';
  [12,15,18,21,24].forEach(function(t){s+='<line x1="'+X(t)+'" x2="'+X(t)+'" y1="'+(top-8*fs)+'" y2="'+(top+rows.length*RH)+'" stroke="'+PALE+'" stroke-width="'+fs+'"/>'});
  rows.forEach(function(g,i){
    var y=top+i*RH+RH/2+(ST?RH*.17:0),mv=g[4]!==null,lab=g[1]+' at '+g[2];
    if(i%2===1&&all)s+='<rect x="0" y="'+(y-RH/2)+'" width="'+(sun0-6)+'" height="'+RH+'" fill="#FAFBFA"/>';
    s+=ST?'<text x="'+(x0+4)+'" y="'+(y-RH*.33)+'" font-size="'+(17*fs)+'" font-weight="700" fill="'+INK+'">'+esc(lab)+'</text>':'<text x="'+LW+'" y="'+(y+(all?4:5)*fs)+'" text-anchor="end" font-size="'+((all?12.5:16)*fs)+'" font-weight="'+(mv?700:400)+'" fill="'+(mv?INK:SUB)+'">'+esc(lab)+'</text>';
    if(!mv){s+='<circle cx="'+X(g[3])+'" cy="'+y+'" r="'+(4*fs)+'" fill="'+GREY+'"/>';return}
    var a=X(g[3]),b=X(g[4]),dir=b>a?1:-1,col=dir>0?G:GOLD,r=(all?5:7)*fs;
    s+='<line x1="'+(a+dir*r)+'" x2="'+(b-dir*(r+5*fs))+'" y1="'+y+'" y2="'+y+'" stroke="'+col+'" stroke-width="'+(all?2.5:3.5)*fs+'"'+(g[4]>=36?' stroke-dasharray="'+(6*fs)+' '+(4*fs)+'"':'')+'/>';
    s+='<path d="M'+(b-dir*(r+7*fs))+' '+(y-5*fs)+'L'+(b-dir*(r))+' '+y+'L'+(b-dir*(r+7*fs))+' '+(y+5*fs)+'Z" fill="'+col+'"/>';
    s+='<circle cx="'+a+'" cy="'+y+'" r="'+r+'" fill="#fff" stroke="'+SUB+'" stroke-width="'+(2*fs)+'"/><circle cx="'+b+'" cy="'+y+'" r="'+r+'" fill="'+col+'"/>';
    if(!all){var dh=g[4]-g[3],t=(dh>0?'+':'−')+(Math.abs(dh)>=1?Math.floor(Math.abs(dh))+' hr':'')+(Math.abs(dh)%1?' '+Math.round(Math.abs(dh)%1*60)+' min':'');
      var tx=ST?(g[4]>=36?sun0-10*fs:Math.max(a,b)+r+6*fs):g[4]>=36?sun0-10*fs:(a+b)/2,ty=ST?(g[4]>=36?y-9*fs:y+4.5*fs):y-11*fs;s+='<text x="'+tx+'" y="'+ty+'" text-anchor="'+(g[4]>=36?'end':ST?'start':'middle')+'" font-size="'+(12.5*fs)+'" font-weight="700" fill="'+col+'" stroke="#fff" stroke-width="'+(4*fs)+'" paint-order="stroke">'+(g[4]>=36?(ST?'To Sunday, +20 hr 45 min':'Moved to Sunday, +20 hr 45 min'):t)+'</text>'}
  });
  var ay=top+rows.length*RH;
  s+='<line x1="'+x0+'" x2="'+(sun0-10)+'" y1="'+ay+'" y2="'+ay+'" stroke="'+INK+'" stroke-width="'+(2.5*fs)+'"/><line x1="'+x0+'" x2="'+x0+'" y1="'+(top-10*fs)+'" y2="'+ay+'" stroke="'+INK+'" stroke-width="'+(2.5*fs)+'"/>';
  s+='<line x1="'+sun0+'" x2="'+x1+'" y1="'+ay+'" y2="'+ay+'" stroke="'+INK+'" stroke-width="'+(2.5*fs)+'"/>';
  [[12,'Noon'],[15,'3 p.m.'],[18,'6 p.m.'],[21,'9 p.m.'],[24,ST?'12 a.m.':'Midnight']].forEach(function(t){s+='<text x="'+X(t[0])+'" y="'+(ay+20*fs)+'" text-anchor="middle" font-size="'+(13.5*fs)+'" font-weight="700">'+t[1]+'</text>'});
  s+='<text x="'+X(37)+'" y="'+(ay+20*fs)+'" text-anchor="middle" font-size="'+(13.5*fs)+'" font-weight="700">'+(ST?'Sun. 1':'Sun. 1 p.m.')+'</text>';
  s+='<text x="'+X(37)+'" y="'+(top-14*fs)+'" text-anchor="middle" font-size="'+(12*fs)+'" font-weight="700" fill="'+SUB+'" letter-spacing=".04em">SUNDAY</text>';
  s+='<text x="'+((x0+sun0)/2)+'" y="'+(top-14*fs)+'" text-anchor="middle" font-size="'+(12*fs)+'" font-weight="700" fill="'+SUB+'" letter-spacing=".04em">SATURDAY KICKOFF, EASTERN TIME</text>';
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+(all?'All 56 FBS college football games on Saturday, Nov. 14, 2026, by kickoff time, with the nine moved games shown as arrows from old to new kickoff.':'The nine college football games the Nov. 13 FAA ground stop moved. Eight moved later, Kansas at West Virginia moved two hours earlier, and Ole Miss at Oklahoma moved to Sunday at 1 p.m. Eastern.')+'">'+s+'</svg>',rows:rows,top:top,RH:RH};
}

/* ---------- travel map (SVG string) ---------- */
function mapSVG(o){
  o=o||{};var P=MAP.P,s='<g><path d="'+MAP.nation+'" fill="#EEF2EF" stroke="#C9D3CD" stroke-width="1"/><path d="'+MAP.borders+'" fill="none" stroke="#fff" stroke-width="1.2"/></g>';
  TRIPS.forEach(function(t,i){
    var a=P[t[0]],b=P[t[1]],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1],L=Math.sqrt(dx*dx+dy*dy),k=Math.min(.28,60/L)*L;
    var cx=mx-dy/L*k*.6,cy=my+dx/L*k*.6-Math.min(L*.18,40),mvd=t[2]==='m',col=mvd?G:GOLD;
    s+='<path class="trip" data-i="'+i+'" d="M'+a[0]+','+a[1]+' Q'+cx+','+cy+' '+b[0]+','+b[1]+'" fill="none" stroke="'+col+'" stroke-width="'+(mvd?3:2.6)+'" stroke-linecap="round"'+(mvd?'':' stroke-dasharray="7 5"')+' opacity=".95"/>';
    s+='<circle cx="'+a[0]+'" cy="'+a[1]+'" r="3.5" fill="#fff" stroke="'+col+'" stroke-width="2"/><circle cx="'+b[0]+'" cy="'+b[1]+'" r="5" fill="'+col+'"/>';
  });
  var L=[["Washington",-4,-12,"start"],["Utah",8,-6,"start"],["Arizona State",-8,12,"end"],["Baylor",-8,18,"end"],["FAU",8,16,"start"],["Kansas",-6,-10,"end"],["Ole Miss",-8,-8,"end"],["Tulane",8,14,"start"],["Auburn",8,14,"start"],["Purdue",6,-9,"start"],["Alabama",-8,16,"end"],["North Texas",-6,-10,"end"]];
  L.forEach(function(l){var p=P[l[0]];s+='<text x="'+(p[0]+l[1])+'" y="'+(p[1]+l[2])+'" text-anchor="'+l[3]+'" font-size="'+(o.fs||13)+'" font-weight="700" fill="'+INK+'" stroke="#fff" stroke-width="3.5" paint-order="stroke">'+l[0]+'</text>'});
  var D=[["Oklahoma",-8,-9,"end"],["Mississippi State",4,-10,"start"],["Michigan State",8,16,"start"],["UCF",-8,16,"end"],["West Virginia",8,-8,"start"],["BYU",-8,-6,"end"],["Arizona",8,6,"start"],["Rice",-8,16,"end"],["Tulsa",0,-10,"middle"],["Iowa",-8,-6,"end"],["Vanderbilt",8,-6,"start"],["UTSA",-8,6,"end"]];
  if(!o.noHome)D.forEach(function(l){var p=P[l[0]];s+='<text x="'+(p[0]+l[1])+'" y="'+(p[1]+l[2])+'" text-anchor="'+l[3]+'" font-size="'+((o.fs||13)*.85)+'" font-style="italic" fill="'+SUB+'" stroke="#fff" stroke-width="3" paint-order="stroke">'+l[0]+'</text>'});
  return '<svg viewBox="0 0 975 610" role="img" aria-label="Map of the road trips behind the nine moved games, from Washington to Michigan State at 1,854 miles to Auburn to Mississippi State at 200, plus three teams that went by road and kept their kickoff times.">'+s+'</svg>';
}
window.NIDCFBS={timeline:timeline,map:mapSVG,GAMES:GAMES};
if(window.NIDCFBS_STATIC)return;

/* ---------- page ---------- */
var CSS='.nid-cfbs p.ti{font-family:'+SERIF+'!important;font-size:clamp(1.3em,4.4vw,1.75em)!important;font-weight:700!important;line-height:1.12!important;color:'+INK+'!important;margin:0 0 .3em!important}.nid-cfbs p.su{font-family:'+SERIF+'!important;font-style:italic!important;font-size:clamp(.95em,2.6vw,1.08em)!important;line-height:1.3!important;color:'+SUB+'!important}'+'.nid-cfbs{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2.2em auto;position:relative}'+
'.nid-cfbs .ti{font-size:clamp(1.25em,4.2vw,1.7em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center}'+
'.nid-cfbs .su{font-size:clamp(.92em,2.6vw,1.05em);color:'+SUB+';font-style:italic;margin:0 auto .9em;text-align:center;max-width:600px;line-height:1.3}'+
'.nid-cfbs .tg{display:flex;justify-content:center;gap:8px;margin:0 0 10px;flex-wrap:wrap}'+
'.nid-cfbs .tg button{font:600 14px/1 '+SANS+';border:1.5px solid '+G+';background:#fff;color:'+G+';border-radius:999px;padding:9px 16px;cursor:pointer;min-height:40px}'+
'.nid-cfbs .tg button[aria-pressed=true]{background:'+G+';color:#fff}'+
'.nid-cfbs svg{display:block;width:100%;height:auto;overflow:visible}.nid-cfbs text{font-family:'+SERIF+'}'+
'.nid-cfbs .hit{cursor:pointer;outline:none}.nid-cfbs .hit:hover rect.hl,.nid-cfbs .hit.on rect.hl{fill:rgba(0,122,85,.07)}'+
'.nid-cfbs .det{min-height:84px;margin:10px auto 0;max-width:640px;border-left:3px solid '+G+';background:#F4F8F5;border-radius:0 8px 8px 0;padding:10px 14px;font-size:1em;line-height:1.4}'+
'.nid-cfbs .det b{display:block;font-size:1.05em;margin-bottom:2px}.nid-cfbs .det .k{font:700 12px/1.3 '+SANS+';color:'+G+';letter-spacing:.05em;text-transform:uppercase;display:block;margin-bottom:3px}'+
'.nid-cfbs .lg{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;font:13px/1.3 '+SANS+';color:'+SUB+';margin:6px 0 4px}.nid-cfbs .lg i{display:inline-block;width:22px;height:0;border-top:3px solid '+G+';vertical-align:middle;margin-right:6px}.nid-cfbs .lg i.g{border-top:3px dashed '+GOLD+'}'+
'.nid-cfbs .trip{cursor:pointer;transition:stroke-width .15s}.nid-cfbs .trip:hover,.nid-cfbs .trip.on{stroke-width:6}'+
'@media(prefers-reduced-motion:no-preference){.nid-cfbs .draw path.trip{stroke-dashoffset:var(--l);animation:nidcfbsd 1.4s ease forwards}}@keyframes nidcfbsd{to{stroke-dashoffset:0}}';
function css(){if(document.getElementById('nid-cfbs-css'))return;var st=document.createElement('style');st.id='nid-cfbs-css';st.textContent=CSS;document.head.appendChild(st)}
function detail(el,g){
  var n=NOTE[g[1]],k=g[4]===37?'Moved to Sunday':g[4]>g[3]?'Pushed back':'Moved up';
  el.innerHTML='<span class="k">'+k+' · '+esc(fmtK(g[3]))+' → '+esc(fmtK(g[4]))+' ET</span><b>'+esc(g[1]+' at '+g[2])+'</b>'+esc(n[1])+' <span style="color:'+SUB+'">Trip: about '+n[0]+' miles.</span>';
}
function lead(root){
  css();root.classList.add('nid-cfbs');var all=false,sel=null;
  root.innerHTML='<p class="ti">How The Ground Stop Moved Saturday’s Kickoffs</p><p class="su">FBS college football games on Nov. 14, 2026, Eastern time. Hollow dot: original kickoff. Filled dot: new kickoff. Tap a game.</p>'+
   '<div class="tg" role="group" aria-label="Which games"><button type="button" aria-pressed="true" data-a="0">The 9 moved games</button><button type="button" aria-pressed="false" data-a="1">All 56 games</button></div><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function draw(){
    var w=root.clientWidth||700,narrow=w<520,t=timeline(narrow&&!all?{W:420,fs:1.05,stack:1,sunW:70}:{all:all,W:narrow?560:760,LW:all?(narrow?150:190):215,sunW:narrow?78:86});
    cv.innerHTML=t.svg;var svg=cv.querySelector('svg'),ns='http://www.w3.org/2000/svg';
    t.rows.forEach(function(g,i){if(g[4]===null)return;var gr=document.createElementNS(ns,'g');gr.setAttribute('class','hit');gr.setAttribute('tabindex','0');gr.setAttribute('role','button');gr.setAttribute('aria-label',g[1]+' at '+g[2]);
      var r=document.createElementNS(ns,'rect');r.setAttribute('class','hl');r.setAttribute('x',0);r.setAttribute('y',t.top+i*t.RH);r.setAttribute('width','100%');r.setAttribute('height',t.RH);r.setAttribute('fill','transparent');gr.appendChild(r);svg.insertBefore(gr,svg.firstChild);
      function pick(){sel=g[1];[].forEach.call(svg.querySelectorAll('.hit'),function(h){h.classList.remove('on')});gr.classList.add('on');detail(det,g)}
      gr.addEventListener('click',pick);gr.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}});
      if(sel===g[1])gr.classList.add('on')});
    var cur=GAMES.filter(function(g){return g[1]===(sel||'Ole Miss')})[0];detail(det,cur);
  }
  [].forEach.call(root.querySelectorAll('.tg button'),function(b){b.addEventListener('click',function(){all=b.getAttribute('data-a')==='1';[].forEach.call(root.querySelectorAll('.tg button'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});draw()})});
  draw();var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}});
}
function mapBlock(root){
  css();root.classList.add('nid-cfbs');
  root.innerHTML='<p class="ti">The Trips Behind The Changes</p><p class="su">Road trips for the nine moved games, plus three teams that went by road and kept their kickoff times. Tap a route.</p>'+
   '<div class="lg"><span><i></i>Game moved</span><span><i class="g"></i>Went by bus or car, kickoff unchanged</span></div><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');cv.innerHTML=mapSVG({fs:root.clientWidth<520?25:13,noHome:root.clientWidth<520});
  function show(i){var t=TRIPS[i];[].forEach.call(cv.querySelectorAll('.trip'),function(p){p.classList.toggle('on',+p.getAttribute('data-i')===i)});
    if(t[2]==='m'){var g=GAMES.filter(function(x){return x[1]===t[0]})[0];detail(det,g)}else{det.innerHTML='<span class="k">Kickoff unchanged</span><b>'+esc(t[0]+' at '+t[1])+'</b>'+esc(t[4])+' <span style="color:'+SUB+'">Trip: about '+t[3]+' miles.</span>'}}
  [].forEach.call(cv.querySelectorAll('.trip'),function(p){var i=+p.getAttribute('data-i');p.addEventListener('click',function(){show(i)});p.addEventListener('mouseenter',function(){show(i)});
    try{var l=p.getTotalLength();p.style.setProperty('--l',l);if(p.getAttribute('stroke-dasharray')===null)p.style.strokeDasharray=l}catch(e){}});
  show(2);
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){cv.classList.add('draw');io.disconnect()}},{threshold:.3});io.observe(cv)}
}
function boot(){var a=document.getElementById('nid-cfbs'),b=document.getElementById('nid-cfbs-map');if(a)lead(a);if(b)mapBlock(b)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
