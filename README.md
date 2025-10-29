<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# What Sets Next.js Apart: A Deep Dive into Caching

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Who am I?

- Andreas (andreas.roth@esveo.com)
- from Dresden
- Working with React since 0.13 (10 years ago)
- CTO @ esveo
- My job: helping others write better and faster applications

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## What Next.js and others offer

1. Built-in build pipeline and tooling
1. File based routing with layouts & nested routing
1. Unified experience for client AND server work
1. Performance primitives (e.g. next/image)

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Next.js 16

- Announced at Next.js conf last week!
- Partial Prerendering is now stable!
- cacheComponents as new config option

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Diving into the app

1. Boring home page
1. All Pokemon page with list/details layout

```
app/
├── all-pokemon/                # Feature route segment
│   ├── layout.tsx              # Layout wrapping all nested pages under /all-pokemon
│   ├── page.tsx                # Index page: /all-pokemon (lists all Pokémon)
│   └── [name]/                 # Dynamic segment for individual Pokémon detail pages
│       └── page.tsx            # Detail page: /all-pokemon/<name>
│
├── layout.tsx                  # Root app layout (applies to entire app)
└── page.tsx                    # Home page: /

Route examples:
	/all-pokemon                 → uses root layout + all-pokemon/layout + all-pokemon/page
	/all-pokemon/pikachu         → uses root layout + all-pokemon/layout + [name]/page

Layout nesting flow:
	root layout.tsx
		└─ all-pokemon/layout.tsx
				 └─ page.tsx (list) OR [name]/page.tsx (detail)
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# Task 1: Add dynamic data

## Let's do it!

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## What we learned

- Use `npm run build && npm run start` to debug performance and caching
- Next.js 16 now requires suspense for top level dynamic code and prevents "the Next.js feeling"

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# First optimization: dedupe within requests

## Let's do it!

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## What did we learn?

- Use `cache` to make sure that a function is only executed once in a request (per arguments)
- Very low risk. Can't leak data from other users, can't have stale data.
- Can be used to pass around request context to other server components

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

```tsx
import { cache } from "react";

const getHandle = cache(() => ({} as any));

function setRequestContext(ctx: { user: User }) {
  const handle = getHandle();
  Object.assign(handle, ctx);
}

function getRequestContext() {
  return getHandle() as { user: User };
}
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# Second optimization: "use cache"

## Let's do it!

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## What we learned

- Can be added to data fetching functions
- CAN be added to components, but affects all children
- All arguments (and thus props) need to be simple data objects, no class instances, no functions
- (Exceptions exist, more on that later)

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Invalidation

- `cacheTag`
- `revalidateTag`
- `updateTag`
- `cacheLife`
  - concepts
    - staleTime (default: 5 minutes)
    - revalidate (default: 15 minutes)
    - expire (default: 1 year) - this is new!
  - options: seconds, minutes, hours, days, wekks, max (see [docs](https://nextjs.org/docs/app/api-reference/functions/cacheLife))

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Summary

- Make as much data loading cached as possibe
- Pages will render statically as a result
- The more dynamic your content is, the more complex your revalidation logic will be

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# Let's add user specific content!

## Implement My Team!

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## What we learned

- dynamic APIs can not be used within `"use cache"`
- dynamic APIs always need to be within `<Suspense>`

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## The tricky parts: Preventing static elements to become dynamic

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## What we learned

- Load dynamic data near the top. If possible, don't await
- Cache whole components and pass "awaiting" components with props
- If required, pass down promises, without awaiting, and await as deep as possible

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# What if I'm still on Next.js 15

- use fetch (`fetch(url, { next: { revalidate: 30, tags: ["tag"] }})`)
  - Already deduplicated
  - Can use the data cache (but no expiration time)
- `cache(fn)` already exists for deduplication
- `unstable_cache(fn, keyParts, options)` from next.js can be used instead of `"use cache"`
- Page level settings can be used to control fully static pages.

```tsx
export const dynamic = "force-static";
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# Summary

- **_Dynamic at the speed of static_**
- Dynamic vs Static is no longer a full page decision
- Goal for us: Make as much static/cached as possible
- --> Not always worth it.
  - Adding use cache to a component that always directly returns "boring" JSX can be more costly, than just rendering it.
  - Internal app: Being up to date is much more important, invalidation can become tricky
  - E-Commerce: Being up to date is only rarely a must, performance is of utmost importance!

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

More questions? Let's chat!

andreas.roth@esveo.com

𝕏 @andrewgreenh

Code and "slides"

![QR-Code to https://github.com/andrewgreenh/nextjs-caching-talk](./public/qr-code.svg)<br>
https://github.com/andrewgreenh/nextjs-caching-talk
