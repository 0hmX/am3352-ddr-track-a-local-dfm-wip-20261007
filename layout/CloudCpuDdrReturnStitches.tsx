/** Free-position ground bridges authorized for the DDR reference transitions.
 * Exact pad-centered signal barrels remain unchanged; these are additional GND stitches.
 * Spans and plane connectivity require the accompanying combined native proof.
 */
export function CloudCpuDdrReturnStitches(){return <>
 <via name="DDR_CPU_RETURN_J1" pcbX={-1.2} pcbY={-7.3} fromLayer="top" toLayer="bottom" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND"/>
 <via name="DDR_CPU_RETURN_L1" pcbX={1.15} pcbY={-7.9} fromLayer="top" toLayer="bottom" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND"/>
</>}
