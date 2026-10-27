# Видео кит – Кнић без рудника

Све што је потребно да сваки нови клип буде графички, звучно и видео исти као епизоде 01–04 „Изборна аналитика“ (октобар 2026).

## Шта је где
| Фолдер | Садржај |
|---|---|
| `kit/` | шаблонске скрипте: `render.py`, `stills.py`, `mix.py`, `srt.py`, `head_style.txt`, `common.js` (лого outro + лого Студентске листе), `render_fn.js`, `sfx_ep04_primer.py` (библиотека звучних ефеката + пример распореда) |
| `kit/assets/` | фонтови (Oswald, Inter, JetBrains Mono), `logo.png` (Кнић без рудника), исечени лого Студентске листе `sl_*.png` + `sl_meta.json` |
| `kit/audio/` | `music2.mp3` – позадинска музика „Тих пут“; `tag.mp3` – два гласа „Ви одлучујете – Кнић без рудника“ за лого outro |
| `kit/data/` | `data.js` (мапа Кнића: општина, језеро, границе 36 насеља, 36 бирачких места), `serbia.js` (мапа Србије са мрежом тачака) |
| `epizode/ep01–ep04/` | изворни HTML/JS сваке епизоде, `sfx.py`, финални глас `vo.mp3`, објављени `out/*.mp4`, `.srt`, насловна |
| `slike/izlaznost/`, `slike/rezultati/` | генератори и готове слике излазности по сатима и резултата (25.10.2026) |
| `geo/` | скрипта која прави `serbia.js` |
| `podaci2026/` | резултати Кнића 2026 по бирачким местима (записници), РИК пресек по градовима 27.10.2026 14:45 |

## Брзи почетак за нову епизоду
```bash
mkdir -p ep05/out ep05/audio && cd ep05
cp -r ../video/kit/assets . && cp ../video/kit/audio/* audio/ && cp ../video/kit/data/* .
cp ../video/kit/*.py ../video/kit/*.js ../video/kit/head_style.txt .
# + audio/vo.mp3 (ElevenLabs) → index.html = head_style + body + main.js + common.js + render_fn.js
python3 stills.py 5 30 60    # провера кадрова
python3 render.py            # video_noaudio.mp4
python3 sfx.py               # sfx.wav
python3 mix.py audio/vo.mp3 TAG DUR out/knic-…-v1.mp4
python3 srt.py main.js TAG out/knic-…-v1.srt
```

---


# Кнић без рудника – vertikalni video (9:16)

Ovo je kanonski postupak po kom su rađene epizode 01–04 „Изборна аналитика“ (okt. 2026). Svaki novi video radi se ISTIM postupkom (sve datoteke su u ovom folderu `video/` repoa `agatonovic/knicizbori2026`), da bi serija bila vizuelno i zvučno konzistentna. Ne izmišljaj novi stil, nove fontove, boje ili drugačiji outro.

## 0. Pravila sadržaja
- Grupa građana „Кнић без рудника“ (Nikola). Opoziciono, cilj: informisati i motivisati birače. Ton: miran, činjeničan, bez vređanja.
- **Svaki broj mora biti proverljiv.** Izvori: RIK (rik.parlament.gov.rs → Rezultati izbora; API: POST /get-elections/, /get-regions/, /get-municipalities/, /get_results/), RZS, arhivaizbora.rs, repo `agatonovic/knicizbori2026` (podaci/…, rezultati_po_bm_2012_2023.json, popis2022). Proveri pre nego što predložiš tekst. Ne koristi tuđe infografike bez provere (slika „naš portal“ za gradove imala je duplikate i pogrešne brojeve).
- Procenti na ekranu = **% važećih glasova**, uz navedenu osnovu u izvor-traci (RIK portal prikazuje % od glasalih – naglasi razliku ako se poredi).
- Formulacije moraju biti precizne („највећа на републичким изборима у Книћу још од 1997.“ a ne „највећа од 2012.“).
- Knić 1/2/3 = Рибеш / Доња мала / Горња мала. BM 13 = Гружа 2 (Грабовац), BM 17 = Гунцати 2 (Пољци), BM 15 = Губеревац 2.
- Izborna tišina (čl. 6 ZINP): od petka 00:00 do nedelje 20:00 – bez novih objava i procena.
- Ne koristi dizajn-sistem „расКНИЋкавање“ (nije povezan sa grupom).

