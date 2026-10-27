import { Circuit } from "@tscircuit/core"
import { Children, cloneElement, isValidElement, Fragment, type ReactElement } from "react"
import { AM3352 } from "../components/AM3352"
import { W631GG6MB_12, pinLabels as ramLabels } from "../imports/W631GG6MB_12"
import { checkTracesAreContiguous, checkEachPcbPortConnectedToPcbTraces, checkViaPadClearance, checkEachPcbTraceNonOverlapping, checkPadTraceClearance } from "@tscircuit/checks"
import { getFullConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map"

type ViaBinding = "inherited" | "explicit-net"

/** Native TSX reproduction: two connected pads with coincident blind vias. */
export default function ViaInPadRoutingRepro({ binding = "inherited", phased = false, actualBga = true, sparse = false, rounded = false, viaOffset = 0, noVias = false, savedFanout = false }: { binding?: ViaBinding; phased?: boolean; actualBga?: boolean; sparse?: boolean; rounded?: boolean; viaOffset?: number; noVias?: boolean; savedFanout?: boolean }) {
  const explicitNet = (chip: ReactElement<any>) => cloneElement(chip, {
    footprint: cloneElement(chip.props.footprint, {}, ...Children.toArray(chip.props.footprint.props.children).flatMap(child => {
      if (!isValidElement<any>(child)) return [child]
      if (sparse && child.type === "smtpad" && !child.props.portHints.some((pin: string) => chip.props.connections[pin])) return []
      if (noVias && child.type === "via") return []
      return [cloneElement(child, {
        ...(child.type === "via" && binding === "explicit-net" ? { connectsTo: "net.SIGNAL" } : {}),
        ...(rounded && (child.type === "via" || child.type === "smtpad") ? {
          pcbX: Number.parseFloat(child.props.pcbX).toFixed(6), pcbY: Number.parseFloat(child.props.pcbY).toFixed(6),
        } : {}),
        ...(viaOffset && child.type === "via" ? { pcbX: Number.parseFloat(child.props.pcbX) + viaOffset } : {}),
      })]
    })),
  })
  const maybeFanout = (chip: ReactElement<any>) => {
    if (!savedFanout) return explicitNet(chip)
    const pads = Children.toArray(chip.props.footprint.props.children).filter(child => isValidElement<any>(child) && child.type === "smtpad") as ReactElement<any>[]
    const pin = Object.keys(chip.props.connections)[0]
    const pad = pads.find(pad => pad.props.portHints.includes(pin))!
    const x = Number.parseFloat(pad.props.pcbX), y = Number.parseFloat(pad.props.pcbY)
    return <fanout name={`${chip.props.name}_VIP`} pcbX={chip.props.pcbX} pcbY={chip.props.pcbY}
      autorouter={{ allowViaInPad: true }} pcbTracePaths={[{ connection: `.${chip.props.name} > .${pin}`, route: [
        { route_type: "via", x, y, from_layer: "top", to_layer: "inner2", via_diameter: 0.3, via_hole_diameter: 0.15 },
        { route_type: "wire", x, y, width: 0.1, layer: "inner2" },
        { route_type: "wire", x: x + 0.2, y, width: 0.1, layer: "inner2" },
      ] }]}>
      {cloneElement(chip, { pcbX: 0, pcbY: 0, footprint: cloneElement(chip.props.footprint, {}, ...Children.toArray(chip.props.footprint.props.children).filter(child => !isValidElement(child) || child.type !== "via")) })}
    </fanout>
  }
  const ramPin = Object.entries(ramLabels).find(([, [, signal]]) => signal === "A5")![0]
  return <board width={98} height={65.5} layers={8} isViaInPadAllowed allowBlindAndBuriedVias
    outline={[{ x: -28, y: 26.5 }, { x: 70, y: 26.5 }, { x: 70, y: -39 }, { x: -28, y: -39 }]}
    autorouter={{ preset: "auto_local", allowViaInPad: true }} autorouterVersion="latest"
    minTraceWidth={0.1} minTraceToPadEdgeClearance={0.1} minPadEdgeToPadEdgeClearance={0.1}
    minViaHoleDiameter={0.15} minViaPadDiameter={0.3} minBoardEdgeClearance={0.2} routeRemaining={!phased}>
    <net name="SIGNAL" routingPhaseIndex={phased ? 1 : undefined} />
    {!actualBga && <net name="OTHER" routingPhaseIndex={phased ? 2 : undefined} />}
    {phased && <><autoroutingphase phaseIndex={1} /><autoroutingphase phaseIndex={2} /></>}
    {actualBga ? <>
      {maybeFanout(AM3352({ name: "U1", pcbX: 0, pcbY: 0, connections: { pin2: "net.SIGNAL" }, noSchematicRepresentation: true, viaInPad: true, viaInPadToLayer: "inner2" }))}
      {maybeFanout(W631GG6MB_12({ name: "U3", pcbX: 0, pcbY: -27, connections: { [ramPin]: "net.SIGNAL" }, noSchematicRepresentation: true, viaInPad: true, viaInPadToLayer: "inner2" }))}
    </> : [-3, 3].map((x, index) => <chip key={index} name={`U${index + 1}`} pcbX={x} pcbY={0}
      pinLabels={{ pin1: ["B1"], pin2: ["A1"] }} connections={{ pin1: "net.SIGNAL", pin2: "net.OTHER" }}
      footprint={<footprint>
        {["SIGNAL", "OTHER"].map((net, pin) => <Fragment key={pin}>
          <smtpad key={`pad${pin}`} portHints={[`pin${pin + 1}`]} pcbX={0} pcbY={pin * 0.8} shape="circle" radius={0.2} />
          <via key={`via${pin}`} name={`padVia_pin${pin + 1}`} pcbX={0} pcbY={pin * 0.8} holeDiameter={0.15} outerDiameter={0.3}
            fromLayer="top" toLayer="inner2" connectsTo={binding === "explicit-net" ? `net.${net}` : undefined} />
        </Fragment>)}
      </footprint>} />)}
  </board>
}

if (import.meta.main) {
  // Default succeeds only when the known dense-BGA topology failure reproduces.
  // --saved-fanout succeeds only when the workaround routes and passes all checks.
  // --generic, --sparse and --no-vias are passing isolation controls.
  // An unexpected result in any variant exits nonzero; nothing is serialized.
  let failures = 0
  function assert(condition: unknown, message: string): asserts condition {
    if (!condition) throw Error(message)
  }
  const actualBga = !process.argv.includes("--generic")
  const sparse = process.argv.includes("--sparse")
  const rounded = process.argv.includes("--rounded")
  const viaOffset = Number(process.argv.find(arg => arg.startsWith("--via-offset="))?.split("=")[1] ?? 0)
  const noVias = process.argv.includes("--no-vias")
  const savedFanout = process.argv.includes("--saved-fanout")
  const bindings: ViaBinding[] = savedFanout ? ["inherited"] : ["inherited", "explicit-net"]
  for (const phased of actualBga ? [false] : [false, true]) for (const binding of bindings) {
    const circuit = new Circuit()
    circuit.schematicDisabled = true
    const started = Date.now()
    const variant = `${binding}, phased=${phased}, actualBga=${actualBga}, sparse=${sparse}, rounded=${rounded}, viaOffset=${viaOffset}, noVias=${noVias}, savedFanout=${savedFanout}`
    console.log(`START ${variant}`)
    circuit.on("solver:started", (event: any) => {
      const input = event.solverParams?.input
      console.log(`  ${event.solverName}: ${input?.connections?.length} connections, ${input?.obstacles?.length} obstacles`)
      for (const obstacle of input?.obstacles ?? []) {
        if (Math.abs(Math.abs(obstacle.center?.x) - 3) < 1e-6) {
          console.log(`  coincident obstacle ${obstacle.obstacleId ?? obstacle.componentId}: net=${obstacle.connectedTo?.filter((id: string) => id.startsWith("connectivity_net")).join(",")} layers=${obstacle.layers?.join(",")}`)
        }
      }
    })
    const timeout = setTimeout(() => {
      console.error(`TIMEOUT ${variant} after 120s`)
      process.exit(124)
    }, 120_000)
    try {
      circuit.add(<ViaInPadRoutingRepro binding={binding} phased={phased} actualBga={actualBga} sparse={sparse} rounded={rounded} viaOffset={viaOffset} noVias={noVias} savedFanout={savedFanout} />)
      await circuit.renderUntilSettled()
      const records = circuit.getCircuitJson()
      const errors = records.filter(record => record.type.endsWith("_error"))
      const vias = records.filter(record => record.type === "pcb_via")
      const traces = records.filter(record => record.type === "pcb_trace")
      console.log(`RESULT ${variant}: ${traces.length} traces, ${vias.length} vias, ${errors.length} errors in ${((Date.now() - started) / 1000).toFixed(1)}s`)
      for (const error of errors) console.log(`  ${error.type}: ${String((error as any).message).slice(0, 1500)}`)
      console.log(`  via references: ${vias.map(via => `${via.source_trace_id ?? via.source_net_id ?? via.pcb_trace_id ?? "none"} [${via.layers.join(",")}]`).join("; ")}`)
      const expectedFailure = actualBga && !sparse && !noVias && !savedFanout
      if (expectedFailure) {
        const topologyErrors = errors.filter(error => error.type === "pcb_autorouting_error" &&
          /TopologyMergingSolver:.*unresolved inter-group overlap/.test(String(error.message)))
        assert(topologyErrors.length === 1 && errors.length === 3 &&
          errors.filter(error => error.type === "pcb_port_not_connected_error").length === 2,
        "Expected one topology overlap and two disconnected-port errors; the failure changed or no longer reproduces")
        assert(traces.length === 0 && vias.length === 2, "Expected no routed traces and two native blind vias")
        console.log("PASS: expected dense-BGA blind-VIP topology failure reproduced")
      } else {
        assert(errors.length === 0, `Expected successful routing; found ${errors.length} render errors`)
        assert(vias.length === (noVias ? 0 : actualBga ? 2 : 4), "Unexpected via count")
        assert(traces.length === (savedFanout ? 3 : actualBga ? 1 : 2), "Unexpected trace count")
      }
      if (savedFanout) {
        assert(vias.every(via => via.layers.join() === "top,inner1,inner2"), "Incorrect blind-via layer span")
        assert(vias.every(via => via.hole_diameter === 0.15 && via.outer_diameter === 0.3), "Incorrect blind-via dimensions")
        const connectivity = getFullConnectivityMapFromCircuitJson(records)
        const net = records.find(record => record.type === "source_net" && record.name === "SIGNAL")!
        assert(net, "SIGNAL net is missing")
        assert(vias.every(via => connectivity.areIdsConnected(via.pcb_via_id, (net as any).source_net_id)), "A fanout via is not logically connected to SIGNAL")
        for (const [name, check] of Object.entries({ checkTracesAreContiguous, checkEachPcbPortConnectedToPcbTraces, checkViaPadClearance, checkEachPcbTraceNonOverlapping, checkPadTraceClearance })) {
          const findings = check(records)
          console.log(`  ${name}: ${findings.length} findings`)
          for (const finding of findings.slice(0, 3)) console.log(`    ${finding.message}`)
          assert(findings.length === 0, `${name} reported ${findings.length} findings`)
        }
        console.log("PASS: saved fanout routes with correct blind vias and zero connectivity/clearance findings")
      }
    } catch (error) {
      failures++
      console.error(`UNEXPECTED ${variant}: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      clearTimeout(timeout)
    }
  }
  process.exitCode = failures ? 1 : 0
}
// Rendering and solver input stay in memory; no Circuit JSON is saved or edited.
