"""Build post bodies, CSVs and project-doc text for two Global Flourishing Study stories."""
import csv, html, json, os

REPO = "/home/claude/newsindata-stories"
e = lambda s: html.escape(s, quote=False)
UP = "https://upload.wikimedia.org/wikipedia/commons/thumb/"
GFS_SRC = ('<a href="https://osf.io/c8hbk/">Global Flourishing Study, Waves 1 and 2 open data (Center for Open Science)</a>; '
           '<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12165845/">VanderWeele et al., &ldquo;The Global Flourishing Study: '
           'Study Profile and Initial Results on Flourishing,&rdquo; Nature Mental Health, April 30, 2025</a>')

STORIES = {}

# ---------------------------------------------------------------- friends
STORIES["friends"] = dict(
    section="Culture",
    slug="one-in-three-japanese-adults-say-theres-no-one-they-feel-very-close-to-more-than-twice-the-us-share",
    title="One In Three Japanese Adults Say There's No One They Feel Very Close To, More Than Twice The U.S. Share",
    card="One In Three Japanese Adults Say There's No One They Feel Close To",
    dek=("The Global Flourishing Study asked 207,000 adults in 22 countries whether there's one special person they feel "
         "very close to, and 32.8% of Japanese adults said no."),
    excerpt=("Asked whether there's one special person they feel very close to, 32.8% of Japanese adults said no, compared "
             "with 13.5% of Americans and 7.2% of Nigerians, in Global Flourishing Study data covering 22 countries."),
    alt=("Bar chart of 22 countries: 32.8% of adults in Japan say there's no one they feel very close to, the most by far, "
         "compared with 13.5% in the U.S. and 7.2% in Nigeria."),
    blocks=[
        ("p", "I went looking for the loneliest country in the Global Flourishing Study's newly opened data and kept landing on "
              "Japan. The survey asked people in 22 countries whether “there's any one special person you know that you feel "
              "very close to,” someone you can confide in, and 32.8% of Japanese adults said no. That is 2.4 times the U.S. "
              "share of 13.5% and about twice the 16.5% in the median country."),
        ("p", "[Samuel: one sentence on why you looked at this, e.g. something you've seen in students, athletes or friends.]"),
        ("img", "friends-map-chart.png", "World map of 22 places shaded by the share of adults with no one they feel very close to. Japan is darkest at 32.8%, more than twice the U.S. at 13.5%; Nigeria is lowest at 7.2%."),
        ("map", "close"),
        ("photo", UP + "c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg/960px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg",
         "Crowds crossing at Shibuya Crossing in Tokyo",
         "Shibuya Crossing in Tokyo in 2018. In Japan, 32.8% of adults told the survey there's no one they feel very close to.",
         "https://commons.wikimedia.org/wiki/File:Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg", "Benh LIEU SONG", "CC BY-SA 2.0"),
        ("h2", "Who else said there's no one?"),
        ("p", "Tanzania was next at 24.9%, followed by Indonesia at 22.7% and Turkey at 22.3%, so the second-place country sits "
              "7.9 points below Japan. At the other end, 7.2% of Nigerians and 9.9% of Filipinos said there's no one, which makes "
              "a Japanese adult about 4.5 times as likely as a Nigerian to give that answer. Indonesia is worth a second look, "
              "since it ranks first in the study on overall flourishing even though more than one in five Indonesians said "
              "there's no one they feel very close to."),
        ("video", "friends-map", "The 22 places fill in from the lowest share to the highest. Free to share with credit."),
        ("h2", "Middle-aged Japanese men answered no most often"),
        ("p", "Japanese men were the most likely group to say there's no one, at 38.2%, compared with 27.7% of Japanese women. "
              "That 10.5-point gap is the widest of the 22 countries, and men answered no more often than women in 19 of them. "
              "In Japan the share peaked among adults 30 to 49, at 36.7%, and was lowest among those 65 and older, at 27.6%. The "
              "U.S. runs the other way, with 17.4% of adults 18 to 29 saying there's no one, compared with 11.7% of those 65 and "
              "older."),
        ("video", "friends-bars", "Every country, ranked. Free to share with credit."),
        ("photo", UP + "4/42/2007-08-06_a_station_of_JR_East_with_commuter_trains_in_Tokyo_Metropolitan_Area.jpg/960px-2007-08-06_a_station_of_JR_East_with_commuter_trains_in_Tokyo_Metropolitan_Area.jpg",
         "A man walking along an empty platform between two commuter trains",
         "A JR East commuter station in the Tokyo area. Japanese men were the most likely group in the survey to say there's no one they feel very close to, at 38.2%.",
         "https://commons.wikimedia.org/wiki/File:2007-08-06_a_station_of_JR_East_with_commuter_trains_in_Tokyo_Metropolitan_Area.jpg", "Tamaki Sono", "CC BY 2.0"),
        ("h2", "Does having someone close go with feeling less lonely?"),
        ("p", "It does in 21 of the 22 countries, though the gap varies. The survey separately asked how often people feel lonely, on a "
              "scale from 0 (always) to 10 (never). Japanese adults with someone close averaged 6.54, and those without averaged "
              "4.79. In the U.S. the figures were 6.99 and 4.81, nearly the same gap. In Nigeria the two groups both averaged 6.78, "
              "so there, having no one special didn't go with more loneliness at all. These are averages from one survey, so they "
              "show which things go together, not what causes what."),
        ("h2", "Was it a one-year blip?"),
        ("p", "The study went back to many of the same people a year later, in 2023 and 2024, and 32.7% of Japanese adults said "
              "there's no one, essentially the same as the 32.8% the year before. The U.S. share moved from 13.5% to 12.4%, and "
              "Nigeria's from 7.2% to 11.2%."),
        ("photo", UP + "1/1b/2005_market_Lagos_Nigeria_12129005.jpg/960px-2005_market_Lagos_Nigeria_12129005.jpg",
         "A crowded open-air market in Lagos, Nigeria",
         "A market in Lagos, Nigeria, in 2005. Nigeria had the smallest share of adults saying there's no one they feel very close to, 7.2%.",
         "https://commons.wikimedia.org/wiki/File:2005_market_Lagos_Nigeria_12129005.jpg", "Zouzou Wizman", "CC BY 2.0"),
        ("h2", "What the data can't tell us"),
        ("p", "People in some countries answered online and others by phone or in person, and people tend to admit to things "
              "like having no close friend more readily online. Japan's survey was online, but so were those in the U.S., Britain, "
              "Germany, Sweden, Spain, Australia, Poland and Hong Kong, and the highest of those after Japan was Britain at 17.2%, "
              "so the method doesn't explain the gap. The question was also translated into about 40 languages, and “special "
              "person” may carry a different weight in Japanese than in English. The study's third wave, with new findings on "
              "relationships and belonging, will be presented on Dec. 2, and I'll check whether Japan's number holds."),
    ],
    notes=[
        "Ratio to the U.S.: 32.8 divided by 13.5 is about 2.4. Ratio to the median: 32.8 divided by 16.5 is about 2.0.",
        "Japan vs. Nigeria: 32.8 divided by 7.2 is about 4.6, rounded down to “about 4.5 times” in the text.",
        "Gender gap in Japan: 38.2 minus 27.7 is 10.5 points; the next widest is Turkey, 26.5 minus 17.9, or 8.6 points.",
        "Median: the middle of the 22 country figures falls between 16.2% (Hong Kong) and 16.8% (South Africa), at 16.5%.",
        "We reproduced the study's published country flourishing scores from the same file to within 0.02 points before computing anything new.",
    ],
    method=("How we counted: Global Flourishing Study Waves 1 and 2 public data file (gfs_all_countries_wave2.csv), downloaded "
            "Nov. 2, 2026. Wave 1 was collected from April 2022 to December 2023 and Wave 2 a year later. Shares are weighted "
            "with the study's cross-sectional weights (ANNUAL_WEIGHT_C1 for Wave 1, ANNUAL_WEIGHT_C2 for Wave 2) and exclude "
            "people who skipped, didn't know or refused. 207,018 Wave 1 respondents answered the question across the 22 "
            "countries (counting Hong Kong as one). Mainland China, added in 2024, is left out. Age bands use age at Wave 1. "
            "Loneliness averages use the 0–10 “How often do you feel lonely?” item. Survey mode is from the "
            "study's MODE_ANNUAL code. Sources: " + GFS_SRC + "."),
    reddit_title="Share of adults with no one they feel very close to, 22 countries [OC]",
    csv="closeto",
)

