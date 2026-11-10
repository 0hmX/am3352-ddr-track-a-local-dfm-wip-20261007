# Power, boot and debug passive increment

Native lint **210 → 114**; all **96** findings on the five changed sheets are
resolved. Earlier box and CPU/DDR fixes remain clean.

The PMIC's four inductors and DC34 select resistor sit beside their actual chip
pins. The USB-C input/control/eFuse symbols form a local network with nearby
current-limit, supply-divider and decoupling parts; native label-clearance
suggestions are applied together, with more space for the enable branch and
VCCD capacitor. Rail-connected passives face toward power/ground, and bypass
capacitors are grouped by supply. Debug status has three explicit rotations.

Validation: native `tsci check schematic-placement index.tsx`,
`tsci build index.tsx`, and the evidence script against main `6647689`.
Every PCB array is exact, including all 940 vias, 747 traces, 1,505 SMT pads,
26 plated holes, component positions and copper pours. Source nets, traces,
internal connections and numbered ports/connectivity match. Only the already
recorded stock-symbol polarity synonyms, supplier diagnostics, and TSX metadata
hash are normalized/excluded; no physical geometry is changed.

[After lint](power-boot-lint.txt) · [Fingerprints](power-boot/pcb-source-fingerprints.json)

| Sheet | Before | After |
| --- | --- | --- |
| Power management | [before](power-boot/before/power-management.svg) | [after](power-boot/power-management.svg) |
| Power input | [before](power-boot/before/power-input.svg) | [after](power-boot/power-input.svg) |
| Boot and clock | [before](power-boot/before/boot-and-clock.svg) | [after](power-boot/boot-and-clock.svg) |
| Debug and reset | [before](power-boot/before/debug-and-reset.svg) | [after](power-boot/debug-and-reset.svg) |
| Debug rails and power status | [before](power-boot/before/debug-rails-and-power-status.svg) | [after](power-boot/debug-rails-and-power-status.svg) |

The remaining 114 findings belong to Ethernet, microSD, USB programming, and
HDMI sheets and are handled in the next stacked increment.
