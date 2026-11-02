import {moveR5} from './CloudR5Placement'
import {applyD6TopRoute} from './CloudD6TopRouting'
import {applyResetPullPlacement} from './CloudResetPullPlacement'
import {removeOldWarmResetBodies} from './CloudWarmResetCleanup'
import {applyVsyncReferenceBody} from './CloudVsyncReferenceRepair'
import {applySys5vEndpointCleanup} from './CloudSys5vEndpointCleanup'
import {applyTypecHookCleanup} from './CloudTypecHookCleanup'
/** Exact V28 composition; no fixture barrels, R177 move, or pending CKE/RX scopes. */
export function applyCloudRouting232(node:any):any {
 node=moveR5(node)
 node=applyD6TopRoute(node)
 node=applyResetPullPlacement(node)
 node=removeOldWarmResetBodies(node)
 node=applyVsyncReferenceBody(node)
 node=applySys5vEndpointCleanup(node)
 return applyTypecHookCleanup(node)
}
