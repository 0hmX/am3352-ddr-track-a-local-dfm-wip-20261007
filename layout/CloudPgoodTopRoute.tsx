import React from "react";
import candidate from "../data/cloud-pgood-top-route.json";
// Apply to the current root tree. Original component selectors and world anchor stay exact.
export function applyFixedPgood48Top(node:any):any {
 if(Array.isArray(node))return node.map(applyFixedPgood48Top);
 if(!node||typeof node!=="object"||!node.props)return node;
 if(typeof node.type==="function")return applyFixedPgood48Top(node.type(node.props));
 const p={...node.props};
 if(node.type==="trace"&&p.name==="CLOUD_LOCAL_48_PMIC_PGOOD"){
  p.pcbPaths=[[p.from,...candidate.route.points.map(([x,y]:number[])=>({x,y})),p.to]];
 }
 if(p.children)p.children=applyFixedPgood48Top(p.children);
 return {...node,props:p};
}
