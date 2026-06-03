import { Router } from "express";
import * as meetingController from "../controllers/meeting.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createMeetingSchema,
  idParamsSchema,
  listMeetingsQuerySchema,
} from "../validators/meeting.validator";

export const meetingRoutes = Router();

meetingRoutes.use(requireAuth);

meetingRoutes.post("/", validate({ body: createMeetingSchema }), meetingController.createMeeting);
meetingRoutes.get("/", validate({ query: listMeetingsQuerySchema }), meetingController.listMeetings);
meetingRoutes.get("/:id", validate({ params: idParamsSchema }), meetingController.getMeeting);
meetingRoutes.post(
  "/:id/analyze",
  validate({ params: idParamsSchema }),
  meetingController.analyzeMeeting,
);
