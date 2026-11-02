import {applyCompactRefclkBody} from './CloudRefclkBodyMapper'
import {applyCrsReducedTransitions} from './CloudCrsReducedMapper'
/** Preserve both existing unresolved CPU midpoint transitions; this is partial compliance. */
export function applyCloudRouting235(node:any):any{return applyCrsReducedTransitions(applyCompactRefclkBody(node))}
