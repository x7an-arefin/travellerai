# Miller's Law

> *"The average person can only keep 7 (±2) items in their working memory at a time."*
> — **George A. Miller**, 1956

---

## Overview

**Miller's Law** is one of the most famous findings in cognitive psychology, named after American psychologist George A. Miller. In his seminal 1956 paper "The Magical Number Seven, Plus or Minus Two," Miller proposed that the human working memory has a limited capacity—typically holding around 7 discrete pieces of information, give or take two.

While the exact number has been debated and refined over the decades, the core insight remains invaluable for design: **human memory is constrained, and good design works with these constraints rather than against them**.

This law has profound implications for how we chunk information, design navigation, structure forms, and present content to users.

---

## The Origin Story

### George Miller and the Magical Number Seven

In 1956, George Miller was studying memory and attention when he noticed something remarkable: across dozens of experiments and various types of stimuli, human short-term memory seemed to cluster around the number 7.

His research showed that:
- People could accurately recall about 7 random digits
- Memory span for letters was about 7
- Memory span for words was about 7
- Even for visual patterns, the "magic number" kept appearing

Miller's paper was groundbreaking not just for the finding itself, but for how it made researchers think about cognitive limits. It wasn't about intelligence or practice—everyone seemed to bump against this ceiling.

### The "Plus or Minus Two" Caveat

Miller was characteristically careful with his wording. He acknowledged that:
- The number varies by individual
- It varies by the type of information
- It can be improved with practice or chunking
- The range (5-9) is more accurate than the specific number 7

This is why modern designers reference "7±2" rather than just "7."

### The Evolution of the Theory

Subsequent research has refined Miller's findings:
- **Nelson Cowan** proposed the true limit is 4, not 7, and that Miller's findings reflected "chunks" rather than individual items
- **Kanderman and colleagues** found that working memory capacity varies significantly between individuals
- Modern cognitive science suggests **3-4 items** is more accurate for independent chunks

**But the practical lesson remains the same**: memory is limited, and we must design accordingly.

---

## The Psychology Behind Miller's Law

### Understanding Working Memory

Working memory is where we temporarily hold and manipulate information. It's like RAM for the brain:

- **Limited capacity**: Can only hold a few items at once
- **Temporary**: Information fades quickly if not rehearsed
- **Active**: Requires cognitive effort to maintain
- **Bottleneck**: Everything cognitive passes through it

**The Problem**: Any task requiring more memory than available creates cognitive overload, leading to:
- Errors
- Frustration
- Task abandonment
- Reliance on external memory aids

### Chunking: The Workaround

The key insight from Miller's research was **chunking**—grouping information into meaningful units.

Compare these two scenarios:

```
❌ Hard: Remember "F C B A I B M G M B A"

✅ Easy: Remember "FCBA IBM GMBA" (two familiar company names)
```

Or for numbers:

```
❌ Hard: 2025551234

✅ Easy: 202-555-1234 (phone number chunking)
```

**The principle**: Breaking information into meaningful groups increases effective memory capacity.

### Why 7±2 Matters for Design

When users interact with your interface, they're simultaneously:
- Holding task-relevant information in memory
- Processing new information
- Making decisions
- Tracking progress through steps

If you add too many items to remember:
- Memory capacity is exceeded
- Cognitive load increases
- Errors become more likely
- Users must rely on external aids (notes, back-button checking)

---

## Key Principles of Miller's Law

### 1. The Magic Number Is a Guideline

Don't rigidly aim for exactly 7 items. Use these ranges:
- **5 items**: When items are complex or unfamiliar
- **7 items**: For standard items with moderate complexity
- **9 items**: Only for very simple, well-known items
- **When in doubt, use fewer**: 4-5 is safer than 6-7

### 2. Chunking Is Your Best Friend

Group related items into meaningful categories:
```
✗ Bad: [Apples, Oranges, Bananas, Milk, Eggs, Bread, Cheese, Chicken, Rice, Pasta]

✓ Better: [Fruits: Apples, Oranges, Bananas] [Dairy: Milk, Eggs, Cheese] [Pantry: Bread, Rice, Pasta, Chicken]
```

### 3. Progressive Disclosure

Don't show everything at once. Reveal information gradually:
- Onboarding: One concept at a time
- Settings: Categorized into groups
- Content: Paginated or scrollable
- Forms: Multi-step rather than single long page

### 4. External Memory Aids

When you can't reduce cognitive load, provide aids:
- Progress indicators
- Confirmation summaries
- Auto-save functionality
- Persistent state

---

## Practical Applications in UI/UX Design

### Navigation Design

**The Problem**: Navigation menus with too many items overwhelm memory.

**The Solution**:
```
✗ Bad: 12 navigation items in a flat list

✓ Better: 5 primary items with expandable sub-menus

✓ Best: 5 primary items + search + account (7 total), with mega menus for detail
```

