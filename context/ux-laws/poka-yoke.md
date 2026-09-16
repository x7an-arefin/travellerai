# Poka-Yoke (Error Prevention)

> *"Human errors are inevitable, but defects do not have to be."*
> — **Shigeo Shingo**, Toyota Production System, 1960s

---

## Overview

**Poka-Yoke** (pronounced *poh-kah yoh-kay*) is a Japanese term meaning "mistake-proofing" or "error-proofing." Originally developed by engineer Shigeo Shingo for the Toyota Production System, the philosophy centers on a powerful insight: instead of blaming users for making mistakes, **design the system so mistakes are impossible—or immediately visible**.

In UX design, Poka-Yoke is the practice of creating interfaces that either prevent users from committing errors in the first place, or make errors immediately obvious so they can be corrected before causing harm. It's a fundamental shift in thinking: from "the user made an error" to "the system allowed an error."

Every disabled button, every inline validation, every confirmation dialog, and every restricted input field is an application of Poka-Yoke. It is the invisible guardian of every well-designed interface—the principle that makes good software feel safe, forgiving, and trustworthy.

---

## The Origin Story

### Shigeo Shingo and Toyota

In the 1960s, Shigeo Shingo was working as an industrial engineer at Toyota when he observed a persistent problem: workers on the assembly line were making small mistakes—forgetting to insert a spring, connecting a wire backwards, using the wrong part. These weren't careless workers; they were skilled professionals making human errors.

**Shingo's Insight**: Instead of training workers harder (the typical response), he redesigned the assembly process so that **errors were physically impossible**:

1. Parts were designed so they could only fit one way (asymmetric connectors)
2. Jigs and fixtures guided assembly in the correct order
3. Sensors detected missing components before the next step could begin
4. Visual indicators showed when a step was completed correctly

**Key Finding**: Error rates dropped by **99%**—not because workers became more careful, but because the system made errors impossible.

### From Manufacturing to Digital

The translation to digital design is natural:

| Manufacturing Poka-Yoke | Digital Poka-Yoke |
|--------------------------|-------------------|
| Asymmetric connector (can't insert wrong way) | Input mask (can't enter letters in phone field) |
| Sensor detects missing part | Required field validation |
| Assembly jig guides correct order | Wizard/stepper guides correct flow |
| Weight check catches wrong part | Real-time format validation |
| Emergency stop button | Undo/redo capability |

---

## The Psychology Behind Error Prevention

### The Human Error Taxonomy

Understanding errors helps design against them:

#### 1. Slips (Execution Errors)
The user intends to do the right thing but executes incorrectly:
- Clicking the wrong button due to proximity
- Typing "teh" instead of "the"
- Selecting the wrong item from a dropdown
- Accidentally deleting a file

**Prevention Strategy**: Physical constraints, confirmation dialogs, undo capability

#### 2. Mistakes (Planning Errors)
The user has the wrong mental model of what they should do:
- Entering a username in the email field
- Choosing the wrong shipping option
- Selecting incompatible product options
- Entering a future date for a birth date

**Prevention Strategy**: Clear labels, contextual guidance, format examples

#### 3. Lapses (Memory Errors)
The user forgets a step or piece of information:
- Forgetting to fill in a required field
- Not saving before navigating away
- Forgetting to attach a file before sending
- Missing a step in a multi-step process

**Prevention Strategy**: Required field indicators, auto-save, pre-submission checks

### Error Prevention vs. Error Detection

Poka-Yoke operates on two levels:

| Approach | Description | Example | Timing |
|----------|-------------|---------|--------|
| **Prevention** (Strongest) | Make the error impossible | Disabled button until form is valid | Before error occurs |
| **Detection** (Strong) | Make the error immediately visible | Red border on invalid input | During/immediately after error |
| **Recovery** (Good) | Make the error easily correctable | Undo button, draft recovery | After error occurs |
| **Mitigation** (Minimum) | Reduce the impact of the error | Auto-save, confirmation dialogs | After error occurs |

---

## Key Principles of Poka-Yoke for UX

### 1. Constrain Inputs to Valid Options

The strongest form of error prevention eliminates invalid choices entirely:
- Use dropdowns instead of free text for known-value fields
- Use date pickers instead of text fields for dates
- Use radio buttons for mutually exclusive options
- Use number steppers for quantity fields
- Disable invalid options rather than allowing selection then showing errors

