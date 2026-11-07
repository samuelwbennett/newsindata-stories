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
