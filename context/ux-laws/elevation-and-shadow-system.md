# Elevation and Shadow Depth Hierarchies

> *"Shadows emulate a virtual light source along the Z-axis, signaling interactivity and structural priority through elevation."*
> — **Spatial UI Architecture & Elevation Law**

---

## Overview

The **Elevation and Shadow System** defines visual depth along the Z-axis ($+Z$) in two-dimensional graphical interfaces. By simulating a top-down natural light source, shadows create a sense of tactile realism, separating interactive floating layers from flat background surfaces.

Elements higher on the Z-axis cast larger, softer, more diffuse drop-shadows to indicate that they are physically closer to the user. Flat elements cast tight, sharp shadows or no shadow at all.

---

## The Origin Story

### From Physical Paper to Digital Depth

The concept of elevation in UI design traces back to Google's **Material Design** specification (2014), which was built on the metaphor of "material"—sheets of digital paper floating in 3D space. Matías Duarte, Google's VP of Design, described Material as "a unifying theory of a rationalized space and a system of motion."

The key insight was that early flat design (Windows 8 Metro, iOS 7) had eliminated all depth cues, making it impossible for users to distinguish between:
- Interactive elements (buttons, cards, links) and decorative backgrounds
- Primary content and secondary chrome
- Foreground focus areas and background canvas

Material Design solved this by borrowing from physical architecture: objects at different heights cast different shadows, and shadow characteristics (blur, spread, opacity) communicate the object's relative position in space.

The human visual system is highly attuned to shadow interpretation—it's how we judge distance and spatial relationships in the physical world. Digital elevation leverages this pre-existing perceptual system rather than requiring users to learn a new visual language.

---

## Elevation Level Hierarchy

```
Z-AXIS ELEVATION LEVELS

Level 5 (Urgent Dialogs)     ───► [Highest Z-Index] Widest, softest shadow (40px blur)
Level 4 (Modals & Tooltips)   ───► Very soft, wide spread shadow (32px blur)
Level 3 (Dropdowns & Menus)   ───► Medium spread shadow (16px blur)
Level 2 (Hovered Cards / CTAs) ───► Subtle elevated shadow (8px blur)
Level 1 (Default Cards)       ───► Low ambient shadow (4px blur)
Level 0 (Base Canvas)         ───► [Z = 0] Flat surface (No shadow)
```

### Elevation Assignment Guide

| UI Component | Resting Elevation | Active/Hovered Elevation |
|-------------|-------------------|--------------------------|
| App bars, headers | Level 2 | Level 2 (static) |
| Cards, list items | Level 1 | Level 2 (lift on hover) |
| Floating Action Buttons | Level 3 | Level 4 (lift on press) |
| Bottom sheets, drawers | Level 3 | Level 3 (static) |
| Dropdown menus, popovers | Level 3 | Level 3 (static) |
| Modal dialogs | Level 4 | Level 4 (static) |
| Tooltips, snackbars | Level 4 | Level 4 (static) |

---

## Dual Shadow Technique (Key Light + Ambient Light)

Real-world light produces two types of shadows simultaneously:
1. **Key Light Shadow**: A directional, slightly darker shadow cast straight downward (simulating a single overhead light source).
2. **Ambient Light Shadow**: A soft, diffuse, omnidirectional glow caused by ambient room light bouncing off surrounding surfaces.

Single-shadow CSS rules look harsh and artificial. Professional UI design uses **layered dual shadows**:

```css
/* Layered Dual Shadow System (Key + Ambient) */
:root {
  /* Level 0: Base Canvas — No shadow */
  --shadow-elevation-0: none;

  /* Level 1: Flat Raised Cards */
  --shadow-elevation-1: 
    0 1px 2px rgba(15, 23, 42, 0.06),   /* Directional Key */
    0 2px 4px rgba(15, 23, 42, 0.04);   /* Diffuse Ambient */

  /* Level 2: Hovered States & Floating Buttons */
  --shadow-elevation-2: 
    0 4px 6px -1px rgba(15, 23, 42, 0.08),
    0 2px 4px -2px rgba(15, 23, 42, 0.04);

  /* Level 3: Dropdown Menus & Popovers */
  --shadow-elevation-3: 
    0 10px 15px -3px rgba(15, 23, 42, 0.10),
    0 4px 6px -4px rgba(15, 23, 42, 0.05);

  /* Level 4: Modal Dialogs & Alerts */
  --shadow-elevation-4: 
    0 20px 25px -5px rgba(15, 23, 42, 0.12),
    0 8px 10px -6px rgba(15, 23, 42, 0.06);

  /* Level 5: Urgent System Dialogs */
  --shadow-elevation-5:
    0 25px 50px -12px rgba(15, 23, 42, 0.18),
    0 12px 20px -8px rgba(15, 23, 42, 0.08);
}

.modal-dialog {
  box-shadow: var(--shadow-elevation-4);
}
```

