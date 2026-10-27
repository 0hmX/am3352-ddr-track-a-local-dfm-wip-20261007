import {bindFrozenCopperRegion} from '../data/native-pour-region-adapter'
const path='M-2,-2L2,-2L2,2L-2,2ZM-1,-1L-1,1L1,1L1,-1Z'
function rejects(fn:()=>void, label:string){try{fn()}catch{return}throw new Error(`Failed to reject ${label}`)}
rejects(()=>bindFrozenCopperRegion({} as any,path),'incompatible primitive API')
rejects(()=>bindFrozenCopperRegion({} as any,'M0,0L1,0LNaN,1Z'),'nonfinite geometry')
rejects(()=>bindFrozenCopperRegion({} as any,'M0,0L1,0Z'),'invalid ring')
rejects(()=>bindFrozenCopperRegion({} as any,'M,0L1,0L0,1Z'),'empty coordinate')
const fake:any={config:{componentName:'CopperPour'},doInitialPcbCopperPourRender(){},getSubcircuit(){return {selectOne(){return null}}},root:{db:{pcb_copper_pour:{insert(){throw new Error('Unexpected insertion')}}}},_parsedProps:{connectsTo:'net.MISSING'},_getBoard(){return {_parsedProps:{enableViaStitching:true}}}}
bindFrozenCopperRegion(fake,path)
rejects(()=>fake.doInitialPcbSimulationRender(),'missing named net')
rejects(()=>fake.doInitialPcbViaStitchRender(),'automatic via stitching')
console.log('PASS incompatible primitive, malformed geometry, missing net, automatic stitching fail closed')
