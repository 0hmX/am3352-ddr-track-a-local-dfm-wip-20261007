# Post-drill reference evidence and validator reproduction

This check increment changes no board source. The latest published conversion is
still **410 through / 800 non-through**, at `178904aa5d11028aa652572813ad739b46504c70`.

The [independent reference audit](postdrill-reference-after-v3-feed.json), relative
to the original native main-board build, finds **29 trace/reference-layer pairs
with additional uncovered area across 25 traces**. These are additional areas,
including enlargements of prior gaps, not necessarily 29 newly failing routes.
Six affected DDR paths are BA0, A1, A6, A12, A7 and DQSn1. The A7 increment is very
small (4.3e-8 mm²); exact areas and bounds remain visible in the report.

Ground classification now includes every emitted copper island physically labeled
GND by the exported barrel/net graph, rather than only the polygon covering a
corner probe. Own surface-terminal masks use actual circle/rectangle shapes and
the native scalar `layer` field. Actual span-qualified Excellon/NPTH holes are
subtracted. Native inputs, check-only annotations, checker code, reference copper
and drill files are hashed. The existing configured GND-reference mapping omits
three Inner6 SYSBOOT2/10 routes; these are explicitly listed as unassessed.

[Post-drill GND and placement/style evidence](postdrill-ground-and-quality.json):
all 416 component GND terminals remain in one physical group before/after the
published conversions; 533 GND barrel records match actual exported drill walls,
no failures. Placement findings remain inherited: 5 outside-board, 15 missing
courtyards, 3 courtyard overlaps, 1 connector-orientation warning. Supplemental
trace geometry still flags 86 traces with sampled turns above 45 degrees. The
official style analyzer is unavailable in this checkout; these are geometry
metrics, not its results.

Two actual-TSX reproductions are added. One shows that passing copper clearance
can still create a reference gap when a barrel extends through a GND plane. The
other captures a validator bug: removing a native physical connection produces
two physical groups while `verify-board-routing.tsx` still exits 0. This PR's test
intentionally asserts that observed false-success behavior; the stacked fix must
change it to exit 1. Earlier increment reports explicitly inspected connectivity,
so the bad ground-stitch candidate was rejected and unmounted rather than published.

The rejected 11-stitch local candidate split V3V3 into 91-pin and 10-pin groups
(676/686 connectivity entries connected). Geometric isolation identifies two
stitch extensions that split V3V3 pour pieces; they remain unmounted while a
smaller subset is validated. The native board source is unchanged in this PR.

Reproduce from exported native directories with Gerbers:

```sh
bun scripts/prepare-reference-analysis.tsx <baseline-directory> <current-directory>
python scripts/cloud-postdrill-reference-delta.py <baseline-directory> <current-directory> <report-path>
python scripts/cloud-postdrill-ground.py <current-directory> <ground-report-path>
bun test tests/through-vias.test.tsx
```

`copper.json` is derived, read-only check metadata, never board or route input.
No route-data JSON changes or additions. Reference gaps, SI/PI, power capacity and
fabrication remain unqualified; connectivity/clearance passes do not settle them.
