# Phase 0 - Copy deck + contracts (gates on owner approval)

## Goal

Produce `copy-deck.md`: the complete rewritten site copy, reviewable in one
document, approved by the owner before implementation.

## Copy rules (the contract for every rewrite)

1. Brand voice: senior, plain-spoken, operator-minded. Short declarative
   sentences. No storytelling headlines, no filler transitions.
2. Qualification lens (`docs/purpose.md`): keep lines that qualify or repel
   (revenue range, "the right businesses, not every business", embed-not-
   advise); cut lines that sell to everyone.
3. No em-dashes anywhere (new writing). En-dashes in ranges are fine.
4. Results figures are presented as self-reported claims: the Results page
   gains one short disclaimer line (CLAUDE.md claims policy now applies
   because the copy is no longer a verbatim reproduction).
5. Every section keeps its job (proof, process, invitation) in fewer words;
   headlines may keep the Lora `<em>` accent pattern.
6. Preserved verbatim: legal pages, Jacob's dialog strings, the booking
   calendar URL and iframe copy unless the deck proposes a trim.

## Structural contract

- `/how-we-work` dies. Its three capabilities join home as one card row
  (roughly 40-60 words per card). Nav gains an anchor or drops the item
  (deck proposes; owner decides). Redirect `/how-we-work` -> `/` (Phase 2).
- Home section order after the merge: hero, proof bar, three pains
  (each cut to headline + 1 paragraph + callout), synthesis (2-3 sentences),
  capabilities row (new), process (4 steps, trimmed), metrics band,
  final CTA.
- Word targets: home <= 800 (excluding Jacob card), results <= 450,
  about <= 550, book <= 300.

## Deck format

For each page, section by section: KEEP (unchanged), CUT (dropped entirely),
or REWRITE with before/after word counts and the full replacement text.
Ends with the proposed nav/footer link list and shortened page metadata.

## Acceptance

- Deck drafted (one agent), edited by the orchestrator, then presented to
  the owner. Phase 1 starts only after explicit owner approval; requested
  changes are folded into the deck first.
