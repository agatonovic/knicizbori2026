import fs from 'fs';
import * as topo from 'topojson-client';
import {geoMercator, geoPath, geoContains} from 'd3-geo';
const w=JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-10m.json'));
const geoms=w.objects.countries.geometries.filter(g=>['Serbia','Kosovo'].includes(g.properties.name));
console.log(geoms.map(g=>g.properties.name));
const merged=topo.merge(w,geoms);
const W=900,H=1000;
const proj=geoMercator().fitExtent([[20,20],[W-20,H-20]],merged);
const path=geoPath(proj);
const d=path(merged);
const knic=proj([20.718,43.926]), bg=proj([20.457,44.817]);
// dot grid ~615 inside
let best=null;
outer: for(let step=23.6;step<24.4;step+=0.02){for(let ox=0;ox<1;ox+=0.25)for(let oy=0;oy<1;oy+=0.25){
  const pts=[];
  for(let y=step*oy+step/2;y<H;y+=step)for(let x=step*ox+step/2;x<W;x+=step){const ll=proj.invert([x,y]);if(geoContains(merged,ll))pts.push([+x.toFixed(1),+y.toFixed(1)]);}
  if(pts.length===615){best={step,pts};break outer;}
}}
let ki=0,dm=1e9;best.pts.forEach((p,i)=>{const dd=(p[0]-knic[0])**2+(p[1]-knic[1])**2;if(dd<dm){dm=dd;ki=i;}});
console.log('step',best.step,'dots',best.pts.length,'knic dot',ki,best.pts[ki],'knic',knic,'bg',bg,'path len',d.length);
fs.writeFileSync('serbia.js','window.SRB='+JSON.stringify({w:W,h:H,d,knic,bg,step:best.step,dots:best.pts,ki})+';');
