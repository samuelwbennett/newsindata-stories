/* The News in Data: face photos and emergency-room mortality (Heckenbach et al., Nat Commun 2026).
   Mounts: #nid-face-auc, #nid-face-dots, #nid-face-sim, #nid-face-or */
(function(){
var G='#0a8f63',INK='#13241b',MUT='#5f7268',NS='http://www.w3.org/2000/svg';
var TNR='"Times New Roman",Times,serif',SF='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif';
function hs(el,css){css.split(';').forEach(function(d){var i=d.indexOf(':');if(i<1)return;el.style.setProperty(d.slice(0,i).trim(),d.slice(i+1).trim(),'important')});return el}
function H(tag,css,txt,p){var e=document.createElement(tag);if(css)hs(e,css);if(txt!=null)e.textContent=txt;if(p)p.appendChild(e);return e}
function E(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function T(p,x,y,s,a){a=a||{};a['font-family']=TNR;var t=E('text',Object.assign({x:x,y:y},a),p);t.textContent=s;return t}
var BOX='max-width:640px;margin:2.2em auto;padding:0;font-family:'+SF+';color:'+INK;
var TI='font-family:'+TNR+';font-size:clamp(1.3em,4.4vw,1.7em);font-weight:700;line-height:1.15;margin:0 0 .3em;text-align:center;color:'+INK+';font-style:normal;letter-spacing:0;text-transform:none';
var SU='font-family:'+TNR+';font-style:italic;font-size:clamp(.95em,2.6vw,1.06em);line-height:1.35;color:'+MUT+';margin:0 auto .9em;text-align:center;max-width:580px;text-transform:none;letter-spacing:0';
var SRC='font-family:'+SF+';font-size:11.5px;line-height:1.45;color:'+MUT+';margin:.7em 0 0;text-align:left;letter-spacing:0;text-transform:none';
var PB='font-family:'+SF+';font-size:13.5px;font-weight:600;border:1px solid #c9d6cf;background:#fff;color:'+INK+';border-radius:999px;padding:7px 13px;cursor:pointer;margin:0;line-height:1.2;letter-spacing:0;text-transform:none;box-shadow:none;min-height:0;width:auto';
var PBON='background:'+G+';border-color:'+G+';color:#fff';
function head(box,ti,su){H('p',TI,ti,box);if(su)H('p',SU,su,box)}
function pills(parent,labels,cur,onPick){var row=H('div','display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:0 0 12px',null,parent),bs=[];
 labels.forEach(function(l,i){var b=H('button',PB,l,row);b.type='button';b.onclick=function(){onPick(i);set(i)};bs.push(b)});
 function set(c){bs.forEach(function(b,i){hs(b,PB);if(i==c)hs(b,PBON);b.setAttribute('aria-pressed',i==c)})}set(cur);return set}

/* 1. AUC by horizon */
function auc(m){var box=H('div',BOX,null,m);
 head(box,'How Often The Face Score Ranks The Right Patient Higher','Share of patient pairs, one who died and one who lived, in which the patient who died got the higher face score');
 var rows=[['Death within 1 day',.82],['Death within 3 days',.80],['Death within 30 days',.77],['All factors, 30 days',.816]];
 var W=640,rh=48,Hh=rows.length*rh+40,L=176,R=W-52;
 var s=E('svg',{viewBox:'0 0 '+W+' '+Hh,width:'100%',role:'img','aria-label':'The face score ranked the patient who died higher 82% of the time for one-day deaths, 80% for three-day deaths and 77% for 30-day deaths, against 50% for a coin flip.'},box);
 function x(v){return L+(v-.5)/.5*(R-L)}
 [.5,.6,.7,.8,.9,1].forEach(function(v){if(v==.6){E('line',{x1:x(v),x2:x(v),y1:6,y2:Hh-26,stroke:'#ececec'},s);return}E('line',{x1:x(v),x2:x(v),y1:6,y2:Hh-26,stroke:v==.5?'#13241b':'#ececec','stroke-width':v==.5?1.5:1},s);T(s,x(v),Hh-8,v==.5?'0.50 (coin flip)':v.toFixed(1),{'text-anchor':v==.5?'start':'middle','font-size':14,fill:v==.5?INK:MUT,'font-weight':v==.5?'bold':'normal'})});
 rows.forEach(function(r,i){var y=12+i*rh,last=i==3;
  T(s,L-10,y+20,r[0],{'text-anchor':'end','font-size':16,fill:INK,'font-style':last?'italic':'normal'});
  E('rect',{x:x(.5),y:y+5,width:x(r[1])-x(.5),height:23,rx:3,fill:last?'#9fd1b8':G},s);
  T(s,x(r[1])+6,y+22,r[1].toFixed(2),{'font-size':16,'font-weight':'bold',fill:INK})});
 H('p',SRC,'Source: Heckenbach et al., Nature Communications, Nov. 19, 2026. Test set: photos from 2021 to 2024 that the model never trained on. "All factors" adds age, blood tests and vital signs to the face score.',box)}

/* 2. dot grid */
function dots(m){var box=H('div',BOX,null,m);
 head(box,'Out Of 1,000 Patients Photographed, How Many Died','Each dot is one patient admitted through a Danish emergency department');
 var opts=[['3 days',8],['7 days',19],['30 days',69],['1 year',235]],cur=2,cols=40,rows=25,W=640,cs=W/cols,Hh=rows*cs+36,cc=[];
 var setP=pills(box,opts.map(function(o){return o[0]}),cur,function(i){cur=i;draw()});
 var s=E('svg',{viewBox:'0 0 '+W+' '+Hh,width:'100%',role:'img','aria-label':'Out of 1,000 patients, 8 died within 3 days, 19 within 7 days, 69 within 30 days and 235 within a year.'},box);
 for(var i=0;i<1000;i++)cc.push(E('circle',{cx:(i%cols)*cs+cs/2,cy:Math.floor(i/cols)*cs+cs/2,r:cs*.36,fill:'#dfe6e2'},s));
 var lab=T(s,W/2,Hh-9,'',{'font-size':19,fill:INK,'text-anchor':'middle','font-weight':'bold'});
 function draw(){var n=opts[cur][1];cc.forEach(function(c,i){c.setAttribute('fill',i<n?INK:'#dfe6e2')});lab.textContent=n+' of 1,000 patients died within '+opts[cur][0]}
 draw();
 H('p',SRC,'Source: Heckenbach et al. Mortality 0.77% at 3 days, 1.89% at 7 days, 6.93% at 30 days and 23.47% at one year, rounded to whole patients.',box)}

/* 3. odds ratios, log scale */
function ors(m){var box=H('div',BOX,null,m);
 head(box,'How Much Higher The Odds Of Death Were In The Riskiest Group','Odds of death in the highest face-score group compared with the lowest');
 var rows=[['Reassuring warning score: top vs. bottom quarter, 30 days',13.39],['Top vs. bottom fifth, 30 days',11.87],['Top vs. bottom fifth, 3 days',21.78],['High warning score and top quarter vs. lowest risk, 30 days',30]];
 var W=640,rh=60,Hh=rows.length*rh+34,L=12,R=W-74;
 var s=E('svg',{viewBox:'0 0 '+W+' '+Hh,width:'100%',role:'img','aria-label':'Odds of death were 13.4 times higher in the top face-score quarter among patients with reassuring warning scores, 11.9 to 21.8 times higher in the top fifth, and about 30 times higher when a high warning score and a top-quarter face score appeared together.'},box);
 function x(v){return L+Math.log(v)/Math.log(40)*(R-L)}
 [1,2,5,10,20,40].forEach(function(v){E('line',{x1:x(v),x2:x(v),y1:8,y2:Hh-26,stroke:v==1?'#13241b':'#ececec','stroke-width':v==1?1.5:1},s);T(s,x(v),Hh-8,v+'×',{'text-anchor':v==1?'start':'middle','font-size':14,fill:MUT})});
 rows.forEach(function(r,i){var y=8+i*rh;T(s,L+4,y+15,r[0],{'font-size':15.5,fill:INK});
  E('rect',{x:x(1),y:y+23,width:x(r[1])-x(1),height:19,rx:3,fill:i==3?INK:G},s);
  T(s,x(r[1])+6,y+38,(i==3?'about 30':r[1].toFixed(1))+'×',{'font-size':16,'font-weight':'bold',fill:INK})});
 H('p',SRC,'Source: Heckenbach et al. Fifth-to-fifth comparisons are adjusted for age. "About 30" is the authors’ rounded figure for 30-day mortality when a high early warning score and a top-quarter face score appeared together, compared with the lowest-risk patients.',box)}

/* 4. simulator */
function sim(m){
 var HZ=[['30-day deaths',.0693,.77],['3-day deaths',.0077,.80]],SC=[['Paper’s face score',null],['Coin flip',.5],['Perfect score',.999]];
 var hz=0,sc=0,seed=7,N=1000,pts=[],base=[];
 var box=H('div','max-width:640px;margin:2.4em auto;padding:18px 14px 14px;border:1px solid #d9e6df;border-radius:12px;background:#fcfefd;position:relative;font-family:'+SF+';color:'+INK,null,m);
 H('div','position:absolute;top:-1px;left:22px;right:22px;height:3px;border-radius:0 0 3px 3px;background:linear-gradient(90deg,#0a8f63,#d4af37,#7fd1c0,#0a8f63)',null,box);
 H('p','font-family:'+SF+';font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:'+G+';margin:0 0 4px;text-align:center','Try it',box);
 head(box,'Sort The Waiting Room','1,000 simulated patients, ordered from highest risk score (top left) to lowest. Dark dots are patients who die; the green zone is who you flag.');
 var LB='font-family:'+SF+';font-size:11.5px;font-weight:700;color:'+MUT+';letter-spacing:.06em;text-transform:uppercase;margin:6px 0 6px;text-align:center';
 H('p',LB,'Outcome',box);var setH=pills(box,HZ.map(function(o){return o[0]}),hz,function(i){hz=i;draw()});
 H('p',LB,'Score',box);var setS=pills(box,SC.map(function(o){return o[0]}),sc,function(i){sc=i;draw()});
 H('p',LB,'Flag the top',box);
 var sl=H('div','display:flex;align-items:center;gap:12px;font-family:'+SF+';font-size:15px;max-width:460px;margin:0 auto',null,box);
 var cut=H('input','flex:1;accent-color:'+G+';margin:0;width:auto;padding:0;border:0;background:none;min-height:0',null,sl);cut.type='range';cut.min=5;cut.max=50;cut.step=5;cut.value=25;cut.setAttribute('aria-label','Share of patients flagged');
 var cutv=H('b','min-width:48px;text-align:right;font-weight:700','25%',sl);
 var W=640,cols=40,cs=W/cols,rows=25,Hh=rows*cs;
 var svg=E('svg',{viewBox:'0 0 '+W+' '+Hh,width:'100%',role:'img','aria-label':'Simulated waiting room of 1,000 patients sorted by risk score'},H('div','margin-top:12px',null,box));
 var zone=E('path',{fill:'#eaf5f0',stroke:G,'stroke-width':2},svg),dd=[];
 for(var i=0;i<N;i++)dd.push(E('circle',{cx:(i%cols)*cs+cs/2,cy:Math.floor(i/cols)*cs+cs/2,r:cs*.36},svg));
 var lg=H('div','font-family:'+SF+';font-size:12.5px;color:'+MUT+';display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:8px 0 0',null,box);
 [[INK,'Died'],['#cfd8d3','Survived'],[G,'Flagged zone']].forEach(function(l){var s=H('span','',null,lg);H('i','display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;vertical-align:-1px;background:'+l[0],null,s);s.appendChild(document.createTextNode(l[1]))});
 var st=H('div','display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0 4px',null,box),sv=[];
 ['patients flagged','of the deaths fall in the flagged group','flagged patients per death'].forEach(function(t){var c=H('div','background:#f2f5f3;border-radius:8px;padding:9px 10px',null,st);sv.push(H('b','display:block;font-family:'+TNR+';font-size:clamp(20px,5vw,26px);line-height:1.05;font-weight:700','0',c));H('span','display:block;font-size:12px;color:'+MUT+';line-height:1.3;margin-top:3px',t,c)});
 var rd=H('p','font-family:'+TNR+';font-size:17px;line-height:1.5;margin:10px 0 0;background:#eaf5f0;border-radius:8px;padding:10px 12px;color:'+INK,'',box);
 var ft=H('div','margin-top:10px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap',null,box);
 var ag=H('button',PB,'New waiting room',ft);ag.type='button';H('span','font-size:12px;color:'+MUT,'Each room is a fresh random draw.',ft);
 var wn=H('p','font-family:'+SF+';font-size:12.5px;line-height:1.45;color:#5d4a12;background:#fff8e1;border:1px solid #f0e2b6;border-radius:8px;padding:9px 11px;margin:12px 0 0','',box);
 wn.innerHTML='<b>For illustration only.</b> These are simulated patients, built so their scores separate deaths from survivors about as well as the published model did. Nothing here analyzes a face or says anything about a real person, and it is not a medical tool.';
 function rng(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
 function gauss(){var u=rng()||1e-9,v=rng();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
 function ninv(p){var a=[-39.69683028665376,220.9460984245205,-275.9285104469687,138.357751867269,-30.66479806614716,2.506628277459239],b=[-54.47609879822406,161.5858368580409,-155.6989798598866,66.80131188771972,-13.28068155288572],c=[-.007784894002430293,-.3223964580411365,-2.400758277161838,-2.549732539343734,4.374664141464968,2.938163982698783],d=[.007784695709041462,.3224671290700398,2.445134137142996,3.754408661907416],q,r;
  if(p<.02425){q=Math.sqrt(-2*Math.log(p));return(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1)}
  if(p>1-.02425){q=Math.sqrt(-2*Math.log(1-p));return-(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1)}
  q=p-.5;r=q*q;return(((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q/(((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1)}
 function make(){base=[];for(var i=0;i<N;i++)base.push(gauss())}
 function zp(k){if(k<=0)return'';var fr=Math.floor(k/cols),rem=k%cols,y1=fr*cs;return rem?'M0 0H'+W+'V'+y1+'H'+rem*cs+'V'+(y1+cs)+'H0Z':'M0 0H'+W+'V'+y1+'H0Z'}
 function fmt(n){return n.toLocaleString('en-US')}
 function draw(){var p=HZ[hz][1],a=SC[sc][1]||HZ[hz][2],D=Math.round(N*p),sh=Math.SQRT2*ninv(a);
  pts=base.map(function(b,i){var dead=i<D;return{dead:dead,s:b+(dead?sh:0)}});pts.sort(function(x,y){return y.s-x.s});
  var k=Math.round(N*cut.value/100),caught=0;
  pts.forEach(function(q,i){dd[i].setAttribute('fill',q.dead?INK:'#cfd8d3');if(i<k&&q.dead)caught++});
  zone.setAttribute('d',zp(k));cutv.textContent=cut.value+'%';
  sv[0].textContent=fmt(k);sv[1].textContent=caught+' of '+D;sv[2].textContent=caught?(k/caught).toFixed(1):'none';
  var pct=D?Math.round(caught/D*100):0,miss=D-caught;
  rd.innerHTML='Flagging the top <b>'+cut.value+'%</b> catches <b>'+pct+'%</b> of the patients who die, while <b>'+fmt(k-caught)+'</b> flagged patients survive and <b>'+miss+'</b> '+(miss==1?'death is':'deaths are')+' missed. '+(sc==1?'With a coin flip, the flagged share of deaths simply tracks the flagged share of the room.':sc==2?'A perfect score puts every death at the top, which no real test does.':'');
  setH(hz);setS(sc)}
 cut.oninput=draw;ag.onclick=function(){seed=(Date.now()&0xffffff)+1;make();draw()};
 make();draw()}

function mount(id,fn){var m=document.getElementById(id);if(m&&!m.getAttribute('data-done')){m.setAttribute('data-done','1');try{fn(m)}catch(e){console.log('[nid-face]',e)}}}
function go(){mount('nid-face-auc',auc);mount('nid-face-dots',dots);mount('nid-face-sim',sim);mount('nid-face-or',ors)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
setTimeout(go,1200);
})();
