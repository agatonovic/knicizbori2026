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
 if(cur==='s1'){
  [0,1,2].forEach(i=>{const a=0.1+i*0.9;const e=$('n'+i);const p=lin(t,a,a+0.2)*(1-lin(t,a+0.8,a+0.95));e.style.opacity=i===2?lin(t,a,a+0.2):p;e.style.transform=`translateY(${(1-eo(lin(t,a,a+0.3)))*30}px)`;});
  fade($('s1t'),t,2.9);
 }
 if(cur==='s2'){fade($('s2t'),t,5.4);[0,1,2,3].forEach(i=>fade($('st'+i),t,6.5+i*0.3,.25,20));}
 if(cur==='s3'){
  const url='upit.birackispisak.gov.rs';const n=Math.floor(url.length*lin(t,12.0,14.6));$('s3u').textContent=url.slice(0,n);
  $('s3c').style.opacity=(Math.floor(t*2.5)%2)?1:0.15;
  $('s3map').style.opacity=lin(t,14.8,15.2);document.querySelectorAll('#s3map .bmd').forEach((e,i)=>{e.setAttribute('opacity',lin(t,15.0+i*0.04,15.2+i*0.04));});
  $('s3l').style.opacity=lin(t,16.2,16.5);
 }
 if(cur==='s4'){fade($('s4id'),t,19.0);fade($('s4or'),t,20.2);fade($('s4pp'),t,20.5);fade($('s4ob'),t,22.1);}
 if(cur==='s5'){
  $('ballot').style.opacity=lin(t,25.1,25.4);
  const phase2=t>=30.9;
  $('s5h').innerHTML=phase2?'Ако погрешиш –<br>или си под притиском?':'Заокружи<br>један број';
  // phase 1
  circ('b',2,phase2?(t>=40.6?eo(lin(t,40.6,41.3)):0):eo(lin(t,27.3,28.1)));
  circ('b',0,phase2?eo(lin(t,32.7,33.4)):0);
  [0,1,3,4,5].forEach((i,k)=>strike('b',i,phase2?eo(lin(t,37.6+k*0.35,37.95+k*0.35)):0));
  const tg=$('s5tag');
  if(!phase2){tg.textContent='НАЈСИГУРНИЈЕ';tg.style.background='#253f87';tg.style.opacity=lin(t,29.4,29.6);}
  else if(t<43.0){tg.textContent='НЕ БАЦАЈ ЛИСТИЋ';tg.style.background='#414a6d';tg.style.opacity=lin(t,35.0,35.2);}
  else {tg.textContent='ВАЖИ – АКО ЈЕ ЈАСНО';tg.style.background='#253f87';tg.style.opacity=1;}
 }
 if(cur==='s6'){[0,1,2].forEach(i=>fade($('cd'+i),t,47.3+i*0.35,.3,30));const st=$('stamp');const p=eo(lin(t,50.8,51.05));st.style.opacity=p;st.style.transform=`rotate(-12deg) scale(${1.4-0.4*p})`;}
 if(cur==='s7'){fade($('s7h'),t,52.75);$('s7svg').style.opacity=lin(t,55.5,55.8);$('ps').setAttribute('opacity',lin(t,55.6,55.9));
  $('s7cam').style.opacity=lin(t,60.1,60.3);$('camx').setAttribute('opacity',lin(t,61.2,61.3));}
 if(cur==='s8'){$('s8n').textContent=cnt(t,63.5,1.0,203);$('s8map').style.opacity=lin(t,63.3,63.6);
  const on=t>=68.9;document.querySelectorAll('#s8map .hl').forEach(e=>{e.setAttribute('fill',on?'#eaeefb':'#f2f4fa');e.setAttribute('stroke',on?'#253f87':'#ffffff');e.setAttribute('stroke-width',on?12:4);if(on)e.parentNode.appendChild(e);});
  fade($('s8c'),t,69.2);}
 if(cur==='s9'){
  fade($('s9h'),t,72.6,.3,30);$('s9svg').style.opacity=lin(t,73.0,73.4);
  let end=7; if(t>=76.8)end=7+3*eo(lin(t,76.8,77.8)); if(t>=84.0)end=10+2*eo(lin(t,84.0,84.8));
  const pts=[];for(const p of H23){if(p[0]<=end)pts.push(p);} const last=pts[pts.length-1];
  if(end>last[0]){const nx=H23[pts.length];const f=(end-last[0])/(nx[0]-last[0]);pts.push([end,last[1]+(nx[1]-last[1])*f]);}
  $('lhi').setAttribute('points',pts.map(p=>CX(p[0])+','+CY(p[1])).join(' '));
  $('m10').setAttribute('opacity',lin(t,77.7,77.9));$('m12').setAttribute('opacity',lin(t,84.8,85.0));
  $('rik').setAttribute('opacity',lin(t,86.8,87.1));$('l26').setAttribute('opacity',lin(t,91.2,91.5));
  let a='';if(t>=78.5)a+='До 10ч гласао је <span class="mono" style="color:#253f87">1 од 6</span> од оних који су тог дана изашли.';
  if(t>=84.9)a+='<br>До подне – <span class="mono" style="color:#253f87">више од 1/3</span>.';
  $('s9a').innerHTML=a;
 }
 if(cur==='s10'){fade($('s10h'),t,95.7);fade($('s10m'),t,97.1);fade($('s10c'),t,98.6);}
 if(cur==='s11'){fade($('r1'),t,101.6);fade($('r2'),t,105.6);fade($('r3'),t,107.5);}
 if(cur==='s12'){fade($('s12h'),t,110.95);}
 if(cur==='s13'){fade($('s13d'),t,112.6);fade($('s13h'),t,113.8);fade($('s13n'),t,114.4);}
 if(cur==='s14'){
  fade($('s10h2'),t,115.9,.3,30);
  const c=eo(lin(t,117.05,117.45));const ce=$('slc');ce.style.opacity=lin(t,117.05,117.2);ce.style.transform=`scale(${0.6+0.4*c})`;
  [['slt',117.91],['sl1',119.38],['sl2',120.15]].forEach(([id,a])=>{const p=eo(lin(t,a,a+0.3));const e=$(id);e.style.opacity=p;e.style.transform=`translateX(${(1-p)*60}px)`;});
  fade($('s14d'),t,120.6);
 }
 if(cur==='so'){drawLogo(t);$('sod').style.opacity=eo(lin(t,TAG+3.9,TAG+4.4));}
};
window.ready=Promise.all([...['slc','slt','sl1','sl2'].map(id=>$(id).decode()),document.fonts.ready,new Promise(r=>{if(LOGO.complete)r();else LOGO.onload=r;})]);
