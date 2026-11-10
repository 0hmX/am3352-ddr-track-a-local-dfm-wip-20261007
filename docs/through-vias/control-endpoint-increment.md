# Local control and left-side ground through vias

Ports 11 affected mounted JSON-backed local-control routes into native TSX traces
with 15 explicit through barrels. Ports ten microSD/debug ground-pad via
definitions into literal native TSX. No new-module route-data imports or JSON
route edits/additions. The two off-pad input-fault transitions are left unchanged;
the endpoint method requires an actual pad-centered transition. Previously
rejected ground moves remain excluded.

[Complete inventory and validation](control-endpoint-validation.json): **609
through / 601 non-through** (592 snapshot shorts + nine clearance-only;
13 pour-only / 588 involving other copper). All 686 native connectivity entries
remain connected, without render errors, shorts, lost nets or new enforced
clearance findings. All 1,527 original pin-net assignments, component placements,
via positions/nets/diameters and 8,107 complete nonzero centerline segments remain
unchanged. Two zero-length endpoint shapes disappear inside pads/barrels;
the raw shape hash therefore changes. Inherited native spacing findings remain.

Independent exported Gerber/Excellon parsing and actual post-drill ground and
reference coverage are retained in the report. Mixed drill spans and unqualified
SI/PI/current capacity remain; `allowBlindAndBuriedVias` stays enabled.

Exported connectivity passes for 257/257 named groups, with zero shorts or missing
copper/drills and 1,236 barrel records matched. All 416 component GND terminals
remain in one post-drill group. Five optional plated-hole margins and five
additional trace/reference-layer uncovered-area pairs (five traces,
0.088777600 mm²) are recorded. Three Inner6 routes remain unassessed by the
reference policy; these checks do not establish fabrication or SI release.
