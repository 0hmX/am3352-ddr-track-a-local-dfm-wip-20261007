import {mapNativeElements} from "./mapNativeElements"

// Affected mounted via definitions are literal native TSX, independent of
// historical route-data imports and span/placement mappers.
const vias = {
  "CLOUD_GND_PAD_244": <via name="CLOUD_GND_PAD_244" pcbX={-22.174999999999997} pcbY={-6.674999999999999} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .J_MICROSD > .10">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_245": <via name="CLOUD_GND_PAD_245" pcbX={-15.974999999999998} pcbY={-6.675000000000001} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .J_MICROSD > .SH">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_246": <via name="CLOUD_GND_PAD_246" pcbX={-26.324999999999996} pcbY={-6.674999999999999} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .J_MICROSD > .pin11_internal_1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_247": <via name="CLOUD_GND_PAD_247" pcbX={-11.675} pcbY={-17.825000000000003} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .J_MICROSD > .pin11_internal_2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_248": <via name="CLOUD_GND_PAD_248" pcbX={-26.775} pcbY={-20.174999999999997} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .J_MICROSD > .pin11_internal_3">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_250": <via name="CLOUD_GND_PAD_250" pcbX={-8.925} pcbY={-4.75} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .C_SD_BULK > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_267": <via name="CLOUD_GND_PAD_267" pcbX={-17.49} pcbY={13} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Debug_and_reset > .R_TRST_N > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_268": <via name="CLOUD_GND_PAD_268" pcbX={-12.6} pcbY={11.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Debug_and_reset > .SW_RESET > .2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_329": <via name="CLOUD_GND_PAD_329" pcbX={-5.15} pcbY={18.9} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Debug_status > .U_PG_LED > .GND">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_330": <via name="CLOUD_GND_PAD_330" pcbX={-6.6} pcbY={19} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Debug_status > .C_PG_LED > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
}

export function applyControlPadThroughVias(node:any):any {
  return mapNativeElements(node,element=>element.type==='via'&&Object.hasOwn(vias,element.props.name)?vias[element.props.name as keyof typeof vias]:element)
}
