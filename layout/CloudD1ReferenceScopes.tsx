import scopes from "../data/cloud-d1-inner1-scopes.json"

/** Two bounded Inner1 additions at U1.K2/D10 and U1.K1/D9; no general clearance change. */
export function CloudD1TwoInner1Scopes() {
  return <>{scopes.map(p => <copperpour key={p.name} name={p.name} layer={p.layer} connectsTo="net.GND" clearance={0.1766} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline} />)}</>
}
