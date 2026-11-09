# HDMI ground-pad increment

All via/route implementation changes are native TSX; route-data JSON remains
unchanged. 29 ground-pad barrels become through in `CloudPowerRoutes.tsx`.
The obsolete R177 span-only mapper is removed, and the J17 span override is
removed from the control mapper. The reviewed HDMI 5V trace body is retained.
Implementation code decreases by 16 lines. Processor/DDR and all other
component placements, trace copper, via positions/nets/diameters stay fixed.

[Validation](hdmi-validation.json): **257 through / 953 non-through**. The emitted
snapshot still blocks 942 conversions with shorts and 11 with clearance only
(354 pour-only / 599 involving other copper). Native continuity remains 686/686,
zero shorts, zero new enforced or informational findings relative to #17.
The inherited 20 different-net + 3 same-net via-spacing findings remain.
Independent Gerber/Excellon reparse passes: 257/257 named-net groups connected,
zero shorts/missing copper/missing drills; 1,236 barrel records matched.
No fabrication or SI/PI qualification is implied; multiple drill spans remain.

| Native source via | Connected pad |
| --- | --- |
| CLOUD_GND_PAD_332 | `.HDMI > .U_HDMI > .2` |
| CLOUD_GND_PAD_335 | `.HDMI > .U_HDMI > .5` |
| CLOUD_GND_PAD_336 | `.HDMI > .U_HDMI > .6` |
| CLOUD_GND_PAD_337 | `.HDMI > .U_HDMI > .7` |
| CLOUD_GND_PAD_338 | `.HDMI > .U_HDMI > .65` |
| CLOUD_GND_PAD_340 | `.HDMI > .C_HDMI_REF_C145 > .pin2` |
| CLOUD_GND_PAD_341 | `.HDMI > .C_HDMI_REF_C146 > .pin2` |
| CLOUD_GND_PAD_342 | `.HDMI > .C_HDMI_REF_C147 > .pin2` |
| CLOUD_GND_PAD_344 | `.HDMI > .C_HDMI_REF_C149 > .pin2` |
| CLOUD_GND_PAD_353 | `.HDMI > .C_HDMI_REF_C182 > .pin2` |
| CLOUD_GND_PAD_354 | `.HDMI > .C_HDMI_REF_C183 > .pin2` |
| CLOUD_GND_PAD_355 | `.HDMI > .C_HDMI_REF_C184 > .pin2` |
| CLOUD_GND_PAD_357 | `.HDMI > .C_HDMI_REF_C186 > .pin2` |
| CLOUD_GND_PAD_358 | `.HDMI > .C_HDMI_REF_C187 > .pin2` |
| CLOUD_GND_PAD_362 | `.HDMI > .R_HDMI_REF_R177 > .pin2` |
| CLOUD_GND_PAD_365 | `.HDMI > .U_HDMI_1V2 > .2` |
| CLOUD_GND_PAD_366 | `.HDMI > .U_HDMI_RESET > .3` |
| CLOUD_GND_PAD_368 | `.HDMI > .C_HDMI_1V2_EN > .pin2` |
| CLOUD_GND_PAD_369 | `.HDMI > .C_HDMI_RESET_DECOUPLE > .pin2` |
| CLOUD_GND_PAD_371 | `.HDMI > .C_HDMI_ESD_SUPPLY > .pin2` |
| CLOUD_GND_PAD_372 | `.HDMI > .C_HDMI_ESD_OUT > .pin2` |
| CLOUD_GND_PAD_374 | `.HDMI > .J_HDMI > .2` |
| CLOUD_GND_PAD_375 | `.HDMI > .J_HDMI > .5` |
| CLOUD_GND_PAD_376 | `.HDMI > .J_HDMI > .8` |
| CLOUD_GND_PAD_377 | `.HDMI > .J_HDMI > .11` |
| CLOUD_GND_PAD_378 | `.HDMI > .J_HDMI > .17` |
| CLOUD_GND_PAD_381 | `.HDMI > .C_HDMI_5V_IN > .pin2` |
| CLOUD_GND_PAD_382 | `.HDMI > .C_HDMI_5V_OUT1 > .pin2` |
| CLOUD_GND_PAD_383 | `.HDMI > .C_HDMI_5V_OUT2 > .pin2` |
