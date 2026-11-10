# Remove 33 auxiliary HDMI and control Ground barrels

Deletes obsolete Ground return stitches from the native HDMI, control, strap,
MDIO and RN4/RN5 sources. No component pad or trace/pour selector needs these
barrels. Complete affected RN4 Ground JSON imports are removed; the retained
MDIO through return is a literal native `<via>`. Unchanged signal routing sets
remain mounted. No route JSON was edited or added.

[Complete inventory and verification](hdmi-control-ground-removal-validation.json).

**644 through / 356 non-through**, 1,000 total: 355 snapshot conversion shorts
and one clearance-only (one pour-only / 355 other-copper). Exactly 33 Ground
barrels are removed; no retained via geometry, component placement, normal
pin-net assignment, or trace copper changes. All 8,155 nonzero trace centerline
segments, including via joins, remain unchanged.

The native render has no errors. All 686 native connectivity entries and all
1,527 component pin-net assignments are preserved with no new enforced or
optional clearance findings. Exported Gerber/Excellon checks preserve 257/257
named groups with no detected shorts or missing copper/drills, and 1,026
matched barrels. All 416 Ground terminals remain in one actual post-drill group
through 330 Ground barrels. Surface-pour clearance passes; no additional
reference-area findings appear. The same three Inner6 routes remain unassessed.

Inherited placement/routing findings remain. Removing Ground stitches changes
physical return paths; SI/PI, timing, impedance and current capacity remain
unqualified. Mixed drill spans and `allowBlindAndBuriedVias` remain.
