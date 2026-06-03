import { getPrisma } from "../src/config/prisma";
import { sendOverdueReminders } from "../src/services/reminder.service";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function run() {
  console.log("Locally triggering database update to make task overdue...");
  try {
    // Find Alice's task in the database
    const task = await getPrisma().actionItem.findFirst({
      where: { assignee: "Alice", task: "Prepare release notes." }
    });

    if (!task) {
      console.error("Could not find Alice's task in the database. Please make sure you ran the analyze endpoint first!");
      return;
    }

    // Set due date to 1 day ago (overdue) and status to PENDING
    await getPrisma().actionItem.update({
      where: { id: task.id },
      data: {
        dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        status: "PENDING"
      }
    });

    // Delete any existing reminder history for this action item to bypass the 60-minute cooldown
    await getPrisma().reminderHistory.deleteMany({
      where: { actionItemId: task.id }
    });
    console.log("Successfully updated task ID:", task.id, "to be overdue (due yesterday) and cleared reminder history.");

    console.log("Triggering sendOverdueReminders() service...");
    const result = await sendOverdueReminders();
    console.log("Reminder job execution result:", result);
  } catch (error) {
    console.error("Failed to run reminder trigger:", error);
  }
}

run();