## 1. Tok rada
1. Istraži/proveri podatke → predloži sadržaj epizode.
2. Napiši **voice prompt** za ElevenLabs v3 (vidi §2) → korisnik generiše i šalje mp3.
3. Izmeri vreme rečenica u mp3 (silencedetect, §6) → SUBS i SC tajminzi.
4. Napravi `index.html` sa `window.render(t)` (§3–4) → `stills.py` provere ključnih kadrova (pogledaj ih!).
5. `render.py` (video) → `sfx.py` (zvučni efekti) → `mix.py` (zvuk) → `srt.py` (titlovi) → naslovna.jpg.
6. Pošalji mp4 + srt + naslovnu (SendUserFile). Na zahtev: kratak opis za Facebook/društvene mreže.

## 2. Voice prompt (ElevenLabs v3)
- Ćirilica, ekavica. **Svi brojevi napisani rečima** („три хиљаде седамсто осамдесет три“), godine takođe („две хиљаде двадесет треће“).
- **Obavezni audio tagovi u uglastim zagradama** (engleski, v3 ih tako prepoznaje): `[calm, serious]`, `[measured]`, `[confident]`, `[neutral]`, `[emphatic]`, `[thoughtful]`, `[warm]`, `[tense]`, `[curious]`, `[upbeat]`, `[proud]`, `[warm, sincere]`, `[steady rhythm]` (za nabrajanja), pauze `[short pause]`, `[pause]`, `[long pause]`.
- Dužina 1:30–2:30. Kratke rečenice, jedna informacija po rečenici. Nabrajanja (sela) u parovima sa „...“ i `[short pause]` – po par sela na jedan ekran.
- Pre izbora: završetak „Гласамо за број три. Студентска листа – Студенти побеђују!“ (+ animacija logoa studentske liste). Posle izbora: zahvalnica, bez poziva.
- Uvek na kraju ide zaseban **tag** (gotov fajl `tag.mp3`, dva glasa: „ВИ ОДЛУЧУЈЕТЕ – КНИЋ БЕЗ РУДНИКА“) – nije deo VO prompta.

## 3. Asseti (isti za svaku epizodu)
| Fajl | Odakle |
|---|---|
| `assets/logo.png` | Dizajn sistem „Кнић без рудника“ https://claude.ai/artifact/SqdrDhEB9RtNb8t4W1MKLs – asset `152b06175f04cd682006b8005495e4da.png` (Artifact read, path = asset id) |
| `assets/Oswald-var.woff2`, `Inter-var.woff2`, `JetBrainsMono-var.woff2` | isti DS, `project/fonts/` |
| `audio/music2.mp3` | „Тих пут“ (Tih_put.mp3, 180 s) – od korisnika; md5 b2e12f63342bbf1b206525e54b433342 |
| `audio/tag.mp3` | outro glasovi, 3,97 s – od korisnika; md5 3f8b10b602eb3ac585141c72cbfc8fc3. Glasovi: +0,28–1,37 s „Ви одлучујете“, +2,00–3,68 s „Кнић без рудника“ |
| `assets/sl_circle.png, sl_top.png, sl_l1.png, sl_l2.png` | isečen logo Studentske liste (krug sa 3 / gornja linija / СТУДЕНТИ / ПОБЕЂУЈУ), bbox u izvorniku: circle[40,120,392,476] top[386,141,1146,195] l1[386,215,1146,342] l2[386,347,1146,457] |
| `data.js` (`window.MAPD`) | mapa Knića iz repo `index.html` MAP: {w:1000,h:1049, opstina:path, jezero:path, nas:[{l,d}] granice 36 naselja, bm:[{bm,x,y,…}]} |
| `serbia.js` (`window.SRB`) | Srbija+Kosovo spojeno (npm world-atlas 10m, topojson merge, d3-geo mercator 900×1000), mreža tačaka, Knić = tačka 321 |

