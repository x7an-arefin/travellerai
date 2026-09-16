# Dark Mode Engineering & Color Laws

> *"Dark mode is not simply inverted light mode—it is a specialized surface elevation and desaturation system designed for low-light legibility."*
> — **Google Material Design 3 Specification**

---

## Overview

**Dark Mode Engineering** is the set of visual laws and technical specifications governing dark interface design. A common mistake in digital design is turning backgrounds to pure black (`#000000`) and text to pure white (`#FFFFFF`). This naive inversion leads to severe visual artifacts—specifically **halation** (where white text appears to vibrate and bleed into pure dark backgrounds) and **OLED smearing** (a laggy blur caused when display pixels transition from off to on during scrolling).

Professional dark mode design relies on four mandatory principles:
1. **Never Use Pure Black (`#000000`) as Base**: Use dark gray (e.g., `#121212` or `#0F172A`).
2. **Elevation via Surface Lightness**: Indicate depth and elevation by making higher surfaces lighter, not by casting dark drop shadows.
3. **Desaturate Accent Colors**: Reduce color saturation by 20–30% to prevent visual vibration against dark backgrounds.
4. **Softened Text Contrast**: Use off-white (e.g., `#E2E8F0` at 87% opacity) rather than 100% pure white.

---

## The Origin Story

### The Halation Effect & OLED Physics

In early CRT and modern OLED/AMOLED displays, individual pixels emit their own light. When a high-luminance white character (`#FFFFFF`) is placed directly next to an unlit black pixel (`#000000`), the extreme contrast causes the human eye's lens to scatter light rays. This optical phenomenon, called **halation**, makes text look blurry and causes severe eye strain during extended reading.

Furthermore, OLED displays turn pixels completely off to render `#000000`. When a user scrolls down a page, pixels take several milliseconds to wake up from an "off" state, causing a noticeable purple/black motion smear. Using a base dark gray (`#121212`) keeps pixels active at ultra-low power, eliminating OLED smearing while maintaining energy savings.

---

## Key Dark Mode Elevation Laws

In light mode, depth is represented by drop-shadows ($+Y$ displacement). In dark mode, drop-shadows are invisible against dark surfaces. Therefore, dark interfaces represent elevation along the Z-axis by **increasing the lightness percentage of the surface color**:

```
Z-Index / Elevation Depth (Dark Mode Lightness Hierarchy)

Level 4 (Modals & Tooltips)      →  #334155 (Lightest Gray - Highest Elevation)
Level 3 (Dropdowns & Menus)      →  #1E293B
Level 2 (Cards & Containers)     →  #1E1E1E
Level 1 (Base App Canvas)        →  #121212 (Dark Gray Base - Lowest Surface)

Rule: The closer an element is to the user, the LIGHTER its dark gray background surface becomes.
```

---

## Accent Color Desaturation Rule

Saturated colors designed for white backgrounds look harsh and vibrate against dark surfaces:

```
Light Mode Accent Blue:   #2563EB (Saturation: 84%, Lightness: 52%) → Crisp on White
Naive Dark Mode Usage:    #2563EB on #121212 → Vibrates harshly, causes visual fatigue
Desaturated Dark Accent:  #60A5FA (Saturation: 94%, Lightness: 68%) → Smooth, readable
```

```css
/* Dark Mode Elevation & Desaturated Palette System */
[data-theme="dark"] {
  /* Surface Elevation Hierarchy */
  --surface-base: #121212;      /* Elevation 0: Canvas */
  --surface-card: #1e1e1e;      /* Elevation 1: Card container */
  --surface-overlay: #2d2d2d;   /* Elevation 2: Modal dialog */

  /* Softened Typography (Prevents Halation) */
  --text-primary: rgba(255, 255, 255, 0.87);   /* High emphasis off-white */
  --text-secondary: rgba(255, 255, 255, 0.60); /* Medium emphasis */
  --text-disabled: rgba(255, 255, 255, 0.38);  /* Disabled state */

  /* Desaturated Primary Accent (Prevents Color Vibration) */
  --color-accent: #93c5fd;     /* Soft desaturated blue */
}
```

---

## Practical Applications & Technical Rules

1. **System Theme Sync**: Always respect `prefers-color-scheme: dark` media queries automatically before offering a manual user toggle.
2. **Imagery Adjustments**: Dim bright background photographs in dark mode by applying `filter: brightness(0.85) contrast(1.1)` so images don't act as blinding light sources.

---

## Real-World Case Studies

### 1. Google Material Design 3 Dark Theme
Google's Material Design 3 guidelines explicitly mandate `#121212` as the baseline dark theme color, utilizing overlay tints at 5%, 8%, 11%, and 14% white opacity to express card elevations.

### 2. Apple macOS & iOS Dark Mode
Apple uses dynamic blur translucency (`backdrop-filter`) and semi-transparent off-white typography (`rgba(255,255,255,0.85)`) to maintain crystal-clear legibility without high-contrast halation.

---

## Checklist for Dark Mode Engineering

- [ ] Is your main canvas background a dark gray (`#121212` or `#0F172A`) instead of pure black (`#000000`)?
- [ ] Are elevated cards, modals, and dropdowns visually lighter than the base canvas background?
- [ ] Is primary text softened to an off-white (~87% opacity or `#E2E8F0`) to eliminate halation?
- [ ] Have accent colors been desaturated so they don't vibrate against dark surfaces?
- [ ] Does dark mode automatically respect system `prefers-color-scheme` settings?

---

*Related: [WCAG Color Contrast →](wcag-color-contrast.md) | [Elevation & Shadow System →](elevation-and-shadow-system.md)*
