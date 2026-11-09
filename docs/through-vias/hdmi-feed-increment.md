# HDMI through-via increment

Ports 42 affected mounted via definitions into literal native TSX in
`StandardHdmiThroughVias.tsx`, including the definitions previously supplied by
JSON-backed route sets. The new module imports no route data; original JSON is
unchanged. Matched Inner1–Inner6 ports preserve adjoining native trace layers.
Bare intermediate vias retain their original trace-inferred net connections.

[Complete inventory and validation](hdmi-feed-validation.json): **507 through /
703 non-through** (694 snapshot shorts + nine clearance-only; 115 pour-only /
588 involving other copper). No render errors, lost physical connections, shorts
or new enforced native clearance findings. All 686 connectivity entries remain
connected. Twenty different-net and two same-net inherited via-spacing findings
remain; one additional optional plated-hole margin finding is recorded.

All trace copper, all 1,527 original component-pin net assignments, component
placements, and via positions/nets/diameters are unchanged. Six TSX tests / 35
assertions pass. Independent exported Gerber/Excellon parsing finds all 257 named
net groups connected, zero shorts or missing copper/drills, and 1,236 barrel
records matched. Actual post-drill GND connects all 416 component terminals.

Reference coverage has additional uncovered area on 12 trace/reference-layer
pairs (12 traces), totaling 0.245248939 mm²; exact bounds are retained. Three
Inner6 routes remain unassessed by the existing reference-layer policy. These
checks do not establish HDMI/DDR signal integrity or fabrication release. Mixed
drill spans remain, and `allowBlindAndBuriedVias` stays enabled pending their
removal.
