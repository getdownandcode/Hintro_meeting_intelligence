import { AppError } from "../middleware/error.middleware";
import { AiAnalysisOutput } from "../validators/ai.validator";
import { TranscriptEntry } from "../validators/meeting.validator";

type CitedItem = {
  citations: Array<{ timestamp: string }>;
};

function assertValidCitations(items: CitedItem[], validTimestamps: Set<string>) {
  for (const item of items) {
    if (item.citations.length === 0) {
      throw new AppError("UNGROUNDED_AI_OUTPUT", "AI output contains an item without citations", 422);
    }

    const hasInvalidCitation = item.citations.some(
      (citation) => !validTimestamps.has(citation.timestamp),
    );

    if (hasInvalidCitation) {
      throw new AppError("UNGROUNDED_AI_OUTPUT", "AI output contains citations not found in transcript", 422);
    }
  }
}

export function validateAiCitations(output: AiAnalysisOutput, transcript: TranscriptEntry[]) {
  const validTimestamps = new Set(transcript.map((entry) => entry.timestamp));

  assertValidCitations(output.summary, validTimestamps);
  assertValidCitations(output.actionItems, validTimestamps);
  assertValidCitations(output.decisions, validTimestamps);
  assertValidCitations(output.followUps, validTimestamps);
}
