"""Reusable animated chart types for The News in Data reels."""
import math
import numpy as np
from engine import *

COUNTRY_COLORS = {
    "China": "#B8483A", "United States": "#2F5D8A", "India": "#D07B3C", "Japan": "#A35D7A",
    "Germany": "#4B4F54", "United Kingdom": "#6B7FA8", "Russia": "#7A5C99", "Spain": "#C9A46A",
    "Italy": "#5E7F3C", "France": "#3E8E9E", "Australia": "#007A55", "Brazil": "#8FB339",
    "South Korea": "#4B6584", "Poland": "#C2667A", "South Africa": "#8C6D46", "Indonesia": "#B07D2B",
    "Ukraine": "#E0B030", "Czechia": "#6B8F71", "Netherlands": "#E07B39", "Canada": "#9E3B3B",
    "Mexico": "#3B7A57", "Vietnam": "#A0522D", "Turkey": "#8B3A62", "Kazakhstan": "#5C8A8A",
    "Austria": "#9A7FB0", "Belgium": "#B5A642",
}


def nice_step(maxv, target=4):
    raw = maxv / target
    mag = 10 ** math.floor(math.log10(raw))
    for m in (1, 2, 2.5, 5, 10):
        if raw <= m * mag:
            return m * mag
    return 10 * mag


def note_card(c, lines, y, a, x_right=1010, size=28):
    """White card with a green rule, right-aligned in the chart's empty corner."""
    w = max(c.text_width(ln, size, "bold" if j == 0 else "normal") for j, ln in enumerate(lines)) + 56
    h = len(lines) * size * 1.35 + 40
    x0 = x_right - w
    c.rect(x0, y, w, h, "white", z=8, alpha=a, radius=10)
    c.line([x0, x0 + w, x0 + w, x0, x0], [y, y, y + h, y + h, y], color=RULE, lw=2, z=8, alpha=a)
    c.rect(x0, y, 8, h, GREEN, z=9, alpha=a)
    for j, ln in enumerate(lines):
        c.text(x0 + 30, y + 30 + size * 0.75 + j * size * 1.35, ln, size=size, z=10, alpha=a,
               color=GREEN if j == 0 else INK, weight="bold" if j == 0 else "normal")


def bar_race(series, years, *, kicker, title, subtitle, source, unit_fmt, n_bars=10,
             sec_per_year=0.7, intro=1.2, hold=3.6, end_note=None, title_size=62):
    """series: dict name -> {year: value}. Returns (draw, duration)."""
    names = list(series)
    yrs = list(years)
    data = np.array([[series[n].get(y, np.nan) for y in yrs] for n in names], dtype=float)
    # fill gaps by interpolation inside each row; leading gaps = 0
    for i in range(len(names)):
        row = data[i]
        ok = ~np.isnan(row)
        if ok.any():
            row[:np.argmax(ok)] = 0
            idx = np.arange(len(row))
            row[:] = np.interp(idx, idx[~np.isnan(row)], row[~np.isnan(row)])
        else:
            row[:] = 0
    anim = (len(yrs) - 1) * sec_per_year
    duration = intro + anim + hold
    ranks = np.empty_like(data)
    for j in range(data.shape[1]):
        o = np.argsort(-data[:, j], kind="stable")
        ranks[o, j] = np.arange(len(names))
    X0, XMAX = 300, 860          # bar start, longest bar end
    TOP, SLOT, BH = 760, 78, 54

    def values_at(tau):
        i = int(math.floor(tau))
        if i >= len(yrs) - 1:
            return data[:, -1], float(yrs[-1])
        f = tau - i
        return data[:, i] * (1 - f) + data[:, i + 1] * f, yrs[i] + f

    def draw(c, t):
        tau = min(max(t - intro, 0) / sec_per_year, len(yrs) - 1)
        vals, yearf = values_at(tau)
        grow = ease_out(min(t / intro, 1)) if t < intro else 1.0
        order = np.argsort(-vals)
        i0 = min(int(math.floor(tau)), len(yrs) - 1)
        i1 = min(i0 + 1, len(yrs) - 1)
        e = ease(tau - i0) if i1 != i0 else 0.0
        pos = ranks[:, i0] * (1 - e) + ranks[:, i1] * e

        brand_block(c)
        y = header(c, kicker, title, subtitle, title_size=title_size)
        yr_now = int(round(yearf)) if tau >= len(yrs) - 1 else int(math.floor(yearf))
        scrubber(c, 640, yrs[0], yrs[-1], yearf, label=str(yr_now))

        vmax = max(vals[order[0]], 1e-9)
        scale = (XMAX - X0) / vmax
        step = nice_step(vmax)
        k = 1
        while k * step <= vmax * 1.001:
            gx = X0 + k * step * scale
            if gx <= XMAX + 5:
                c.line([gx, gx], [TOP - 34, TOP + n_bars * SLOT - 20], color=GRID, lw=2, z=1)
                c.text(gx, TOP - 44, unit_fmt(k * step, short=True), size=20, color=FAINT, ha="center")
            k += 1
        c.line([X0, X0], [TOP - 34, TOP + n_bars * SLOT - 20], color=RULE, lw=2, z=1)

        # big year, bottom right of chart
        c.text(XMAX + 120, TOP + n_bars * SLOT - 40, str(yr_now), size=120, weight="bold",
               color=GRID, ha="right", z=1)

        for i in range(len(names)):
            p = pos[i]
            if p > n_bars - 0.35 or vals[i] <= 0:
                continue
            yb = TOP + p * SLOT
            fade = 1.0 if p <= n_bars - 1 else max(0.0, (n_bars - 0.35 - p) / 0.65)
            col = COUNTRY_COLORS.get(names[i], PALETTE[i % len(PALETTE)])
            w = vals[i] * scale * grow
            c.rect(X0, yb, max(w, 3), BH, col, z=3, alpha=fade, radius=4)
            c.text(X0 - 14, yb + BH / 2 + 1, names[i], size=27, ha="right", va="center",
                   color=INK, alpha=fade, weight="bold" if p < 0.5 else "normal")
            c.text(X0 + max(w, 3) + 12, yb + BH / 2 + 1, unit_fmt(vals[i] * grow), size=25,
                   va="center", color=MUTED, alpha=fade)

        if end_note and t > intro + anim + 0.4:
            a = ease((t - intro - anim - 0.4) / 0.8)
            note_card(c, end_note, TOP + 3.2 * SLOT, a)
        footer(c, source)
        bottom_band(c)

    return draw, duration


