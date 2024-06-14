import { router, publicProcedure } from '../../../lib/trpc/trpc';
import prisma from '../../../../prisma/prisma';
import { z } from 'zod';

export interface Profile {
  clerkId: string;
  firstName: string;
  lastName: string;
  profilePicURL?: string;
}

export const profileRouter = router({
  getProfile: publicProcedure
    // switched to UserId - because can't search profile with clerkId
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.profile.findUnique({
        where: {
          clerkId: input.clerkId,
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
        clerkId: z.string(),
        firstName: z
          .string()
          .min(2, { message: 'First Name must be 2 characters or longer' }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log('ctx.user?.id', ctx.user?.id);
      console.log('input.userId', input.clerkId);
      if (ctx.user?.id !== input.clerkId) {
        throw new Error('You do not have permission to update this profile');
      }
      await prisma.profile.update({
        where: {
          clerkId: input.clerkId,
        },
        data: {
          firstName: input.firstName,
        },
      });
    }),
  // TODO: Finish rest of Profile routes
});
