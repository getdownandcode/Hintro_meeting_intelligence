import { z } from "zod";

export const actionItemStatusSchema = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);

export const listActionItemsQuerySchema = z.object({
  status: actionItemStatusSchema.optional(),
  assignee: z.string().optional(),
  meetingId: z.string().uuid().optional(),
});

export const updateActionItemStatusSchema = z.object({
  status: actionItemStatusSchema,
});

export const actionItemIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export type ActionItemStatusInput = z.infer<typeof actionItemStatusSchema>;
export type ListActionItemsQuery = z.infer<typeof listActionItemsQuerySchema>;
