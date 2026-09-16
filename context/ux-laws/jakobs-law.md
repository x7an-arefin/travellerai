# Jakob's Law

> *"Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know."*
> — **Jakob Nielsen**, Co-founder of Nielsen Norman Group

---

## Overview

**Jakob's Law** is one of the foundational principles in UX design, formulated by Jakob Nielsen, a renowned usability expert and co-founder of the Nielsen Norman Group. The law states that users transfer expectations they have built around other well-designed products to your product. In essence, when users encounter a new interface, they don't approach it with a blank slate—they bring with them a mental model shaped by every website and application they've used before.

This psychological phenomenon means that **familiarity is the default expectation**. Users don't want to learn new patterns; they want your product to work the way products they've already mastered work. This is not laziness—it's a cognitive efficiency mechanism. Our brains are wired to conserve energy by applying known patterns to new situations.

---

## The Origin Story

Jakob Nielsen developed this principle based on decades of usability research and observation. He noticed a consistent pattern: users approach any new digital product with the assumption that it will function similarly to products they already use regularly. This expectation is so deeply ingrained that even minor deviations from established conventions can cause confusion, frustration, and abandonment.

The reasoning is straightforward: **the average internet user has spent thousands of hours interacting with websites and apps**. They've learned where to find navigation menus, how search boxes behave, where to look for contact information, and how checkout processes work. When your product doesn't match these learned expectations, you're essentially asking users to "relearn" fundamental interactions—which creates friction and erodes trust.

---

## The Psychology Behind It

### Mental Models and Transfer of Learning

Humans naturally form **mental models**—internal representations of how systems work—based on their experiences. When encountering a new system, we attempt to apply these existing mental models to predict how the new system operates. This is called **transfer of learning**.

When users visit your website, their brain quickly scans for patterns:
- *"Is the logo in the top left?"*
- *"Is there a search bar near the top?"*
- *"Does clicking the logo take me home?"*
- *"Is there a shopping cart icon somewhere visible?"*

If the answers match their existing mental models, users feel "at home" and can focus on their actual tasks. If not, they enter a state of cognitive dissonance and must expend mental energy to learn new patterns.

### The Cost of Novelty

Every time you introduce a non-standard pattern, you're essentially asking users to pay a "cognitive tax." They must:
1. Recognize that the familiar pattern is absent
2. Devote attention to locating the alternative pattern
3. Encode the new pattern into memory
4. Integrate it with their existing mental model

This process takes time and mental effort—resources users are often unwilling or unable to spare, especially when they're trying to accomplish a specific goal quickly.

---

## Key Principles of Jakob's Law

### 1. Leverage Established Patterns

The most successful digital products adhere to **industry conventions**. Before reinventing the wheel, ask yourself:
- *"Does this novelty actually serve the user, or does it serve my desire to be different?"*
- *"Would removing this pattern harm usability, or would it actually improve the experience?"*

### 2. Know When to Innovate

Jakob's Law doesn't mean you can never be creative or innovative. It means you should:
- **Innovate within components, not between components**: Keep the overall structure familiar, but make micro-interactions and details delightful
- **Innovate on secondary elements**: Navigation structure, search placement, and checkout flows should remain familiar. Branding, illustrations, animations, and copywriting can be unique
- **Test your innovations**: Any deviation from convention should be validated through user testing

### 3. Understand User Patience

Users arrive at your product with a specific goal. They don't want to spend the first five minutes learning your interface. **First impressions matter enormously**—if users can't accomplish their initial task within seconds, they'll likely leave.

---

## Practical Applications in UI/UX Design

### Navigation and Site Structure

**What users expect:**
- Logo in the top left that links to the homepage
- Primary navigation at the top or left sidebar
- Dropdown menus that expand on hover or click
- "Hamburger menus" on mobile for secondary navigation
- Breadcrumbs on category or product pages

**How to apply Jakob's Law:**
```
✓ Place logo in top-left corner
✓ Put primary navigation horizontally across the top
✓ Keep navigation order consistent with competitors
✓ Use familiar iconography (magnifying glass = search, cart = shopping)
✗ Don't place navigation only in an obscure corner
✗ Don't use non-standard icons without labels
```

### Search Functionality

**What users expect:**
- Search bar prominently placed (usually in the header)
- Search icon that looks like a magnifying glass
- Search results page with query at the top
- Filter options on the left side
- Clear visual hierarchy between results

**How to apply Jakob's Law:**
```
✓ Place search bar where users expect it (top area)
✓ Use placeholder text like "Search products, topics..."
✓ Display results in a scannable list or grid
✗ Don't hide search behind multiple clicks
✗ Don't use an unusual search icon without a label
```

### E-commerce Checkout

**What users expect:**
- Cart accessible from any page
- Clear indication of cart contents and total
- Guest checkout option
- Progress indicator for multi-step checkout
- Form fields arranged logically (name, address, payment)
- Standard payment icons

**How to apply Jakob's Law:**
```
✓ Keep checkout to as few steps as possible
✓ Allow checkout as a guest
✓ Show order summary throughout the process
✗ Don't require account creation before purchase
✗ Don't change the order of standard form fields
```

### Forms and Input Fields

**What users expect:**
- Labels above or to the left of input fields
- Required fields indicated clearly (asterisk or "required" text)
- Error messages near the problematic field
- Password requirements shown before submission
- Date pickers that look like calendars

**How to apply Jakob's Law:**
```
✓ Place labels where users can easily scan them
✓ Use familiar date picker patterns
✓ Show inline validation feedback
✗ Don't use placeholders as the only label
✗ Don't require unusual formats without clear instruction
```

### Content Layout

