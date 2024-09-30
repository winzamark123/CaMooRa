import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

// TODO: Add limit to the amount of characters in the photo album name (Both create and update for backend and frontend)
export const createPhotoAlbum = protectedProcedure
  .input(z.object({ photoAlbumName: z.string() }))
  .mutation(async ({ input, ctx }) => {
    // checking if the photo album exists (if it does, throw an error)
    const existingPhotoAlbum = await prisma.photoAlbum.findUnique({
      where: {
        clerkId_photoAlbumName: {
          clerkId: ctx.user.id,
          photoAlbumName: input.photoAlbumName,
        },
      },
    });

    if (existingPhotoAlbum) {
      throw new Error('PhotoAlbum name already exists');
    }

    // creating the photo album
    try {
      await prisma.photoAlbum.create({
        data: {
          clerkId: ctx.user.id,
          photoAlbumName: input.photoAlbumName,
        },
      });
      console.log('Created Photo Album');
    } catch (err) {
      console.error('ERROR CREATING PHOTO ALBUM' + err);
      throw new Error('ERROR CREATING PHOTO ALBUM');
    }
  });

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

export const deletePhotoAlbum = protectedProcedure
  .input(
    z.object({
      photoAlbumName: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    // checking if the photo album exists (if it doesn't, throw an error)
    const existingPhotoAlbum = await prisma.photoAlbum.findUnique({
      where: {
        clerkId_photoAlbumName: {
          clerkId: ctx.user.id,
          photoAlbumName: input.photoAlbumName,
        },
      },
    });

    if (!existingPhotoAlbum) {
      throw new Error('PhotoAlbum not found');
    }

    // deleting the photo album
    await prisma.photoAlbum.delete({
      where: {
        clerkId_photoAlbumName: {
          clerkId: ctx.user.id,
          photoAlbumName: input.photoAlbumName,
        },
      },
    });
  });
