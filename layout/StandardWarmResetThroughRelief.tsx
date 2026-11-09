import {mapNativeElements} from "./mapNativeElements"

// Literal native TSX replaces the mounted JSON-backed CPU reset path.
// Only its first obstructed section is rerouted; other sections are retained.
const route=<trace name="WARMRST_ENDPOINT_CPU_TO_R3" from="WARMRST_REAL_CPU.bottom" to="WARMRST_REAL_PULL.bottom" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "WARMRST_REAL_CPU.bottom", {"x":-6.8,"y":0.4,"layer":"bottom"}, {"x":-6.3,"y":-0.1,"layer":"bottom"},
      {"x":-5.875,"y":-0.1,"layer":"bottom"}, {"x":-5.5,"y":-0.475,"layer":"bottom"}, {"x":-5.5,"y":-0.525,"layer":"bottom"},
      {"x":-5.125,"y":-0.9,"layer":"bottom"}, {"x":0.2,"y":-0.9,"layer":"bottom"}, {"x":1.575,"y":-2.275,"layer":"bottom"},
      {"x":1.575,"y":-2.875,"layer":"bottom"}, {"x":1.8,"y":-3.1,"layer":"bottom"}, {"x":3.975,"y":-3.1,"layer":"bottom"},
      {"x":4.55,"y":-2.525,"layer":"bottom"}, {"x":4.566666666666666,"y":-2.524999999999999,"layer":"bottom"}, {"x":4.574999999999999,"y":-2.5166666666666653,"layer":"bottom"},
      {"x":4.574999999999999,"y":-1.7749999999999986,"layer":"bottom"}, {"x":5,"y":-1.3499999999999979,"layer":"bottom"}, {"x":9.375,"y":-1.3499999999999979,"layer":"bottom"},
      {"x":9.525000000000002,"y":-1.1999999999999993,"layer":"bottom"}, {"x":10.625,"y":-1.1999999999999993,"layer":"bottom"}, {"x":12.55,"y":-3.125,"layer":"bottom"},
      {"x":12.55,"y":-4.399999999999999,"layer":"bottom"}, {"x":13.175,"y":-5.024999999999999,"layer":"bottom"}, {"x":14.375,"y":-5.024999999999999,"layer":"bottom"},
      {"x":15.975000000000001,"y":-6.625,"layer":"bottom"}, {"x":15.975000000000001,"y":-6.949999999999999,"layer":"bottom"}, {"x":20.275,"y":-11.25,"layer":"bottom"},
      {"x":27.26,"y":-11.25,"layer":"bottom"}, "WARMRST_REAL_PULL.bottom",
]]}/>

export function applyWarmResetThroughRelief(node:any):any {
 return mapNativeElements(node,element=>element.type==='trace'&&element.props.name==='WARMRST_ENDPOINT_CPU_TO_R3'?route:element)
}