**What users expect:**
- Important content "above the fold" (visible without scrolling)
- Clear heading hierarchy (H1 → H2 → H3)
- Left-aligned text in left-to-right languages
- Consistent spacing throughout the page
- White space to allow content to breathe

---

## Real-World Examples

### Amazon (E-commerce Standard)

Amazon has become the mental model for e-commerce:
- Top navigation with department categories
- Search bar prominently in the center
- "Add to Cart" button in a consistent location on product pages
- Cart accessible from every page via icon in header
- One-click ordering and guest checkout

**Why it works**: Amazon's patterns have become so ingrained that other e-commerce sites that deviate significantly confuse users.

### Google (Search Interface)

Google's minimal homepage set a standard:
- Clean, uncluttered interface
- Search bar as the focal point
- Logo above the search bar
- Results organized with clear titles and snippets
- Navigation links (Images, News, etc.) at the top

**Why it works**: Any search engine that adds excessive clutter or moves the search bar struggles to compete.

### Apple (Mobile Conventions)

Apple's iOS established mobile interaction patterns:
- Home button (or gesture) to return to home
- Tab bar at the bottom for primary navigation
- Swipe gestures for navigation
- Pull-to-refresh in lists
- Consistent back button placement

**Why it works**: Users who switch between iPhone and Android often feel disoriented because expected patterns differ slightly.

---

## Jakob's Law vs. Innovation: Finding the Balance

Jakob's Law is not an argument against innovation—it's an argument for **strategic innovation**. Here's how to balance the two:

### Where You CAN Be Innovative:
- **Visual design and branding**: Colors, typography, illustration style, iconography details
- **Micro-interactions**: Hover effects, button animations, loading states
- **Content and tone**: How you speak to users, storytelling approach
- **Feature details**: The specific functionality of your features (how they work, not where they're placed)
- **Onboarding experience**: How you introduce users to unique features

### Where You Should NOT Innovate (Without Good Reason):
- **Navigation structure and placement**
- **Search bar location and behavior**
- **Shopping cart placement and behavior**
- **Form field ordering and labeling**
- **Call-to-action button placement**
- **Error message patterns**
- **Basic interaction patterns** (how dropdowns, modals, accordions work)

---

## Measuring Jakob's Law Compliance

### User Testing Metrics

Track these indicators:
- **Time to first successful action**: How quickly can new users complete their first task?
- **Task completion rate**: What percentage of users successfully complete common tasks?
- **Error rate**: How often do users make mistakes?
- **Support requests**: Are users asking questions about basic navigation?
- **Heat maps**: Where do users click? Are they clicking in expected places?

### Analytics to Monitor

- **Bounce rate**: Are users leaving immediately?
- **Pages per session**: Are users exploring multiple pages or leaving after one?
- **Conversion rate**: Are users completing desired actions?
- **Navigation path**: Are users following expected paths through the site?

---

## Common Violations of Jakob's Law

### Anti-Patterns to Avoid:

1. **Non-standard logo placement**: Putting the logo in the center, right, or bottom
2. **Hidden navigation**: Buried menus that require multiple clicks to find
3. **Custom interaction patterns**: Accordions that don't behave like other accordions
4. **Non-standard form layouts**: Labels inside fields, unusual field orders
5. **Missing breadcrumbs**: Removing navigational context
6. **Inconsistent back button behavior**: Back button doesn't work as expected
7. **Novel search placement**: Search bar in footer or behind an icon without indication

---

## Advanced Concepts

### Pattern Libraries and Design Systems

Modern design systems help enforce Jakob's Law by:
- Creating reusable components based on established patterns
- Documenting expected behavior for each pattern
- Providing consistency across products
- Reducing the temptation to reinvent common UI elements

### Accessibility Considerations

Jakob's Law intersects with accessibility:
- **Familiar patterns often equal accessible patterns**: Standard patterns have often been tested for accessibility
- **Screen reader users rely on conventions**: Non-standard interfaces confuse assistive technology users even more than visual users
- **Keyboard navigation expectations**: Users expect Tab to move forward, Shift+Tab to move back, Enter to activate

### Responsive Design and Jakob's Law

Mobile and desktop have some shared conventions but also key differences:
- **Shared**: Logo placement, hamburger menu behavior, scrolling patterns
- **Different**: Touch target sizes (larger on mobile), thumb zones, navigation placement (bottom tabs on mobile often preferred)

---

## Checklist for Applying Jakob's Law

### Before Launching Any Interface:

- [ ] Have you compared your navigation structure with at least 3 competitors?
- [ ] Is your logo clickable and does it link to the homepage?
- [ ] Is there a search bar in the expected location?
- [ ] Are error messages helpful and placed near the problem area?
- [ ] Can users complete the most common task within 10 seconds?
- [ ] Have you user-tested with people unfamiliar with your product?
- [ ] Are your form fields in the expected order?
- [ ] Is there a clear visual hierarchy?
- [ ] Are CTAs placed where users expect to find them?
- [ ] Does the checkout process follow standard e-commerce patterns?

---

## Conclusion

Jakob's Law is a reminder that **users are not starting from scratch** when they encounter your product. They've spent years learning how digital products work, and they bring those expectations to every new site and app they visit. Respecting these expectations isn't about being unoriginal—it's about reducing cognitive friction so users can focus on what they actually came to do.

The best digital products don't try to be completely different from everything else. They master the art of **convention plus excellence**—using familiar patterns as a foundation and adding value through superior execution, beautiful design, and thoughtful features.

**Remember**: Innovation in UI is expensive in terms of user learning costs. Reserve it for situations where the benefit to the user clearly outweighs the cost of deviation from their learned expectations.

---

*Next: [Hick's Law →](hicks-law.md) - The time it takes to make a decision increases with the number and complexity of choices.*