Ako fajl nije u sesiji (repo kit, artefakt ili prilog) – zatraži od korisnika music/tag mp3; logo i fontove povuci iz DS artefakta.

## 4. Vizuelni stil (DS „Кнић без рудника“)
- Platno **1080×1920**, 30 fps. Bela pozadina; „tamne“ scene `--p900 #16265a` sa belim tekstom (DARK mapa).
- Boje: p900 #16265a, p700 #253f87, p400 #7e8bb5, p200 #b7c4ee, p100 #eaeefb, s200 #f2f4fa, s300 #e4e8f6, l100 #e1e6f4, ink #0b0f1e / #414a6d / #5c678f, crvena #c0152f (tekst #ac1129, na tamnom #ff8d9c). **Jedna crvena po kadru** (ključni broj/akcenat). Bez senki, radius 0.
- Fontovi: Oswald 700 uppercase za naslove (`.disp`, 100–150px), Oswald 500 nadnaslov (`.nad` 30px, letter-spacing .18em, p700, top 150px: „Изборна аналитика · N/N · …“), Inter za tekst, JetBrains Mono (`.mono`, tnum) za SVE brojeve.
- Margine 64px levo/desno. Titl: dno 430px, Inter 600 46px, centriran, belo polje rgba(255,255,255,.92) (na tamnim scenama bez polja, beli tekst). Izvor-traka: top 1530px, visina 64, pozadina s300, JBM 23px ink4, tekst „Извор: …“.
- Animacije (deterministične, sve iz `render(t)`): elementi ulaze `fade()` = opacity + translateY 36px→0, 0,28 s, easing easeOutCubic; brojevi `cnt()` count-up (+ tick SFX); scene se smenjuju rezom (swipe SFX); mape: sela se boje/obrubljuju (p700 stroke 12, fill p100) kad se pomenu; trake/linije rastu sa eio/eo.
- Format brojeva: tačka za hiljade (3.783), zarez za decimale (51,81%), minus „−“.

### head_style (koristi doslovno)
```html
<style>
@font-face{font-family:Oswald;src:url(assets/Oswald-var.woff2) format('woff2');font-weight:200 700}
@font-face{font-family:Inter;src:url(assets/Inter-var.woff2) format('woff2');font-weight:100 900}
@font-face{font-family:JBM;src:url(assets/JetBrainsMono-var.woff2) format('woff2');font-weight:100 800}
:root{--white:#ffffff;--s200:#f2f4fa;--s300:#e4e8f6;--l100:#e1e6f4;--l300:#7d8cbd;--ink9:#0b0f1e;--ink6:#414a6d;--ink4:#5c678f;
  --p900:#16265a;--p700:#253f87;--p400:#7e8bb5;--p200:#b7c4ee;--p100:#eaeefb;--ptx:#253f87;--red:#c0152f;--redtx:#ac1129;--red100:#fbe8eb;}
html,body{margin:0;padding:0;background:#fff}
#stage{position:relative;width:1080px;height:1920px;overflow:hidden;background:var(--white);font-family:Inter,sans-serif;color:var(--ink9)}
.scene{position:absolute;inset:0;display:none}.abs{position:absolute}
.disp{font-family:Oswald,sans-serif;font-weight:700;text-transform:uppercase;line-height:.95;letter-spacing:-.01em}
.nad{font-family:Oswald,sans-serif;font-weight:500;font-size:30px;letter-spacing:.18em;text-transform:uppercase;color:var(--ptx)}
.mono{font-family:JBM,monospace;font-weight:500;font-feature-settings:"tnum"}
.lbl{font-family:Inter;font-weight:600;font-size:30px;letter-spacing:.07em;text-transform:uppercase;color:var(--ink6)}
#sub{position:absolute;left:64px;right:64px;bottom:430px;text-align:center;font-family:Inter;font-weight:600;font-size:46px;line-height:1.25;color:var(--ink9)}
#sub span{display:inline;padding:6px 14px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
#src{position:absolute;left:64px;right:64px;top:1530px;height:64px;background:var(--s300);display:flex;align-items:center;padding:0 22px;box-sizing:border-box;font-family:JBM;font-size:23px;color:var(--ink4);font-weight:500;white-space:nowrap;overflow:hidden}
</style>
```

