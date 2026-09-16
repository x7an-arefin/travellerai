# TravellerAI — Brand Identity & UI/UX Guidelines
**Version:** 2.0 | **Status:** Living Document | **Owner:** Sultanul Arefin  
**Document Type:** Brand Identity System · UI/UX Design Standards · Design Token Specification  
**Design System:** `context/website/travellerai-design-system.md`  
**Prepared:** September 2026

---

## 0. Document Purpose

This document establishes the complete brand identity, visual design system, and UX behavioral standards for **TravellerAI** — a unified multi-provider travel marketplace. Every designer, developer, and content creator touching this product must treat this document as law.

The visual system is built on our custom **TravellerAI Design System** — a purpose-built hybrid of:
- **Swiss Modern** (mathematical grid authority, typographic precision, asymmetric layout as communication)
- **Monochrome** (editorial restraint, surface-contrast depth, photography as the sole color source)

See [`context/website/travellerai-design-system.md`](./website/travellerai-design-system.md) for the full token specification. This document provides the strategic and UX layer on top of that system.

---

## 1. Brand Strategy & Unique Market Position

### 1.1 The Positioning Problem We're Solving

The travel marketplace space is crowded with two types of players:

| Category | Examples | Problem |
|---|---|---|
| **Giant aggregators** | Booking.com, Expedia, Airbnb | Commoditized, trust-broken, provider-hostile |
| **Regional niche tools** | Local agency software | Feature-poor, non-scalable, zero discovery |

**TravellerAI occupies the void between them.** We are the only platform that simultaneously:
- Gives **independent travel providers** (agencies, guides, operators, hotels, fleet owners) full commerce infrastructure
- Gives **travelers** a curated, trustworthy discovery and booking experience across tours, hotels, and vehicles
- Gives **marketplace operators** complete financial and operational control

### 1.2 Brand Positioning Statement

> *"TravellerAI is the trusted marketplace where independent travel providers thrive and travelers discover experiences worth remembering."*

### 1.3 Brand Pillars

```
┌──────────────────────────────────────────────────────────────────┐
│                     TRAVELLERAI BRAND PILLARS                     │
├──────────────┬──────────────┬─────────────────┬──────────────────┤
│   TRUST      │   CLARITY    │    FREEDOM      │   DISCOVERY      │
│              │              │                 │                  │
│ Verified     │ Complex      │ Providers build │ Tours, hotels,   │
│ providers,   │ travel made  │ on their own    │ vehicles — one   │
│ transparent  │ simple and   │ terms. Hotels   │ trusted surface. │
│ pricing,     │ beautifully  │ set their rates.│ Not algorithmic  │
│ honest data  │ legible      │ Fleets own ops. │ noise.           │
└──────────────┴──────────────┴─────────────────┴──────────────────┘
```

### 1.4 Competitive Differentiation Matrix

| Attribute | TravellerAI | Booking.com | Viator | Generic SaaS |
|---|---|---|---|---|
| Tours + Hotels + Vehicles unified | Full | Hotels only | Tours only | Never |
| Provider control | Full | None | None | Partial |
| Multi-provider marketplace | Yes | No | No | No |
| Custom packages + quotes | Yes | No | No | Basic |
| Commission transparency | Full | Hidden | Hidden | Varies |
| PMS (hotel management) | Yes | No | No | No |
| Fleet management | Yes | No | No | No |
| International-ready | Yes | Yes | Partial | Rarely |

### 1.5 Brand Personality

| Dimension | TravellerAI Voice | NOT This |
|---|---|---|
| **Tone** | Assured, precise, warm | Corporate-cold or startup-hype |
| **Communication** | Direct and informative | Vague or buzzword-heavy |
| **Design** | Precision Editorial — Swiss discipline + Monochrome restraint | Generic blue-gradient travel brand |
| **Expertise** | Knowledgeable, trustworthy | Trying-too-hard |
| **Relationship** | Partnership, not transaction | Authority over users |

### 1.6 Forbidden Brand Language

NOT ALLOWED:
- "Elevate your travel experience"
- "Seamless booking journey"
- "Unleash your wanderlust"
- "Revolutionary platform"
- "Next-Gen travel solution"
- "AI-powered magic"

