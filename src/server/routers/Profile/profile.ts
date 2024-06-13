import { router, publicProcedure } from '../../../lib/trpc/trpc';
import prisma from '../../../../prisma/prisma';
import { z } from 'zod';

export const profileRouter = router({
  getProfile: publicProcedure
    // switched to UserId - because can't search profile with clerkId
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.profile.findUnique({
        where: {
          userId: input.userId,
        },
        select: {
          firstName: true,
          lastName: true,
          profilePicURL: true,
        },
      });
    }),

  updateFirstName: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        firstName: z
          .string()
          .min(2, { message: 'First Name must be 2 characters or longer' }),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.profile.update({
        where: {
          userId: input.userId,
        },
        data: {
          firstName: input.firstName,
        },
      });
    }),
  // TODO: Finish rest of Profile routes
});
