# 003 - Integrations

**State: deferred** - blocked on external accounts and API keys (Supabase,
Resend, a booking tool). Build once they exist. This wires the integration
**shells** left by plan 001 (`saveLead`, `notifyTeam`, `notifyContact`, and the
booking embed).

## Goal

Replace the no-op shells with real integrations, keeping all writes server-side.

## Planned work

- **Supabase** - add `@supabase/supabase-js`; create the `leads` table;
  implement `saveLead()` with a **server-side** client (service role, never
  client-exposed). Lock RLS: no public reads (applications are confidential).
  Env: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- **Resend** - add `resend`; implement `notifyTeam()` and `notifyContact()` to
  email `LEAD_NOTIFY_EMAIL` (the same-day follow-up that fixes no-shows). Env:
  `RESEND_API_KEY`.
- **Booking** - embed Cal.com / Calendly on the clear-fit confirmation via
  `NEXT_PUBLIC_BOOKING_URL`.
- **Hardening** - Cloudflare Turnstile (plus the existing honeypot) and basic
  rate limiting on `submitApplication` / `submitContact`.

## Predecessor

- `plans/complete/001-wireframe/` built the shells and `.env.example` this plan
  fills.

## Acceptance (when run)

- A submitted application / contact persists to Supabase and is NOT readable from
  the client.
- The team receives a notification on qualified leads.
- Clear-fit applicants can book; build stays green.
