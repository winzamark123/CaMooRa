import { publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import type { Profile } from '../Profile/index';
import type { Contact } from '../Contact/index';

interface User {
  clerkId: string;
  profile?: Profile;
  contact?: Contact;
}
export const getAllPhotographers = publicProcedure.query(async () => {
  return await prisma.user.findMany({
    where: {
      contact: {
        isPhotographer: true,
      },
    },
  });
});
export const getAllUsers = publicProcedure.query(async () => {
  return await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
});

export const getUser = publicProcedure
  .input(z.object({ clerkId: z.string() }))
  .query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: input.clerkId,
      },
    });
    return user as User;
  });
