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

The pinned `tscircuit` CLI bundles `@tscircuit/pcb-spice-pipeline` 0.1.6. The native entry also needs:

- [tscircuit/core#5155](https://github.com/tscircuit/core/pull/5155): board-level declarations reference U1 and U3 inside the `Processor` and `DDR3` subcircuits.
- Schema-valid core output for the pipeline's strict check ([tscircuit/core#5006](https://github.com/tscircuit/core/pull/5006) and [tscircuit/core#5157](https://github.com/tscircuit/core/pull/5157)).
- [tscircuit/pcb-spice-pipeline#45](https://github.com/tscircuit/pcb-spice-pipeline/pull/45): the GND bands on inner1, inner3 and inner6 touch, and meshing them separately made FastHenry stop with `filaments had identical centers`.

With those applied locally, the run reaches FastHenry and stops with `mutual inductance = infinity` on the finely sampled DQS0/DQSn0 curves ([tscircuit/pcb-spice-pipeline#46](https://github.com/tscircuit/pcb-spice-pipeline/issues/46)).

No accepted eye result exists for this routing. The previously observed native-via, channel-cut and sampled-copper preparation failures were addressed upstream in [pcb-spice-pipeline #9](https://github.com/tscircuit/pcb-spice-pipeline/pull/9), but the updated pipeline has not yet produced an accepted result for this layout. Its documented historical AM3352 routed-copper case still encounters a FastHenry numerical failure. These are tooling investigations, not reasons to change PCB geometry or relax numerical acceptance. Diagnostic evidence is isolated under ignored `work/bug-handoffs/simulation/`; no replacement simulation runner, clipping override, or curve simplifier is part of this board.

For review, compare the physical board and channel endpoints first, then require the native extraction/convergence checks to pass before viewing the declared DQ and DQS eyes. Inspect both quiet and switching-strobe experiments for each byte. A preview, a failed extraction, or an old eye image is not a result for this board.

The existing model omits other-net coupling, package parasitics and through-via stubs; material/plating properties and the nominal fabrication stackup remain assumptions. Power, VREF and support networks remain unfinished. These experiments cannot qualify the finished DDR interface.

Vendor IBIS files are not distributed in this repository. Obtain the TI and Winbond models under their applicable terms using the source URLs in `model-review/review-receipt.json`. The declarations expect `model-review/sprm552c-candidate-models.ibs` and `model-review/W631GG6MB-12.ibs`; the receipt records the reviewed TI subset transformation, model names and SHA-256 hashes. Verify locally supplied files against those hashes before comparing results. The receipt's historical evidence paths refer to a separate investigation and are not included here.
