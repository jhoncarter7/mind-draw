import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

// const globalForPrisma = global as unknown as {
//   prismaClient: typeof prismaClient;
// };

// if (process.env.NODE_ENV !== "production")
//   globalForPrisma.prismaClient = prismaClient;
