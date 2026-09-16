# Fitts's Law

> *"The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target."*
> — **Paul Fitts**, 1954

---

## Overview

**Fitts's Law** is one of the most empirically validated principles in human-computer interaction. Formulated by psychologist Paul Fitts in 1954, it describes the relationship between the **distance** to a target, its **size**, and the **time** it takes to reach it. In practical terms: **larger targets that are closer are faster and easier to acquire** than smaller targets that are farther away.

This law has profound implications for UI and UX design, particularly in determining:
- The optimal size of buttons and interactive elements
- The placement of CTAs and navigation
- Touch target sizing for mobile interfaces
- The ergonomic design of entire interfaces

Fitts's Law is unique among UX principles because it's not just a guideline—it's a mathematical model that has been repeatedly validated across decades of research and countless interfaces.

---

## The Origin Story

### Paul Fitts and the Law of Motion

In the 1950s, psychologist Paul Fitts conducted a series of experiments examining human motor performance. His key insight came from analyzing pointing tasks: when humans reach for objects, they exhibit a predictable trade-off between **speed** and **accuracy**.

Fitts discovered that:
- Moving to a **small target** takes longer than moving to a **large target**
- Moving to a **distant target** takes longer than moving to a **close target**
- Moving **quickly** increases error rate (hitting the wrong target or missing entirely)

This relationship could be expressed mathematically:

```
MT = a + b × log₂(2D/W)
```

Where:
- `MT` = Movement Time
- `D` = Distance from starting point to target center
- `W` = Width of the target
- `a` and `b` = Constants based on the specific task

The term `log₂(2D/W)` is called the **Index of Difficulty (ID)**—it measures how hard a target is to hit.

### The Index of Difficulty

The Index of Difficulty explains why some targets are harder than others:

| Target Size (W) | Distance (D) | Index of Difficulty |
|------------------|---------------|---------------------|
| 100px            | 200px         | 2.0 bits            |
| 50px             | 200px         | 3.0 bits            |
| 25px             | 200px         | 4.0 bits            |
| 50px             | 400px         | 4.0 bits            |
| 25px             | 400px         | 5.0 bits            |

Notice: Doubling the distance or halving the width increases difficulty by one "bit"—a measure of information.

---

## The Psychology Behind Fitts's Law

### The Speed-Accuracy Trade-off

Fitts's Law quantifies a fundamental human limitation: **we cannot move quickly AND accurately at the same time**. This is known as the **speed-accuracy trade-off**.

Think about reaching for a glass of water:
- If the glass is large and close, you can grab it quickly with low risk of error
- If the glass is small and far, you must move slowly and carefully

This trade-off is neurological—our brains can only refine motor commands so much before errors increase.

### Why Small Targets Are Problematic

Small targets require:
1. More precise motor control
2. Slower movement speed
3. Greater visual attention
4. More correction during approach

The result: **more errors, more frustration, and slower task completion**.

### The "Magic" of Screen Edges

One of Fitts's Law's most famous implications is about **screen edges and corners**:

When you move your cursor to the edge of a screen:
- The cursor literally cannot go past the edge
- The target is effectively **infinitely large** in that direction
- Therefore, any target at a screen edge is **impossible to miss**

This is why:
- Operating system docks (macOS, Windows taskbar) are at screen edges
- Start menus are in corners
- The most important UI elements should leverage these "infinite targets"

---

## Key Principles of Fitts's Law

### 1. Size Matters Directly

Larger targets are easier to hit. The relationship is logarithmic, not linear, meaning:
- Doubling target size doesn't double ease of use
- But going from tiny (20px) to small (40px) makes a big difference
- The biggest gains come from sizing up the smallest targets

### 2. Distance Matters Inversely

Targets that are closer to the user's current focus or cursor are easier to reach:
- Place frequently-used actions near the content
- Keep related actions in close proximity
- Minimize travel distance for common tasks

### 3. Exploit Screen Boundaries

Screen edges and corners are "magic zones" where targets are effectively infinite:
- macOS dock sits at the bottom edge
- Windows taskbar at bottom edge
- Many apps place primary actions at edges

### 4. Peripheral Vision Aided by Size

Large targets can be hit even when not looked at directly:
- Your peripheral vision can detect large targets
- Small targets require focused attention
- This is why mobile thumb zones matter

---

## Practical Applications in UI/UX Design

### Button Sizing

**The Core Principle**: Primary CTAs should be large and prominent.

```
✗ Bad: 80px wide buttons next to 80px wide buttons

✓ Good: 120px+ buttons for primary actions, smaller for secondary

✓ Best: Large primary button, smaller secondary, text links for tertiary
```

**Mobile Touch Targets**:

