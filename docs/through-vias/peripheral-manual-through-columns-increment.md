# Eight peripheral through columns

Moves eight named power/control vias to clear through columns and ports the
complete affected mounted route bodies into literal native TSX. Six surface
links retain the former pad connections. No route JSON is edited, added or
imported. All component placements, including processor and DDR, remain fixed.

[Enlarged native geometry](peripheral-manual-through-columns.svg) ·
[inventory, exact relocation audit and validation](peripheral-manual-through-columns-validation.json).

The selected columns are INPUT_VIP_17, DDC_ESD16_VIP, ETHPWR_VIP_16,
PWR_V2_V1V8_47, HDMIPWR_VIP_4, HDMI3V3_FEED_4, RESET_PULL_PAD_VIP and D11_U_VIP.
Displacements range from 0.055902 to 0.625 mm. Existing widths and 0.15 / 0.30 mm
hole/land diameters are retained. Every unselected via is unchanged.

**726 through / 214 non-through**, 940 total. Every remaining snapshot conversion
conflicts with non-pour copper. All 1,527 normal pin-net assignments are unchanged.
All 8,317 original centerlines survive; the new links add 28 centerlines.

Native rendering and all 686 connectivity entries pass with no new enforced
clearance findings. Independent Gerber/Excellon checks preserve 257/257 named
groups, no detected shorts or missing copper/drills, and 966 matched barrels.
All 416 Ground terminals remain in one actual post-drill group through 275
Ground barrels. All 215 surface-pour pieces pass the clearance check.
Placement findings (5/15/3/1) and 86 sampled sharp-turn traces remain inherited;
the official style analyzer is unavailable.

Nine new optional plated-hole margin findings and 29 additional reference-area
pairs on 26 traces totaling 1.888415 mm² are recorded. Three Inner6 routes remain
unassessed. Timing/skew, impedance, via stubs, SI/PI and current capacity remain
unqualified. Mixed drill spans and `allowBlindAndBuriedVias` remain.
