import assert from "node:assert/strict";
import test from "node:test";
import { validateAiCitations } from "../src/ai/citationValidator";
import { parseAiAnalysis } from "../src/ai/outputParser";

const transcript = [
  { timestamp: "00:10", speaker: "John", text: "We should launch Friday." },
  { timestamp: "00:20", speaker: "Alice", text: "I will prepare release notes." },
];

test("parses valid AI JSON", () => {
  const output = parseAiAnalysis(
    JSON.stringify({
      summary: [{ text: "Team plans to launch Friday.", citations: [{ timestamp: "00:10" }] }],
      actionItems: [
        { task: "Prepare release notes", assignee: "Alice", citations: [{ timestamp: "00:20" }] },
      ],
      decisions: [],
      followUps: [],
    }),
  );

  assert.equal(output.actionItems[0].assignee, "Alice");
});

test("accepts citations that exist in transcript", () => {
  const output = parseAiAnalysis(
    JSON.stringify({
      summary: [{ text: "Team plans to launch Friday.", citations: [{ timestamp: "00:10" }] }],
      actionItems: [],
      decisions: [],
      followUps: [],
    }),
  );

  assert.doesNotThrow(() => validateAiCitations(output, transcript));
});

test("rejects citations that do not exist in transcript", () => {
  const output = parseAiAnalysis(
    JSON.stringify({
      summary: [{ text: "Invented claim.", citations: [{ timestamp: "09:99" }] }],
      actionItems: [],
      decisions: [],
      followUps: [],
    }),
  );

  assert.throws(() => validateAiCitations(output, transcript));
});
