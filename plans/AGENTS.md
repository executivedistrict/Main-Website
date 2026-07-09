# Plans - Authoring Conventions

This is the **home for plans in this project.** Every significant initiative gets
its own numbered plan directory under **`/plans/NNN-kebab-name/`** (relative to
the repo root).

This file captures the design pattern so every future plan stays consistent.

## Rules that apply here

- **A plan declares its write surface in its README.** The `README.md` lists the
  paths the plan may touch; every agent prompt within the plan repeats that
  boundary in its "do not touch" list.
- **Anything outside the declared write surface is off-limits** for the duration
  of the plan.
- **Always check for `Agents.md` / `AGENTS.md`.** Before any agent edits
  files in a directory, it must check that directory and every parent
  up to the repo root for an `Agents.md` / `AGENTS.md` file and follow
  the instructions in any that apply. Phase prompts must include the
  relevant `Agents.md` paths in their "Read first (authoritative)"
  list.

## Directory naming

`plans/NNN-kebab-name/` - zero-padded three-digit counter, strictly monotonic.
Check the highest existing `NNN-` prefix **across every state directory**
(`NNN-*/`, `deferred/NNN-*/`, `suggested/NNN-*/`, `complete/NNN-*/`), add 1, never
reuse a number even if a plan is abandoned.

Examples: `001-wireframe`, `002-lead-capture`, `003-supabase-integration`.

## Required files per plan

| File                | Purpose                                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`         | High-level overview: goal, phase map, orchestration rules, success definition, out-of-scope list, edge cases the plan addresses up front.                            |
| `PROGRESS.md`       | Status table + per-phase summary. Created at Phase 0. **Updated at the end of every phase** with what actually shipped (not what was planned).                       |
| `phase-N-<slug>.md` | One file per phase. Each phase file includes Goal, Scope, Not in scope, Contracts received from prior phases, Deliverables, Agent instructions, Acceptance criteria. |

Optional files (add only if a plan justifies them):

- `recommendations.md` - architectural analysis + trade-off capture. Add
  when the plan commits to a significant dependency (e.g. a new library),
  picks between multiple viable approaches, or touches a shared data model
  in ways future plans will inherit. Should document: the recommendation,
  why, costs accepted, alternatives considered, and any follow-ups spun
  out of the decision. Reference `recommendations.md` from every phase
  prompt so agents see the reasoning, not just the prescriptive spec.
  Example: `plans/complete/NNN-plan-name/recommendations.md`.
- `decisions.md` - lightweight ADR-style log when a plan accumulates
  several smaller decisions that don't each warrant their own analysis.
- `open-questions.md` - questions awaiting input from stakeholders, kept
  in-plan so they don't get lost in chat.

## Plan lifecycle directories

The plans tree has four states a plan can sit in:

| Directory                     | Meaning                                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `plans/NNN-*/`           | **Active** - work is scheduled or in-flight. Index shows 🔲 / 🔄 / ✅.                                |
| `plans/deferred/NNN-*/`  | **Drafted but shelved** - scoped enough to execute but not scheduled. Value isn't blocking.           |
| `plans/suggested/NNN-*/` | **Recommended as a near-term predecessor or follow-on** to an active plan. Promoted from `deferred/`. |
| `plans/complete/NNN-*/`  | **Shipped** - all phases landed. Preserved for history + traceability.                                |

Moving between these states is a `git mv` plus an `index.md` link update.
Numbers NEVER change - a plan that started as `004` stays `004` through
every move.

## Pre-plan check: always review `deferred/` before drafting

**Before you write a new plan, read `plans/deferred/README.md` and the
one-liner for every deferred plan.** Ask two questions of each:

1. **Does this deferred plan need to ship BEFORE the one I'm about to
   write?** (It unblocks the new work, or its absence would force the new
   plan to stub / work around the gap.)
2. **Does this deferred plan become an OBVIOUS FOLLOW-ON** if the new plan
   ships? (E.g. new plan produces data a deferred plan consumes, or leaves
   a polish gap a deferred plan closes.)

If either answer is yes, **promote the deferred plan into `suggested/`**
and cross-reference it in the new plan's `README.md` under a new
**"Related plans"** section:

```markdown
## Related plans

- **Suggested predecessor**: [NNN-name](../suggested/NNN-name/) - should
  ship before this plan because <reason>. Unblocks <specific dependency>.
- **Suggested follow-on**: [NNN-name](../suggested/NNN-name/) - recommended
  immediately after this plan because <reason>. Closes the gap introduced
  by <specific phase / decision>.
