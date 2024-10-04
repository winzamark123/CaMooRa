import { publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const getPhotoAlbumLayout = publicProcedure
  .input(z.object({ clerkId: z.string(), photoAlbumId: z.string() }))
  .query(async ({ input }) => {
    const layout = await prisma.photoAlbum.findUnique({
      where: {
        clerkId: input.clerkId,
        id: input.photoAlbumId,
      },
      select: {
        layout: true,
      },
    });

    if (!layout) {
      return null;
    }

    return layout;
  });
