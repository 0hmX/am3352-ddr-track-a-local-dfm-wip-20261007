# Move nine CPU-area power and signal barrels through

Moves nine manual partial-span vias into nearby through columns. All affected
mounted bodies are ported into literal native TSX, with surface/body links and
an explicit 0.2 mm Inner5 link preserving the MPU_CAP1 endpoint at the old
MPU_CAP0 land. No route JSON edits, additions or imports. All placements stay fixed.

[Surface geometry](cpu-manual-through-columns.svg) ·
[two USB Inner4 reroutes](cpu-manual-through-usb.svg) ·
[inventory and complete validation](cpu-manual-through-columns-validation.json).

| Via | Movement (mm) |
| --- | ---: |
| DDR15_FEED_43 | 0.305164 |
| CPUCAP_VIP_1 | 0.500000 |
| PWR_V2_V1V8_9 | 0.711512 |
| PWR_V2_V1V8_23 | 0.103078 |
| PWR_V2_V1V8_25 | 0.050000 |
| MPU_CAP0 | 0.320156 |
| D21_RN1_VIP | 0.070711 |
| USBCP_USB0_DM_CPU_V1 | 0.475000 |
| USBCP_USB0_VBUS_CPU_V1 | 0.637377 |

**685 through / 264 non-through**, 949 total. Exactly nine barrels move; all
unselected vias, 1,527 normal pin-net assignments and component placements remain
unchanged. Two original Inner4 segments are replaced by deliberate 45° USB
routes at their original widths. The other 8,230 original centerlines survive;
there are 8,263 final segments. New short links retain the other original bodies.

Native rendering and all 686 connectivity entries pass, with no new enforced
findings. Independent Gerber/Excellon preserves 257/257 named groups, no detected
shorts or missing copper/drills, and 975 matched barrels. All 416 Ground
terminals remain in one actual post-drill group through 284 Ground barrels.
All 119 checked surface pours pass. Placement findings (5/15/3/1) and 86 sampled
sharp-turn traces remain inherited; the official style analyzer is unavailable.

The trial INT_CPU_V17_PAD_VIP move isolated C_IO2_1.pin2 on Ground; that site
remains unchanged. The explicit Inner5 MPU link avoids a dangling endpoint
observed in the initial trial. Two USB stub reversals are replaced by the shown
45° reroutes before publication.

Records four new optional plated-hole margin findings and 32 additional
reference-area findings on 29 traces totaling 1.863713 mm². Three Inner6 routes
remain unassessed. Timing/skew, impedance, via stubs, SI/PI and current capacity
remain unqualified. Mixed drill spans and `allowBlindAndBuriedVias` remain.