### Struktura index.html
`<head>` + head_style · `<body><div id="stage">` scene `<div class="scene" id="s1">…` … `<div class="scene" id="so">` (outro) + `<div id="sub"><span id="subt"></span></div><div id="src"></div></div>` · `<script src="data.js"></script><script src="serbia.js"></script><script>` main.js + common.js + render_fn.js `</script>`.

Outro scena (uvek ista):
```html
<div class="scene" id="so">
  <canvas id="logo" class="abs" width="1600" height="1600" style="left:140px;top:420px;width:800px;height:800px"></canvas>
  <div class="abs disp" id="sod" style="left:0;right:0;top:1300px;text-align:center;font-size:64px;color:var(--p700)">…opciona linija…</div>
</div>
```

### main.js – zaglavlje i helperi
```js
const O=0.30, TAG=<sekunda u VO kad počinje tag>, END=TAG+3.97+2.6;   // VO kasni 0,30 s
window.DURATION=END+O;
const $=id=>document.getElementById(id);
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lin=(t,a,b)=>clamp((t-a)/(b-a));
const eo=x=>1-Math.pow(1-x,3);
const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const fmt=n=>{const s=Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');return (n<0?'−':'')+s;};
const cnt=(t,a,d,v)=>fmt(v*eo(lin(t,a,a+d)));
function fade(el,t,a,dur=.28,dy=36){const p=eo(lin(t,a,a+dur));el.style.opacity=p;el.style.transform=`translateY(${(1-p)*dy}px)`;}
const SUBS=[[start,end,'текст'], … , [TAG+0.28,TAG+1.37,'Ви одлучујете –'],[TAG+2.00,TAG+3.68,'Кнић без рудника.']];
const SC=[['s1',-9,5.3],['s2',5.3,8.85], … ,['so',TAG-0.25,999]];   // scena: [id, od, do] u VO vremenu
const SRC={s3:'Извор: …', …};   // izvor-traka po sceni
const DARK={s1:1};               // tamne scene
```
Titlovi: tekst u SUBS pišemo ciframa („3.709 људи…“), ne rečima.

### common.js – logo studentske liste + logo outro (doslovno)
```js
const SLM={circle:[40,120,392,476],top:[386,141,1146,195],l1:[386,215,1146,342],l2:[386,347,1146,457]};
const SLK=952/(1146-40);
[['slc','circle'],['slt','top'],['sl1','l1'],['sl2','l2']].forEach(([id,k])=>{const b=SLM[k],e=$(id);
 e.style.left=((b[0]-40)*SLK)+'px';e.style.top=((b[1]-120)*SLK)+'px';e.style.width=((b[2]-b[0])*SLK)+'px';e.style.height=((b[3]-b[1])*SLK)+'px';});
const LOGO=new Image();LOGO.src='assets/logo.png';
function drawLogo(t){
 const c=$('logo'),x=c.getContext('2d');const W=c.width,cx=W/2,cy=W/2;x.clearRect(0,0,W,W);
 if(!LOGO.complete)return;const sc=W/447;
 const pc=eo(lin(t,TAG-0.25,TAG+0.35));           // centralni motiv: fade + blagi pomak
 x.save();x.globalAlpha=pc;x.beginPath();x.arc(cx,cy,140*sc,0,Math.PI*2);x.clip();x.drawImage(LOGO,0,(1-pc)*30,W,W);x.restore();
 const a1=eio(lin(t,TAG+0.20,TAG+1.45));          // gornji natpis, sweep u smeru kazaljke – „Ви одлучујете“
 if(a1>0){x.save();x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,W,Math.PI-0.06,Math.PI-0.06+(Math.PI+0.12)*a1,false);x.closePath();x.arc(cx,cy,140*sc,0,Math.PI*2,true);x.clip('evenodd');x.drawImage(LOGO,0,0,W,W);x.restore();}
 const a2=eio(lin(t,TAG+1.95,TAG+3.70));          // donji natpis, sweep suprotno – „Кнић без рудника“
 if(a2>0){x.save();x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,W,Math.PI+0.06,Math.PI+0.06-(Math.PI+0.12)*a2,true);x.closePath();x.arc(cx,cy,140*sc,0,Math.PI*2,true);x.clip('evenodd');x.drawImage(LOGO,0,0,W,W);x.restore();}
}
```
(Ako epizoda nema logo studentske liste, izostavi SLM blok i `sl*` iz `ready`.)

