import { cloneElement, type ReactElement } from "react"
import { assembly, enclosure } from "tscircuit"
import Board from "./index"
import hdmiPlug from "./models/generated/Plug_HDMI_TypeA_Cable.glb"
import usbAPlug from "./models/generated/Plug_USB_TypeA_Cable.glb"
import usbCPlug from "./models/generated/Plug_USB_TypeC_Cable.glb"

/**
 * Socket mouths in board mm (z from board centre) and the outward axis angle.
 * x/y from the KiCad socket models at their placements; z from the enclosure cutout
 * centres, which core sizes from the same socket bodies.
 */
const matingPlugs = [
  // J_HDMI at (62.975, -28.5), Molex 208658 body reaches local x = 8.57
  { name: "CABLE_HDMI", displayName: "HDMI cable", model: hdmiPlug, mouth: { x: 71.55, y: -28.5, z: 3.95 }, outward: 0 },
  // J_USB_HOST at (-15.6, 18) rot 180, Molex 67643 mouth 13.1mm from the pin row
  { name: "CABLE_USB_A", displayName: "USB-A device cable", model: usbAPlug, mouth: { x: -19.1, y: 31.1, z: 4.0 }, outward: 90 },
  // J_POWER at (26, 22.825) rot 180, GCT USB4105 mouth on the board edge
  { name: "CABLE_USB_C", displayName: "USB-C power cable", model: usbCPlug, mouth: { x: 26, y: 26.5, z: 2.73 }, outward: 90 },
]

/**
 * Product assembly: the unchanged AM3352 board inside a generated two-part FDM
 * enclosure (base + friction-fit lid). Openings come from the
 * <enclosure.cutoutaperture> declared on J_POWER, J_HDMI, J_ETH, J_MICROSD and
 * the two tact switches (see models/index.tsx).
 *
 * index.tsx stays the board-only entrypoint used by scripts/ and validation.
 */
export default function Assembly() {
  // index.tsx declares the 98 x 65.5mm rectangle as an explicit outline at x -28..70,
  // y -39..26.5, which leaves pcb_board.center at the origin; enclosure.fdm.box centers
  // itself on pcb_board.center. Here the same rectangle is expressed as width/height
  // centered on (21, -6.25) so the enclosure lands on the board. No copper moves.
  const base = Board() as ReactElement<any>
  if (base.props.width !== 98 || base.props.height !== 65.5) throw new Error("board size changed; update assembly.tsx")
  const board = cloneElement(base, {
    name: "AM3352_BOARD",
    outline: undefined,
    outlineOffsetX: 21,
    outlineOffsetY: -6.25,
  })
  return (
    <assembly.device name="AM3352_HDMI_SBC">
      {board}
      <enclosure.fdm.box
        name="ENCLOSURE"
        boardRef="AM3352_BOARD"
        wallThickness={2}
        floorThickness={2}
        lidThickness={2}
        boardClearance={0.6}
        // bottom side carries 1210 MLCCs (2.5mm) and resistor arrays
        standoffHeight={4}
      />
      {/* Mating cables plugged into the external ports (assembly view only, not BOM). */}
      {matingPlugs.map(p => <assembly.part key={p.name} name={p.name} displayName={p.displayName}
        cadModel={{ glbUrl: p.model, positionOffset: p.mouth, rotationOffset: { x: 0, y: 0, z: p.outward }, modelBoardNormalDirection: "z+" }} />)}
      <assembly.drawing.page name="am3352-assembly" displayName="AM3352 assembly" size="iso_a3">
        <assembly.drawing.titleblock title="AM3352 DDR3 + HDMI SBC assembly" creator="tscircuit" revisionIndex="WIP" />
        <assembly.drawing.partview name="top" partRef=".ENCLOSURE" direction="z+" width={180} height={120} centerX={110} centerY={150} />
        <assembly.drawing.partview name="iso" partRef=".ENCLOSURE" direction="isometric" width={150} height={110} rightOfRef=".top" />
        <assembly.drawing.partview name="front" partRef=".ENCLOSURE" direction="y-" width={180} height={50} belowRef=".top" />
      </assembly.drawing.page>
    </assembly.device>
  )
}
