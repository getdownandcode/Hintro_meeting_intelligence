# Testing Documentation

This document summarizes the testing strategy, scenarios executed, edge cases considered, and discovered limitations.

---

## 🧪 Test Scenarios Executed

### 1. Automated Unit Tests
We use Node.js's native test runner (`node --test`) to run isolated unit tests for the core AI components located in `tests/ai.test.ts`:
* **AI JSON Parsing**: Validates that raw JSON strings returned by the Gemini API are successfully parsed and transformed into our validated TypeScript types.
* **Valid Citations**: Ensures that if citations are present in the AI output and correspond to actual timestamps in the meeting transcript, the citation validator accepts them.
* **Invalid Citations**: Verifies that if the AI attempts to reference a non-existent timestamp (e.g. `09:99` or a hallucinated speaker/time), the citation validator catches this and throws an error to reject saving the action item.

### 2. Manual Integration Tests
* **Authentication**: Tested registration and login endpoints, confirming correct generation and validation of JWT tokens.
* **Meeting Creation & Listing**: Tested the Express router and pagination query parameters for meetings.
* **AI Analysis Endpoint**: Verified prompt construction, Gemini 2.5 Flash schema mapping, validation against the Zod schema, and saving action items.
* **Telegram Overdue Reminders**: Used the local test harness `scratch/trigger-reminders.ts` to trigger a reminder on an action item with yesterday's due date, confirming end-to-end webhook delivery.

---

## 🛡️ Edge Cases Handled

1. **Express v5 Query Parameter Getter Restriction**: Express v5 defines `req.query` as read-only. Standard validation middleware mutations throw TypeErrors. Handled by redefining the property with `Object.defineProperty` to allow clean query updates.
2. **Supabase IPv6 Connection Failures**: Direct connections to Supabase PostgreSQL database strings fail in IPv4-only environments (like local systems or standard Render builders). Handled by utilizing the IPv4 pooler connection string.
3. **Double Reminder Prevention**: Implemented a `ReminderHistory` tracking model and a 60-minute cooldown window to avoid sending multiple Telegram notifications for the same overdue task in short succession.
4. **Invalid AI Citations**: Handled AI hallucinations by cross-checking all citation timestamps against the list of valid transcript timestamps before any database transaction.

---

## ⚠️ Limitations Discovered

* **One-Way Notification Bot**: The Telegram bot integration is purely one-way. It notifies the user about overdue tasks but does not process incoming messages or commands (e.g., replying `/complete` to mark a task done).
* **In-Memory Job Scheduler**: `node-cron` runs within the Express server process. If the server is restarted or goes to sleep (common on Render free tier), the cron job pauses and restarts state on boot.
* **Cron Cooldown Testing Constraint**: Under standard settings, developers must wait 60 minutes between tests to verify subsequent reminder notifications, which was resolved for testing using a custom history-clearing script.
