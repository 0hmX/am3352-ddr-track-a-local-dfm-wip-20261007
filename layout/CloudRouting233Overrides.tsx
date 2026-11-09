import {applyMpuFeedbackVip} from './CloudMpuFeedbackVip'
import {applyTxcRextSourceRelief} from './CloudTxcRextSourceRelief'
import {applyMpuCap1Inner5} from './CloudMpuCap1Inner5'
/** Current composed mapper order; all pending CKE/RN5 placement studies excluded. */
export function applyCloudRouting233(node:any):any {
 const mpu = applyMpuFeedbackVip(node)
 const txc = applyTxcRextSourceRelief(mpu)
 return applyMpuCap1Inner5(txc)
}
