# Border Radius Formula and Form State Laws

> *"Container curves must match nested element curvature; button states must afford tactile physical feedback."*
> — **Component Micro-Geometry & Interaction State Principles**

---

## Overview

The **Border Radius Formula and Form State Laws** govern two essential foundations of micro-UI design:

1. **The Concentric Border Radius Formula**: The mathematical relationship required between a parent container's outer corner radius and an inner child element's corner radius to ensure perfect visual parallelism.
2. **Interactive Button & Form State Hierarchy**: The mandatory five visual feedback states every form element, button, and control must provide to indicate affordance, accessibility, and system status.

Mastering these visual laws prevents visual distortion in nested components and guarantees that interactive software responds intuitively to user actions.

---

## Part 1: Concentric Border Radius Formula

When a rounded container wraps a rounded child element with internal padding, using identical border radii creates noticeable visual distortion—the inner corner appears squished, visually mismatched, and optically unnatural.

To achieve perfect parallel concentric curves:

$$\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$$

```
  Outer Container (Radius: 16px)
  ┌──────────────────────────────────────────────┐
  │  Padding: 12px                               │
  │  ┌────────────────────────────────────────┐  │
  │  │  Inner Child (Radius: 16 - 12 = 4px)   │  │
  │  └────────────────────────────────────────┘  │
  └──────────────────────────────────────────────┘
```

### Mathematical Corner Case Handling
If $\text{Outer Radius} \le \text{Padding}$, set the $\text{Inner Radius} = 0\text{px}$ (a sharp 90° corner). Negative radius values do not exist in geometry, and a sharp inner corner looks optically correct when padding exceeds outer radius.

---

## Part 2: Interactive Button & Form State Hierarchy

Every interactive component (buttons, inputs, checkboxes, dropdowns, switches) must communicate its exact operational state through five mandatory visual feedback levels:

```
┌───────────────┬────────────────────────────────────────────────────────────────────────┐
│ State         │ Visual Behavior & Affordance Requirement                               │
├───────────────┼────────────────────────────────────────────────────────────────────────┤
│ **1. Default**│ Resting primary state. Clear affordance (fill color, shadow, label).  │
│ **2. Hover**  │ Cursor presence. Brightness shift (+10% lightness or subtle scale 1.02).│
│ **3. Focus**  │ Keyboard navigation. High-contrast focus ring (`outline: 3px solid`).  │
│ **4. Active** │ Moment of click/tap. Inset shadow or scale down (0.98) for tactile push.│
│ **5. Disabled**│ Non-interactive. Reduced opacity (40%), `cursor: not-allowed`.          │
└───────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## Practical Applications in Design Systems & Code

```css
/* ========================================================
   1. CONCENTRIC BORDER RADIUS IMPLEMENTATION
   Outer Radius: 16px, Padding: 12px -> Inner Radius: 4px
   ======================================================== */
.parent-card {
  border-radius: 16px; /* Outer Radius */
  padding: 12px;       /* Padding */
  background: #ffffff;
  border: 1px solid #e2e8f0;
}

.child-badge {
  /* Inner = Outer - Padding -> 16px - 12px = 4px */
  border-radius: 4px;
  background: #f1f5f9;
  padding: 4px 8px;
}

/* ========================================================
   2. FIVE-STATE INTERACTIVE BUTTON SYSTEM
   ======================================================== */
.btn-primary {
  /* 1. DEFAULT STATE */
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.15s ease-in-out;
}

/* 2. HOVER STATE */
.btn-primary:hover {
  background-color: #1d4ed8; /* Darker/brighter on hover */
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
}

/* 3. FOCUS STATE (Accessibility) */
.btn-primary:focus-visible {
  outline: 3px solid #93c5fd; /* High-contrast focus indicator */
  outline-offset: 2px;
}

/* 4. ACTIVE STATE (Tactile Click) */
.btn-primary:active {
  transform: scale(0.98);    /* Physical depression feedback */
  background-color: #1e40af;
}

/* 5. DISABLED STATE */
.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
```

---

## Real-World Case Studies

### 1. Apple macOS Window & Card Controls
macOS windows utilize strict concentric corner radii. Window inner search bars and container cards adjust their corner radii dynamically based on distance from the outer window frame, preventing visual distortion.

### 2. Stripe Checkout Component States
Stripe's payment form fields feature explicit visual state changes: active input focus triggers a 2px indigo border ring, invalid entries instantly display an error highlight, and disabled submission buttons clearly signal pending card processing.

---

## Common Mistakes

1. **Identical Inner & Outer Radii**: Setting both parent card and inner image to `border-radius: 16px` with `16px` padding makes the inner corners look unnaturally pointy.
2. **Missing Keyboard Focus States**: Removing default browser outline rings (`outline: none`) without providing a custom `:focus-visible` ring breaks accessibility for keyboard users.
3. **Using Disabled States for Hidden Validation Errors**: Keeping a form submission button permanently disabled without explaining *why* fields are invalid leaves users confused.

---

## Checklist for Radius & Form Laws

- [ ] Does every nested child element follow the concentric formula ($\text{Inner} = \text{Outer} - \text{Padding}$)?
- [ ] Does every interactive button and input control feature distinct styles for Default, Hover, Focus, Active, and Disabled states?
- [ ] Is keyboard focus clearly visible with a high-contrast focus ring (`:focus-visible`)?
- [ ] Do active click/tap states provide subtle physical feedback (e.g., `transform: scale(0.98)`)?

---

*Related: [8pt Grid System →](8pt-grid-system.md) | [Elevation & Shadow System →](elevation-and-shadow-system.md) | [Touch Target & A11y Laws →](touch-target-and-a11y-laws.md)*
