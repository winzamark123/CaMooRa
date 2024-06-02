import { router, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const UserRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  }),

  addUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.user.create({
        data: {
          email: input.email,
        },
      });
    }),
});

export type UserRouter = typeof UserRouter;
