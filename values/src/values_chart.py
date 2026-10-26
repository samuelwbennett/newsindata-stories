"""Dumbbell chart: values Americans say the country needs most vs. values they think most Americans share.
Gallup Panel, May 12-22, 2026 (published Oct. 25, 2026). House style: Times New Roman (Liberation Serif metrics),
Title Case centered title, bold black axes, green highlight, gray context, direct labels, no legend, no footer."""
import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm

for f in fm.findSystemFonts():
    if "LiberationSerif" in f or "Times" in f:
        fm.fontManager.addfont(f)
plt.rcParams["font.family"] = ["Times New Roman", "Liberation Serif", "serif"]

HI, GRAY, INK, MUT, GRID, BG = "#007a55", "#9aa8a0", "#13241b", "#5f7268", "#e3eee7", "#fbfcfa"

# (value, needed most %, shared by most %)
ROWS = [("Honesty", 34, 13), ("Responsibility", 32, 14), ("Integrity", 31, 13), ("Equality", 29, 15),
        ("Fairness", 26, 15), ("Courage", 21, 13), ("Humility", 15, 10), ("Respect", 24, 20),
        ("Kindness", 20, 24), ("Patriotism", 21, 32), ("Freedom", 25, 38), ("Service", 13, 30)]
assert [r[1] - r[2] for r in ROWS] == sorted([r[1] - r[2] for r in ROWS], reverse=True)


def graph_paper(fig, step):
    ax = fig.add_axes([0, 0, 1, 1], zorder=-10)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
    w, h = fig.get_size_inches() * fig.dpi
    for x in range(0, int(w) + 1, step):
        ax.axvline(x / w, color=GRID, lw=0.8)
    for y in range(0, int(h) + 1, step):
        ax.axhline(y / h, color=GRID, lw=0.8)


def draw(path, W, H, box, title, sub, s):
    """box = [left, bottom, width, height] of the plot area in figure fractions; s = text scale."""
    fig = plt.figure(figsize=(W / 100, H / 100), dpi=100, facecolor=BG)
    graph_paper(fig, 28)
    fig.text(0.5, 1 - 0.045 * 1350 / H * (H / 1350) ** 0 - 0.0, "", )
    ty = 1 - 60 / H
    for i, line in enumerate(title):
        fig.text(0.5, ty - i * 46 * s / H, line, ha="center", va="top", fontsize=34 * s, fontweight="bold", color=INK)
    sy = ty - len(title) * 46 * s / H - 10 / H
    for i, line in enumerate(sub):
        fig.text(0.5, sy - i * 27 * s / H, line, ha="center", va="top", fontsize=19 * s, color="#34473c")

    ax = fig.add_axes(box)
    ax.set_facecolor("white")
    n = len(ROWS)
    ys = list(range(n - 1, -1, -1))
    ax.set_xlim(0, 42); ax.set_ylim(-0.8, n - 0.25)
    for x in range(0, 41, 10):
        ax.axvline(x, color=GRID, lw=1.3, zorder=0)
    # divider between values needed more than shared and the reverse
    div = n - 8.5
    ax.axhline(div, color=INK, lw=1, ls=(0, (4, 3)), zorder=1)
    ax.text(41.5, div + 0.18, "Needed more than shared ↑", ha="right", va="bottom", fontsize=15 * s, color=MUT, style="italic")
    ax.text(41.5, div - 0.18, "Shared more than needed ↓", ha="right", va="top", fontsize=15 * s, color=MUT, style="italic")

    r = 13 * s
    for (name, need, share), y in zip(ROWS, ys):
        ax.plot([share, need], [y, y], color=HI if need > share else GRAY, lw=4 * s, alpha=0.45, solid_capstyle="butt", zorder=2)
        ax.plot(share, y, "o", ms=r, color=GRAY, mec="white", mew=1.5, zorder=3)
        ax.plot(need, y, "o", ms=r, color=HI, mec="white", mew=1.5, zorder=4)
        left, right = (share, need) if share < need else (need, share)
        lc = GRAY if share < need else HI
        rc = HI if share < need else GRAY
        ax.text(left - 1.0, y, f"{left}%", ha="right", va="center", fontsize=17 * s, fontweight="bold",
                color="#6b7a72" if lc == GRAY else HI)
        ax.text(right + 1.0, y, f"{right}%", ha="left", va="center", fontsize=17 * s, fontweight="bold",
                color="#6b7a72" if rc == GRAY else HI)
    # direct labels on the top row instead of a legend
    top = ys[0]
    ax.text(34, top + 0.48, "Country needs it most", ha="center", va="bottom", fontsize=16 * s, fontweight="bold", color=HI)
    ax.text(13, top + 0.48, "Most Americans share it", ha="center", va="bottom", fontsize=16 * s, fontweight="bold", color="#6b7a72")

    ax.set_yticks(ys)
    ax.set_yticklabels([r[0] for r in ROWS], fontsize=19 * s, fontweight="bold", color=INK)
    ax.set_xticks(range(0, 41, 10))
    ax.set_xticklabels([f"{x}%" for x in range(0, 41, 10)], fontsize=16 * s, fontweight="bold", color=INK)
    ax.set_xlabel("PERCENT OF U.S. ADULTS", fontsize=15 * s, fontweight="bold", color=INK, labelpad=8)
    for sp in ("top", "right"):
        ax.spines[sp].set_visible(False)
    for sp in ("left", "bottom"):
        ax.spines[sp].set_color("black"); ax.spines[sp].set_linewidth(2.4)
    ax.tick_params(axis="both", length=0, pad=8)
    fig.savefig(path, dpi=100, facecolor=BG)
    plt.close(fig)


if __name__ == "__main__":
    out = sys.argv[1]
    sub = ["Percent of U.S. adults naming each of 12 values. “Needs most” allowed three picks;",
           "“shared” allowed any number. Sorted by the gap. Gallup Panel, 3,199 adults, May 2026."]
    draw(f"{out}/values-chart.png", 1080, 1350, [0.2, 0.085, 0.72, 0.73],
         ["The Values Americans Say The Country Needs", "vs. The Values They Think Most Share"], sub, 1.0)
    draw(f"{out}/values-preview.png", 1200, 630, [0.17, 0.12, 0.78, 0.62],
         ["The Values Americans Say The Country Needs vs. The Ones They Think Most Share"],
         ["Percent of U.S. adults. “Needs most” allowed three picks; “shared” allowed any number. Gallup, May 2026."], 0.62)
