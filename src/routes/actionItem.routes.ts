import { Router } from "express";
import * as actionItemController from "../controllers/actionItem.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  actionItemIdParamsSchema,
  listActionItemsQuerySchema,
  updateActionItemStatusSchema,
} from "../validators/actionItem.validator";

export const actionItemRoutes = Router();

actionItemRoutes.use(requireAuth);

actionItemRoutes.get("/", validate({ query: listActionItemsQuerySchema }), actionItemController.listActionItems);
actionItemRoutes.get("/overdue", actionItemController.getOverdue);
actionItemRoutes.patch(
  "/:id/status",
  validate({ params: actionItemIdParamsSchema, body: updateActionItemStatusSchema }),
  actionItemController.updateStatus,
);