---

## Interactive Elevation Transitions

Elevation should change dynamically to indicate interaction state:

```css
/* Card with Elevation Transition on Hover */
.interactive-card {
  box-shadow: var(--shadow-elevation-1);
  transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;
}

.interactive-card:hover {
  box-shadow: var(--shadow-elevation-2);
  transform: translateY(-2px);  /* Subtle lift reinforces elevation change */
}

.interactive-card:active {
  box-shadow: var(--shadow-elevation-1);
  transform: translateY(0);    /* Press down returns to resting elevation */
}
```

**Principle**: When a user hovers over an interactive card, it should "lift" toward them (higher elevation = larger shadow + subtle Y-axis translation). When pressed, it should "push back down" to its resting elevation. This simulates physical button mechanics.

---

## Dark Mode Shadow Adaptation

In dark mode, traditional drop shadows become invisible against dark backgrounds. Dark mode interfaces express elevation through **surface lightness** instead of shadow:

```css
/* Dark Mode: Elevation via Surface Lightness */
[data-theme="dark"] {
  --surface-elevation-0: #121212;   /* Base canvas (darkest) */
  --surface-elevation-1: #1e1e1e;   /* Cards (+5% white overlay) */
  --surface-elevation-2: #232323;   /* Hovered cards (+7% white overlay) */
  --surface-elevation-3: #2c2c2c;   /* Dropdowns (+11% white overlay) */
  --surface-elevation-4: #333333;   /* Modals (+14% white overlay) */

  /* Shadows in dark mode: very subtle, mostly for separation */
  --shadow-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.30);
  --shadow-elevation-2: 0 3px 6px rgba(0, 0, 0, 0.35);
  --shadow-elevation-3: 0 6px 12px rgba(0, 0, 0, 0.40);
  --shadow-elevation-4: 0 12px 24px rgba(0, 0, 0, 0.50);
}
```

**Rule**: In dark mode, higher elevation = lighter surface color. The closer an element is to the user, the lighter its background becomes. This replaces shadow-based depth communication entirely.

---

## Real-World Case Studies

### 1. Google Material Design Elevation Sheets
Material Design 3 uses elevation levels from 0dp to 5dp, mapping each level to specific shadow blurs in light mode and white surface opacity overlays in dark mode. Material You extends this with dynamic color tinting—elevated surfaces in dark mode are tinted with the user's theme color rather than pure white overlays.

### 2. Apple macOS Layered Translucency
macOS uses a combination of shadows *and* translucency to express depth. Sidebars are translucent (showing desktop wallpaper through them), while modals and sheets cast strong shadows. This dual approach—glass transparency for resting elements, opaque shadows for floating elements—creates a rich spatial hierarchy.

### 3. Figma's Canvas Elevation
Figma's design tool uses subtle shadows to differentiate the canvas (Level 0), component frames (Level 1), and floating panels (Level 3). The properties panel, layers panel, and toolbar all cast distinct shadows that communicate their spatial position relative to the editing canvas.

---

## Common Mistakes

1. **Overly Harsh Dark Shadows**: Using `rgba(0, 0, 0, 0.5)` drop-shadows creates muddy visual clutter. Use low opacity (4%–12%) with slate blue tints (`rgba(15, 23, 42, 0.08)`) for natural-looking shadows.

2. **Ignoring Dark Mode Shadow Invisibility**: Drop shadows disappear on dark gray canvas backgrounds. Express dark mode elevation via surface lightness instead. Teams that simply copy their light mode shadow tokens into dark mode produce flat, depth-less dark interfaces.

3. **Inconsistent Elevation Assignment**: A tooltip should never cast a weaker shadow than a card. Maintain strict hierarchical ordering: Canvas < Card < Dropdown < Modal < Tooltip. Violations confuse the spatial mental model.

4. **Missing Elevation Transitions**: Static shadows feel dead. Interactive elements should visibly change elevation on hover/active states to communicate that the element responds to user input.

---

## Checklist for Elevation & Shadow Systems

- [ ] Does elevation increase predictably along the Z-axis (Canvas → Card → Dropdown → Modal)?
- [ ] Are drop shadows constructed using layered dual shadows (Key + Ambient) instead of harsh single shadows?
- [ ] In dark mode, is elevation expressed through surface lightness rather than invisible dark shadows?
- [ ] Do interactive elements visibly change elevation on hover (lift up) and active (press down)?
- [ ] Are shadow opacities kept low (4%–12%) with cool-tinted base colors rather than pure black?
- [ ] Are elevation assignments consistent across all components of the same type?

---

*Related: [Dark Mode Design Laws →](dark-mode-design-laws.md) | [Border Radius & Form Laws →](border-radius-and-form-laws.md) | [8pt Grid System →](8pt-grid-system.md) | [Visual Effects & Style Laws →](visual-effects-and-style-laws.md)*
