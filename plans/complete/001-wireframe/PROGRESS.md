# 001 - Wireframe · Progress

| Phase | Title | Status |
| ----- | ----- | ------ |
| 0 | Contracts & scaffolding | ✅ Complete |
| 1 | Homepage + navigation + content | ✅ Complete |
| 2 | Application flow + routing + integration shells | ✅ Complete |

**Plan complete.** Integration wiring split out to `plans/deferred/003-integrations/`.

## Phase 0 - Contracts & scaffolding

Locked the `LeadApplication` shape, `scoreLead()` signature, the `saveLead()` /
`notifyTeam()` shell signatures, the `/` + `/apply` route map, and the env var
list. No integration dependencies added.

## Phase 1 - Homepage + navigation + content

Shipped `site-header` (with `minimal` mode), `site-footer`, and `page.tsx` with
all eight sections (hero, is-this-you, who-we-work-with, how-it-works, proof,
operators, confidentiality, CTA). Nav uses in-page anchors. Copy is short and
clear; built on the design-system primitives.

Follow-up (post-review): removed the two section eyebrows (How we work, Our
operators); purged em-dashes from all copy and docs (now a standing rule in
`CLAUDE.md`); added a general `/contact` page (form + `notifyContact` shell) and
a branded `not-found` (404); linked Contact in the header and footer.

## Phase 2 - Application flow + routing + integration shells

Shipped the 3-step `/apply` wizard (`apply-form.tsx`, client), the
`submitApplication` server action, `scoreLead`, and the `saveLead` / `notifyTeam`
**no-op shells**. Honeypot in place. Submitting routes to clear-fit (booking
placeholder), borderline ("we'll reach out"), or no-fit (off-ramp). `.env.example`
documents the five future env vars. No real integration deps installed.

## Integration wiring (follow-on)

Split out to the deferred plan `plans/deferred/003-integrations/` (blocked on
Supabase / Resend / Cal.com accounts + keys). The Phase 2 shells are the seams
it fills.
