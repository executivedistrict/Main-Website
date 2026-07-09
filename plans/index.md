# Plans index

One row per plan. Update at kickoff and at every phase transition.

| #   | Plan | Status | Notes |
| --- | ---- | ------ | ----- |
| 001 | [Wireframe](./complete/001-wireframe/) | ✅ Complete | Homepage, 3-step application + smart routing, contact, 404, integration shells. |
| 002 | [Site Navigation](./complete/002-site-navigation/) | ✅ Complete | Config-driven multi-level header (leaf/parent, viewport-aware popovers, icons + descriptions); header + footer in layout. |
| 003 | [Integrations](./deferred/003-integrations/) | 🧊 Deferred (obsolete) | Owner-confirmed obsolete: Supabase offloaded/unused, Resend implemented by 006, Cal.com never applied. History only. |
| 004 | [Jacob Concierge](./004-jacob-concierge/) | 🔄 In progress | All phases shipped; awaiting owner's TAVUS_* keys for the live E2E test before moving to complete. Context ships verbatim (owner follow-ups in open-questions). |
| 005 | [Site Simplification](./complete/005-site-simplification/) | ✅ Complete | Copy cut ~50% site-wide per the owner-approved deck; /how-we-work removed (capabilities merged into home) with a permanent redirect; claims disclaimers added; CLAUDE.md copy rule superseded by the deck. |
| 006 | [Lead Qualification](./complete/006-lead-qualification/) | ✅ Complete | /book gated behind the 3-step application; server-side scoring from src/lib/qualification/config.ts routes to three tiers (calendar / contact step / off-ramp); branded Resend email to the config's internal contact on every submission. Live send pending the owner's RESEND_API_KEY. |

Legend: 🔲 Drafted · 🔄 In progress · ✅ Complete · 🔁 Suggested · 🧊 Deferred
