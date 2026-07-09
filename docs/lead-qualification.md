# Lead Qualification - approach & decisions

> The locked approach for how this site qualifies traffic and routes it to a
> call. **Any component related to lead capture, the application form, routing,
> or booking must follow this.** This is the mechanism that delivers the site's
> reason for existing - see [`purpose.md`](purpose.md). For who the company is,
> see [`company-background.md`](company-background.md).

> **Implemented by plan 006** (`plans/006-lead-qualification/`): the `/book`
> application, server-side scoring (tunable in
> `src/lib/qualification/config.ts`, including the internal notify contact),
> three-tier routing, and branded Resend notifications. This document stays
> the strategy source of truth; the config file is the calibration.

## Why this exists

The old site sent raw traffic straight into a bare 30-minute calendar widget.
The result was poor lead quality: **no-shows** and **wrong-fit** bookings. This
approach fixes that by qualifying *before* the calendar and routing people by fit.

## The model: an application, not a contact form

The calendar is **gated** behind a short application. Frame it as applying for a
**confidential conversation** with a senior operator - not "fill out a form." The
selectivity (we only work with a limited number of owners) is itself a
qualifier: it flatters the serious owner and filters the casual one.

Keep it short. Qualifying power lives in **intent**, not in the number of fields.
Older, boomer-generation owners - our target - abandon long forms. Cap it at
roughly 6–8 fields.

## Smart routing (locked)

Route each applicant by their answers. Do **not** treat everyone the same.

```
Application submitted
      │
   ┌──┴───────────────┬────────────────┐
 clear fit        borderline          no fit
   │                 │                  │
 book now /      "an operator       graceful
 same-day call    will reach out"    off-ramp
                  (manual follow-up) (no calendar)
```

- **Clear fit + ready** → let them book immediately (or get a same-day call).
  Don't make the rarest, best lead wait and cool off.
- **Borderline / needs context** → a senior operator reaches out personally to
  schedule. This human step also filters no-shows (they must respond). For this
  demographic a personal callback often beats self-serve scheduling and
  reinforces the confidential, peer-to-peer positioning.
- **Clear no-fit** → a graceful off-ramp; **no calendar access.** Turning the
  wrong person away is a success, not a failure (see `purpose.md`).

**The risk to manage is cooling.** A motivated owner who applies and hears
nothing for days is lost. Follow-up for fit/borderline leads should be fast -
ideally same-day.

## Qualify with non-financial proxies - no hard financials on the form

Our target is **especially** sensitive about money; an owner contemplating a sale
is wary of financial details leaking. Asking for revenue upfront makes the *right*
person bounce. So:

- **Do not ask for dollar figures or free-text financials.** Size is inferred
  from non-financial proxies. Money is the **operator's** job to surface on the
  call, not the form's.
- If a size signal is wanted, use a single **coarse, optional** revenue *range*
  dropdown with a **"prefer not to say"** option, placed **last** - after the
  applicant has already invested in the other answers.

### Field list (target ~6–8)

1. Name + business name
2. **Are you the owner?** (filters non-decision-makers)
3. What the business does / industry
4. **How long have you owned it?** (tenure - signals our older-owner target)
5. **Number of employees** (coarse band - non-financial size proxy)
6. **"Where are you in your journey?"** - Grow / Stabilize / **Sell** /
   **Transition** / Not sure (core intent qualifier toward sell/transition)
7. **"What's prompting you to reach out now?"** - open text. The single most
   valuable field: best predictor of both fit and show-up (the effort filters
   tire-kickers; the answer arms the operator).
8. Phone + email + preferred contact method
9. *(optional, last)* Coarse revenue range with "prefer not to say"

## Routing signals (how to decide fit)

Weigh these from the application, in priority order:

- **Owner / decision-maker?** Not the owner → almost always not a fit.
- **Intent** = Sell / Transition (or a serious "not sure" leaning that way) →
  strongest positive signal. Pure "grow," very early stage, or "just curious" →
  weaker.
- **"Why now"** substance → real, specific, time-bound answers indicate a true
  fit and a likely show. Thin/empty answers indicate a tire-kicker.
- **Tenure + headcount** in the right band → supports fit; clearly tiny/too-early
  → off-ramp.
- Region (West Michigan core) is a plus, not a gate.

## Reduce no-shows (applies to every path)

- Visible **confidentiality** assurance on the form itself (matches the brand
  voice: "nothing you share leaves this conversation"), plus a one-line *why*
  next to anything sensitive ("so we can match you to the right operator").
- **Trust-first sequencing:** a short "who we are / confidential / limited
  capacity" beat before the fields, and the least-sensitive, ego-friendly
  questions first; optional/sensitive ones last.
- Set **clear expectations** for the call (exactly what the 30 minutes covers).
- **Confirmation + reminders** - capture phone for SMS/a call.
- A small **prep ask** so the applicant arrives invested.

## Who this is NOT for (let them self-select out)

Free-advice / "pick your brain" seekers, tire-kickers with no intent to act,
non-owners, and owners who are too early or not seriously contemplating a
transition. Make this clear enough in copy that they don't reach the calendar.

## Guardrails

- **Optimize for fit, not volume.** When "more leads" conflicts with "better
  leads," choose better.
- Gating lowers raw volume and adds some ops work and latency - that is
  on-strategy. The only real failure mode is **slow follow-up**; design against it.
- Never add a lead-capture pattern whose only effect is to inflate
  top-of-funnel numbers.
