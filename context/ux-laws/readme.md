---
purpose: >
  Master reference catalog of 60 universal design laws optimized for LLM context injection.
  Use this file as an index to locate specific laws, understand which laws apply to a given
  design task, and identify tensions between competing principles.
total_laws: 60
version: 2.0
last_updated: 2026-07-24
usage_strategy: >
  Do NOT load all 60 files at once. Use the Decision Matrix below to identify the 3-8 most
  relevant laws for your current task, then load only those files. For conflict resolution
  between competing laws, consult contradictions-paradoxes.md.
---

# Master Catalog of 60 Universal Design Laws

## How to Use This Collection

This collection is designed for **selective context loading**. Each law file is self-contained with:
- **Overview** — what the law states and why it matters
- **Origin Story / Psychology** — the research and cognitive science behind the law
- **Practical Applications** — code examples, visual diagrams, implementation patterns
- **Real-World Case Studies** — how major products apply the law
- **Common Mistakes** — anti-patterns to avoid
- **Checklist** — verification items before shipping
- **Related Laws** — cross-references to complementary or competing laws

### Loading Strategy

| Task Type | Recommended Laws to Load |
|-----------|--------------------------|
| **Button/CTA design** | Fitts's Law, Law of Focal Point, Von Restorff Effect, Touch Target Laws, Border Radius & Form Laws |
| **Navigation architecture** | Hick's Law, LATCH Principle, Jakob's Law, Miller's Law, Reading & Scanning Patterns |
| **Color palette creation** | 60-30-10 Rule, Color Harmony & Psychology, WCAG Color Contrast, Dark Mode Design Laws |
| **Typography system** | Modular Type Scale, Vertical Rhythm & Baseline, Golden Ratio, 8pt Grid System |
| **Form/input design** | Poka-Yoke, Tesler's Law, Cognitive Load Theory, Doherty Threshold, Law of Least Effort |
| **Pricing page layout** | Anchoring Effect, Decoy Effect, Framing Effect & Loss Aversion, Von Restorff Effect |
| **Onboarding flow** | Goal-Gradient Effect, Zeigarnik Effect, Flow Theory & Hook Model, Peak-End Rule |
| **Error handling** | Poka-Yoke, Nielsen's Heuristics, Postel's Law, Shneiderman's 8 Golden Rules |
| **Layout & composition** | C.R.A.P. Principles, Rule of Thirds, Golden Ratio, Law of Proximity, Gestalt laws |
| **Dark mode implementation** | Dark Mode Design Laws, WCAG Color Contrast, Elevation & Shadow System |
| **Animation & motion** | UI Animation & Motion Laws, Doherty Threshold, Weber's Law |
| **Retention & engagement** | Flow Theory & Hook Model, Endowment Effect, Zeigarnik Effect, Peak-End Rule |
| **Accessibility audit** | Touch Target & A11y Laws, WCAG Color Contrast, Nielsen's 10 Heuristics |
| **Design system creation** | 8pt Grid System, Brand Identity System Laws, Dieter Rams' 10 Principles, C.R.A.P. Principles |
| **Resolving law conflicts** | [contradictions-paradoxes.md](contradictions-paradoxes.md) |

---

## Tensions & Contradictions

Design laws frequently contradict each other. Before applying any law, check whether a competing law creates tension in your specific context. See the dedicated cross-reference:

→ **[Contradictions & Paradoxes Guide](contradictions-paradoxes.md)** — 12 tension pairs with resolution guidance.

Key conflicts include:
- **Hick's Law vs. Miller's Law** — fewer choices vs. chunking enables more
- **Tesler's Law vs. Occam's Razor** — complexity must live somewhere vs. simplest solution wins
- **Jakob's Law vs. Dieter Rams Principle #1** — familiarity vs. innovation
- **Fitts's Law vs. Poka-Yoke** — large fast targets vs. error prevention for destructive actions

---

