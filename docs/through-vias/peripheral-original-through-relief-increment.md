# Nine original-position through columns

Ports nine complete mounted route bodies into literal native TSX. Local trace
detours clear nine through columns at their existing positions. Every via net,
position and diameter, all component placements (including U1/U3), and all
1,527 normal pin-net assignments remain fixed. No route JSON edits, additions
or imports. The DDR supply transition retains its original 0.25 / 0.50 mm
hole/land; the other selected vias retain 0.15 / 0.30 mm.

[Enlarged native geometry](peripheral-original-through-relief.svg) ·
[complete inventory and validation](peripheral-original-through-relief-v2-validation.json).

| Through column | Detoured trace | Layer | Added planar body length (mm) |
| --- | --- | --- | ---: |
| DDR15_SOURCE_TRANSITION | CLOUD_LOCAL_57_PWRONRST_N | Inner2 | 0.144975 |
| CLOUD_GND_PAD_125 | DDR_A7 | Inner4 | 0.144975 |
| CLOUD_GND_PAD_346 | CLOUD_HDMI_IVDD_1V2_V3_2 | Inner5 | 0.352082 |
| CLOUD_GND_PAD_370 | HDMIPWR_HDMI_5V_11 | Inner5 | 0.310660 |
| MPU226_MAIN_V2 | CLOUD_V1V8_REBUILD_44 | Inner5 | 0.352082 |
| SYS15_TERMINAL_1 | DDR_BA1 | Inner2 | 0.062132 |
| SYS8_CPU_VIP | RN3_SYS6_CPU_ARRAY_I5 | Inner5 | 0.144975 |
| RN5_INPUT_SYS8_ARRAY_VIP | RN4_NEAR_SYSBOOT13_pin1 | Top | 0.103553 |
| USBCP_NOR_VCC_V0 | INPUT_SYS_5V_127 | Inner5 | 0.082843 |

**735 through / 205 non-through**, 940 total. Every remaining snapshot conversion
conflicts with non-pour copper. Exactly one original segment in each named body
is replaced; the other 8,336 original centerlines survive. There are 8,381 final
centerlines, with original trace widths retained and no new vias.

Native rendering and all 686 connectivity entries pass with no new enforced
clearance findings. Independent Gerber/Excellon preserves 257/257 named groups,
no detected shorts or missing copper/drills, and 966 matched barrels. All 416
Ground terminals remain in one actual post-drill group through 275 Ground
barrels. All 215 surface-pour pieces pass. Placement findings (5/15/3/1) and
86 sampled sharp-turn traces remain inherited; the official style analyzer is
unavailable.

Ten new optional plated-hole margin findings and 17 additional reference-area
pairs on 15 traces totaling 1.313697 mm² are recorded. Three Inner6 routes remain
unassessed. The DDR_A7 and DDR_BA1 changes have geometric length audits, but
DDR timing/skew, impedance, via stubs, SI/PI and current capacity remain
unqualified. Mixed drill spans and `allowBlindAndBuriedVias` remain.