def rank_reveal(items, *, kicker, title, subtitle, source, val_fmt, highlight=None,
                per_item=0.55, intro=1.0, hold=3.6, ref=None, notes=None, end_note=None,
                label_w=None, title_size=62, xmax=None, slot=None, err=None):
    """items: list of (label, sublabel, value) in display order top->bottom. Bars grow one by one,
    bottom (lowest rank) first. highlight: set of labels drawn in green."""
    n = len(items)
    duration = intro + n * per_item + 0.6 + hold
    vmax = xmax or max(v for _, _, v in items)
    X0 = label_w or 330
    XMAX = 880
    SLOT = slot or min(84, int(860 / n))
    BH = int(SLOT * 0.66)
    TOP = 760

    def draw(c, t):
        brand_block(c)
        header(c, kicker, title, subtitle, title_size=title_size)
        scale = (XMAX - X0) / vmax
        bottom = TOP + n * SLOT - (SLOT - BH)
        c.line([X0, X0], [TOP - 20, bottom + 10], color=RULE, lw=2, z=1)
        if ref is not None:
            rv, rlab = ref
            rx = X0 + rv * scale
            a = ease((t - 0.3) / 0.6)
            c.line([rx, rx], [TOP - 30, bottom + 10], color=INK, lw=2, dash=(4, 4), z=4, alpha=a)
            c.text(rx, TOP - 40, rlab, size=22, ha="center", color=INK, alpha=a)
        for k, (lab, sub, v) in enumerate(items):
            order_k = n - 1 - k                   # bottom item appears first
            t0 = intro + order_k * per_item
            g = ease_out((t - t0) / 0.7)
            if g <= 0:
                continue
            yb = TOP + k * SLOT
            hi = highlight and lab in highlight
            col = GREEN if hi else "#AEBBB4"
            w = v * scale * g
            c.rect(X0, yb, max(w, 2), BH, col, z=3, radius=4)
            if err:
                e = err[k] * scale * g
                cy = yb + BH / 2
                c.line([max(X0, X0 + w - e), X0 + w + e], [cy, cy], color=INK, lw=2, z=4, alpha=0.45 * g)
            ty = yb + BH / 2 + 1 if not sub else yb + BH / 2 - 9
            c.text(X0 - 14, ty, lab, size=27, ha="right", va="center", color=INK, alpha=g,
                   weight="bold" if hi else "normal")
            if sub:
                c.text(X0 - 14, yb + BH / 2 + 17, sub, size=20, ha="right", va="center",
                       color=MUTED, alpha=g)
            vx = X0 + max(w, 2) + 12 + (err[k] * scale * g if err else 0)
            if ref is not None:
                vw = c.text_width(val_fmt(v), 26)
                c.rect(vx - 6, yb + BH / 2 - 17, vw + 12, 34, BG, z=4.6, alpha=g)
            c.text(vx, yb + BH / 2 + 1, val_fmt(v), size=26, va="center",
                   color=GREEN if hi else MUTED, weight="bold" if hi else "normal", alpha=g)
            if notes and lab in notes:
                c.text(vx + c.text_width(val_fmt(v), 26) + 14, yb + BH / 2 + 1, notes[lab], size=22,
                       va="center", color=GREEN if hi else MUTED, style="italic", alpha=g)
        if end_note:
            t_end = intro + n * per_item + 0.6
            a = ease((t - t_end) / 0.8)
            yy = bottom + 70
            for j, ln in enumerate(end_note):
                c.text(W / 2, yy + j * 40, ln, size=30, ha="center", color=GREEN if j == 0 else INK,
                       weight="bold" if j == 0 else "normal", alpha=a)
        footer(c, source)
        bottom_band(c)

    return draw, duration


