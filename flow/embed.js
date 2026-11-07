/* Mount a NIDFlow animation: <div class="nid-flow" data-cfg="URL"></div> */
(function(){
  var S=document.currentScript&&document.currentScript.src||'https://stories.thenewsindata.com/flow/embed.js';var BASE=S.replace(/embed\.js.*$/,'');
  function css(){if(document.getElementById('nid-flow-css'))return;var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap';document.head.appendChild(l);
    var s=document.createElement('style');s.id='nid-flow-css';s.textContent='.nid-flow{max-width:540px;margin:2.4em auto;font-family:Montserrat,Arial,sans-serif}.nid-flow canvas{width:100%;height:auto;display:block;border-radius:10px;background:#0b0f16}'+
    '.nid-flow .ctl{display:flex;align-items:center;gap:12px;margin-top:10px}.nid-flow button{font-family:inherit;font-weight:700;font-size:14px;border:0;border-radius:18px;padding:8px 16px;background:#14211b;color:#fff;cursor:pointer;min-width:84px}'+
    '.nid-flow input[type=range]{flex:1;accent-color:#d9622b}.nid-flow .cap{font-size:12.5px;color:#5f6b66;margin-top:6px;font-family:Georgia,serif}';document.head.appendChild(s);}
  function load(src,cb){if(window.NIDFlow)return cb();var s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s);}
  function mount(box){var cv=document.createElement('canvas');box.appendChild(cv);var ctl=document.createElement('div');ctl.className='ctl';
    var b=document.createElement('button');b.textContent='Pause';var r=document.createElement('input');r.type='range';r.min=0;r.value=0;r.setAttribute('aria-label','Scrub through time');ctl.appendChild(b);ctl.appendChild(r);box.appendChild(ctl);
    if(box.dataset.cap){var c=document.createElement('div');c.className='cap';c.textContent=box.dataset.cap;box.appendChild(c);}
    fetch(box.dataset.cfg).then(function(x){return x.json();}).then(function(cfg){
      var go=function(){var F=NIDFlow(cv,cfg,{onFrame:function(f){if(!drag)r.value=f;}});r.max=F.frames-1;var drag=false;
        var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&b.textContent==='Pause')F.play();else if(!e.isIntersecting)F.pause();});},{threshold:0.3});io.observe(cv);
        b.onclick=function(){if(F.playing){F.pause();b.textContent='Play';}else{F.play();b.textContent='Pause';}};
        r.oninput=function(){drag=true;F.pause();b.textContent='Play';F.seek(+r.value);};r.onchange=function(){drag=false;};};
      (document.fonts&&document.fonts.load?document.fonts.load('800 40px Montserrat'):Promise.resolve()).then(go,go);});}
  css();load(BASE+'engine.js?v=1',function(){[].forEach.call(document.querySelectorAll('.nid-flow:not([data-on])'),function(x){x.dataset.on=1;mount(x);});});
})();
