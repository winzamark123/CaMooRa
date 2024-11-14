import { publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const getAllImages = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const images = await prisma.images.findMany({
      where: {
        userId: input.userId,
        // not associated with a profile (hence not a profile pic)
        Profile: {
          none: {},
        },
      },
    });

    const imageDetails = images.map((image) => ({
      url: image.url,
      id: image.id,
    }));
    return imageDetails;
  });

export const getImagesByAlbumId = publicProcedure
  .input(z.object({ userId: z.string(), photoAlbumId: z.string() }))
  .query(async ({ input }) => {
    const images = await prisma.images.findMany({
      where: {
        PhotoAlbumId: input.photoAlbumId,
        userId: input.userId,
      },
    });

    const imageDetails = images.map((image) => ({
      url: image.url,
      id: image.id,
    }));
    return imageDetails;
  });
