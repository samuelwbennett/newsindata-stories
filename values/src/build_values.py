"""Build values/index.html, values/post-body.html and data/<slug>.csv in the stories repo,
reusing the CSS and scrolly engine from renew/index.html so the look stays consistent."""
import csv, html, json, re, sys
sys.path.insert(0, "/home/claude/scripts")
from values_text import *

REPO = "/home/claude/newsindata-stories"
FOLDER = "values"
BASE = f"https://stories.thenewsindata.com/{FOLDER}/"
CANON = f"https://www.thenewsindata.com/stories/{SLUG}"
CSV_URL = f"https://stories.thenewsindata.com/data/{SLUG}.csv"
e = lambda s: html.escape(s, quote=True)

tpl = open(f"{REPO}/renew/index.html", encoding="utf-8").read()
css = tpl[tpl.index('<link rel="preconnect"'):tpl.index("</style>") + len("</style>")]
icon = re.search(r'<link rel="icon"[^>]*>', tpl).group(0)
engine = tpl[tpl.index("<script>// The News in Data scrolly engine"):]
engine = engine[:engine.index("</script>") + len("</script>")]
assert "NID.setup" not in engine

# ---- CSV ----
with open(f"{REPO}/data/{SLUG}.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["value", "gallup_definition", "needs_most_pct", "shared_by_most_pct", "gap_pts",
                "needs_most_democrats_pct", "needs_most_independents_pct", "needs_most_republicans_pct"])
    for v, n, s, d in ROWS:
        w.writerow([v, d, n, s, n - s, *PARTY[v]])
    w.writerow(["None of these", "", "", 24, "", "", "", ""])

# ---- interactive page ----
steps_html = []
for i, (h, p) in enumerate(STEPS):
    sh = f'<span class="sh">{e(h)}</span>' if h else ""
    steps_html.append(f'  <div class="step" data-step="{i}"><div>{sh}{e(p)}</div></div>')
data_js = json.dumps({"rows": [[v, n, s] for v, n, s, _ in ROWS], "party": PARTY,
                      "respect": RESPECT, "def": {v: d for v, _, _, d in ROWS}})

