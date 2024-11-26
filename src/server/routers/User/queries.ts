import { protectedProcedure, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import type { User } from '@prisma/client';

export const getAllPhotographers = publicProcedure.query(async () => {
  return await prisma.user.findMany({
    where: {
      contact: {
        isPhotographer: true,
      },
    },
  });
});
export const getAllUsers = publicProcedure.query(async () => {
  return await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
});

export const getUser = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: input.userId,
      },
    });
    return user as User;
  });

export const getCurrentUser = protectedProcedure.query(async ({ ctx }) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: ctx.user.clerk.id,
    },
  });
  return user;
});

export const getIsNewUser = protectedProcedure.query(async ({ ctx }) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: ctx.user.clerk.id,
    },
    select: {
      isNewUser: true,
    },
  });
  return user;
});
