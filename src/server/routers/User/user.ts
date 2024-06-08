import { router, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { User } from '@/types/types';

export const user_router = router({
  // createUser: publicProcedure
  //   .input(
  //     z.object({
  //       clerkId: z.string().nullable(),
  //       userFirstName: z.string().nullable(),
  //       userLastName: z.string().nullable(),
  //       userEmail: z.string().nullable(),
  //     })
  //   )
  //   .mutation(async ({ input }) => {
  //     const { clerkId, userFirstName, userLastName, userEmail } = input;

  //     // Throw error if any input is null
  //     if (!clerkId || !userFirstName || !userLastName || !userEmail) {
  //       throw new Error('Invalid input values');
  //     }

  //     await createUser({
  //       clerkId,
  //       userFirstName,
  //       userLastName,
  //       userEmail,
  //     });
  //   }),

  getAllUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  }),

  getUser: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: {
          clerkId: input.clerkId,
        },
      });
      return user as User;
    }),
});

export type UserRouter = typeof user_router;
