# AGENTS.md - `src/components/`

Reusable React components. Read [`/CLAUDE.md`](../../CLAUDE.md) for general rules.

## Layout

- `ui/` - low-level **primitives** that implement the design system (Button,
  Card, Section, Container, SectionHeader, Stat, Eyebrow). Has its own
  `AGENTS.md`. Start here; reuse these rather than rebuilding.
- `sections/<page>/` - page-specific section components, one folder per route
  (see `sections/AGENTS.md`). Composed from the `ui/` primitives.
- `jacob/` - the Jacob AI concierge widget (hero trigger card + modal video
  dialog; see `jacob/AGENTS.md` and `plans/004-jacob-concierge/`).
- **This directory** holds the shared chrome: `site-header.tsx` and
  `site-footer.tsx`.

The site navigation is **config-driven and flat**: `src/lib/nav.ts` exports
three leaf links (Home, About, Results) plus a single "Book a Call"
CTA; there are no submenus or popovers. `site-header.tsx` renders it as a fixed
72px white bar (hairline bottom border, shadow after scroll) with a hamburger
menu below `md`; it also exports the two-line uppercase `Wordmark`.
`site-footer.tsx` is the navy 3-column footer (brand + tagline / Navigate /
Connect) with gold column headings. Both render from `layout.tsx` on every
page, so individual pages never add their own.

## Conventions

- File names are `kebab-case.tsx`; the exported component is `PascalCase`.
  Prefer **named exports**, one component per file.
- **Server Components by default.** Add `"use client"` only for components that
  need state, effects, or browser/event APIs - keep them small (the header is
  the current example: scroll shadow + mobile menu).
- **Styling** is Tailwind utilities using the brand tokens (see
  `ui/AGENTS.md`). No inline hex colors, no separate CSS files. Compose
  `className` via `cn` from `@/lib/utils`.
- **Components & motion**: build new components from **shadcn/ui** (added via the
  shadcn CLI, styled with our tokens) and add **a few subtle Motion Primitives**
  for animation (built on the installed `motion` package). Keep motion subtle and
  sparing. **Icons**: `lucide-react`.
- Keep components presentational and composable; pass data/copy in via props or
  a local `content.ts` (site copy is verbatim from the owner-approved plan-005
  copy deck; don't reword it).
