# Ethernet through-via increment

All implementation changes are in native TSX. No JSON route data is added or
changed. 35 Ethernet ground-pad barrels extend at their existing positions in
`CloudPowerRoutes.tsx`; three ground stitches move in `CloudEthernetRoutes.tsx`.
Native pours regenerate antipads. No component placement or trace copper changes.

| Stitch | Old position (mm) | New position (mm) | Move (mm) |
| --- | --- | --- | --- |
| ETH return at 7.7, -2.6 | 7.7, -2.6 | 7.7, -2.7 | 0.1000 |
| ETH return at 42.4, 12.4 | 42.4, 12.4 | 42.5, 12.5 | 0.1414 |
| RMII1_TXD1_DAMPED endpoint return | 12.01, 13.1 | 12.06, 12.8 | 0.3041 |

The TXD1 return-to-signal-barrel distance is now 0.6265 mm (previously 0.5 mm).
No reference-area or SI/PI qualification is implied.

The bounded screen tested a 0.05 mm grid within a 0.4 mm radius. It required
all-layer other-net trace/via/pad clearance, clearance to every existing via's
prospective through column, same-net drill spacing, and retention of original
GND-pour contacts. Pours were then regenerated and validated natively. Three of
12 buried Ethernet ground stitches had candidates. Nine did not; this bounded
result does not prove global unroutability or authorize changing layer count or
fixed processor/DDR placement.

Result: **228 through, 982 non-through**, with 971 shorting and 11 clearance-only
conversions left in the emitted snapshot (383 pour-only, 599 involving other
copper). Native continuity is 686/686 connected, zero shorts and no new enforced
findings; inherited via-spacing findings remain 20 different-net + 3 same-net.
Three additional optional plated-drill margin findings are recorded in
[validation](ethernet-validation.json); board copper-clearance rules pass.

## Ground-pad source inventory

| Source via | Connected pad |
| --- | --- |
| CLOUD_GND_PAD_275 | `.Ethernet_and_RGB_expansion > .U_ETH_PHY > .21` |
| CLOUD_GND_PAD_277 | `.Ethernet_and_RGB_expansion > .R_ETH_STRAP0 > .pin2` |
| CLOUD_GND_PAD_278 | `.Ethernet_and_RGB_expansion > .R_ETH_STRAP1 > .pin2` |
| CLOUD_GND_PAD_279 | `.Ethernet_and_RGB_expansion > .R_ETH_STRAP2 > .pin2` |
| CLOUD_GND_PAD_280 | `.Ethernet_and_RGB_expansion > .R_ETH_STRAP3 > .pin2` |
| CLOUD_GND_PAD_281 | `.Ethernet_and_RGB_expansion > .R_ETH_STRAP4 > .pin2` |
| CLOUD_GND_PAD_282 | `.Ethernet_and_RGB_expansion > .R_ETH_STRAP5 > .pin2` |
| CLOUD_GND_PAD_283 | `.Ethernet_and_RGB_expansion > .R_ETH_BIAS > .pin2` |
| CLOUD_GND_PAD_284 | `.Ethernet_and_RGB_expansion > .Y_ETH > .2` |
| CLOUD_GND_PAD_285 | `.Ethernet_and_RGB_expansion > .C_ETH_OSC > .pin2` |
| CLOUD_GND_PAD_287 | `.Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin2` |
| CLOUD_GND_PAD_288 | `.Ethernet_and_RGB_expansion > .C_ETH_A0 > .pin2` |
| CLOUD_GND_PAD_291 | `.Ethernet_and_RGB_expansion > .C_ETH_A3 > .pin2` |
| CLOUD_GND_PAD_293 | `.Ethernet_and_RGB_expansion > .C_ETH_IO1 > .pin2` |
| CLOUD_GND_PAD_294 | `.Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin2` |
| CLOUD_GND_PAD_295 | `.Ethernet_and_RGB_expansion > .C_ETH_IO3 > .pin2` |
| CLOUD_GND_PAD_299 | `.Ethernet_and_RGB_expansion > .C_ETH_CT_RX_1U > .pin2` |
| CLOUD_GND_PAD_300 | `.Ethernet_and_RGB_expansion > .U_ETH_ESD > .3` |
| CLOUD_GND_PAD_302 | `.Ethernet_and_RGB_expansion > .C_ETH_CHASSIS > .pin2` |
| CLOUD_GND_PAD_303 | `.Ethernet_and_RGB_expansion > .R_ETH_CHASSIS > .pin2` |
| CLOUD_GND_PAD_305 | `.Ethernet_and_RGB_expansion > .C_ETH_RAMP_CT > .pin2` |
| CLOUD_GND_PAD_306 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .10` |
| CLOUD_GND_PAD_308 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .4` |
| CLOUD_GND_PAD_309 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .5` |
| CLOUD_GND_PAD_310 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .6` |
| CLOUD_GND_PAD_311 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .7` |
| CLOUD_GND_PAD_312 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .8` |
| CLOUD_GND_PAD_315 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .11` |
| CLOUD_GND_PAD_316 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .12` |
| CLOUD_GND_PAD_317 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .13` |
| CLOUD_GND_PAD_318 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .14` |
| CLOUD_GND_PAD_319 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .15` |
| CLOUD_GND_PAD_320 | `.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .16` |
| CLOUD_GND_PAD_323 | `.Ethernet_and_RGB_expansion > .C_ETH_ISO_OE > .pin2` |
| CLOUD_GND_PAD_324 | `.Ethernet_and_RGB_expansion > .C_RMII_RETURN_A > .pin1` |

## Bounded stitch screen

| Original position (mm) | Valid sampled candidates |
| --- | --- |
| 14.5, 9.95 | 0 |
| 7.7, -2.6 | 32 |
| 42.4, 12.4 | 36 |
| 41, -2.675 | 0 |
| 35.09, 13.2 | 0 |
| 41.3, -5.275 | 0 |
| 4.1, 2.8 | 0 |
| 7.3, 2.1 | 0 |
| 8.3, 0.2 | 0 |
| 37.24, 11.2 | 0 |
| 41.912455, 10.340393 | 0 |
| 12.01, 13.1 | 8 |
