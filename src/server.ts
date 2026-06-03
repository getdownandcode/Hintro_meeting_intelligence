import { app } from "./app";
import { env } from "./config/env";
import { startOverdueReminderJob } from "./jobs/overdueReminder.job";
import { logger } from "./utils/logger";

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, "Hintro Meeting Intelligence API is running");
});

startOverdueReminderJob();

function shutdown(signal: string) {
  logger.info({ signal }, "Shutting down API server");
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
