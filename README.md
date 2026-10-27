# AM3352 DDR3 and RGB888 HDMI

This board is a work in progress. The saved routing still has 55 open video-bus joins. DDR and HDMI signal integrity and hardware operation have not been qualified.

## Development

Requires Bun and Python 3.9 or later.

```sh
bun install --frozen-lockfile
bun run dev
# Optional: PORT=3031 bun run dev
```

The PCB view renders `index.tsx` with the saved trace paths, vias, and copper regions. The saved layout includes via-in-pad locations; automatic routing remains disabled. The dev server does not save Circuit JSON snapshots. First render may take a while because the preserved copper has over one million boundary vertices. If editing the large saved copper file causes the dev server to time out, restart it.

```sh
bun scripts/verify-native-layout.tsx
```

This renders the board in memory and compares independent captured hashes for all 18,672 nonzero trace segments, 1,143 vias, and 76 copper regions, including widths, layers, net associations, via tenting, masks and copper boundaries. The route guard rejects changes to the checked component geometry, pads, vias, and net bindings; reroute and revalidate deliberately when these change.

The saved physical placement, copper, silkscreen, board outline, and mechanical holes match the reference. Derived component bounding boxes and CAD metadata are not identical: the native render adds debug CAD placeholders and a courtyard, and the RAM CAD pose differs by 0.000127 mm.

The saved-route and copper adapters depend on pinned `@tscircuit/core` internals. The copper adapter restores the checked shapes after the core floating-island cleanup rather than recalculating copper. Core upgrades require verification and a fresh review of the adapters. The current routing and placement checks are not enabled in the board render. A separate netlist check passed; the routing checker encountered a zero-division error and the placement check timed out. Preservation checks do not establish DRC, signal integrity, or fabrication readiness.

`bun run build` generates a site in ignored `dist/`. The tscircuit build tool generates Circuit JSON as a build artifact, not as design source.

Original project: [tscircuit project](https://tscircuit.com/0hmX/am3352-ddr-track-a-local-dfm-wip-20261007). See [third-party notices](THIRD_PARTY_NOTICES.md). Experimental simulation declarations remain in `simulations-next/`; no accepted board DDR eye or field solution is included.
