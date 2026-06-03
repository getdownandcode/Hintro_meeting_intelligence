import { TranscriptEntry } from "../validators/meeting.validator";

export function buildMeetingAnalysisPrompt(transcript: TranscriptEntry[]) {
  const transcriptText = transcript
    .map((entry) => `[${entry.timestamp}] ${entry.speaker}: ${entry.text}`)
    .join("\n");

  return `
You are analyzing a meeting transcript for a backend service.

Rules:
- ONLY use transcript content.
- NEVER invent attendees, tasks, decisions, dates, or facts.
- EVERY summary item, decision, follow-up, and action item needs citations.
- Citations MUST use timestamps that appear in the transcript.
- Return VALID JSON ONLY. No markdown, no prose, no code fences.

Output schema:
{
  "summary": [{ "text": "string", "citations": [{ "timestamp": "00:10" }] }],
  "actionItems": [{ "task": "string", "assignee": "string", "dueDate": "YYYY-MM-DD optional", "citations": [{ "timestamp": "00:10" }] }],
  "decisions": [{ "text": "string", "citations": [{ "timestamp": "00:10" }] }],
  "followUps": [{ "text": "string", "citations": [{ "timestamp": "00:10" }] }]
}

Transcript:
${transcriptText}
`.trim();
}
