import json
R=json.load(open('res.json')); L=[x.replace('Поноš','Понош') for x in R['L']]; rows={int(k):v for k,v in R['rows'].items()}; tot=R['tot']; V=R['V']; done=R['done']; miss=R['miss']
sr=lambda x,d=1: f"{x:.{d}f}".replace('.',',')
th=lambda n: f"{n:,}".replace(',','.')
names=['Честин (Бајчетина)','Балосаве','Врбета','Баре','Бечевица','Борач','Брњица','Дубрава','Бумбарево Брдо','Вучковица','Гривац','Гружа 1','Гружа 2 (Грабовац)','Губеревац 1','Губеревац 2','Гунцати 1','Гунцати 2 (Пољци)','Драгушица','Жуње','Забојница (Суморовац)','Кикојевац','Кнежевац','Кнић 1 (Рибеш)','Кнић 2 (Доња мала)','Кнић 3 (Горња мала)','Коњуша (Брестовац)','Лесковац','Липница','Љубић','Љуљаци','Опланић','Пајсијевић','Претоке','Радмиловић','Топоница (Кусовац)','Рашковић']
NAS={'Bajčetina':[1],'Čestin':[1],'Balosave':[2],'Vrbeta':[3],'Bare':[4],'Bečevica':[5],'Borač':[6],'Brnjica':[7],'Dubrava':[8],'Bumbarevo Brdo':[9],'Vučkovica':[10],'Grivac':[11],'Gruža':[12],'Grabovac':[13],'Guberevac':[14,15],'Guncati':[16,17],'Dragušica':[18],'Žunje':[19],'Zabojnica':[20],'Sumorovac':[20],'Kikojevac':[21],'Kneževac':[22],'Knić':[23,24,25],'Konjuša':[26],'Brestovac':[26],'Leskovac':[27],'Lipnica':[28],'Ljubić':[29],'Ljuljaci':[30],'Oplanić':[31],'Pajsijević':[32],'Pretoke':[33],'Radmilović':[34],'Toponica':[35],'Kusovac':[35],'Rašković':[36]}
RED,BLUE,GREY='#c0152f','#253f87','#e4e8f6'
D=json.loads(open('data.js').read()[len('window.MAPD='):-1])
paths=''
for n in D['nas']:
    ks=[k for k in NAS[n['l']] if k in done]
    if not ks: fill=GREY
    else:
        s=sum(rows[k]['votes'][2] for k in ks); v=sum(rows[k]['votes'][0] for k in ks); fill='#f2b8c1' if s>v else '#b7c4ee'
    paths+=f'<path d="{n["d"]}" fill="{fill}" stroke="#ffffff" stroke-width="4"/>'
paths+=f'<path d="{D["opstina"]}" fill="none" stroke="#7d8cbd" stroke-width="4"/>'
off={23:(-36,14),24:(36,14),25:(0,-44)}
dots=''
for b in D['bm']:
    o=off.get(b['bm'],(0,0)); x,y=b['x']+o[0],b['y']+o[1]; k=b['bm']
    if k in done: c=RED if rows[k]['votes'][2]>rows[k]['votes'][0] else BLUE; tc='#fff'
    else: c='#ffffff'; tc='#5c678f'
    dots+=f'<circle cx="{x}" cy="{y}" r="27" fill="{c}" stroke="{"#5c678f" if k not in done else "#fff"}" stroke-width="{4 if k not in done else 5}" {"stroke-dasharray=\"6 5\"" if k not in done else ""}/><text x="{x}" y="{y+11}" text-anchor="middle" font-family="JBM" font-weight="700" font-size="30" fill="{tc}">{k}</text>'
order=sorted(range(18),key=lambda k:-tot[k]); top=order[:5]; rest=order[5:]
bars=''; mx=max(tot)
items=[(k+1,L[k],tot[k]) for k in top]+[(None,f'Осталих {len(rest)} листа заједно',sum(tot[k] for k in rest))]
for i,(no,nm,v) in enumerate(items):
    y=i*64; w=600*v/mx; st=no==3; vu=no==1
    fill=RED if st else (BLUE if vu else '#7e8bb5')
    bars+=f'<text x="0" y="{y+24}" font-family="Inter" font-weight="{800 if (st or vu) else 600}" font-size="25" fill="#0b0f1e">{(str(no)+". ") if no else ""}{nm}</text>'
    bars+=f'<rect x="0" y="{y+34}" width="{max(w,3)}" height="26" fill="{fill}"/>'
    bars+=f'<text x="{max(w,3)+12}" y="{y+55}" font-family="JBM" font-weight="700" font-size="28" fill="{"#ac1129" if st else "#0b0f1e"}">{sr(100*v/V)}% <tspan font-size="22" font-weight="500" fill="#5c678f">{th(v)}</tspan></text>'