views_js = r"""
const HI='#007a55',INK='#13241b',MUT='#5f7268',GR='#9aa8a0',GRID='#e3eee7',REP='#b8473e',DEM='#3a6ea5',IND='#8f9a94';
const M={l:118,r:40,t:92,b:56};
function txt(g,x,y,s,o={}){const t=g.append('text').attr('x',x).attr('y',y).attr('font-size',o.size||16).attr('text-anchor',o.anchor||'start').text(s);if(o.cls)t.attr('class',o.cls);if(o.fill)t.style('fill',o.fill);if(o.weight)t.style('font-weight',o.weight);if(o.it)t.style('font-style','italic');return t;}
function title(g,lines,W){lines.forEach((l,i)=>txt(g,W/2,30+i*26,l,{cls:'lab',size:W<700?20:23,anchor:'middle'}));}
const sm=W=>W<700;
function frame(g,W,H,x,ticks){ticks.forEach(v=>{g.append('line').attr('x1',x(v)).attr('x2',x(v)).attr('y1',M.t-10).attr('y2',H-M.b).attr('stroke',GRID).attr('stroke-width',1.3);txt(g,x(v),H-M.b+22,v+'%',{cls:'lab',size:14,anchor:'middle'});});
 g.append('line').attr('x1',M.l).attr('x2',M.l).attr('y1',M.t-10).attr('y2',H-M.b).attr('stroke','#000').attr('stroke-width',2.2);
 g.append('line').attr('x1',M.l).attr('x2',W-M.r).attr('y1',H-M.b).attr('y2',H-M.b).attr('stroke','#000').attr('stroke-width',2.2);
 txt(g,(M.l+W-M.r)/2,H-M.b+44,'PERCENT OF U.S. ADULTS',{cls:'lab',size:13,anchor:'middle'});}
const R=D.rows;
function dumb(focus){return {key:'dumb',caption:'Percent of U.S. adults. Needs most = three picks; shared = any number. Hover or tap a row.',
 draw(g,W,H){title(g,sm(W)?['Values The Country Needs','vs. Values Most Share']:['The Values Americans Say The Country Needs','vs. The Values They Think Most Share'],W);
  const x=d3.scaleLinear([0,42],[M.l,W-M.r]),y=d3.scaleBand(R.map(r=>r[0]),[M.t+14,H-M.b-6]).padding(.2),c=v=>y(v)+y.bandwidth()/2;
  frame(g,W,H,x,[0,10,20,30,40]);
  const dv=(y('Respect')+y.bandwidth()+y('Kindness'))/2;g.append('line').attr('x1',M.l).attr('x2',W-M.r).attr('y1',dv).attr('y2',dv).attr('stroke',INK).attr('stroke-dasharray','4 3');
  txt(g,M.l+6,dv-6,'Needed more than shared ↑',{size:sm(W)?11:13,fill:MUT,it:1});txt(g,M.l+6,dv+15,'Shared more than needed ↓',{size:sm(W)?11:13,fill:MUT,it:1});
  txt(g,x(34),M.t+4,'Country needs it most',{cls:'hilab',size:sm(W)?12:14,anchor:'middle'});txt(g,x(13),M.t+4,'Most share it',{cls:'lab',size:sm(W)?12:14,anchor:'middle',fill:'#6b7a72'});
  const row=g.selectAll('g.row').data(R).join('g').attr('class','row').attr('data-v',d=>d[0]);
  row.append('rect').attr('x',0).attr('width',W).attr('y',d=>y(d[0])-4).attr('height',y.bandwidth()+8).attr('fill','transparent');
  row.append('text').attr('class','lab').attr('x',M.l-12).attr('y',d=>c(d[0])+5).attr('text-anchor','end').attr('font-size',sm(W)?14:16).text(d=>d[0]);
  row.append('line').attr('class','bar').attr('y1',d=>c(d[0])).attr('y2',d=>c(d[0])).attr('x1',d=>x(d[2])).attr('x2',d=>x(d[2])).attr('stroke',d=>d[1]>d[2]?HI:GR).attr('stroke-opacity',.45).attr('stroke-width',4)
   .transition().duration(900).attr('x2',d=>x(d[1]));
  row.append('circle').attr('class','sh').attr('cx',d=>x(d[2])).attr('cy',d=>c(d[0])).attr('r',sm(W)?6:7).attr('fill',GR).attr('stroke','#fff').attr('stroke-width',1.5);
  row.append('circle').attr('class','nd').attr('cx',d=>x(d[2])).attr('cy',d=>c(d[0])).attr('r',sm(W)?6:7).attr('fill',HI).attr('stroke','#fff').attr('stroke-width',1.5).transition().duration(900).attr('cx',d=>x(d[1]));
  const lo=d=>Math.min(d[1],d[2]),hi=d=>Math.max(d[1],d[2]),col=(d,v)=>v===d[1]?HI:'#6b7a72';
  row.append('text').attr('class','lab nl').attr('x',d=>x(lo(d))-10).attr('y',d=>c(d[0])+5).attr('text-anchor','end').attr('font-size',sm(W)?12:14).style('fill',d=>col(d,lo(d))).text(d=>lo(d)+'%');
  row.append('text').attr('class','lab nl').attr('x',d=>x(hi(d))+10).attr('y',d=>c(d[0])+5).attr('font-size',sm(W)?12:14).style('fill',d=>col(d,hi(d))).text(d=>hi(d)+'%');
  row.call(NID.tip,d=>`<b>${d[0]}</b><br><i>${D.def[d[0]]}</i><br>Needs it most: ${d[1]}%<br>Most share it: ${d[2]}%<br>Gap: ${d[1]-d[2]>0?'+':''}${d[1]-d[2]} pts`);},
 update(g){g.selectAll('g.row').transition('f').duration(500).style('opacity',function(){return !focus||focus.includes(this.dataset.v)?1:.22;});}};}
const party={key:'party',caption:'Percent picking each value as one of three the country needs most, by party. Hover or tap a dot.',
 draw(g,W,H){title(g,sm(W)?['Values The Country Needs,','By Party']:['Values The Country Needs Most, By Party'],W);
  const P=Object.entries(D.party).sort((a,b)=>(b[1][2]-b[1][0])-(a[1][2]-a[1][0]));
  const x=d3.scaleLinear([0,50],[M.l,W-M.r]),y=d3.scaleBand(P.map(p=>p[0]),[M.t+14,H-M.b-6]).padding(.2),c=v=>y(v)+y.bandwidth()/2;
  frame(g,W,H,x,[0,10,20,30,40,50]);
  const cols=[DEM,IND,REP],names=['Democrats','Independents','Republicans'];
  P.forEach(([v,a])=>{const gg=g.append('g');txt(gg,M.l-12,c(v)+5,v,{cls:'lab',size:sm(W)?14:16,anchor:'end'});
   gg.append('line').attr('x1',x(Math.min(...a))).attr('x2',x(Math.max(...a))).attr('y1',c(v)).attr('y2',c(v)).attr('stroke',GR).attr('stroke-width',2);
   a.forEach((p,i)=>gg.append('circle').datum([v,i,p]).attr('cx',x(p)).attr('cy',c(v)).attr('r',sm(W)?5.5:6.5).attr('fill',cols[i]).attr('stroke','#fff').attr('stroke-width',1.2).attr('fill-opacity',i===1?.9:1).call(NID.tip,d=>`<b>${d[0]}</b><br>${names[d[1]]}: ${d[2]}%`));});
  const t=P[0];[[0,'Dem.'],[1,'Ind.'],[2,'Rep.']].forEach(([i,l])=>txt(g,x(t[1][i]),c(t[0])-12,l+' '+t[1][i]+'%',{cls:'lab',size:sm(W)?12:14,anchor:'middle',fill:cols[i]}));
  txt(g,x(D.party.Honesty[1])+0,c('Honesty')-12,'32–38%',{cls:'hilab',size:sm(W)?12:14,anchor:'middle'});}};
const respect={key:'resp',caption:'Percent of each group. The rest chose people sharing the same values or did not answer.',
 draw(g,W,H){title(g,sm(W)?['Respecting Different Values','Matters More']:['Respecting Different Values Matters More','Than Sharing The Same Ones'],W);
  const lw=sm(W)?110:140,x=d3.scaleLinear([0,100],[M.l-118+lw,W-M.r-40]),bh=Math.min(64,(H-M.t-M.b-40)/4-26);
  D.respect.forEach(([n,v,o],i)=>{const yy=M.t+30+i*(bh+30),c=i===3?HI:'#7fb8a3';txt(g,x(0)-10,yy+bh/2+6,n,{cls:'lab',size:sm(W)?14:16,anchor:'end'});
   g.append('rect').attr('x',x(0)).attr('y',yy).attr('height',bh).attr('width',0).attr('fill',c).transition().duration(700).delay(i*120).attr('width',x(v)-x(0));
   txt(g,x(v)+8,yy+bh/2+7,v+'%',{cls:'lab',size:18});});
  g.append('line').attr('x1',x(0)).attr('x2',x(0)).attr('y1',M.t+20).attr('y2',M.t+30+4*(bh+30)-20).attr('stroke','#000').attr('stroke-width',2.2);}};
NID.setup([dumb(null),dumb(['Freedom','Patriotism','Service']),dumb(['Honesty','Responsibility','Integrity','Equality','Fairness']),dumb(['Honesty','Responsibility','Integrity','Service','Freedom','Patriotism']),party,respect]);
"""

