# Replace thirteen DDR blind pad vias with native surface ground

Adds top and bottom DDR-area GND pours in native TSX with a checked 0.105 mm
source offset. Removes thirteen blind ground pad-via definitions while retaining
null array slots so subsequent names stay stable. Deletes the seven obsolete
DDR ground-link traces introduced in #40. No JSON routing changes, imports or
new route data. Processor/DDR and every other component placement remain fixed.

[Actual exported ground copper before/after](ddr-surface-pad-removal.svg) and
[complete inventory/verification](ddr-surface-pad-removal-validation.json).
Candidates had their via lands inside matching SMT pads and a path to an
exported through GND barrel on actual post-drill surface copper. Each path also
survived the conservative 0.1 mm neck screen. The resulting build independently
verifies the removals; candidate coverage alone was insufficient.

**636 through / 445 non-through**, 1,081 total: 438 snapshot conversion shorts
and seven clearance-only (one pour-only / 444 involving other copper). Native
render passes, 686/686 connectivity entries remain connected, and there are no
new enforced clearance findings or lost nets. All 1,527 pin-net assignments and
all retained via positions, diameters, nets and spans remain unchanged. Only the
seven deleted GND traces change centerlines; all other trace centerlines remain
identical. The 69 surface-pour pieces pass the board's 0.1 mm copper rules.

Exported Gerber/Excellon checks verify 257/257 named groups, zero detected shorts
or missing copper/drills, and 1,107 matched barrel records. All 416 GND component
terminals stay connected in one actual post-drill group through 411 matched
Ground barrels. No additional reference-area gaps or optional drill-margin
findings. Existing spacing/placement/style findings remain inherited. SI/PI,
impedance and current capacity are unqualified. Mixed spans and
`allowBlindAndBuriedVias` remain; this is a validated routing increment.
