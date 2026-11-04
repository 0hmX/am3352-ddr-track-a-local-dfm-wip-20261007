import patches from '../data/cloud-ddr-reference-overlays.json'

/** Approved local Inner3 reference correction. No signal pad, drill, or via changes.
 * Each 0.375 mm-radius outline overlaps the existing GND plane and can alter
 * only one DDR_1V5 antipad. The nominal 0.1766 mm clearance compensates for
 * the native 32-sided hole polygon: actual land clearance >= 0.175 mm and
 * finished-hole clearance >= 0.250 mm must be measured after native export.
 * Local Astra decision and native/exported-copper evidence are recorded in docs/ddr-reference-exceptions.json.
 */
export function CloudDdrReferenceOverlays() {
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
