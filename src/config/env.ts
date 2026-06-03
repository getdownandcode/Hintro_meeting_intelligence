import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().min(16).default("dev-secret-change-me"),
  GEMINI_API_KEY: z.string().optional(),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  CANDIDATE_NAME: z.string().default("Your Name"),
  CANDIDATE_EMAIL: z.string().email().default("you@example.com"),
  REPOSITORY_URL: z.string().url().default("https://example.com/repository"),
  DEPLOYMENT_URL: z.string().url().default("https://example.com/deployment"),
});

export const env = envSchema.parse(process.env);
