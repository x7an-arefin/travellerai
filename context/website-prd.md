# TravellerAI — Website Development PRD
**Version:** 2.0 | **Status:** Draft for Development Planning | **Owner:** Sultanul Arefin  
**Document Type:** Product Requirements Document — Public Marketing Website & Marketplace Frontend  
**Companion PRDs:** `context/traveller.md` | `context/hotel-and-vehicle-booking.md`  
**Design System:** `context/website/travellerai-design-system.md`  
**Prepared:** September 2026

---

## 1. Document Purpose & Scope

This PRD defines the requirements, architecture, page specifications, UX flows, component inventory, and technical standards for the **TravellerAI public-facing website and marketplace frontend**.

This document covers **three product modules** that together form the complete marketplace:

**Module 1 — Tour & Activity Marketplace**
- Public marketing website (homepage, destination pages, blog, about, legal)
- Tour search, package listings, and booking flow
- Traveler account (bookings, wishlist, wallet, reviews)

**Module 2 — Hotel & Accommodation Booking**
- Hotel search with multi-attribute filtering
- Property detail page with room type inventory
- Room rate plan display and hotel booking checkout
- Guest account: hotel reservations, check-in QR, folio

**Module 3 — Vehicle & Transport Booking**
- Vehicle fleet search (self-drive + chauffeured)
- Vehicle listing detail with ACRISS attributes and protection plans
- Rental/transfer booking checkout with inspection acknowledgment
- Driver live tracking interface (traveler-facing)

It does NOT cover:
- Backend API design (see traveller.md + hotel-and-vehicle-booking.md)
- Admin panel (see traveller.md section 7)
- Provider dashboard (PMS, fleet management — separate PRD)
- Mobile native applications (future phase)

---

## 2. Technology Stack

### 2.1 Frontend Framework

**Astro.js** with the feature-based architecture defined in `context/website/astrojs.md`.

**Rationale:**
- Static HTML-first with zero-JS by default = fast initial load
- SolidJS Islands for client-interactive features (search, filters, booking)
- Excellent SEO characteristics for travel content (destination pages, package pages)
- Nanostores for cross-island state (cart, auth, favorites)
- Astro Content Collections for blog and destination guide content

### 2.2 Interactivity Layer

**SolidJS Islands** for all client-interactive components:

Tour module:
- Tour search bar with autocomplete
- Tour filter panels
- Package availability calendar
- Tour booking checkout flow

Hotel module:
- Hotel search bar with destination + date + guests
- Hotel filter sidebar
- Room availability calendar with rate display
- Room rate plan selector
- Hotel booking checkout flow
- Pre-arrival upsell forms

Vehicle module:
- Vehicle search with pickup location + date range
- Vehicle filter panel (type, fuel, transmission, model)
- Protection plan selector with live price update
- Vehicle rental checkout flow
- Live driver tracking map (on active transfer)

Cross-module:
- Currency selector
- Wishlist toggle (tours, hotels, vehicles)
- Auth modals
- Notification bell
- Compare drawer (tours: max 3 packages; hotels: max 3 rooms)

### 2.3 Styling

**Vanilla CSS** with CSS Custom Properties following the token system defined in `brand-guidelines.md`.

No Tailwind CSS. Styling is component-scoped within `.astro` files using the brand design token system.

### 2.4 State Management

**Nanostores** (`nanostores` + `@nanostores/solid`) for cross-island state:
- `$authUser` — authenticated user state
- `$searchQuery` — shared tour search state
- `$hotelSearch` — shared hotel search (destination + dates + guests)
- `$vehicleSearch` — shared vehicle search (location + dates + type)
- `$bookingCart` — active booking in progress (any module)
- `$favorites` — saved packages, hotels, vehicles
- `$currency` — selected display currency
- `$activeModule` — which booking module is active (tours/hotels/vehicles)

### 2.5 Content

- **Blog + Destination Guides:** Astro Content Collections (MDX)
- **Dynamic data:** Fetched server-side via controllers, passed to islands as props
- **API base:** `https://api.travellerai.com/api/v1`

### 2.6 Deployment

- Framework: Astro static output with server-side rendering (SSR) for dynamic pages
- Hosting: Cloudflare Pages (preferred) or Vercel
- CDN: Cloudflare for images and static assets
- Environment config: Per `dynamic-system-plan-v2.md` — never show mock data in production

---

## 3. Information Architecture

### 3.1 Public Route Map

```
/ ................................. Homepage (unified — Tours / Hotels / Vehicles tabs)
/destinations ..................... Destination directory
/destinations/[slug] .............. Destination detail

Tour Module:
/tours ............................ Tour & activity search
/tours/[slug] ..................... Tour/package detail
/providers ........................ Tour provider directory
/providers/[slug] ................. Tour provider profile

Hotel Module:
/hotels ........................... Hotel & accommodation search
/hotels/[slug] .................... Hotel property detail
/hotels/[slug]/rooms .............. Room type listing (if many types)
/hotels/[slug]/book ............... Hotel booking flow

Vehicle Module:
/vehicles ......................... Vehicle & transport search
/vehicles/[slug] .................. Vehicle listing detail
/vehicles/transfers ............... Chauffeured transfer search
/vehicles/transfers/[slug] ........ Transfer route detail

Content:
/blog ............................. Blog index
/blog/[slug] ...................... Blog article
/about ............................ About TravellerAI
/contact .......................... Contact page
/help ............................. Help center
/help/[category] .................. Help category
/help/[category]/[article] ........ Help article
/legal/privacy .................... Privacy policy
/legal/terms ...................... Terms of service
/legal/refunds .................... Refund policy
/legal/cookie-policy .............. Cookie policy
```

### 3.2 Authenticated Traveler Routes

```
/auth/login ....................... Login
/auth/register .................... Registration
/auth/verify ...................... Email/phone verification
/auth/forgot-password ............. Password reset
/account .......................... Account overview (all three modules)
/account/profile .................. Profile settings

Tour bookings:
/account/bookings ................. Tour booking history
/account/bookings/[id] ............ Tour booking detail + voucher

Hotel reservations:
/account/reservations ............. Hotel reservation history
/account/reservations/[id] ........ Reservation detail + check-in QR
/account/reservations/[id]/checkin  Express check-in flow

Vehicle rentals:
/account/rentals .................. Vehicle rental history
/account/rentals/[id] ............. Rental detail + rental agreement
/account/rentals/[id]/tracking .... Live driver tracking view

Account:
/account/wishlist ................. Saved packages, hotels, vehicles
/account/wallet ................... Wallet & credits
/account/reviews .................. My reviews (all modules)
/account/travelers ................  Saved traveler profiles
/account/notifications ............ Notification preferences

Checkout (unified flow per module):
/checkout/tour .................... Tour booking checkout
/checkout/hotel ................... Hotel booking checkout
/checkout/vehicle ................. Vehicle/transfer checkout
/checkout/confirmation ............ Booking confirmation (all modules)
```

