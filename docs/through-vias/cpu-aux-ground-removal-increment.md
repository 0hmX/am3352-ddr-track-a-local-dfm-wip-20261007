# Remove nineteen redundant CPU-area ground stitches

Removes nineteen blind/buried auxiliary GND via definitions in native TSX.
They have no mounted trace/pour selector references and do not touch a matching
SMT ground pad. Null slots retain indexed array names. Deletes two now-empty
layout components and obsolete relocation branches. Ports the affected
JSON-backed SYSBOOT4 ground-return set into a literal TSX through via, preserving
the retained member's exact final geometry. No JSON routing edits/imports/new
data are introduced. Native routing source decreases by over 130 net lines.

[Complete inventory and validation](cpu-aux-ground-removal-validation.json):
**636 through / 426 non-through**, 1,062 total; 419 snapshot conversion shorts
plus seven clearance-only (one pour-only / 425 other-copper). Every one of the
8,125 trace centerline segments, all trace copper, all 1,527 normal pin-net
assignments, all placements and all retained via positions/nets/diameters/spans
are unchanged. Processor and DDR placement remain fixed.

Native render succeeds and 686/686 connectivity entries remain connected.
There are no lost nets, new enforced clearance findings, optional drill-margin
additions or new reference-area gaps. Surface-pour clearance passes. Independently
parsed Gerber/Excellon confirms 257/257 named groups, zero detected shorts or
missing copper/drills, and 1,088 matched barrels. All 416 GND component terminals
remain connected in one actual post-drill group through 392 Ground barrels.

These checks establish preserved DC connectivity; auxiliary return-current
paths change. SI/PI, impedance and current capacity are unqualified. Existing
spacing/placement/style findings remain inherited. Mixed drill spans and
`allowBlindAndBuriedVias` remain.
