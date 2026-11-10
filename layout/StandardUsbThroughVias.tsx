import {mapNativeElements} from "./mapNativeElements"

// Affected mounted via definitions are literal native TSX, independent of
// historical route-data imports and span/placement mappers.
const vias = {
  "USBCP_NOR_VCC_V1": <via name="USBCP_NOR_VCC_V1" pcbX={12.65} pcbY={19.45} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.USBC_VBUS_RAW">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "USBCP_CONTRACT_N_V0": <via name="USBCP_CONTRACT_N_V0" pcbX={4.3} pcbY={23.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.PD_CONTRACT_N">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "USBCP_CONTRACT_N_V1": <via name="USBCP_CONTRACT_N_V1" pcbX={14.8} pcbY={18.2} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.PD_CONTRACT_N">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "USBCP_VDC_OUT_V1": <via name="USBCP_VDC_OUT_V1" pcbX={14.25} pcbY={21.05} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.SYS_5V">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "USBCP_USB0_VBUS_CPU_V2": <via name="USBCP_USB0_VBUS_CPU_V2" pcbX={-14.4} pcbY={19.15} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.USB0_VBUS">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
}

export function applyUsbThroughVias(node:any):any {
  return mapNativeElements(node,element=>element.type==='via'&&Object.hasOwn(vias,element.props.name)?vias[element.props.name as keyof typeof vias]:element)
}
