import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { AppError } from "../middleware/error.middleware";

export async function generateMeetingAnalysis(prompt: string) {
  if (!env.GEMINI_API_KEY) {
    throw new AppError("GEMINI_NOT_CONFIGURED", "GEMINI_API_KEY is required for AI analysis", 503);
  }

  const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}