### 3.3 Provider Onboarding Routes

```
/provider ......................... Provider landing (marketing)
/provider/register ................ Provider registration
/provider/verify .................. Verification steps
/provider/dashboard ............... Dashboard (authenticated)
```

### 3.4 Navigation Structure

**Primary navigation (public):**
```
[Logo] | Destinations | Tours | Hotels | Vehicles | Blog | [Login] [Register]
```

**Module Switcher (on search pages):**  
Pill-tab group beneath hero: `Tours` | `Hotels` | `Vehicles` | `Transfers`  
Switching tabs changes the search form fields and results context.

**Primary navigation (authenticated traveler):**
```
[Logo] | Destinations | Packages | Providers | Blog | [Currency] [Notifications] [Avatar Menu]
```

**Mobile navigation:** Full-screen drawer with same items + quick actions.

---

## 4. Page Specifications

### 4.1 Homepage

**Purpose:** Convert first-time visitors to package exploration and registered users.

**UX Laws Applied:** Serial Position Effect (hero CTA first, trust signals last), Aesthetic-Usability Effect, Goal-Gradient (search leading to results)

**Section Inventory (in order):**

1. **Global Navigation** — sticky, backdrop blur on scroll
2. **Hero Section**
   - Full-viewport or near-full hero (min-height: 100dvh)
   - Oversized typography: brand statement in --text-hero weight 800
   - Optional: Instrument Serif italic accent line below hero
   - Inline **Search Bar** (destination + date + travelers) — primary CTA
   - High-quality destination photography or editorial image
   - No generic stock photography

3. **Trust Bar** (below hero fold)
   - 4 stats: verified providers count, destinations, completed bookings, average rating
   - Mono font for numbers, tabular-nums
   - Thin rule separator, no icons — text only, numbers carry weight

4. **Featured Destinations**
   - Heading: H2, editorial
   - Grid: asymmetric — 1 large + 3 small or 2+2 varied spans
   - Each: Full-bleed photography, destination name overlay, package count
   - Hover: subtle scale on image (1.03), text remains stable

5. **Featured Packages**
   - Heading: H2 + optional subtitle
   - Filter tabs: All / Tours / Activities / Day Trips / Multi-Day
   - Package card grid: 3-column desktop, 2-column tablet, 1-column mobile
   - One featured (inverse) card breaking the grid
   - "Browse all packages" ghost button at end

6. **How It Works**
   - Heading: H2
   - 3-step process: Search → Book → Experience
   - Asymmetric layout, NOT a 3-equal-columns grid
   - Each step: large index number (H1 scale, mist color), title, description

7. **Featured Providers**
   - Heading: H2
   - Provider cards: Logo + name + specialty + verified badge + rating
   - Horizontal scroll on mobile

8. **Destination Story / Editorial Section**
   - Full-bleed editorial split: photography left, text right (or reversed)
   - Instrument Serif accent phrase
   - Links to destination directory

9. **Recent Blog Posts**
   - 3 posts in asymmetric grid
   - Article cards: image, category tag, title, date, read time

10. **Newsletter Signup**
    - Minimal: single email input + CTA
    - Copy: "Travel insights and exclusive deals. No noise."
    - Inverse surface section (dark)

11. **Footer**
    - Links: 4 columns (Destinations / Company / Providers / Legal)
    - Social links: icon-only, accessible labels
    - Copyright, language/currency selector
    - WCAG AA compliant

**Technical notes:**
- Hero search bar: `client:load` SolidJS island (critical above-the-fold)
- Featured packages filter tabs: `client:idle` SolidJS island
- Newsletter: `client:visible` SolidJS island
- All other sections: pure Astro static HTML

---

### 4.2 Destination Directory (/destinations)

**Purpose:** Allow travelers to browse and select travel destinations.

**Section Inventory:**

1. **Page Hero** — H1 "Explore Destinations", minimal, typographic-only or with large photography
2. **Search + Filter** — Text search by destination name, filter by region/continent, sort (popularity, alphabetical)
3. **Destination Grid**
   - Varied card sizes (not equal-column)
   - Each card: photography, destination name, country flag (SVG), package count
   - Hover: image scale 1.03, border emphasis
   - Pagination or infinite scroll (pagination preferred for SEO)

**Technical notes:**
- Filter island: `client:idle` SolidJS
- Initial data: server-rendered Astro with pagination

---

### 4.3 Destination Detail Page (/destinations/[slug])

**Purpose:** Provide destination context and surface relevant packages.

**Schema:** `DestinationPage` schema.org

**Section Inventory:**

1. **Destination Hero** — Full-width photography, destination name overlay, breadcrumb
2. **Overview tabs:** Overview / Things To Do / Getting Here / Travel Tips
3. **Key Info Bar** — Best time to visit, language, currency, time zone, visa info
4. **Popular Packages** — Package cards filtered to this destination (3-4 visible)
5. **Destination Travel Guide** — MDX content: rich text, inline images, maps
6. **Featured Providers** in this destination
7. **Related Destinations** — 3 destination cards
8. **Related Blog Posts** — 2-3 articles about this destination

**SEO Requirements:**
- `<title>` = "Travel [Destination] — Tours, Packages & Experiences | TravellerAI"
- Meta description: 150-160 characters including destination name and top activities
- `schema.org/TouristDestination` JSON-LD
- Open Graph image: destination photography
- Breadcrumb schema: Home > Destinations > [Destination Name]

---

### 4.4 Package Search & Listing (/packages)

**Purpose:** Core discovery and conversion page. The primary marketplace surface.

**UX Laws Applied:**
- Hick's Law: Progressive filter disclosure
- Anchoring: Price "from $X" visible on cards
- Decoy: Featured packages anchored against others
- Law of Proximity: Filter → results spatial relationship
- Serial Position: Best packages first and last

**Layout:** 2-panel — Left filters sidebar (desktop), Results main area

**Filter Sidebar (desktop sticky, mobile drawer):**
```
Section: Date & Duration
  - Date range picker (SolidJS island)
  - Duration: Any / 1-3 days / 4-7 days / 8+ days

Section: Category
  - Tour / Activity / Day Trip / Multi-Day / Transfer / Adventure (checkboxes)

Section: Price Range
  - Min/max slider (SolidJS island)
  - Currency: per person

Section: Provider
  - Rating: 4.5+ / 4+ / Any
  - Verified only (toggle)

Section: Features
  - Free cancellation
  - Instant confirmation
  - Hotel pickup
  - Group friendly (max size)
  - Accessibility

Section: Destination
  - Multi-select destination checkboxes (Search within)

Section: Difficulty
  - Easy / Moderate / Challenging
```

