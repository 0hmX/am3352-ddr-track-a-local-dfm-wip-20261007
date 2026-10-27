AM3352 + IT66122 video firmware

The selected hardware uses all 24 LCD data outputs, HSYNC, VSYNC, DE and PCLK.
am3352-ddr-hdmi.dtsi is an include for the real board DTS. It is not a complete
bootable board description. Preserve the existing PMIC, CPU reset, DDR/U-Boot,
Ethernet and MMC power configuration when integrating it.

The include compiled against the real BeagleBoard AM335x SoC tree. Twenty-five
compiled-DTB contract checks pass; the twelve compiler warnings are identical
to those in the unchanged upstream SoC harness. No assembled-board boot or
display test has been performed. firmware-validation.json records this scope.

Wiring and formats

Use cpu-hdmi-pin-contract.json as the physical wiring source of truth. The eight
low color bits are interleaved in the AM335x output, rather than sequentially
grouped by color. The map was checked visually against TI SPRZ360I Figure 2.
GPMC_AD15..AD8 provide LCD_DATA16..23 in reverse order, using mux mode 1.
HSYNC is R5; VSYNC is U5. SYSBOOT0..15 net names and their original 10k straps
remain intact. These pads become display outputs after boot strap sampling.

The physical color assignment requires blue-and-red-wiring = "crossed".
Linux then advertises RGB888 and XRGB8888, and chooses 32bpp fbdev by default.
The 16-bit alternative is BGR565, not RGB565. Normal RGB565 and normal
XRGB8888 cannot both use identical fixed AM335x wiring without conversion;
this is a silicon color-assignment erratum, not an HDMI transmitter setting.

U10 now carries LCD_DATA23. Move the existing MMC0_CD_N connection from U10
to previously unbound U16/GPMC_A9/GPIO1_25. The include applies that active-low
card-detect setting to Linux mmc1, the label for physical MMC0. Match any
board-specific U-Boot card-detect/pinmux configuration to the same move.
C18/GPIO0_7 controls the physical reset-qualification gate, and V17/GPIO1_27
receives the transmitter's open-drain interrupt. IRQ type is level-low.
V17 uses GPMC_A11 mode 7, pad-control offset 0x86c, on the existing 3.3V
VDDSHV3 bank. V14 is explicitly unbound after source-map merging so that the
old LCD_STBY connection cannot return. All 244 other CPU bindings are preserved.
The selected V17 route passed scoped clearance, plane, GND web and role-
partition checks. The selection preserves all 320 named DDR trace/via records;
remaining board joins, whole-board DFM and signal integrity are still pending.

Power, reset and HDMI control

The bridge is an I2C0 device at seven-bit address 0x4c. It manages the monitor
DDC bus internally; the monitor is not an extra device on the CPU's I2C0 bus.
EDID and HPD use the IT66122 driver and its interrupt path. Do not copy a
TDA19988-compatible node or use eight-bit address 0x98 in the device tree.

IT66122 physically has 3.3V and 1.2V supplies. The generic driver's historical
vcn18 property is mapped to the actual 1.2V internal-core rail here, while
vrf12 uses that same rail and vcn33 uses actual 3.3V. The pinned driver only
bulk-enables the named regulators; it does not set an assumed 1.8V voltage.
The fixed-regulator nodes describe existing physical rails, not additional
regulator parts. Adapt parent supply labels to the final board power DTS.

The existing TPS3808 CPU supervisor has CT open: its specified reset delay is
12/20/28ms minimum/typical/maximum after its sense and MR conditions recover.
That existing path is preserved. The reference 1.2V enable RC and TLV755P
startup are nominally much quicker, but the latter has no published maximum
startup time. Firmware reset sequencing does not prove every power-up/input
clamp condition. The IT66122 driver asserts its reset command for 20ms during
probe after enabling supplies. Verify actual rails, reset and SYSBOOT levels
on assembled hardware before calling boot behavior validated.

Apply 0001-it66121-settle-reset-rc.patch when retaining the reference open-drain
reset output with 10k pullup and 1uF capacitor. The unmodified driver releases
reset and immediately starts register reads, despite that physical RC. This
two-line integration patch adds a 30ms wait after release. It applies cleanly
to the pinned driver; reset-patch-validation.json records the exact source and
patch hashes. It is a conservative board integration delay, not a substitute
for the unpublished IT66122 reset electrical limits or an actual boot test.

Build and first display

Use a kernel containing the actual ite,it66122 compatible/ID support, plus
the tilcdc and display-connector drivers. hdmi-kernel.config is a display-only
configuration fragment. A current pinned driver and exact source hashes are
recorded in source-receipt.json. Old TI images with only tda998x will not bind.

For initial bring-up, select 1280x720 at 60Hz with XRGB8888. Its pixel clock is
74.25MHz. The include caps the LCDC at its 126MHz limit; 1080p60 needs 148.5MHz
and is not supported by this processor. EDID may offer modes beyond that cap.
An optional kernel command-line preference is:

  video=HDMI-A-1:1280x720@60

On the assembled target, ./bringup-video.sh lists connector IDs and planes.
Then ./bringup-video.sh CONNECTOR_ID performs a 720p60/XRGB8888 modetest.
These commands have not been run against hardware. Check color bars and
low-bit ramps, cable replug/EDID, SD insertion/removal and cold boots.
DMA underflow under load requires the board's real DDR/EMIF/U-Boot priority
configuration to be checked; an HDMI bridge does not remove framebuffer DDR.

This revision is video-only. There is no sound-card node, HDMI audio endpoint
or additional audio oscillator. Physical unused audio pins follow the circuit
reference; enabling audio later requires its own pinmux and clock work.

Primary references

TI AM335x color erratum, section 3.1.1, Figure 2:
https://www.ti.com/lit/er/sprz360i/sprz360i.pdf
TI AM335x pin attributes, Table 4-2:
https://www.ti.com/lit/ds/symlink/am3352.pdf
TI LCDC software and bandwidth notes:
https://software-dl.ti.com/processor-sdk-linux/esd/AM335X/latest/exports/docs/linux/Foundational_Components/Kernel/Kernel_Drivers/Display/LCDC.html
TI TPS3808 reset-delay specification:
https://www.ti.com/lit/ds/symlink/tps3808.pdf
TI TLV755P startup specification:
https://www.ti.com/lit/ds/symlink/tlv755p.pdf
Linux driver, binding and tilcdc source:
https://github.com/torvalds/linux/tree/d135ab453a7400a34930bdda1ef4bdc8acfac80e/drivers/gpu/drm
BeagleBoard RevD device-tree reference:
https://github.com/beagleboard/BeagleBoard-DeviceTrees/blob/febd604a1081856d85d1787bea74087194e1c35e/src/arm/ti/omap/am335x-boneblack-ite-hdmi.dtsi
