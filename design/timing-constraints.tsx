import { Fragment } from "react"
import ballMap from "./am3352-ballmap"
const pin = (signal:string) => {
 const ball=Object.entries(ballMap).find(([,s])=>s===signal)?.[0]
 if (!ball) throw new Error(`Unknown AM3352 signal: ${signal}`)
 return `.U1 > .${ball}`
}
// TI SPRS717L Tables 7-68 / 7-69: 25 mil byte skew, 5 mil differential skew.
export function TimingConstraints() {
 return <>
  {[0,1].map(byte=><Fragment key={byte}>
   <bus name={`DDR_BYTE${byte}`} routingPhaseIndex={1} maxLengthSkew={0.635} maxLength={{reference:"longest_manhattan"}} connections={[
    ...Array.from({length:8},(_,bit)=>pin(`DDR_D${byte*8+bit}`)),pin(`DDR_DQM${byte}`),pin(`DDR_DQS${byte}`),pin(`DDR_DQSn${byte}`)
   ]}/>
   <differentialpair name={`DDR_DQS_PAIR${byte}`} positiveConnection={pin(`DDR_DQS${byte}`)} negativeConnection={pin(`DDR_DQSn${byte}`)} maxLengthSkew={0.127} pcbTraceGap={0.12}/>
  </Fragment>)}
  <differentialpair name="DDR_CK_PAIR" positiveConnection={pin("DDR_CK")} negativeConnection={pin("DDR_CKn")} maxLengthSkew={0.127} pcbTraceGap={0.12}/>
  {/* Conservative full-path matching; TI specifies main bus and memory stubs separately. */}
  <bus name="DDR_ADDR_CTRL" routingPhaseIndex={1} maxLengthSkew={0.635} connections={[
   ...Array.from({length:13},(_,bit)=>pin(`DDR_A${bit}`)),
   ...Array.from({length:3},(_,bit)=>pin(`DDR_BA${bit}`)),
   ...["DDR_CK","DDR_CKn","DDR_CKE","DDR_CSn0","DDR_RASn","DDR_CASn","DDR_WEn","DDR_ODT"].map(pin)
  ]}/>
 </>
}
