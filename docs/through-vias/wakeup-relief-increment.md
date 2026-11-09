# Wakeup relief for DDR support and ground through vias

Ports the mounted JSON-backed EXT_WAKEUP path into literal native TSX. Bounded
0.025 mm top-layer detours around five selected future columns preserve the
normal terminal connections. Converts five affected mounted via definitions into
native TSX through barrels: DDR VTP/ZQ/VREF support, one DDR ground-pad feed and
an MPU ground return. New modules import no route data; original JSON is unchanged.
The screen uses current copper and these selected columns; it does not establish
a route for all future board columns.

[Complete inventory and validation](wakeup-relief-validation.json): **633 through /
575 non-through** (566 snapshot shorts + nine clearance-only; one pour-only /
574 involving other copper). All 686 native connectivity entries remain
connected, without render errors, shorts, lost nets or new enforced clearance
findings. Five optional plated-hole margins remain visible. All original pin-net
assignments, placements and via positions/nets/diameters are unchanged. Only the
wakeup wire changes nonzero geometry: 63.085143 to 63.585061 mm planar length.
Placement findings and 86 sampled sharp-turn traces remain inherited; changed
wakeup geometry uses straight/45-degree turns. Official style analysis remains
unavailable.

Independent exported Gerber/Excellon parsing passes for 257/257 named groups,
zero shorts/missing copper/drills, and 1,234 barrel records matched. Actual
post-drill GND connects all 416 component terminals in one group. Spatial
reference comparison records four additional uncovered-area pairs across three
traces (0.137679363 mm²); three Inner6 routes remain unassessed. Mixed drill spans
remain, and `allowBlindAndBuriedVias` stays enabled. No SI/PI/current-capacity or
fabrication qualification is inferred.
