# Review followup (LFG step 3–4)

`ce-code-review` is review-only. LFG applies eligible fixes itself, then commits.

## Step 3 — invoke review

```
ce-code-review mode:agent plan:<plan-path-from-step-1>
```

Read the **Actionable Findings** summary and artifact path. Do not pass `mode:autofix`.

## Step 4 — apply and persist review fixes

Apply findings using the same mechanical bar as `ce-work` `references/review-findings-followup.md` (in the compound-engineering plugin): `suggested_fix` present, confidence 100 or corroborated 75, evidence still matches, no contract/security/permission change.

1. Apply eligible fixes in the working tree.
2. Run targeted tests when `requires_verification: true`.
3. If `git status --short` shows changes, stage only review-driven files, commit `fix(review): apply review findings`, and push before step 5. If no eligible fixes were applied, note explicitly and skip commit.

## Step 5 — residual handoff

Residuals are actionable findings **not** applied in step 4 — not leftovers from in-skill autofix. Use the Actionable Findings summary / artifact from step 3.
