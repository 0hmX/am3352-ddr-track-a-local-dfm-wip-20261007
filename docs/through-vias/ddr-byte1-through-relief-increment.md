# DDR byte-1 through columns with Bottom SYSBOOT14 relief

Converts the CPU DDR_D8 and DDR_DQM1 barrels at their original pad positions
(-0.4, -6.8) and (-0.4, -6.0) mm to through vias. Both complete affected DDR
bodies are ported into literal native TSX. Their original paths and all component
placements stay fixed. A deliberate 0.1 mm Bottom SYSBOOT14 detour clears both
columns; its actual native points are edited in CloudSysboot14Routes.tsx and
stale unused route metrics removed. No route JSON edits, additions or imports.

[Enlarged native relief](ddr-byte1-through-relief.svg) ·
[complete inventory and validation](ddr-byte1-through-relief-validation.json).

**714 through / 235 non-through**, 949 total. All remaining snapshot conversions
conflict with non-pour copper. Every via position, net and diameter stays fixed;
only the two selected spans change. All 1,527 normal pin-net assignments and all
placements remain unchanged. Two original SYSBOOT14 centerline segments are
replaced; the other 8,297 original segments, including both DDR bodies, survive.
There are 8,301 final segments. SYSBOOT14 grows from 12.714108 to 13.289550 mm
(+0.575442 mm), retaining 45° bends and its original width without new vias.

Native rendering and all 686 connectivity entries pass, with no new enforced
findings. Independent Gerber/Excellon preserves 257/257 named groups, no detected
shorts or missing copper/drills, and 975 matched barrels. All 416 Ground
terminals remain in one actual post-drill group through 284 Ground barrels.
Surface clearance passes. Placement findings (5/15/3/1) and the same 86 sampled
sharp-turn traces remain inherited; the official style analyzer is unavailable.

Records one new optional plated-hole margin finding and four additional
reference-area findings on four traces totaling 0.113855 mm². Three Inner6
routes remain unassessed. Timing/skew, impedance, via stubs, SI/PI and current
capacity remain unqualified. Mixed drill spans and `allowBlindAndBuriedVias` remain.
