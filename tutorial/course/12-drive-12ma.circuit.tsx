import { LineBoard } from "./teaching-board"
import { serpentine } from "./11-long-line.circuit"
// Lesson 10's line with a 12 mA driver.
export default () => <LineBoard name="DRIVE_12MA" drive="LVCMOS33_12MA" bends={serpentine} />
