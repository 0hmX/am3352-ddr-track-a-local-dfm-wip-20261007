import { ddrRoutes } from "../data/ddr-routes"

/** Native manual paths keep the checked DDR buses independent of other nets. */
export function DdrRoutes() {
  return <>
    {ddrRoutes.map(route => {
      const first=route.points[0], last=route.points.at(-1)!
      return <trace key={route.name} name={route.name} from={route.from} to={route.to} width={0.1}
        pcbPath={route.layer === "top" ? [route.from, ...route.points.map(([x,y])=>({x,y})), route.to] : [route.from,
          {x:first[0],y:first[1],via:true,fromLayer:"top",toLayer:route.layer},
          ...route.points.map(([x,y])=>({x,y})),
          {x:last[0],y:last[1],via:true,fromLayer:route.layer,toLayer:"top"},route.to]} />
    })}
    {[{from:".U1 > .A1",name:"DDR_GND_CPU",x:-6.8,y:-6.8},
      {from:".U3 > .B1",name:"DDR_GND_RAM",x:-3.199892,y:-21.800239}].flatMap(p=>[
      <via key={p.name} name={p.name} pcbX={p.x} pcbY={p.y} fromLayer="top" toLayer="inner1"
        holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />,
      <trace key={`${p.name}_lead`} from={p.from} to={`.${p.name} > .top`}
        connectsTo={[p.from,`.${p.name} > .top`,"net.GND"]} width={0.15}
        pcbPath={[p.from,`.${p.name} > .top`]} />,
    ])}
    <via name="DDR_GND_STITCH" pcbX={12} pcbY={-17} fromLayer="inner1" toLayer="inner6"
      holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
    {[{from:".U1 > .H5",name:"DDR_PWR_CPU",x:-1.2,y:-3.6},
      {from:".U3 > .B2",name:"DDR_PWR_RAM",x:-2.400046,y:-21.800239}].flatMap(p=>[
      <via key={p.name} name={p.name} pcbX={p.x} pcbY={p.y} fromLayer="top" toLayer="inner5"
        holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.DDR_1V5" />,
      <trace key={`${p.name}_lead`} from={p.from} to={`.${p.name} > .top`}
        connectsTo={[p.from,`.${p.name} > .top`,"net.DDR_1V5"]} width={0.15}
        pcbPath={[p.from,`.${p.name} > .top`]} />,
    ])}
    {(["inner1","inner3","inner6"] as const).map(layer=><copperpour key={layer} name={`DDR_GND_${layer}`}
      layer={layer} connectsTo="net.GND" unbroken clearance={0.2} coveredWithSolderMask
      outline={[{x:-27.7,y:26.2},{x:69.7,y:26.2},{x:69.7,y:-38.7},{x:-27.7,y:-38.7}]} />)}
    <copperpour name="DDR_1V5_inner5" layer="inner5" connectsTo="net.DDR_1V5" unbroken clearance={0.2} coveredWithSolderMask
      outline={[{x:-27.7,y:26.2},{x:69.7,y:26.2},{x:69.7,y:-38.7},{x:-27.7,y:-38.7}]} />
  </>
}
