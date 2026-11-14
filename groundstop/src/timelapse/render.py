"""Time lapse of aircraft over North America on Nov. 13, 2026 (adsb.lol data).
usage: python3 render.py <tall|wide> <stills|full>
"""
import sys, json, subprocess, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import gaussian_filter, median_filter

MODE, WHAT = sys.argv[1], sys.argv[2]
GREEN = (0, 122, 85)
INK = (20, 20, 20)
GRAY = (120, 120, 120)
LIGHT = (238, 241, 239)
FD = '/usr/share/fonts/truetype/liberation/LiberationSerif-'
def F(sz, b=False, i=False):
    return ImageFont.truetype(FD + ('BoldItalic' if b and i else 'Bold' if b else 'Italic' if i else 'Regular') + '.ttf', sz)

if MODE == 'tall':
    W, H = 1080, 1920
    MAP = (0, 560, 1080, 1250)            # x0,y0,x1,y1
    VIEW = dict(lon0=-96.5, lat0=38.2, span=5.35e6)   # metres across map width
    L = dict(title_y=268, title_sz=58, sub_y=408, sub_sz=30, clock_y=462, clock_sz=64,
             count_xy=(540, 1268), chart=(96, 1400, 1010, 1600), credit_y=1672, cx=540)
else:
    W, H = 1920, 1080
    MAP = (0, 0, 1250, 1080)
    VIEW = dict(lon0=-97.5, lat0=40.5, span=7.4e6)
    L = dict(title_y=92, title_sz=50, sub_y=232, sub_sz=27, clock_y=300, clock_sz=64,
             count_xy=(1585, 392), chart=(1318, 610, 1850, 850), credit_y=936, cx=1585)

# ---- Albers equal-area conic
R = 6371000.0
p1, p2 = np.radians(29.5), np.radians(45.5)
n_ = (np.sin(p1) + np.sin(p2)) / 2
C_ = np.cos(p1) ** 2 + 2 * n_ * np.sin(p1)
def rho(lat): return R * np.sqrt(C_ - 2 * n_ * np.sin(np.radians(lat))) / n_
rho0 = rho(VIEW['lat0'])
mw, mh = MAP[2] - MAP[0], MAP[3] - MAP[1]
SC = mw / VIEW['span']
def proj(lon, lat):
    th = n_ * np.radians(np.asarray(lon) - VIEW['lon0'])
    r = rho(np.asarray(lat))
    x = r * np.sin(th); y = rho0 - r * np.cos(th)
    return MAP[0] + mw / 2 + x * SC, MAP[1] + mh / 2 - y * SC

# ---- data
fri, thu = np.load('/home/claude/adsb/fri.npz'), np.load('/home/claude/adsb/thu.npz')
def hours(z): return (z['t'] % 86400) / 3600 - 5          # Eastern clock hours
def smooth(c): return median_filter(c.astype(float), size=13, mode='nearest')
hf, cf = hours(fri), smooth(fri['low48'])
ht, ct = hours(thu), median_filter(thu['low48'].astype(float), size=241, mode='nearest')
T0, T1, STOP, CHI = 14.0, 19.0, 15.9, 15.1667
i0 = int(np.argmin(np.abs(hf - T0))); i1 = len(hf) - 1
def count_at(h, hh, cc): return int(round(np.interp(h, hh, cc)))

# ---- static base
S = 2
geo = json.load(open('/home/claude/adsb/geo.json'))
base = Image.new('RGB', (W * S, H * S), (255, 255, 255))
d = ImageDraw.Draw(base)
def ring(r):
    x, y = proj([p[0] for p in r], [p[1] for p in r])
    return list(zip((x * S).tolist(), (y * S).tolist()))
for c in geo['countries']:
    pts = ring(c['r'])
    if len(pts) > 2:
        d.polygon(pts, fill=LIGHT if c['n'] != 'United States of America' else (228, 236, 232), outline=(200, 206, 203))
for r in geo['nation']:
    pts = ring(r)
    if len(pts) > 2: d.polygon(pts, fill=(228, 236, 232), outline=(170, 180, 175))
for line in geo['states']:
    d.line(ring(line), fill=(255, 255, 255), width=2)
# mask outside the map box, then draw text furniture
mx0, my0, mx1, my1 = [v * S for v in MAP]
cover = Image.new('RGB', (W * S, H * S), (255, 255, 255))
cover.paste(base.crop((mx0, my0, mx1, my1)), (mx0, my0))
base = cover.resize((W, H), Image.LANCZOS)
d = ImageDraw.Draw(base)
if MODE == 'tall':
    # soft fade at top and bottom edges of the map
    for k in range(40):
        a = int(255 * (1 - k / 40))
        for yy in (MAP[1] + k, MAP[3] - 1 - k):
            row = Image.new('RGB', (W, 1), (255, 255, 255))
            base.paste(Image.blend(base.crop((0, yy, W, yy + 1)), row, a / 255), (0, yy))
