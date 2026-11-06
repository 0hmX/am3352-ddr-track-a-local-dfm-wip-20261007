import { LineBoard } from "./teaching-board"

// Aggressor (IO1) and victim (IO2) run straight and parallel for 20 mm.
// `spacing` is centre to centre in mm; the chips' I/O pads use the same pitch.
export const Crosstalk = ({ spacing = 0.32 }: { spacing?: number }) => (
  <LineBoard name="XTALK" drive="LVCMOS33_24MA" victimSpacing={spacing} />
)

export default () => <Crosstalk spacing={0.32} />
