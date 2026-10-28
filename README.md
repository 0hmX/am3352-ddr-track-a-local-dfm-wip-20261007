# AM3352 DDR3 and RGB888 HDMI

The 46 timing-critical DDR signals are routed with native TSX paths, smooth length tuning and via-in-pad escapes. Other signal nets remain unrouted. DDR power, VREF, reset and calibration support routing is still unfinished; this is not fabrication-ready or SI-qualified.

## Development

Requires Bun and Python 3.9 or later.

```sh
bun install --frozen-lockfile
bun run dev
bun scripts/verify-ddr.tsx work/ddr/final
```

`layout/DdrRoutes.tsx` renders `data/ddr-routes.tsx` through native `<trace pcbPath>` and `<via>` elements. The previous saved-route adapters and their retired copper data have been removed. Automatic routing remains disabled. The live PCB preview shows the current native source.

The bus-lanes solver produced fixed 45-degree lanes and sampled smooth tuning curves. All 92 signal vias are centered in their endpoint pads, with 0.30 mm pads and 0.15 mm holes. Tracks are 0.10 mm wide. Component placement and the existing DQ permutation are retained. Two local ground pours, two pad-centered ground vias and one buried ground stitch support the DDR channel region.

The verifier exports compiled Circuit JSON as an analysis artifact and checks all 46 physical endpoint pairs, copper continuity, overlaps, clearances, board bounds, via-in-pad locations and length skew. Measured byte skew is 0.500 mm; address/control skew is 0.620 mm planar and 0.358 mm including barrels. Differential skews are 0.100 / 0.086 / 0.100 mm for DQS0 / DQS1 / CK. These are below the 0.635 mm bus and 0.127 mm pair limits. The nominal longest-Manhattan byte targets are exceeded by approximately 2.8 mm. Geometry checks do not establish impedance or operating margin.

Barrel lengths and field extraction use the nominal JLCPCB 8-layer 1.2 mm stackup. It is added to the analysis export because the pinned WebGPU preview rejects `pcb_stackup` records. Confirm the actual fabricator stackup and blind-via construction before manufacturing. Timing checks run in the explicit verifier; the previous routing-phase declarations are not mounted in the live board.

See `simulations-next/README.md` for the vendor-IBIS workflow and numerical limitations. `bun run build` generates the site in ignored `dist/`. The historical `verify-native-layout.tsx` script checks the retired saved-layout migration and is not the verifier for this routing.

Original project: [tscircuit project](https://tscircuit.com/0hmX/am3352-ddr-track-a-local-dfm-wip-20261007). See [third-party notices](THIRD_PARTY_NOTICES.md).
