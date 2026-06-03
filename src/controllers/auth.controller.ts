import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { sendSuccess } from "../utils/apiResponse";

export async function register(req: Request, res: Response) {
  const result = await authService.register(req.body);
  return sendSuccess(res, result, 201);
}

export async function login(req: Request, res: Response) {
  const result = await authService.login(req.body);
  return sendSuccess(res, result);
}
