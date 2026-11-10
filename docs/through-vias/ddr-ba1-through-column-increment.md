# Move DDR_BA1 into a through column

Ports the complete affected mounted DDR_BA1 body into literal native TSX and
moves its CPU endpoint from (-3.60, -6.80) to (-3.65, -6.75) mm. The 0.070711 mm
move uses 0.1 mm Top/Inner2 links and retains the original body. No route JSON
edits, additions or imports; processor, memory and all other placements stay fixed.

[Native geometry](ddr-ba1-through-column.svg) ·
[full inventory and validation](ddr-ba1-through-column-validation.json).

**676 through / 273 non-through**, 949 total. Every remaining snapshot conversion
conflicts with non-pour copper; no pour-only blind vias remain. All 686 native
connectivity entries and 1,527 pin-net assignments remain connected/unchanged.
Exactly one barrel moves; every unselected via remains unchanged. All original
8,230 centerlines survive with two added segments, for 8,232 total. Combined
planar BA1 path grows from 41.070761 to 41.212182 mm (+0.141421 mm); electrical
delay, timing/skew and through-via stubs remain unqualified.

The old same-position conversion broke the V3V3 feed to R_BOOT14. Of 92 nearby
columns clear of other copper, a conservative actual Inner5 V3V3 cut screen
retained 22. The selected nudge passes fresh native and exported connectivity.
All 257 exported named groups remain connected, with no detected shorts or
missing copper/drills and 975 matched barrels. All 416 Ground terminals remain
in one actual post-drill group through 284 Ground barrels. Surface pour
clearance passes; no new enforced findings.

Records one new optional plated-hole margin finding and four additional
reference-area findings on three traces totaling 0.121879 mm². Three Inner6
routes remain unassessed. The inherited placement findings (5/15/3/1) and 86
sampled sharp-turn traces remain; the official style analyzer is unavailable.
Impedance, SI/PI and current capacity remain unqualified. Mixed drill spans and
`allowBlindAndBuriedVias` remain.
