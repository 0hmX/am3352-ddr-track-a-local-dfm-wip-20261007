import routes from '../data/cloud-rn4-near-routes.json'
import vias from '../data/cloud-rn4-near-vias.json'
/** Selected complete RN4 pack; all signal transitions are real terminal barrels. */
export function CloudRn4NearRoutes(){return <group name="CloudRn4NearRoutes" pcbRelative>
 {vias.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer as any} toLayer={v.toLayer as any} holeDiameter={v.holeDiameter} outerDiameter={v.outerDiameter} connectsTo={v.selector}/>)}

 {routes.map(r=>r.net==='SYSBOOT5'?<trace key={r.name} name={r.name} from="net.SYSBOOT5" to={r.toSelector} width={r.width} pcbPaths={[[...r.points.map(([x,y])=>({x:x-r.b[0],y:y-r.b[1],layer:r.layer as any})),r.toSelector]]}/>:<trace key={r.name} name={r.name} from={r.fromSelector} to={r.toSelector} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.fromSelector,...r.points.map(([x,y])=>({x,y,layer:r.layer as any})),r.toSelector]]}/>)}
 </group>}
