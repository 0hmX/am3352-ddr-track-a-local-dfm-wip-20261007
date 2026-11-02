import React from 'react'
import routes from '../data/cloud-rn0-near-routes.json'
import returns from '../data/cloud-rn0-near-returns.json'
/** Whole original-map RN0 candidate; mount once with its exact placement mapper. */
export function CloudRn0NearRoutes(){return <>
 <group name="Cloud_RN0_near_original_map" pcbX={0} pcbY={0} pcbRelative pcbStyle={{viaHoleDiameter:.15,viaPadDiameter:.30}}>
 {routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={.10} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,
  ...(r.layer==='top'?[]:[{x:r.a[0],y:r.a[1],via:true,fromLayer:'top',toLayer:r.layer}]),
  ...r.points.map(([x,y])=>({x,y,layer:r.layer})),
  ...(r.layer==='top'?[]:[{x:r.b[0],y:r.b[1],via:true,fromLayer:r.layer,toLayer:'top'}]),r.to]]}/>)}
 </group>
 <via name={returns[1].name} pcbX={returns[1].x} pcbY={returns[1].y} fromLayer="inner1" toLayer="inner3" holeDiameter={.15} outerDiameter={.30} connectsTo="net.GND"/>
</>}
