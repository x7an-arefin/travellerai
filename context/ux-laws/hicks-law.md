# Hick's Law

> *"The time it takes to make a decision increases with the number and complexity of choices."*
> — **William Edmund Hick** and **Ray Hyman**, 1952

---

## Overview

**Hick's Law** (also known as the Hick-Hyman Law) describes the relationship between the number of choices presented and the time required to make a decision. Named after British psychologist William Edmund Hick and his colleague Ray Hyman, this law quantifies what seems intuitively obvious: the more options you present, the longer it takes for users to decide.

The mathematical formulation shows that decision time increases **logarithmically** with the number of choices—not linearly. This means doubling the options doesn't double the decision time, but it does add measurable delay and cognitive effort. This logarithmic relationship provides hope: carefully reducing options can yield significant improvements in decision speed without eliminating all choice.

---

## The Origin Story

### The Hick-Hyman Experiments

In 1952, Hick and Hyman conducted a series of experiments to understand the relationship between choices and reaction time. Their methodology was elegant:

1. Participants were presented with a set of stimuli (lights or signals)
2. They had to respond to each stimulus as quickly as possible
3. The researchers varied the number of stimuli from 1 to 10
4. They measured the time between stimulus presentation and the participant's response

**Key Finding**: The reaction time increased systematically as the number of choices grew. The relationship followed a logarithmic pattern, which could be expressed mathematically:

```
RT = a + b × log₂(n + 1)
```

Where:
- `RT` = Reaction Time
- `a` = Base time for mental processing
- `b` = Time taken to evaluate each option
- `n` = Number of choices

### The Choice Overload Phenomenon

Hick and Hyman's work laid the foundation for what psychologists now call **"choice overload"** or **"analysis paralysis."** Later research, including Barry Schwartz's influential work on "The Paradox of Choice," has shown that too many options don't just slow decisions—they can prevent decisions entirely, leading to:
- Decision avoidance
- Lower satisfaction with chosen options
- regret about unchosen options
- Complete abandonment of the task

---

## The Psychology Behind Hick's Law

### Cognitive Processing and Mental Effort

Every decision requires cognitive processing. When users face multiple options, they must:

1. **Perceive** each option (register that it exists)
2. **Understand** what each option means
3. **Compare** options against each other
4. **Evaluate** the pros and cons of each
5. **Decide** which option best meets their needs
6. **Act** on their decision

This process takes mental energy. With few options, the processing is quick. With many options, the cumulative processing time and cognitive load become overwhelming.

### The Logarithmic Advantage

Here's the good news: the logarithmic nature of Hick's Law means that reducing choices from 10 to 5 has a bigger impact than reducing from 5 to 3. The first cuts matter most.

| Choices | Decision Time (relative) |
|---------|--------------------------|
| 1       | 1.0x                     |
| 2       | 1.6x                     |
| 3       | 2.0x                     |
| 5       | 2.6x                     |
| 7       | 3.0x                     |
| 10      | 3.5x                     |
| 20      | 4.3x                     |
| 50      | 5.6x                     |

Notice that going from 10 to 5 choices saves more time than going from 5 to 3. This is why simplifying from a cluttered menu to a reasonable set of options yields dramatic improvements.

### Why Too Many Choices Lead to Abandonment

When the number of choices exceeds a comfortable threshold, several psychological phenomena kick in:

- **Fear of making the wrong choice**: With many options, users worry they'll choose a suboptimal option
- **Regret anticipation**: Users imagine the disappointment they'll feel if they choose poorly
- **Effort vs. payoff calculation**: Users assess whether finding the best option is worth the effort
- **Decision fatigue**: The more decisions made, the harder subsequent ones become

---

## Key Principles of Hick's Law

### 1. Simplify Choices, Not Control

Reducing options doesn't mean limiting user freedom. It means:
- Presenting the most relevant options first
- Hiding advanced or rarely-used options behind progressive disclosure
- Grouping similar options into categories
- Providing intelligent defaults or recommendations

### 2. Progressive Disclosure

Reveal complexity gradually:
- Show essential options upfront
- Make advanced options available on demand
- Use accordions, tabs, and expandable sections
- Provide "Show more" or "Advanced options" links

### 3. Categorization and Chunking

Organize options into meaningful groups:
- 10 navigation items in 3 categories is easier than 10 items in a flat list
- A menu with categories (Appetizers, Mains, Desserts) is easier than a numbered list of 15 items
- Filtering sidebar with grouped options beats a long list of checkboxes

### 4. Smart Defaults

