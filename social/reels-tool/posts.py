"""The nine launch reels. Usage: python3 posts.py <name> [still times...]"""
import sys, os, csv
import pandas as pd
from engine import *
from charts import *

D = "/home/claude/ig/data/"
R = "/home/claude/newsindata-stories/data/"
OUT = "/home/claude/ig/out/"
os.makedirs(OUT, exist_ok=True)

_energy = None


def energy():
    global _energy
    if _energy is None:
        e = pd.read_csv(D + "owid-energy-data.csv")
        _energy = e
    return _energy


def countries(col, y0, y1, keep=16):
    e = energy()
    c = e[e.iso_code.notna() & ~e.iso_code.astype(str).str.startswith("OWID") & e.year.between(y0, y1)]
    best = c.groupby("country")[col].max().nlargest(keep).index
    return {n: dict(zip(g.year, g[col])) for n, g in c[c.country.isin(best)].groupby("country")}


def twh(v, short=False):
    if short:
        return f"{v:,.0f}"
    return f"{v:,.0f} TWh" if v >= 10 else f"{v:,.1f} TWh"


def solar():
    s = countries("solar_electricity", 2005, 2025, keep=18)
    return bar_race(
        s, range(2005, 2026), kicker="Science · Energy",
        title=["Which Countries Make", "The Most Solar Power?"],
        subtitle=["Electricity from solar, terawatt-hours per year"],
        source="Source: Ember, Energy Institute via Our World in Data",
        unit_fmt=twh, sec_per_year=0.62,
        end_note=["China made 1,175 TWh", "in 2025, three times", "as much as the U.S."])


def coal():
    s = countries("coal_consumption", 1965, 2024, keep=20)
    return bar_race(
        s, range(1965, 2025), kicker="Science · Energy",
        title=["Which Countries", "Burn The Most Coal?"],
        subtitle=["Coal consumption, terawatt-hours of energy per year"],
        source="Source: Energy Institute via Our World in Data",
        unit_fmt=twh, sec_per_year=0.27,
        end_note=["China burned 56% of", "the world's coal in 2024,", "more than every other", "country combined"])


def renew():
    e = energy()
    w = e[(e.country == "World") & e.year.between(1985, 2025)].sort_values("year")
    yrs = w.year.values
    def f(v, tip=False):
        return f"{v:,.0f} TWh" if tip else f"{v:,.0f}"
    lines = [dict(name="Coal", ys=w.coal_electricity.values, color="#4B4F54", lw=6, label_dy=30),
             dict(name="Renewables", ys=w.renewables_electricity.values, color=GREEN, lw=8, label_dy=-34),
             dict(name="Nuclear", ys=w.nuclear_electricity.values, color=BLUE, lw=6)]
    return line_race(yrs, lines, kicker="Science · Energy",
                     title=["Renewables Passed Coal", "As A Power Source In 2025"],
                     subtitle=["World electricity generation, terawatt-hours per year"],
                     source="Source: Ember, Energy Institute via Our World in Data",
                     y_fmt=f, x_label_fmt=str, ymax=12000, y_step=2000, anim=10.0,
                     ticks_x=[1985, 1995, 2005, 2015, 2025],
                     end_note=["Renewables passed coal", "for the first time, while", "nuclear output stayed flat"],
                     note_xy=(540, 760))


def luka():
    rows = list(csv.DictReader(open(R + "top-scoring-seasons-ts.csv")))[:10]
    items = [(r["player"], r["season"], float(r["ppg"])) for r in rows]
    return rank_reveal(items, kicker="Sports · NBA",
                       title=["The 10 Highest-Scoring", "Seasons In NBA History"],
                       subtitle=["Points per game. Dončić's 2026-27 season is", "through Nov. 6, his first nine games"],
                       source="Source: Basketball-Reference",
                       val_fmt=lambda v: f"{v:.1f}", highlight={"Luka Dončić"},
                       notes={"Luka Dončić": "9 games in"}, per_item=0.5, slot=78, xmax=52)


def travel():
    items = [("Cars and light trucks", "", 0.509), ("Passenger trains", "", 0.0249),
             ("Buses", "", 0.0103), ("U.S. airlines", "", 0.000354)]
    fmt = {0.509: "0.51", 0.0249: "0.025", 0.0103: "0.010", 0.000354: "0.0004"}
    return rank_reveal(items, kicker="Trending · Travel",
                       title=["How Deadly Is Each", "Way To Travel?"],
                       subtitle=["Deaths per 100 million passenger-miles,", "U.S. average, 2015–2024"],
                       source="Source: National Safety Council, Injury Facts",
                       val_fmt=lambda v: fmt[v], highlight={"U.S. airlines"},
                       notes={"Passenger trains": "20 times safer", "Buses": "49 times safer",
                              "U.S. airlines": "about 1,400 times safer"},
                       per_item=0.8, slot=150, label_w=330, xmax=0.509,
                       end_note=["Per mile, a U.S. airline flight is about", "1,400 times safer than a car ride"])


def aging():
    items = [("Jimmy Carter", "1977–81", 1.45, .60), ("Bill Clinton", "1993–2001", 1.37, .37),
             ("Richard Nixon", "1969–74", 1.30, .27), ("Joe Biden", "2021–25", 1.12, .51),
             ("Barack Obama", "2009–17", 0.88, .29), ("Ronald Reagan", "1981–89", 0.74, .23),
             ("George W. Bush", "2001–09", 0.70, .18), ("George H.W. Bush", "1989–93", 0.32, .44),
             ("Donald Trump", "first term", 0.23, .66)]
    return rank_reveal([(a, b, v) for a, b, v, _ in items], kicker="Trending · Politics",
                       title=["Which Presidents Appeared", "To Age Fastest In Office?"],
                       subtitle=["Apparent years of aging per year in office, from", "a face model's reading of 7,000 photos"],
                       source="Lines show ±1 standard error. Analysis of Wikimedia Commons photos",
                       val_fmt=lambda v: f"{v:.2f}", highlight={"Jimmy Carter", "Bill Clinton", "Richard Nixon"},
                       ref=(1.0, "1 year per year"), per_item=0.45, slot=86, xmax=2.15, label_w=360,
                       err=[e for *_, e in items])


TILES = {"AK": (0, 0), "ME": (11, 0), "WI": (6, 1), "VT": (10, 1), "NH": (11, 1),
         "WA": (1, 2), "ID": (2, 2), "MT": (3, 2), "ND": (4, 2), "MN": (5, 2), "IL": (6, 2), "MI": (7, 2),
         "NY": (9, 2), "MA": (10, 2), "OR": (1, 3), "NV": (2, 3), "WY": (3, 3), "SD": (4, 3), "IA": (5, 3),
         "IN": (6, 3), "OH": (7, 3), "PA": (8, 3), "NJ": (9, 3), "CT": (10, 3), "RI": (11, 3),
         "CA": (1, 4), "UT": (2, 4), "CO": (3, 4), "NE": (4, 4), "MO": (5, 4), "KY": (6, 4), "WV": (7, 4),
         "VA": (8, 4), "MD": (9, 4), "DE": (10, 4), "AZ": (2, 5), "NM": (3, 5), "KS": (4, 5), "AR": (5, 5),
         "TN": (6, 5), "NC": (7, 5), "SC": (8, 5), "DC": (9, 5), "OK": (4, 6), "LA": (5, 6), "MS": (6, 6),
         "AL": (7, 6), "GA": (8, 6), "HI": (0, 7), "TX": (4, 7), "FL": (9, 7)}


