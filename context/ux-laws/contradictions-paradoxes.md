# Contradictions & Paradoxes Between Design Laws

> *"The hallmark of mature design thinking is not knowing which law to apply—it is knowing which law to sacrifice when two laws collide."*
> — **Design Systems Architecture Principle**

---

## Overview

Design laws are not commandments—they are **heuristic lenses** derived from different research traditions (cognitive psychology, behavioral economics, motor physiology, visual perception). Because they originate from different domains, they frequently produce **contradictory recommendations** when applied simultaneously to the same design problem.

This document catalogs **12 critical tension pairs** where two or more established design laws pull in opposite directions. For each pair, it explains:
1. **The Conflict** — what each law recommends and why they clash
2. **When Each Law Wins** — the contextual factors that determine which law takes priority
3. **Resolution Strategy** — how to balance both laws in practice

An LLM loading design laws as context should **always cross-check this document** before generating implementation recommendations, to avoid naively applying one law in violation of another.

---

## Tension Pair 1: Hick's Law vs. Miller's Law

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Hick's Law** | Reduce the number of choices. Decision time increases logarithmically with each option added. Fewer options = faster decisions. | [hicks-law.md](hicks-law.md) |
| **Miller's Law** | Users can hold 7 ± 2 chunks in working memory. You can present up to ~7 grouped items without overwhelming cognition. | [millers-law.md](millers-law.md) |

**Hick's says**: "Show 3 options instead of 7—users decide faster."
**Miller's says**: "7 chunked options are fine—working memory can handle it."

### When Each Law Wins

- **Hick's Law wins** when the goal is **speed of decision** (e.g., a mobile checkout flow, emergency UI, time-critical actions). Fewer options = less hesitation.
- **Miller's Law wins** when the goal is **comprehensiveness without overwhelm** (e.g., a navigation menu, a filter panel, a settings page). Chunking 7 items into labeled groups maintains scannability.

### Resolution Strategy

Use **progressive disclosure**: show 3-4 primary options upfront (satisfying Hick's Law), with a "More options" expansion to reveal the full set of 7 chunked items (satisfying Miller's Law). Both laws are satisfied because *initial* cognitive load is low, but *available* options remain comprehensive.

---

## Tension Pair 2: Tesler's Law vs. Occam's Razor

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Tesler's Law** | Complexity is conserved. You cannot eliminate complexity—only shift it between the user and the system. Someone must bear the burden. | [teslers-law.md](teslers-law.md) |
| **Occam's Razor** | The simplest solution with the fewest assumptions is best. Strip away everything non-essential. | [occams-razor.md](occams-razor.md) |

**Tesler's says**: "This complexity *has* to exist somewhere—if you hide it from the user, the system must handle it."
**Occam's says**: "If you can remove this complexity entirely, do it."

### When Each Law Wins

- **Occam's Razor wins** when complexity is truly **unnecessary**—a feature, option, or workflow that exists due to legacy, edge cases, or over-engineering. Cut it.
- **Tesler's Law wins** when complexity is **inherent to the domain** (e.g., tax filing, medical records, airline booking). You cannot simplify the underlying problem—only decide whether the user or the system absorbs the complexity.

### Resolution Strategy

First apply Occam's Razor: eliminate genuinely unnecessary complexity. Then apply Tesler's Law to the irreducible remainder: decide whether the **user** should see it (power-user control) or the **system** should absorb it (smart defaults, auto-detection). Never pretend inherent complexity doesn't exist.

---

## Tension Pair 3: Jakob's Law vs. Dieter Rams' Principle #1 (Innovation)

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Jakob's Law** | Users prefer your interface to work like the interfaces they already know. Leverage existing mental models. | [jakobs-law.md](jakobs-law.md) |
| **Dieter Rams #1** | Good design is innovative. New technology enables new solutions to old problems. | [dieter-rams-10-principles.md](dieter-rams-10-principles.md) |

**Jakob's says**: "Put the shopping cart icon in the top-right corner because that's where every other e-commerce site puts it."
**Rams says**: "If you can invent a better interaction pattern, do it."

### When Each Law Wins

- **Jakob's Law wins** for **utilitarian, high-frequency tasks** where users need speed and predictability (e.g., checkout, login, navigation, form submission). Breaking convention here causes friction.
- **Rams' Innovation wins** for **novel product categories** without established conventions, or when existing patterns are demonstrably broken and a better alternative can be validated through testing.

