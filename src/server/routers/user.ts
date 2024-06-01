import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import prisma from '@/lib/prisma';

export const UserRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany();
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
