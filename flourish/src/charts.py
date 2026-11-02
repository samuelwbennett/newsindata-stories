"""Charts for two Global Flourishing Study stories. House style: Times New Roman (Liberation Serif metrics),
Title Case centered title, bold black axes, green highlight + gray context, direct labels, white background, no footer."""
import sys
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm

for f in fm.findSystemFonts():
    if "LiberationSerif" in f:
        fm.fontManager.addfont(f)
plt.rcParams["font.family"] = ["Times New Roman", "Liberation Serif", "serif"]
HI, GRAY, DARK, INK, GRID = "#007a55", "#b7c2bc", "#5f7268", "#13241b", "#e3eee7"
OUT = sys.argv[1] if len(sys.argv) > 1 else "."


def titles(fig, H, title, sub, s):
    y = 1 - 52 / H
    for i, t in enumerate(title):
        fig.text(0.5, y - i * 44 * s / H, t, ha="center", va="top", fontsize=33 * s, fontweight="bold", color=INK)
    y2 = y - len(title) * 44 * s / H - 8 / H
    for i, t in enumerate(sub):
        fig.text(0.5, y2 - i * 26 * s / H, t, ha="center", va="top", fontsize=18.5 * s, color="#34473c")


def axes_style(ax, s):
    for sp in ("top", "right"):
        ax.spines[sp].set_visible(False)
    for sp in ("left", "bottom"):
        ax.spines[sp].set_color("black"); ax.spines[sp].set_linewidth(2.4)
    ax.tick_params(length=0, pad=7)


# ---------- Story 1: no one close ----------
def close_chart(path, W, H, box, title, sub, s, compact=False):
    d = pd.read_csv("/home/claude/gfs/closeto.csv").sort_values("no_close_pct")
    fig = plt.figure(figsize=(W / 100, H / 100), dpi=100, facecolor="white")
    titles(fig, H, title, sub, s)
    ax = fig.add_axes(box)
    y = np.arange(len(d))
    cols = [HI if c == "Japan" else (DARK if c == "United States" else GRAY) for c in d.country]
    ax.barh(y, d.no_close_pct, color=cols, height=0.72, zorder=2)
    for yy, v, c in zip(y, d.no_close_pct, d.country):
        bold = c in ("Japan", "United States")
        ax.text(v + 0.5, yy, f"{v:.1f}%", va="center", fontsize=(15 if compact else 16) * s,
                fontweight="bold" if bold else "normal", color=HI if c == "Japan" else INK,
                bbox=dict(boxstyle="square,pad=0.12", fc="white", ec="none"), zorder=4)
    ax.set_yticks(y)
    ax.set_yticklabels(d.country, fontsize=(14 if compact else 17) * s, color=INK)
    for lab in ax.get_yticklabels():
        if lab.get_text() in ("Japan", "United States"):
            lab.set_fontweight("bold")
        if lab.get_text() == "Japan":
            lab.set_color(HI)
    ax.set_xlim(0, 40); ax.set_ylim(-0.6, len(d) - 0.4)
    ax.set_xticks(range(0, 41, 10))
    ax.set_xticklabels([f"{x}%" for x in range(0, 41, 10)], fontsize=15 * s, fontweight="bold", color=INK)
    for x in range(10, 41, 10):
        ax.axvline(x, color=GRID, lw=1.2, zorder=0)
    ax.set_xlabel("PERCENT OF ADULTS ANSWERING NO", fontsize=14 * s, fontweight="bold", color=INK, labelpad=8)
    med = d.no_close_pct.median()
    ax.axvline(med, color=INK, lw=1.2, ls=(0, (4, 3)), zorder=1)
    ax.text(med + 0.4, -0.45 if not compact else 0.2, f"Median of 22: {med:.1f}%", fontsize=14 * s, color=INK, style="italic", va="bottom")
    jy = list(d.country).index("Japan")
    ax.annotate("Japanese men: 38.2%", xy=(32.8, jy), xytext=(35.5, jy - 2.2), fontsize=15 * s, color=HI,
                fontweight="bold", ha="center", arrowprops=dict(arrowstyle="-", color=HI, lw=1.2))
    axes_style(ax, s)
    ax.tick_params(axis="y", pad=6)
    fig.savefig(path, dpi=100, facecolor="white"); plt.close(fig)


