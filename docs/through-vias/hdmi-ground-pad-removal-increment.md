# Replace 20 HDMI-area Ground pad vias with surface returns

Adds native Top/Bottom Ground fills in the HDMI/expansion area and removes 20
partial-span pad barrels from the native Ground pad array, preserving its
indices. Every selected pad already has an actual drilled surface-copper path
to an existing through Ground barrel, including a conservative 0.1 mm neck
screen. The final board is rebuilt and checked after all 20 removals.

[Exported copper before/after](hdmi-ground-pad-removal.svg) ·
[complete inventory and verification](hdmi-ground-pad-removal-validation.json).

**644 through / 336 non-through**, 980 total. All remaining snapshot conversions
short other-net copper; one is pour-only and 335 involve other copper. The fill
can repour in subsequent fixes; these counts describe the emitted snapshot.

Native render succeeds with all 686 connectivity entries preserved and no new
enforced or optional clearance findings. All 1,527 normal pin-net assignments,
all placements, all retained via geometry, all trace copper and all 8,155
nonzero trace centerlines including via joins remain unchanged. Surface-pour
clearance passes for 92 pieces. Exported Gerber/Excellon preserves 257/257 named
groups without detected shorts or missing copper/drills; 1,006 barrels match.
All 416 Ground terminals remain in one actual post-drill group through 310
Ground barrels. No additional reference-area findings appear; the same three
Inner6 routes remain unassessed. The nine focused checker tests pass.

All PCB changes are native TSX. No route JSON edits or additions. Inherited
findings remain. Changed return paths, SI/PI, timing, impedance and current
capacity remain unqualified. Mixed spans and `allowBlindAndBuriedVias` remain.
