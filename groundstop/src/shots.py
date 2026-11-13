from playwright.sync_api import sync_playwright
base="file:///home/claude/newsindata-stories/groundstop/"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    for name,w,h,mode in [("groundstop-lead.png",1200,630,"lead"),("groundstop-tall.png",1080,1350,"tall"),("groundstop-map.png",1080,860,"map"),("groundstop-map-social.png",1200,630,"mapwide")]:
        pg=b.new_page(viewport={"width":w,"height":h},device_scale_factor=2)
        pg.goto(base+"src/static.html#"+mode);pg.wait_for_timeout(600)
        pg.screenshot(path="/home/claude/newsindata-stories/groundstop/"+name)
        print(name,pg.evaluate("document.querySelector('.wrap').getBoundingClientRect().height"))
    b.close()
