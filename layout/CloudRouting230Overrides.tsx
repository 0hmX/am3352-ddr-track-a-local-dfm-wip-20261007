import {moveR14} from './CloudR14Placement'
import {applyIntPullPlacement} from './CloudIntPullPlacement'
import {applyControlCornerCleanup} from './CloudControlCornerCleanup'
import {applyR4PullCleanup} from './CloudR4PullCleanup'
/** Reviewed V26 composition. R177, RESET, D6 and later scope studies remain excluded. */
export function applyCloudRouting230(node:any):any{return applyR4PullCleanup(applyControlCornerCleanup(applyIntPullPlacement(moveR14(node))))}
