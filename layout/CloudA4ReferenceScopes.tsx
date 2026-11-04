import scopes from '../data/cloud-a4-reference-scopes.json'
/** Astra-approved eight bounded reference-layer scopes at five real terminal barrels; no global plane rule. */
export function CloudA4EightReferenceScopes(){return <>{scopes.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
