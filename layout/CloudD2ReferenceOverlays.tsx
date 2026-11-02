import scopes from '../data/cloud-d2-reference-scopes.json'
/** Only Astra-selected Option B: seven exact centers on Inner1 and Inner3. No alternative A scopes. */
export function CloudD2ScopedReferenceOverlays(){return <>{scopes.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
