import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "./error.middleware";

type JwtPayload = {
  sub: string;
  email: string;
};

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.header("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : undefined;

  if (!token) {
    throw new AppError("UNAUTHORIZED", "Authentication token is required", 401);
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = {
      id: payload.sub,
      email: payload.email,
    };
    next();
  } catch {
    throw new AppError("UNAUTHORIZED", "Invalid or expired authentication token", 401);
  }
}
