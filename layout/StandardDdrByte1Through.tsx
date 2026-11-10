import {cloneElement} from "react"
import {mapNativeElements} from "./mapNativeElements"

// Literal native routes replace the affected mounted JSON-backed paths.
// Preserve nonzero wires; extend only selected pad-centered physical barrels.
const routes = {
  "DDR_D8": <trace name="DDR_D8" from="STD_DDR_D8_BEGIN.inner4" to=".DDR3 > .U3 > .C3" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_DDR_D8_BEGIN.inner4", {"x":-0.4,"y":-6.8}, {"x":-0.4,"y":-9.25},
      {"x":0.4631139777248988,"y":-10.113113977724899}, {"x":0.4631139777248988,"y":-10.513113977724899}, {"x":-0.4,"y":-11.376227955449798},
      {"x":-0.4,"y":-11.876227955449798}, {"x":0.4631139777248988,"y":-12.739341933174696}, {"x":0.4631139777248988,"y":-13.139341933174697},
      {"x":-0.4,"y":-14.002455910899595}, {"x":-0.4,"y":-14.502455910899595}, {"x":0.4631139777248988,"y":-15.365569888624494},
      {"x":0.4631139777248988,"y":-15.765569888624494}, {"x":-0.4,"y":-16.62868386634939}, {"x":-0.3999999999999999,"y":-21.400139},
      {"x":-1.599946,"y":-22.600085}, {"x":-1.599946,"y":-22.600085,"via":true,"fromLayer":"inner4","toLayer":"top"}, ".DDR3 > .U3 > .C3",
  ]]} />,
  "DDR_DQM1": <trace name="DDR_DQM1" from="STD_DDR_DQM1_BEGIN.inner2" to=".DDR3 > .U3 > .D3" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_DDR_DQM1_BEGIN.inner2", {"x":-0.4,"y":-6}, {"x":-0.8125,"y":-6.4125000000000005},
      {"x":-0.8124999999997847,"y":-11.5}, {"x":-1.3047505376514308,"y":-11.992250537651646}, {"x":-1.3047505376514308,"y":-12.392250537651721},
      {"x":-0.8124999999997847,"y":-12.884501075303367}, {"x":-0.8124999999997847,"y":-13.384501075303367}, {"x":-1.3047505376514308,"y":-13.876751612955013},
      {"x":-1.3047505376514308,"y":-14.276751612955088}, {"x":-0.8124999999997847,"y":-14.769002150606735}, {"x":-0.8124999999997847,"y":-15.269002150606735},
      {"x":-1.3047505376514308,"y":-15.76125268825838}, {"x":-1.3047505376514308,"y":-16.161252688258454}, {"x":-0.8124999999997847,"y":-16.6535032259101},
      {"x":-0.8124999999997847,"y":-22.612738999999785}, {"x":-1.599946,"y":-23.400185}, {"x":-1.599946,"y":-23.400185,"via":true,"fromLayer":"inner2","toLayer":"top"},
      ".DDR3 > .U3 > .D3",
  ]]} />,
}

export function withDdrByte1CpuThrough(node:any):any {
 const board=mapNativeElements(node,element=>element.type==='trace'&&Object.hasOwn(routes,element.props.name)?routes[element.props.name as keyof typeof routes]:element)
 return cloneElement(board,{children:<>{board.props.children}
    <via name="STD_DDR_D8_BEGIN" pcbX={-0.4} pcbY={-6.8} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .J1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_DDR_DQM1_BEGIN" pcbX={-0.4} pcbY={-6} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .J2">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
 </>})
}
