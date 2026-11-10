# Move 24 CPU-area pad barrels into through columns

Twelve V3V3 and twelve Ground pad vias move by at most 0.75 mm into clear
through columns, connected to their original pads by native 0.15 mm surface
traces. All component placements remain fixed. The replacement vias and new
links are literal TSX; no route JSON is edited, added or imported.

[Native geometry](cpu-pad-through-columns.svg) ·
[full inventory, relocation audit and validation](cpu-pad-through-columns-validation.json).

**675 through / 274 non-through**, 949 total. The remaining conversion inventory
contains 274 conflicting sites: one pour-only, 273 involving other copper.
Exactly 24 barrels move; all unselected vias, 1,527 normal pin-net assignments
and component placements remain unchanged. All 8,191 original nonzero trace
centerlines survive; 39 segments are added, for 8,230 total.

Native rendering and all 686 connectivity entries pass, with no new enforced
findings. Independent Gerber/Excellon preserves 257/257 named groups, with no
detected shorts or missing copper/drills and 975 matched barrels. All 416 Ground
terminals remain in one actual post-drill group through 284 Ground barrels.
All 119 checked surface pours pass copper clearance. The 86 sampled sharp-turn
traces and placement findings (5/15/3/1) remain inherited.

The RTC Ground column and bend clear the PGOOD column from the preceding
increment. Four shared-pad RTC links start at the named through via and end at
the actual Ground pad, avoiding unnecessary leads to the shared pin centroid.

Records 17 new optional plated-hole margin findings and 26 additional reference
area findings on 24 traces totaling 0.578991 mm². Three Inner6 routes remain
unassessed. The official style analyzer is unavailable. Timing, impedance,
via stubs, SI/PI and current capacity remain unqualified. Mixed drill spans and
`allowBlindAndBuriedVias` remain.