### render_fn.js – kostur
```js
let lastScene=null;
window.render=function(vt){
 const t=vt-O;
 let cur=SC.find(s=>t>=s[1]&&t<s[2])[0];
 if(cur!==lastScene){document.querySelectorAll('.scene').forEach(e=>e.style.display='none');$(cur).style.display='block';lastScene=cur;}
 const s=SUBS.find(x=>t>=x[0]-0.05&&t<x[1]+0.25);
 const sub=$('subt');sub.textContent=s?s[2]:'';
 const dark=DARK[cur];
 sub.style.color=dark?'#ffffff':(cur==='so'?'#16265a':'#0b0f1e');
 sub.style.background=dark?'rgba(22,38,90,0)':'rgba(255,255,255,.92)';
 $('sub').style.display=s?'block':'none';
 const src=SRC[cur];$('src').style.display=src?'flex':'none';if(src)$('src').textContent=src;
 // … po scenama: if(cur==='s1'){ fade($('s1t'),t,2.9); … }
 // logo studentske liste (na „три“ krug, pa linije):
 //  const c=eo(lin(t,A,A+0.4));ce.style.opacity=lin(t,A,A+0.15);ce.style.transform=`scale(${0.6+0.4*c})`;
 //  [['slt',B],['sl1',C],['sl2',D]] → opacity eo, translateX((1-p)*60px)
 if(cur==='so'){drawLogo(t);$('sod').style.opacity=eo(lin(t,TAG+3.9,TAG+4.4));}
};
window.ready=Promise.all([document.fonts.ready,new Promise(r=>{if(LOGO.complete)r();else LOGO.onload=r;})]);
```

## 5. Skripte (u folderu epizode)
### render.py
```python
import asyncio,subprocess,os,time
from playwright.async_api import async_playwright
FPS=30
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files'])
        pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+os.getcwd()+'/index.html'); await pg.evaluate('window.ready')
        n=int(await pg.evaluate('window.DURATION')*FPS)
        ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','video_noaudio.mp4'],stdin=subprocess.PIPE)
        for i in range(n):
            await pg.evaluate(f'render({i/FPS})')
            ff.stdin.write(await pg.screenshot(type='jpeg',quality=94,clip={'x':0,'y':0,'width':1080,'height':1920}))
        ff.stdin.close(); ff.wait(); await b.close()
asyncio.run(main())
```
Pokreni u pozadini (`run_in_background`), traje ~1 min po 10 s videa.

### stills.py (provera kadrova: `python3 stills.py 4.5 28.0 …` → still_XXX.png, OBAVEZNO pogledaj Read-om)
```python
import sys,asyncio,os
from playwright.async_api import async_playwright
TS=[float(x) for x in sys.argv[1:]]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files'])
        pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+os.getcwd()+'/index.html'); await pg.evaluate('window.ready')
        for t in TS:
            await pg.evaluate(f'render({t})'); await pg.locator('#stage').screenshot(path=f'still_{t:05.1f}.png')
        await b.close()
asyncio.run(main())
```
Proveri: preklapanje teksta, prelivanje tabela/legendi preko titla (titl je na dnu 430px, izvor-traka na 1530px – sadržaj drži iznad ~1480px), jedna crvena po kadru.

