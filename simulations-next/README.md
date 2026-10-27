# Experimental native simulation declarations

These are the actual TSX declarations used during investigation. They require an external runner that supplies a checked board and cases, plus compatible simulation packages, vendor models and native solvers. They are not wired into the root build.

No board DDR mesh/field/eye result is accepted. Small native TSX geometry controls completed meshing, but those are not board results. The latest physical HDMI changes also require a fresh final-board run. Package parasitics, load/drive configuration, material properties and solver convergence remain explicit qualifications.
