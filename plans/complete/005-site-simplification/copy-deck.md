# Copy deck - Plan 005 site simplification (Phase 0)

Complete rewritten site copy for owner review. Every section on every page is
marked **KEEP** (unchanged), **CUT** (dropped entirely), or **REWRITE** (full
replacement text given, with before/after word counts). Replacement text is
final wording: Phase 1 implements it word for word.

Conventions:

- Headline splits are given in the `pre / em / post` shape used by the
  `EmHeadline` type in `content.ts`. The `em` segment is the serif-italic
  gold accent.
- Word counts include headlines, body, callouts, and CTA labels for that
  section. They exclude code-level data (ids, image paths, icon names).
- Current copy is verbatim production copy and contains em dashes. All
  rewritten copy below contains none (en-dashes in ranges like $500K–$50M
  remain). Any KEEP section that contains an em dash is flagged and gets a
  punctuation-only fix, listed inline.
- Legal pages (`/privacy`, `/terms`) and Jacob's dialog strings are untouched
  and do not appear in this deck.

---

## Home (`/`)

Target: <= 800 words excluding the Jacob card. Section order after the merge:
hero, proof bar, three pains, synthesis, capabilities row (new), process,
metrics band, final CTA.

### Hero headline - KEEP

```
pre:  "Building a company is hard. Building it "
em:   "alone"
post: " is harder."
```

### Hero subline - REWRITE (42 -> 28 words)

Cuts the trailing clause; the invested-in-outcomes point now lives in the
synthesis and capability card 1. Keeps the revenue range and embed-not-advise
(the two hardest qualifiers on the site).

> We're fractional C-suite operators for founders and owners running
> $500K–$50M businesses. We don't advise from the outside. We embed inside
> your company, own outcomes, and share the weight.

### Hero CTA - KEEP

"Book a Confidential Discovery Call"

### Jacob card - KEEP (no trim proposed)

The card is already 17 words and on-voice. No change. (Jacob's dialog strings
are locked regardless.)

### Proof bar - KEEP

"75+ companies served" / "$500K–$50M revenue range" / "Fractional CFOs, COOs,
CMOs & Legal Counsel". All three qualify or repel. Unchanged.

### Pain 01, The Money Problem - REWRITE (161 -> 77 words)

Headline and callout survive; three paragraphs become one.

```
label: "The Money Problem"
pre:  "\"Revenue is up. So why isn't there any "
em:   "money?"
post: "\""
```

Paragraph:

> Revenue is climbing, but profit doesn't follow and cash flow makes no
> sense. That's not a revenue problem. The business has outgrown its systems,
> and nobody has built the financial visibility you need to make confident
> decisions. We sit inside your business and build it.

Callout (kept verbatim, no em dash present):

> We don't just read your financials. We engineer how money moves through
> your business so that growth and profit are the same story.

### Pain 02, The Partner Problem - REWRITE (170 -> 89 words)

```
label: "The Partner Problem"
pre:  "\"I have a team. But I don't have a "
em:   "partner."
post: "\""
```

Paragraph:

> Nobody in your world sees the whole picture: the cash reality, the people
> dynamics, the tradeoffs you weigh every week. You've tried coaches,
> masterminds, maybe an expensive hire who didn't last a year. The problem
> was never the advice. It was the model. You need someone at your table who
> owns the outcome with you.

Callout (kept verbatim):

> We don't keep three-dozen clients on speed dial. We sit inside your
> business, learn your team, and operate like the partner you've been
> missing.

### Pain 03, The Direction Problem - REWRITE (159 -> 81 words)

This is the section that speaks directly to the sell-or-transition owner, so
it keeps the exit language. The old third paragraph duplicated the callout;
the duplication is gone.

```
label: "The Direction Problem"
pre:  "\"I don't know if I should scale, sell, or just "
em:   "survive."
post: "\""
```

Paragraph:

