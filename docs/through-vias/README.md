# Standard through-via conversion inventory

Native `index.tsx`, source commit `dcef92b`; locked dependencies installed with
`bun install --frozen-lockfile`. Fresh native render: 20,129 records, 112.7 seconds,
zero render errors. This is routing WIP, not a fabrication release or SI/PI signoff.

The [inventory](baseline-inventory.json) contains **every one of 1,070 non-through
vias**, its net, position, original/added layers, and every conflicting other-net
trace/via/SMT pad/PTH/pour on newly spanned layers. There are 1,210 vias total;
140 are already through. Converting in place would short 1,041 vias; 11 more
violate clearance only. **18 are conflict-free**, including a batch pair check.
450 blocked conversions conflict only with emitted pour copper; 602 also
conflict with other copper. Frozen planes do not automatically grow antipads.

[Visual via map](baseline-conflicts.svg): red = physical short on extension,
amber = clearance violation, green = no current conflict. Hover for via/net IDs.
The map shows conversion candidates, not existing board shorts.

```sh
bun test tests/through-vias.test.tsx
# Native TSX render + inventory; or --json to reuse an unmodified native export:
bun scripts/check-through-vias.ts --output work/through-vias/inventory
bun scripts/check-through-vias.ts --json work/through-vias/inventory/board.circuit.json --output work/through-vias/recheck
# Fails until all physical via spans reach both outside layers:
bun scripts/check-through-vias.ts --json work/through-vias/inventory/board.circuit.json --require-through
bun scripts/verify-board-routing.tsx --json work/through-vias/inventory/board.circuit.json --absolute --output work/through-vias/native
```

Clearance: 0.1 mm copper-to-trace and copper-to-pad/via/pour, from the actual board
rules. Short and clearance classifications are separate. Same-net copper is
exempt. The shared installed-check geometry preserves rotated pad outlines,
full layer spans, trace widths, and pour inner rings. Native TSX fixtures cover
trace crossings, same-net contact, buried-via/SMT shorts, pour interiors/cutouts,
near misses, and simultaneous extensions. Unknown geometry/layers fail closed.

The source pour's requested clearance is not serialized. This inventory applies
the board copper clearance to the emitted geometry; it does not repour. Existing
layer defects, board edges, NPTHs, and drill spacing require the existing native
and supplemental checks after any edit. No SI/PI, timing or current-capacity
qualification is implied.

[Baseline validation](baseline-validation.json): 686/686 connectivity entries
connected (251 distinct named nets), zero shorted nets, zero physical different-net
contacts. Absolute native checks retain **20 different-net + 3 same-net via-spacing
findings**; all other recorded native/supplemental checks are clear. Absolute
verification exits 1 for those inherited findings. Follow-up changes must preserve
all connections and introduce no additional findings.
