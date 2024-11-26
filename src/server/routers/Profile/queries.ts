import { publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { z } from 'zod';

export const getMyProfile = protectedProcedure.query(async ({ ctx }) => {
  return await prisma.profile.findUnique({
    where: {
      userId: ctx.user.id,
    },
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      profilePic: true,
      additionalName: true,
      equipment: true,
      bio: true,
      isContactPublic: true,
      isPhotographer: true,
    },
  });
});

export const getPublicProfile = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    return await prisma.profile.findUnique({
      where: {
        userId: input.userId,
      },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        profilePic: true,
        additionalName: true,
        equipment: true,
        bio: true,
        isContactPublic: true,
        isPhotographer: true,
      },
    });
  });
