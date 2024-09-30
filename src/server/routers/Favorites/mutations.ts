import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const saveFavorite = protectedProcedure
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
  });

export const removeFavorite = protectedProcedure
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
  });
