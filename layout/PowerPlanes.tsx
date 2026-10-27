/**
 * The saved layout uses GND on inner1 and inner6 across both board sections.
 * Recalculate their clearances from the current routes instead of replaying
 * old antipads. Power rails are routed explicitly; their old filled fragments
 * do not define reliable source outlines for a new split-plane design.
 */
export function PowerPlanes() {
  return <>{(["inner1", "inner6"] as const).map(layer => <copperpour
    key={layer} name={`GND_${layer}`} layer={layer} connectsTo="net.GND"
    unbroken clearance={0.2} boardEdgeMargin={0.3} coveredWithSolderMask
    outline={[{ x: -28, y: 26.5 }, { x: 70, y: 26.5 }, { x: 70, y: -39 }, { x: -28, y: -39 }]}
  />)}</>
}
