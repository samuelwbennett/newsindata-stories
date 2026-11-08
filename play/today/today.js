/* Today's Chart: find the green dot in six guesses. Each wrong guess is placed on the chart
   and tells you whether the mystery is higher or lower. Progress and streaks stay in this browser. */
(function(){
var P=window.NID_PUZZLES,C=NID.colors,esc=NID.esc,MAX=6;
var qs=new URLSearchParams(location.search),n=+qs.get('n')||P[P.length-1].n;
var p=P.filter(function(x){return x.n===n})[0]||P[P.length-1];
var key='nid-today-'+p.n,st=NID.store(key)||{g:[],done:false,won:false};
var byName={};p.items.forEach(function(it){byName[it[0].toLowerCase()]=it});
Object.keys(p.aliases||{}).forEach(function(a){byName[a.toLowerCase()]=byName[p.aliases[a].toLowerCase()]});
var ans=byName[p.answer.toLowerCase()];
function fmt(v){var s=(Math.round(v*10)/10).toFixed(p.dec);return (v<0?'−'+s.slice(1):s)+p.suffix}
var root=document.getElementById('today');

/* beeswarm layout, shared by page and card */
function swarm(W,r,cap){
  var vals=p.items.map(function(i){return i[1]}),lo=Math.min.apply(0,vals),hi=Math.max.apply(0,vals),pad=(hi-lo)*.03;
  lo-=pad;hi+=pad;var x=function(v){return r+(v-lo)/(hi-lo)*(W-2*r)};
  var pts=p.items.map(function(it){return {it:it,x:x(it[1]),y:0}}).sort(function(a,b){return a.x-b.x});
  var placed=[],d=2*r+1;
  pts.forEach(function(q){
    for(var k=0;k<200;k++){var off=(k%2?1:-1)*Math.ceil(k/2)*d*.9;var ok=placed.every(function(o){var dx=o.x-q.x,dy=o.y-off;return dx*dx+dy*dy>=d*d});if(ok){q.y=off;break}}
    placed.push(q);
  });
  var ext=Math.max.apply(0,pts.map(function(q){return Math.abs(q.y)}))+r;
  if(cap&&ext>cap){var k=(cap-r)/(ext-r);pts.forEach(function(q){q.y*=k});ext=cap}
  return {pts:pts,ext:ext,x:x,lo:lo,hi:hi,min:Math.min.apply(0,vals),max:Math.max.apply(0,vals)};
}
function chartSVG(){
  var W=420,r=4.5,s=swarm(W,r,64),top=46,mid=top+s.ext,H=mid+s.ext+52+Math.min(st.g.length,4)*15,guessed={};
  st.g.forEach(function(g){guessed[g]=1});
  var o='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(p.axis+'. The mystery is the green dot at '+fmt(ans[1])+'.')+'">';
  o+='<line x1="0" x2="'+W+'" y1="'+(H-34)+'" y2="'+(H-34)+'" stroke="'+C.INK+'" stroke-width="2"/>';
  var tk=[[s.min,'start'],[s.max,'end']];if(s.min<0&&s.max>0&&s.x(0)-s.x(s.min)>60&&s.x(s.max)-s.x(0)>60)tk.push([0,'middle']);
  tk.forEach(function(t){o+='<line x1="'+s.x(t[0])+'" x2="'+s.x(t[0])+'" y1="'+(H-34)+'" y2="'+(H-28)+'" stroke="'+C.INK+'" stroke-width="1.5"/><text x="'+s.x(t[0])+'" y="'+(H-12)+'" font-size="13" fill="'+C.MUTE+'" text-anchor="'+t[1]+'">'+esc(fmt(t[0]))+'</text>'});
  var labels='',gl=[];
  s.pts.forEach(function(q){
    var isA=q.it===ans,isG=guessed[q.it[0]];if(isA)return;
    o+='<circle cx="'+q.x+'" cy="'+(mid+q.y)+'" r="'+(isG?r+1:r)+'" fill="'+(isG?C.WARM:'#D3DBD6')+'"/>';
    if(isG)gl.push(q);
  });
  var lv=[];gl.sort(function(a,b){return a.x-b.x}).forEach(function(q){var w=q.it[0].length*7+8,lvl=0;while(lv.some(function(L){return L.l===lvl&&Math.abs(L.x-q.x)<(L.w+w)/2}))lvl++;lv.push({x:q.x,w:w,l:lvl});
    var ly=mid+s.ext+16+lvl*15;labels+='<line x1="'+q.x+'" x2="'+q.x+'" y1="'+(mid+q.y+r+1)+'" y2="'+(ly-11)+'" stroke="'+C.WARM+'" stroke-width="1"/><text x="'+q.x+'" y="'+ly+'" text-anchor="middle" font-size="13" font-weight="700" fill="'+C.WARM+'" stroke="#fff" stroke-width="4" paint-order="stroke">'+esc(q.it[0])+'</text>'});
  var a=s.pts.filter(function(q){return q.it===ans})[0];
  o+='<circle cx="'+a.x+'" cy="'+(mid+a.y)+'" r="'+(r+5)+'" fill="'+C.G+'" stroke="#fff" stroke-width="2"/>';
  o+=labels+'<text x="'+a.x+'" y="'+(mid-s.ext-14)+'" text-anchor="middle" font-size="15" font-weight="700" fill="'+C.G+'">'+esc(st.done?ans[0]:'?')+' '+esc(fmt(ans[1]))+'</text>';
  o+='<line x1="'+a.x+'" x2="'+a.x+'" y1="'+(mid-s.ext-8)+'" y2="'+(mid+a.y-r-6)+'" stroke="'+C.G+'" stroke-width="1.5"/>';
  return o+'</svg>';
}
function chartCanvas(ctx,X,Y,W,H){
  var r=11,s=swarm(W,r,Math.max(120,(H-90)/2)),sc=Math.min(1,(H-90)/(2*s.ext)),mid=Y+40+s.ext*sc;
  ctx.fillStyle=C.INK;ctx.font='600 26px -apple-system,Helvetica,Arial,sans-serif';ctx.textAlign='left';ctx.fillText(p.axis,X,Y+10);
  s.pts.forEach(function(q){var isA=q.it===ans;ctx.beginPath();ctx.arc(X+q.x,mid+q.y*sc,isA?r+8:r,0,7);ctx.fillStyle=isA?C.G:'#D3DBD6';ctx.fill()});
  var a=s.pts.filter(function(q){return q.it===ans})[0];
  ctx.fillStyle=C.G;ctx.font='700 40px "Times New Roman",serif';ctx.textAlign='center';ctx.fillText('?',X+a.x,mid+a.y*sc-28);
}

function guess(raw){
  var it=byName[String(raw).trim().toLowerCase()];
  var msg=root.querySelector('.p-msg');
  if(!it){msg.textContent='That name isn’t in this chart. Pick one from the list as you type.';return}
  if(st.g.indexOf(it[0])>-1){msg.textContent='You already tried '+it[0]+'.';return}
  msg.textContent='';st.g.push(it[0]);
  if(it===ans){st.done=true;st.won=true}else if(st.g.length>=MAX){st.done=true}
  NID.store(key,st);render(true);
}
function stats(){
  var played=0,won=0,streak=0;
  P.forEach(function(x){var s=NID.store('nid-today-'+x.n);if(s&&s.done){played++;if(s.won)won++}});
  for(var i=P.length-1;i>=0;i--){var s=NID.store('nid-today-'+P[i].n);if(!s||!s.done){if(i===P.length-1)continue;break}if(s.won)streak++;else break}
  return {played:played,pct:played?Math.round(100*won/played):0,streak:streak};
}
function emoji(){return st.g.map(function(g){var it=byName[g.toLowerCase()];return it===ans?'🟩':(ans[1]>it[1]?'🔼':'🔽')}).join('')+(st.won?'':'⬛')}
function render(fresh){
  var hint='';(p.hints||[]).forEach(function(h){var misses=st.g.length-(st.won?1:0);if(misses>=h[0])hint+='<div class="p-hint"><b>Hint:</b> '+esc(h[1])+'</div>'});
  var tries=st.g.map(function(g){var it=byName[g.toLowerCase()];if(it===ans)return '<li class="ok"><span>'+esc(g)+' · '+esc(fmt(it[1]))+'</span><span class="dir">Correct</span></li>';
    var up=ans[1]>it[1];return '<li><span>'+esc(g)+' · '+esc(fmt(it[1]))+(it[2]?' (peak '+it[2]+')':'')+'</span><span class="dir" style="color:'+C.GD+'">'+(up?'▶ ':'◀ ')+esc(up?p.higher:p.lower)+'</span></li>'}).join('');
  var dots='';for(var i=0;i<MAX;i++)dots+='<i class="'+(i<st.g.length?(st.won&&i===st.g.length-1?'win':'used'):'')+'"></i>';
  var h='<div class="p-card"><p class="p-kick">Today’s Chart #'+p.n+' · '+esc(p.topic)+'</p><p class="p-q">'+esc(p.ask)+'</p><p class="p-qsub" style="margin-bottom:6px">'+esc(p.clue)+'</p>'+
    '<p class="p-ctitle" style="font-size:16px;margin-top:14px">'+esc(p.axis)+'</p><div class="p-chart">'+chartSVG()+'</div>'+
    '<div class="p-dots" aria-label="'+st.g.length+' of '+MAX+' guesses used">'+dots+'</div>';
  if(!st.done){
    h+='<form class="p-guessrow" autocomplete="off"><label class="sr" for="tc-in">Your guess</label><input id="tc-in" class="p-in" list="tc-list" placeholder="Type a name"><button class="p-btn" type="submit">Guess</button></form><datalist id="tc-list">'+
      p.items.map(function(it){return '<option value="'+esc(it[0])+'">'}).join('')+'</datalist><p class="p-msg p-note" aria-live="polite"></p>';
  }
  h+='<ul class="p-tries">'+tries+'</ul>'+(st.done?'':hint);
  if(st.done){
    var S=stats();
    h+='<div aria-live="polite" style="margin-top:18px"><p class="p-result">'+(st.won?'Solved in <b>'+st.g.length+' of '+MAX+'</b>. It’s '+esc(ans[0])+'.':'Out of guesses. The green dot is <b>'+esc(ans[0])+'</b>.')+'</p><p class="p-note">'+esc(p.after)+'</p>'+
      '<div class="p-stats"><div><b>'+S.played+'</b><span>Played</span></div><div><b>'+S.pct+'%</b><span>Solved</span></div><div><b>'+S.streak+'</b><span>Streak</span></div></div></div><div class="p-sb"></div>'+
      '<a class="p-story" href="'+p.story[2]+'"><small>'+esc(p.story[0])+'</small><span>'+esc(p.story[1])+'</span></a>';
  }
  h+='</div>';
  var others=P.filter(function(x){return x.n!==p.n}).map(function(x){var s=NID.store('nid-today-'+x.n);return '<a class="p-btn2" href="?n='+x.n+'">#'+x.n+' '+esc(x.title)+(s&&s.done?(s.won?' ✓':' ✕'):'')+'</a>'}).join('');
  h+='<section class="p-method"><h2>More puzzles</h2><div class="p-arch">'+others+'</div><h2 style="margin-top:18px">Data</h2><p>'+esc(p.source)+'</p><p>Your guesses and streak are saved only in this browser.</p></section>';
  root.innerHTML=h;
  var f=root.querySelector('form');if(f){f.onsubmit=function(e){e.preventDefault();guess(root.querySelector('#tc-in').value)};if(fresh)root.querySelector('#tc-in').focus()}
  if(st.done){var S2=stats();NID.shareBox(root.querySelector('.p-sb'),{name:'todays-chart-'+p.n,url:location.origin+'/play/today/?n='+p.n,
    text:'Today’s Chart #'+p.n+' '+emoji()+' '+(st.won?st.g.length:'X')+'/'+MAX,
    getCard:function(size){return NID.card(size,{kicker:'Today’s Chart #'+p.n,title:p.title,cta:'Can you find it faster?',url:'stories.thenewsindata.com/play/today',
      stats:[['Solved in',st.won?st.g.length+' of '+MAX:'X of '+MAX,st.won?C.G:C.WARM],['Streak',String(S2.streak),C.G]],chart:chartCanvas})}})}
}
render(false);
})();
