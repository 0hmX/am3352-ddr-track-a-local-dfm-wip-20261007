import snapshot from '../data/cloud-ddr-routes.json'

/** Complete 46-net DDR timing candidate. Exact footprint centers and at most two endpoint signal vias per route are retained. Matching uses an explicitly unconfirmed stack preset; see separate native/physical evidence. */
export function CloudDdrRoutes() {
  return <>{snapshot.routes.map((r) => {
    const from=r.from.includes('.Processor >')?r.from:r.from.replace('.U1','.Processor > .U1')
    const to=r.to.includes('.DDR3 >')?r.to:r.to.replace('.U3','.DDR3 > .U3')
    const points=r.points.map(([x,y])=>({x,y}))
    const pcbPath=r.layer==='top'?[from,...points,to]:[from,
      {...points[0],via:true,fromLayer:'top',toLayer:r.layer},...points,
      {...points[points.length-1],via:true,fromLayer:r.layer,toLayer:'top'},to]
    const trace=<trace key={r.name} name={r.name} from={from} to={to} width={0.1} pcbPath={pcbPath} />
    return r.holeDiameter
      ? <group key={r.name} name={`DdrViaStyle_${r.name}`} pcbStyle={{viaHoleDiameter:r.holeDiameter,viaPadDiameter:0.3}}>{trace}</group>
      : trace
  })}</>
}