# ---------------------------------------------------------------- flourish
STORIES["flourish"] = dict(
    section="Science",
    slug="in-the-worlds-largest-flourishing-study-8-of-the-10-richest-countries-rank-in-the-bottom-half",
    title="In The World's Largest Flourishing Study, 8 Of The 10 Richest Countries Rank In The Bottom Half",
    card="8 Of The 10 Richest Countries Rank In The Bottom Half On Flourishing",
    dek=("Indonesians scored 8.47 out of 10 and Japanese adults 5.93, and the 20 countries in between line up roughly in "
         "reverse order of wealth."),
    excerpt=("Indonesia scored 8.47 out of 10 on the Global Flourishing Study's index and the U.S. 7.18, 15th of 22, even "
             "though Americans produce more than five times as much per person; 8 of the 10 richest countries ranked in the bottom half."),
    alt=("Scatter plot of 22 countries' flourishing scores against GDP per person. Indonesia scores highest at 8.47, Japan "
         "lowest at 5.93, and most rich countries sit below the poorer ones."),
    blocks=[
        ("p", "The Global Flourishing Study, run by Gallup with researchers at Harvard and Baylor, scores people on a 0-to-10 "
              "index that averages 10 questions about happiness, health, meaning, character and relationships. When I set each "
              "country's average against its GDP per person from the World Bank, 8 of the 10 richest countries ranked in the "
              "bottom half of the 22."),
        ("p", "Indonesia ranked first at 8.47, with GDP per person of about $13,900. The U.S. ranked 15th at 7.18, even though "
              "it produces more than five times as much per person, about $74,400. Japan finished last at 5.93, 2.54 points "
              "below Indonesia and 0.66 below Turkey, the next lowest."),
        ("p", "[Samuel: one line on why this caught your eye, e.g. what you see in the Vail Valley or in your students.]"),
        ("video", "flourish-scatter", "Each dot is a country, added from poorest to richest. Free to share with credit."),
        ("photo", UP + "0/06/Jakarta_Car_Free_Day.jpg/960px-Jakarta_Car_Free_Day.jpg",
         "Crowds walking and cycling on a closed avenue in central Jakarta",
         "Car-free day on Jakarta's main avenue. Indonesia ranked first of 22 countries, at 8.47.",
         "https://commons.wikimedia.org/wiki/File:Jakarta_Car_Free_Day.jpg", "Gunawan Kartapranata", "CC BY-SA 3.0"),
        ("h2", "How strong is the pattern?"),
        ("p", "It's clear but loose. The 10 countries with GDP per person under $25,000 averaged 7.79, and the 10 above $40,000 "
              "averaged 7.13, a gap of 0.66 points. Ranked by wealth and by flourishing, the two lists have a correlation of "
              "−0.57, meaning richer countries tend to score lower but with plenty of exceptions. Israel ranked fourth at "
              "8.00 with GDP per person of about $47,700, and Poland tied for eighth at 7.63, ahead of every Western European "
              "country in the study."),
        ("photo", UP + "3/34/Mexico_City_Zocalo_Panorama_%2849275255128%29.jpg/960px-Mexico_City_Zocalo_Panorama_%2849275255128%29.jpg",
         "The Zócalo plaza in Mexico City with the cathedral and a large Mexican flag",
         "The Zócalo in Mexico City. Mexico ranked second at 8.19.",
         "https://commons.wikimedia.org/wiki/File:Mexico_City_Zocalo_Panorama_(49275255128).jpg", "Nan Palmero", "CC BY 2.0"),
        ("map", "flourish"),
        ("h2", "Add money worries and the gap shrinks"),
        ("p", "The study also publishes a version of the index with two more questions, about worrying over monthly expenses "
              "and over safety, food or housing. People in richer countries worry less about both, so that version narrows the "
              "gap. Israel moves to second at 7.87, Poland to fifth at 7.55 and the U.S. up to 12th at 7.11, while Indonesia "
              "stays first and Japan last. On that version the correlation with wealth falls to −0.28, too weak to rule out "
              "chance with only 22 countries."),
        ("h2", "What do richer countries score lower on?"),
        ("p", "Tyler VanderWeele, who directs Harvard's Human Flourishing Program, told Euronews that richer countries don't "
              "score as high on meaning, relationships or pro-social character. Relationships stand out in Japan, where 32.8% of "
              "adults said there's no one they feel very close to, more than twice the U.S. share. A separate 22-country "
              "“report card” paper published in August found that how people rate their own lives and how their "
              "countries score on 34 objective national measures line up only weakly, with a "
              "correlation of 0.15 across countries."),
        ("photo", UP + "1/17/Shibuya_Crossing_20241020.jpg/960px-Shibuya_Crossing_20241020.jpg",
         "Shibuya Crossing in Tokyo with large screens on surrounding buildings",
         "Shibuya Crossing in Tokyo. Japan ranked last at 5.93, even though its GDP per person is about 3.4 times Indonesia's.",
         "https://commons.wikimedia.org/wiki/File:Shibuya_Crossing_20241020.jpg", "Supanut Arunoprayote", "CC BY 4.0"),
        ("h2", "What the data can't tell us"),
        ("p", "These are averages from one round of surveys, so they show that richer countries tend to score lower, not that "
              "money lowers anyone's score. Researchers have long noted that people in some countries, Japan among them, avoid "
              "the top of rating scales, which would pull an average down without anyone feeling worse. The 22 countries cover "
              "about 64% of the world's population but weren't chosen at random. The study's third wave will be presented on "
              "Dec. 2, and it should show whether the ranking holds from year to year."),
    ],
    notes=[
        "Richest 10 (GDP per person above $40,000): U.S., Hong Kong, Germany, Sweden, Australia, Britain, Israel, Japan, Spain and Poland. Their ranks: 15, 16, 17, 18, 19, 20, 4, 22, 14 and 9 (tied). Eight are 12th or lower.",
        "U.S. vs. Indonesia GDP per person: $74,352 divided by $13,890 is about 5.4.",
        "Japan vs. Indonesia GDP per person: $47,387 divided by $13,890 is about 3.4.",
        "Group averages: under $25,000 (Brazil, Egypt, India, Indonesia, Kenya, Mexico, Nigeria, Philippines, South Africa, Tanzania) 7.79; above $40,000 7.13. Simple averages of country scores, not weighted by population.",
        "Correlations are Spearman rank correlations across the 22 countries: −0.57 for the main index, −0.28 for the index with financial questions (p = 0.13).",
    ],
    method=("How we counted: flourishing scores are the published Wave 1 country means of the Global Flourishing Study's "
            "composite index without financial indicators (10 items) and with them (12 items), collected April 2022 to "
            "December 2023. We reproduced each from the public data file to within 0.02 points. GDP per person is the World "
            "Bank's GDP per capita, PPP (constant 2021 international dollars), for 2023, retrieved Nov. 2, 2026. Sources: "
            + GFS_SRC + '; <a href="https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.KD">World Bank, NY.GDP.PCAP.PP.KD</a>; '
            '<a href="https://pubmed.ncbi.nlm.nih.gov/42634618/">&ldquo;A comparative report card,&rdquo; Discover Global Society, Aug. 22, 2026</a>; '
            '<a href="https://www.euronews.com/health/2025/04/30/indonesians-are-flourishing-people-in-the-uk-germany-and-spain-not-so-much-global-survey-f">Euronews, April 30, 2025</a>.'),
    reddit_title="Flourishing score vs. GDP per person, 22 countries [OC]",
    csv="flourish",
)