def mix(c1, c2, f):
    a = [int(c1[i:i + 2], 16) for i in (1, 3, 5)]
    b = [int(c2[i:i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(x + (y - x) * f):02x}" for x, y in zip(a, b))


def turnout():
    rows = list(csv.DictReader(open(R + "midterm-turnout-in-2022-ranged-from-31-in-tennessee-to-62-in-oregon.csv")))
    v = {r["state"]: float(r["vep_turnout_2022_pct"]) for r in rows}
    order = sorted(v, key=v.get)
    lo, hi = 30, 63
    def color(x):
        return mix("#E3F0E9", "#00452F", (x - lo) / (hi - lo))
    intro, per, hold = 1.0, 0.16, 4.0
    dur = intro + len(order) * per + 0.6 + hold
    TS, GAP, X0, Y0 = 76, 8, 36, 760

    def draw(c, t):
        brand_block(c)
        header(c, "Trending · Midterms", ["Which States Vote The Most", "In Midterm Elections?"],
               ["Share of eligible voters who cast a ballot in 2022"])
        k = int(min(max((t - intro) / per, 0), len(order)))
        cur = v[order[k - 1]] if k else lo
        scrubber(c, 640, lo, hi, cur, label=f"{cur:.0f}%" if k else "", ticks=[30, 40, 50, 60])
        done = t > intro + len(order) * per + 0.6
        hl = ease((t - intro - len(order) * per - 0.6) / 0.8)
        for st, (cx, cy) in TILES.items():
            x = X0 + cx * (TS + GAP) + 6
            y = Y0 + cy * (TS + GAP)
            idx = order.index(st)
            t0 = intro + idx * per
            g = ease_out((t - t0) / 0.35)
            c.rect(x, y, TS, TS, "#EEF3F0", z=2, radius=8)
            if g > 0:
                val = v[st]
                col = color(val)
                c.rect(x, y, TS, TS, col, z=3, alpha=g, radius=8)
                dark = (val - lo) / (hi - lo) > 0.45
                tc = "white" if dark else INK
                c.text(x + TS / 2, y + 33, st, size=25, weight="bold", ha="center", color=tc, alpha=g, z=4)
                c.text(x + TS / 2, y + 60, f"{val:.0f}", size=21, ha="center", color=tc, alpha=g, z=4)
            else:
                c.text(x + TS / 2, y + 45, st, size=24, ha="center", color="#B8C4BE", z=4)
            if st in ("TN", "OR") and hl > 0:
                c.line([x - 4, x + TS + 4, x + TS + 4, x - 4, x - 4], [y - 4, y - 4, y + TS + 4, y + TS + 4, y - 4],
                       color=INK, lw=4, z=6, alpha=hl)
        # legend
        ly = Y0 + 8 * (TS + GAP) + 40
        for j in range(60):
            c.rect(250 + j * 10, ly, 10.5, 22, color(lo + (hi - lo) * j / 59), z=2)
        for tv in (30, 40, 50, 60):
            c.text(250 + (tv - lo) / (hi - lo) * 600, ly + 52, f"{tv}%", size=21, color=MUTED, ha="center")
        if hl > 0:
            note_card(c, ["Oregon 62%, Tennessee 31%", "Highest and lowest"], Y0 + 2, hl, x_right=X0 + 6 * (TS + GAP) - 4, size=26)
        footer(c, "Source: University of Florida Election Lab")
        bottom_band(c)
    return draw, dur


def midterms():
    rows = [r for r in csv.DictReader(open(R + "the-presidents-party-has-lost-house-seats-in-18-of-the-20-midterms-since-world-war-ii.csv")) if int(r["year"]) >= 1946]
    n = len(rows)
    intro, per, hold = 1.0, 0.5, 4.0
    dur = intro + n * per + 0.5 + hold
    L, Rr, Y0, PX = 90, 1000, 860, 8.2   # zero line, px per seat
    colw = (Rr - L) / n
    bw = colw * 0.7

    def draw(c, t):
        brand_block(c)
        header(c, "Trending · Midterms", ["The President's Party Lost", "House Seats In 18 Of 20 Midterms"],
               ["House seats gained or lost by the president's party,", "every midterm since World War II"], title_size=58)
        prog = min(max((t - intro) / per, 0), n)
        yr = 1946 + 4 * min(prog, n - 1)
        scrubber(c, 660, 1946, 2022, yr, label=str(int(1946 + 4 * int(min(prog, n - 1)))) if prog > 0 else "",
                 ticks=[1946, 1970, 1994, 2022])
        for sv in (0, -20, -40, -60):
            c.line([L - 10, Rr], [Y0 - sv * PX, Y0 - sv * PX], color=RULE if sv == 0 else GRID, lw=2.5 if sv == 0 else 2, z=1)
            c.text(L - 18, Y0 - sv * PX + 8, f"{sv:+d}" if sv else "0", size=21, color=FAINT, ha="right")
        losses = 0
        for i, r in enumerate(rows):
            g = ease_out(prog - i) if prog > i else 0
            x = L + i * colw + (colw - bw) / 2
            ch = int(r["house_seat_change"])
            col = BLUE if r["party"] == "D" else RED
            if g > 0:
                h = ch * PX * g
                if ch < 0:
                    c.rect(x, Y0, bw, -h, col, z=3, radius=3)
                    c.text(x + bw / 2, Y0 - h + 26, str(ch), size=19, ha="center", color=col, alpha=g, weight="bold")
                    losses += 1 if prog >= i + 0.5 else 0
                else:
                    c.rect(x, Y0 - h, bw, h, col, z=3, radius=3)
                    c.text(x + bw / 2, Y0 - h - 10, f"+{ch}", size=19, ha="center", color=col, alpha=g, weight="bold")
            if i % 2 == 0 or i == n - 1:
                c.text(x + bw / 2, Y0 - 16 if ch < 0 else Y0 + 28, "'" + r["year"][2:], size=19, ha="center", color=FAINT)
        shown = sum(1 for i in range(n) if prog >= i + 0.5)
        c.text(Rr, Y0 + 70 * PX + 70, f"Lost seats in {losses} of {shown} midterms" if shown else "",
               size=30, ha="right", weight="bold", color=INK)
        c.rect(L, Y0 + 70 * PX + 50, 22, 22, BLUE, z=3); c.text(L + 32, Y0 + 70 * PX + 70, "Democratic president", size=22, color=MUTED)
        c.rect(L, Y0 + 70 * PX + 88, 22, 22, RED, z=3); c.text(L + 32, Y0 + 70 * PX + 108, "Republican president", size=22, color=MUTED)
        footer(c, "Source: American Presidency Project, UC Santa Barbara")
        bottom_band(c)
    return draw, dur


def trust():
    xs = [2016.1, 2017.2, 2018.2, 2019.5, 2019.85, 2021.45, 2022.6, 2024.7, 2025.2, 2025.7, 2026.7]
    rows = list(csv.DictReader(open(R + "trust-in-news.csv")))
    col = lambda k: [float(r[k]) for r in rows]
    lines = [dict(name="Democrats", ys=col("national_dem"), color=BLUE, lw=5, dots=True),
             dict(name="All adults", ys=col("national_all"), color=GREEN, lw=8, dots=True, label_dy=4),
             dict(name="Republicans", ys=col("national_rep"), color=RED, lw=5, dots=True)]
    return line_race(xs, lines, kicker="Trending · Media",
                     title=["Trust In National News Is Up", "To 62%, Below 2016's 76%"],
                     subtitle=["Share of U.S. adults who trust information from", "national news outlets a lot or some"],
                     source="Source: Pew Research Center surveys, 2016–2026",
                     y_fmt=lambda v, tip=False: f"{v:.0f}%", x_label_fmt=lambda v: str(int(v)), ymax=100, y_step=20,
                     ticks_x=[2016, 2018, 2020, 2022, 2024, 2026], anim=9.0,
                     scrub_label=lambda v: str(int(v)),
                     end_note=["Up 6 points in a year,", "still 14 below 2016"], note_xy=(1000, 1250))


POSTS = {"solar": solar, "coal": coal, "renew": renew, "luka": luka, "travel": travel,
         "aging": aging, "turnout": turnout, "midterms": midterms, "trust": trust}



# ---------------------------------------------------------------- batch 2 (Nov. 7)
PRIME = [("Cowboys",4,4,5,4,5),("Chiefs",4,3,4,5,4),("Chargers",5,4,4,3,2),("Eagles",4,5,2,3,4),("49ers",4,3,4,4,3),
 ("Bills",2,5,4,3,3),("Packers",5,4,2,3,3),("Ravens",3,3,3,4,2),("Steelers",3,2,3,4,3),("Lions",1,1,5,4,3),
 ("Vikings",1,4,3,3,3),("Giants",2,4,2,2,3),("Buccaneers",4,1,3,3,2),("Bears",2,2,2,3,3),("Bengals",2,3,4,1,2),
 ("Broncos",3,3,1,2,2),("Rams",2,1,3,2,3),("Commanders",2,0,2,4,3),("Falcons",0,0,4,4,2),("Dolphins",2,4,2,2,0),
 ("Seahawks",1,2,2,2,3),("Patriots",2,2,0,3,2),("Texans",0,0,3,3,2),("Raiders",1,4,1,2,0),("Jets",0,4,3,1,0),
 ("Colts",3,0,1,1,1),("Jaguars",0,2,1,1,2),("Saints",2,1,2,0,1),("Cardinals",3,0,1,1,0),("Panthers",0,1,0,1,2),
 ("Titans",2,1,1,0,0),("Browns",1,1,1,0,0)]
SEASON_COL = ["#CFE7DC", "#9CCFB6", "#5FAF8B", "#2E8C66", "#00573D"]


def primetime():
    assert len(PRIME) == 32 and sum(sum(t[1:]) for t in PRIME) % 2 == 0
    intro, per, hold = 1.0, 1.3, 4.0
    dur = intro + 5 * per + 0.4 + hold
    TOP, SLOT, BH, PXG = 720, 50, 32, 13.2

    def draw(c, t):
        brand_block(c)
        header(c, "Sports · NFL", ["Which NFL Teams Get", "The Most Prime-Time Games?"],
               ["Sunday and Monday night games, 2022 through", "the 2026 schedule as of Oct. 9"], title_size=58)
        prog = min(max((t - intro) / per, 0), 5)
        yr = 2022 + min(int(prog), 4)
        scrubber(c, 655, 2022, 2026, 2022 + min(prog, 5) * 4 / 5, label=str(yr) if prog > 0 else "",
                 ticks=[2022, 2023, 2024, 2025, 2026])
        for i, (team, *g) in enumerate(PRIME):
            col, row = divmod(i, 16)
            x0 = 40 + col * 520
            y = TOP + row * SLOT
            hi = i in (0, 31)
            c.text(x0 + 150, y + BH / 2 + 1, team, size=23, ha="right", va="center", color=INK,
                   weight="bold" if hi else "normal")
            x = x0 + 160
            tot = 0
            for s in range(5):
                f = ease_out(prog - s) if prog > s else 0
                w = g[s] * PXG * f
                if w > 0:
                    c.rect(x, y, w, BH, SEASON_COL[s], z=3)
                x += w
                tot += g[s] * (1 if prog >= s + 0.5 else 0)
            if prog > 0:
                c.text(x + 8, y + BH / 2 + 1, str(tot), size=23, va="center", weight="bold" if hi else "normal",
                       color=GREEN if hi else MUTED)
        ly = TOP + 16 * SLOT + 30
        for s in range(5):
            lx = 210 + s * 140
            c.rect(lx, ly - 18, 26, 22, SEASON_COL[s], z=3)
            c.text(lx + 34, ly, str(2022 + s) + ("*" if s == 4 else ""), size=22, color=MUTED)
        footer(c, "*2026 as scheduled on Oct. 9. Source: NFL schedules")
        bottom_band(c)
    return draw, dur


def _monthly(start, vals):
    y, m = start
    out = []
    for i, v in enumerate(vals):
        mm = m - 1 + i
        out.append((y + mm // 12 + (mm % 12) / 12, v))
    return out


def candy():
    candy_idx = [153.74,155.99,156.51,156.48,157.66,159.01,157.50,158.20,157.38,158.62,158.70,158.33,159.02,159.10,158.97,161.32,164.70,166.66,168.71,170.25,168.90,168.49,169.69,173.14,176.42,179.92,181.49,182.05,183.81,187.00,186.57,186.64,187.33,187.95,192.06,192.34,193.06,193.49,192.18,193.40,193.97,195.84,197.36,194.93,194.82,194.50,194.24,195.05,195.71,194.16,197.21,199.56,201.15,206.48,205.26,205.39,207.00,206.98,209.94,209.60,211.60,213.10,None,219.80,221.33,221.87,229.11,227.06,222.77,226.25,230.04,229.76,228.79]
    cpi = [259.918,260.280,260.388,260.229,260.474,261.582,263.014,264.877,267.054,269.195,271.696,273.003,273.567,274.310,276.589,277.948,278.802,281.148,283.716,287.504,289.109,292.296,296.311,296.276,296.171,296.808,298.012,297.711,296.797,299.170,300.840,301.836,303.363,304.127,305.109,305.691,307.026,307.789,307.671,307.051,306.746,308.417,310.326,312.332,313.548,314.069,314.175,314.540,314.796,315.301,315.664,315.493,315.605,317.671,319.082,319.799,320.795,321.465,322.561,323.048,323.976,324.800,None,324.122,324.054,325.252,326.785,330.213,333.020,335.123,333.952,333.918,334.980]
    ahe = [29.49,29.51,29.54,29.64,29.91,29.93,30.05,30.03,30.22,30.41,30.54,30.66,30.78,30.98,31.14,31.23,31.39,31.60,31.64,31.80,31.96,32.10,32.19,32.34,32.44,32.57,32.70,32.82,32.94,33.02,33.15,33.27,33.43,33.50,33.69,33.85,33.89,34.01,34.08,34.17,34.29,34.47,34.52,34.65,34.76,34.89,35.01,35.08,35.22,35.34,35.46,35.60,35.69,35.84,35.94,36.11,36.12,36.28,36.36,36.47,36.62,36.70,36.85,37.00,37.02,37.15,37.27,37.35,37.41,37.49,37.59,37.64,37.76]
    def fill(a):  # Oct. 2025 was not collected (shutdown): interpolate
        a = list(a)
        for i, v in enumerate(a):
            if v is None:
                a[i] = (a[i - 1] + a[i + 1]) / 2
        return a
    candy_idx, cpi = fill(candy_idx), fill(cpi)
    assert len(candy_idx) == len(cpi) == len(ahe) == 73
    xs = [2020 + 7 / 12 + i / 12 for i in range(73)]
    pct = lambda a: [(v / a[0] - 1) * 100 for v in a]
    lines = [dict(name="Candy", ys=pct(candy_idx), color=GREEN, lw=8, label_dy=-6),
             dict(name="All prices", ys=pct(cpi), color="#4B4F54", lw=5, label_dy=-30),
             dict(name="Wages", ys=pct(ahe), color=BLUE, lw=5, label_dy=34)]
    assert round(pct(candy_idx)[-1], 1) == 48.8 and round(pct(cpi)[-1], 1) == 28.9 and round(pct(ahe)[-1], 1) == 28.0
    return line_race(xs, lines, kicker="Business · Prices",
                     title=["Candy Prices Are Up 49%", "Since 2020"],
                     subtitle=["Change in prices and wages since August 2020"],
                     source="Source: Bureau of Labor Statistics",
                     y_fmt=lambda v, tip=False: (f"+{v:.0f}%" if v > 0 else "0") if not tip else f"+{v:.1f}%",
                     x_label_fmt=lambda v: str(int(v)), ymax=55, y_step=10, anim=9.5,
                     ticks_x=[2021, 2022, 2023, 2024, 2025, 2026], scrub_label=lambda v: str(int(v)),
                     end_note=["$50 of candy in Aug. 2020", "cost $74.41 in Aug. 2026"], note_xy=(600, 760))


def canada():
    rows = list(csv.DictReader(open(R + "canadians-made-25-fewer-trips-to-the-us-this-year-than-in-2024-while-their-trips-elsewhere-rose-12.csv")))
    xs = [int(r["month"][:4]) + (int(r["month"][5:]) - 1) / 12 for r in rows]
    us = [float(r["canada_total_return_from_us"]) / 1e6 for r in rows]
    oth = [float(r["canada_return_from_other_countries"]) / 1e6 for r in rows]
    jan_aug = lambda y: sum(u for x, u in zip(xs, us) if int(x) == y and x - int(x) < 0.6)
    assert round(jan_aug(2026), 1) == 19.9 and round(jan_aug(2024), 1) == 26.6
    lines = [dict(name="To the U.S.", ys=us, color=RED, lw=7, label_dy=-6),
             dict(name="Elsewhere", ys=oth, color=GREEN, lw=6, label_dy=10)]
    return line_race(xs, lines, kicker="Trending · Travel",
                     title=["Canadians Are Still", "Skipping Trips To The U.S."],
                     subtitle=["Canadian residents' return trips each month, millions"],
                     source="Source: Statistics Canada, table 24-10-0053-01",
                     y_fmt=lambda v, tip=False: f"{v:.1f}M" if tip else f"{v:.0f}M",
                     x_label_fmt=lambda v: str(int(v)), ymax=4.5, y_step=1, anim=10.0,
                     ticks_x=[2023, 2024, 2025, 2026], scrub_label=lambda v: str(int(v)),
                     events=[(2025 + 2 / 12, "U.S. tariffs take effect")],
                     end_note=["19.9M trips to the U.S. so far", "in 2026, 25% fewer than 2024"],
                     note_xy=(862, 1332))


def youth():
    data = [(2018, 67, 32, "Edison"), (2022, 63, 35, "Edison"), (2024, None, None, "Edison"), (2026, 66, 31, "NORC")]
    margins = {2018: 35, 2022: 28, 2024: 14, 2026: 35}
    intro, per, hold = 1.0, 1.3, 4.2
    dur = intro + 4 * per + 0.5 + hold
    Y0, PX = 1430, 14.5   # baseline, px per point of margin
    xs = {2018: 230, 2022: 430, 2024: 630, 2026: 830}
    BW = 150

    def draw(c, t):
        brand_block(c)
        header(c, "Trending · Midterms", ["Young Voters Swung Back To", "Democrats By 35 Points"],
               ["Democratic margin among voters 18–29", "in U.S. House races"], title_size=60)
        prog = min(max((t - intro) / per, 0), 4)
        k = min(int(prog), 3)
        yrs = [2018, 2022, 2024, 2026]
        scrubber(c, 655, 2018, 2026, 2018 + min(prog / 4, 1) * 8, label=str(yrs[k]) if prog > 0 else "",
                 ticks=yrs)
        for v in (0, 10, 20, 30, 40):
            yy = Y0 - v * PX
            c.line([110, 980], [yy, yy], color=RULE if v == 0 else GRID, lw=2.5 if v == 0 else 2, z=1)
            c.text(98, yy + 8, f"D+{v}" if v else "0", size=21, color=FAINT, ha="right")
        for i, y in enumerate(yrs):
            g = ease_out(prog - i) if prog > i else 0
            if g <= 0:
                c.text(xs[y], Y0 + 42, str(y), size=26, ha="center", color=FAINT)
                continue
            m = margins[y]
            h = m * PX * g
            col = GREEN if y == 2026 else (BLUE if y != 2024 else "#7FA0C4")
            c.rect(xs[y] - BW / 2, Y0 - h, BW, h, col, z=3, radius=6)
            c.text(xs[y], Y0 - h - 18, f"D+{round(m * g)}", size=34, ha="center", weight="bold", color=col)
            c.text(xs[y], Y0 + 42, str(y), size=26, ha="center", color=INK, weight="bold" if y == 2026 else "normal")
            sub = {2018: "67% to 32%", 2022: "63% to 35%", 2024: "Edison", 2026: "66% to 31%"}[y]
            c.text(xs[y], Y0 + 74, sub, size=21, ha="center", color=MUTED)
        if t > intro + 4 * per + 0.5:
            a = ease((t - intro - 4 * per - 0.5) / 0.8)
            note_card(c, ["Young women: 70% Democratic", "Young men: 59% D, 37% R"], 735, a, x_right=575, size=26)
        footer(c, "Source: CIRCLE (Tufts); Edison exit polls 2018–24, NORC 2026")
        bottom_band(c)
    return draw, dur


def senate():
    from senate_data import seats, age, NEW, LEADERS
    S = seats()
    people = []   # (key, age, party, phase) phase: stay / leave / new / newpending
    for s in S:
        a = age(s["dob"])
        replaced = s["up"] and (s["st"] in NEW or s["st"] in LEADERS) and not (s["st"] == "OH" and s["cl"] == "1")
        people.append(dict(name=s["name"], age=a, party=s["party"], kind="leave" if replaced else "stay"))
        if replaced:
            n = NEW.get(s["st"]) or LEADERS[s["st"]]
            people.append(dict(name=n[0], age=age(n[2]), party=n[1], kind="pending" if s["st"] in LEADERS else "new"))
    LO, HI = 34, 96
    BIN = 2
    X0, X1, BASE, R_ = 90, 990, 1380, 12.5
    nb = int((HI - LO) / BIN)
    bw = (X1 - X0) / nb

    def layout(members):
        pos = {}
        bins = {}
        for p in sorted(members, key=lambda p: ({"D": 0, "I": 1, "R": 2}[p["party"]], p["age"])):
            b = int((p["age"] - LO) // BIN)
            k = bins.get(b, 0)
            bins[b] = k + 1
            pos[id(p)] = (X0 + (b + 0.5) * bw, BASE - R_ - k * (2 * R_ + 2))
        return pos
    before = [p for p in people if p["kind"] in ("stay", "leave")]
    after = [p for p in people if p["kind"] in ("stay", "new", "pending")]
    pb, pa = layout(before), layout(after)
    mean_b = sum(p["age"] for p in before) / 100
    mean_a = sum(p["age"] for p in after) / 100
    u50_b = sum(p["age"] < 50 for p in before)
    u50_a = sum(p["age"] < 50 for p in after)
    assert len(after) == 100 and round(mean_b, 1) == 66.1 and round(mean_a, 1) == 63.3
    COL = {"D": BLUE, "R": RED, "I": "#7A5C99"}
    T_IN, T_HL, T_OUT, T_NEW, T_END = 1.2, 3.0, 6.0, 8.6, 12.0
    dur = T_END + 4.5
    LABELS_B = {"Chuck Grassley": "Grassley, 93", "Mitch McConnell": "McConnell, 84", "Dick Durbin": "Durbin, 82",
                "Jon Ossoff": "Ossoff, 39"}
    LABELS_A = {"James Talarico": "Talarico, 37", "Abdul El-Sayed": "El-Sayed, 42", "Chuck Grassley": "Grassley, 93"}

    def draw(c, t):
        brand_block(c)
        header(c, "Trending · Politics", ["The Senate Is About", "To Get Younger"],
               ["Ages of all 100 senators on Jan. 3, 2027, before", "and after the 2026 election"], title_size=60)
        mv = ease((t - T_NEW) / 2.4)
        cur = mean_b + (mean_a - mean_b) * mv
        scrubber(c, 655, 60, 68, cur, label=f"Average {cur:.1f}", ticks=[60, 62, 64, 66, 68])
        # axis
        c.line([X0, X1], [BASE + 4, BASE + 4], color=RULE, lw=2.5, z=1)
        for a in range(40, 97, 10):
            x = X0 + (a - LO) / BIN * bw
            c.line([x, x], [BASE + 4, BASE + 14], color=FAINT, lw=2, z=1)
            c.text(x, BASE + 46, str(a), size=22, color=MUTED, ha="center")
        c.text(W / 2, BASE + 84, "Age", size=22, color=FAINT, ha="center")
        # mean markers
        for m, a_, lab in ((mean_b, 1 - mv * 0.65, "Before"), (mean_a, mv, "After")):
            if a_ <= 0.02:
                continue
            x = X0 + (m - LO) / BIN * bw
            c.line([x, x], [BASE - 470, BASE + 4], color=INK if lab == "After" else FAINT, lw=2.5, dash=(5, 5), z=2, alpha=a_)
            c.text(x, BASE - 482, f"{lab}: {m:.1f}", size=22, ha="center", color=INK if lab == "After" else MUTED,
                   alpha=a_, weight="bold" if lab == "After" else "normal")
        appear = ease_out((t - 0.2) / T_IN)
        for p in people:
            k = p["kind"]
            col = COL[p["party"]]
            if k in ("stay", "leave"):
                x0, y0 = pb[id(p)]
                if k == "stay":
                    x1, y1 = pa[id(p)]
                    f = ease((t - T_NEW - 0.3) / 1.2)
                    x, y = x0 + (x1 - x0) * f, y0 + (y1 - y0) * f
                    c.circle(x, y, R_ * appear, col, z=4, alpha=appear)
                else:
                    hl = ease((t - T_HL) / 0.6)
                    out = ease((t - T_OUT) / 1.6)
                    if out >= 1:
                        continue
                    y = y0 - out * 260
                    c.circle(x0, y, R_ * appear, col, z=5, alpha=appear * (1 - out) * (1 - 0.15 * hl))
                    if hl > 0:
                        c.circle(x0, y, R_ + 4, "none", ec=GREEN_LT if False else "#E0B030", lw=4, z=6, alpha=hl * (1 - out))
            else:
                f = ease_out((t - T_NEW - 0.2 * (p["age"] % 1)) / 1.1)
                if f <= 0:
                    continue
                x1, y1 = pa[id(p)]
                y = y1 - (1 - f) * 320
                if k == "new":
                    c.circle(x1, y, R_, col, z=5, alpha=f)
                    c.circle(x1, y, R_ + 4, "none", ec=GREEN, lw=4, z=6, alpha=f)
                else:
                    c.circle(x1, y, R_, "white", ec=col, lw=4, z=5, alpha=f)
        # labels
        UP = {"Abdul El-Sayed": 46, "Mitch McConnell": 46}
        def lab(name, text, layout_, alpha):
            p = next(q for q in people if q["name"] == name)
            if id(p) not in layout_:
                return
            x, y = layout_[id(p)]
            d = UP.get(name, 0)
            c.line([x, x], [y - R_ - 4, y - R_ - 40 - d], color=MUTED, lw=1.5, z=6, alpha=alpha)
            c.text(x, y - R_ - 48 - d, text, size=21, ha="center", color=INK, alpha=alpha, z=7)
        a1 = ease((t - T_IN) / 0.6) * (1 - ease((t - T_OUT) / 0.6))
        for n, s_ in LABELS_B.items():
            if a1 > 0:
                lab(n, s_, pb, a1)
        a2 = ease((t - T_NEW - 1.4) / 0.6)
        for n, s_ in LABELS_A.items():
            if a2 > 0:
                lab(n, s_, pa, a2)
        # status line
        if T_HL <= t < T_NEW:
            a = ease((t - T_HL) / 0.5)
            c.text(W / 2, 745, "19 senators are leaving, gold rings", size=27, ha="center", color=INK, alpha=a)
        elif t >= T_NEW:
            a = ease((t - T_NEW) / 0.5)
            c.text(W / 2, 745, "19 arriving, green rings", size=27, ha="center", color=INK, alpha=a)
        if t > T_END:
            a = ease((t - T_END) / 0.8)
            note_card(c, [f"Under 50: {u50_b} senators now,", f"{u50_a} in January", "Talarico, 37, will be the youngest"],
                      790, a, x_right=1010, size=25)
        lx = 250
        for lbl, cc in (("Democrat", BLUE), ("Republican", RED), ("Independent", "#7A5C99")):
            c.circle(lx, 1503, 9, cc, z=4)
            c.text(lx + 16, 1511, lbl, size=21, color=MUTED)
            lx += 30 + c.text_width(lbl, 21) + 24
        c.text(W / 2, 1546, "Hollow dots: Alaska and Mississippi leaders, races not yet called", size=19, color=MUTED, ha="center")
        footer(c, "Source: Wikidata birth dates; AP calls via NBC News")
        bottom_band(c)
    return draw, dur


POSTS.update({"primetime": primetime, "candy": candy, "canada": canada, "youth": youth, "senate": senate})


def nbalead():
    rows = list(csv.DictReader(open("/home/claude/research/nbalead/lead.csv")))
    xs = [int(r["lead"]) for r in rows]
    ys = [100 * int(r["wins"]) / int(r["games"]) for r in rows]
    assert xs == list(range(1, 31)) and round(ys[5], 1) == 63.0 and round(ys[9], 1) == 74.4 and round(ys[19], 1) == 94.8
    lines = [dict(name="Won", ys=ys, color=GREEN, lw=8, dots=True, label_dy=-4)]
    return line_race(xs, lines, kicker="Sports \u00b7 NBA",
                     title=["How Safe Is An", "NBA Lead?"],
                     subtitle=["How often the first team to reach each lead", "won the game, 2021-22 through 2025-26"],
                     source="Source: NBA play-by-play, 6,150 games",
                     y_fmt=lambda v, tip=False: (f"{v:.1f}%" if tip and v > 99 else f"{v:.0f}%"),
                     x_label_fmt=lambda v: f"{v} points" if v == 30 else str(v), ymax=100, y_step=25, anim=9.0,
                     ticks_x=[1, 6, 10, 15, 20, 25, 30],
                     scrub_label=lambda v: f"{int(round(v))}-point lead",
                     events=[(6, "63%"), (10, "74%"), (15, "87%"), (20, "95%")],
                     end_note=["The first team to lead by 10", "wins 3 games out of 4", "By 20, it wins 19 of 20"],
                     note_xy=(830, 1215))

POSTS.update({"nbalead": nbalead})


def flock():
    rows = list(csv.DictReader(open(R + "georgia-has-80-flock-license-plate-cameras-per-100000-residents-the-most-of-any-state.csv")))[:51]
    assert rows[0]["abbr"] == "GA" and rows[0]["cameras_per_100k_pew"] == "80" and rows[-1]["abbr"] == "AK"
    st = [(r["abbr"], float(r["cameras_per_100k_pew"])) for r in rows]
    GA_ = 2.399963
    CELL, X0, Y0, PITCH = 80, 60, 770, 108
    C, RD = 0.056 * CELL, 3.1
    intro, anim, hold = 0.9, 8.5, 4.0
    pos = {}
    for ab, v in st:
        col, row = TILES[ab]
        cx, cy = X0 + (col + 0.5) * CELL, Y0 + row * PITCH
        n = int(v)
        pts = [(cx + C * math.sqrt(k + 0.5) * math.cos(k * GA_), cy - C * math.sqrt(k + 0.5) * math.sin(k * GA_)) for k in range(n)]
        pos[ab] = (cx, cy, n, v, pts)
    top = {"GA", "OH", "TX", "IN", "AL"}

    def draw(c, t):
        brand_block(c)
        header(c, "Trending \u00b7 Privacy", ["Which States Have The", "Most Flock Cameras?"],
               ["License plate readers per 100,000 residents,", "mapped on OpenStreetMap, September 2026"])
        p = min(max((t - intro) / anim, 0), 1)
        cur = 80 * (p ** 1.25)
        scrubber(c, 660, 0, 80, cur, label=f"{int(cur)} per 100,000", ticks=[0, 20, 40, 60, 80])
        xs, ys = [], []
        for ab, (cx, cy, n, v, pts) in pos.items():
            k = min(n, int(cur))
            xs += [a for a, _ in pts[:k]]; ys += [b for _, b in pts[:k]]
            done = cur >= n and t > intro
            if n == 0:
                c.circle(cx, cy, RD, BG, ec=GREEN, lw=1.5)
            c.text(cx - 3, cy + 58, ab, size=19, weight="bold", ha="right", color=INK if done else FAINT)
            if done:
                lab = "0.1" if ab == "AK" else str(n)
                c.text(cx + 3, cy + 58, lab, size=19, ha="left", color=GREEN if ab in top else MUTED,
                       weight="bold" if ab in top else "normal")
        if xs:
            c.ax.scatter(xs, ys, s=(2 * RD * PT) ** 2, c=GREEN, linewidths=0, zorder=4)
        c.circle(330, 762, 7, GREEN)
        c.text(350, 771, "= 1 camera per 100,000 residents", size=25, color=INK)
        a = ease((t - intro - anim - 0.3) / 0.8)
        if a > 0:
            note_card(c, ["Georgia: 80 per 100,000", "New Hampshire: 1", "U.S. overall: 32"], 800, a, x_right=520, size=24)
        footer(c, "Source: Pew Research Center, OpenStreetMap")
        bottom_band(c)

    return draw, intro + anim + hold

POSTS.update({"flock": flock})


def glp1():
    ROWS = [[("All adults", 9.8), ("Women", 11.9), ("Men", 7.6)],
            [("Ages 18 to 39", 4.8), ("Ages 40 to 64", 13.7), ("Ages 65+", 11.1)],
            [("Healthy weight", 4.7), ("Overweight", 8.1), ("Obesity", 15.6), ("Severe obesity", 24.1)],
            [("Have had diabetes", 47.4), ("Never had diabetes", 5.7)]]
    GA_ = 2.399963
    RAD, RD, PALE = 68, 4.1, "#dde6e1"
    Y0, PITCH = 668, 240
    intro, step, hold = 0.8, 2.3, 3.6
    items = []
    for i, row in enumerate(ROWS):
        n = len(row); xp = 250 if n == 4 else 300
        for j, (lab, v) in enumerate(row):
            cx = 540 + (j - (n - 1) / 2) * xp; cy = Y0 + i * PITCH
            pts = [(cx + RAD / 10 * math.sqrt(k + 0.5) * math.cos(k * GA_), cy - RAD / 10 * math.sqrt(k + 0.5) * math.sin(k * GA_)) for k in range(100)]
            items.append((i, lab, v, cx, cy, pts))

    def draw(c, t):
        brand_block(c)
        header(c, "Science \u00b7 Health", ["One In 10 U.S. Adults Took A", "GLP-1 Drug In The Past Year"],
               ["Ozempic, Wegovy, Mounjaro, Zepbound and similar", "drugs. Each cluster is 100 adults."])
        px, py, gx, gy = [], [], [], []
        for i, lab, v, cx, cy, pts in items:
            t0 = intro + i * step
            a = min(max((t - t0) / 0.7, 0), 1)          # dots appear
            f = ease(min(max((t - t0 - 0.8) / 1.1, 0), 1))  # fill
            shown = int(round(100 * a)); n = int(round(v)); filled = int(round(n * f))
            for k in range(shown):
                (gx if k < filled else px).append(pts[k][0]); (gy if k < filled else py).append(pts[k][1])
            if a > 0:
                c.text(cx, cy + 100, lab, size=24, ha="center", color=INK)
            if t > t0 + 0.8:
                c.text(cx, cy + 137, f"{v * f:.1f}%", size=31, weight="bold", ha="center", color=GREEN)
        if px:
            c.ax.scatter(px, py, s=(2 * RD * PT) ** 2, c=PALE, linewidths=0, zorder=3)
        if gx:
            c.ax.scatter(gx, gy, s=(2 * RD * PT) ** 2, c=GREEN, linewidths=0, zorder=4)
        footer(c, "Source: CDC survey of 8,118 adults, 2025")
        bottom_band(c)

    return draw, intro + 4 * step + hold

POSTS.update({"glp1": glp1})


def dating():
    """Black and White Americans on dating: Pew 2019 survey (published Aug. 2020) and Pew 2025 survey (published 2026)."""
    SC = [("2019 \u00b7 All adults", ["Are single"], 47, 28),
          ("2019 \u00b7 All adults", ["Say dating has gotten harder", "in the last 10 years"], 54, 48),
          ("2025 \u00b7 Single adults", ["Are looking for a", "relationship or dates"], 53, 36)]
    GA_ = 2.399963
    C, RD, PALE = 17.0, 8.6, "#dde6e1"
    CY = 1010
    groups = [("Black adults", 300, GREEN), ("White adults", 780, BLUE)]
    pts = {cx: [(cx + C * math.sqrt(k + 0.5) * math.cos(k * GA_), CY - C * math.sqrt(k + 0.5) * math.sin(k * GA_)) for k in range(100)]
           for _, cx, _ in groups}
    intro, step, sum_in, hold = 1.0, 3.9, 0.9, 4.6
    t_sum = intro + 3 * step

    def draw(c, t):
        brand_block(c)
        header(c, "Culture \u00b7 Dating", ["Single In Black", "And White"],
               ["Two Pew surveys, six years apart.", "Each cluster is 100 people."])
        if t < t_sum + sum_in:
            fade = 1 - ease((t - t_sum) / sum_in)
            i = min(int(max(t - intro, 0) // step), 2)
            ts = max(t - intro - i * step, 0)
            a_lab = ease(ts / 0.45) if i > 0 else ease((t - 0.3) / 0.6)
            yr, q, vb, vw = SC[i]
            # question card
            c.text(W / 2, 640, yr.upper(), size=23, color=MUTED, weight="bold", ha="center", alpha=a_lab * fade)
            for j, ln in enumerate(q):
                c.text(W / 2, 700 + j * 50, ln, size=42, weight="bold", ha="center", alpha=a_lab * fade)
            # bloom in, then fill; between scenes the fill drains and refills
            bloom = min(max((t - 0.2) / 0.9, 0), 1)
            shown = int(round(100 * ease_out(bloom)))
            if i == 0:
                f = ease((t - intro - 0.2) / 1.3)
                prev = (0, 0)
            else:
                f = ease((ts - 0.1) / 1.3)
                prev = SC[i - 1][2:]
            px, py = [], []
            for (lab, cx, col), v, pv in zip(groups, (vb, vw), prev):
                n = int(round(pv + (v - pv) * f))
                fx = [p[0] for p in pts[cx][:min(n, shown)]]; fy = [p[1] for p in pts[cx][:min(n, shown)]]
                px += [p[0] for p in pts[cx][n:shown]]; py += [p[1] for p in pts[cx][n:shown]]
                if fx:
                    c.ax.scatter(fx, fy, s=(2 * RD * PT) ** 2, c=col, linewidths=0, zorder=4, alpha=fade)
                c.text(cx, 1240, lab, size=30, ha="center", color=INK, alpha=fade * ease_out(bloom))
                if t > intro + 0.2:
                    c.text(cx, 1330, f"{n}%", size=80, weight="bold", ha="center", color=col, alpha=fade)
            if px:
                c.ax.scatter(px, py, s=(2 * RD * PT) ** 2, c=PALE, linewidths=0, zorder=3, alpha=fade)
            # progress: three dots
            for k in range(3):
                c.circle(W / 2 - 40 + k * 40, 1430, 8, GREEN if k <= i else RULE, alpha=fade)
        else:
            # summary: three paired bars
            a0 = t - t_sum - sum_in
            rows = [("Single, 2019", 47, 28), ("Dating got harder, 2019", 54, 48), ("Single and looking, 2025", 53, 36)]
            X0, BW = 330, 600
            c.circle(330, 640, 11, GREEN); c.text(352, 650, "Black adults", size=27, color=INK)
            c.circle(600, 640, 11, BLUE); c.text(622, 650, "White adults", size=27, color=INK)
            for r, (lab, vb, vw) in enumerate(rows):
                y = 760 + r * 210
                a = ease((a0 - r * 0.35) / 0.6)
                c.text(80, y, lab, size=31, weight="bold", color=INK, alpha=a)
                for k, (v, col) in enumerate(((vb, GREEN), (vw, BLUE))):
                    yy = y + 30 + k * 62
                    c.rect(80, yy, BW * a * v / 60, 46, col, alpha=a)
                    c.text(80 + BW * a * v / 60 + 14, yy + 36, f"{v}%", size=32, weight="bold", color=col, alpha=a)
                c.text(W - 80, y + 92, f"+{vb - vw}", size=40, weight="bold", color=GREEN, ha="right", alpha=a)
            a = ease((a0 - 1.4) / 0.7)
            c.text(W - 80, 728, "Gap", size=22, color=MUTED, weight="bold", ha="right", alpha=ease(a0 / 0.6))
            c.text(W / 2, 1420, "Black adults were more likely to be single,", size=31, ha="center", alpha=a)
            c.text(W / 2, 1462, "and Black singles more likely to be looking", size=31, ha="center", alpha=a)
        footer(c, "Source: Pew Research Center, 2019 and 2025 surveys")
        bottom_band(c)

    return draw, t_sum + sum_in + hold

POSTS.update({"dating": dating})


def aiwork():
    """Where AI overlaps with American work: Microsoft AI applicability x BLS employment treemap, with snap zooms."""
    import json as _json
    from matplotlib.patches import Rectangle as _R
    L = _json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "aiwork_layout.json")))
    leaves, groups = L["leaves"], L["groups"]
    BINS = [(0.30, "#0B4D35"), (0.25, "#1A7A57"), (0.20, "#4C9F7C"), (0.15, "#8CC4A8"), (0.10, "#C3E0D1"), (0.0, "#E9F4EE")]
    col = lambda v: next(c for b, c in BINS if v >= b - 1e-9)
    VX0, VY0, VW, VH = 60, 480, 960, 980
    LW, LH = 960.0, 980.0
    G = {g["m"]: g for g in groups}
    byn = {l["n"]: l for l in leaves}
    def fit(x0, y0, x1, y1, pad=0.9):
        return ((x0 + x1) / 2, (y0 + y1) / 2, min(VW / (x1 - x0), VH / (y1 - y0)) * pad)
    FULL = (LW / 2, LH / 2, 1.0)
    off = G["Office and admin"]; sal = G["Sales"]; med = byn["Media and Communication Workers"]
    Z_OFF = fit(off["x0"], off["y0"], off["x1"], off["y1"])
    Z_SAL = fit(sal["x0"], sal["y0"], sal["x1"], sal["y1"])
    mx, my = (med["x0"] + med["x1"]) / 2, (med["y0"] + med["y1"]) / 2
    Z_MED = (mx, my, 4.2)
    # camera keyframes: (time, view); snaps use back-ease over SNAP seconds
    SNAP = 0.42
    KEYS = [(0, FULL), (3.7, Z_OFF), (6.7, FULL), (7.2, Z_SAL), (9.6, FULL), (10.1, Z_MED), (12.3, FULL)]
    def back(u):
        u = min(max(u, 0), 1); s = 1.4
        return 1 + (s + 1) * (u - 1) ** 3 + s * (u - 1) ** 2
    def cam(t):
        v = KEYS[0][1]
        for (tk, vk) in KEYS[1:]:
            if t >= tk:
                u = back((t - tk) / SNAP)
                # interpolate in log-scale for zoom
                s0, s1 = v[2], vk[2]
                s = s0 * (s1 / s0) ** min(u, 1.0) if u <= 1 else s1 * (s1 / s0) ** (0)
                s = s0 * (s1 / s0) ** u
                v = (v[0] + (vk[0] - v[0]) * u, v[1] + (vk[1] - v[1]) * u, s)
                if t < tk + SNAP:
                    return v
                v = vk
        return v
    def wrap(name, size, w):
        cpl = max(1, int(w / (size * 0.52)))
        lines, cur = [], ""
        for wd in name.split(" "):
            t2 = (cur + " " + wd).strip()
            if len(t2) <= cpl: cur = t2
            else:
                if cur: lines.append(cur)
                cur = wd
                if len(wd) > cpl: return None
        if cur: lines.append(cur)
        return lines
    TOT = sum(l["e"] for l in leaves)
    def cliprect(c, x0, y0, x1, y1):
        a0, b0 = max(x0, VX0), max(y0, VY0)
        a1, b1 = min(x1, VX0 + VW), min(y1, VY0 + VH)
        if a1 <= a0 or b1 <= b0:
            return None
        r = _R((a0, b0), a1 - a0, b1 - b0, transform=c.ax.transData, fc="none", ec="none")
        return r
    def ctext(c, cl, *a, **k):
        tx = c.text(*a, **k)
        tx.set_clip_on(True); tx.set_clip_path(cl)
        return tx
    def caption(c, lines, a):
        for i, ln in enumerate(lines):
            c.text(W / 2, 1530 + i * 42, ln, size=31, ha="center", color=INK, alpha=a, weight="bold" if i == 0 else "normal")
    SCENES = [  # (start, end, mode, caption lines)
        (1.4, 3.6, "all", ["Each tile is a job group, sized by workers", "Darker green: more of the work matches AI chat"]),
        (3.6, 6.6, "office", ["Office work overlaps most", "Information and record clerks: 0.33, 5.1 million workers"]),
        (6.6, 9.5, "sales", ["So does sales", "Sales reps for services score 0.35; retail sales, 0.30"]),
        (9.5, 12.2, "media", ["The top score of all 94: 0.38", "Media and communication workers"]),
        (12.2, 15.4, "hi", ["34 million workers, about 1 in 5", "are in the 21 groups scoring 0.25 or more"]),
        (15.4, 18.2, "lo", ["The least overlap: hands-on work", "Home health aides and nursing assistants: 0.04"]),
        (18.2, 22.5, "end", ["71% of Americans expect AI to mean fewer jobs", "Overlap isn't job loss, but it shows where AI fits"]),
    ]
    order = sorted(range(len(leaves)), key=lambda i: (leaves[i]["x0"] + leaves[i]["y0"]))
    rank = {i: k for k, i in enumerate(order)}
    def draw(c, t):
        brand_block(c)
        c.text(W / 2, 300, "AI & TECH · JOBS", size=24, color=GREEN, weight="bold", ha="center")
        c.text(W / 2, 376, "Where AI Overlaps", size=60, weight="bold", ha="center")
        c.text(W / 2, 444, "With American Work", size=60, weight="bold", ha="center")
        cx, cy, s = cam(t)
        clip = _R((VX0, VY0), VW, VH, transform=c.ax.transData, fc="none", ec="none")
        c.ax.add_patch(clip)
        sc = next((x for x in SCENES if x[0] <= t < x[1]), SCENES[-1] if t >= SCENES[-1][0] else None)
        mode = sc[2] if sc else "intro"
        X = lambda x: VX0 + VW / 2 + (x - cx) * s
        Y = lambda y: VY0 + VH / 2 + (y - cy) * s
        # group headers
        for g in groups:
            if not g["hdr"]: continue
            gx, gy, gw = X(g["x0"]), Y(g["y0"]), (g["x1"] - g["x0"]) * s
            fz = min(15 * s, 30)
            lab = g["m"].upper()
            mx_c = int((gw - 8) / (fz * 0.72))
            if mx_c < 4: continue
            if len(lab) > mx_c: lab = lab[:mx_c - 1] + "…"
            a = min(max((t - 0.9) / 0.5, 0), 1)
            cl = cliprect(c, gx, gy, gx + gw, gy + fz * 1.6)
            if cl is None: continue
            ctext(c, cl, gx + 4, gy + fz + 2, lab, size=fz, color=MUTED, weight="bold", alpha=a, z=4)
        for i, l in enumerate(leaves):
            # bloom in: each tile grows from its centre
            b = ease_out(min(max((t - 0.25 - rank[i] * 0.011) / 0.45, 0), 1))
            if b <= 0: continue
            x0, y0, x1, y1 = X(l["x0"]), Y(l["y0"]), X(l["x1"]), Y(l["y1"])
            if x1 < VX0 - 5 or x0 > VX0 + VW + 5 or y1 < VY0 - 5 or y0 > VY0 + VH + 5: continue
            w, h = x1 - x0, y1 - y0
            mcx, mcy = (x0 + x1) / 2, (y0 + y1) / 2
            k = b
            alpha = 1.0
            dx = dy = 0
            hi = l["v"] >= 0.25 - 1e-9
            lo = l["v"] < 0.10
            if mode == "hi" or mode == "lo":
                on = hi if mode == "hi" else lo
                u = min((t - sc[0]) / 0.35, 1)
                alpha = 1 - 0.78 * u if not on else 1
                if on and t - sc[0] < 1.4:   # shake
                    ph = (t - sc[0]) * 38 + i
                    amp = 5 * (1 - (t - sc[0]) / 1.4)
                    dx, dy = amp * np.sin(ph), amp * np.cos(ph * 1.3)
            if mode == "office" and l["n"] == "Information and Record Clerks" or mode == "sales" and l["n"] == "Sales Representatives, Services" or mode == "media" and l["n"] == "Media and Communication Workers":
                u = (t - sc[0] - 0.5)
                if 0 < u < 1.2: k = 1 + 0.07 * np.sin(np.pi * u / 1.2) * (1 if u < 1.2 else 0)
                if mode == "sales" and 0.5 < t - sc[0] < 1.5:
                    dx = 6 * np.sin((t - sc[0]) * 45) * (1.5 - (t - sc[0]))
            ww, hh = w * k, h * k
            feat = (mode == "office" and l["n"] == "Information and Record Clerks") or (mode == "sales" and l["n"] == "Sales Representatives, Services") or (mode == "media" and l["n"] == "Media and Communication Workers")
            p = _R((mcx - ww / 2 + dx, mcy - hh / 2 + dy), ww, hh, fc=col(l["v"]), ec=INK if feat else BG, lw=(5 if feat else 1.6 * min(s, 2.5)) * PT, zorder=3.5 if feat else 3, alpha=alpha)
            c.ax.add_patch(p); p.set_clip_path(clip)
            # label
            dark = l["v"] >= 0.20
            fz = max(10, min(15 * s ** 0.85, 44)) * min(1, b)
            if w > 30 and h > 22 and b > 0.9:
                avail = w - 10
                lines = None
                f2 = fz
                while f2 >= 11:
                    lines = wrap(l["n"], f2, avail)
                    if lines and (len(lines) + 1.3) * f2 * 1.1 < h - 6: break
                    lines = None; f2 -= 1
                ta = alpha * min(1, (t - 1.2) / 0.4) if t > 1.2 else 0
                tcl = cliprect(c, x0 + dx, y0 + dy, x1 + dx, y1 + dy)
                if tcl is None: ta = 0
                if lines and ta > 0:
                    for j, ln in enumerate(lines):
                        ctext(c, tcl, x0 + 6 + dx, y0 + 6 + f2 * (j + 1) * 1.08 + dy, ln, size=f2, color="white" if dark else INK, alpha=ta, z=4)
                    ctext(c, tcl, x0 + 6 + dx, y0 + 6 + f2 * (len(lines) + 1) * 1.08 + 4 + dy, f'{l["v"]:.2f}', size=f2 * 1.05, weight="bold", color="white" if dark else INK, alpha=ta, z=4)
                elif ta > 0 and w > 30 and h > 22:
                    ctext(c, tcl, x0 + 5 + dx, y0 + 18 + dy, f'{l["v"]:.2f}', size=13, weight="bold", color="white" if dark else INK, alpha=ta, z=4)
        # zoom badge
        if s > 1.05:
            c.rect(VX0 + VW - 118, VY0 + VH - 54, 106, 40, INK, z=8, radius=20, alpha=0.85)
            c.text(VX0 + VW - 65, VY0 + VH - 26, f"{s:.1f}×", size=24, color="white", weight="bold", ha="center", z=9)
        # big overlay number in "hi" scene
        if mode == "hi":
            a = ease(min((t - sc[0] - 0.4) / 0.5, 1)) * (1 - ease(max((t - sc[1] + 0.4) / 0.4, 0)))
            c.rect(VX0 + 150, VY0 + VH / 2 - 120, VW - 300, 230, "white", z=9, radius=18, alpha=0.93 * a)
            c.text(W / 2, VY0 + VH / 2 + 20, "34 million", size=104, weight="bold", color=GREEN, ha="center", z=10, alpha=a)
            c.text(W / 2, VY0 + VH / 2 + 78, "workers in the darkest tiles", size=30, color=INK, ha="center", z=10, alpha=a)
        if mode == "end":
            a = ease(min((t - sc[0] - 0.3) / 0.6, 1))
            c.rect(VX0 + 120, VY0 + VH / 2 - 130, VW - 240, 250, "white", z=9, radius=18, alpha=0.94 * a)
            c.text(W / 2, VY0 + VH / 2 + 18, "71%", size=120, weight="bold", color=GREEN, ha="center", z=10, alpha=a)
            c.text(W / 2, VY0 + VH / 2 + 80, "expect AI to mean fewer jobs", size=32, color=INK, ha="center", z=10, alpha=a)
        # caption
        if sc:
            a = ease(min((t - sc[0]) / 0.35, 1)) * (1 - ease(max((t - sc[1] + 0.25) / 0.25, 0)) if sc is not SCENES[-1] else 1)
            caption(c, sc[3], a)
        footer(c, "Sources: Microsoft Research (2025); BLS, May 2025; Pew (2026)")
        bottom_band(c)
    return draw, 22.5

POSTS.update({"aiwork": aiwork})


def aiworld():
    """Who sees more good in AI: Ipsos 2025 benefits-vs-drawbacks world map, with snap zooms and a China reveal."""
    import json as _json
    from matplotlib.collections import PolyCollection as _PC
    from matplotlib.patches import Rectangle as _R
    L = _json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "aiworld_layout.json")))
    V = {"156": 86.9, "360": 85, "764": 78, "484": 70, "458": 70, "604": 69, "410": 67, "356": 67, "792": 66, "710": 64,
         "152": 63, "170": 58, "076": 58, "032": 57, "380": 53, "724": 53, "616": 50, "276": 49, "348": 48, "372": 48,
         "392": 48, "036": 47, "756": 45, "528": 43, "826": 43, "752": 43, "840": 42, "056": 41, "250": 41, "124": 40}
    EU = ["826", "372", "250", "724", "380", "276", "616", "348", "756", "528", "752", "056"]
    BINS = [(80, "#0B4D35"), (70, "#1A7A57"), (60, "#4C9F7C"), (50, "#8CC4A8"), (45, "#C3E0D1"), (0, "#E6F2EB")]
    col = lambda v: next(c for b, c in BINS if v >= b)
    NOD, LAND = "#E4E9E6", "#EEF2EF"
    C = {c.get("id", "x%d" % k): c for k, c in enumerate(L["countries"])}
    LW, LH = L["W"], L["H"]
    VX0, VY0, VW, VH = 20, 600, 1040, 690
    FULL = (LW / 2 + 30, LH / 2, 1.16)
    def fitb(b, pad=0.86):
        (x0, y0), (x1, y1) = b
        return ((x0 + x1) / 2, (y0 + y1) / 2, min(VW / (x1 - x0), VH / (y1 - y0)) * pad)
    eb = [[min(C[i]["b"][0][0] for i in EU if i != "752"), min(C[i]["b"][0][1] for i in EU)], [max(C[i]["b"][1][0] for i in EU if i not in ("752",)), max(C[i]["b"][1][1] for i in EU)]]
    Z_EU = fitb(L["extra"]["eu"], 0.95)
    cn = C["156"]; Z_CN = fitb(cn["b"], 0.8)
    us = C["840"]
    SNAP = 0.42
    KEYS = [(0, FULL), (4.2, Z_EU), (7.6, FULL), (11.2, Z_CN), (14.6, FULL)]
    def back(u):
        u = min(max(u, 0), 1); s = 1.35
        return 1 + (s + 1) * (u - 1) ** 3 + s * (u - 1) ** 2
    def cam(t):
        v = KEYS[0][1]
        for tk, vk in KEYS[1:]:
            if t >= tk:
                u = back((t - tk) / SNAP)
                cur = (v[0] + (vk[0] - v[0]) * u, v[1] + (vk[1] - v[1]) * u, v[2] * (vk[2] / v[2]) ** u)
                if t < tk + SNAP: return cur
                v = vk
        return v
    # when each surveyed country fills
    FILL = {"840": 1.6}
    for k, i in enumerate(sorted(EU, key=lambda i: V[i])): FILL.setdefault(i, 4.8 + k * 0.17)
    rest = sorted([i for i in V if i not in FILL and i != "156"], key=lambda i: V[i])
    for k, i in enumerate(rest): FILL[i] = 8.2 + k * 0.17
    FILL["156"] = 12.4  # China counts up 12.4-13.6
    SG = L["extra"]["sg"]; FILL["702"] = 8.2 + len(rest) * 0.17 + 0.1
    SCN = [(1.3, 4.2, ["The United States: 42%", "27th of the 30 countries Ipsos surveyed"]),
           (4.2, 7.9, ["Europe is a little warmer", "Italy and Spain 53%, Germany 49%, France 41%"]),
           (7.9, 11.2, ["The most positive: Asia and Latin America", "Indonesia 85%, Thailand 78%, Mexico 70%"]),
           (11.2, 15.0, ["And China?", "Data supplied by Ipsos to Stanford's AI Index"]),
           (15.0, 21.0, ["About twice the U.S. share", "Only Belgium, France and Canada were lower than the U.S."])]
    def draw(c, t):
        brand_block(c)
        c.text(W / 2, 300, "AI & TECH · THE WORLD", size=24, color=GREEN, weight="bold", ha="center")
        c.text(W / 2, 378, "Who Sees More Good", size=62, weight="bold", ha="center")
        c.text(W / 2, 448, "In AI?", size=62, weight="bold", ha="center")
        c.text(W / 2, 500, "Share saying products and services using AI", size=27, color=MUTED, ha="center", style="italic")
        c.text(W / 2, 536, "have more benefits than drawbacks, 2025", size=27, color=MUTED, ha="center", style="italic")
        cx, cy, s = cam(t)
        X = lambda x: VX0 + VW / 2 + (x - cx) * s
        Y = lambda y: VY0 + VH / 2 + (y - LH / 2 if False else y - cy) * s
        clip = _R((VX0, VY0), VW, VH, transform=c.ax.transData, fc="none", ec="none"); c.ax.add_patch(clip)
        a0 = min(max(t / 0.8, 0.001), 1)
        sph = [[(X(x), Y(y)) for x, y in r] for r in L["sphere"]]
        pc = _PC(sph, facecolors="#F7FAF8", edgecolors="#E3EAE6", linewidths=1.2 * PT, zorder=2, alpha=a0); c.ax.add_collection(pc); pc.set_clip_path(clip)
        verts, fcs, ecs, lws = [], [], [], []
        for cid, ct in C.items():
            v = V.get(cid)
            fc = NOD if v is None else LAND
            if v is not None and t >= FILL[cid]:
                u = min((t - FILL[cid]) / 0.35, 1)
                if cid == "156":
                    u = min((t - FILL[cid]) / 1.2, 1)
                fc = col(v * (u if cid == "156" else 1)) if (cid == "156" or u > 0.3) else LAND
            for r in ct["rings"]:
                if len(r) < 3: continue
                verts.append([(X(x), Y(y)) for x, y in r]); fcs.append(fc); ecs.append("white"); lws.append(0.7 * PT * min(s, 2))
        pc = _PC(verts, facecolors=fcs, edgecolors=ecs, linewidths=lws, zorder=3, alpha=a0); c.ax.add_collection(pc); pc.set_clip_path(clip)
        # U.S. outline in rust
        if t >= 1.6:
            uv = [[(X(x), Y(y)) for x, y in r] for r in us["rings"] if len(r) > 2]
            pu = _PC(uv, facecolors="none", edgecolors="#B5462F", linewidths=3.2 * PT, zorder=4); c.ax.add_collection(pu); pu.set_clip_path(clip)
        # Singapore dot
        if t >= FILL["702"] and VX0 < X(SG[0]) < VX0 + VW and VY0 < Y(SG[1]) < VY0 + VH:
            dot = c.circle(X(SG[0]), Y(SG[1]), 5 * min(s, 2), col(73), z=5)
        # value labels
        for cid, v in V.items():
            if t < FILL[cid] + 0.2 or (cid == "156" and t < 14.9): continue
            if cid in EU and s < 1.8: continue
            ct = C[cid]; p = L["extra"]["fr"] if cid == "250" else ct["c"]
            x, y = X(p[0]), Y(p[1])
            if not (VX0 + 10 < x < VX0 + VW - 10 and VY0 + 10 < y < VY0 + VH - 10): continue
            dark = v >= 60
            fz = 27 if cid in EU else (19 if s < 1.8 else 30)
            if cid == "840": fz = 26
            a = min(max((t - FILL[cid] - 0.2) / 0.3, 0), 1)
            lab = f"U.S. {int(v)}%" if cid == "840" else f"{int(round(v))}"
            tx = c.text(x, y + fz * 0.35, lab, size=fz, weight="bold", ha="center", color="white" if dark else (("#B5462F") if cid == "840" else INK), alpha=a, z=6)
            tx.set_clip_on(True); tx.set_clip_path(clip)
        # China counter
        if 11.6 <= t < 14.6:
            u = min(max((t - 12.4) / 1.2, 0), 1)
            x, y = X(cn["c"][0]), Y(cn["c"][1])
            if u <= 0:
                pul = 1 + 0.12 * np.sin((t - 11.6) * 9)
                c.text(x, y + 40, "?", size=110 * pul, weight="bold", ha="center", color=GREEN, z=7)
            else:
                c.text(x, y + 34, f"{86.9 * ease_out(u):.0f}%", size=96, weight="bold", ha="center", color="white", z=7, alpha=min(max((14.6 - t) / 0.3, 0), 1))
        if s > 1.35:
            c.rect(VX0 + VW - 118, VY0 + VH - 54, 106, 40, INK, z=8, radius=20, alpha=0.85)
            c.text(VX0 + VW - 65, VY0 + VH - 26, f"{s:.1f}×", size=24, color="white", weight="bold", ha="center", z=9)
        # legend
        lx = 112
        for b, cc in list(reversed(BINS)):
            lab = "Under 45" if b == 0 else ("80%+" if b == 80 else f"{b}–{[45,50,60,70,80][[45,50,60,70].index(b)+1]-1 if b in (45,50,60,70) else ''}")
            c.rect(lx, 1318, 26, 26, cc, z=5, radius=4)
            c.text(lx + 34, 1339, lab, size=22, color=MUTED, z=5)
            lx += 142
        # end card
        if t >= 15.3:
            a = min(max(ease(min((t - 15.3) / 0.6, 1)), 0), 1)
            c.rect(VX0 + 120, VY0 + 130, VW - 240, VH - 260, "white", z=9, radius=20, alpha=0.95 * a)
            c.text(W / 2 - 200, VY0 + 330, "87%", size=130, weight="bold", ha="center", color=GREEN, z=10, alpha=a)
            c.text(W / 2 - 200, VY0 + 390, "China", size=36, ha="center", color=INK, z=10, alpha=a, weight="bold")
            c.text(W / 2 + 200, VY0 + 330, "42%", size=130, weight="bold", ha="center", color="#B5462F", z=10, alpha=a)
            c.text(W / 2 + 200, VY0 + 390, "United States", size=36, ha="center", color=INK, z=10, alpha=a, weight="bold")
            c.text(W / 2, VY0 + 465, "30-country average: 56%", size=30, ha="center", color=MUTED, z=10, alpha=a)
        sc = next((x for x in SCN if x[0] <= t < x[1]), None)
        if sc:
            a = ease(min((t - sc[0]) / 0.35, 1)) * (1 - ease(max((t - sc[1] + 0.25) / 0.25, 0)) if sc is not SCN[-1] else 1)
            a = min(max(a, 0), 1)
            for i, ln in enumerate(sc[2]):
                c.text(W / 2, 1430 + i * 46, ln, size=34 if i == 0 else 29, ha="center", color=INK, alpha=a, weight="bold" if i == 0 else "normal")
        footer(c, "Source: Ipsos AI Monitor 2025 (30 countries); China via Stanford AI Index 2026")
        bottom_band(c)
    return draw, 21.0

POSTS.update({"aiworld": aiworld})

def relworld():
    """World religions 2020 -> 2070 (Pew 2026): dot map morphs, snap zooms to Europe and North America, Africa end card."""
    import json as _json
    from matplotlib.collections import EllipseCollection as _EC
    from matplotlib.patches import Rectangle as _R
    here = os.path.dirname(os.path.abspath(__file__))
    D_ = _json.load(open(os.path.join(here, "relworld_dots.json")))
    rows = open(os.path.join(here, "relworld_countries.txt")).read().replace("\n", "|").strip("|").split("|")
    CO = []
    for l in rows:
        a = l.split(";"); CO.append((a[0], list(map(int, a[2].split(","))), list(map(int, a[3].split(",")))))
    REL = [("Christians", "#3F6FB5"), ("Muslims", "#0A8F63"), ("No religion", "#A3ADB5"), ("Hindus", "#E2892F"),
           ("Buddhists", "#B35C98"), ("Jews", "#6A5BBF"), ("Other", "#C4825F")]
    NODATA = "#E3E8E5"
    d = np.array(D_["d"], dtype=float).reshape(-1, 3)
    PX, PY, PI = d[:, 0], d[:, 1], d[:, 2].astype(int)
    MW, MH = D_["w"], D_["h"]
    def look(arr):
        m = int(np.argmax(arr)); return REL[m][1], 1.05 + 1.75 * arr[m] / 100
    C20, C70, R20, R70 = [], [], [], []
    for i in PI:
        if i < 0:
            C20.append(NODATA); C70.append(NODATA); R20.append(1.5); R70.append(1.5)
        else:
            a, b = look(CO[i][1]), look(CO[i][2]); C20.append(a[0]); C70.append(b[0]); R20.append(a[1]); R70.append(b[1])
    rgb = lambda h: np.array([int(h[k:k + 2], 16) / 255 for k in (1, 3, 5)])
    C20 = np.array([rgb(x) for x in C20]); C70 = np.array([rgb(x) for x in C70]); R20 = np.array(R20); R70 = np.array(R70)
    names = {n: k for k, (n, _, _) in enumerate(CO)}
    FLIP = [names[n] for n in ["France", "United Kingdom", "Spain", "Belgium", "Canada", "Australia"]]
    flip = np.isin(PI, FLIP)
    VX0, VY0, VW, VH = 20, 640, 1040, 560
    def box(ns, pad=0.9, xmin=-1):
        m = np.isin(PI, [names[n] for n in ns]) & (PX > xmin); x0, x1, y0, y1 = PX[m].min(), PX[m].max(), PY[m].min(), PY[m].max()
        return ((x0 + x1) / 2, (y0 + y1) / 2, min(VW / (x1 - x0 + 20), VH / (y1 - y0 + 20)) * pad)
    FULL = (MW / 2, MH / 2, min(VW / MW, VH / MH))
    Z_EU = box(["France", "United Kingdom", "Spain", "Belgium", "Germany", "Italy", "Poland", "Ireland", "Portugal", "Sweden", "Greece"], 0.85, 400)
    Z_NA = box(["United States", "Canada", "Mexico"], 0.92)
    KEYS = [(0, FULL), (10.2, Z_EU), (13.6, Z_NA), (17.4, FULL)]
    SNAP = 0.45
    def back(u):
        u = min(max(u, 0), 1); k = 1.3
        return 1 + (k + 1) * (u - 1) ** 3 + k * (u - 1) ** 2
    def cam(t):
        v = KEYS[0][1]
        for tk, vk in KEYS[1:]:
            if t >= tk:
                u = back((t - tk) / SNAP)
                cur = (v[0] + (vk[0] - v[0]) * u, v[1] + (vk[1] - v[1]) * u, v[2] * (vk[2] / v[2]) ** u)
                if t < tk + SNAP: return cur
                v = vk
        return v
    def year_u(t):  # 0 = 2020, 1 = 2070
        if t < 4.6: return 0.0
        if t < 6.8: return ease((t - 4.6) / 2.2)
        if 13.8 <= t < 14.3: return 1 - ease((t - 13.8) / 0.5)   # snap back to 2020 inside the North America zoom
        if 14.3 <= t < 14.9: return 0.0
        if 14.9 <= t < 16.6: return ease((t - 14.9) / 1.7)
        return 1.0
    SCN = [(1.2, 4.6, ["2020: Christians are the largest group", "in most of the world"]),
           (4.6, 10.2, ["By 2070, six countries switch to", "no religion as their largest group"]),
           (10.2, 13.6, ["Western Europe turns gray", "France, the U.K., Spain and Belgium"]),
           (13.6, 17.4, ["The U.S. stays Christian-led, but its dots shrink", "Christians fall from 64% to 48%; Canada flips"]),
           (17.4, 19.6, ["Muslims pass Christians around 2035", "and lead in 54 countries by 2070"])]
    def draw(c, t):
        brand_block(c)
        c.text(W / 2, 300, "CULTURE · THE WORLD", size=24, color=GREEN, weight="bold", ha="center")
        c.text(W / 2, 378, "The World’s Largest Religion,", size=58, weight="bold", ha="center")
        c.text(W / 2, 446, "Country By Country", size=58, weight="bold", ha="center")
        c.text(W / 2, 500, "Each dot takes the color of its country’s largest group;", size=26, color=MUTED, ha="center", style="italic")
        c.text(W / 2, 536, "bigger dots mean a bigger majority", size=26, color=MUTED, ha="center", style="italic")
        u = year_u(t)
        yr = int(round(2020 + 50 * u))
        c.text(W / 2, 612, str(yr), size=46, weight="bold", ha="center", color=GREEN if yr == 2070 else INK)
        cx, cy, s = cam(t)
        X = VX0 + VW / 2 + (PX - cx) * s
        Y = VY0 + VH / 2 + (PY - cy) * s
        cols = C20 + (C70 - C20) * u
        rad = R20 + (R70 - R20) * u
        # bloom in, west to east
        grow = np.clip((t - PX / MW * 0.9) / 0.5, 0, 1)
        grow = 1 - (1 - grow) ** 3
        pulse = np.where(flip & (4.8 < t) & (t < 10.2), 1 + 0.35 * np.clip(np.sin((t - 4.8) * 7), 0, None) * (t > 6.8), 1.0)
        w = 2 * rad * s * grow * pulse
        clip = _R((VX0, VY0), VW, VH, transform=c.ax.transData, fc="none", ec="none"); c.ax.add_patch(clip)
        ec = _EC(w, w, np.zeros_like(w), units="xy", offsets=np.column_stack([X, Y]), offset_transform=c.ax.transData,
                 facecolors=cols, edgecolors="none", zorder=3)
        c.ax.add_collection(ec); ec.set_clip_path(clip)
        if s > FULL[2] * 1.3:
            c.rect(VX0 + VW - 118, VY0 + VH - 54, 106, 40, INK, z=8, radius=20, alpha=0.85)
            c.text(VX0 + VW - 65, VY0 + VH - 26, f"{s / FULL[2]:.1f}×", size=24, color="white", weight="bold", ha="center", z=9)
        # legend
        lx, ly = 95, 1255
        for k, (nm, cc) in enumerate(REL):
            if k == 4: lx, ly = 210, 1300
            c.circle(lx, ly - 8, 10, cc, z=5)
            c.text(lx + 20, ly, nm, size=23, color=MUTED, z=5)
            lx += 40 + c.text_width(nm, 23) + 30
        sc = next((x for x in SCN if x[0] <= t < x[1]), None)
        if sc and t < 19.6:
            a = ease(min((t - sc[0]) / 0.35, 1)) * (1 - ease(max((t - sc[1] + 0.25) / 0.25, 0)))
            a = min(max(a, 0), 1)
            for i, ln in enumerate(sc[2]):
                c.text(W / 2, 1405 + i * 46, ln, size=34 if i == 0 else 28, ha="center", color=INK, alpha=a, weight="bold" if i == 0 else "normal")
        if t >= 19.4:
            a = min(max(ease(min((t - 19.4) / 0.6, 1)), 0), 1)
            c.rect(VX0 + 90, VY0 + 70, VW - 180, VH - 140, "white", z=9, radius=22, alpha=0.95 * a)
            c.text(W / 2, VY0 + 250, "54%", size=150, weight="bold", ha="center", color=GREEN, z=10, alpha=a)
            c.text(W / 2, VY0 + 318, "of the world’s Christians will live", size=36, ha="center", color=INK, z=10, alpha=a, weight="bold")
            c.text(W / 2, VY0 + 362, "in sub-Saharan Africa by 2070", size=36, ha="center", color=INK, z=10, alpha=a, weight="bold")
            c.text(W / 2, VY0 + 412, "up from 31% in 2020", size=30, ha="center", color=MUTED, z=10, alpha=a)
            c.text(W / 2, 1430, "Find your country on the interactive map", size=30, ha="center", color=GREEN, alpha=a, weight="bold")
        footer(c, "Source: Pew Research Center, Future of World Religions (2026)")
        bottom_band(c)
    return draw, 23.0

POSTS.update({"relworld": relworld})



def nflintl():
    rows = list(csv.DictReader(open(R + "nfl-international-games.csv")))
    CO = {"United Kingdom": "#007A55", "Mexico": "#C4573A", "Canada": "#7D8B94", "Germany": "#C9A227", "Brazil": "#5A9E6F",
          "Spain": "#D9822B", "Ireland": "#2A8FA8", "France": "#3F6FB5", "Australia": "#7A6FC2"}
    ORD = ["United Kingdom", "Mexico", "Canada", "Germany", "Brazil", "Spain", "Ireland", "France", "Australia"]
    LAB = {"United Kingdom": "U.K."}
    NAMES = {"JAX": "Jaguars", "BUF": "Bills", "LV": "Raiders", "LA": "Rams", "TB": "Buccaneers", "MIA": "Dolphins",
             "LAC": "Chargers", "ATL": "Falcons", "NO": "Saints", "SF": "49ers"}
    yrs = list(range(2005, 2027))
    cols = {y: sorted([r for r in rows if int(r["season"]) == y], key=lambda r: (ORD.index(r["country"]), r["date"])) for y in yrs}
    home = {}
    for r in rows:
        home.setdefault(r["home_abbr"], []).append(r)
    top = sorted(home, key=lambda k: (-len(home[k]), NAMES.get(k, k)))[:10]
    L, CW = 70, 40.5
    RD, ST, BASE = 15, 33, 1420
    gx = L + (len(yrs) + 1.3) * CW
    s1a, s1b = 0.8, 0.8 + 0.32 * len(yrs)       # columns grow
    S2, S3, END = 11.0, 17.2, 23.5

    def fade(t, t0, t1):
        return min(max((t - t0) / 0.5, 0), 1) * min(max((t1 - t) / 0.5, 0), 1)

    def scene1(c, t, a):
        header(c, "Sports · NFL", ["The NFL Is Playing A Record", "9 Games Abroad This Season"],
               ["One dot per regular-season game played", "outside the U.S., by season."], alpha=a)
        # legend
        x = 120; y = 640
        for i, k in enumerate(ORD):
            if i == 5: x, y = 200, 684
            c.circle(x, y - 9, 9, CO[k], alpha=a)
            lab = LAB.get(k, k); c.text(x + 18, y, lab, size=23, color=MUTED, alpha=a)
            x += 36 + c.text_width(lab, 23) + 26
        c.line([L - 10, gx + 30], [BASE + RD + 6, BASE + RD + 6], color=RULE, lw=2, alpha=a)
        shown_n = 0
        for yi, y in enumerate(yrs):
            cx = L + (yi + 0.5) * CW
            ty = s1a + yi * 0.32
            gs = cols[y]
            for k, g in enumerate(gs):
                f = ease_out((t - ty - k * 0.05) / 0.35)
                if f <= 0: continue
                col = CO[g["country"]]
                cy = BASE - k * ST
                if g["home_score"] == "":
                    c.circle(cx, cy, RD * f, col, alpha=0.35 * a, ec=col, lw=3)
                else:
                    c.circle(cx, cy, RD * f, col, alpha=a)
            if t >= ty: shown_n = len(gs); cur = y
            if y in (2005, 2010, 2015, 2020, 2026):
                c.text(cx, BASE + 58, str(y), size=24 if y != 2026 else 27, color=INK if y == 2026 else FAINT,
                       weight="bold" if y == 2026 else "normal", ha="center", alpha=a)
        if t >= s1a:
            # running year counter
            c.text(L + 10, 820, str(cur), size=40, color=MUTED, alpha=a)
            c.text(L + 10, 900, f"{shown_n} game" + ("s" if shown_n != 1 else ""), size=58, weight="bold", color=GREEN, alpha=a)
        g_a = min(max((t - s1b - 0.4) / 0.8, 0), 1) * a
        if g_a > 0:
            for i in range(16):
                c.circle(gx, BASE - i * ST, RD - 2, BG, ec=FAINT, lw=2.5, alpha=g_a)
            c.text(gx, BASE + 58, "Goal", size=24, weight="bold", color=MUTED, ha="center", alpha=g_a)
            c.text(gx, BASE - 15 * ST - 34, "16", size=30, weight="bold", color=MUTED, ha="center", alpha=g_a)
        if t > s1b + 0.2:
            c.text(L + (len(yrs) - 0.5) * CW, BASE - 9 * ST - 18, "9", size=40, weight="bold", ha="center", alpha=a)

    def scene2(c, t, a):
        header(c, "Sports · NFL", ["27 Of 32 Teams Have Given", "Up A Home Game To Play Abroad"],
               ["Designated home games played overseas", "or in Toronto, 2005 to 2026."], alpha=a)
        y0 = 700
        for i, k in enumerate(top):
            y = y0 + i * 62
            c.text(300, y + 10, NAMES[k], size=34, ha="right", alpha=a)
            gs = sorted(home[k], key=lambda r: r["date"])
            for j, g in enumerate(gs):
                f = ease_out((t - S2 - 0.3 - i * 0.12 - j * 0.06) / 0.3)
                if f <= 0: continue
                col = CO[g["country"]]
                c.circle(340 + j * 44, y, 17 * f, col, alpha=a * (0.4 if g["home_score"] == "" else 1), ec=col, lw=3 if g["home_score"] == "" else 0)
            if t > S2 + 0.6 + i * 0.12:
                c.text(340 + len(gs) * 44 + 8, y + 10, str(len(gs)), size=30, weight="bold", color=MUTED, alpha=a)
        na = min(max((t - S2 - 2.6) / 0.6, 0), 1) * a
        c.text(W / 2, 1400, "Never: Ravens, Broncos, Texans, Giants, Seahawks", size=29, color=MUTED, ha="center", alpha=na)
        c.text(W / 2, 1450, "League rule: every team, once every eight years", size=27, color=FAINT, ha="center", style="italic", alpha=na)

    def scene3(c, t, a):
        header(c, "Sports · NFL", ["What A Home Game Is Worth"],
               ["The 49ers play the Vikings in Mexico City", "Sunday as the designated home team."], alpha=a)
        items = [("$176M", "49ers’ 2024 gate receipts, the NFL’s most", GREEN),
                 ("\\$15M–\\$20M", "Ticket sales from one 49ers home game", INK),
                 ("$0", "League stipend for giving one up, since 2022", "#B8483A")]
        for i, (big, small, col) in enumerate(items):
            f = ease_out((t - S3 - 0.4 - i * 0.9) / 0.5)
            if f <= 0: continue
            y = 820 + i * 230 + (1 - f) * 40
            c.text(W / 2, y, big, size=96, weight="bold", color=col, ha="center", alpha=a * f)
            c.text(W / 2, y + 62, small, size=31, color=MUTED, ha="center", alpha=a * f)

    def draw(c, t):
        brand_block(c)
        a1 = min(max((S2 - t) / 0.5, 0), 1)
        a2 = fade(t, S2, S3)
        a3 = min(max((t - S3) / 0.5, 0), 1)
        if a1 > 0: scene1(c, t, a1)
        if a2 > 0: scene2(c, t, a2)
        if a3 > 0: scene3(c, t, a3)
        src = "Sources: Pro-Football-Reference; Sportico; The Athletic" if t > S3 - 0.3 else "Sources: Pro-Football-Reference; nflverse; NFL"
        footer(c, src)
        bottom_band(c)

    return draw, END

POSTS.update({"nflintl": nflintl})


def gtaflow():
    """GTA VI launch eve: DE-CIX hubs flow into the 33.03 Tbps record (DE-CIX, Nov. 19, 2026)."""
    from matplotlib.collections import EllipseCollection as _EC
    ROWS = [("Frankfurt", 22.15, "#007A55"), ("Dallas", 2.87, "#3F6FB5"), ("New York", 2.44, "#3F6FB5"),
            ("Madrid", 1.43, "#007A55"), ("Dubai", 1.25, "#C9A227"), ("Chicago", 1.22, "#3F6FB5"),
            ("Singapore", 0.627, "#D9822B"), ("Lisbon", 0.0799, "#007A55"), ("Other hubs", 0.96, "#A9B6AF")]
    TOTAL = 33.03
    sc, minS, gap, Y0 = 14.0, 58, 10, 645
    XL, XR, NW = 300, 830, 12
    bands, y, ry0 = [], Y0, 0
    tot_h = sum(max(v * sc, minS) for _, v, _ in ROWS) + gap * (len(ROWS) - 1)
    rtop = Y0 + (tot_h - TOTAL * sc) / 2
    ry = rtop
    for name, v, col in ROWS:
        h = max(v * sc, 2.0); slot = max(v * sc, minS)
        bands.append(dict(name=name, v=v, col=col, y0=y + (slot - h) / 2, h=h, r0=ry, rh=v * sc, cy=y + slot / 2))
        y += slot + gap; ry += v * sc
    T_IN = [1.2 + i * 0.45 for i in range(len(ROWS))]          # stream reveal starts
    REV = 1.1                                                  # seconds to sweep a stream left->right
    S_FRANK, S_END, END = 10.6, 15.6, 21.0
    N = 60
    ts = np.linspace(0, 1, N)
    x1, x2 = XL + NW, XR
    cxm = (x1 + x2) / 2
    def bez(t, a, b):
        u = 1 - t
        X = u**3 * x1 + 3*u*u*t*cxm + 3*u*t*t*cxm + t**3 * x2
        Y = u**3 * a + 3*u*u*t*a + 3*u*t*t*b + t**3 * b
        return X, Y
    rng = np.random.default_rng(7)
    parts = []   # (band, spawn, offset, speed)
    for i, b in enumerate(bands):
        rate = max(b["v"] * 9, 0.6)
        tt = T_IN[i] + REV * 0.6
        while tt < END:
            parts.append((i, tt, 0.08 + 0.84 * rng.random(), 0.36 + 0.08 * rng.random()))
            tt += rng.exponential(1 / rate)
    parts = np.array(parts)

    def draw(c, t):
        brand_block(c)
        fr = min(max((t - S_FRANK) / 0.5, 0), 1) * (1 - min(max((t - S_END) / 0.5, 0), 1))
        endf = min(max((t - S_END) / 0.6, 0), 1)
        ha = 1 - endf
        if ha > 0:
            header(c, "AI & Tech · GTA 6", ["The Night Before GTA 6 Came Out,", "Internet Traffic Hit An", "All-Time High"],
                   ["DE-CIX runs internet hubs where networks", "swap data. Each stream is one hub."], alpha=ha, title_size=56)
        shown = 0.0
        for i, b in enumerate(bands):
            p = ease_out((t - T_IN[i]) / REV)
            if p <= 0:
                continue
            shown += b["v"] * min(p * 1.4, 1)
            dim = 1.0 if fr == 0 else (1 - 0.75 * fr if i else 1.0)
            a = ha * dim
            k = max(int(p * (N - 1)), 1)
            X, Yt = bez(ts[:k + 1], b["y0"], b["r0"])
            _, Yb = bez(ts[:k + 1], b["y0"] + b["h"], b["r0"] + b["rh"])
            c.ax.fill(np.concatenate([X, X[::-1]]), np.concatenate([Yt, Yb[::-1]]), color=b["col"], alpha=0.24 * a, lw=0, zorder=2)
            c.rect(XL, b["y0"], NW, b["h"], b["col"], z=4, alpha=a)
            big = i == 0
            c.text(XL - 16, b["cy"] - 4, b["name"], size=34 if big else 29, weight="bold" if big else "normal", ha="right", alpha=a * min(p * 2, 1))
            val = (f"{b['v']:.2f} Tbps" if b["v"] >= 1 else f"{round(b['v']*1000)} Gbps")
            if b["name"] == "Other hubs": val = "about " + val
            c.text(XL - 16, b["cy"] + 26, val, size=22, color=MUTED, ha="right", alpha=a * min(p * 2, 1))
        # particles
        if len(parts) and ha > 0:
            age = (t - parts[:, 1]) * parts[:, 3]
            m = (age > 0) & (age < 1)
            if m.any():
                P = parts[m]; A = age[m]
                bi = P[:, 0].astype(int)
                y0 = np.array([bands[j]["y0"] for j in bi]); hh = np.array([bands[j]["h"] for j in bi])
                r0 = np.array([bands[j]["r0"] for j in bi]); rh = np.array([bands[j]["rh"] for j in bi])
                X, Y = bez(A, y0 + P[:, 2] * hh, r0 + P[:, 2] * rh)
                cols = [bands[j]["col"] for j in bi]
                from matplotlib.colors import to_rgba
                fc = np.array([to_rgba(cc) for cc in cols])
                al = np.where(bi == 0, 0.9, 0.9 * (1 - 0.8 * fr)) * ha
                fc[:, 3] = al
                w = np.full(len(X), 5.0)
                ec = _EC(w, w, np.zeros_like(w), units="xy", offsets=np.column_stack([X, Y]), offset_transform=c.ax.transData,
                         facecolors=fc, edgecolors="none", zorder=3)
                c.ax.add_collection(ec)
        # sink + counter
        if t > T_IN[0] and ha > 0:
            c.rect(XR, rtop, NW + 4, TOTAL * sc, INK, z=4, alpha=ha)
            val = min(shown, TOTAL) if t < T_IN[-1] + REV + 0.4 else TOTAL
            c.text(XR + 30, rtop + TOTAL * sc / 2 - 6, f"{val:.2f}", size=64, weight="bold", color="#6B4FB3", alpha=ha)
            c.text(XR + 32, rtop + TOTAL * sc / 2 + 36, "Tbps, all", size=24, color=INK, alpha=ha)
            c.text(XR + 32, rtop + TOTAL * sc / 2 + 66, "DE-CIX hubs", size=24, color=INK, alpha=ha)
        if fr > 0:
            fb = bands[0]
            c.rect(150, 1524, 780, 58, GREEN_LT, z=7, alpha=0.95 * fr, radius=31)
            c.text(W / 2, 1564, "Two-thirds of it went through Frankfurt", size=34, weight="bold", color=GREEN, ha="center", alpha=fr, z=8)
        if endf > 0:
            e2 = ease_out((t - S_END - 0.3) / 0.8)
            c.text(W / 2, 600, "Internet traffic, the night before GTA 6", size=36, color=MUTED, ha="center", alpha=endf)
            c.text(W / 2, 820, "33 terabits", size=120, weight="bold", color="#6B4FB3", ha="center", alpha=endf)
            c.text(W / 2, 900, "per second, an all-time high at DE-CIX", size=36, color=INK, ha="center", alpha=endf)
            c.text(W / 2, 1130, "+25%", size=150, weight="bold", color=GREEN, ha="center", alpha=e2)
            c.text(W / 2, 1210, "above a normal week", size=40, color=INK, ha="center", alpha=e2)
            c.text(W / 2, 1300, "About 13 full GTA 6 downloads every second in Frankfurt", size=28, color=MUTED, ha="center",
                   alpha=ease_out((t - S_END - 1.2) / 0.8))
        footer(c, "Source: DE-CIX, Nov. 19, 2026. Hub peaks from the evening of Nov. 18")
        bottom_band(c)

    return draw, END

POSTS.update({"gtaflow": gtaflow})


def tgribbon():
    """Thanksgiving pro football games per year, 1920-2026, then the 2026 holiday week (Wikipedia; NFL)."""
    NFLX = {1920:6,1921:2,1922:5,1923:4,1924:5,1925:4,1926:8,1927:4,1928:4,1929:3,1930:4,1931:3,1932:3,1933:2,1934:3,
            1935:3,1936:3,1937:2,1938:2,1939:1,1940:3,1950:2,1952:2}
    RIVAL = {1946:1,1947:2,1948:2,1949:2,1960:1,1961:1,1962:1,1963:1,1964:1,1965:1,1966:1,1967:2,1968:2,1969:2}
    EXTRA = {2023:1,2024:1,2025:1,2026:2}
    def nfl(y):
        if y in NFLX: return NFLX[y]
        if 1941 <= y <= 1944: return 0
        return 1 if y < 1966 else 2 if y < 2006 else 3
    LIGHT = "#9FCBB6"; GRAYL = "#B9C6BF"
    yrs = list(range(1920, 2027))
    X0, X1, BASE, U = 90, 990, 1430, 46
    step = (X1 - X0) / len(yrs); bw = step - 1.6
    S1a, PER = 1.0, 0.075                     # column reveal: start, seconds per year
    S2, S3, END = 13.0, 19.6, 25.0
    ANN = [(1926, 8, "8 games in 1926", "left", 60), (1942.5, 0, "None, 1941–44", "center", 250),
           (1956, 1, "One a year, 1953–59", "center", 150), (1966, 3, "Dallas joins, 1966", "center", 120),
           (2006, 3, "Night game, 2006", "right", 90), (2026, 5, "Five in 2026", "right", 50)]
    WEEK = [("Wed.", "Nov. 25", [(20, "Packers at Rams", "Netflix")]),
            ("Thu.", "Nov. 26", [(13, "Bears at Lions", "CBS"), (16.5, "Eagles at Cowboys", "Fox"), (20.333, "Chiefs at Bills", "NBC")]),
            ("Fri.", "Nov. 27", [(15, "Broncos at Steelers", "Prime Video")])]

    def fade(t, t0, t1):
        return min(max((t - t0) / 0.5, 0), 1) * min(max((t1 - t) / 0.5, 0), 1)

    def scene1(c, t, a):
        header(c, "Sports · Thanksgiving", ["Pro Football Fell To One", "Thanksgiving Game In The 1950s,", "And This Week The NFL", "Is Playing Five"],
               ["Each square is one game, 1920 to 2026."], alpha=a, title_size=54)
        # legend
        items = [(GREEN, None, "NFL, Thanksgiving Day"), (GRAYL, None, "Rival leagues"), (LIGHT, GREEN, "Eve or Black Friday")]
        x = 110
        for col, ec, lab in items:
            c.rect(x, 728, 24, 24, col, z=4, alpha=a)
            if ec: c.line([x, x + 24, x + 24, x, x], [728, 728, 752, 752, 728], color=ec, lw=2, alpha=a, z=5)
            c.text(x + 34, 750, lab, size=24, color=MUTED, alpha=a)
            x += 34 + c.text_width(lab, 24) + 34
        for v in (2, 4, 6, 8):
            c.line([X0, X1], [BASE - v * U, BASE - v * U], color=GRID, lw=1.5, alpha=a, z=1)
            c.text(X0 - 14, BASE - v * U + 9, str(v), size=22, color=FAINT, ha="right", alpha=a)
        c.line([X0, X1], [BASE, BASE], color=RULE, lw=2, alpha=a)
        cur = None
        for i, y in enumerate(yrs):
            ty = S1a + i * PER
            f = ease_out((t - ty) / 0.25)
            if f <= 0: continue
            cur = y
            x = X0 + i * step
            k = 0
            for col, n, ec in ((GREEN, nfl(y), None), (GRAYL, RIVAL.get(y, 0), None), (LIGHT, EXTRA.get(y, 0), GREEN)):
                for _ in range(n):
                    yy = BASE - (k + 1) * U + 2
                    c.rect(x, yy + (1 - f) * 30, bw, U - 4, col, z=4, alpha=a * f)
                    if ec: c.line([x, x + bw, x + bw, x, x], [yy, yy, yy + U - 4, yy + U - 4, yy], color=ec, lw=1.5, alpha=a * f, z=5)
                    k += 1
        for y in (1920, 1940, 1960, 1980, 2000, 2026):
            c.text(X0 + (y - 1920) * step + bw / 2, BASE + 40, str(y), size=24, color=INK if y == 2026 else FAINT,
                   weight="bold" if y == 2026 else "normal", ha="right" if y == 2026 else "center", alpha=a)
        if cur:
            n = nfl(cur) + RIVAL.get(cur, 0) + EXTRA.get(cur, 0)
            c.text(X1, 900, str(cur), size=44, color=MUTED, ha="right", alpha=a)
            c.text(X1, 976, f"{n} game" + ("" if n == 1 else "s"), size=64, weight="bold", color=GREEN, ha="right", alpha=a)
        for yr, lv, lab, ha, up in ANN:
            ta = S1a + (int(yr) - 1920) * PER + 0.3
            fa = min(max((t - ta) / 0.4, 0), 1) * a
            if fa <= 0: continue
            x = X0 + (int(yr) - 1920) * step + (step / 2 if yr % 1 else bw / 2)
            yb = BASE - lv * U
            c.line([x, x], [yb - up + 6, yb - 6], color=MUTED, lw=1.5, alpha=fa)
            tx = x - 6 if ha == "left" else x + 6 if ha == "right" else x
            c.text(tx, yb - up - 4, lab, size=26, weight="bold", ha={"left": "left", "right": "right", "center": "center"}[ha], alpha=fa)

    def scene2(c, t, a):
        header(c, "Sports · Thanksgiving", ["The NFL’s Thanksgiving Now", "Runs Wednesday To Friday"],
               ["2026 kickoff times, Eastern. About 16 hours", "of football in three days."], alpha=a)
        L, R, top, rh = 210, 1000, 760, 190
        X = lambda h: L + (h - 11) / 13 * (R - L)
        for h in (11, 14, 17, 20, 23):
            c.line([X(h), X(h)], [top - 10, top + 3 * rh], color=GRID, lw=1.5, alpha=a, z=1)
            lab = {11: "11a", 14: "2p", 17: "5p", 20: "8p", 23: "11p"}[h]
            c.text(X(h), top - 26, lab, size=24, color=FAINT, ha="center", alpha=a)
        k = 0
        for i, (d, dt, games) in enumerate(WEEK):
            y = top + i * rh
            c.line([60, R], [y + rh, y + rh], color=RULE, lw=1.5, alpha=a)
            c.text(60, y + rh / 2 - 4, d, size=36, weight="bold", alpha=a)
            c.text(60, y + rh / 2 + 34, dt, size=24, color=MUTED, alpha=a)
            for h0, lab, net in games:
                f = ease_out((t - S2 - 0.6 - k * 0.45) / 0.6)
                k += 1
                if f <= 0: continue
                w = (X(h0 + 3.25) - X(h0)) * f
                c.rect(X(h0), y + 30, w, rh - 60, GREEN, z=4, alpha=a, radius=12)
                if f > 0.9:
                    short = lab.split(" at ")
                    c.text(X(h0) + 14, y + rh / 2 - 6, short[0] + " at", size=24, color="white", weight="bold", alpha=a, z=6)
                    c.text(X(h0) + 14, y + rh / 2 + 24, short[1], size=24, color="white", weight="bold", alpha=a, z=6)
                    c.text(X(h0) + 14, y + rh / 2 + 54, net, size=20, color="#DDEFE6", alpha=a, z=6)

    def scene3(c, t, a):
        header(c, "Sports · Thanksgiving", ["Why The NFL Keeps", "Adding Games"], ["Viewers for last year’s Thanksgiving games."], alpha=a)
        items = [("57.2M", "Chiefs-Cowboys, the most-watched", "regular-season NFL game ever", GREEN),
                 ("44.7M", "Average for the three Thursday games,", "up from 34.5M in 2024", INK),
                 ("5", "NFL games this week,", "Wednesday to Friday", "#B8483A")]
        for i, (big, s1, s2, col) in enumerate(items):
            f = ease_out((t - S3 - 0.4 - i * 0.9) / 0.5)
            if f <= 0: continue
            y = 780 + i * 260 + (1 - f) * 40
            c.text(W / 2, y, big, size=104, weight="bold", color=col, ha="center", alpha=a * f)
            c.text(W / 2, y + 60, s1, size=31, color=MUTED, ha="center", alpha=a * f)
            c.text(W / 2, y + 100, s2, size=31, color=MUTED, ha="center", alpha=a * f)

    def draw(c, t):
        brand_block(c)
        a1 = min(max((S2 - t) / 0.5, 0), 1)
        a2 = fade(t, S2, S3)
        a3 = min(max((t - S3) / 0.5, 0), 1)
        if a1 > 0: scene1(c, t, a1)
        if a2 > 0: scene2(c, t, a2)
        if a3 > 0: scene3(c, t, a3)
        src = "Source: NFL" if t > S3 - 0.3 else "Source: NFL 2026 schedule; end times estimated" if t > S2 - 0.3 else "Source: Wikipedia, NFL on Thanksgiving Day; NFL"
        footer(c, src)
        bottom_band(c)

    return draw, END

POSTS.update({"tgribbon": tgribbon})

if __name__ == "__main__":
    name = sys.argv[1]
    draw, dur = POSTS[name]()
    if len(sys.argv) > 2:
        for ts in sys.argv[2:]:
            t = dur - 0.05 if ts == "end" else float(ts)
            still(draw, t, f"{OUT}{name}_t{ts}.png")
        print(name, "duration", round(dur, 1))
    else:
        render(draw, dur, f"{OUT}{name}.mp4", cover_out=f"{OUT}{name}_cover.png")
        print("rendered", name, round(dur, 1))
