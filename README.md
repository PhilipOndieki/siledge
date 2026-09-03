# Siledge Industrial Solutions — Marketing Site

The marketing website for **Siledge Industrial Solutions Ltd** (`siledge.co.ke`): four static pages
(Home, About, Products, Contact) built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command             | What it does                                                                       |
| ------------------- | ---------------------------------------------------------------------------------- |
| `npm run build`     | Production build (this is also where the content validation gate runs — see below) |
| `npm run start`     | Serve the production build                                                         |
| `npm run typecheck` | `tsc --noEmit`                                                                     |
| `npm run lint`      | ESLint, including the import-boundary rule                                         |
| `npm run format`    | Prettier check (`format:write` to fix)                                             |
| `npm run test`      | Vitest unit/component tests                                                        |
| `npm run e2e`       | Playwright end-to-end tests (builds and serves the app first)                      |

CI (`.github/workflows/ci.yml`) runs all of the above, in that order, on every push and PR.

## Content architecture — and why it exists

The most important decision in this codebase: **content is data, validated at build time, consumed
through a typed query API.** No component ever imports raw content directly.

```
lib/content/
  schema.ts       # Zod schemas — the single definition of what a valid record looks like
  data/           # Raw content: company.ts, categories.ts, products.ts, services.ts,
                  # industries.ts, ui.ts — plain, boring, editable arrays/objects
  index.ts        # The validation gate — parses every data file through its schema at
                  # module load, then checks referential integrity (see below)
  queries.ts      # The only API components are allowed to call
```

**Why the gate matters.** Every page in this app is statically generated, so `lib/content/index.ts`
runs once at _build time_. If a category is misspelled, a product points at a category that doesn't
exist, or an icon name doesn't resolve, `next build` fails with a specific, actionable error — not a
blank box or a crash in front of a customer:

```
[content] Product "tapered-roller-bearing" references unknown category "bearing".
          Known categories: bearings, oil-seals, hydraulic-seals, ...
          Fix lib/content/data/products.ts or add the category to categories.ts.
```

The gate checks: every schema (via Zod), duplicate category slugs, duplicate product ids, duplicate
category `order` values, every `icon` string resolving to a real entry in `lib/icons.ts`, and every
category having at least one product. `lib/content/index.test.ts` proves this by feeding it
deliberately broken fixtures (an orphan product, a duplicate order, an invalid slug) and asserting it
throws with a message naming the problem.

**Why the query API matters.** Components call `getCategories()`, `getProductsByCategory(slug)`,
`getCompany()`, etc. — never `import { categoriesData } from "lib/content/data/categories"`. This
boundary is enforced by an ESLint rule (`no-restricted-imports` in `.eslintrc.json`), not just
convention. It means:

- Query results are frozen and defensively copied — a component can't mutate the catalogue.
- Products are indexed into a `Map<categorySlug, Product[]>` once, at module load, not re-filtered on
  every render — this is what keeps the products page fast as the catalogue grows.
- If the catalogue ever outgrows a TypeScript file, only `lib/content/index.ts` changes (to fetch from
  a CMS or database instead of parsing local arrays). Every component, page, and test keeps working
  because they only ever talked to `queries.ts`.

## Worked example: adding a ninth category

This is the proof that the architecture holds up. Adding a category takes exactly two steps, in one
file each:

1. Append one object to `lib/content/data/categories.ts`:
   ```ts
   {
     slug: "gaskets",
     name: "Gaskets",
     order: 9,
     tagline: "Sealed, Reliable",
     attributes: ["Sealed", "Reliable"],
     description: "Flat and spiral-wound gaskets for static sealing applications.",
     icon: "layers",       // must exist in lib/icons.ts
     featured: true,
     image: null,
   }
   ```
2. Append its products to `lib/content/data/products.ts`, each with `categorySlug: "gaskets"`.

That's it. The homepage category grid, the products page sidebar (with its live count), the footer's
product links, and `app/sitemap.ts` all update automatically — every one of them reads from
`getCategories()` / `getProductsByCategory()`. If you find yourself editing a third file (a page, a
component) to make a new category show up, the architecture has a bug — file it as one.