**Chunking Navigation**:
```
Primary Nav (5-7 items):
[Home] [Shop] [About] [Blog] [Contact]

Mega Menu Categories:
Shop → [Electronics | Clothing | Home & Garden | Sports]
About → [Our Story | Team | Careers | Press]
```

### Form Design

**The Problem**: Long forms with many fields exceed memory capacity.

**The Solution**:
```
✗ Bad: Registration form with 15 fields on one page

✓ Better: 4 steps with 4 fields each

✓ Best: 1-field-at-a-time registration (email → password → name → done)
```

**Chunking Strategies**:
```
Step 1: Account
- Email
- Password
- Confirm Password

Step 2: Personal
- Full Name
- Phone Number
- Date of Birth

Step 3: Address
- Street
- City
- State
- ZIP

Progress indicator shows: Step 2 of 3
```

### Content Presentation

**The Problem**: Dense walls of text exceed memory limits.

**The Solution**:
```
✗ Bad: 3,000-word article with no structure

✓ Better: 3 sections with headings, bullet points

✓ Best: Scannable format: headings, bullets, images, key stats highlighted
```

**Reading Patterns**:
- Users scan before they read
- Break content into digestible chunks
- Use visual hierarchy to show relationships
- Highlight key takeaways

### Search and Filtering

**The Problem**: Too many filter options overwhelm.

**The Solution**:
```
✗ Bad: 25 filter checkboxes all visible

✓ Better: Top 5 filters + "Show more"

✓ Best: Smart defaults + "Refine search" as needed
```

### Dashboard Design

**The Problem**: Information overload on data dashboards.

**The Solution**:
```
✗ Bad: 20 widgets all visible simultaneously

✓ Better: 5 key metrics + "View more" for details

✓ Best: Personalized dashboard with expandable sections
```

**Dashboard Chunking**:
```
Overview Row (5-7 widgets):
[Revenue] [Users] [Conversion] [Support Tickets] [Active Sessions]

Expandable Sections:
→ Revenue → Detailed breakdown
→ Users → Demographics
→ etc.
```

---

## The Art of Chunking

### What Makes a Good Chunk?

A good chunk is:
1. **Meaningful**: Related items grouped logically
2. **Recognizable**: Existing mental model can absorb it
3. **Consistent**: Internal pattern is predictable
4. **Distinct**: Clearly different from adjacent chunks

### Examples of Effective Chunking

**Phone Numbers**:
```
❌ 5551234567
✓ 555-123-4567 (chunked by phone company convention)
```

**Credit Card Numbers**:
```
❌ 4111111111111111
✓ 4111 1111 1111 1111 (chunked in 4s)
```

**Dates**:
```
❌ 20240615
✓ June 15, 2024 (recognizable format)
```

**Navigation**:
```
❌ [Home Products Services About Blog Contact FAQ Help Forum]

✓ [Home] [Shop] [About] [Blog] [Contact]
    └── Shop → [Electronics | Clothing | Home]
    └── About → [Story | Team | Careers]
```

**Pricing Plans**:
```
❌ 6 pricing tiers with random features

✓ 3 tiers: [Basic] [Pro ✓] [Enterprise]
   Each with clear differentiation
```

### Progressive Disclosure in Action

**Settings Pages**:
```
Not: 50 settings all visible

But:
[Account Settings] →展开→ Name, Email, Password
[Privacy Settings] →展开→ Profile visibility, Data sharing
[Notification Settings] →展开→ Email, Push, SMS
```

**Product Features**:
```
Not: All 20 features listed in paragraphs

But:
Featured Features (3 bullets) + "View all features" →展开→ All 20
```

---

## Miller's Law and Mobile Design

Mobile design amplifies Miller's Law challenges:

### Screen Real Estate

Mobile screens force chunking:
- Can't show all navigation at once
- Must prioritize what's shown
- Progressive disclosure is essential
- Bottom navigation (4-5 items) is standard

### Touch Memory Limitations

Users can't see everything and touch accurately simultaneously:
- Working memory is split between content and navigation
- Fewer visible options reduce memory load
- Clear visual hierarchy helps

### Mobile Navigation Best Practices

```
✓ Bottom tab bar: 4-5 primary destinations
✓ Hamburger menu: For secondary navigation
✓ Cards: For content that needs chunking
✓ Progressive disclosure: For detailed content
```

---

## Miller's Law and Web Forms

### The Psychology of Form Filling

Forms are memory tests:
1. Users must hold their input in mind while typing
2. They must remember what fields they've completed
3. They must recall any reference information (e.g., codes, passwords)
4. They must maintain the goal throughout

**The Solution**: Reduce memory demands at every step.

### Best Practices

**Auto-advance**:
```
After email entered → auto-focus to password field
No "Tab" or "Click" required
```

**Inline Validation**:
```
✗ Bad: "Password must be 8+ characters" after submission

✓ Good: "✓" or "✗" appears as user types
```

