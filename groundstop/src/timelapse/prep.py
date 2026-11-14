"""Decode adsb.lol heatmap half-hour files into per-slice positions over North America.
usage: python3 prep.py <heatmap_dir> <out.npz> [first_file last_file]
"""
import sys, gzip, json
import numpy as np
from PIL import Image, ImageDraw

src, out = sys.argv[1], sys.argv[2]
f0 = int(sys.argv[3]) if len(sys.argv) > 3 else 36
f1 = int(sys.argv[4]) if len(sys.argv) > 4 else 47
MAGIC = 0x0e7f7c9d
LAT0, LAT1, LON0, LON1 = 8.0, 72.0, -170.0, -45.0

# US mask on a 0.05-degree grid for counting aircraft over the United States
geo = json.load(open('/home/claude/adsb/geo.json'))
RES = 20
W, H = int((LON1 - LON0) * RES), int((LAT1 - LAT0) * RES)
im = Image.new('L', (W, H), 0)
d = ImageDraw.Draw(im)
for r in geo['nation']:
    pts = [((x - LON0) * RES, (LAT1 - y) * RES) for x, y in r]
    if len(pts) > 2:
        d.polygon(pts, fill=1)
mask = np.array(im, dtype=bool)

times, counts_us, counts_low48, offs, lons, lats, alts, hexes = [], [], [], [0], [], [], [], []
for fi in range(f0, f1 + 1):
    raw = gzip.decompress(open(f'{src}/{fi:02d}.bin.ttf', 'rb').read())
    a = np.frombuffer(raw[:len(raw) // 16 * 16], dtype='<i4').reshape(-1, 4)
    u = a.view('<u4')
    idx = np.where(u[:, 0] == MAGIC)[0]
    bounds = list(idx) + [len(a)]
    for k, i in enumerate(idx):
        now = u[i, 2] / 1000 + u[i, 1] * 4294967.296
        s = a[i + 1:bounds[k + 1]]
        s = s[s[:, 1] <= 1073741824]
        h16 = np.ascontiguousarray(s).view('<i2').reshape(-1, 8)
        lat, lon, alt = s[:, 1] / 1e6, s[:, 2] / 1e6, h16[:, 6]
        hx = s[:, 0] & 0xFFFFFF
        ok = (alt != -123) & (lat > LAT0) & (lat < LAT1) & (lon > LON0) & (lon < LON1)
        lat, lon, alt, hx = lat[ok], lon[ok], alt[ok], hx[ok]
        _, first = np.unique(hx, return_index=True)
        lat, lon, alt, hx = lat[first], lon[first], alt[first], hx[first]
        px = ((lon - LON0) * RES).astype(int).clip(0, W - 1)
        py = ((LAT1 - lat) * RES).astype(int).clip(0, H - 1)
        inus = mask[py, px]
        low48 = inus & (lat < 49.5) & (lat > 24) & (lon > -125.5) & (lon < -66)
        times.append(now); counts_us.append(int(inus.sum())); counts_low48.append(int(low48.sum()))
        lons.append(lon.astype('f4')); lats.append(lat.astype('f4')); alts.append(alt.astype('i2')); hexes.append(hx.astype('u4'))
        offs.append(offs[-1] + len(lon))
    print(fi, len(idx), counts_low48[-1], flush=True)
np.savez_compressed(out, t=np.array(times), us=np.array(counts_us), low48=np.array(counts_low48),
                    off=np.array(offs), lon=np.concatenate(lons), lat=np.concatenate(lats),
                    alt=np.concatenate(alts), hex=np.concatenate(hexes))
