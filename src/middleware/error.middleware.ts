import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { sendError } from "../utils/apiResponse";
import { logger } from "../utils/logger";

type RequestWithTrace = Request & { traceId?: string };

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode = 500,
  ) {
    super(message);
  }
}

export function notFoundMiddleware(req: Request, res: Response) {
  return sendError(
    res,
    {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.originalUrl} was not found`,
    },
    404,
  );
}

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const traceId = (req as RequestWithTrace).traceId;

  if (error instanceof ZodError) {
    return sendError(
      res,
      {
        code: "VALIDATION_ERROR",
        message: error.issues[0]?.message ?? "Invalid request",
      },
      400,
    );
  }

  if (error instanceof AppError) {
    logger.warn({ traceId, error }, error.message);
    return sendError(res, { code: error.code, message: error.message }, error.statusCode);
  }

  logger.error({ traceId, err: error }, "Unhandled request error");

  return sendError(
    res,
    {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
    500,
  );
}
