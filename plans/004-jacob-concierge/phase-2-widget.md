# Phase 2 - Widget components (parallel with Phase 1, then reviewer)

## Goal

Rebuild the plugin's `JacobTavusWidget.jsx` as typed, token-styled,
accessible components per the Phase 0 contracts: `JacobHeroCard` +
`JacobDialog`.

## Scope

- `src/components/jacob/jacob-hero-card.tsx`, `jacob-dialog.tsx`,
  `AGENTS.md`
- `src/components/ui/dialog.tsx` via the shadcn CLI if not present (styled
  with our tokens; this is the one shared-primitive addition allowed)

## Not in scope

- The API route (Phase 1). Hero wiring into `home-hero.tsx` (Phase 3): build
  the components standalone; Phase 3 mounts them.
- The plugin's floating-action-button mode, position prop, and theme prop
  (dropped; ours is hero-mounted and token-themed).

## Contracts received

`phase-0-contracts.md` verbatim: component APIs, dialog behavior, endpoint
request/response shape (fetch `POST /api/jacob/conversation`, expect
`{ conversation_url }`).

## Deliverables

1. `JacobDialog` reproducing the plugin's state machine (loading spinner,
   error + "Try Again", ready iframe) with our tokens on a navy surface.
   Focus trap + restore via the Dialog primitive; Escape and backdrop close;
   body scroll locked while open (Radix default). New session per open;
   state reset on close.
2. `JacobHeroCard` as a single button-card: Jacob's photo, "AI Concierge"
   eyebrow, an invitation line, play affordance, hover lift consistent with
   site cards. Copy for the card comes from Phase 3's `content.ts` via
   props (`heading`, `subline`, `buttonLabel`) with sensible defaults so the
   component previews standalone.
3. Accessibility audit against CLAUDE.md's checklist recorded in the phase
   report (contrast, keyboard, Escape, ARIA).

## Agent instructions

Read first (authoritative): this file, `phase-0-contracts.md`,
`docs/jacob-concierge-plugin-v2/JacobTavusWidget.jsx` (source being ported),
`CLAUDE.md`, `src/AGENTS.md`, `src/components/AGENTS.md`,
`src/components/ui/AGENTS.md`.
Do NOT touch: anything outside the Scope list; especially
`src/app/` (including the API route), `src/components/sections/`.

## Acceptance

- `pnpm typecheck` and `pnpm lint` pass.
- With the dev server running and Phase 1 landed: opening the dialog fires
  exactly one POST; error state renders when the route 500s (no env vars);
  retry re-POSTs; Escape/backdrop close and focus returns to the card.
- No hex colors in JSX; `"use client"` only on the two components.