**Results Area:**
- Sort bar: Recommended / Most popular / Price low-high / Price high-low / Highest rated
- Active filter chips (dismissible)
- Result count: "847 packages found"
- Package cards: 3-column desktop, 2-column tablet, 1-column mobile
- Load more: Pagination (not infinite scroll — prevents back-button issues)
- Map toggle: Switch to map view (cluster markers with package count)

**Empty state:** If no results: "No packages match your filters" + suggested filter changes

**Technical notes:**
- Filter panel: `client:idle` SolidJS island
- Sort + results count: `client:idle` SolidJS island
- Initial server render: first page of results (no filters) — SEO-friendly
- URL-synced filters: `?destination=bali&duration=4-7&category=tour`

---

### 4.5 Package Detail Page (/packages/[slug])

**Purpose:** Convert package browsers to bookers. This page is the most critical conversion surface.

**UX Laws Applied:**
- Peak-End Rule: "Book now" must feel exciting, not transactional
- Goal-Gradient: Price/availability widget creates urgency through step completion
- Anchoring: Original price + discounted price always visible
- Zeigarnik: Wishlist saves incomplete intent
- Aesthetic-Usability Effect: Photography quality is the first credibility signal

**Layout:** 2-panel — Main content left 65%, Booking widget right 35% (sticky)

**Section Inventory:**

1. **Media Gallery**
   - Lightbox-enabled gallery, first image full-width hero
   - Image counter: "1 / 12"
   - Video play button if video available
   - Map thumbnail button: "See on map"

2. **Breadcrumb + Title Block**
   - Breadcrumb: Home > Destinations > [Destination] > [Category]
   - Package title: H1
   - Rating: star display + "4.8 (127 reviews)" — link jumps to review section
   - Provider: "By [Provider Name]" + verified badge (links to provider profile)
   - Key meta tags: Duration / Group size / Language / Difficulty / Min age

3. **Booking Widget (right sticky)**
   - Price display: "from $X / per person" (tabular mono, H3 size)
   - Original price if discount active (strikethrough)
   - Date picker: availability calendar
   - Participant selector: Adult / Child / Infant (+ / - controls, 44px targets)
   - Add-on selector: expandable
   - Live price calculation: "2 Adults x $149 = $298"
   - CTA: "Book Now" primary button (full width)
   - Secondary: "Request to Book" if instant booking unavailable
   - "Add to Wishlist" ghost below CTA
   - Free cancellation badge if applicable
   - Deposit info if partial payment available

4. **Package Overview** (tabbed or scrollable)
   - **Overview tab:** Description, highlights bullet list, what's included/excluded
   - **Itinerary tab:** Day-by-day itinerary with timeline layout
   - **Details tab:** Meeting point, pickup info, requirements, FAQ
   - **Operator tab:** Provider info, certifications, stats, contact

5. **Inclusions / Exclusions**
   - Side-by-side: Included items (checkmark icon) | Excluded items (x icon)
   - Max 7 per column visible, expandable

6. **Itinerary**
   - Timeline layout: left border line, day nodes
   - Each day: title, description, accommodation (if included), meals, transport

7. **Meeting Point & Map**
   - Address card with map embed
   - Pickup information if provider offers pickup

8. **Provider Section**
   - Provider logo, name, verified badge, rating, response time, established year
   - Short bio
   - Link to full provider profile
   - "Contact Provider" button (opens messaging thread)

9. **Reviews Section**
   - Overall rating: large number + star breakdown (bar chart per star level)
   - Category ratings: Guide / Value / Service / Organization
   - Review cards: reviewer name (no full name — privacy), avatar initial, rating, date, content, photos
   - Provider response inline below review (if exists)
   - "Write a Review" — visible only to eligible completed-booking users
   - Pagination or "Load more"

10. **Related Packages**
    - 3-4 package cards from same destination or category
    - "You might also like" heading

11. **FAQ**
    - Accordion component
    - Schema: `FAQPage` JSON-LD for SEO

**SEO Requirements:**
- `<title>` = "[Package Title] — [Destination] | TravellerAI"
- Meta description: 150-160 characters including duration, price, and destination
- `schema.org/Product` + `schema.org/Offer` + `schema.org/AggregateRating` JSON-LD
- Breadcrumb schema
- Open Graph: package hero image

**Mobile Layout:**
- Booking widget collapses to sticky footer bar: price + "Book Now" button
- Full booking flow opens as a modal/drawer on mobile

---

### 4.6 Booking Checkout (/checkout)

**Purpose:** Convert package selection to paid booking. Must minimize abandonment.

**UX Laws Applied:**
- Goal-Gradient: Step indicator makes progress visible
- Cognitive Load: One decision group per step — never overwhelm
- Poka-Yoke: Prevent booking mistakes (date validation, participant limit warnings)
- Fitts's Law: Large tap targets for all mobile controls
- Peak-End Rule: Confirmation step must be celebrated

**Step Flow:**
```
Step 1: Date & Travelers
Step 2: Traveler Details
Step 3: Add-ons & Pickup
Step 4: Review & Payment
Step 5: Confirmation
```

**Layout:** Centered, single-column focus (max 680px). Persistent order summary in right sidebar (desktop) or expandable summary (mobile).

**Step 1: Date & Travelers**
- Selected package summary (image, title, provider)
- Departure date selection (calendar or date list for multi-departure packages)
- Participant selection (Adult / Child / Infant counters)
- Departure time selection (if multiple)
- Price update: live recalculation
- "Continue" primary button

**Step 2: Traveler Details**
- Lead traveler form: First name / Last name / Email / Phone / Country / Date of birth
- Additional participants: expandable per participant
- Fields: full name + date of birth minimum (passport details conditional based on package)
- Special requirements: dietary / accessibility / notes (optional expandable)
- "Same details as my profile" autofill if logged in

**Step 3: Add-ons & Pickup**
- Available add-ons: each as a selectable card (name, description, price, +/- selector)
- Pickup: Yes/No toggle → if yes: address input with autocomplete
- Price updates live

**Step 4: Review & Payment**
- Full booking summary: package, dates, participants, add-ons, pickup, itemized pricing
- Cancellation policy: displayed prominently (not hidden in small print)
- Payment method selection (cards, mobile wallet, etc.)
- Coupon code: collapsible input
- Wallet credit: apply toggle if balance available
- Terms acceptance checkbox with link to full policy
- "Pay $X" primary button
- Security indicators: lock icon, "Secured by [Payment Provider]"

