import { router, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const user_router = router({
  getAllUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  }),

  //create user
  createUser: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      //check if user exists in db
      const user = await prisma.user.findUnique({
        where: {
          clerkId: input.clerkId,
        },
      });

      // if not create user in db
      if (!user) {
        await prisma.user.create({
          data: {
            clerkId: input.clerkId,
          },
        });
      }
    }),
});

export type UserRouter = typeof user_router;
