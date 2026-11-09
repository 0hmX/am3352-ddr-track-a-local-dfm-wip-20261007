import {cloneElement} from "react"
import {mapNativeElements} from "./mapNativeElements"

// Literal native routes replace the affected mounted JSON-backed paths.
// Preserve nonzero wires; extend only selected pad-centered physical barrels.
const routes = {
  "CLOUD_LOCAL_CONTROL_V3_2_NEXT_PMIC_POWER_EN": <trace name="CLOUD_LOCAL_CONTROL_V3_2_NEXT_PMIC_POWER_EN" from=".Power_management > .U_PMIC > .46" to="STD_CLOUD_LOCAL_CONTROL_V3_2_NEXT_PMIC_POWER_EN_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Power_management > .U_PMIC > .46", {"x":19.6,"y":0.9375,"via":true,"fromLayer":"top","toLayer":"inner4"}, {"x":19.6,"y":0.9375,"layer":"inner4"},
      {"x":20.0125,"y":1.35,"layer":"inner4"}, {"x":20.95,"y":1.35,"layer":"inner4"}, {"x":21.15,"y":1.15,"layer":"inner4"},
      {"x":21.15,"y":0.7,"layer":"inner4"}, {"x":21.65,"y":0.2,"layer":"inner4"}, {"x":23,"y":0.2,"layer":"inner4"},
      {"x":23.2,"y":0,"layer":"inner4"}, {"x":23.2,"y":-2.35,"layer":"inner4"}, {"x":25.2,"y":-4.35,"layer":"inner4"},
      {"x":25.2,"y":-14.35,"layer":"inner4"}, {"x":26.89,"y":-16.04,"layer":"inner4"}, {"x":26.89,"y":-17.5,"layer":"inner4"},
      "STD_CLOUD_LOCAL_CONTROL_V3_2_NEXT_PMIC_POWER_EN_END.inner4",
  ]]} />,
}

export function applyPmicEnableEndpointRoutes(node:any):any {
 const board=mapNativeElements(node,element=>element.type==='trace'&&Object.hasOwn(routes,element.props.name)?routes[element.props.name as keyof typeof routes]:element)
 return cloneElement(board,{children:<>{board.props.children}
    <via name="STD_CLOUD_LOCAL_CONTROL_V3_2_NEXT_PMIC_POWER_EN_END" pcbX={26.89} pcbY={-17.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .R_PMIC_EN > .pin1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
 </>})
}
