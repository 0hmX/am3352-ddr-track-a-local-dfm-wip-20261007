import routes from '../data/cloud-hdmi-d0-d8-routes.json'
/**
 * HDMI_D0 (U_HDMI.61 - RN_HDMI_1.5) and HDMI_D8 (U_HDMI.52 - RN_HDMI_1.6).
 * 0.1 mm traces on inner4/inner5 with pad-centered vias at both terminals
 * (top pad via-in-pad, bottom RN pad via-in-pad) plus mid-route layer changes.
 */
export function CloudHdmiD0D8Routes(){
 return <group name="Cloud_HDMI_D0_D8_routes" pcbX={0} pcbY={0} pcbRelative>
  {routes.vias.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer as any} toLayer={v.toLayer as any} holeDiameter={.15} outerDiameter={.30} {...((v as any).connectsTo?{connectsTo:(v as any).connectsTo}:{})}/>)}
  {routes.traces.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.slice(1,-1).map(([x,y])=>({x,y,layer:r.layer})),r.to] as any]}/>)}
 </group>
}
