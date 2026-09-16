## Astro Feature-Based Architecture Guideline
## 1. Directory Structure Rule
We separate Routing (src/pages/) from Features (src/modules/). 

* Pages act as the entry point (URL).
* Modules contain the logic, UI, and data fetching.

src/
├── modules/
│   └── [feature-name]/                <-- Self-contained feature
│       ├── components/                <-- .astro components
│       ├── [feature].controller.ts    <-- Business logic / Data fetching
│       ├── [feature].model.ts         <-- Interfaces / Types
│       └── [feature].utils.ts         <-- Helpers
└── pages/
    └── [route]/
        └── index.astro                <-- Imports from @[feature]

------------------------------
## 2. Configuration (One-Time Setup)
Astro automatically reads aliases from tsconfig.json. You do not need to configure astro.config.mjs separately for this. [6, 7] 
## Configure tsconfig.json
Add the paths to your compilerOptions.

{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@modules/*": ["src/modules/*"]
    }
  }
}

------------------------------
## 3. Workflow for Creating a New Feature
Follow these steps when adding a feature (e.g., blog).
## Step 3.1: Create the Logic
Define your data shape and fetching logic in TypeScript files.
File: src/modules/blog/blog.model.ts

export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: Date;
}

File: src/modules/blog/blog.controller.ts

import type { BlogPost } from './blog.model';
export async function getLatestPosts(): Promise<BlogPost[]> {
  // Simulate CMS fetch
  return [
    { slug: 'astro-tips', title: 'Astro Architecture', publishedAt: new Date() }
  ];
}

## Step 3.2: Create the Component
Use the controller inside the component's frontmatter.
File: src/modules/blog/components/PostList.astro

---
import { getLatestPosts } from '../blog.controller';
// Data fetching happens here (Server-side)
const posts = await getLatestPosts();
---

<div class="post-list">
  {posts.map((post) => (
    <article>
      <h3>{post.title}</h3>
      <a href={`/blog/${post.slug}`}>Read more</a>
    </article>
  ))}
</div>

## Step 3.3: Use in a Page
Keep the page file clean. Just import and place the component.  
File: src/pages/blog/index.astro

---
import PostList from '@blog/components/PostList.astro';
import Layout from '../../layouts/Layout.astro';
---

<Layout title="Our Blog">
  <h1>Latest News</h1>
  <PostList />
</Layout>

   
   
## Checklist for Astro to follow during development
1. Server vs Client: Are controllers strictly server-side? Ensure they aren't imported into <script> tags (client-side JS) inside .astro files unless intended.
2. No Styles in Controllers: Ensure CSS/Styles live only in .astro components, not in .ts logic files.
3. Dynamic Imports: If the module is heavy, consider lazy loading components in the page: import MyComp from '...'; is standard, but for client interaction, ensure client:load is only used when necessary.
4. Tailwind Classes Only: Are there inline style attributes or custom CSS files outside of src/styles/? If yes, reject and convert them to Tailwind utilities or design token classes.
5. UX Analysis Before Design: Was a UX/UI behaviour analysis collected from developer input before any new page layout or section was designed? If no analysis exists, the PR must not include new UI layouts.
6. SVG Assets Are Inline or Component: Are SVG files loaded as <img> tags? If yes, they must be converted to inline SVG or .astro SVG components so they can be styled and animated.

Here is a dedicated section designed to plug directly into your existing guidelines, extending your feature-based structure to accommodate SolidJS Islands.

---

## 4. SolidJS Islands Architecture (Client-Side Interactivity)

Astro renders pure HTML by default. When an interactive UI component is required (e.g., dynamic filtering, search bars, modals, live counters), we isolate that functionality into a **SolidJS Island** using the `@astrojs/solid-js` integration.

### Core Architecture Principles

1. **Islands at the Leaves:** Keep SolidJS components as leaf nodes in your component tree. Wrap them in Astro layouts and Astro components rather than building large Single Page App (SPA) trees inside Solid.
2. **Server-First Data Flow:** Fetch data on the server via `[feature].controller.ts` in `.astro` frontmatter, then pass serializable data into the Solid component via props. Avoid redundant client-side fetching during initial render.
3. **Strict Isolation:** Solid components must **never** import server-side controller methods that touch databases, secrets, or node APIs.

---

### 4.1. Directory Structure Extension

Islands live within the feature's `components/` directory under a dedicated `islands/` subfolder. This makes the boundary between static HTML and client-hydrated code immediately obvious.

```text
src/
└── modules/
    └── [feature-name]/
        ├── components/
        │   ├── PostList.astro              <-- Static Astro component
        │   └── islands/                    <-- SolidJS client-hydrated components
        │       ├── PostFilter.tsx          <-- Solid UI component
        │       └── PostFilter.store.ts     <-- (Optional) Island-specific client state
        ├── [feature].controller.ts         <-- Server-only logic
        ├── [feature].model.ts
        └── [feature].utils.ts

```

---

### 4.3. Step-by-Step Workflow for an Island

#### Step A: Define the SolidJS Island Component

Create the interactive component using Solid primitives (`createSignal`, `createMemo`, `For`, etc.).

**File: `src/modules/blog/components/islands/PostFilter.tsx**`

```tsx
import { createSignal, createMemo, For } from 'solid-js';
import type { BlogPost } from '../../blog.model';

interface PostFilterProps {
  initialPosts: BlogPost[];
}

export default function PostFilter(props: PostFilterProps) {
  const [query, setQuery] = createSignal('');

  const filteredPosts = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return props.initialPosts;
    return props.initialPosts.filter((post) =>
      post.title.toLowerCase().includes(q)
    );
  });

  return (
    <div class="flex flex-col gap-4">
      <input
        type="search"
        placeholder="Filter posts..."
        value={query()}
        onInput={(e) => setQuery(e.currentTarget.value)}
        class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div class="space-y-2">
        <For each={filteredPosts()} fallback={<p class="text-sm text-slate-500">No matching posts found.</p>}>
          {(post) => (
            <article class="p-3 bg-white rounded shadow-sm border border-slate-100">
              <h4 class="font-medium text-slate-900">{post.title}</h4>
              <a href={`/blog/${post.slug}`} class="text-blue-600 text-sm hover:underline">
                Read post →
              </a>
            </article>
          )}
        </For>
      </div>
    </div>
  );
}

```

#### Step B: Mount the Island in an Astro Component

Import the Solid component into an `.astro` component and assign the appropriate `client:*` hydration directive.

**File: `src/modules/blog/components/PostList.astro**`

```astro
---
import { getLatestPosts } from '../blog.controller';
import PostFilter from './islands/PostFilter';

// Fetched on the server
const posts = await getLatestPosts();
---

<section class="max-w-xl mx-auto py-6">
  <h2 class="text-xl font-bold mb-4">Search & Filter Articles</h2>
  
  {/* Hydrates only when the component enters the viewport */}
  <PostFilter client:visible initialPosts={posts} />
