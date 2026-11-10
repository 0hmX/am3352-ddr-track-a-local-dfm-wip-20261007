# Move seven CPU/peripheral endpoints into through columns

Ports all affected complete mounted bodies into literal native TSX, preserving
every original nonzero centerline and adding short surface/body-layer links.
All component placements stay fixed. No route JSON edits/imports/additions.

[Enlarged native geometry](cpu-peripheral-endpoints.svg) ·
[complete inventory and verification](cpu-peripheral-endpoints-validation.json).

| Original trace | Via movement (mm) | Added planar path (mm) |
| --- | ---: | ---: |
| CLOUD_LOCAL_25_PMIC_PGOOD | 0.390512 | 0.807107 |
| CLOUD_LOCAL_26_MMC0_DAT1 | 0.375000 | 0.750000 |
| CLOUD_LOCAL_36_PMIC_INT_N | 0.269258 | 0.582843 |
| CLOUD_LOCAL_61_RTC_RESET_N | 0.125000 | 0.262132 |
| CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0 | 0.400000 | 0.800000 |
| RN6_INPUT_HDMI_VSYNC | 0.055902 | 0.120711 |
| CLOUD_RN0_NEAR_HDMI_D17 | 0.075000 | 0.150000 |

**651 through / 298 non-through**, 949 total: every remaining snapshot conversion
conflicts, one pour-only and 297 involving other copper. Native render succeeds;
all 686 connectivity entries and 1,527 normal pin-net assignments remain
connected/unchanged. Exactly seven barrels move and become through; all
unselected vias and placements remain unchanged. Every original centerline
survives, with 22 added segments (8,191 total). No new enforced findings.

The full eleven-site candidate separated ten V3V3 pins. A conservative Inner5
copper-cut screen excludes four sites; the seven-site native and exported
checks preserve the complete rail. These exclusions remain unresolved.

Exported Gerber/Excellon preserves 257/257 named groups, no detected shorts or
missing copper/drills, and 975 matched barrels. All 416 Ground terminals remain
in one actual post-drill group through 284 Ground barrels. Surface clearance
passes. Records three new optional plated-hole margin findings and 28 additional
reference-area findings on 22 traces totaling 0.754487 mm². The same three
Inner6 routes remain unassessed. Placement findings (5/15/3/1) and the same 86
sampled sharp-turn traces remain inherited; the official style analyzer is
unavailable. Timing, skew, impedance, via stubs, SI/PI and current capacity are
unqualified. Mixed spans and `allowBlindAndBuriedVias` remain.
