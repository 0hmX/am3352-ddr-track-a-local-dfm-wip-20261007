import { LineBoard } from "./teaching-board"
import { serpentine } from "./11-long-line.circuit"
// Lesson 11's line with a 24 mA driver (the same run as 11-long-line).
export default () => <LineBoard name="DRIVE_24MA" drive="LVCMOS33_24MA" bends={serpentine} />
