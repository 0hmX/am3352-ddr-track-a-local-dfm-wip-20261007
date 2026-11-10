# CPU/control ground through-via increment

Nine unreferenced GND stitches move by 0.10–0.695 mm and become Top..Bottom
barrels in `StandardControlGroundThroughVias.tsx`. The final TSX mapper replaces
the affected via primitives with literal native geometry. No route-data JSON
edits/additions; component placements and all signal/power trace copper stay fixed.

The bounded 0.05 mm-grid screen reserves every existing barrel's prospective
through column, checks all-layer different-net copper clearance and drill spacing,
and retains the original copper contacts on each old span boundary. Of 26 eligible
unreferenced regional stitches, 11 candidates passed that screen. The first native
render exposed a V3V3 split: two extensions split pour pieces despite passing
local clearance. CLOUD_LOCAL_RETURN_11 and D21_CPU_I1_I3_RETURN are excluded;
15 other stitches had no sampled move within 0.8 mm. This does not establish
unroutability. The rejected candidate remains unmounted and unpublished.

Fixes the validator bug reproduced in the preceding PR: newly disconnected or
removed previously connected net names now force exit 1. Absolute validation
also rejects physical disconnections. The native TSX regression now requires
exit 1; the rejected full-board candidate independently returns 1 for V3V3.

[Validation](control-ground-validation.json): **419 through / 791 non-through**
(782 snapshot shorts + 9 clearance-only; 203 pour-only / 588 involving other copper).
All 686 native connectivity entries remain connected; no physical shorts or new
enforced findings. Inherited 20 different-net + 3 same-net via-spacing findings
remain. Twelve optional plated-drill margin findings are recorded. All 1,527
original component-pin net assignments and all component placements are unchanged.
Exactly the intended nine via records move/extend; every other via's geometry is
unchanged. Six TSX tests / 35 assertions pass.

Independent Gerber/Excellon verification passes: 257/257 named-net groups connected,
zero shorts or missing copper/drills, 1,236 barrel records matched. Actual post-drill
GND rebuild passes for all 416 component terminals in one group.

Reference comparison against the previous board reports one additional area:
0.000232224 mm² on PMIC_PGOOD's bottom trace versus Inner6 GND, enlarging an existing
reference gap. It remains visible in the report; the cumulative earlier reference
findings and three unassessed Inner6 routes are documented in the prior check PR.
SI/PI, reference coverage, power capacity and fabrication remain unqualified.
