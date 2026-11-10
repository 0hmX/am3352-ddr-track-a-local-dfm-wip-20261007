# Power-area through-via increment

All implementation changes are native TSX. 31 power-input/PMIC ground-pad
barrels extend in `CloudPowerRoutes.tsx`. Six VDD_CORE barrels extend in
`CloudCorePowerRoutes.tsx`, exposing matched Inner5 ports to preserve the existing
traces. The renderer uses the source via target layer rather than a hardcoded
Inner5 span. No route-data JSON changes or new JSON route data.

[Validation](power-validation.json): **294 through / 916 non-through**, with 905
shorting and 11 clearance-only conversions left (317 pour-only / 599 involving
other copper). All 686 native connectivity entries remain connected, zero shorts
and zero new enforced findings. Five additional optional plated-drill margin
findings are recorded; configured board copper clearances pass. The inherited
20 different-net + 3 same-net via-spacing findings remain.

Trace copper geometry, all component placements including processor/DDR, and via
positions/nets/diameters are unchanged. Independent Gerber/Excellon reparse passes:
257/257 named-net groups connected, zero shorts/missing copper/missing drills;
1,236 barrel records matched. Multiple drill spans remain. No fabrication or SI/PI
qualification is implied.

| Ground-pad source via | Connected pad |
| --- | --- |
| CLOUD_GND_PAD_181 | `.Power_management > .U_PMIC > .24` |
| CLOUD_GND_PAD_184 | `.Power_management > .U_PMIC > .30` |
| CLOUD_GND_PAD_185 | `.Power_management > .U_PMIC > .31` |
| CLOUD_GND_PAD_186 | `.Power_management > .U_PMIC > .32` |
| CLOUD_GND_PAD_189 | `.Power_management > .C_PWR2 > .pin2` |
| CLOUD_GND_PAD_194 | `.Power_management > .C_PWR7_B > .pin2` |
| CLOUD_GND_PAD_195 | `.Power_management > .C_PWR7 > .pin2` |
| CLOUD_GND_PAD_196 | `.Power_management > .C_PWR8_B > .pin2` |
| CLOUD_GND_PAD_197 | `.Power_management > .C_PWR8 > .pin2` |
| CLOUD_GND_PAD_198 | `.Power_management > .C_PWR9_B > .pin2` |
| CLOUD_GND_PAD_199 | `.Power_management > .C_PWR9 > .pin2` |
| CLOUD_GND_PAD_200 | `.Power_management > .C_PWR10 > .pin2` |
| CLOUD_GND_PAD_201 | `.Power_management > .C_PWR11 > .pin2` |
| CLOUD_GND_PAD_204 | `.Power_management > .C_PWR13 > .pin2` |
| CLOUD_GND_PAD_206 | `.Power_management > .SW_PWR1 > .2` |
| CLOUD_GND_PAD_210 | `.Power_management > .R_RTC_WAKE > .pin2` |
| CLOUD_GND_PAD_213 | `.Power_management > .U_RTC_RESET_DELAY > .5` |
| CLOUD_GND_PAD_214 | `.Power_management > .U_RTC_RESET_DELAY > .6` |
| CLOUD_GND_PAD_221 | `.Power_management > .C_RTC_RESET_BYP > .pin2` |
| CLOUD_GND_PAD_223 | `.Power_management > .C_PWR10_B > .pin2` |
| CLOUD_GND_PAD_251 | `.Power_input > .J_POWER > .A1` |
| CLOUD_GND_PAD_252 | `.Power_input > .J_POWER > .A12` |
| CLOUD_GND_PAD_256 | `.Power_input > .U_TYPEC_NOR > .2` |
| CLOUD_GND_PAD_257 | `.Power_input > .U_INPUT_EFUSE > .8` |
| CLOUD_GND_PAD_258 | `.Power_input > .U_INPUT_EFUSE > .9` |
| CLOUD_GND_PAD_259 | `.Power_input > .R_TYPEC_ENABLE_PD > .pin2` |
| CLOUD_GND_PAD_260 | `.Power_input > .R_INPUT_LIMIT > .pin2` |
| CLOUD_GND_PAD_261 | `.Power_input > .C_INPUT_DVDT > .pin2` |
| CLOUD_GND_PAD_262 | `.Power_input > .C_RAW_TYPEC > .pin2` |
| CLOUD_GND_PAD_263 | `.Power_input > .C_RAW_NOR > .pin2` |
| CLOUD_GND_PAD_265 | `.Power_input > .C_EFUSE_OUT > .pin2` |

| Core-power source via | Retained trace port |
| --- | --- |
| CLOUD_PWR_PAD_13 | `CLOUD_PWR_PAD_13.inner5` |
| CLOUD_PWR_PAD_14 | `CLOUD_PWR_PAD_14.inner5` |
| CLOUD_PWR_PAD_20 | `CLOUD_PWR_PAD_20.inner5` |
| CLOUD_PWR_PAD_22 | `CLOUD_PWR_PAD_22.inner5` |
| CLOUD_PWR_PAD_140 | `CLOUD_PWR_PAD_140.inner5` |
| CLOUD_CORE_C7B | `CLOUD_CORE_C7B.inner5` |
