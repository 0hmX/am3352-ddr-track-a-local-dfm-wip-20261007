import patches from '../data/cloud-ddr-cleanup-reference-overlays.json'
/** Two approved bounded reference repairs; measured native and emitted-copper evidence is recorded in docs/ddr-reference-exceptions.json. */
export function CloudDdrCleanupReferenceOverlays(){return <>{patches.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
