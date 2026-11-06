# Third-party notices

This is a board design derived from the original public tscircuit project linked in README.md. No new blanket license is assigned by this publication.

Design-specific footprint coordinates include adaptations from the KiCad libraries. Their sources, dimensions, reference documents and checksums are recorded in `hdmi/data/footprints.tsx` and `hdmi/reference/sources.json`. KiCad libraries use CC-BY-SA 4.0 with the electronic-design exception; see the [official license](https://www.kicad.org/libraries/license/). Historical local KiCad source paths in metadata are provenance, not runtime dependencies.

3D models in `models/kicad/` are unmodified STEP files from the KiCad 10 3D model library (`kicad-packages3D`), used under the same CC-BY-SA 4.0 license with the electronic-design exception. Where no exact KiCad model exists, `models/index.tsx` maps a part to the closest-matching package body and says so. `models/generated/*.glb` are simple dimensioned bodies produced by `scripts/generate-cad-bodies.ts` for parts KiCad does not model (Wurth 7499010121A RJ45, TI RSV0016A UQFN-16).

The HDMI design was checked against the BeagleBone Black Rev D reference, commit `c7bbdb9676c0cacc8dd9a2f656ee2dab34d98fca`. Its source URL and vendor references are recorded in `hdmi/reference/sources.json`. Downloaded vendor PDFs, IBIS files and solver binaries are omitted. Component names and manufacturer part numbers identify their respective owners.

Optional RAM 3D models reference the public tscircuit model CDN and are not bundled.

