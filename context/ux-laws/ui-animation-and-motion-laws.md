# UI Animation and Motion Design Laws

> *"Motion in digital interfaces must provide functional continuity, directional spatial awareness, and instant tactile feedback."*
> — **Disney Animation Principles Adapted for UI**

---

## Overview

**UI Animation and Motion Design Laws** govern the timing, velocity curves, and spatial behavior of interactive transitions in digital applications. Motion should never be decorative fluff; it must serve functional usability—explaining where an element came from, where it went, and how elements relate spatially along the screen canvas.

Adapting Disney's classic *12 Principles of Animation* for modern user interfaces establishes strict timing and easing constraints:

- **Duration Window**: Standard UI transitions must complete between **200ms and 400ms**. Transitions under 100ms are imperceptible; transitions over 500ms feel sluggish.
- **Velocity Curves (Easing)**: Never use robotic `linear` motion. Use **Ease-Out** for entering elements and **Ease-In** for exiting elements.
- **Accessibility Respect**: Always honor the `prefers-reduced-motion` media query to prevent motion sickness for users with vestibular disorders.

---

## The Origin Story

### Disney's 12 Principles Meet Software Interfaces

In 1981, Disney animators **Frank Thomas and Ollie Johnston** published *The Illusion of Life: Disney Animation*, codifying 12 principles that made animated characters feel alive and emotionally resonant. These principles—developed over 50 years of hand-drawn animation—describe fundamental rules about how objects move in a way that feels natural to human perception.

In the 2010s, interaction designers recognized that the same principles could be adapted for UI transitions:

| Disney Principle | UI Animation Application |
|-----------------|--------------------------|
| **Squash & Stretch** | Elastic overscroll, rubber-band bounce effects |
| **Anticipation** | Button scale-down before action, drawer peek before open |
| **Staging** | Dimming background before modal appears (focal attention direction) |
| **Follow Through & Overlapping** | Staggered list item animations, cascading card reveals |
| **Slow In and Slow Out** | Ease-in and ease-out curves (non-linear velocity) |
| **Arcs** | Elements following curved paths rather than straight lines |
| **Secondary Action** | Ripple effect on button tap, icon bounce on notification |
| **Timing** | 200-400ms duration window for UI transitions |
| **Exaggeration** | Shake animation for error states, bounce for success |

### Material Motion: Google's Codification

Google's Material Design team formalized UI motion into four principles (2014):
1. **Informative**: Motion tells users where elements come from and where they go
2. **Focused**: Motion directs attention to the right element at the right time
3. **Expressive**: Motion communicates personality and brand
4. **Coherent**: Similar elements move in similar ways throughout the system

---

## Easing Curve Mechanics

```
1. EASE-OUT (Deceleration Curve)      2. EASE-IN (Acceleration Curve)
   Starts Fast → Decelerates at End       Starts Slow → Accelerates at Exit
   Use: Entering Modals, Menus, Cards     Use: Dismissing Toasts, Closing Drawers
   Feeling: Responsive & Tactile          Feeling: Quick Dismissal

   Velocity ↑                             Velocity ↑
   │████                                  │      ████
   │    ████                              │  ████
   │        ████                          │██
   └─────────────► Time                   └─────────────► Time

3. EASE-IN-OUT (S-Curve)              4. SPRING (Physics-Based)
   Slow Start → Fast Middle → Slow End    Oscillating overshoot + settle
   Use: Position transitions, transforms  Use: Toggle switches, pull-to-refresh
   Feeling: Natural, physical movement    Feeling: Bouncy, alive, playful
```

### CSS Cubic Bezier Reference

```css
/* Standard UI Easing Curves */
:root {
  /* Material Design Standard */
  --ease-standard:    cubic-bezier(0.4, 0.0, 0.2, 1.0);  /* Ease-in-out */
  --ease-decelerate:  cubic-bezier(0.0, 0.0, 0.2, 1.0);  /* Ease-out (entering) */
  --ease-accelerate:  cubic-bezier(0.4, 0.0, 1.0, 1.0);  /* Ease-in (exiting) */
  
  /* Apple-style Curves */
  --ease-apple:       cubic-bezier(0.25, 0.1, 0.25, 1.0); /* macOS/iOS default */
  
  /* Spring-like Bounce */
  --ease-bounce:      cubic-bezier(0.34, 1.56, 0.64, 1);  /* Overshoot + settle */
}
```

---

## Standard UI Duration Matrix

