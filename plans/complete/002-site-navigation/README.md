# 002 - Site Navigation

**State: complete** - shipped 2026-06-13. Replaced the wireframe header with the
config-driven navigation described below; the header and footer now live in
`layout.tsx` on every page (including the 404).

## Goal

Replace the wireframe header with the production navigation: a **config-driven**,
multi-level header with **viewport-aware** submenu popovers.

## Requirements (locked)

- **Config-driven.** All nav links and the CTA live in a single config file
  (`src/lib/nav.ts`), not hard-coded in JSX. The header renders from the config.
- **Layout.** Logo at far left; nav links left-aligned, immediately following
  the logo; the CTA button pinned to the top right.
- **The CTA is the Application** (`/apply`). It is unique, always present, and
  visually distinct (the gold primary). It is not one of the normal links.
- **Two link types:**
  - **Leaf** - a direct link to a page (e.g. Contact to `/contact`).
  - **Parent** - opens a submenu popover; may also link to its own dedicated page.
- **Submenu items** must each have a label, an href, a one-line **description**,
  and an **icon** (`lucide-react`).
- **Viewport-aware popovers.** Submenu popovers flip/clamp so they never overflow
  the viewport edges. Keyboard accessible (focus, Escape, arrow keys); work on
  touch.
- **Contact is a normal linked item** in the bar, not the CTA.
- **No em-dashes** in any labels or descriptions (see `CLAUDE.md`).
- **Mobile.** A drawer/disclosure expressing the same config (parents collapse to
  accordions).

## Out of scope

- The application flow itself (built in plan 001).
- Mega-menu imagery; start with text + icon + description.

## Files (planned)

- `src/lib/nav.ts` - the nav config + types (see `phase-0-contracts.md`).
- `src/components/site-header.tsx` - rebuilt to render from the config.
- `src/components/nav/*` - popover, submenu, and mobile-drawer primitives.
  ReactBits / MagicUI may supply the popover/animation; the `cn` helper and
  `lucide-react` are already installed.

## Related plans

- **Predecessor:** `001-wireframe` - the pages the nav links to (home, apply,
  contact). This plan assumes those routes exist.
