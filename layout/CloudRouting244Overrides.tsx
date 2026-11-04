import {applyD21D22Inner4} from './CloudD21D22Inner4'
import {applyRn4NearMove} from './CloudRn4NearMapper'
import {applyD2IntCompanion} from './CloudD2IntCompanion'
/** Selected local routing deltas. Existing PGOOD and DDR repairs remain inside this composition. */
export function applyCloudRouting244(x:any){return applyD2IntCompanion(applyRn4NearMove(applyD21D22Inner4(x)))}
