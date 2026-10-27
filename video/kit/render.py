import asyncio,subprocess,os,time,sys
from playwright.async_api import async_playwright
FPS=30
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files'])
        pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+os.getcwd()+'/index.html')
        await pg.evaluate('window.ready')
        dur=await pg.evaluate('window.DURATION')
        n=int(dur*FPS)
        ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','video_noaudio.mp4'],stdin=subprocess.PIPE)
        t0=time.time()
        for i in range(n):
            await pg.evaluate(f'render({i/FPS})')
            buf=await pg.screenshot(type='jpeg',quality=94,clip={'x':0,'y':0,'width':1080,'height':1920})
            ff.stdin.write(buf)
            if i%300==0: print(i,n,round(time.time()-t0,1),flush=True)
        ff.stdin.close(); ff.wait()
        print('done',n,dur,round(time.time()-t0,1))
        await b.close()
asyncio.run(main())
