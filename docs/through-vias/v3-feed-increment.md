# 3.3 V distribution increment

Extends 54 existing V3V3 distribution barrels to Top..Bottom in the native
`CloudMainPowerPlanes.tsx` source. Existing matched inner ports preserve the
Inner2 connection of V3V3_FEED_33. All other affected feeds connect through pours.

Ports the final via coordinates of V3V3_FEED_52, _87 and _93 into their literal
TSX definitions. Removes the obsolete via-position/span overrides from
`CloudSclPullRelief`, `CloudI2cSclRealPull`, `CloudIntPullPlacement` and
`CloudResetPullPlacement`; component placement and signal-route overrides stay
unchanged. Removes the obsolete V3V3_FEED_33 depth override from
`CloudPmicCompactFeed`. Native source comparison confirms all 54 effective via
props are unchanged except physical span. No JSON route-data edits or additions.
Implementation diff: 77 lines added / 81 removed.

[Validation and complete via-name inventory](v3-feed-validation.json):
**410 through / 800 non-through** (789 snapshot shorts + 11 clearance-only;
204 pour-only / 596 involving other copper). Native render errors 0; all 686 native
connectivity entries connected, no physical shorts or new enforced findings.
Inherited 20 different-net + 3 same-net via-spacing findings remain. Two new
optional plated-drill margins are recorded; configured copper rules pass.

Trace copper, all 1,527 original component-pin net assignments, all component
placements and via positions/nets/diameters are unchanged. Independent emitted
Gerber/Excellon verification passes: 257/257 named-net groups connected, zero
shorts/missing drills/missing copper, 1,236 barrel records matched. Four TSX tests /
23 assertions pass. Multiple drill spans remain; SI/PI and fabrication are unqualified.
