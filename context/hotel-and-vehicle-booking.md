# Product Requirements Document (PRD)
# Traveller AI — Hotel & Vehicle Multi-Modal Booking Systems
## Full-Featured Enterprise Expansion to the Unified Multi-Provider Travel Marketplace

---

> **Document Version**: 2.0 — Enterprise Edition  
> **Status**: Approved for Engineering & Architecture Planning  
> **Author / Product Architect**: Sultanul Arefin  
> **Prepared**: September 14, 2026  
> **Target Stack**: `backend/api` (Hono, Drizzle ORM, CockroachDB, Cloudflare Workers) & `frontend/dashboard` (Angular 19, TailwindCSS, Spartan UI, SignalStore)  
> **Research Sources**: OpenTravel Alliance (OTA), ACRISS Vehicle Standards, Hotel Tech Report 2025, HospitalityNet, RevFine, RateGain, Limo Anywhere, Transfervista, Moovs, 6AM Mart  
> **Companion PRD**: [`context/traveller.md`](file:///d:/Test/travellerai/context/traveller.md)

---

## 1. Executive Summary

This document defines the complete product, functional, operational, and technical requirements for expanding **Traveller AI** into a fully-featured, enterprise-grade **hospitality and ground transportation commerce platform**.

The expansion adds two modular engines — each capable of operating independently or deeply embedded within multi-day tour packages and custom trip inquiries:

### Module A — Hotel & Accommodation Property Management System (PMS)
A cloud-native, multi-property hospitality management engine covering the full guest lifecycle: pre-arrival upselling, contactless check-in, room rack management, dynamic revenue optimization (RevPAR, GOPPAR, ADR), OTA channel synchronization, housekeeping workflows, guest folio incidentals, and post-stay review collection. The system is engineered to the **OpenTravel Alliance (OTA 2017B)** rate plan hierarchy standard and incorporates AI-driven yield management and dynamic pricing automation found in leading enterprise platforms like Oracle OPERA, Cloudbeds, Mews, and Hotelogix.

### Module B — Vehicle & Multi-Modal Fleet Management & Rental System (FMS)
A comprehensive ground transportation platform supporting the full fleet lifecycle: vehicle asset registration, insurance and compliance document tracking, dual operational models (self-drive rentals + chauffeured dispatch), digital pre/post-rental condition inspection with photo markup, real-time GPS chauffeur tracking with flight monitoring for airport transfers, protection plan upselling (CDW/LDW), driver expense logging, and security deposit management. Inspired by enterprise platforms including Rentgine, Nomora, Limo Anywhere, Moovs, and 6AM Mart.

---

## 2. Strategic Business Goals

| Goal | Hotel Module | Vehicle Module |
| :--- | :---: | :---: |
| Maximize ancillary revenue per booking | ✅ Pre-arrival upsells, incidentals, F&B posting | ✅ Protection plans, extras, driver allowances |
| Eliminate overbookings & double allocations | ✅ Real-time pooled inventory calendar | ✅ Live vehicle allocation lock |
| Automate financial reconciliation | ✅ Guest folio → wallet → withdrawal | ✅ Rental charge → extras → deposit release |
| Multi-property / multi-fleet ownership | ✅ Chain / group management | ✅ Multi-depot fleet operator |
| Enable B2B wholesale and package bundling | ✅ Net hotel rates for travel agents | ✅ Block vehicle hire for tour operators |
| Verified review and reputation management | ✅ Per-dimension stay reviews | ✅ Vehicle condition + driver quality reviews |

---

## 3. Multi-User Multi-Dimensional Access Control (RBAC + SBAC)

The platform implements **Role-Based Access Control (RBAC)** combined with **Scope-Based Access Control (SBAC)** ensuring every user operates within their authorized tenant boundary, property scope, and data domain. Access is enforced at the API route, data query, and UI navigation level.

### 3.1 Platform & Admin Roles

| Role | Key | Full Scope & Authorized Actions |
| :--- | :--- | :--- |
| **Super Administrator** | `super_admin` | Unrestricted global platform access. Approves or suspends hotel and vehicle provider accounts. Reviews and overrides KYC documents, vehicle roadworthiness certificates, and insurance filings. Configures platform-wide commission rates by property type and vehicle category. Arbitrates guest-host disputes with the ability to force-issue full or partial refunds. Manages platform-level blackout dates and rate parity enforcement policies. Accesses all audit logs, financial summaries, and security incident trails. |
| **Platform Operations & Support Agent** | `support_agent` | Cross-tenant read access to reservations, check-in/check-out queues, vehicle handover logs, and driver dispatch boards. Executes manual cancellations, re-allocation of alternative rooms, and emergency driver reassignments. Opens and manages dispute tickets on behalf of travelers or providers. Cannot modify rate plans, vehicle pricing, or commission structures. |

### 3.2 Hospitality / Hotel Roles

| Role | Key | Full Scope & Authorized Actions |
| :--- | :--- | :--- |
| **Hotel Owner / General Manager** | `hotel_owner` | Manages one or multiple owned properties within the platform tenant boundary. Registers and configures property profiles, room types, rate plans, seasonal yield rules, OTA channel mappings, and cancellation policies. Views property-level revenue analytics: Occupancy Rate, ADR, RevPAR, GOPPAR, booking pace, and channel contribution. Manages front desk and housekeeping staff accounts within their properties. Initiates wallet withdrawals for earned net revenue after platform commission deductions. Responds to property reviews. |
| **Reservations Manager** | `reservations_manager` | Creates, modifies, and cancels reservations on behalf of guests (walk-ins, phone, corporate). Applies negotiated corporate or group rates. Manages group block contracts with rooming lists. Processes manual payment collections and issues credit card authorization forms. Cannot modify rate plan base pricing. |
| **Hotel Front Desk & Reception Agent** | `front_desk` | Manages the live daily operations desk: expected arrivals, in-house guests, and scheduled departures. Verifies guest identity and scans reservation QR code at check-in. Assigns specific clean room units to incoming reservations. Generates and issues digital room access PINs or physical keycards. Posts incidental charges to the guest folio (minibar, room service, laundry, late checkout). Processes cash, card, or credit account settlements at checkout. Handles early departure requests and extensions. |
| **Housekeeping Supervisor & Attendant** | `housekeeping` | Mobile-first interface displaying a real-time room status board for assigned floor sections. Updates room status (`dirty`, `cleaning_in_progress`, `inspected`, `clean`, `out_of_order`) by scanning room QR codes. Uploads maintenance issue photos with GPS-tagged geolocation and auto-routes to the maintenance team. Views priority queue: rooms with imminent check-ins. Cannot access guest personal data or pricing information. |

### 3.3 Vehicle / Fleet Roles

| Role | Key | Full Scope & Authorized Actions |
| :--- | :--- | :--- |
| **Fleet Owner / Vehicle Operator** | `fleet_owner` | Registers and manages a fleet of vehicles across single or multiple depot locations. Uploads vehicle certificates: registration card, insurance policy, fitness/roadworthiness certificate, commercial vehicle permit. Configures per-vehicle and per-category pricing plans (daily rates, hourly rates, per-km overage charges, deposit amounts). Views fleet-level performance analytics: utilization rate, revenue-per-vehicle, maintenance cost-per-km, and idle asset report. Initiates rental earnings withdrawal to bank account. |
| **Fleet Dispatcher / Rental Manager** | `dispatcher` | Central operations console for booking allocations, vehicle handovers, and driver assignments. Assigns available, eligible vehicles to confirmed reservations. Assigns and dispatches qualified drivers to chauffeured transfers and multi-day hires. Executes digital pre-handover inspection (vehicle condition markup, odometer, fuel level, digital signature). Processes vehicle returns: post-return inspection, excess mileage calculation, fuel deficit charges, damage assessment, and deposit release or partial deduction. |
| **Driver / Chauffeur / Local Pilot** | `driver` | Dedicated mobile-optimized PWA driver console. Views upcoming confirmed trip assignments with passenger name, pickup time, location coordinates, and flight number. Navigates to pickup with deep-link integration to Google Maps / Waze. Verifies passenger boarding via 4-digit OTP or QR scan to officially start the trip and timestamp it. Logs on-trip expenses with photo receipts: tolls, state border fees, parking, fuel. Ends trip and triggers automatic billing and traveler receipt delivery. Views earnings history and withdrawal balance. |

### 3.4 Consumer & Partner Roles

| Role | Key | Full Scope & Authorized Actions |
| :--- | :--- | :--- |
| **Traveler / Guest / Renter** | `traveler` | Searches properties with rich multi-attribute filters: star rating, meal plan, pool, Wi-Fi, pet-friendly, proximity, check-in time. Searches vehicles with filters: type, seating capacity, transmission, fuel, self-drive vs. with-driver, pickup location. Books hotel stays (single or multi-room, multi-guest, special requests). Books self-drive vehicle rentals with protection plan selection. Books chauffeured transfers or full-day hires. Tracks live driver location via GPS link pre-departure. Downloads hotel vouchers, vehicle rental agreements, and receipts. Submits verified post-stay property reviews and post-trip vehicle/driver reviews. |
| **B2B Travel Agent** | `travel_agent` | Accesses a dedicated B2B booking portal with negotiated net hotel rates and fleet corporate rates. Creates group hotel block bookings with per-room rooming lists. Bundles hotel nights and vehicle rentals into custom multi-item quotation proposals. Monitors commission accruals on closed bookings. Can book on behalf of any traveler in their client portfolio. |
| **Affiliate / Referral Partner** | `affiliate` | Generates referral tracking links embedding hotel properties and vehicle listings. Monitors click, booking conversion, and earned commission dashboards per referred product. |

---

## 4. Module A — Enterprise Hotel & Accommodation Booking System

### 4.1 Property Diversity & Classification

Properties registered on the platform are classified into the following types, each with category-specific required fields:

| Type Code | Category Label | Description & Examples |
| :--- | :--- | :--- |
| `hotel` | Hotel | Traditional full-service hotels with 24/7 front desk, bell service, and dedicated room categories. Marriott, Hilton-style. |
| `resort` | Resort | Destination properties with multiple accommodation wings, multiple F&B outlets, recreational activities (pools, water sports, fitness), and often all-inclusive meal plans. |
| `boutique_hotel` | Boutique Hotel | Uniquely designed properties with 10–100 rooms, independent ownership, curated design aesthetic, and signature local character. |
| `eco_lodge` | Eco-Lodge / Nature Retreat | Sustainable, low-impact accommodations embedded in natural settings: national park buffer zones, mountain valleys, river banks. Solar-powered, organic F&B, guided nature activities. |
| `homestay_guesthouse` | Homestay / Guesthouse | Family-hosted accommodations. Local heritage homes, bed-and-breakfasts, rural farmstays. Shared common areas, home-cooked meals available, cultural immersion focus. |
| `serviced_apartment` | Serviced Apartment | Self-catering studio, 1BR, 2BR, and 3BR apartment units with fully equipped kitchens, weekly housekeeping, and residential amenities. Ideal for long-stay corporate and leisure travelers. |
| `hostel` | Hostel / Social Lodging | Mixed and female-only dormitory beds and private rooms for budget-conscious and social travelers. Shared bathrooms, common lounge, kitchen access, and organized social events. |
| `camp_glamping` | Glamping / Camp Experience | Elevated outdoor accommodation: luxury safari tents, geodesic domes, floating lodges, container homes, and yurt villages with premium bedding, private bathrooms, and curated wilderness experiences. |

### 4.2 Property Profile Configuration

Each registered property requires the following fully configured data before going live:

**Legal & Compliance Data:**
- Legal property name (as registered with local municipality)
- Business registration / company number
- Tourism and hospitality operating license number and expiry date
- VAT/GST registration number (if applicable)
- Property classification certificate (star rating authority document)

**Location Intelligence:**
- Precise GPS coordinates (latitude, longitude) for map embedding and distance searches
- Full street address with postal code, district/sub-district, city, state/province, and country
- Location tags: Within city center (km), airport proximity (km), beach proximity (km), public transit proximity (km)
- Landmark proximity tags (e.g., "2 minutes from Eiffel Tower", "300m from Cox's Bazar Beach")

**Operational Configuration:**
- Check-in window: Start time to cutoff time (e.g., 14:00–22:00), plus 24-hour self-check-in flag for digital key properties
- Check-out deadline (e.g., 11:00) with paid late checkout surcharge option
- Reception languages spoken
- Property-level guest policies:
  - Minimum guest age (adult-only flag with 18+ restriction)
  - Child age brackets: Infant (0–2), Child (3–11), Adult (12+)
  - Maximum children per adult room without extra charge
  - Pet policy: Not Allowed / Small Pets (under 10kg) on Request / All Pets Welcome
  - Smoking policy: Non-Smoking Entire Property / Designated Outdoor Areas / Smoking Rooms Available
  - Noise/quiet hours: e.g., 22:00–08:00
  - Event/party policy: Not Permitted / With Permission / Licensed Event Space
  - Damage deposit policy and pre-authorization amount

**Media & Content:**
- Hero cover image (required, minimum 1920×1080px)
- Full property photo gallery (minimum 12 images across: exterior, lobby, room categories, pool, F&B, spa, views)
- Aerial/drone view photos or video walkthrough (optional premium listing feature)
- Property description (short: 120 chars for search cards, full: up to 2,000 words for listing page)

**Amenities & Facilities Catalog:**
Standardized amenity tags organized by category:

| Category | Amenity Examples |
| :--- | :--- |
| Connectivity | High-speed fiber Wi-Fi (free), Wi-Fi (paid), Ethernet port in room, Business center |
| Wellness & Recreation | Outdoor pool, Indoor heated pool, Infinity pool, Jacuzzi, Fitness center, Yoga studio, Tennis court, Golf course access |
| Dining & Drinks | On-site restaurant (buffet, à la carte), Bar and lounge, Rooftop restaurant, In-room dining (24h), Minibar, Halal-certified kitchen, Vegan menu, Kosher-certified meals |
| Accessibility | Wheelchair accessible rooms, Elevator access, Braille signage, Hearing loop |
| Business | Meeting rooms (capacity), Conference hall, AV equipment rental, Secretarial services |
| Guest Services | 24/7 concierge, Luggage storage, Laundry service, Airport shuttle (complimentary / paid), Tour desk, ATM on-site, Currency exchange |
| Transport | Free parking (on-site), Paid parking (valet), EV charging stations, Bicycle rental, Car rental desk |
| Family | Kids club, Babysitting on request, Children's pool, Cot/crib available |

---

### 4.3 Room Type Inventory Management

Each property defines multiple **Room Types** representing a class of physically identical rooms.

**Room Type Profile:**
- Display name (e.g., "Deluxe Mountain View King", "Premium Oceanfront Suite", "4-Bed Shared Dormitory", "Executive Studio with Kitchenette")
- Internal room type code (e.g., `DLX-KNG-MNT`, `SUP-OCN-STE`)
- Room size in square meters (m²) and square feet (ft²)
- Number of physically identical units of this type in the property
- Floor level availability range (e.g., available on floors 3–8)

**Occupancy Architecture:**
- Standard adult capacity
- Maximum adult capacity (with extra bed)
- Maximum child capacity (without extra bed)
- Maximum total occupancy
- Extra bed availability (Yes/No)
- Extra bed nightly surcharge amount and currency
- Infant crib availability (Yes/No) and maximum crib count

**Physical Room Attributes:**
- Bed configuration options:
  - King, Queen, Double, Twin, Single, Bunk Bed, Sofa Bed, Murphy Bed
  - Multiple bed layout variants (e.g., 1 King + 1 Sofa Bed)
- Bathroom type: Private en-suite shower only / Private en-suite bath + shower / Shared bathroom (hostel)
- Bathroom premium features: Rainfall shower, Freestanding bathtub, Dual vanity, Heated towel rail
- View type: Mountain view, Ocean/Sea view, Garden view, Pool view, City skyline view, Courtyard/Atrium view, Interior/No view
- Balcony/terrace availability

**In-Room Amenities Tags:**
Air conditioning (split/central), Smart TV (size + streaming apps), Satellite/cable TV, Streaming device (Apple TV/Chromecast), Electronic in-room safe, Minibar (stocked), Espresso machine (Nespresso/Lavazza), Electric kettle, Coffee maker, Iron & ironing board, Hair dryer, Luxury bath amenities brand, Bathrobes & slippers, Work desk with ergonomic chair, Soundproofed windows, Blackout curtains.

**Accessibility (ADA / inclusive):**
- Roll-in shower with grab bars
- Lowered beds and accessible bathroom fixtures
- Visual smoke/fire alarms
- Braille or large-print menus available on request

**Room Media:**
- Room type hero image and full gallery (minimum 8 photos per type, covering: room layout, bathroom, balcony/view, desk area)
- Floor plan diagram image (optional but significantly increases booking conversion)

---

### 4.4 Rate Plan Engine (OpenTravel Alliance OTA Standard)

The system adopts the industry-standard **OTA RatePlan hierarchy** with enterprise yield management overlays.

#### 4.4.1 Rate Plan Types

| Code | Plan Name | Description |
| :--- | :--- | :--- |
| `bar` | Best Available Rate | Standard rate with moderate cancellation flexibility (e.g., free cancellation up to 48h before arrival). The baseline benchmark for all other plan comparisons. |
| `non_refundable` | Non-Refundable Rate | Discounted rate (typically 10–20% below BAR). Zero refund upon cancellation regardless of notice period. Maximizes advance revenue certainty. |
| `breakfast` | Bed & Breakfast | Room rate inclusive of daily breakfast for all declared occupants. Breakfast defined as: Continental, American Buffet, Full English, or Hotel Signature. |
| `half_board` | Half Board (BB + Dinner) | Room inclusive of daily breakfast AND one dinner service per declared occupant. |
| `full_board` | Full Board | Room inclusive of daily breakfast, lunch, and dinner for all declared occupants. |
| `all_inclusive` | All-Inclusive | Room inclusive of all meals, selected beverages (alcoholic and non-alcoholic), selected recreation activities, and designated resort facilities. |
| `extended_stay_7` | Weekly Stay Discount | Automatic tiered discount (e.g., 12% off) applied for consecutive stays of 7+ nights. |
| `extended_stay_30` | Monthly Stay Discount | Automatic tiered discount (e.g., 25% off) applied for consecutive stays of 30+ nights. |
| `early_bird_90` | Early Bird (90-Day Advance) | Discounted rate for bookings made 90+ days before check-in. Non-refundable or semi-flexible. |
| `last_minute_48` | Last Minute Deal | Discounted rate available within 48 hours of check-in to fill unsold inventory. |
| `corporate_negotiated` | Corporate / B2B Net Rate | Private negotiated rate accessible only to verified corporate accounts and B2B travel agents. |
| `package_bundled` | Package Rate | Rate applicable when the room is bundled as a component within a multi-day tour package or custom quotation. |

#### 4.4.2 Dynamic Pricing & Yield Management

The revenue engine tracks and adjusts pricing based on multiple demand signals:
- **Occupancy Threshold Pricing**: Prices automatically increase by a configurable multiplier (e.g., 1.15×) when property-wide occupancy exceeds 70%, and again at 85%.
- **Booking Pace Triggers**: If bookings for a specific date window are running ahead of historical pace, rates increase by a configured step amount.
- **Demand Calendar**: Property owner can define custom demand labels per date (Low / Standard / High / Peak / Holiday) with corresponding multiplier overrides.
- **Competitor Rate Benchmarking** (future phase): Integration with rate intelligence feeds to display market positioning.
- **KPI Dashboard**: Tracks ADR (Average Daily Rate), RevPAR (Revenue per Available Room), GOPPAR (Gross Operating Profit per Available Room), TRevPAR (Total Revenue per Available Room), Occupancy Rate %, Booking Pace, and Channel Contribution Mix.

#### 4.4.3 Inventory Restrictions & Availability Rules (Per Room Type Per Date)

| Restriction | Code | Description |
| :--- | :--- | :--- |
| **Minimum Length of Stay** | `MLOS` | Mandatory minimum consecutive night requirement (e.g., "Min 3 nights required for December 24–26 check-in"). Prevents single-night cherry-picking during peak demand. |
| **Maximum Length of Stay** | `MaxLOS` | Upper cap on reservation duration for specific dates (e.g., max 7 nights for high-turnover budget properties). |
| **Closed to Arrival** | `CTA` | Blocks new check-in attempts on that date while allowing guests already booked for a longer stay to include it as a pass-through night. Used on high-demand peak dates. |
| **Closed to Departure** | `CTD` | Blocks check-outs scheduled on a specific date, ensuring no room turnover is required. Used strategically on dates where housekeeping is at minimum capacity. |
| **Stop Sell** | `stop_sell` | Instantly closes the room type from all booking channels without reducing physical inventory count. Used as an override for group blocks, VIP holds, or technical issues. |
| **Rate Override** | `date_rate_override` | Flat or multiplied price override for a specific date or date range, overriding the standard rate plan calculation. Used for holidays, events, and last-minute promotions. |

#### 4.4.4 Taxes, Fees & Transparent Itemization

Every booking confirmation and guest folio displays a fully itemized breakdown:
- **Base room rate** (per night × nights)
- **Meal plan surcharge** (per person per night, if applicable)
- **City / Tourist Tax** (per person per night — municipal requirement, e.g., Paris €5/person/night)
- **VAT / GST / Service Tax** (percentage applied to base room rate)
- **Cleaning / Facility Fee** (one-time per-stay charge, if configured by property)
- **Resort / Amenity Fee** (per night surcharge at resorts covering pool towels, activities, Wi-Fi)
- **Extra Bed Fee** (per extra bed per night)
- **Security Deposit Pre-Authorization** (if applicable, clearly marked as a hold not a charge)

---

### 4.5 OTA Channel Management & Distribution

**Multi-Channel Inventory Synchronization:**
- The system maintains a **single pooled inventory** model: one total count of available rooms per type per date.
- When a booking is received from any channel (platform direct, Booking.com, Expedia, Agoda, or API partner), the pooled count is decremented instantly across all connected channels to prevent overbooking.
- **Supported Distribution Protocols**: The system exposes OTA-compatible REST APIs that channel managers (SiteMinder, Cloudbeds, Beds24, or native integration) can connect to for automated rate-parity push and availability pull.

**Direct Booking Advantage:**
- Properties can configure exclusive "Direct-Only" perks visible only on the Traveller AI platform (e.g., complimentary early check-in, free room upgrade subject to availability, loyalty points multiplier) to incentivize bypassing OTA commissions.

---

### 4.6 Guest Journey & Reservation Lifecycle

#### 4.6.1 Booking State Machine
```
search_results
    ↓
room_selected → inventory_held (15-minute reservation lock)
    ↓
payment_processing → payment_failed (release lock) | payment_succeeded
    ↓
confirmed ← direct booking / corporate account / pay-at-hotel approval
    ↓
pre_arrival (48h before) → upsell_email_sent
    ↓
checked_in → in_house
    ↓
checked_out → post_stay
    ↓
completed ← review request sent
          ← no_show (if guest fails to arrive)
          ← cancelled (if cancelled pre-arrival within policy)
```

#### 4.6.2 Pre-Arrival Guest Communication Sequence
Research indicates the 48–72 hour pre-arrival window achieves 15–25% upsell conversion vs. 2–5% at front desk:

- **+48h before check-in**: Automated personalized pre-arrival email with:
  - Booking summary with QR code and digital voucher
  - Room upgrade offer (e.g., "Upgrade to Ocean Suite for $25/night")
  - Early check-in purchase option (e.g., "Guarantee 10:00 AM arrival for $30")
  - Breakfast add-on offer (if not already included)
  - Property guide (house rules, parking instructions, dining hours, Wi-Fi password)
  - Option to pre-order airport transfer from the vehicle module

- **+24h before check-in**: Express contactless check-in prompt:
  - Guest submits ID photo and selfie for identity verification
  - Guest selects preferred room features if multiple same-type rooms available
  - Guest opts into digital room PIN vs. physical keycard collection at desk

#### 4.6.3 Digital Check-In & Room Access

**Contactless / Self Check-In:**
- Guest arrives and scans a lobby QR code (or receives a push notification) that opens the digital check-in flow
- System confirms identity match from pre-arrival ID upload
- Front desk agent confirms clean room assignment (or it's automated if room is marked `clean`)
- System issues a **6-digit digital room access PIN** or sends **Bluetooth/NFC digital key** to the guest's phone
- Guest proceeds directly to room without waiting at the front desk

**Front Desk Assisted Check-In:**
- Agent searches reservation by name, booking reference, or QR scan
- Views complete guest dossier: booking details, stay history, preferences, outstanding balance
- Assigns room number from the list of clean, inspected, unoccupied units of the correct type
- Issues keycard and provides printed arrival registration card

#### 4.6.4 Guest Folio (Incidental Charges)
The guest folio is a running balance of all charges accumulated during the stay, separate from the pre-paid room rate:

| Charge Category | Examples |
| :--- | :--- |
| **Food & Beverage** | Room service orders, Restaurant dining (sign to room), Minibar consumption |
| **Spa & Wellness** | Spa treatment bookings, Gym day pass, Pool towel hire |
| **Laundry & Valet** | Same-day laundry, Dry cleaning, Shoe shine |
| **Business Services** | Meeting room hire, Printing, Secretarial services |
| **Miscellaneous** | Damage assessment, Late checkout fee, Lost keycard replacement |
| **Transportation** | Airport transfer (charged via vehicle module), Bicycle hire |

The folio settles automatically against the pre-authorized card at checkout or the guest pays at front desk. Outstanding balance triggers an **underpayment alert** to the front desk agent.

---

### 4.7 Housekeeping Operations Module

**Room Status State Machine:**
```
vacant_dirty → cleaning_in_progress → inspected → clean (available for assignment)
occupied → do_not_disturb (DND flagged) → dirty (on checkout)
out_of_order → maintenance_scheduled → maintenance_complete → inspected → clean
```

**Housekeeping Board Features:**
- Color-coded visual room rack organized by floor/wing
- Priority queue automatically highlighting rooms with same-day arrivals (due for turnover first)
- QR code scanning on room door trigger status update from the attendant's mobile device
- Damage reporting: Photo upload with structured damage category tag (wall damage, broken fixture, soiled linen, missing item) automatically routes to maintenance ticket
- Linen change tracking: Number of sets consumed per room per day (useful for linen cost reporting)
- Inspector sign-off: Housekeeping supervisor performs final room inspection and marks `inspected` before front desk can assign

**Maintenance Ticket System:**
- Any housekeeping attendant or front desk agent can raise a maintenance ticket
- Ticket captures: Room number, damage category, severity, photo proof, reporter ID, timestamp
- Ticket auto-escalates if not acknowledged within 2 hours
- Resolved tickets log: Repair description, technician name, materials cost, resolution timestamp
- Chronic issue tracking: Rooms with 3+ maintenance tickets in 30 days are flagged for property manager review

---

### 4.8 Property Revenue Analytics Dashboard

**KPI Summary Card Row:**
- Total Reservations (Tonight)
- Property Occupancy Rate (%) for current month vs. prior month
- Average Daily Rate (ADR) — current month vs. prior year same period
- RevPAR (Revenue per Available Room) — current month trend line
- GOPPAR (Gross Operating Profit per Available Room)
- Total Room Revenue vs. Total Ancillary Revenue (F&B + Extras)

**Visual Analytics Panels:**
- Booking pace chart: Reservations-on-books for next 30/60/90 days vs. same period prior year
- Channel contribution pie chart: Direct vs. Booking.com vs. Expedia vs. API partners
- Room type performance table: Units sold, ADR, and revenue contribution per room type
- Cancellation analysis: Cancellation rate trend, cancellation reasons breakdown
- Guest origin report: Top 10 source countries and cities by booking volume

---

### 4.9 Hotel Module Database Schema (13 Tables)

| # | Table | Purpose |
| :--- | :--- | :--- |
| 1 | `hotel_properties` | Core property records with full metadata, geo-coordinates, policy configuration |
| 2 | `property_amenities` | Normalized amenity tags per property with category grouping |
| 3 | `room_types` | Room category definitions with occupancy limits, bed configs, view types, amenities |
| 4 | `room_units` | Individual physical room numbers with floor, wing, housekeeping status, and current occupancy status |
| 5 | `rate_plans` | Pricing strategy records per room type including plan type, base amount, cancellation policy |
| 6 | `inventory_calendar` | Per room type per date: available count, booked count, stop_sell flag, MLOS, CTA, CTD, rate multiplier |
| 7 | `hotel_bookings` | Master guest reservation records with full financial breakdown, payment and booking status |
| 8 | `hotel_booking_rooms` | Line-item rooms within a multi-room reservation (rate plan, assigned unit, lead guest per room) |
| 9 | `hotel_guest_folio` | Running tab of incidental charges per booking posted during the stay |
| 10 | `hotel_maintenance_tickets` | Room maintenance issues with severity, photo evidence, technician assignment, resolution log |
| 11 | `hotel_upsell_offers` | Property-configured pre-arrival upsell offer definitions (upgrade offer, early check-in, add breakfast) |
| 12 | `hotel_upsell_conversions` | Records of accepted upsell offers per booking with revenue attribution |
| 13 | `hotel_reviews` | Verified post-stay guest reviews with per-dimension ratings (cleanliness, location, service, facilities, value) and provider responses |

---

## 5. Module B — Enterprise Vehicle & Multi-Modal Fleet Booking System

### 5.1 Fleet Taxonomy & Multi-Modal Vehicle Classification

The platform operates a fully inclusive, multi-modal vehicle registry supporting global and regionally-specific transport categories:

#### Category 1: Four-Wheelers (Cars, SUVs, Passenger Vans & Coaches)

| Sub-Category | Vehicle Examples | Typical Seating | Ideal Use Case |
| :--- | :--- | :---: | :--- |
| Economy Sedan | Toyota Vios, Hyundai i20, VW Polo | 4–5 | Daily self-drive city rental, business point-to-point |
| Compact / Hatchback | Honda Jazz, Suzuki Swift, Mini Cooper | 4–5 | Urban self-drive, short-trip rental |
| Midsize Sedan | Toyota Camry, Honda Accord, Skoda Octavia | 5 | Corporate transfers, airport pickup |
| Premium Sedan | BMW 5-Series, Mercedes E-Class, Audi A6 | 4–5 | Executive airport transfers, business events |
| Compact SUV / Crossover | Toyota RAV4, Honda CR-V, Hyundai Tucson | 5 | Small family vacation self-drive |
| Full-Size SUV / 4x4 | Toyota Land Cruiser, Jeep Wrangler, Mitsubishi Pajero | 7–8 | Safari game drives, highland expedition, off-road terrain |
| Luxury SUV | Range Rover, Lexus LX, Cadillac Escalade | 7 | VIP chauffeured service, luxury tourism |
| Minivan (7–8 Seat) | Toyota Alphard, Hyundai Staria, Kia Carnival | 7–8 | Family group travel, premium airport transfers |
| Minibus (12–16 Seat) | Toyota HiAce Super Long, Nissan Urvan | 12–16 | Group airport transfer, hotel shuttle, school trips |
| Tourist Microbus | Mercedes Sprinter, Ford Transit LWB | 16–20 | Tour groups, corporate event shuttle |
| Tourist Coach (24–45 Seat) | Mercedes Tourismo, Higer Klq6129 | 24–45 | Multi-day group tours, convention transfers |

**ACRISS-Inspired Vehicle Attribute Matrix:**
- **Transmission**: `automatic` / `manual`
- **Fuel Type**: `petrol` / `octane` / `diesel` / `hybrid_petrol` / `hybrid_diesel` / `full_electric` / `cng` / `lpg`
- **Drive Train**: `2WD` / `AWD_4x4`
- **Air Conditioning**: `climate_control` / `manual_ac` / `none`
- **Luggage Capacity**: Small bags count / Large bags count
- **Special Features**: Panoramic sunroof, Integrated child seat, Wheelchair ramp, Refrigerator, Wi-Fi hotspot, Dashcam, GPS navigation system

#### Category 2: Two-Wheelers (Motorcycles & Scooters)

| Sub-Category | Examples | Engine Range | Target Renter |
| :--- | :--- | :---: | :--- |
| Commuter Scooter | Honda Activa, Yamaha NMAX, Honda Dio | 110cc–150cc | Day trip island explorer, tourist city circuit |
| Premium Scooter | Vespa GTS 150, Honda PCX 160, Yamaha Aerox | 150cc–160cc | Style-conscious tourist, semi-long-distance day ride |
| Adventure Touring Bike | Royal Enfield Himalayan, Kawasaki Versys 300 | 250cc–300cc | Mountain pass trekking, scenic route touring |
| Long-Distance Tourer | KTM Duke 390, Honda CB500X | 390cc–500cc | Multi-day independent motorcycle touring |
| Large Tourer | BMW R1250GS, Harley Sportster | 650cc–1200cc | Experienced rider long-haul self-guided expeditions |
| Electric Scooter | Ather 450, Ola Electric S1, NIU NQi | Battery-powered | Eco-conscious urban traveler, emission-free zone compliant |
| Electric Bicycle | XCape E-Bike, Trek Allant+, Specialized Turbo Vado | Pedal-assist | Cycling route explorer, physically limited traveler |

**Included Equipment (per vehicle):**
- Safety helmets (quantity: 1 primary + 1 optional pillion)
- Handlebar phone mount bracket
- Under-seat toolkit (tyre levers, basic wrenches)
- Bungee cord net for luggage
- Emergency rain poncho (per helmet count)
- Reflective visibility vest (for overnight and highland riding)

#### Category 3: Local Three-Wheelers (CNG Auto-Rickshaws, TukTuks & Electric Easy-Bikes)

| Sub-Category | Examples | Fuel/Power | Seating | Typical Use |
| :--- | :--- | :---: | :---: | :--- |
| CNG Auto-Rickshaw | Bajaj RE CNG, Piaggio Ape | CNG (4-stroke) | 3 passengers | Heritage city circuit, coastal village tour, station/resort transfer |
| TukTuk / Motorized Rickshaw | Thailand TukTuk, India Auto | Petrol/Electric | 3 passengers | Scenic panoramic open-air rides, cultural quarter tours |
| Electric Easy-Bike | Chinese e-rickshaw, TATA Nexon e | Electric (Li-ion battery) | 3–4 passengers | Silent low-emission inner-city mobility, eco resort transfers |
| Cycle Rickshaw | Traditional paddle-powered | Human-powered | 2 passengers | Heritage old-town tours, slow scenic meanders, photography experiences |

---

### 5.2 Vehicle Asset Registration & Compliance Management

Every vehicle must pass a multi-step onboarding verification before becoming bookable:

**Vehicle Identity:**
- Make, model, year of manufacture, variant/trim
- Vehicle color (primary and secondary)
- License/registration plate number
- VIN (Vehicle Identification Number) / Chassis Number
- Engine number
- Fuel type and engine displacement (cc)

**Legal Compliance Documents (all with expiry date tracking):**
- Vehicle registration card / Log book
- Insurance certificate (with coverage type: third-party / comprehensive)
- Roadworthiness / Fitness certificate
- Commercial vehicle permit (where required for tourist/rental operations)
- Emission compliance certificate (e.g., BS6 compliant, Euro 6 standard)
- CNG-specific: Cylinder hydrostatic test certificate (valid 3 years)
- For coaches: Passenger service vehicle (PSV) license

**Document Expiry Alerts:**
- System flags vehicles 60 days before any document expiry
- Vehicles with expired certificates are automatically suspended from new bookings (status: `compliance_hold`)
- Property owner receives email + in-app notification cascade with days-remaining countdown

---

### 5.3 Dual Rental & Service Models

#### Model 1: Self-Drive Rental

**Billing Options:**
- 24-hour daily block (midnight-to-midnight or rolling 24-hours from pickup time)
- Half-day option (e.g., 6-hour block available for select vehicle classes)
- Weekly flat rate (automatic for 7+ day rentals)
- Custom hourly rate (minimum 4 hours, for scooters and economy cars in select markets)

**Driver Eligibility & License Verification:**
- Government-issued driving license photo capture (front + back)
- AI-assisted OCR validation: extracts name, DOB, license number, issue date, expiry date, and vehicle classes authorized
- International Driving Permit (IDP) requirement flag for non-resident foreign nationals
- Minimum age gates: 21+ for cars, 18+ for scooters (125cc+), 25+ for vehicles over 9 seats
- Maximum age limits: Configurable per vehicle category (some insurers exclude 70+ without medical clearance)

**Security Deposit & Financial Controls:**
- Pre-authorization amount configured per vehicle or per category
  - Economy car: $150–200 hold
  - SUV/4x4: $300–500 hold
  - Motorcycle/scooter: $50–150 hold
  - Microbus/coach: $500–1000 hold
- Hold method: Credit card pre-authorization, debit card hold, or wallet balance freeze
- Release trigger: Automated 48-hour post-return release if no damage charges or traffic fine deductions apply

**Mileage Policy Options (per vehicle):**
- `unlimited`: No distance charge, renter can drive freely within territorial limits
- `capped_daily`: e.g., 150 km/day included; excess billed at $0.25/km
- `per_km`: Pure per-kilometer billing from pickup odometer to return odometer

**Fuel Policy:**
| Policy Code | Description | Renter Impact |
| :--- | :--- | :--- |
| `full_to_full` | Vehicle dispatched with 100% full tank. Must be returned at 100% full. | Renter fills up before return. Non-full return triggers fuel deficit charge calculated at pump price + 20% handling fee. |
| `same_to_same` | Return at same gauge level as documented in pickup inspection. | Any drop in level below the photo-documented gauge level is billed proportionally. |
| `pre_purchase_full` | Renter purchases a full tank upfront at booking. Can return empty. | No anxiety at return. Unused fuel is not refunded. |
| `provider_filled` | Operator is responsible for keeping vehicle fueled. Rate pre-includes fuel. | Simpler for traveler. Higher daily rate. Common for all-inclusive tour packages. |

**Vehicle Protection & Damage Waiver Plans (CDW/LDW):**
Renter can purchase at booking:

| Plan | Coverage | Daily Add-on |
| :--- | :--- | :--- |
| **Basic (Included)** | Standard third-party liability only. Renter is fully responsible for all vehicle damage up to deposit cap. | $0 included |
| **Collision Damage Waiver (CDW)** | Reduces renter liability for collision damage to the vehicle to a defined deductible (e.g., $200 excess). | +$8/day |
| **Loss Damage Waiver (LDW)** | Extends CDW to cover theft of the vehicle in addition to collision damage. Deductible reduced to zero. | +$14/day |
| **Full Zero-Excess Waiver (FDW)** | Full coverage: collisions, theft, glass, tires, undercarriage, interior. Zero deductible. Peace of mind plan. | +$22/day |
| **Roadside Assistance** | 24/7 call center for lockouts, flat tires, dead battery, fuel-out, minor mechanical breakdowns. | +$3/day |

**Optional Rental Add-Ons:**
- Baby/child seat (rear-facing infant, forward-facing toddler, booster)
- In-car GPS navigator device
- Roof rack or luggage carrier
- Ski carrier or bike rack
- Wi-Fi hotspot (unlimited local data)
- Additional authorized driver registration
- Satellite phone (for remote wilderness rentals)

---

#### Model 2: Chauffeured & With-Driver Services

**Service Type Catalog:**

| Code | Service Type | Description |
| :--- | :--- | :--- |
| `airport_transfer_arrival` | Airport Arrival Transfer | Pre-booked pickup: driver meets passenger at arrivals terminal with name placard. Includes real-time flight tracking — driver is dispatched automatically based on actual landing time, not scheduled time. Includes 60 minutes complimentary waiting time after landing. |
| `airport_transfer_departure` | Airport Departure Transfer | Pickup from hotel/accommodation to airport departure terminal. Includes 1 large and 2 cabin bag allowance (additional luggage surcharge applies). |
| `intercity_transfer` | Intercity Express Transfer | Fixed-rate, point-to-point service between designated cities or tourist zones (e.g., Dhaka ↔ Sylhet, Cox's Bazar ↔ Bandarban, Geneva ↔ Zermatt). Fares pre-defined per vehicle class. |
| `hourly_city_charter` | Hourly City Charter | Full dedicated use of vehicle and driver within a defined metropolitan boundary. Available in 4h, 8h, and 12h blocks. Includes multiple stops. |
| `full_day_tour` | Full Day Tour Driver (8h) | 8-hour full-day private driver and vehicle for tourist exploration. Driver acts as local guide and assistant. |
| `multi_day_outstation` | Multi-Day Driver Hire | 2+ consecutive days with the same driver-vehicle pair. Includes per-night driver accommodation and meal allowance ($25–40/night, clearly itemized). |
| `event_transfer` | Event & Group Transfer | Shuttle services for conferences, weddings, corporate events, airport group arrivals. Managed as a transfer fleet block. |

**Real-Time Flight Tracking for Airport Transfers:**
- Operator enters passenger's inbound flight number at booking
- System monitors live flight status via aviation data feed
- If flight is delayed or lands early, the driver's dispatch time is automatically adjusted
- Driver receives push notification update on the mobile driver app: "Flight XY237 now ETA 14:45 (delayed 55 min). Updated pickup time: 15:30"
- Guest receives proactive notification: "We are monitoring your flight. Your driver will be ready when you land."

**Driver Duty Rules & Allowances:**
- Maximum active driving hours: 10 hours per 24-hour duty cycle (compliance with driver safety standards)
- Mandatory rest break: Minimum 45 minutes after 4.5 consecutive driving hours
- Driver overnight allowance for outstation trips: Configurable per operator ($25–$50/night for accommodation + $15/day for meals)
- Allowance settlement: Platform withholds from operator's earned payout and credits driver wallet, or operator pays driver directly and uploads receipt

---

### 5.4 Digital Vehicle Inspection & Condition Custody System

The inspection system eliminates post-rental disputes through an immutable, timestamped digital custody chain.

#### Pre-Handover Inspection (Pickup)
1. Dispatcher or fleet agent opens the vehicle's inspection form on a tablet or phone
2. Records:
   - Current **odometer reading** (km)
   - **Fuel gauge level** (0–100% slider)
   - **CNG tank pressure** (bar, for CNG vehicles)
3. **8-Point Interactive Damage Map**:
   - Interactive vehicle silhouette diagram with 8 clickable zones:
     - Front bumper, Rear bumper, Hood/Bonnet, Roof, Left-side doors, Right-side doors, Windshield/glass, Wheels & tires
   - Each zone can have multiple damage markers placed precisely at the damage location
   - Each marker captures: Damage type (scratch, dent, crack, chip, discoloration), Severity (minor/moderate/severe), Photo attachment
4. **Timestamped geolocation** attached to each photo (GPS coordinates + timestamp)
5. Both renter and dispatcher provide **digital signature** drawn on the touchscreen
6. System generates and emails a **Pre-Rental Condition Certificate (PDF)** to the renter immediately after signing

#### Post-Return Inspection
1. Vehicle is returned; dispatcher opens the return inspection form
2. Records new odometer and fuel gauge
3. System auto-calculates:
   - Excess distance charge: (return odometer – pickup odometer – free_km_allowance) × rate_per_km
   - Fuel deficit charge: (pickup fuel level – return fuel level) × tank_capacity × fuel_price × 1.20 handling multiplier
4. New damage photos are captured for all 8 zones
5. System overlays pre-rental and post-rental photos side-by-side for each zone for visual comparison
6. **Damage assessment**: If new damage is found (not pre-existing), dispatcher logs estimate and links to repair invoice
7. **Deposit settlement logic**:
   - No damage + no excess charges → Full release within 48 hours, automatic
   - Damage found → Operator raises damage claim; deposit is held pending repair invoice; renter receives notification and has 48 hours to contest
   - Partial charges (excess km + fuel deficit) → Deducted from deposit; remainder released

---

### 5.5 Driver Mobile Console (Progressive Web App)

**Optimized for mobile-first use on Android and iOS. High-contrast design for outdoor visibility.**

**Dashboard Home:**
- Today's trip count and status: Upcoming / Active / Completed
- Next pickup countdown timer with passenger name
- Driver earnings for today and current week

**Trip Detail View:**
- Passenger name, phone number (tap-to-call), and profile photo
- Pickup address with one-tap deep-link to Google Maps or Waze navigation
- Special instructions (e.g., "Meet inside Terminal 2, Arrivals Hall B", "Passenger uses wheelchair")
- Flight number with live status badge (e.g., "Landed 13 minutes ago")

**Trip Execution Flow:**
1. **Depart for Pickup**: Driver taps to mark en-route; timer starts
2. **Arrived at Location**: Driver taps Arrived; passenger receives push notification "Your driver has arrived"
3. **Passenger Verification**: Renter presents 4-digit OTP or app QR code; driver scans or enters OTP to verify and start trip officially (creates audit timestamp)
4. **Trip in Progress**: Driver can log expenses mid-trip:
   - Toll charge (amount + photo of toll receipt)
   - Border/state entry fee (amount + photo)
   - Parking charge (amount + photo)
   - Emergency fuel fill (liters + amount + photo)
5. **Trip Completion**: Driver taps "Complete Trip"
6. Passenger receives instant itemized e-receipt via email and push notification
7. Driver's earnings for the trip are credited to wallet balance

**Expense Reimbursement:**
- All logged expenses with photo receipts are submitted to the operator for approval
- Approved expenses are reimbursed via driver wallet credit within 24 hours
- Disputed expenses trigger a review conversation with the dispatcher

---

### 5.6 Fleet Operations Analytics Dashboard

**KPI Summary Cards:**
- Fleet utilization rate (%) — vehicles on active rental ÷ total active fleet
- Revenue per vehicle per day (RPV) — total rental revenue ÷ fleet size ÷ operating days
- Average rental duration (days)
- Active trips right now
- Vehicles with expiring compliance documents (next 60 days)
- Damage incident rate (damage reports ÷ total rentals, %)

**Visual Panels:**
- Fleet status map: Real-time map view of all active vehicles (with GPS)
- Vehicle performance table: Each vehicle ranked by revenue generated, utilization %, maintenance cost
- Driver performance table: Each driver ranked by trips completed, ratings, incident-free rate
- Revenue trend chart: Daily/weekly/monthly rental revenue breakdown
- Damage & deposit analytics: Number of damage claims, deduction amounts, contested claims

---

### 5.7 Vehicle Module Database Schema (12 Tables)

| # | Table | Purpose |
| :--- | :--- | :--- |
| 1 | `vehicles` | Full vehicle asset records: classification, specs, compliance document metadata, current status |
| 2 | `vehicle_compliance_docs` | Individual compliance document uploads with type, issue date, expiry date, file URL |
| 3 | `vehicle_pricing_plans` | Pricing matrix per vehicle: daily rate, hourly rate, weekly rate, deposit, mileage policy, per-km overage |
| 4 | `vehicle_transfer_routes` | Pre-defined fixed-fare point-to-point transfer routes with per-vehicle-class pricing |
| 5 | `vehicle_protection_plans` | Protection product definitions (CDW, LDW, FDW, Roadside Assistance) with daily price |
| 6 | `drivers` | Driver profile: license data, photo, vehicle type certifications, rating, trip count, duty status |
| 7 | `vehicle_bookings` | Master rental/transfer reservation record with full financial breakdown, status lifecycle |
| 8 | `vehicle_booking_extras` | Optional add-ons selected per booking (child seat, GPS, extra driver, Wi-Fi) |
| 9 | `vehicle_inspections` | Pre/post handover inspection records: odometer, fuel, damage markers JSON, photo URLs, signatures |
| 10 | `vehicle_extra_charges` | Post-rental billed incidentals: excess km, fuel deficit, traffic fine, damage repair |
| 11 | `vehicle_maintenance_log` | Scheduled and emergency service records per vehicle: service type, cost, next service milestone |
| 12 | `vehicle_reviews` | Verified post-rental reviews with separate ratings for vehicle condition and driver professionalism |

---

## 6. Financial Engine: Commissions, Payouts & Dispute Resolution

Both modules plug into the existing financial infrastructure:

**Commission Structure:**
- Hotel bookings: Platform deducts a configurable commission % (e.g., 10–15%) from total room revenue before crediting provider wallet
- Vehicle rentals/transfers: Platform deducts a configurable commission % (e.g., 12–18%) from rental base fare
- Protection plans: Platform retains a portion of protection plan revenue (as the seller of record)

**Provider Wallet Integration:**
- Earned revenue (net of commissions) is credited to the provider's wallet automatically upon booking confirmation or checkout
- Providers initiate withdrawal to bank account from their wallet dashboard
- Security deposit holds are tracked separately and released/deducted automatically

**Dispute Resolution Workflow:**
1. Guest raises dispute within 7 days of checkout (hotel) or within 48 hours of vehicle return
2. Platform support agent opens dispute ticket, notifies provider
3. Provider submits evidence (inspection photos, folio charges, damage assessment)
4. Guest submits counter-evidence
5. Platform support agent reviews and issues binding settlement decision
6. If dispute is upheld for guest: partial or full refund from provider's wallet
7. If dispute is upheld for provider: deposit deduction released to provider wallet
8. Audit log of all dispute actions maintained

---

## 7. B2B Wholesale, Package Bundling & Custom Quotations

**Integration with existing Packages & Inquiries modules:**

1. **Tour Package Builder (enhanced)**: Operators building multi-day tours in `/packages` can now:
   - Select and bind specific hotel properties for each overnight stop (with contracted net rate)
   - Select and bind specific vehicle categories for each transfer leg
   - System calculates package total: Tour cost + hotel nights (net rate × markup) + vehicle transfers

2. **Custom Trip Inquiry Quotation (enhanced)**: In `/inquiries`, travel agents can compose a multi-line quotation including:
   - Tour guide service (day 1–7)
   - Hotel: 3 nights at Property X (Room Type Y, Breakfast Included, specific rate plan)
   - Vehicle: Airport Transfer on arrival + departure (economy sedan, with driver)
   - Vehicle: Self-drive CNG auto-rickshaw for heritage city day trip
   - The system generates a single payment link for the total quoted amount

3. **B2B Rate Access**: Travel agents with `travel_agent` role see negotiated net rack rates for hotels and fleet, allowing them to build proposals with their own margin markup

---

## 8. Frontend Dashboard Module Architecture

### 8.1 Hotel Operations Console — Angular Routes & Components

| Route | Module | Primary Components |
| :--- | :--- | :--- |
| `/hotels/properties` | Property List | `HotelPropertyCardComponent`, `PropertyRegistrationDrawerComponent`, `PropertyStatusBadgeComponent` |
| `/hotels/properties/:id` | Property Detail | `PropertyOverviewTabComponent`, `RoomTypesTabComponent`, `RatePlansTabComponent`, `AmenitiesPolicyTabComponent` |
| `/hotels/room-types` | Room Inventory | `RoomTypeGridComponent`, `RoomTypeFormDrawerComponent`, `RoomUnitListComponent` |
| `/hotels/rates` | Rate Plans | `RatePlanTableComponent`, `RatePlanFormDrawerComponent`, `YieldRulesModalComponent` |
| `/hotels/calendar` | Availability Calendar | `RoomAvailabilityGridComponent` (spreadsheet-style), `InventoryOverrideModalComponent`, `BulkDateRestrictionsDrawerComponent` |
| `/hotels/front-desk` | Front Desk Console | `ArrivalQueueComponent`, `InHouseGuestListComponent`, `DepartureQueueComponent`, `CheckInModalComponent`, `RoomAssignmentModalComponent`, `GuestFolioDrawerComponent` |
| `/hotels/housekeeping` | Housekeeping Board | `HousekeepingRoomRackComponent`, `RoomStatusUpdateDrawerComponent`, `MaintenanceTicketFormComponent` |
| `/hotels/reservations` | Reservations Manager | `ReservationListComponent`, `ReservationDetailDrawerComponent`, `NewReservationFormComponent` |
| `/hotels/analytics` | Revenue Analytics | `RevPARChartComponent`, `OccupancyTrendComponent`, `ChannelContributionPieComponent`, `BookingPaceChartComponent` |

### 8.2 Vehicle Fleet Console — Angular Routes & Components

| Route | Module | Primary Components |
| :--- | :--- | :--- |
| `/vehicles/fleet` | Fleet Roster | `VehicleFleetGridComponent`, `VehicleDetailDrawerComponent`, `VehicleRegistrationFormComponent`, `ComplianceDocumentUploadComponent` |
| `/vehicles/pricing` | Pricing Plans | `VehiclePricingTableComponent`, `PricingPlanFormDrawerComponent`, `ProtectionPlanConfigComponent` |
| `/vehicles/routes` | Transfer Routes | `TransferRouteListComponent`, `RouteFormDrawerComponent`, `FareMatrixTableComponent` |
| `/vehicles/handover` | Handover Station | `VehicleHandoverSelectComponent`, `DamageMarkupInteractiveComponent`, `OdometerFuelInputComponent`, `DigitalSignaturePadComponent` |
| `/vehicles/drivers` | Driver Roster | `DriverProfileCardComponent`, `DriverFormDrawerComponent`, `LicenseVerificationBadgeComponent` |
| `/vehicles/dispatch` | Dispatch Console | `ActiveTripsMapComponent`, `DriverStatusListComponent`, `DispatchAssignmentModalComponent`, `FlightTrackingBadgeComponent` |
| `/vehicles/bookings` | Rental Reservations | `VehicleBookingListComponent`, `BookingDetailDrawerComponent`, `DepositStatusBadgeComponent` |
| `/vehicles/analytics` | Fleet Analytics | `UtilizationRateGaugeComponent`, `FleetRevenueChartComponent`, `DriverPerformanceTableComponent`, `MaintenanceCostSummaryComponent` |

---

## 9. Technology Notes for Engineering

**Backend patterns to follow** (consistent with existing modules):
- Each new module gets its own directory under `backend/api/src/modules/` (e.g., `hotel-property`, `room-type`, `rate-plan`, `vehicle`, `driver`, `vehicle-booking`)
- Each module follows: `*.schema.ts` → `*.repository.ts` → `*.service.ts` → `*.routes.ts`
- All DB access via Drizzle ORM through `HYPERDRIVE.connectionString` (same pattern as existing modules)
- All routes registered via Hono router, protected with `verifySession` middleware and role-checked with `requireRole()` guard

**Frontend patterns to follow** (consistent with existing modules):
- Each new feature under `frontend/dashboard/src/app/features/hotels/` and `frontend/dashboard/src/app/features/vehicles/`
- Structure per feature: `data-access/` (models, store, service, facade) + `ui/` (components)
- SignalStore + Facade for state management
- Mock data layer in API service with HTTP try/catch fallback (same dual-mode pattern)
- Lazy-loaded route chunks per feature module

---

## 10. Implementation Phased Roadmap

| Phase | Sprint Target | Deliverables | Success Criteria |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Sprint 1–2 | Hotel & Vehicle Drizzle ORM schemas + CockroachDB migration SQL | `npm run db:migrate` succeeds with 0 errors on all 25 new tables |
| **Phase 2** | Sprint 3–5 | Backend REST APIs: Hotel CRUD (properties, rooms, rate plans, calendar), Vehicle CRUD (assets, pricing, routes, drivers) | All endpoints return correct responses in Postman; role guards enforced |
| **Phase 3** | Sprint 6–7 | Booking engines: Hotel reservation lifecycle, Vehicle rental lifecycle, Digital inspection system | Full booking state machine transitions verified; deposit hold/release logic tested |
| **Phase 4** | Sprint 8–9 | Frontend Data Access: Hotel stores/facades/services + Vehicle stores/facades/services with mock data | Angular `npm run build` succeeds; all mock data renders in dashboard |
| **Phase 5** | Sprint 10–11 | Hotel operations UI: Front desk console, Housekeeping board, Availability calendar grid | Zero-error compilation; front desk check-in flow works end-to-end with mock data |
| **Phase 6** | Sprint 12–13 | Vehicle operations UI: Fleet roster, Handover station (8-point inspection modal), Dispatch console, Driver PWA | Inspection markup, digital signature, and inspection PDF generation work correctly |
| **Phase 7** | Sprint 14–15 | Revenue dashboards: RevPAR/ADR analytics (hotel) + Fleet utilization analytics (vehicle) | Charts render correctly; export CSV and print report functional |
| **Phase 8** | Sprint 16 | Package bundler integration, B2B quotation multi-item composer, End-to-end system testing | Full booking flow from search → book → check-in → review works without errors |
