---
version: "1.0"
name: "TravellerAI Design System"
description: "A bespoke hybrid visual system for TravellerAI — the trusted multi-provider travel marketplace. Fuses Swiss Modern's mathematical grid discipline and typographic precision with Monochrome's editorial restraint and surface-contrast depth. The result is a Premium Editorial Travel System: zero decorative noise, maximum trust, with destination photography as the sole color source."
colors:
  primary: "#ffffff"
  secondary: "#000000"
  tertiary: "#ff3300"
  neutral: "#f5f5f5"
  surface: "#cccccc"
  accent: "#333333"
  canvas: "#fafafa"
  ink: "#111111"
  charcoal: "#27272a"
  graphite: "#3f3f46"
  mist: "#71717a"
  stone: "#e4e4e7"
  fog: "#f4f4f5"
  semantic_success: "#16a34a"
  semantic_warning: "#d97706"
  semantic_error: "#dc2626"
  semantic_info: "#2563eb"
typography:
  display:
    fontFamily: Inter
    fontSize: "clamp(3rem, 8vw, 7rem)"
    fontWeight: 800
  h1:
    fontFamily: Inter
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 700
  accent:
    fontFamily: "Instrument Serif"
    fontSize: "inherit"
    fontWeight: 400
    fontStyle: italic
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  mono:
    fontFamily: "IBM Plex Mono"
    fontSize: 0.875rem
    fontWeight: 400
components:
  button-primary:
    backgroundColor: "#111111"
    textColor: "#fafafa"
    height: "44px"
    padding: "14px 24px"
    radius: "6px"
    fontWeight: 600
  button-secondary:
    backgroundColor: "transparent"
    borderColor: "#3f3f46"
    borderWidth: "1.5px"
    textColor: "#111111"
    height: "44px"
    padding: "14px 24px"
    radius: "6px"
    fontWeight: 600
  card:
    backgroundColor: "#fafafa"
    borderColor: "#e4e4e7"
    borderWidth: "1px"
    radius: "8px"
    shadow: "0 1px 4px rgba(0,0,0,0.04)"
---

## Overview

The **TravellerAI Design System** is a purpose-built hybrid that draws from two complementary visual traditions: **Swiss Modern's** mathematical authority and **Monochrome's** editorial restraint. Neither is adopted wholesale. Instead, their strongest principles are synthesized into a system purpose-built for a trust-critical, photography-driven travel marketplace.

**Swiss Modern** contributes: mathematical grids, precise typographic hierarchy, asymmetric layouts used as communication tools (not decoration), and the discipline that every element must earn its place through function. From Müller-Brockmann's grid philosophy — structure IS the message.

**Monochrome** contributes: surface-contrast depth, neutral-scale hierarchy over color-dependent hierarchy, editorial whitespace as a primary grouping tool, and the restraint that prevents visual noise from competing with destination photography.

The synthesis: **a Precision Travel Editorial system** where the grid creates trust, typography creates hierarchy, whitespace creates breath, and destination photography delivers the emotional payload. Semantic color appears only where the system requires it — booking statuses, validation states, critical alerts.

- Density: 4/10 — Airy to balanced
- Variance: 7/10 — Structured but expressive asymmetry
- Motion: 3/10 — Purposeful, performance-first
- **Style:** Precision Editorial, Structured Minimal, Typography-Led, Trust-Forward
- **Keywords:** editorial, monochrome, swiss grid, travel marketplace, precision, inter, typographic hierarchy, destination photography, asymmetric, trust, neutral-scale, structured whitespace
- **Era:** 1950s Swiss International Style + 1990s Editorial Minimalism + 2026 Travel Commerce
- **Light/Dark:** Full / Full

---

## Colors

**The philosophical rule:** The neutral scale IS the brand palette. Destination photography is the only source of hue. Semantic color appears only for system feedback — never as decoration.

