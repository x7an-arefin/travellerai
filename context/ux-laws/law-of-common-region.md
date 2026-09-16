# Law of Common Region

> *"When objects are located within the same closed region, they are perceived as belonging together."*
> — **Gestalt Theory**, Added by Palmer, 1992

---

## Overview

The **Law of Common Region** is a Gestalt principle that states: **elements enclosed within the same bounded area are perceived as belonging together**. Even if elements are spatially separated, when they share a visual boundary—through containers, backgrounds, borders, or enclosed spaces—they are perceived as a unified group.

This principle is particularly powerful in UI design because it allows designers to create groupings even when elements cannot be placed close together. It's often stronger than the Law of Proximity, as a visible boundary can group elements even when significant space separates them.

---

## The Origin Story

### Adding to the Gestalt Legacy

While the core Gestalt principles were established by Wertheimer, Koffka, and Köhler in the 1920s, the **Law of Common Region** was formally added later. Stephen Palmer formalized it in 1992, building on the earlier work of the Gestalt psychologists.

Palmer demonstrated that **the presence of a shared visual region creates a grouping stronger than spatial proximity alone**. This was an important addition because it explained how designers could create groupings even in complex layouts where elements couldn't be placed close together.

### The Key Insight

The Law of Common Region works because:

1. **Boundaries define ownership**: A contained area suggests "everything inside belongs together"
2. **Visual containment is powerful**: Even without labels, a box around elements signals relationship
3. **Region overrides distance**: Elements in a shared region are grouped even when far apart

---

## The Psychology Behind the Law of Common Region

### How Boundaries Create Grouping

Our brains interpret enclosed spaces as meaningful containers:

```
Without boundary:
● ● ● ● ● ● ● ●

Not immediately obvious that these form a group

With boundary:
┌─────────────────┐
│  ● ● ● ● ● ● ●  │
└─────────────────┘

Immediately perceived as one cohesive unit
```

### Why Region Overrides Proximity

The Law of Common Region is often **stronger than proximity** because:

1. **Explicit containment**: A boundary is an explicit visual signal
2. **Inclusive grouping**: Everything inside the region belongs together
3. **Exclusive grouping**: Nothing outside the region belongs

### Types of Visual Regions

**Borders and Frames**:
- Solid lines around content
- Dashed borders for emphasis
- Rounded rectangles

**Backgrounds and Fills**:
- Colored backgrounds
- Shaded areas
- Card backgrounds

**Whitespace Boundaries**:
- Sufficient whitespace creates implicit boundaries
- Negative space as a grouping tool

---

## Key Principles of the Law of Common Region

### 1. Boundaries Define Belonging

When elements share a visual container, they're perceived as related:
```
✓ Card backgrounds group their contents
✓ Section backgrounds separate from page background
✓ Modal overlays create a new visual region
```

### 2. Region Can Override Proximity

Elements in the same region are grouped even when distant:
```
┌────────────────────────────┐
│  [Item A]                  │
│                            │
│                            │
│  [Item B]                  │
└────────────────────────────┘

Items A and B are perceived as related despite the space between them.
```

### 3. The More Defined the Region, the Stronger the Grouping

```
Weak region: Light background color
Medium region: Subtle border
Strong region: Solid border + background color
Very strong region: Drop shadow + solid background
```

### 4. Nested Regions Create Hierarchy

Regions can contain sub-regions:
```
┌─────────────────────────────────┐
│  Header Region                   │
│  ┌───────────┐ ┌───────────┐    │
│  │ Sidebar   │ │ Main      │    │
│  │ Region    │ │ Region    │    │
│  │           │ │           │    │
│  └───────────┘ └───────────┘    │
└─────────────────────────────────┘

Nested regions create clear content hierarchy.
```

---

## Practical Applications in UI/UX Design

### Card Design

**The Most Common Application**

```
┌────────────────────────────┐
│  [Image]                    │
│  Card Title                 │
│  Card description text...   │
│  [Action Button]            │
└────────────────────────────┘

The card container groups all these elements as one unit.
```

