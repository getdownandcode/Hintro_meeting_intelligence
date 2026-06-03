import { Request, Response } from "express";
import { env } from "../config/env";
import { sendSuccess } from "../utils/apiResponse";

export function getEvaluation(_req: Request, res: Response) {
  return sendSuccess(res, {
    candidateName: env.CANDIDATE_NAME,
    email: env.CANDIDATE_EMAIL,
    repositoryUrl: env.REPOSITORY_URL,
    deploymentUrl: env.DEPLOYMENT_URL,
    externalIntegration: "Telegram Bot API",
    features: [
      "JWT authentication",
      "Meeting transcript storage",
      "Gemini-powered meeting analysis",
      "Grounded citation validation",
      "Action item tracking",
      "Overdue Telegram reminders",
    ],
  });
}
