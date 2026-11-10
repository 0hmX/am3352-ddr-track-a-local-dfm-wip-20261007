# Reproduce phantom clearance gaps at a micron-sized pour edge

The native TSX fixture `tests/micron-pour-repro.tsx` reduces a DDR-area
sampled trace bend to twenty source waypoints, three signal pads and a ground
pour. The native pour emits a 2.8 µm boundary segment. Its actual separation
from the neighboring signal copper exceeds the board's 0.1 mm rule, but the
checker's polygon distance routine reports ten false findings, including zero.
The native copper-pour short check and independently parsed exported copper do
not show these contacts. This is a numerical-distance reproduction, not a board
routing change.

The desired behavior is recorded as an expected-failure test. Run:

```sh
bun test tests/through-vias.test.tsx tests/surface-ground.test.tsx
```

This increment preserves the published board: **636 through / 458 non-through
vias**, 451 snapshot conversion shorts and seven clearance-only candidates.
Processor/DDR placement, routes, pours and connectivity are unchanged. The
following stacked fix will address the check before DDR via-removal work.
