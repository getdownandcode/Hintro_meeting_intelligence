import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info({
      traceId: req.traceId,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      responseTimeMs: Date.now() - startedAt,
    });
  });

  next();
}
