import scopes from '../data/cloud-d14-reference-scopes.json'
/** Astra-approved exact exact native study; two actual existing RAM terminal apertures only. */
export function CloudD14TwoReferenceScopes(){return <>{scopes.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
