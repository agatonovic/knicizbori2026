const O=0.30, TAG=191.70, END=TAG+3.97+2.6;
window.DURATION=END+O;
const $=id=>document.getElementById(id);
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lin=(t,a,b)=>clamp((t-a)/(b-a));
const eo=x=>1-Math.pow(1-x,3);
const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const fmt=n=>{const s=Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');return (n<0?'−':'')+s;};
const cnt=(t,a,d,v)=>fmt(v*eo(lin(t,a,a+d)));
const pc=(x,d=1)=>x.toFixed(d).replace('.',',');
function fade(el,t,a,dur=.28,dy=36){const p=eo(lin(t,a,a+dur));el.style.opacity=p;el.style.transform=`translateY(${(1-p)*dy}px)`;}

const SUBS=[
 [0.00,1.88,'Двадесет пети октобар.'],[2.49,3.59,'Кнић је изабрао.'],
 [4.23,9.02,'Ово су резултати – свако место, свако бирачко место, по записницима.'],
 [9.49,13.09,'Гласало је 7.392 људи.'],[13.55,16.33,'Излазност – 72%.'],
 [16.83,20.76,'Највећа на републичким изборима у Книћу још од двехиљадитих.'],
 [21.20,25.21,'Студентска листа – 3.783 гласа.'],[25.54,27.33,'Скоро 52%.'],
 [27.84,31.80,'Листа Александра Вучића – 3.164.'],[32.14,33.59,'43%.'],
 [34.05,36.86,'Разлика – 619 гласова.'],
 [37.63,43.54,'Пре три године, СНС и СПС заједно имали су у Книћу 62%.'],
 [44.00,47.71,'Данас, Вучић и Дачић заједно – 45.'],
 [48.38,52.56,'Студентска листа сама има више од обе листе власти заједно.'],
 [52.94,57.82,'Студентска листа победила је на 26 од 36 бирачких места.'],
 [58.23,59.63,'Честин, Балосаве…'],[59.98,61.44,'Бечевица, Борач…'],[61.74,63.09,'Брњица, Дубрава…'],[63.45,64.96,'Вучковица, Гривац…'],
 [65.26,66.88,'Грабовац, Губеревац…'],[67.18,68.96,'Губеревац 2, Пољци…'],[69.32,70.98,'Драгушица, Забојница…'],[71.35,72.91,'Кикојевац, Кнежевац…'],
 [73.25,75.37,'Кнић – Рибеш, Доња мала…'],[75.68,77.20,'Горња мала, Коњуша…'],[77.52,78.96,'Лесковац, Липница…'],[79.31,80.68,'Опланић, Претоке…'],[80.99,82.60,'Топоница, Рашковић.'],
 [83.41,85.36,'Листа Вучића – на десет.'],
 [85.69,86.92,'Врбета, Баре…'],[87.24,88.93,'Бумбарево Брдо, Гружа…'],[89.24,90.59,'Гунцати, Жуње…'],[90.88,92.21,'Љубић, Љуљаци…'],[92.56,94.18,'Пајсијевић, Радмиловић.'],
 [94.83,98.37,'Највише за студенте – Лесковац, 70%.'],[98.74,100.46,'Кикојевац – 68.'],
 [100.79,105.34,'Преко 60% још Дубрава, Рашковић, Драгушица и Топоница.'],
 [105.99,110.66,'Најтесније – Брњица. 70 према 69.'],[111.11,112.90,'Један једини глас.'],
 [113.42,117.47,'У Бумбаревом Брду разлика је 4 гласа, у Врбети 5.'],[117.81,119.47,'Сваки глас се рачунао.'],
 [120.12,126.29,'У односу на 2023, листа власти је пала на свих 36 бирачких места.'],[126.64,127.75,'Без изузетка.'],
 [128.29,132.96,'Највише у Гунцатима и Брњици – више од 22 процентна поена.'],
 [133.48,139.46,'Пре три године, власт није имала већину само у Лесковцу и на једном бирачком месту у Губеревцу.'],
 [139.86,142.42,'Данас – нема је на 26.'],
 [142.81,146.95,'Најбоља излазност – Дубрава, 87,5%.'],[147.54,151.88,'Па Врбета, Кикојевац и Рашковић – преко 83.'],
 [152.63,153.30,'А Србија?'],[154.11,156.64,'Студентска листа – 53%.'],[157.57,159.92,'Листа Вучића – око 40.'],
 [160.57,164.64,'Од 28 градова, студенти су победили у 25.'],[165.08,168.49,'Нови Сад и Београд – скоро 64%.'],
 [169.18,172.90,'Чачак, Ваљево, Ужице и Ниш – преко 60.'],[173.67,177.54,'Листа Вучића задржала је само Лесковац, Врање и Прокупље.'],
 [178.48,182.36,'А Кнић је гласао јаче од Крушевца, Пожаревца и Пирота.'],
 [183.83,185.87,'Хвала свима који су изашли.'],[186.54,188.03,'Ово је ваш резултат.'],[189.18,191.24,'Кнић је показао да може.'],
 [TAG+0.28,TAG+1.37,'Ви одлучујете –'],[TAG+2.00,TAG+3.68,'Кнић без рудника.'],
];
const SC=[['s1',-9,9.3],['s2',9.3,20.95],['s3',20.95,37.3],['s4',37.3,52.75],['s5',52.75,94.55],['s7',94.55,105.75],['s8',105.75,119.85],
 ['s9',119.85,133.2],['s10',133.2,142.65],['s11',142.65,152.3],['s12',152.3,160.3],['s13',160.3,183.4],['s14',183.4,TAG-0.25],['so',TAG-0.25,999]];
const SRC={
 s2:'Извор: arhivaizbora.rs, РИК · парламентарни · скала од 30%',
 s3:'Извор: записници свих 36 БМ (= РИК) · % важећих листића',
 s4:'Извор: РИК 2023 (СНС 3.628, СПС 519 / 6.651) · записници 2026',
 s5:'Записници свих 36 бирачких места · сви гласови свих листа',
 s7:'Записници 2026 · Студентска листа, % важећих по БМ',
 s8:'Записници 2026 · број гласова на бирачком месту',
 s9:'Листа СНС 2023 → листа А. Вучића 2026 · % важећих, п.п.',
 s10:'Власт: СНС+СПС (2023), Вучић+Дачић (2026) · испод 50% важећих',
 s11:'Излазност = гласали / уписани (примљени листићи) по БМ',
 s12:'Извор: РИК, пресек 27.10.2026. 14:45 · 98% БМ · % важећих',
 s13:'Извор: РИК, 27.10.2026. 14:45 · без градова на КиМ · % важећих',
};
const DARK={s1:1,s14:1};
const NOSUB={s5:1,s13:1,s14:1};

const D=window.ST5;               // 36 BM
const BM=k=>D[k-1];
const SW=k=>BM(k).v[2]>BM(k).v[0]; // Studentska wins
const LN=['Вучић','Дачић','Студентска листа','Љајић','СВМ','Зукорлић','Руска странка','Аутентична десница','Европска Србија','СДА Санџака','Карић','Либерално зелена','Бирам правду','Рус.-срп. јединство','Ћале, ово је за тебе','Гајић','Албанска коалиција','Мајка Србија'];
const RED='#c0152f',REDL='#f2b8c1',BLUE='#253f87',BLUEL='#b7c4ee',GREY='#f2f4fa';
// naselje -> BM
const NB={'Bajčetina':[1],'Čestin':[1],'Balosave':[2],'Vrbeta':[3],'Bare':[4],'Bečevica':[5],'Borač':[6],'Brnjica':[7],'Dubrava':[8],'Bumbarevo Brdo':[9],
 'Vučkovica':[10],'Grivac':[11],'Gruža':[12],'Grabovac':[13],'Guberevac':[14,15],'Guncati':[16,17],'Dragušica':[18],'Žunje':[19],'Zabojnica':[20],'Sumorovac':[20],
 'Kikojevac':[21],'Kneževac':[22],'Knić':[23,24,25],'Konjuša':[26],'Brestovac':[26],'Leskovac':[27],'Lipnica':[28],'Ljubić':[29],'Ljuljaci':[30],'Oplanić':[31],
 'Pajsijević':[32],'Pretoke':[33],'Radmilović':[34],'Toponica':[35],'Kusovac':[35],'Rašković':[36]};

function mapSvg(id,dark){const M=window.MAPD;let h=`<defs><pattern id="${id}st" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="24" fill="${REDL}"/><rect x="12" width="12" height="24" fill="${BLUEL}"/></pattern></defs>`;
 M.nas.forEach((n,i)=>h+=`<path id="${id}n${i}" d="${n.d}" fill="${dark?'#253f87':GREY}" stroke="${dark?'#16265a':'#ffffff'}" stroke-width="4"/>`);
 h+=`<path d="${M.jezero}" fill="${dark?'#16265a':'#ffffff'}" stroke="${dark?'#7e8bb5':BLUEL}" stroke-width="3"/><path d="${M.opstina}" fill="none" stroke="${dark?'#b7c4ee':'#7d8cbd'}" stroke-width="5"/>`;
 h+=`<g id="${id}hl"></g>`;
 $(id).innerHTML=h;}
function setN(id,i,fill){const e=$(id+'n'+i);if(e.getAttribute('fill')!==fill)e.setAttribute('fill',fill);}
function hlSet(id,list,color){const g=$(id+'hl');const key=list.join(',')+color;if(g.dataset.k===key)return;g.dataset.k=key;const M=window.MAPD;
 g.innerHTML=list.map(i=>`<path d="${M.nas[i].d}" fill="none" stroke="${color}" stroke-width="12"/>`).join('');}
const NIDX={};window.MAPD.nas.forEach((n,i)=>NIDX[n.l]=i);
const bmNas=k=>Object.keys(NB).filter(l=>NB[l].includes(k)).map(l=>NIDX[l]);

// winner fill of naselje given revealed set
function nasFill(l,rev,strongSet){const ks=NB[l].filter(k=>rev.has(k));if(!ks.length)return GREY;
 const s=ks.filter(SW).length, v=ks.length-s; const strong=ks.some(k=>strongSet&&strongSet.has(k));
 if(s&&v)return 'url(#'+'%ID%'+'st)'; if(s)return strong?RED:REDL; return strong?BLUE:BLUEL;}
function paintMap(id,rev,strong){Object.keys(NB).forEach(l=>{let f=nasFill(l,rev,strong);f=f.replace('%ID%',id);setN(id,NIDX[l],f);});}

// ---- S1 map (dark) + BM dots
mapSvg('s1map',true);
(function(){let h='';window.MAPD.bm.forEach(b=>{const off={23:[-16,4],24:[16,4],25:[0,-22]}[b.bm]||[0,0];h+=`<circle class="bmd" cx="${b.x+off[0]}" cy="${b.y+off[1]}" r="14" fill="#ffffff" stroke="#16265a" stroke-width="4" opacity="0"/>`;});$('s1map').insertAdjacentHTML('beforeend',h);})();

// ---- S2 turnout chart
const TURN=[[2000,64.11],[2003,58.84],[2007,64.08],[2008,67.89],[2012,68.76],[2014,56.74],[2016,66.24],[2020,63.32],[2022,60.54],[2023,64.89],[2026,72.33]];
(function(){const W=952,H=660,bw=62,gap=(W-TURN.length*bw)/(TURN.length-1),base=560,sc=6.2;let h='';
 h+=`<text x="0" y="28" font-family="Inter" font-weight="600" font-size="26" fill="#414a6d">ИЗЛАЗНОСТ НА ПАРЛАМЕНТАРНИМ ИЗБОРИМА, %</text>`;
 TURN.forEach(([y,v],i)=>{const x=i*(bw+gap),hh=(v-30)*sc,last=y===2026;
  h+=`<rect class="tb" data-h="${hh}" x="${x}" y="${base}" width="${bw}" height="0" fill="${last?RED:BLUEL}"/>`;
  h+=`<text class="tv" x="${x+bw/2}" y="${base-hh-14}" text-anchor="middle" font-family="JBM" font-weight="700" font-size="${last?30:22}" fill="${last?'#ac1129':'#414a6d'}" opacity="0">${pc(v,1)}</text>`;
  h+=`<text x="${x+bw/2}" y="${base+40}" text-anchor="middle" font-family="JBM" font-size="22" fill="${last?'#ac1129':'#5c678f'}" font-weight="${last?700:500}">${String(y).slice(2)=='00'?'2000':"'"+String(y).slice(2)}</text>`;});
 h+=`<line x1="0" x2="${W}" y1="${base}" y2="${base}" stroke="#7d8cbd" stroke-width="3"/>`;
 $('s2c').innerHTML=h;})();

// ---- S4 bars
(function(){const rows=[['2023 · СНС + СПС',62.35,BLUE,'#253f87'],['2026 · Вучић + Дачић',45.29,BLUE,'#253f87'],['2026 · Студентска листа',51.81,RED,'#ac1129']];
 let h='';rows.forEach((r,i)=>{h+=`<div id="s4r${i}" style="position:absolute;left:0;top:${i*240}px;width:952px"><div style="font-family:Inter;font-weight:700;font-size:36px;color:#0b0f1e">${r[0]}</div>
 <div style="position:relative;height:90px;margin-top:14px;background:${GREY}"><div id="s4b${i}" style="position:absolute;left:0;top:0;bottom:0;width:0;background:${r[2]}"></div>
 <div id="s4v${i}" class="mono" style="position:absolute;right:20px;top:8px;font-size:62px;color:${r[3]}"></div></div></div>`;});
 h+=`<div style="position:absolute;left:${952*0.5}px;top:40px;height:${3*240-60}px;border-left:4px dashed #0b0f1e"></div><div style="position:absolute;left:${952*0.5+12}px;top:${3*240-50}px;font-family:JBM;font-size:26px;color:#0b0f1e">50%</div>`;
 $('s4r').innerHTML=h;})();
const S4V=[62.35,45.29,51.81];

// ---- S5 sequence
const PS=[[58.23,59.63,1,2],[59.98,61.44,5,6],[61.74,63.09,7,8],[63.45,64.96,10,11],[65.26,66.88,13,14],[67.18,68.96,15,17],[69.32,70.98,18,20],[71.35,72.91,21,22],
 [73.25,75.37,23,24],[75.68,77.20,25,26],[77.52,78.96,27,28],[79.31,80.68,31,33],[80.99,82.60,35,36]];
const PV=[[85.69,86.92,3,4],[87.24,88.93,9,12],[89.24,90.59,16,19],[90.88,92.21,29,30],[92.56,94.18,32,34]];
const REV=[];[...PS,...PV].forEach(p=>{const m=p[0]+0.46*(p[1]-p[0]);REV.push([p[0],p[2]]);REV.push([m,p[3]]);});
mapSvg('s5map',false);mapSvg('s7map',false);mapSvg('s8map',false);mapSvg('s11map',false);mapSvg('s14map',true);
function card(k){const b=BM(k),s=SW(k),col=s?RED:BLUE;const rows=b.v.map((x,i)=>[i,x]).filter(r=>r[1]>0).sort((a,c)=>c[1]-a[1]);const mx=rows[0][1];
 let h=`<div style="border-top:10px solid ${col};background:#fff;padding-top:14px">
 <div style="display:flex;justify-content:space-between;align-items:baseline"><span class="mono" style="font-size:26px;color:#5c678f">БМ ${k}</span><span class="mono" style="font-size:26px;color:#5c678f">излазност ${pc(b.izl)}%</span></div>
 <div class="disp" style="font-size:${b.n.length>15?42:54}px;margin-top:6px;color:#0b0f1e;white-space:nowrap">${b.n}</div>
 <div style="font-family:Inter;font-size:25px;color:#5c678f;margin:4px 0 12px">${b.val} важећих · ${b.nev} неважећих</div>`;
 rows.forEach(([i,x])=>{const top=i===2||i===0;const c=i===2?RED:(i===0?BLUE:'#7e8bb5');
  h+=`<div style="position:relative;height:44px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e1e6f4">
  ${top?`<div style="position:absolute;left:0;bottom:0;height:6px;width:${Math.max(2,x/mx*100)}%;background:${c}"></div>`:''}
  <span style="font-family:Inter;font-weight:${top?700:500};font-size:${top?28:25}px;color:${top?'#0b0f1e':'#414a6d'};white-space:nowrap">${LN[i]}</span>
  <span class="mono" style="font-size:${top?36:28}px;font-weight:700;color:${i===2?'#ac1129':(i===0?'#253f87':'#0b0f1e')}">${x}</span></div>`;});
 h+=`<div style="font-family:Inter;font-size:22px;color:#7d8cbd;margin-top:10px">Остале листе: 0 гласова</div></div>`;return h;}
const CARDS={};for(let k=1;k<=36;k++)CARDS[k]=card(k);

// ---- S7/S11 ranking rows
function rankRows(el,items,maxv,red0){let h='';items.forEach((it,i)=>{const c=it.red?RED:(it.col||BLUE);
 h+=`<div id="${el}_${i}" style="position:relative;height:128px;opacity:0"><div style="display:flex;justify-content:space-between;align-items:baseline">
 <span style="font-family:Inter;font-weight:700;font-size:40px;color:#0b0f1e">${it.name}</span><span class="mono" style="font-size:44px;font-weight:700;color:${it.red?'#ac1129':'#253f87'}">${pc(it.v)}%</span></div>
 <div style="position:relative;height:34px;margin-top:8px;background:${GREY}"><div id="${el}_b${i}" style="position:absolute;left:0;top:0;bottom:0;width:0;background:${c}"></div></div></div>`;});$(el).innerHTML=h;}
const R7=[[27,96.32],[21,98.74],[8,102.55],[36,103.25],[18,103.95],[35,104.65]];
rankRows('s7r',R7.map(([k])=>({name:BM(k).n,v:100*BM(k).v[2]/BM(k).val,red:true})));
const R11=[[8,144.39],[3,148.0],[21,148.85],[36,149.75]];
rankRows('s11r',R11.map(([k],i)=>({name:BM(k).n,v:BM(k).izl,red:i===0})));
$('s11r').insertAdjacentHTML('beforeend',`<div id="s11avg" style="font-family:Inter;font-size:30px;color:#414a6d;margin-top:20px">Кнић укупно: <b class="mono" style="color:#0b0f1e">72,3%</b></div>`);

// ---- S8 rows
$('s8r').innerHTML=[[9,'Бумбарево Брдо'],[3,'Врбета']].map(([k,n],i)=>{const b=BM(k);return `<div id="s8r${i}" style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #e1e6f4;padding:14px 0">
 <span style="font-family:Inter;font-weight:700;font-size:40px">${n}</span><span class="mono" style="font-size:48px"><span style="color:#ac1129">${b.v[2]}</span> : <span style="color:#253f87">${b.v[0]}</span> <span style="font-size:32px;color:#5c678f">· ${b.v[0]-b.v[2]} гл.</span></span></div>`;}).join('');

// ---- S9 grid
(function(){let h='';const cw=952/6,ch=170;D.forEach((b,i)=>{const r=Math.floor(i/6),c=i%6;const nm=b.n.replace(/ \(.*\)/,'');const L=Math.abs(b.drop);
 h+=`<div id="g${b.bm}" style="position:absolute;left:${c*cw}px;top:${r*ch}px;width:${cw-10}px;height:${ch-10}px;background:${GREY};opacity:0;box-sizing:border-box;padding:10px 12px">
 <div style="font-family:Inter;font-weight:600;font-size:${nm.length>11?17:20}px;color:#414a6d;white-space:nowrap;overflow:hidden">${nm}</div>
 <div class="mono gv" style="font-size:40px;font-weight:700;color:#253f87;margin-top:6px">−${pc(L)}</div>
 <div style="position:absolute;left:12px;bottom:12px;height:12px;width:${Math.max(6,L/24*126)}px;background:#7e8bb5" class="gb"></div></div>`;});$('s9g').innerHTML=h;})();

// ---- S10 dots maps
function dotsMap(id,red){mapSvg(id,false);let h='';window.MAPD.bm.forEach(b=>{const off={23:[-22,6],24:[22,6],25:[0,-30]}[b.bm]||[0,0];
 h+=`<circle id="${id}d${b.bm}" cx="${b.x+off[0]}" cy="${b.y+off[1]}" r="22" fill="#7e8bb5" stroke="#fff" stroke-width="5"/>`;});$(id).insertAdjacentHTML('beforeend',h);}
dotsMap('s10m1');dotsMap('s10m2');
const NOMAJ23=[15,27];const NOMAJ26=D.filter(b=>(b.v[0]+b.v[1])*2<b.val).map(b=>b.bm);

// ---- S12 Serbia
const CITIES=[['Нови Сад',63.80,31.88],['Београд',63.61,31.95],['Чачак',62.20,33.97],['Ваљево',62.12,33.38],['Ужице',61.36,34.70],['Ниш',60.44,35.51],['Панчево',59.53,36.58],
 ['Крагујевац',58.47,35.92],['Вршац',56.30,39.47],['Зрењанин',56.21,38.71],['Шабац',54.50,41.34],['Краљево',54.48,40.22],['Бор',54.38,41.02],['Смедерево',52.74,42.57],
 ['Суботица',52.09,35.36],['Сомбор',52.06,41.62],['Зајечар',51.93,42.95],['Кнић',51.81,43.33],['Пожаревац',50.34,44.93],['Сремска Митровица',50.21,45.31],['Крушевац',50.20,45.29],
 ['Јагодина',50.13,36.44],['Пирот',48.92,45.94],['Лозница',48.23,47.94],['Кикинда',47.15,46.70],['Лесковац',45.17,48.91],['Прокупље',43.19,52.45],['Врање',41.82,52.65],['Нови Пазар',40.10,19.61]];
(function(){const S=window.SRB,C=window.CITY;let h=`<path d="${S.d}" fill="${GREY}" stroke="#7d8cbd" stroke-width="3"/>`;
 CITIES.forEach(([n,s,v],i)=>{if(n==='Кнић')return;const p=C[n];h+=`<circle class="cd" data-i="${i}" cx="${p[0]}" cy="${p[1]}" r="15" fill="${s>v?RED:BLUE}" stroke="#fff" stroke-width="4" opacity="0"/>`;});
 const k=C['Кнић'];h+=`<g id="s12k" opacity="0"><circle cx="${k[0]}" cy="${k[1]}" r="20" fill="#fff" stroke="${RED}" stroke-width="8"/><text x="${k[0]+34}" y="${k[1]+14}" font-family="Inter" font-weight="800" font-size="42" fill="#0b0f1e">Кнић</text></g>`;
 $('s12map').innerHTML=h;})();
// ---- S13 ranking
(function(){let h='';const rh=40;CITIES.forEach(([n,s,v],i)=>{const kn=n==='Кнић';
 h+=`<div id="cr${i}" style="position:absolute;left:0;top:${i*rh}px;width:952px;height:${rh-4}px;display:flex;align-items:center;opacity:0;box-sizing:border-box;${kn?'outline:4px solid #c0152f;':''}">
 <span class="mono" style="width:44px;font-size:20px;color:#7d8cbd">${i+1}</span>
 <span class="cn" style="width:250px;font-family:Inter;font-weight:${kn?800:600};font-size:24px;color:#0b0f1e;white-space:nowrap">${n}</span>
 <span style="position:relative;width:470px;height:24px;background:${GREY}"><span style="position:absolute;left:0;top:0;bottom:0;width:${s}%;background:${RED}"></span><span style="position:absolute;left:${s}%;top:0;bottom:0;width:${v}%;background:${BLUE}"></span></span>
 <span class="mono" style="width:188px;text-align:right;font-size:23px;font-weight:700"><span style="color:#ac1129">${pc(s)}</span> <span style="color:#253f87">${pc(v)}</span></span></div>`;});
 h+=`<div id="crleg" style="position:absolute;left:0;top:${CITIES.length*rh+10}px;font-family:Inter;font-size:22px;color:#414a6d"><span style="color:#c0152f">■</span> Студентска листа &nbsp; <span style="color:#253f87">■</span> Листа А. Вучића</div>`;
 $('s13r').style.height=(CITIES.length*rh+50)+'px';$('s13r').innerHTML=h;})();
const CI=n=>CITIES.findIndex(c=>c[0]===n);
