import { env } from "../config/env";
import { AppError } from "../middleware/error.middleware";

export async function sendTelegramMessage(text: string) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    throw new AppError("TELEGRAM_NOT_CONFIGURED", "Telegram bot token and chat ID are required", 503);
  }

  const response = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
      }),
    },
  );

  if (!response.ok) {
    throw new AppError("TELEGRAM_SEND_FAILED", "Failed to send Telegram message", 502);
  }
}