| Device | Minimum Recommended | Apple HIG | Material Design |
|--------|-------------------|-----------|----------------|
| Mobile | 44×44px | 44×44pt | 48×48dp |
| Tablet | 44×44px | 44×44pt | 48×48dp |
| Desktop | 24×24px | — | — |

**The 44×44 Pixel Rule**: Apple's Human Interface Guidelines specify 44×44 points as the minimum touch target size for iOS. Google recommends 48×48dp for Android. These sizes account for finger size and imprecise touching.

### Navigation Placement

**Primary Navigation**:
```
✓ Place navigation at top or edges (easy to reach from most positions)
✓ Use large tab or icon sizes
✓ Consider bottom navigation on mobile (thumb zone)
```

**Secondary Navigation**:
```
✓ Keep within proximity of primary navigation
✓ Use consistent sizing across all nav items
✓ Avoid placing nav items too close together (adjacent selection errors)
```

### Form Design

**Input Fields and Buttons**:
```
✗ Bad: Tiny "X" to clear a field, small "Submit" button far from the field

✓ Good: Clear field button next to input, submit button directly below

✓ Best: Inline validation, large submit button, auto-focus to next field
```

**The Stack vs. Side-by-Side Debate**:
```
Stacked: Label → Input → Button (longer but direct path)
Side-by-side: Input + Button (faster for mouse, tricky for touch)
```

For mobile: Stacked is almost always better (thumb moves straight down)
For desktop: Side-by-side can work, but stacked is safer

### Error Prevention and Recovery

**Large, Accessible Cancel/Delete Actions**:
```
✗ Bad: Large "Delete Everything" button next to "Save" button

✓ Good: "Delete Everything" is harder to trigger accidentally (but still findable)

✓ Best: Delete requires confirmation step (not just undo)
```

