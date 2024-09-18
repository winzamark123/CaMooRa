import { router, protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const favorite_router = router({
  getFavorite: protectedProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const favoritePhotographers = await prisma.favorites.findMany({
        where: {
          userId: input.clerkId,
        },
        include: {
          photographer: true,
        },
      });
      return favoritePhotographers.map((favorite) => favorite.photographer);
    }),

  isFavorite: protectedProcedure
    .input(z.object({ clerkId: z.string(), favoriteClerkId: z.string() }))
    .query(async ({ input }) => {
      const existingFavorite = await prisma.favorites.findUnique({
        where: {
          userId_photographerId: {
            userId: input.clerkId,
            photographerId: input.favoriteClerkId,
          },
        },
      });

      return existingFavorite !== null;
    }),

  saveFavorite: protectedProcedure
    .input(z.object({ userId: z.string(), photographerId: z.string() }))
    .mutation(async ({ input }) => {
      // Check if the favorite photographer already exists
      const existingFavorite = await prisma.favorites.findUnique({
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
      await prisma.favorites.create({
        data: {
          userId: input.userId,
          photographerId: input.photographerId,
        },
      });
      return { message: 'Favorite saved' };
    }),
  removeFavorite: protectedProcedure
    .input(z.object({ userId: z.string(), photographerId: z.string() }))
    .mutation(async ({ input }) => {
      // Check if the favorite photographer already exists
      const existingFavorite = await prisma.favorites.findUnique({
        where: {
          userId_photographerId: {
            userId: input.userId,
            photographerId: input.photographerId,
          },
        },
      });
      if (existingFavorite) {
        // Delete the favorite if it exists
        await prisma.favorites.delete({
          where: {
            userId_photographerId: {
              userId: input.userId,
              photographerId: input.photographerId,
            },
          },
        });
        return { message: 'Favorite removed' };
      }
      return { message: 'Favorite does not exist' };
    }),
});

export type FavoriteRouter = typeof favorite_router;