## Performance budgets

| Metric                   | Budget           | Measured (Lighthouse, desktop preset, production build)        |
| ------------------------ | ---------------- | -------------------------------------------------------------- |
| LCP (mobile, 4G)         | < 2.0s           | — (desktop preset LCP: ~0.6s; no heavy assets to regress this) |
| CLS                      | < 0.05           | 0                                                              |
| INP                      | < 200ms          | not yet measured under load                                    |
| First-load JS, homepage  | < 130 KB gzipped | **118 KB**                                                     |
| Lighthouse Performance   | 95+              | **100** (all four pages)                                       |
| Lighthouse Accessibility | 100              | **100** (all four pages)                                       |

Two decisions keep the homepage under its JS budget despite `framer-motion` powering every entrance
animation:

- **`LazyMotion` + `domAnimation`** (`app/providers.tsx`): the app uses `m.div`/`m.span` (framer-motion's
  lightweight components) everywhere instead of the full `motion.*` proxy, which pulls in the whole
  animation engine unconditionally. `domAnimation` still covers everything the brief asks for —
  `whileInView`, `variants`, stagger — at roughly half the bundle cost.
- **Reduced motion is handled once**, in `app/providers.tsx`, via `<MotionConfig reducedMotion="user">`.
  No component calls `useReducedMotion()` itself.

Run `npm run build` to see the current per-route bundle sizes in the terminal output.

## The 300-product routing threshold

Today, all ~50 products across 8 categories are fetched once (`getProducts()`) and passed as a prop
into `ProductsBrowser` (`components/features/products/ProductsBrowser.tsx`), which filters them on the
client by the active category. This is correct at this scale — it's one static payload and a `.filter()`
call.

`ProductsBrowser` is deliberately data-source-agnostic: it receives `products: Product[]` as a prop and
has no idea whether they came from a client-side filter over one big list or a per-category fetch. A
comment in that file marks the threshold explicitly: **once the catalogue passes roughly 300 products,
switch `/products` to `/products/[category]` with `generateStaticParams`.** Because the component
already treats "which products am I showing" as a prop, that migration is a routing change, not a
rewrite of the browsing UI.

## Project structure

```
app/                          # Routes: /, /about, /products, /contact, plus
                               # error.tsx, global-error.tsx, not-found.tsx,
                               # sitemap.ts, robots.ts, api/contact/route.ts
components/
  primitives/                 # No content imports, no business logic: Container,
                               # Section, Heading, Button, Card, Reveal, Icon,
                               # ImagePlaceholder
  patterns/                   # Composed primitives, still content-agnostic:
                               # CardGrid, SplitSection, StatBand, PageHero
  features/                   # Knows about Siledge content: categories/,
                               # products/, home/, about/, services/, contact/
  layout/                     # Header, Footer, MobileNav, NavLink
lib/
  content/                    # Schemas, raw data, the validation gate, queries
  validation/contact.ts       # Shared Zod schema for the contact form (client + API route)
  motion.ts                   # The one place easing/duration/variants are defined
  seo.ts                      # Metadata + JSON-LD builders, used by every page and the layout
  icons.ts                    # The icon registry — the single source of truth the
                               # content gate validates every `icon` field against
tests/e2e/                    # Playwright: home, products (hash sync + deep link),
                               # mobile nav, contact form, accessibility (axe, all 4 pages)
```

## Notes on what's intentionally missing

- All product images are placeholders (`ImagePlaceholder`) — no real photography was sourced, per the
  brief. The component already branches on a non-null `image` field to render `next/image`, so dropping
  in real photos later requires no refactor.
- No statistics, client logos, or "years in business" claims appear anywhere — the brief didn't supply
  them, and inventing them would be worse than leaving the space empty.
- The map on the contact page is a placeholder box, structured (see the comment in
  `components/features/contact/MapPlaceholder.tsx`) so a real Maps `<iframe loading="lazy">` drops in
  without touching the surrounding layout.
- The contact form posts to `app/api/contact/route.ts`, which validates with the same Zod schema as the
  client and returns success — mail transport is stubbed with a `// TODO`, not wired to a real provider.
