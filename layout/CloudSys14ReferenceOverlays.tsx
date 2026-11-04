import patches from "../data/cloud-sys14-reference-patches.json"
export function CloudSys14ApprovedReferenceOverlays(){return <>{patches.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