> Maybe the business is worth something and you want to know what. Maybe
> you're just tired, and another ten years feels like a sentence, not a
> choice. Selling, succession, stepping back: these questions cut across
> operations, finance, and legacy, and no single hire can answer them.

Callout (kept verbatim):

> We help you answer the only question that matters: What do you actually
> want? Then we build the plan and execute it alongside you.

### Synthesis ("connected") - REWRITE (163 -> 69 words)

Three paragraphs become one; it no longer restates the pains it sits under.

Title (kept): "These three problems are connected. So is the solution."

Paragraph:

> They're symptoms of one structural gap: the company has outgrown your
> capacity to lead it alone. Everything you've tried was designed to advise
> you, not to sit beside you and do the work. Executive District closes that
> gap by embedding proven operators (fractional CFOs, COOs, CMOs, and legal
> counsel) who sit at your leadership table and own outcomes with you.

### Capabilities row - NEW (177 words: header 16 + cards 57 / 55 / 49)

The only non-duplicate content from `/how-we-work`, distilled to one card row.
Suggested placement: directly after the synthesis, before the process. New
`content.ts` export shape: `{ header: { title, sub }, cards: Array<{ headline:
EmHeadline; body: string }> }`.

Header:

> **One model. Three capabilities.**
> Everything a business needs to grow, stabilize, or exit, under one roof.

Card 1 - Fractional leadership:

```
pre:  "Your leadership team, built around your "
em:   "stage."
post: ""
```

> You've outgrown the founder-does-everything model but can't yet justify a
> full-time executive team. We embed fractional executives who work as if
> they're on staff: a CFO for financial clarity and cash flow, a COO for
> operational accountability, a CMO for revenue systems, and general counsel
> for M&A, governance, and risk.

Card 2 - Exit readiness:

```
pre:  "You only sell your business "
em:   "once."
post: ""
```

> Most owners wait for a buyer, then scramble. We build exit readiness into
> how the company runs: stronger EBITDA, a leadership structure that works
> without you, less owner dependency, and a clear read on what buyers
> actually evaluate. Six months out or six years, you won't negotiate from
> weakness.

Card 3 - Revenue infrastructure:

```
pre:  "Growth without systems is "
em:   "expensive motion."
post: ""
```

> We build revenue engines, not campaigns: lead generation systems, sales
> process and compensation design, pricing, and attribution dashboards that
> connect marketing spend to revenue. Infrastructure your team can run
> without you, built to compound over time instead of expiring when the
> campaign ends.

### Process - REWRITE (108 -> 98 words)

Title, subline, step titles, and step 04 unchanged. Steps 01-03 trimmed
(step 03 also loses its em dash).

Title (kept): "The engagement is simple. The impact isn't."
Subline (kept): "Here's what happens when you reach out."

- **01 Confidential Conversation**: "A 30-minute call with a senior operator.
  No pitch. No pressure. We listen and tell you honestly whether this is the
  right fit."
- **02 Diagnostic Deep-Dive**: "We assess the business across five pillars:
  financial clarity, operational systems, revenue infrastructure, leadership
  capacity, and strategic direction."
- **03 Operator Match & Embed**: "We match you with the right fractional
  executive, who embeds inside your business and owns outcomes from day one."
- **04 Results & Evolve** (kept verbatim): "Monthly accountability cycles.
  Measurable outcomes. As your business evolves, so does the engagement."

### Metrics band - KEEP, plus one added line (+6 words)

The four metrics and their context lines are unchanged. Per the claims policy
(CLAUDE.md), add one small footnote line under the band:

> Self-reported results from anonymized engagements.

### Final CTA - REWRITE (129 -> 98 words)

Headline kept:

```
pre:  "You've carried this long enough. "
em:   "Let's carry it together."
post: ""
```

Paragraphs:

> Carrying this alone costs you something: profit you can't see, decisions
> made without the right data, and years spent running a business that was
> supposed to serve you.
>
> The conversation is confidential, takes thirty minutes, and is with an
> operator who has been where you are, not a salesperson reading a script.

