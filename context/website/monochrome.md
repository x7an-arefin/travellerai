### version: "alpha"
name: "Monochrome"
description: "Bold, restrained, contrast-led interface system built entirely from black, white, and neutral grays. Ideal for portfolios, editorial platforms, fashion, architecture, SaaS products, galleries, and premium landing pages. AI-ready template."
colors:
primary: "#fafafa"
secondary: "#111111"
tertiary: "#3f3f46"
neutral: "#f4f4f5"
surface: "#e4e4e7"
accent: "#27272a"
typography:
h1:
fontFamily: Inter
fontSize: 2.5rem
fontWeight: 700
body-md:
fontFamily: Inter
fontSize: 1rem
fontWeight: 400
components:
button-primary:
backgroundColor: "#111111"
textColor: "#fafafa"
padding: 12px

Overview

Monochrome design removes hue from the interface and makes hierarchy depend on contrast, scale, typography, spacing, borders, imagery, and motion. It is not merely a black-and-white color scheme. It is a disciplined visual system in which every neutral value has a role and every shift in tone must communicate structure, state, or priority.

The strongest monochrome interfaces use restraint as a form of emphasis. Pure or near-black establishes the primary visual anchor. Off-white creates a comfortable canvas. Mid-grays support secondary information, dividers, disabled controls, and layered surfaces. Since there is no bright accent color to rescue weak hierarchy, composition must be deliberate. Headlines need decisive scale, actions need unmistakable contrast, and whitespace must separate ideas before borders or shadows are introduced.

The modern interpretation combines editorial confidence with product usability. Oversized typography, grayscale photography, thin rules, inverse sections, and asymmetric layouts can create dramatic moments, while predictable grids, accessible controls, visible focus states, and responsive behavior keep the experience practical. Screens are interactive, so hover, focus, selected, loading, error, and disabled states must remain distinguishable without relying on color.

Monochrome works best when the visual voice is consistent. Choose a dominant direction such as minimal editorial, quiet product, technical utility, luxury, or neo-brutalist. Do not mix soft shadows, heavy outlines, rounded cards, sharp editorial rules, and brutalist offset effects without a clear system.

- Density: 4/10 — Airy to balanced
- Variance: 6/10 — Controlled but expressive
- Motion: 3/10 — Minimal and purposeful
- **Style:** Restrained, Editorial, High-Contrast, Minimal, Typographic
- **Keywords:** monochrome, black and white, grayscale, neutral, editorial, minimal, contrast, typography, negative space, grayscale photography, inverse surfaces
- **Era:** 1950s International Style + 1990s Editorial Minimalism + 2026 Digital Product
- **Light/Dark:** ✓ Full / ✓ Full

