import scopes from '../data/cloud-a11-reference-scopes.json'
/** Astra-approved bounded scope: three exact Inner3 scopes at actual existing CPU/RAM terminals. */
export function CloudA11ThreeReferenceScopes(){return <>{scopes.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
