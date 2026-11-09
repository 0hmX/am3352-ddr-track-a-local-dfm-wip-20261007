# SD clock relief for three through vias

Ports the mounted JSON-backed SD clock path into literal native TSX. Bounded
bottom-layer detours clear three selected columns; two sections that could not
be routed within the local search remain unchanged. Original endpoint through
markers, normal connections and JSON files are preserved. Three native via
definitions become through barrels: one V3V3 feed and two ground-pad feeds.
New modules import no route data.

[Complete inventory and validation](sd-clock-relief-validation.json): **636 through /
572 non-through** (563 snapshot shorts + nine clearance-only; one pour-only /
571 involving other copper). All 686 native connectivity entries remain connected,
without render errors, shorts, lost nets or new enforced clearance findings.
One additional optional plated-hole margin is recorded. All pin-net assignments,
placements and via positions/nets/diameters are unchanged. Only the SD clock wire
changes nonzero geometry: 31.215172 to 32.052216 mm planar length. The five existing
corners above 45 degrees remain at identical coordinates and angles; new detours
add none. Placement findings and 86 sampled sharp-turn traces remain inherited.
Official style analysis remains unavailable.

Independent exported Gerber/Excellon parsing passes for 257/257 named groups,
zero shorts/missing copper/drills, and 1,234 barrel records matched. Actual
post-drill GND connects all 416 component terminals in one group. Spatial
reference comparison records two additional uncovered-area pairs across two
traces (0.035995437 mm²); three Inner6 routes remain unassessed. Mixed drill spans
remain and `allowBlindAndBuriedVias` stays enabled. No SI/PI/current-capacity or
fabrication qualification is inferred.
