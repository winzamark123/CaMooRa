import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const getFavorite = protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const favoritePhotographers = await prisma.favorites.findMany({
      where: {
        userId: input.userId,
      },
      include: {
        photographer: true,
      },
    });
    return favoritePhotographers.map((favorite) => favorite.photographer);
  });

export const isFavorite = protectedProcedure
  .input(z.object({ userId: z.string(), favoriteUserId: z.string() }))
  .query(async ({ input }) => {
    const existingFavorite = await prisma.favorites.findUnique({
      where: {
        userId_photographerId: {
          userId: input.userId,
          photographerId: input.favoriteUserId,
        },
      },
    });

    return existingFavorite !== null;
  });
