import json,sys
HOUR=sys.argv[1] if len(sys.argv)>1 else '10'
import json as _j
g=_j.load(open(f'g{HOUR}.json'))
u=[500,263,88,248,186,402,217,96,338,461,233,164,604,346,121,378,276,180,186,287,93,118,700,493,545,203,150,327,270,208,290,315,281,152,345,153]
names=['Честин (Бајчетина)','Балосаве','Врбета','Баре','Бечевица','Борач','Брњица','Дубрава','Бумбарево Брдо','Вучковица','Гривац','Гружа 1','Гружа 2 (Грабовац)','Губеревац 1','Губеревац 2','Гунцати 1','Гунцати 2 (Пољци)','Драгушица','Жуње','Забојница (Суморовац)','Кикојевац','Кнежевац','Кнић 1 (Рибеш)','Кнић 2 (Доња мала)','Кнић 3 (Горња мала)','Коњуша (Брестовац)','Лесковац','Липница','Љубић','Љуљаци','Опланић','Пајсијевић','Претоке','Радмиловић','Топоница (Кусовац)','Рашковић']
NAS={'Bajčetina':[1],'Čestin':[1],'Balosave':[2],'Vrbeta':[3],'Bare':[4],'Bečevica':[5],'Borač':[6],'Brnjica':[7],'Dubrava':[8],'Bumbarevo Brdo':[9],'Vučkovica':[10],'Grivac':[11],'Gruža':[12],'Grabovac':[13],'Guberevac':[14,15],'Guncati':[16,17],'Dragušica':[18],'Žunje':[19],'Zabojnica':[20],'Sumorovac':[20],'Kikojevac':[21],'Kneževac':[22],'Knić':[23,24,25],'Konjuša':[26],'Brestovac':[26],'Leskovac':[27],'Lipnica':[28],'Ljubić':[29],'Ljuljaci':[30],'Oplanić':[31],'Pajsijević':[32],'Pretoke':[33],'Radmilović':[34],'Toponica':[35],'Kusovac':[35],'Rašković':[36]}
P=[100*a/b for a,b in zip(g,u)]
G,U=sum(g),sum(u)
D=json.loads(open('data.js').read()[len('window.MAPD='):-1])
assert len(D['nas'])==36 and all(n['l'] in NAS for n in D['nas'])
lo,hi=min(P),max(P)
def col(p):
    f=(p-lo)/(hi-lo) if hi>lo else 1
    a=(0xea,0xee,0xfb); b=(0x25,0x3f,0x87)
    return '#%02x%02x%02x'%tuple(round(a[i]+(b[i]-a[i])*f) for i in range(3))
sr=lambda x,d=1: f"{x:.{d}f}".replace('.',',')
th=lambda n: f"{n:,}".replace(',','.')
# map
paths=''
for n in D['nas']:
    ks=NAS[n['l']]; p=100*sum(g[k-1] for k in ks)/sum(u[k-1] for k in ks)
    paths+=f'<path d="{n["d"]}" fill="{col(p)}" stroke="#ffffff" stroke-width="4"/>'
paths+=f'<path d="{D["jezero"]}" fill="#b7c4ee" opacity=".6"/><path d="{D["opstina"]}" fill="none" stroke="#7d8cbd" stroke-width="4"/>'
off={23:(-36,14),24:(36,14),25:(0,-44)}
dots=''
for b in D['bm']:
    o=off.get(b['bm'],(0,0)); x,y=b['x']+o[0],b['y']+o[1]; k=b['bm']
    dots+=f'<circle cx="{x}" cy="{y}" r="27" fill="#16265a" stroke="#fff" stroke-width="5"/><text x="{x}" y="{y+11}" text-anchor="middle" font-family="JBM" font-weight="700" font-size="30" fill="#fff">{k}</text>'
# comparison (user-provided Knić estimates)
CMP={'10':[('2016',10.5),('2020',12.0),('2022',8.2),('2023',9.0),('просек',9.9)],'8':[('2016',2.9),('2020',3.1),('2022',2.0),('2023',1.9),('просек',2.5)],'12':[('2016',22.0),('2020',23.3),('2022',19.6),('2023',21.2),('просек',21.5)],'14':[('2016',34.1),('2020',33.8),('2022',32.5),('2023',34.7),('просек',33.8)],'16':[('2016',45.5),('2020',43.2),('2022',43.5),('2023',46.1),('просек',44.6)],'18':[('2016',56.3),('2020',52.8),('2022',52.9),('2023',57.0),('просек',54.8)]}
AVGN={'8':250,'10':1015,'12':2200,'14':3450,'16':4555,'18':5595}
CMP['20']=[('2016',66.24),('2020',63.32),('2022',60.57),('2023',64.89),('просек',63.75)]
AVGN['20']=6514
EXACT = HOUR=='20'

