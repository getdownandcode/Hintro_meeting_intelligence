# AI Approach

## Prompt Design

The prompt includes the full transcript in a timestamped format:

```txt
[00:10] John: We should launch Friday.
```

It gives Gemini strict rules:

- only use transcript content
- never invent information
- every item must include citations
- return valid JSON only

The requested output schema includes summary, action items, decisions, and follow-ups.

## Grounding Strategy

Every generated item must include citations with transcript timestamps. The service checks each citation against the original transcript before accepting the AI response.

This prevents a response from saving claims that cannot be traced back to a real transcript line.

## Hallucination Prevention

The system uses three safeguards:

1. Prompt rules forbid invented facts.
2. Zod validates the response shape.
3. Citation validation rejects timestamps that do not exist in the transcript.

If any safeguard fails, the API returns an error instead of saving action items.

## JSON Validation

Gemini is asked for JSON using `responseMimeType: "application/json"`. The raw text is still parsed defensively because AI output should never be trusted blindly.

The parser rejects:

- malformed JSON
- missing required fields
- empty citation arrays
- invalid timestamp formats

## Citation Validation

The citation validator builds a set of transcript timestamps and checks every summary item, decision, follow-up, and action item.

Invalid citations produce `UNGROUNDED_AI_OUTPUT`.

## Known Limitations

- The service validates citation existence, not semantic perfectness.
- Due dates are accepted only when Gemini returns a valid date.
- Transcript search is not optimized because transcript lines are stored as JSON.
- Reminder delivery depends on Telegram API availability and configured bot credentials.
