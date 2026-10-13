/* The News in Data: Keep Reading. Edit STORIES to change every article at once. */
(function(){
var BASE='https://stories.thenewsindata.com/more/';
var STORIES=[
{
"k": "candy",
"kick": "Trending",
"head": "Candy Prices Are Up 49% Since 2020",
"slug": "candy-prices-are-up-49-since-2020-while-overall-prices-rose-29-and-wages-28"
},
{
"k": "snow",
"kick": "Science",
"head": "When Does Your State Usually Get Its First Snow?",
"slug": "winter-is-coming-when-the-first-snow-usually-falls-in-your-state"
},
{
"k": "bowling",
"kick": "Trending",
"head": "Bowling Leagues Have Lost Nearly 9 In 10 Members Since 1980",
"slug": "league-bowling-has-about-one-member-today-for-every-nine-it-had-in-1980"
},
{
"k": "social",
"kick": "Trending",
"head": "A Quarter Fewer Americans Socialize On A Typical Day Than In 2003",
"slug": "about-a-quarter-fewer-americans-socialize-on-an-average-day-than-in-2003-but-those-who-do-still-spend-about-two-hours"
},
{
"k": "primetime",
"kick": "Sports",
"head": "Over Five Seasons, The Cowboys Got 22 Prime&#8209;Time Games. The Browns Got 3.",
"slug": "who-owns-prime-time-the-nfl-books-audiences-not-records"
},
{
"k": "hurricane",
"kick": "Science",
"head": "2026 Tied 1905 For The Latest First Atlantic Hurricane",
"slug": "2026-tied-1905-for-the-latest-first-atlantic-hurricane-since-tracking-began-in-1851"
},
{
"k": "hot100",
"kick": "Culture",
"head": "Six Of The 7 Longest&#8209;Running No.&nbsp;1 Hits Came In The Streaming Era",
"slug": "six-of-the-seven-songs-with-the-most-weeks-at-no-1-on-the-hot-100-came-in-the-streaming-era"
}
];
var CSS=".nid-more{margin:56px 0 8px;font-family:'Times New Roman',Times,serif}\n.nid-more .hd{font-family:'Times New Roman',Times,serif;font-size:28px;font-weight:700;margin:0 0 18px;padding-top:18px;border-top:3px solid #111}\n.nid-more .g{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}\n.nid-more a{display:block;text-decoration:none!important;color:#13241b!important;border:1px solid #e6e3dd;border-radius:10px;overflow:hidden;background:#fff;transition:transform .15s,box-shadow .15s}\n.nid-more a:hover{transform:translateY(-3px);box-shadow:0 8px 22px rgba(0,0,0,.08)}\n.nid-more img{display:block;width:100%;aspect-ratio:3/2;object-fit:cover;margin:0}\n.nid-more .t{padding:12px 14px 16px}\n.nid-more .k{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#007a55}\n.nid-more .h{font-size:19px;font-weight:700;line-height:1.2;margin-top:4px}\n@media(max-width:760px){.nid-more .g{grid-template-columns:repeat(2,1fr);gap:14px}.nid-more .h{font-size:16px}}";
function render(el){
  var here=location.pathname.replace(/\/$/,'');
  var n=parseInt(el.getAttribute('data-count')||'6',10);
  var list=STORIES.filter(function(s){return here.indexOf(s.slug)===-1;}).slice(0,n);
  var h='<div class="hd">Keep Reading</div><div class="g">';
  list.forEach(function(s){
    var alt=s.head.replace(/&#8209;/g,'-').replace(/&nbsp;/g,' ');
    h+='<a href="/stories/'+s.slug+'"><img src="'+BASE+'icon-'+s.k+'.png" alt="'+alt+'" loading="lazy"><div class="t"><div class="k">'+s.kick+'</div><div class="h">'+s.head+'</div></div></a>';
  });
  el.innerHTML=h+'</div>';
}
if(!document.getElementById('nid-more-css')){var st=document.createElement('style');st.id='nid-more-css';st.textContent=CSS;document.head.appendChild(st);}
var els=document.querySelectorAll('.nid-more[data-auto]');
for(var i=0;i<els.length;i++){ if(!els[i].getAttribute('data-done')){render(els[i]);els[i].setAttribute('data-done','1');} }
})();
