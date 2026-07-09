# Phase 2 - Application Flow + Smart Routing + Integration Shells

## Goal

Build the `/apply` 3-step application end-to-end, routing to three confirmation
states, with stubbed integrations so it runs without keys.

## Read first

- Phase 0 contracts (`@/lib/leads`); `docs/lead-qualification.md` (the locked flow)

## Deliverables

- `src/lib/leads.ts` - `LeadApplication`, `LeadIntent`, `FitStatus`, `scoreLead()`.
- `src/lib/supabase.ts` - `saveLead()` shell (logs; `TODO` real client + RLS note).
- `src/lib/email.ts` - `notifyTeam()` shell (logs; `TODO` Resend; powers fast
  follow-up).
- `src/app/apply/actions.ts` - `"use server"` `submitApplication()`: validate →
  `scoreLead` → `saveLead` + `notifyTeam` → return `{ status }`. Honeypot drop.
- `src/app/apply/apply-form.tsx` - `"use client"` 3-step wizard:
  1. You & the business (name, business, **are you the owner?**, industry)
  2. Stage & intent (years owned, employees, where-are-you intent) - **proxies, no
     hard financials**
  3. Why now (open text) + contact + optional coarse revenue range
     ("prefer not to say"); persistent "🔒 Confidential" + "Step N of 3".
- `src/app/apply/page.tsx` - `<SiteHeader minimal />` + the form; on result show:
  - **clear** → booking placeholder (Cal.com embed TODO; `NEXT_PUBLIC_BOOKING_URL`)
  - **borderline** → "an operator will reach out" (fast follow-up)
  - **no-fit** → graceful off-ramp, no calendar.
- `.env.example` - the five env vars from Phase 0, documented, with comments.

## Discipline

- `"use client"` only on `apply-form.tsx`. Action + shells are server/plain.
- No real integration deps installed. Shells must not import `@supabase/*` / `resend`.
- Use primitives + tokens; keep it simple.

## Acceptance

- Submitting routes to the correct state for owner/intent/why-now combinations.
- `pnpm lint`, `pnpm typecheck`, `pnpm build` pass.
