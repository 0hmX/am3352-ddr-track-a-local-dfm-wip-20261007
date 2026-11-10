# Move two DDR memory-end barrels into through columns

Ports the complete mounted DQS0 and BA2 bodies into literal native TSX. Moves
the memory-end via of each into a clear through column, adding straight/45-degree
top and Inner2 links. Every original nonzero route centerline survives, all
placements stay fixed, and each net still has exactly two physical signal vias:
one through at memory and one remaining partial-span CPU escape. No JSON routing
imports/edits/new data.

[Enlarged native geometry](ddr-memory-endpoints.svg) ·
[complete inventory and verification](ddr-memory-endpoints-validation.json).

| Net | Via movement (mm) | Added planar path (mm) |
| --- | ---: | ---: |
| DDR_DQS0 | 0.686477 | 1.460660 |
| DDR_BA2 | 0.725431 | 1.470711 |

**644 through / 389 non-through**, 1,033 total: 382 snapshot conversion shorts
and seven clearance-only (one pour-only / 388 other-copper). Native render
succeeds; all 686 connectivity entries and all 1,527 normal pin-net assignments
are preserved. All unselected via geometry and all component placements remain
unchanged. No lost nets/new enforced clearances; surface-pour clearance passes.
Exported Gerber/Excellon verifies 257/257 named groups, no detected shorts or
missing copper/drills, and 1,059 matched barrels. All 416 Ground terminals stay
connected in one actual post-drill group through 363 Ground barrels.

Records two new optional plated-hole-margin findings and eleven additional
reference-area findings on eight traces totaling 0.308029 mm². The same three
Inner6 routes remain unassessed. Placement findings (5/15/3/1) and the same 86
sampled sharp-turn traces remain inherited; the official style analyzer is
unavailable. DQSn0 is unchanged while DQS0 gains the length above; differential
skew/timing, via stubs, impedance, SI/PI and current capacity are unqualified.
Mixed spans and `allowBlindAndBuriedVias` remain.
