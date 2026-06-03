import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env";
import { PrismaClient } from "../generated/prisma/client";

let prisma: PrismaClient | null = null;

export function getPrisma() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for database operations");
  }

  if (!prisma) {
    const adapter = new PrismaPg({
      connectionString: env.DATABASE_URL,
    });

    prisma = new PrismaClient({ adapter });
  }

  return prisma;
}
