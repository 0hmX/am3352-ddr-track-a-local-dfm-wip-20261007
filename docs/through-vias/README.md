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
connected (257 distinct source-net names in this native revision), zero shorted nets, zero physical different-net
contacts. Absolute native checks retain **20 different-net + 3 same-net via-spacing
findings**; all other recorded native/supplemental checks are clear. Absolute
verification exits 1 for those inherited findings. Follow-up changes must preserve
all connections and introduce no additional findings.

## First conversion: 18 barrels

[Converted via list](safe-converted-vias.json), [validation](safe-validation.json).
All 18 previously batch-safe vias are now through at their native mounted TSX/data
sources. Trace-emitted RTC_RESET_N and ETH_MDIO_ISO endpoint barrels are explicit
through-via primitives; their inner-layer ports retain the existing trace layers.
The installed Via constructor initializes ports before attachment and sees only a
two-layer board; explicit matched inner ports avoid losing those connections.
The focused native TSX tests cover this boundary.

Result: **158 through, 1,052 non-through, 1,052 blocked conversions** (1,041 shorts,
11 clearance-only; 450 pour-only, 602 involving other copper). Trace copper shapes,
all component placements including U1/U3, and all via coordinates/nets/diameters
match the baseline. Native continuity remains 686/686, zero shorts, zero new
enforced findings. Placement findings and trace geometry remain inherited.

One additional *informational* plated-drill margin is 0.175 mm versus the optional
0.2 mm screen; the configured 0.1 mm trace-to-via-copper rule passes. The board's
`minTraceToHoleEdgeClearance` applies to NPTH, not plated barrels.

Independent CLI Gerber export and reparse: 257/257 exported named-net groups
connected, zero shorts/missing pins/missing barrel copper/missing drills; 1,236
via/PTH records matched to exported drill geometry. Multiple drill spans remain.
The verifier now walks polygon arc edges directly and expands explicit G85 slots
into equivalent parser-only routing commands. The emitted files are unchanged;
arc/slot geometry fixtures exercise the compatibility path.

```sh
python3.11 -m venv work/through-vias/venv
work/through-vias/venv/bin/pip install gerbonara==1.5.0 shapely==2.2.0
# tsci -o must be absolute. This writes a ZIP even when the name lacks .zip.
./node_modules/.bin/tsci export work/through-vias/safe.circuit.json -f gerbers -o "$PWD/work/through-vias/safe-gerbers.zip"
# Extract into work/through-vias/native-safe/gerber; put the native JSON at
# work/through-vias/native-safe/board.circuit.json, then:
work/through-vias/venv/bin/python scripts/cloud-gerber-check.py work/through-vias/native-safe
```
