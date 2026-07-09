# Progress - 005 Site Simplification

| Phase | Name | Status |
| ----- | ---- | ------ |
| 0 | Copy deck + contracts | ✅ Complete |
| 1 | Implementation | ✅ Complete |
| 2 | Docs, redirect, verification | ✅ Complete |

Legend: 🔲 Drafted · 🔄 In progress · ✅ Complete

## Phase summaries

Written at the end of each phase with what actually shipped.

### Phase 0 - Copy deck + contracts (shipped)

`copy-deck.md` drafted (one agent), orchestrator-reviewed, and **approved by
the owner as-is**, including the two open decisions: the nav drops the
"How We Work" item entirely (no anchor), and the claims disclaimers are in
(Results hero line + home metrics footnote). Site total ~3,723 -> ~1,896
words; every page under target.

### Phase 1 - Implementation (shipped)

Four-agent fan-out (home+merge / results / about / book) applied the deck.
Home gained the capabilities row (mist Card section, `id="capabilities"`)
and the metrics footnote; `/how-we-work` route + sections folder deleted;
nav is Home/About/Results + Book CTA; results got the hero disclaimer and
lost the mid-page CTA; about and book rewritten per deck. Reviewer verdict
NON-BLOCKING: full word-for-word fidelity confirmed on every REWRITE, KEEPs
byte-identical, CUTs fully gone, AA contrast on the new disclaimer/footnote.
Findings accepted: `src/lib/AGENTS.md` stale-reference fix was outside the
declared surface but mandated by CLAUDE.md (surface amended in the README
retroactively via this note); the unused `#capabilities` anchor id stays.

### Phase 2 - Docs, redirect, verification (shipped)

`next.config.ts`: permanent (308) redirect `/how-we-work` -> `/`, verified
live on a temporary production server. CLAUDE.md Writing section rewritten:
the plan-005 deck is now the copy source of truth (the 1:1 reproduction
rule is superseded), the qualification/concision lens governs future edits,
and the no-em-dash rule now applies site-wide with only the verbatim-locked
strings exempt (legal pages, Jacob's ported dialog title and context).
README write surface amended per the reviewer finding (`src/lib/AGENTS.md`).
Verification: lint 0 errors, typecheck clean, build green with 7 routes
(`/how-we-work` gone); zero `how-we-work` references in `src/`; em-dash
grep hits only the three locked files; copy-string word counts: home ~746,
results ~321, about ~566 (includes names/roles data), book ~162.
