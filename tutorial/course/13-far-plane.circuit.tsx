import { LineBoard } from "./teaching-board"
// Lesson 11's trace, but on a 2-layer board: the GND plane is 1.43 mm away instead of 0.1 mm.
export default () => <LineBoard name="FAR_PLANE" drive="LVCMOS33_24MA" layers={2} pours={["bottom"]} />
