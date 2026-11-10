# Box placement increment

Stack: baseline #66 → box fixes. Native lint **372 → 320**, box rules **52 → 0**.
All 320 passive findings remain for the next sheet-group increments.

CPU/DDR projections now size each bank independently from its displayed pin labels
and actual pin count. The 16-pin banks use height 9.8; the shorter DDR banks use
5.6 and 2.0. A common component-wide U1/U3 size cannot satisfy every projection,
but native `schematicbox` width/height props can, so no lint suppression or
upstream change is necessary. Existing pin spacing and net/source-port identity
are preserved. Sixteen support/HDMI chips use widths just above the label
collision recommendations, with a small rounding margin.

Validation:

- `tsci check schematic-placement index.tsx`: **320 findings**, none of the four box rules.
- `tsci build index.tsx`: passed.
- `bun scripts/schematic-lint-evidence.tsx docs/schematic-lint/boxes work/schematic-lint/main.circuit.json`: passed.
- Every complete PCB array and electrical source array is identical to main,
  including 940 vias, 747 traces, 1,505 SMT pads, 26 plated holes, 1,152 PCB
  components, 362 pours, 686 source nets, and all 3,241 source traces/4,720 ports.
- The evidence tool excludes only supplier availability/fetch warnings and the
  TSX filesystem hash. Main had one transient HTTP 429 warning; the new build
  did not. No electrical fields, geometry, IDs, net membership, or route data
  are normalized or ignored.

[Native after lint](boxes-lint.txt) · [After fingerprints](boxes/pcb-source-fingerprints.json)

| Sheet | Before | After |
| --- | --- | --- |
| CPU supplies | [before](before/cpu-supplies.svg) | [after](boxes/cpu-supplies.svg) |
| CPU DDR interface | [before](before/cpu-ddr-interface.svg) | [after](boxes/cpu-ddr-interface.svg) |
| CPU video and I2C | [before](before/cpu-video-and-i2c.svg) | [after](boxes/cpu-video-and-i2c.svg) |
| CPU peripheral and boot pins | [before](before/cpu-peripheral-and-boot-pins.svg) | [after](boxes/cpu-peripheral-and-boot-pins.svg) |
| CPU Ethernet and USB | [before](before/cpu-ethernet-and-usb.svg) | [after](boxes/cpu-ethernet-and-usb.svg) |
| DDR memory supplies | [before](before/ddr-memory-supplies.svg) | [after](boxes/ddr-memory-supplies.svg) |
| DDR memory address and control | [before](before/ddr-memory-address-and-control.svg) | [after](boxes/ddr-memory-address-and-control.svg) |
| DDR memory data | [before](before/ddr-memory-data.svg) | [after](boxes/ddr-memory-data.svg) |
| Power management | [before](before/power-management.svg) | [after](boxes/power-management.svg) |
| Power input | [before](before/power-input.svg) | [after](boxes/power-input.svg) |
| Ethernet and RGB expansion | [before](before/ethernet-and-rgb-expansion.svg) | [after](boxes/ethernet-and-rgb-expansion.svg) |
| microSD | [before](before/microsd.svg) | [after](boxes/microsd.svg) |
| Boot and clock | [before](before/boot-and-clock.svg) | [after](boxes/boot-and-clock.svg) |
| HDMI transmitter and protection | [before](before/hdmi-transmitter-and-protection.svg) | [after](boxes/hdmi-transmitter-and-protection.svg) |

SVGs are complete native sheet renders and can be zoomed to inspect individual
pin labels. Source changes: three TSX files, seven lines added/two removed.
