# Existing DDR simulation

`ibis.circuit.tsx` remains the simulation authority. Its native declarations are unchanged: 640 MT/s (1.5625 ns UI), 512 ns PRBS7, quiet and switching DQS cases, TI slow-9-mA driver and Winbond 60-ohm ODT. `channels.tsx` resolves actual CPU/RAM pads, including the existing DQ permutation. `ibis-models.tsx` declares the reviewed vendor models expected locally in `model-review/`.

First build and check the physical source:

```sh
bun run build
bun scripts/verify-ddr.tsx work/ddr/final
```

Run the native byte-0 write experiments from the project root:

```sh
bunx tsci simulate simulations-next/run-ddr.circuit.tsx --output work/ddr-run
```

The entry renders the actual TSX board from `index.tsx` with the native simulation declarations from `ibis.circuit.tsx` as board children; `tsci simulate` runs it like any other TSX board. The board is compiled once beforehand only to resolve the routed DQ/DQS pads. `ibis.circuit.tsx` is a parameterized component, not a standalone CLI entry. To verify composition without running the solvers, run `bun test tests/ddr-simulation-entry.test.tsx`.

The pinned `tscircuit` 0.0.3104 ships CLI 0.1.2443, which bundles `@tscircuit/pcb-spice-pipeline` 0.1.8. The native entry needs `@tscircuit/core` 0.0.2286 or later. That release includes:

- [tscircuit/core#5155](https://github.com/tscircuit/core/pull/5155): board-level declarations can reference U1 and U3 inside the `Processor` and `DDR3` subcircuits;
- [#5157](https://github.com/tscircuit/core/pull/5157) and [#5231](https://github.com/tscircuit/core/pull/5231): core output passes the pipeline's strict schema check.

The `routed-copper` entry also needs [tscircuit/pcb-spice-pipeline#45](https://github.com/tscircuit/pcb-spice-pipeline/pull/45), which is still open. The GND bands on inner1, inner3 and inner6 touch, and meshing them separately made FastHenry stop with `filaments had identical centers`.

With #45 applied locally, the run reaches FastHenry and stops with `mutual inductance = infinity` on the finely sampled DQS0/DQSn0 curves ([tscircuit/pcb-spice-pipeline#46](https://github.com/tscircuit/pcb-spice-pipeline/issues/46)).

Joining the short curve pieces, as an experiment on #46, gets past that error but still doesn't converge, for two reasons:
- **Coarse settings** (3 mm ground cells, 3 filaments): resistance changes 17 % between the coarse and refined solves; the limit is 5 %.
- **Refined settings** (1.5 mm, 5 filaments): FastHenry's iterative solver doesn't converge at 1 GHz.

The cause is physical. DQ0 is 0.12 mm above inner1, so the cells under it must be about 0.1 mm, and at that size the three whole-board ground planes are far too large to mesh. The measurements are on #46.

## DQ0 through `straightened-stages`

```sh
tsci simulate simulate.circuit.tsx     # or: bun run simulate
```

This runs DQ0 alone, with an ideal strobe, through the pipeline's `straightened-stages` reduction, as one run (`BYTE0_WRITE_QUIET`). Without simulated DQS lanes the quiet and switching-strobe cases are identical. Each route is reduced to straight stages over a finite return bar. The board declares no return profile: pipeline 0.1.8 ([tscircuit/pcb-spice-pipeline#55](https://github.com/tscircuit/pcb-spice-pipeline/pull/55)) builds the bar from the board itself.

- **Reference plane:** each directly adjacent copper layer with a pour on the reference GND net. DQ0 on `top` returns on `inner1`.
- **Height, thickness and dielectric:** from `pcb_stackup` (centres 0.1245 mm apart, εr 4.1).
- **Bar width:** 2 mm, the pipeline default.

The run takes about 3 minutes.

The run passes every extraction check: L and R change less than 0.7 % from 9 to 15 filaments, C converges within 0.7 %, and DC resistance matches the analytic value. The DQ0 eye is about 0.96 V high and about 1.45 ns wide in the 1.5625 ns UI.

Sensitivity checked:
- **Bar width:** 1 mm and 2 mm give the same eye (0.957 V and 0.958 V).
- **Straightening:** over the same solid inner1 plane, the straightened route has about 4 % higher loop L than the real curved route (9.89 nH vs 9.53 nH, 0.1 mm cells).

This is not a byte-0 verdict. It leaves out:
- DQS0/DQSn0: they change layer and run on `inner2` between the `inner1` and `inner3` GND planes. The reduction can't share stages between DQ and DQS ([tscircuit/pcb-spice-pipeline#49](https://github.com/tscircuit/pcb-spice-pipeline/issues/49)) Pipeline 0.1.8 gives a two-plane stripline both returns ([#50](https://github.com/tscircuit/pcb-spice-pipeline/issues/50)), but the DQS via stages still need a hand-written `via` profile.
- Neighbour coupling, plane cutouts, and supply impedance.

## `routed-copper` status

No accepted eye result exists for this routing. The previously observed native-via, channel-cut and sampled-copper preparation failures were addressed upstream in [pcb-spice-pipeline #9](https://github.com/tscircuit/pcb-spice-pipeline/pull/9), but the updated pipeline has not yet produced an accepted result for this layout. Its documented historical AM3352 routed-copper case still encounters a FastHenry numerical failure. These are tooling investigations, not reasons to change PCB geometry or relax numerical acceptance. Diagnostic evidence is isolated under ignored `work/bug-handoffs/simulation/`; no replacement simulation runner, clipping override, or curve simplifier is part of this board.

For review, compare the physical board and channel endpoints first, then require the native extraction/convergence checks to pass before viewing the declared DQ and DQS eyes. Inspect both quiet and switching-strobe experiments for each byte. A preview, a failed extraction, or an old eye image is not a result for this board.

The existing model omits other-net coupling, package parasitics and through-via stubs; material/plating properties and the nominal fabrication stackup remain assumptions. Power, VREF and support networks remain unfinished. These experiments cannot qualify the finished DDR interface.

Vendor IBIS files are not distributed in this repository. Obtain the TI and Winbond models under their applicable terms using the source URLs in `model-review/review-receipt.json`. The declarations expect `model-review/sprm552c-candidate-models.ibs` and `model-review/W631GG6MB-12.ibs`; the receipt records the reviewed TI subset transformation, model names and SHA-256 hashes. Verify locally supplied files against those hashes before comparing results. The receipt's historical evidence paths refer to a separate investigation and are not included here.