# ---------- Story 2: flourishing vs GDP ----------
def flourish_chart(path, W, H, box, title, sub, s, compact=False):
    d = pd.read_csv("/home/claude/gfs/flourish.csv")
    fig = plt.figure(figsize=(W / 100, H / 100), dpi=100, facecolor="white")
    titles(fig, H, title, sub, s)
    ax = fig.add_axes(box)
    x = d.gdp_pc_ppp_2023 / 1000
    hl = {"Indonesia", "Japan", "United States"}
    for xi, yi, c in zip(x, d.flourish, d.country):
        ax.scatter(xi, yi, s=(150 if c in hl else 95) * s, color=HI if c in hl else GRAY,
                   edgecolor="white", lw=1.2, zorder=3)
    # least-squares line on log GDP
    lx = np.log10(x); b, a = np.polyfit(lx, d.flourish, 1)
    xs = np.linspace(3.3, 80, 100)
    ax.plot(xs, a + b * np.log10(xs), color=INK, lw=1.4, ls=(0, (5, 4)), zorder=2)
    pos = {"Indonesia": (16.5, 8.47, "left"), "Mexico": (24, 8.19, "left"), "Philippines": (9.2, 8.13, "right"),
           "Israel": (47.7, 8.09, "center"), "Nigeria": (7.6, 7.96, "right"), "Argentina": (29.5, 7.79, "left"),
           "Kenya": (5.4, 7.66, "right"), "Brazil": (20.5, 7.56, "left"), "Egypt": (15.3, 7.71, "right"),
           "Poland": (40.5, 7.63, "right"), "Tanzania": (3.9, 7.39, "left"), "India": (8.6, 7.36, "right"),
           "South Africa": (14.4, 7.33, "left"), "Spain": (39, 7.36, "right"), "United States": (74.4, 7.31, "center"),
           "Hong Kong": (82, 7.15, "left"), "Germany": (72, 7.06, "left"), "Sweden": (74, 6.97, "left"),
           "Australia": (72, 6.88, "left"), "United Kingdom": (50, 6.78, "center"), "Turkey": (37, 6.59, "left"),
           "Japan": (51, 5.93, "left")}
    lead = {"Hong Kong", "Germany", "Sweden", "Australia", "Spain", "Egypt", "Poland"}
    for xi, yi, c in zip(x, d.flourish, d.country):
        tx, ty, ha = pos[c]
        if c in lead:
            ax.plot([xi, tx * (0.98 if ha == "left" else 1.02 if ha == "right" else 1)], [yi, ty - (0.025 if ty > yi else -0.025)],
                    color="#8a978f", lw=0.8, zorder=1)
        ax.text(tx, ty, c, ha=ha, va="center", fontsize=(17 if c in hl else 14.5) * s * (0.92 if compact else 1),
                fontweight="bold" if c in hl else "normal", color=HI if c in hl else INK, zorder=4)
    ax.set_xscale("log")
    ticks = [4, 8, 16, 32, 64]
    ax.set_xticks(ticks); ax.set_xticklabels([f"${t}K" for t in ticks], fontsize=15 * s, fontweight="bold", color=INK)
    ax.minorticks_off()
    ax.set_xlim(3.2, 135); ax.set_ylim(5.7, 8.75)
    yt = [6, 6.5, 7, 7.5, 8, 8.5]
    ax.set_yticks(yt); ax.set_yticklabels([f"{v:g}" for v in yt], fontsize=15 * s, fontweight="bold", color=INK)
    for v in yt:
        ax.axhline(v, color=GRID, lw=1.1, zorder=0)
    ax.set_xlabel("GDP PER PERSON, 2023 (PPP, 2021 DOLLARS, LOG SCALE)", fontsize=14 * s, fontweight="bold", color=INK, labelpad=8)
    ax.set_ylabel("FLOURISHING SCORE (0–10)", fontsize=14 * s, fontweight="bold", color=INK, labelpad=8)
    axes_style(ax, s)
    fig.savefig(path, dpi=100, facecolor="white"); plt.close(fig)


if __name__ == "__main__":
    import os
    fr, fl = f"{OUT}/friends", f"{OUT}/flourish"
    os.makedirs(fr, exist_ok=True); os.makedirs(fl, exist_ok=True)
    close_chart(f"{fr}/friends-chart.png", 1080, 1350, [0.24, 0.075, 0.68, 0.745],
                ["Share Of Adults With No One", "They Feel Very Close To"],
                ["Percent answering no to “Is there any one special person you know that you feel very close to?”",
                 "22 countries, 2022–23. Global Flourishing Study, Wave 1, weighted."], 1.0)
    close_chart(f"{fr}/friends-preview.png", 1200, 630, [0.2, 0.12, 0.74, 0.66],
                ["Share Of Adults With No One They Feel Very Close To"],
                ["Percent answering no. 22 countries, 2022–23. Global Flourishing Study, weighted."], 0.6, compact=True)
    flourish_chart(f"{fl}/flourish-chart.png", 1080, 1350, [0.13, 0.09, 0.82, 0.72],
                   ["Poorer Countries Score Higher", "On Flourishing"],
                   ["Average score on a 0–10 index of happiness, health, meaning, character and relationships",
                    "vs. GDP per person. 22 countries, 2022–23. Global Flourishing Study; World Bank."], 1.0)
    flourish_chart(f"{fl}/flourish-preview.png", 1200, 630, [0.1, 0.15, 0.86, 0.64],
                   ["Poorer Countries Score Higher On Flourishing"],
                   ["Average 0–10 flourishing score vs. GDP per person, 22 countries. Global Flourishing Study; World Bank."], 0.6, compact=True)
