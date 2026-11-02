# AM3352 DDR3 and RGB888 HDMI

This is a partially routed native tscircuit board: **244/251 named nets connected**, with seven remaining. The active board is `index.tsx`; files in `layout/` and `data/` also include historical route sets, so presence does not imply a set is mounted. See the [current routing checkpoint](docs/routing-244-checkpoint.md) and [validation summary](docs/routing-244-validation.json).

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

Open `http://localhost:3020/#file=index.tsx&tab=pcb`. `bun run build` creates the site in ignored `dist/`. Functional subcircuit group boxes are organizational boundaries, not physical keepouts.

## Routing requirements and limitations

Keep processor and DDR memory placement fixed. Use actual component-pad-centered signal transitions and deliberate straight/45-degree routing. DDR point-to-point routes have at most two physical signal vias including endpoint escapes; ground stitches are separate. Preserve true pad positions and exact resistor-channel mappings. Bounded local spacing decisions do not waive physical shorts or same-depth drill clearance.

Validate the composed board with native continuity, clearance, placement and trace-style checks, then independently reparse emitted Gerber/Excellon connectivity, shorts, drill spans and reference coverage. Preserve prior connections and keep inherited findings visible.

All 46 DDR timing routes are connected, but 10 DDR reference-area findings and additional low margins remain. Board-wide via-in-pad compliance is incomplete: three signal midpoints and nine off-pad power joins remain. The actual fabrication stack, configured DDR rate, impedance, timing and current capacity are unverified. Filled/capped via-in-pad processing and blind/buried layer construction require fabricator qualification. RAM power retains capacitor-barrel dependencies. This is routing WIP, not a fabrication release or SI/PI/boot signoff.

The cloud checkpoint does not include offline Mac work. The prior [240-net snapshot](docs/routing-240-snapshot.md) is historical.
