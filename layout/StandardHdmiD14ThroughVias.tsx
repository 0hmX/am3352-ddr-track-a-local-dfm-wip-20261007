import {mapNativeElements} from "./mapNativeElements"

// Affected mounted via definitions are literal native TSX, independent of
// historical route-data imports and span/placement mappers.
const vias = {
  "INPUT_VIP_8": <via name="INPUT_VIP_8" pcbX={29.389999999999997} pcbY={-17.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .R_INPUT_FAULT > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_18": <via name="INPUT_VIP_18" pcbX={25.51} pcbY={-17.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .R_PWR7 > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_GND_PAD_211": <via name="CLOUD_GND_PAD_211" pcbX={27.91} pcbY={-17.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .R_PMIC_EN > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "WARMRST_REAL_GATE": <via name="WARMRST_REAL_GATE" pcbX={36.2} pcbY={-17.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_RESET > .2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "D15_TOP_VIA": <via name="D15_TOP_VIA" pcbX={40.325} pcbY={-21.3} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3}>
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
}

export function applyHdmiD14ThroughVias(node:any):any {
  return mapNativeElements(node,element=>element.type==='via'&&Object.hasOwn(vias,element.props.name)?vias[element.props.name as keyof typeof vias]:element)
}
