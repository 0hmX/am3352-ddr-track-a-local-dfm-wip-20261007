# HDMI signal endpoint through vias

Ports 19 affected mounted JSON-backed routes into literal native TSX traces and
28 explicit pad-centered through barrels. No route-data JSON edits/additions or
imports in the new module. Signal layers and normal pin connections are retained
through explicit matched inner ports.

[Complete inventory and validation](hdmi-endpoint-validation.json): **584 through /
626 non-through** (617 snapshot shorts + nine clearance-only; 38 pour-only /
588 involving other copper). Native render has zero errors; all 686 connectivity
entries remain connected, without shorts or new enforced clearance findings.
Original pin-net assignments, placements and via positions/nets/diameters remain
unchanged. Inherited spacing findings remain visible.

All 8,107 nonzero trace centerline segments, including wire-to-via joins, retain
their coordinates, layers and widths at 1e-8 mm rounding. The simpler wire-only
comparison counts eleven existing joins as new adjacent wire records when their
via markers are replaced with explicit barrels. Two zero-length endpoint shapes
also disappear inside existing pads/barrels; the raw shape hash changes. No
HDMI timing or impedance qualification is inferred from these comparisons.

The read-only `scripts/compare-trace-centerlines.tsx` reproduces the complete
centerline comparison and exits nonzero on any changed or missing trace body.
Independent exported parsing passes: 257/257 named groups connected, zero shorts
or missing copper/drills, 1,236 barrel records matched. Post-drill GND connects all
416 component terminals in one group. Three optional plated-hole margins and 13
additional reference-area pairs (13 traces, 0.160741472 mm²) are recorded; three
Inner6 routes remain unassessed. Mixed drill spans remain, and
`allowBlindAndBuriedVias` stays enabled. SI/PI and fabrication release remain
unqualified.