**The Pattern**:
- Destructive actions should require more effort (Fitts's Law friend)
- Or: require confirmation before execution
- And: make undo readily available

### Modal and Dialog Design

**Primary Action Placement**:
```
✓ Primary button on right (closer to expected cursor position)
✓ Cancel/Secondary on left
✓ Make primary button larger than secondary
✓ Use clear visual hierarchy
```

**Modal Size and Position**:
```
✓ Modals should appear near the action that triggered them
✓ Large modals for important actions
✓ Small tooltips/popovers for quick interactions
```

---

## Mobile-Specific Applications

### The Thumb Zone Problem

On mobile devices, the user's thumb has limited reach:

```
┌─────────────────────────────────┐
│      Difficult Zone             │
│  (requires thumb stretch)       │
│                                 │
│                                 │
│         Easy Zone               │
│    (natural thumb position)     │
│                                 │
│                                 │
│      Easy Zone                  │
│   (can reach with adjustment)   │
│                                 │
└─────────────────────────────────┘
```

**The Solution**:
- Place primary actions in the bottom third of the screen
- Navigation at bottom for thumb-reachable access
- Keep important content in the center
- Use swipe gestures for secondary actions

### Touch Target Spacing

Just as important as size is **spacing between targets**:

```
✗ Bad: Two 44px buttons with only 4px gap between them

✓ Good: Two 44px buttons with 8-12px gap between them

✓ Best: Minimum 8px gap + clear visual separation
```

**Why Spacing Matters**:
- Fingers have width
- Touch precision is limited
- Too-close targets lead to accidental taps
- Visual separation helps users target correctly

### Safe Areas and Notch Considerations

Modern phones have notches, dynamic islands, and curved edges:

```
✓ Use system-provided safe area guides
✓ Don't place critical touch targets in corners
✓ Account for rounded screen edges
✓ Test on multiple device sizes
```

---

## Desktop-Specific Considerations

### Mouse vs. Trackpad Precision

Different input devices affect Fitts's Law calculations:
- **Mouse**: Fast movement, coarse precision
- **Trackpad**: Slower, finer precision
- **Stylus**: Most precise, slowest

Design for the most common input method on each platform.

### Cursor Start Positions

Users don't always start from the same position:
- Browser back button (top-left) assumes cursor starts there
- This is why convention becomes convention
- Position frequent actions where cursors naturally rest

### Hover States and Reveals

Fitts's Law applies to hover-dependent interfaces:
```
✗ Bad: Important action only appears on hover (hidden until needed)

✓ Good: Primary actions visible by default, secondary revealed on hover

✓ Best: All actions visible OR clear affordance that more exists
```

---

## Real-World Examples

### Apple iOS and macOS

**Design Patterns**:
- Large, touch-friendly icons in the dock
- Generous touch targets in buttons and links
- Screen edge exploitation for docks and menus
- Consistent sizing across the OS

**Example**: iOS Settings uses large row items (44pt minimum) that are easy to tap.

### Amazon's Product Pages

**Design Patterns**:
- Large "Add to Cart" button, prominently placed
- "Buy Now" as an alternative (same size, different color)
- Product image zoom on tap (large target)
- Cart icon in header (accessible from any page)

### Google's Search Interface

**Design Patterns**:
- Large search box (easy target)
- Search button next to input
- Autocomplete reduces typing distance
- Clean interface minimizes competing targets

---

## Advanced Fitts's Law Strategies

### 1. The "Fat Finger" Compensation

Account for the gap between intention and execution:

```
For critical actions:
- Increase target size
- Place away from other tappable elements
- Add confirmation step
- Use progressive disclosure to hide dangerous actions
```

### 2. Edge and Corner Exploitation

Place important actions at screen boundaries:

```
Desktop:
- Close button in top-right corner (infinite in two directions)
- Docks at screen edges
- Start menus in bottom-left corner

Mobile:
- Bottom navigation bars (edge)
- Back gesture from left edge
- Floating action buttons near edges
```

### 3. Relative Sizing of Destructive Actions

The "Fat Finger" problem is especially dangerous for destructive actions:

```
✗ Bad: Delete button same size as Save button

✓ Good: Delete button smaller and harder to hit

✓ Better: Delete requires long-press or swipe-to-delete confirmation

✓ Best: Make destructive actions require multiple steps
```

### 4. Progressive Target Acquisition

Guide users to targets:

```
Example: Step wizards
- Large "Next" button at bottom
- Progress indicator shows position
- Users know exactly where to click next
- No competing targets on each step
```

---

## Measuring Fitts's Law Compliance

### Quantitative Metrics

- **Error rate**: How often do users miss or hit wrong targets?
- **Time to click**: How long does it take users to acquire targets?
- **Revisit time**: Do users get faster with repeated use?
- **Miss-click rate**: Heat maps showing mis-taps

### Heat Map Analysis

Use tools to see:
- Where users actually click
- Where they mean to click
- Which targets are being missed
- Touch vs. click behavior differences

### A/B Testing

```
Test 1: Current button size vs. 25% larger
Test 2: Current placement vs. edge placement
Test 3: Spacing between targets: 4px vs. 8px vs. 12px
Test 4: Number of targets on screen
```

---

## Common Mistakes

### 1. Designing for Pixel-Perfect Screens

**The Error**: Designing at high zoom levels, then users at default zoom.

**The Reality**: Buttons that look fine at 100% zoom may be too small at 150%.

### 2. Ignoring Mobile First

**The Error**: Designing desktop-first, then squeezing into mobile.

**The Reality**: Mobile requires larger touch targets, not just smaller layouts.

### 3. Inconsistent Sizing

**The Error**: Some buttons large, others small, no system.

**The Reality**: Inconsistency leads to mis-clicks (users expect similar-sized similar elements).

### 4. Forgetting Spacing

**The Error**: Large targets but placed too close together.

**The Reality**: Crowded targets cause adjacent selection errors.

---

## Fitts's Law Checklist

### Before Finalizing Any Interface:

- [ ] Are all touch targets at least 44×44px (mobile)?
- [ ] Are primary CTAs the largest elements on the page?
- [ ] Are related actions grouped together to minimize distance?
- [ ] Are destructive actions made harder to trigger accidentally?
- [ ] Is spacing between targets sufficient (8-12px minimum)?
- [ ] Have you tested on actual devices, not just simulators?
- [ ] Are important actions placed near screen edges or corners?
- [ ] Do hover/focus states maintain or increase target visibility?
- [ ] Have you accounted for fat finger/mis-tap scenarios?

---

## The Doherty Threshold Connection

Fitts's Law and the Doherty Threshold work together:

- **Doherty Threshold**: How fast the system responds after a target is hit
- **Fitts's Law**: How long it takes to hit the target

Both contribute to perceived speed:
- Even a fast system (under 400ms response) feels slow if targets are hard to hit
- Even well-designed targets feel frustrating if responses are slow

---

## Conclusion

Fitts's Law is one of the most actionable principles in UX design. Unlike some laws that provide general guidance, Fitts's Law gives concrete direction:

1. **Make important targets large**
2. **Place them where users are likely to be looking**
3. **Keep frequently-used actions close to each other**
4. **Exploit screen edges and corners**
5. **Space targets to prevent mis-taps**
6. **Make destructive actions harder to trigger**

These aren't suggestions—they're predictions based on decades of human factors research. By applying Fitts's Law systematically, you create interfaces that feel effortless to use, reducing friction and errors while increasing user satisfaction.

**Remember**: Every pixel of size and every pixel of distance matters. The small things in interface design add up to either a smooth, enjoyable experience or a frustrating, error-prone one.

---

*Next: [Miller's Law →](millers-law.md) - The average person can only keep 7 (±2) items in their working memory.*
