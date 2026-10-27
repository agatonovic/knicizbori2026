const O=0.30, TAG=110.45, END=TAG+3.97+2.6;
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
 [0.00,4.78,'На парламентарним изборима, цела Србија је једна изборна јединица.'],[5.29,9.46,'Сваки глас из Кнића иде у исти збир као глас из Београда.'],
 [10.12,13.03,'Зато питање није ко ће победити у Книћу.'],[13.61,16.42,'Питање је – колики је наш део посла.'],
 [17.37,20.28,'2023, листе власти –'],[20.59,24.41,'СНС, СПС и Савез војвођанских Мађара –'],[24.77,28.88,'добиле су у Србији 2.098.000 гласова.'],
 [29.39,33.67,'Све остале листе заједно – 1.612.000.'],[34.27,37.45,'Разлика: 485.000.'],
 [38.40,39.27,'Звучи много.'],[39.86,44.73,'Али код куће је тада остало 2.680.000 људи.'],
 [45.65,48.70,'Када би свака општина дала нове гласове за промену,'],[48.91,50.86,'сразмерно броју својих бирача –'],[51.25,52.37,'разлика нестаје.'],
 [53.23,54.73,'Како то изгледа за Кнић?'],[55.56,59.32,'Србија има 615 пута више бирача од Кнића.'],
 [59.94,63.48,'Ако разлику поделимо на 615 једнаких делова –'],[63.86,68.54,'један део, наш, износи 789 људи.'],
 [69.25,72.71,'Мање од четвртине оних који код нас нису гласали.'],
 [73.57,74.84,'Или друга полуга.'],[75.43,79.27,'Ко пређе са листе власти на другу листу, рачуна се двапут.'],
 [79.88,84.62,'У целој Србији довољно је да се предомисли сваки осми бирач власти.'],
 [85.28,89.55,'Наш део, по истом рачуну: 395 људи.'],[90.34,92.17,'Триста деведесет пет.'],[92.73,95.09,'Мање него што има бирача у Честину.'],
 [96.03,97.30,'То није немогуће.'],[97.79,99.74,'То је један разговор са комшијом.'],
 [100.42,104.03,'25. октобра, од 7 до 20 часова.'],[104.62,106.24,'Гласамо за број три.'],
 [106.80,107.94,'Студентска листа –'],[108.20,109.87,'Студенти побеђују!'],
 [TAG+0.28,TAG+1.37,'Ви одлучујете –'],[TAG+2.00,TAG+3.68,'Кнић без рудника.'],
];
const SC=[['s1',-9,9.9],['s2',9.9,17.1],['s3',17.1,37.9],['s4',37.9,45.4],['s5',45.4,65.55],['s6',65.55,73.3],['s7',73.3,85.0],['s8',85.0,95.7],['s9',95.7,100.2],['s10',100.2,104.45],['s11',104.45,110.2],['so',110.2,999]];
const SRC={
 s1:'Закон о избору народних посланика · Србија = једна изборна јединица',
 s3:'Извор: РИК, коначни резултати 2023 · власт = СНС + СПС + СВМ',
 s4:'Извор: РИК 2023 · 6.500.666 уписаних − 3.820.746 изашлих',
 s5:'Рачуница · сразмерно броју уписаних (РИК 2023) · гласови ≠ мандати',
 s6:'Рачуница · 485.751 : 615,4 = 789 · Кнић: 10.563 − 6.854 = 3.709',
 s7:'Рачуница · РИК 2023 · 242.876 = 11,6% од 2.098.364 · гласови ≠ мандати',
 s8:'Рачуница · 242.876 : 615,4 = 395 · РИК 2023: БМ 1 Честин, 502 уписана',
};
const DARK={s1:1,s10:1};