### 1. Gestalt Principles & Perception (10 Laws)
1. [law-of-proximity.md](law-of-proximity.md) — Spatially close elements are perceived as grouped. *Apply when: structuring card layouts, form field grouping, dashboard sections.*
2. [law-of-similarity.md](law-of-similarity.md) — Visually similar elements share functional meaning. *Apply when: designing consistent button hierarchies, icon families, tag systems.*
3. [law-of-closure.md](law-of-closure.md) — Brain fills gaps to perceive complete shapes. *Apply when: designing progress indicators, loading states, incomplete data visualizations.*
4. [law-of-common-region.md](law-of-common-region.md) — Shared boundaries group enclosed elements. *Apply when: designing cards, panels, fieldsets, modal containers.*
5. [law-of-continuity.md](law-of-continuity.md) — Eye follows continuous lines and paths. *Apply when: designing step wizards, timelines, horizontal scroll flows.*
6. [law-of-pragnanz.md](law-of-pragnanz.md) — Mind simplifies complex visuals into simple shapes. *Apply when: simplifying icons, logos, data visualizations, chart design.*
7. [law-of-uniform-connectedness.md](law-of-uniform-connectedness.md) — Connected elements form strongest visual groups. *Apply when: designing flowcharts, node graphs, relationship diagrams.*
8. [law-of-common-fate.md](law-of-common-fate.md) — Elements moving in the same direction feel linked. *Apply when: animating list reordering, carousel transitions, parallax scrolling.*
9. [law-of-figure-ground.md](law-of-figure-ground.md) — Mind separates focal foreground from background. *Apply when: designing modal overlays, dropdown menus, focus states.*
10. [law-of-focal-point.md](law-of-focal-point.md) — Visually contrasting elements capture primary focus. *Apply when: designing primary CTAs, alert badges, promotional banners.*

---

### 2. Color Theory & Dark Mode Engineering (4 Laws)
11. [60-30-10-rule.md](60-30-10-rule.md) — 60% Dominant, 30% Secondary, 10% Accent CTA distribution. *Apply when: building color palettes, theming dashboards, balancing visual weight.*
12. [wcag-color-contrast.md](wcag-color-contrast.md) — Luminance contrast standards (4.5:1 text, 3:1 UI components). *Apply when: choosing text/background pairs, validating accessibility compliance.*
13. [color-harmony-and-psychology.md](color-harmony-and-psychology.md) — Color wheel geometry & emotional hue associations. *Apply when: selecting brand colors, building semantic color systems.*
14. [dark-mode-design-laws.md](dark-mode-design-laws.md) — `#121212` base gray, halation prevention, and surface elevation lightness. *Apply when: implementing dark theme, adapting existing light-mode palettes.*

---

### 3. Visual Composition & Layout Principles (4 Laws)
15. [crap-principles.md](crap-principles.md) — Contrast, Repetition, Alignment, Proximity (Robin Williams). *Apply when: auditing any visual layout for fundamental design hygiene.*
16. [rule-of-thirds.md](rule-of-thirds.md) — 3×3 Grid power-point intersections for dynamic composition. *Apply when: designing hero sections, banner images, landing page layouts.*
17. [golden-ratio.md](golden-ratio.md) — Phi ($\phi = 1.618$) proportion in typography, grids, and logo curves. *Apply when: calculating sidebar/content splits, typography scales, logo geometry.*
18. [reading-and-scanning-patterns.md](reading-and-scanning-patterns.md) — F-Pattern, Z-Pattern, and Gutenberg Diagram reading gravity. *Apply when: placing CTAs, structuring content-heavy vs. promotional pages.*

---

### 4. Typography & Vertical Rhythm (2 Laws)
19. [modular-type-scale.md](modular-type-scale.md) — Mathematical font size progression & responsive CSS clamp formulas. *Apply when: building typography systems, choosing heading sizes.*
20. [vertical-rhythm-and-baseline.md](vertical-rhythm-and-baseline.md) — Baseline grid line-height math & 45–75 character line limits. *Apply when: setting line-heights, paragraph spacing, text column widths.*

---

