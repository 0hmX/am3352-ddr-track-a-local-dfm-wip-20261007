# Browser duplicate-pin regression

`4283c13` fails in the localhost:3050 viewer with `@tscircuit/eval@0.0.1727`. In the full board, `schematic_port_537` is **C_IO1_1 pin 1, V3V3** (`source_port_1261`, `source_component_27`). It participates in the existing `V3V3_PHYSICAL_ISLAND_0` connection to C_IO4_0, the new local paths to C_IO1_0 and C_IO2_B, and a boundary net-label connection.

The schematic solver's connectivity map retains aliases to overlapping lists while merging direct-connection islands. A later net connection can concatenate an overlapping list again. The minimum-spanning-tree solver then receives the same pin ID twice. Merely changing the three-member path to a two-port trace also reproduces the full-board failure; the overlapping local connection topology must be removed.

The TSX workaround removes the CPU/DDR local bus planners and retains one original pin-to-named-net declaration per connection, with `schDisplayLabel`. Existing PCB route declarations supply the remaining local wires. Compact positions, sheet sizes and readable projection labels remain. Power management's local paths are retained; its RTC grounds use labels, and its bypass parts sit beside the V1V8 bank. The PMIC's two switch pins have enough display spacing for the vertical inductor.

The six-capacitor [TSX reproduction](reproductions/duplicate-pin-with-physical-island.tsx) is independent of board imports. Its default mode fails with duplicate `schematic_port_4`; `workaround={true}` renders. Run `bun scripts/check-schematic-bus-repro.tsx` to verify both outcomes against the pinned core. Both outcomes were also checked with `CircuitRunner` from eval 0.0.1727. No renderer package is patched and no circuit JSON is authored by hand.

CPU/DDR label shares have increased from the unsafe bus candidate. Power/ground labels are a deliberate temporary workaround on the bypass and supply sheets; the >50% cases remain visual work, not a claim that the original target is complete. Pure interface sheets also exceed 50% because their ports are true inter-sheet signals. The per-sheet table records the actual full-board counts.

The browser must be checked before each push. `tsci dev` can retain a pre-sync filesystem cache: restart it after copying changed TSX, verify the source returned by `/api/files/get`, and verify that the worker returns all 24 sheets without schematic errors. A CLI build alone is insufficient.
