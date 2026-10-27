import asyncio,os,sys
from playwright.async_api import async_playwright
H=sys.argv[1]
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+os.getcwd()+f'/k{H}.html'); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(300)
        await pg.locator('#c').screenshot(path=f'knic-izlaznost-{H}h.png'); await b.close()
asyncio.run(m())
