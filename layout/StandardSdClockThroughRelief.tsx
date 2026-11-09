import {mapNativeElements} from "./mapNativeElements"

// Literal native TSX replaces the mounted JSON-backed SD clock path.
// Retain both existing through endpoint markers and the unresolved sections.
const route=<trace name="CLOUD_LOCAL_0_NEXT_SD_CLK" from=".microSD > .J_MICROSD > .5" to=".microSD > .R_SD_CLK > .pin2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".microSD > .J_MICROSD > .5", {"x":-11.674999999999999,"y":-11.875000000000002,"via":true,"fromLayer":"top","toLayer":"bottom"}, {"x":-11.675,"y":-11.875,"layer":"bottom"},
      {"x":-11.275,"y":-11.475,"layer":"bottom"}, {"x":-10.65,"y":-11.475,"layer":"bottom"}, {"x":-10.55,"y":-11.375,"layer":"bottom"},
      {"x":-10.55,"y":-10.6,"layer":"bottom"}, {"x":-11.044950937914129,"y":-10.105049062085872,"layer":"bottom"}, {"x":-11.044950937914129,"y":-10.094950937914128,"layer":"bottom"},
      {"x":-11.034852813742384,"y":-10.084852813742385,"layer":"bottom"}, {"x":-10.83,"y":-10,"layer":"bottom"}, {"x":-10.55,"y":-10,"layer":"bottom"},
      {"x":-10.55,"y":-9.4,"layer":"bottom"}, {"x":-10.55,"y":-5.15,"layer":"bottom"}, {"x":-9.05,"y":-3.65,"layer":"bottom"},
      {"x":-9.05,"y":-0.6000000000000014,"layer":"bottom"}, {"x":-6.132842712474617,"y":2.3171572875253825,"layer":"bottom"}, {"x":-5.4499999999999975,"y":2.6000000000000014,"layer":"bottom"},
      {"x":-4.25,"y":2.6000000000000014,"layer":"bottom"}, {"x":-4.25,"y":2.9150000000000036,"layer":"bottom"}, {"x":-4.154540584539815,"y":3.145459415460188,"layer":"bottom"},
      {"x":-2.977279220613576,"y":4.322720779386426,"layer":"bottom"}, {"x":-2.977279220613576,"y":4.472720779386424,"layer":"bottom"}, {"x":-2.6699999999999986,"y":4.600000000000001,"layer":"bottom"},
      {"x":-2.25,"y":4.600000000000001,"layer":"bottom"}, {"x":-2.25,"y":4.810000000000004,"layer":"bottom"}, {"x":-2.1863603896932093,"y":4.963639610306796,"layer":"bottom"},
      {"x":-1.7242462120245867,"y":5.425753787975412,"layer":"bottom"}, {"x":-1.5449999999999982,"y":5.5,"layer":"bottom"}, {"x":-1.299999999999997,"y":5.5,"layer":"bottom"},
      {"x":-1.1249999999999971,"y":5.675,"layer":"bottom"}, {"x":-0.943933982822015,"y":5.75,"layer":"bottom"}, {"x":0.7000000000000028,"y":5.75,"layer":"bottom"},
      {"x":0.7000000000000028,"y":6.75,"layer":"bottom"}, {"x":-0.4575735931288073,"y":7.90757359312881,"layer":"bottom"}, {"x":-0.5599999999999998,"y":7.950000000000003,"layer":"bottom"},
      {"x":-0.609999999999997,"y":8,"layer":"bottom"}, {"x":-0.959999999999998,"y":8,"layer":"bottom"}, {"x":-1.1136396103067858,"y":8.063639610306788,"layer":"bottom"},
      {"x":-2.6842390693496516,"y":9.634239069349654,"layer":"bottom"}, {"x":-2.75,"y":9.793000000000003,"layer":"bottom"}, {"x":-2.75,"y":10.01,"layer":"bottom"},
      {"x":-2.75,"y":10.01,"via":true,"fromLayer":"bottom","toLayer":"top"}, ".microSD > .R_SD_CLK > .pin2",
]]}/>

export function applySdClockThroughRelief(node:any):any {
 return mapNativeElements(node,element=>element.type==='trace'&&element.props.name==='CLOUD_LOCAL_0_NEXT_SD_CLK'?route:element)
}
