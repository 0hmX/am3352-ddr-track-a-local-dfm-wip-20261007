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
conflict with other copper. The emitted snapshot does not include prospective antipads; native regeneration must be verified.

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
sources. The two affected ground returns formerly read from JSON are now literal
`<via>` elements in `CloudSclPullReturn.tsx` and `CloudI2cPullReturn.tsx`; their JSON
inputs are restored unchanged. All via/route implementation changes are TSX-only.
Trace-emitted RTC_RESET_N and ETH_MDIO_ISO endpoint barrels are explicit
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

## Processor/DDR ground-pad increment: 32 barrels

[Source inventory](ground-converted-vias.json), [validation](ground-validation.json).
Extends 14 processor and 18 DDR ground-pad vias to Top..Bottom in the mounted
`CloudPowerRoutes` source. Positions and all component placements stay fixed.
These candidates previously collided only with emitted pour copper. The native
pour solver regenerates antipads around the extended barrels; a native TSX
fixture checks this behavior. The inventory checks an emitted snapshot and does
not assume those prospective antipads exist.

Result: **190 through, 1,020 non-through, 1,020 blocked conversions**: 1,008 would
short the current snapshot and 12 violate clearance only; 418 are pour-only and
602 involve other copper. Native connectivity is still 686/686, zero physical
shorts, zero new enforced findings. Trace copper geometry, via coordinates,
net assignments and drill diameters are unchanged. The inherited 20+3 via-spacing
findings and placement/style findings remain visible. Three additional optional
plated-drill margins are 0.1952, 0.1888 and 0.1790 mm; configured copper clearance
passes. SI/PI, reference-area coverage and current capacity remain unqualified.

Independent Gerber/Excellon reparse for this increment also passes: 257/257 named-net
groups connected, zero shorts or missing copper/drills, 1,236 barrel records matched.

## Ethernet increment: 38 barrels

[Source changes and bounded screen](ethernet-increment.md),
[validation](ethernet-validation.json). Native TSX extends 35 Ethernet ground-pad
barrels and nudges three ground stitches by 0.10–0.3042 mm. No route-data JSON
changes. Result: **228 through / 982 non-through**, all 686 native connectivity
entries connected, no physical shorts or new enforced findings. Trace copper and
all component placements stay unchanged. Independent Gerber/Excellon verification
also passes: 257/257 named-net groups connected; no shorts or missing copper/drills.
Nine other Ethernet stitches had no valid sampled move within 0.4 mm; their
original copper is retained. This local screen does not establish impossibility.

## HDMI ground-pad increment: 29 barrels

[Source inventory and changes](hdmi-increment.md), [validation](hdmi-validation.json).
Native TSX converts 29 HDMI ground-pad vias and removes obsolete inner-span
mapper code. No component/trace/via-position changes or route-data JSON edits.
**257 through / 953 non-through** remain, with all 686 native connectivity entries
connected and no new findings. Independent Gerber/Excellon reparse passes:
257/257 named-net groups connected, no shorts or missing copper/drills.

## Power-area increment: 37 barrels

[Source inventory and changes](power-increment.md), [validation](power-validation.json).
Native TSX converts 31 power-area ground-pad vias and six VDD_CORE barrels, with
explicit Inner5 ports preserving existing traces. **294 through / 916 non-through**.
All native connectivity entries remain connected, no physical shorts or new
enforced findings; independent Gerber connectivity also passes. Five additional
optional plated-drill margin findings are recorded. Placements, trace copper,
via positions/nets/diameters and all JSON route data remain unchanged.

## DDR-supply increment: 39 barrels

[Source inventory](ddr-supply-increment.md), [validation](ddr-supply-validation.json).
Native TSX converts 39 DDR_1V5 supply barrels, exposing matched inner-layer ports
for the existing traces. **333 through / 877 non-through** remain. All 686 native
connectivity entries and all 257 exported named-net groups remain connected, no
physical shorts or new enforced findings. One optional plated-drill margin is
recorded. Trace copper, placements and via positions/nets/diameters are unchanged.

## DDR signal endpoints: 20 barrels

[Native TSX port and source inventory](ddr-endpoint-increment.md),
[validation](ddr-endpoint-validation.json). Sixteen affected DDR paths now live as
literal TSX traces; 20 pad-centered barrels become explicit through vias with
matched inner ports. **353 through / 857 non-through** remain. All 1,527 original
component-pin net assignments and all nonzero wire segments are preserved.
Native and independent exported-copper continuity pass, no new enforced findings;
one optional plated-drill margin is recorded. CPU/DDR placement stays fixed.

## DDR clock/A7 relief: three barrels

[Native bottom-copper comparison and source changes](ddr-clock-relief-increment.md),
[validation](ddr-clock-relief-validation.json). Ports BA0 into literal TSX and
reshapes its meanders, compensating the original XY length, so CK/CKn/A7 CPU
barrels become through. **356 through / 854 non-through** remain. Native and
independent exported-copper checks pass with no new findings; all original
component-pin net assignments and placements are retained. Other signal wire
geometry is unchanged. The nearby ground-return region still needs work.

## 3.3 V distribution: 54 barrels

[Native source cleanup](v3-feed-increment.md), [validation](v3-feed-validation.json).
Converts 54 V3V3 distribution vias and removes obsolete via-placement/span overrides.
**410 through / 800 non-through** remain. All original pin-net assignments,
placements, trace copper and via positions/nets/diameters are preserved. Native
and independent exported-copper checks pass with no new enforced findings;
two optional plated-drill margin findings are recorded. No route-data JSON edits.

## Post-drill reference and validator reproduction

[Audit and actual-TSX reproductions](postdrill-reference-check.md). The published
board stays **410 through / 800 non-through**. Cumulative emitted reference
comparison finds additional uncovered area in 29 trace/reference-layer pairs
across 25 traces, including six DDR paths; three Inner6 routes are unassessed.
Post-drill GND connectivity passes for all 416 component terminals. A separate
native reproduction exposes the routing verifier's false-success exit on a lost
physical connection; the next stacked fix must reject that condition.

## CPU/control ground relief: nine barrels

[Native source and bounded screen](control-ground-increment.md),
[validation](control-ground-validation.json). Nine GND stitches become through
with small moves; the two candidates that split V3V3 pour pieces are excluded.
**419 through / 791 non-through** remain. Native and exported connectivity pass,
including all 416 component GND terminals after actual drilling. No new enforced
clearance findings; optional plated-drill margins and the small additional
PMIC_PGOOD reference gap remain visible. The routing verifier now exits 1 on lost
physical connectivity, as covered by the native TSX reproduction.

## CPU/PMIC support: 46 barrels

[Literal native TSX port](cpu-pmic-feed-increment.md),
[validation](cpu-pmic-feed-validation.json). Converts 46 supply/support barrels,
preserving inner-port references. **465 through / 745 non-through** remain.
Native and exported connectivity/clearance pass with no new native/supplemental
findings; all trace copper, original pin-net assignments, placements and via
positions/nets/diameters are unchanged. Additional reference area on 13 traces,
including DDR_A12/A9, remains visible in the report.
