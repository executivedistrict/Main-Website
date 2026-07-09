# CLAUDE.md

General, codebase-wide instructions for AI agents working in this repository.
This is the entry point - read it first, then read the `AGENTS.md` for whatever
directory you are about to touch.

> Next.js framework rules also apply project-wide. See @AGENTS.md.

## The directory-instruction convention (important)

Instructions in this project are layered:

- **`CLAUDE.md`** (this file, root only) - general rules that apply everywhere.
- **`AGENTS.md`** (one in **every** directory) - rules scoped to that directory.

**Before creating or editing any file, read the `AGENTS.md` in that file's
directory and apply it.** Rules in a more specific (deeper) `AGENTS.md` override
the general rules here when they conflict. If you add a new directory, add an
`AGENTS.md` to it describing its purpose and conventions.

When you finish work in a directory, check whether your changes make its
`AGENTS.md` out of date and update it if so.

## What this project is

The marketing website for **Executive District**, a fractional C-suite firm
(part-time CFOs, COOs, CMOs, and legal counsel). The brand voice is senior,
plain-spoken, and operator-minded: "operators who embed, not consultants who
advise." For full business context see `docs/company-background.md`; `README.md`
covers the repo itself.

> **Read `docs/purpose.md` before doing any development.** This is a deliberate
> rebuild whose single goal is **lead qualification** - attracting the right
> owner (older, West-Michigan, sell-or-transition) and, just as importantly,
> repelling the wrong one. Every design, copy, and structural decision must
> serve that purpose. When the purpose and a generic "best practice" conflict,
> the purpose wins.
>
> When building **anything related to lead capture, the application form,
> routing, or booking**, follow `docs/lead-qualification.md` - the locked
> approach (gated application, smart routing, non-financial proxies, no hard
> financials on the form).

> **Current state:** the site is a **1:1 recreation of the production
> Executive District site** (MHTML snapshots in `docs/Original Site HTML/`).
> The light design system is implemented: white pages, navy + blue + gold
> `@theme` tokens, Inter with Lora italic accents, and base UI primitives.
> Visual source of truth: `docs/design-system.html`; live tokens:
> `src/app/globals.css`; primitives: `src/components/ui/`; page sections:
> `src/components/sections/<page>/`. Match them - don't reintroduce the old
> dark + gold styling.

## Tech stack & conventions

- **Next.js 16 (App Router)** with **TypeScript 6 (strict)**. ⚠️ Next.js 16 has
  breaking changes from earlier versions - consult `node_modules/next/dist/docs/`
  before writing framework code rather than relying on memory.
- **pnpm** is the package manager (pinned via the `packageManager` field). Use
  `pnpm`, never `npm`/`yarn` - don't create a `package-lock.json`. pnpm build and
  peer settings live in `pnpm-workspace.yaml`, not `package.json` (pnpm 11+).
- **Dependencies track the latest compatible majors.** Deliberate hold: **ESLint
  stays on 9.x** - ESLint 10 breaks `eslint-config-next`'s bundled
  `eslint-plugin-react`. Don't bump it to 10 until that's fixed upstream.
- **Tailwind CSS v4** - configured CSS-first in `src/app/globals.css` via
  `@theme` (no `tailwind.config.js`). Brand tokens mirror
  `docs/design-system.html`: colors `navy #0F1F3D`, `blue #2E75B6` (primary
  action) + `blue-deep` (hover), `gold #C8973E` (accent only), `charcoal #333`
  (body), `slate #2C3E5A` (secondary), `ice #EAF0F7` / `mist #F7F8FA` (tinted
  sections), `line #E2E5EA` (hairlines); muted chip hues `gold-deep`,
  `sage`, `plum` (category chips only, e.g. the About field tags, never
  actions or accents); on navy surfaces text
  `frost/frost-soft/frost-faint` and `border-line-onnavy`; `rounded-xs…lg`
  (2/4/8/12px), `shadow-e1…e3`; fonts `font-sans` (Inter, everything) /
  `font-serif` (Lora: italic for headline `<em>` accents and pull quotes,
  upright for decorative section numerals); utilities
  `display-xl/l/m` (headline clamps) and `eyebrow-label` (gold uppercase
  overline). **Use tokens, never hard-coded colors.** Blue is the primary
  action; gold is an accent (eyebrows, headline italics, dividers, stat
  figures), never a page-level primary button on light surfaces.
