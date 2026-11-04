# Routing TODO

- All 251 named nets are connected (see [251-net checkpoint](routing-251-checkpoint.md)). Review the six new routes' off-pad vias: SYSBOOT10 pull branch, HDMI_D15 (2), HDMI_D11 mid via, and HDMI_D0/D8 Inner4/Inner5 layer hops (8 and 6 vias).
- Run the DDR reference-area post-drill check against the 251-net board; only GND post-drill connectivity was re-run.
- Repair 10 remaining DDR reference-area cases and additional low margins; preserve 46 routes and the two-signal-via maximum.
- Resolve three intermediate signal transitions and nine off-pad power joins.
- Qualify V1V8 and RAM supply barrel dependencies, RGB source termination/timing, and the actual fabrication stack. Connectivity is not power or SI signoff.
- Resolve two connector overhangs and 15 missing-courtyard warnings.

Completed in this increment: SYSBOOT6, with reviewed V1V8 feed redistribution and preserved prior connectivity. See [checkpoint evidence](routing-245-checkpoint.md).
