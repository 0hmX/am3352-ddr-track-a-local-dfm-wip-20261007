import {Children,cloneElement,isValidElement} from "react"

// Literal native positions for unreferenced GND stitches; see the bounded
// screen and native/physical evidence in docs/through-vias/.
const positions = {
  "CLOUD_LOCAL_RETURN_0": [-8.558134, 8.560476],
  "CLOUD_LOCAL_RETURN_5": [-0.1, 1.25],
  "CLOUD_LOCAL_RETURN_6": [7.6375, -13.05],
  "SYSBOOT4_RETURN_0": [-0.131259, 2.40765],
  "DDR_CK_RAM_RETURN": [1.15, -28.1],
  "CLOUD_ETH_RETURN_12": [7.65, 2.7],
  "SYS8_12_ARRAY_RETURN": [5.666667, -15.325],
  "RESET_CPU_REFERENCE_TIE": [-5.809619, 7.359619],
  "MDIO_I4_RETURN_0": [1.633169, 5.711889],
} as const

export function applyControlGroundThroughVias(node:any):any {
 if(Array.isArray(node))return node.map(applyControlGroundThroughVias)
 if(!isValidElement<any>(node))return node
 if(typeof node.type==='function')return applyControlGroundThroughVias(node.type(node.props))
 if(node.type==='via'&&Object.hasOwn(positions,node.props.name)){
  const [x,y]=positions[node.props.name as keyof typeof positions]
  if(node.props.connectsTo!=='net.GND'||node.props.holeDiameter!==.15||node.props.outerDiameter!==.3)throw Error('Unexpected GND stitch identity '+node.props.name)
  return <via key={node.key} name={node.props.name} pcbX={x} pcbY={y} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.GND"/>
 }
 return node.props.children===undefined?node:cloneElement(node,{children:Children.map(node.props.children,applyControlGroundThroughVias)})
}
