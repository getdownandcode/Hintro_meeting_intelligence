import { validateAiCitations } from "../ai/citationValidator";
import { generateMeetingAnalysis } from "../ai/gemini.client";
import { parseAiAnalysis } from "../ai/outputParser";
import { buildMeetingAnalysisPrompt } from "../ai/promptBuilder";
import * as actionItemRepository from "../repositories/actionItem.repository";
import { getMeeting } from "./meeting.service";
import { transcriptEntrySchema } from "../validators/meeting.validator";

export async function analyzeMeeting(meetingId: string, userId: string) {
  const meeting = await getMeeting(meetingId, userId);
  const transcript = transcriptEntrySchema.array().parse(meeting.transcript);
  const prompt = buildMeetingAnalysisPrompt(transcript);
  const rawOutput = await generateMeetingAnalysis(prompt);
  const analysis = parseAiAnalysis(rawOutput);

  validateAiCitations(analysis, transcript);

  const actionItems = await actionItemRepository.createActionItems(
    analysis.actionItems.map((item) => ({
      task: item.task,
      assignee: item.assignee,
      dueDate: item.dueDate,
      citations: item.citations,
      meetingId,
    })),
  );

  return {
    analysis,
    savedActionItems: actionItems,
  };
}