else:
    for k in range(60):
        xx = MAP[2] - 1 - k
        col = Image.new('RGB', (1, H), (255, 255, 255))
        base.paste(Image.blend(base.crop((xx, 0, xx + 1, H)), col, 1 - k / 60), (xx, 0))
d = ImageDraw.Draw(base)
cx = L['cx']
def ctext(dr, y, s, f, fill=INK):
    w = dr.textlength(s, font=f); dr.text((cx - w / 2, y), s, font=f, fill=fill)
ft = F(L['title_sz'], b=True)
ctext(d, L['title_y'], 'FAA Grounds Flights For', ft)
ctext(d, L['title_y'] + int(L['title_sz'] * 1.12), 'Third Time In History', ft)
fs = F(L['sub_sz'])
ctext(d, L['sub_y'], 'Aircraft tracked in the air on Friday, Nov. 13, 2026', fs, GRAY)
# chart frame
X0, Y0, X1, Y1 = L['chart']
CMAX = 5000
def cxp(h): return X0 + (h - T0) / (T1 - T0) * (X1 - X0)
def cyp(v): return Y1 - v / CMAX * (Y1 - Y0)
fa = F(24)
for v in (0, 2500, 5000):
    d.line([(X0, cyp(v)), (X1, cyp(v))], fill=(225, 225, 225), width=1)
    s = f'{v:,}'; d.text((X0 - 10 - d.textlength(s, font=fa), cyp(v) - 14), s, font=fa, fill=GRAY)
for h in range(14, 20):
    s = f'{h - 12} p.m.'; d.text((cxp(h) - d.textlength(s, font=fa) / 2, Y1 + 10), s, font=fa, fill=GRAY)
# Thursday reference line
sel = (ht >= T0) & (ht <= T1)
d.line(list(zip(cxp(ht[sel]).tolist(), cyp(ct[sel]).tolist())), fill=(170, 170, 170), width=3)
lab = f'Thursday at 7 p.m., {int(round(ct[sel][-1])):,}'
d.text((X1 - d.textlength(lab, font=fa), cyp(ct[sel][-1]) + 10), lab, font=fa, fill=GRAY)
fc = F(22 if MODE == 'tall' else 21)
ctext(d, L['credit_y'], 'Flight positions from adsb.lol (ODbL), a network of volunteer', fc, GRAY)
ctext(d, L['credit_y'] + 28, 'receivers that does not see every aircraft. Times are Eastern.', fc, GRAY)
ctext(d, L['credit_y'] + 66, 'thenewsindata.com', F(26, b=True), GREEN)
base_np = np.asarray(base).astype(np.float32)

# ---- dot layer
def dots(i):
    acc = np.zeros((mh, mw), np.float32)
    for back, wgt in ((0, 1.0), (3, 0.45), (6, 0.25), (9, 0.12)):
        j = i - back
        if j < 0: continue
        a, b = fri['off'][j], fri['off'][j + 1]
        x, y = proj(fri['lon'][a:b], fri['lat'][a:b])
        x = x - MAP[0]; y = y - MAP[1]
        ok = (x >= 1) & (x < mw - 2) & (y >= 1) & (y < mh - 2)
        x, y = x[ok], y[ok]
        xi, yi = np.floor(x).astype(int), np.floor(y).astype(int)
        fx, fy = x - xi, y - yi
        np.add.at(acc, (yi, xi), wgt * (1 - fx) * (1 - fy))
        np.add.at(acc, (yi, xi + 1), wgt * fx * (1 - fy))
        np.add.at(acc, (yi + 1, xi), wgt * (1 - fx) * fy)
        np.add.at(acc, (yi + 1, xi + 1), wgt * fx * fy)
    core = gaussian_filter(acc, 1.15) * 9.0
    glow = gaussian_filter(acc, 4.0) * 14.0
    return np.clip(core, 0, 1), np.clip(glow, 0, 0.35)

fclock, fcnt, fcl2, fpill = F(L['clock_sz'], b=True), F(76, b=True), F(28), F(26, b=True)
def clock(h):
    hh = int(h); mm = int((h - hh) * 60 + 1e-6)
    return f'{hh - 12 if hh > 12 else hh}:{mm:02d} p.m.'

