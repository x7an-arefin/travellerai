# Law of Common Fate

> *"Elements that move in the same direction, at the same speed, are perceived as a unified group."*
> — **Max Wertheimer**, 1923

---

## Overview

The **Law of Common Fate** is a Gestalt principle that states elements moving in the same direction, at the same speed, or transforming in the same way are perceived as a single, cohesive group. Unlike static Gestalt principles like proximity or similarity, Common Fate is **dynamic**—it relies on motion to communicate relationships between interface elements.

In the context of modern UI/UX design, where animation and micro-interactions are fundamental to the user experience, the Law of Common Fate is more relevant than ever. Every scroll animation, parallax effect, loading transition, and drag-and-drop interaction leverages this principle. When elements move together, users understand they're related. When they don't, users perceive them as separate entities.

This is the law that governs the **choreography of interfaces**—the coordinated dance of elements that makes digital products feel alive, coherent, and intentional.

---

## The Origin Story

### Wertheimer's Motion Studies

In 1923, Max Wertheimer—one of the founders of Gestalt psychology—described Common Fate as part of his broader work on perceptual organization. His experiments were deceptively simple but profoundly insightful:

1. Participants were shown arrays of dots on a screen
2. Some dots moved upward; others moved downward
3. Despite being randomly positioned, dots moving in the same direction were instantly perceived as distinct groups
4. When all dots moved together, they were seen as a single unified mass

**Key Finding**: Motion is such a powerful grouping cue that it can override static grouping principles. Even when dots were positioned to suggest grouping by proximity, their shared motion created stronger perceptual groups.

### The Evolutionary Basis

Common Fate has deep evolutionary roots:

- **Predator detection**: A group of rustling leaves moving together might indicate a hidden predator
- **Flock recognition**: Birds flying in formation are instantly recognized as a group
- **Social cohesion**: People walking in the same direction are perceived as "together"
- **Object permanence**: Parts of an object that move together are assumed to be physically connected

Our brains are wired to detect coordinated motion because it provided survival advantages. In digital interfaces, we leverage this same hardwiring to communicate relationships.

---

## The Psychology Behind Common Fate

### Motion as the Primary Grouping Cue

When motion is present, it dominates other grouping principles:

| Scenario | Grouping Cue | Result |
|----------|-------------|--------|
| Red and blue dots, all moving right | Common Fate > Similarity | Perceived as ONE group (shared motion) |
| Closely spaced dots, half moving up, half down | Common Fate > Proximity | Perceived as TWO groups (different motion) |
| Same-shaped items, some animated, some static | Common Fate > Similarity | Animated items form their own group |

### Types of "Fate" in Digital Interfaces

Common Fate extends beyond simple directional movement:

1. **Directional movement**: Elements sliding in the same direction
2. **Speed synchronization**: Elements moving at the same velocity
3. **Timing coordination**: Elements appearing or disappearing simultaneously
4. **Transformation synchronization**: Elements scaling, rotating, or fading together
5. **Behavioral synchronization**: Elements responding to the same interaction simultaneously

### The Temporal Dimension

Unlike other Gestalt principles that work in spatial snapshots, Common Fate operates in **time**:

- Users process motion over approximately 200-500ms
- Synchronized events within this window are perceived as "common fate"
- Events separated by more than ~300ms are perceived as sequential, not simultaneous
- Staggered animations (with small delays) can create a sense of related-but-ordered elements

---

## Key Principles of Common Fate for UX

### 1. Synchronize Related Elements

When elements belong together, they should move together:
- Menu items sliding in as a group
- Dashboard cards loading simultaneously
- Form sections expanding in unison
- Related content scrolling at the same rate

### 2. Differentiate Through Asynchronous Motion

When elements are unrelated, they should move independently:
- Background parallax moving at a different speed than foreground content
- A notification sliding in while main content remains static
- Independent panels that scroll separately (like a sidebar and main content)

### 3. Use Staggered Animation for Ordered Sequences

