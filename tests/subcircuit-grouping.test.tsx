import { expect, test } from "bun:test"
import { Circuit } from "@tscircuit/core"
import { Children, cloneElement } from "react"
import { getFullConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map"
import Board from "../index"
import { ProvisionalDdrRoutes } from "../layout/ProvisionalDdrRoutes"
import { ProvisionalDdrAddressRoutes } from "../layout/ProvisionalDdrAddressRoutes"
import { ProvisionalDdrByte0Routes } from "../layout/ProvisionalDdrByte0Routes"
import { ProvisionalDdrByte1Routes } from "../layout/ProvisionalDdrByte1Routes"
import { subcircuitComponents } from "../subcircuits"
import { parts as supportParts } from "../support"

async function compile(flat: boolean) {
  const circuit = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
  circuit.schematicDisabled = flat
  const board = Board()
  const children = Children.toArray(board.props.children).filter((child: any) => ![ProvisionalDdrRoutes, ProvisionalDdrAddressRoutes, ProvisionalDdrByte0Routes, ProvisionalDdrByte1Routes].includes(child.type))
  // Expand only the known wrapper components; keep the production tree idiomatic.
  const expanded = flat ? children.map((child: any) => subcircuitComponents.includes(child.type) ? child.type(child.props) : child) : children
  circuit.add(cloneElement(board, {}, flat ? expanded.flatMap((child: any) =>
    child.type === "subcircuit" ? Children.toArray(child.props.children) : [child]).map((child: any, key) => cloneElement(child, { key })) : children))
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson() as any[]
}

function physicalParts(records: any[]) {
  const names = new Map(records.filter(r => r.type === "source_component").map(r => [r.source_component_id, r.name]))
  return records.filter(r => r.type === "pcb_component").map(r => ({
    name: names.get(r.source_component_id), center: r.center, rotation: r.rotation,
    layer: r.layer, width: r.width, height: r.height,
  })).sort((a,b) => a.name.localeCompare(b.name))
}

function logicalNets(records: any[]) {
  const map = getFullConnectivityMapFromCircuitJson(records)
  const names = new Map(records.filter(r => r.type === "source_component").map(r => [r.source_component_id, r.name]))
  const nets = new Map<string, string[]>()
  for (const port of records.filter(r => r.type === "source_port" && names.has(r.source_component_id))) {
    const key = map.getNetConnectedToId(port.source_port_id) ?? port.source_port_id
    nets.set(key, [...(nets.get(key) ?? []), `${names.get(port.source_component_id)}.${port.name}`])
  }
  return [...nets.values()].map(ports => ports.sort().join(",")).sort()
}

test("functional subcircuits preserve placement and electrical connectivity across both board sides", async () => {
  const flat = await compile(true)
  const grouped = await compile(false)
  expect(physicalParts(grouped)).toEqual(physicalParts(flat))
  expect(logicalNets(grouped)).toEqual(logicalNets(flat))
  expect(grouped.filter(r => r.type.endsWith("_error"))).toEqual([])
  const sourceNames = grouped.filter(r => r.type === "source_component").map(r => r.name)
  for (const part of supportParts) expect(sourceNames.filter(name => name === part.name)).toHaveLength(1)
  const groups = grouped.filter(r => r.type === "pcb_group")
  expect(groups.length).toBe(11)
  const parts = grouped.filter(r => r.type === "pcb_component")
  for (const part of parts) {
    const group = groups.find(g => g.pcb_group_id === part.pcb_group_id)
    expect(group).toBeDefined()
    expect(group.is_subcircuit).toBe(true)
    expect(Math.abs(part.center.x - group.center.x) + part.width / 2).toBeLessThanOrEqual(group.width / 2 + 1e-7)
    expect(Math.abs(part.center.y - group.center.y) + part.height / 2).toBeLessThanOrEqual(group.height / 2 + 1e-7)
  }
  expect(parts.some(p => p.layer === "top")).toBe(true)
  expect(parts.some(p => p.layer === "bottom")).toBe(true)
}, 120000)
