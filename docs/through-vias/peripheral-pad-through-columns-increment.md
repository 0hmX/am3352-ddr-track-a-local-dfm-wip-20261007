# Move 27 peripheral pad vias into through columns

Fifteen power and twelve Ground pad vias move by at most 0.75 mm into clear
through columns around the memory, PMIC, microSD, Ethernet and HDMI areas.
Native 0.15 mm surface links connect the original pads. All placements stay
fixed. Replacement vias and links are literal TSX; no route JSON edits,
additions or imports. Links start at the named through via and end at the actual
pad, avoiding unnecessary leads to shared pin centroids.

[Native geometry](peripheral-pad-through-columns.svg) ·
[full inventory, relocation audit and validation](peripheral-pad-through-columns-validation.json).

**712 through / 237 non-through**, 949 total. All remaining snapshot conversions
conflict with non-pour copper. Exactly 27 barrels move; all unselected vias,
1,527 normal pin-net assignments and component placements remain unchanged.
All 8,263 original nonzero centerlines survive, with 36 added segments, for
8,299 final segments.

Native rendering and all 686 connectivity entries pass, with no new enforced
findings. Independent Gerber/Excellon preserves 257/257 named groups, no detected
shorts or missing copper/drills, and 975 matched barrels. All 416 Ground
terminals remain in one actual post-drill group through 284 Ground barrels.
All 119 checked surface pours pass. Placement findings (5/15/3/1) and the 86
sampled sharp-turn traces remain inherited; the official style analyzer is
unavailable.

Records fifteen new optional plated-hole margin findings and 34 additional
reference-area findings on 31 traces totaling 0.657890 mm². Three Inner6 routes
remain unassessed. Timing/skew, impedance, via stubs, SI/PI and current capacity
remain unqualified. Mixed drill spans and `allowBlindAndBuriedVias` remain.
