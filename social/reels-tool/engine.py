"""The News in Data reel engine: 1080x1920 light-theme frames drawn with matplotlib, piped to ffmpeg.

Layout (pixels, y down):
  0-240     top band, outside the profile-grid crop: small brand block
  240-1680  3:4 grid-safe area: kicker, title, subtitle, scrubber, chart, source
  1680-1920 bottom band (covered by the Reels caption): brand line
"""
import math, os, subprocess
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle

W, H, FPS = 1080, 1920, 30

for f in ["LiberationSerif-Regular.ttf", "LiberationSerif-Bold.ttf", "LiberationSerif-Italic.ttf"]:
    font_manager.fontManager.addfont("/usr/share/fonts/truetype/liberation/" + f)
SERIF = "Liberation Serif"   # metric-identical to Times New Roman

BG = "#FBFCFA"
INK = "#13241B"
MUTED = "#5F7268"
FAINT = "#9AA9A1"
RULE = "#DCE5E0"
GRID = "#EBF1ED"
GREEN = "#007A55"
GREEN_LT = "#CFE7DC"
RED = "#B8483A"
BLUE = "#2F5D8A"
SAND = "#C9A46A"
PALETTE = ["#007A55", "#2F5D8A", "#B8483A", "#C9A46A", "#6B8F71", "#7A5C99",
           "#D07B3C", "#3E8E9E", "#8C6D46", "#A35D7A", "#5E7F3C", "#4B6584"]

PT = 72 / 100  # matplotlib font size is in points; figure dpi 100 -> px * 0.72


def ease(t):
    t = min(max(t, 0.0), 1.0)
    return 0.5 - 0.5 * math.cos(math.pi * t)


def ease_out(t):
    t = min(max(t, 0.0), 1.0)
    return 1 - (1 - t) ** 3


def fmt_num(v, dec=0):
    if dec == 0:
        return f"{v:,.0f}"
    return f"{v:,.{dec}f}"


class Canvas:
    def __init__(self):
        self.fig = plt.figure(figsize=(W / 100, H / 100), dpi=100)
        self.ax = self.fig.add_axes([0, 0, 1, 1])
        self.reset()

    def reset(self):
        ax = self.ax
        ax.cla()
        ax.set_xlim(0, W)
        ax.set_ylim(H, 0)
        ax.axis("off")
        self.fig.patch.set_facecolor(BG)
        ax.set_facecolor(BG)

    # primitives -----------------------------------------------------------
    def text(self, x, y, s, size=30, color=INK, weight="normal", ha="left", va="baseline",
             style="normal", alpha=1.0, z=5):
        return self.ax.text(x, y, s, fontsize=size * PT, color=color, fontweight=weight, ha=ha,
                            va=va, family=SERIF, fontstyle=style, alpha=alpha, zorder=z)

    def rect(self, x, y, w, h, color, z=2, alpha=1.0, radius=0):
        if w <= 0 or h <= 0:
            return
        if radius:
            p = FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad=0,rounding_size={min(radius, w/2, h/2)}",
                               fc=color, ec="none", zorder=z, alpha=alpha)
        else:
            p = Rectangle((x, y), w, h, fc=color, ec="none", zorder=z, alpha=alpha)
        self.ax.add_patch(p)

    def line(self, xs, ys, color=INK, lw=2, z=3, alpha=1.0, dash=None, cap="round"):
        l, = self.ax.plot(xs, ys, color=color, lw=lw * PT, zorder=z, alpha=alpha,
                          solid_capstyle=cap, dash_capstyle=cap)
        if dash:
            l.set_dashes(dash)
        return l

    def circle(self, x, y, r, color, z=6, ec=None, lw=0, alpha=1.0):
        self.ax.add_patch(Circle((x, y), r, fc=color, ec=ec or "none", lw=lw * PT, zorder=z, alpha=alpha))

    def text_width(self, s, size, weight="normal"):
        t = self.text(-5000, -5000, s, size=size, weight=weight)
        r = self.fig.canvas.get_renderer()
        bb = t.get_window_extent(renderer=r)
        t.remove()
        return bb.width

    def rgb(self):
        self.fig.canvas.draw()
        buf = np.asarray(self.fig.canvas.buffer_rgba())
        return buf[:, :, :3].copy()


