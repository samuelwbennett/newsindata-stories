/* The News in Data: Global Flourishing Study world map. Renders into every element with class "nid-gfs-map".
   Needs d3 7 and topojson-client 3 on the page. Data: GFS Wave 1 (2022-23), weighted; see post for method. */
(function () {
  var BASE = 'https://stories.thenewsindata.com/friends/';
  // iso numeric: [name, no-close %, men, women, 18-29, 30-49, 50-64, 65+, flourishing 0-10, GDP per person 2023 PPP]
  var D = {
    '032': ['Argentina', 18.9, 21.0, 17.0, 17.5, 19.2, 20.0, 19.3, 7.79, 27230],
    '036': ['Australia', 14.6, 17.4, 11.8, 18.2, 14.0, 15.9, 11.8, 7.02, 60685],
    '076': ['Brazil', 17.9, 18.7, 17.0, 16.9, 18.5, 19.2, 15.0, 7.63, 19080],
    '818': ['Egypt', 12.4, 13.7, 11.0, 10.2, 12.0, 16.9, 12.2, 7.63, 16691],
    '276': ['Germany', 14.5, 16.5, 12.7, 14.6, 14.2, 14.4, 15.1, 7.10, 63140],
    '356': ['India', 18.3, 18.2, 18.3, 16.2, 18.9, 19.7, 20.9, 7.43, 8871],
    '360': ['Indonesia', 22.7, 24.3, 21.0, 20.0, 20.4, 29.6, 32.0, 8.47, 13890],
    '376': ['Israel', 11.6, 13.3, 10.1, 13.1, 7.8, 12.3, 16.3, 8.00, 47671],
    '392': ['Japan', 32.8, 38.2, 27.7, 32.9, 36.7, 35.3, 27.6, 5.93, 47387],
    '404': ['Kenya', 18.2, 17.6, 18.8, 18.5, 17.5, 17.6, 21.3, 7.77, 5692],
    '484': ['Mexico', 20.7, 22.5, 19.0, 19.2, 20.1, 22.5, 23.5, 8.19, 21865],
    '566': ['Nigeria', 7.2, 7.9, 6.6, 6.1, 7.2, 8.6, 13.8, 7.82, 7843],
    '608': ['Philippines', 9.9, 10.3, 9.4, 10.5, 7.9, 12.3, 11.4, 8.11, 9899],
    '616': ['Poland', 13.2, 14.4, 12.1, 12.8, 10.2, 17.2, 14.8, 7.63, 43673],
    '710': ['South Africa', 16.8, 17.0, 16.6, 17.0, 16.1, 17.7, 17.8, 7.41, 13695],
    '724': ['Spain', 13.0, 14.4, 11.6, 12.8, 12.1, 12.8, 15.7, 7.31, 47323],
    '834': ['Tanzania', 24.9, 22.4, 27.2, 24.3, 25.0, 25.6, 26.5, 7.48, 3621],
    '792': ['Turkey', 22.3, 26.5, 17.9, 21.8, 23.6, 18.5, 26.3, 6.59, 35069],
    '826': ['United Kingdom', 17.2, 18.5, 16.2, 14.0, 14.9, 20.1, 19.5, 6.88, 53423],
    '840': ['United States', 13.5, 16.6, 10.7, 17.4, 13.0, 13.1, 11.7, 7.18, 74352],
    '752': ['Sweden', 13.4, 15.9, 10.8, 11.0, 12.7, 14.7, 14.7, 7.04, 62123],
    '344': ['Hong Kong', 16.2, 17.9, 14.7, 15.9, 19.1, 13.6, 15.2, 7.17, 64388]
  };
  var MODES = {
    close: { label: 'No one close', i: 1, dom: [5, 35], fmt: function (v) { return v.toFixed(1) + '%'; },
      title: 'Share Of Adults With No One They Feel Very Close To',
      sub: 'Percent answering no to “Is there any one special person you know that you feel very close to?”', hiFirst: true },
    flourish: { label: 'Flourishing score', i: 8, dom: [5.8, 8.6], fmt: function (v) { return v.toFixed(2); },
      title: 'Average Flourishing Score, 0 To 10',
      sub: 'Mean of 10 questions on happiness, health, meaning, character and relationships', hiFirst: true }
  };
  var CSS = '.nid-gfs-map{--g:#007a55;--ink:#13241b;--mut:#5f7268;font-family:"Times New Roman",Times,serif;color:var(--ink);container-type:inline-size;position:relative;margin:1.6em 0}' +
    '.nid-gfs-map .nm-top{text-align:center}.nid-gfs-map .nm-t{font-weight:700;font-size:clamp(19px,4.2cqi,27px);line-height:1.15;margin:0 0 4px}' +
    '.nid-gfs-map .nm-s{font-size:clamp(13px,2.6cqi,16px);color:#34473c;margin:0 0 10px}' +
    '.nid-gfs-map .nm-btns{display:flex;gap:6px;justify-content:center;margin-bottom:6px}.nid-gfs-map button{font:inherit;font-size:15px;padding:6px 12px;border:1.5px solid var(--ink);background:#fff;color:var(--ink);cursor:pointer;border-radius:3px}' +
    '.nid-gfs-map button[aria-pressed=true]{background:var(--g);border-color:var(--g);color:#fff}' +
    '.nid-gfs-map svg{width:100%;height:auto;display:block}.nid-gfs-map path.c{stroke:#fff;stroke-width:.5}.nid-gfs-map path.s{cursor:pointer;stroke:#fff;stroke-width:.7}.nid-gfs-map path.s.on,.nid-gfs-map circle.on{stroke:#13241b;stroke-width:1.8}' +
    '.nid-gfs-map .nm-tip{position:absolute;pointer-events:none;background:#fff;border:1.5px solid var(--ink);padding:8px 10px;font-size:14px;line-height:1.35;opacity:0;transition:opacity .15s;max-width:230px;z-index:3}' +
    '.nid-gfs-map .nm-tip b{font-size:16px}.nid-gfs-map .nm-list{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(11,auto);grid-auto-flow:column;column-gap:22px;row-gap:2px;margin-top:10px;font-size:14.5px}' +
    '@container (max-width:520px){.nid-gfs-map .nm-list{grid-template-columns:1fr;grid-template-rows:none;grid-auto-flow:row}}' +
    '.nid-gfs-map .nm-row{display:grid;grid-template-columns:118px 1fr 46px;align-items:center;gap:6px;cursor:pointer;padding:1px 0}.nid-gfs-map .nm-row.on{font-weight:700}' +
    '.nid-gfs-map .nm-bar{height:10px;background:#c9d4ce}.nid-gfs-map .nm-row.hl .nm-bar{background:var(--g)}.nid-gfs-map .nm-row span:last-child{text-align:right}' +
    '.nid-gfs-map .nm-note{font-size:13px;color:var(--mut);margin-top:8px}';

  function init(el) {
    if (el.dataset.ready) return; el.dataset.ready = 1;
    if (!document.getElementById('nid-gfs-css')) { var st = document.createElement('style'); st.id = 'nid-gfs-css'; st.textContent = CSS; document.head.appendChild(st); }
    el.innerHTML = '<div class="nm-top"><p class="nm-t"></p><p class="nm-s"></p><div class="nm-btns"></div></div><svg viewBox="0 0 960 500" role="img" aria-label="World map of 22 places. Japan has the highest share of adults with no one they feel very close to, 32.8%; Nigeria the lowest, 7.2%."></svg><div class="nm-tip"></div><div class="nm-list"></div>' +
      '<p class="nm-note">22 places, 2022–23. Global Flourishing Study, Wave 1, weighted. Hong Kong shown as a circle. Gray: not surveyed. Tap or hover a country.</p>';
    var mode = el.dataset.mode || 'close', sel = null, paint = function () {};
    var svg = d3.select(el).select('svg'), tip = el.querySelector('.nm-tip');
    var btns = d3.select(el).select('.nm-btns').selectAll('button').data(Object.keys(MODES)).join('button')
      .text(function (k) { return MODES[k].label; }).on('click', function (ev, k) { mode = k; paint(); });
    var proj = d3.geoEqualEarth().rotate([-10, 0]).fitExtent([[6, 6], [954, 494]], { type: 'Sphere' });
    var path = d3.geoPath(proj);
    d3.json(BASE + 'world.json').then(function (w) {
      var feats = topojson.feature(w, w.objects.countries).features;
      svg.append('path').attr('d', path({ type: 'Sphere' })).attr('fill', '#f6f9f7').attr('stroke', '#dfe7e2');
      var g = svg.append('g');
      g.selectAll('path').data(feats).join('path').attr('d', path)
        .attr('class', function (f) { return D[f.id] ? 's' : 'c'; }).attr('data-id', function (f) { return f.id; })
        .attr('fill', '#eceeed');
      var hk = proj([114.17, 22.32]);
      g.append('circle').attr('cx', hk[0]).attr('cy', hk[1]).attr('r', 5).attr('data-id', '344').attr('class', 's').attr('stroke', '#fff').attr('stroke-width', .8).style('cursor', 'pointer');
      var leg = svg.append('g').attr('transform', 'translate(60,440)');
      var ann = svg.append('g').attr('class', 'ann');
      leg.append('defs').append('linearGradient').attr('id', 'nmgr').selectAll('stop').data(d3.range(0, 1.01, .1)).join('stop')
        .attr('offset', function (t) { return t * 100 + '%'; }).attr('stop-color', function (t) { return d3.interpolate('#bfe3d1', '#00412c')(t); });
      leg.append('rect').attr('width', 200).attr('height', 12).attr('fill', 'url(#nmgr)');
      leg.append('g').attr('class', 'lt');
      svg.selectAll('[data-id]').filter(function () { return D[this.getAttribute('data-id')]; })
        .on('pointerenter pointermove', function (ev) { show(this.getAttribute('data-id'), ev); })
        .on('pointerleave', function () { if (!sel) tip.style.opacity = 0; })
        .on('click', function (ev) { sel = this.getAttribute('data-id'); show(sel, ev); mark(); });
      paint = paintNow; paint();
      function color(v) { var m = MODES[mode]; return d3.interpolate('#bfe3d1', '#00412c')(Math.max(0, Math.min(1, (v - m.dom[0]) / (m.dom[1] - m.dom[0])))); }
      function paintNow() {
        var m = MODES[mode];
        el.querySelector('.nm-t').textContent = m.title; el.querySelector('.nm-s').textContent = m.sub;
        btns.attr('aria-pressed', function (k) { return k === mode; });
        svg.selectAll('.s').transition().duration(500).attr('fill', function () { return color(D[this.getAttribute('data-id')][m.i]); });
        var lt = leg.select('.lt').selectAll('text').data([m.dom[0], (m.dom[0] + m.dom[1]) / 2, m.dom[1]]).join('text')
          .attr('x', function (v, i) { return i * 100; }).attr('y', 30).attr('text-anchor', 'middle').attr('font-size', 15).attr('font-weight', 700).attr('fill', '#13241b')
          .text(function (v) { return mode === 'close' ? v + '%' : v.toFixed(1); });
        var A = mode === 'close' ? [['392', 'Japan 32.8%', 18, -26], ['566', 'Nigeria 7.2%', -60, 34], ['840', 'U.S. 13.5%', 0, 0]] : [['360', 'Indonesia 8.47', 10, 40], ['392', 'Japan 5.93', 18, -26], ['840', 'U.S. 7.18', 0, 0]];
        ann.selectAll('*').remove();
        A.forEach(function (a) { var f = feats.find(function (x) { return x.id === a[0]; }); var c = a[0] === '392' ? proj([138.5, 37]) : a[0] === '840' ? proj([-99, 39]) : path.centroid(f);
          var tx = c[0] + a[2], ty = c[1] + a[3];
          if (a[2] || a[3]) ann.append('line').attr('x1', c[0]).attr('y1', c[1]).attr('x2', tx).attr('y2', ty + (a[3] < 0 ? 4 : -12)).attr('stroke', '#13241b').attr('stroke-width', 1);
          ann.append('text').attr('x', tx).attr('y', ty).attr('text-anchor', a[2] < 0 ? 'end' : a[2] > 0 ? 'start' : 'middle').attr('font-size', 17).attr('font-weight', 700)
            .attr('fill', '#13241b').attr('paint-order', 'stroke').attr('stroke', '#fff').attr('stroke-width', 3.5).attr('pointer-events', 'none').text(a[1]); });
        var rows = Object.keys(D).map(function (k) { return [k, D[k][m.i]]; }).sort(function (a, b) { return b[1] - a[1]; });
        var mx = m.dom[1];
        var list = d3.select(el).select('.nm-list').selectAll('.nm-row').data(rows, function (r) { return r[0]; }).join('div').attr('class', 'nm-row')
          .classed('hl', function (r) { return r[0] === '392' || r[0] === '840'; })
          .html(function (r) { return '<span>' + D[r[0]][0] + '</span><div class="nm-bar" style="width:' + (100 * (r[1] - (mode === 'close' ? 0 : 5)) / (mx - (mode === 'close' ? 0 : 5))) + '%"></div><span>' + m.fmt(r[1]) + '</span>'; })
          .on('click', function (ev, r) { sel = r[0]; mark(); var b = svg.select('[data-id="' + r[0] + '"]').node().getBoundingClientRect(); show(r[0], { clientX: b.x + b.width / 2, clientY: b.y + b.height / 2 }); });
        list.order(); mark();
      }
      function mark() { svg.selectAll('.s').classed('on', function () { return this.getAttribute('data-id') === sel; }); d3.select(el).selectAll('.nm-row').classed('on', function (r) { return r[0] === sel; }); }
      function show(id, ev) {
        var d = D[id], r = el.getBoundingClientRect();
        var rankC = Object.keys(D).filter(function (k) { return D[k][1] > d[1]; }).length + 1;
        var rankF = Object.keys(D).filter(function (k) { return D[k][8] > d[8]; }).length + 1;
        tip.innerHTML = '<b>' + d[0] + '</b><br>No one very close: <b>' + d[1].toFixed(1) + '%</b> (' + rankC + ' of 22)<br>Men ' + d[2].toFixed(1) + '%, women ' + d[3].toFixed(1) + '%<br>Ages 18–29 ' + d[4].toFixed(1) + '%, 65+ ' + d[7].toFixed(1) + '%<br>Flourishing: <b>' + d[8].toFixed(2) + '</b> (' + rankF + ' of 22)<br>GDP per person: $' + d3.format(',')(Math.round(d[9] / 100) * 100);
        var x = ev.clientX - r.left + 14, y = ev.clientY - r.top + 14;
        tip.style.left = Math.min(x, r.width - 240) + 'px'; tip.style.top = y + 'px'; tip.style.opacity = 1;
      }
    });
  }
  function boot() { document.querySelectorAll('.nid-gfs-map').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