APPROVED:
- "Book with verified providers"
- "Complete itinerary, clear pricing"
- "Hotels, tours, vehicles — one trusted marketplace"
- "Your commission, your rules"
- "Every booking, fully tracked"

---

## 2. Visual Identity System

### 2.1 The Design Philosophy

TravellerAI's visual identity is the **Precision Travel Editorial** system — synthesized from two complementary visual traditions:

**From Swiss Modern (International Typographic Style):**
- Mathematical grid discipline — every element earns its position
- Asymmetric layout as a communication tool (not decoration)
- Typographic hierarchy as the primary organizational system
- One intentional grid break per section — energy through contrast against discipline
- The poster tradition: typography + image + white space = complete communication

**From Monochrome Editorial:**
- Neutral-scale hierarchy — shade over color
- Surface contrast creates depth, not shadow
- Photography as the page's color — the chrome stays clean
- Editorial whitespace as grouping, not emptiness
- Restraint as the signal of premium quality

**The synthesis:** A system where the grid creates trust, typography creates hierarchy, whitespace creates breath, and destination photography delivers the emotional payload. In a market of noisy blue-gradient travel brands, our restraint is the differentiator.

### 2.2 Design System Era
> 1950s International Typographic Style + 1990s Editorial Minimalism + 2026 Travel Commerce

### 2.3 Visual Reference Points
- **Grid logic:** Müller-Brockmann poster grids applied to responsive web
- **Typography:** Neue Grafik's typographic authority without nostalgia
- **Photography treatment:** W Magazine editorial — photography as the hero, chrome stays back
- **Surface system:** Architect's material palette — precision in neutral value selection

---

## 3. Color System

**→ Full token specification in [`travellerai-design-system.md`](./website/travellerai-design-system.md)**

### 3.1 The Core Philosophy

The neutral scale IS the brand palette. There is no "brand blue" or "brand teal." The accent IS the ink — maximum contrast, maximum trust. This is a deliberate positioning decision: in a market where every travel brand has a tropical accent color, our restraint is the brand.

**60-30-10 Distribution (from 60-30-10 Rule):**
- **60% Canvas + Fog** — Dominant neutral; page backgrounds, large surfaces
- **30% Ink + Graphite** — Secondary structure; text, borders, navigation anchors
- **10% Accent (Ink used inversely)** — CTAs, primary actions, active states

### 3.2 Neutral Scale

| Token | Hex | Role |
|---|---|---|
| `--color-canvas` | `#fafafa` | Primary canvas — all large surfaces |
| `--color-fog` | `#f4f4f5` | Muted sections, card backgrounds, skeletons |
| `--color-stone` | `#e4e4e7` | Borders, dividers, input strokes |
| `--color-mist` | `#71717a` | Secondary text, metadata, timestamps |
| `--color-graphite` | `#3f3f46` | Strong borders, active control indicators |
| `--color-charcoal` | `#27272a` | Raised dark surfaces, hover states |
| `--color-ink` | `#111111` | Primary text, primary actions, anchors |

### 3.3 Semantic Colors (System Feedback ONLY — Never Decorative)

| Token | Value | Travel Marketplace Use |
|---|---|---|
| `--color-success` | `#16a34a` | Confirmed booking, approved KYC, verified provider/hotel, completed tour |
| `--color-warning` | `#d97706` | Pending confirmation, under review, balance due, document expiring |
| `--color-error` | `#dc2626` | Rejected, cancelled, payment failed, document expired, room unavailable |
| `--color-info` | `#2563eb` | Informational, in-progress, waitlisted, new feature |

### 3.4 Dark Mode

Dark mode uses the surface-elevation strategy from Monochrome — lighter charcoal = higher z-level.

| Token | Hex | Level |
|---|---|---|
| `--color-canvas-dark` | `#0a0a0a` | Base background |
| `--color-surface-dark-1` | `#111111` | Cards |
| `--color-surface-dark-2` | `#1c1c1e` | Modals, drawers |
| `--color-surface-dark-3` | `#27272a` | Tooltips, popovers |
| `--color-ink-dark` | `#fafafa` | Primary text |
| `--color-mist-dark` | `#a1a1aa` | Secondary text |
| `--color-stone-dark` | `#3f3f46` | Borders |

