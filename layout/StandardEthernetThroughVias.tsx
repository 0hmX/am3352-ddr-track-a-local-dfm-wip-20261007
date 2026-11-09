import {mapNativeElements} from "./mapNativeElements"

// Affected mounted via definitions are literal native TSX, independent of
// historical route-data imports and span/placement mappers.
const vias = {
  "ETHPWR_VIP_0": <via name="ETHPWR_VIP_0" pcbX={40.6375} pcbY={7.2} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_LDO > .5">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_1": <via name="ETHPWR_VIP_1" pcbX={41.8625} pcbY={-7.55} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_2": <via name="ETHPWR_VIP_2" pcbX={44.1375} pcbY={-7.55} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .6">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_3": <via name="ETHPWR_VIP_3" pcbX={50.9} pcbY={-0.07500000000000018} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .20">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_4": <via name="ETHPWR_VIP_4" pcbX={50.49} pcbY={1.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_ETH_ISO1 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_5": <via name="ETHPWR_VIP_5" pcbX={47.99} pcbY={3} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_YELLOW > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_6": <via name="ETHPWR_VIP_6" pcbX={48.3} pcbY={5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_ETH_IO3 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_7": <via name="ETHPWR_VIP_7" pcbX={44.1375} pcbY={3.45} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO_OE > .5">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_8": <via name="ETHPWR_VIP_8" pcbX={41.49} pcbY={8.6} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_ETH_A2 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_9": <via name="ETHPWR_VIP_9" pcbX={40.325} pcbY={12.675} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_PHY > .6">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_10": <via name="ETHPWR_VIP_10" pcbX={37.4625} pcbY={14.9} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_PHY > .19">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_11": <via name="ETHPWR_VIP_11" pcbX={33.51} pcbY={16.1} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_ETH_IO1 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_12": <via name="ETHPWR_VIP_12" pcbX={35.49} pcbY={21.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_13": <via name="ETHPWR_VIP_13" pcbX={36.1375} pcbY={5.95} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_RESET > .6">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "ETHPWR_VIP_15": <via name="ETHPWR_VIP_15" pcbX={40.26} pcbY={10.9} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_ETH_A0 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
}

export function applyEthernetThroughVias(node:any):any {
  return mapNativeElements(node,element=>element.type==='via'&&Object.hasOwn(vias,element.props.name)?vias[element.props.name as keyof typeof vias]:element)
}
