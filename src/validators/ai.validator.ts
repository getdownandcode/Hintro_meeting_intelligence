import { z } from "zod";

export const citationSchema = z.object({
  timestamp: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
});

const groundedTextSchema = z.object({
  text: z.string().min(1),
  citations: z.array(citationSchema).min(1),
});

export const aiActionItemSchema = z.object({
  task: z.string().min(1),
  assignee: z.string().min(1),
  dueDate: z.coerce.date().optional(),
  citations: z.array(citationSchema).min(1),
});

export const aiAnalysisSchema = z.object({
  summary: z.array(groundedTextSchema).default([]),
  actionItems: z.array(aiActionItemSchema).default([]),
  decisions: z.array(groundedTextSchema).default([]),
  followUps: z.array(groundedTextSchema).default([]),
});

export type AiAnalysisOutput = z.infer<typeof aiAnalysisSchema>;
