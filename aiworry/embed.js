/* The News in Data: Americans are more concerned than excited about AI.
   Pew Research Center (U.S. trend 2021-2026, ages), Our World in Data roundup (Nov. 16, 2026),
   Ipsos AI Monitor 2025 and Stanford AI Index 2026 (countries). */
(function(){
var YR=[2021,2022,2023,2024,2025,2026];
var CON=[37,38,52,51,50,52],EQ=[45,46,36,38,38,37],EXC=[18,15,10,11,10,9];
var AGE=[['Ages 18–29',31,55],['30–49',34,51],['50–64',41,47],['65 and older',43,59]];
var ASK=[
 ['Pew, June 2026','More concerned than excited','More excited than concerned',52,9],
 ['Quinnipiac, March 2026','More harm than good in daily life','More good than harm',55,34],
 ['Ipsos, Oct. 2026','Extremely bad for society','Extremely good',17,2],
 ['Ipsos, Oct. 2026','Extremely bad for you personally','Extremely good',15,3]
];
/* Ipsos AI Monitor 2025 (30 countries, March 21-April 4, 2025): "Products and services using artificial intelligence have more benefits than drawbacks," % agree.
   China (86.9%) supplied by Ipsos to Stanford HAI's AI Index 2026; not in Ipsos's own report. [name, value, ISO numeric id, short label] */
var CTY=[['China',86.9,'156','China'],['Indonesia',85,'360'],['Thailand',78,'764'],['Singapore',73,'702'],['Mexico',70,'484'],['Malaysia',70,'458'],['Peru',69,'604'],['South Korea',67,'410','S. Korea'],['India',67,'356'],['Türkiye',66,'792'],['South Africa',64,'710','S. Africa'],['Chile',63,'152'],['Colombia',58,'170'],['Brazil',58,'076'],['Argentina',57,'032'],['Italy',53,'380'],['Spain',53,'724'],['Poland',50,'616'],['Germany',49,'276'],['Hungary',48,'348'],['Ireland',48,'372'],['Japan',48,'392'],['Australia',47,'036'],['Switzerland',45,'756'],['Netherlands',43,'528'],['Britain',43,'826'],['Sweden',43,'752'],['United States',42,'840','U.S.'],['Belgium',41,'056'],['France',41,'250'],['Canada',40,'124']];
var AVG=56;
var BINS=[[80,'#0B4D35','80% or more'],[70,'#1A7A57','70–79'],[60,'#4C9F7C','60–69'],[50,'#8CC4A8','50–59'],[45,'#C3E0D1','45–49'],[0,'#E6F2EB','Under 45']];
function binC(v){for(var i=0;i<BINS.length;i++)if(v>=BINS[i][0])return BINS[i][1]}
function rankOf(n){var us=CTY.filter(function(c){return c[0]!=='China'}),v=us.filter(function(c){return c[0]===n})[0];return v?1+us.filter(function(c){return c[1]>v[1]}).length:null}
var INK='#13241B',SUB='#5F7268',G='#007A55',RUST='#B5462F',PALE='#D5DFD9',SERIF='"Times New Roman",Times,serif',SANS='-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif';
function ratio(i){return (CON[i]/EXC[i]).toFixed(1)}

/* ---------- stacked bars, one per survey year ---------- */
function trend(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,L=(o.lpad||58)*fs,R=W-(o.rpad||96)*fs,T=46*fs,RH=(o.rh||52)*fs,BH=30*fs,H=T+YR.length*RH+8*fs,s='',sc=(R-L)/100;
  s+='<text x="'+L+'" y="'+(16*fs)+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+RUST+'">More concerned</text>';
  s+='<text x="'+((L+R)/2)+'" y="'+(16*fs)+'" text-anchor="middle" font-size="'+(13*fs)+'" font-weight="700" fill="'+SUB+'">Equally</text>';
  s+='<text x="'+R+'" y="'+(16*fs)+'" text-anchor="end" font-size="'+(13*fs)+'" font-weight="700" fill="'+G+'">More excited</text>';
  s+='<text x="'+(R+12*fs)+'" y="'+(T-12*fs)+'" font-size="'+(11.5*fs)+'" font-style="italic" fill="'+SUB+'">Ratio</text>';
  YR.forEach(function(y,i){var yy=T+i*RH,last=i===YR.length-1,x=L,segs=[[CON[i],RUST,'#fff'],[EQ[i],PALE,INK],[EXC[i],G,'#fff']];
    s+='<g class="row" data-i="'+i+'" style="cursor:pointer"><rect x="0" y="'+(yy-6*fs)+'" width="'+W+'" height="'+RH+'" fill="transparent"/>';
    s+='<text x="'+(L-10*fs)+'" y="'+(yy+BH/2+5*fs)+'" text-anchor="end" font-size="'+(15*fs)+'" font-weight="'+(last?700:400)+'" fill="'+INK+'">'+y+'</text>';
    segs.forEach(function(g,k){var w=g[0]*sc;s+='<rect class="sg" style="--d:'+(i*90+k*60)+'ms" x="'+x.toFixed(1)+'" y="'+yy+'" width="'+Math.max(w-1.5*fs,0).toFixed(1)+'" height="'+BH+'" fill="'+g[1]+'"'+(last?'':' opacity=".82"')+'/>';
      if(w>26*fs)s+='<text class="sl" style="--d:'+(i*90+300)+'ms" x="'+(x+w/2).toFixed(1)+'" y="'+(yy+BH/2+5*fs)+'" text-anchor="middle" font-size="'+(14*fs)+'" font-weight="700" fill="'+g[2]+'">'+g[0]+'%</text>';x+=w});
    s+='<text x="'+(R+12*fs)+'" y="'+(yy+BH/2+6*fs)+'" font-size="'+((last?19:15)*fs)+'" font-weight="700" fill="'+(last?RUST:SUB)+'">'+ratio(i)+' to 1</text></g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Pew surveys of U.S. adults, 2021 to 2026. More concerned than excited about AI rose from 37% to 52%; more excited than concerned fell from 18% to 9%. The ratio rose from 2.1 to 1 to 5.8 to 1.">'+s+'</svg>'};
}

/* ---------- ages: slope 2021 -> 2026, more concerned ---------- */
function ages(o){
  o=o||{};var W=o.W||560,fs=o.fs||1,H=o.H||340,L=(o.lpad||150)*fs,R=W-(o.rpad||150)*fs,T=40*fs,B=H-26*fs,lo=25,hi=62,Y=function(v){return B-(v-lo)/(hi-lo)*(B-T)},s='',hl=o.hl==null?0:o.hl;
  s+='<text x="'+L+'" y="'+(T-18*fs)+'" text-anchor="middle" font-size="'+(15*fs)+'" font-weight="700" fill="'+SUB+'">2021</text><text x="'+R+'" y="'+(T-18*fs)+'" text-anchor="middle" font-size="'+(15*fs)+'" font-weight="700" fill="'+SUB+'">2026</text>';
  s+='<line x1="'+L+'" x2="'+L+'" y1="'+(T-6*fs)+'" y2="'+B+'" stroke="#E5EBE7" stroke-width="'+(1.5*fs)+'"/><line x1="'+R+'" x2="'+R+'" y1="'+(T-6*fs)+'" y2="'+B+'" stroke="#E5EBE7" stroke-width="'+(1.5*fs)+'"/>';
  var lab=function(arr,k){var p=arr.map(function(a,i){return {i:i,y:Y(a[k])}}).sort(function(a,b){return a.y-b.y});for(var j=1;j<p.length;j++)if(p[j].y-p[j-1].y<19*fs)p[j].y=p[j-1].y+19*fs;var m={};p.forEach(function(q){m[q.i]=q.y});return m};
  var l0=lab(AGE,1),l1=lab(AGE,2);
  AGE.forEach(function(a,i){var on=i===hl,c=on?RUST:'#9FB1A7',sw=(on?4:2.4)*fs;
    s+='<g class="ag" data-i="'+i+'" style="cursor:pointer"><line x1="'+L+'" y1="'+Y(a[1])+'" x2="'+R+'" y2="'+Y(a[2])+'" stroke="transparent" stroke-width="'+(18*fs)+'"/>';
    s+='<line class="dr" x1="'+L+'" y1="'+Y(a[1])+'" x2="'+R+'" y2="'+Y(a[2])+'" stroke="'+c+'" stroke-width="'+sw+'" stroke-linecap="round"/>';
    s+='<circle cx="'+L+'" cy="'+Y(a[1])+'" r="'+(5*fs)+'" fill="'+c+'"/><circle cx="'+R+'" cy="'+Y(a[2])+'" r="'+(5*fs)+'" fill="'+c+'"/>';
    s+='<text x="'+(L-12*fs)+'" y="'+(l0[i]+5*fs)+'" text-anchor="end" font-size="'+(14*fs)+'" font-weight="'+(on?700:400)+'" fill="'+(on?RUST:INK)+'">'+a[0]+' '+a[1]+'%</text>';
    s+='<text x="'+(R+12*fs)+'" y="'+(l1[i]+5*fs)+'" font-size="'+(14*fs)+'" font-weight="'+(on?700:400)+'" fill="'+(on?RUST:INK)+'">'+a[2]+'% '+(o.short?'':a[0].replace('Ages ',''))+'</text></g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Share of U.S. adults more concerned than excited about AI, 2021 and 2026, by age: 18 to 29, 31% to 55%; 30 to 49, 34% to 51%; 50 to 64, 41% to 47%; 65 and older, 43% to 59%.">'+s+'</svg>'};
}

/* ---------- no matter how you ask: negative vs positive ---------- */
function asks(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,RH=(o.rh||78)*fs,T=30*fs,H=T+ASK.length*RH,mid=W/2,sc=(W/2-(o.pad||70)*fs)/60,s='';
  s+='<text x="'+(mid-10*fs)+'" y="'+(14*fs)+'" text-anchor="end" font-size="'+(13*fs)+'" font-weight="700" fill="'+RUST+'">← Negative</text><text x="'+(mid+10*fs)+'" y="'+(14*fs)+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+G+'">Positive →</text>';
  s+='<line x1="'+mid+'" x2="'+mid+'" y1="'+(T-6*fs)+'" y2="'+H+'" stroke="'+INK+'" stroke-width="'+(1.3*fs)+'"/>';
  ASK.forEach(function(a,i){var y=T+i*RH,wn=a[3]*sc,wp=a[4]*sc,by=y+28*fs,bh=20*fs;
    s+='<text x="'+mid+'" y="'+(y+15*fs)+'" text-anchor="middle" font-size="'+(13.5*fs)+'" font-weight="700" fill="'+INK+'" stroke="#fff" stroke-width="'+(4*fs)+'" paint-order="stroke">'+a[0]+'</text>';
    s+='<rect class="sg" style="--d:'+(i*120)+'ms" x="'+(mid-wn)+'" y="'+by+'" width="'+wn+'" height="'+bh+'" rx="'+(2*fs)+'" fill="'+RUST+'"/>';
    s+='<rect class="sg" style="--d:'+(i*120+80)+'ms" x="'+mid+'" y="'+by+'" width="'+wp+'" height="'+bh+'" rx="'+(2*fs)+'" fill="'+G+'"/>';
    s+='<text x="'+(mid-wn-6*fs)+'" y="'+(by+15*fs)+'" text-anchor="end" font-size="'+(15*fs)+'" font-weight="700" fill="'+RUST+'">'+a[3]+'%</text>';
    s+='<text x="'+(mid+wp+6*fs)+'" y="'+(by+15*fs)+'" font-size="'+(15*fs)+'" font-weight="700" fill="'+G+'">'+a[4]+'%</text>';
    s+='<text x="'+(mid-8*fs)+'" y="'+(by+bh+15*fs)+'" text-anchor="end" font-size="'+(11.5*fs)+'" fill="'+SUB+'">'+a[1]+'</text><text x="'+(mid+8*fs)+'" y="'+(by+bh+15*fs)+'" font-size="'+(11.5*fs)+'" fill="'+SUB+'">'+a[2]+'</text>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Negative vs. positive answers in four 2026 surveys: Pew 52% more concerned vs. 9% more excited; Quinnipiac 55% more harm vs. 34% more good; Ipsos 17% extremely bad for society vs. 2% extremely good; Ipsos 15% extremely bad for you personally vs. 3% extremely good.">'+s+'</svg>'};
}

/* Microsoft "Working with AI" (Tomlinson et al., v6, Dec. 2025) AI applicability score for 94 SOC minor groups; employment from BLS OEWS, May 2025. [group, score, workers] */
var JOBS=[["Media and Communication Workers",0.38,613530,"27"],["Sales Representatives, Services",0.35,2371490,"41"],["Information and Record Clerks",0.33,5081880,"43"],["Mathematical Science Occupations",0.32,432400,"15"],["Tour and Travel Guides",0.32,53500,"39"],["Postsecondary Teachers",0.31,1370560,"25"],["Sales Reps., Wholesale and Manufacturing",0.31,1522990,"41"],["Communications Equipment Operators",0.3,38910,"43"],["Baggage Porters, Bellhops, and Concierges",0.3,77750,"39"],["Retail Sales Workers",0.3,7679690,"41"],["Other Sales and Related Workers",0.3,513930,"41"],["Computer Occupations",0.29,4827720,"15"],["Personal Care and Service Supervisors",0.27,243320,"39"],["Entertainment Attendants and Related",0.27,657210,"39"],["Religious Workers",0.26,95120,"21"],["Social Scientists and Related",0.26,288600,"19"],["Librarians, Curators, and Archivists",0.25,234910,"25"],["Counselors, Social Workers, and Related",0.25,2573560,"21"],["Supervisors of Production Workers",0.25,673430,"51"],["Other Office and Administrative Support Workers",0.25,3126550,"43"],["Office and Administrative Support Supervisors",0.25,1436680,"43"],["Financial Clerks",0.24,2525690,"43"],["Secretaries and Administrative Assistants",0.24,3284600,"43"],["Business Operations Specialists",0.24,7485920,"13"],["Animal Care and Service Workers",0.24,285680,"39"],["Financial Specialists",0.23,3051310,"13"],["Other Teachers and Instructors",0.23,1183050,"25"],["Engineers",0.22,1800740,"17"],["Physical Scientists",0.21,264650,"19"],["Drafters and Engineering and Mapping Technicians",0.21,624930,"17"],["Life Scientists",0.2,386900,"19"],["Art and Design Workers",0.2,645970,"27"],["Food and Beverage Serving Workers",0.2,7175250,"35"],["Other Educational and Library Workers",0.19,1939010,"25"],["Material Recording and Distribution Workers",0.19,2259120,"43"],["Primary, Secondary, and Special Education Teachers",0.18,4373040,"25"],["Media and Communications Equipment Workers",0.18,224690,"27"],["Advertising, Marketing, PR, and Sales Managers",0.18,1167460,"11"],["Air Transportation Workers",0.18,320540,"53"],["Lawyers, Judges, and Related Workers",0.17,817400,"23"],["Transportation and Material Moving Supervisors",0.17,633400,"53"],["Architects, Surveyors, and Cartographers",0.17,191460,"17"],["Electrical and Electronic Equipment Mechanics",0.17,458290,"49"],["Other Healthcare Practitioners and Tech. Occupations",0.16,129610,"29"],["Sports Entertainers and Related",0.16,562100,"27"],["Other Personal Care and Service Workers",0.16,1318510,"39"],["Cooks and Food Preparation Workers",0.15,3544690,"35"],["Funeral Service Workers",0.14,63050,"39"],["Other Management Occupations",0.14,3468900,"11"],["Building, Grounds, and Maintenance Supervisors",0.14,309510,"37"],["Other Protective Service Workers",0.14,1802770,"33"],["Operations Specialties Managers",0.14,2775810,"11"],["Occupational Health and Safety Specialists",0.14,171200,"19"],["Supervisors of Sales Workers",0.14,1336190,"41"],["Law Enforcement Workers",0.13,1201970,"33"],["Life, Physical, and Social Science Technicians",0.13,361920,"19"],["Motor Vehicle Operators",0.13,4365780,"53"],["Healthcare Diagnosing or Treating Practitioners",0.13,6534980,"29"],["Installation, Maintenance, and Repair Supervisors",0.13,617500,"49"],["Rail Transportation Workers",0.12,107550,"53"],["Other Food Preparation and Serving Workers",0.12,1537520,"35"],["Food Preparation and Serving Supervisors",0.12,1423280,"35"],["Food Processing Workers",0.12,879430,"51"],["Other Transportation Workers",0.12,347240,"53"],["Woodworkers",0.12,199920,"51"],["Top Executives",0.11,3720520,"11"],["Construction and Extraction Supervisors",0.11,812210,"47"],["Assemblers and Fabricators",0.11,1801640,"51"],["Printing Workers",0.11,201290,"51"],["Health Technologists and Technicians",0.1,3159280,"29"],["Metal Workers and Plastic Workers",0.1,1545990,"51"],["Vehicle and Mobile Equipment Mechanics",0.1,1748920,"49"],["Other Maintenance Workers",0.1,3261490,"49"],["Water Transportation Workers",0.09,79400,"53"],["Other Production Occupations",0.08,2527750,"51"],["Building Cleaning and Pest Control Workers",0.08,3190260,"37"],["Firefighting and Prevention Workers",0.07,362570,"33"],["Protective Service Supervisors",0.07,409310,"33"],["Material Moving Workers",0.07,7823240,"53"],["Construction Trades Workers",0.07,4739450,"47"],["Personal Appearance Workers",0.06,556770,"39"],["Agricultural Workers",0.06,371340,"45"],["Other Construction and Related Workers",0.06,480270,"47"],["Legal Support Workers",0.06,488220,"23"],["Other Healthcare Support Occupations",0.06,1842810,"31"],["Helpers, Construction Trades",0.06,182090,"47"],["Farming, Fishing, and Forestry Supervisors",0.05,27960,"45"],["Occupational and Physical Therapy Assistants",0.05,216180,"31"],["Textile, Apparel, and Furnishings Workers",0.05,454710,"51"],["Extraction Workers",0.05,211130,"47"],["Home Health Aides and Nursing Assistants",0.04,5842680,"31"],["Grounds Maintenance Workers",0.04,1048490,"37"],["Plant and System Operators",0.04,281600,"51"],["Forest and Conservation Workers",0.03,35010,"45"]];
var MAJ={"11": "Management", "13": "Business, finance", "15": "Computer, math", "17": "Engineering", "19": "Science", "21": "Social services", "23": "Legal", "25": "Education", "27": "Arts and media", "29": "Health practitioners", "31": "Health support", "33": "Protective", "35": "Food service", "37": "Cleaning", "39": "Personal care", "41": "Sales", "43": "Office and admin", "45": "Farming and forestry", "47": "Construction", "49": "Repair", "51": "Production", "53": "Transportation"};
var JBINS=[[0.30,'#7A2818','0.30 or more'],[0.25,'#B5462F','0.25–0.29'],[0.20,'#CF7A5F','0.20–0.24'],[0.15,'#E3A890','0.15–0.19'],[0.10,'#EFCDBF','0.10–0.14'],[0,'#F7E9E3','Under 0.10']];
var MCX=null;function tw(t,fz,b){if(!MCX)MCX=document.createElement('canvas').getContext('2d');MCX.font=(b?'700 ':'')+fz+'px "Times New Roman", Times, serif';return MCX.measureText(t).width}
function jC(v){for(var i=0;i<JBINS.length;i++)if(v>=JBINS[i][0]-1e-9)return JBINS[i][1]}
function jRank(n){var srt=JOBS.slice().sort(function(a,b){return b[1]-a[1]});var v=JOBS.filter(function(j){return j[0]===n})[0];return 1+JOBS.filter(function(j){return j[1]>v[1]}).length}
function fmtM(n){return n>=1e6?(n/1e6).toFixed(1).replace(/\.0$/,'')+' million':Math.round(n/1e3).toLocaleString('en-US')+',000'}
/* treemap: tiles sized by workers, shaded by score; needs window.d3 */
function jobsTree(o){
  o=o||{};var d3=window.d3,W=o.W||760,H=o.H||560,fs=o.fs||1,s='',pad=o.pad==null?1.2:o.pad,q=(o.q||'').toLowerCase();
  var grp={};JOBS.forEach(function(j){(grp[j[3]]=grp[j[3]]||[]).push({n:j[0],v:j[1],e:j[2]})});
  var root=d3.hierarchy({children:Object.keys(grp).map(function(k){return {m:MAJ[k],children:grp[k]}})}).sum(function(d){return d.e||0}).sort(function(a,b){return b.value-a.value});
  var PT=15*fs;d3.treemap().size([W,H]).paddingOuter(1.5*fs).paddingInner(pad).paddingTop(function(nd){return nd.depth===1&&(nd.x1-nd.x0)>70*fs&&(nd.y1-nd.y0)>60*fs?PT:1.5*fs}).tile(d3.treemapSquarify.ratio(1.2)).round(false)(root);
  root.children.forEach(function(g){var w=g.x1-g.x0,h=g.y1-g.y0,wm=root.leaves().filter(function(l){return l.parent===g}),avg=d3.sum(wm,function(l){return l.data.v*l.data.e})/d3.sum(wm,function(l){return l.data.e});
    s+='<rect x="'+g.x0+'" y="'+g.y0+'" width="'+w+'" height="'+h+'" fill="#fff"/>';
    if(w>70*fs&&h>60*fs){var t=g.data.m,cpl=Math.floor((w-8*fs)/(10.5*fs*.74));if(t.length>cpl)t=t.slice(0,Math.max(4,cpl-1))+'…';s+='<text x="'+(g.x0+3*fs)+'" y="'+(g.y0+11*fs)+'" font-size="'+(10.5*fs)+'" font-weight="700" letter-spacing=".03em" fill="'+SUB+'" font-family="'+SANS+'">'+t.toUpperCase().replace(/&/g,'&amp;')+'</text>'}});
  root.leaves().forEach(function(l,i){var d=l.data,w=l.x1-l.x0,h=l.y1-l.y0,dark=d.v>=0.20,hit=q&&d.n.toLowerCase().indexOf(q)>-1,dim=q&&!hit;
    s+='<g class="jt" data-n="'+d.n.replace(/"/g,'&quot;')+'" style="cursor:pointer"><rect class="jr" style="--d:'+(i*9)+'ms" x="'+l.x0.toFixed(1)+'" y="'+l.y0.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" fill="'+jC(d.v)+'"'+(dim?' opacity=".25"':'')+(hit?' stroke="'+INK+'" stroke-width="'+(2.5*fs)+'"':'')+'/>';
    var SHORT={'Sales Representatives, Services':'Sales Reps, Services','Sales Reps., Wholesale and Manufacturing':'Sales Reps, Wholesale','Media and Communication Workers':'Media Workers'};var avail=w-10*fs,fz=Math.max(9.5,Math.min(15,Math.sqrt(w*h)/9))*fs,lines=null,words=(SHORT[d.n]||d.n).split(' ');
    while(fz>=9*fs){var lh=fz*1.08,maxL=Math.floor((h-8*fs-fz*1.3)/lh);if(maxL<1){fz-=.5*fs;continue}
      var ls=[],cur='',bad=false;words.forEach(function(wd){var t=(cur?cur+' ':'')+wd;if(tw(t,fz)<=avail)cur=t;else{if(cur)ls.push(cur);cur=wd;if(tw(wd,fz)>avail)bad=true}});if(cur)ls.push(cur);
      if(!bad&&ls.length<=maxL){lines=ls;break}
      if(!bad&&fz<=10*fs&&maxL>=1){lines=ls.slice(0,maxL);var last=lines[maxL-1];while(last&&tw(last+'…',fz)>avail)last=last.replace(/\s*\S+$/,'');lines[maxL-1]=last?last.replace(/[ ,]+$/,'')+'…':'';if(!lines[maxL-1])lines.pop();if(!lines.length)lines=null;break}
      fz-=.5*fs}
    if(lines&&h>24*fs){var lh2=fz*1.08,tc=dark?'#fff':INK;s+='<text x="'+(l.x0+5*fs)+'" y="'+(l.y0+fz+3*fs)+'" font-size="'+fz.toFixed(1)+'" fill="'+tc+'" pointer-events="none"'+(dim?' opacity=".3"':'')+'>';
      lines.forEach(function(ln,k){s+='<tspan x="'+(l.x0+5*fs)+'" dy="'+(k?lh2:0)+'">'+ln.replace(/&/g,'&amp;')+'</tspan>'});
      s+='<tspan x="'+(l.x0+5*fs)+'" dy="'+(lh2*1.12)+'" font-weight="700">'+d.v.toFixed(2)+'</tspan></text>'}
    else if(w>26*fs&&h>18*fs){s+='<text x="'+(l.x0+4*fs)+'" y="'+(l.y0+12*fs)+'" font-size="'+(9.5*fs)+'" font-weight="700" fill="'+(dark?'#fff':INK)+'" pointer-events="none"'+(dim?' opacity=".3"':'')+'>'+d.v.toFixed(2)+'</text>'}
    s+='</g>'});
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Treemap of 94 U.S. job groups sized by employment and shaded by Microsoft AI applicability score. Highest: media and communication workers 0.38, sales representatives for services 0.35, information and record clerks 0.33. Groups scoring 0.25 or more employ 34 million people, about one in five U.S. workers.">'+s+'</svg>'};
}
function jLegend(){return '<div class="lg">'+JBINS.slice().reverse().map(function(b){return '<span><i style="background:'+b[1]+'"></i>'+b[2]+'</span>'}).join('')+'</div>'}
/* ---------- countries: ranked list (all 30 + China), and the world map ---------- */
function world(o){
  o=o||{};var W=o.W||720,fs=o.fs||1,cols=o.cols||2,RH=(o.rh||25)*fs,T=(o.top||8)*fs,per=Math.ceil(CTY.length/cols),colW=W/cols,LW=(o.lw||104)*fs,s='',hide=o.hide,
    H=T+per*RH+6*fs;
  CTY.forEach(function(c,i){var col=Math.floor(i/per),row=i%per,x0=col*colW,L=x0+LW,R=x0+colW-(36*fs),sc=(R-L)/100,y=T+row*RH,us=c[0]==='United States',cn=c[0]==='China',v=c[1],bh=RH*.62,
      tc=us?RUST:cn?G:INK;
    s+='<g class="ct" data-n="'+c[0]+'" style="cursor:pointer"><rect x="'+x0+'" y="'+(y-3*fs)+'" width="'+colW+'" height="'+RH+'" fill="transparent"/>';
    s+='<text x="'+(L-8*fs)+'" y="'+(y+bh/2+4.5*fs)+'" text-anchor="end" font-size="'+(13*fs)+'" font-weight="'+(us||cn?700:400)+'" fill="'+tc+'">'+(cn?'China*':c[0])+'</text>';
    s+='<line x1="'+(L+AVG*sc)+'" x2="'+(L+AVG*sc)+'" y1="'+(y-3*fs)+'" y2="'+(y+RH-3*fs)+'" stroke="#9FB1A7" stroke-width="'+fs+'" stroke-dasharray="'+(3*fs)+' '+(2.5*fs)+'"/>';
    if(cn&&hide){s+='<rect x="'+L+'" y="'+y+'" width="'+(R-L)+'" height="'+bh+'" rx="'+(2*fs)+'" fill="none" stroke="'+G+'" stroke-width="'+fs+'" stroke-dasharray="'+(4*fs)+' '+(3*fs)+'"/><text x="'+((L+R)/2)+'" y="'+(y+bh/2+4.5*fs)+'" text-anchor="middle" font-size="'+(12*fs)+'" font-weight="700" fill="'+G+'">?</text></g>';return}
    s+='<rect class="sg" style="--d:'+(row*30)+'ms" x="'+L+'" y="'+y+'" width="'+(v*sc)+'" height="'+bh+'" rx="'+(2*fs)+'" fill="'+(us?RUST:binC(v))+'"'+(v<50&&!us?' stroke="#B9D6C6" stroke-width="'+(.8*fs)+'"':'')+'/>';
    s+='<text x="'+(L+v*sc+5*fs)+'" y="'+(y+bh/2+4.5*fs)+'" font-size="'+(13*fs)+'" font-weight="700" fill="'+tc+'">'+Math.round(v)+'%</text></g>'});
  s+='<text x="'+(W-4*fs)+'" y="'+(H+10*fs)+'" text-anchor="end" font-size="'+(11.5*fs)+'" font-style="italic" fill="'+SUB+'">Dashed line: 30-country average, '+AVG+'%</text>';
  return {W:W,H:H+16*fs,svg:'<svg viewBox="0 0 '+W+' '+(H+16*fs)+'" role="img" aria-label="Share agreeing AI products and services have more benefits than drawbacks, 2025: '+CTY.map(function(c){return c[0]+' '+Math.round(c[1])+'%'}).join(', ')+'.">'+s+'</svg>'};
}
/* map: needs window.d3 and topojson countries; o.hide hides China's value until the guess */
function mapSvg(topo,o){
  o=o||{};var d3=window.d3,W=o.W||760,fs=o.fs||1,hide=o.hide,byId={},s='';
  CTY.forEach(function(c){byId[c[2]]=c});
  var land=window.topojson.feature(topo,topo.objects.countries).features.filter(function(f){return f.id!=='010'});
  var pr=d3.geoEqualEarth().rotate([-10,0]).fitWidth(W,{type:'Sphere'}),path=d3.geoPath(pr),b=path.bounds({type:'Sphere'}),SH=Math.ceil(b[1][1]),H=Math.ceil(SH+W*(o.extra==null?.13:o.extra)),gid='aw'+Math.random().toString(36).slice(2,7);
  s+='<defs><pattern id="'+gid+'h" width="'+(5*fs)+'" height="'+(5*fs)+'" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="'+(5*fs)+'" height="'+(5*fs)+'" fill="#F2F7F4"/><line x1="0" y1="0" x2="0" y2="'+(5*fs)+'" stroke="'+G+'" stroke-width="'+(1.4*fs)+'" opacity=".55"/></pattern></defs>';
  s+='<path d="'+path({type:'Sphere'})+'" fill="#F7FAF8" stroke="#E3EAE6" stroke-width="'+fs+'"/>';
  s+='<path d="'+path(d3.geoGraticule10())+'" fill="none" stroke="#EDF2EF" stroke-width="'+(.7*fs)+'"/>';
  function fillOf(c){return !c?'#E9EDEB':(c[0]==='China'&&hide)?'url(#'+gid+'h)':binC(c[1])}
  land.forEach(function(f){var c=byId[f.id],us=c&&c[0]==='United States';
    s+='<path class="'+(c?'mc':'')+'"'+(c?' data-n="'+c[0]+'"':'')+' d="'+path(f)+'" fill="'+fillOf(c)+'" stroke="'+(us?RUST:'#fff')+'" stroke-width="'+((us?1.6:.6)*fs)+'" stroke-linejoin="round"'+(c?' style="cursor:pointer"':'')+'/>'});
  /* Singapore is too small for the base map */
  var sg=pr([103.82,1.35]);s+='<circle class="mc" data-n="Singapore" cx="'+sg[0]+'" cy="'+sg[1]+'" r="'+(3.6*fs)+'" fill="'+binC(73)+'" stroke="#fff" stroke-width="'+(1.2*fs)+'" style="cursor:pointer"/>';
  /* value labels on the world map (Europe goes in the inset) */
  var EU={'380':1,'724':1,'616':1,'276':1,'348':1,'372':1,'756':1,'528':1,'826':1,'752':1,'056':1,'250':1};
  var NUD={'840':[8,10],'124':[-30,22],'360':[12,16],'764':[-3,-6],'458':[-26,-2],'410':[16,-12],'392':[22,12],'792':[0,2],'604':[-6,0],'152':[-4,0],'032':[6,-6],'076':[8,-4],'170':[-2,-2],'484':[-6,4],'710':[0,0],'036':[0,0],'356':[-4,4],'156':[-14,4]};
  var lab='',OFF={'410':1,'392':1,'458':1,'360':1};
  land.forEach(function(f){var c=byId[f.id];if(!c||EU[f.id])return;var ct=path.centroid(f),nd=NUD[f.id]||[0,0],x=ct[0]+nd[0]*fs,y=ct[1]+nd[1]*fs,us=c[0]==='United States',cn=c[0]==='China',big=us||cn,
      txt=(cn&&hide)?'?':Math.round(c[1])+'';
    lab+='<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="'+((big?15:11.5)*fs)+'" font-weight="700" fill="'+(us?RUST:(c[1]>=60&&!OFF[f.id])?'#fff':INK)+'" stroke="'+(us?'#fff':(c[1]>=60&&!OFF[f.id])?'rgba(11,61,42,.55)':'rgba(255,255,255,.9)')+'" stroke-width="'+((us?3:2.2)*fs)+'" paint-order="stroke" pointer-events="none">'+(us?'U.S. '+txt+'%':cn?'China '+txt+(hide?'':'%'):txt)+'</text>'});
  lab+='<text x="'+(sg[0]-16*fs)+'" y="'+(sg[1]+14*fs)+'" font-size="'+(10.5*fs)+'" font-weight="700" fill="'+INK+'" stroke="#fff" stroke-width="'+(2.2*fs)+'" paint-order="stroke" pointer-events="none">73</text>';
  /* Europe inset, lower left over the southern ocean */
  var iw=(o.iw||W*.26),ih=iw*.86,ix=(o.ix!=null?o.ix:W*.415),iy=H-ih-2*fs,ep=d3.geoConicConformal().rotate([-10,0]).center([0,0]).parallels([40,60]),
      box={type:'Feature',geometry:{type:'MultiPoint',coordinates:[[-10.5,36],[30,36],[-10.5,60.5],[30,60.5],[19,69]]}};
  ep.fitExtent([[ix+6*fs,iy+22*fs],[ix+iw-6*fs,iy+ih-6*fs]],box);var epath=d3.geoPath(ep),cid=gid+'c';
  s+=lab;
  s+='<clipPath id="'+cid+'"><rect x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" rx="'+(6*fs)+'"/></clipPath>';
  s+='<rect x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" rx="'+(6*fs)+'" fill="#F7FAF8" stroke="#C9D7CF" stroke-width="'+fs+'"/>';
  s+='<g clip-path="url(#'+cid+')">';
  land.forEach(function(f){var c=byId[f.id];s+='<path class="'+(c?'mc':'')+'"'+(c?' data-n="'+c[0]+'"':'')+' d="'+epath(f)+'" fill="'+fillOf(c)+'" stroke="#fff" stroke-width="'+(.8*fs)+'" stroke-linejoin="round"'+(c?' style="cursor:pointer"':'')+'/>'});
  var ENUD={'752':[-8,22],'826':[4,8],'372':[0,2],'250':[4,0],'724':[0,0],'380':[-6,-6],'616':[0,0],'276':[0,0],'348':[2,0],'756':[0,2],'528':[-4,-3],'056':[-6,5]};
  land.forEach(function(f){var c=byId[f.id];if(!c||!EU[f.id])return;var ct=f.id==='250'?ep([2.4,46.8]):epath.centroid(f),nd=ENUD[f.id]||[0,0];
    s+='<text x="'+(ct[0]+nd[0]*fs)+'" y="'+(ct[1]+nd[1]*fs+4*fs)+'" text-anchor="middle" font-size="'+(11*fs)+'" font-weight="700" fill="'+INK+'" stroke="rgba(255,255,255,.85)" stroke-width="'+(2.2*fs)+'" paint-order="stroke" pointer-events="none">'+Math.round(c[1])+'</text>'});
  s+='</g><text x="'+(ix+9*fs)+'" y="'+(iy+16*fs)+'" font-size="'+(11.5*fs)+'" font-weight="700" fill="'+SUB+'" letter-spacing=".04em">EUROPE</text>';
  return {W:W,H:H,svg:'<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="World map of the share agreeing AI products and services have more benefits than drawbacks, 2025. Highest in Asia: China 87%, Indonesia 85%, Thailand 78%. Lowest in North America and Western Europe: U.S. 42%, Belgium 41%, France 41%, Canada 40%.">'+s+'</svg>'};
}
function legendHtml(){return '<div class="lg">'+BINS.slice().reverse().map(function(b){return '<span><i style="background:'+b[1]+'"></i>'+b[2]+'</span>'}).join('')+'<span><i style="background:#E9EDEB"></i>Not surveyed</span></div>'}
window.NIDAIW={JBINS:JBINS,jobsTree:jobsTree,jLegend:jLegend,JOBS:JOBS,trend:trend,ages:ages,asks:asks,world:world,mapSvg:mapSvg,legendHtml:legendHtml,CTY:CTY,BINS:BINS};
if(window.NIDAIW_STATIC)return;

/* ---------- page ---------- */
var CSS='.nid-aw{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2.2em auto;position:relative}.nid-aw svg{display:block;width:100%;height:auto;overflow:visible}.nid-aw text{font-family:'+SERIF+'}'+
'.nid-aw .det{min-height:56px;margin:10px auto 0;max-width:640px;border-left:3px solid '+RUST+';background:#FBF5F3;border-radius:0 8px 8px 0;padding:10px 14px;line-height:1.4}.nid-aw .det .k{font:700 12px/1.3 '+SANS+';color:'+RUST+';letter-spacing:.05em;text-transform:uppercase;display:block;margin-bottom:3px}'+
'.nid-aw .gs{max-width:560px;margin:6px auto 14px;text-align:center;font-family:'+SANS+'}.nid-aw .gs input{width:100%;accent-color:'+G+'}.nid-aw .gs .gv{font:700 34px/1.1 '+SERIF+';color:'+G+';margin:6px 0}'+
'.nid-aw .gs button{font:600 15px/1 '+SANS+';border:0;background:'+G+';color:#fff;border-radius:999px;padding:12px 20px;cursor:pointer;min-height:44px;margin:6px 4px 0}.nid-aw .gs button.sk{background:#fff;color:'+G+';border:1.5px solid '+G+'}'+
'.nid-aw .sg{transition:transform .7s cubic-bezier(.2,.8,.2,1),opacity .5s ease;transition-delay:var(--d);transform-box:fill-box;transform-origin:left center}.nid-aw.pre .sg{transform:scaleX(0);opacity:0}.nid-aw .sl{transition:opacity .4s ease;transition-delay:var(--d)}.nid-aw.pre .sl{opacity:0}'+
'@media (prefers-reduced-motion:no-preference){.nid-aw .dr{stroke-dasharray:600;stroke-dashoffset:0;transition:stroke-dashoffset 1.2s ease}.nid-aw.pre .dr{stroke-dashoffset:600}}'+
'@media (prefers-reduced-motion:reduce){.nid-aw .sg,.nid-aw .sl{transition:none}}'+
'.nid-aw .lg{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 14px;margin:4px auto 8px;font:600 12.5px/1.2 '+SANS+';color:'+SUB+'}.nid-aw .lg span{display:inline-flex;align-items:center;gap:5px}.nid-aw .lg i{width:14px;height:14px;border-radius:3px;display:inline-block;border:1px solid rgba(0,0,0,.06)}'+
'.nid-aw .mp{min-height:200px;position:relative}.nid-aw .mp .ld{text-align:center;color:'+SUB+';font-style:italic;padding:80px 0}.nid-aw .mp path.mc{transition:filter .2s}.nid-aw .hd{font:600 13px/1.3 '+SANS+';color:'+SUB+';text-align:center;margin:18px 0 6px}'+
'.nid-aw .js{display:block;width:100%;max-width:420px;margin:0 auto 8px;box-sizing:border-box;padding:11px 16px;font:16px '+SANS+';border:1.5px solid #C9D7CF;border-radius:999px;outline:none}.nid-aw .js:focus{border-color:'+G+'}'+
'.nid-aw .tm{min-height:240px}.nid-aw .tm .ld{text-align:center;color:'+SUB+';font-style:italic;padding:100px 0}.nid-aw .jr{transition:opacity .5s ease;transition-delay:var(--d)}.nid-aw.pre .jr{opacity:0}.nid-aw .jt:hover .jr{filter:brightness(.9)}'+
'.nid-aw button:focus-visible,.nid-aw input:focus-visible{outline:3px solid #7FC4A6;outline-offset:2px}';
function css(){if(document.getElementById('nid-aw-css'))return;var st=document.createElement('style');st.id='nid-aw-css';st.textContent=CSS;document.head.appendChild(st)}
function hardStyle(root){var D={ti:'font-family:"Times New Roman",Times,serif;font-size:clamp(1.3em,4.4vw,1.75em);font-weight:700;line-height:1.12;margin:0 0 .3em;text-align:center;color:#13241B;font-style:normal',su:'font-family:"Times New Roman",Times,serif;font-style:italic;font-size:clamp(.95em,3vw,1.05em);line-height:1.35;margin:0 auto .9em;text-align:center;color:#5F7268;max-width:600px',q:'font-family:"Times New Roman",Times,serif;font-size:1.15em;font-weight:700;line-height:1.3;margin:0 0 .4em;text-align:center;color:#13241B;font-style:normal'};
  ['ti','su','q'].forEach(function(c){[].forEach.call(root.querySelectorAll('p.'+c),function(p){D[c].split(';').forEach(function(d){var i=d.indexOf(':');if(i>0)p.style.setProperty(d.slice(0,i),d.slice(i+1),'important')})})});
  [].forEach.call(root.querySelectorAll('.det'),function(p){p.style.setProperty('font-family','"Times New Roman",Times,serif','important')})}
function reveal(root){root.classList.add('pre');if(!('IntersectionObserver' in window)){root.classList.remove('pre');return}var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){setTimeout(function(){root.classList.remove('pre')},60);io.disconnect()}},{threshold:.3});io.observe(root)}
function act(n){try{window.dispatchEvent(new CustomEvent('nid:act',{detail:n}))}catch(e){}}
function narrow(root){return (root.clientWidth||700)<520}
function resize(root,draw){var lw=root.clientWidth;window.addEventListener('resize',function(){if(Math.abs(root.clientWidth-lw)>40){lw=root.clientWidth;draw()}})}

function trendBlock(root){
  css();root.classList.add('nid-aw');
  root.innerHTML='<p class="ti">Concern Has Outrun Excitement Five To One</p><p class="su">U.S. adults asked whether the increased use of AI in daily life makes them feel more concerned than excited, more excited than concerned, or both equally. Tap a year.</p><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det');
  function show(i){det.innerHTML='<span class="k">'+YR[i]+(i===0?' (Nov. 1–7)':i===5?' (June 22–28)':'')+'</span>'+CON[i]+'% more concerned, '+EQ[i]+'% equally, '+EXC[i]+'% more excited: '+ratio(i)+' concerned for every one excited.'+(i===2?' The first Pew reading after ChatGPT’s public release in November 2022.':'')}
  function draw(){var n=narrow(root);cv.innerHTML=trend(n?{W:440,fs:.92,lpad:46,rpad:84,rh:50}:{}).svg;
    [].forEach.call(cv.querySelectorAll('.row'),function(g){g.addEventListener('click',function(){show(+g.getAttribute('data-i'));act('tap')})})}
  draw();show(5);reveal(root);resize(root,draw);
}
function ageBlock(root){
  css();root.classList.add('nid-aw');var hl=0;
  root.innerHTML='<p class="ti">Under-30s Went From The Least Worried Group To A Worried Majority</p><p class="su">Share of U.S. adults more concerned than excited about AI, by age. Tap a line.</p><div class="cv"></div><div class="det" aria-live="polite"></div>';
  var cv=root.querySelector('.cv'),det=root.querySelector('.det'),EX=[[25,11],[21,12],[13,8],[11,4]];
  function show(i){var a=AGE[i];det.innerHTML='<span class="k">'+a[0]+'</span>More concerned than excited: '+a[1]+'% in 2021, '+a[2]+'% in 2026. More excited than concerned: '+EX[i][0]+'% in 2021, '+EX[i][1]+'% in 2026.'}
  function draw(){var n=narrow(root);cv.innerHTML=ages(n?{W:420,H:320,lpad:128,rpad:74,short:1,hl:hl}:{W:600,H:340,hl:hl}).svg;
    [].forEach.call(cv.querySelectorAll('.ag'),function(g){g.addEventListener('click',function(){hl=+g.getAttribute('data-i');draw();show(hl);act('tap')})})}
  draw();show(0);reveal(root);resize(root,draw);
}
function askBlock(root){
  css();root.classList.add('nid-aw');
  root.innerHTML='<p class="ti">No Matter How You Ask</p><p class="su">The most negative and most positive answers in four U.S. surveys from 2026.</p><div class="cv"></div>';
  var cv=root.querySelector('.cv');function draw(){cv.innerHTML=asks(narrow(root)?{W:420,fs:.95,pad:40,rh:80}:{}).svg}
  draw();reveal(root);resize(root,draw);
}
function load(src){return new Promise(function(res,rej){var t=document.createElement('script');t.src=src;t.onload=res;t.onerror=rej;document.head.appendChild(t)})}
var TOPO=window.NIDAIW_TOPO||'https://stories.thenewsindata.com/sinking/world-110m.json',D3P=null;
function needD3(){return D3P||(D3P=(window.d3&&window.topojson?Promise.resolve():load('https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js').then(function(){return load('https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js')})))}
function worldBlock(root){
  css();root.classList.add('nid-aw');var guess=null,shown=false,topo=null,sel=null;
  root.innerHTML='<p class="ti">Where AI Looks Better Than It Does In America</p><p class="su">Share agreeing that products and services using AI have more benefits than drawbacks, in all 30 countries Ipsos surveyed in 2025, plus China.</p>'+
   '<div class="gs"><p class="q">First, guess: what share of people in China agree?</p><div class="gv">50%</div><input type="range" min="0" max="100" value="50" aria-label="Your guess for China, in percent"><div><button type="button" class="go">Show me</button><button type="button" class="sk">Skip</button></div></div>'+
   legendHtml()+'<div class="mp"><div class="ld">Loading map…</div></div><div class="det" aria-live="polite"></div><p class="hd">All 31, ranked. Tap a country on the map or the list.</p><div class="cv"></div>';
  var cv=root.querySelector('.cv'),mp=root.querySelector('.mp'),gs=root.querySelector('.gs'),inp=gs.querySelector('input'),gv=gs.querySelector('.gv'),det=root.querySelector('.det');
  inp.addEventListener('input',function(){gv.textContent=inp.value+'%'});
  function info(n){var c=CTY.filter(function(x){return x[0]===n})[0];if(!c)return;if(n==='China'&&!shown){det.innerHTML='<span class="k">China</span>Make your guess above to see China’s number.';return}
    var r=rankOf(n);det.innerHTML='<span class="k">'+n+': '+Math.round(c[1])+'%</span>'+(n==='China'?(guess!=null?'You guessed '+guess+'%, '+(Math.abs(guess-87)<=5?'within 5 points. ':(guess<87?(87-guess)+' points too low. ':(guess-87)+' points too high. ')):'')+'China’s figure (86.9%) is the highest of any country in the data, about twice the U.S. share. Ipsos supplied it to Stanford’s AI Index separately from its 30-country report.':
      'Ranks '+r+(r===1?'st':r===2?'nd':r===3?'rd':'th')+' of the 30 countries Ipsos surveyed'+(c[1]>AVG?', '+Math.round(c[1]-AVG)+' points above the average.':c[1]<AVG?', '+Math.round(AVG-c[1])+' points below the average.':', right at the average.')+(n==='United States'?' Only Belgium, France and Canada were lower.':''))}
  function hl(){[].forEach.call(root.querySelectorAll('.mc'),function(p){var on=sel&&p.getAttribute('data-n')===sel;p.style.filter=on?'brightness(.82)':''})}
  function bind(){[].forEach.call(root.querySelectorAll('.mc,.ct'),function(p){p.addEventListener('click',function(){sel=p.getAttribute('data-n');info(sel);hl();act('tap')})})}
  function draw(){var n=narrow(root);cv.innerHTML=world(n?{W:420,cols:1,fs:1,lw:100,rh:24,hide:!shown}:{W:720,cols:2,hide:!shown}).svg;
    if(topo)mp.innerHTML=mapSvg(topo,n?{W:440,fs:.82,iw:150,hide:!shown}:{W:760,iw:226,hide:!shown}).svg;bind();hl()}
  function go(g){guess=g;shown=true;gs.style.display='none';root.classList.add('pre');draw();setTimeout(function(){root.classList.remove('pre')},60);sel='China';info('China');hl();act('guess')}
  gs.querySelector('.go').addEventListener('click',function(){go(+inp.value)});gs.querySelector('.sk').addEventListener('click',function(){go(null)});
  det.innerHTML='<span class="k">United States: 42%</span>Ranks 27th of the 30 countries Ipsos surveyed, 14 points below the average. Only Belgium, France and Canada were lower.';
  draw();resize(root,draw);
  needD3().then(function(){return fetch(TOPO).then(function(r){return r.json()})}).then(function(t){topo=t;draw()}).catch(function(){mp.innerHTML=''});
}
function jobsBlock(root){
  css();root.classList.add('nid-aw');var q='',sel=null,ok=false;
  root.innerHTML='<p class="ti">Where AI Overlaps With American Work</p><p class="su">Each tile is one of 94 job groups, sized by how many Americans do that work and shaded by how much of it matches what people ask AI chatbots to do.</p>'+
   '<input class="js" type="search" placeholder="Find your job: teacher, nurse, sales…" aria-label="Find a job group">'+jLegend()+'<div class="tm"><div class="ld">Loading chart…</div></div><div class="det" aria-live="polite"></div>';
  var tm=root.querySelector('.tm'),det=root.querySelector('.det'),inp=root.querySelector('.js');
  function info(n){var j=JOBS.filter(function(x){return x[0]===n})[0];if(!j)return;var r=jRank(n);det.innerHTML='<span class="k">'+n+'</span>AI applicability score '+j[1].toFixed(2)+', ranked '+r+' of 94. About '+fmtM(j[2])+' Americans work in this group.'}
  function draw(){if(!ok)return;var n=narrow(root);tm.innerHTML=jobsTree(n?{W:440,H:640,fs:.92,q:q}:{W:760,H:560,q:q}).svg;
    [].forEach.call(tm.querySelectorAll('.jt'),function(g){g.addEventListener('click',function(){info(g.getAttribute('data-n'));act('tap')})})}
  inp.addEventListener('input',function(){q=inp.value.trim();draw();if(q){var m=JOBS.filter(function(j){return j[0].toLowerCase().indexOf(q.toLowerCase())>-1});if(m.length)info(m[0][0]);else det.innerHTML='<span class="k">No match</span>Try a broader word, like “sales,” “health” or “teacher.”'}});
  det.innerHTML='<span class="k">The darkest tiles</span>The 21 groups scoring 0.25 or more employ 34 million people, about one in five U.S. workers. Tap any tile.';
  needD3().then(function(){ok=true;root.classList.add('pre');draw();setTimeout(function(){root.classList.remove('pre')},60)}).catch(function(){tm.innerHTML=''});
  resize(root,draw);
}
function boot(){var m={'nid-aiw-jobs':jobsBlock,'nid-aiw-trend':trendBlock,'nid-aiw-age':ageBlock,'nid-aiw-ask':askBlock,'nid-aiw-world':worldBlock};Object.keys(m).forEach(function(id){var el=document.getElementById(id);if(el&&!el.__d){el.__d=1;m[id](el);hardStyle(el);try{new MutationObserver(function(){hardStyle(el)}).observe(el,{childList:true,subtree:true})}catch(e){}}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
