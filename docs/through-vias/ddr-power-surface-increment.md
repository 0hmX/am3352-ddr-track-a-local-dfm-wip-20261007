# Replace five DDR power pad barrels with native surface feeds

Adds one Top K2 escape and four Bottom decoupling links, all 0.2 mm wide,
to existing through DDR_1V5 barrels. Removes the five original partial-span
pad vias from the native power array. All placements stay fixed. Both candidate
and production builds pass; their trace/via geometry matches. No route JSON
edits, imports or additions are introduced by this change.

[Enlarged native links](ddr-power-surface.svg) ·
[complete inventory and verification](ddr-power-surface-validation.json).

| Removed pad via | Through target | Surface | Link length (mm) |
| --- | --- | --- | ---: |
| DDR15_FEED_15 | DDR15_FEED_14 | Top | 1.931317 |
| DDR15_FEED_28 | DDR15_FEED_31 | Bottom | 2.944975 |
| DDR15_FEED_29 | DDR15_FEED_31 | Bottom | 2.165685 |
| DDR15_FEED_30 | DDR15_FEED_31 | Bottom | 1.000000 |
| DDR15_FEED_35 | DDR15_FEED_34 | Bottom | 0.800000 |

**644 through / 312 non-through**, 956 total. Native render has no errors;
all 686 connectivity entries and all 1,527 normal pin-net assignments remain
connected/unchanged. No new enforced or optional findings. All retained via
geometry and placements stay unchanged. All 8,155 original trace centerlines
remain, with 14 new segments across five power traces (8,169 total).

Exported Gerber/Excellon preserves 257/257 named groups, no detected shorts or
missing copper/drills, and 982 matched barrels. All 416 Ground terminals remain
in one actual post-drill group through 291 Ground barrels. All 110 surface-pour
pieces pass clearance; no additional reference cuts appear. The same three
Inner6 routes remain unassessed. Placement findings (5/15/3/1) and the same 86
sampled sharp-turn traces remain inherited; the official style analyzer is
unavailable. These feeds change decoupling paths; impedance, current capacity,
ESL, timing and SI/PI are unqualified. Mixed spans and the blind/buried flag remain.
