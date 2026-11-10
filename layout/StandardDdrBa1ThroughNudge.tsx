import {cloneElement} from 'react'
import {mapNativeElements} from './mapNativeElements'
// Port affected mounted route bodies into literal TSX; preserve existing wires.
const routes={
"DDR_BA1": <trace name="DDR_BA1" from="STD_NUDGE_DDR_BA1_BEGIN.inner2" to="STD_DDR_BA1_DDR.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_NUDGE_DDR_BA1_BEGIN.inner2", {"x":-3.65,"y":-6.75,"layer":"inner2"}, {"x":-3.6,"y":-6.8,"layer":"inner2"},
      {"x":-3.6,"y":-6.8}, {"x":-3,"y":-6.8}, {"x":-2.3875,"y":-6.1875},
      {"x":-2.3875,"y":-5.8125}, {"x":-2.1875,"y":-5.6125}, {"x":-1.4125,"y":-5.6125},
      {"x":-0.6125,"y":-4.8125}, {"x":1.825,"y":-4.8125}, {"x":2.6,"y":-5.5875},
      {"x":3.925,"y":-5.5875}, {"x":3.95,"y":-5.6125}, {"x":4.55,"y":-5.6125},
      {"x":4.75,"y":-5.8125}, {"x":4.750000000000295,"y":-10.929289321882798}, {"x":4.40000000000029,"y":-11.279289321882803},
      {"x":4.40000000000029,"y":-24.42500000000141}, {"x":4.30000000000029,"y":-24.525000000001413}, {"x":3.4657300040503642,"y":-24.525000000001413},
      {"x":3.3657300040503646,"y":-24.62500000000141}, {"x":3.3657300040503646,"y":-25.025000000001413}, {"x":3.4657300040503642,"y":-25.12500000000141},
      {"x":4.30000000000029,"y":-25.12500000000141}, {"x":4.40000000000029,"y":-25.225000000001412}, {"x":4.40000000000029,"y":-25.575000000001413},
      {"x":4.30000000000029,"y":-25.675000000001415}, {"x":3.4657300040503642,"y":-25.675000000001415}, {"x":3.3657300040503646,"y":-25.775000000001413},
      {"x":3.3657300040503646,"y":-26.175000000001415}, {"x":3.4657300040503642,"y":-26.275000000001413}, {"x":4.30000000000029,"y":-26.275000000001413},
      {"x":4.40000000000029,"y":-26.375000000001414}, {"x":4.40000000000029,"y":-26.950000000001413}, {"x":4.30000000000029,"y":-27.050000000001415},
      {"x":3.5243086478130543,"y":-27.050000000001415}, {"x":3.4243086478130547,"y":-27.150000000001413}, {"x":3.4243086478130547,"y":-27.550000000001415},
      {"x":3.5243086478130543,"y":-27.650000000001413}, {"x":4.30000000000029,"y":-27.650000000001413}, {"x":4.40000000000029,"y":-27.750000000001414},
      {"x":4.40000000000029,"y":-28.60011499999971}, {"x":4.40000000000029,"y":-28.80011499999971}, {"x":2.6000460000000003,"y":-30.600069},
      {"x":2.400046,"y":-30.600069}, "STD_DDR_BA1_DDR.inner2",
]]}/>,
}
export function withDdrBa1ThroughNudge(node:any):any{
 const board=mapNativeElements(node,e=>e.type==='trace'&&Object.hasOwn(routes,e.props.name)?routes[e.props.name as keyof typeof routes]:e)
 return cloneElement(board,{children:<>{board.props.children}
<via name="STD_NUDGE_DDR_BA1_BEGIN" pcbX={-3.65} pcbY={-6.75} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .E1"><port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<trace name="STD_NUDGE_DDR_BA1_BEGIN_PAD" from=".Processor > .U1 > .E1" to="STD_NUDGE_DDR_BA1_BEGIN.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Processor > .U1 > .E1", {"x":-3.6,"y":-6.8,"layer":"top"}, {"x":-3.65,"y":-6.75,"layer":"top"}, "STD_NUDGE_DDR_BA1_BEGIN.top"]]}/>
</>})
}
