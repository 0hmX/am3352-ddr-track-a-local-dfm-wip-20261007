# Routing TODO

- Complete HDMI_D0, HDMI_D8, HDMI_D11, HDMI_D15, SYSBOOT2 and SYSBOOT10. The accepted checkpoint is 245/251 nets.
- Decide and validate SYSBOOT10's exact V3 alternate-feed tradeoff before adopting the staged 246-net proposal.
- Replace the rejected SYS2 bypass and 134.087 mm D11 detour with useful coordinated routes. Neither partial study is mounted.
- Repair 10 remaining DDR reference-area cases and additional low margins; preserve 46 routes and the two-signal-via maximum.
- Resolve three intermediate signal transitions and nine off-pad power joins.
- Qualify V1V8 and RAM supply barrel dependencies, RGB source termination/timing, and the actual fabrication stack. Connectivity is not power or SI signoff.
- Resolve two connector overhangs and 15 missing-courtyard warnings.

Completed in this increment: SYSBOOT6, with reviewed V1V8 feed redistribution and preserved prior connectivity. See [checkpoint evidence](routing-245-checkpoint.md).
