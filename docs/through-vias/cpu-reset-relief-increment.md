# CPU reset relief and two through barrels

Ports the mounted JSON-backed CPU reset path into literal native TSX and reroutes
its first obstructed bottom-layer section with straight/45-degree geometry.
Converts V3V3_FEED_2 at U1.P6 to a through barrel at its existing pad center, and
ports the newly exposed PMIC_POWER_EN endpoint path into native TSX with one
through barrel. New modules import no route data; original JSON is unchanged.

The bounded 0.025 mm search reserves future columns while changing the first
reset section. Two other reset sections are retained after their search windows
found no path or exhausted the 60,000-node bound. Their vias remain unconverted;
this is no claim of global unroutability.

[Complete inventory and validation](cpu-reset-relief-validation.json): **628
through / 580 non-through** (571 snapshot shorts + nine clearance-only;
one pour-only / 579 involving other copper). All 686 native connectivity entries
remain connected, with no render errors, shorts, lost nets or new enforced
clearance findings. Seven optional plated-hole margins are recorded. All original
pin-net assignments, placements and via positions/nets/diameters remain unchanged.
Only the reset trace changes nonzero geometry: 41.789141 to 42.212077 mm planar
length. Placement findings and 86 sampled sharp-turn traces remain inherited;
changed reset geometry has only straight/45-degree turns. Official style analysis
remains unavailable.

Independent exported Gerber/Excellon and post-drill GND evidence are retained in
the report. Mixed spans and unqualified SI/PI/current capacity remain;
`allowBlindAndBuriedVias` stays enabled.

Exported connectivity passes for 257/257 named groups, with zero shorts or missing
copper/drills and 1,234 barrel records matched. Actual post-drill GND connects all
416 component terminals in one group. Spatial reference comparison records three
additional uncovered-area pairs (three traces, 0.099884767 mm²); three Inner6
routes remain unassessed. These results do not establish fabrication release.
