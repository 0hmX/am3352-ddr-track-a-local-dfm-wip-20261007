# Interface passive increment

Native lint **114 → 0**, completing **372 → 0** overall. All 52 box findings
and all 320 passive-placement findings are resolved; no issues are waived.

The five interface sheets account for 98 two-pin orientations, 12 bypass banks,
three chip-adjacent resistors and one long USB CC return path. CC1/CC2 resistors
now sit beside the corresponding USB connector pins, HDMI ENTEST/REXT pull-downs
sit beside their transmitter pins, and the Ethernet ramp timing capacitor stays
beside its CT pin. Power capacitor banks are compact and staggered. Ethernet's
page is taller to contain its bank, and HDMI power banks fit between
the existing columns inside the original page frame.

## Stock generic-box rotation limitation

The six ferrites are represented by generic `chip` boxes. In the pinned core,
`schRotation=-90` changes `schematic_component.rotation` but leaves their
schematic pin geometry/facing horizontal. Native lint therefore repeats the
same -90 degree suggestion. The board uses explicit top/bottom pin arrangements,
width 0.6 and height 0.6 instead; numbered pins/connections are preserved.

[Minimal native TSX reproduction](reproductions/rotated-generic-box.tsx) ·
[Actual reproduction lint output](reproductions/rotated-generic-box-lint.txt)

No tscircuit dependency, implementation, or lint rule is patched or suppressed.
The earlier capacitor polarity-alias inconsistency is also recorded in native
[TSX](reproductions/rotated-capacitor-aliases.tsx).

## Verification

- `tsci check schematic-placement index.tsx`: **zero findings**, empty native output.
- `tsci build index.tsx`: passed.
- Evidence script against main `6647689`: passed; **every complete `pcb_*` array is exact**.
- An independent Python comparison reparses both builds and compares every PCB
  field, source component, net, trace, internal connection, group, manually placed
  via and numbered port. Only stock-symbol polarity synonyms/order are normalized
  in `source_port.port_hints`; every other source field is compared.
- Supplier warning randomness and the edited-TSX metadata hash are non-electrical
  exclusions. The raw alias deltas are committed for review.
- Every emitted schematic component body is inside its declared sheet boundary.

[Native final lint](final-lint.txt) · [Independent verification](final-verification.json) ·
[Fingerprints](interfaces/pcb-source-fingerprints.json) · [Alias deltas](interfaces/symbol-alias-changes.json)

| Sheet | Before | After |
| --- | --- | --- |
| Ethernet and RGB expansion | [before](interfaces/before/ethernet-and-rgb-expansion.svg) | [after](interfaces/ethernet-and-rgb-expansion.svg) |
| microSD | [before](interfaces/before/microsd.svg) | [after](interfaces/microsd.svg) |
| USB programming | [before](interfaces/before/usb-programming.svg) | [after](interfaces/usb-programming.svg) |
| HDMI transmitter and protection | [before](interfaces/before/hdmi-transmitter-and-protection.svg) | [after](interfaces/hdmi-transmitter-and-protection.svg) |
| HDMI power | [before](interfaces/before/hdmi-power.svg) | [after](interfaces/hdmi-power.svg) |

## Draft stack

| Increment | Native lint |
| --- | ---: |
| #66 baseline record | 372 → 372 |
| #67 schematic boxes | 372 → 320 |
| #68 CPU and DDR passives | 320 → 210 |
| #69 power, boot and debug | 210 → 114 |
| Interface passives (this increment) | 114 → 0 |

The initial task's 375/323 totals were arithmetic overcounts: the saved and
fresh outputs contain 372/320. The PCB remains the same routing WIP; this
schematic lint pass adds no fabrication or SI qualification. No PR is merged.
