# DDR-supply through-via increment

All implementation changes are native TSX in `CloudMainPowerPlanes.tsx`.
39 DDR_1V5 barrels extend to Top..Bottom. Explicit matched inner-layer ports retain
the existing Inner4/Inner5 trace connections. No route-data JSON changes, component
moves, signal-route edits, new vias, or diameter changes.

[Validation](ddr-supply-validation.json): **333 through / 877 non-through**. The
emitted snapshot blocks 866 conversions with shorts and 11 with clearance only
(278 pour-only / 599 involving other copper). All 686 native connectivity entries
remain connected, no physical shorts or new enforced findings. One additional
optional plated-drill margin finding is recorded; board copper-clearance rules
pass. Inherited via-spacing findings remain 20 different-net + 3 same-net.

Trace copper, component placements, and via positions/nets/diameters are unchanged.
Independent emitted Gerber/Excellon verification passes: 257/257 named-net groups
connected, zero shorts/missing copper/missing drills; 1,236 barrel records matched.
Multiple drill spans remain. SI/PI, power capacity and fabrication are unqualified.

| Native source via | Original trace layer |
| --- | --- |
| DDR15_FEED_0 | inner5 |
| DDR15_FEED_1 | inner5 |
| DDR15_FEED_2 | inner5 |
| DDR15_FEED_3 | inner5 |
| DDR15_FEED_4 | inner5 |
| DDR15_FEED_5 | inner5 |
| DDR15_FEED_6 | inner5 |
| DDR15_FEED_11 | inner5 |
| DDR15_FEED_12 | inner5 |
| DDR15_FEED_13 | inner5 |
| DDR15_FEED_14 | inner5 |
| DDR15_FEED_16 | inner5 |
| DDR15_FEED_18 | inner5 |
| DDR15_FEED_19 | inner5 |
| DDR15_FEED_20 | inner5 |
| DDR15_FEED_21 | inner5 |
| DDR15_FEED_22 | inner5 |
| DDR15_FEED_23 | inner5 |
| DDR15_FEED_24 | inner5 |
| DDR15_FEED_26 | inner5 |
| DDR15_FEED_27 | inner5 |
| DDR15_FEED_31 | inner5 |
| DDR15_FEED_32 | inner5 |
| DDR15_FEED_33 | inner5 |
| DDR15_FEED_34 | inner5 |
| DDR15_FEED_36 | inner5 |
| DDR15_FEED_37 | inner5 |
| DDR15_FEED_38 | inner5 |
| DDR15_FEED_39 | inner5 |
| DDR15_FEED_44 | inner5 |
| DDR15_FEED_45 | inner5 |
| DDR15_FEED_46 | inner5 |
| DDR15_FEED_47 | inner5 |
| DDR15_FEED_48 | inner5 |
| DDR15_FEED_52 | inner5 |
| DDR15_FEED_54 | inner5 |
| DDR15_FEED_65 | inner4 |
| DDR15_FEED_66 | inner4 |
| DDR15_FEED_67 | inner5 |
