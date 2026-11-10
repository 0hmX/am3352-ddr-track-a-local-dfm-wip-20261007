import { savedRefdesStyle } from "./layout/SavedSilkscreen"
import { passiveLayout } from "./schematic/PassiveLayout"
import originalParts from './data/support-components'
import { usbCPortParts, usbCPortPlacement, usbCPortFootprints, usbCPortCourtyards, removedPowerParts, connectionOverrides } from './data/usb-c-ports'
export const parts = [...originalParts.filter(p => !p.name.startsWith('U_LCD') && !/^[RCLDJ]_LCD/.test(p.name) && !['C_PANEL_100N','C_PANEL_1U',...removedPowerParts].includes(p.name))
  .map(p => connectionOverrides[p.name] ? { ...p, connections: connectionOverrides[p.name] } : p), ...usbCPortParts] as any[]
export const supportSheets = [...new Set(parts.map(p => p.sheet))]
const schematicPlacement = passiveLayout(parts, ["CPU bypass", "CPU power", "DDR bypass", "DDR reference", "Power management", "Power input", "Boot and clock", "Debug and reset"])
// Explicit local networks sit beside their chip pins. Units are schematic-only.
Object.assign(schematicPlacement, {
  L_PWR1: { schX: -15, schY: 48 }, L_PWR2: { schX: -14, schY: 46 },
  L_PWR3: { schX: -15, schY: 44 }, L_PWR4: { schX: -23, schY: 44.9, schRotation: -90 },
  R_PWR1: { schX: -23, schY: 43.4, schRotation: -90 },
  J_POWER: { schX: -3, schY: 8 }, U_TYPEC_NOR: { schX: -6.46, schY: 2 },
  U_INPUT_EFUSE: { schX: 8.08, schY: 0 }, U_PD: { schX: 0.53, schY: 0 },
  R_TYPEC_ENABLE_PD: { schX: -7, schY: -2, schRotation: -90 },
  R_INPUT_LIMIT: { schX: 11.5, schY: -0.9, schRotation: -90 },
  R_INPUT_FAULT: { schX: 11.5, schY: 0.5, schRotation: -90 },
  C_INPUT_DVDT: { schX: 4.64, schY: -0.4, schRotation: -90 },
  C_EFUSE_OUT: { schX: 5.29, schY: -3, schRotation: -90 },
  R_SYS_BLEED: { schX: 8, schY: -4, schRotation: -90 },
  C_RAW_TYPEC: { schX: 1, schY: 5, schRotation: -90 },
  C_RAW_NOR: { schX: 2.5, schY: 6, schRotation: -90 },
  C_RAW_EFUSE: { schX: 4, schY: 5, schRotation: -90 },
  C_PD_VBUS: { schX: 5.5, schY: 6, schRotation: 90 },
  C_PD_VDDD: { schX: -4.56, schY: 3, schRotation: 90 },
  C_PD_VDDD_HF1: { schX: -3.57, schY: 4, schRotation: 90 },
  C_PD_VDDD_HF2: { schX: -2, schY: 3, schRotation: 90 },
  C_PD_VCCD: { schX: 6, schY: 1.5, schRotation: 90 },
  R_PD_ISNK_UP: { schX: -4.56, schY: 1.2, schRotation: -90 },
  R_PD_ISNK_DN: { schX: -4.5, schY: -0.4, schRotation: 90 },
})

import supportFootprints from './data/support-footprints'
import mechanics from './data/support-mechanics'
import supportPlacement from './data/support-placement-draft'
const library = { ...supportFootprints, ...usbCPortFootprints }
const courtyards = { ...mechanics.courtyards, ...usbCPortCourtyards }
const placement = { ...supportPlacement, ...usbCPortPlacement }
import { cadModelForFootprint, enclosureOpeningFor } from './models'
const safe=(p:any,s:string)=>'pin'+(Object.keys(p.pinLabels).indexOf(s)+1)
function ImportedFootprint({part}:{part:any}) {
 const lib=(library as any)[part.footprintKey]
 if(!lib) {
  if(part.name.startsWith('TP_UART'))return <footprint><smtpad portHints={['pin1']} shape="circle" radius={0.6} pcbX={0} pcbY={0}/></footprint>
  return part.footprint??'0402'
 }
 const court=(courtyards as any)[part.footprintKey]?.bounds
 const opening=enclosureOpeningFor(part.footprintKey)
 return <footprint insertionDirection={opening.insertionDirection}>{opening.aperture}{court&&<courtyardrect pcbX={(court[0]+court[2])/2} pcbY={(court[1]+court[3])/2} width={court[2]-court[0]} height={court[3]-court[1]}/>} {lib.pads.map((p:any,i:number)=>{
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
export function Support({ sheets = supportSheets }: { sheets?: string[] } = {}){const counts:Record<string,number>={};return <>{parts.filter(p => sheets.includes(p.sheet)).map((p:any)=>{
 const i=counts[p.sheet]??0; counts[p.sheet]=i+1
 if(p.kind==='capacitor' && p.package==='1210' && !p.useImportedFootprint)throw Error(`Declared 1210 capacitor ${p.name} cannot use a fallback footprint`)
 const props={pcbStyle:savedRefdesStyle(p.name),name:p.name,manufacturerPartNumber:p.mpn??undefined,connections:Object.fromEntries(Object.entries(p.connections).map(([pin,net])=>[p.kind==='chip'?safe(p,pin):'pin'+pin,`net.${net}`])),...(placement as any)[p.name],schSheetName:p.sheet,cadModel:p.name.startsWith('TP_')?null:(p.kind==='chip'||p.kind==='inductor'||p.useImportedFootprint)&&(library as any)[p.footprintKey]?cadModelForFootprint(p.footprintKey):undefined,schX:((i%4)-1.5)*13,schY:((Math.ceil(parts.filter(part=>part.sheet===p.sheet).length/4)-1)/2-Math.floor(i/4))*9}
 Object.assign(props, schematicPlacement[p.name])
 if(p.kind==='resistor')return <resistor key={p.name} {...props} resistance={p.value} footprint={p.useImportedFootprint?<ImportedFootprint part={p}/>:p.footprint??'0402'}/>
 if(p.kind==='capacitor')return <capacitor key={p.name} {...props} capacitance={p.value} footprint={p.useImportedFootprint?<ImportedFootprint part={p}/>:p.footprint??'0402'}/>
 if(p.kind==='inductor')return <inductor key={p.name} {...props} inductance={p.value} footprint={<ImportedFootprint part={p}/>}/>
 return <chip key={p.name} {...props} schWidth={({U_PMIC:2.57,U_PD:2.25,U_ETH_PHY:2.55,U_ETH_ISO0:1.33,U_ETH_ISO1:1.33,U_ETH_RESET:1.85,U_ETH_RAMP:1.36,J_ETH:2.78,J_MICROSD:2.37,U_RESET_DELAY:1.85,U_RTC_RESET_DELAY:1.77,U_RTC_POR_GATE:1.35,U_INPUT_EFUSE:1.65} as Record<string,number>)[p.name]} pinLabels={Object.fromEntries(Object.entries(p.pinLabels).map(([pin,label])=>[safe(p,pin),[pin,String(label)+'_'+pin]]))} noConnect={p.noConnect.map((s:string)=>safe(p,s))} footprint={<ImportedFootprint part={p}/>}/>
 })}</>}