### 2. Validate in Real-Time, Not on Submit

Don't make users fill out an entire form only to discover errors at the end:
- Validate each field as the user completes it (on blur)
- Show format requirements before the user starts typing
- Use inline error messages adjacent to the field
- Mark valid fields with green checkmarks for positive reinforcement

### 3. Provide Clear Affordances

Make the correct action obvious through design:
- Buttons should look clickable (elevated, colored, with hover states)
- Disabled states should be visually distinct (grayed out, no hover)
- Required fields should be clearly marked
- Interactive elements should have clear focus states

### 4. Design for Recovery

When errors do occur (and they will), make recovery easy:
- Implement undo/redo for all significant actions
- Auto-save work frequently
- Never delete data immediately—use soft delete with recovery period
- Provide clear, actionable error messages

---

## Practical Applications in UI/UX Design

### Form Design

**The Problem**: Forms are the #1 source of user errors in digital interfaces.

**The Solution**:
```
✗ Bad: Free text field for "Date of Birth" with no format guidance
  → Users enter: "March 5", "3/5/95", "05-03-1995", "1995.03.05"

✓ Better: Text field with placeholder "MM/DD/YYYY" and input mask
  → Users can only enter numbers in the correct format

✓ Best: Date picker component with calendar UI
  → Users select from valid dates only; impossible to enter an invalid date
```

**Form Poka-Yoke Techniques**:

| Technique | What It Prevents | Example |
|-----------|-----------------|---------|
| **Input masks** | Format errors | Phone: `(___) ___-____` |
| **Type restrictions** | Invalid characters | Number-only for ZIP code |
| **Dropdown menus** | Unknown/invalid values | Country selection |
| **Auto-completion** | Typos, unknown values | Address auto-complete |
| **Min/max constraints** | Out-of-range values | Quantity: 1-99 |
| **Required indicators** | Missing fields | Red asterisk `*` |
| **Real-time validation** | All errors | Green check on valid email |
| **Disabled submit** | Incomplete submissions | Gray button until form is valid |

### Destructive Actions

**The Problem**: Users accidentally delete files, accounts, or data.

**The Solution**:
```
✗ Bad: Single "Delete" button with no confirmation
  → One click destroys data permanently

✓ Better: Confirmation dialog: "Are you sure you want to delete?"
  → Extra step prevents accidental deletion

✓ Best: Multi-layered protection:
  1. Confirmation dialog with specific item name
  2. Type-to-confirm for critical actions ("Type DELETE to confirm")
  3. Soft delete with 30-day recovery period
  4. Undo notification: "Deleted. [Undo]"
```

**Destructive Action Hierarchy**:
```
Low risk (remove from list):     Undo toast notification
Medium risk (delete document):   Confirmation dialog + trash/recovery
High risk (delete account):      Multi-step confirmation + type-to-confirm
Critical risk (delete all data): Email verification + cooling-off period
```

### E-Commerce Checkout

**The Problem**: Cart abandonment due to errors in payment, address, or shipping.

**The Solution**:
```
✗ Bad: One long form with validation only at submission
  → User discovers 4 errors after filling 20 fields

✓ Better: Step-by-step checkout with per-step validation
  → Errors caught before proceeding to next step

✓ Best: Smart checkout with:
  - Address auto-complete (prevents address errors)
  - Credit card type auto-detection (prevents card type errors)
  - Real-time format validation (prevents format errors)
  - Order summary preview before final submission (prevents order errors)
  - Post-purchase edit window (allows error correction after purchase)
```

### Password Creation

**The Problem**: Users create weak passwords or can't meet complex requirements.

**The Solution**:
```
✗ Bad: "Password must contain 8+ chars, uppercase, lowercase, 
  number, and special character" (shown after failed attempt)

✓ Better: Requirements listed before the field, with real-time 
  check marks as each requirement is met

✓ Best: 
  - Strength meter with real-time feedback
  - Requirements checked with ✓/✗ as user types
  - "Show password" toggle to prevent typos
  - Password confirmation field
  - Suggestion: "Try a passphrase like: correct-horse-battery-staple"
```

### Navigation and Workflow

**The Problem**: Users navigate away from unsaved work.