CMP['19']=[('2016',61.27),('2020',58.06),('2022',56.73),('2023',60.95),('просек',59.25)]
AVGN['19']=6054

HIST={'2016':[2.9,10.5,22.0,34.1,45.5,56.3,66.24],'2020':[3.1,12.0,23.3,33.8,43.2,52.8,63.32],'2022':[2.0,8.2,19.6,32.5,43.5,52.9,60.57],'2023':[1.9,9.0,21.2,34.7,46.1,57.0,64.89]}
HRS=[8,10,12,14,16,18,20]
LINE = HOUR not in CMP
if LINE:
    import json as _jj
    SER=_jj.load(open('series.json')); Utot=10217
    td=[(int(h),100*sum(v)/Utot) for h,v in sorted(SER.items(),key=lambda x:int(x[0]))]
    X=lambda h:60+(h-7)/13*390; Y=lambda v:330-v/80*310
    L=''
    for v in (0,20,40,60,80): L+=f'<line x1="60" x2="455" y1="{Y(v)}" y2="{Y(v)}" stroke="#e1e6f4" stroke-width="2"/><text x="0" y="{Y(v)+8}" font-family="JBM" font-size="20" fill="#5c678f">{v}%</text>'
    for h in (8,10,12,14,16,18,20): L+=f'<text x="{X(h)}" y="362" text-anchor="middle" font-family="JBM" font-size="19" fill="#414a6d">{h}</text>'
    for y,vs in HIST.items(): L+=f'<polyline points="{" ".join(f"{X(h)},{Y(v)}" for h,v in zip(HRS,vs))}" fill="none" stroke="#b7c4ee" stroke-width="4"/>'
    avg=[sum(HIST[y][i] for y in HIST)/4 for i in range(7)]
    L+=f'<polyline points="{" ".join(f"{X(h)},{Y(v)}" for h,v in zip(HRS,avg))}" fill="none" stroke="#414a6d" stroke-width="4" stroke-dasharray="10 8"/>'
    L+=f'<polyline points="{" ".join(f"{X(h)},{Y(v)}" for h,v in td)}" fill="none" stroke="#c0152f" stroke-width="7"/>'
    for h,v in td: L+=f'<circle cx="{X(h)}" cy="{Y(v)}" r="7" fill="#c0152f"/>'
    L+=f'<text x="{X(td[-1][0])-12}" y="{Y(td[-1][1])-16}" text-anchor="end" font-family="JBM" font-weight="700" font-size="28" fill="#ac1129">данас {sr(td[-1][1])}%</text>'

if not LINE:
    cmp=CMP[HOUR]+[('2026',100*G/U)]
    mx=max(v for _,v in cmp)
    bars=''
    for i,(lab,v) in enumerate(cmp):
        y=i*58; today=lab=='2026'; avg=lab=='просек'; w=250*v/mx
        fill='#c0152f' if today else ('#7e8bb5' if avg else '#253f87')
        bars+=f'<text x="0" y="{y+33}" font-family="Inter" font-weight="{800 if today else 600}" font-size="27" fill="{"#ac1129" if today else "#414a6d"}">{"данас" if today else lab}</text>'
        bars+=f'<rect x="118" y="{y+8}" width="{w}" height="36" fill="{fill}"/>'
        bars+=f'<text x="{118+w+12}" y="{y+36}" font-family="JBM" font-weight="700" font-size="{30 if today else 26}" fill="{"#ac1129" if today else "#0b0f1e"}">{"" if (today or EXACT) else "≈"}{sr(v)}%</text>'
if not LINE: bars+='<line x1="118" x2="118" y1="0" y2="350" stroke="#0b0f1e" stroke-width="3"/>'
else: bars=L
diff=G-AVGN.get(HOUR,0)
rows=''
for i in range(18):
    for k in (i+1,i+19):
        rows+=f'<div class="r"><span class="n">{k}</span><span class="m">{names[k-1]}</span><span class="f">{g[k-1]}/{u[k-1]}</span><span class="p">{sr(P[k-1])}%</span></div>'
