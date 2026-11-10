import {cloneElement} from 'react'
import {mapNativeElements} from './mapNativeElements'
// Port affected mounted route bodies into literal TSX; preserve existing wires.
const routes={
"CLOUD_ETH_47_RMII1_TXD1_ISO": <trace name="CLOUD_ETH_47_RMII1_TXD1_ISO" from="STD_NUDGE_CLOUD_ETH_47_RMII1_TXD1_ISO_BEGIN.inner4" to="STD_CLOUD_ETH_47_RMII1_TXD1_ISO_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_NUDGE_CLOUD_ETH_47_RMII1_TXD1_ISO_BEGIN.inner4", {"x":36.34,"y":10.899999999999999,"layer":"inner4"}, {"x":36.64,"y":11.2,"layer":"inner4"},
      {"x":36.74,"y":11.2,"layer":"inner4"}, {"x":36.74,"y":11.2,"layer":"inner4"}, {"x":37.225,"y":10.715,"layer":"inner4"},
      {"x":37.225,"y":2.35,"layer":"inner4"}, {"x":41.9,"y":-2.324999999999997,"layer":"inner4"}, {"x":41.9,"y":-2.675,"layer":"inner4"},
      "STD_CLOUD_ETH_47_RMII1_TXD1_ISO_END.inner4",
]]}/>,
"CLOUD_ETH_55_ETH_MDC_ISO": <trace name="CLOUD_ETH_55_ETH_MDC_ISO" from="STD_NUDGE_CLOUD_ETH_55_ETH_MDC_ISO_BEGIN.inner4" to="STD_CLOUD_ETH_55_ETH_MDC_ISO_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_NUDGE_CLOUD_ETH_55_ETH_MDC_ISO_BEGIN.inner4", {"x":36.74,"y":16.85,"layer":"inner4"}, {"x":36.94,"y":16.85,"layer":"inner4"},
      {"x":36.99,"y":16.8,"layer":"inner4"}, {"x":36.99,"y":16.8,"layer":"inner4"}, {"x":36.99,"y":12.54,"layer":"inner4"},
      {"x":38.190000000000005,"y":11.34,"layer":"inner4"}, {"x":50.4765,"y":11.34,"layer":"inner4"}, {"x":50.9,"y":10.9165,"layer":"inner4"},
      {"x":50.9,"y":10.254249999999997,"layer":"inner4"}, {"x":51.024249999999995,"y":10.129999999999999,"layer":"inner4"}, {"x":51.13075,"y":10.129999999999999,"layer":"inner4"},
      {"x":51.254999999999995,"y":10.00575,"layer":"inner4"}, {"x":51.254999999999995,"y":-1.9007500000000015,"layer":"inner4"}, {"x":51.13075,"y":-2.0250000000000004,"layer":"inner4"},
      {"x":50.9,"y":-2.0250000000000004,"layer":"inner4"}, "STD_CLOUD_ETH_55_ETH_MDC_ISO_END.inner4",
]]}/>,
}
export function withEthernetThroughEndpointNudges(node:any):any{
 const board=mapNativeElements(node,e=>e.type==='trace'&&Object.hasOwn(routes,e.props.name)?routes[e.props.name as keyof typeof routes]:e)
 return cloneElement(board,{children:<>{board.props.children}
<via name="STD_NUDGE_CLOUD_ETH_47_RMII1_TXD1_ISO_BEGIN" pcbX={36.34} pcbY={10.899999999999999} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_TXD1 > .pin1"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<via name="STD_NUDGE_CLOUD_ETH_55_ETH_MDC_ISO_BEGIN" pcbX={36.74} pcbY={16.85} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_MDC > .pin1"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<trace name="STD_NUDGE_CLOUD_ETH_47_RMII1_TXD1_ISO_BEGIN_PAD" from=".Ethernet_and_RGB_expansion > .R_ETH_TXD1 > .pin1" to="STD_NUDGE_CLOUD_ETH_47_RMII1_TXD1_ISO_BEGIN.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Ethernet_and_RGB_expansion > .R_ETH_TXD1 > .pin1", {"x":36.74,"y":11.2,"layer":"top"}, {"x":36.44,"y":10.899999999999999,"layer":"top"}, {"x":36.34,"y":10.899999999999999,"layer":"top"}, "STD_NUDGE_CLOUD_ETH_47_RMII1_TXD1_ISO_BEGIN.top"]]}/>
<trace name="STD_NUDGE_CLOUD_ETH_55_ETH_MDC_ISO_BEGIN_PAD" from=".Ethernet_and_RGB_expansion > .R_ETH_MDC > .pin1" to="STD_NUDGE_CLOUD_ETH_55_ETH_MDC_ISO_BEGIN.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Ethernet_and_RGB_expansion > .R_ETH_MDC > .pin1", {"x":36.99,"y":16.8,"layer":"top"}, {"x":36.94,"y":16.85,"layer":"top"}, {"x":36.74,"y":16.85,"layer":"top"}, "STD_NUDGE_CLOUD_ETH_55_ETH_MDC_ISO_BEGIN.top"]]}/>
</>})
}