// S1 Serbia map
(function(){const S=window.SRB;let h=`<path d="${S.d}" fill="#253f87" stroke="#7e8bb5" stroke-width="3"/>`;
 h+=`<line id="s1lk" x1="${S.knic[0]}" y1="${S.knic[1]}" x2="${S.knic[0]}" y2="${S.knic[1]}" stroke="#ffffff" stroke-width="5"/>`;
 h+=`<line id="s1lb" x1="${S.bg[0]}" y1="${S.bg[1]}" x2="${S.bg[0]}" y2="${S.bg[1]}" stroke="#ffffff" stroke-width="5"/>`;
 h+=`<circle cx="${S.bg[0]}" cy="${S.bg[1]}" r="14" fill="#ffffff"/><text x="${S.bg[0]-24}" y="${S.bg[1]+12}" text-anchor="end" font-family="Inter" font-weight="700" font-size="40" fill="#ffffff">Београд</text>`;
 h+=`<circle id="s1kd" cx="${S.knic[0]}" cy="${S.knic[1]}" r="16" fill="#c0152f" stroke="#fff" stroke-width="4"/><text x="${S.knic[0]+28}" y="${S.knic[1]+14}" font-family="Inter" font-weight="700" font-size="40" fill="#ffffff">Кнић</text>`;
 $('s1map').innerHTML=h;})();
// S5 dots
(function(){const S=window.SRB;let h=`<path d="${S.d}" fill="#f2f4fa" stroke="#7d8cbd" stroke-width="3"/>`;
 S.dots.forEach((p,i)=>h+=`<circle id="p${i}" cx="${p[0]}" cy="${p[1]}" r="7" fill="#b7c4ee"/>`);$('s5map').innerHTML=h;
 const k=S.dots[S.ki];const e=$('s5k');e.style.left=(190+k[0]*700/900+30)+'px';e.style.top=(420+k[1]*778/1000-34)+'px';})();
// S7 lever svg: two stacks of blocks
(function(){let h='';const bw=110,bh=56,g=8;
 for(let i=0;i<5;i++)h+=`<rect id="v${i}" x="120" y="${360-(i+1)*(bh+g)}" width="${bw*2}" height="${bh}" fill="#253f87"/>`;
 for(let i=0;i<3;i++)h+=`<rect id="o${i}" x="600" y="${360-(i+1)*(bh+g)}" width="${bw*2}" height="${bh}" fill="#414a6d"/>`;
 h+=`<rect id="mv" x="120" y="${360-5*(bh+g)}" width="${bw*2}" height="${bh}" fill="#c0152f"/>`;
 h+=`<text x="230" y="405" text-anchor="middle" font-family="Inter" font-weight="700" font-size="30" fill="#253f87">ВЛАСТ</text><text x="710" y="405" text-anchor="middle" font-family="Inter" font-weight="700" font-size="30" fill="#414a6d">ОСТАЛЕ ЛИСТЕ</text>`;
 h+=`<text id="m1" x="380" y="60" font-family="JBM" font-weight="700" font-size="56" fill="#253f87" text-anchor="middle">−1</text><text id="m2" x="860" y="60" font-family="JBM" font-weight="700" font-size="56" fill="#414a6d" text-anchor="middle">+1</text>`;
 $('s7svg').innerHTML=h;
 let p='';for(let i=0;i<8;i++)p+=`<div id="pp${i}" style="width:104px;height:150px;position:relative"><div style="position:absolute;left:30px;top:0;width:44px;height:44px;border-radius:50%;background:${i===7?'#c0152f':'#253f87'}"></div><div style="position:absolute;left:12px;top:54px;width:80px;height:96px;background:${i===7?'#c0152f':'#253f87'}"></div></div>`;
 $('s7people').innerHTML=p;})();
// S8 Knić map with Čestin
(function(){const M=window.MAPD;let h='';
 M.nas.forEach(n=>h+=`<path ${['Čestin','Bajčetina'].includes(n.l)?'class="ces"':''} d="${n.d}" fill="#f2f4fa" stroke="#ffffff" stroke-width="4"/>`);
 h+=`<path d="${M.jezero}" fill="#b7c4ee"/><path d="${M.opstina}" fill="none" stroke="#7d8cbd" stroke-width="5"/>`;
 $('s8map').innerHTML=h;})();
