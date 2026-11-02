import patches from "../data/cloud-sys12-reference-patch.json"
/** Approved bounded SYS12 Inner3 scope only. Native floors must be reverified after composition. */
export function CloudSys12ReferenceOverlay(){return <>{patches.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
