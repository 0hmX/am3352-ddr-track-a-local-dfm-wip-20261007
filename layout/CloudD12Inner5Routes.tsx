import React from 'react'
import route from '../data/cloud-d12-inner5-route.json'
/** Reviewed Inner5 output. PDN limitations remain open; see docs/d12-power-topology-240.json. */
export function CloudD12Rn5AwareRoute(){return <><group name="D12Rn5Review" pcbRelative pcbStyle={{viaHoleDiameter:.15,viaPadDiameter:.3}}>
<trace name="CLOUD_D12_RN5_INNER5_REVIEW" from={route.from} to={route.to} width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[route.from,{x:route.a[0],y:route.a[1],via:true,fromLayer:'top',toLayer:'inner5'},...route.points.map(([x,y])=>({x,y,layer:'inner5'})),{x:route.b[0],y:route.b[1],via:true,fromLayer:'inner5',toLayer:'bottom'},route.to]]}/>
</group><via name="D12_RN5_REFERENCE_RETURN" pcbX={39.75007} pcbY={-21.74992} fromLayer="inner1" toLayer="inner6" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .A1"/></>}
/** Second actual-pad supply bridge; preserves connectivity without claiming current-capacity qualification. */
export function CloudD12DdrCap9Bridge(){return <trace name="D12_DDR_SUPPLY_CAP9_BRIDGE" from=".DDR3 > .C_RAM_9 > .pin1" to=".DDR3 > .C_RAM_10 > .pin1" width={.6} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".DDR3 > .C_RAM_9 > .pin1",{x:5.93,y:-23.5,layer:'bottom'},{x:5.93,y:-22.5,layer:'bottom'},".DDR3 > .C_RAM_10 > .pin1"]]}/>}
