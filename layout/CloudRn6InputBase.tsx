import bundle from '../data/cloud-rn6-input-routes.json'
/** Staged routing partition: fixed footprint endpoints, .15/.30 mm centered terminal vias only.
 * Requires the coordinated DDR4-net, D3, PGOOD and supply remedies before promotion. */
function renderInputs(selected:any[]){return <group name="CloudRn6InputRoutes" pcbRelative pcbStyle={{viaHoleDiameter:.15,viaPadDiameter:.3}}>{selected.map(r=>{const ps=r.sections[0].points,first=ps[0],last=ps.at(-1)!;return <trace key={r.net} name={'RN6_INPUT_'+r.net} from={r.from} to={r.to} width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,{x:first[0],y:first[1],via:true,fromLayer:'top',toLayer:'inner2'},...ps.map(([x,y])=>({x,y,layer:'inner2'})),{x:last[0],y:last[1],via:true,fromLayer:'inner2',toLayer:'bottom'},r.to]]}/>})}</group>}

export function CloudRn6InputRoutesV2(){return renderInputs(bundle.routes)}
export function CloudRn6PclkRouteV2(){return renderInputs(bundle.routes.filter(r=>r.net==="LCD_PCLK"))}