</section>

```

---

### 4.4. Hydration Directives Cheat Sheet

Choose the least aggressive directive required for the user experience:

| Directive | Best Use Case | Performance Cost |
| --- | --- | --- |
| `client:load` | Critical above-the-fold UI requiring immediate interaction (e.g., hero search, main navigation). | High (executes during initial load) |
| `client:idle` | Lower-priority UI that doesn't block the critical path (e.g., newsletter signup, feedback widgets). | Medium (hydrates after initial window load) |
| `client:visible` | Below-the-fold dynamic widgets (e.g., comments section, interactive media players). | Low (hydrates only when scrolled near) |
| `client:media="(min-width: ...)"` | Mobile-only or desktop-only toggles (e.g., responsive drawers). | Low-Medium (conditional on viewport) |
| `client:only="solid-js"` | Components that use browser-only APIs and cannot SSR (e.g., Canvas, WebGL, local storage dashboard). | Zero SSR HTML, hydrates client-side |

---

### 4.5. Cross-Island Communication (Shared State)

When two separate Solid islands need to communicate without a shared Solid parent (e.g., a header cart indicator and an "Add to Cart" button on the page), use **Nano Stores** (`nanostores` + `@nanostores/solid`) or **shared module-level signals**.

**File: `src/modules/cart/cart.store.ts**`

```ts
import { atom } from 'nanostores';

export const $cartCount = atom<number>(0);

export function addToCart() {
  $cartCount.set($cartCount.get() + 1);
}

```

**File: `src/modules/cart/components/islands/CartButton.tsx**`

```tsx
import { useStore } from '@nanostores/solid';
import { $cartCount, addToCart } from '../../cart.store';

export default function CartButton() {
  const count = useStore($cartCount);

  return (
    <button
      onClick={addToCart}
      class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Cart ({count()})
    </button>
  );
}

```