### 5. UI Component & Spatial Systems (4 Laws)
21. [8pt-grid-system.md](8pt-grid-system.md) — 8px/4px spatial token scale & display scaling math. *Apply when: building spacing systems, defining padding/margin tokens.*
22. [elevation-and-shadow-system.md](elevation-and-shadow-system.md) — Z-axis depth layers & key/ambient dual-shadow CSS. *Apply when: designing cards, modals, dropdowns, layered UI.*
23. [border-radius-and-form-laws.md](border-radius-and-form-laws.md) — Concentric radius formula ($\text{Inner} = \text{Outer} - \text{Padding}$) & 5 button states. *Apply when: nesting rounded containers, defining interactive component states.*
24. [touch-target-and-a11y-laws.md](touch-target-and-a11y-laws.md) — 44px (iOS) / 48px (Android) target sizes & thumb zone ergonomics. *Apply when: sizing mobile buttons, icon hit areas, form controls.*

---

### 6. Motion Design & Visual Effects (2 Laws)
25. [ui-animation-and-motion-laws.md](ui-animation-and-motion-laws.md) — 200–400ms duration rule, easing curves, and `prefers-reduced-motion`. *Apply when: adding transitions, loading animations, micro-interactions.*
26. [visual-effects-and-style-laws.md](visual-effects-and-style-laws.md) — Glassmorphic `backdrop-filter` contrast, Neumorphism, and style affordance. *Apply when: implementing frosted glass cards, soft shadow styles, decorative effects.*

---

### 7. Interaction Design Heuristics & Standards (3 Laws)
27. [nielsens-10-usability-heuristics.md](nielsens-10-usability-heuristics.md) — Jakob Nielsen's 10 master inspection heuristics. *Apply when: conducting heuristic evaluations, auditing existing interfaces.*
28. [shneidermans-8-golden-rules.md](shneidermans-8-golden-rules.md) — Ben Shneiderman's 8 Golden Rules & Tognazzini principles. *Apply when: designing dialog flows, undo systems, user control patterns.*
29. [latch-principle.md](latch-principle.md) — Location, Alphabet, Time, Category, Hierarchy organization. *Apply when: structuring information architecture, sort/filter UI, data tables.*

---

### 8. Industrial Design & Product Heuristics (1 Law)
30. [dieter-rams-10-principles.md](dieter-rams-10-principles.md) — Dieter Rams' 10 Principles of Good Design ("Less, but better"). *Apply when: auditing product bloat, evaluating feature necessity, design system philosophy.*

---

### 9. Engagement Psychology & Gamification (2 Laws)
31. [flow-theory-and-hook-model.md](flow-theory-and-hook-model.md) — Csikszentmihalyi's Flow Channel & Nir Eyal's 4-step habit loop. *Apply when: designing onboarding, gamification, difficulty progression, retention loops.*
32. [labor-illusion-and-operational-transparency.md](labor-illusion-and-operational-transparency.md) — Operational transparency & perceived value of system effort. *Apply when: designing search results pages, AI generation UIs, loading states.*

---

### 10. Behavioral Economics & Choice Architecture (4 Laws)
33. [framing-effect-and-loss-aversion.md](framing-effect-and-loss-aversion.md) — Kahneman & Tversky's Prospect Theory & gain/loss framing. *Apply when: writing pricing copy, cancellation flows, upgrade prompts.*
34. [anchoring-effect.md](anchoring-effect.md) — Initial number acts as mental benchmark for all subsequent judgments. *Apply when: displaying pricing tiers, showing original vs. sale prices, comparison tables.*
35. [decoy-effect.md](decoy-effect.md) — Inferior third option steers choices toward the target plan. *Apply when: designing pricing tables with 3+ tiers, subscription plan layouts.*
36. [endowment-effect.md](endowment-effect.md) — Users value items higher once they feel ownership. *Apply when: designing free trials, customization features, profile completion.*

---

### 11. Cognitive Load & Decision Science (4 Laws)
37. [hicks-law.md](hicks-law.md) — Decision time increases logarithmically with options. *Apply when: simplifying navigation menus, reducing form fields, limiting choices.*
38. [millers-law.md](millers-law.md) — Working memory capacity is 7 ± 2 chunks. *Apply when: chunking phone numbers, grouping navigation items, pagination.*
39. [teslers-law.md](teslers-law.md) — Complexity cannot be removed, only shifted. *Apply when: deciding what to automate vs. expose, designing wizard flows.*
40. [cognitive-load-theory.md](cognitive-load-theory.md) — Sweller's intrinsic, extraneous, and germane load limits. *Apply when: simplifying onboarding, reducing visual noise, progressive disclosure.*

