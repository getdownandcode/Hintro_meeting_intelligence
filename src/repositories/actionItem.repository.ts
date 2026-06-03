import { getPrisma } from "../config/prisma";
import { ActionItemStatus } from "../generated/prisma/enums";
import { ListActionItemsQuery } from "../validators/actionItem.validator";

export async function createActionItems(
  items: Array<{
    task: string;
    assignee: string;
    dueDate?: Date;
    citations: Array<{ timestamp: string }>;
    meetingId: string;
  }>,
) {
  if (items.length === 0) {
    return [];
  }

  await getPrisma().actionItem.createMany({
    data: items.map((item) => ({
      task: item.task,
      assignee: item.assignee,
      dueDate: item.dueDate,
      citations: item.citations,
      meetingId: item.meetingId,
    })),
  });

  return getPrisma().actionItem.findMany({
    where: { meetingId: items[0].meetingId },
    orderBy: { createdAt: "desc" },
  });
}

export async function listActionItems(query: ListActionItemsQuery) {
  return getPrisma().actionItem.findMany({
    where: {
      ...(query.status ? { status: query.status as ActionItemStatus } : {}),
      ...(query.assignee ? { assignee: { equals: query.assignee, mode: "insensitive" } } : {}),
      ...(query.meetingId ? { meetingId: query.meetingId } : {}),
    },
    include: { meeting: { select: { id: true, title: true, meetingDate: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateActionItemStatus(id: string, status: ActionItemStatus) {
  return getPrisma().actionItem.update({
    where: { id },
    data: { status },
  });
}

export async function findOverdueActionItems(now = new Date()) {
  return getPrisma().actionItem.findMany({
    where: {
      status: { not: "COMPLETED" },
      dueDate: { lt: now },
    },
    include: {
      meeting: { select: { id: true, title: true } },
      reminders: { orderBy: { sentAt: "desc" }, take: 1 },
    },
    orderBy: { dueDate: "asc" },
  });
}
