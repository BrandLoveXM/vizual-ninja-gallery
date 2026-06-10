# Vizual Ninja Studios — Gallery State Document

**Last updated:** June 2026  
**File:** `index.html` (single-file A-Frame WebXR app)  
**Repo:** https://github.com/BrandLoveXM/vizual-ninja-gallery  
**Branch to build from:** always pull `main`

---

## Aesthetic Brief

White cube gallery meets converted industrial loft. Key design decisions:

- **Floor:** Procedurally generated polished light concrete (warm grey `#c8c3bc` base, canvas-drawn speckle + hairline cracks + polish sheen). No external texture file needed.
- **Walls:** Bright warm white (`#f5f3f0` far/back, `#f2f0ec` side walls)
- **Ceiling:** Warm off-white (`#f0ede8`)
- **Ceiling detail:** Three exposed steel I-beams (dark `#2a2a2a`) running the full depth of the room at x = -6, 0, +6
- **Track lighting:** Visible rail + cylinder cans on ceiling; actual light comes from A-Frame spot entities aimed at each artwork
- **Frames:** Thin gold (`#c8a96e`, metalness 0.7) on all paintings
- **Labels:** A-Frame `<a-text>` with `font="roboto"`, artist name in `#555`, subtitle in `#888`
- **Ambient light:** Warm white (`#fff8f0`), intensity 0.65 — bright enough to read walls clearly
- **Scene background:** `#1a1916` (very dark warm near-black)

---

## Room Dimensions

| Axis | Size | Range |
|------|------|-------|
| Width (X) | 24 units | −12 to +12 |
| Height (Y) | 7 units | 0 to 7 |
| Depth (Z) | 16 units | −8 to +8 |

Visitor starts at `position="0 0 6"` (back third of room, facing far wall).  
Camera height: `y = 1.65`. Room bounds clamp visitor to x ±11.2, z ±7.2.

---

## Walls