### Neutral Scale (The Full Palette)
- **Canvas** (#fafafa) — Primary canvas; never pure white; all large reading surfaces
- **Fog** (#f4f4f5) — Muted sections, card backgrounds, table headers, skeleton loader base
- **Stone** (#e4e4e7) — Borders, dividers, input strokes, separator lines
- **Mist** (#71717a) — Secondary text, timestamps, metadata, inactive icons, captions
- **Graphite** (#3f3f46) — Secondary emphasis, strong borders, active control indicators
- **Charcoal** (#27272a) — Raised dark surfaces, hover states on ink elements, dark card backgrounds
- **Ink** (#111111) — Primary text, primary actions, navigation anchors, dark section backgrounds

### Dark Mode Surface Elevation (lighter = higher surface)
- **Base** (#0a0a0a) — Root background
- **Surface-1** (#111111) — Card level
- **Surface-2** (#1c1c1e) — Modal, drawer level
- **Surface-3** (#27272a) — Tooltip, popover level
- **Text-Primary** (#fafafa) — Primary text on dark
- **Text-Secondary** (#a1a1aa) — Metadata on dark
- **Borders-Dark** (#3f3f46) — Dividers on dark

### Semantic Color (Reserved for system feedback only — NEVER decorative)
- **Success** (#16a34a) on (#f0fdf4) — Confirmed, approved, completed, verified
- **Warning** (#d97706) on (#fffbeb) — Pending, under review, balance due, expiring
- **Error** (#dc2626) on (#fef2f2) — Rejected, cancelled, failed, expired, error
- **Info** (#2563eb) on (#eff6ff) — Informational, in-progress, new feature

Color application rules:
- Use Canvas instead of pure white for large surfaces to prevent glare
- Use Ink instead of pure black for text to prevent contrast fatigue
- Maximum four neutral levels within any single component
- Never communicate status with gray intensity alone — always pair with label + icon
- In dark mode, raise surfaces with progressively lighter charcoal, never with shadows
- Document every introduction of semantic color with justification
- Destination photography provides the page's emotional color — maintain monochrome chrome around it at all times

**60-30-10 Distribution:**
- 60%: Canvas + Fog (dominant neutral — backgrounds, large surfaces)
- 30%: Ink + Graphite (secondary structure — text, borders, anchors)
- 10%: Accented Ink (actions, CTAs, active states — the ink itself is the accent)

---

## Typography

**The philosophical rule:** Typography is the primary hierarchy system. Scale, weight, spacing, and whitespace establish all relationships before borders or colors are introduced. Two proportional families + one monospace. Never more.

### Font Families
- **Display / Hero:** Inter — Weight 700–800, tight tracking (−0.02em to −0.05em), decisive editorial statements
- **Editorial Accent:** Instrument Serif — Italic only, weight 400; used exclusively for pull quotes, destination taglines, campaign phrases; creates serif contrast without a color
- **Body & UI:** Inter — Weight 400 (body), 500 (labels), 600 (actions, headings)
- **Technical / Data:** IBM Plex Mono — Booking IDs, prices, codes, timestamps, reference numbers, data tables

### Type Scale (Responsive via CSS clamp)
- Display: clamp(3rem, 8vw, 7rem) / weight 800 / tracking −0.04em
- H1: clamp(2.25rem, 5vw, 4.5rem) / weight 700 / tracking −0.03em
- H2: clamp(1.75rem, 3vw, 3rem) / weight 700 / tracking −0.02em
- H3: clamp(1.25rem, 2vw, 1.75rem) / weight 600
- H4: 1.125rem / weight 600
- Body Large: 1.125rem / weight 400 / line-height 1.65
- Body: 1rem / weight 400 / line-height 1.65
- Small: 0.875rem / weight 400–500 / line-height 1.5
- Caption: 0.75rem / weight 500–600 / line-height 1.4
- Mono: 0.875rem / weight 400 / font-variant-numeric: tabular-nums

### Typography Rules (Swiss + Monochrome synthesis)
- Hierarchy is communicated through scale, weight, and position — not color
- Display and H1 tracking between −0.02em and −0.05em at Inter weight 700+
- Uppercase used only for: labels, indexes, category markers, navigation identifiers
- Uppercase letter-spacing: +0.06em to +0.12em
- Tabular numerals (`font-variant-numeric: tabular-nums`) for all prices, IDs, booking stats, data tables
- Line length: 45ch–68ch for all long-form reading content
- Never use font-weight below 400 for body or important content
- Instrument Serif reserved for emphasis phrases — never for UI labels or body copy
- IBM Plex Mono reserved for data — never for headline or body

**Swiss contribution:** Mathematical scale relationships — each step is precise, not arbitrary
**Monochrome contribution:** The scale IS the hierarchy — no color reinforcement needed

---

## Layout

**The philosophical rule (Swiss core):** The grid is law. Every element earns its position through function and spatial relationship. Grid breaks are rare and intentional — they create energy precisely because the grid is otherwise strict.

### Grid System
- Grid: CSS Grid primary; max-width containment: 1360px centered
- Container padding: clamp(1rem, 4vw, 4rem)
- Columns: 4 mobile / 8 tablet / 12 desktop
- Gutters: 16px mobile / 24px tablet / 32px desktop

### Spacing Scale (8pt Grid — Swiss precision)
```
4px  (0.25rem) — Fine control: icon gap, internal micro-padding
8px  (0.5rem)  — Component internal spacing, tight labels
12px (0.75rem) — Tight component gap
16px (1rem)    — Standard padding (base unit)
20px (1.25rem) — Medium separation
24px (1.5rem)  — Section internal gap
32px (2rem)    — Component separation
40px (2.5rem)  — Feature section internal
48px (3rem)    — Major component gap
64px (4rem)    — Section separator
80px (5rem)    — Large section gap
96px (6rem)    — Hero padding
Section vertical rhythm: clamp(4rem, 10vw, 10rem)
```

### Layout Principles (synthesized)
- **Swiss:** Asymmetric layouts used deliberately for storytelling; symmetric grids for transactional screens
- **Swiss:** Allow one intentional grid break per major section — it creates visual energy because the rule exists
- **Monochrome:** Whitespace is the first grouping tool — borders and cards are secondary
- **Monochrome:** Not every content group needs a card; proximity is more elegant than containment
- Feature sections: Alternating split layouts, editorial stacks, highlighted rows — never repetitive 3-equal columns
- Hero: Large typographic field with asymmetric image; the typography-to-image tension creates drama
- Forms and transactional screens: Predictable, symmetric — asymmetry is for stories, grids are for decisions
- Keep actions adjacent to the content they affect (Fitts's Law)
- Content width for reading: 45ch–68ch max
- Never use `height: 100vh` — always `min-height: 100dvh`

### Z-index Contract
```
base:       0
raised:     10
sticky-nav: 100
overlay:    200
modal:      300
toast:      500
```

---

## Elevation & Depth

**The philosophical rule (Monochrome core):** Depth is created through surface contrast, border precision, and controlled shadow. Heavy drop shadows are not the visual identity.

### Surface Levels
- Canvas (#fafafa) — Default page background
- Fog (#f4f4f5) — Muted sections, card backgrounds
- Raised (#ffffff + 1px Stone border) — Elevated card components
- Inverse (#111111) — Dark sections, featured cards, high-emphasis areas
- Overlay (rgba(0,0,0,0.48)) — Modal backdrop

### Shadow Scale
- None: No shadow (default — use borders and surface contrast instead)
- SM: 0 1px 4px rgba(0,0,0,0.04) — Subtle lift for interactive cards
- MD: 0 2px 12px rgba(0,0,0,0.06) — Search inputs, prominent cards
- LG: 0 16px 40px rgba(0,0,0,0.12) — Modals, dropdowns, menus ONLY

### Border System
- 1px Stone (#e4e4e7) — Default component boundary
- 1px Graphite (#3f3f46) — Hover-state border emphasis
- 2px Ink (#111111) — Selected state, active tabs, focus rings
- 1.5px Graphite — Secondary button stroke

### Motion Physics (Swiss precision meets Monochrome restraint)
- Ease-out: cubic-bezier(0.0, 0.0, 0.2, 1) — Entries, fade-in
- Ease-in: cubic-bezier(0.4, 0.0, 1, 1) — Exits
- Ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1) — State changes
- Ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1) — Celebratory moments (booking confirmation)

### Duration Scale
- Instant: 100ms — Hover shifts
- Fast: 160ms — Page transitions
- Normal: 240ms — Component state changes
- Slow: 360ms — Entry animations
- Enter: 420ms — Modal open, drawer slide

### Animation Standards
- Entry: translateY(12px → 0) + opacity(0 → 1) / 360ms ease-out
- Stagger: 60ms between items, max 8 items in sequence
- Page transition: Fade only, 160–200ms
- Hover: One-surface-step shift, 160ms ease-out
- Booking confirmation (peak emotional moment): Checkmark draw + scale, 600ms ease-spring
- Animate ONLY: transform and opacity (GPU composited, no layout triggers)
- Never animate: width, height, margin, padding, top, left

### Reduced Motion
- Remove all translation, parallax, stagger, and continuous animation
- Preserve opacity transitions for essential state feedback only

---

## Shapes

**The philosophical rule:** Corner radius is a functional signal — not decorative softness. The system uses moderate sharpness as its base personality. Swiss precision; not brutalist, not soft-product.

```
4px  (xs)   — Checkboxes, radio indicators, tight status tags
6px  (sm)   — Inputs, buttons, small interactive controls
8px  (md)   — Cards, panels (default)
12px (lg)   — Large media containers, featured hero cards
9999px (full) — Pill-shape: tags, avatar containers ONLY when pill shape communicates a compact object
0px  (none) — Editorial variant, full-bleed image sections, inverse hero areas
```

Shape rules:
- Nested elements use equal or smaller radii than their parent (concentric radius law)
- Avoid mixing square cards with rounded buttons unless the contrast is intentional and documented
- Circles only for: avatars, status indicators, media controls, data visualization markers
- No decorative blobs or organic shapes — they violate the grid discipline

---

## Components

### Buttons
- **Primary:** Ink (#111111) fill, Canvas text, weight 600, 44px height, 6px radius, 14px/24px padding. Hover: Charcoal + translateY(−1px). Active: translateY(1px). Focus: 2px Ink outline, 3px offset. No glow, no gradient.
- **Secondary:** Transparent fill, 1.5px Graphite border, Ink text, weight 600. Hover: Fog fill. Same height/radius as primary.
- **Ghost:** No fill, no border at rest. Hover: Fog fill or underline change. Requires weight 600 label to remain recognizable.
- **Destructive:** Error (#dc2626) fill, Canvas text. For cancel booking, reject, delete — never for routine actions.
- **Size scale:** SM 36px / MD 44px (default) / LG 52px

### Cards
- Surface: Canvas or Fog + 1px Stone border + 8px radius
- Shadow: optional SM shadow only
- Hover: border strengthens to Graphite + SM→MD shadow transition (160ms)
- Featured/inverse card: Ink fill, Canvas text — ONE per section maximum
- Package card image: 16:9 ratio, 6px top radius only, cover fit
- Never stack multiple inverse cards — it destroys the emphasis

### Inputs & Forms
- Persistent label above input (never floating labels — cognitive load on complex travel forms)
- Border: 1px Stone at rest → 1px Graphite hover → 2px Ink focus outline, 2px offset
- Error: Error-color border + error message below + status icon (never color alone)
- Date pickers: Calendar with Ink selected-date fill, Fog range fill, strikethrough for unavailable
- Search hero input: 56px height, MD shadow, distinctively larger than standard inputs

### Navigation
- Header: Canvas surface, 1px Stone bottom border; sticky with blur(12px) + opacity on scroll
- Active nav item: 2px Ink bottom underline (NOT a color change — Swiss underline convention)
- Sidebar (dashboard): Fog surface, 3px Ink left border on active item + Stone fill
- Mobile: Full-screen drawer, Ink surface, Canvas text, explicit open/close labels

### Status Badges (travel-specific — label + icon + border ALWAYS)
```
Confirmed    — check icon     + Success color  + solid border
Pending      — clock icon     + Warning color  + dashed border
Cancelled    — x icon         + Error color    + heavy border
In Progress  — circle icon    + Info color     + solid border
Completed    — double-check   + Mist color     + solid border
Disputed     — warning icon   + Error color    + dashed border
Verified     — shield-check   + Success color  + solid border (provider/property)
On Request   — mail icon      + Warning color  + dotted border
```

### Data Tables
- Horizontal rules only — no vertical rules (Swiss editorial influence)
- Numeric data: right-aligned, tabular numerals (IBM Plex Mono)
- Sort state: column header icon + aria-sort attribute
- Row hover: Fog background (160ms ease)
- Sticky first column on wide horizontal tables

### Empty States
Icon (Lucide, 32px, Mist color) → Heading (H3) → Short explanation (Body, Mist) → Single CTA (Secondary button)
Examples: "Your storefront is empty — Create your first package" | "No bookings yet — Browse packages"

### Skeletons
- Pulse animation: Fog → Stone → Fog, 1.4s linear infinite
- Match final component dimensions exactly — no layout shift on data load
- Respect prefers-reduced-motion: static Fog fill instead of animation

---

## Interaction States

Every interactive element must be unambiguous at all states — never relying on a single signal:

- **Rest:** Clear boundary or label + expected affordance
- **Hover:** One-surface-step shift OR border strengthening + 160ms transition (enhancement, not sole indicator)
- **Focus-visible:** 2px contrasting Ink outline with 3px offset — visible on Canvas, Fog, Ink, image, dark surfaces
- **Active:** Small translateY(1px) tactile press or inverted surface — label stays stable
- **Selected:** Two signals minimum: e.g., fill + icon, border + weight, underline + label
- **Disabled:** Reduced emphasis (Mist), still legible — correct disabled semantics — no hover/active effects
- **Loading:** Preserve component width — add skeleton or spinner + status text
- **Error:** Error-color border + status icon + explicit message + recovery action
- **Success:** Confirmation label + check icon — never dark-gray-alone

---

## Iconography

**System:** Lucide Icons — consistent stroke weight, 24×24px keyline grid

- No emojis in UI — Lucide only, always
- All icon-only controls: `aria-label` required
- Icons + labels: icon LEFT of label, 8px gap
- Consistent stroke weight across all icons in any single view
- Status icons: always paired with text label
- Sizes: 16px (inline text) / 20px (UI control) / 24px (action) / 32px (empty state) / 48px (feature illustration)

---

## Photography & Media

**The philosophical rule:** In a monochrome system, photography IS the emotional color. Its quality and treatment define the brand's perceived premium level.

### Standards
- Package hero: 16:9 (desktop), 4:3 (card thumbnail)
- Property/hotel hero: 21:9 for full-bleed sections
- Provider profile: 1:1 avatar (circular crop), 3:1 cover image
- Blog featured: 16:9
- Minimum resolution: 1200px wide for any full-width image

### Treatment
- Destination photography: Full natural color — never filtered or desaturated (the photography IS the color)
- Text overlaid on images: Always add gradient overlay (Ink → transparent, 40% opacity minimum) beneath
- Preserve luminance detail — no over-exposed or over-darkened crops
- Intentional crop ratios — no arbitrary crops that lose the subject

### Prohibited
- Generic stock photography interchangeable with any destination
- Heavily filtered, artificially saturated, or desaturated photography
- Images with visible watermarks
- Low-resolution images used at full-width

---

## Accessibility

**WCAG 2.1 AA minimum for all pages. WCAG 2.1 AAA target for booking flow and payment screens.**

- All text: minimum 4.5:1 contrast (7:1 target for body)
- UI components and focus rings: minimum 3:1 contrast
- Never use color, shade, or animation as the sole information channel
- Persistent form labels — never floating-label-only patterns
- Logical heading structure: one H1 per page, sequential hierarchy
- Semantic HTML first — ARIA only when HTML semantics are insufficient
- Accessible names for all icon-only controls
- Touch targets: 44×44px minimum, 8px minimum gap between adjacent targets
- Keyboard navigation: all interactive elements reachable, WAI-ARIA patterns for menus/dialogs/tabs
- `prefers-reduced-motion` honored platform-wide
- Skip-to-content link as first focusable element
- Focus indicators visible on Canvas, Fog, Ink, and image surfaces

---

## Do's and Don'ts

**DO:**
- Use Canvas (not #fff) and Ink (not #000) for all large surfaces
- Use typography scale, weight, and whitespace as the primary hierarchy system
- Use asymmetric grid layouts for editorial sections; symmetric for transactional screens
- Use one intentional grid break per section — it works because the grid is otherwise strict
- Use generous whitespace — it is structure, not emptiness
- Introduce inverse (Ink surface) sections selectively for visual rhythm — maximum once per page flow
- Use destination photography to provide the page's emotional hue — protect it with clean chrome
- Make keyboard focus rings highly visible on all surface types
- Define light and dark mode tokens independently — never auto-invert
- Celebrate the booking confirmation moment — it is the emotional peak of the journey
- Use tabular numerals for all prices, booking IDs, statistics, and data tables
- Label all status badges with icon + text + border — never color alone
- Provide recovery actions for every error state
- Test: mobile, tablet, desktop, keyboard, screen reader, reduced motion

**DO NOT:**
- No emojis — Lucide icon system only
- No decorative color gradients — flat neutral surfaces + authentic photography
- No status communication through gray intensity alone
- No more than four neutral levels in a single component
- No body copy below accessible contrast thresholds
- No floating form labels — persistent labels above inputs always
- No heavy card shadows across the page — only for modals and overlays
- No mixing soft shadows (MD) and hard shadows in the same visual mode
- No `height: 100vh` — use `min-height: 100dvh` always
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Revolutionary", "Next-Gen"
- No generic lorem ipsum in demos or design files
- No 3-equal-column feature grids — use asymmetric or varied spans
- No decorative blobs or organic shapes — they violate grid discipline
- No animating: width, height, margin, padding, top, left — only transform and opacity
- No semantic colors in decorative contexts — reserved for system feedback only

---

## Design Token Reference

```css
:root {
  /* NEUTRAL SCALE */
  --color-primary:   #ffffff;
  --color-secondary: #000000;
  --color-tertiary:  #ff3300;
  --color-neutral:   #f5f5f5;
  --color-surface:   #cccccc;
  --color-accent:    #333333;

  --color-canvas:   #fafafa;
  --color-fog:      #f4f4f5;
  --color-stone:    #e4e4e7;
  --color-mist:     #71717a;
  --color-graphite: #3f3f46;
  --color-charcoal: #27272a;
  --color-ink:      #111111;

  /* SEMANTIC (system feedback only) */
  --color-success:    #16a34a;
  --color-success-bg: #f0fdf4;
  --color-warning:    #d97706;
  --color-warning-bg: #fffbeb;
  --color-error:      #dc2626;
  --color-error-bg:   #fef2f2;
  --color-info:       #2563eb;
  --color-info-bg:    #eff6ff;

  /* TYPOGRAPHY */
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-mono:  'IBM Plex Mono', monospace;

  --text-display: clamp(3rem, 8vw, 7rem);
  --text-h1:      clamp(2.25rem, 5vw, 4.5rem);
  --text-h2:      clamp(1.75rem, 3vw, 3rem);
  --text-h3:      clamp(1.25rem, 2vw, 1.75rem);
  --text-h4:      1.125rem;
  --text-lg:      1.125rem;
  --text-base:    1rem;
  --text-sm:      0.875rem;
  --text-xs:      0.75rem;

  /* SPACING (8pt grid) */
  --space-1:  0.25rem;   /* 4px  */
  --space-2:  0.5rem;    /* 8px  */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* BORDER RADIUS */
  --radius-xs:   4px;
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-full: 9999px;

  /* SHADOWS */
  --shadow-none: none;
  --shadow-sm:   0 1px 4px rgba(0,0,0,0.04);
  --shadow-md:   0 2px 12px rgba(0,0,0,0.06);
  --shadow-lg:   0 16px 40px rgba(0,0,0,0.12);

  /* MOTION */
  --duration-instant: 100ms;
  --duration-fast:    160ms;
  --duration-normal:  240ms;
  --duration-slow:    360ms;
  --duration-enter:   420ms;
  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in:     cubic-bezier(0.4, 0.0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* LAYOUT */
  --container-max:     1360px;
  --container-padding: clamp(1rem, 4vw, 4rem);

  /* Z-INDEX */
  --z-base:    0;
  --z-raised:  10;
  --z-nav:     100;
  --z-overlay: 200;
  --z-modal:   300;
  --z-toast:   500;
}
```

---

*Design System: TravellerAI | Version 1.0 | September 2026*
*Philosophy: Swiss Modern grid discipline + Monochrome editorial restraint = Precision Travel Editorial*
*Related: brand-guidelines.md | website-prd.md | monochrome.md | swiss.md*
