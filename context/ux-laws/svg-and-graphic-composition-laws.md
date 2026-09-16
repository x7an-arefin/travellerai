# SVG and Graphic Vector Composition Laws

> *"Vector iconography and graphic illustrations must balance geometric mathematical grid alignment with optical visual weight correction."*
> — **Vector Art & Iconography Principles**

---

## Overview

**SVG and Graphic Vector Composition Laws** govern the creation of vector icons, UI illustrations, logo marks, and scalable graphics (SVG). Designing scalable graphic assets requires balancing two competing forces:

1. **Geometric Precision**: Aligning vector paths, anchor points, and stroke widths to a fixed pixel grid (e.g., 24×24px keyline grid) to prevent half-pixel anti-aliasing blur.
2. **Optical Balance**: Adjusting visual shapes so they *appear* equal in weight to the human eye, even if their mathematical area or dimensions differ (e.g., a circle must extend slightly outside a square's bounding box to look visually equal in size).

---

## The Origin Story

### From Material Icons to Universal Keyline Grids

The modern icon design system traces to Google's **Material Design Icons** specification (2014), which established the 24×24dp keyline grid as an industry standard. Before this, icon sets were inconsistent—each designer chose different canvas sizes, stroke widths, and alignment rules, producing visually disjointed icon families.

Google's icon team, led by designers including **Christian Robertson**, defined a systematic approach:
- All icons share a **24×24dp canvas** with a **2dp padding safe zone**
- Geometric keyline shapes (circle, square, rectangle) define consistent bounding areas
- Stroke widths are standardized (typically 1.5px or 2px)
- All paths snap to the pixel grid to prevent sub-pixel rendering artifacts

Apple's SF Symbols system (2019) extended this approach further, introducing **9 weight variants** (ultralight through black) and **3 scale variants** (small, medium, large) for each symbol—totaling 27 rendering variants per icon, all optically balanced.

### Why SVG Over Raster?

| Property | SVG (Vector) | PNG/JPG (Raster) |
|----------|-------------|-------------------|
| **Scalability** | Infinite — scales to any size without blur | Fixed resolution — blurs at 2x, 3x |
| **File size** | Small for simple shapes (typically < 1KB per icon) | Large for high-DPI (4x icons can be 10-50KB) |
| **Color control** | CSS-stylable (`currentColor`, `fill`, `stroke`) | Requires separate files per color variant |
| **Animation** | Path, transform, and opacity animations via CSS/JS | Not animatable without sprite sheets |
| **Accessibility** | `<title>` and `aria-label` for screen readers | `alt` attribute only |

---

## The 24×24px Icon Keyline Grid System

Standard UI vector icons are constructed on a **24×24px keyline grid** with a mandatory **2px padding safe zone**:

```
┌────────────────────────────────────────────────────────┐
│  2px PADDING SAFE ZONE (Do not extend stroke here)    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  20×20px LIVE CANVAS                            │  │
│  │                                                  │  │
│  │  ◯ Circle Keyline (20px diameter)                │  │
│  │  □ Square Keyline (18×18px)                      │  │
│  │  ▭ Landscape Rectangle (20×16px)                 │  │
│  │  ▯ Portrait Rectangle (16×20px)                  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Keyline Shape Guidelines

- **Square icons** (settings gear, checkbox): Use the **18×18px** square keyline
- **Circular icons** (user avatar, record): Use the **20px diameter** circle keyline
- **Landscape icons** (landscape photo, video): Use the **20×16px** rectangle
- **Portrait icons** (portrait photo, document): Use the **16×20px** rectangle

The 2px padding safe zone ensures that icons have consistent visual weight when placed alongside text or within buttons. Without this zone, icons at the edge of the 24px canvas would appear to bleed into adjacent elements.

---

## Optical vs. Geometric Alignment Rules

### 1. Geometric vs. Optical Centering
- **Geometric Center**: The mathematical midpoint of a bounding box.
- **Optical Center**: The visual center of mass. For example, a play icon triangle ($\triangleright$) must be shifted slightly right of its mathematical bounding box center so it *looks* centered to human eyes.

```
Geometric Center (Visually Off):    Optical Center (Visually Correct):
┌─────────────────┐                ┌─────────────────┐
│     ▶            │                │      ▶           │
│  (centered by    │                │  (shifted ~2px   │
│   bounding box)  │                │   right for      │
│                  │                │   visual balance) │
└─────────────────┘                └─────────────────┘
```

**Rule**: Triangles and asymmetric shapes must be optically adjusted. Symmetric shapes (circles, squares) can use geometric centering.

### 2. Stroke Pixel Fitting (Crisp SVG Rendering)
Vector paths with 1px stroke widths must be placed on **half-pixel coordinates** (e.g., $X = 10.5\text{px}$) when centered on grid lines to avoid sub-pixel anti-aliasing blur:

```
Blurry 1px Stroke (On Integer Coordinate):   Sub-pixel spans across 2 physical pixels
Crisp 1px Stroke (On 0.5px Coordinate):      Stroke falls exactly within 1 physical pixel
```

### 3. Visual Weight Equalization

Different geometric shapes have different optical weights at the same mathematical size:
- A **circle** appears smaller than a **square** of equal dimension
- A **triangle** appears smallest of all at equal dimension

To equalize visual weight, circles extend **~2-3%** beyond the square keyline, and triangles extend **~5-8%** beyond:

```
Square Keyline:  18×18px
Circle Keyline:  20px diameter (extends 1px beyond square on each side)
Triangle:        Extends ~2px beyond square keyline vertically
```

---

## Accessible Icon Implementation

Icons must be accessible to screen reader users. The implementation depends on whether the icon is **decorative** or **informative**:

```html
<!-- Informative Icon (standalone, conveys meaning) -->
<svg role="img" aria-label="Delete item" viewBox="0 0 24 24" fill="none">
  <title>Delete item</title>
  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" stroke-width="1.5"/>
</svg>

<!-- Decorative Icon (paired with visible text label) -->
<button>
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" stroke-width="1.5"/>
  </svg>
  <span>Delete</span>
</button>
```

**Rule**: Icons without adjacent text labels must have `role="img"` and `aria-label`. Icons paired with visible text should use `aria-hidden="true"` to prevent redundant screen reader announcements.

---

## Multi-Density Export Workflow

For platforms that don't support SVG natively (some iOS contexts, email clients, PWA splash screens), export raster versions at multiple densities:

| Density | Scale | Example (24px base) | Target |
|---------|-------|---------------------|--------|
| **1x (mdpi)** | 1× | 24×24px | Older Android, low-DPI desktop |
| **2x (xhdpi)** | 2× | 48×48px | Standard iPhone, Retina Mac |
| **3x (xxhdpi)** | 3× | 72×72px | iPhone Plus/Pro, high-DPI Android |
| **4x (xxxhdpi)** | 4× | 96×96px | Ultra-high-DPI displays |

**Best practice**: Design at 1x (24px) on the pixel grid, export SVG for web, and generate raster assets at 2x/3x for platform-specific needs.

---

## Optimized SVG Code Example

```xml
<!-- Optimized Crisp SVG Vector Code (Plus Icon) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Keyline Grid Safe Zone Bounds (20x20 Live Area) -->
  <path d="M12 4.5V19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M4.5 12H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

**Optimization tips**:
- Use `currentColor` for `stroke` and `fill` to inherit color from CSS
- Remove unnecessary attributes (`xmlns:xlink`, editor metadata)
- Use `stroke-linecap="round"` for friendly, modern line endings
- Keep `viewBox` at `0 0 24 24` for consistent scaling

---

## Real-World Case Studies

### 1. Google Material Symbols (2022)
Material Symbols replaced Material Icons with a variable font-based icon system supporting 3 axes: weight (100-700), fill (0-1), and optical size (20-48). This allows a single icon to adapt its visual weight to match surrounding text weight—solving the problem of icons looking too heavy or too light next to different font weights.

### 2. Apple SF Symbols
Apple's SF Symbols system includes 5,000+ symbols designed to integrate with San Francisco, Apple's system font. Each symbol supports 9 weights and 3 scales, automatically matching the font weight and size of adjacent text labels. This deep integration ensures icons always feel like natural extensions of typography.

### 3. Figma's Component-Based Icon System
Figma uses component variants with swappable properties (size, style, color) to manage icon libraries. Designers select an icon component and swap between outline/filled variants, sizes (16/20/24/32px), and color tokens without leaving the properties panel.

---

## Common Mistakes

1. **Using Raster Icons (PNG) When SVG Is Available**: PNG icons blur at non-native resolutions, require separate files per color, and are not CSS-stylable. SVG should be the default format for all UI icons.

2. **Inconsistent Stroke Widths Across an Icon Set**: Mixing 1px, 1.5px, and 2px strokes within the same icon family creates visual inconsistency. Choose one stroke width (typically 1.5px for 24px icons) and use it everywhere.

3. **Forgetting Optical Centering for Play/Arrow Icons**: A play triangle centered by its bounding box looks shifted left. Always nudge asymmetric shapes ~2px toward their visual center of mass.

4. **Omitting Accessibility Attributes**: Icons used as the sole interactive element (without text labels) must have `aria-label` or `<title>` tags. A trash can icon button without an accessible name is invisible to screen readers.

---

## Checklist for SVG & Graphic Laws

- [ ] Are vector icons constructed on a standardized grid canvas (e.g., 24×24px with 2px padding)?
- [ ] Have asymmetric shapes (like play triangle icons) been optically adjusted past geometric center?
- [ ] Are vector paths pixel-fitted to avoid anti-aliasing blur on 1x displays?
- [ ] Do standalone icons have `role="img"` and `aria-label` for screen reader accessibility?
- [ ] Is `currentColor` used for strokes/fills to inherit CSS color values?
- [ ] Are stroke widths consistent across the entire icon family?

---

*Related: [Golden Ratio →](golden-ratio.md) | [8pt Grid System →](8pt-grid-system.md) | [Brand Identity Systems →](brand-identity-system-laws.md) | [Touch Target & A11y Laws →](touch-target-and-a11y-laws.md)*
