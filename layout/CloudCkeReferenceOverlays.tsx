import patches from '../data/cloud-cke-reference-overlays.json'

/** Staged, bounded Inner3 reference study. No signal pad, drill, or via changes.
 * Each 0.375 mm-radius outline overlaps the existing GND plane and can alter
 * only one named DDR_1V5/V3V3 power antipad. The nominal 0.1766 mm clearance compensates for
 * the native 32-sided hole polygon: actual land clearance >= 0.175 mm and
 * finished-hole clearance >= 0.250 mm must be measured after native export.
 * Astra approved this bounded scope; combined native and emitted-copper evidence is recorded in docs/ddr-reference-exceptions.json.
 */
export function CloudCkeReferenceOverlays() {
  return <>{patches.map(p => <copperpour
    key={p.name}
    name={p.name}
    layer="inner3"
    connectsTo="net.GND"
    clearance={0.1766}
    boardEdgeMargin={0}
    unbroken
    coveredWithSolderMask
    outline={p.outline}
  />)}</>
}
