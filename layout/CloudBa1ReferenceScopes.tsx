import scopes from '../data/cloud-ba1-reference-scopes.json'
/** Astra-approved bounded scope: six exact layer scopes at three actual existing CPU terminals. */
export function CloudBa1SixReferenceScopes(){return <>{scopes.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
