# CPU/PMIC support through-via increment

Ports 46 affected mounted via definitions into literal native TSX in
`StandardCpuPmicThroughVias.tsx`, after the historical route/span mappers. Existing
Inner1–Inner6 port references remain available through explicit matched ports.
No route-data JSON edits/additions or imports in the new module.

The batch covers ten input-power barrels, one CPU bias-cap feed, ten DDR support
barrels, nineteen 1.8 V feeds, three MPU feeds, one SRAM-cap feed, oscillator-enable
and SYSBOOT6 support. Original spans were 33 Top..Inner5, nine Bottom..Inner5,
one Top..Inner2, two Top..Inner4 and one Inner4..Inner5. All become Top..Bottom.
A shared native-element traversal replaces repeated recursive mapper code.

[Validation and complete inventory](cpu-pmic-feed-validation.json):
**465 through / 745 non-through** (736 snapshot shorts + 9 clearance-only;
157 pour-only / 588 involving other copper). Native render errors 0; all 686
connectivity entries connected, no physical shorts, newly disconnected net names
or new native/supplemental findings. Inherited 20+3 via-spacing findings remain.
Trace copper, all 1,527 original component-pin net assignments, all placements and
all via positions/nets/diameters are unchanged. Six TSX tests / 35 assertions pass.

Independent Gerber/Excellon check passes: 257/257 named-net groups connected,
zero shorts/missing copper/drills, 1,236 barrel records matched. Actual post-drill
GND connectivity passes for all 416 component terminals in one group.

The reference audit records additional uncovered area in 13 trace/reference-layer
pairs (13 traces), totaling 0.450441885 mm², including DDR_A12 and DDR_A9. Exact
areas/bounds are retained; three Inner6 routes remain unassessed by the existing
reference mapping. Connectivity/clearance results do not qualify those gaps,
SI/PI, current capacity or fabrication. Multiple drill spans remain.