page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(TITLE)} — The News in Data</title><meta name="description" content="{e(EXCERPT)}">
<link rel="canonical" href="{CANON}">
<meta property="og:title" content="{e(TITLE)}"><meta property="og:description" content="{e(EXCERPT)}"><meta property="og:image" content="{BASE}values-preview.png"><meta property="og:url" content="{BASE}"><meta name="twitter:card" content="summary_large_image">
{icon}
</head><body>

{css}
<style>g.row{{cursor:pointer}}</style>

<div class="wrap">
<div class="mast"><a href="https://www.thenewsindata.com" style="text-decoration:none"><b>The News in Data</b></a><span>CULTURE</span></div>
<header>
 <div class="kick">№ 027 · OCT. 26, 2026</div>
 <h1>Americans Say Honesty Is The Value The Country Needs Most, <em>Yet Only 13% Think Most Americans Share It</em></h1>
 <p class="dek">{e(DEK)}</p>
 <div class="by">By Samuel W. Bennett · Gallup data</div>
 <div class="big"><div class="g">34%<span>SAY THE COUNTRY<br>NEEDS HONESTY</span></div><div>13%<span>SAY MOST AMERICANS<br>SHARE IT</span></div></div>
</header>
<article style="padding-block:10px 0"><p>{e(INTRO[0])}</p></article>
<section class="scrolly">
 <div id="fig"><svg role="img" aria-label="{e(ALT)}"></svg><div id="figcap"></div><div id="tip"></div></div>
 <div class="steps">
{chr(10).join(steps_html)}
 </div>
