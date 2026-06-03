import { z } from "zod";

export const transcriptEntrySchema = z.object({
  timestamp: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Timestamp must look like 00:10"),
  speaker: z.string().min(1),
  text: z.string().min(1),
});

export const createMeetingSchema = z.object({
  title: z.string().min(1, "Meeting title is required"),
  meetingDate: z.coerce.date(),
  participants: z.array(z.string().min(1)).min(1),
  transcript: z.array(transcriptEntrySchema).min(1),
});

export const listMeetingsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
});

export const idParamsSchema = z.object({
  id: z.string().uuid(),
});

export type CreateMeetingInput = z.infer<typeof createMeetingSchema>;
export type TranscriptEntry = z.infer<typeof transcriptEntrySchema>;
export type ListMeetingsQuery = z.infer<typeof listMeetingsQuerySchema>;
