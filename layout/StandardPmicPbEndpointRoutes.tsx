import {cloneElement} from "react"
import {mapNativeElements} from "./mapNativeElements"

// Literal native routes replace the affected mounted JSON-backed paths.
// Preserve nonzero wires; extend only selected pad-centered physical barrels.
const routes = {
  "CLOUD_LOCAL_47_PMIC_PB_N": <trace name="CLOUD_LOCAL_47_PMIC_PB_N" from=".Power_management > .U_PMIC > .44" to="STD_CLOUD_LOCAL_47_PMIC_PB_N_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Power_management > .U_PMIC > .44", {"x":20.4,"y":0.9375,"via":true,"fromLayer":"top","toLayer":"inner4"}, {"x":20.4,"y":0.9375},
      {"x":20.4,"y":-4.2075}, {"x":20.799999999999997,"y":-4.6075}, {"x":24.09,"y":-4.6075},
      {"x":24.49,"y":-5.0075}, {"x":24.49,"y":-17.5}, "STD_CLOUD_LOCAL_47_PMIC_PB_N_END.inner4",
  ]]} />,
}

export function applyPmicPbEndpointRoutes(node:any):any {
 const board=mapNativeElements(node,element=>element.type==='trace'&&Object.hasOwn(routes,element.props.name)?routes[element.props.name as keyof typeof routes]:element)
 return cloneElement(board,{children:<>{board.props.children}
    <via name="STD_CLOUD_LOCAL_47_PMIC_PB_N_END" pcbX={24.49} pcbY={-17.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .R_PWR7 > .pin1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
 </>})
}
