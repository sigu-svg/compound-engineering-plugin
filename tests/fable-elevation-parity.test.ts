import { readFile, access } from "fs/promises"
import path from "path"
import { describe, expect, test } from "bun:test"

const PLUGIN_ROOT = path.join(process.cwd(), "skills")

// The Fable elevation engine is byte-duplicated into every consuming skill (the
// plugin has no cross-skill import mechanism — see AGENTS.md "File References in
// Skills"). All copies must stay identical; editing one without the other fails
// this test. Add a skill to CONSUMER_SKILLS when it gains an elevation copy.
const ELEVATION_ASSET = "references/fable-elevation.md"

const CONSUMER_SKILLS = ["ce-plan", "ce-brainstorm"]

describe("fable-elevation engine parity", () => {
  test(`${ELEVATION_ASSET} exists in every consumer and is byte-identical`, async () => {
    const contents = await Promise.all(
      CONSUMER_SKILLS.map(async (skill) => {
        const p = path.join(PLUGIN_ROOT, skill, ELEVATION_ASSET)
        await access(p) // fails the test if a consumer is missing the copy
        return readFile(p, "utf8")
      }),
    )
    for (let i = 1; i < contents.length; i++) {
      expect(contents[i]).toBe(contents[0])
    }
  })

  // The elevation prose must never ship in an always-loaded SKILL.md: the silent
  // no-op on non-Claude harnesses depends on the model-name-bearing engine living
  // only in the gated reference. The SKILL.md stub names no model.
  test("no consumer SKILL.md contains the model name outside the gated reference", async () => {
    for (const skill of CONSUMER_SKILLS) {
      const skillMd = await readFile(path.join(PLUGIN_ROOT, skill, "SKILL.md"), "utf8")
      expect(skillMd.toLowerCase()).not.toContain("model: \"fable\"")
      expect(skillMd.toLowerCase()).not.toContain("use fable")
    }
  })
})
