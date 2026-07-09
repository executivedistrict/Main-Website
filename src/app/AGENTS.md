# AGENTS.md - `src/app/`

The Next.js **App Router**. Read [`/CLAUDE.md`](../../CLAUDE.md) for general
rules. ⚠️ This is Next.js 16 - confirm App Router APIs against
`node_modules/next/dist/docs/` before using them.

Holds the root layout, the routes, and the global stylesheet that defines the
design-system tokens. Visual source of truth:
[`/docs/design-system.html`](../../docs/design-system.html). Page content is
reproduced verbatim from the owner-approved plan-005 copy deck
(`plans/005-site-simplification/copy-deck.md`); do not reword it casually.

## What lives here

- `layout.tsx` - root layout, `metadata` (title template
  `"%s | Executive District"`), the **fonts** (Inter + Lora italic via
  `next/font`), and the **global chrome**: it renders `SiteHeader` (fixed 72px)
  + `SiteFooter` around `<main className="flex-1">` inside a `min-h-screen`
  flex column (sticky footer). Pages render inside this `<main>` and must
  **not** add their own header, footer, or `<main>`; heroes need enough top
  padding to clear the fixed nav (originals use 140-160px).
- Route folders - `/` (home `page.tsx`), `/about`, `/results`, `/book`,
  `/privacy`, `/terms`. Each `page.tsx` composes section components from
  `@/components/sections/<page>/` and exports `metadata` per the plan-005
  copy deck.
- `api/` - Route Handlers (server-side API; see `api/AGENTS.md`). Currently
  `api/jacob/conversation` for the Jacob AI concierge.
- `globals.css` - Tailwind v4 `@import` plus the **`@theme` design tokens**
  (colors, fonts, radius, elevation), base styles (white body, charcoal text,
  navy headings, and the `h1/h2/h3 em` Lora-italic-gold accent rule), and the
  `display-xl/l/m` + `eyebrow-label` utilities. The **only** place to define
  global styles and tokens.
- `not-found.tsx`, `favicon.ico` - error route and route-level icon.

## Rules

- Routes and layouts are **Server Components** by default. Keep `"use client"`
  out of this directory unless a route genuinely needs it; push interactivity
  into a client component under `@/components` instead.
- Don't hard-code colors in JSX - use the brand tokens (`bg-navy`, `text-slate`,
  `text-gold`, `border-line`, `text-frost` on navy, …). New tokens go in
  `globals.css` `@theme`.
- New page → new folder with a `page.tsx` (App Router convention). Add export
  `metadata` for SEO.
- Keep `globals.css` token-driven; don't scatter one-off CSS files.
