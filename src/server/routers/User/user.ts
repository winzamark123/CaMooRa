import { router, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { findOrCreateUser } from '@/utils/userUtils'
import { User } from '@/types/types';
import { currentUser } from '@clerk/nextjs/server';

export const user_router = router({
  getAllUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  }),

  getUser: publicProcedure
    .input(z.object({ clerkId: z.string(), firstName: z.string(), lastName: z.string() }))
    .query( async ({input}) => {
      // finds or creates (User and Profile)
      const user = await findOrCreateUser(input.clerkId, input.firstName, input.lastName);
      return user as User;
    })
  
})

export type UserRouter = typeof user_router;