CTA (kept): "Book a Confidential Discovery Call"

"What to expect" list (first item loses its em dash; others kept verbatim):

- A real conversation, not a sales script
- An honest assessment of whether we're the right fit
- Immediate clarity on your biggest leadership gaps
- Zero obligation, zero pressure, complete confidentiality

**Home total after: ~797 words (excluding the Jacob card). Target <= 800.**

---

## How We Work (`/how-we-work`) - PAGE REMOVED

The page is deleted in Phase 1 and `/how-we-work` redirects to `/` in
Phase 2. Section-by-section disposition:

### Hero ("One model. Three capabilities. Built around you.") - CUT

The headline idea survives as the home capabilities-row header.

### Four differentiators (operators/embedded/outcome-owned/invested) - CUT

Fully redundant: the hero subline, synthesis, and capability card 1 carry
embed-not-advise and invested-in-outcomes on the home page.

### Contrast strip ("What You've Tried" / "What This Is") - CUT

The Partner Problem paragraph carries the tried-it-all beat in one sentence.

### Capabilities intro + three capability sections (463 words) - REWRITE, merged

Distilled to the three 40-60 word cards in the home capabilities row above
(463 -> 177 words including the row header).

### Alignment band ("We're invested in your growth. Literally.") - CUT

Same claim as capability card 1's framing and the synthesis; no new
information.

### Closing CTA - CUT

The home final CTA is the page's closing CTA after the merge.

### Nav decision - PROPOSED: drop the item (owner decides)

Recommendation: remove "How We Work" from the nav entirely rather than
keeping it as a `/#capabilities` anchor. Rationale: a top-level nav item
pointing at a mid-page card row overweights it, and a shorter nav (Home,
About, Results, plus the Book CTA) is clearer for this audience.

---

## Results (`/results`)

Target: <= 450 words. Structure: hero (with disclaimer), aggregate metrics,
four case studies, closing CTA. The mid-page CTA band is cut. Case-study
shape change for Phase 1: `situation` / `whatWeDid` / `bottomLine` collapse
into a single `summary: string`; the `results` grids keep their values and
labels.

### Hero - REWRITE (37 -> 41 words; grows because it absorbs the disclaimer)

Eyebrow (kept): "Proof"
Headline (kept, in `results-hero.tsx`): "We don't talk about results. We
*show them.*" (em accent: "show them.")

Subline:

> Every engagement is measured by what changes inside the business: the
> financials, the operations, the owner's quality of life.

Disclaimer line (new, required by the claims policy; rendered as a smaller
line under the subline):

> Results below are self-reported from anonymized client engagements and are
> not independently verified.

### Aggregate metrics strip - KEEP (22 words)

All four metrics and labels unchanged.

### Case study 01, Regional Roofing Contractor - REWRITE (172 -> 71 words)

Industry label and title kept. Summary:

> A regional contractor with volatile cash flow, poor job costing, and
> profit tied to storm season. We installed job costing with a 15% EBITDA
> floor, capacity-based revenue forecasting, gross-profit sales compensation,
> and a framework for expansion into three adjacent counties.

Results grid (contexts trimmed to the load-bearing ones):

- 7% → 19% - EBITDA improvement ($480K annual profit increase)
- -22% - Crew overtime labor costs reduced
- +31% - Close rate improvement
- $1.2M - First-year projected revenue lift

### Case study 02, Estate Planning Law Firm - REWRITE (154 -> 72 words)

> A high-trust law firm bottlenecked by founder-dependent workflows and
> administrative overload. We built an accountability chart, a full client
> journey with document automation and billing triggers, and an SOP system
> across estate, probate, and trust work.

Results grid:

- 23 → 11 days - Average processing time reduced
- +29% - Monthly billables increased (without adding attorney hours)
- -32% - Founder workload reduced
- 3 counties - Growth expansion framework launched

### Case study 03, National Health-Tech Platform - REWRITE (184 -> 66 words)

