# CPU V3V3 surface feeds replace seven blind pad barrels

Adds eight literal native TSX V3V3 surface links and removes seven blind pad
barrels from `CloudMainPowerPlanes.tsx`. Links are 0.2 mm wide,
0.520122–1.131371 mm long, with straight/45-degree turns. Fixed terminals join
fixed through feeds. Explicit via names make source-array removal safe; no
JSON data changes or route-data imports.

An eight-removal candidate had zero shorts/new enforced clearances but isolated
C_IO1_0.pin1: 676/686 native entries and 256/257 exported named groups connected.
A read-only copper-contact audit identified V3V3_FEED_13 as the only removed
span contacting both physical V3V3 roots. Its original top→inner5 barrel is
retained; the new top surface link feeds this inner5 island. The rejected
candidate was not published.

[Complete inventory and verification](cpu-v3-surface-validation.json): **636 through /
533 non-through**, 1,169 total vias (526 snapshot conversion shorts + seven
clearance-only; one pour-only / 532 involving other copper). Corrected native
render passes and all 686 connectivity entries remain connected. No shorts,
lost nets, new enforced clearance findings, additional optional plated-hole
margins or additional reference gaps. All pin-net assignments and placements
are unchanged. All original trace centerlines are preserved; only eight new
power traces add nine segments. Retained via positions, nets, diameters and
spans remain unchanged. Placement findings and 86 sampled sharp-turn traces
remain inherited; official style analysis remains unavailable.

Independent Gerber/Excellon parsing passes for 257/257 named groups, zero
shorts/missing copper/drills, and 1,195 matched barrel records. All 416 ground
component terminals remain in one actual post-drill group. DC continuity and
geometric clearance are verified; SI/PI, current-return distribution and current
capacity are unqualified. Mixed spans and `allowBlindAndBuriedVias` remain.