### Resolution Strategy

Innovate on the **value proposition**, not the **interaction mechanics**. Keep navigation, forms, and destructive action patterns conventional (Jakob's Law). Innovate on the core product experience, content presentation, or new interaction modalities where no strong convention exists yet.

---

## Tension Pair 4: Fitts's Law vs. Poka-Yoke (Error Prevention)

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Fitts's Law** | Make targets large and close. Larger buttons are faster to acquire and easier to click. | [fitts-law.md](fitts-law.md) |
| **Poka-Yoke** | Make errors impossible or immediately detectable. Destructive actions should require deliberate effort. | [poka-yoke.md](poka-yoke.md) |

**Fitts's says**: "Make the 'Delete Account' button large so users can reach it quickly."
**Poka-Yoke says**: "Make the 'Delete Account' button *harder* to trigger to prevent accidental destruction."

### When Each Law Wins

- **Fitts's Law wins** for **constructive, high-frequency actions** (Save, Submit, Next, Add to Cart). These should be large, prominent, and easy to hit.
- **Poka-Yoke wins** for **destructive, irreversible actions** (Delete, Remove, Unsubscribe, Format Drive). These should require deliberate targeting and confirmation.

### Resolution Strategy

Apply an **inverse Fitts's approach for destructive actions**: make the "Delete" button smaller, position it farther from constructive actions, use a different color (red/muted), and add a confirmation step (modal dialog, type-to-confirm, delay before execution). This deliberately violates Fitts's Law to create beneficial friction.

---

## Tension Pair 5: Aesthetic-Usability Effect vs. Cognitive Load Theory

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Aesthetic-Usability Effect** | Beautiful designs are perceived as more usable. Users forgive usability issues in attractive interfaces. | [aesthetic-usability-effect.md](aesthetic-usability-effect.md) |
| **Cognitive Load Theory** | Every visual element consumes cognitive bandwidth. Extraneous decorative elements increase mental processing cost. | [cognitive-load-theory.md](cognitive-load-theory.md) |

**Aesthetic-Usability says**: "Add visual polish—gradients, animations, illustrations—users will perceive the product as better."
**Cognitive Load says**: "Every decorative element competes with functional content for limited cognitive bandwidth."

### When Each Law Wins

- **Aesthetic-Usability wins** on **first impressions, marketing pages, and onboarding** where perceived quality drives trust, conversion, and willingness to explore.
- **Cognitive Load wins** on **task-dense screens** (dashboards, data entry forms, admin panels) where every pixel of visual noise costs productivity.

### Resolution Strategy

Invest heavily in aesthetics for **entry points** (landing pages, login screens, empty states) and progressively simplify for **work surfaces** (dashboards, editors, forms). Use the "magazine cover vs. spreadsheet" mental model: covers are beautiful, spreadsheet interiors are functional.

---

## Tension Pair 6: Loss Aversion vs. Honest Design (Rams' Principle #6)

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Loss Aversion / Framing Effect** | People work harder to avoid losses than to achieve gains. Frame choices in terms of what users will lose to drive conversion. | [framing-effect-and-loss-aversion.md](framing-effect-and-loss-aversion.md) |
| **Dieter Rams #6** | Good design is honest. It does not make a product more innovative, powerful, or valuable than it really is. No deception. | [dieter-rams-10-principles.md](dieter-rams-10-principles.md) |

**Loss Aversion says**: "Tell users 'You'll lose your 30-day streak if you cancel' to prevent churn."
**Honest Design says**: "Don't manipulate users with fear-based messaging."

### When Each Law Wins

- **Loss Aversion (ethical)** wins when the information is **factually true and the user genuinely benefits from knowing** (e.g., "You have 1,200 unused loyalty points that expire if you cancel" — this is a real consequence the user should understand).
- **Honest Design wins** when loss framing crosses into **manufactured scarcity, fake urgency, or guilt-tripping** (e.g., "Are you SURE? 😢 Your team will miss you!" or countdown timers on inventory that isn't actually limited).

### Resolution Strategy

Apply the **transparency test**: "Would I be comfortable if a journalist published this exact UI copy in an article about dark patterns?" If yes, the loss frame is ethical and informative. If no, it's manipulative. Always pair loss frames with a clear, guilt-free exit path.

---

## Tension Pair 7: Law of Similarity vs. Von Restorff Effect

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Law of Similarity** | Similar-looking elements are perceived as functionally grouped. Maintain visual consistency across related items. | [law-of-similarity.md](law-of-similarity.md) |
| **Von Restorff Effect** | Items that are visually distinct from their surroundings are remembered best. Make key elements stand out. | [von-restorff-effect.md](von-restorff-effect.md) |

**Similarity says**: "All buttons should look consistent."
**Von Restorff says**: "The most important button should look dramatically different."

### When Each Law Wins

- **Similarity wins** for **groups of equivalent options** (navigation tabs, filter buttons, list items) where consistency communicates equal status.
- **Von Restorff wins** for **single high-priority elements** (primary CTA, featured pricing plan, new feature badge) that must capture immediate attention.

### Resolution Strategy

Design a **3-tier visual hierarchy**: Primary (Von Restorff—one bold standout), Secondary (Similarity—consistent mid-weight elements), Tertiary (Similarity—consistent low-weight text links). This satisfies both laws simultaneously.

---

## Tension Pair 8: Doherty Threshold vs. Labor Illusion

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Doherty Threshold** | System responses under 400ms keep users in flow. Speed is everything. Eliminate all wait time. | [doherty-threshold.md](doherty-threshold.md) |
| **Labor Illusion** | Users perceive instant results as cheap or low-effort. Showing the system "working" increases perceived value. | [labor-illusion-and-operational-transparency.md](labor-illusion-and-operational-transparency.md) |

**Doherty says**: "Return search results in 50ms—faster is always better."
**Labor Illusion says**: "If results appear in 50ms, users won't believe the system really searched thoroughly."

### When Each Law Wins

- **Doherty Threshold wins** for **repeated, high-frequency micro-interactions** (button clicks, tab switches, typing responses, autocomplete). Users want these to feel instant.
- **Labor Illusion wins** for **infrequent, high-stakes queries** (flight searches, mortgage calculations, AI-generated content, medical diagnostics) where perceived thoroughness matters more than raw speed.

### Resolution Strategy

Never artificially slow down frequent interactions. For high-stakes queries, use **operational transparency** (animated step-by-step status text) during natural processing time, but never add artificial delays beyond actual computation time. If the backend responds in 200ms, show a brief animation; don't stretch it to 3 seconds.

---

## Tension Pair 9: Pareto Principle vs. Law of Least Effort

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Pareto Principle** | 80% of users use only 20% of features. Focus design investment on the critical 20%. | [pareto-principle.md](pareto-principle.md) |
| **Law of Least Effort** | Users always choose the easiest path available. Remove friction from every interaction. | [law-of-least-effort.md](law-of-least-effort.md) |

**Pareto says**: "Deprioritize the 80% of rarely-used features—they're not worth polishing."
**Least Effort says**: "But power users who *do* use those features will abandon the product if those features are friction-heavy."

### When Each Law Wins

- **Pareto wins** for **UI surface area allocation**—the 20% of core features deserve prominent placement, large targets, and polished flows.
- **Least Effort wins** for **all features once a user needs them**—even edge-case features should be frictionless when accessed.

### Resolution Strategy

Use **progressive disclosure**: surface the Pareto 20% prominently (satisfying Pareto's visual investment guidance), but ensure the remaining 80% are accessible through logical paths with low friction once discovered (satisfying Least Effort). Don't make rare features *invisible*—make them *discoverable on demand*.

---

## Tension Pair 10: Serial Position Effect vs. Reading Patterns (F-Pattern)

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Serial Position Effect** | Users recall the first (primacy) and last (recency) items in a list best. Place critical items at start and end. | [serial-position-effect.md](serial-position-effect.md) |
| **F-Pattern / Gutenberg Diagram** | On text-heavy pages, users scan the top-left heavily and progressively ignore bottom-right content. Place the most important content top-left. | [reading-and-scanning-patterns.md](reading-and-scanning-patterns.md) |

**Serial Position says**: "Put your most important nav item LAST (recency) and FIRST (primacy)."
**F-Pattern says**: "Users barely look at the bottom of the page—everything important goes top-left."

### When Each Law Wins

- **Serial Position wins** for **horizontal navigation bars and tab strips** (users naturally focus on first and last items in a row).
- **F-Pattern wins** for **vertical content layouts and long-form pages** (user attention drops off dramatically toward the bottom).

### Resolution Strategy

For **horizontal lists** (nav bars, tab bars): leverage Serial Position by placing the most important items first and last. For **vertical content pages**: front-load critical content at the top (F-Pattern) and, if the page requires scrolling, place a strong CTA or summary at the very bottom (recency via Serial Position).

---

## Tension Pair 11: Zeigarnik Effect vs. Peak-End Rule

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Zeigarnik Effect** | Incomplete tasks are remembered better than complete ones. Use open loops to pull users back. | [zeigarnik-effect.md](zeigarnik-effect.md) |
| **Peak-End Rule** | Experiences are judged by their peak moment and their ending. End on a high note. | [peak-end-rule.md](peak-end-rule.md) |

**Zeigarnik says**: "Leave tasks incomplete to create cognitive tension that brings users back."
**Peak-End says**: "End every experience on a satisfying, positive climax."

### When Each Law Wins

- **Zeigarnik wins** for **retention and re-engagement loops** (profile completion bars, course progress, unlockable content) where the goal is bringing users back tomorrow.
- **Peak-End wins** for **session-terminal moments** (checkout confirmation, subscription activation, app closing) where the goal is positive overall memory of the experience.

### Resolution Strategy

Use Zeigarnik **mid-session** (show progress toward next milestone, leave breadcrumbs for tomorrow) and Peak-End **at session boundaries** (celebration screens after checkout, personalized "See you tomorrow" messages). The session *ending* should feel complete and positive, even while the broader *journey* remains open.

---

## Tension Pair 12: Paradox of the Active User vs. Cognitive Load Theory

### The Conflict

| Law | Recommendation | Source |
|-----|---------------|--------|
| **Paradox of the Active User** | Users skip manuals and tutorials—they dive straight into doing. Don't rely on upfront instruction. | [paradox-of-the-active-user.md](paradox-of-the-active-user.md) |
| **Cognitive Load Theory** | Users need sufficient context to form correct mental models. Without instruction, they form incorrect models and make errors. | [cognitive-load-theory.md](cognitive-load-theory.md) |

**Active User says**: "Users won't read your tutorial. Stop building multi-step onboarding wizards."
**Cognitive Load says**: "Without proper instruction, users will misunderstand the interface and make costly errors."

### When Each Law Wins

- **Paradox of the Active User wins** when the interface is **simple enough to be self-explanatory** through clear affordances, familiar patterns (Jakob's Law), and inline labels.
- **Cognitive Load Theory wins** when the domain is **genuinely complex** and incorrect usage has real consequences (financial tools, medical software, developer tools).

### Resolution Strategy

Replace upfront tutorials with **contextual, just-in-time education**: tooltips that appear when a user first encounters a feature, inline coaching prompts triggered by hesitation patterns, and empty-state illustrations that teach by showing. This respects the Active User's impatience while satisfying Cognitive Load Theory's need for accurate mental model construction.

---

## Quick Reference: Conflict Resolution Decision Tree

```
When two laws conflict, ask:

1. What is the PRIMARY USER GOAL on this screen?
   → Speed/Efficiency → Favor: Fitts's, Hick's, Doherty, Least Effort
   → Comprehension/Trust → Favor: Cognitive Load, Labor Illusion, Honest Design
   → Conversion/Persuasion → Favor: Loss Aversion, Anchoring, Von Restorff
   → Retention/Habit → Favor: Zeigarnik, Hook Model, Endowment Effect

2. Is the action CONSTRUCTIVE or DESTRUCTIVE?
   → Constructive → Favor: Fitts's (large targets), Aesthetic-Usability
   → Destructive → Favor: Poka-Yoke (error prevention), deliberate friction

3. Is this a FIRST-TIME or REPEAT interaction?
   → First-time → Favor: Jakob's Law, Cognitive Load (familiar patterns, guidance)
   → Repeat/Power user → Favor: Flexibility, Shneiderman's Rules (accelerators)

4. Is the complexity INHERENT or ACCIDENTAL?
   → Inherent → Apply Tesler's Law (shift complexity, don't pretend it's gone)
   → Accidental → Apply Occam's Razor (eliminate it entirely)
```

---

*This document should be loaded alongside any design law file when generating implementation recommendations to prevent naive single-law application.*

*Related: [readme.md →](readme.md) — Master catalog of all 60 design laws.*