**Step 5: Confirmation**
- Animated success: checkmark draw animation (ease-spring, 600ms) — the peak emotional moment
- Booking reference: large, monospace, copyable
- QR code download option
- Summary: package, date, participants, total paid
- "Download Voucher" primary button
- "Add to Calendar" secondary button
- "Explore More Packages" ghost link
- Email confirmation notice: "Your voucher has been sent to [email]"

**Technical notes:**
- Full checkout: SolidJS island `client:load`
- Price calculation: client-side with server validation on submit
- Payment: handled by payment gateway SDK (provider-specific)
- Auth check: guest checkout supported; account creation offered after confirmation
- Inventory lock: API call at Step 1 start, released on timeout or booking completion

---

### 4.7 Provider Profile (/providers/[slug])

**Purpose:** Build trust in individual providers. Supports provider discovery and booking conversion.

**Section Inventory:**

1. **Provider Hero** — Cover image, provider logo, name, verified badge, rating, specialty, location, "Contact" button
2. **Trust Metrics Bar** — Years in business / Completed bookings / Average rating / Response time
3. **About** — Full description, certifications, awards, supported languages
4. **Active Packages** — Package card grid filtered to this provider
5. **Our Guides** — Guide profiles (name, photo, languages, rating)
6. **Reviews** — Same pattern as package reviews page
7. **Provider Policies** — Cancellation policy, support hours, contact info

---

### 4.8 Blog (/blog, /blog/[slug])

**Purpose:** SEO-driven content marketing. Destination guides, travel tips, insider content.

**Blog Index:**
- Featured post: full-width editorial card
- Recent posts: asymmetric grid (1 large + 2 small + 3 standard)
- Category filter: tabs (All / Destinations / Tips / Stories / Guides)
- Search: simple text search within blog

**Blog Article:**
- Reading time estimate in header
- Author: avatar + name + bio
- Related packages: 2-3 cards inline within or after article
- Related destinations: contextual cards
- Social sharing: accessible share buttons
- Table of contents: sticky sidebar (desktop) for long articles
- Schema: `Article` + `BreadcrumbList` JSON-LD

---

### 4.9 Account Pages (/account/*)

**Booking History (/account/bookings):**
- List: chronological (upcoming first, then past)
- Each booking: package thumbnail, title, date, status badge, booking reference, "View Details" link
- Filter: Upcoming / Past / Cancelled

**Booking Detail (/account/bookings/[id]):**
- Full booking summary matching confirmation page
- Voucher download
- Cancel booking (if within policy)
- Request to reschedule
- Contact provider
- Leave review (if eligible)
- Support: "Report an issue"

**Wishlist (/account/wishlist):**
- Package card grid
- Price change indicator (if price changed since saved)
- Availability alert toggle per item
- Remove from wishlist (icon button, accessible label, confirmation)

**Wallet (/account/wallet):**
- Balance display: prominent, H2 scale, monospace
- Transaction history table: date / type / description / amount / balance after
- Apply to booking: explained inline

---

## 5. Component Inventory

### 5.1 Feature Module Structure (per astrojs.md)

```
src/
├── modules/
│   ├── homepage/
│   │   ├── components/
│   │   │   ├── HeroSection.astro
│   │   │   ├── TrustBar.astro
│   │   │   ├── FeaturedDestinations.astro
│   │   │   ├── FeaturedPackages.astro
│   │   │   ├── HowItWorks.astro
│   │   │   ├── NewsletterSection.astro
│   │   │   └── islands/
│   │   │       ├── HeroSearch.tsx         -- client:load
│   │   │       └── PackageFilterTabs.tsx  -- client:idle
│   │   ├── homepage.controller.ts
│   │   └── homepage.model.ts
│   │
│   ├── packages/
│   │   ├── components/
│   │   │   ├── PackageCard.astro
│   │   │   ├── PackageGrid.astro
│   │   │   ├── PackageHero.astro
│   │   │   ├── PackageInclusions.astro
│   │   │   ├── PackageItinerary.astro
│   │   │   ├── PackageReviews.astro
│   │   │   ├── ProviderCard.astro
│   │   │   └── islands/
│   │   │       ├── PackageSearch.tsx         -- client:idle
│   │   │       ├── FilterSidebar.tsx         -- client:idle
│   │   │       ├── BookingWidget.tsx         -- client:load
│   │   │       ├── AvailabilityCalendar.tsx  -- client:idle
│   │   │       └── PriceCalculator.tsx       -- client:idle
│   │   ├── packages.controller.ts
│   │   └── packages.model.ts
│   │
│   ├── checkout/
│   │   ├── components/
│   │   │   └── islands/
│   │   │       ├── CheckoutFlow.tsx          -- client:load
│   │   │       ├── PaymentForm.tsx           -- client:load
│   │   │       └── BookingConfirmation.tsx   -- client:load
│   │   ├── checkout.controller.ts
│   │   └── checkout.model.ts
│   │
│   ├── destinations/
│   ├── providers/
│   ├── blog/
│   ├── auth/
│   └── account/
│
├── shared/
│   ├── components/
│   │   ├── Button.astro
│   │   ├── Badge.astro
│   │   ├── StarRating.astro
│   │   ├── Breadcrumb.astro
│   │   ├── Pagination.astro
│   │   ├── EmptyState.astro
│   │   ├── LoadingSkeleton.astro
│   │   └── islands/
│   │       ├── CurrencySelector.tsx  -- client:idle
│   │       ├── WishlistButton.tsx    -- client:idle
│   │       └── ShareButton.tsx       -- client:idle
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── MarketplaceLayout.astro
│   │   └── AccountLayout.astro
│   └── stores/
│       ├── auth.store.ts
│       ├── search.store.ts
│       ├── booking-cart.store.ts
│       └── favorites.store.ts
│
└── pages/
    ├── index.astro
    ├── destinations/
    ├── packages/
    ├── providers/
    ├── blog/
    ├── checkout/
    ├── account/
    └── auth/
```

---

## 5A. Hotel Module — Page Specifications

### 5A.1 Hotel Search & Listing (/hotels)

**Purpose:** Allow travelers to search and browse hotel properties.

**UX Laws Applied:** Hick's Law (progressive filter disclosure), Anchoring (BAR rate as reference), Jakob's Law (familiar hotel OTA pattern)

**Hero Search Bar (client:load SolidJS island):**
```
Destination [text + autocomplete]
Check-in [date picker]
Check-out [date picker]
Guests: Adults [number] / Rooms [number]
[Search Hotels] primary button
```

**Filter Sidebar (client:idle SolidJS island):**
```
Section: Star Rating — 5-star / 4-star / 3-star / 2-star / Unrated (checkboxes)
Section: Property Type — Hotel / Resort / Boutique / Eco-Lodge / Hostel / Serviced Apartment / Glamping
Section: Price Range — Min/max slider, per night, per room
Section: Meal Plan — Any / Room Only / Breakfast / Half Board / Full Board / All-Inclusive
Section: Amenities — Pool / Beach access / Spa / Gym / Parking / Pet-friendly / EV charging
Section: Guest Rating — 9+ Exceptional / 8+ Excellent / 7+ Good
Section: Cancellation — Free cancellation toggle
```