**Clear Labels**:
```
✗ Bad: Placeholder-only fields (empty form = confusing)

✓ Good: Persistent labels above or inside fields
```

**Auto-formatting**:
```
Phone: (555) 123-4567 (auto-formats as user types)
Credit Card: 4111 1111 1111 1111 (spaces auto-inserted)
Date: MM/DD/YYYY (auto-slashes)
```

### Multi-Step Forms

**Why They Work**:
- Each step has 3-5 items (memory-friendly)
- Progress indicator reduces uncertainty
- Completion feedback provides satisfaction
- Can auto-save between steps

**Structure**:
```
Step 1: Contact (2-3 fields)
Step 2: Shipping (3-4 fields)  
Step 3: Payment (3-4 fields)
Step 4: Review & Confirm
```

---

## Real-World Examples

### Amazon's Checkout Flow

Amazon has optimized checkout for memory:
- 1-Click purchasing (eliminates memory test)
- Address auto-fill
- Progress bar showing steps
- Clear order summary always visible
- Auto-save cart contents

### Apple's Setup Process

Apple's device setup uses Miller's Law:
- One question at a time
- Large, clear options
- Progress indicator
- Can complete with minimal memory load

### Google's Search Results

Google's infinite scroll applies chunking:
- 10 results per page (chunked from millions)
- Clear pagination options
- Grouped by relevance
- Quick preview without navigation

---

## Measuring Miller's Law Compliance

### Task Completion Metrics

- **Form completion rate**: Do users finish forms?
- **Error rate**: Do users make mistakes on multi-field forms?
- **Time on task**: Is cognitive load causing slowness?
- **Return visits**: Are users leaving to check information elsewhere?

### User Behavior Analysis

- Heat maps: Where do users hesitate?
- Session recordings: Are users forgetting previous steps?
- Support tickets: Are users asking about lost information?
- Drop-off analysis: Where do users abandon multi-step flows?

---

## Common Mistakes

### 1. Confusing Familiarity with Simplicity

**The Error**: "Users know how to fill out forms, so we can have many fields."

**The Reality**: Familiarity doesn't eliminate memory load. Users still have to hold each input in mind.

### 2. Ignoring Mobile Memory Constraints

**The Error**: Same form works on desktop, so it'll work on mobile.

**The Reality**: Mobile users are often distracted, moving, or multi-tasking. Their working memory is under even more strain.

### 3. Progressive Disclosure Done Wrong

**The Error**: Hiding options users need immediately.

**The Reality**: Progressive disclosure should hide *secondary* complexity, not *primary* functionality.

### 4. Over-Chunking

**The Error**: Breaking content into too many tiny pieces.

**The Reality**: Users can get lost if everything is fragmented. Find the right level of chunking.

---

## Miller's Law Checklist

### For Any Interface:

- [ ] Count the items visible at each decision point (aim for 5-9)
- [ ] Can related items be chunked into categories?
- [ ] Is progressive disclosure used for secondary content?
- [ ] Are forms broken into multi-step if they have 5+ fields?
- [ ] Do users have external memory aids (progress bars, auto-save)?
- [ ] Is auto-formatting used for phone numbers, dates, credit cards?
- [ ] Are inline validation and feedback provided?
- [ ] Can you reduce visible options without losing functionality?
- [ ] Is the content scannable, not just readable?
- [ ] Have you tested with real users under realistic conditions?

---

## Miller's Law in Different Contexts

### Voice Interfaces

Voice UI has no visual hierarchy to help chunking:
- Keep commands to 3-5 options
- Provide clear prompts
- Use confirmations for multi-step tasks
- Remember context across interactions

### Wearables

Tiny screens force extreme chunking:
- One piece of information at a time
- Clear hierarchy is essential
- Progressive disclosure is mandatory
- Glanceable design

### Accessibility Considerations

Users with cognitive disabilities may have reduced working memory:
- Clear, consistent navigation
- Chunked content
- Progress indicators
- Memory aids throughout

---

## Conclusion

Miller's Law reminds us that **human memory is a precious, limited resource**. Every item we ask users to remember is a cognitive debt that must be repaid with attention and mental effort.

The most user-friendly interfaces are those that:
1. Minimize what users must remember
2. Chunk information into meaningful groups
3. Provide external memory aids
4. Use progressive disclosure to manage complexity
5. Design for the constrained reality of human cognition

By working with Miller's Law rather than against it, you create interfaces that feel natural and effortless—not because they're simple, but because they've been designed to work within—and even leverage—how human memory actually works.

**Remember**: The goal isn't to have 7 items everywhere. It's to respect the limits of human cognition by presenting information in digestible, meaningful chunks that align with how people naturally process and remember things.

---

*Next: [Parkinson's Law →](parkinsons-law.md) - Work expands to fill the time available for its completion.*
