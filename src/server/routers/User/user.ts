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

  addUser: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.user.create({
        data: {
          clerkId: input.clerkId,
        },
      });
    }),

  //this might be redundant since we will be doing 2 request with check and get
  checkUser: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: {
          clerkId: input.clerkId,
        },
      });

      if (!user) {
        return false;
      }

      return true;
    }),

  getUserProfile: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: {
          clerkId: input.clerkId,
        },
        include: {
          profile: true,
        },
      });

      if (!user) {
        throw new Error(`User with clerkId ${input.clerkId} not found`);
      }

      return user;
    }),
});

export type UserRouter = typeof user_router;
