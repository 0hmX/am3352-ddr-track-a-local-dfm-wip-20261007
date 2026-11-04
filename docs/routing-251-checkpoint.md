# Routing checkpoint: 251 of 251 nets

The six remaining nets are routed in native TSX, with no component moves or pad/net changes:

| Net | File | Layers | Vias | Approx. length |
|---|---|---|---|---|
| SYSBOOT2 | `layout/CloudSysboot2And10Routes.tsx` | Inner6, 0.1 mm | 2 (pad-centred at U1.R3 and RN_HDMI_3.2) | 7.9 mm |
| SYSBOOT10 | `layout/CloudSysboot2And10Routes.tsx` | Inner6 + 1 mm Top stub, 0.1 mm | 3 (U1.U3 and RN_HDMI_3.4 pad-centred; one off-pad at 8.5,-7.6 for the R_BOOT10 branch) | 7.7 mm + 1.5 mm branch |
| HDMI_D15 | `layout/CloudHdmiD11D15Routes.tsx` | Top, Inner5, Bottom, 0.1 mm | 2 (both off-pad) | 38.0 mm |
| HDMI_D11 | `layout/CloudHdmiD11D15Routes.tsx` | Inner5, Inner4, 0.1 mm | 3 (U_HDMI.48 and RN_HDMI_3.6 pad-centred; one off-pad mid via) | 39.6 mm |
| HDMI_D0 | `layout/CloudHdmiD0D8Routes.tsx` | Inner4, Inner5, 0.1 mm | 8 (both terminals pad-centred) | ~60 mm |
| HDMI_D8 | `layout/CloudHdmiD0D8Routes.tsx` | Inner4, Inner5, 0.1 mm | 6 (both terminals pad-centred) | ~58 mm |

The SYS6 pull-to-CPU Inner5 trace (`RN3_SYS6_PULL_CPU_I5`) is rerouted around the new SYSBOOT2 via: same endpoints, layer and 0.1 mm width; 2.54 mm becomes 3.43 mm. No power or DDR traces changed.

## Validation

- `scripts/verify-board-routing.tsx` against the 245-net board: exit 0, 670/670 connectivity entries connected, 0 shorted, 0 physical different-net contacts, no previously connected net lost, no new failure indices. Inherited: 20 different-net and 3 same-net via-spacing findings.
- Independent Gerber/Excellon check (`scripts/cloud-gerber-check.py`): 251/251 named nets connected, no shorts, no missing pin/barrel copper or drills; 1206 barrels matched.
- Post-drill GND (`scripts/cloud-postdrill-ground.py`): all 393 GND terminals remain one group, 0 failures (unchanged from 245-net board).

Not re-run: DDR reference-area post-drill comparison. No SI/PI, timing, ampacity or fabrication signoff; prior limitations in the [245-net checkpoint](routing-245-checkpoint.md) still apply.

## Connector edge alignment

Mating faces were checked against the KiCad footprints' fab outline / "PCB Edge" marks and the board outline (x −28..70, y −39..26.5):

| Connector | Before | Change | After |
|---|---|---|---|
| J_POWER USB-C (GCT USB4105) | shell front 1.465 mm inside top edge; plug overmold would hit the PCB | `pcbY` 21.36 → 22.825 | shell front at y = 26.5 |
| J_ETH RJ45 (Würth 7499010121A) | mouth 0.81 mm inside right edge | `pcbX` 49.5 → 50.31, `isAllowedToBeOffBoard` | mouth at x = 70 |
| J_HDMI HDMI-A (Molex 208658-1001) | footprint PCB-edge line 1.65 mm outside the board (2.65 mm overhang vs 1.0 mm intended) | `pcbX` 64.625 → 62.975 | PCB-edge line at x = 70 |
| J_MICROSD (Hirose DM3AT) | slot 0.475 mm inside left edge; latched card protrudes past edge | none | unchanged |

Attached routing was re-routed in TSX. Notable: USB-C CC1 now runs on Inner4 under the shell (two vias), INPUT_FAULT_N dips to Inner4 (two vias), VBUS Inner5 pour neck reshaped between shield PTHs, obsolete pour notches at the old USB-C locator holes removed. HDMI TMDS connector fans compressed (TX1 intra-pair skew −0.2411 → −0.2453 mm; others unchanged). Tight but passing: J_HDMI.16 to C_HDMI_ESD_OUT.2 pad edge 0.11 mm.

Validation after all three moves: verifier exit 0, 670/670, 0 shorts, no lost nets, inherited 20 + 3 via-spacing findings only; Gerber/Excellon 251/251, no shorts or missing copper/drills; post-drill GND 393 terminals in one group, 0 failures; `tscircuit build --ci` exit 0.
