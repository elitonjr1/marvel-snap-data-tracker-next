import { prismaClient } from "../../src/prismaClient";
import type { User, Prisma } from "@prisma/client";
import { createUserSchema } from "./schemas/createUserSchema";

export type { User } from "@prisma/client";

export function findById(
  id: number,
  args: Omit<Prisma.UserFindFirstArgs, "where"> = {}
) {
  return prismaClient.user.findFirst({
    ...args,
    where: {
      id,
    },
  });
}

export function findByEmail(
  email: string,
  args: Omit<Prisma.UserFindUniqueArgs, "where"> = {}
) {
  return prismaClient.user.findUnique({
    ...args,
    where: {
      email,
    },
  });
}

export async function create(
  user: User,
  args: Omit<Prisma.UserCreateArgs, "data"> = {}
) {
  const userValidation = await createUserSchema.safeParseAsync(user);
  if (userValidation.success === true) {
    const user = await prismaClient.user.create({
      ...args,
      data: userValidation.data,
    });

    return { user };
  } else {
    return {
      erros: userValidation.error.errors,
    };
  }
}
