# 001 - Wireframe

## Goal

Stand up a **viewable, low-fidelity wireframe** of the Executive District site in
the real Next.js app: content placed where it belongs, navigation working, and
the lead-qualification application flow running end-to-end - with **shells** for
the integrations (Supabase, Resend, Cal.com) that we'll wire once accounts and
API keys exist.

Priority is **content placement over visual polish.** Lean on the existing design
system primitives (`@/components/ui`); don't fuss over design.

## Source of truth

- **Flow / structure** - the recommended wireframe (chat), `docs/purpose.md`,
  `docs/lead-qualification.md`.
- **Visual language** (used loosely here) - `docs/design-system.html`,
  `src/components/ui`, `src/app/globals.css`.

## Scope (write surface)

Only these paths may be touched:

- `src/app/page.tsx`, `src/app/apply/**`, `src/app/contact/**`, `src/app/not-found.tsx`
- `src/components/site-header.tsx`, `src/components/site-footer.tsx`
- `src/lib/leads.ts`, `src/lib/contact.ts`, `src/lib/supabase.ts`, `src/lib/email.ts`
- `.env.example`
- `src/components/AGENTS.md`, `src/lib/AGENTS.md` (keep in sync per convention)

Anything outside this list is off-limits for the duration of the plan.

## Phase map

| Phase | Title | State |
| ----- | ----- | ----- |
| 0 | Contracts & scaffolding - lead shape, shell signatures, routes | ✅ |
| 1 | Homepage + navigation + content | ✅ |
| 2 | Application flow + smart routing + integration shells | ✅ |

**Complete.** Integration wiring (Supabase persist, Resend notify, Cal.com
booking) was split out to the deferred plan `plans/deferred/003-integrations/`,
blocked on external accounts/keys. The Phase 2 shells are the seams it fills.

## Out of scope

- Real Supabase / Resend / Cal.com wiring (Phase 3, deferred).
- Final copy, imagery, visual polish, responsive fine-tuning, a11y audit.
- Auth, an internal lead dashboard, analytics.

## Integration shells

`saveLead()` (Supabase), `notifyTeam()` (Resend), and the booking embed are
stubbed with typed signatures + `TODO` markers, and the env vars they will need
are documented in `.env.example`. The shells no-op (log only) so the application
flow runs end-to-end with **no keys required**.

## Success

`pnpm lint`, `pnpm typecheck`, `pnpm build` pass; `pnpm dev` shows the homepage
with all sections and a working 3-step application that routes to one of three
confirmation states (clear-fit → booking placeholder, borderline → "we'll reach
out", no-fit → off-ramp).

## Related plans

- **Follow-on:** `plans/deferred/003-integrations/` wires the Supabase / Resend /
  Cal.com shells once accounts and keys exist. Deferred.

## Execution note

Built by the orchestrator directly in one sitting - a simple, single-surface
wireframe doesn't warrant multi-agent fan-out. `PROGRESS.md` is updated per phase.
