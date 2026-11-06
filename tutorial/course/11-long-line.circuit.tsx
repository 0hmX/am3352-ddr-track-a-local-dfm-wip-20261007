import { LineBoard } from "./teaching-board"

// About 72 mm of serpentine: eleven straight runs, none longer than 13 mm. Strong 24 mA driver, nothing at the far end.
export const serpentine = [
  { x: -6, y: 1 }, { x: -6, y: 7 }, { x: -3, y: 7 }, { x: -3, y: -6 }, { x: 0, y: -6 },
  { x: 0, y: 7 }, { x: 3, y: 7 }, { x: 3, y: -6 }, { x: 6, y: -6 }, { x: 6, y: 1 },
]

export default () => <LineBoard name="LONG_LINE" drive="LVCMOS33_24MA" bends={serpentine} />