**The Solution**:
```
✗ Bad: No warning when leaving a page with unsaved changes
  → Work is silently lost

✓ Better: "You have unsaved changes. Leave anyway?" dialog
  → User is warned but may have already lost focus

✓ Best: Auto-save + "You have unsaved changes" dialog as backup
  → Work is never lost, dialog catches edge cases
```

### File Upload

**The Problem**: Users upload wrong file types, oversized files, or corrupt files.

**The Solution**:
```
✗ Bad: Accept any file, show error after upload completes
  → User waits for upload only to learn it was wrong

✓ Better: Client-side type and size checking before upload begins
  → Errors caught before wasting time

✓ Best: 
  - Accept attribute limits file picker to valid types
  - Client-side size check with clear limit display
  - Preview before final upload (images, documents)
  - Progress indicator with cancel option
  - Drag-and-drop zone with valid type indication
```

### Search and Input

**The Problem**: Users make typos or search for content that doesn't exist.

**The Solution**:
```
✗ Bad: "No results found" with no guidance
  → Dead end for the user

✓ Better: "No results for 'iphne'. Did you mean 'iphone'?"
  → Auto-correction suggestion

✓ Best: 
  - Auto-complete suggestions as user types
  - Fuzzy matching that handles typos
  - "Did you mean..." for near-matches
  - Category suggestions when exact match fails
  - Recent searches for quick re-access
```

---

## Advanced Strategies

### 1. The Error-State Design System

Create a comprehensive error design system:

```
Level 1 - Inline Prevention:
  ├── Input masks and constraints
  ├── Real-time validation
  └── Smart defaults

Level 2 - Warning States:
  ├── Yellow/orange warning indicators
  ├── "Are you sure?" for non-destructive actions
  └── Tooltip guidance on hover

Level 3 - Error States:
  ├── Red error indicators with messages
  ├── Field-level error descriptions
  └── Scroll-to-first-error on submit

Level 4 - Recovery States:
  ├── Undo/redo capability
  ├── Soft delete with recovery
  └── Draft auto-save and recovery

Level 5 - Critical Protection:
  ├── Multi-step confirmation
  ├── Type-to-confirm
  └── Email/SMS verification
```

### 2. Graceful Degradation

When errors can't be prevented, degrade gracefully:

```
Example: Image Upload
  Best case: Image uploads successfully
  Graceful: "Image too large. We've compressed it to fit."
  Warning:  "Image format not supported. Convert to JPG?"
  Error:    "Upload failed. Your image has been saved as draft."
  Worst:    "Connection lost. We'll retry when you're back online."

At every level, the user's work is protected.
```

### 3. The "Impossible Wrong" Pattern

Design interactions where the wrong action is physically impossible:

```
Example: Calendar Booking
  - Past dates are grayed out and unclickable
  - Already-booked times are marked and disabled
  - End time automatically adjusts if before start time
  - Weekends disabled if business-hours only
  
  The user literally cannot book an invalid slot.
```

### 4. Smart Defaults as Error Prevention

Pre-selecting the most common/appropriate option:

```
Example: Shipping Address
  - Default to user's saved address
  - Default country based on IP geolocation
  - Default shipping speed to standard (most common)
  - Pre-fill city and state from ZIP code

Each default eliminates one potential error.
```

### 5. Progressive Constraint Tightening

Start permissive, get stricter as user progresses:

```
Exploration phase:    Allow browsing with minimal constraints
Selection phase:      Validate selections are compatible
Configuration phase:  Enforce requirements and constraints
Confirmation phase:   Verify everything is correct
Submission phase:     Final validation before commit

Constraints increase as the cost of errors increases.
```

---

## Case Studies

### Google Forms: Real-Time Validation

**The Challenge**: Millions of non-technical users create forms.

**The Solution**:
- Required field indicators with real-time validation
- Response validation options (email, URL, number range)
- Preview mode to test forms before publishing
- Auto-save prevents data loss

**Result**: Even first-time users create functional, error-free forms.

### Stripe: Payment Error Prevention

**The Challenge**: Payment processing must be error-free; errors mean lost revenue.

**The Solution**:
- Card number formatting with auto-spacing
- Card type auto-detection from first digits
- Expiration date picker (no free text)
- Real-time card number validation (Luhn algorithm)
- Clear error messages: "Your card was declined. Try a different card."

**Result**: Industry-leading conversion rates with minimal payment errors.

### Gmail: "Did You Mean to Attach?"

