import {CloudHdmiVideoRoutes as Base} from './CloudHdmiVideoCheckpoint222'
import {applyControlRegionEndpointV2} from './CloudControlRegionMapper'
import {applyD16D18LayerSwap,CloudVideoLayerSwapReturn} from './CloudVideoLayerSwap'
export function CloudHdmiVideoRoutes(){return <>{applyD16D18LayerSwap(applyControlRegionEndpointV2(Base()))}<CloudVideoLayerSwapReturn/></>}
