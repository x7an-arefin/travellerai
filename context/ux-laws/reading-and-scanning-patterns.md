# Reading and Scanning Patterns (F-Pattern, Z-Pattern & Gutenberg Diagram)

> *"Users rarely read digital pages linearly—they scan along predictable visual paths dictated by layout density."*
> — **Nielsen Norman Group (NN/g) Eye-Tracking Studies**

---

## Overview

**Reading and Scanning Patterns** describe how humans process visual information on screen displays. Decades of eye-tracking research reveal that users almost never read digital pages word-for-word. Instead, their eyes follow three primary scanning patterns based on content density:

1. **The F-Pattern**: Dominates **text-heavy pages** (blogs, documentation, news). Users scan the top horizontal line, drop down the left edge, scan a shorter horizontal line, and sweep down the left margin in an "F" shape.
2. **The Z-Pattern**: Dominates **landing pages & promotional pages** (minimal text, visual hero sections). The eye moves from top-left → top-right → diagonal down to bottom-left → across to bottom-right in a "Z" shape.
3. **The Gutenberg Diagram**: Describes eye movement across **evenly distributed text blocks** (reading gravity from top-left Primary Optical Area to bottom-right Terminal Area).

---

## The Three Scanning Patterns in Detail

### 1. The F-Pattern (Text-Heavy Scanning)

```
┌─────────────────────────────────────────────────────────────┐
│ [1. Top Horizontal Sweep] ═══════════════════════════════►  │
│ [2. Drop down left edge]                                    │
│ [3. Second Shorter Sweep] ══════════════►                   │
│ [4. Vertical Left Line Sweep]                               │
│ │                                                           │
│ ▼                                                           │
└─────────────────────────────────────────────────────────────┘
```

**Design Rule for F-Pattern**:
- Place critical keywords, bold bullet points, and subheaders on the **far left edge**.
- Users lose interest toward the right side of lower text blocks.

---

### 2. The Z-Pattern (Landing Page Scanning)

```
┌───────────────────────────────┬─────────────────────────────┐
│ (1) Logo / Brand              │ (2) Top Nav / Sign In       │
│  ═════════════════════════════►                             │
│                              ╱                              │
│                             ╱                               │
│                            ╱ (Diagonal Sweep)               │
│                           ╱                                 │
│  ◄═══════════════════════                                   │
│ (3) Secondary Info / Value    │ (4) PRIMARY CTA BUTTON      │
└───────────────────────────────┴─────────────────────────────┘
```

**Design Rule for Z-Pattern**:
- End point (4) at the bottom-right corner is the ideal location for your **Primary Call to Action**.

---

### 3. The Gutenberg Diagram (Reading Gravity)

```
┌───────────────────────────────┬─────────────────────────────┐
│ Primary Optical Area          │ Strong Fallow Area          │
│ (Top-Left — START HERE)       │ (Low Attention)             │
├───────────────────────────────┼─────────────────────────────┤
│ Weak Fallow Area              │ Terminal Area               │
│ (Low Attention)               │ (Bottom-Right — FINAL CTA)  │
└───────────────────────────────┴─────────────────────────────┘
```

---

## Practical Applications in Page Layout

```html
<!-- Z-Pattern HTML Landing Page Layout -->
<header class="z-nav">
  <div class="logo">BrandLogo</div><!-- Position 1: Start of Z -->
  <a href="/login" class="nav-link">Sign In</a><!-- Position 2: Top Right -->
</header>

<main class="z-hero">
  <div class="hero-content">
    <h1>Transform Your Workflow Today</h1><!-- Position 3: Diagonal Sweep -->
    <p>Automate your team's project pipeline in seconds.</p>
    <button class="btn-cta">Start Free Trial →</button><!-- Position 4: End of Z -->
  </div>
</main>
```

---

## Checklist for Scanning Patterns

- [ ] On text-heavy pages (F-Pattern), are key subheadings and bullet points formatted along the left margin?
- [ ] On landing pages (Z-Pattern), is the main CTA placed at the bottom-right terminal point of the Z-path?
- [ ] Is critical branding placed at the top-left Primary Optical Area?

---

*Related: [C.R.A.P. Principles →](crap-principles.md) | [Rule of Thirds →](rule-of-thirds.md) | [Banner Blindness →](banner-blindness.md)*
