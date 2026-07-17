import { readFileSync } from "fs"
import path from "path"
import { expect, test } from "bun:test"

const PHASE_ZERO_SCOPE_CONTRACT =
  "Run Phase 0 only when `technology` is requested or when the invocation has no `Scope:` prefix."

test("repo research runs Phase 0 only when in scope", () => {
  for (const skill of ["ce-plan", "ce-optimize"]) {
    const prompt = readFileSync(
      path.join(
        process.cwd(),
        "skills",
        skill,
        "references/agents/repo-research-analyst.md",
      ),
      "utf8",
    )
    expect(prompt).toContain(PHASE_ZERO_SCOPE_CONTRACT)
  }
})
