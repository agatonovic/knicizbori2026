// logo canvas
const LOGO=new Image();LOGO.src='assets/logo.png';
function drawLogo(t){
 const c=$('logo'),x=c.getContext('2d');const W=c.width,cx=W/2,cy=W/2;x.clearRect(0,0,W,W);
 if(!LOGO.complete)return;const sc=W/447;
 const pc=eo(lin(t,TAG-0.25,TAG+0.35));
 x.save();x.globalAlpha=pc;x.beginPath();x.arc(cx,cy,140*sc,0,Math.PI*2);x.clip();x.drawImage(LOGO,0,(1-pc)*30,W,W);x.restore();
 const a1=eio(lin(t,TAG+0.20,TAG+1.45));
 if(a1>0){x.save();x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,W,Math.PI-0.06,Math.PI-0.06+(Math.PI+0.12)*a1,false);x.closePath();x.arc(cx,cy,140*sc,0,Math.PI*2,true);x.clip('evenodd');x.drawImage(LOGO,0,0,W,W);x.restore();}
 const a2=eio(lin(t,TAG+1.95,TAG+3.70));
 if(a2>0){x.save();x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,W,Math.PI+0.06,Math.PI+0.06-(Math.PI+0.12)*a2,true);x.closePath();x.arc(cx,cy,140*sc,0,Math.PI*2,true);x.clip('evenodd');x.drawImage(LOGO,0,0,W,W);x.restore();}
}