</section>
<article>
 <h2>What the data can&#x27;t tell us</h2>
{chr(10).join(f' <p>{e(p)}</p>' for p in CANT)}
 <h2>Notes and calculations</h2>
{chr(10).join(f' <p class="method" style="border:0;margin:0 0 8px;padding:0">{e(p)}</p>' for p in NOTES)}
 <p class="method">{e(METHOD)} Source: <a href="{SOURCE_URL}">Gallup, &ldquo;In U.S., Three-Quarters Identify Shared Values,&rdquo; Oct. 25, 2026</a>. <a href="{CSV_URL}">Download the data</a>.</p>
</article>
<section class="nid-kr"></section><script src="/more/keep-reading.js" defer></script>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
{engine}
<script>
const D={data_js};
{views_js}
</script>
</body></html>
"""
open(f"{REPO}/{FOLDER}/index.html", "w", encoding="utf-8").write(page)

# ---- Squarespace post body (one Code Block) ----
body = ['<style>.nid-a h2{margin:1.6em 0 .5em}.nid-a .nid-fig{margin:1.6em auto;max-width:620px}.nid-a .nid-fig img{width:100%;height:auto;display:block;border:1px solid #e6e3dd;border-radius:6px}.nid-a .nid-method{font-size:.92em;margin-top:2em}</style><div class="nid-a">'
        f'<p><a href="{BASE}"><strong>Scroll through the interactive version of this story →</strong></a></p>',
        f"<p>{e(INTRO[0])}</p>", f"<p>{e(INTRO[1])}</p>", f"<p>{e(INTRO[2])}</p>",
        f'<figure class="nid-fig"><img src="{BASE}values-chart.png" alt="{e(ALT)}" width="1080" height="1350"></figure>']
for h, p in STEPS[1:]:
    body += [f"<h2>{e(h)}</h2>", f"<p>{e(p)}</p>"]
body.append("<h2>What the data can&#x27;t tell us</h2>")
body += [f"<p>{e(p)}</p>" for p in CANT]
body.append("<h2>Notes and calculations</h2>")
body += [f"<p>{e(p)}</p>" for p in NOTES]
body.append(f'<p class="nid-method"><em>{e(METHOD)} Source: <a href="{SOURCE_URL}">Gallup, Oct. 25, 2026</a>.</em></p></div>')
open(f"{REPO}/{FOLDER}/post-body.html", "w", encoding="utf-8").write("\n".join(body))

# word count of body text
import itertools
words = " ".join([INTRO[0], INTRO[1]] + [p for _, p in STEPS[1:]] + CANT).split()
print("body words:", len(words), "alt chars:", len(ALT))
