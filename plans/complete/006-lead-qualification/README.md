# 006 - Lead Qualification (gated booking)

Gate the booking calendar behind a short application and route applicants
into three tiers, implementing the locked strategy in
`docs/lead-qualification.md`: clear fit books immediately, borderline gets
a personal follow-up (contact form + Resend email), no-fit gets a graceful
off-ramp with no calendar access. Qualification standards live in ONE typed
config file so the owner can retune tiers without touching components.

## Goal

- `/book` becomes the application: a short multi-step form (~7 fields,
  ranges not dollar amounts, coarse revenue range optional and last).
- Server-side scoring against `src/lib/qualification/config.ts` returns
  only the tier; rules never ship to the client bundle.
- Tier 1 (qualified): the existing GHL booking calendar is revealed inline.
- Tier 2 (borderline): a short contact step ("a senior operator will reach
  out personally"); submission emails the team via Resend.
- Tier 3 (no-fit): respectful off-ramp copy, no calendar, no form.
- Emails via Resend, all branded to the site (navy/gold HTML template
  with the wordmark): (a) EVERY application, all tiers, notifies the
  internal contact defined in the qualification config (this is the
  owner's answer to having no lead database), and (b) the tier-2
  contact-form submission sends the follow-up notification. Leads never
  receive confirmation emails; GHL's own notifications cover bookings.

## Owner decisions (confirmed 2026-07-09)

(1) Gate `/book` itself, no separate `/apply` route. (2) Amended
2026-07-09 (second pass): every submission, all tiers, emails an internal
contact set in the config (substitutes for a lead database); the tier-2
contact form additionally sends its follow-up email; all emails are
site-branded; still no confirmation emails to leads. (3) No database
(Supabase offloaded; plan 003 retired). (4) Tier-3 off-ramp is a
respectful message only. Resend: owner controls DNS, will verify the
sender, and supplies `RESEND_API_KEY` later; build now, live-send test
when the key lands. Copy and calibration approved as drafted.

## Phase map

| Phase | Name | Mode |
| ----- | ---- | ---- |
| 0 | Contracts, config schema + form copy ([phase-0-contracts.md](./phase-0-contracts.md)) | Orchestrator; **defaults + Resend confirmed; still gates on copy sign-off + calibration gut-check** |
| 1 | Backend: config, scoring, Resend routes ([phase-1-backend.md](./phase-1-backend.md)) | Parallel with Phase 2 |
| 2 | Frontend: application form + tier panels ([phase-2-form.md](./phase-2-form.md)) | Parallel with Phase 1, then reviewer |
| 3 | Wiring, docs, verification ([phase-3-docs-verify.md](./phase-3-docs-verify.md)) | Serial spine |

## Write surface (the only paths this plan may touch)

- `src/lib/qualification/` (config, scoring, types, `AGENTS.md`)
- `src/lib/email/` (Resend client via fetch, `AGENTS.md`)
- `src/lib/rate-limit.ts` (generalized from `src/lib/jacob/rate-limit.ts`;
  the jacob route's import updated accordingly - this is the one permitted
  touch inside `src/app/api/jacob/` / `src/lib/jacob/`)
- `src/app/api/qualify/` and `src/app/api/lead-contact/` (route handlers +
  `AGENTS.md` files)
- `src/components/sections/book/` (the application form, step components,
  tier panels; the existing `booking-calendar.tsx` is reused, not rebuilt)
- `src/app/book/page.tsx` (composition + metadata if copy changes)
- `.env.example` (Resend vars), `CLAUDE.md` (only if the booking note
  needs updating), `src/app/AGENTS.md`, `src/app/api/AGENTS.md`,
  `src/lib/AGENTS.md`, `src/lib/jacob/AGENTS.md` (rate-limit move),
  `src/components/sections/AGENTS.md` (map updates)
- Copy deck amendment (`plans/complete/005-site-simplification/copy-deck.md`)
  for the new form/off-ramp copy, per the copy law
- `plans/006-lead-qualification/` and `plans/index.md`

Off-limits: everything else, especially `src/components/jacob/` (Jacob is
not gated), the GHL calendar URL, all other pages, `docs/` strategy files.

## Orchestration rules

1. Phase 0 (contracts + copy + owner confirmations) merges before any
   Phase 1+ agent runs.
2. Phases 1 and 2 fan out on disjoint trees; a reviewer agent checks the
   diff against the contracts (verdict BLOCKING / NON-BLOCKING / CLEAN).
3. Phase 3 is a serial spine (composition, docs, end-to-end verification).
4. Every agent receives the Phase 0 contracts verbatim and an explicit
   "do not touch" list.

## Success definition

- Submitting the form routes to the correct tier for representative
  answer sets (tested against the config's fixtures).
- Tier rules are changeable by editing `config.ts` alone.
- Resend delivers the lead email (live test needs the owner's API key and
  a verified sender).
- No qualification rule, threshold, or Resend key reaches the client
  bundle. Rate limiting and a honeypot protect both endpoints.
- The calendar is not reachable without a qualified submission.
- `pnpm lint`, `pnpm typecheck`, `pnpm build` pass; the form meets the
  CLAUDE.md a11y checklist (labels, keyboard, focus, AA contrast).

## Out of scope

- Database persistence of leads (none wanted; plan 003 retired).
- SMS/reminder automation (GHL's own confirmations continue to handle it).
- Gating or changing the Jacob concierge.
- CRM integration beyond the notification email.

## Related plans

- [003-integrations](../deferred/003-integrations/) reviewed and retired
  as obsolete (owner-confirmed: Supabase offloaded/unused, Resend
  implemented here, Cal.com never applied). History only.
- Plan 004 (Jacob) is untouched; the concierge remains ungated.
