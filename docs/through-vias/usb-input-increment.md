# USB and input-fault through vias

Ports five affected USB/input-power via definitions into literal native TSX.
Ports the affected JSON-backed input-fault path into three native traces and two
explicit through barrels, retaining its original off-pad top-layer escape stubs
and Inner4 body. No route-data JSON edits/additions or imports in the new modules.
No new physical signal transition is added.

[Complete inventory and validation](usb-input-validation.json): **616 through /
594 non-through** (585 snapshot shorts + nine clearance-only; six pour-only /
588 involving other copper). All 686 native connectivity entries remain
connected, with no render errors, shorts, lost nets or new enforced clearance
findings. Native inherited spacing findings remain. All trace copper shapes,
1,527 original pin-net assignments, placements and via positions/nets/diameters
remain unchanged. Six native TSX tests / 35 assertions pass.

Splitting a physical trace changes its source names, so reference comparison now
supports `--match-net-layers`: subtract the union of previously uncovered areas
on the same net, signal layer and reference layer. This prevents relabeling an
existing top escape from counting its old gaps as new cuts. Default trace-name
mode remains available for reproducing earlier analyses. Newly split rows and
current uncovered areas are still reported; no existing gap is waived.

Mixed drill spans remain, and `allowBlindAndBuriedVias` stays enabled. These
checks do not establish SI/PI/current capacity or fabrication release.

Independent Gerber/Excellon parsing passes for 257/257 named groups, with zero
shorts or missing copper/drills and 1,236 barrel records matched. All 416 component
GND terminals remain in one post-drill group. No new supplemental clearance
findings. Spatial reference comparison records two additional uncovered-area
pairs (two traces, 0.218567977 mm²); three Inner6 routes remain unassessed.
