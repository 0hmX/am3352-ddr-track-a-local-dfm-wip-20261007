import { LineBoard } from "./teaching-board"
import { serpentine } from "./11-long-line.circuit"
// Lesson 10's line with a 4 mA driver.
export default () => <LineBoard name="DRIVE_4MA" drive="LVCMOS33_4MA" bends={serpentine} />
