import {mapNativeElements} from "./mapNativeElements"

// Affected mounted via definitions are literal native TSX, independent of
// historical route-data imports and span/placement mappers.
const vias = {
  "CLOUD_GND_PAD_136": <via name="CLOUD_GND_PAD_136" pcbX={-7.96} pcbY={-26.6} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .C_VREF_0 > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_VTP_1": <via name="PWR_V2_DDR_VTP_1" pcbX={-7.49} pcbY={-3.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .R_DDR_VTP > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_ZQ_1": <via name="PWR_V2_DDR_ZQ_1" pcbX={7.01} pcbY={-29.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .R_DDR_ZQ > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_VREF_3": <via name="PWR_V2_DDR_VREF_3" pcbX={-7.76} pcbY={-23.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .R_VREF_TOP > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "MPU_GND_RETURN_0": <via name="MPU_GND_RETURN_0" pcbX={-7.8} pcbY={-7.1} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .A1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
}

export function applyWakeupThroughVias(node:any):any {
  return mapNativeElements(node,element=>element.type==='via'&&Object.hasOwn(vias,element.props.name)?vias[element.props.name as keyof typeof vias]:element)
}
