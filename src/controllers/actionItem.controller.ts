import { Request, Response } from "express";
import * as actionItemService from "../services/actionItem.service";
import { sendSuccess } from "../utils/apiResponse";

export async function listActionItems(req: Request, res: Response) {
  const items = await actionItemService.listActionItems(req.query as never);
  return sendSuccess(res, items);
}

export async function updateStatus(req: Request, res: Response) {
  const item = await actionItemService.updateStatus(req.params.id as string, req.body.status);
  return sendSuccess(res, item);
}

export async function getOverdue(req: Request, res: Response) {
  const items = await actionItemService.getOverdueActionItems();
  return sendSuccess(res, items);
}
