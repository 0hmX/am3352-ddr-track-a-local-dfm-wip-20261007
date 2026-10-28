# AM3352 DDR3 and RGB888 HDMI

The 46 timing-critical DDR signals are routed with native TSX paths and via-in-pad layer transitions where needed. Both data bytes have been spread with length matching still pending; neither is timing-qualified. Other signal nets remain unrouted. DDR power, VREF, reset and calibration support routing is unfinished; this is not fabrication-ready or SI-qualified.

## Development

Requires Bun and Python 3.9 or later.

```sh
bun install --frozen-lockfile
bun run dev
bun scripts/verify-ddr.tsx work/ddr/final
```

`layout/DdrRoutes.tsx` renders `data/ddr-routes.tsx` through native `<trace pcbPath>` and `<via>` elements. The previous saved-route adapters and their retired copper data have been removed. Automatic routing remains disabled. The live PCB preview shows the current native source.

The DDR signal stackup is Top / Inner 2 / Inner 4 / Bottom, with local ground pours on Inner 1, Inner 3 and Inner 6 and a local DDR_1V5 pour on Inner 5. Eight address/control signals were rerouted on Top and four were rerouted on Inner 2 with the bus-lanes solver. The byte-1 bundle moved from Inner 5 to Bottom and has since been spread with larger tuning banks. C_VREF_2 was moved to clear its bottom-side vias. Top-layer routes connect directly to their pads; the other 38 DDR routes use 76 pad-centered signal vias. Compiled signal vias have 0.30 mm pads and 0.20 mm holes; the explicit ground and power vias use 0.15 mm holes. Tracks are 0.10 mm wide.

The Inner 5 power pour has initial pad-centered connections to one CPU DDR supply ball and one memory supply ball. The remaining power pins, regulator connection, bypass capacitors, VREF, reset and calibration routes are unfinished. A pour and these two connections do not establish a complete power distribution network. Plane coverage, antipads, return paths, impedance, layer construction and via manufacturability require separate review.

The verifier exports compiled Circuit JSON and checks endpoint connectivity, continuity, overlaps, clearances, board bounds, via-in-pad locations and length skew. It also screens whether each DDR signal layer has an adjacent ground or DDR power pour and whether a DDR power pour exists. A centerline sampling report flags routes that pass over reference-pour voids or outside a pour; it includes expected via antipads at route ends and is not a return-current simulation. The current report flags 24 routes for review. Neither screen establishes reference continuity or impedance.

Length matching is in progress. Nine Inner 4 address/control routes were spread outward and retuned with the bus-lanes solver, opening the center and replacing dense return banks with wider bends while retaining their planar lengths. Two outer byte-1 routes were shifted to provide clearance, DDR_D15 received larger bends, and RN_HDMI_6 was moved 1.05 mm to accommodate them. The clock pair was adjusted locally to widen a return gap while keeping its coupled section. All 46 routes pass the current 0.20 mm return-leg gap screen; that is not a complete crosstalk or clearance qualification. The solver shortened DDR_DQM0 from 39.239 mm to 25.800 mm planar length; its revised escape introduces two reduced-spacing sections near the processor that require SI review. DDR_D0, DDR_D1, DDR_D2 and DDR_D3 were also rerouted to 25.800 mm planar length with wider fixed-copper clearances and broad bends. The DQS0 pair now uses two 45-degree turns in place of its sharp V; this shortened each trace by about 1.243 mm without changing pair skew. Byte 0 still has 10.774 mm of total-length spread, address/control has 28.677 mm, and DQS0 pair skew is 1.782 mm; the verifier's limits are 0.635 mm for each group and 0.127 mm for the pair. Byte 1 now has 6.436 mm spread after its spacing pass (previously 0.497 mm), so it no longer passes the group length check; DQS1 retains 0.086 mm pair skew and the clock pair also passes its pair check. Further routing is needed to match the remaining lanes without breaking the DQS pair or the requested spacing. The native eye simulation remains blocked, so this layout is not timing- or SI-qualified.

Five Inner 2 address/control routes (A0, WEn, A9, CASn, A2) now fan outward by 0.6–3.5 mm in the center. The minimum measured center-to-center spacing between those routes and other Inner 2 traces in Y = −27 to −10.5 mm is 0.810 mm (0.710 mm edge gap), above the conservative 0.60 mm target. A9’s middle bank uses eight broad solver-generated lobes and retains 43.199 mm planar length; the other four routes gained 0.611–3.743 mm. Run `bun scripts/check-ddr-center-spacing.ts` to reproduce the local spacing screen. The narrow package escapes and bottom returns are outside this screen, and full length matching is still pending.

Bottom byte 1 (D8–D15, DQM1 and the DQS1 pair) now uses a wider center corridor, with rebuilt smooth connections to the existing package escapes. Solver-generated banks use 3–5 lobes, at least 0.650 mm excursion, 1.500 mm pitch and 0.310 mm bend radius; D10 has a straight center section. Each replacement bank passes the 0.50 mm return-leg edge-gap screen. In Y = −17.5 to −10.6 mm, the minimum inter-signal spacing is 0.624 mm center-to-center (0.524 mm edge gap), excluding the coupled DQS1 pair, which retains nominal 0.22 mm center spacing. Run `bun scripts/check-ddr-bottom-tuning.ts` to verify these dimensions against the saved route points. This local screen does not qualify the narrower package escapes or establish timing/impedance compliance. The complete board passes the current geometry checks, but the byte needs length retuning.

The old `route:ddr` workflow imports `@tscircuit/bus-lanes-solver` but its saved plan targets the previous stackup. It now refuses to run until its layers, fixed copper and obstacle model are updated. The current routes were checked after applying the solver's results; a fresh reroute must independently validate the full board and the applicable spacing and timing requirements.

Barrel lengths and field extraction use the nominal JLCPCB 8-layer 1.2 mm stackup. It is added to the analysis export because the pinned WebGPU preview rejects `pcb_stackup` records. Confirm the actual fabricator stackup and blind-via construction before manufacturing. Timing checks run in the explicit verifier; the previous routing-phase declarations are not mounted in the live board.

See `simulations-next/README.md` for the vendor-IBIS workflow and numerical limitations. `bun run build` generates the site in ignored `dist/`. The historical `verify-native-layout.tsx` script checks the retired saved-layout migration and is not the verifier for this routing.

Original project: [tscircuit project](https://tscircuit.com/0hmX/am3352-ddr-track-a-local-dfm-wip-20261007). See [third-party notices](THIRD_PARTY_NOTICES.md).
