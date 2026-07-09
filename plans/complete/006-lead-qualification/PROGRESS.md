# Progress - 006 Lead Qualification

| Phase | Name | Status |
| ----- | ---- | ------ |
| 0 | Contracts, config schema + form copy | ✅ Complete |
| 1 | Backend: config, scoring, Resend routes | ✅ Complete |
| 2 | Frontend: application form + tier panels | ✅ Complete |
| 3 | Wiring, docs, verification | ✅ Complete (live Resend send deferred until the owner adds the key) |

Legend: 🔲 Drafted · 🔄 In progress · ✅ Complete

## Phase summaries

### Phase 0 - Contracts, config schema + form copy (shipped)

Contracts locked after two owner passes: gate `/book`; three tiers from
one config file; internal contact in `config.ts` emailed for EVERY
submission (all tiers) with a branded HTML template, plus the tier-2
follow-up email; no confirmation emails to leads; no database (plan 003
retired as obsolete); copy and starting calibration approved as drafted;
`RESEND_API_KEY` to be supplied later (live-send test deferred).

### Phase 1 - Backend (shipped)

`src/lib/qualification/{types,config,scoring}.ts` per contract plus
`notifications.internalContact`; scoring pure with 12 passing `node --test`
unit tests (zero new dependencies; `pnpm test` added); rate limiter
generalized to `src/lib/rate-limit.ts` (jacob import updated, old module
deleted); `src/lib/email/{resend,template}.ts` with the branded HTML
template (hex-in-email exception documented; all interpolations escaped,
injection-tested); `/api/qualify` (fire-and-forget internal email, returns
`{ tier }` only, works without Resend env) and `/api/lead-contact`
(validates the application echo, 500s without env). Curl-verified tiers,
honeypot 400, 429 on the sixth request. Ambiguities resolved: contract's
max-score comment corrected to 18; whyNow minChars is scoring-only;
skipped revenue normalizes to "undisclosed".

### Phase 2 - Frontend (shipped)

`qualify-form.tsx` (3 steps, progress, honeypot, inline errors) + the
three tier panels; option values type-locked to the backend unions;
approved copy verbatim with the deck amendment recorded. Verified with a
real keyboard-only Playwright walkthrough at 375px against the live
Phase 1 routes (16/16: qualified reveals the calendar, researcher
hard-gates, borderline contact flow incl. real 500 error/retry). A11y
audit passed (fieldset/legend, aria-describedby, focus management,
tokens-only except the documented red-700 error color).

### Fan-out review (Phases 1 + 2)

Verdict NON-BLOCKING. Verified: contract fidelity, no rules/secrets in
the client bundle, escaping at every email interpolation site, server-side
validation of the tier-2 echo, strategy conformance, double-submit
protection. Findings fixed in Phase 3: contract max-score comment,
whyNow contract wording, README write-surface additions. Accepted:
red-700 error color (token candidate later).

### Phase 3 - Wiring, docs, verification (shipped)

`/book` now renders `QualifyForm` in place of the on-load calendar (the
calendar exists only inside the qualified tier panel); strategy doc gained
the "Implemented by plan 006" pointer; reviewer doc findings fixed.
Verified on a production server: no calendar iframe in the on-load HTML,
form + confidentiality beat render, owner/sell -> qualified,
researcher/anything -> no-fit, limiter blocks the 6th request (an
apparent off-by-one was a leftover test-server process, now killed).
lint/typecheck/test/build all green. Deferred by owner: live Resend send
once `RESEND_API_KEY` + verified sender land (open-questions), plus the
GHL public-link regeneration in HighLevel.
