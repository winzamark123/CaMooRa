import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const getFavorite = protectedProcedure
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
  });

export const isFavorite = protectedProcedure
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
  });
