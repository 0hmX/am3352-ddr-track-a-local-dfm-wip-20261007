# Analog simulation in tscircuit with `tsci simulate`

> For a step-by-step course (22 lessons, from a voltage divider to DDR3), see
> [`course/`](./course/README.md).

This tutorial covers analog simulation in tscircuit. It starts with an RC circuit that runs in seconds and ends with the DDR3 signal-integrity run on the AM3352 board in this repo. That run simulates one routed PCB trace with vendor IBIS buffer models and produces an eye diagram.

Versions used: `tscircuit` 0.0.3104 (CLI 0.1.2443), `@tscircuit/core` 0.0.2287, `@tscircuit/pcb-spice-pipeline` 0.1.8.

---

## 1. How the pieces fit together

```
 your .tsx board
 ├─ normal parts: <resistor> <capacitor> <chip> <trace> …
 ├─ <voltagesource>          stimulus (DC, pulse, sine, AC magnitude)
 ├─ <voltageprobe>           what to record (signal pin vs reference pin)
 ├─ <ibismodel>              vendor I/O buffer model bound to a chip   (pcb_spice only)
 └─ analog.*                 the experiments
      ├─ analog.transientsimulation    time domain
      ├─ analog.acsweepsimulation      small-signal frequency sweep
      ├─ analog.dcsweepsimulation      sweep one source
      ├─ analog.dcoperatingpointsimulation
      ├─ analog.sweepparameter         nested parameter sweep (child of an analysis)
      ├─ analog.digitalstimulus        bit pattern driven from a pin  (pcb_spice)
      └─ analog.eyediagram             fold a probe into an eye       (pcb_spice)
                │
                ▼  render → Circuit JSON (simulation_experiment, simulation_voltage_probe, …)
        tsci simulate <file>
                │
     ┌──────────┴───────────────────────────┐
 spiceEngine="ngspice"                 spiceEngine="pcb_spice"
 schematic netlist → ngspice           routed copper + stackup
 table printed to stdout                  → FastHenry (R, L)
                                          → FasterCap (C)
                                          → RLC sections + IBIS buffers → ngspice
                                          → results.html (plots, eye, CSV, solver logs)
```

Import the experiment elements from core: `import { analog } from "@tscircuit/core"`. `<voltagesource>`, `<voltageprobe>` and `<ibismodel>` are ordinary intrinsic elements.

These are the CLI rules (from `cli/simulate/register.ts`):

- `tsci simulate` only runs `ngspice` or `pcb_spice` experiments. `spicey` is for the browser preview.
- You can't mix `pcb_spice` with other engines in one entry. Put each engine in its own file.
- `--output <dir>` and `--solver-timeout-ms` only apply to `pcb_spice`. With ngspice the CLI rejects them.
- The output directory must not already exist. The default is `.tscircuit/simulation-<file>-<timestamp>/`.
- When a time prop is a bare number, it means **milliseconds**. Write `"10ps"` or `"512ns"` to be explicit.

---

## 2. First run: RC step response (ngspice)

[`rc.circuit.tsx`](./rc.circuit.tsx)

```tsx
import { analog } from "@tscircuit/core"

export default () => (
  <board width="20mm" height="12mm" routingDisabled>
    <voltagesource name="V1" voltage="3.3V" />
    <resistor name="R1" resistance="1k" footprint="0402" />
    <capacitor name="C1" capacitance="1uF" footprint="0402" />
    <trace from=".V1 > .pin1" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to=".C1 > .pin1" />
    <trace from=".C1 > .pin2" to=".V1 > .pin2" />
    <voltageprobe name="VOUT" connectsTo=".C1 > .pin1" referenceTo=".V1 > .pin2" />
    <analog.transientsimulation name="RC_STEP" spiceEngine="ngspice"
      duration="5ms" timePerStep="10us" />
  </board>
)
```

```sh
bunx tsci simulate tutorial/rc.circuit.tsx
```

ngspice prints one row per time step:

```
Index  time         v(n1)        v(n2)        i(vsimulation_voltage_source_0)
0      1.000000e-7  3.300000e+0  3.299670e-4  -3.299670e-3
…
510    5.000000e-3  3.300000e+0  3.277766e+0  -2.223431e-5
```