**Results Area:**
- Sort: Recommended / Price low-high / Price high-low / Star rating / Guest rating
- Hotel card: Property photo (16:9) / Property type badge / Star dots / Name / Location / Key amenity icons (5 max) / "from $X / night" (tabular mono) / Guest rating (e.g., "Excellent 8.9") / [View Rooms] CTA
- Map view toggle: markers clustered by area, price badge on marker
- Pagination: page-based (SEO-friendly)

**Technical notes:**
- Initial render: server-side first page, 12 properties
- Filter + sort: `client:idle` SolidJS island
- URL-synced: `?destination=bali&checkin=2026-11-15&checkout=2026-11-18&adults=2&rooms=1`

---

### 5A.2 Hotel Property Detail (/hotels/[slug])

**Purpose:** Convert hotel browsers to room bookers. Second most critical conversion surface.

**UX Laws Applied:** Anchoring (BAR rate first), Goal-Gradient (room selection → payment), Peak-End Rule (confirmation celebration), Serial Position (best amenities first)

**Layout:** Main content left 65% / Sticky booking sidebar right 35%

**Section Inventory:**

1. **Photo Gallery**
   - Lightbox grid: 5-photo mosaic (1 large left + 2×2 right) as entry
   - "View all 24 photos" opens full-screen gallery
   - 360-degree view link if available

2. **Property Header**
   - Breadcrumb: Home > Hotels > [Destination] > [Property Name]
   - Property name: H1
   - Star rating: 5-dot system (Ink filled, Stone unfilled)
   - Guest score: "Excellent 8.9 · 234 reviews" — links to review section
   - Location: clickable address (opens map)
   - Property type badge
   - Direct-booking perks bar: "Book direct: Free upgrade on arrival · Loyalty points"

3. **Key Features Bar**
   - 5 top amenities as icon + label chips
   - "Free cancellation until [date]" if BAR is flexible
   - Check-in / Check-out times

4. **Room Selector (client:load SolidJS island — critical)**
   - Date bar: Check-in / Check-out / Guests — persistent, sticky below header on scroll
   - Room type cards (each):
     - Room photo (16:9) thumbnail + gallery toggle
     - Room type name (e.g., "Deluxe Mountain View King")
     - Floor area + bed config + max occupancy + view type
     - Top 5 in-room amenities (icons)
     - Floor plan thumbnail (if available)
   - Rate plan rows per room (per OTA rate plan hierarchy):
     - Rate name (e.g., "Best Available Rate" / "Non-Refundable -15%")
     - Meal plan badge
     - Cancellation policy (explicit, not hidden)
     - Total for stay (not just per night — removes anchoring confusion)
     - Per night rate (mono, smaller)
     - [Reserve] primary button
   - "Show more rooms" if >4 room types
   - Occupancy warning: "Only 2 rooms left at this rate!"

5. **Property Description & Facilities**
   - Full description
   - Amenity categories: expandable accordion (Connectivity / Pool & Wellness / Dining / Parking / etc.)
   - Property policies: check-in time / check-out / pets / smoking / noise

6. **Location**
   - Map embed with marker
   - Location tags: "800m from City Center" / "2.3km from Airport"
   - Nearby attractions (up to 5)
   - Transport options

7. **Guest Reviews**
   - Overall score: large number + category breakdown bars (Cleanliness / Location / Service / Facilities / Value)
   - Review cards: reviewer name initial avatar, country flag, stay date, room type stayed, rating, review text
   - Dimension scores per review
   - Property response if exists
   - Load more button

8. **Pre-Arrival Upsell Block** (shown after room is in cart)
   - Early check-in: "Guarantee arrival from 10:00 AM — $35"
   - Room upgrade: "Upgrade to Ocean Suite — $25/night more"
   - Breakfast add-on: "Add breakfast for 2 — $18/person/day"
   - Airport transfer: deep-link to vehicle module

9. **Similar Properties**
   - 3 hotel cards from same destination

**Booking Sidebar (sticky, client:load):**
- Rate summary: Room name / Rate plan / Meal plan / Dates / Total
- Cancellation policy prominent
- [Reserve Room] primary button (full width)
- "No payment today" badge if flexible rate
- Security deposit notice if applicable
- "Contact Property" ghost button

**SEO:**
- `<title>` = "[Property Name] — [Destination] | TravellerAI"
- Schema: `Hotel` + `LodgingBusiness` + `AggregateRating` + `Offer` + `BreadcrumbList`
- OG image: Property hero photo

---

### 5A.3 Hotel Booking Checkout (/checkout/hotel)

**Purpose:** Convert room selection to confirmed reservation. Minimize abandonment.

**UX Laws Applied:** Goal-Gradient (3-step progress bar), Cognitive Load (one decision group per step), Poka-Yoke (date validation, guest limit warnings), Peak-End Rule (confirmation celebration)

**Step Flow:**
```
Step 1: Guest Details
Step 2: Special Requests & Add-ons
Step 3: Review & Payment
Step 4: Confirmation
```

**Step 1: Guest Details**
- Reservation summary card (sticky sidebar or top summary): property photo / room / dates / guests / rate plan / total
- Lead guest form: First name / Last name / Email / Phone / Country
- Additional guests: expand per room if multi-room booking
- "Same as profile" autofill if logged in
- Estimated arrival time (optional — helps front desk)

**Step 2: Special Requests & Add-ons**
- Pre-arrival upsells (if not already added):
  - Early check-in guarantee: price + toggle
  - Room upgrade if available: price difference shown
  - Breakfast add-on: per person per day
  - Airport transfer: links to vehicle booking (new tab or inline)
- Special requests: free-text field (dietary, accessibility, celebration requests)
- Bed preference if room allows (King / Twin)
- Extra bed request (if policy allows)
- Damage deposit info: "$200 pre-authorization will be released within 48 hours of checkout"

**Step 3: Review & Payment**
- Full reservation summary: property / room type / meal plan / dates / nights / guests / itemized pricing
- Cancellation policy displayed prominently (not small print)
- Security deposit: clearly marked as a hold, not a charge
- Payment method selection
- Coupon / promotional code
- Wallet credit apply toggle
- Terms acceptance checkbox
- [Confirm Reservation: $X] primary button
- "100% secure payment" trust signal

