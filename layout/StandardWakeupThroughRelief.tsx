import {mapNativeElements} from "./mapNativeElements"

// Literal native TSX replaces the mounted JSON-backed wakeup path.
// Bounded top-layer detours clear the five selected future columns.
const route=<trace name="CLOUD_LOCAL_4_NEXT_EXT_WAKEUP" from=".Processor > .U1 > .C5" to=".Power_management > .R_RTC_WAKE > .pin1" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .C5", {"x":-5.2,"y":-3.6,"layer":"top"}, {"x":-5.599999999999998,"y":-3.1999999999999957,"layer":"top"},
      {"x":-7.109999999999998,"y":-3.1999999999999957,"layer":"top"}, {"x":-7.2,"y":-3.29,"layer":"top"}, {"x":-7.2,"y":-3.415,"layer":"top"},
      {"x":-7.175,"y":-3.44,"layer":"top"}, {"x":-7.175,"y":-3.69,"layer":"top"}, {"x":-7.45,"y":-3.965,"layer":"top"},
      {"x":-7.449999999999999,"y":-5.665147186257616,"layer":"top"}, {"x":-7.509999999999999,"y":-5.809999999999999,"layer":"top"}, {"x":-7.649999999999999,"y":-5.949999999999996,"layer":"top"},
      {"x":-7.65,"y":-6.1,"layer":"top"}, {"x":-7.65,"y":-6.525,"layer":"top"}, {"x":-8.1,"y":-6.975,"layer":"top"},
      {"x":-8.1,"y":-26.025,"layer":"top"}, {"x":-7.65,"y":-26.475,"layer":"top"}, {"x":-7.649999999999999,"y":-28.299999999999997,"layer":"top"},
      {"x":-7.649999999999999,"y":-28.45,"layer":"top"}, {"x":-7.599999999999998,"y":-28.5,"layer":"top"}, {"x":-7.599999999999998,"y":-28.549999999999997,"layer":"top"},
      {"x":-7.549999999999997,"y":-28.6,"layer":"top"}, {"x":-7.549999999999997,"y":-28.7,"layer":"top"}, {"x":-7.449999999999999,"y":-28.799999999999997,"layer":"top"},
      {"x":-7.449999999999999,"y":-28.974999999999998,"layer":"top"}, {"x":-7.396966991411008,"y":-29.103033008588987,"layer":"top"}, {"x":-6.649999999999999,"y":-29.85,"layer":"top"},
      {"x":-6.649999999999999,"y":-29.9,"layer":"top"}, {"x":-3.799999999999997,"y":-32.75,"layer":"top"}, {"x":-3.799999999999997,"y":-32.8,"layer":"top"},
      {"x":-3.6136396103067874,"y":-32.98636038969321,"layer":"top"}, {"x":-3.549999999999997,"y":-33.14,"layer":"top"}, {"x":-3.549999999999997,"y":-33.35,"layer":"top"},
      {"x":-1.25,"y":-33.35,"layer":"top"}, {"x":1.0500000000000007,"y":-31.05,"layer":"top"}, {"x":1.1500000000000021,"y":-31.05,"layer":"top"},
      {"x":1.2000000000000028,"y":-31,"layer":"top"}, {"x":3.5,"y":-31,"layer":"top"}, {"x":4.317157287525382,"y":-30.182842712474617,"layer":"top"},
      {"x":5.000000000000002,"y":-29.9,"layer":"top"}, {"x":5.9,"y":-29.9,"layer":"top"}, {"x":8.6,"y":-27.2,"layer":"top"},
      {"x":9.375,"y":-27.2,"layer":"top"}, {"x":10.080294372515228,"y":-27.2,"layer":"top"}, {"x":10.37,"y":-27.08,"layer":"top"},
      {"x":10.649999999999999,"y":-26.799999999999997,"layer":"top"}, {"x":10.700000000000003,"y":-26.799999999999997,"layer":"top"}, {"x":18.89605530316558,"y":-18.60394469683442,"layer":"top"},
      {"x":19.147,"y":-18.5,"layer":"top"}, {"x":19.49,"y":-18.5,"layer":"top"}, ".Power_management > .R_RTC_WAKE > .pin1",
]]}/>

export function applyWakeupThroughRelief(node:any):any {
 return mapNativeElements(node,element=>element.type==='trace'&&element.props.name==='CLOUD_LOCAL_4_NEXT_EXT_WAKEUP'?route:element)
}
