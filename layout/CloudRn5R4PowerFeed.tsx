import r from '../data/cloud-rn5-r4-power.json'
/** .15mm feed to the real 10k boot pull: maximum DC sink 3.3V/10k=.33mA.
 * Both terminals reuse real pad-centered V3 supply barrels; no added drill.
 * High-current/VREF source strips are preserved exactly.
 */
export function CloudRn5R4V3Feed(){return <trace name="RN5_R4_V3_REAL_PAD_FEED" from=".V3V3_FEED_58 > .inner5" to=".V3V3_FEED_55 > .inner5" width={.15} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".V3V3_FEED_58 > .inner5",...r.points.map(([x,y])=>({x,y,layer:'inner5'})),".V3V3_FEED_55 > .inner5"]]}/>}
