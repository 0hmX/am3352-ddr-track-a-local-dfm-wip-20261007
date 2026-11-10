# Schematic placement lint

Baseline: `main` at `6647689bdae3266971dbd1816e4632d00f0c69c7`.

The saved and freshly executed `tsci check schematic-placement index.tsx` outputs
contain **372 findings on 22 sheets**: 52 box findings and 320 passive-placement
findings (the initial task's 375/323 totals were arithmetic overcounts).
The command exits successfully even when it reports findings.

| Rule | Baseline |
| --- | ---: |
| GenericSchematicBoxTooWide | 15 |
| SchematicPinPaddingToEdgeTooLarge | 16 |
| SchematicBoxInnerLabelOutOfBounds | 5 |
| SchematicBoxInnerLabelCollision | 16 |
| TwoPinComponentShouldBeVertical | 280 |
| DecouplingCapacitorsNotCloseTogether | 27 |
| InductorSeparatedFromChipPin | 3 |
| ResistorSeparatedFromChipPin | 5 |
| InductorSeparatedFromChipPins | 1 |
| RailPathTooSpreadOut | 3 |
| ResistorDividerSeparatedFromChip | 1 |

[Full native lint output](baseline.txt) · [Parsed findings](baseline-summary.json)

## Reproduce and verify

```sh
tsci check schematic-placement index.tsx > work/schematic-lint/current.txt
tsci build index.tsx
# Save main's build before changing any TSX:
cp dist/index/circuit.json work/schematic-lint/main.circuit.json
bun scripts/schematic-lint-evidence.tsx docs/schematic-lint/before
# After a schematic-only change and another tsci build:
bun scripts/schematic-lint-evidence.tsx docs/schematic-lint/after work/schematic-lint/main.circuit.json
```

The evidence script compares canonical SHA-256 hashes of **complete arrays for
all 35 `pcb_*` and `source_*` record types**, preserving record order and every
field, including IDs, pad/via/hole geometry, component positions, trace routes,
copper pours, net membership and source connectivity. It fails on any change.
[Main fingerprints](before/pcb-source-fingerprints.json) are committed; the 24 MB
native build stays in ignored `work/`. The baseline documentation PR changes no
board TSX: lint **372 → 372**, PCB/source fingerprints unchanged by construction.

Toolchain: global tscircuit CLI 0.1.2429, project `@tscircuit/core` 0.0.2287,
project `tscircuit` 0.0.3104; no dependency or lockfile changes.

## Baseline schematic snapshots

These SVGs are rendered from main's actual `tsci build` output with
`convertCircuitJsonToSchematicSvg`, one per sheet. For this documentation-only
increment, before and after are the same snapshot. Fix PRs add after snapshots.

- [CPU supplies](before/cpu-supplies.svg)
- [CPU DDR interface](before/cpu-ddr-interface.svg)
- [CPU video and I2C](before/cpu-video-and-i2c.svg)
- [CPU peripheral and boot pins](before/cpu-peripheral-and-boot-pins.svg)
- [CPU Ethernet and USB](before/cpu-ethernet-and-usb.svg)
- [DDR memory supplies](before/ddr-memory-supplies.svg)
- [DDR memory address and control](before/ddr-memory-address-and-control.svg)
- [DDR memory data](before/ddr-memory-data.svg)
- [Power management](before/power-management.svg)
- [microSD](before/microsd.svg)
- [Power input](before/power-input.svg)
- [Ethernet and RGB expansion](before/ethernet-and-rgb-expansion.svg)
- [Boot and clock](before/boot-and-clock.svg)
- [HDMI transmitter and protection](before/hdmi-transmitter-and-protection.svg)
- [CPU bypass](before/cpu-bypass.svg)
- [CPU power](before/cpu-power.svg)
- [DDR reference](before/ddr-reference.svg)
- [DDR bypass](before/ddr-bypass.svg)
- [Debug and reset](before/debug-and-reset.svg)
- [Debug rails and power status](before/debug-rails-and-power-status.svg)
- [HDMI power](before/hdmi-power.svg)
- [USB programming](before/usb-programming.svg)

This remains a routing WIP; unchanged PCB geometry is not fabrication or SI signoff.
