import { getPrisma } from "../config/prisma";
import { CreateMeetingInput, ListMeetingsQuery } from "../validators/meeting.validator";

export async function createMeeting(data: CreateMeetingInput & { createdById: string }) {
  return getPrisma().meeting.create({
    data: {
      title: data.title,
      meetingDate: data.meetingDate,
      participants: data.participants,
      transcript: data.transcript,
      createdById: data.createdById,
    },
  });
}

export async function findMeetingById(id: string, createdById: string) {
  return getPrisma().meeting.findFirst({
    where: { id, createdById },
    include: { actionItems: true },
  });
}

export async function listMeetings(createdById: string, query: ListMeetingsQuery) {
  const where = {
    createdById,
    ...(query.search
      ? {
          title: {
            contains: query.search,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  const [items, total] = await getPrisma().$transaction([
    getPrisma().meeting.findMany({
      where,
      orderBy: { meetingDate: "desc" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    getPrisma().meeting.count({ where }),
  ]);

  return {
    items,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
    },
  };
}