> A fast-scaling telehealth provider strained by surging demand: fluctuating
> turnaround times, rising ad costs, inconsistent onboarding. We matched
> scheduling to clinician capacity, installed a full-funnel performance
> dashboard, and built a scalability framework covering all 50 states.

Results grid:

- 600% - Assessment throughput YOY growth
- 4.5x - LTV:CAC ratio optimized
- 9 mo → 3 days - Patient wait time reduced
- $20M - Annualized revenue pipeline

### Case study 04, Private Utility Services Company - REWRITE (166 -> 70 words)

> A new utility services division with unstructured bidding and heavy
> equipment costs, struggling to win municipal work. We built a bid pricing
> model, a municipal contracting readiness package, and a capital equipment
> ROI model.

Results grid:

- $2.1M - Recurring backlog secured (3 multi-year municipal contracts)
- 18% → 42% - Bid-win conversion rate (in 90 days)
- -27% - Equipment downtime costs reduced
- -33% - Fuel cost inefficiencies eliminated

### Mid-page CTA band - CUT (28 words)

One CTA per page; the closing CTA remains.

### Closing CTA - REWRITE (34 -> 25 words)

> A confidential call with a senior operator. Thirty minutes. No pitch. Just
> a real conversation about where your business is.

Button (kept): "Book a Confidential Discovery Call"

**Results total after: ~367 words. Target <= 450.**

---

## About (`/about`)

Target: <= 550 words. All eight team members stay; bios cut to 40-60 words
keeping the concrete facts (exits, scale, specialty). Group labels, names,
roles, and images unchanged.

### Hero - REWRITE (48 -> 39 words)

Eyebrow (kept): "The Team"
Headline (kept, in `about-hero.tsx`): "Operators who've been in *your
chair.*" (em accent: "your chair.")

Subline:

> Executive District is a bench of proven operators: people who've made
> payroll, built teams, scaled companies, and navigated exits. P&L
> responsibility in their background, not just a certificate on the wall.

### Founder, Zach Booker - REWRITE (140 -> 74 words)

Label, name, title, image kept. Bio becomes one paragraph:

> Zach has spent 25 years leading more than 75 companies. He founded ADHD
> Online / Mentavi Health and built it into one of the nation's
> fastest-growing health-tech companies. He's lived the 100-hour weeks, took
> a 90-day sabbatical in 2023 when the weight became unsustainable, and came
> back with one mission: helping founders build companies without losing
> themselves. His faith and his commitment to serve drive the work.

### Bench intro - REWRITE (35 -> 22 words)

Title (kept): "The Senior Operator Bench"

> Every operator here has built, scaled, or exited a real business. You're
> matched by gap, industry, and stage.

### Ben Ipema, Fractional CFO - REWRITE (65 -> 49 words)

> Licensed CPA, MBA, 20+ years of finance leadership. Ben has led exits in a
> SaaS company and a large technology services organization and guided
> multiple mergers and acquisitions. After executive roles in private
> equity-backed and family-owned businesses, he now brings financial clarity
> to companies from early stage to $30M+.

### Philip Johnson, Fractional COO - REWRITE (72 -> 47 words)

> Phil has led companies through the messy middle across hospitality, real
> estate development, renewable energy, and global sourcing. He's overseen
> ground-up resort and residential development, launched and exited
> hospitality concepts, and built multi-property portfolios. Equally
> comfortable modeling scenarios in a boardroom and tightening handoffs on
> the ground.

### Michael Davis, Fractional COO - REWRITE (84 -> 48 words)

> Michael built an appliance side hustle into a multi-channel retail,
> service, and e-commerce business (75,000+ square feet, a team of 25)
> before a successful exit. He builds the operating infrastructure that lets
> companies grow without burning out their people: inventory controls,
> defined roles, financial visibility, and performance rhythms.

### Andy Straub, Fractional Operator & Business Advisor - REWRITE (70 -> 49 words)

