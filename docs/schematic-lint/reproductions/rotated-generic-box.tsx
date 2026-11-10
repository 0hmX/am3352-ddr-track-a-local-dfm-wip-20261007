/** `tsci check schematic-placement` still asks to rotate U1 by -90 degrees:
 * generic-box rotation changes the component field but not its pin geometry.
 * Explicit topSide/bottomSide arrangements avoid this in the board's ferrites.
 */
export default function RotatedGenericBox() {
  return <board width={8} height={6} routingDisabled>
    <chip name="U1" footprint="0402" schRotation={-90}
      pinLabels={{ pin1: "1", pin2: "2" }}
      connections={{ pin1: "net.V3V3", pin2: "net.GND" }} />
  </board>
}
