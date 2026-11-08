/* The News in Data: Play kit.
   - NID.crowd: anonymous guess counts (Supabase REST). Turned off until play/config.js sets NID_CROWD.
   - NID.guessGame: "guess, then see the crowd" with a reveal chart.
   - NID.card / NID.shareCard: 1080x1350 (post) and 1080x1920 (story) result cards.
   Every number shown is computed from the data passed in by the page. */
(function(){
var NID=window.NID=window.NID||{};
var G='#007A55',GD='#005C40',GL='#E6F2EC',INK='#13241B',MUTE='#5F7268',LINE='#E3E8E4',GREY='#B9C4BE',WARM='#B5462F';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif';
NID.colors={G:G,GD:GD,GL:GL,INK:INK,MUTE:MUTE,LINE:LINE,GREY:GREY,WARM:WARM};
function $(s,r){return (r||document).querySelector(s)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
NID.esc=esc;
function store(k,v){try{if(v===undefined){var x=localStorage.getItem(k);return x==null?null:JSON.parse(x)}localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
NID.store=store;

/* ---------- crowd ---------- */
var C=window.NID_CROWD||null;
function api(path,body){
  var h={'apikey':C.key,'Content-Type':'application/json'};if(path.indexOf('rpc/')!==0)h.Prefer='return=minimal';
  return fetch(C.url+'/rest/v1/'+path,{method:'POST',headers:h,body:JSON.stringify(body)})
    .then(function(r){if(!r.ok)throw new Error(r.status);return r.status===204?null:r.json()});
}
NID.crowd={
  on:!!(C&&C.url&&C.key),
  submit:function(game,value){if(!this.on)return Promise.resolve(null);return api('nid_guesses',{game:game,value:value}).catch(function(){return null})},
  stats:function(game,lo,hi,nb,mine,ans){if(!this.on)return Promise.resolve(null);return api('rpc/nid_guess_stats',{g:game,lo:lo,hi:hi,nb:nb,mine:mine,ans:ans}).catch(function(){return null})}
};

/* ---------- bar chart (SVG on the page, canvas on the card) ---------- */
function domain(bars,extra){
  var v=bars.map(function(b){return b.value}).concat(extra||[]).concat([0]);
  var lo=Math.min.apply(0,v),hi=Math.max.apply(0,v),pad=(hi-lo)*.08||1;
  return [lo<0?lo-pad:0,hi>0?hi+pad:0];
}
function barsSVG(bars,guess,fmt,gLabel){
  var W=420,lab=22,bh=26,gap=18,top=34,n=bars.length,H=top+n*(lab+bh+gap);
  var d=domain(bars,guess==null?[]:[guess]),L=d[0]<0?62:8,x=function(v){return L+(v-d[0])/(d[1]-d[0])*(W-64-L+8)};
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(bars.map(function(b){return b.label+': '+fmt(b.value)}).join('; ')+(guess==null?'':'; your guess: '+fmt(guess)))+'">';
  s+='<line x1="'+x(0)+'" x2="'+x(0)+'" y1="'+(top-6)+'" y2="'+(H-gap+4)+'" stroke="'+INK+'" stroke-width="2"/>';
  bars.forEach(function(b,i){
    var y=top+i*(lab+bh+gap),x0=Math.min(x(0),x(b.value)),w=Math.abs(x(b.value)-x(0)),neg=b.value<0;
    s+='<text x="'+(neg?x(0)-6:x(0)+6)+'" y="'+(y+18)+'" text-anchor="'+(neg?'end':'start')+'" font-size="15" fill="'+INK+'" stroke="#fff" stroke-width="4" paint-order="stroke" font-weight="'+(b.hl?700:400)+'">'+esc(b.label)+'</text>';
    s+='<rect class="p-anim" x="'+x0+'" y="'+(y+lab)+'" width="'+w+'" height="'+bh+'" fill="'+(b.hl?G:GREY)+'" rx="2"/>';
    s+='<text x="'+(neg?x0-8:x0+w+8)+'" y="'+(y+lab+18)+'" text-anchor="'+(neg?'end':'start')+'" font-size="16" font-weight="700" stroke="#fff" stroke-width="4" paint-order="stroke" fill="'+(b.hl?G:INK)+'">'+esc(fmt(b.value))+'</text>';
  });
  if(guess!=null){
    var gx=x(guess);
    s+='<line x1="'+gx+'" x2="'+gx+'" y1="'+(top-4)+'" y2="'+(H-gap+4)+'" stroke="'+WARM+'" stroke-width="2.5" stroke-dasharray="5 4"/>';
    s+='<text x="'+gx+'" y="'+(top-12)+'" text-anchor="middle" font-size="14" font-weight="700" fill="'+WARM+'">'+esc((gLabel||'Your guess')+': '+fmt(guess))+'</text>';
  }
  return s+'</svg>';
}
function barsCanvas(ctx,X,Y,W,H,bars,guess,fmt,gLabel){
  var n=bars.length,lab=40,gap=34,top=58,bh=Math.min(64,(H-top-n*(lab+gap))/n);
  var d=domain(bars,guess==null?[]:[guess]),L=d[0]<0?130:12,x=function(v){return X+L+(v-d[0])/(d[1]-d[0])*(W-150-L+12)};
  var bottom=Y+top+n*(lab+bh+gap)-gap+8;
  ctx.strokeStyle=INK;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x(0),Y+top-10);ctx.lineTo(x(0),bottom);ctx.stroke();
  bars.forEach(function(b,i){
    var y=Y+top+i*(lab+bh+gap),x0=Math.min(x(0),x(b.value)),w=Math.abs(x(b.value)-x(0)),neg=b.value<0;
    ctx.fillStyle=INK;ctx.font=(b.hl?'700 ':'400 ')+'30px '+SERIF;ctx.textAlign=neg?'right':'left';
    ctx.fillText(b.label,neg?x(0)-10:x(0)+10,y+28);
    ctx.fillStyle=b.hl?G:GREY;ctx.fillRect(x0,y+lab,w,bh);
    ctx.font='700 34px '+SERIF;ctx.textAlign=neg?'right':'left';ctx.lineWidth=8;ctx.strokeStyle='#fff';ctx.lineJoin='round';
    ctx.strokeText(fmt(b.value),neg?x0-12:x0+w+12,y+lab+bh/2+12);ctx.fillStyle=b.hl?G:INK;ctx.fillText(fmt(b.value),neg?x0-12:x0+w+12,y+lab+bh/2+12);
  });
  if(guess!=null){
    var gx=x(guess);ctx.strokeStyle=WARM;ctx.lineWidth=4;ctx.setLineDash([10,8]);
    ctx.beginPath();ctx.moveTo(gx,Y+top-6);ctx.lineTo(gx,bottom);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle=WARM;ctx.font='700 28px '+SANS;ctx.textAlign=gx>X+W*.7?'right':gx<X+W*.3?'left':'center';
    ctx.fillText((gLabel||'My guess')+': '+fmt(guess),gx,Y+top-22);
  }
}
NID.barsSVG=barsSVG;NID.barsCanvas=barsCanvas;

/* ---------- crowd histogram ---------- */
function histSVG(bins,lo,hi,mine,ans,fmt){
  var W=420,H=170,pb=30,n=bins.length,max=Math.max.apply(0,bins)||1,bw=(W-20)/n;
  var x=function(v){return 10+(v-lo)/(hi-lo)*(W-20)};
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Histogram of readers\' guesses">';
  var mb=Math.min(n-1,Math.max(0,Math.floor((mine-lo)/(hi-lo)*n)));
  bins.forEach(function(c,i){var h=(H-pb-24)*c/max;s+='<rect x="'+(10+i*bw+1)+'" y="'+(H-pb-h)+'" width="'+(bw-2)+'" height="'+h+'" fill="'+(i===mb?WARM:GREY)+'" rx="1.5"/>'});
  s+='<line x1="10" x2="'+(W-10)+'" y1="'+(H-pb)+'" y2="'+(H-pb)+'" stroke="'+INK+'" stroke-width="2"/>';
  var ax=x(ans);s+='<line x1="'+ax+'" x2="'+ax+'" y1="14" y2="'+(H-pb)+'" stroke="'+G+'" stroke-width="3"/><text x="'+ax+'" y="10" text-anchor="middle" font-size="14" font-weight="700" fill="'+G+'">Actual: '+esc(fmt(ans))+'</text>';
  s+='<text x="10" y="'+(H-10)+'" font-size="14" fill="'+MUTE+'">'+esc(fmt(lo))+'</text><text x="'+(W-10)+'" y="'+(H-10)+'" text-anchor="end" font-size="14" fill="'+MUTE+'">'+esc(fmt(hi))+'</text>';
  return s+'</svg>';
}
NID.histSVG=histSVG;

/* ---------- share cards ---------- */
var avatar=null;
function loadAvatar(){if(avatar)return avatar;avatar=new Promise(function(res){var i=new Image();i.onload=function(){res(i)};i.onerror=function(){res(null)};i.src='/social/avatar.png'});return avatar}
function wrap(ctx,text,maxW){var words=String(text).split(' '),lines=[],cur='';words.forEach(function(w){var t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t});if(cur)lines.push(cur);return lines}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
/* d: {kicker,title,stats:[[label,value,color]],chart(ctx,x,y,w,h),cta,url} */
NID.card=function(size,d){
  return loadAvatar().then(function(av){
    var W=1080,H=size==='story'?1920:1350,M=72,safeT=size==='story'?230:70,safeB=size==='story'?250:70;
    var cv=document.createElement('canvas');cv.width=W;cv.height=H;var ctx=cv.getContext('2d');
    ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
    ctx.fillStyle=G;ctx.fillRect(0,0,W,14);
    var y=safeT;
    ctx.font='700 30px '+SANS;var bw=ctx.measureText('The News in Data').width+36;
    ctx.fillStyle=G;rr(ctx,M,y,bw,54,6);ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText('The News in Data',M+18,y+37);
    y+=110;
    ctx.fillStyle=G;ctx.font='700 28px '+SANS;ctx.fillText(String(d.kicker||'').toUpperCase(),M,y);y+=24;
    ctx.fillStyle=INK;ctx.font='700 62px '+SERIF;
    wrap(ctx,d.title,W-2*M).forEach(function(l){y+=70;ctx.fillText(l,M,y)});
    y+=46;
    if(d.stats&&d.stats.length){
      var n=d.stats.length,gw=24,sw=(W-2*M-gw*(n-1))/n;
      d.stats.forEach(function(st,i){
        var sx=M+i*(sw+gw);ctx.fillStyle=i===n-1?GL:'#F3F5F4';rr(ctx,sx,y,sw,170,18);ctx.fill();
        ctx.fillStyle=MUTE;ctx.font='600 28px '+SANS;ctx.fillText(st[0],sx+28,y+50);
        ctx.fillStyle=st[2]||INK;ctx.font='700 80px '+SERIF;ctx.fillText(st[1],sx+28,y+138);
      });
      y+=170+40;
    }
    var footH=150,chH=H-safeB-footH-y-20;
    if(d.chart&&chH>160)d.chart(ctx,M,y,W-2*M,chH);
    var fy=H-safeB-footH+40;
    ctx.strokeStyle=LINE;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(M,fy-20);ctx.lineTo(W-M,fy-20);ctx.stroke();
    if(av){ctx.save();ctx.beginPath();ctx.arc(M+40,fy+48,40,0,7);ctx.clip();ctx.drawImage(av,M,fy+8,80,80);ctx.restore()}
    ctx.textAlign='left';ctx.fillStyle=INK;ctx.font='700 32px '+SANS;ctx.fillText(d.cta||'Your turn',M+104,fy+42);
    ctx.fillStyle=G;ctx.font='600 30px '+SANS;ctx.fillText(d.url||'thenewsindata.com/play',M+104,fy+84);
    return cv;
  });
};
NID.shareCanvas=function(cv,name,text,url){
  return new Promise(function(res){cv.toBlob(function(b){
    var file=new File([b],name+'.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[file]})){navigator.share({files:[file],text:text+' '+url}).then(res,res);return}
    var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name+'.png';document.body.appendChild(a);a.click();a.remove();res();
  },'image/png')});
};
/* Share box: two card sizes, copy link, preview thumbnail. getCard(size) returns Promise<canvas>. */
NID.shareBox=function(el,o){
  el.innerHTML='<div class="p-share"><h3>Share your result</h3><p>Download a card sized for an Instagram post or a story, or send the link to someone and see if they beat you.</p>'+
   '<div class="row"><button class="p-btn" data-s="post">Post (4:5)</button><button class="p-btn2" data-s="story">Story (9:16)</button><button class="p-btn2" data-c>Copy link</button></div>'+
   '<div class="p-preview"></div></div>';
  el.querySelectorAll('[data-s]').forEach(function(b){b.onclick=function(){var s=b.getAttribute('data-s');o.getCard(s).then(function(cv){NID.shareCanvas(cv,o.name+'-'+s,o.text,o.url)})}});
  el.querySelector('[data-c]').onclick=function(e){var b=e.currentTarget,t=o.text+' '+o.url;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.textContent='Copied'},function(){prompt('Copy this link',t)})};
  o.getCard('post').then(function(cv){var img=new Image();img.alt='Preview of your share card';img.src=cv.toDataURL('image/png');el.querySelector('.p-preview').appendChild(img)});
};

/* ---------- guess, then see the crowd ---------- */
NID.guessGame=function(c){
  var root=$(c.root),key='nid-guess-'+c.id,prev=store(key);
  root.innerHTML='<div class="p-card"><p class="p-q">'+c.question+'</p><p class="p-qsub">'+c.sub+'</p>'+
    '<div class="p-ask"><div class="p-big" aria-live="polite"></div>'+
    '<label class="sr" for="g-'+c.id+'">Your guess</label><input class="p-range" id="g-'+c.id+'" type="range" min="'+c.min+'" max="'+c.max+'" step="'+c.step+'" value="'+c.start+'">'+
    '<div class="p-ends"><span>'+esc(c.fmt(c.min))+'</span><span>'+esc(c.fmt(c.max))+'</span></div>'+
    '<div class="p-center"><button class="p-btn p-lock">Lock in my guess</button></div></div>'+
    '<div class="p-reveal p-hide" aria-live="polite"></div></div>';
  var rng=$('.p-range',root),big=$('.p-big',root);
  function show(){big.textContent=c.fmt(+rng.value)}rng.oninput=show;show();
  $('.p-lock',root).onclick=function(){var v=+rng.value;store(key,v);NID.crowd.submit(c.id,v);reveal(v,true)};
  if(prev!=null)reveal(prev,false);
  function reveal(v,fresh){
    $('.p-ask',root).classList.add('p-hide');
    var r=$('.p-reveal',root);r.classList.remove('p-hide');
    var off=Math.abs(v-c.answer);
    r.innerHTML='<p class="p-result">'+c.resultLine(v,off)+'</p><p class="p-note">'+c.note+'</p>'+
      '<p class="p-ctitle">'+c.chartTitle+'</p><p class="p-csub">'+c.chartSub+'</p>'+
      '<div class="p-chart">'+barsSVG(c.bars,v,c.fmtBar||c.fmt)+'</div>'+
      '<div class="p-crowd p-hide"></div><div class="p-sharebox"></div>'+
      (fresh?'':'<p class="p-note" style="margin-top:14px;font-size:13px;color:#5F7268">You guessed '+esc(c.fmt(v))+' on an earlier visit.</p>');
    var cr=$('.p-crowd',r);
    var crowdLine='';
    NID.crowd.stats(c.id,c.min,c.max,c.bins||20,v,c.answer).then(function(s){
      if(!s||!s.total)return;
      var pct=Math.round(100*s.further/Math.max(1,s.total-1));
      crowdLine=s.total>1?'Closer than '+pct+'% of readers':'';
      cr.classList.remove('p-hide');
      cr.innerHTML='<p class="p-ctitle" style="margin-top:0">How Everyone Else Guessed</p><p class="p-csub">'+s.total.toLocaleString()+' reader'+(s.total===1?'':'s')+' so far. Your bin is orange.</p>'+
        '<div class="p-chart">'+histSVG(s.bins,c.min,c.max,v,c.answer,c.fmt)+'</div>'+
        (s.total>1?'<p class="p-result" style="text-align:center">You were closer than <b>'+pct+'%</b> of readers.</p>':'<p class="p-note" style="text-align:center">You are one of the first readers here, so the crowd is just getting started.</p>');
    });
    NID.shareBox($('.p-sharebox',r),{name:c.id,url:location.origin+location.pathname,text:c.shareText(v),getCard:function(size){
      return NID.card(size,{kicker:c.card.kicker,title:c.card.title,cta:crowdLine?crowdLine+'. Your turn:':'Can you get closer?',url:'stories.thenewsindata.com/play',
        stats:[['My guess',c.fmt(v),WARM],['Actual',c.fmt(c.answer),G]],
        chart:function(ctx,x,y,w,h){barsCanvas(ctx,x,y,w,h,c.bars,v,c.fmtBar||c.fmt)}});
    }});
    if(fresh)r.scrollIntoView({behavior:'smooth',block:'start'});
  }
};
})();
