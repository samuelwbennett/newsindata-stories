/* The News in Data – glowing particle flow engine.
   NIDFlow(canvas, cfg, {autoplay, onFrame}) -> {step(), seek(f), play(), pause(), frames}
   cfg: {W,H, base:{src,x,y,w,h}, ext:[lon0,lon1,lat0,lat1], dates:[...], series:{key:[...]},
         routes:[{pts:[[lon,lat]..], key, scale, spread, both, speed, color}], labels:[{t,lon,lat,dx,dy,size}],
         title, kicker, sub, legend:[..], counters:[{label,key,per}], events:[{i,text}], months:true, fpw, tail}
*/
(function(g){
  function NIDFlow(cv,cfg,opt){
    opt=opt||{};
    var W=cfg.W,H=cfg.H,ctx=cv.getContext('2d');cv.width=W;cv.height=H;
    var g4=document.createElement('canvas');g4.width=Math.ceil(cfg.W/4);g4.height=Math.ceil(cfg.H/4);var g4c=g4.getContext('2d');var g8=document.createElement('canvas');g8.width=Math.ceil(cfg.W/10);g8.height=Math.ceil(cfg.H/10);var g8c=g8.getContext('2d');
    var trail=document.createElement('canvas');trail.width=W;trail.height=H;var tc=trail.getContext('2d');
    var PAPER=cfg.theme==='paper',BG=PAPER?'#ffffff':'#0b0f16',BGR=PAPER?'255,255,255':'11,15,22',INK=PAPER?'#13241b':'#ffffff',SUBC=PAPER?'rgba(19,36,27,.68)':'rgba(220,226,232,.85)',ACC=PAPER?'#007a55':'#e8a35a',SERIF='"Liberation Serif","Times New Roman",Georgia,serif';
    var FS=cfg.fs||1,SANS='"Montserrat",Arial,sans-serif';
    var B=cfg.base,img=new Image(),ready=false;img.onload=function(){ready=true;draw();};img.crossOrigin='anonymous';img.src=B.src;
    var e=cfg.ext;function P(lon,lat){return [B.x+(lon-e[0])/(e[1]-e[0])*B.w,B.y+(e[3]-lat)/(e[3]-e[2])*B.h];}
    var seed=7;function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;}
    function gauss(){return Math.sqrt(-2*Math.log(rnd()+1e-9))*Math.cos(6.2832*rnd());}
    // Catmull-Rom resample
    function spline(pts){var p=pts.map(function(q){return P(q[0],q[1]);}),out=[];
      for(var i=0;i<p.length-1;i++){var p0=p[Math.max(0,i-1)],p1=p[i],p2=p[i+1],p3=p[Math.min(p.length-1,i+2)];
        for(var t=0;t<1;t+=0.05){var t2=t*t,t3=t2*t;out.push([0.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),
          0.5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)]);}}
      out.push(p[p.length-1]);var L=[0];for(i=1;i<out.length;i++)L.push(L[i-1]+Math.hypot(out[i][0]-out[i-1][0],out[i][1]-out[i-1][1]));return {p:out,L:L,len:L[L.length-1]};}
    var R=cfg.routes.map(function(r){var s=spline(r.pts);s.cfg=r;s.acc=0;return s;});
    function at(s,d){var L=s.L,lo=0,hi=L.length-1;while(hi-lo>1){var m=(lo+hi)>>1;if(L[m]<d)lo=m;else hi=m;}
      var f=(d-L[lo])/((L[hi]-L[lo])||1),a=s.p[lo],b=s.p[hi];var x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f,dx=b[0]-a[0],dy=b[1]-a[1],n=Math.hypot(dx,dy)||1;return [x,y,-dy/n,dx/n];}
    var ghost=null;if(cfg.ghost){ghost=document.createElement('canvas');ghost.width=W;ghost.height=H;var gc=ghost.getContext('2d');var gw=cfg.ghost.weeks||8;
      R.forEach(function(s){var c=s.cfg;var ser=cfg.series[c.key],m=0;for(var k=0;k<gw;k++)m+=ser[k];m/=gw;s.base=m;s.vs=1;});
      if(cfg.ghost.vol){var mb=Math.max.apply(null,R.map(function(s){return s.base*(s.cfg.scale||0.02);}));R.forEach(function(s){s.vs=Math.max(cfg.ghost.minw||0.3,Math.sqrt(s.base*(s.cfg.scale||0.02)/mb));});}
      R.forEach(function(s){var c=s.cfg;if(c.ghost===false)return;var hw=(c.spread||5)*s.vs*(cfg.ghost.k||2.2);
        gc.beginPath();for(var i=0;i<s.p.length;i++){if(i)gc.lineTo(s.p[i][0],s.p[i][1]);else gc.moveTo(s.p[i][0],s.p[i][1]);}gc.lineJoin='round';gc.lineCap='round';gc.strokeStyle=cfg.ghost.color||ACC;gc.lineWidth=hw*2;gc.stroke();});}
    var fpw=cfg.fpw||5,NW=cfg.dates.length,frames=NW*fpw+(cfg.hold||45),f=0,parts=[],playing=false,timer=null;
    function val(key,fi){var w=Math.min(NW-1,fi/fpw),a=Math.floor(w),b=Math.min(NW-1,a+1),t=w-a;var s=cfg.series[key];return s[a]*(1-t)+s[b]*t;}
    function spawn(){R.forEach(function(s){var c=s.cfg,rate=val(c.key,f)*(c.scale||0.02);s.acc+=rate;while(s.acc>=1){s.acc-=1;
      var dir=c.both?(rnd()<0.5?1:-1):1,sp=(c.speed||3)*(0.75+rnd()*0.5);
      parts.push({s:s,d:dir>0?0:s.len,v:sp*dir,o:gauss()*(c.spread||5)*(s.vs||1)*(cfg.ghost&&cfg.ghost.shrink&&s.base?Math.min(1.15,Math.sqrt(val(c.key,f)/s.base)):1),od:gauss()*0.02,a:(cfg.alpha||0.1)*(0.6+rnd()*0.8),px:null,py:null});}});}
    function stepParts(){tc.globalCompositeOperation='destination-out';tc.fillStyle='rgba(0,0,0,'+(cfg.tail||0.10)+')';tc.fillRect(0,0,W,H);
      tc.globalCompositeOperation=PAPER?'source-over':'lighter';tc.lineCap='round';
      var keep=[];for(var i=0;i<parts.length;i++){var q=parts[i];q.d+=q.v;q.o+=q.od;if(q.d<0||q.d>q.s.len)continue;
        var r=at(q.s,q.d),x=r[0]+r[2]*q.o,y=r[1]+r[3]*q.o;
        if(q.px!==null){var fe=Math.min(1,q.d/60,(q.s.len-q.d)/60);tc.strokeStyle=(q.s.cfg.color||(PAPER?(cfg.ink||'rgba(46,110,84,'):'rgba(255,236,214,'))+(q.a*fe).toFixed(3)+')';tc.lineWidth=q.s.cfg.width||1.3;tc.beginPath();tc.moveTo(q.px,q.py);tc.lineTo(x,y);tc.stroke();}
        q.px=x;q.py=y;keep.push(q);}parts=keep;}
    var MON='JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ');
    function txt(t,x,y,size,col,weight,align,ls,fam){ctx.font=(weight||'400')+' '+size+'px '+(fam||(PAPER?SERIF:'"Montserrat","Helvetica Neue",Arial,sans-serif'));ctx.fillStyle=col;ctx.textAlign=align||'left';
      if(ls){ctx.letterSpacing=ls+'px';}ctx.fillText(t,x,y);if(ls)ctx.letterSpacing='0px';}
    function draw(){if(!ready)return;ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);ctx.drawImage(img,B.x,B.y,B.w,B.h);if(ghost){ctx.globalAlpha=cfg.ghost.alpha||0.13;ctx.drawImage(ghost,0,0);ctx.globalAlpha=1;}if(PAPER&&cfg.glow!==false){g8c.clearRect(0,0,g8.width,g8.height);g8c.drawImage(trail,0,0,g8.width,g8.height);g4c.clearRect(0,0,g4.width,g4.height);g4c.drawImage(trail,0,0,g4.width,g4.height);
        ctx.save();ctx.imageSmoothingQuality='high';ctx.globalAlpha=(cfg.glowA||0.9);ctx.drawImage(g8,0,0,W,H);ctx.drawImage(g4,0,0,W,H);ctx.restore();}
      ctx.drawImage(trail,0,0);
      // labels
      (cfg.labels||[]).forEach(function(l){var p=P(l.lon,l.lat),x=p[0]+(l.dx||0),y=p[1]+(l.dy||0),sz=(l.size||22)*FS;
        if(PAPER){var it=l.it,w=it?'italic 500':'700';ctx.font=w+' '+sz+'px '+(it?SERIF:SANS);ctx.textAlign=l.align||'left';ctx.lineJoin='round';ctx.miterLimit=2;ctx.lineWidth=Math.max(3,sz*0.28);ctx.strokeStyle='rgba(255,255,255,.96)';ctx.strokeText(l.t,x,y);ctx.fillStyle=l.pcol||'#13241b';ctx.fillText(l.t,x,y);}
        else{ctx.save();ctx.shadowColor='rgba(0,0,0,.9)';ctx.shadowBlur=6;txt(l.t,x,y,sz,l.col||'rgba(235,238,242,.92)','600',l.align||'left');ctx.restore();}});
      // top gradient + title
      var gr=ctx.createLinearGradient(0,0,0,B.y+60);gr.addColorStop(0,'rgba('+BGR+',1)');gr.addColorStop(1,'rgba('+BGR+',0)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,B.y+60);
      var u=cfg.ui||{};
      txt(cfg.kicker||'',u.x||56,u.ky||82,PAPER?22:26,ACC,'700','left',3,PAPER?'"Montserrat",Arial,sans-serif':null);
      txt(cfg.title,u.x||56,u.ty||140,u.ts||58,INK,PAPER?'700':'800','left',PAPER?0:1);
      (cfg.sub||[]).forEach(function(s,i){txt(s,u.x||56,(u.sy||184)+i*34*FS,(PAPER?25:26)*FS,SUBC,PAPER?'italic 400':'400');});
      // bottom panel
      var by=u.by||H-250,fi=Math.min(f,NW*fpw-1),w=Math.floor(fi/fpw),d=new Date(cfg.dates[w]+'T00:00:00Z');
      var gr2=ctx.createLinearGradient(0,by-80,0,H);gr2.addColorStop(0,'rgba('+BGR+',0)');gr2.addColorStop(0.35,'rgba('+BGR+',.94)');ctx.fillStyle=gr2;ctx.fillRect(0,by-80,W,H-by+80);
      var DOW='SUN MON TUE WED THU FRI SAT'.split(' ');txt(cfg.daily?(DOW[d.getUTCDay()]+', '+MON[d.getUTCMonth()]+' '+d.getUTCDate()):(MON[d.getUTCMonth()]+' '+d.getUTCFullYear()),u.x||56,by+20,u.ds||70,INK,PAPER?'700':'800');
      // scrubber
      var sx=u.sx||u.x||56,sw=u.sw||W-2*sx,sy=u.scrY||by+58,prog=fi/(NW*fpw-1);if(cfg.spark){var sp=cfg.spark,ser=cfg.series[sp.key],sh=sp.h||70,mx=Math.max.apply(null,ser)*1.08,top=sy-sh;
        function SX(k){return sx+sw*k/(NW-1);}function SY(v){return sy-v/mx*sh;}
        ctx.beginPath();ctx.moveTo(SX(0),sy);for(var k=0;k<NW;k++)ctx.lineTo(SX(k),SY(ser[k]));ctx.lineTo(SX(NW-1),sy);ctx.closePath();ctx.fillStyle=PAPER?'rgba(19,36,27,.05)':'rgba(255,255,255,.06)';ctx.fill();
        ctx.beginPath();for(k=0;k<NW;k++){if(k)ctx.lineTo(SX(k),SY(ser[k]));else ctx.moveTo(SX(k),SY(ser[k]));}ctx.strokeStyle=PAPER?'rgba(19,36,27,.25)':'rgba(255,255,255,.25)';ctx.lineWidth=1.5;ctx.stroke();
        var wk=fi/fpw;ctx.save();ctx.beginPath();ctx.rect(sx-2,top-20,(SX(0)+sw*wk/(NW-1))-sx+2,sh+24);ctx.clip();
        ctx.beginPath();ctx.moveTo(SX(0),sy);for(k=0;k<NW;k++)ctx.lineTo(SX(k),SY(ser[k]));ctx.lineTo(SX(NW-1),sy);ctx.closePath();ctx.fillStyle=PAPER?'rgba(0,122,85,.14)':'rgba(232,163,90,.2)';ctx.fill();
        ctx.beginPath();for(k=0;k<NW;k++){if(k)ctx.lineTo(SX(k),SY(ser[k]));else ctx.moveTo(SX(k),SY(ser[k]));}ctx.strokeStyle=ACC;ctx.lineWidth=2.6;ctx.stroke();ctx.restore();
        ctx.fillStyle=PAPER?'rgba(19,36,27,.35)':'rgba(255,255,255,.3)';ctx.fillRect(sx,sy,sw,1);
        var cx=SX(0)+sw*wk/(NW-1),cy=SY(val(sp.key,fi));ctx.beginPath();ctx.arc(cx,cy,6.5,0,7);ctx.fillStyle=ACC;ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle=BG;ctx.stroke();
        if(sp.label)txt(sp.label,sx,top-8,15*FS,SUBC,'600','left',0,PAPER?SANS:null);}
      else{ctx.fillStyle=PAPER?'rgba(19,36,27,.18)':'rgba(255,255,255,.18)';ctx.fillRect(sx,sy,sw,3);ctx.fillStyle=ACC;ctx.fillRect(sx,sy,sw*prog,3);
      ctx.beginPath();ctx.arc(sx+sw*prog,sy+1.5,8,0,7);ctx.fillStyle=PAPER?INK:'#fff';ctx.fill();}
      var d0=new Date(cfg.dates[0]+'T00:00:00Z'),d1=new Date(cfg.dates[NW-1]+'T00:00:00Z');
      if(cfg.daily){for(var k=0;k<NW;k++){var dk=new Date(cfg.dates[k]+'T00:00:00Z'),px2=sx+sw*k/(NW-1);txt(String(dk.getUTCDate()),px2,sy+30,15,dk.getUTCDay()===4?INK:SUBC,dk.getUTCDay()===4?'700':'500','center');}}
      else{var nmo=(d1-d0)/2.63e9,msp=sw/nmo;for(var m=new Date(Date.UTC(d0.getUTCFullYear(),d0.getUTCMonth()+1,1));m<=d1;m=new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth()+1,1))){var px=sx+sw*(m-d0)/(d1-d0);if(msp<30*FS&&m.getUTCMonth()%3!==0)continue;
        txt(m.getUTCMonth()===0?String(m.getUTCFullYear()):MON[m.getUTCMonth()][0],px,sy+16+14*FS,(m.getUTCMonth()===0?16:14)*FS,m.getUTCMonth()===0?INK:SUBC,m.getUTCMonth()===0?'700':'600','center',0,PAPER?SANS:null);}}
      (cfg.events||[]).forEach(function(ev){var px=sx+sw*ev.i/(NW-1);ctx.fillStyle=PAPER?'#13241b':'#ff6b4a';ctx.fillRect(px-1,cfg.spark?sy-(cfg.spark.h||70)-6:sy-10,PAPER?2:3,cfg.spark?(cfg.spark.h||70)+16:23);});
      // counters
      (cfg.counters||[]).forEach(function(c,i){if(c.from!=null&&fi/fpw<c.from)return;var v=val(c.key,fi)/(c.per||1);var x=c.x||W-(u.x||56);var vs=(c.dec?v.toFixed(c.dec):String(Math.round(v)));if(c.sign&&v>0.5)vs='+'+vs;if(c.sign&&v<-0.5)vs='\u2212'+vs.replace('-','');
        txt(c.label,x,(c.y||by)-30,(c.ls||24)*(PAPER?FS*0.85:1),SUBC,PAPER?'600':'500','right',0,PAPER?SANS:null);txt(vs+(c.unit||''),x,(c.y||by)+20,c.vs||62,PAPER?(c.pcol||ACC):(c.col||'#ffd9a8'),PAPER?'700':'800','right');});
      // event text
      (cfg.events||[]).forEach(function(ev){var wi=fi/fpw;if(wi>=ev.i&&wi<ev.i+(ev.dur||14)){var a=Math.min(1,(wi-ev.i)/1.5,(ev.i+(ev.dur||14)-wi)/2);ctx.globalAlpha=a;
        ctx.fillStyle=PAPER?'rgba(0,101,63,.95)':'rgba(255,107,74,.95)';var tw=ev.w||W-2*sx;var ey=by+(u.eventY||-150);ctx.fillRect(sx,ey,tw,ev.lines.length*34+22);ev.lines.forEach(function(l,k){txt(l,sx+18,ey+32+k*34,25,PAPER?'#ffffff':'#fff',k===0?(PAPER?'700':'800'):(PAPER?'italic 400':'500'));});ctx.globalAlpha=1;}});
      // legend
      (cfg.legend||[]).forEach(function(l,i){txt(l,u.legX||sx,(u.legY||by+132)+i*30*(PAPER?FS:1),(i===0?22:19)*(PAPER?FS:1),i===0?INK:SUBC,i===0?'700':(PAPER?'500':'400'),'left',0,PAPER?SANS:null);});
      txt(cfg.brand||'thenewsindata.com',W-sx,H-28,20,SUBC,'600','right',0,PAPER?'"Montserrat",Arial,sans-serif':null);
    }
    function step(){if(f>=frames)f=0,parts=[],tc.clearRect(0,0,W,H);spawn();stepParts();draw();if(opt.onFrame)opt.onFrame(f,frames);f++;}
    function warm(n){var s=f;for(var i=0;i<n;i++){spawn();stepParts();}f=s;}
    function seek(target){parts=[];tc.clearRect(0,0,W,H);f=Math.max(0,target-120);for(;f<target;f++){spawn();stepParts();}draw();}
    function play(){if(playing)return;playing=true;(function loop(){if(!playing)return;step();timer=requestAnimationFrame(loop);})();}
    function pause(){playing=false;cancelAnimationFrame(timer);}
    warm(cfg.warm||150);
    if(opt.autoplay)play();
    return {step:step,seek:seek,play:play,pause:pause,frames:frames,get f(){return f;},get playing(){return playing;},draw:draw,ready:function(){return ready;}};
  }
  g.NIDFlow=NIDFlow;
})(window);
