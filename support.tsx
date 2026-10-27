import { savedRefdesStyle } from "./layout/SavedSilkscreen"
import originalParts from './data/support-components'
export const parts = originalParts.filter(p => !p.name.startsWith('U_LCD') && !/^[RCLDJ]_LCD/.test(p.name) && !['C_PANEL_100N','C_PANEL_1U'].includes(p.name))
export const supportSheets = [...new Set(parts.map(p => p.sheet))]
import library from './data/support-footprints'
import mechanics from './data/support-mechanics'
import placement from './data/support-placement-draft'
const safe=(p:any,s:string)=>'pin'+(Object.keys(p.pinLabels).indexOf(s)+1)
function ImportedFootprint({part}:{part:any}) {
 const lib=(library as any)[part.footprintKey]
 if(!lib) {
  if(part.name.startsWith('TP_UART'))return <footprint><smtpad portHints={['pin1']} shape="circle" radius={0.6} pcbX={0} pcbY={0}/></footprint>
  return part.footprint??'0402'
 }
 const court=(mechanics as any).courtyards[part.footprintKey]?.bounds
 return <footprint>{court&&<courtyardrect pcbX={(court[0]+court[2])/2} pcbY={(court[1]+court[3])/2} width={court[2]-court[0]} height={court[3]-court[1]}/>} {lib.pads.map((p:any,i:number)=>{
  const hints=p.pin?[safe(part,p.pin)]:[]
  if(p.type==='np_thru_hole')return <hole key={i} pcbX={p.x} pcbY={p.y} diameter={Number(p.drill?.[0]??p.width)}/>
  if(p.type==='thru_hole') {
   if(p.drill?.[0]==='oval')return <platedhole key={i} portHints={hints} pcbX={p.x} pcbY={p.y} shape="pill" holeWidth={Number(p.drill[1])} holeHeight={Number(p.drill[2])} outerWidth={p.width} outerHeight={p.height} pcbRotation={p.rotation}/>
   return <platedhole key={i} portHints={hints} pcbX={p.x} pcbY={p.y} shape="circle" holeDiameter={Number(p.drill?.[0])} outerDiameter={Math.max(p.width,p.height)}/>
  }
  if(p.shape==='circle')return <smtpad key={i} portHints={hints} pcbX={p.x} pcbY={p.y} shape="circle" radius={p.width/2}/>
  return <smtpad key={i} portHints={hints} pcbX={p.x} pcbY={p.y} shape="rect" width={Math.abs(p.rotation)%180===90?p.height:p.width} height={Math.abs(p.rotation)%180===90?p.width:p.height}/>
 })}</footprint>
}
export function Support(){const counts:Record<string,number>={};return <>{parts.map((p:any)=>{
 const i=counts[p.sheet]??0; counts[p.sheet]=i+1
 if(p.kind==='capacitor' && p.package==='1210' && !p.useImportedFootprint)throw Error(`Declared 1210 capacitor ${p.name} cannot use a fallback footprint`)
 const props={pcbStyle:savedRefdesStyle(p.name),name:p.name,manufacturerPartNumber:p.mpn??undefined,connections:Object.fromEntries(Object.entries(p.connections).map(([pin,net])=>[p.kind==='chip'?safe(p,pin):'pin'+pin,`net.${net}`])),...(placement as any)[p.name],schSheetName:p.sheet,schX:((i%4)-1.5)*13,schY:((Math.ceil(parts.filter(part=>part.sheet===p.sheet).length/4)-1)/2-Math.floor(i/4))*9}
 if(p.kind==='resistor')return <resistor key={p.name} {...props} resistance={p.value} footprint={p.useImportedFootprint?<ImportedFootprint part={p}/>:p.footprint??'0402'}/>
 if(p.kind==='capacitor')return <capacitor key={p.name} {...props} capacitance={p.value} footprint={p.useImportedFootprint?<ImportedFootprint part={p}/>:p.footprint??'0402'}/>
 if(p.kind==='inductor')return <inductor key={p.name} {...props} inductance={p.value} footprint={<ImportedFootprint part={p}/>}/>
 return <chip key={p.name} {...props} pinLabels={Object.fromEntries(Object.entries(p.pinLabels).map(([pin,label])=>[safe(p,pin),[pin,String(label)+'_'+pin]]))} noConnect={p.noConnect.map((s:string)=>safe(p,s))} footprint={<ImportedFootprint part={p}/>}/>
 })}</>}
