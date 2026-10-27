/** Real native TSX fixture for layout replay compatibility, with two full-stack vias. */
export default function ReplayFixture({ variant = "base" }: { variant?: string }) {
  return <board width={20} height={10} layers={8} routingDisabled placementDrcChecksDisabled>
    <resistor name="R1" resistance={variant === "value" ? "2k" : "1k"} footprint={variant === "footprint" ? "0603" : "0402"}
      pcbX={-3} schX={variant === "schematic" ? -5 : -3}
      connections={{ pin1: "net.SIGNAL", pin2: "net.GND" }} />
    <resistor name="R2" resistance="1k" footprint="0402" pcbX={variant === "placement" ? 3.5 : 3} schX={3}
      connections={{ pin1: variant === "net" ? "net.OTHER" : "net.SIGNAL", pin2: "net.GND" }} />
    <trace from=".R1 > .pin1" to=".R2 > .pin1" width={0.15} pcbPath={[
      ".R1 > .pin1", { x: -1, y: 1 }, { x: -1, y: 1, via: true, fromLayer: "top", toLayer: "bottom" },
      { x: 1, y: 1 }, { x: 1, y: 1, via: true, fromLayer: "bottom", toLayer: "top" }, ".R2 > .pin1",
    ]} />
  </board>
}