Pre-select the most common or recommended option:
- Reduces visible choices without eliminating them
- Most users will accept the default
- Power users can still make different choices
- Examples: Most popular plan highlighted, default shipping option, common date/time

---

## Practical Applications in UI/UX Design

### Navigation Menus

**The Problem**: Large e-commerce sites can have 50+ navigation items, overwhelming users.

**The Solution**:
```
✗ Bad: A horizontal menu with 15 top-level items, each with 10 sub-items

✓ Better: 5-7 primary categories, expandable sub-categories, search-focused navigation

✓ Best: Mega menu with clear categorization, search with autocomplete, browse by department
```

**Example**:
```
✗ Before: [Home | Products | About | Services | Blog | Portfolio | Team | Contact | FAQ | Careers]

✓ After: [Home | Products | Solutions | Resources | Company] (with mega menu for detailed navigation)
```

### Pricing Pages

**The Problem**: Too many pricing tiers create analysis paralysis.

**The Solution**:
```
✗ Bad: 6 pricing tiers with slightly different features

✓ Better: 3 clearly differentiated tiers (Basic, Pro, Enterprise)

✓ Best: 3 tiers with one prominently recommended, clear value proposition for each
```

**The 3-Tier Rule**: Most successful pricing pages use 3 tiers. This provides enough variety without overwhelming. Research shows 3 options leads to higher conversion than 2 or 4+.

**Implementation Tips**:
- Highlight the "recommended" or "most popular" tier
- Make the middle tier the recommended option (anchoring effect)
- Use visual distinction (size, color, badge) for the preferred tier
- Clearly show what's included in each tier

### Onboarding Flows

**The Problem**: Multi-step forms asking for too much information at once.

**The Solution**:
```
✗ Bad: A registration form with 12 fields on one page

✓ Better: 4 pages with 3 fields each

✓ Best: Single-field micro-steps (just email → just password → just name)
```

**The One-Thing-at-a-Time Approach**:
- Airbnb: Just the dates → Just the listing → Just the guest info
- Slack: Just email → Just password → Just your name
- Tinder-style onboarding: One question at a time

### Search Results and Filtering

**The Problem**: Hundreds of search results with complex filtering.

**The Solution**:
```
✗ Bad: All filters visible immediately, results sorted only by relevance

✓ Better: Top filters visible, "Show more filters" for advanced options

✓ Best: Intelligent defaults, faceted search, "Smart sort" suggestions
```

**Filter Best Practices**:
- Show top 5-6 filters by default
- Group filters into categories (Price, Brand, Features)
- Use "Show X more" for secondary filters
- Display result count next to each filter option
- Auto-apply filters with clear "Clear all" option

### Product Catalogues

**The Problem**: Users overwhelmed by thousands of products.

**The Solution**:
```
✗ Bad: All products in one giant grid

✓ Better: Category pages with sub-categories

✓ Best: Personalized recommendations, "Customers also viewed," trending items
```

**E-commerce Strategies**:
- Curated collections ("Staff Picks," "Trending Now")
- "Complete the look" recommendations
- Recently viewed items
- Personalized homepage based on browsing history

### Mobile Interfaces

**The Problem**: Limited screen space makes choice overload even more problematic.

**The Solution**:
```
✗ Bad: Hamburger menu with 15+ items, all visible when opened

✓ Better: Bottom tab bar with 5 core destinations

✓ Best: Bottom bar + contextual actions, swipe gestures for secondary options
```

**Mobile Navigation Best Practices**:
- Limit visible navigation items to 5 (rule of thumb)
- Use bottom navigation for primary destinations
- Reserve hamburger menus for secondary navigation
- Implement smart defaults for common actions

---

## Advanced Hick's Law Strategies

### 1. Intelligent Defaults and Recommendations

Reduce cognitive load by making choices for users:

```
Example: Spotify's "Discover Weekly"
- Instead of presenting 30 million songs
- Recommends 30 songs based on listening history
- Users can explore more if they want, but have a curated starting point
```

### 2. Binary Choices as Gateways

When you can't eliminate choices, use binary decisions as gates:

```
Example: Apple's setup process
- Not: "Configure 50 settings now"
- But: "Use Express Setup (recommended) or Customize settings"
```

### 3. The "F pattern" of Choice

Design for how users actually scan:

```
Users scan in F-patterns:
- Horizontal line at top (first row of options)
- Another horizontal line slightly lower (second row)
- Vertical line down the left side (left-most items in each row)

Place most important choices in these zones.
```

### 4. Limiting Without Limiting

Hide options without removing them:

```
E-commerce Example:
- "12 other colors available" (click to expand)
- "50+ payment methods" (click to see all)
- "View all features" (accordion in product description)
```