| Wall | Position | Rotation | Contents |
|------|----------|----------|----------|
| **Far wall (Tara's wall)** | `z = -8` | none (faces +z) | 3 Tara paintings |
| **Back wall** | `z = +8` | `0 180 0` | Empty |
| **Left wall (European Series)** | `x = -12` | `0 90 0` | 5 travel photographs |
| **Right wall (Steph's wall)** | `x = +12` | `0 -90 0` | 3 Steph paintings |

Artwork entities on side walls use matching rotations (`0 90 0` for left, `0 -90 0` for right) so paintings face into the room.

---

## Artwork Inventory

### Far Wall — Tara McIlroy

All entities positioned at `z = -7.92` (just in front of `z = -8` wall).

| Position | Entity ID | File | Dimensions in scene | Actual pixel size | Notes |
|----------|-----------|------|--------------------|--------------------|-------|
| Left (x = -5) | `#artwork` | `painting.jpg` | 2.0 × 2.0 (4'×4' square) | Unknown (not in local folder) | Butterfly painting. Has click-to-chat interaction — opens AI chat panel for Tara |
| Centre (x = 0) | `#artwork-tara2` | `Tara_Art2.jpg` | 1.46 × 2.6 (portrait) | 704 × 1251 px | Must stay portrait — ratio is ~0.563:1. Frame: 1.58w × 2.62h |
| Right (x = +5) | `#artwork-tara3` | `Tara_Art3.jpg` | 2.0 × 2.0 (4'×4' square) | 704 × 746 px | Nearly square, treated as 4'×4' to match butterfly |

**Spotlights (far wall):** Three spot entities at `y=6.2, z=-6.8`, x positions −5, 0, +5. Intensity 3.0–3.2, angle 28–30°.

**Caption format:**
```
[Artist Name]        ← a-text, color #555, width 2.0, letter-spacing 3
[Title · City · Year] ← a-text, color #888, width 2.8, y offset -0.16
```
Caption entities sit ~1.28 units below centre of painting (adjusted for portrait pieces).

---

### Left Wall — European Series

All entities at `x = -11.94`, rotation `0 90 0`.

| z position | Entity ID | File | Frame size | Label |
|-----------|-----------|------|------------|-------|
| −4 | `#photo-venice` | `Venice_web.jpg` | 1.1 × 0.84 (landscape) | Venice |
| −1.5 | `#photo-kerry` | `Kerry_web.jpg` | 1.1 × 0.84 (landscape) | Kerry |
| 0 | `#photo-roma` | `TreviFountain_web.jpg` | 0.84 × 1.1 (portrait) | Roma |
| +2.075 | `#photo-positano` | `Positano_web.jpg` | 1.1 × 0.84 (landscape) | Positano |
| +4.25 | `#photo-ringofkerry` | `RingofKerry_web.jpg` | 1.1 × 0.84 (landscape) | Ring of Kerry |

Section title "EUROPEAN SERIES" + gold underline rule at `x=-11.92, y=4.6, z=0`.  
Frames are thin black (`#1a1a1a`) with inner white matte plane.  
**Spotlights:** Five spot entities at `x=-10.5, y=6.2`, matching z positions, `rotation="0 0 12"` (angled toward wall).

---

### Right Wall — Steph

All entities at `x = 11.94`, rotation `0 -90 0`.

| z position | Entity ID | File | Scene dimensions | Actual pixel size | Aspect |
|-----------|-----------|------|-----------------|-------------------|--------|
| −3.5 | `#photo-steph1` | `Steph_Art1.jpg` | 1.5 × 2.0 (portrait) | 4284 × 5712 px | 0.75:1 |
| 0 | `#photo-steph2` | `Steph_Art2.JPEG` | 2.0 × 1.5 (landscape) | 960 × 720 px | 1.33:1 |
| +3.5 | `#photo-steph3` | `Steph_Art3.JPEG` | 2.4 × 0.98 (ultra-wide) | 5117 × 2086 px | 2.45:1 |

Section title "STEPH" + gold underline rule at `x=11.92, y=4.6, z=0`.  
All frames: thin gold (`#c8a96e`).  
**Spotlights:** Three spot entities at `x=10.5, y=6.2`, matching z positions, `rotation="0 0 -12"`.

---

## Image Files in Repo Root

| Filename | Used for | Notes |
|----------|----------|-------|
| `painting.jpg` | Butterfly painting (Tara, left) | Original painting |
| `Tara_Art2.jpg` | Tara centre painting | Portrait 704×1251 — preserve aspect ratio |
| `Tara_Art3.jpg` | Tara right painting | Near-square 704×746 |
| `Steph_Art1.jpg` | Steph work I | Portrait 4284×5712 |
| `Steph_Art2.JPEG` | Steph work II | Landscape 960×720 |
| `Steph_Art3.JPEG` | Steph work III | Ultra-wide 5117×2086 |
| `Venice_web.jpg` | European Series | `_web` suffix required |
| `Kerry_web.jpg` | European Series | `_web` suffix required |
| `RingofKerry_web.jpg` | European Series | `_web` suffix required |
| `Positano_web.jpg` | European Series | `_web` suffix required |
| `TreviFountain_web.jpg` | European Series | `_web` suffix required |
| `ambient.mp3` | Background music | Loops at volume 0.25 |

> ⚠️ The European Series files use `_web.jpg` suffixes — if these aren't loading, check whether the actual files in the repo match this naming. The local folder only has `Venice.png`, `Kerry.png` etc. without `_web`.

---

## Interactive Features

| Feature | How it works |
|---------|-------------|
| **Entry screen** | Overlay fades in on load. "Enter Gallery" click starts music, fades out overlay, enables WASD/look controls |
| **Ambient music** | `ambient.mp3`, loops at 0.25 volume. Plays on Enter Gallery click (with retry for browser autoplay policy). Mute button top-right |
| **Chat panel** | Click butterfly painting (`#painting-plane`) once → opens slide-in chat panel with AI persona of Tara. Powered by `/api/chat` endpoint (POST, JSON `{messages:[]}`) |
| **Double-click to zoom** | Double-click butterfly painting → camera glides close. Double-click again → returns |
| **Double-click floor** | Double-click any floor point → camera glides to that location with animated nav pin |
| **ESC** | Closes chat panel |
| **WASD / arrow keys** | Walk. Room bounds prevent walking through walls |
| **Drag** | Look around (reverseMouseDrag enabled) |

---

## What's Not Yet Built / Known Gaps

- **Back wall (z = +8):** Completely empty — good candidate for a third artist or a text/title panel
- **European Series photos:** Asset filenames use `_web.jpg` — verify these files exist in repo with that exact naming
- **Chat API:** `/api/chat` endpoint lives in the `api/` directory of the repo. Not part of `index.html` — check separately if chat is broken
- **Butterfly painting (`painting.jpg`):** Not present in the local working folder, only in GitHub repo — will appear black in local preview but correct on the live site
- **No mobile/VR optimisation** has been done yet

---

## Branch History

| Branch | Notes |
|--------|-------|
| `main` | Production branch — always commit here |
| `claude/create-3d-gallery-room-4vFVB` | Original full-featured build (entry screen, music, European Series, navigation). This was the correct base — `main` was behind it. All features now merged into `main`. |

---

## Adding New Artwork — Quick Reference

**To add a painting to the far wall:**
1. Upload image file to repo root
2. Add `<img id="your-id" src="filename.jpg" crossorigin="anonymous" />` in `<a-assets>`
3. Check pixel dimensions (`sips -g pixelWidth -g pixelHeight filename.jpg` on Mac)
4. Calculate scene dimensions: pick a height (e.g. 2.0), multiply by pixel ratio for width
5. Copy an existing artwork entity, adjust x position, update frame box dimensions to match, update `src="#your-id"` and `width`/`height` on the `<a-plane>`
6. Add a caption entity below
7. Add a spotlight entity aimed at the new position

**Frame construction (gold):** Four `<a-box>` elements for top/bottom/left/right bars.  
- Top/bottom: `width = painting_width + 0.12`, `height = 0.06`, `depth = 0.06`  
- Left/right: `width = 0.06`, `height = painting_height + 0.02`, `depth = 0.06`  
- Offset each bar to sit at ±(half_painting_dimension + 0.03) from centre  
- Material: `color: #c8a96e; roughness: 0.3; metalness: 0.7`
