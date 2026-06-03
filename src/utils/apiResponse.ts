import { Response } from "express";

type ErrorPayload = {
  code: string;
  message: string;
};

export function sendSuccess<T>(res: Response, data: T, statusCode = 200) {
  const traceId = (res.req as typeof res.req & { traceId?: string }).traceId;

  return res.status(statusCode).json({
    traceId,
    success: true,
    data,
  });
}

export function sendError(res: Response, error: ErrorPayload, statusCode = 500) {
  const traceId = (res.req as typeof res.req & { traceId?: string }).traceId;

  return res.status(statusCode).json({
    traceId,
    success: false,
    error,
  });
}
