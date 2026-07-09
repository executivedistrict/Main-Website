# AGENTS.md - `src/components/ui/`

Low-level, reusable UI **primitives** that implement the design system. Read
[`/CLAUDE.md`](../../../CLAUDE.md) first. The **visual source of truth** is
[`/docs/design-system.html`](../../../docs/design-system.html); the live tokens
live in [`/src/app/globals.css`](../../app/globals.css) (`@theme`).

## The primitives

- `Container` - centered column, max-width 1200px, no horizontal padding of its
  own (the parent `Section` provides gutters).
- `Section` - vertical page rhythm (`px-5 py-16 sm:px-8 sm:py-24`);
  `tone="white" | "mist" | "ice" | "navy"` sets the background. Override
  padding via `className` when the original page differs.
- `SectionHeader` - recurring header: optional gold `eyebrow`, a `title`
  (ReactNode, may contain `<em>` for the Lora italic accent), optional
  `description`; `align="left" | "center"`; `onNavy` flips text for navy
  surfaces.
- `Eyebrow` - small uppercase gold overline (`eyebrow-label` utility). Works on
  light and navy surfaces.
- `Button` - `variant="primary" | "gold" | "outline" | "ghost"`,
  `size="sm" | "md" | "lg"`. **Primary is blue** (hover `blue-deep`); the
  `gold` variant (navy text) is only for navy CTA bands. Renders an `<a>` when
  `href` is set, else a `<button type="button">`. Presentational and
  server-safe.
- `Card` + `CardTitle` - white surface, `border-line`, `rounded-md`, lift +
  `shadow-e2` on hover; `featured` adds the 3px gold top rule for the one card
  that stands apart.
- `Stat` - metric block: big gold `value`, navy `label`, optional slate
  `source`; `onNavy` switches label/source to frost tones. Pair with a
  disclaimer when showing client claims.
- `Dialog` family (`Dialog`, `DialogContent`, `DialogTitle`, ...) - modal
  primitive from shadcn/ui on Radix (`radix-ui` package), restyled with our
  tokens. Radix supplies focus trap/restore, Escape close, backdrop close,
  and body scroll lock. Default surface is white with `border-line` +
  `shadow-e3`; callers retint via `className` (e.g. the navy Jacob dialog).
  The only client-marked file here, per shadcn convention.

Import from the barrel: `import { Button, Card } from "@/components/ui"`.

## Rules

- **Use design tokens, never hard-coded colors or hex.** Colors `navy`, `blue`
  / `blue-deep`, `gold`, `charcoal`, `slate`, `ice`, `mist`, `line`, plus the
  muted chip hues `gold-deep`/`sage`/`plum` (category chips only); on navy
  surfaces `frost/frost-soft/frost-faint` text and `line-onnavy` hairlines.
  `rounded-xs…lg` (2/4/8/12px), `shadow-e1…e3`. Fonts: `font-sans` (Inter,
  everything) / `font-serif` (Lora: italic for headline `<em>` accents, which
  the base CSS styles automatically, and for pull quotes; upright 600 for the
  big decorative section numerals). Utilities: `display-xl/l/m`,
  `eyebrow-label`.
- **Blue is the primary action; gold is an accent.** Gold appears in eyebrows,
  headline italics, dividers, stat figures, and featured rules; the only gold
  button lives on navy CTA bands.
- **Headlines are clear, not stories.** Reproduce production copy exactly; keep
  any new copy short.
- **No em-dashes in new writing** (docs, comments, new copy). Reproduced site
  copy keeps its original punctuation.
- **Source new primitives from shadcn/ui** (styled with our tokens); animate with
  **a few subtle Motion Primitives** (`motion`). Keep motion subtle and sparing.
- **Mobile-first (mandatory).** Base styles target mobile; layer up with
  `sm:`/`md:`/`lg:`. Desktop-only is not acceptable.
- **Accessible by default (WCAG AA).** Keyboard-operable with a visible
  `focus-visible` state; text contrast >= 4.5:1; correct semantics + ARIA
  (`aria-label` on icon-only controls, `aria-hidden` on decorative icons,
  `aria-expanded`/`aria-haspopup` on disclosures, inputs tied to labels).
  Overlays, menus, and modals close on Escape. See `/CLAUDE.md`.
- **Server Components by default.** These primitives take no `"use client"`;
  add it only to a new component that genuinely needs interactivity, and keep it
  as small as possible.
- File names `kebab-case.tsx`, exports `PascalCase`, named exports, one
  component family per file. Compose `className` through `cn` so callers can
  extend. Re-export new primitives from `index.ts`.
