import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const getFavorite = protectedProcedure.query(async ({ ctx }) => {
  const favoritePhotographers = await prisma.favorites.findMany({
    where: {
      userId: ctx.user.id,
    },
    include: {
      photographer: true,
    },
  });
  return favoritePhotographers.map((favorite) => favorite.photographer);
});

export const isFavorite = protectedProcedure
  .input(z.object({ favoriteUserId: z.string() }))
  .query(async ({ ctx, input }) => {
    const existingFavorite = await prisma.favorites.findUnique({
      where: {
        userId_photographerId: {
          userId: ctx.user.id,
          photographerId: input.favoriteUserId,
        },
      },
    });

    return existingFavorite !== null;
  });
