# Third-party notices

This is a board design derived from the original public tscircuit project linked in README.md. No new blanket license is assigned by this publication.

Design-specific footprint coordinates include adaptations from the KiCad libraries. Their sources, dimensions, reference documents and checksums are recorded in `hdmi/data/footprints.json` and `hdmi/reference/sources.json`. KiCad libraries use CC-BY-SA 4.0 with the electronic-design exception; see the [official license](https://www.kicad.org/libraries/license/). Historical local KiCad source paths in metadata are provenance, not runtime dependencies.

The HDMI design was checked against the BeagleBone Black Rev D reference, commit `c7bbdb9676c0cacc8dd9a2f656ee2dab34d98fca`. Its source URL and vendor references are recorded in `hdmi/reference/sources.json`. Downloaded vendor PDFs, IBIS files and solver binaries are omitted. Component names and manufacturer part numbers identify their respective owners.

Optional RAM 3D models reference the public tscircuit model CDN and are not bundled.

The experimental `simulations-next/saved-board.tsx` adapter is derived from `tscircuit/pcb-spice-pipeline`, commit `63d15671`, under MIT; its only noted change preserves the saved outline. The upstream MIT notice is in `licenses/pcb-spice-pipeline-MIT.txt`.
