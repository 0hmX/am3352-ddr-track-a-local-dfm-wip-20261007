# AM3352 DDR3 and RGB888 HDMI

This is a native tscircuit board with **251/251 named nets connected** (routing WIP; see limitations below). The active board is `index.tsx`; files in `layout/` and `data/` also include historical route sets, so presence does not imply a set is mounted. See the [251-net checkpoint](docs/routing-251-checkpoint.md), the prior [245-net checkpoint](docs/routing-245-checkpoint.md) and [validation summary](docs/routing-245-validation.json).

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

Open `http://localhost:3020/#file=index.tsx&tab=pcb`. `bun run build` creates the site in ignored `dist/`. Functional subcircuit group boxes are organizational boundaries, not physical keepouts.

## DDR simulation

```sh
tsci simulate simulate.circuit.tsx     # or: bun run simulate
```

This runs the byte-0 DQ0 write simulation on the real board in about 4 minutes. It goes through FastHenry, FasterCap, the vendor IBIS models and ngspice, then writes the report, with the eye diagram, to `.tscircuit/simulation-simulate-<time>/results.html`. Open it and choose **Plots → Eye**.

**Before the first run,** place the two vendor IBIS files in `simulations-next/model-review/`: `sprm552c-candidate-models.ibs` (TI) and `W631GG6MB-12.ibs` (Winbond). They aren't distributed with this repo. Their source URLs and SHA-256 hashes are in `simulations-next/model-review/review-receipt.json`.

The result is DQ0 alone with an ideal strobe, not a byte-0 verdict. What is and isn't modeled: [simulations-next/README.md](simulations-next/README.md).

## Routing requirements and limitations

Keep processor and DDR memory placement fixed. Use actual component-pad-centered signal transitions and deliberate straight/45-degree routing. DDR point-to-point routes have at most two physical signal vias including endpoint escapes; ground stitches are separate. Preserve true pad positions and exact resistor-channel mappings. Bounded local spacing decisions do not waive physical shorts or same-depth drill clearance.

Validate the composed board with native continuity, clearance, placement and trace-style checks, then independently reparse emitted Gerber/Excellon connectivity, shorts, drill spans and reference coverage. Preserve prior connections and keep inherited findings visible.

All 46 DDR timing routes are connected, but 10 DDR reference-area findings and additional low margins remain. Board-wide via-in-pad compliance is incomplete: three signal midpoints and nine off-pad power joins remain. The actual fabrication stack, configured DDR rate, impedance, timing and current capacity are unverified. Filled/capped via-in-pad processing and blind/buried layer construction require fabricator qualification. RAM power retains capacitor-barrel dependencies. This is routing WIP, not a fabrication release or SI/PI/boot signoff.

The cloud checkpoint does not include offline Mac work. The prior [240-net snapshot](docs/routing-240-snapshot.md) is historical.

The SYSBOOT6 increment uses a reviewed V1V8 feed redistribution. Its capacitor-barrel dependencies remain open power-capacity limitations. See the current [routing TODO](docs/routing-todo.md).

SD clock relief: [native TSX detours and checks](docs/through-vias/sd-clock-relief-increment.md)
leave **572 non-through vias**; all 686 native connectivity entries remain connected.

CPU-area ground simplification: [four redundant pad barrels removed in native TSX](docs/through-vias/cpu-ground-pad-removal-increment.md)
leaves **568 non-through vias**, with unchanged trace copper and verified connectivity.

CPU-area ground links: [28 native surface links replace blind pad barrels](docs/through-vias/cpu-ground-surface-increment.md)
leave **540 non-through vias**, preserving every original trace centerline and verified connectivity.

CPU V3V3 feeds: [seven blind barrels replaced by native surface links](docs/through-vias/cpu-v3-surface-increment.md)
leave **533 non-through vias**; the C_IO1_0 bridge is retained and all connectivity checks pass.

DDR-area ground links: [seven blind pad vias replaced by native surface links](docs/through-vias/ddr-ground-surface-increment.md)
leave **526 non-through vias**, with fixed DDR placement and verified native/exported connectivity.

CPU surface ground: [checked native fills and 68 pad-via removal candidates](docs/through-vias/cpu-surface-ground-increment.md).
This groundwork retains **526 non-through vias**; actual removal is a separate stacked increment.

CPU pad-via removal: [68 blind barrels and 28 redundant ground links removed in native TSX](docs/through-vias/cpu-surface-pad-removal-increment.md)
leaves **458 non-through vias**, with all native/exported nets and post-drill ground terminals connected.
