# Routing checkpoint: 244 of 251 nets

This update completes four additional nets since the prior 240-net snapshot: HDMI_D2, HDMI_D17, HDMI_D5 and HDMI_D20. All previously connected nets are preserved. The seven remaining nets are HDMI_D0/D8/D11/D15 and SYSBOOT2/6/10.

RN0 and RN4 routing now use reviewed support placements and exact isolated 33-ohm resistor mappings. Coordinated D21/D22 and D2/INT routing uses bounded local spacing intervals. Two existing ground stitch moves preserve PGOOD reference coverage. DDR reference repairs keep all 46 timing-route lengths, layers and widths, with 68 centered signal vias: 12 routes use zero and 34 use two.

The fresh combined native board and independent emitted Gerber/Excellon checks found zero physical shorts, missing copper/drills or new reference cuts. All 393 ground terminals are connected after drilling. The strict native command still exits 1 for two reviewed projected warnings whose actual spans are disjoint; these are retained, not suppressed. There are 23 such projected warnings overall. Official trace lint reports zero issues; broader corner cleanup remains.

Open limitations include 13 DDR reference-area findings, additional zero/sub-0.010 mm reference margins, three intermediate signal transitions, nine off-pad power joins, two connector overhangs and 15 missing-courtyard warnings. The RAM supply retains capacitor-barrel dependencies. RN4 CPU-to-series leads are longer than the original placement, and the selected D2/INT and INT/SDA corridors increase coupling exposure. These are explicit routing tradeoffs, not SI or fabrication approval. RGB timing, active pull stubs, current capacity and actual layer construction remain unqualified.

The active board is `index.tsx`. Source/data bytes match accepted local checkpoint `a96772d3de9d3d049a4ac00c8e1cde366c3d8803`; publication creates a separate commit on the existing draft branch. Native export SHA256: `dc9676ecd03e5611117619153797c043be185ebea2580e025443f9fa90508df2`. [Machine-readable validation summary](routing-244-validation.json). The prior [240-net snapshot](routing-240-snapshot.md) remains historical evidence.

Keep this PR draft. This is not a manufacturing release or boot, timing, SI/PI or ampacity signoff.