| Interaction Type | Recommended Duration | Easing Function | Example |
|------------------|----------------------|-----------------|---------|
| **Micro-feedback** (Hover, Active, Toggle) | **100ms – 200ms** | `ease-out` | Button color change, checkbox toggle |
| **Medium Surface** (Dropdown, Tooltip, Toast) | **200ms – 300ms** | `ease-decelerate` | Menu open, tooltip appear, toast slide-in |
| **Large Transition** (Modal Overlay, Drawer) | **300ms – 400ms** | `ease-standard` | Full-screen modal, sidebar drawer |
| **Route Transition** (Page-to-page) | **300ms – 500ms** | `ease-standard` | SPA page transitions, tab switches |
| **Complex Choreography** (Staggered lists) | **400ms – 600ms total** | `ease-decelerate` + stagger | Card grid reveal, dashboard loading |

### Staggered Animation Pattern

When multiple items appear simultaneously (e.g., a card grid loading), stagger their animations to create a cascading effect:

```css
/* Staggered Card Grid Reveal */
.card-grid .card {
  opacity: 0;
  transform: translateY(16px);
  animation: fadeInUp 0.3s ease-out forwards;
}

.card-grid .card:nth-child(1) { animation-delay: 0ms; }
.card-grid .card:nth-child(2) { animation-delay: 50ms; }
.card-grid .card:nth-child(3) { animation-delay: 100ms; }
.card-grid .card:nth-child(4) { animation-delay: 150ms; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Accessible Motion CSS Architecture

```css
/* Functional UI Motion & Accessibility System */
.modal-overlay {
  transition: transform 300ms var(--ease-standard),
              opacity 300ms ease-out;
}

/* MANDATORY ACCESSIBILITY OVERRIDE */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Why this matters**: Approximately **35% of adults over 40** experience some form of vestibular disorder that makes screen motion uncomfortable or nauseating. Honoring `prefers-reduced-motion` is not optional—it's an accessibility requirement equivalent to color contrast compliance.

---

## Real-World Case Studies

### 1. Apple iOS Spatial Transitions
iOS uses spatial motion to reinforce navigation hierarchy: opening an app zooms in from the icon position (establishing spatial origin), and going "back" zooms out to the previous context. This creates a consistent mental model of spatial depth.

### 2. Stripe Checkout Micro-Animations
Stripe's payment form uses micro-animations for card number formatting (numbers slide into groups of 4), card brand detection (card icon morphs from generic to Visa/Mastercard), and validation feedback (checkmarks fade in, error messages slide down). Each animation serves functional feedback—none are decorative.

### 3. Google Material Motion Choreography
Material Design's FAB (Floating Action Button) expansion uses a carefully choreographed sequence: button scales up → morphs into a surface → content fades in. The choreography communicates spatial origin (the FAB is where the content came from) and provides visual continuity.

---

## Common Mistakes

1. **Using `linear` Easing**: Linear motion (constant velocity) feels robotic and unnatural because nothing in the physical world moves at constant speed. Always use deceleration or acceleration curves.

2. **Exceeding 500ms Duration**: Transitions longer than 500ms feel sluggish and waste user time on repeated interactions. If your animation needs more than 500ms, reconsider whether the transition is necessary.

3. **Animating Properties That Trigger Layout Recalculation**: Animating `width`, `height`, `top`, `left`, `margin`, or `padding` triggers expensive browser layout recalculations. Always animate `transform` and `opacity` instead—these are GPU-composited and maintain 60fps.

```css
/* ✗ Bad: Layout-triggering animation (causes jank) */
.card:hover { margin-top: -8px; }

/* ✓ Good: GPU-composited animation (smooth 60fps) */
.card:hover { transform: translateY(-8px); }
```

4. **Ignoring `prefers-reduced-motion`**: Shipping a site with animations but no reduced-motion fallback is an accessibility failure. Always implement the media query override.

---

## Checklist for UI Animation Laws

- [ ] Are transition durations kept strictly between 200ms and 400ms?
- [ ] Are entering elements animated using Ease-Out and exiting elements using Ease-In?
- [ ] Is `prefers-reduced-motion: reduce` implemented to disable motion for users with vestibular sensitivity?
- [ ] Are animations GPU-composited (`transform`, `opacity`) rather than layout-triggering (`width`, `top`)?
- [ ] Do staggered animations use consistent, short delays (50-100ms between items)?
- [ ] Does every animation serve a functional purpose (feedback, spatial continuity, attention direction)?

---

*Related: [Doherty Threshold →](doherty-threshold.md) | [Elevation & Shadow System →](elevation-and-shadow-system.md) | [Touch Target & A11y Laws →](touch-target-and-a11y-laws.md) | [Weber's Law →](webers-law.md)*
