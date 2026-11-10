# Replace seven PMIC/control Ground pad vias with surface returns

Adds native Top/Bottom Ground fills in the PMIC/control area and removes seven
partial-span pad barrels from the native Ground array while preserving indices.
Selected pads have actual post-drill surface paths to existing through Ground
barrels, including the conservative 0.1 mm neck screen. The final board is
rebuilt after removal. No route JSON edits or additions.

[Exported copper before/after](pmic-ground-pad-removal.svg) ·
[complete inventory and verification](pmic-ground-pad-removal-validation.json).

**644 through / 305 non-through**, 949 total: all snapshot conversions conflict,
one pour-only and 304 involving other copper. Native render succeeds with all
686 connectivity entries and all 1,527 normal pin-net assignments preserved.
No new enforced or optional findings. All retained via geometry, all placements,
all trace copper and all 8,169 nonzero centerlines including via joins remain
unchanged. All 119 surface-pour pieces pass clearance.

Exported Gerber/Excellon preserves 257/257 named groups without detected shorts
or missing copper/drills; 975 barrels match. All 416 Ground terminals remain in
one actual post-drill group through 284 Ground barrels. No additional reference
cuts appear; the same three Inner6 routes remain unassessed. Inherited findings
remain. Return paths, SI/PI, timing, impedance and current capacity remain
unqualified. Mixed spans and `allowBlindAndBuriedVias` remain.
