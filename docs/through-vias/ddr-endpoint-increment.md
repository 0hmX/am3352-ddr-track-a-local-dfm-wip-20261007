# DDR signal endpoint increment

Ports 16 affected, currently mounted DDR signal paths from the JSON-backed route
composition into literal native `<trace>` elements in `StandardDdrThroughVias.tsx`.
The final TSX mapper replaces those historical paths. No new route-data JSON or
JSON route-data edits; the new source imports only React.

20 existing pad-centered barrels become explicit native `<via>` elements spanning
Top..Bottom. Inner ports retain the original signal layers. `connectsTo` preserves
the original CPU/DDR pin assignment, including pins without a separate net declaration.
The new actual-TSX regression checks this pin-net propagation and native continuity.

[Validation](ddr-endpoint-validation.json): **353 through / 857 non-through** remain
(846 snapshot shorts + 11 clearance-only; 258 pour-only / 599 involving other copper).
686/686 native connectivity entries and 257/257 exported named-net groups connected;
zero shorts or new enforced findings. One additional optional plated-drill margin
is recorded. Inherited via-spacing findings remain 20 different-net + 3 same-net.

All 1,527 original component-pin net assignments, all placements and all via
positions/nets/diameters are unchanged. All 8,103 nonzero wire segments are unchanged
at 1e-8 mm coordinate rounding. The raw flattened trace-shape fingerprint changes:
two zero-length endpoint trace primitives disappear inside the unchanged pad/barrel
footprints. This is not a reroute or a DDR timing/SI qualification. Total via count
stays 1,210; independent exported drill matching stays 1,236 including PTHs.

| Signal | Through endpoints converted |
| --- | --- |
| DDR_CK | 1 |
| DDR_CKn | 1 |
| DDR_D6 | 1 |
| DDR_WEn | 2 |
| DDR_A6 | 2 |
| DDR_BA1 | 1 |
| DDR_A11 | 1 |
| DDR_A8 | 1 |
| DDR_A4 | 1 |
| DDR_A7 | 1 |
| DDR_CKE | 1 |
| DDR_D13 | 2 |
| DDR_D11 | 2 |
| DDR_D14 | 1 |
| DDR_D4 | 1 |
| DDR_D7 | 1 |
