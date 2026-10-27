import sys,asyncio
from playwright.async_api import async_playwright
TS=[float(x) for x in sys.argv[1:]]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files'])
        pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+__import__('os').getcwd()+'/index.html')
        await pg.evaluate('window.ready')
        for t in TS:
            await pg.evaluate(f'render({t})')
            await pg.locator('#stage').screenshot(path=f'still_{t:05.1f}.png')
        await b.close()
asyncio.run(main())
