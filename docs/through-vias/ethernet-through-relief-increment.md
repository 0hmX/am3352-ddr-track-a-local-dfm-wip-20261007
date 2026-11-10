# Ethernet-area through-via relief

Removes ten blind/buried auxiliary Ground stitches with no trace/pour selector
references or SMT-pad contacts. Stable null slots preserve generated names.
Ports the complete mounted RMII1_TXD1_ISO and ETH_MDC_ISO bodies into literal
TSX, moving one endpoint of each into a clear through column and adding short
straight/45-degree top and Inner4 links. Every original nonzero route centerline
remains. No JSON routing edits/imports/new data; processor/DDR and all other
component placements stay fixed.

[Full inventory and verification](ethernet-through-relief-validation.json).

| Net | Via movement (mm) | Added planar path (mm) |
| --- | ---: | ---: |
| RMII1_TXD1_ISO | 0.500000 | 1.048528 |
| ETH_MDC_ISO | 0.254951 | 0.541421 |

**642 through / 391 non-through**, 1,033 total: 384 snapshot conversion shorts
and seven clearance-only (one pour-only / 390 other-copper). Native render
succeeds; all 686 connectivity entries and all 1,527 normal pin-net assignments
remain connected and unchanged. All unselected via geometry stays unchanged.
There are no lost nets or new enforced clearances; surface-pour clearance passes.
Exported Gerber/Excellon verifies 257/257 named groups, zero detected shorts or
missing copper/drills, and 1,059 matched barrels. All 416 Ground terminals remain
connected in one actual post-drill group through 363 Ground barrels.

The report records two optional plated-hole-margin additions and eight new
reference-area findings on seven traces totaling 0.163775 mm². The same three
Inner6 routes remain unassessed. Placement findings (5/15/3/1) and the same 86
sampled sharp-turn traces remain inherited; the official style analyzer is
unavailable. Return paths, lengths and via stubs change; SI/PI, impedance,
timing and current capacity remain unqualified. Mixed spans and
`allowBlindAndBuriedVias` remain.
