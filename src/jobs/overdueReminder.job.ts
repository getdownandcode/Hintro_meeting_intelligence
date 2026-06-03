import cron from "node-cron";
import { logger } from "../utils/logger";
import { sendOverdueReminders } from "../services/reminder.service";

export function startOverdueReminderJob() {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const result = await sendOverdueReminders();
      logger.info(result, "Overdue reminder job completed");
    } catch (error) {
      logger.error({ error }, "Overdue reminder job failed");
    }
  });
}
