# Changelog

All notable changes and milestones for the Hintro Meeting Intelligence project are documented here.

---

## 🚀 Milestones

### [1.0.0] - 2026-06-03

#### Added
* **Project Structure**: Established modular Express/TypeScript architecture (routes, controllers, services, repositories, middleware, integrations, validators).
* **Database & ORM**: Synced Prisma schema with Supabase. Created database models for `User`, `Meeting`, `ActionItem`, and `ReminderHistory`.
* **Authentication**: Implemented register/login endpoints utilizing JWT.
* **AI Analysis**: Integrated Gemini 2.5 Flash API with strict prompt templates to summarize transcripts, extract decisions, identify follow-ups, and parse structured action items.
* **Citation Validation**: Added a validator to ensure all AI-extracted insights reference real transcript timestamps, rejecting ungrounded data.
* **Overdue Reminder System**: Set up a background `node-cron` job checking every 15 minutes for pending overdue tasks.
* **Telegram Integration**: Connected the Telegram Bot API to send overdue action item notifications.
* **Docker**: Configured multi-stage Docker build matching Node 22.
* **Swagger/OpenAPI**: Added Swagger UI at `/api/docs` with structured examples.
* **Test Suite**: Wrote unit tests for AI parsers and citation validators.
* **Local Test Harness**: Created `scratch/trigger-reminders.ts` to easily trigger and verify Telegram alerts on demand.

#### Fixed
* **Express v5 Query Handling**: Fixed `TypeError: Cannot set property query` under Express v5 by utilizing `Object.defineProperty` on the request object.
* **Swagger Relative Host**: Changed Swagger server hosts to relative URLs to ensure testing works out-of-the-box locally and on Render.
* **Supabase IPv6 Connection Pooler**: Solved direct connection failures on port 5432 by routing database queries through the IPv4 session pooler.
* **Prisma Build Generation**: Added `prisma generate` to the `build` script in `package.json` to prevent typescript compilation errors in clean build environments.
