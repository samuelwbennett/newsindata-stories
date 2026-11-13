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
