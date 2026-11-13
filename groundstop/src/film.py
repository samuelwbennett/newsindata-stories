import sys,subprocess,os
from playwright.sync_api import sync_playwright
OUT="/home/claude/ig/out/";FPS=30
mode=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox","--allow-file-access-from-files"])
    pg=b.new_page(viewport={"width":1080,"height":1920})
    pg.goto("file:///home/claude/newsindata-stories/groundstop/src/reel.html");pg.wait_for_timeout(700)
    if mode=="stills":
        for i,sec in [(0,4.0),(1,3.0),(2,8.0)]:
            pg.evaluate("([i,s])=>frame(i,s)",[i,sec]);pg.wait_for_timeout(120)
            pg.screenshot(path=OUT+"gs-still%d.jpg"%i,type="jpeg",quality=80)
    else:
        files=[]
        for i in range(3):
            n=int(round(pg.evaluate("i=>sceneLen(i)",i)*FPS));tmp=OUT+"gs-s%d.tmp.mp4"%i;fin=OUT+"gs-s%d.mp4"%i
            ff=subprocess.Popen(["ffmpeg","-y","-loglevel","error","-f","image2pipe","-c:v","mjpeg","-framerate",str(FPS),"-i","-","-c:v","libx264","-crf","18","-preset","veryfast","-pix_fmt","yuv420p","-r",str(FPS),tmp],stdin=subprocess.PIPE)
            for f in range(n):
                pg.evaluate("([i,s])=>frame(i,s)",[i,f/FPS])
                ff.stdin.write(pg.screenshot(type="jpeg",quality=92))
            ff.stdin.close()
            assert ff.wait()==0;os.rename(tmp,fin);files.append(fin);print("scene",i,n,flush=True)
        pg.evaluate("([i,s])=>frame(i,s)",[2,8.4]);pg.wait_for_timeout(100)
        pg.screenshot(path=OUT+"groundstop-poster.jpg",type="jpeg",quality=90)
        open(OUT+"gs-list.txt","w").write("".join("file '%s'\n"%f for f in files))
    b.close()