> Andy launched his first business at 24 and has started, operated, and sold
> multiple companies since. Over 20 years he's built a real estate
> investment portfolio and become one of West Michigan's top-performing real
> estate professionals. He builds scalable systems and develops people to
> perform at their highest level.

### Mike King, Fractional CMO - REWRITE (68 -> 43 words)

> Mike scaled 10X Health's paid advertising to $1 million in weekly revenue
> and cut customer acquisition costs 42% for Grant Cardone's business line.
> He's helped 7-, 8-, and 9-figure brands build $1M+ monthly revenue engines
> with marketing systems that produce predictable, scalable growth.

### Mya Stone, Fractional M&A Advisor - REWRITE (74 -> 45 words)

> Mya founded, scaled, and exited two companies (a franchise roll-up and a
> luxury tech venture) before moving into investment banking and founding
> Stone Capital Partners. She helps owners protect performance through
> growth, diligence, and transition. Harvard MBA. Industries: automotive,
> industrial services, professional services, and construction.

### Andrew Longcore, Fractional General Counsel - REWRITE (62 -> 45 words)

> Andrew advises lower-middle-market companies at moments where legal
> decisions directly affect enterprise value. 16+ years as lead counsel on
> more than 100 M&A transactions and Outside General Counsel to a portfolio
> of operating businesses. He turns complex legal and regulatory issues into
> clear, business-aligned guidance.

### Jacob Mirandette, Operations Coordinator - REWRITE (52 -> 40 words)