### 5. The Paradox of Choice Mitigation

When you must show many options, provide scaffolding:

```
Investment Platform Example:
- Step 1: "What type of investor are you?" (Conservative / Moderate / Aggressive)
- Step 2: "Based on your profile, here are 5 recommended portfolios"
- Step 3: "Customize your allocation" (for power users)
```

---

## Case Studies

### Netflix: From Flat List to Curated Grid

**The Challenge**: Netflix has thousands of titles. Showing them all in one list would paralyze users.

**The Solution**: 
- Personalized rows ("Because you watched X")
- Category browsing ("Trending Now," "New Releases")
- "Top 10 in Your Country"
- Recommendation algorithm that surfaces relevant content

**Result**: Users spend less time searching and more time watching.

### Apple: Simplifying iPhone Setup

**The Challenge**: Setting up a new iPhone requires configuring dozens of options.

**The Solution**:
- Express Setup: Apply recommended settings automatically
- Customize: For users who want control
- Post-setup configuration available in Settings

**Result**: New users can start using their phone immediately, without decision paralysis.

### Google: Minimalist Search

**The Challenge**: How do you let users find anything on the internet?

**The Solution**:
- One search box
- Autocomplete suggestions (reducing visible options)
- Results on a clean page
- Filters only when needed

**Result**: Search that takes seconds, not minutes.

---

## Measuring the Impact of Hick's Law

### Quantitative Metrics

Track these indicators:
- **Time to first click**: How long until users engage?
- **Decision completion rate**: Do users complete the decision?
- **Abandonment rate**: Do users leave the page?
- **Form completion rate**: How many users finish multi-step flows?
- **Search refinement rate**: Do users add more filters or simplify?

### Qualitative Indicators

- User interviews about feeling "overwhelmed"
- Feedback about "too many options"
- Observations of decision hesitation
- Heat map analysis of where users click vs. ignore

### A/B Testing Framework

```
Test 1: Current state vs. simplified options
Test 2: 3 options vs. 4 options vs. 5 options
Test 3: Categorized vs. flat list
Test 4: With recommended option vs. without
```

---

## Common Mistakes

### 1. Mistaking Options for Value

**The Error**: "If we add more options, users will find exactly what they need."

**The Reality**: More options often means no options feel "right." Users feel less satisfied with more choices.

### 2. False Variety

**The Error**: Creating 8 slightly different products when 3 meaningfully different ones would suffice.

**The Reality**: Similar options don't add real choice—they add confusion.

### 3. Ignoring Defaults

**The Error**: Presenting options without any guidance or recommendation.

**The Reality**: Most users accept defaults. Guide them to the best option for them.

### 4. Progressive Disclosure Done Wrong

**The Error**: Hiding options users actually need regularly.

**The Reality**: Progressive disclosure should hide *complexity*, not *functionality*.

---

## Checklist for Applying Hick's Law

### Before Finalizing Any Interface:

- [ ] Have you counted the visible options on each screen?
- [ ] Could you reduce options without removing valuable choices?
- [ ] Are options categorized or grouped meaningfully?
- [ ] Is there a recommended or default option?
- [ ] Have you implemented progressive disclosure for advanced options?
- [ ] Can users complete the primary task without encountering many choices?
- [ ] Have you tested with real users to see if they feel overwhelmed?
- [ ] Is the most common action clearly the easiest to take?

---

## Hick's Law and Other UX Laws

Hick's Law works synergistically with:

- **Jakob's Law**: Use familiar patterns AND reduce options
- **Miller's Law**: Chunk information AND limit visible choices
- **Fitts's Law**: Make key options large and accessible
- **Parkinson's Law**: Set tight limits on available time
- **Zeigarnik Effect**: Use incomplete choices to drive completion

---

## Conclusion

Hick's Law teaches us that **more is not always better**. In our eagerness to provide comprehensive solutions, we often overwhelm users with choices they don't want and can't use. The goal of good UX design is not to present every possible option—it's to help users find the right option quickly and confidently.

The most successful products in the world have mastered this principle:
- Amazon doesn't show you all products; it shows you relevant ones
- Spotify doesn't list all songs; it curates playlists
- Google doesn't list all websites; it ranks the best ones

**The art of UX design is knowing what to leave out.** By reducing choices to the most relevant set, organizing them thoughtfully, and providing intelligent guidance, you can create interfaces that feel effortless to use—even when they're actually making thousands of decisions on the user's behalf.

---

*Next: [Fitts's Law →](fitts-law.md) - The time to acquire a target depends on its distance and size.*
