import { publicProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { z } from 'zod';

export const getProfile = publicProcedure
  .input(z.object({ clerkId: z.string() }))
  .query(async ({ input }) => {
    return await prisma.profile.findUnique({
      where: {
        clerkId: input.clerkId,
      },
      select: {
        clerkId: true,
        firstName: true,
        lastName: true,
        profilePic: true,
        additionalName: true,
        equipment: true,
        bio: true,
      },
    });
  });
