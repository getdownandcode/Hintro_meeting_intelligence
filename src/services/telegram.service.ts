import { sendTelegramMessage } from "../integrations/telegram.integration";

type ReminderMessageInput = {
  task: string;
  assignee: string;
  dueDate: Date | null;
  meetingTitle: string;
};

export async function sendOverdueActionItemReminder(item: ReminderMessageInput) {
  const dueDate = item.dueDate ? item.dueDate.toISOString().slice(0, 10) : "No due date";

  await sendTelegramMessage(
    [
      "Overdue Action Item",
      "",
      `Task: ${item.task}`,
      `Assignee: ${item.assignee}`,
      `Due Date: ${dueDate}`,
      `Meeting: ${item.meetingTitle}`,
    ].join("\n"),
  );
}
