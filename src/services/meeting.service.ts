import { AppError } from "../middleware/error.middleware";
import * as meetingRepository from "../repositories/meeting.repository";
import { CreateMeetingInput, ListMeetingsQuery } from "../validators/meeting.validator";

export async function createMeeting(data: CreateMeetingInput, userId: string) {
  return meetingRepository.createMeeting({
    ...data,
    createdById: userId,
  });
}

export async function getMeeting(id: string, userId: string) {
  const meeting = await meetingRepository.findMeetingById(id, userId);

  if (!meeting) {
    throw new AppError("MEETING_NOT_FOUND", "Meeting was not found", 404);
  }

  return meeting;
}

export async function listMeetings(userId: string, query: ListMeetingsQuery) {
  return meetingRepository.listMeetings(userId, query);
}