**Step 4: Confirmation (Peak emotional moment)**
- Animated checkmark (600ms ease-spring) + property name in H2
- Booking reference: large, monospace, copyable
- QR code: for digital check-in at property
- Check-in instructions: address + check-in time + contactless check-in link
- Add to calendar button
- Download booking voucher
- Pre-arrival checklist: "You're all set — here's what to expect"
- Upsell: "Book your airport transfer →" (cross-module, vehicle module)
- Email confirmation notice

---

### 5A.4 Account: Hotel Reservations (/account/reservations)

**Reservation List:**
- Tabs: Upcoming / Past / Cancelled
- Each: Property thumbnail / Property name / Room type / Check-in → Check-out dates / Status badge / Booking reference / [View Details] CTA

**Reservation Detail (/account/reservations/[id]):**
- Full reservation summary
- Check-in QR code (large, accessible)
- Express check-in link (if property supports contactless)
- Folio: list of incidental charges posted during stay
- Cancel / Modify request
- Contact property
- Download booking document
- Post-stay: rate your stay (if completed)

---

## 5B. Vehicle Module — Page Specifications

### 5B.1 Vehicle Search & Listing (/vehicles)

**Purpose:** Allow travelers to find and book self-drive vehicles or chauffeured transfers.

**UX Laws Applied:** Hick's Law (vehicle type pre-filter), Anchoring (daily rate as primary number), Endowment Effect (protection plan framing)

**Search Form (client:load SolidJS island):**

*Self-Drive tab:*
```
Pickup Location [text + autocomplete]
Pickup Date + Time [date-time picker]
Return Date + Time [date-time picker]
Vehicle Category [dropdown: Economy / SUV / Van / Motorcycle / etc.]
[Search Vehicles] primary button
```

*Chauffeured / Transfer tab:*
```
From: [text + autocomplete]
To: [text + autocomplete]
Date + Time [date-time picker]
Passengers [number selector]
Service Type [dropdown: Airport Transfer / City Charter / Full Day / Multi-Day]
[Find Drivers] primary button
```

**Filter Sidebar (client:idle SolidJS island):**
```
Section: Vehicle Type — Car / SUV / Van / Minibus / Coach / Motorcycle / Scooter / TukTuk / E-Bike
Section: Transmission — Automatic / Manual
Section: Fuel Type — Petrol / Diesel / Hybrid / Electric / CNG
Section: Drive — 2WD / AWD 4x4
Section: Price Range — Daily rate min/max slider
Section: Seats — 2 / 4-5 / 7-8 / 9-16 / 17+
Section: Features — AC / GPS / Child seat available / Wi-Fi hotspot / Dashcam
Section: Rental Model — Self-Drive / With Driver / Both
Section: Verified fleet — Verified operator toggle
```

**Results:**
- Vehicle card: Vehicle photo (16:9) / Make-Model / Transmission + Fuel + Seats icons (ACRISS row) / Daily rate (tabular mono, H3) / Deposit amount / Protection plan available badge / Provider verified badge / [View Details] CTA
- Sort: Recommended / Price low-high / Seat count / Newest fleet

---

### 5B.2 Vehicle Detail Page (/vehicles/[slug])

**Purpose:** Provide full vehicle information and convert to booking.

**Layout:** Main content left 65% / Booking widget right 35% (sticky)

**Section Inventory:**

1. **Vehicle Gallery** — 3 images minimum: 3/4 front / interior / rear/side. Lightbox.

2. **Vehicle Header**
   - Breadcrumb: Home > Vehicles > [City] > [Category] > [Make Model Year]
   - Vehicle name: H1 (e.g., "Toyota RAV4 2025 or similar")
   - "Or similar vehicle" note if exact model may vary
   - Fleet owner badge: name + verified + rating
   - ACRISS attribute row: icons for transmission / fuel / seats / luggage / AC / special features

3. **Vehicle Specs Card**
   - Make, Model, Year
   - Engine: fuel type + displacement (cc)
   - Transmission: Automatic / Manual
   - Drive: 2WD / AWD
   - Seating: N adults
   - Luggage: N small bags + N large bags
   - Mileage policy: Unlimited / 150km/day / Per km rate
   - Fuel policy: Full-to-Full / Pre-purchased / Same-to-same (clearly explained)
   - Special features: AC / GPS / Child seat / Wi-Fi hotspot / Dashcam / Panoramic roof

4. **Pricing & Protection Plans (client:load island)**
   - Daily rate: tabular mono, H2
   - Duration calculation: X days × $Y = total (live update from dates)
   - Protection plan selector (from brand-guidelines.md Decoy Effect):
     - Basic (Included — $0/day): Full liability, listed first as anchor
     - Collision Damage Waiver (CDW — +$8/day): Reduces collision liability to deductible
     - Loss Damage Waiver (LDW — +$14/day): CDW + theft coverage — "Recommended" badge
     - Full Zero-Excess Waiver (FDW — +$22/day): Zero deductible, all risks
   - Roadside Assistance add-on: +$3/day toggle
   - Optional add-ons: Child seat / GPS device / Wi-Fi hotspot / Extra driver
   - Deposit: pre-authorization amount displayed clearly
   - Total: updates live as plan + add-ons are selected

5. **Pickup & Return**
   - Depot address with map embed
   - Operating hours
   - Airport pickup available badge (if applicable)
   - Return: same location or different depot (if offered)

6. **Rental Terms**
   - Mileage policy detailed explanation
   - Fuel policy explanation
   - Driver eligibility: minimum age / license requirements / IDP requirement for foreigners
   - Security deposit process: "Pre-authorized hold, automatically released 48h after return"

7. **Fleet Operator Profile**
   - Company name + verified badge
   - Fleet size, years of operation, rating, response time
   - Compliance: insurance expiry, roadworthiness certificate status
   - Contact button

8. **Vehicle Reviews**
   - Post-rental reviews: vehicle condition rating + driver professionalism rating (if with driver)
   - Review cards: reviewer + trip type + rating + comment + vehicle condition

9. **Related Vehicles** — 3 alternatives from same category or depot

**Booking Widget (sticky, client:load):**
- Date range picker: Pickup date/time + Return date/time
- Duration calculation: X days
- Protection plan summary: selected plan name
- Price breakdown: Base rate + Protection plan + Add-ons + Deposit (hold)
- [Reserve Vehicle] primary button
- "Free cancellation until [date]" if applicable

**SEO:**
- `<title>` = "[Make Model] Rental — [City] | TravellerAI"
- Schema: `Product` + `Offer` + `AggregateRating` + `BreadcrumbList`

---

### 5B.3 Vehicle Booking Checkout (/checkout/vehicle)

**Step Flow:**
```
Step 1: Driver Details
Step 2: Protection & Add-ons
Step 3: Review & Payment
Step 4: Confirmation
```

