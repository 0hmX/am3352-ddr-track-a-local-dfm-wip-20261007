import {applyPmicCompactWithFeed} from './CloudPmicCompactFeed'
import {applyWarmResetPull} from './CloudWarmResetPullMapper'
/** Only the validated combined delta; conditional RN5/MPU studies are excluded. */
export function applyCloudControlCleanup(node:any):any {
 return applyWarmResetPull(applyPmicCompactWithFeed(node))
}
