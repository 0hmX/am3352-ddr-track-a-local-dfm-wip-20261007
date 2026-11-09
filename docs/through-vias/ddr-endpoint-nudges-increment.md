# Move four DDR endpoint vias into clear through columns

Ports the complete mounted D6, A8, D14 and D4 route bodies into literal native
TSX. Replaces each CPU-side partial-span endpoint with a through via at a nearby
clear site, a top pad link and an inner-layer link back to the existing body.
All links are straight/45-degree. No JSON routing imports/edits/new data. All
original nonzero route centerlines remain present, and processor/DDR placement
stays fixed. Each affected DDR net has exactly two physical signal vias, both
through. All other via geometry and pin-net assignments remain unchanged.

[Enlarged native geometry](ddr-endpoint-nudges.svg) ·
[complete inventory and verification](ddr-endpoint-nudges-validation.json).

| Net | Via movement (mm) | Added planar path (mm) |
| --- | ---: | ---: |
| DDR_D6 | 0.206155 | 0.441421 |
| DDR_A8 | 0.364005 | 0.782843 |
| DDR_D14 | 0.364005 | 0.782843 |
| DDR_D4 | 0.100000 | 0.200000 |

**640 through / 422 non-through**, 1,062 total: 415 snapshot conversion shorts
and seven clearance-only (one pour-only / 421 other-copper). Native render
succeeds; all 686 connectivity entries and 1,527 normal pin-net assignments are
preserved. No lost nets or new enforced clearance findings. The surface-pour
clearance check passes. Independent Gerber/Excellon checks verify 257/257 named
groups, zero detected shorts/missing copper/drills and 1,088 barrel matches.
All 416 Ground component terminals remain connected in one actual post-drill
group through 392 Ground barrels.

The full report records eight additions under the optional 0.2 mm plated-hole
margin screen, and twenty additional reference-area findings across eighteen
traces totaling 0.480672 mm². Reference policy still leaves the same three Inner6
routes unassessed. Placement findings remain inherited (five outside-board,
fifteen missing-courtyard, three courtyard-overlap, one connector-orientation),
and the same 86 traces retain sampled sharp turns. The official style analyzer
is unavailable. Added planar paths and changed via stubs are not timing,
impedance or SI/PI qualification. Mixed spans and `allowBlindAndBuriedVias` remain.
