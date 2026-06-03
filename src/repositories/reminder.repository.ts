import { getPrisma } from "../config/prisma";

export async function createReminderHistory(actionItemId: string) {
  return getPrisma().reminderHistory.create({
    data: { actionItemId },
  });
}
