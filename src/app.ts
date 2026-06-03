import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { traceMiddleware } from "./middleware/trace.middleware";
import { actionItemRoutes } from "./routes/actionItem.routes";
import { authRoutes } from "./routes/auth.routes";
import { evaluationRoutes } from "./routes/evaluation.routes";
import { healthRoutes } from "./routes/health.routes";
import { meetingRoutes } from "./routes/meeting.routes";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(traceMiddleware);
app.use(loggerMiddleware);

app.use("/health", healthRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/action-items", actionItemRoutes);
app.use("/api/evaluation", evaluationRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
