import { Request, Response } from "express";
import * as aiAnalysisService from "../services/aiAnalysis.service";
import * as meetingService from "../services/meeting.service";
import { sendSuccess } from "../utils/apiResponse";

function requireUserId(req: Request) {
  return req.user!.id;
}

function requireParamId(req: Request) {
  return req.params.id as string;
}

export async function createMeeting(req: Request, res: Response) {
  const meeting = await meetingService.createMeeting(req.body, requireUserId(req));
  return sendSuccess(res, meeting, 201);
}

export async function getMeeting(req: Request, res: Response) {
  const meeting = await meetingService.getMeeting(requireParamId(req), requireUserId(req));
  return sendSuccess(res, meeting);
}

export async function listMeetings(req: Request, res: Response) {
  const meetings = await meetingService.listMeetings(requireUserId(req), req.query as never);
  return sendSuccess(res, meetings);
}

export async function analyzeMeeting(req: Request, res: Response) {
  const result = await aiAnalysisService.analyzeMeeting(requireParamId(req), requireUserId(req));
  return sendSuccess(res, result);
}
