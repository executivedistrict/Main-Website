# Phase 2 - Frontend: application form + tier panels (parallel with Phase 1)

## Goal

Build the multi-step application form and the three tier panels per the
Phase 0 contracts, using the approved copy.

## Scope

- `src/components/sections/book/qualify-form.tsx` (steps, progress,
  validation, submit -> `/api/qualify`, tier panel swap)
- `src/components/sections/book/tier-qualified.tsx`, `tier-borderline.tsx`,
  `tier-no-fit.tsx`
- `content.ts` additions in the same folder (form copy, options with
  labels + values matching the config's option values EXACTLY)
- `AGENTS.md` update for the folder

## Not in scope

Route handlers and scoring (Phase 1), `/book` page composition and hero
copy changes (Phase 3). Build against the contracted API shape; if
Phase 1 hasn't landed, mock the response shape locally in a way that is
deleted before handoff.

## Rules

- A11y is the bar (CLAUDE.md checklist): every input labeled, fieldsets
  with legends for radio groups, error messages tied via
  `aria-describedby`, focus moves to the first error on failed submit and
  to the panel heading on tier reveal, visible focus rings, AA contrast,
  keyboard-only completable. Mobile-first single-column steps.
- Tokens only; match the existing book-page visual language (mist card,
  navy accents, blue primary buttons).
- The calendar is rendered ONLY inside `tier-qualified.tsx` (reusing
  `BookingCalendar`); no direct calendar rendering elsewhere.
- Honeypot field visually hidden but form-submitted; no qualification
  logic client-side.

## Acceptance

- `pnpm typecheck` + `pnpm lint` pass.
- Keyboard-only walkthrough completes all three steps and reaches each
  tier panel (with Phase 1 landed or the temporary mock).
- Axe-style manual audit reported against the CLAUDE.md checklist.
