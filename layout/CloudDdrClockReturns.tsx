/** Two buried GND bridges relocated away from actual reference drill crossings.
 * Signal traces and their endpoint vias are unchanged. See native/post-drill proof.
 */
export function CloudDdrClockReturns(){return <>
  <via name="DDR_CK_CPU_RETURN" pcbX={-4.15} pcbY={-6.46} fromLayer="inner1" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
  <via name="DDR_CK_RAM_RETURN" pcbX={1.2} pcbY={-27.95} fromLayer="inner1" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
</>}