### sfx.py – biblioteka (numpy, 48 kHz; vremena u VO-vremenu, `add` dodaje O)
```python
import numpy as np, wave
SR=48000; O=0.30; TAG=…; DUR=…   # DUR = window.DURATION
out=np.zeros(int(SR*(DUR+1))); rng=np.random.default_rng(7)
def add(sig,t,g=1.0):
    i=int((t+O)*SR); n=min(len(sig),len(out)-i)
    if n>0: out[i:i+n]+=sig[:n]*g
def lp(x,a):
    y=np.zeros_like(x); s=0.0
    for i,v in enumerate(x): s+=a*(v-s); y[i]=s
    return y
def env(n,att,dec):
    t=np.arange(n)/SR; return np.minimum(1,t/max(att,1e-4))*np.exp(-t/dec)
def click(f=2400,d=0.012):
    n=int(SR*d); t=np.arange(n)/SR; return np.sin(2*np.pi*f*t)*env(n,0.0005,0.003)
def ticks(t0,dur,rate=22,g=0.18):            # uz count-up brojeva
    k=int(dur*rate)
    for j in range(k): add(click(2600+rng.uniform(-150,150)),t0+j/rate,g*(0.6+0.4*(1-j/k)))
def whoosh(t,d=0.55,g=0.32,up=True):          # pokret/ulazak velikog elementa
    n=int(SR*d); x=rng.standard_normal(n)
    a=np.linspace(0.04,0.25,n) if up else np.linspace(0.25,0.04,n)
    y=np.zeros(n); s=0
    for i in range(n): s+=a[i]*(x[i]-s); y[i]=s
    e=np.sin(np.pi*np.linspace(0,1,n))**2; add(y*e/np.max(np.abs(y))*g,t)
def thud(t,g=0.55):                            # udarni broj / zaključak
    n=int(SR*0.7); tt=np.arange(n)/SR; f=70*np.exp(-tt*3)+42
    y=np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,0.002,0.18); nz=lp(rng.standard_normal(n),0.08)*env(n,0.001,0.02)*0.6
    add((y+nz)*g,t)
def pop(t,f=880,g=0.16):                       # pojava male stavke (kartica, tačka, oznaka)
    n=int(SR*0.09); tt=np.arange(n)/SR; add(np.sin(2*np.pi*(f*tt+300*tt*tt))*env(n,0.002,0.025)*g,t)
def swipe(t,g=0.12):                           # svaka smena scene
    n=int(SR*0.26); x=rng.standard_normal(n); y=x-lp(x,0.3); e=np.sin(np.pi*np.linspace(0,1,n))**3; add(y*e*g,t)
def shimmer(t,d,g=0.10):                       # outro natpisi
    n=int(SR*d); tt=np.arange(n)/SR; y=np.zeros(n)
    for f in (1318.5,1975.5,2637.0): y+=np.sin(2*np.pi*f*tt+rng.uniform(0,6))
    y*=(np.sin(np.pi*np.linspace(0,1,n))**2)*(0.5+0.5*np.sin(2*np.pi*7*tt)); add(y/3*g,t)
def hit(t,g=0.5):                              # finalni akord
    n=int(SR*2.2); tt=np.arange(n)/SR
    y=sum(np.sin(2*np.pi*f*tt)*a for f,a in ((98,1),(196,.5),(294,.25),(392,.12)))*env(n,0.004,0.7); add(y*g/1.9,t)
# … postavljanje po scenama: swipe(početak scene); pop/thud/ticks/whoosh sinhrono sa animacijama
# logo studentske liste: thud(krug,0.55); whoosh(linija,0.45,0.22)×2; hit(ПОБЕЂУЈУ,0.35)
# OUTRO (uvek): whoosh(TAG-0.3,0.6,0.25); shimmer(TAG+0.2,1.3); shimmer(TAG+1.95,1.8); hit(TAG+3.75,0.55)
out=out/max(1e-9,np.max(np.abs(out)))*0.7
w=wave.open('sfx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
```

