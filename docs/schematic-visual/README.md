# Schematic visual review

Baseline: PR #70, `292cd0fc0cb432626d11cb41357b5a362561144b`.
All 24 actual sheets were rendered and inspected, including UART debug and HDMI
source resistors. The previous lint report covered 22 sheets with findings.
The PNGs retain the actual sheet frame, so fit-to-sheet problems stay visible.

## Power management

Status: full native Power management revision built and compared with #70. Every PCB record and the complete terminal/net connectivity partition match. Native placement on the full build: **0 findings**.

[Before](before/power-management.png) · [After](power/power-management.png)

The 700 × 1190 mm frame becomes default A4. The PMIC is central, capacitor
banks follow the existing supply rails, and the RTC/reset circuit is local.
Native explicit traces attach existing net names to schematic labels instead of
port-derived names. Native schematicbox projections clean display labels while
retaining the physical chip's original pin names, aliases, numbered selectors,
no-connect declarations and footprint mapping.

The original viewer's 24-warning badge is global: one non-default-sheet-size
warning on each of 24 sheets. Power management contributes **1 → 0**; this
increment leaves 23 on the untouched sheets. These are styling warnings, not
24 faults in the PMIC circuit.

[TSX renderer reproduction](reproductions/exposed-net-labels.tsx): removing the
`schDisplayLabel` props reproduces the exposed-net naming fallback. No library
patch or hand-authored Circuit JSON is used. The native traces replace the connections prop in the same order. Local paths include a nearby terminal already on the same named net; the original net remains in each path.

## Metrics

The sheet manifests report net-label share as labels / (component symbols + native routed wires + labels). Ports, pin text, reference/value text and sheet frames do not inflate this denominator. Fill is the content bounding-box area / sheet area; label widths are estimated from text length, so this is a layout metric rather than ink coverage. Native per-sheet styling warnings are listed individually.

## Verification

`tsci build index.tsx` and the native schematic placement
check; all 35 `pcb_*`/`source_*` types are fingerprinted by
`scripts/schematic-lint-evidence.tsx` against a fresh #70 build, retained locally
as `work/schematic-visual/pr70.circuit.json`. Every complete PCB array must match,
including IDs, traces, pads, holes, vias, positions, copper pours and net bindings.
Source components, ports, nets and internal connections must match. Native source traces retain their IDs/order and named net membership; local paths additionally mention terminals already on that net. The complete electrical partition of every numbered terminal and every scoped net must match, so those redundant path endpoints cannot introduce or remove a connection.

The pre-existing comparator normalizes stock-symbol polarity synonyms and
excludes supplier fetch diagnostics and the edited TSX metadata hash. This
increment additionally normalizes only the transient `chip#<instance counter>`
inside missing-MPN warning messages; warning counts, component IDs and the rest
of those warnings remain compared. It does not exempt any geometry or
connectivity record.

Render again with:

```sh
bun scripts/schematic-visual-evidence.tsx dist/index/circuit.json work/schematic-visual/current
bun scripts/schematic-lint-evidence.tsx work/schematic-visual/check work/schematic-visual/pr70.circuit.json
```

Power management metrics: labels **59.9% → 42.0%**; sheet **700×1190 → 297×210 mm**; content bounding-box fill **50.9% → 78.8%**; sheet warnings **1 → 0**. [Detailed receipt](power/sheets.json).

Two RTC bypass capacitors gain the core’s inferred default `max_decoupling_trace_length: 1` when native local paths make their existing decoupling relationship explicit. This source constraint is recorded in [the delta receipt](power/inferred-capacitor-constraints.json); the comparator accepts only newly inferred value 1 and retains all other source component fields. It changes no terminal/net connectivity or PCB record.