# shared frame furniture ---------------------------------------------------
def brand_block(c, y=150, scale=1.0):
    s = "The News in Data"
    size = 30 * scale
    tw = c.text_width(s, size, "bold")
    pad_x, h = 18 * scale, 50 * scale
    x0 = W / 2 - tw / 2 - pad_x
    c.rect(x0, y - h / 2, tw + 2 * pad_x, h, GREEN, z=4)
    c.text(W / 2, y + 1, s, size=size, color="white", weight="bold", ha="center", va="center", z=5)


def header(c, kicker, title_lines, subtitle_lines=(), alpha=1.0, title_size=62):
    y = 300
    c.text(W / 2, y, kicker.upper(), size=24, color=GREEN, weight="bold", ha="center", alpha=alpha)
    y += 78
    for ln in title_lines:
        c.text(W / 2, y, ln, size=title_size, weight="bold", ha="center", alpha=alpha)
        y += title_size * 1.12
    y += 4
    for ln in subtitle_lines:
        c.text(W / 2, y, ln, size=29, color=MUTED, ha="center", alpha=alpha)
        y += 38
    return y


def scrubber(c, y, v0, v1, v, label=None, ticks=None, x0=130, x1=950):
    """Timeline with a moving knob, The News in Data's version of a time slider."""
    c.line([x0, x1], [y, y], color=RULE, lw=4)
    frac = 0 if v1 == v0 else (v - v0) / (v1 - v0)
    frac = min(max(frac, 0), 1)
    xk = x0 + frac * (x1 - x0)
    c.line([x0, xk], [y, y], color=GREEN, lw=4)
    for tv in (ticks or [v0, v1]):
        tx = x0 + (tv - v0) / (v1 - v0) * (x1 - x0)
        c.text(tx, y + 36, str(tv), size=22, color=FAINT, ha="center")
    c.circle(xk, y, 15, "white", ec=GREEN, lw=5, z=7)
    c.circle(xk, y, 5, GREEN, z=8)
    if label is not None:
        c.text(xk, y - 26, label, size=28, weight="bold", ha="center", color=INK)


def footer(c, source, y=1640):
    c.line([60, W - 60], [y - 44, y - 44], color=RULE, lw=2)
    c.text(60, y, source, size=21, color=MUTED)
    c.text(W - 60, y, "thenewsindata.com", size=22, color=GREEN, weight="bold", ha="right")


def bottom_band(c):
    c.text(W / 2, 1770, "Charts that explain the news, since 2016", size=26, color=FAINT,
           ha="center", style="italic")


# rendering ----------------------------------------------------------------
def render(draw, duration, out, cover_t=None, cover_out=None):
    n = int(round(duration * FPS))
    tmp = out[:-4] + ".part.mp4"
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
           "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "18",
           "-preset", "veryfast", "-pix_fmt", "yuv420p", "-movflags", "+faststart", tmp]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    c = Canvas()
    for i in range(n):
        t = i / FPS
        c.reset()
        draw(c, t)
        p.stdin.write(c.rgb().tobytes())
    p.stdin.close()
    if p.wait() != 0:
        raise RuntimeError("ffmpeg failed for " + out)
    os.replace(tmp, out)
    if cover_out:
        still(draw, cover_t if cover_t is not None else duration - 0.05, cover_out)
    plt.close(c.fig)


def still(draw, t, out):
    c = Canvas()
    draw(c, t)
    c.fig.canvas.draw()
    c.fig.savefig(out, dpi=100, facecolor=BG)
    plt.close(c.fig)
