import {applyFixedD20Rn0Bypass} from './CloudRn0D20Bypass'
import {applyRn0Near} from './CloudRn0NearMapper'
import {applyKeepRxd0} from './CloudRn0KeepRxd0'
/** Reviewed RN0 Option B and current-source companions; no RN4 move. */
export function applyCloudRouting242(x:any){return applyKeepRxd0(applyRn0Near(applyFixedD20Rn0Bypass(x)))}