**Card Hierarchy**:
```
✓ Cards for similar content types
✓ Card grids for consistent layouts
✓ Nested cards for complex hierarchies
```

### Panel and Section Design

**Dashboard Panels**

```
┌─────────────────┐  ┌─────────────────┐
│  Analytics      │  │  Recent Activity │
│  ████████ 80%   │  │  • Item 1       │
│  ██████ 60%     │  │  • Item 2       │
│  ████ 40%       │  │  • Item 3       │
└─────────────────┘  └─────────────────┘

Each panel is a visual region with its own content.
```

### Modal Dialogs

**Overlay Regions**

```
┌──────────────────────────────────────┐
│ ┌──────────────────────────────────┐ │
│ │  Modal Region (foreground)        │ │
│ │  Title                           │ │
│ │  Content                         │ │
│ │  [Cancel] [Confirm]               │ │
│ └──────────────────────────────────┘ │
│                                       │
│  Overlay dims background but          │
│  creates clear region separation      │
│                                       │
└──────────────────────────────────────┘
```

### Sidebar and Navigation

**Sidebar Containers**

```
┌──────────────────┬───────────────────┐
│ ┌──────────────┐ │                    │
│ │ Logo         │ │                    │
│ ├──────────────┤ │    Main Content    │
│ │ Navigation  │ │    Area            │
│ │ - Item 1    │ │                    │
│ │ - Item 2    │ │                    │
│ │ - Item 3    │ │                    │
│ └──────────────┘ │                    │
└──────────────────┴───────────────────┘

Sidebar is a distinct region with clear boundary.
```

### Form Sections

**Grouped Form Fields**

```
┌─────────────────────────────────┐
│  Personal Information           │
│  ┌─────────────────────────┐   │
│  │ First Name    Last Name │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ Email Address            │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘

Section header + field container groups the form elements.
```

### Settings Pages

**Categorized Settings**

```
┌─────────────────────────────────┐
│  Account Settings               │
│  ┌─────────────────────────┐   │
│  │ Profile Photo           │   │
│  │ Display Name           │   │
│  │ Email Preferences       │   │
│  └─────────────────────────┘   │
│                                 │
│  Security Settings              │
│  ┌─────────────────────────┐   │
│  │ Password                │   │
│  │ Two-Factor Auth         │   │
│  │ Active Sessions         │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

---

## Real-World Examples

### Airbnb's Card Design

**Card Regions**

Airbnb's listing cards use strong common region:
- Card background creates a clear container
- Image, title, price, and rating are grouped
- Cards are clearly separated from each other
- The region defines what belongs to each listing

### Stripe's Dashboard

**Panel Regions**

Stripe uses clearly defined panels:
- Each metric in its own card region
- Actions grouped in button containers
- Clear visual separation between sections
- Nested regions for detailed information

### Notion's Block System

**Block Regions**

Notion uses the common region principle extensively:
- Each block (paragraph, heading, list) is a region
- Drag handles and menus appear within the block region
- Blocks can be nested, creating sub-regions
- Dragging a block shows its region boundary

### Material Design

**Card Components**

Material Design's card specification:
- Elevation creates visual region
- Rounded corners define boundaries
- Actions within the card are clearly grouped
- Cards can contain other components

---

## Common Region vs. Other Gestalt Principles

### Common Region + Proximity

```
✓ Both reinforce grouping when aligned
✓ Region works even when proximity can't

Use case:
- Related items far apart in a list can still be grouped with a header
- Section titles + content are grouped by proximity AND region
```

### Common Region + Similarity

```
✓ Similarity within regions creates coherent groups

Use case:
- All cards have similar styling (similarity)
- Each card is a separate region (common region)
```

### Common Region + Closure

```
✓ Regions can be implied through closure
✓ Closed regions enhance closure perception