html=f'''<!doctype html><html lang="sr-Cyrl"><head><meta charset="utf-8"><style>
@font-face{{font-family:Oswald;src:url(assets/Oswald-var.woff2)}}@font-face{{font-family:Inter;src:url(assets/Inter-var.woff2)}}@font-face{{font-family:JBM;src:url(assets/JetBrainsMono-var.woff2)}}
body{{margin:0}}#c{{position:relative;width:1080px;height:1920px;background:#fff;overflow:hidden;font-family:Inter;color:#0b0f1e}}
.a{{position:absolute}}.nad{{font-family:Oswald;font-weight:500;font-size:30px;letter-spacing:.18em;color:#253f87}}
.t{{font-family:Oswald;font-weight:700;font-size:96px;line-height:.92;text-transform:uppercase}}
.grid{{display:grid;grid-template-columns:1fr 1fr;column-gap:44px}}
.r{{display:grid;grid-template-columns:38px 1fr 92px 80px;align-items:baseline;border-bottom:1px solid #e1e6f4;padding:5px 0;font-size:21px}}
.n{{font-family:JBM;color:#253f87}}.m{{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:clip}}.f{{font-family:JBM;font-size:17px;color:#5c678f;text-align:right}}.p{{font-family:JBM;font-weight:600;text-align:right}}
</style></head><body><div id="c">
<div class="a nad" style="left:64px;top:58px">ПАРЛАМЕНТАРНИ ИЗБОРИ · 25. ОКТОБАР 2026.</div>
<img class="a" src="assets/logo.png" style="right:56px;top:40px;width:170px;height:170px" alt="Кнић без рудника">
<div class="a t" style="left:64px;top:110px;width:780px">Колико нас је<br>гласало до {HOUR} ч</div>
<div class="a" style="left:58px;top:290px;font-family:JBM;font-weight:500;font-size:150px;line-height:1;color:#16265a;letter-spacing:-.03em">{sr(100*G/U,2)}%</div>
<div class="a" style="left:640px;top:318px;font-size:34px;color:#253f87;line-height:1.3">општина Кнић<br><span style="font-family:JBM;font-size:34px;color:#0b0f1e">{th(G)}</span> од <span style="font-family:JBM;color:#0b0f1e">{th(U)}</span> бирача</div>
<div class="a" style="left:64px;top:470px;width:470px;font-family:Oswald;font-weight:600;font-size:32px;letter-spacing:.04em;line-height:1.1;color:#0b0f1e">{"РАСТ ИЗЛАЗНОСТИ КРОЗ ДАН" if LINE else ("РАНИЈИХ ГОДИНА" if EXACT else "ДО "+HOUR+" Ч РАНИЈИХ ГОДИНА")}<br><span style="font-family:Inter;font-weight:500;font-size:22px;color:#5c678f;letter-spacing:0">{"данас према 2016–2023 (≈ процена)" if LINE else ("коначна излазност · РЗС, РИК" if EXACT else "≈ процена за Кнић")}</span></div>
<svg class="a" style="left:64px;top:560px" width="470" height="{375 if LINE else 350}" viewBox="0 0 470 {375 if LINE else 350}">{bars}</svg>
<div class="a" style="left:64px;top:{938 if LINE else 920}px;width:480px;font-size:{21 if LINE else 25}px;line-height:1.35;color:#0b0f1e">{("<span style=\"color:#c0152f;font-weight:800\">━</span> данас &nbsp;<span style=\"color:#414a6d\">┅</span> просек ≈"+sr(sum(HIST[y][-1] for y in HIST)/4)+"% &nbsp;<span style=\"color:#b7c4ee;font-weight:800\">━</span> 2016–23<br>Највећа излазност од 2012: <b style=\"font-family:JBM\">68,76%</b> (2012). Данас до "+HOUR+" ч: <b style=\"font-family:JBM;color:#ac1129\">"+sr(100*G/U,2)+"%</b>") if LINE else ("Просек на данашњем списку:<br><b style=\"font-family:JBM\">"+("" if EXACT else "≈ ")+th(AVGN[HOUR])+"</b> бирача · данас <b style=\"font-family:JBM;color:#ac1129\">"+th(G)+"</b>")}</div>
<svg class="a" style="left:540px;top:455px" width="500" height="524" viewBox="0 0 1000 1049">{paths}{dots}</svg>
<div class="a" style="left:560px;top:990px;width:460px;display:flex;align-items:center;gap:10px;font-family:JBM;font-size:21px;color:#414a6d"><span>{sr(lo)}%</span><span style="display:inline-block;width:140px;height:14px;background:linear-gradient(90deg,#eaeefb,#253f87)"></span><span>{sr(hi)}%</span><span style="font-family:Inter">излазност</span></div>
<div class="a grid" style="left:64px;top:1045px;width:952px">{rows}</div>
<div class="a" style="left:0;right:0;bottom:0;height:150px;background:#e4e8f6;padding:22px 64px;box-sizing:border-box;font-family:JBM;font-size:21px;line-height:1.45;color:#5c678f">Изашло до {HOUR}:00 по бирачком месту (бр. · место · гласало/уписано · %). Извор: подаци са бирачких места; списак бирачких места: РИК. {'Ранијих година: коначна излазност (РЗС, РИК), парламентарни избори.' if EXACT else 'Ранијих година ≈ процена'+(' (19 ч = средина 18–20 ч).' if HOUR=='19' else ': сатни обрасци РИК-а примењени на коначну излазност Кнића.')}<br>Група грађана Кнић без рудника · #KnicBezRudnika #Knic</div>
</div></body></html>'''
open(f'k{HOUR}.html','w').write(html)
print(G,U,sr(100*G/U,2),diff,sr(lo),sr(hi))
