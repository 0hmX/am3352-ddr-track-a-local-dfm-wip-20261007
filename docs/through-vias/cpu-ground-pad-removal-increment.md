# Remove four redundant CPU-area ground pad vias

Removes four blind ground-pad barrels at their native TSX source. Each land is
entirely inside its GND SMT pad and shares an actual post-drill surface copper
island with a through GND barrel 0.304–0.480 mm away. No trace or pour selectors
reference these via names. Null array slots preserve all subsequent via names;
no JSON data changes. The affected terminals are U1.J11, C_VDD_CORE_7.pin2,
C_VDDA1P8V_USB1.pin2 and the SoC DDR decoupler C_SOC_DDR_B0.pin2.

[Inventory and verification](cpu-ground-pad-removal-validation.json): **636 through /
568 non-through**, 1,204 total vias (559 snapshot conversion shorts + nine
clearance-only; one pour-only / 567 involving other copper). Native render passes;
686/686 connectivity entries remain connected. No shorts, lost nets, new enforced
clearance findings or additional optional drill-margin findings. All 1,527 pin-net
assignments and all placements are unchanged. Trace copper and all 8,116 nonzero
centerline segments, including via joins, remain identical. All retained via
positions, nets, diameters and spans are unchanged. Six focused tests / 35 assertions pass.

Independent exported Gerber/Excellon parsing passes for 257/257 named groups,
zero shorts/missing copper/drills, and 1,230 barrel records matched. Actual
post-drill GND connects all 416 component terminals in one group through 527
matched ground barrels. Reference comparison finds no additional uncovered area.
These are verified DC redundancy removals; local current-return distribution,
SI/PI and current capacity remain unqualified. Mixed spans and
`allowBlindAndBuriedVias` remain.
