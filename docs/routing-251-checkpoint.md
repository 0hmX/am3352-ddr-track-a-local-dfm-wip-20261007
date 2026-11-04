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