trs=''
for i in range(18):
    for k in (i+1,i+19):
        if k in done:
            r=rows[k]; vv=r['sum']; s=100*r['votes'][2]/vv; a=100*r['votes'][0]/vv
            trs+=f'<div class="r"><span class="n">{k}</span><span class="m">{names[k-1]}</span><span class="p" style="color:{"#ac1129" if s>a else "#5c678f"}">{sr(s)}%</span><span class="p" style="color:{"#253f87" if a>s else "#5c678f"}">{sr(a)}%</span></div>'
        else:
            trs+=f'<div class="r"><span class="n">{k}</span><span class="m" style="color:#5c678f">{names[k-1]}</span><span class="p" style="color:#7d8cbd">—</span><span class="p" style="color:#7d8cbd">—</span></div>'
Ud=R['Ud'];U=R['U']
nS=sum(1 for k in done if rows[k]['votes'][2]>rows[k]['votes'][0]); nV=len(done)-nS
html=f'''<!doctype html><html lang="sr-Cyrl"><head><meta charset="utf-8"><style>
@font-face{{font-family:Oswald;src:url(assets/Oswald-var.woff2)}}@font-face{{font-family:Inter;src:url(assets/Inter-var.woff2)}}@font-face{{font-family:JBM;src:url(assets/JetBrainsMono-var.woff2)}}
body{{margin:0}}#c{{position:relative;width:1080px;height:1920px;background:#fff;overflow:hidden;font-family:Inter;color:#0b0f1e}}.a{{position:absolute}}
.grid{{display:grid;grid-template-columns:1fr 1fr;column-gap:44px}}
.r{{display:grid;grid-template-columns:38px 1fr 92px 92px;align-items:baseline;border-bottom:1px solid #e1e6f4;padding:1px 0;font-size:18px;line-height:1.45}}
.n{{font-family:JBM;color:#253f87}}.m{{font-weight:600;white-space:nowrap;overflow:hidden}}.p{{font-family:JBM;font-weight:700;text-align:right}}
.hh{{display:grid;grid-template-columns:38px 1fr 92px 92px;font-size:17px;font-weight:700;color:#414a6d;border-bottom:2px solid #7d8cbd;padding-bottom:4px}}
</style></head><body><div id="c">
<div class="a" style="left:64px;top:58px;font-family:Oswald;font-weight:500;font-size:30px;letter-spacing:.18em;color:#253f87">ПАРЛАМЕНТАРНИ ИЗБОРИ · 25. ОКТОБАР 2026.</div>
<img class="a" src="assets/logo.png" style="right:56px;top:40px;width:160px;height:160px" alt="Кнић без рудника">
<div class="a" style="left:64px;top:110px;width:800px;font-family:Oswald;font-weight:700;font-size:92px;line-height:.92;text-transform:uppercase">Резултати<br>у Книћу</div>
<div class="a" style="left:64px;top:295px;padding:8px 16px;border:3px solid #0b0f1e;font-family:Oswald;font-weight:600;font-size:26px;letter-spacing:.06em">НЕЗВАНИЧНО · СВИХ 36 БИРАЧКИХ МЕСТА · ЗАПИСНИЦИ</div>
<svg class="a" style="left:64px;top:375px" width="952" height="390" viewBox="0 0 952 390">{bars}</svg>
<div class="a" style="left:64px;top:785px;width:440px;font-size:23px;line-height:1.4;color:#0b0f1e"><b>Ко води по бирачком месту</b><br><span style="color:#c0152f;font-weight:800">●</span> Студентска листа · <b style="font-family:JBM">{nS}</b><br><span style="color:#253f87;font-weight:800">●</span> листа А. Вучића · <b style="font-family:JBM">{nV}</b><br>Гласало <b style="font-family:JBM">{th(R["G"])}</b><br>Неважећих листића <b style="font-family:JBM">{R["NEV"]}</b> <span style="color:#5c678f">(2023: 203)</span>
<div style="margin-top:22px;padding-top:14px;border-top:2px solid #e1e6f4;font-size:22px;color:#414a6d">Листа А. Вучића у Книћу:<br><b style="font-family:JBM;color:#0b0f1e">2023: 54,55% → 2026: {sr(100*tot[0]/V,2)}%</b></div></div>
<svg class="a" style="left:540px;top:770px" width="460" height="482" viewBox="0 0 1000 1049">{paths}{dots}</svg>
<div class="a" style="left:64px;top:1268px;width:952px"><div class="grid"><div class="hh"><span>БМ</span><span></span><span style="text-align:right;color:#ac1129">Студ.</span><span style="text-align:right;color:#253f87">Вучић</span></div><div class="hh"><span>БМ</span><span></span><span style="text-align:right;color:#ac1129">Студ.</span><span style="text-align:right;color:#253f87">Вучић</span></div></div><div class="grid">{trs}</div></div>
<div class="a" style="left:0;right:0;bottom:0;height:96px;background:#e4e8f6;padding:14px 64px;box-sizing:border-box;font-family:JBM;font-size:18px;line-height:1.45;color:#5c678f">Незванично: записници са свих 36 бирачких места, % важећих листића. 2023: РЗС, РИК. Коначне резултате објављује РИК.<br>Група грађана Кнић без рудника · #KnicBezRudnika #Knic</div>
</div></body></html>'''
open('res.html','w').write(html); print(nS,nV)
