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
  fade($('s1h'),t,-1,.3,0);$('s1map').style.opacity=eo(lin(t,0.2,0.8));
  const S=window.SRB;const p=eo(lin(t,5.4,6.4));const tx=(540-234)*900/612,ty=(1240-520)*1000/680;
  const lk=$('s1lk'),lb=$('s1lb');lk.setAttribute('x2',S.knic[0]+(tx-S.knic[0])*p);lk.setAttribute('y2',S.knic[1]+(ty-S.knic[1])*p);
  lb.setAttribute('x2',S.bg[0]+(tx-S.bg[0])*p);lb.setAttribute('y2',S.bg[1]+(ty-S.bg[1])*p);
  fade($('s1box'),t,6.3,.3,20);
 }
 if(cur==='s2'){
  fade($('s2a'),t,10.0);$('s2strike').style.width=(600*eo(lin(t,11.6,12.0)))+'px';$('s2strike2').style.width=(330*eo(lin(t,11.9,12.3)))+'px';
  fade($('s2b'),t,13.6);
 }
 if(cur==='s3'){
  const k=952/2200000;
  const a=eo(lin(t,20.6,21.3)),b=eo(lin(t,21.6,22.2)),c=eo(lin(t,22.4,23.0));
  $('s3a1').style.width=(1783701*k*a)+'px';
  $('s3a2').style.left=(64+1783701*k)+'px';$('s3a2').style.width=(249916*k*b)+'px';
  $('s3a3').style.left=(64+(1783701+249916)*k)+'px';$('s3a3').style.width=(64747*k*c)+'px';
  $('lg1').style.opacity=lin(t,20.6,20.9);$('lg2').style.opacity=lin(t,21.6,21.9);$('lg3').style.opacity=lin(t,22.4,22.7);
  $('s3vn').textContent=cnt(t,24.8,0.9,2098364);$('s3vn').style.opacity=lin(t,24.8,24.9);
  const o=eo(lin(t,29.4,30.3));$('s3o').style.width=(1612614*k*o)+'px';$('s3on').textContent=cnt(t,31.5,0.9,1612614);$('s3on').style.opacity=lin(t,31.5,31.6);
  const g=$('s3gap');g.style.left=(64+1612614*k)+'px';g.style.width=((2098364-1612614)*k)+'px';g.style.opacity=lin(t,34.2,34.5);
  fade($('s3d'),t,35.3);
 }
 if(cur==='s4'){
  const k=952/2800000;
  $('s4g').style.width=(485750*k)+'px';
  const n=eo(lin(t,39.9,41.2));$('s4n').style.width=(2679920*k*n)+'px';$('s4nn').textContent=cnt(t,39.9,1.3,2679920);$('s4nn').style.opacity=lin(t,39.9,40.0);
  fade($('s4x'),t,42.3);
 }
 if(cur==='s5'){
  const S=window.SRB;fade($('s5map'),t,45.45,.3,0);
  const t2=lin(t,55.5,55.8);$('s5t1').style.opacity=1-t2;$('s5t2').style.opacity=t2;
  S.dots.forEach((p,i)=>{const a=45.7+(i/615)*4.8;const e=$('p'+i);
   let f=t>=a?'#7e8bb5':'#e1e6f4';
   if(t>=59.9&&t<63.8){const ph=Math.floor((t-59.9)*6)%2;f=(i%2===ph)?'#253f87':'#7e8bb5';}
   if(i===S.ki&&t>=63.86){f='#c0152f';e.setAttribute('r',7+9*eo(lin(t,63.86,64.3)));}else e.setAttribute('r',7);
   e.setAttribute('fill',f);});
  $('s5k').style.opacity=lin(t,64.0,64.3);
  const gp=eo(lin(t,51.25,52.4));$('s5gn').textContent=fmt(485750*(1-gp));$('s5done').style.opacity=lin(t,51.1,51.3)*(1-lin(t,54.9,55.2));
 }
 if(cur==='s6'){
  const w=eo(lin(t,65.6,66.1));$('s6b').style.width=(952*w)+'px';$('s6n').style.opacity=lin(t,65.9,66.1);
  ['s6l','s6bar'].forEach(id=>$(id).style.opacity=lin(t,69.2,69.4));
  const f=eo(lin(t,69.4,70.2));$('s6f').style.width=(952*789/3709*f)+'px';
  $('s6q').style.opacity=lin(t,70.2,70.4);$('s6ql').style.opacity=lin(t,70.2,70.4);
  fade($('s6t'),t,70.6);
 }
 if(cur==='s7'){
  const p=eio(lin(t,76.6,77.6));const mv=$('mv');
  const y0=360-5*64,y1=360-4*64;mv.setAttribute('x',120+480*p);mv.setAttribute('y',y0+(y1-y0)*p - Math.sin(Math.PI*p)*90);
  $('m1').setAttribute('opacity',lin(t,77.6,77.8));$('m2').setAttribute('opacity',lin(t,77.8,78.0));
  fade($('s7r'),t,79.9);
  for(let i=0;i<8;i++)$('pp'+i).style.opacity=lin(t,80.0+i*0.12,80.2+i*0.12);
 }
 if(cur==='s8'){
  const w=eo(lin(t,87.7,88.2));$('s8b').style.width=(952*w)+'px';$('s8n').style.opacity=lin(t,87.9,88.1);
  $('s8map').style.opacity=lin(t,90.3,90.6);
  const on=t>=92.73;document.querySelectorAll('#s8map .ces').forEach(e=>{e.setAttribute('fill',on?'#fbe8eb':'#f2f4fa');e.setAttribute('stroke',on?'#c0152f':'#ffffff');e.setAttribute('stroke-width',on?10:4);if(on)e.parentNode.appendChild(e);});
  fade($('s8c'),t,93.2);
 }
 if(cur==='s9'){fade($('s9h'),t,95.9);fade($('s9m'),t,97.8);}
 if(cur==='s10'){fade($('s10d'),t,100.3);fade($('s10hh'),t,101.9);}
 if(cur==='s11'){
  fade($('s10h'),t,104.6,.3,30);
  const c=eo(lin(t,105.75,106.15));const ce=$('slc');ce.style.opacity=lin(t,105.75,105.9);ce.style.transform=`scale(${0.6+0.4*c})`;
  [['slt',106.80],['sl1',108.20],['sl2',108.95]].forEach(([id,a])=>{const p=eo(lin(t,a,a+0.3));const e=$(id);e.style.opacity=p;e.style.transform=`translateX(${(1-p)*60}px)`;});
  fade($('s11d'),t,109.4);
 }
 if(cur==='so'){drawLogo(t);$('sod').style.opacity=eo(lin(t,TAG+3.9,TAG+4.4));}
};
window.ready=Promise.all([...['slc','slt','sl1','sl2'].map(id=>$(id).decode()),document.fonts.ready,new Promise(r=>{if(LOGO.complete)r();else LOGO.onload=r;})]);
