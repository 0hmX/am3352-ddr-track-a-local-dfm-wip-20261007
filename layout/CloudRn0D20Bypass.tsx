import React from "react";
import candidate from "../data/cloud-rn0-d20-bypass.json";

// Conditional companion to the complete RN0 Top270(9.5,3) original-map move.
// RN1, both actual endpoints, the CPU escape, and the RN1 through-barrel stay fixed.
// Apply only to the current common tree; this file imports no historical board.
export function applyFixedD20Rn0Bypass(node: any): any {
  if (Array.isArray(node)) return node.map(applyFixedD20Rn0Bypass);
  if (!node || typeof node !== "object" || !node.props) return node;
  if (typeof node.type === "function") return applyFixedD20Rn0Bypass(node.type(node.props));
  const p = { ...node.props };
  if (node.type === "trace" && p.name === "VIDEO_HDMI_RGB_D20_6") {
    if (p.from !== ".Processor > .U1 > .U12" || p.to !== ".HDMI > .RN_HDMI_1 > .1" ||
        p.pcbPathRelativeTo !== ".Processor > .U1 > .A1") {
      throw new Error("D20 companion requires the unchanged original-map endpoints/world anchor");
    }
    const terminal = p.pcbPaths.flat().find((q: any) => q && q.via && q.x === 8 && q.y === 8.475);
    if (!terminal || terminal.fromLayer !== "top" || terminal.toLayer !== "bottom") {
      throw new Error("D20 companion requires the original centered RN1.1 Top-to-Bottom barrel");
    }
    p.pcbPaths = [[p.from,
      ...candidate.route.points.map(([x, y]: number[]) => ({ x, y, layer: "top" })),
      { ...terminal }, { x: 8, y: 8.475, layer: "bottom" }, p.to]];
  }
  if (p.children) p.children = applyFixedD20Rn0Bypass(p.children);
  return { ...node, props: p };
}
