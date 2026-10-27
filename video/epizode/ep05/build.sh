python3 - <<'PY'
c=open('common_logo.js').read()
html='<!doctype html><html lang="sr-Cyrl"><head><meta charset="utf-8"><title>Ep5</title>\n'+open('head_style.txt').read()+'</head>\n'+open('body.html').read()+'\n<script src="data.js"></script><script src="serbia.js"></script><script src="data5.js"></script><script src="cities.js"></script><script>\n'+open('main.js').read()+'\n'+c+'\n'+open('render_fn.js').read()+'\n</script></body></html>'
open('index.html','w').write(html)
PY