**Step 1: Driver Details**
- Rental summary sticky sidebar: vehicle / dates / duration / depot
- Primary driver form: First name / Last name / Date of birth / Email / Phone / Country
- Driving license: upload front + back (client:load island) — with OCR processing indicator
- IDP upload: conditional if non-resident foreign national
- Additional driver form: expandable (if add-on selected)
- Minimum age confirmation checkbox if applicable

**Step 2: Protection & Add-ons**
- Protection plan selection (same as detail page — repeat for confirmation)
- Add-on checklist: Child seat / GPS / Wi-Fi hotspot / Extra driver
- Each add-on: icon + description + price + quantity selector
- Damage acknowledgment: "I understand the damage liability with [Selected Plan]" checkbox
- Security deposit acknowledgment: "I authorize a $[X] pre-authorization hold on my card"
- Price updates live

**Step 3: Review & Payment**
- Full rental summary: vehicle / depot / dates / primary driver / protection plan / add-ons
- Itemized pricing: Base rental + Protection plan + Add-ons + Deposit hold (marked as temporary)
- Mileage and fuel policies: explicit callout
- Cancellation policy: displayed before payment
- Payment method
- [Confirm Rental: $X] primary button
- Deposit clarification: "$[X] hold — not a charge — released 48h after return"

**Step 4: Confirmation (Peak moment)**
- Animated checkmark + vehicle make/model in H2
- Booking reference: large, monospace, copyable
- Pickup instructions: depot address + operating hours + what to bring (license, credit card for deposit, IDP)
- QR code for quick lookup at depot counter
- Add to calendar: pickup reminder
- Download rental agreement summary PDF
- Email confirmation: rental voucher sent
- Cross-sell: "Need a hotel? Browse properties in [City] →"

---

### 5B.4 Chauffeured Transfer Detail (/vehicles/transfers/[slug])

**Purpose:** Book a pre-defined fixed-fare transfer route.

**Section Inventory:**
1. Route header: "[City A] → [City B] Transfer" / H1
2. Route map: visual showing pickup-to-dropoff route
3. Vehicle options for this route: Economy / Premium / Minibus — each with seats / luggage / rate card
4. Driver profile: assigned or available driver pool with ratings
5. Flight tracking note: "We monitor your flight. Driver adjusts to actual landing time."
6. Inclusions/exclusions: waiting time included (60 min free) / tolls included or extra
7. Booking widget: Pickup location (autocomplete, more precise than city) / date + time / passengers / flight number (optional) / [Book Transfer] CTA

---

### 5B.5 Live Driver Tracking (/account/rentals/[id]/tracking)

**Purpose:** Traveler-facing real-time driver tracking for active transfers.

**Design:**
- Full-viewport map (client:only="solid-js" — browser API required)
- Driver marker: vehicle icon with driver photo + name callout
- Route line: pickup → current position → destination
- ETA countdown: prominent, H2, updates every 30 seconds
- Driver contact: tap-to-call button (44px touch target)
- "Driver has arrived" notification: full-screen overlay when driver is within 100m of pickup
- Trip status bar: "Driver en-route" / "Driver arrived" / "Trip started" / "Trip completed"
- Post-trip: auto-transitions to receipt view at trip end

**Technical note:** Uses `client:only="solid-js"` — cannot SSR (browser-only location APIs). Polling or WebSocket for driver position updates.

---

## 5C. Account Dashboard — Multi-Module Overview (/account)

**Purpose:** Unified account view across all three booking modules.

**Section Inventory:**

1. **Welcome header:** Guest name + avatar + loyalty tier (if applicable)

2. **Quick stats row (tabular mono):**
   - Total bookings (tours + hotels + rentals)
   - Upcoming trips count
   - Wallet balance
   - Reviews written

3. **Upcoming Trips** (next 3 across all modules)
   - Mixed list: each item shows module type icon (tour / hotel / car) + summary
   - Sort by date ascending

4. **Recent Activity** — last 5 actions across modules

5. **Wishlist preview** — 3 saved items across modules, "View all" link

6. **Account navigation** — organized by module:
   - Tours: Booking history / Vouchers
   - Hotels: Reservations / Check-in QR
   - Vehicles: Rental history / Agreements
   - Account: Profile / Wallet / Reviews / Notifications

---


## 6. SEO Requirements

### 6.1 Technical SEO

- **Sitemap:** Auto-generated XML sitemap for all public pages
- **Robots.txt:** Disallow auth/account/checkout routes
- **Canonical URLs:** Self-referencing canonical on all pages
- **hreflang:** Language variants when internationalization is added
- **Core Web Vitals targets:**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
  - TTFB < 800ms

### 6.2 Per-Page SEO Checklist

Every page must have:
- Unique `<title>` tag (50-60 characters)
- Unique meta description (150-160 characters)
- Single `<h1>` per page
- Logical H2-H6 hierarchy
- Descriptive `alt` text on all meaningful images
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Relevant JSON-LD structured data

### 6.3 Structured Data Schema Map

| Page | Schema Types |
|---|---|
| Homepage | WebSite, SearchAction |
| Destination | TouristDestination, BreadcrumbList |
| Tour/Package Detail | Product, Offer, AggregateRating, BreadcrumbList, FAQPage |
| Tour Provider Profile | LocalBusiness, AggregateRating |
| Hotel Property Detail | Hotel, LodgingBusiness, AggregateRating, Offer, BreadcrumbList |
| Vehicle Listing | Product, Offer, AggregateRating, BreadcrumbList |
| Transfer Route | Service, Offer, BreadcrumbList |
| Blog Article | Article, BreadcrumbList, Person (author) |
| Blog Index | Blog, BreadcrumbList |

---

## 7. Performance Requirements

### 7.1 Targets

| Metric | Target |
|---|---|
| Homepage LCP | < 2.0s |
| Package listing LCP | < 2.5s |
| Package detail LCP | < 2.5s |
| Time to Interactive | < 3.5s |
| Total JS payload | < 200KB gzipped |
| Image formats | WebP / AVIF with fallback |
| Fonts | Subset + `font-display: swap` |

### 7.2 Optimization Strategies

- Astro's zero-JS-by-default reduces initial bundle dramatically
- Islands hydrated only when needed (see hydration directive table in astrojs.md)
- Images: `<Image />` component from `@astrojs/image` with automatic WebP conversion
- Fonts: Preloaded, subsetted, self-hosted or Google Fonts with `display=swap`
- Skeleton loaders: Match final component dimensions — no layout shift
- Lazy load: Below-fold images and components use `loading="lazy"` and `client:visible`

---

## 8. Responsiveness Requirements

### 8.1 Breakpoints

```
Mobile:  320px — 767px   (single column, thumb-friendly)
Tablet:  768px — 1023px  (2-column layouts, sidebar collapses)
Desktop: 1024px — 1359px (full layout, sidebar visible)
Wide:    1360px+         (max-width contained, whitespace increases)
```