---

### 12. Behavioral Psychology & Cognitive Biases (6 Laws)
41. [goal-gradient-effect.md](goal-gradient-effect.md) — Motivation increases as users get closer to the goal. *Apply when: designing progress bars, loyalty programs, multi-step checkout.*
42. [peak-end-rule.md](peak-end-rule.md) — Experience is judged by its peak and its end. *Apply when: designing checkout confirmation, app closing moments, success celebrations.*
43. [zeigarnik-effect.md](zeigarnik-effect.md) — Incomplete tasks are remembered better than complete ones. *Apply when: designing profile completion prompts, save-for-later, notification badges.*
44. [serial-position-effect.md](serial-position-effect.md) — First and last items in a list are recalled best. *Apply when: ordering navigation tabs, structuring feature lists, content sequencing.*
45. [law-of-least-effort.md](law-of-least-effort.md) — Users naturally select the path of least resistance. *Apply when: reducing form friction, enabling social login, auto-fill, smart defaults.*
46. [paradox-of-the-active-user.md](paradox-of-the-active-user.md) — Users skip manuals and dive straight into doing. *Apply when: designing contextual help, tooltips vs. documentation, inline onboarding.*

---

### 13. Design Heuristics & Error Prevention (4 Laws)
47. [jakobs-law.md](jakobs-law.md) — Users prefer your site to work like all other sites they know. *Apply when: positioning navigation, naming buttons, structuring checkout flows.*
48. [postels-law.md](postels-law.md) — Be conservative in what you do, liberal in what you accept. *Apply when: designing form validation, API input handling, search queries.*
49. [occams-razor.md](occams-razor.md) — Simple solutions with fewest assumptions are best. *Apply when: evaluating feature scope, choosing between complex vs. simple implementations.*
50. [poka-yoke.md](poka-yoke.md) — Mistake-proofing interfaces to make errors impossible or detectable. *Apply when: designing destructive action confirmations, input constraints, guardrails.*

---

### 14. Performance, Perception & Attention (6 Laws)
51. [doherty-threshold.md](doherty-threshold.md) — System response < 400ms keeps user flow unbroken. *Apply when: optimizing page load, API response times, transition durations.*
52. [aesthetic-usability-effect.md](aesthetic-usability-effect.md) — Beautiful designs are perceived as more usable. *Apply when: investing in visual polish, arguing for design quality in product reviews.*
53. [webers-law.md](webers-law.md) — Just Noticeable Difference threshold for subtle redesigns. *Apply when: making incremental UI changes, A/B testing visual variations.*
54. [von-restorff-effect.md](von-restorff-effect.md) — Distinct items stand out and are remembered best. *Apply when: highlighting featured plans, badges, new feature indicators.*
55. [banner-blindness.md](banner-blindness.md) — Users filter out items that resemble ads. *Apply when: positioning promotional content, designing in-app announcements.*
56. [fitts-law.md](fitts-law.md) — Target acquisition time depends on size and distance. *Apply when: sizing buttons, placing CTAs, designing touch targets.*

---

### 15. Universal Productivity & Optimization Laws (2 Laws)
57. [pareto-principle.md](pareto-principle.md) — 80% of consequences stem from 20% of causes. *Apply when: prioritizing features, identifying high-impact UX fixes, resource allocation.*
58. [parkinsons-law.md](parkinsons-law.md) — Work expands to fill the time available. *Apply when: setting deadlines for design sprints, time-boxing user tasks, form completion timeouts.*

---

### 16. Brand Systems & Vector Graphics (2 Laws)
59. [brand-identity-system-laws.md](brand-identity-system-laws.md) — Single-source design tokens & logo clear-zone rules. *Apply when: building design token systems, brand guideline documentation.*
60. [svg-and-graphic-composition-laws.md](svg-and-graphic-composition-laws.md) — 24×24px keyline grids, 0.5px stroke fitting, and optical centering. *Apply when: designing icon sets, SVG optimization, logo construction.*

---

*Cross-reference: [Contradictions & Paradoxes →](contradictions-paradoxes.md) — When laws conflict, consult this guide for resolution strategies.*