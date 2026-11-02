# Routing checkpoint: 245 of 251 nets

SYSBOOT6 now connects the CPU, original pull-down and original resistor array through three real pad-centered terminal vias. Its Inner5 branches are 8.227691 mm and 2.537056 mm at 0.100 mm width. No component moves or logical channel changes. HSYNC gains 0.141421 mm locally to avoid the new CPU via's reference opening.

The obstructing 0.300 mm Inner5 V1V8 R41 tie is replaced by a 0.300 mm, 11.624374 mm Inner4 tie using the existing C_PWR12_B barrel and a new 0.15/0.30 mm Bottom-to-Inner4 barrel centered on C_SRAM_MPU_0. This topology is accepted as routing WIP with explicit power limitations: the new barrel feeds 38 pads including 16 CPU pins, and the existing bulk-capacitor barrel feeds 39. Oscillator supply-path barrel sites increase from four to nine, retaining a 0.15 mm branch. Current capacity and transient equivalence are not established.

Fresh native regression exits 0 against 3278cc5. Direct production bytes match the validated candidate. Independent Gerber/Excellon checks show 245 connected nets, no prior connection loss, no shorts and no missing pin/barrel/drill copper. Whole-board post-drill comparison finds no new reference cuts; all 393 GND pins remain connected. V1V8, V3V3 and DDR_1V5 retain 50, 101 and 68 connected terminals. Official trace lint reports zero issues. Twenty-three inherited projected via warnings, two connector overhangs and 15 missing courtyards remain.

All 46 DDR route bodies, lengths, layers, widths and 68 centered signal vias remain unchanged, with at most two per route. Ten DDR reference-area cases remain. The power tie's raw reference margin is 0.009999585 mm, not a strict 0.010 mm pass.

Six nets remain: HDMI_D0/D8/D11/D15, SYSBOOT2 and SYSBOOT10. SYSBOOT10's staged proposal is excluded. Three signal midpoints, nine off-pad power joins, capacitor-barrel dependencies, RGB timing and fabrication limitations remain. See the [TODO](routing-todo.md) and [validation summary](routing-245-validation.json).

Runtime source matches local checkpoint `1e510ebc2cd7ab2c717df2535519618d9f1ce30b`; publication has separate lineage. Native SHA256: `d7e6fa332016d35d2097d6193dc486b28fcfb1830e6d159ce4d7b6b57923389e`. Keep the PR draft; no SI/PI, ampacity, timing, boot or fabrication signoff.
