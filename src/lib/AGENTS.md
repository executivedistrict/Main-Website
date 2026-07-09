# AGENTS.md - `src/lib/`

Shared, framework-agnostic config, data, and utilities. Read
[`/CLAUDE.md`](../../CLAUDE.md) for general rules.

## What lives here

- `utils.ts` - exports `cn(...)`, the Tailwind-aware class-merge helper
  (`clsx` + `tailwind-merge`). The `cn` utility that **shadcn/ui** and **Motion
  Primitives** components expect. Don't duplicate it; import
  `{ cn } from "@/lib/utils"`.
- `nav.ts` - the site navigation config + types. **Flat**: `navConfig.items` is
  three leaf links (`NavLeaf`: label + href) and `navConfig.cta` is the single
  "Book a Call" button. No submenu/parent types. Pure data, consumed by
  `site-header.tsx` and `site-footer.tsx`.
- `rate-limit.ts` - best-effort in-memory limiter (5/min/key, lazy prune,
  no timers, no imports) shared by all API routes; callers namespace keys
  per route (e.g. `qualify:<ip>`).
- `qualification/` - the lead-qualification model: types + validation
  (client-safe), owner-editable config (server-only), pure scoring, and its
  unit tests. See `qualification/AGENTS.md`.
- `email/` - Resend client (plain fetch, server-only) and the branded
  lead-email HTML template. See `email/AGENTS.md`.
- `jacob/` - server-only Tavus modules for the Jacob concierge. See
  `jacob/AGENTS.md`.

## Rules

- Keep this directory **framework-agnostic**: no React, no JSX, no `next/*`
  imports. Pure data and helpers. (Anything wired to real services later must
  be server-only - keep it out of client components and never expose secrets.)
- Export typed, immutable data (use `as const` and explicit `type` exports).
- Add new shared utilities here rather than duplicating logic across components.
