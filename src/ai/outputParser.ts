import { AppError } from "../middleware/error.middleware";
import { aiAnalysisSchema } from "../validators/ai.validator";

function stripJsonFence(raw: string) {
  return raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
}

export function parseAiAnalysis(raw: string) {
  try {
    const parsed = JSON.parse(stripJsonFence(raw));
    return aiAnalysisSchema.parse(parsed);
  } catch {
    throw new AppError("INVALID_AI_OUTPUT", "AI response was not valid grounded JSON", 422);
  }
}
