# AGENTS.md - `src/components/sections/`

Page-specific composed sections, one subdirectory per route
(`about/`, `home/`, ...). Read [`../AGENTS.md`](../AGENTS.md) and
[`/CLAUDE.md`](../../../CLAUDE.md) first.

## Conventions

- One subdirectory per page, named after the route (kebab-case). Each has its
  own `AGENTS.md`.
- Files are `kebab-case.tsx` with **named exports**; components are
  presentational Server Components built from the `@/components/ui` primitives.
- Copy lives in a local `content.ts` data module per page (typed, exported
  constants), passed into small reusable components. Page copy is reproduced
  verbatim from the owner-approved plan-005 copy deck
  (`plans/005-site-simplification/copy-deck.md`); do not reword it. The deck
  copy contains no em dashes.
- Style with Tailwind brand tokens only; no hex colors in JSX.