### 3.5 Color Rules (Synthesized from both systems)

1. Use `--color-canvas` never `#ffffff` — reduces glare on large surfaces (Monochrome rule)
2. Use `--color-ink` never `#000000` — prevents harsh contrast fatigue (Monochrome rule)
3. Never communicate status with gray intensity alone — always pair with label + icon (Monochrome rule)
4. Maximum four neutral levels within any single component (Monochrome rule)
5. Destination photography provides the page's hue — maintain clean monochrome chrome around it (Monochrome rule)
6. Define dark mode tokens independently — never auto-invert light values (Dark Mode Design Laws)
7. Document every instance where a semantic color is introduced outside of system feedback contexts

### 3.6 WCAG Compliance

| Pair | Contrast | Standard |
|---|---|---|
| Ink (#111111) on Canvas (#fafafa) | 18.9:1 | AAA |
| Ink (#111111) on Fog (#f4f4f5) | 17.4:1 | AAA |
| Graphite (#3f3f46) on Canvas (#fafafa) | 9.1:1 | AAA |
| Mist (#71717a) on Canvas (#fafafa) | 4.7:1 | AA |
| Canvas (#fafafa) on Ink (#111111) | 18.9:1 | AAA |

---

## 4. Typography System

**→ Full specification in [`travellerai-design-system.md`](./website/travellerai-design-system.md)**

### 4.1 Font Stack

| Role | Font | Weights | Rationale |
|---|---|---|---|
| **Display / Hero** | Inter 700–800 | Display, H1, H2 | Geometric precision, neutral authority — Swiss-influenced |
| **Body & UI** | Inter 400–600 | All body and UI text | Designed for screens — never competes with photography |
| **Editorial Accent** | Instrument Serif (italic) | Campaign phrases, pull quotes, destination taglines | Creates serif drama within the monochrome system — the one voice that feels human |
| **Technical / Data** | IBM Plex Mono | Prices, booking IDs, reference codes, data tables | Unambiguous, machine-precision — builds trust for financial data |

**Swiss contribution:** Two-family maximum (proportional) enforced by discipline
**Monochrome contribution:** Type IS hierarchy — no color reinforcement

### 4.2 Scale

Responsive, all via `clamp()`, all on the 8pt grid:

```
Display:    clamp(3rem, 8vw, 7rem)     weight 800   tracking −0.04em
H1:         clamp(2.25rem, 5vw, 4.5rem) weight 700   tracking −0.03em
H2:         clamp(1.75rem, 3vw, 3rem)   weight 700   tracking −0.02em
H3:         clamp(1.25rem, 2vw, 1.75rem) weight 600
H4:         1.125rem                    weight 600
Body LG:    1.125rem / 1.65            weight 400
Body:       1rem / 1.65                weight 400
Small:      0.875rem / 1.5             weight 400–500
Caption:    0.75rem / 1.4              weight 500–600
Mono:       0.875rem / 1.5             weight 400
```

### 4.3 Typography Rules

1. Hierarchy through scale, weight, and whitespace — never through color
2. Uppercase only for labels, indexes, category markers, and navigation identifiers
3. Uppercase letter-spacing: +0.06em to +0.12em
4. Tabular numerals for all prices, booking IDs, statistics, room rates, rental costs
5. Long-form content (destination guides, blog, help articles): 45ch–68ch line length
6. Instrument Serif: editorial emphasis ONLY — never for UI labels, never for body copy
7. IBM Plex Mono: data display ONLY — never for heading or body copy

---

## 5. Layout & Grid System

**→ Full specification in [`travellerai-design-system.md`](./website/travellerai-design-system.md)**

### 5.1 The Hybrid Approach

**Swiss Modern** defines the grid's authority: mathematical 12-column structure, 8pt spacing, and the rule that asymmetry is a deliberate communication choice — not the default.

**Monochrome** defines the spatial philosophy: whitespace as grouping, surfaces as secondary structure, and "not every content group needs a card."

### 5.2 Grid
- Container: 1360px max, `clamp(1rem, 4vw, 4rem)` side padding
- Columns: 4 mobile / 8 tablet / 12 desktop
- Gutters: 16px / 24px / 32px

### 5.3 Layout Rules

1. Symmetric grids for transactional screens (booking forms, payment, checkout)
2. Asymmetric layouts for editorial and discovery screens (homepage, destination pages, blog)
3. One intentional grid break per major section — creates visual energy BECAUSE the rule exists
4. Whitespace as primary grouping method — borders and cards are secondary and used sparingly
5. Alternating split layouts and editorial stacks over repetitive equal-column grids
6. Never `height: 100vh` — always `min-height: 100dvh`
7. Feature sections: one large + smaller supporting elements — never 3-equal-columns

---

## 6. Component Standards

**→ Full specification in [`travellerai-design-system.md`](./website/travellerai-design-system.md)**

### 6.1 Travel Marketplace Specific Components

Beyond standard UI components, TravellerAI requires these domain-specific patterns:

**Availability Calendar:**
- Monochrome treatment: selected dates Ink-fill, range Fog-fill, unavailable strikethrough Stone
- MLOS restrictions (Minimum Length of Stay) displayed as tooltip on restricted dates
- CTA dates visually grouped to communicate price tier

**Room Rate Card:**
- Hierarchical: rate plan name → meal plan badge → original price (strikethrough if discounted) → current price (tabular mono, H3) → per-person or per-night label → CTA
- Cancellation policy: prominently displayed, not hidden in small print
- "Best value" tag: Ink fill, Canvas text — used on the recommended rate plan only

**Vehicle Booking Card:**
- Vehicle image: 16:9 with ACRISS attributes displayed as compact icon row below
- Attributes: transmission icon, fuel icon, seat count, luggage capacity
- Daily rate: tabular mono, prominent H3
- Protection plan selector: collapsible under "Add protection" ghost button
- Inspection status badge: if vehicle passed recent inspection — verified shield icon

**Hotel Search Card:**
- Star rating: 5-dot system (Ink filled, Stone unfilled)
- Amenity icons: max 5 visible (Wi-Fi, Pool, Breakfast, Parking, AC), remainder as count badge
- Price: "from $X / night", tabular mono — per room, not per person
- Property type badge: Boutique / Resort / Eco-Lodge / Hostel etc.

**Driver/Guide Card:**
- Driver photo: 1:1 circular avatar
- Trip count, rating, years of experience as compact metadata row (IBM Plex Mono)
- Language tags: pill-shape filter tags
- "Live tracking" indicator: only shown when driver is en-route

**Booking Status Timeline:**
- Vertical timeline layout with Ink left-border line
- Each step: status dot (semantic color) + timestamp (mono) + action or description
- Used in: booking detail, hotel reservation detail, vehicle rental detail
- Active step: larger dot, Ink, weight 600 label
- Completed steps: Mist dot + Mist text

### 6.2 Booking Status Badge System

All statuses require label + icon + border — never color alone.

**Tour/Package Statuses:**
```
Confirmed         — check icon      + Success green  + solid border
Pending Payment   — clock icon      + Warning amber  + dashed border
Provider Pending  — clock icon      + Warning amber  + dotted border
In Progress       — circle icon     + Info blue      + solid border
Completed         — double-check    + Mist gray      + solid border
Cancelled         — x icon          + Error red      + heavy border
Refund Pending    — arrow-left icon + Warning amber  + dashed border
Disputed          — warning icon    + Error red      + dashed border
```

**Hotel Reservation Statuses:**
```
Confirmed         — check icon      + Success green  + solid border
Checked In        — door-open icon  + Info blue      + solid border
In-House          — home icon       + Info blue      + solid border
Checked Out       — door-closed     + Mist gray      + solid border
No-Show           — user-x icon     + Error red      + heavy border
Cancelled         — x icon          + Error red      + heavy border
```

**Vehicle Booking Statuses:**
```
Confirmed         — check icon      + Success green  + solid border
Vehicle Allocated — car icon        + Info blue      + solid border
Keys Handed Over  — key icon        + Info blue      + solid border
On Trip           — navigation icon + Info blue      + solid border
Returned          — check icon      + Success green  + solid border
Damage Claimed    — alert icon      + Error red      + dashed border
```

**KYC / Provider Verification Statuses:**
```
Verified          — shield-check    + Success green  + solid border
Under Review      — clock icon      + Warning amber  + dashed border
More Info Needed  — help icon       + Warning amber  + dotted border
Rejected          — shield-x icon   + Error red      + heavy border
Expired           — calendar-x      + Error red      + dashed border
```

---

## 7. Motion & Animation

**→ Full specification in [`travellerai-design-system.md`](./website/travellerai-design-system.md)**

The system is minimal-motion-first. Every animation must justify its existence.

### 7.1 Key Moments

**Booking Confirmation (Peak-End Rule — the most important moment):**
- Checkmark draw animation (SVG stroke dashoffset 0→length)
- Card scale: 0.95 → 1.0 / 600ms ease-spring
- Brief confetti or sparkle: optional, only if consistent with brand restraint
- This is the emotional peak — it must feel earned and celebratory

**Search Results Loading (Labor Illusion):**
- Show skeleton cards matching final dimensions
- Text: "Searching [N] packages / hotels / vehicles across [destination]..."
- Progress of discovery makes the wait feel shorter and the result more valuable

**Filter Application:**
- Cards that don't match: fade out (opacity 0) + translateY(−8px) / 200ms
- Cards that match: fade in from slight scale (0.97 → 1) / 280ms staggered

### 7.2 Rules
- Animate ONLY transform and opacity — no layout-triggering properties
- Honor `prefers-reduced-motion` — remove translation, parallax, stagger
- Doherty Threshold: all system responses must complete or signal progress within 400ms

---

## 8. UX Laws Applied — Travel Commerce

### 8.1 Hick's Law — Navigation & Filtering

**Application to tours/hotels/vehicles:**
- Global nav: Tours / Hotels / Vehicles / Destinations + Account (max 5 primary items)
- Hotel filters: collapsed by default into categories — Rate Plan, Room Type, Meal Plan, Amenities
- Vehicle filters: Vehicle Type, Fuel, Transmission, Self-Drive/With Driver, Pickup Location
- Booking flows: one decision group per step — never combine date+travelers+add-ons on one screen

### 8.2 Miller's Law — Information Chunking

**Application:**
- Hotel room types: max 6 per page with pagination (cognitive capacity limit)
- Vehicle protection plans: 4 tiers maximum (Basic + CDW + LDW + FDW) — exactly within Miller range
- Room amenities: 5 visible + "12 more" expandable
- Booking inclusions/exclusions: max 7 bullet points each before "Show more"

### 8.3 Fitts's Law — Touch Target Sizing

**Application:**
- Hotel room "Select" button: full-width on mobile
- Vehicle "Book Now" button: sticky footer on mobile detail page
- Date picker day cells: minimum 44×44px
- Participant +/- counters: 44px hit area, not just the visible icon
- All filter checkboxes: 44px touch target regardless of visual size

### 8.4 Goal-Gradient Effect — Booking Funnels

**Hotel checkout:**  
"Step 1 of 3: Choose your room → Step 2: Guest details → Step 3: Payment"  
Progress bar + price summary persistent throughout.

**Vehicle rental:**  
"Step 1: Choose vehicle → Step 2: Driver details → Step 3: Protection + Payment"

**Tour booking:**  
"Step 1: Date & travelers → Step 2: Traveler details → Step 3: Add-ons → Step 4: Payment"

### 8.5 Peak-End Rule — Three Critical Peak Moments

TravellerAI has three emotional peaks — each must be designed intentionally:

1. **Tour/Hotel/Vehicle Booking Confirmed:** Animated check, booking reference large + copyable, "Your adventure awaits" or property-specific message
2. **Check-in / Key Handover:** QR code display with "Show this to check in" — clean, focused, no distractions
3. **Post-stay / Post-tour review request:** 24h after completion — warm, personal, specific to what they experienced

### 8.6 Anchoring Effect — Pricing Across All Modules

**Hotels:**
- Rate plan table: BAR (Best Available Rate) displayed first as the anchor reference
- Non-refundable rate: shown with strike-through of BAR price + "Save $X" — gain framing
- Room upgrade upsell: "Upgrade to Ocean Suite for $25/night more" (anchored against current selection)

**Vehicles:**
- Daily rate: primary anchor displayed on card and in booking widget
- Protection plan: Basic always shown first (free), then CDW/LDW as add-ons relative to daily rate
- Deposit amount: "Fully refunded within 48 hours of return" — reframes as temporary, not a cost

**Tours:**
- Featured package pricing: highest-value package shown first in comparison view
- Package comparison: "most popular" badge on mid-tier (decoy positioning)

### 8.7 Decoy Effect — Subscription & Plan Design

**Provider hotel subscription tiers:**
- Basic: 1 property, limited rooms, no analytics
- **Professional (target):** 3 properties, full analytics, OTA sync — "Most Popular" badge
- Enterprise: Unlimited, API access, white-label — makes Professional look "just right"

**Vehicle protection plans:**
- Basic (free): included, listed first (anchor), full liability on renter
- CDW (+$8/day): reduces liability significantly — looks excellent vs Basic
- **LDW (+$14/day):** adds theft coverage — the target plan, recommended badge
- FDW (+$22/day): zero deductible — for peace-of-mind renter segment

### 8.8 Zeigarnik Effect — Incomplete Actions

**Hotel:**
- Abandoned reservation: "You were looking at [Property Name] — 3 rooms remaining"
- Incomplete property setup: "Your property is 60% complete — add room photos to go live"

**Vehicle:**
- Incomplete vehicle registration: "Add your compliance documents to make [Vehicle] bookable"
- Abandoned vehicle booking: "Your [Car Model] is still available for [dates]"

**General:**
- Provider KYC progress bar: visible in sidebar, persistent but not blocking
- Profile completion: percentage chip in provider dashboard header

### 8.9 Labor Illusion — Search Loading States

**Tour search:** "Searching 847 packages across 32 destinations..."
**Hotel search:** "Finding available rooms in [Destination] for [dates]... checking 24 properties"
**Vehicle search:** "Checking fleet availability in [City] for [pickup date]... comparing 18 vehicles"

The specificity of numbers builds trust and makes the search feel thorough.

### 8.10 Endowment Effect — Trials and Customization

**Hotels:**
- Full PMS features during trial — front desk agent views, housekeeping board, revenue analytics
- Losing access to the full dashboard after trial = more painful than never having had it

**Vehicles:**
- Fleet owners see full GPS map, inspection forms, and driver console during trial
- Complete digital inspection workflow = perceived as essential once experienced

### 8.11 Jakob's Law — Familiar Commerce Patterns

**Hotel rooms:** Standard OTA pattern: image → name → amenity icons → price → CTA (Booking.com convention — don't deviate)
**Car rental:** ACRISS category display, fuel policy badges, security deposit — familiar enterprise car rental conventions
**Tour checkout:** Same e-commerce pattern travelers know: select → review → pay → confirm
**Driver app:** Navigation-app conventions (Google Maps / Uber-style UX) for trip execution flow

### 8.12 Aesthetic-Usability Effect

**In travel, visual credibility = booking credibility.** A property with professional photography and a clean, precise listing converts significantly better than one with amateur content — regardless of actual quality difference.

Our design system invests in precision because:
- Typographic discipline signals the operator cares about details
- Clean, un-cluttered layouts signal trustworthiness
- High-quality photography treatment signals premium positioning
- Consistent interaction states signal a mature, reliable product

---

## 9. Photography & Media Standards

### 9.1 The Strategic Role of Photography

In a monochrome system, photography IS the emotional color layer. The chrome stays neutral; the photography breathes. This is our competitive advantage — other travel brands overwhelm photography with colored UI chrome. We let it dominate.

### 9.2 Aspect Ratios by Context

| Context | Ratio | Min Size |
|---|---|---|
| Tour package hero | 16:9 | 1200×675px |
| Tour package card | 4:3 | 600×450px |
| Hotel property hero | 21:9 or 16:9 | 1920×820px |
| Hotel room card | 16:9 | 800×450px |
| Vehicle listing | 16:9 | 800×450px |
| Provider/hotel avatar | 1:1 | 400×400px |
| Provider/hotel cover | 3:1 | 1200×400px |
| Destination hero | 21:9 | 1920×820px |
| Blog featured | 16:9 | 1200×675px |
| Driver profile | 1:1 | 200×200px |

### 9.3 Treatment Rules

- Full natural color — never artificially saturated or desaturated
- Add Ink→transparent gradient overlay (40% opacity minimum) behind any overlaid text
- Preserve luminance detail — no over-exposed or over-darkened crops
- Hotel photography: must include exterior, lobby, representative rooms, pool/facilities, dining
- Vehicle photography: 3/4 front angle primary, clean background preferred
- Driver/Guide photography: professional headshot, good lighting

### 9.4 Quality Control

- Minimum 8 photos required for hotel property listing (platform enforced)
- Minimum 3 photos required for vehicle listing (platform enforced)
- AI-assisted quality scoring for blur, overexposure, irrelevant content (future roadmap)
- Provider receives quality guidance during listing creation

---

## 10. Voice & Tone Guidelines

### 10.1 Brand Voice Attributes

| Attribute | Tour Context | Hotel Context | Vehicle Context |
|---|---|---|---|
| **Assured** | "Book this tour — 127 verified reviews" | "4.8-star property, verified by our team" | "Fleet of 42 maintained vehicles" |
| **Precise** | "7-day, 6-night Bali tour" | "Breakfast included, check-in from 14:00" | "Toyota RAV4, automatic, 250km/day included" |
| **Warm** | "Your adventure awaits" | "Welcome to your home away from home" | "Your driver will meet you at arrivals" |
| **Respectful** | Clear cancellation policy, never buried | Security deposit explained plainly | Fuel policy explained, not hidden |

### 10.2 UI Copy Patterns

**Booking confirmation (all modules):**
- Tour: "You're going to [Destination]! Voucher sent to [email]."
- Hotel: "Room confirmed at [Property]. Check-in: [Date], 14:00 onwards."
- Vehicle: "Your [Car Model] is reserved. [Driver Name] will be in touch."

**Empty states:**
- No hotel results: "No properties available for those dates — try adjusting your dates or filters"
- No vehicles: "No vehicles available in [City] for [dates] — check nearby pickup points"

**Error states (always include recovery):**
- Hotel date unavailable: "Those dates are booked — check our availability calendar for open dates"
- Vehicle deposit hold failed: "Card pre-authorization failed. Try a different card or contact support."

**Loading states (Labor Illusion):**
- Hotel search: "Finding available rooms in [City] for [N] guests..."
- Vehicle allocation: "Checking [N] vehicles in [City]..."
- Tour availability: "Checking departure dates for [Package]..."

---

## 11. Design System Governance

### 11.1 Token Update Protocol

1. All visual changes update the CSS token in `travellerai-design-system.md` first
2. Token changes require design review before implementation
3. Dark mode tokens defined independently — never auto-inverted

### 11.2 New Component Protocol

1. Check if an existing component pattern can be extended
2. New travel-domain components require: specification + UX law rationale + accessibility checklist
3. New semantic colors require explicit justification — system feedback use cases only
4. All components pass WCAG AA before merge, WCAG AAA for checkout flow components

### 11.3 Photography Quality Gate

1. All provider-submitted photography reviewed before listing approval
2. Platform-generated placeholder images for empty states — never broken images in UI
3. All images served via CDN with WebP conversion and responsive srcset

### 11.4 Do's and Don'ts Reference

**DO:**
- Reference `travellerai-design-system.md` for all token values — never hardcode
- Use Swiss asymmetric grid for editorial; symmetric grid for transactional
- Use Monochrome whitespace-first grouping for all layouts
- Use typography scale as the primary hierarchy — not color
- Let destination photography be the emotional color source
- Make keyboard focus rings highly visible on all surface types
- Celebrate all three peak moments: booking confirmation, check-in/handover, review request
- Label all status badges with icon + text + border — never color alone

**DO NOT:**
- No hardcoded hex values — all via CSS tokens
- No decorative color gradients — flat neutrals + authentic photography
- No status communication through gray shade alone
- No floating form labels
- No height: 100vh — always min-height: 100dvh
- No AI clichés: Elevate, Seamless, Unleash, Revolutionary, Next-Gen
- No semantic colors in decorative contexts
- No heavy card shadows — only modals and overlays
- No equal 3-column feature grids

---

*Document Owner: Sultanul Arefin | Version: 2.0 | September 2026*
*Design System: context/website/travellerai-design-system.md*
*Product PRD: context/website-prd.md | context/hotel-and-vehicle-booking.md*
