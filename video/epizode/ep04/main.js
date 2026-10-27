const O=0.30, TAG=121.65, END=TAG+3.97+2.6;
window.DURATION=END+O;
const $=id=>document.getElementById(id);
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lin=(t,a,b)=>clamp((t-a)/(b-a));
const eo=x=>1-Math.pow(1-x,3);
const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const fmt=n=>{const s=Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');return (n<0?'−':'')+s;};
const cnt=(t,a,d,v)=>fmt(v*eo(lin(t,a,a+d)));
function fade(el,t,a,dur=.28,dy=36){const p=eo(lin(t,a,a+dur));el.style.opacity=p;el.style.transform=`translateY(${(1-p)*dy}px)`;}
const SUBS=[
 [0.00,4.90,'Сви бројеви из ове серије… не значе ништа, ако у недељу не изађемо.'],
 [5.51,8.44,'Зато – недеља, корак по корак.'],
 [9.08,11.60,'Први корак: провери где гласаш.'],[11.94,17.28,'На сајту upit.birackispisak.gov.rs, за минут.'],
 [17.76,21.66,'Други корак: понеси важећу личну карту или пасош.'],[22.04,24.82,'Обавештење о бирачком месту није обавезно.'],
 [25.25,29.08,'Трећи корак: заокружи редни број испред једне листе.'],[29.39,30.58,'То је најсигурније.'],
 [30.94,34.60,'Ако погрешиш – или те неко притиска да заокружиш другог –'],[34.95,36.76,'листић не мораш да бациш.'],
 [37.23,42.66,'Прецртај све остале бројеве, и остави заокружен само онај за који заиста гласаш.'],
 [43.08,47.07,'Листић важи ако се без сумње види коју листу си изабрао.'],
 [47.42,52.41,'Али два заокружена броја, без прецртавања – то је неважећи листић.'],
 [52.75,55.14,'И запамти: гласање је тајно.'],[55.55,56.89,'Иза паравана си сам.'],[57.31,59.74,'Нико не може да зна за кога си гласао.'],
 [60.11,63.01,'Листић се не фотографише – то је забрањено.'],
 [63.41,68.50,'2023, у Книћу је било 203 неважећа листића.'],[68.89,72.29,'Више него што је гласало у Дубрави и Кикојевцу заједно.'],
 [72.67,76.36,'Четврти корак – и најважнији: гласај ујутру.'],
 [76.75,83.48,'2023, до 10 часова гласао је тек сваки шести од оних који су тог дана изашли.'],[83.90,86.31,'До подне – нешто више од трећине.'],
 [86.69,90.66,'Прве бројеве излазности РИК објављује већ у 10 и у подне.'],[91.10,95.43,'Ако тада буду већи него прошли пут – то ће видети цела Србија.'],
 [95.78,96.73,'Гласај рано.'],[97.08,100.04,'Па онда имаш цео дан да позовеш оне који нису.'],
 [100.44,101.23,'Подсетимо се.'],[101.64,105.26,'3.709 људи у Книћу није гласало.'],[105.64,107.12,'Разлика се преполовила.'],[107.51,110.71,'Наш део је 789 гласова.'],
 [111.05,112.27,'Сада је на нама.'],
 [112.66,115.60,'25. октобра, од 7 ујутру.'],[115.94,117.55,'Гласамо за број три.'],[117.91,119.09,'Студентска листа –'],[119.38,121.16,'Студенти побеђују!'],
 [TAG+0.28,TAG+1.37,'Ви одлучујете –'],[TAG+2.00,TAG+3.68,'Кнић без рудника.'],
];
const SC=[['s1',-9,5.3],['s2',5.3,8.85],['s3',8.85,17.6],['s4',17.6,25.0],['s5',25.0,47.2],['s6',47.2,52.6],['s7',52.6,63.2],['s8',63.2,72.5],['s9',72.5,95.6],['s10',95.6,100.3],['s11',100.3,110.9],['s12',110.9,112.5],['s13',112.5,115.8],['s14',115.8,121.4],['so',121.4,999]];
const SRC={
 s3:'Провера бирачког списка: upit.birackispisak.gov.rs',
 s4:'Извор: РИК, водич за бираче · важећа лична карта или пасош',
 s5:'Чл. 103 Закона о избору народних посланика · илустрација листића',
 s6:'Чл. 103 ЗИНП · о важности листића одлучује бирачки одбор',
 s7:'Тајност гласања · фотографисање попуњеног листића није дозвољено',
 s8:'Извор: РЗС, РИК · Кнић 2023 · 6.854 изашло, 6.651 важећих',
 s9:'Извор: РИК · Србија 2023 · % уписаних · за општине нема сатних података',
 s11:'Извор: РИК, РЗС · епизоде 1–3 · рачуница на подацима 2023',
};
const DARK={s1:1,s12:1,s13:1};

// S1 numbers
$('s1nums').innerHTML=['3.709','1.643','789'].map((n,i)=>`<div id="n${i}" class="mono" style="position:absolute;left:0;top:0;font-size:300px;line-height:1;color:${i===0?'#ff8d9c':'#b7c4ee'}">${n}</div>`).join('');
// S2 steps
$('s2steps').innerHTML=['Провери','Понеси','Заокружи','Ујутру'].map((n,i)=>`<div id="st${i}" style="border-top:8px solid ${i===3?'#c0152f':'#253f87'};padding-top:14px"><div class="mono" style="font-size:56px;color:${i===3?'#ac1129':'#253f87'}">${i+1}</div><div style="font-family:Inter;font-weight:700;font-size:32px;color:#0b0f1e">${n}</div></div>`).join('');
// Knić maps
function knicMap(id,hl){const M=window.MAPD;let h='';
 M.nas.forEach(n=>h+=`<path ${hl.includes(n.l)?'class="hl"':''} d="${n.d}" fill="#f2f4fa" stroke="#ffffff" stroke-width="4"/>`);
 h+=`<path d="${M.jezero}" fill="#b7c4ee"/><path d="${M.opstina}" fill="none" stroke="#7d8cbd" stroke-width="5"/>`;
 const off={23:[-16,4],24:[16,4],25:[0,-22]};
 if(id==='s3map')M.bm.forEach(b=>{const o=off[b.bm]||[0,0];h+=`<circle class="bmd" cx="${b.x+o[0]}" cy="${b.y+o[1]}" r="13" fill="#253f87" stroke="#fff" stroke-width="4"/>`;});
 $(id).innerHTML=h;}
knicMap('s3map',[]);knicMap('s8map',['Dubrava','Kikojevac']);
// Ballot builder
const ROWS=['ИЗБОРНА ЛИСТА','ИЗБОРНА ЛИСТА','СТУДЕНТСКА ЛИСТА','ИЗБОРНА ЛИСТА','ИЗБОРНА ЛИСТА','ИЗБОРНА ЛИСТА'];
function ballot(svg,pfx,W=860,H=760,fs=34){
 let h=`<rect x="4" y="4" width="${W-8}" height="${H-8}" fill="#ffffff" stroke="#0b0f1e" stroke-width="4"/>`;
 h+=`<text x="40" y="66" font-family="JBM" font-weight="600" font-size="${fs*0.8}" fill="#5c678f">ГЛАСАЧКИ ЛИСТИЋ · ИЛУСТРАЦИЈА</text><line x1="40" x2="${W-40}" y1="92" y2="92" stroke="#e1e6f4" stroke-width="3"/>`;
 const rh=(H-150)/6;
 ROWS.forEach((r,i)=>{const y=140+i*rh+rh/2;
  h+=`<text x="70" y="${y+fs*0.36}" font-family="JBM" font-weight="700" font-size="${fs*1.3}" fill="#0b0f1e">${i+1}.</text>`;
  h+=`<text x="150" y="${y+fs*0.36}" font-family="Inter" font-weight="${i===2?700:500}" font-size="${fs}" fill="${i===2?'#0b0f1e':'#414a6d'}">${r}</text>`;
  h+=`<ellipse id="${pfx}c${i}" cx="88" cy="${y}" rx="${fs*1.45}" ry="${fs*1.15}" fill="none" stroke="#253f87" stroke-width="${fs*0.2}" stroke-dasharray="400" stroke-dashoffset="400" transform="rotate(-8 88 ${y})"/>`;
  h+=`<line id="${pfx}x${i}" x1="40" x2="${W-50}" y1="${y}" y2="${y-6}" stroke="#0b0f1e" stroke-width="${fs*0.16}" stroke-dasharray="${W}" stroke-dashoffset="${W}"/>`;
 });
 svg.innerHTML=h;}
ballot($('ballot'),'b');
function circ(pfx,i,p){$(pfx+'c'+i).setAttribute('stroke-dashoffset',400*(1-p));}
function strike(pfx,i,p,W=860){$(pfx+'x'+i).setAttribute('stroke-dashoffset',W*(1-p));}
// S6 cards
(function(){const g=$('s6cards');const L=[['НАЈСИГУРНИЈЕ','#253f87'],['ВАЖИ – АКО ЈЕ ЈАСНО','#253f87'],['НЕВАЖЕЋИ','#c0152f']];
 L.forEach((l,i)=>{const x=64+i*322;g.insertAdjacentHTML('beforeend',`<div class="abs" id="cd${i}" style="left:${x}px;top:430px;width:300px"><svg id="mb${i}" width="300" height="420" viewBox="0 0 860 1200"></svg><div style="margin-top:14px;padding:10px 12px;background:${l[1]};color:#fff;font-family:Oswald;font-weight:700;font-size:26px;white-space:nowrap;text-align:center">${l[0]}</div></div>`);
  ballot($('mb'+i),'m'+i,860,1200,46);});
 g.insertAdjacentHTML('beforeend',`<div class="abs" id="stamp" style="left:690px;top:600px;padding:10px 20px;border:8px solid #c0152f;color:#c0152f;font-family:Oswald;font-weight:700;font-size:56px;transform:rotate(-12deg);background:rgba(255,255,255,.85)">НЕВАЖЕЋИ</div>`);
 // preset states
 circ('m0',2,1); [0,1,3,4,5].forEach(i=>{$('m1x'+i).setAttribute('stroke-dashoffset',0);}); circ('m1',0,1); circ('m1',2,1); circ('m2',0,1); circ('m2',2,1);
 g.insertAdjacentHTML('beforeend',`<div class="abs" style="left:64px;top:1010px;width:952px;font-family:Inter;font-weight:600;font-size:34px;line-height:1.35;color:var(--ink6)">Листић важи ако се без сумње види коју листу си изабрао. О важности одлучује бирачки одбор.</div>`);
})();
// S7 paravan
(function(){let h='';
 h+=`<g id="pv"><polygon points="120,40 300,80 300,520 120,480" fill="#eaeefb" stroke="#253f87" stroke-width="8"/><polygon points="300,80 500,80 500,520 300,520" fill="#eaeefb" stroke="#253f87" stroke-width="8"/><polygon points="500,80 680,40 680,480 500,520" fill="#eaeefb" stroke="#253f87" stroke-width="8"/></g>`;
 h+=`<g id="ps"><circle cx="400" cy="210" r="46" fill="#16265a"/><rect x="335" y="270" width="130" height="250" fill="#16265a"/></g>`;
 h+=`<g id="pt1"><text x="400" y="-0" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="0" fill="#0b0f1e"></text></g>`;
 $('s7svg').innerHTML=h;})();
// S9 chart
const H23=[[7,0],[10,9.94],[12,21.33],[14,32.38],[16,42.36],[18,51.93],[20,58.77]];
const CX=h=>60+(h-7)/13*860, CY=v=>600-v/60*560;
(function(){let h='';
 for(let v=0;v<=60;v+=20){h+=`<line x1="60" x2="920" y1="${CY(v)}" y2="${CY(v)}" stroke="#e1e6f4" stroke-width="2"/><text x="0" y="${CY(v)+8}" font-family="JBM" font-size="24" fill="#5c678f">${v}%</text>`;}
 [7,10,12,14,16,18,20].forEach(x=>h+=`<text x="${CX(x)}" y="640" text-anchor="middle" font-family="JBM" font-size="26" fill="#414a6d">${x}ч</text>`);
 h+=`<polyline id="lfull" points="${H23.map(p=>CX(p[0])+','+CY(p[1])).join(' ')}" fill="none" stroke="#b7c4ee" stroke-width="6"/>`;
 h+=`<polyline id="lhi" points="" fill="none" stroke="#253f87" stroke-width="12"/>`;
 h+=`<g id="m10"><circle cx="${CX(10)}" cy="${CY(9.94)}" r="14" fill="#253f87"/><text x="${CX(10)+22}" y="${CY(9.94)+10}" font-family="JBM" font-weight="700" font-size="34" fill="#253f87">10ч · 9,9%</text></g>`;
 h+=`<g id="m12"><circle cx="${CX(12)}" cy="${CY(21.33)}" r="14" fill="#253f87"/><text x="${CX(12)+22}" y="${CY(21.33)+10}" font-family="JBM" font-weight="700" font-size="34" fill="#253f87">12ч · 21,3%</text></g>`;
 h+=`<g id="rik"><line x1="${CX(10)}" x2="${CX(10)}" y1="${CY(60)}" y2="600" stroke="#0b0f1e" stroke-width="3" stroke-dasharray="8 8"/><line x1="${CX(12)}" x2="${CX(12)}" y1="${CY(60)}" y2="600" stroke="#0b0f1e" stroke-width="3" stroke-dasharray="8 8"/><text x="${CX(11)}" y="${CY(60)-12}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="28" fill="#0b0f1e">први бројеви РИК-а</text></g>`;
 h+=`<g id="l26"><polyline points="${CX(7)},${CY(0)} ${CX(10)},${CY(13)} ${CX(12)},${CY(27)}" fill="none" stroke="#c0152f" stroke-width="8" stroke-dasharray="16 12"/><text x="${CX(12)+22}" y="${CY(27)-14}" font-family="Inter" font-weight="800" font-size="34" fill="#ac1129">2026: више?</text></g>`;
 $('s9svg').innerHTML=h;})();
