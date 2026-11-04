import scopes from '../data/cloud-dqm1-d11-cpu-scopes.json'
/** Reviewed exact A1/H1 Inner1 and Inner3 scopes; see the bounded exception register. */
export function CloudDqm1D11CpuReferenceScopes(){return <>{scopes.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>}
