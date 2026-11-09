# Normalize clearance-analysis coordinates

Fixes the native TSX reproduction from the preceding stacked PR. The geometry
kernel's absolute tolerance destabilizes distance calculations at micron-sized
polygon edges. Scale only the analysis polygons by 10,000, measure their gap,
and convert the result back to millimeters. Native records, board rules, source
routing and exported files are unchanged. The expected-failure test becomes a
normal passing test and checks the measured minimum exceeds 0.103 mm.

Validation: nine tests and 44 assertions pass. The original 0.1 mm source-offset
failure is still detected; the 0.105 mm source-offset case still passes. The
published CPU board's 50 surface-pour pieces pass this normalized check. A
read-only DDR-pour prototype's 69 pieces also pass, resolving all 37 phantom
findings; its minimum other-net copper gap is 0.103049 mm. Exported copper and
native continuity independently agree. The DDR prototype is separate pending
board work, not part of this PR.

No board change: **636 through / 458 non-through**, 451 snapshot conversion
shorts and seven clearance-only. All original connectivity and fixed placements
are preserved. No JSON routing edits, new route data or dependency patches.
