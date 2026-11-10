# Remove 68 CPU-area blind ground pad vias

Removes the 68 native TSX pad-via definitions identified by the preceding
surface-ground coverage check. Null source-array slots preserve subsequent via
names. Deletes the redundant 28-link CPU ground-trace component introduced in
#38; the new surface fills provide these connections. Routing source decreases
by 441 net lines. No JSON routing changes, imports or new data.

[Complete inventory and verification](cpu-surface-pad-removal-validation.json):
**636 through / 458 non-through**, 1,094 total (451 snapshot conversion shorts +
seven clearance-only; one pour-only / 457 involving other copper). Native render
passes and all 686 connectivity entries remain connected. Zero shorts/lost nets,
new enforced clearances, optional drill-margin additions or reference-gap
additions. The surface copper clearance check passes. All 1,527 original pin-net
assignments, all placements and every retained via position/net/diameter/span
remain fixed. Only the deleted 28 ground links change centerlines; all other
trace centerlines remain identical.

Independent exported Gerber/Excellon checks pass for 257/257 named groups,
zero shorts/missing copper/drills and all 1,120 barrel records. All 416 GND
component terminals remain connected in one actual post-drill group through
424 matched ground barrels. This verifies the removals in the resulting native
and exported geometry; the prior 68-entry coverage list alone was a candidate
screen. Existing spacing/placement/style findings remain inherited. SI/PI and
current capacity are unqualified. Mixed spans and `allowBlindAndBuriedVias` remain.