### 8.2 Responsive Rules

- Mobile navigation: drawer, not top bar
- Filter sidebar: mobile drawer (bottom-slide or left-slide)
- Package cards: 1 / 2 / 3 columns across breakpoints
- Booking widget: sticky footer on mobile
- Tables: horizontal scroll container on mobile
- Typography: responsive scale via `clamp()` — never fixed px at mobile
- Checkout: single column, all widths

---

## 9. Internationalization

### 9.1 Phase 1 (initial release)

- English (US/UK) only
- USD + local currency display (display only — rates from API)
- Date format: internationalized via `Intl.DateTimeFormat`

### 9.2 Phase 2 (planned)

- Multi-language support: i18n routing with Astro
- RTL layout support (Arabic, Hebrew)
- Currency: full conversion via API exchange rates
- Locale-aware number formatting via `Intl.NumberFormat`

---

## 10. Accessibility Requirements

### 10.1 WCAG 2.1 AA Baseline

All pages must pass WCAG 2.1 AA. Booking flow must target WCAG 2.1 AAA.

### 10.2 Implementation Checklist

- Skip navigation: "Skip to main content" as first focusable element
- Focus management: Modal open → focus trap inside; modal close → return focus to trigger
- Live regions: Search results, filter count, price updates use `aria-live="polite"`
- Form accessibility: All inputs have persistent labels, errors use `aria-describedby`
- Image accessibility: All product images have descriptive `alt` text
- Interactive states: Hover and focus states visible on all surfaces including dark and image backgrounds
- Keyboard: All interactive elements reachable via Tab; menus and dropdowns follow WAI-ARIA patterns
- Touch targets: Minimum 44x44px for all interactive elements
- Color: Never sole communication medium — always pair with label/icon/shape

---

## 11. Security Requirements

- Content Security Policy (CSP) headers
- HTTPS enforced platform-wide
- No sensitive data (tokens, credentials) in client-side code
- Auth tokens: HttpOnly cookies — not localStorage
- Third-party scripts: explicitly allowlisted in CSP
- Form inputs: client-side validation + server-side validation (never client-only)
- File uploads: type, size, and content validation on server
- API calls from public pages: rate-limited

---

## 12. Analytics & Tracking

### 12.1 Events to Track

**Tour Module:**

| Event | Properties |
|---|---|
| `tour_search_initiated` | destination, date_range, travelers |
| `package_viewed` | package_id, destination, price, source |
| `package_wishlisted` | package_id |
| `tour_booking_started` | package_id, departure_date |
| `tour_booking_step` | step_number, step_name |
| `tour_booking_completed` | booking_id, total_value, package_id |
| `tour_booking_abandoned` | step_number |

**Hotel Module:**

| Event | Properties |
|---|---|
| `hotel_search_initiated` | destination, checkin, checkout, rooms, adults |
| `hotel_property_viewed` | property_id, destination, star_rating |
| `room_type_viewed` | property_id, room_type_id, rate_plan |
| `hotel_wishlisted` | property_id |
| `hotel_booking_started` | property_id, room_type_id, rate_plan, checkin |
| `hotel_booking_step` | step_number, step_name |
| `hotel_booking_completed` | booking_id, total_value, nights, property_id |
| `upsell_accepted` | booking_id, upsell_type, upsell_value |

**Vehicle Module:**

| Event | Properties |
|---|---|
| `vehicle_search_initiated` | location, pickup_date, rental_type |
| `vehicle_viewed` | vehicle_id, category, daily_rate |
| `vehicle_wishlisted` | vehicle_id |
| `vehicle_booking_started` | vehicle_id, pickup_date, duration_days |
| `protection_plan_selected` | booking_id, plan_type, plan_daily_rate |
| `vehicle_booking_step` | step_number, step_name |
| `vehicle_booking_completed` | booking_id, total_value, rental_days, vehicle_id |
| `driver_tracking_viewed` | booking_id |

### 12.2 Privacy

- Cookie consent required before analytics tracking
- No PII in analytics event properties
- IP anonymization enabled
- Data retention: 14 months

---

## 13. Launch Criteria

### 13.1 Must-Have for MVP (Phase 1 — Tour Module)

- Homepage with working tour + hotel + vehicle search tabs
- Tour listing with filters
- Tour package detail with booking widget
- Tour checkout (4 steps + confirmation)
- Auth: register, login, email verification
- Account: tour booking history, voucher download
- Destination pages (minimum 10 destinations)
- Blog (minimum 5 articles)
- Legal pages: privacy, terms, refund policy
- WCAG AA compliance verified
- Mobile responsive verified across devices
- Core Web Vitals targets met
- SEO: sitemap, schema, meta tags on all pages

### 13.2 Phase 2 (Hotel Module)

- Hotel search with full filter sidebar
- Hotel property detail page with room selector
- Hotel booking checkout (3 steps + confirmation)
- Pre-arrival upsell forms
- Account: hotel reservation history + check-in QR
- Hotel provider directory and profiles
- Map-based hotel search

### 13.3 Phase 3 (Vehicle Module)

- Vehicle search (self-drive + chauffeured tabs)
- Vehicle detail page with protection plan selector
- Vehicle booking checkout (3 steps + confirmation)
- Chauffeured transfer routes and booking
- Live driver tracking interface
- Account: rental history + agreements
- Multi-language support
- PWA manifest for mobile browser install

---

## 14. Development Checklist (per astrojs.md standards)

Before any new page or feature is merged:

- [ ] Server vs Client: Are controllers strictly server-side? Not imported in `<script>` tags?
- [ ] No inline styles: All styling in `.astro` component style blocks using CSS variables
- [ ] SVG assets: Inline SVG or `.astro` SVG components — not `<img>` tags for icons
- [ ] UX analysis: Was behavior analyzed before layout was designed?
- [ ] Hydration directive: Is the least aggressive `client:*` directive used?
- [ ] Accessibility: Focus management, ARIA roles, accessible names verified?
- [ ] Performance: No layout-triggering animation properties used?
- [ ] SEO: Title, meta description, schema, OG tags present?
- [ ] Responsive: Verified on mobile, tablet, desktop?
- [ ] Reduced motion: Respected in all animations?
- [ ] Token usage: All colors/spacing/radii from CSS variables — no hardcoded values?
- [ ] Empty states: All list views have empty state defined?
- [ ] Error states: All async operations have error handling UI?
- [ ] Loading states: Skeleton loaders matching final dimensions?

---

*Document Owner: Sultanul Arefin | Last Updated: September 2026 | Version: 2.0*
*Related: brand-guidelines.md | traveller.md | hotel-and-vehicle-booking.md | context/website/travellerai-design-system.md | context/website/astrojs.md*