When elements are related but have an inherent order:
- Stagger entry animations by 50-100ms per element
- Maintain the same direction and easing for all elements
- The stagger communicates "related, but in sequence"
- Example: List items appearing one after another, cards cascading into view

### 4. Motion Should Be Purposeful

Every animation should communicate something:
- **Entry**: "I've arrived"
- **Exit**: "I'm leaving"
- **Feedback**: "Your action was received"
- **Relationship**: "We belong together"
- **State change**: "Something has changed"

Decorative animation without communicative purpose violates this principle and adds cognitive noise.

---

## Practical Applications in UI/UX Design

### Navigation Transitions

**The Problem**: Page transitions can feel disjointed when elements animate independently.

**The Solution**:
```
✗ Bad: All elements fade in simultaneously with no coordination

✓ Better: Header slides down, content fades in, sidebar slides from left
  (each moving independently → feels choreographed)

✓ Best: Shared elements (header, nav) remain stable while content 
  transitions smoothly, creating continuity between states
```

**Transition Choreography**:
```
Step 1 (0ms):    Background color transitions smoothly
Step 2 (0ms):    Shared elements (header, nav) remain in place
Step 3 (50ms):   Old content fades/slides out
Step 4 (200ms):  New content fades/slides in (same direction as old content's exit)
Step 5 (250ms):  Secondary elements (sidebar, footer) update

Total duration: 300-400ms
Key: Shared motion direction creates continuity
```

### Dropdown Menus and Accordions

**The Problem**: When a menu opens, users need to immediately recognize which items belong to it.

**The Solution**:
```
✗ Bad: Menu items appear instantly with no animation

✓ Better: All menu items slide down simultaneously from the trigger

✓ Best: Menu items slide down with a subtle stagger (50ms between items),
  all moving in the same direction, creating a cascading "common fate" effect
```

**Menu Animation Pattern**:
```
Trigger clicked (0ms):     Menu container expands
Item 1 appears (50ms):     Slides down + fades in
Item 2 appears (100ms):    Slides down + fades in
Item 3 appears (150ms):    Slides down + fades in
Item 4 appears (200ms):    Slides down + fades in

All items share: Same direction, same easing, same fade duration
The stagger creates flow while the shared motion creates grouping
```

### Drag and Drop

**The Problem**: When dragging items, users need to understand what's being moved.

**The Solution**:
```
✗ Bad: Only the item directly under the cursor moves

✓ Better: Selected items all move together, following the cursor

✓ Best: Selected items move together + drop target area animates 
  (expanding, highlighting) to indicate where items will land
```

**Multi-Select Drag Pattern**:
```
Selection phase:    User selects 5 items (items gain shared highlight)
Drag start:         All 5 items lift slightly (shared elevation change)
During drag:        All 5 items follow cursor in formation
Approach target:    Target zone expands/highlights (common fate with drop area)
Drop:               All items settle into target with shared animation
```

### Loading States

**The Problem**: Content loading at different speeds can feel fragmented.

**The Solution**:
```
✗ Bad: Each component loads independently, creating visual chaos

✓ Better: Skeleton screens show unified placeholder content

✓ Best: Content blocks reveal in coordinated groups:
  - Header section loads together
  - Main content cards appear as a synchronized group
  - Sidebar elements load together
  Each group uses shared animation timing
```

**Loading Choreography**:
```
Phase 1 (0ms):     Skeleton placeholders for all content (shimmer animation)
Phase 2 (200ms):   Above-the-fold content replaces skeletons simultaneously
Phase 3 (400ms):   Secondary content loads as a group
Phase 4 (600ms):   Tertiary content (ads, recommendations) loads last

Key: Within each phase, elements replace skeletons in synchrony
```

### Carousel and Slider Design

**The Problem**: Carousels contain multiple items that need to feel like a cohesive set.

