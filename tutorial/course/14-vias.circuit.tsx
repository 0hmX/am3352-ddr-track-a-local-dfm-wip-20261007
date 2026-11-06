import { LineBoard } from "./teaching-board"
// Top → via → bottom → via → top. GND pours on inner1 (under top) and inner2 (over bottom).
// Each via needs a wire vertex at the same spot just before it.
export default () => (
  <LineBoard name="VIAS" drive="LVCMOS33_24MA" pours={["inner1", "inner2"]}
    bends={[
      { x: -4, y: 1 },
      { x: -4, y: 1, via: true, fromLayer: "top", toLayer: "bottom" },
      { x: 4, y: 1 },
      { x: 4, y: 1, via: true, fromLayer: "bottom", toLayer: "top" },
    ]} />
)
