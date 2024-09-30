import { publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const getAllPhotoAlbums = publicProcedure
  .input(z.object({ clerkId: z.string() }))
  .query(async ({ input }) => {
    const photoAlbums = await prisma.photoAlbum.findMany({
      where: { clerkId: input.clerkId },
      select: {
        id: true,
        photoAlbumName: true,
        Images: {
          select: { id: true, url: true, imgWidth: true, imgHeight: true },
        },
      },
    });

    return photoAlbums;
  });
