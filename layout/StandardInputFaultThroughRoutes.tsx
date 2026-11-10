import {mapNativeElements} from "./mapNativeElements"

// Literal TSX replaces the affected mounted JSON-backed multi-layer route.
// Preserve its off-pad top escape stubs and middle signal layer explicitly.
const route=<group name="StandardInputFaultThrough" pcbRelative>
    <via name="STD_INPUT_FAULT_A" pcbX={20.4} pcbY={25.475} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .U_INPUT_EFUSE > .6">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_INPUT_FAULT_B" pcbX={31.2} pcbY={25.475} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .U_INPUT_EFUSE > .6">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <trace name="CLOUD_LOCAL_INPUT8_REPAIR_3_NEXT_INPUT_FAULT_N_TOP_BEGIN" from=".Power_input > .U_INPUT_EFUSE > .6" to="STD_INPUT_FAULT_A.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Power_input > .U_INPUT_EFUSE > .6", {"x":14.95,"y":22.25,"layer":"top"}, {"x":15.50755,"y":22.25,"layer":"top"},
      {"x":15.7465,"y":22.48895,"layer":"top"}, {"x":15.7465,"y":25.315,"layer":"top"}, {"x":15.9065,"y":25.475,"layer":"top"},
      {"x":20.4,"y":25.475,"layer":"top"}, "STD_INPUT_FAULT_A.top",
    ]]}/>
    <trace name="CLOUD_LOCAL_INPUT8_REPAIR_3_NEXT_INPUT_FAULT_N" from="STD_INPUT_FAULT_A.inner4" to="STD_INPUT_FAULT_B.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_INPUT_FAULT_A.inner4", {"x":20.4,"y":25.475,"layer":"inner4"}, {"x":31.2,"y":25.475,"layer":"inner4"},
      "STD_INPUT_FAULT_B.inner4",
    ]]}/>
    <trace name="CLOUD_LOCAL_INPUT8_REPAIR_3_NEXT_INPUT_FAULT_N_TOP_END" from="STD_INPUT_FAULT_B.top" to=".Power_input > .R_INPUT_FAULT > .pin2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_INPUT_FAULT_B.top", {"x":31.2,"y":25.475,"layer":"top"}, {"x":31.705,"y":24.97,"layer":"top"},
      {"x":31.705,"y":-17.1115,"layer":"top"}, {"x":31.3165,"y":-17.5,"layer":"top"}, {"x":30.41,"y":-17.5,"layer":"top"},
      ".Power_input > .R_INPUT_FAULT > .pin2",
    ]]}/>
</group>

export function applyInputFaultThroughRoutes(node:any):any {
 return mapNativeElements(node,element=>element.type==='trace'&&element.props.name==="CLOUD_LOCAL_INPUT8_REPAIR_3_NEXT_INPUT_FAULT_N"?route:element)
}
