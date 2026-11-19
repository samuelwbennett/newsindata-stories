import * as d3 from 'd3';import * as topojson from 'topojson-client';import fs from 'fs';
const topo=JSON.parse(fs.readFileSync('/home/claude/newsindata-stories/sinking/world-110m.json'));
const fc=topojson.feature(topo,topo.objects.countries);fc.features=fc.features.filter(f=>!['Antarctica','Fr. S. Antarctic Lands'].includes(f.properties.name));
const MAP={'Bosnia and Herz.':'Bosnia and Herzegovina','Central African Rep.':'Central African Republic','Congo':'Congo, Republic','Czechia':'Czech Republic',"Côte d'Ivoire":'Ivory Coast','Dem. Rep. Congo':'Congo, Democratic Republic','Dominican Rep.':'Dominican Republic','Eq. Guinea':'Equatorial Guinea','Macedonia':'North Macedonia','N. Cyprus':'Cyprus','Palestine':'Palestinian territories','S. Sudan':'South Sudan','Solomon Is.':'Solomon Islands','Somaliland':'Somalia','Timor-Leste':'East Timor','United States of America':'United States','W. Sahara':'Western Sahara','eSwatini':'Eswatini'};
const pew=fs.readFileSync('/home/claude/newsindata-stories/religion/data/countries.txt','utf8').replace(/\n/g,'|').split('|').filter(Boolean).map(l=>l.split(';')[0]);
const idx=Object.fromEntries(pew.map((n,i)=>[n,i]));
const W=960,H=480;const proj=d3.geoEqualEarth().fitExtent([[4,4],[W-4,H-4]],fc);
const path=d3.geoPath(proj);const sp=6.2,dy=sp*Math.sqrt(3)/2;
// rasterize countries with canvas-free approach: test each grid point with geoContains on inverted point
const feats=fc.features.map(f=>({f,name:MAP[f.properties.name]||f.properties.name,b:path.bounds(f)}));
const out=[];const miss=new Set();
for(let row=0,y=4;y<H;row++,y+=dy){for(let x=4+(row%2?sp/2:0);x<W;x+=sp){const ll=proj.invert([x,y]);if(!ll)continue;for(const F of feats){if(x<F.b[0][0]||x>F.b[1][0]||y<F.b[0][1]||y>F.b[1][1])continue;if(d3.geoContains(F.f,ll)){const i=idx[F.name];if(i===undefined)miss.add(F.name);out.push([+x.toFixed(1),+y.toFixed(1),i===undefined?-1:i]);break;}}}}
const small={'Singapore':[1.35,103.8],'Bahrain':[26.0,50.55],'Malta':[35.9,14.4],'Mauritius':[-20.2,57.5],'Maldives':[3.2,73.2],'Comoros':[-11.7,43.3],'Cape Verde':[15.1,-23.6],'Sao Tome and Principe':[0.2,6.6],'Seychelles':[-4.6,55.5],'Barbados':[13.2,-59.5],'Hong Kong':[22.3,114.2],'Samoa':[-13.8,-172],'Tonga':[-21.2,-175.2],'Guam':[13.4,144.8],'Reunion':[-21.1,55.5],'Martinique':[14.6,-61],'Guadeloupe':[16.2,-61.6],'French Polynesia':[-17.6,-149.4],'Brunei':[4.5,114.7],'Qatar':[25.3,51.2],'Lebanon':[33.9,35.8],'Gambia':[13.4,-15.5],'Luxembourg':[49.8,6.1],'Trinidad and Tobago':[10.5,-61.3],'Kosovo':[42.6,20.9],'Montenegro':[42.7,19.3],'Israel':[31.4,35],'Palestinian territories':[31.9,35.2],'Kuwait':[29.3,47.6],'Jamaica':[18.1,-77.3]};
const have=new Set(out.map(d=>d[2]));
for(const n in small){const i=idx[n];if(i===undefined){console.error('nomatch',n);continue;}if(have.has(i))continue;const p=proj([small[n][1],small[n][0]]);out.push([+p[0].toFixed(1),+p[1].toFixed(1),i]);}
const counts={};out.forEach(d=>counts[d[2]]=(counts[d[2]]||0)+1);
console.error('dots',out.length,'miss',[...miss],'no-dots',pew.filter((n,i)=>!counts[i]).length);
fs.writeFileSync('/home/claude/newsindata-stories/religion/data/dots.json',JSON.stringify({w:W,h:H,d:out.flat()}));
