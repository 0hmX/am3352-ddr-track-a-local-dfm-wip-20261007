import { LineBoard } from "./teaching-board"
import { serpentine } from "./11-long-line.circuit"
// Same line and driver, 2.5x the bit rate: 0.8 ns per bit.
export default () => <LineBoard name="LONG_LINE_FAST" drive="LVCMOS33_24MA" bends={serpentine} bitDuration="0.8ns" />