def line_race(xs, lines, *, kicker, title, subtitle, source, y_fmt, x_label_fmt, ymax,
              intro=0.9, anim=9.0, hold=3.6, ticks_x=None, y_step=None, end_note=None,
              scrub_label=None, title_size=62, events=None, note_xy=(560, 750), R=840):
    """xs: array of x positions (e.g., decimal years). lines: list of dict(name, ys, color, lw, label_dy)."""
    xs = np.asarray(xs, float)
    duration = intro + anim + hold
    L, T, B = 130, 740, 1460

    def draw(c, t):
        brand_block(c)
        header(c, kicker, title, subtitle, title_size=title_size)
        p = ease(min(max((t - intro) / anim, 0), 1))
        xcur = xs[0] + p * (xs[-1] - xs[0])
        scrubber(c, 640, int(xs[0]), int(xs[-1]), xcur,
                 label=scrub_label(xcur) if scrub_label else str(int(xcur)))

        def X(v):
            return L + (v - xs[0]) / (xs[-1] - xs[0]) * (R - L)

        def Y(v):
            return B - v / ymax * (B - T)
        step = y_step or nice_step(ymax)
        v = 0
        while v <= ymax + 1e-9:
            c.line([L, R + 20], [Y(v), Y(v)], color=GRID if v else RULE, lw=2, z=1)
            c.text(L - 12, Y(v) + 8, y_fmt(v), size=21, color=FAINT, ha="right")
            v += step
        for tx in (ticks_x or []):
            c.text(X(tx), B + 38, x_label_fmt(tx), size=21, color=FAINT, ha="center")
        if events:
            for ex, elab in events:
                if xcur >= ex:
                    a = ease((xcur - ex) / ((xs[-1] - xs[0]) * 0.06 + 1e-9))
                    c.line([X(ex), X(ex)], [T - 10, B], color=FAINT, lw=1.5, dash=(3, 4), z=1, alpha=a)
                    c.text(X(ex) + 6, T + 4, elab, size=20, color=MUTED, style="italic", alpha=a)
        for ln in lines:
            ys = np.asarray(ln["ys"], float)
            m = xs <= xcur
            px = list(xs[m]); py = list(ys[m])
            if xcur > xs[0] and xcur < xs[-1]:
                j = np.searchsorted(xs, xcur)
                f = (xcur - xs[j - 1]) / (xs[j] - xs[j - 1])
                px.append(xcur); py.append(ys[j - 1] * (1 - f) + ys[j] * f)
            if not px:
                px, py = [xs[0]], [ys[0]]
            sx = [X(a) for a in px]; sy = [Y(b) for b in py]
            c.line(sx, sy, color=ln["color"], lw=ln.get("lw", 6), z=4)
            if ln.get("dots"):
                for a, b in zip(sx[:len(xs[m])], sy[:len(xs[m])]):
                    c.circle(a, b, 6, ln["color"], z=5)
            c.circle(sx[-1], sy[-1], 9, ln["color"], z=6)
            ly = sy[-1] + ln.get("label_dy", 0)
            c.text(sx[-1] + 18, ly - 2, ln["name"], size=25, color=ln["color"], weight="bold", z=6)
            c.text(sx[-1] + 18, ly + 26, y_fmt(py[-1], tip=True), size=24, color=ln["color"], z=6)
        if end_note:
            a = ease((t - intro - anim - 0.3) / 0.8)
            if a > 0:
                note_card(c, end_note, note_xy[1], a, x_right=note_xy[0])
        footer(c, source)
        bottom_band(c)

    return draw, duration
