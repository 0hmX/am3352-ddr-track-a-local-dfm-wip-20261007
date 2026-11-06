# Generates a synthetic teaching IBIS model: 3.3 V LVCMOS-like I/O buffer.
# Pull-up/pull-down are resistive drivers (R_drive) with soft current limit; diode clamps.
import math, sys
VDD = {"typ": 3.3, "min": 3.135, "max": 3.465}
def make(model, rdrv, ilim, tr, ccomp=2e-12):
    def drv(v, r, il):  # current magnitude with soft limit
        return il * math.tanh(v / (r * il))
    def diode(v):  # forward current for voltage v beyond rail
        return 0.0 if v <= 0 else min(1e-12 * (math.exp(v / 0.04) - 1), 0.5)
    vs = [round(-3.3 + 0.165 * i, 4) for i in range(61)]  # -3.3 .. 6.6
    corners = {"typ": (rdrv, ilim, 1.0), "min": (rdrv * 1.3, ilim / 1.3, 1.3), "max": (rdrv / 1.3, ilim * 1.3, 1 / 1.3)}
    out = []
    out.append(f"[Model] {model}\nModel_type I/O\nPolarity Non-Inverting\nEnable Active-High\nVinl = 0.8\nVinh = 2.0\n")
    out.append(f"C_comp {ccomp*1e12:.2f}pF {ccomp*1e12*1.1:.2f}pF {ccomp*1e12*0.9:.2f}pF\n")
    out.append(f"[Voltage Range] {VDD['typ']} {VDD['min']} {VDD['max']}\n")
    def tab(name, f):
        s = f"[{name}]\n| V   I(typ)   I(min)   I(max)\n"
        for v in vs:
            s += f"{v:.4f} " + " ".join(f"{f(v, *corners[c]):.6e}" for c in ("typ", "min", "max")) + "\n"
        return s
    # Pulldown: V is pad voltage; I into buffer (positive) when pad above GND.
    out.append(tab("Pulldown", lambda v, r, il, _: math.copysign(drv(abs(v), r, il), v)))
    # Pullup: V is VDD - Vpad; current into buffer is negative when pad below VDD.
    out.append(tab("Pullup", lambda v, r, il, _: -math.copysign(drv(abs(v), r, il), v)))
    out.append(tab("GND Clamp", lambda v, *_: -diode(-v - 0.0) if v < 0 else 0.0))
    out.append(tab("POWER Clamp", lambda v, *_: diode(-v) if v < 0 else 0.0))
    # Waveforms: simulate ku 0->1, kd 1->0 ramps (and reverse) into 50 ohm fixtures.
    def wave(rising, vfix):
        rows = []
        N = 60; T = tr + 0.2e-9
        res = {}
        for c in ("typ", "min", "max"):
            r, il, k = corners[c]; vdd = VDD[c]; t_r = tr * k
            def I_out(v, t):  # current out of buffer into pad node
                s = min(max(t / t_r, 0), 1); s = s * s * (3 - 2 * s)
                ku = s if rising else 1 - s; kd = 1 - ku
                up = drv(vdd - v, r, il) * ku if vdd - v >= 0 else -drv(v - vdd, r, il) * ku
                dn = drv(v, r, il) * kd if v >= 0 else -drv(-v, r, il) * kd
                return up - dn
            # start from DC
            v = vfix if False else (vfix * r + (0 if rising else vdd) * 50) / (r + 50)
            dt = T / 6000; ts = []; t = 0.0
            samples = []
            for i in range(6001):
                if i % 100 == 0: samples.append(v)
                i_node = I_out(v, t) + (vfix - v) / 50.0
                v += dt * i_node / ccomp
                t += dt
            res[c] = samples
        for i in range(61):
            rows.append(f"{i * (tr + 0.2e-9) / 60 * 1e9:.4f}ns " + " ".join(f"{res[c][i]:.5f}" for c in ("typ", "min", "max")))
        kind = "Rising" if rising else "Falling"
        fx = "VDD" if vfix else "GND"
        return f"[{kind} Waveform]\nR_fixture = 50\nV_fixture = {vfix}\nV_fixture_min = {VDD['min'] if vfix else 0}\nV_fixture_max = {VDD['max'] if vfix else 0}\n" + "\n".join(rows) + "\n"
    for rising in (True, False):
        for vfix in (0.0, 3.3):
            out.append(wave(rising, vfix))
    return "".join(out)

text = """[IBIS Ver] 5.0
[Comment Char] |_char
[File Name] lvcmos33-teaching.ibs
[File Rev] 1.0
[Date] 2026-11-06
[Source] Synthetic teaching model generated for the tscircuit Signal Integrity Course.
| NOT a real part. Resistive drivers with soft current limit, diode clamps.
[Disclaimer] For learning only. Use your vendor's IBIS file for real designs.
[Component] TEACH_LVCMOS33
[Manufacturer] tscircuit course
[Package]
| variable typ min max
R_pkg 0 0 0
L_pkg 0 0 0
C_pkg 0 0 0
[Pin] signal_name model_name
IO1 IO1 IO_DRIVE
IO2 IO2 IO_DRIVE
VDD VDD POWER
GND GND GND
[Model Selector] IO_DRIVE
LVCMOS33_12MA  12 mA drive (default)
LVCMOS33_4MA   4 mA drive
LVCMOS33_24MA  24 mA drive
"""
for name, r, il, tr in (("LVCMOS33_4MA", 75, 0.020, 1.6e-9), ("LVCMOS33_12MA", 30, 0.060, 0.8e-9), ("LVCMOS33_24MA", 15, 0.120, 0.4e-9)):
    text += "|\n" + make(name, r, il, tr)
text += "[End]\n"
open(sys.argv[1], "w").write(text)
