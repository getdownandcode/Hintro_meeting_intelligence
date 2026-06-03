import { logger } from "../utils/logger";
import { minutesAgo } from "../utils/date";
import * as actionItemRepository from "../repositories/actionItem.repository";
import * as reminderRepository from "../repositories/reminder.repository";
import { sendOverdueActionItemReminder } from "./telegram.service";

const REMINDER_COOLDOWN_MINUTES = 60;

export async function sendOverdueReminders() {
  const overdueItems = await actionItemRepository.findOverdueActionItems();
  let sent = 0;

  for (const item of overdueItems) {
    const lastReminder = item.reminders[0];

    if (lastReminder && !minutesAgo(lastReminder.sentAt, REMINDER_COOLDOWN_MINUTES)) {
      continue;
    }

    try {
      await sendOverdueActionItemReminder({
        task: item.task,
        assignee: item.assignee,
        dueDate: item.dueDate,
        meetingTitle: item.meeting.title,
      });

      await reminderRepository.createReminderHistory(item.id);
      sent += 1;
    } catch (error) {
      logger.error({ actionItemId: item.id, error }, "Failed to send overdue reminder");
    }
  }

  return { checked: overdueItems.length, sent };
}
