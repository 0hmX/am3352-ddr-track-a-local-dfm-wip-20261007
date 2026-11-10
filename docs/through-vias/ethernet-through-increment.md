# Ethernet endpoint and supply through vias

Ports 24 affected mounted JSON-backed signal routes into literal native `<trace>`
TSX, with 34 explicit pad-centered Top..Bottom `<via>` barrels. Separately ports
15 affected supply-via definitions into native TSX. New modules import no route
data, and original JSON files remain unchanged. Explicit inner ports retain
signal-layer selection and normal SMT pin connections.

[Complete inventory and validation](ethernet-through-validation.json): **556
through / 654 non-through** (645 snapshot shorts + nine clearance-only;
66 pour-only / 588 involving other copper). All 686 native connectivity entries
remain connected, with zero render errors, shorts, newly disconnected nets or
new enforced clearance findings. Inherited native spacing findings remain.

All 8,095 nonzero wire segments, 1,527 original component-pin net assignments,
component placements and via positions/nets/diameters are unchanged. Six zero-
length endpoint copper primitives disappear inside existing pads/barrels; the
raw shape hash therefore changes. Six TSX tests / 35 assertions pass.
Independent exported Gerber/Excellon parsing and actual post-drill GND checks
are retained in the validation report, including exact reference-coverage deltas.

Mixed drill spans, reference gaps, inherited clearance findings, and unqualified
SI/PI/current capacity remain. `allowBlindAndBuriedVias` remains enabled.

Exported connectivity: 257/257 named groups connected; zero shorts or missing
copper/drills; 1,236 barrel records matched. All 416 component GND terminals remain
in one post-drill group. Five additional optional plated-hole margin findings
and ten additional trace/reference-layer uncovered-area pairs (ten traces,
0.220329497 mm²) are recorded. Three Inner6 routes remain unassessed by the
existing reference policy; these results are not HDMI/DDR SI qualification.
