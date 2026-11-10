# Schematic visual evidence

Draft stack: [#71 Power management](https://github.com/0hmX/am3352-ddr-track-a-local-dfm-wip-20261007/pull/71), [#72 CPU/DDR and browser regression](https://github.com/0hmX/am3352-ddr-track-a-local-dfm-wip-20261007/pull/72). Baseline is PR #70, `292cd0f`. The design actually contains 24 sheets. Interface and HDMI work remains pending.

The [browser regression report](browser-duplicate-pin.md) identifies port 537, explains the TSX workaround, and links the six-capacitor reproduction. The unsafe CPU/DDR bus candidate is superseded. Power is 297×210 mm with a readable central PMIC, local supply groups and named rails. CPU/DDR symbols and passive banks use compact sheets; their bus topology is deliberately conservative until the renderer handles overlapping connection lists.

Counts below use the actual full board, not isolated previews. Net-label share is labels / (components + schematic traces + labels); ports, reference text and frames are excluded. Fill is the visible-content bounding rectangle / paper area, not ink coverage. Text bounds are estimates. The millimetre conversion is 10.16/1.1 per schematic unit; this corrects the earlier fill estimates without changing the baseline circuit.

Each non-A4 sheet receives a viewer styling warning because compact custom paper is intentional. CPU power also has renderer bounds warnings: the bounds utility treats horizontal power-label text as vertical; see [the TSX repro](reproductions/power-label-sheet-bounds.tsx). The viewer's badge totals warnings from all sheets, rather than counting just the selected Power sheet. Power itself has no schematic warnings. Other source/PCB diagnostics predate this visual work.

Shares above 50% on CPU/DDR signal sections are true inter-sheet terminals. Bypass/supply/reference shares above 50% are a documented limitation of the duplicate-pin workaround, and remain unfinished visual work. The independent CPU regulator outputs also naturally require separate power/ground labels. No auto-generated pin-name labels are introduced by the named connection helper.

| Sheet | PNGs | Net-label share | Paper mm | Bounding-box fill | Viewer warnings | Status |
| --- | --- | --- | --- | --- | --- | --- |
| CPU supplies | [before](before/cpu-supplies.png) · [after](cpu-ddr/cpu-supplies.png) | 81.5% → 76.7% | 700×500 → 270×210 | 21.4% → 45.5% | 1 → 1 | Power/CPU/DDR increment |
| CPU DDR interface | [before](before/cpu-ddr-interface.png) · [after](cpu-ddr/cpu-ddr-interface.png) | 96.1% → 96.1% | 700×500 → 230×110 | 7.2% → 39.4% | 1 → 1 | Power/CPU/DDR increment |
| CPU video and I2C | [before](before/cpu-video-and-i2c.png) · [after](cpu-ddr/cpu-video-and-i2c.png) | 97.0% → 97.0% | 700×500 → 100×100 | 1.7% → 45.6% | 1 → 1 | Power/CPU/DDR increment |
| CPU peripheral and boot pins | [before](before/cpu-peripheral-and-boot-pins.png) · [after](cpu-ddr/cpu-peripheral-and-boot-pins.png) | 91.9% → 91.9% | 700×500 → 270×210 | 23.1% → 44.2% | 1 → 1 | Power/CPU/DDR increment |
| CPU Ethernet and USB | [before](before/cpu-ethernet-and-usb.png) · [after](cpu-ddr/cpu-ethernet-and-usb.png) | 78.6% → 78.6% | 700×500 → 100×100 | 1.6% → 42.1% | 1 → 1 | Power/CPU/DDR increment |
| DDR memory supplies | [before](before/ddr-memory-supplies.png) · [after](cpu-ddr/ddr-memory-supplies.png) | 95.3% → 95.3% | 700×500 → 210×110 | 6.6% → 37.9% | 1 → 1 | Power/CPU/DDR increment |
| DDR memory address and control | [before](before/ddr-memory-address-and-control.png) · [after](cpu-ddr/ddr-memory-address-and-control.png) | 93.3% → 93.3% | 700×500 → 160×110 | 6.7% → 39.3% | 1 → 1 | Power/CPU/DDR increment |
| DDR memory data | [before](before/ddr-memory-data.png) · [after](cpu-ddr/ddr-memory-data.png) | 95.2% → 95.2% | 700×500 → 70×100 | 1.0% → 34.6% | 1 → 1 | Power/CPU/DDR increment |
| Power management | [before](before/power-management.png) · [after](cpu-ddr/power-management.png) | 59.9% → 46.4% | 700×1190 → 297×210 | 43.5% → 71.3% | 1 → 0 | Power/CPU/DDR increment |
| CPU bypass | [before](before/cpu-bypass.png) · [after](cpu-ddr/cpu-bypass.png) | 54.9% → 53.4% | 700×1460 → 230×170 | 5.1% → 63.3% | 1 → 1 | Power/CPU/DDR increment |
| CPU power | [before](before/cpu-power.png) · [after](cpu-ddr/cpu-power.png) | 54.5% → 54.5% | 700×500 → 120×30 | 0.6% → 26.7% | 1 → 3 | Power/CPU/DDR increment |
| DDR reference | [before](before/ddr-reference.png) · [after](cpu-ddr/ddr-reference.png) | 62.1% → 58.6% | 700×500 → 220×140 | 19.6% → 28.1% | 1 → 1 | Power/CPU/DDR increment |
| DDR bypass | [before](before/ddr-bypass.png) · [after](cpu-ddr/ddr-bypass.png) | 62.7% → 61.5% | 700×1010 → 200×110 | 1.4% → 45.1% | 1 → 1 | Power/CPU/DDR increment |
| Boot and clock | [before](before/boot-and-clock.png) · [after](cpu-ddr/boot-and-clock.png) | 57.3% → 57.3% | 700×740 → 700×740 | 33.9% → 33.9% | 1 → 1 | Pending visual pass |
| microSD | [before](before/microsd.png) · [after](cpu-ddr/microsd.png) | 62.8% → 62.8% | 700×500 → 700×500 | 21.1% → 21.1% | 1 → 1 | Pending visual pass |
| Power input | [before](before/power-input.png) · [after](cpu-ddr/power-input.png) | 54.2% → 54.2% | 700×650 → 700×650 | 5.4% → 5.4% | 1 → 1 | Pending visual pass |
| Debug and reset | [before](before/debug-and-reset.png) · [after](cpu-ddr/debug-and-reset.png) | 57.1% → 57.1% | 700×500 → 700×500 | 9.9% → 9.9% | 1 → 1 | Pending visual pass |
| UART debug | [before](before/uart-debug.png) · [after](cpu-ddr/uart-debug.png) | 50.0% → 50.0% | 700×500 → 700×500 | 0.4% → 0.4% | 1 → 1 | Pending visual pass |
| Ethernet and RGB expansion | [before](before/ethernet-and-rgb-expansion.png) · [after](cpu-ddr/ethernet-and-rgb-expansion.png) | 69.1% → 69.1% | 700×2200 → 700×2200 | 42.3% → 42.3% | 1 → 1 | Pending visual pass |
| USB programming | [before](before/usb-programming.png) · [after](cpu-ddr/usb-programming.png) | 61.5% → 61.5% | 700×500 → 700×500 | 3.0% → 3.0% | 1 → 1 | Pending visual pass |
| Debug rails and power status | [before](before/debug-rails-and-power-status.png) · [after](cpu-ddr/debug-rails-and-power-status.png) | 54.5% → 54.5% | 700×500 → 700×500 | 7.7% → 7.7% | 1 → 1 | Pending visual pass |
| HDMI source resistors | [before](before/hdmi-source-resistors.png) · [after](cpu-ddr/hdmi-source-resistors.png) | 88.9% → 88.9% | 700×500 → 700×500 | 14.8% → 14.8% | 1 → 1 | Pending visual pass |
| HDMI transmitter and protection | [before](before/hdmi-transmitter-and-protection.png) · [after](cpu-ddr/hdmi-transmitter-and-protection.png) | 80.4% → 80.4% | 700×800 → 700×800 | 40.1% → 40.1% | 1 → 1 | Pending visual pass |
| HDMI power | [before](before/hdmi-power.png) · [after](cpu-ddr/hdmi-power.png) | 59.2% → 59.2% | 700×1400 → 700×1400 | 30.9% → 30.9% | 1 → 1 | Pending visual pass |

Verification receipts under `cpu-ddr/` compare complete `pcb_*` arrays (every field, ID and order) with the fresh #70 build, and compare the electrical partition of every source terminal and scoped net. Only stock-symbol polarity hint synonyms, runtime warning counters, supplier fetch diagnostics and the TSX metadata hash are normalized or excluded; no PCB field is excluded. Any inferred capacitor constraint changes are recorded separately. The final build and exact CLI placement check are recorded in `cpu-ddr/verification.json`.
