import sys
from playwright.sync_api import sync_playwright
import pathlib
p=pathlib.Path(__file__).resolve().parent
with sync_playwright() as pw:
  b=pw.chromium.launch(executable_path='/usr/bin/google-chrome')
  pg=b.new_page(viewport={'width':1300,'height':2200},device_scale_factor=2)
  pg.goto('file://'+str(p/'static.html')); pg.wait_for_timeout(1500)
  pg.locator('#lead').screenshot(path=str(p.parent/'faces-lead.png'))
  pg.locator('#tall').screenshot(path=str(p.parent/'faces-tall.png'))
  b.close()
