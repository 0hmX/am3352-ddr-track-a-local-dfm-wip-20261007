# Existing DDR simulation

`ibis.circuit.tsx` remains the simulation authority. Its native declarations are unchanged: 640 MT/s (1.5625 ns UI), 512 ns PRBS7, quiet and switching DQS cases, TI slow-9-mA driver and Winbond 60-ohm ODT. `channels.tsx` resolves actual CPU/RAM pads, including the existing DQ permutation. `ibis-models.tsx` declares the reviewed vendor models expected locally in `model-review/`.

First build and check the physical source:

```sh
bun run build
bun scripts/verify-ddr.tsx work/ddr/final
```

The checked input is `work/ddr/final/board.circuit.json`. As in the original setup, the native simulation component requires that physical board as its `circuitJson` prop; invoking this parameterized component directly through `tsci simulate` is not a complete runnable case. It is not part of the root build. The supported integration is being repaired in the separate Codex chat **Fix native DDR routed-copper simulation with visual reproductions**.

No accepted eye result exists for this routing. The official pipeline currently fails on native via metadata, redundant ideal connectivity around extracted channels, and polygon operations on smooth copper. Experimental attempts also encountered field-solver convergence limits. These are tooling investigations, not reasons to change PCB geometry or relax numerical acceptance. Diagnostic evidence is isolated under ignored `work/bug-handoffs/simulation/`; no replacement simulation runner, clipping override, or curve simplifier is part of this board.

For review, compare the physical board and channel endpoints first, then require the native extraction/convergence checks to pass before viewing the declared DQ and DQS eyes. Inspect both quiet and switching-strobe experiments for each byte. A preview, a failed extraction, or an old eye image is not a result for this board.

The existing model omits other-net coupling, package parasitics and through-via stubs; material/plating properties and the nominal fabrication stackup remain assumptions. Power, VREF and support networks remain unfinished. These experiments cannot qualify the finished DDR interface.

Vendor IBIS files are not distributed in this repository. Obtain the TI and Winbond models under their applicable terms using the source URLs in `model-review/review-receipt.json`. The declarations expect `model-review/sprm552c-candidate-models.ibs` and `model-review/W631GG6MB-12.ibs`; the receipt records the reviewed TI subset transformation, model names and SHA-256 hashes. Verify locally supplied files against those hashes before comparing results. The receipt's historical evidence paths refer to a separate investigation and are not included here.
