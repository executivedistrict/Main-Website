# AGENTS.md - `src/components/sections/book/`

Sections for the `/book` page. Read [`../AGENTS.md`](../AGENTS.md) first.

## Files

- `content.ts` - all page copy: intro paragraphs, the "What to expect"
  items, trust-strip items (with their lucide icons), the reassurance quote,
  and the booking iframe URL. Copy is verbatim from the owner-approved
  `plans/005-site-simplification/copy-deck.md`; edit it only against that
  deck. It also holds the plan-006 qualification-application copy and
  option lists (`qualifyCopy`, `tierCopy`, `contactFormCopy`, `*Options`,
  and the `QualifyAnswers` / `ContactDetails` / `Tier` types), sourced from
  `plans/006-lead-qualification/phase-0-contracts.md` and recorded as an
  amendment in the plan-005 deck. Option VALUES are locked to the
  qualification config's keys (`src/lib/qualification/config.ts`); never
  change one side without the other.
- `qualify-form.tsx` (client) - the gated-booking application: two steps
  of business questions only (You + the business / Where you are, optional
  revenue range last), progress indicator, per-step validation with inline
  errors, a visually hidden `company_website` honeypot, submit to
  `POST /api/qualify`. **No contact details are collected here** (owner
  decision, 2026-07-09): qualified leads give name/email to the booking
  calendar (which feeds the CRM directly), the other tiers to the contact
  form inside their panels, so nobody enters contact info twice. No
  qualification logic lives client-side; the component only renders the
  tier panel for the tier the server returns. Focus management: the step
  heading is focused on step change, the first invalid field on failed
  validation, and each tier panel focuses its own heading on reveal.
- `form-fields.tsx` - shared field building blocks (`TextField`,
  `RadioGroup`, `FieldError`, `inputClasses`) used by the qualify form and
  the contact form. Ids follow the `qf-<field>` scheme; the two forms
  never mount simultaneously.
- `lead-contact-form.tsx` (client) - the shared internal contact form
  (tier 2 and the tier 3 help path): required message + name, email,
  phone, preferred contact method, plus optional preferred times. Submits
  to `POST /api/lead-contact` with
  `{ message, preferredTimes?, tier, contact, application }` (the parent
  passes the submitted answers; there is no lead database), then shows a
  confirmation state.
- `tier-qualified.tsx` (client) - tier 1 panel: brief confirmation heading,
  then the existing `BookingCalendar`. The ONLY place the calendar renders
  inside the application flow. No internal email fires for this tier; the
  booking itself lands in the CRM. The application's business context is
  injected into the iframe URL as query parameters (`business_name`,
  `ownership`, `industry`, `years_owned`, `employees`, `journey`,
  `why_now`, `revenue_range`; human-readable labels, never internal option
  values; `revenue_range` omitted when undisclosed; no personal contact
  details). The GHL widget prefills any form field whose custom-field key
  matches a parameter name and ignores the rest, so capturing these in
  the CRM requires custom fields with EXACTLY these keys on the
  calendar's form in GHL; changing a key here breaks that mapping.
- `tier-borderline.tsx` (client) - tier 2 panel: follow-up promise heading
  and body wrapping `LeadContactForm` (tier "borderline").
- `tier-no-fit.tsx` (client) - tier 3 panel: congratulatory off-ramp copy
  (owner decision, 2026-07-09: positive framing, no outright rejection),
  still no calendar ever, plus a low-key outline button ("I'm stuck and
  need help") that reveals `LeadContactForm` (tier "no-fit") for
  applicants stuck on a real bottleneck. The contact form, never the
  booking iframe.
- `booking-copy.tsx` - left column: "Start Here" label, h1 with the gold
  serif accent, body copy, and the "What to expect" checklist.
- `booking-calendar.tsx` - right column: the calendar card (navy header, GHL
  booking iframe, confidentiality footer). Sticky below the fixed header on
  desktop, and ordered first on mobile (matching production's `order: -1`).
  Optional `prefill` prop: a string record appended to the iframe URL as
  query parameters (used by `tier-qualified.tsx` for business context).
- `trust-strip.tsx` - ice band with the four trust items (4 cols, 2 on
  tablet, 1 on phones).
- `bottom-reassurance.tsx` - navy band with the gold accent bar and the
  serif-italic reassurance paragraph.

## Conventions

- The page (`src/app/book/page.tsx`) owns the two-column grid; these
  components fill it.
- The booking iframe is a plain lazy-loaded embed of the production GHL
  calendar URL (no GHL embed script), height ~776px per the rendered
  original.
- Form error states use Tailwind's built-in `red-700` (AA on white/mist)
  plus a `CircleAlert` icon, since the brand theme defines no error token;
  color is never the only error signal. If a brand error token lands in
  `globals.css`, switch to it.
