import patches from '../data/cloud-rx-reference-scopes.json'

/** Eleven bounded layer/site patches approved by parent Astra; actual combined evidence retained.
 * All signal terminals, via centers, drills and spans remain unchanged.
 * Each .375 mm-radius outline overlaps the existing GND plane. Nominal .1766
 * clearance must be verified in emitted native and Gerber copper against the
 * .175 mm land / .250 mm finished-hole floors on each changed composition.
 */
export function CloudRxReviewOnlyReferenceOverlays() {
 return <>{patches.map(p=><copperpour key={p.name} name={p.name}
   layer={p.layer} connectsTo="net.GND" clearance={.1766}
   boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}</>
}
