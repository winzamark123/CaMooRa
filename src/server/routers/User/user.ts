import { router, publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import type { Profile } from '../Profile/profile';
import type { Contact } from '../Contact/contact';

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

  getFavoritePhotographers: protectedProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const favoritePhotographers = await prisma.favoritePhotographers.findMany(
        {
          where: {
            userId: input.clerkId,
          },
          include: {
            photographer: true,
          },
        }
      );
      return favoritePhotographers.map((favorite) => favorite.photographer);
    }),

  saveFavoritePhotographer: protectedProcedure
    .input(z.object({ userId: z.string(), photographerId: z.string() }))
    .mutation(async ({ input }) => {
      // Check if the favorite photographer already exists
      const existingFavorite = await prisma.favoritePhotographers.findUnique({
        where: {
          userId_photographerId: {
            userId: input.userId,
            photographerId: input.photographerId,
          },
        },
      });
      if (existingFavorite) {
        return { message: 'Favorite already exists' };
      }
      await prisma.favoritePhotographers.create({
        data: {
          userId: input.userId,
          photographerId: input.photographerId,
        },
      });
      return { message: 'Favorite saved' };
    }),
});

export type UserRouter = typeof user_router;
