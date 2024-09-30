import { z } from 'zod';
import { protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';

export const updatePhotoAlbumName = protectedProcedure
  .input(
    z.object({
      newPhotoAlbumName: z.string(),
      oldPhotoAlbumName: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    // checking if the photo album exists (if it doesn't, throw an error)
    const existingPhotoAlbum = await prisma.photoAlbum.findUnique({
      where: {
        clerkId_photoAlbumName: {
          clerkId: ctx.user.id,
          photoAlbumName: input.oldPhotoAlbumName,
        },
      },
    });

    if (!existingPhotoAlbum) {
      throw new Error('PhotoAlbum not found');
    }

    // updating the photo album name
    await prisma.photoAlbum.update({
      where: {
        clerkId_photoAlbumName: {
          clerkId: ctx.user.id,
          photoAlbumName: input.oldPhotoAlbumName,
        },
      },
      data: { photoAlbumName: input.newPhotoAlbumName },
    });
  });
