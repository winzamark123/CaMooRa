import { router, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import type { Profile } from '../Profile/profile';
import type { Contact } from '../Contact';

interface User {
  clerkId: string;
  profile?: Profile;
  contact?: Contact;
}

export const user_router = router({
  getAllPhotographers: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      where: {
        contact: {
          isPhotographer: false, // switch to true when you make your profile a photographer to see it for now
        },
      },
    });
  }),
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
