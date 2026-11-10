import {mapNativeElements} from "./mapNativeElements"

// Literal native replacement of the mounted D14 resistor-array escape.
const route=<trace name="RN4_NEAR_HDMI_D14_pin5" from=".RN4_NEAR_U45 > .bottom" to=".HDMI > .RN_HDMI_4 > .5" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".RN4_NEAR_U45 > .bottom", {"x":40.750068,"y":-22.29992,"layer":"bottom"}, {"x":40.750068,"y":-22.150067999999997,"layer":"bottom"},
      {"x":36.400000000000006,"y":-17.8,"layer":"bottom"}, {"x":19.3,"y":-17.8,"layer":"bottom"}, {"x":19.05,"y":-17.55,"layer":"bottom"},
      {"x":19.05,"y":-16.05,"layer":"bottom"}, {"x":19.35,"y":-15.75,"layer":"bottom"}, {"x":19.525,"y":-15.75,"layer":"bottom"},
      ".HDMI > .RN_HDMI_4 > .5",
]]}/>

export function applyHdmiD14Relief(node:any):any {
 return mapNativeElements(node,element=>element.type==='trace'&&element.props.name==='RN4_NEAR_HDMI_D14_pin5'?route:element)
}
