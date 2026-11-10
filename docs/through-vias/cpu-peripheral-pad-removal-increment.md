# Extend CPU ground coverage to replace nineteen peripheral blind pad vias

Widens the existing native TSX top/bottom GND fills to x=[-14,15] mm,
y=[-13,13] mm, retaining their 0.105 mm source offset. Removes nineteen more
blind pad-via definitions. Null array slots preserve subsequent names. The
selected vias had lands contained in matching SMT ground pads and a path to an
exported through barrel on actual post-drill copper, surviving the conservative
0.1 mm neck screen. Routing source decreases by 114 net lines. No JSON routing
edits/imports/new data. Processor/DDR placement stays fixed.

[Complete candidate inventory and resulting validation](cpu-peripheral-pad-removal-validation.json):
**640 through / 403 non-through**, 1,043 total; 396 snapshot conversion shorts
and seven clearance-only (one pour-only / 402 other-copper). Native render
succeeds and 686/686 connectivity entries remain connected. All 1,527 normal
pin-net assignments, all component placements, all retained via geometry, all
trace copper and all 8,139 centerline segments are unchanged.

No lost nets, new enforced clearance findings, optional drill-margin additions
or new reference-area gaps. All 80 surface-pour pieces pass the board's 0.1 mm
copper rule. Independently parsed Gerber/Excellon verifies 257/257 named groups,
zero detected shorts or missing copper/drills and 1,069 matched barrel records.
All 416 Ground component terminals remain connected in one actual post-drill
group through 373 Ground barrels. Existing findings remain inherited; SI/PI,
impedance and current capacity remain unqualified. Mixed spans and
`allowBlindAndBuriedVias` remain.