### mix.py – `python3 mix.py audio/vo.mp3 TAG DUR out/knic-…-v1.mp4`
```python
import subprocess,sys
vo=sys.argv[1]; TAG=float(sys.argv[2]); DUR=float(sys.argv[3]); out=sys.argv[4]
O=0.30; T=TAG+O; TE=T+3.97
# muzika „Тих пут“: fade-in 2 s, 0.14 ispod glasa, 1,2 s pred outro raste na 0.28, posle tag glasa 0.4, fade-out 1,5 s
mvol=f"if(lt(t,{T-1.2}),0.14,if(lt(t,{T}),0.14+0.14*(t-{T-1.2})/1.2,if(lt(t,{TE}),0.28,if(lt(t,{TE+0.5}),0.28+0.12*(t-{TE})/0.5,0.4))))"
fc=(f"[0:a]adelay={int(O*1000)}|{int(O*1000)},volume=1.0[v];"
    f"[1:a]adelay={int(T*1000)}|{int(T*1000)},volume=1.4[g];"
    f"[2:a]atrim=0:{DUR},afade=t=in:st=0:d=2,volume='{mvol}':eval=frame,afade=t=out:st={DUR-1.5}:d=1.5[m];"
    f"[3:a]volume=1.0[s];"
    f"[v][g][m][s]amix=inputs=4:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]")
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',vo,'-i','audio/tag.mp3','-i','audio/music2.mp3','-i','sfx.wav',
 '-filter_complex',fc,'-map','[a]','-ac','2','mix.wav'],check=True)
subprocess.run(['ffmpeg','-y','-loglevel','error','-i','video_noaudio.mp4','-i','mix.wav','-map','0:v','-map','1:a',
 '-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',out],check=True)
```
Cilj: integrisana glasnoća ≈ −14 LUFS (proveri `ffmpeg -i out.mp4 -af ebur128 -f null -`).

### srt.py – `python3 srt.py main.js TAG out/knic-…-v1.srt`
```python
import re,sys
src=open(sys.argv[1]).read(); TAG=float(sys.argv[2]); O=0.30; out=sys.argv[3]
body=src[src.index('const SUBS=['):]; body=body[:body.index('];')]
rows=re.findall(r"\[\s*([^,\[\]]+?)\s*,\s*([^,\[\]]+?)\s*,\s*'([^']*)'\s*\]",body)
ev=lambda x: eval(x,{'TAG':TAG})
def ts(s): s=max(0,s); return f"{int(s//3600):02d}:{int(s%3600//60):02d}:{int(s%60):02d},{int(round((s%1)*1000))%1000:03d}"
with open(out,'w') as f:
  for i,(a,b,t) in enumerate(rows,1): f.write(f"{i}\n{ts(ev(a)+O)} --> {ts(ev(b)+O+0.2)}\n{t}\n\n")
```

### Naslovna
Izaberi najjači kadar (naslov + ključni broj): `python3 stills.py T` → `ffmpeg -i still_T.png -q:v 2 out/knic-…-naslovna.jpg`.

## 6. Tajming glasa
- `ffmpeg -i audio/vo.mp3 -af silencedetect=noise=-42dB:d=0.25 -f null - 2>&1 | grep silence_` → segmenti govora.
- Rečenice dodeli segmentima po broju slova (≈12–14,5 slova/s; DP poravnanje), proveri ručno na granicama. Whisper/HuggingFace nije dostupan.
- TAG = kraj poslednje VO rečenice + ~0,4 s. Ako korisnik pošalje ispravljenu rečenicu ili reč, ubaci je u VO (ffmpeg concat/atrim, skrati pauze ~0,1 s) i remapuj vremena (deo-po-deo, kao u ep. 02).

## 7. Izlaz i imenovanje
- `out/knic-izbori-NN-9x16-vK.mp4`, `.srt`, `knic-izbori-NN-naslovna.jpg` (rezultati: `knic-rezultati-…`). Nova verzija = novi vK, stare ne briši.
- Pošalji mp4, srt i naslovnu korisniku. Uz video ide kratak FB opis (3–5 rečenica, ćirilica, izvor podataka, hešteg #КнићБезРудника) kad ga traži.

## 8. Slike (statične objave, npr. izlaznost po satima, rezultati)
Isti DS: 1080×1920, logo gore, Oswald naslov, JBM brojevi, s300 izvor-traka dole, jedna crvena; generator: HTML + Playwright screenshot. Poređenja sa prošlim godinama samo kad su podaci zvanični; procene označiti „≈“.
