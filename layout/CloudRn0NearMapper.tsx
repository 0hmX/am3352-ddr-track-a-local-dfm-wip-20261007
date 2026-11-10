import {Children,cloneElement,isValidElement} from 'react'
const retired=new Set(['VIDEO_HDMI_RGB_D18_4','VIDEO_HDMI_RGB_D19_5','VIDEO_HDMI_RGB_D17_7','VIDEO_HDMI_D18_14','VIDEO_HDMI_RGB_D16_32','CLOUD_HDMI_LAYERED_HDMI_D9'])
export function applyRn0Near(x:any):any {
 if(Array.isArray(x))return x.map(applyRn0Near)
 if(!isValidElement(x))return x
 if(typeof x.type==='function')return applyRn0Near(x.type(x.props))
 const p:any={...x.props}
 if(x.type==='trace'&&retired.has(p.name))return null
 if(p.name==='RN_HDMI_0')Object.assign(p,{pcbX:9.5,pcbY:3,pcbRotation:270,layer:'top'})
 if(x.type==='trace'&&['CLOUD_LOCAL_54_I2C0_SCL','CLOUD_LOCAL_56_I2C0_SDA'].includes(p.name)){
  const sda=p.name==='CLOUD_LOCAL_56_I2C0_SDA', yy=sda?-22.3:-22, xs=sda?[26.6,37.2]:[28.4,37.775]
  let changed=0
  p.pcbPaths=p.pcbPaths.map((path:any[])=>path.map(q=>{
   if(q&&typeof q==='object'&&!q.via&&Math.abs(q.y-yy)<1e-6&&xs.some(xx=>Math.abs(q.x-xx)<1e-6)){changed++;return{...q,x:q.x-.25,y:q.y+.25}}
   return q
  }))
  if(changed!==2)throw Error(`I2C bounded companion expected2 corners on ${p.name}, got${changed}`)
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyRn0Near(p.footprint)
 return cloneElement(x,p,...Children.toArray(x.props.children).map(applyRn0Near))
}
