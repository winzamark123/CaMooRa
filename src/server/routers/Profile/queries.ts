import { publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { z } from 'zod';

export const getMyProfile = protectedProcedure
  .input(z.object({ clerkId: z.string() }))
  .query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: input.clerkId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return await prisma.profile.findUnique({
      where: {
        userId: user.id,
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
