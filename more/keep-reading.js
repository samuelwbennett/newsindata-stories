/* The News in Data: Keep Reading for the interactive stories on stories.thenewsindata.com.
   Reads /more/stories.json (newest first), skips the story you are on, shows stories
   from the same section first, then the newest from other sections. Cards link to the
   story's post on www.thenewsindata.com. Add each new story to stories.json when it publishes. */
(function () {
  var SITE = 'https://www.thenewsindata.com/stories/';
  var N = 6;
  var CSS = [
    '.nid-kr{max-width:1000px;margin:24px auto 64px;font-family:"Times New Roman",Times,serif;color:#13241b}',
    '.nid-kr .hd{font-size:30px;font-weight:700;margin:0 0 6px;padding-top:20px;border-top:3px solid #13241b}',
    '.nid-kr .sb{font-size:17px;color:#5f7268;margin:0 0 20px}',
    '.nid-kr .g{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}',
    '.nid-kr a{display:block;text-decoration:none;color:#13241b;border:1px solid #cfdfd5;border-radius:6px;overflow:hidden;background:#fff;transition:box-shadow .15s,transform .15s}',
    '.nid-kr a:hover{box-shadow:0 6px 18px rgba(0,0,0,.08);transform:translateY(-2px)}',
    '.nid-kr a:hover .h{text-decoration:underline}',
    '.nid-kr .im{background:#fff;border-bottom:1px solid #e3eee7}',
    '.nid-kr img{display:block;width:100%;aspect-ratio:1200/630;object-fit:contain}',
    '.nid-kr .t{padding:10px 12px 14px}',
    '.nid-kr .k{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#007a55}',
    '.nid-kr .h{font-size:18px;font-weight:700;line-height:1.22;margin-top:4px}',
    '.nid-kr .all{display:inline-block;margin-top:22px;font-size:17px;font-weight:700;color:#007a55;border:0;background:none;text-decoration:underline}',
    '@media(max-width:760px){.nid-kr .g{grid-template-columns:1fr;gap:12px}',
    '.nid-kr a{display:grid;grid-template-columns:42% 1fr;align-items:center}',
    '.nid-kr .im{border-bottom:0;border-right:1px solid #e3eee7;height:100%;display:flex;align-items:center}',
    '.nid-kr .t{padding:8px 10px}.nid-kr .k{font-size:11px}.nid-kr .h{font-size:16px}.nid-kr .hd{font-size:26px}}'
  ].join('\n');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function here() {
    var c = document.querySelector('link[rel="canonical"]');
    return c ? c.href.replace(/\/$/, '').split('/').pop() : '';
  }

  function render(el, list) {
    var me = here(), mine = null;
    list.forEach(function (s) { if (s.slug === me) mine = s; });
    var section = el.getAttribute('data-section') || (mine && mine.section) || '';
    var others = list.filter(function (s) { return s.slug !== me; });
    var same = others.filter(function (s) { return s.section === section; });
    var rest = others.filter(function (s) { return s.section !== section; });
    var pick = same.slice(0, 3).concat(rest).slice(0, N);
    if (pick.length < N) pick = pick.concat(same.slice(3)).slice(0, N);
    var h = '<div class="hd">Keep Reading</div><p class="sb">More charts from The News in Data</p><div class="g">';
    pick.forEach(function (s) {
      h += '<a href="' + SITE + s.slug + '"><div class="im"><img src="' + esc(s.image) + '?format=750w" alt="Chart: ' + esc(s.title) +
        '" loading="lazy"></div><div class="t"><div class="k">' + esc(s.section) + '</div><div class="h">' + esc(s.title) + '</div></div></a>';
    });
    h += '</div><a class="all" href="' + SITE.replace(/\/$/, '') + '">See all stories →</a>';
    el.innerHTML = h;
  }

  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  var els = [].slice.call(document.querySelectorAll('.nid-kr'));
  if (!els.length) {
    var box = document.createElement('section'); box.className = 'nid-kr';
    var wrap = document.querySelector('.wrap') || document.body; wrap.appendChild(box); els = [box];
  }
  fetch('/more/stories.json', { cache: 'no-cache' }).then(function (r) { return r.json(); })
    .then(function (j) { els.forEach(function (e) { render(e, j.stories || []); }); })
    .catch(function () { els.forEach(function (e) { e.parentNode.removeChild(e); }); });
})();
