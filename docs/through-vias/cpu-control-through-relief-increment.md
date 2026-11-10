# Four original power/boot columns become through vias

Ports four complete affected mounted bodies and their four via replacements
into literal native TSX. Local Bottom detours clear the original through-column
positions without moving any part or adding vias. All trace widths stay fixed.
No route JSON edits, additions or imports.

[Enlarged native detours](cpu-control-through-relief.svg) ·
[inventory and complete validation](cpu-control-through-relief-validation.json).

| Through via | Detoured trace | Width (mm) | Added planar path (mm) |
| --- | --- | ---: | ---: |
| MPU_MAIN_V0 | V3V3_PHYSICAL_ISLAND_1 | 0.30 | 0.144975 |
| SYS2_CPU_VIP | RN4_NEAR_SYSBOOT9_R9 | 0.10 | 0.186396 |
| SYS13_STRAP_VIP | RN5_INPUT_SYS12_PULL_ARRAY | 0.10 | 0.062132 |
| SYS6_CPU_VIP | SYSBOOT3_BOTTOM_V2_0 | 0.10 | 0.269239 |

**718 through / 222 non-through**, 940 total. All remaining snapshot conversions
conflict with non-pour copper. Every via position, net and diameter stays fixed;
only the four selected spans change. All 1,527 normal pin-net assignments and
all placements remain unchanged. Four original segments are replaced; the
other 8,297 original segments survive. There are 8,317 final segments. All four
detours retain deliberate 45° bends and require no new vias.

Native rendering and all 686 connectivity entries pass, with no new enforced
findings. Independent Gerber/Excellon preserves 257/257 named groups, no detected
shorts or missing copper/drills, and 966 matched barrels. All 416 Ground
terminals remain in one actual post-drill group through 275 Ground barrels.
Surface clearance passes. Placement findings (5/15/3/1) and 86 sampled
sharp-turn traces remain inherited; the official style analyzer is unavailable.

Records three new optional plated-hole margin findings and five additional
reference-area findings on five traces totaling 0.396926 mm². Three Inner6 routes
remain unassessed. Timing/skew, impedance, via stubs, SI/PI and current capacity
remain unqualified. Mixed drill spans and `allowBlindAndBuriedVias` remain.
