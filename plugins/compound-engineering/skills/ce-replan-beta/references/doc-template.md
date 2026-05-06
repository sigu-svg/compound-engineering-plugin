# Output Plan Doc Template

Loaded by `ce-replan-beta`'s Phase 4. The skill writes a single output doc to `docs/plans/` using the `-beta-plan.md` suffix. Existing plan and PR are preserved by reference; never edit or delete them.

## Filename pattern

```
docs/plans/YYYY-MM-DD-NNN-replan-<topic>-beta-plan.md
```

- `YYYY-MM-DD` — today's date.
- `NNN` — three-digit sequence number for the day, starting at `001`. Check existing files for today's date to determine the next number.
- `<topic>` — kebab-cased short label derived from the original PR title or the new approach (3-5 words).
- `-beta-plan.md` suffix is mandated by the beta-skills framework so output never collides with stable `ce-plan` output. See `docs/solutions/skill-design/beta-skills-framework.md`.

Example: `docs/plans/2026-05-06-001-replan-briefed-saved-view-beta-plan.md`

## Template

```markdown
---
title: "[short replan title]"
type: replan
status: active
date: YYYY-MM-DD
original_pr: <PR number or URL>
original_plan: <repo-relative path or null>
supersedes: <PR number or URL>
---

# [Short Replan Title]

## Summary

[1-3 line forward-looking gloss of the new approach. Names what the replan does, not what the original PR was doing. Required.]

---

## Re-Grounded Problem Frame

[Backward-looking. Re-derived from PR discussion and new learnings, NOT inherited from the original plan's framing. Names the moment of pain, what the user thought before, and what changed in their understanding. Quote or close-paraphrase the user's actual words from the discussion when possible.]

---

## Requirements

[Every original requirement appears here with an explicit annotation. New requirements appear below the carried-forward block. Group under bold inline headers when concerns span multiple areas — see ce-plan's grouping rule.]

**Carried from the original plan**

- R1. **[unchanged]** [Original requirement, restated.]
- R2. **[revise]** [Original]: [original wording]. [Revised]: [new wording]. [Why]: [the specific learning that drove the change.]
- R3. **[discard]** [Original wording.] [Why]: [reason — typically tied to a discarded approach.]

**New in the replan**

- R4. [Net-new requirement, framed concretely.]

**Origin actors:** [carry forward A-IDs from origin if present and still relevant]
**Origin flows:** [carry forward F-IDs from origin if present and still relevant]
**Origin acceptance examples:** [carry forward AE-IDs from origin if present and still relevant]

---

## Discarded Approaches

[2-4 named approaches from the original PR that the replan abandons. Each names the approach, the specific learning that ruled it out, and any code or designs that this approach produced (covered separately in Cherry-Pick Guidance). The discipline: name the dead end so future readers do not reopen the conversation.]

- **[Approach name]**: [What it was, in 1-2 sentences.] **Why discarded**: [The specific learning — review thread, code reading, brainstorm finding — that made this approach wrong.]

---

## Cherry-Pick Guidance

[Concrete list of files, commits, designs, IDs, or migrations from the original PR worth preserving in the new branch. Plan-level, not git-command-level — the user (or ce-work) decides how to extract. Format flexes with what the original PR contains.]

| Item | Type | Source | Why preserve |
|------|------|--------|--------------|
| `path/to/file.tsx` | UI component | PR #X commit `<sha>` | Visual/functional layer is independent of the storage choice. |
| Migration `2026XXXXXXXXXX_create_thing.rb` | Schema | PR #X commit `<sha>` | Already shipped to staging; safe to keep. |
| Issue tracker IDs `CE-1234`, `CE-1235` | Tracking | PR description | Reuse so the replan inherits the existing trail. |

---

## Supersedes

- **Original PR:** #[N] ([title]) — left open and untouched. The user closes or marks superseded after the replan ships.
- **Original plan:** [repo-relative path, or `null` if no plan was found]
- **Diff from original**: [2-3 sentences describing what is changing in approach. Not a summary of the new plan — a contrast with the old.]

---

## New Learnings

[Inventory of what changed in understanding since the original plan was written. Each entry names the source so future readers can verify.]

- **[Learning, in plain language]** — Source: [PR thread URL, or commit SHA, or `docs/brainstorms/...` path, or "current session conversation"].

---

## Scope Boundaries

[Carry forward original scope where still relevant; mark new exclusions with `[new]`. Use the single-list shape unless the origin requirements doc was Deep-product (then preserve the three-way split per ce-plan template).]

- [Excluded item.]
- **[new]** [Newly excluded item — typically tied to a discarded approach.]

### Deferred to Follow-Up Work

- [Plan-local implementation work split into separate PRs/issues.]

---

## Context & Research

### Relevant Code and Patterns

- [Existing files to follow.]

### Institutional Learnings

- [Relevant `docs/solutions/` insight.]

### External References

- [Used only if external research was warranted.]

---

## Key Technical Decisions

- [Decision]: [Rationale]. [Reference the original plan's decision when this overrides it.]

---

## Implementation Units

[Standard ce-plan format. Each unit gets a stable U-ID. When a unit reuses code from the original PR, name it in the unit's `Approach:` field and link the cherry-pick row.]

- U1. **[Name]**

**Goal:** [What this unit accomplishes]

**Requirements:** [R1, R2]

**Dependencies:** [None / U-IDs / external prerequisite]

**Files:**
- Create: `path/to/new_file`
- Modify: `path/to/existing_file`
- Test: `path/to/test_file`

**Approach:**
- [Key decision]
- [Cherry-pick reference: "Reuses `path/...` from original PR commit `<sha>`."]

**Patterns to follow:**
- [Existing file or convention.]

**Test scenarios:**
- [Scenario.]

**Verification:**
- [Outcome that should hold when this unit is complete.]

---

## Suggested Branch Name

`replan/<topic-slug>` — start the new branch from `main`:

```
git checkout main
git pull
git checkout -b replan/<topic-slug>
```

The user runs the above; this skill performs no Git operations.

---

## Sources & References

- **Original PR:** #[N] [title] — [URL]
- **Original plan:** [repo-relative path, or "not found in `docs/plans/`"]
- **Re-grounding context:** [PR threads, brainstorm doc paths, conversation references that drove the replan.]
```

## Discipline checks

Before writing the doc to disk, verify:

- Every original requirement is annotated `[unchanged]` / `[revise]` / `[discard]`. None silently dropped.
- Re-grounded problem frame uses user discussion language, not paraphrase of the original plan.
- Discarded approaches each name a specific learning, not a generic "wasn't quite right".
- Cherry-pick rows specify what to preserve and why — not just "keep the UI work".
- Original PR and original plan are referenced but not edited.
- Suggested branch name does not match the original PR's branch (the replan is a fresh branch).
- All file paths are repo-relative, never absolute.
- Filename uses the `-beta-plan.md` suffix.
