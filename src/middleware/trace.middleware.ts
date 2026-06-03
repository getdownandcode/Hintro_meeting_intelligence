import { NextFunction, Request, Response } from "express";
import { generateTraceId } from "../utils/generateTraceId";

export function traceMiddleware(req: Request, res: Response, next: NextFunction) {
  req.traceId = generateTraceId();
  res.setHeader("X-Trace-Id", req.traceId);
  next();
}
