import patches from '../data/cloud-rn5-cke-scopes.json'
/** UNAPPROVED: two precisely bounded Inner3 studies, retaining .175 land/.250 finished-hole targets. */
export function CloudCkeTwoScopeOverlaysV1(){return <>{patches.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