(This is the About-page bio, not Jacob's locked dialog strings.)

> Jacob works alongside our senior operators and founder teams to turn
> complexity into clarity. With hands-on experience in organizational
> restructuring and administrative operations, he builds disciplined systems
> and brings order so the senior team can focus on what matters most.

### Positioning strip - REWRITE (43 -> 28 words)

> Our operators have built something real. They've made payroll. They've sat
> in the chair you're sitting in. And they're invested in your outcomes, not
> advising from the outside.

### Team CTA - REWRITE (34 -> 16 words)

> A confidential call with a senior operator. Thirty minutes. No pitch.

Button (kept): "Book a Confidential Discovery Call"

**About total after: ~545 words of prose (target <= 550). Names, roles, and
group labels add ~56 structural words on top; they are data, not copy, and
are unchanged.**

---

## Book (`/book`)

Target: <= 300 words. Already the leanest page; this is a light trim, an
em-dash cleanup, and one redundancy cut. The booking calendar URL and iframe
are untouched.

### Eyebrow + headline - KEEP

"Start Here" / "Let's talk about what's really going on in *your business.*"
(em accent: "your business.")

### Intro copy - REWRITE (58 -> 55 words)

> This is a confidential, 30-minute conversation with a senior operator who
> has been where you are. No pitch. No contracts. No obligations.
>
> We'll listen, ask a few questions, and tell you honestly whether Executive
> District is the right fit for where your company is right now.

### Urgency line - CUT (19 words)

Duplicates the home final CTA's opening beat. The trust strip and
reassurance line already close the loop on this page.

### "What to expect" list - REWRITE (76 -> 51 words)

- **A real conversation** with a senior operator, not a business development
  rep.
- **An honest assessment** of whether we're the right fit. If we're not,
  we'll say so.
- **Immediate clarity** on your biggest leadership gaps and what's causing
  the pressure you're feeling.
- **Zero obligation, zero pressure,** complete confidentiality. A
  conversation between peers.

### Calendar card - REWRITE (punctuation only, 18 -> 18 words)

Title becomes "Confidential Conversation · 30 min" (removes the em dash;
middot separator). Label and footer kept verbatim.

### Trust strip - KEEP (28 words)

All four items unchanged.

### Bottom reassurance - REWRITE (44 -> 30 words)

> If we're the right fit, you'll know. If we're not, you'll leave the call
> with more clarity than you had before it. Either way, the conversation
> costs you nothing.

**Book total after: ~187 words. Target <= 300.**

---

## Navigation and footer

### Header nav (`src/lib/nav.ts`) - proposed

- Home -> `/`
- About -> `/about`
- Results -> `/results`
- CTA button: "Book a Call" -> `/book`

("How We Work" dropped per the nav decision above. If the owner prefers the
anchor option instead, the item becomes "How We Work" -> `/#capabilities`.)

### Footer (`src/components/site-footer.tsx`) - proposed

- Navigate: mirrors the header list above plus "Book a Call" (it derives
  from `navConfig`, so it updates automatically).
- Connect: LinkedIn, Hello@executivedistrict.com - KEEP.
- Legal row (Privacy Policy, Terms & Conditions) - KEEP.
- Tagline ("Fractional C-Suite Services for $500K–$50M Business Owners") -
  KEEP; it is a qualifier.

---

## Page metadata

### Home - title KEEP, description REWRITE

- Title (kept): "Executive District | Fractional C-Suite for $500K–$50M
  Businesses"
- Description: "Embedded fractional CFOs, COOs, CMOs, and legal counsel for
  owners who've outgrown doing it alone. We embed, own outcomes, and share
  the weight."

### How We Work - CUT (page removed; redirect in Phase 2)

### Results - REWRITE

- Title: "Client Results | Executive District"
- Description: "Self-reported results from anonymized client engagements:
  EBITDA gains, revenue growth, operational transformation, and exit
  readiness."

### About - REWRITE

- Title: "Our Team | Executive District"
- Description: "Proven operators with P&L experience and real exits. Not
  coaches. Not consultants. Operators."

### Book - title KEEP, description REWRITE (trim)

- Title (kept): "Book a Confidential Discovery Call"
- Description: "Thirty minutes with a senior operator. No pitch. No
  contracts. Just a real conversation about where your business is."

---

## Word-count summary

Counts are marketing copy (headlines, body, callouts, CTA labels, metric
labels). Home excludes the Jacob card per the target definition. About
excludes names/roles/group labels (unchanged data); with them it is ~601.

| Page | Before | After | Target | Status |
| ---- | -----: | ----: | -----: | ------ |
| Home | ~1,007 | ~797 | <= 800 | Meets |
| How We Work | ~835 | 0 (177 merged into Home) | removed | Meets |
| Results | ~797 | ~367 | <= 450 | Meets |
| About | ~847 | ~545 | <= 550 | Meets |
| Book | ~237 | ~187 | <= 300 | Meets |
| **Total** | **~3,723** | **~1,896** | ~2,300-2,500 | Under plan ceiling |

The site total lands below the README's ~2,300-2,500 estimate because the
per-page ceilings sum lower once /how-we-work is removed; nothing was cut
beyond what the qualification lens justified.

---

## Amendments (post-approval, owner-requested)

### About bench bios shortened + layout regrouped (owner request, post-launch of the deck)

The owner asked for shorter, length-consistent bench bios (~30 words each)
and one flat card grid (each card tagged with its field) instead of
one-band-per-field sections. Zach Booker's founder bio is unchanged and he
stays at the top. The shipped bios in
`src/components/sections/about/content.ts` are the source for these; they
condense the deck versions above with no new facts. Structural note: the
`support` band merged into the bench grid (Jacob Mirandette, field
"Operations Support").

### About bench: first names only (owner request, 2026-07-09)

The owner asked to drop last names for everyone on the About page except
Zach Booker. Bench cards (and Jacob in Operations Support) now show first
names only ("Ben", "Philip", "Michael", "Andy", "Mike", "Mya", "Andrew",
"Jacob") in `src/components/sections/about/content.ts`. Bios and headshot
paths are unchanged.

### Plan 006: /book application form + tier panel copy (owner-approved 2026-07-09)

Plan 006 gates the booking calendar behind a multi-step application
(`plans/006-lead-qualification/phase-0-contracts.md`, copy approved by the
owner on 2026-07-09). Shipped copy lives in
`src/components/sections/book/content.ts` (`qualifyCopy`, `tierCopy`, and
the option lists). Approved verbatim:

- Intro confidentiality beat (shown above the fields): "A confidential
  conversation starts with a few questions. We work with a limited number
  of owners, so we make sure every call is worth your time. Nothing you
  share leaves this conversation."
- Why-now field label: "What's prompting you to reach out now?" with
  helper: "One or two sentences is plenty. This goes straight to the
  operator you'd meet."
- Revenue-range helper: "Optional. A range is all we need, so we can match
  you to the right operator."
- Tier 2 panel (split across heading / body / textarea label): "You're a
  fit for a conversation. A senior operator will reach out personally
  within one business day to find a time. Anything you want them to know
  first?"
- Tier 3 off-ramp (split across heading / body): "Based on your answers,
  we're probably not the right partner right now. We embed senior
  operators in established businesses, and we'd be wasting your time to
  pretend otherwise. If your situation changes, we'll be here."

Supporting microcopy drafted in Phase 2 within the approved voice (source
of truth is `content.ts`):

- Step titles: "You + the business" / "Where you are" / "Contact".
- Field labels: "Your name", "Business name", "Are you the owner?",
  "What does the business do?", "How long have you owned it?", "Number of
  employees", "Where are you in your journey?", "Email", "Phone",
  "Preferred contact method", "Annual revenue range".
- Option labels per the contract (e.g. "No, I'm a partner or executive",
  "Just me", "Not sure", "Prefer not to say"); numeric ranges use
  en-dashes ("2–5", "$1M–$5M") per the deck convention.
- Buttons: "Back" / "Continue" / "Submit application" / "Submitting…".
- Tier 1 confirmation: "You're a fit. Pick a time." with body "Choose a
  time below for a confidential, 30-minute conversation with a senior
  operator."
- Tier 2 extras: "Preferred times to reach you (optional)", "Send",
  confirmation "Message sent." + "A senior operator will reach out
  personally within one business day."
- Errors: "Please fill this in.", "Please choose an option.", "Enter a
  valid email address.", "Something went wrong on our end. Your answers
  are still here, so please try again.", "Too many attempts in a short
  window. Give it a minute and try again.", "Please add a short message.",
  "Your message didn't go through. Nothing was lost, so please try again."

### /book application: contact-info restructure + positive no-fit off-ramp (owner request, 2026-07-09)

Two owner-directed changes to the plan-006 application flow:

**Contact info moves out of the scored form.** The application is now two
steps of business questions only ("You + the business" / "Where you are",
optional revenue range last); name, email, phone, and preferred contact
method are no longer collected before scoring. Qualified leads enter
name/email directly in the booking-calendar iframe (which feeds the CRM),
so nothing is collected twice and no internal notification email fires
for the qualified tier. Borderline and no-fit leads give contact details
on the internal contact form instead. The borderline body gained a
sentence: "Leave your details and anything you want them to know first."

**No-fit is congratulatory, with an opt-in help path.** The outright
rejection was replaced. Approved direction: positive framing
("congratulations on your initial success"), still discouraging
proceeding, with a button to the internal contact form only (never the
calendar) for owners stuck on a real bottleneck. Shipped copy
(`tierCopy.noFit` in `src/components/sections/book/content.ts`):

- Heading: "Congratulations on your initial success."
- Body: "You've built something real. Based on your answers, you're
  earlier in the journey than the owners we typically embed with, and a
  fractional executive probably isn't the right investment yet. Keep
  building; if your situation changes, we'll be here."
- Help prompt: "That said, if you're stuck on a bottleneck you genuinely
  need senior help with, tell us what's going on and we'll take an honest
  look."
- Button: "I'm stuck and need help", revealing the contact form with
  message label "What are you stuck on?"
- Confirmation: "Message sent." / "We'll read what you sent and respond
  honestly, one way or the other."
