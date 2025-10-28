<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
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
  - You can still forward dynamic content via children

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
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
    - expire (default: 1 year)
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

- Make as much data loading cached.
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

## Add to my team

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
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

- dynamic APIs never within `"use cache"`
- dynamic APIs always within `<Suspense>`

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
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

- Load dynamic data near the top. If possible, don't await.
- cache below and pass dynamic data via props/children

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
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

- Dynamic at the speed of static
- No longer full page decision
- Goal for us: Make as much static/cached as possible
- --> Not always worth it.
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
