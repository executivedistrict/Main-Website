# AGENTS.md - `src/components/jacob/`

Client components for the Jacob AI concierge widget. Read
[`src/components/AGENTS.md`](../AGENTS.md) and
`plans/004-jacob-concierge/phase-0-contracts.md` (locked contracts) first.

- `jacob-hero-card.tsx` - `JacobHeroCard`: the home-hero visual. A single
  button-card (photo, "AI Concierge" eyebrow, invitation line, play
  affordance) that owns the open state and mounts `JacobDialog`.
- `jacob-dialog.tsx` - `JacobDialog`: modal conversation. Built on the
  shadcn/ui Dialog for focus trap/restore, Escape, and backdrop close.
  Creates ONE session per open via `POST /api/jacob/conversation`; states
  `loading | ready | error` with retry; renders the Tavus iframe with
  `allow="camera; microphone; autoplay; fullscreen"`.

Rules: tokens only (no hex), navy surface for the dialog, `"use client"` on
both files, session created only on intentional click (never on mount).

**AI Jacob is not Jacob Mirandette.** The AI concierge is its own persona
with its own image, `public/images/ai-jacob.jpg`. Jacob Mirandette is a real
team member on the `/about` page with his own headshot
(`public/images/team/jacob-mirandette.png`). Never swap one image or bio for
the other, and don't "unify" them.
