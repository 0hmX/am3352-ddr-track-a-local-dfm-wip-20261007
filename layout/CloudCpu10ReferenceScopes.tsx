import scopes from '../data/cloud-cpu10-reference-scopes.json'
/** Parent Astra approved CPU10 Inner1/Inner3 only; no duplicate CPU14 scopes or fixture barrels. */
export function CloudCpu10ApprovedScopes(){return <>{scopes.map(p=><copperpour key={p.name} name={p.name} layer={p.layer as any} connectsTo="net.GND" unbroken clearance={.1766} boardEdgeMargin={0} coveredWithSolderMask outline={p.outline}/>)}</>}
