# Board surface Ground replaces nine blind pad vias

Adds native Top/Bottom Ground fills with 0.11 mm clearance and a 0.5 mm board-edge
inset, retaining the existing local fills. Removes nine checked native Ground
pad barrels: 55, 207, 230, 239, 241, 264, 266, 270 and 331. Null placeholders keep
the computed names stable. All route/via changes are TSX; no route JSON edits,
additions or imports. All placements and all trace copper remain unchanged.

[Actual native surface geometry](board-ground-pad-removal.svg) ·
[removal inventory and complete validation](board-ground-pad-removal-validation.json).

**714 through / 226 non-through**, 940 total. Every remaining snapshot conversion
conflicts with non-pour copper. Exactly nine Ground barrels disappear; all other
via positions, nets, diameters and spans remain unchanged. All 1,527 normal
pin-net assignments, placements and 8,301 trace centerlines remain unchanged.

The prior prototype checked actual post-drill surface islands with a conservative
0.1 mm neck model before selecting the nine sites. The final source is rebuilt
and all native/exported connectivity is independently recomputed after removal.
All 686 native connectivity entries and 257/257 exported named groups pass,
with no detected shorts or missing copper/drills and 966 matched barrels.
All 416 Ground terminals remain in one actual post-drill group through 275
Ground barrels. Surface copper clearance passes.

No new enforced findings, optional plated-hole margin findings or reference-area
cuts. The same three Inner6 routes remain unassessed. Placement findings
(5/15/3/1) and 86 sampled sharp-turn traces remain inherited; the official style
analyzer is unavailable. Timing/skew, impedance, via stubs, SI/PI and current
capacity remain unqualified. Mixed drill spans and `allowBlindAndBuriedVias` remain.
