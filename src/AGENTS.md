# AGENTS.md - `src/`

All application source lives here. Read [`/CLAUDE.md`](../CLAUDE.md) for general
rules; this file scopes the `src/` tree.

## Layout

- `app/` - Next.js App Router: routes, layout, global styles + design tokens.
  `app/api/` holds Route Handlers (the app's server-side API).
- `components/` - reusable React components; `components/ui/` holds the
  design-system primitives; `components/sections/<page>/` holds page-specific
  section components; `components/jacob/` holds the Jacob AI concierge widget.
- `lib/` - shared, framework-agnostic config, data, and utilities (holds the
  `cn` class-merge helper used by shadcn/ui + Motion Primitives components).
  `lib/jacob/` holds the server-only Tavus modules.

Each subdirectory has its own `AGENTS.md`; read it before editing inside it.

## Rules

- Import across the tree with the `@/*` alias (e.g. `@/lib/nav`), not long
  relative paths.
- TypeScript is strict - no `any`, no unchecked non-null assertions; type the
  data you add.
- Server Components by default; add `"use client"` only when truly needed.
