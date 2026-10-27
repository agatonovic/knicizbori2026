let lastScene=null, lastCards='';
window.render=function(vt){
 const t=vt-O;
 let cur=SC.find(s=>t>=s[1]&&t<s[2])[0];
 if(cur!==lastScene){document.querySelectorAll('.scene').forEach(e=>e.style.display='none');$(cur).style.display='block';lastScene=cur;}
 const s=SUBS.find(x=>t>=x[0]-0.05&&t<x[1]+0.25);
 const sub=$('subt');sub.textContent=s?s[2]:'';
 const dark=DARK[cur];
 sub.style.color=dark?'#ffffff':(cur==='so'?'#16265a':'#0b0f1e');
 sub.style.background=dark?'rgba(22,38,90,0)':'rgba(255,255,255,.92)';
 $('sub').style.display=(s&&!NOSUB[cur])?'block':'none';
 const src=SRC[cur];$('src').style.display=src?'flex':'none';if(src)$('src').textContent=src;

 if(cur==='s1'){
  fade($('s1d'),t,0.15);fade($('s1t'),t,2.5,.35,40);
  $('s1map').style.opacity=lin(t,4.2,4.9);
  document.querySelectorAll('#s1map .bmd').forEach((e,i)=>e.setAttribute('opacity',lin(t,5.6+i*0.08,5.75+i*0.08)));
  fade($('s1l'),t,8.6);
 }
 if(cur==='s2'){
  fade($('s2gl'),t,9.45);$('s2n').textContent=cnt(t,9.5,2.2,7392);
  fade($('s2il'),t,13.55);$('s2p').style.opacity=eo(lin(t,14.5,14.8));$('s2p').style.transform=`scale(${1.08-0.08*eo(lin(t,14.5,14.9))})`;$('s2p').style.transformOrigin='left center';
  $('s2c').style.opacity=lin(t,16.7,17.0);
  document.querySelectorAll('#s2c .tb').forEach((e,i)=>{const a=16.9+i*0.22+(i===10?0.6:0);const p=eio(lin(t,a,a+0.5));const hh=+e.dataset.h*p;e.setAttribute('height',hh);e.setAttribute('y',560-hh);});
  document.querySelectorAll('#s2c .tv').forEach((e,i)=>{const a=16.9+i*0.22+(i===10?0.6:0)+0.4;e.setAttribute('opacity',lin(t,a,a+0.2));});
 }
 if(cur==='s3'){
  fade($('s3a'),t,21.1);$('s3an').textContent=cnt(t,22.4,1.9,3783);$('s3ab').style.width=(51.81*eio(lin(t,22.4,24.3)))+'%';$('s3ap').style.opacity=lin(t,25.5,25.7);
  fade($('s3b'),t,27.8);$('s3bn').textContent=cnt(t,29.6,1.8,3164);$('s3bb').style.width=(43.33*eio(lin(t,29.6,31.4)))+'%';$('s3bp').style.opacity=lin(t,32.1,32.3);
  fade($('s3o'),t,32.6);fade($('s3d'),t,34.05,.3,30);
 }
 if(cur==='s4'){
  fade($('s4h'),t,37.5);
  [[37.9,0],[44.0,1],[48.4,2]].forEach(([a,i])=>{fade($('s4r'+i),t,a);const p=eio(lin(t,a+0.3,a+1.4));$('s4b'+i).style.width=(S4V[i]*p)+'%';
   const v=$('s4v'+i);v.textContent=pc(S4V[i]*eo(lin(t,a+0.3,a+1.4)))+'%';});
 }
 if(cur==='s5'){
  const vu=t>=83.3;
  $('s5h').innerHTML=vu?'Листа Вучића – <span class="mono" style="color:#253f87">10</span> од 36':'Студентска листа – <span class="mono" style="color:#c0152f">26</span> од 36';
  $('s5h').style.opacity=vu?lin(t,83.3,83.6):lin(t,52.8,53.1);
  $('s5map').style.opacity=lin(t,52.8,53.2);
  const rev=new Set(REV.filter(r=>t>=r[0]).map(r=>r[1]));
  const pairs=[...PS,...PV];let curp=null;for(const p of pairs){if(t>=p[0])curp=p;}
  if(t>=82.75&&t<85.6)curp=null;
  const strong=new Set(curp?[curp[2],...(t>=curp[0]+0.46*(curp[1]-curp[0])?[curp[3]]:[])]:[]);
  paintMap('s5map',rev,strong);
  hlSet('s5map',[...strong].flatMap(bmNas),'#0b0f1e');
  const nS=[...rev].filter(SW).length,nV=rev.size-nS;
  $('s5leg').innerHTML=`<div><span style="color:#c0152f;font-size:30px">■</span> Студентска <b class="mono" style="color:#0b0f1e">${nS}</b></div><div><span style="color:#253f87;font-size:30px">■</span> Вучић <b class="mono" style="color:#0b0f1e">${nV}</b></div><div style="margin-top:8px;font-size:20px;color:#7d8cbd"><span style="display:inline-block;width:22px;height:16px;background:repeating-linear-gradient(45deg,#f2b8c1 0 6px,#b7c4ee 6px 12px)"></span> подељено</div>`;
  $('s5leg').style.opacity=lin(t,58.0,58.3);
  // big number intro
  const big=(t<58.2)||(t>=83.0&&t<85.6);
  $('s5big').style.display=big?'block':'none';
  if(big){const isV=t>=83.0;$('s5bn').textContent=isV?'10':'26';$('s5bn').style.color=isV?'#253f87':'#c0152f';fade($('s5big'),t,isV?83.4:53.3,.3,30);}
  const key=(!big&&curp)?curp[2]+'_'+curp[3]:'';
  if(key!==lastCards){lastCards=key;$('s5c0').innerHTML=curp&&!big?CARDS[curp[2]]:'';$('s5c1').innerHTML=curp&&!big?CARDS[curp[3]]:'';}
  if(curp&&!big){fade($('s5c0'),t,curp[0],.22,24);fade($('s5c1'),t,curp[0]+0.46*(curp[1]-curp[0]),.22,24);}
 }
 if(cur==='s7'){
  fade($('s7h'),t,94.7);$('s7map').style.opacity=lin(t,94.7,95.0);
  const all=new Set(D.map(b=>b.bm));const shown=new Set(R7.filter(r=>t>=r[1]).map(r=>r[0]));
  Object.keys(NB).forEach(l=>{const ks=NB[l];const on=ks.some(k=>shown.has(k));setN('s7map',NIDX[l],on?RED:(ks.some(SW)?'#fbe8eb':GREY));});
  R7.forEach(([k,a],i)=>{fade($('s7r_'+i),t,a,.25,24);$('s7r_b'+i).style.width=(100*BM(k).v[2]/BM(k).val*eio(lin(t,a+0.1,a+0.8)))+'%';});
 }
 if(cur==='s8'){
  fade($('s8h'),t,105.95);$('s8map').style.opacity=lin(t,105.95,106.3);
  Object.keys(NB).forEach(l=>setN('s8map',NIDX[l],l==='Brnjica'?RED:GREY));hlSet('s8map',bmNas(7),'#0b0f1e');
  fade($('s8sc'),t,108.2,.3,30);$('s8a').textContent=Math.round(70*eo(lin(t,108.3,109.3)));$('s8b').textContent=Math.round(69*eo(lin(t,108.3,109.3)));
  const p=eo(lin(t,111.1,111.35));$('s8one').style.opacity=p;$('s8one').style.transform=`scale(${1.15-0.15*p})`;$('s8one').style.transformOrigin='left center';
  fade($('s8r0'),t,113.4);fade($('s8r1'),t,116.35);fade($('s8z'),t,117.8);
 }
 if(cur==='s9'){
  fade($('s9h'),t,120.0);
  D.forEach((b,i)=>{const a=120.3+i*0.15;fade($('g'+b.bm),t,a,.22,20);
   const hl=t>=128.3&&(b.bm===16||b.bm===7);const e=$('g'+b.bm);e.style.background=hl?'#fbe8eb':GREY;e.querySelector('.gv').style.color=hl?'#ac1129':'#253f87';e.querySelector('.gb').style.background=hl?RED:'#7e8bb5';
   e.style.outline=hl?'4px solid #c0152f':'none';});
  const p=eo(lin(t,126.6,126.85));$('s9st').style.opacity=p;$('s9st').style.transform=`rotate(-6deg) scale(${1.4-0.4*p})`;
 }
 if(cur==='s10'){
  [['s10m1',NOMAJ23,133.6],['s10m2',NOMAJ26,139.9]].forEach(([id,set,a],j)=>{$(id).style.opacity=j===0?lin(t,133.3,133.6):lin(t,139.7,140.0);
   D.forEach((b,i)=>{const on=set.includes(b.bm);const ti=a+(on?set.indexOf(b.bm)*0.05:0);$(id+'d'+b.bm).setAttribute('fill',on&&t>=ti?RED:'#b7c4ee');});});
  fade($('s10a').parentNode,t,133.4);$('s10bw').style.opacity=lin(t,139.8,140.1);$('s10b').textContent=Math.round(26*eo(lin(t,139.9,141.3)));
  fade($('s10n'),t,134.5);
 }
 if(cur==='s11'){
  fade($('s11h'),t,142.75);$('s11map').style.opacity=lin(t,142.8,143.1);
  const shown=new Set(R11.filter(r=>t>=r[1]).map(r=>r[0]));
  Object.keys(NB).forEach(l=>{const on=NB[l].some(k=>shown.has(k));setN('s11map',NIDX[l],on?(NB[l].includes(8)?RED:BLUE):GREY);});
  R11.forEach(([k,a],i)=>{fade($('s11r_'+i),t,a,.25,24);$('s11r_b'+i).style.width=(BM(k).izl*eio(lin(t,a+0.1,a+0.8)))+'%';});
  fade($('s11avg'),t,150.6);
 }
 if(cur==='s12'){
  $('s12map').style.opacity=lin(t,152.4,152.7);
  document.querySelectorAll('#s12map .cd').forEach((e,i)=>e.setAttribute('opacity',lin(t,152.7+i*0.04,152.85+i*0.04)));
  $('s12k').setAttribute('opacity',lin(t,153.6,153.9));
  fade($('s12a'),t,154.1);$('s12an').textContent=pc(53.37*eo(lin(t,154.3,155.6)))+'%';
  fade($('s12b'),t,157.55);$('s12bn').textContent=pc(39.74*eo(lin(t,157.7,159.0)))+'%';
 }
 if(cur==='s13'){
  fade($('s13h'),t,160.5);
  const G=[[165.0,['Нови Сад','Београд']],[169.1,['Чачак','Ваљево','Ужице','Ниш']],[173.6,['Лесковац','Врање','Прокупље']],[178.4,['Кнић','Крушевац','Пожаревац','Пирот']]];
  let act=null;for(const g of G)if(t>=g[0])act=g;
  CITIES.forEach((c,i)=>{const e=$('cr'+i);const a=160.7+i*0.07;e.style.opacity=act?(act[1].includes(c[0])?1:0.28):lin(t,a,a+0.2);
   e.style.background=act&&act[1].includes(c[0])?'#eaeefb':'transparent';});
  $('crleg').style.opacity=lin(t,162.8,163.1);
 }
 if(cur==='s14'){
  $('s14map').style.opacity=lin(t,183.45,183.9);paintMap('s14map',new Set(D.map(b=>b.bm)),null);
  Object.keys(NB).forEach(l=>{const e=$('s14mapn'+NIDX[l]);const f=e.getAttribute('fill');if(f===REDL)e.setAttribute('fill','#ff8d9c');else if(f===BLUEL)e.setAttribute('fill','#7e8bb5');});
  fade($('s14a'),t,183.8);fade($('s14b'),t,186.5);fade($('s14c'),t,189.15);
 }
 if(cur==='so'){drawLogo(t);$('sod').style.opacity=eo(lin(t,TAG+3.9,TAG+4.4));}
};
window.ready=Promise.all([document.fonts.ready,new Promise(r=>{if(LOGO.complete)r();else LOGO.onload=r;})]);
