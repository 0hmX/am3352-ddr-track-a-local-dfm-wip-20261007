import row from '../data/cloud-sysboot7-strap.json'
/** Existing CPU-to-array route stays exact. This short Bottom branch needs no new signal via. */
export function CloudSysboot7BottomStrap(){return <group name="CloudSysboot7BottomStrap" pcbRelative><trace name={row.name} from={row.from} to={row.to} width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[row.from,...row.points.map(([x,y])=>({x,y,layer:'bottom'})),row.to]]}/></group>}
