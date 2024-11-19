import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { createPhotoAlbum as create } from './utils';
import { deletePhotoCommand } from '../Images/s3-delete';

// TODO: Add limit to the amount of characters in the photo album name (Both create and update for backend and frontend)
export const createPhotoAlbum = protectedProcedure
  .input(
    z.object({
      photoAlbumName: z
        .string()
        .min(1, { message: 'Album Name required' })
        .max(25, { message: 'Album Name must be less than 25 characters' }),
    })
  )
  .mutation(async ({ input, ctx }) => {
    // checking if the photo album exists (if it does, throw an error)
    const existingPhotoAlbum = await prisma.photoAlbum.findUnique({
      where: {
        userId_photoAlbumName: {
          userId: ctx.user.id,
          photoAlbumName: input.photoAlbumName,
        },
      },
    });

    if (existingPhotoAlbum) {
      throw new Error('PhotoAlbum name already exists');
    }

    // creating the photo album
    await create({
      userId: ctx.user.id,
      photoAlbumName: input.photoAlbumName,
    });
  });

export const updatePhotoAlbumName = protectedProcedure
  .input(
    z.object({
      newPhotoAlbumName: z
        .string()
        .min(1, { message: 'Album Name required' })
        .max(25, { message: 'Album Name must be less than 25 characters' }),
      oldPhotoAlbumName: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    // checking if the photo album exists (if it doesn't, throw an error)
    const existingPhotoAlbum = await prisma.photoAlbum.findUnique({
      where: {
        userId_photoAlbumName: {
          userId: ctx.user.id,
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
        userId_photoAlbumName: {
          userId: ctx.user.id,
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
    try {
      // First get all images associated with the album
      const albumImages = await prisma.images.findMany({
        where: {
          userId: ctx.user.id,
          PhotoAlbum: {
            photoAlbumName: input.photoAlbumName,
          },
        },
        select: { key: true },
      });

      // Delete all images from S3
      await Promise.all(
        albumImages.map((image) => deletePhotoCommand({ key: image.key }))
      );

      // Delete the photo album (this will cascade delete the images from the database)
      await prisma.photoAlbum.delete({
        where: {
          userId_photoAlbumName: {
            userId: ctx.user.id,
            photoAlbumName: input.photoAlbumName,
          },
        },
      });
    } catch (error) {
      console.error('Error deleting photo album:', error);
      throw new Error('Failed to delete photo album. Please try again later.');
    }
  });
