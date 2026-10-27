import json
S=json.load(open('series.json')); H=sorted(S,key=int)
u=[500,263,88,248,186,402,217,96,338,461,233,164,604,346,121,378,276,180,186,287,93,118,700,493,545,203,150,327,270,208,290,315,281,152,345,153]
names=['Честин','Балосаве','Врбета','Баре','Бечевица','Борач','Брњица','Дубрава','Бумбарево Брдо','Вучковица','Гривац','Гружа 1','Гружа 2','Губеревац 1','Губеревац 2','Гунцати 1','Гунцати 2','Драгушица','Жуње','Забојница','Кикојевац','Кнежевац','Кнић 1','Кнић 2','Кнић 3','Коњуша','Лесковац','Липница','Љубић','Љуљаци','Опланић','Пајсијевић','Претоке','Радмиловић','Топоница','Рашковић']
sr=lambda x,d=1: f"{x:.{d}f}".replace('.',',')
U=sum(u); tot=[100*sum(S[h])/U for h in H]
cw,ch=160,232
cells=''
for i in range(36):
    v=[100*S[h][i]/u[i] for h in H]; hs=[int(h) for h in H]
    X=lambda h:10+(h-8)/11*140; Y=lambda p:150-p/100*120
    sp=f'<polyline points="{" ".join(f"{X(h)},{Y(p)}" for h,p in zip(hs,tot))}" fill="none" stroke="#b7c4ee" stroke-width="3" stroke-dasharray="6 5"/>'
    sp+=f'<polyline points="{" ".join(f"{X(h)},{Y(p)}" for h,p in zip(hs,v))}" fill="none" stroke="#253f87" stroke-width="5"/><circle cx="{X(hs[-1])}" cy="{Y(v[-1])}" r="6" fill="#253f87"/>'
    cells+=f'<div class="cell"><div class="hd"><span class="n">{i+1}</span>{names[i]}</div><svg width="160" height="160" viewBox="0 0 160 160"><line x1="10" x2="150" y1="150" y2="150" stroke="#e1e6f4" stroke-width="2"/><line x1="10" x2="150" y1="90" y2="90" stroke="#e1e6f4" stroke-width="2"/>{sp}</svg><div class="v">{sr(v[-1])}%</div></div>'
html=f'''<!doctype html><html lang="sr-Cyrl"><head><meta charset="utf-8"><style>
@font-face{{font-family:Oswald;src:url(assets/Oswald-var.woff2)}}@font-face{{font-family:Inter;src:url(assets/Inter-var.woff2)}}@font-face{{font-family:JBM;src:url(assets/JetBrainsMono-var.woff2)}}
body{{margin:0}}#c{{position:relative;width:1080px;height:1920px;background:#fff;overflow:hidden;font-family:Inter;color:#0b0f1e}}
.a{{position:absolute}}.g{{display:grid;grid-template-columns:repeat(6,{cw}px);gap:6px 0}}
.cell{{height:{ch}px;border-top:2px solid #e1e6f4;padding-top:6px}}.hd{{font-size:19px;font-weight:700;white-space:nowrap;overflow:hidden}}.n{{font-family:JBM;color:#253f87;margin-right:6px;font-weight:600}}
.v{{font-family:JBM;font-weight:700;font-size:26px;color:#16265a;margin-top:-14px;padding-left:10px}}
</style></head><body><div id="c">
<div class="a" style="left:64px;top:58px;font-family:Oswald;font-weight:500;font-size:30px;letter-spacing:.18em;color:#253f87">ПАРЛАМЕНТАРНИ ИЗБОРИ · 25. ОКТОБАР 2026.</div>
<img class="a" src="assets/logo.png" style="right:56px;top:40px;width:150px;height:150px" alt="Кнић без рудника">
<div class="a" style="left:64px;top:110px;width:800px;font-family:Oswald;font-weight:700;font-size:72px;line-height:.95;text-transform:uppercase">Раст излазности<br>по бирачким местима</div>
<div class="a" style="left:64px;top:290px;font-size:28px;color:#414a6d"><span style="color:#253f87;font-weight:800">━</span> бирачко место &nbsp; <span style="color:#7e8bb5;font-weight:800">┅</span> општина Кнић ({sr(tot[-1],2)}%) &nbsp;·&nbsp; 8–{H[-1]} ч, 0–100%</div>
<div class="a g" style="left:60px;top:345px">{cells}</div>
<div class="a" style="left:0;right:0;bottom:0;height:110px;background:#e4e8f6;padding:20px 64px;box-sizing:border-box;font-family:JBM;font-size:21px;line-height:1.45;color:#5c678f">Излазност по бирачком месту у 8, 10, 12, 14, 16, 18 и {H[-1]} ч (% уписаних). Извор: подаци са бирачких места; списак: РИК.<br>Група грађана Кнић без рудника · #KnicBezRudnika #Knic</div>
</div></body></html>'''
open(f'grid{H[-1]}.html','w').write(html); print(H)