**The Challenge**: Users frequently write "see attached" but forget to attach a file.

**The Solution**:
- Gmail detects phrases like "attached," "I've attached," or "see the attachment"
- If no attachment is detected, a warning appears: "It looks like you're talking about an attachment. Did you mean to attach a file?"
- User can proceed without attaching (not a blocker, just a nudge)

**Result**: One of the most beloved error-prevention features in any email client.

### Uber: Ride Confirmation

**The Challenge**: Users occasionally confirm rides to wrong destinations.

**The Solution**:
- Map preview shows pickup and dropoff locations
- Estimated fare displayed before confirmation
- Driver details and car info shown before pickup
- "Cancel" option available for several minutes after booking
- Route preview on map during ride

**Result**: Dramatic reduction in wrong-destination rides.

---

## Measuring the Impact

### Quantitative Metrics

Track these indicators:
- **Error rate**: How many form submissions contain errors?
- **Error-to-completion time**: How long does it take to recover from errors?
- **Abandonment at error points**: Do users leave when they hit errors?
- **Support tickets for "how do I..." questions**: Are users confused by inputs?
- **Undo usage rate**: How often do users rely on undo?
- **Confirmation dialog acceptance rate**: Do users actually read confirmation dialogs?

### Qualitative Indicators

- Users describe the interface as "easy" or "safe"
- No reports of "I accidentally deleted..."
- Users feel confident making changes without fear
- Error messages are understood on first read

---

## Common Mistakes

### 1. Error Messages Without Solutions

**The Error**: "Invalid input" with no guidance on what's valid.

**The Reality**: Error messages must tell users what went wrong AND how to fix it. "Please enter a valid email (e.g., name@example.com)"

### 2. Over-Constraining

**The Error**: Making inputs so restrictive that valid entries are rejected.

**The Reality**: Phone numbers have many valid formats. Accept all of them, then normalize internally. Be liberal in what you accept (Postel's Law).

### 3. Blocking Instead of Warning

**The Error**: Preventing every possible error with modal dialogs and disabled buttons.

**The Reality**: Some errors are low-risk and self-correctable. Use warnings for low-risk, blocks for high-risk.

### 4. Punishing Errors Instead of Preventing Them

**The Error**: Clearing the entire form when one field has an error.

**The Reality**: Never destroy user input as "punishment" for an error. Preserve everything and highlight only what needs fixing.

### 5. Confirmation Fatigue

**The Error**: Showing confirmation dialogs for every action.

**The Reality**: Too many confirmations train users to click "OK" without reading. Reserve confirmation for truly destructive or irreversible actions.

---

## Checklist for Applying Poka-Yoke

### Before Finalizing Any Interface:

- [ ] Have you identified every point where a user could make an error?
- [ ] Can any free-text inputs be replaced with constrained inputs (dropdowns, pickers)?
- [ ] Is validation real-time (not just on submit)?
- [ ] Are error messages specific and actionable?
- [ ] Is undo available for all significant actions?
- [ ] Are destructive actions protected with appropriate confirmation levels?
- [ ] Does auto-save protect against data loss?
- [ ] Are disabled states clearly distinguishable from active states?
- [ ] Have you tested with users to find error patterns you didn't anticipate?

---

## Poka-Yoke and Other UX Laws

Poka-Yoke works synergistically with:

- **Postel's Law**: Be liberal in what you accept, conservative in what you produce
- **Tesler's Law**: Move complexity from the user to the system
- **Hick's Law**: Fewer options means fewer opportunities for wrong choices
- **Paradox of the Active User**: Users won't read instructions, so prevent errors by design
- **Jakob's Law**: Use familiar patterns that users already know how to use correctly

---

## Conclusion

Poka-Yoke transforms the designer's relationship with user errors. Instead of viewing errors as user failures to be corrected through better documentation or training, it frames them as **system failures to be prevented through better design**.

The most trusted products in the world are built on error prevention:
- Banks don't let you transfer more than your balance
- Email clients warn you about missing attachments
- Operating systems ask before you empty the trash
- Cloud services auto-save your work

**The goal is not to create users who never make mistakes. The goal is to create systems where mistakes don't matter—because they're prevented, detected, or instantly recoverable.**

---

*Next: [Anchoring Effect →](anchoring-effect.md) - The first piece of information shapes all subsequent judgments.*