### Colors
- **Soft White** (#fafafa) — Main canvas, light surfaces, inverse text
- **Off-Black** (#111111) — Primary text, main actions, dark sections
- **Charcoal** (#27272a) — Raised dark surfaces, hover states, secondary dark panels
- **Dark Grey** (#3f3f46) — Secondary emphasis, strong borders, active controls
- **Mid Grey** (#71717a) — Secondary text, metadata, inactive icons
- **Light Grey** (#e4e4e7) — Borders, dividers, input strokes, subtle surfaces
- **Pale Grey** (#f4f4f5) — Muted sections, cards, table headers, skeletons

Color application rules:
- Use off-white instead of pure white for large canvases to reduce glare.
- Use off-black instead of pure black for large surfaces and long reading areas.
- Reserve the strongest black-and-white contrast for primary actions, hero statements, navigation anchors, and critical decisions.
- Use no more than four neutral levels in a single component.
- Do not represent semantic status with gray intensity alone. Pair every status with text, iconography, shape, border style, or pattern.
- In dark mode, raise surfaces with progressively lighter charcoal values instead of depending on shadows.
- Maintain readable contrast for all text, icons, controls, boundaries, and focus rings.

### Typography
- **Display / Hero:** Inter — Weight 700–800, tight tracking, used for decisive editorial statements
- **Accent / Editorial:** Instrument Serif — Used selectively for quotations, campaign phrases, or contrast headings
- **Body:** Inter — Weight 400, 16px/1.65 line-height, max 68ch per line
- **UI Labels / Captions:** Inter — 0.8125rem to 0.875rem, weight 550–650, slight letter-spacing
- **Monospace:** IBM Plex Mono — Used for code, metadata, timestamps, indexes, and technical values

Scale:
- Hero: clamp(3rem, 8vw, 7rem)
- H1: clamp(2.25rem, 5vw, 4.5rem)
- H2: clamp(1.75rem, 3vw, 3rem)
- H3: clamp(1.25rem, 2vw, 1.75rem)
- Body Large: 1.125rem / 1.65
- Body: 1rem / 1.65
- Small: 0.875rem / 1.5
- Caption: 0.75rem / 1.4

Typography rules:
- Use scale, weight, position, and whitespace together to establish hierarchy.
- Keep display tracking between -0.02em and -0.05em when the font supports it.
- Use uppercase only for short labels, indexes, categories, and navigation markers.
- Add 0.06em to 0.12em letter-spacing to small uppercase labels.
- Avoid font weights below 400 for important or long-form content.
- Use tabular numerals for pricing, analytics, tables, timers, and measurements.
- Never make supporting text so faint that it becomes decorative rather than readable.
- Limit the default interface to two proportional font families plus one monospace family.

### Layout
- **Grid:** CSS Grid primary. Max-width containment: 1360px centered with clamp(1rem, 4vw, 4rem) side padding.
- **Columns:** 4 mobile / 8 tablet / 12 desktop.
- **Spacing rhythm:** Balanced. Base unit: 0.5rem (8px), with 4px allowed for fine control spacing.
- **Section vertical gaps:** clamp(4rem, 10vw, 10rem).
- **Hero layout:** Large typographic field with asymmetric media, index, or supporting copy.
- **Feature sections:** Alternating split layouts, editorial stacks, highlighted rows, and varied card spans. Avoid repetitive equal-column grids.
- **Content width:** Long-form reading content remains between 45ch and 68ch.
- **Mobile collapse:** Multi-column layouts collapse below 768px. Preserve reading order and avoid horizontal overflow.
- **Wide layout:** Additional viewport width increases whitespace and composition depth, not paragraph length.
- **z-index contract:** base (0) / raised (10) / sticky-nav (100) / overlay (200) / modal (300) / toast (500).

Layout principles:
- Use whitespace as the first method of grouping.
- Use thin rules when separation must remain visible.
- Align major content to a predictable vertical axis.
- Allow one intentional grid break per major section for visual energy.
- Use asymmetry for storytelling and emphasis, not for routine forms or transactional screens.
- Keep actions close to the content they affect.
- Avoid placing every content group inside a card.

### Elevation & Depth

Monochrome depth is created primarily through surface contrast, borders, overlap, scale, and controlled shadow. Large soft shadows should not become the visual identity.

- **Surface levels:** canvas / muted / raised / inverse / overlay.
- **Borders:** 1px subtle by default, 2px for selected or emphasized states, 3px only for expressive treatments.
- **Soft shadow:** 0 2px 12px rgba(0,0,0,0.06).
- **Floating shadow:** 0 16px 40px rgba(0,0,0,0.12), reserved for modals, menus, and temporary overlays.
- **Hard shadow option:** 4px 4px 0 #111111, used only in the neo-brutalist variant.
- **Physics:** Ease-out curves, 160–240ms duration. Direct and controlled.
- **Entry animations:** Fade + translate-Y (12px → 0) over 360ms ease-out. Optional 60ms stagger for short lists.
- **Hover states:** One-neutral-step surface shift, border emphasis, underline change, or 1–2px translation.
- **Page transitions:** Fade only, 160–200ms.
- **Performance:** Animate transform and opacity. Avoid layout-triggering animation.
- **Reduced motion:** Remove translation, parallax, stagger, and nonessential continuous animation when requested by the platform.

### Shapes

Base corner radius: 8px. The shape language is precise and moderately sharp.

- **Small controls:** 4px
- **Inputs and buttons:** 6px
- **Cards and panels:** 8px
- **Large media:** 12px
- **Tags and filters:** 9999px only when the pill shape communicates a compact object
- **Editorial variant:** 0–2px radius
- **Soft product variant:** 10–14px radius

Shape rules:
- Nested elements use equal or smaller radii than their parent.
- Avoid mixing square cards with highly rounded controls unless the contrast is intentional.
- Use circles only for avatars, indicators, media controls, or genuinely circular data.
- Do not use decorative blobs or organic shapes that weaken the disciplined composition.

### Components
- **Primary Button:** Off-black fill with soft-white text. 44px minimum height. Hover: charcoal fill + 1px lift. Active: translateY(1px). Focus: 2px high-contrast outline with 3px offset. Font weight 600. No glow.
- **Secondary Button:** Transparent or soft-white surface with 1.5px dark border. Hover: pale-grey fill. Active: stronger border. Same height and typography as the primary button.
- **Ghost Button:** No fill or border at rest. Hover: subtle surface fill or underline. Must remain recognizable as interactive.
- **Icon Button:** 40–44px target area. Accessible name required. Tooltip for unfamiliar actions. Use one icon family with consistent stroke weight.
- **Cards:** Soft-white or pale-grey surface. 1px border or whitespace separation. Shadow is optional and subtle. Cards may use inverse treatment for a single emphasized item.
- **Inputs:** Persistent label above input. 1px border. Hover strengthens the border. Focus uses a 2px outline with 2–3px offset. Validation includes status icon, explicit text, and `aria-describedby`. No floating labels.
- **Checkboxes / Radios:** Selection shown through checkmark, dot, or fill plus border change. Never use a subtle gray shift alone.
- **Switches:** Handle position plus fill and optional On/Off label. Important settings must not rely on position alone.
- **Navigation:** Canvas or inverse surface. Active item uses a 2px underline, side marker, inverse fill, or weight change. Mobile menu has explicit open and close labels.
- **Tabs:** Selected tab uses a heavy underline or inverse fill. Keyboard behavior and ARIA roles must match a true tab pattern.
- **Tables:** Horizontal rules preferred over vertical rules. Numeric data right-aligned with tabular numerals. Sort states include icon and accessible text. Status cells use labels and icons.
- **Tags / Badges:** Solid, outline, dashed, or subtle variants. Different categories use text and optional icons, not multiple nearly identical gray fills.
- **Alerts:** Status icon + short heading + explanation + optional action. Use border styles to supplement meaning: solid for success, dashed for pending, heavy for error, dotted for information.
- **Modals:** Strong overlay, focused visual field, visible close control, focus trap, and focus return. Use for contained decisions, not general navigation.
- **Tooltips:** Short supplementary information only. Available on hover and keyboard focus. No essential instructions hidden exclusively inside tooltips.
- **Skeletons:** Neutral pulse or restrained shimmer matching final component dimensions. Respect reduced motion. Avoid generic circular spinners when content structure is predictable.
- **Empty States:** Typographic or line-icon composition with a clear explanation and next action. No decorative image that competes with the task.
- **Grayscale Media:** Preserve luminance detail. Use repeatable crop ratios. Add a protective surface behind overlaid text when the image is visually complex.

### Interaction States
- **Rest:** Clear boundary, label, and expected affordance.
- **Hover:** Surface shifts one neutral step or border becomes stronger. Hover is an enhancement, never the only indicator.
- **Focus-visible:** 2px contrasting outline with 3px offset. Focus must remain visible on light, dark, image, and muted surfaces.
- **Active:** Small tactile translation or inverted surface. Keep the label stable and readable.
- **Selected:** Use at least two signals such as fill + icon, border + weight, or underline + label.
- **Disabled:** Reduced emphasis but still legible. Remove hover and active effects. Use correct disabled semantics.
- **Loading:** Preserve component width. Add spinner, progress mark, or text status. Prevent accidental repeated submission.
- **Error:** Explicit message, status icon, strong border or patterned marker, and recovery guidance.
- **Success:** Confirmation label and check icon. Do not communicate success through a darker gray alone.

### Data Visualization
- Use solid, dashed, and dotted line styles for data series.
- Combine circle, square, triangle, and diamond markers.
- Use light, medium, and dark fills with strong luminance separation.
- Use hatching or dot patterns sparingly for bars and areas.
- Label series directly where possible.
- Use the darkest value for the focus series and reduce nonfocus series contrast.
- Keep gridlines subtle but visible.
- Provide an accessible data table or text summary for important charts.
- Test every chart in grayscale print, at small viewport sizes, and under high zoom.
- Do not differentiate adjacent categories with barely distinguishable gray values.

### Accessibility
- Meet applicable WCAG contrast requirements for text and meaningful visual boundaries.
- Do not use color, shade, or animation as the only source of meaning.
- Provide persistent labels for all form controls.
- Ensure logical heading structure and reading order.
- Use semantic HTML before adding ARIA.
- Provide accessible names for all icon-only controls.
- Keep touch targets approximately 44×44px where practical.
- Support keyboard navigation throughout menus, dialogs, tabs, forms, and custom controls.
- Ensure content reflows without clipping when text is enlarged.
- Honor `prefers-reduced-motion`.
- Use descriptive alternative text for meaningful imagery and empty alternative text for decorative imagery.
- Verify links remain identifiable in body copy by using underlines or another persistent noncolor cue.

### Do's and Don'ts
- No emojis in UI — use a consistent icon system such as Lucide or Heroicons
- No decorative gradients — use flat neutral surfaces, image texture, or controlled pattern
- No status communication through gray intensity alone
- No more than four neutral levels inside one component
- No faint body copy below accessible contrast
- No removing link underlines inside long-form content without another persistent affordance
- No heavy card shadows throughout the page
- No mixing soft shadows and hard offset shadows in the same visual mode
- No grayscale filtering of charts when it removes category distinction
- No placeholder-only labels
- No hover-only interactions
- No generic equal-width three-card section as the default composition
- No h-screen — use min-h-[100dvh]
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Revolutionary", "Next-Gen"
- No generic lorem ipsum in demos
- No broken external image links — use verified assets, local placeholders, or inline SVG
- Do use off-white and off-black for large reading surfaces
- Do use typography as the main hierarchy system
- Do combine shape, label, icon, border, and contrast for states
- Do use generous negative space
- Do introduce inverse sections selectively for rhythm
- Do use grayscale photography with clear luminance and intentional crops
- Do make keyboard focus highly visible
- Do define light and dark tokens independently rather than mechanically inverting values
- Do test mobile, tablet, desktop, zoom, keyboard, reduced motion, and grayscale print behavior
- Do keep interaction feedback restrained, fast, and predictable
- Do document every exception when semantic or brand color is introduced
