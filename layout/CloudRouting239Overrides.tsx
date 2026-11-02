import {applyFixedBulkFeedCandidate,applyFixedBulkGroundCandidate} from './CloudMpuBulkPadFeed'
import {applyPclkCkeWideClearance} from './CloudPclkCkeRelief'
import {applySys13UpperRelief} from './CloudSys13UpperRelief'
import {applyD3OscGateRelief} from './CloudD3OscGateRelief'
import {applyOscEnablePull} from './CloudOscEnablePullMapper'
import {applyRn5OutputReplacements} from './CloudRn5EastOutputs'
import {applyRn5WholeInputMove} from './CloudRn5WholeMove'
import {applyRn5AdaptiveD10} from './CloudRn5AdaptiveD10'
/** Scoped, validated support placement and routing changes; see the review register. */
export function applyCloudRouting239(node:any):any{
 let current=applyFixedBulkGroundCandidate(applyFixedBulkFeedCandidate(node))
 current=applyPclkCkeWideClearance(current)
 current=applySys13UpperRelief(current)
 current=applyD3OscGateRelief(current)
 current=applyOscEnablePull(current)
 current=applyRn5OutputReplacements(current)
 current=applyRn5WholeInputMove(current)
 return applyRn5AdaptiveD10(current)
}
