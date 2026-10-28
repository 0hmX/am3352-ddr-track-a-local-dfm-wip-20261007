# Native DDR simulation integration reproduction

`board.circuit.tsx` and its [PCB snapshot](__snapshots__/board.circuit-pcb.snap.svg) are a visual reference for the actual routed board: inspect the U1 processor, U3 memory and the DDR traces between them. This is an unfinished board, not a qualified SI result. The test below uses that same physical TSX and the existing IBIS simulation, rather than a synthetic model.

```sh
bunx tsci snapshot reproductions/ddr-native-simulation/board.circuit.tsx --pcb-only --update --disable-parts-engine
bun reproductions/ddr-native-simulation/reproduce.tsx
bunx tsci simulate simulations-next/ibis.circuit.tsx
```

The first command supplies the compiled board but fails because the seven HDMI resistor-array `simulation_spice_subcircuit` records are rejected by the saved-board bridge. The second invokes the parameterized component without its required `circuitJson` prop and fails earlier. Review the board and channel endpoints before accepting any simulation result; a board preview is not an eye diagram.