```

If the answers are both no, leave the deferred plan alone and note the
review (a brief sentence in the new plan's README saying "No deferred
plans flagged as related.") so reviewers see the check was done.

### Promotion workflow

```
git mv plans/deferred/NNN-name plans/suggested/NNN-name
```

Then:

1. Update `plans/deferred/README.md` - remove the row from its table.
2. Update `plans/suggested/README.md` - add a row with the linking plan number + relationship (`predecessor` / `follow-on`).
3. Update `plans/index.md` - change the status of the promoted plan to `🔁 Suggested` and update its link to point to `./suggested/NNN-name/`.
4. Add the **Related plans** section to the new plan's `README.md`.

### When a suggested plan is scheduled to execute

Promote it from `suggested/` back to the top-level `plans/NNN-*/`:

```
git mv plans/suggested/NNN-name plans/NNN-name
```

Update the index status and remove the suggested/README.md row. The
**Related plans** section in the plan that originally flagged it stays
unchanged - the cross-reference remains valid historical record.

### When a suggested plan is deprioritized again

Push it back to `deferred/`:

```
git mv plans/suggested/NNN-name plans/deferred/NNN-name
```

Update both README tables and `index.md`. Leave the cross-reference in
the originating plan alone unless the plan itself changes scope enough
that the relationship no longer holds.

## Phase design pattern

1. **Phase 0 is always "Contracts & Scaffolding."** Lock types, command
   signatures, store boundaries, endpoint shapes, and a directory scaffold before
   any implementation agent runs. Phase 0 is orchestrator-only - never delegated.
2. **Later phases alternate between parallel fan-out and serial spines.**
   - Parallel fan-out: multiple agents touch disjoint file trees; spawn in a
     single message so they run concurrently, then a reviewer agent.
   - Serial spine: each agent depends on the previous; one at a time with a
     reviewer between milestones.

## Orchestration rules (copy these into every plan's README)

1. Phase 0 must merge before any Phase 1+ agent runs. Contract drift is the
   single biggest risk.
2. Never parallelize across a command or mutation spine.
3. Every fan-out phase uses a reviewer agent after sub-agents land. Reviewer
   reads the phase spec + the diff and reports divergence.
4. The orchestrator never delegates understanding. Agents write code; the
   orchestrator keeps the mental model.
5. No agent touches files outside its declared scope. Each agent's prompt must
   include an explicit "do not touch" list.
6. Every agent receives the Phase 0 contracts file verbatim as part of its
   prompt.

## Agent prompt shape (reuse across plans)

```
subagent_type: general-purpose
description: <5-word task summary>
prompt: |
  Read first (authoritative):
  - <absolute paths, including the plan's phase-0 contracts>
  - <any repo-wide AGENTS.md files for directories the agent will touch>

  Build:
  1. <concrete deliverable>
  ...

  Discipline:
  - <emoji-comment convention per root AGENTS.md>
  - Do NOT touch: <explicit list>

  Acceptance:
  - <check-types + lint commands>
  - <observable behavior the orchestrator will verify>
```

Every reviewer prompt names the spec file + contract file, asks for a bounded
word count, and ends with a verdict keyword (BLOCKING / NON-BLOCKING / CLEAN).

## Progress tracking

When a plan is kicked off, add an entry to `plans/index.md` immediately -
before Phase 0 work begins. When a phase finishes, update both `PROGRESS.md`
inside the plan AND the one-liner in `plans/index.md`.

### Update progress in order, before proceeding (REQUIRED)

Phase status updates are **strictly sequential and gating**. You may not start
Phase N+1 work until:

1. Phase N's status in `PROGRESS.md` has been flipped to ✅ Complete (or the
   appropriate terminal state).
2. Phase N's per-phase summary in `PROGRESS.md` has been written with **what
   actually shipped** - not what was planned. Divergences from the phase spec
   are recorded here.
3. The matching one-liner in `plans/index.md` has been updated.

This is non-negotiable. The progress file is the source of truth for "what
state is this plan in" - if it's stale, the next agent (or the user, or
future-you) will plan the next phase against the wrong reality. Skipping
ahead to "I'll batch-update progress at the end" is a bug, not a shortcut.
The same rule applies when an orchestrator implements multiple phases in one
sitting: update `PROGRESS.md` between each phase, not all at once at the
finish line.

### Auto-move on completion (REQUIRED)

When the final phase of a plan ships:

1. Flip the plan's index status to ✅ Complete.
2. Confirm `PROGRESS.md` records the actual scope delivered (which may differ
   from the original ambition) and that every phase row is ✅ Complete.
3. **Move the plan directory into `plans/complete/` immediately** - do
   not leave finished plans at the top level. Use:
   ```
   git mv plans/NNN-name plans/complete/NNN-name
   ```
4. Update the `plans/index.md` link so it points to
   `./complete/NNN-name/`.

This is automatic - completion triggers the move, no further user
confirmation required. Keeping the top-level `plans/` directory lean
(only in-progress plans live there; completed work is archived but still
browsable) is the whole point of the lifecycle directories described above.

## When NOT to make a plan

- One-off bug fixes, small refactors, or single-file changes. Use a task or PR.
- Exploratory prototypes with no commitment to ship. Use a scratch branch.
- Initiatives that haven't been scoped yet. Capture them as a one-liner in a
  backlog document, not a full plan directory.

A plan exists because parallel agents need a shared source of truth. If there
is only one agent and one phase, a GitHub issue or task list is lighter-weight
and fits better.