def frame(h, end=0.0):
    i = int(np.argmin(np.abs(hf - h)))
    core, glow = dots(i)
    img = base_np.copy()
    reg = img[MAP[1]:MAP[3], MAP[0]:MAP[2]]
    g = np.array(GREEN, np.float32)
    reg += (g - reg) * glow[..., None]
    dark = np.array((0, 84, 58), np.float32)
    reg += (dark - reg) * core[..., None]
    im = Image.fromarray(img.clip(0, 255).astype(np.uint8))
    dr = ImageDraw.Draw(im)
    # clock and status
    ctext(dr, L['clock_y'], clock(h) + ' Eastern', fclock, GREEN if h >= STOP else INK)
    n = count_at(h, hf, cf)
    if MODE == 'tall':
        s = f'{n:,}'; lab = ' aircraft over the lower 48'
        w1, w2 = dr.textlength(s, font=fcnt), dr.textlength(lab, font=fcl2)
        x = cx - (w1 + w2) / 2; y = L['count_xy'][1]
        dr.text((x, y), s, font=fcnt, fill=GREEN); dr.text((x + w1, y + 38), lab, font=fcl2, fill=INK)
    else:
        s = f'{n:,}'; ctext(dr, L['count_xy'][1], s, F(96, b=True), GREEN)
        ctext(dr, L['count_xy'][1] + 108, 'aircraft over the lower 48 states', fcl2, INK)
    # status pill on the map
    if h >= STOP: msg, on = 'NATIONWIDE GROUND STOP', True
    elif h >= CHI: msg, on = 'CHICAGO ARRIVALS STOPPED', False
    else: msg, on = 'A NORMAL FRIDAY AFTERNOON', False
    pw = dr.textlength(msg, font=fpill) + 44
    px = (MAP[0] + MAP[2]) / 2 - pw / 2 if MODE == 'tall' else MAP[0] + 40
    py = MAP[1] + 46 if MODE == 'tall' else 40
    dr.rounded_rectangle((px, py, px + pw, py + 48), 24, fill=GREEN if on else (255, 255, 255), outline=GREEN, width=2)
    dr.text((px + 22, py + 9), msg, font=fpill, fill=(255, 255, 255) if on else GREEN)
    # chart: Friday line up to now
    sel = (hf >= T0) & (hf <= h)
    if sel.sum() > 1:
        dr.line(list(zip(cxp(hf[sel]).tolist(), cyp(cf[sel]).tolist())), fill=GREEN, width=5, joint='curve')
    dr.ellipse((cxp(h) - 8, cyp(n) - 8, cxp(h) + 8, cyp(n) + 8), fill=GREEN, outline=(255, 255, 255), width=2)
    if h >= STOP:
        xs = cxp(STOP)
        for yy in range(int(Y0), int(Y1), 10): dr.line([(xs, yy), (xs, yy + 5)], fill=INK, width=2)
        dr.text((xs + 8, Y1 - 34), 'Ground stop, 3:54 p.m.', font=F(23, i=True), fill=INK)
    if end > 0:
        lab = f'Friday, {n:,}'
        dr.text((X1 - dr.textlength(lab, font=F(24, b=True)), cyp(n) - 40), lab, font=F(24, b=True), fill=GREEN)
    return im

FPS = 30
HOLD0, RUN, HOLD1 = 1.2, 19.0, 3.8
def schedule():
    out = []
    for k in range(int(HOLD0 * FPS)): out.append((T0, 0))
    nrun = int(RUN * FPS)
    for k in range(nrun): out.append((T0 + (T1 - T0 - 1 / 360) * k / (nrun - 1), 0))
    for k in range(int(HOLD1 * FPS)): out.append((T1 - 1 / 360, 1))
    return out

os.makedirs('/home/claude/adsb/out', exist_ok=True)
if WHAT == 'stills':
    for h, e in ((14.0, 0), (15.9, 0), (17.0, 0), (19.0 - 1 / 360, 1)):
        frame(h, e).save(f'/home/claude/adsb/out/{MODE}-{h:.2f}.png')
    print('stills ok')
else:
    tmp = f'/home/claude/adsb/out/{MODE}.tmp.mp4'; fin = f'/home/claude/adsb/out/timelapse-{MODE}.mp4'
    p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}',
                          '-r', str(FPS), '-i', '-', '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast',
                          '-pix_fmt', 'yuv420p', '-movflags', '+faststart', tmp], stdin=subprocess.PIPE)
    last = None; lastkey = None
    for h, e in schedule():
        key = (round(h, 5), e)
        if key != lastkey: last = frame(h, e).tobytes(); lastkey = key
        p.stdin.write(last)
    p.stdin.close()
    if p.wait() == 0: os.replace(tmp, fin); print('ok', fin)
    else: print('ffmpeg failed')
