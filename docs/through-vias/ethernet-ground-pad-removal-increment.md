# Replace 19 Ethernet-area Ground pad vias with surface returns

Adds native Top/Bottom Ground fills in the Ethernet/expansion area and removes
19 partial-span pad barrels from the native Ground pad array without changing
its indices. Selected pads have actual post-drill surface paths to existing
through Ground barrels, including the conservative 0.1 mm neck screen. The
final board is rebuilt after all removals. No route JSON edits or additions.

[Exported copper before/after](ethernet-ground-pad-removal.svg) ·
[complete inventory and verification](ethernet-ground-pad-removal-validation.json).

The 0.105 mm prototype measured four 0.099197 mm gaps around two plated holes,
so it was rejected. The production offset is 0.11 mm; all 110 surface pieces
pass the 0.1 mm copper rule, with a measured minimum of 0.102087 mm.

**644 through / 317 non-through**, 961 total: all remaining snapshot conversions
conflict, one pour-only and 316 involving other copper. Native render succeeds;
all 686 connectivity entries and all 1,527 normal pin-net assignments remain
connected/unchanged with no new enforced or optional findings. All placements,
retained via geometry, trace copper and 8,155 nonzero trace centerlines including
via joins remain unchanged.

Exported Gerber/Excellon preserves 257/257 named groups without detected shorts
or missing copper/drills; 987 barrels match. All 416 Ground terminals remain in
one actual post-drill group through 291 Ground barrels. No additional reference
cuts appear; the same three Inner6 routes remain unassessed. Inherited findings
remain. Return-path SI/PI, timing, impedance and current capacity are unqualified.
Mixed spans and `allowBlindAndBuriedVias` remain.