`v(n2)` is the capacitor node. At 5 ms, which is 5τ with τ = RC = 1 ms, it reads 3.2778 V. The analytic value is 3.3 × (1 − e⁻⁵) = 3.2778 V.

`routingDisabled` turns off the autorouter. The simulation only uses the netlist, and without it you get a harmless `connectedPort.x` autorouting warning.

## 3. Frequency domain: RC low-pass Bode (ngspice)

[`rc-ac.circuit.tsx`](./rc-ac.circuit.tsx) uses the same RC with C = 100 nF, so fc = 1.59 kHz. The source gets `acMagnitude`, and the experiment becomes an AC sweep:

```tsx
<voltagesource name="V1" voltage="0V" acMagnitude="1V" />
…
<analog.acsweepsimulation name="RC_BODE" spiceEngine="ngspice"
  sweepType="decade" startFrequency="10Hz" stopFrequency="1MHz" samplesPerInterval={10} />
```

The output has real and imaginary columns per node (`v(n2)_real`, `v(n2)_img`), so magnitude = √(re² + im²). Decade and octave sweeps need `samplesPerInterval`. A linear sweep needs `sampleCount` instead.

---

## 4. Simulating real board copper: the AM3352 DDR3 example (pcb_spice)

ngspice works from the schematic and treats a trace as an ideal wire. `pcb_spice` takes the routed trace, the layer stackup and the GND pours from the PCB. It extracts the trace's R, L and C with field solvers, builds an RLC ladder, connects vendor IBIS driver and receiver models to the ends, and runs the transient.

### 4.1 Run it

```sh
bun install --frozen-lockfile
# one-time: vendor IBIS files (not redistributable), see section 4.6
tsci simulate simulate.circuit.tsx            # or: bun run simulate   (~3–4 min)
open .tscircuit/simulation-simulate-*/results.html   # Plots → Eye
```

You need `fasthenry`, `FasterCap` and `ngspice` on `PATH`. The CLI looks them up by those exact names. On macOS: `brew install ngspice`, then build FastHenry and FasterCap from source.

### 4.2 File map

| File | Role |
|---|---|
| `simulate.circuit.tsx` | CLI entry. Re-exports `simulations-next/run-dq-stages.circuit`. |
| `simulations-next/run-ddr.circuit.tsx` | Compiles the physical board once (`new Circuit()` → `getCircuitJson()`) and exports `physicalRecords`. |
| `simulations-next/channels.tsx` | `resolveDdrChannel(circuitJson, "DDR_D0")` finds the routed `pcb_trace` from CPU U1 to RAM U3 and returns its pin selectors. |
| `simulations-next/ibis-models.tsx` | Builds the `<ibismodel>` props: file, component, pin→model and pin→reference maps, corner. |
| `simulations-next/ibis.circuit.tsx` | `DdrIbisBoard`, the real board with the simulation declarations added as extra children. |
| `simulations-next/run-dq-stages.circuit.tsx` | Picks DQ only, QUIET only, and the `straightened-stages` channel settings. |
| `simulations-next/return-current.circuit.tsx` | A separate EM experiment (`simulation.pcbreturncurrentsimulation`, run with `tsci simulate return-current`). |

### 4.3 Pattern: keep the board and add declarations

You don't need a copy of the board for simulation. Render the real board and append the declarations to its children:

```tsx
import Board from "../index"
const board = Board()
return cloneElement(board, { fabricatorPreset: "jlcpcb_standard" },
  board.props.children,          // the unchanged physical design
  <> …simulation declarations… </>,
)
```