- **Design stack:** **shadcn/ui + Tailwind + a few subtle Motion Primitives.**
  Build new components from **shadcn/ui** (added via the shadcn CLI; the `cn`
  helper is in `@/lib/utils`), styled with our Tailwind `@theme` tokens. Add
  motion only with **Motion Primitives** (built on the installed `motion`
  package), and keep it **subtle and sparing**. Our own base primitives live in
  `src/components/ui/`. **Icons**: `lucide-react`. **Fonts**: Inter + Lora
  (italic) via `next/font` in `layout.tsx`. Add other dependencies deliberately.
- **Server Components by default.** Only add `"use client"` when a component
  genuinely needs interactivity, state, or browser APIs.
- **Imports** use the `@/*` alias for anything under `src/`.

## Content & claims

The business's stated results (e.g. "$480K profit increase", "75+ companies
served") are anonymized, self-reported marketing claims. Always present them as
claims with a disclaimer, never as verified facts.

## Writing

**The copy source of truth is the owner-approved plan-005 copy deck**
(`plans/005-site-simplification/copy-deck.md`), which superseded the 1:1
production reproduction. Do not reword, "improve", or expand site copy
casually; changes need an explicit request, and any approved change should
be reflected in the deck. Concision and the qualification lens
(`docs/purpose.md`) govern all copy: visitors skim, so keep lines that
qualify or repel the right owner and cut everything else. The MHTML
snapshots in `docs/Original Site HTML/` remain as historical reference
only. The home hero's visual column is the Jacob AI concierge card (see
`plans/004-jacob-concierge/`); do not replace it with the old photo.

**No em-dashes.** Do not use the em-dash character (U+2014) anywhere: site
copy, docs, comments; it is a tell-tale sign of AI writing. Use commas,
colons, parentheses, or separate sentences instead. (En-dashes for numeric
ranges like `$1M–$5M` are fine. The only em-dashes that stay are inside
verbatim-locked strings: the legal pages and Jacob's ported dialog title.)
Keep copy short; headlines clear and descriptive, not storytelling; don't
overuse eyebrows; never number sections.

## Accessibility & responsiveness (required, not optional)

Hard requirements. Every component and page must satisfy all of these, and any
component you touch must be audited against this list before it's considered done.

- **Mobile-first, always.** Design and build for small screens first, then layer
  up with Tailwind's `sm:`/`md:`/`lg:` breakpoints. Mobile responsiveness is
  mandatory, never an afterthought or a follow-up pass.
- **WCAG 2.1 AA contrast.** At least 4.5:1 for normal text, 3:1 for large text
  and UI controls. Use the brand tokens (tuned to pass on both the light and
  navy surfaces);
  never introduce a low-contrast combination.
- **Keyboard operable.** Everything reachable and usable by keyboard alone, with
  a visible `focus-visible` state.
- **Escape closes overlays.** Every modal, dialog, popover, drawer, or menu must
  close on the Escape key (and on outside click where appropriate). True modals
  also trap focus and restore it on close.
- **Correct semantics + ARIA.** Real elements (`button`, `a`, `label`) over
  divs. `aria-label` on icon-only controls; `aria-hidden` on decorative icons;
  `aria-expanded` / `aria-haspopup` on disclosure triggers; inputs tied to their
  labels.

## Before you finish

- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`; all must pass.
- **Never touch the owner's dev server.** He usually has `pnpm dev` running
  on port 3000 while you work. Start any temporary server you need on a
  distinct port (e.g. `PORT=3111`), kill it by its exact PID when done (no
  `pkill` patterns that could match his processes), and never restart or
  kill his server; ask him instead.
- Keep changes minimal and consistent with surrounding code.
- Do not commit or push unless explicitly asked.
