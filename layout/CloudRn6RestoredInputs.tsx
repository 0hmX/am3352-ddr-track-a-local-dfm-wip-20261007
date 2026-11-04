import {Children,cloneElement} from 'react'
import {CloudRn6InputRoutesV2} from './CloudRn6InputBase'
import {CloudRn6DeTopRoute} from './CloudRn6DeTopRoute'
/** Four real input nets. DE uses the checked top alternative; all signal vias are terminal-centered. */
export function CloudRn6RestoredInputs(){const base=CloudRn6InputRoutesV2();const kept=Children.toArray(base.props.children).filter((x:any)=>x.props.name!=='RN6_INPUT_LCD_DE');return <>{cloneElement(base,{},...kept)}<CloudRn6DeTopRoute/></>}