Selectors can reach into subcircuits from board level, for example `.Processor > .U1 > .M3` (core 0.0.2286 or later, core#5155).

### 4.4 Resolving the routed pins

A DDR byte lane can permute DQ balls between the CPU and the RAM, so the code doesn't assume "D0 lands on E3". It compiles the board first and follows the copper:

```tsx
// run-ddr.circuit.tsx
const physical = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
physical.add(cloneElement(Board(), { fabricatorPreset: "jlcpcb_standard" }))
await physical.renderUntilSettled()
export const physicalRecords = physical.getCircuitJson()

// channels.tsx → { source: ".Processor > .U1 > .M3", load: ".DDR3 > .U3 > .E3", trace, … }
const data = resolveDdrChannel(physicalRecords, "DDR_D0")
```

`resolveDdrChannel` throws if anything is ambiguous. That covers a missing pin, more than one trace, an endpoint that doesn't sit on its pad, or ends on different nets. Simulating the wrong copper without an error would be worse.

### 4.5 The declarations, one at a time

The code below is from `ibis.circuit.tsx`, trimmed to the DQ0 write case that `simulate.circuit.tsx` runs.

**Buffer models.** IBIS describes how a chip's I/O pin drives and loads a line. You bind one model per chip:

```tsx
<ibismodel componentRef=".Processor > .U1" {...models.cpu} />   // TI AM335x, Model_343 (slow 9 mA)
<ibismodel componentRef=".DDR3 > .U3"      {...models.ram} />   // Winbond W631GG6MB, ODT_60
```

Each definition sets these fields:

- `ibisModelAsset`: path to the `.ibs` file.
- `ibisComponentName`
- `ibisPinNameToPortLabel`
- `ibisPinNameToModelName`: which buffer each ball uses.
- `ibisPinNameToReferencePortLabels`: which pins are the pull-up, pull-down and clamp rails. Nothing is inferred.
- `modelValueCorner`: `typical`, `minimum` or `maximum`.
- `includePackageParasitics`

**Supply and probes:**

```tsx
<voltagesource name="DDR_VDDQ" voltage="1.5V"
  connections={{ pin1: ".Processor > .U1 > .E5", pin2: ".Processor > .U1 > .A1" }} />
<voltageprobe name="DQ_TX" connectsTo={data.source} referenceTo=".Processor > .U1 > .A1" />
<voltageprobe name="DQ_RX" connectsTo={data.load}   referenceTo=".DDR3 > .U3 > .B1" />
```

Each probe is referenced to the local ground ball at its own end of the line.

**The experiment.** `pcbSpiceChannel` tells the pipeline what copper to extract and how:

```tsx
<analog.transientsimulation name="BYTE0_WRITE_QUIET" spiceEngine="pcb_spice"
  duration="512ns" timePerStep="10ps"
  ibisPinStates={{
    [data.source]: { isOutput: true, isOutputEnabled: true },   // CPU drives (write)
    [data.load]:   { isOutput: false },                          // RAM receives
    // DQS/DQSn pins that aren't simulated are pinned as idle receivers
  }}
  pcbSpiceChannel={{
    reduction: "straightened-stages",
    sections: 12,                                  // RLC ladder sections
    lanes: [{ name: "DQ", from: data.source, to: data.load }],
    referencePinRef: ".Processor > .U1 > .A1",
    extraction: {
      minimumFrequency: "1Hz", maximumFrequency: "1GHz", modelFrequency: "100MHz",
      filaments: 9, refinementFilaments: 15,       // coarse vs refined FastHenry solve
      convergenceTolerance: 0.05,                  // R/L may change ≤5% between them
      capacitanceTolerance: 0.02, reciprocityTolerance: 0.025,
      dcResistanceTolerance: 0.002, maxPanelLength: "0.5mm",
    },
  }} />
```

**Traffic.** A PRBS7 pattern at 640 MT/s (UI = 1.5625 ns):

```tsx
<analog.digitalstimulus name="BYTE0_WRITE_QUIET_DQ" simulationRef=".BYTE0_WRITE_QUIET"
  sourcePinRef={data.source} bitDuration="1.5625ns" startTime="0ns" initialState={0}
  transmittedData={{ transmissionType: "bits", bits: prbs7(), repeat: true }} />
```

**Measurement.** The receiver probe is folded into an eye. The first 40 ns are skipped so start-up settling doesn't show up in the eye.

```tsx
<analog.eyediagram name="BYTE0_WRITE_QUIET_DQ_eye" simulationRef=".BYTE0_WRITE_QUIET"
  probeRef=".DQ_RX" unitInterval="1.5625ns" timeOrigin="0ns" startTime="40ns" />
```

`simulationRef` and `probeRef` are selectors (`.Name`), so one board can declare several experiments. `run-ddr.circuit.tsx` declares `QUIET` and `SWITCHING`, adds the DQS/DQSn strobe stimuli shifted by UI/2 for a write, and adds a differential `DQS_RX` probe.

### 4.6 IBIS files

Put these two files in `simulations-next/model-review/`:

- `sprm552c-candidate-models.ibs`: a reviewed subset of TI `sprm552`.
- `W631GG6MB-12.ibs`: the unchanged Winbond file.

Source URLs, the subset transformation and SHA-256 hashes are in `model-review/review-receipt.json`. Check your files against those hashes before you compare results.

### 4.7 Choosing a channel reduction

| `reduction` | What it meshes | Status on this board |
|---|---|---|
| `straightened-stages` | Each route becomes straight stages over a finite return bar. The bar is derived from `pcb_stackup` and the adjacent GND pour (DQ0 on `top` → `inner1`, 0.1245 mm, εr 4.1, 2 mm bar). | **Works.** It passes the extraction checks. The DQ0 eye is about 0.96 V by 1.45 ns in a 1.5625 ns UI. |
| `routed-copper` | The actual curved copper, the GND planes (`groundMeshSize`) and vias (`via: { platingThickness, equivalentWidth, omitThroughViaStubs }`). | **No accepted result.** FastHenry fails (`filaments had identical centers`, pcb-spice-pipeline#45, then `mutual inductance = infinity`, #46). Refined meshes don't converge at 1 GHz. |

Start with `straightened-stages`. To check sensitivity, change one thing at a time. For example, a bar width of 1 mm or 2 mm gives the same eye, and straightening the route raises loop L by about 4% compared with the curved route.

### 4.8 Reading `results.html`

The **Plots → Eye** tab shows the folded DQ_RX eye. The report also contains these tables:

- Probes, with each signal's minimum and maximum against its reference.
- Eyes, with the gate, UI and origin, window count and voltage range.
- Stimuli and IBIS pin states.
- The selected IBIS buffers, corner and package-parasitics setting.
- Channel settings and the traces they map to.
- A switching−quiet ΔV comparison, when both cases ran.

Under downloads there is a `csv/` folder (seconds and volts). The FastHenry, FasterCap and ngspice decks are saved beside it with their request and log files.

Check the extraction convergence before you read the eye. If a convergence check fails, the CLI stops with an error such as `fasthenry_…` or `matrix_…` and no result is accepted.

### 4.9 Iterate without running solvers

Rendering only declares the experiments. You can check the composition in about 2 minutes, with no field solvers involved:

```sh
bun test tests/ddr-simulation-entry.test.tsx
```

The test checks three things:

- The routes and `pcb_stackup` are unchanged.
- Both `simulation_experiment` records exist.
- There are four `simulation_eye_diagram` records, and the IBIS paths resolve.

---

## 5. What this result does not cover

The DQ0 eye covers one bit lane with an ideal strobe. It is not a byte-0 or interface verdict. The model leaves out:

- The DQS0 and DQSn0 strobes. They change layer to `inner2` stripline, which this reduction can't model yet (pcb-spice-pipeline#49 and #50).
- Coupling from neighbouring nets.
- Plane cutouts.
- Supply impedance.
- Package parasitics (`includePackageParasitics: false`).
- Through-via stubs.

The stackup and material values are nominal assumptions. For the full list, see `simulations-next/README.md` and `modelingOmissions` in `ibis-models.tsx`.

## 6. Checklist for your own board

1. Prove the setup works on a small schematic-level circuit with ngspice first (sections 2 and 3).
2. Give the board a real `pcb_stackup` (for example with `fabricatorPreset`), and add a GND pour on the layer next to the signal.
3. Compile once and resolve the routed endpoints from Circuit JSON. Don't hard-code balls.
4. Add `<ibismodel>`, the supply `<voltagesource>`, the probes, the `pcb_spice` transient, the stimulus and the eye as board children.
5. Give every bound pin an explicit `ibisPinStates` entry.
6. Run `tsci simulate`, then confirm the convergence checks passed before you read the eye.