**The Solution**:
```
✗ Bad: Only the visible slide moves; others are invisible and static

✓ Better: Multiple items slide together in the same direction

✓ Best: All visible items slide together + peek of next item is visible,
  creating anticipation through shared motion
```

**Carousel Motion Principles**:
- All visible slides must move at the same speed
- Pagination indicators should animate in sync with slide movement
- Caption/description text should transition with its associated slide
- Navigation arrows can remain static (they're not part of the content group)

### Scroll-Linked Animations

**The Problem**: Parallax and scroll effects can feel disconnected if not coordinated.

**The Solution**:
```
✗ Bad: Every element has its own scroll speed, creating visual chaos

✓ Better: Elements grouped into 2-3 parallax layers with shared speeds

✓ Best: Content groups (text + supporting image) move at the same rate,
  while decorative elements move at different rates for depth
```

**Parallax Layer Strategy**:
```
Layer 1 (Background):  Moves at 0.3x scroll speed (decorative elements)
Layer 2 (Content):     Moves at 1.0x scroll speed (text, cards, images)
Layer 3 (Foreground):  Moves at 1.3x scroll speed (overlapping elements)

Within each layer, all elements share the same motion = Common Fate
Between layers, different speeds create depth = Differentiation
```

### Notification Groups

**The Problem**: Multiple notifications appearing simultaneously can overwhelm users.

**The Solution**:
```
✗ Bad: Notifications appear from random directions at random times

✓ Better: All notifications slide in from the same edge

✓ Best: Notifications slide in from the same edge + when dismissed,
  remaining notifications shift together to close the gap
```

---

## Advanced Strategies

### 1. The Choreography Matrix

Plan complex animations by mapping elements to motion groups:

```
| Element          | Motion Group | Direction | Timing  | Easing     |
|-----------------|-------------|-----------|---------|------------|
| Header          | Static      | None      | N/A     | N/A        |
| Main content    | Group A     | Slide up  | 0-300ms | ease-out   |
| Sidebar         | Group A     | Slide up  | 50-350ms| ease-out   |
| Cards           | Group B     | Fade in   | 200-500ms| ease-in   |
| FAB button      | Group C     | Scale up  | 400ms   | spring     |

Groups A and B share direction → perceived as related
Group C moves differently → perceived as independent action
```

### 2. Breaking Common Fate for Emphasis

Deliberately breaking synchronized motion draws attention:

```
Example: One notification requires urgent action
- 4 notifications slide in together (common fate = they're all notifications)
- The urgent notification pulses or bounces (breaking common fate)
- User's attention is drawn to the different behavior
- The broken pattern signals: "This one is special"
```

### 3. Gestural Common Fate

Multi-touch gestures create temporary common fate:

```
Pinch to zoom: Both fingers move toward center → content scales down
  All content within the viewport shrinks together (common fate)
  UI chrome (toolbar, tabs) remains static (separate group)

Two-finger scroll: Both fingers move upward → content scrolls
  All scrollable content moves together
  Fixed elements (header, FAB) remain separate
```

### 4. Responsive Motion Design

Adapt animation groups across breakpoints:

```
Desktop: Cards enter with horizontal stagger (left to right)
Tablet:  Cards enter with vertical stagger (top to bottom, 2 columns)
Mobile:  Cards enter with vertical stagger (top to bottom, 1 column)

The stagger direction changes, but the shared easing and timing maintain 
the "common fate" grouping across all breakpoints.
```

---

## Case Studies

### Apple: iOS Page Transitions

**The Challenge**: Navigation between apps and screens needs to feel fluid and connected.

**The Solution**:
- App icons zoom and transform into full-screen apps (the icon and app content share a common origin)
- Back swipe shows both current and previous screen moving together
- Shared element transitions connect list items to detail views
- Widget stacks animate cards moving in the same direction

**Result**: iOS feels like a continuous, spatial environment rather than disconnected screens.

### Google: Material Motion

**The Challenge**: Providing a cohesive motion language for all Google products.

**The Solution**:
- "Container transforms": List items expand into detail views (shared motion between thumbnail and hero)
- "Shared axis": Forward/backward navigation along a consistent axis
- "Fade through": Related content transitions with synchronized fade timing
- All items within a container animate together when the container moves

**Result**: A consistent, learnable motion language across hundreds of products.

### Stripe: Dashboard Loading

**The Challenge**: Complex financial dashboards with many data widgets.

**The Solution**:
- Dashboard sections load in coordinated groups (revenue metrics together, chart section together)
- Skeleton screens for each group shimmer in synchrony
- Data populates simultaneously within each section
- Charts animate their data points together (lines draw, bars rise)

**Result**: A complex dashboard that feels organized and intentional during loading.

---

## Measuring the Impact

### Quantitative Metrics

Track these indicators:
- **Perceived loading speed**: Does coordinated loading feel faster?
- **Task completion time**: Do users find grouped elements more quickly?
- **Interaction error rate**: Do users correctly identify related elements?
- **Animation satisfaction score**: Do users find transitions smooth and coherent?

### Qualitative Indicators

- Users describe the interface as "smooth" or "fluid"
- No reports of "I didn't realize those items were related"
- Users intuitively understand which elements respond to their interactions
- The interface feels "alive" without being "distracting"

---

## Common Mistakes

### 1. Over-Animating

**The Error**: Every element has its own unique animation, with no coordination.

**The Reality**: When everything moves independently, nothing feels grouped. Coordinated motion is better than individual flair.

### 2. Inconsistent Timing

**The Error**: Related elements animate at different speeds or with different easing curves.

**The Reality**: Even small timing differences (>50ms) between related elements can break the perception of common fate.

### 3. Ignoring Reduced Motion Preferences

**The Error**: Forcing animations on all users regardless of accessibility settings.

**The Reality**: Always respect `prefers-reduced-motion`. Provide alternative static grouping cues (borders, backgrounds, proximity) when motion is disabled.

### 4. Decorative-Only Motion

**The Error**: Adding animations purely for visual appeal with no communicative purpose.

**The Reality**: Motion should always communicate relationships or states. Purposeless motion is noise.

---

## Checklist for Applying Common Fate

### Before Finalizing Any Animated Interface:

- [ ] Do related elements move together (same direction, speed, timing)?
- [ ] Do unrelated elements move independently?
- [ ] Is the motion hierarchy clear (primary → secondary → tertiary)?
- [ ] Does staggered animation communicate sequence within a group?
- [ ] Is the total animation duration under 500ms for functional transitions?
- [ ] Have you tested with `prefers-reduced-motion` enabled?
- [ ] Does every animation communicate something meaningful?
- [ ] Have you mapped out motion groups in a choreography plan?

---

## Common Fate and Other UX Laws

Common Fate works synergistically with:

- **Law of Proximity**: Static proximity + shared motion = very strong grouping
- **Law of Similarity**: Visual similarity + shared motion = unmistakable grouping
- **Law of Uniform Connectedness**: Visual connections + shared motion = the strongest possible grouping
- **Doherty Threshold**: Keep animations under 400ms to maintain system responsiveness
- **Law of Prägnanz**: Motion should simplify perception, not complicate it

---

## Conclusion

The Law of Common Fate is the **director's tool** for interface animation. While other Gestalt principles organize static layouts, Common Fate choreographs the dynamic experience—the moments of transition, interaction, and state change that define how a product **feels**.

In an era where motion design is a core part of every digital product, mastering Common Fate means the difference between interfaces that feel **chaotic** and those that feel **choreographed**. Every scroll, every transition, every loading sequence is an opportunity to reinforce relationships through synchronized motion.

**The rule is simple: what moves together, belongs together.** Apply this principle with intention, and your interfaces will feel alive, coherent, and deeply intuitive.

---

*Next: [Endowment Effect →](endowment-effect.md) - Users value things more simply because they feel ownership over them.*
