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
    var trail=document.createElement('canvas');trail.width=W;trail.height=H;var tc=trail.getContext('2d');
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
    var fpw=cfg.fpw||5,NW=cfg.dates.length,frames=NW*fpw+(cfg.hold||45),f=0,parts=[],playing=false,timer=null;
    function val(key,fi){var w=Math.min(NW-1,fi/fpw),a=Math.floor(w),b=Math.min(NW-1,a+1),t=w-a;var s=cfg.series[key];return s[a]*(1-t)+s[b]*t;}
    function spawn(){R.forEach(function(s){var c=s.cfg,rate=val(c.key,f)*(c.scale||0.02);s.acc+=rate;while(s.acc>=1){s.acc-=1;
      var dir=c.both?(rnd()<0.5?1:-1):1,sp=(c.speed||3)*(0.75+rnd()*0.5);
      parts.push({s:s,d:dir>0?0:s.len,v:sp*dir,o:gauss()*(c.spread||5),od:gauss()*0.02,a:(cfg.alpha||0.1)*(0.6+rnd()*0.8),px:null,py:null});}});}
    function stepParts(){tc.globalCompositeOperation='destination-out';tc.fillStyle='rgba(0,0,0,'+(cfg.tail||0.10)+')';tc.fillRect(0,0,W,H);
      tc.globalCompositeOperation='lighter';tc.lineCap='round';
      var keep=[];for(var i=0;i<parts.length;i++){var q=parts[i];q.d+=q.v;q.o+=q.od;if(q.d<0||q.d>q.s.len)continue;
        var r=at(q.s,q.d),x=r[0]+r[2]*q.o,y=r[1]+r[3]*q.o;
        if(q.px!==null){var fe=Math.min(1,q.d/60,(q.s.len-q.d)/60);tc.strokeStyle=(q.s.cfg.color||'rgba(255,236,214,')+(q.a*fe).toFixed(3)+')';tc.lineWidth=q.s.cfg.width||1.3;tc.beginPath();tc.moveTo(q.px,q.py);tc.lineTo(x,y);tc.stroke();}
        q.px=x;q.py=y;keep.push(q);}parts=keep;}
    var MON='JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ');
    function txt(t,x,y,size,col,weight,align,ls){ctx.font=(weight||'400')+' '+size+'px "Montserrat","Helvetica Neue",Arial,sans-serif';ctx.fillStyle=col;ctx.textAlign=align||'left';
      if(ls){ctx.letterSpacing=ls+'px';}ctx.fillText(t,x,y);if(ls)ctx.letterSpacing='0px';}
    function draw(){if(!ready)return;ctx.fillStyle='#0b0f16';ctx.fillRect(0,0,W,H);ctx.drawImage(img,B.x,B.y,B.w,B.h);ctx.drawImage(trail,0,0);
      // labels
      (cfg.labels||[]).forEach(function(l){var p=P(l.lon,l.lat);ctx.save();ctx.shadowColor='rgba(0,0,0,.9)';ctx.shadowBlur=6;txt(l.t,p[0]+(l.dx||0),p[1]+(l.dy||0),l.size||22,l.col||'rgba(235,238,242,.92)','600',l.align||'left');ctx.restore();});
      // top gradient + title
      var gr=ctx.createLinearGradient(0,0,0,B.y+60);gr.addColorStop(0,'rgba(11,15,22,1)');gr.addColorStop(1,'rgba(11,15,22,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,B.y+60);
      var u=cfg.ui||{};
      txt(cfg.kicker||'',u.x||56,u.ky||82,26,'#e8a35a','700','left',3);
      txt(cfg.title,u.x||56,u.ty||140,u.ts||58,'#ffffff','800','left',1);
      (cfg.sub||[]).forEach(function(s,i){txt(s,u.x||56,(u.sy||184)+i*34,26,'rgba(220,226,232,.85)','400');});
      // bottom panel
      var by=u.by||H-250,fi=Math.min(f,NW*fpw-1),w=Math.floor(fi/fpw),d=new Date(cfg.dates[w]+'T00:00:00Z');
      var gr2=ctx.createLinearGradient(0,by-80,0,H);gr2.addColorStop(0,'rgba(11,15,22,0)');gr2.addColorStop(0.35,'rgba(11,15,22,.92)');ctx.fillStyle=gr2;ctx.fillRect(0,by-80,W,H-by+80);
      var DOW='SUN MON TUE WED THU FRI SAT'.split(' ');txt(cfg.daily?(DOW[d.getUTCDay()]+', '+MON[d.getUTCMonth()]+' '+d.getUTCDate()):(MON[d.getUTCMonth()]+' '+d.getUTCFullYear()),u.x||56,by+20,u.ds||70,'#ffffff','800');
      // scrubber
      var sx=u.sx||u.x||56,sw=u.sw||W-2*sx,sy=u.scrY||by+58,prog=fi/(NW*fpw-1);ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(sx,sy,sw,3);ctx.fillStyle='#e8a35a';ctx.fillRect(sx,sy,sw*prog,3);
      ctx.beginPath();ctx.arc(sx+sw*prog,sy+1.5,8,0,7);ctx.fillStyle='#fff';ctx.fill();
      var d0=new Date(cfg.dates[0]+'T00:00:00Z'),d1=new Date(cfg.dates[NW-1]+'T00:00:00Z');
      if(cfg.daily){for(var k=0;k<NW;k++){var dk=new Date(cfg.dates[k]+'T00:00:00Z'),px2=sx+sw*k/(NW-1);txt(String(dk.getUTCDate()),px2,sy+30,15,dk.getUTCDay()===4?'#fff':'rgba(220,226,232,.6)',dk.getUTCDay()===4?'700':'500','center');}}
      else for(var m=new Date(Date.UTC(d0.getUTCFullYear(),d0.getUTCMonth()+1,1));m<=d1;m=new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth()+1,1))){var px=sx+sw*(m-d0)/(d1-d0);
        txt(m.getUTCMonth()===0?String(m.getUTCFullYear()):MON[m.getUTCMonth()][0],px,sy+30,m.getUTCMonth()===0?17:15,m.getUTCMonth()===0?'#fff':'rgba(220,226,232,.6)',m.getUTCMonth()===0?'700':'500','center');}
      (cfg.events||[]).forEach(function(ev){var px=sx+sw*ev.i/(NW-1);ctx.fillStyle='#ff6b4a';ctx.fillRect(px-1.5,sy-10,3,23);});
      // counters
      (cfg.counters||[]).forEach(function(c,i){if(c.from!=null&&fi/fpw<c.from)return;var v=val(c.key,fi)/(c.per||1);var x=c.x||W-(u.x||56);var vs=(c.dec?v.toFixed(c.dec):String(Math.round(v)));if(c.sign&&v>0.5)vs='+'+vs;if(c.sign&&v<-0.5)vs='\u2212'+vs.replace('-','');
        txt(c.label,x,(c.y||by)-30,c.ls||24,'rgba(220,226,232,.8)','500','right');txt(vs+(c.unit||''),x,(c.y||by)+20,c.vs||62,c.col||'#ffd9a8','800','right');});
      // event text
      (cfg.events||[]).forEach(function(ev){var wi=fi/fpw;if(wi>=ev.i&&wi<ev.i+(ev.dur||14)){var a=Math.min(1,(wi-ev.i)/1.5,(ev.i+(ev.dur||14)-wi)/2);ctx.globalAlpha=a;
        ctx.fillStyle='rgba(255,107,74,.95)';var tw=ev.w||W-2*sx;var ey=by+(u.eventY||-150);ctx.fillRect(sx,ey,tw,ev.lines.length*34+22);ev.lines.forEach(function(l,k){txt(l,sx+18,ey+32+k*34,25,'#fff',k===0?'800':'500');});ctx.globalAlpha=1;}});
      // legend
      (cfg.legend||[]).forEach(function(l,i){txt(l,u.legX||sx,(u.legY||by+132)+i*30,i===0?24:21,i===0?'#fff':'rgba(220,226,232,.7)',i===0?'700':'400');});
      txt(cfg.brand||'thenewsindata.com',W-sx,H-28,20,'rgba(220,226,232,.6)','600','right');
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
