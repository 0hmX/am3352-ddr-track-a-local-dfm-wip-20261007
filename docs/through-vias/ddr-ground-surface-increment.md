# DDR-area surface ground links replace seven blind pad vias

Adds seven literal native TSX links from two fixed DDR ground balls, four RAM
capacitor ground pads and a DDR-area boot resistor ground pad to fixed through
barrels. Removes their native blind pad vias, retaining null source-array slots
so later via names remain stable. Links are 0.2 mm wide, 0.593721–1.000000 mm
long, with straight/45-degree turns. No JSON changes or route-data imports.

[Complete inventory and verification](ddr-ground-surface-validation.json):
**636 through / 526 non-through**, 1,162 total vias (519 snapshot conversion
shorts + seven clearance-only; one pour-only / 525 involving other copper).
Native render passes and 686/686 connectivity entries remain connected.
No shorts, lost nets, new enforced clearance findings, additional optional
plated-hole margins or additional reference gaps. All component pin-net
assignments and placements remain fixed. Every original trace centerline is
preserved; seven new ground traces add eight nonzero segments. Retained via
positions, nets, diameters and spans are unchanged. Placement findings and
86 sampled sharp-turn traces remain inherited; official style analysis is unavailable.

Independent Gerber/Excellon parsing passes for 257/257 named groups, zero
shorts/missing copper/drills, and all 1,188 barrel records. All 416 GND component
terminals remain in one actual post-drill group through 492 matched ground
barrels. DC continuity and geometric clearance are verified; current-return
distribution, SI/PI and current capacity are unqualified. Mixed drill spans
and `allowBlindAndBuriedVias` remain.