CSS = ('<style>.nid-a h2{margin:1.6em 0 .5em}.nid-a .nid-fig{margin:1.6em auto;max-width:620px}.nid-a .nid-fig img{width:100%;'
       'height:auto;display:block;border:1px solid #e6e3dd;border-radius:6px}.nid-a .nid-photo{max-width:520px}.nid-a .nid-fig '
       'figcaption{font-size:.82em;color:#5f7268;margin-top:.5em;line-height:1.4}.nid-a .nid-method{font-size:.92em;margin-top:2em}</style>')

for folder, S in STORIES.items():
    base = f"https://stories.thenewsindata.com/{folder}/"
    out = [CSS + '<div class="nid-a">']
    md = [f"=== {folder} | {S['section']}\n# {S['title']}\n> {S['dek']}\n"]
    for b in S["blocks"]:
        if b[0] == "p":
            out.append(f"<p>{e(b[1])}</p>"); md.append(b[1] + "\n")
        elif b[0] == "h2":
            out.append(f"<h2>{e(b[1])}</h2>"); md.append(f"### {b[1]}\n")
        elif b[0] == "chart":
            out.append(f'<figure class="nid-fig"><img src="{base}{b[1]}" alt="{html.escape(S["alt"])}" width="1080" height="1350"></figure>')
            md.append(f"[chart: {base}{b[1]}]\n")
        elif b[0] == "img":
            out.append(f'<figure class="nid-fig"><img src="{base}{b[1]}" alt="{html.escape(b[2])}" width="1080" height="1350"></figure>')
            md.append(f"[map image: {base}{b[1]}]\n")
        elif b[0] == "map":
            out.append(f'<div class="nid-gfs-map" data-mode="{b[1]}"></div>'
                       '<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>'
                       '<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js"></script>'
                       '<script src="https://stories.thenewsindata.com/friends/map.js"></script>')
            md.append(f"[interactive world map, mode {b[1]}]\n")
        elif b[0] == "video":
            v = b[1]; vb = "https://stories.thenewsindata.com/" + v.split("-")[0] + "/"
            out.append(f'<figure class="nid-fig"><video src="{vb}{v}.mp4" poster="{vb}{v}-poster.jpg" width="1080" height="1350" '
                       f'autoplay muted loop playsinline preload="metadata" style="width:100%;height:auto;display:block;border:1px solid #e6e3dd;border-radius:6px"></video>'
                       f'<figcaption>{e(b[2])} <a href="{vb}{v}.mp4" download>Download the video</a>.</figcaption></figure>')
            md.append(f"[video: {vb}{v}.mp4]\n")
        elif b[0] == "photo":
            _, src, alt, cap, page, who, lic = b
            out.append(f'<figure class="nid-fig nid-photo"><img src="{src}" alt="{html.escape(alt)}" loading="lazy"><figcaption>'
                       f'{e(cap)} Photo: <a href="{page}">{e(who)}</a>, {lic}.</figcaption></figure>')
            md.append(f"[photo: {cap} Photo: {who}, {lic}, {page}]\n")
    out.append("<h2>Notes and calculations</h2>")
    out += [f"<p>{e(n)}</p>" for n in S["notes"]]
    out.append(f'<p class="nid-method"><em>{S["method"]}</em></p></div>')
    open(f"{REPO}/{folder}/post-body.html", "w", encoding="utf-8").write("\n".join(out))
    md.append("### Notes and calculations\n" + "\n".join("- " + n for n in S["notes"]) + "\n")
    md.append(f"*{S['method']}*\n")
    md.append(f"**Alt text:** {S['alt']}\n\n**Excerpt:** {S['excerpt']}\n\n**Slug:** {S['slug']}\n\n**Reddit title:** {S['reddit_title']}\n")
    S["md"] = "\n".join(md)
    # CSV
    src = f"/home/claude/gfs/{S['csv']}.csv"
    with open(src) as fi, open(f"{REPO}/data/{S['slug']}.csv", "w") as fo:
        fo.write(fi.read())
    words = " ".join(b[1] for b in S["blocks"] if b[0] == "p").split()
    print(folder, "words", len(words), "alt", len(S["alt"]), "excerpt", len(S["excerpt"]))

json.dump({k: {x: v[x] for x in ("slug", "title", "section", "card", "md")} for k, v in STORIES.items()},
          open("/home/claude/gfs/stories_meta.json", "w"), indent=1)