Use case:
- Cards have implied boundaries (closure)
- Adding solid backgrounds makes regions explicit
```

---

## Best Practices for Common Region

### 1. Consistent Card Styling

```
✓ All cards have same border-radius
✓ All cards have same shadow or border
✓ All cards have same internal padding
✓ Cards are spaced consistently from each other
```

### 2. Clear Visual Boundaries

```
✓ Backgrounds use sufficient contrast
✓ Borders are visible but not distracting
✓ Elevation (shadows) creates clear regions
✓ Spacing between regions is clear
```

### 3. Region Headers and Labels

```
✓ Section headers clearly belong to their region
✓ Headers use consistent styling within regions
✓ Visual hierarchy shows header → content relationship
```

### 4. Nested Regions for Complex Content

```
✓ Top-level regions for major divisions
✓ Secondary regions within major regions
✓ Tertiary regions for detailed content
✓ Consistent styling within each level
```

---

## Common Mistakes

### 1. Inconsistent Region Styling

```
✗ One card has shadow, another doesn't
✗ Different border colors for same-level elements
✗ Inconsistent padding within cards

✓ Consistent styling within region types
```

### 2. Region Ambiguity

```
✗ Elements that could be in Region A or Region B
✗ Unclear which region a title belongs to
✗ Overlapping or unclear boundaries

✓ Clear, unambiguous region definitions
```

### 3. Too Many Nested Regions

```
✗ 5 levels of nesting
✗ Subtle differences between nesting levels
✗ Users lose track of hierarchy

✓ Maximum 3 levels of nesting
✓ Clear visual distinction between levels
```

### 4. Missing Region Boundaries

```
✗ Related elements with no visual container
✗ Sections that blend into each other
✗ Content that flows without clear separation

✓ Clear visual regions for distinct content areas
```

---

## Common Region in Responsive Design

### Adapting Regions for Mobile

```
Desktop: Wide cards in a row
Tablet: Cards stack or wrap
Mobile: Full-width cards stacked vertically
```

**Principles remain constant**:
- Each card is still a region
- Boundaries are maintained
- Hierarchy is preserved
- Spacing adapts but relationships remain clear

### Collapsible Regions

```
✓ Regions can expand/collapse
✓ Clear toggle indicator
✓ Consistent styling when expanded/collapsed
✓ Region boundary maintained in both states
```

---

## Measuring Common Region Effectiveness

### Visual Hierarchy Testing

- Do users understand which elements belong together?
- Can users identify distinct regions?
- Is the hierarchy of regions clear?

### Scan Pattern Analysis

- Do users naturally scan within regions?
- Are regions scannable as units?
- Do users understand region importance?

### User Feedback

- "What did you think was related here?"
- "Did you find everything you were looking for?"
- "Was the layout confusing anywhere?"

---

## Checklist for Applying the Law of Common Region

### For Layout Design:

- [ ] Are major content areas in clear regions?
- [ ] Are related elements grouped within regions?
- [ ] Are regions visually distinct from each other?
- [ ] Is the hierarchy of regions clear?
- [ ] Is nesting used appropriately (not excessively)?

### For Component Design:

- [ ] Do cards/panels have consistent styling?
- [ ] Are internal elements clearly grouped?
- [ ] Do regions have consistent padding?
- [ ] Are section headers clearly part of their regions?

### For Spacing:

- [ ] Is space between regions sufficient?
- [ ] Is space within regions consistent?
- [ ] Does spacing support the visual hierarchy?

---

## Conclusion

The Law of Common Region is one of the most powerful tools for creating visual structure. It allows designers to:
- Group elements that can't be placed close together
- Create clear content hierarchies
- Define relationships without explicit labels
- Build consistent, scannable interfaces

**The key insight is that boundaries matter.** A visual container—whether a card, a panel, or a bordered section—communicates relationship more powerfully than proximity alone.

When applied well, common region creates interfaces where:
- Content is clearly organized
- Relationships are self-evident
- Hierarchies are intuitive
- Scanning is effortless

---

*Next: [Law of Prägnanz →](law-of-pragnanz.md) - People perceive ambiguous or complex images as the simplest form possible.*
