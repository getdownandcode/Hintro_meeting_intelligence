import { getPrisma } from "../config/prisma";

export async function findUserByEmail(email: string) {
  return getPrisma().user.findUnique({ where: { email } });
}

export async function findUserById(id: string) {
  return getPrisma().user.findUnique({ where: { id } });
}

export async function createUser(data: { email: string; password: string }) {
  return getPrisma().user.create({ data });
}
