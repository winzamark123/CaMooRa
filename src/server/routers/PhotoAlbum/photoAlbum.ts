import { router, protectedProcedure, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { createPhotoAlbum } from './photoAlbumUtils';

export const photoAlbum_router = router({
  getAllPhotoAlbums: publicProcedure
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
    }),

  // TODO: Add limit to the amount of characters in the photo album name (Both create and update for backend and frontend)
  createPhotoAlbum: protectedProcedure
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
      await createPhotoAlbum({
        clerkId: ctx.user.id,
        photoAlbumName: input.photoAlbumName,
      });
    }),

  updatePhotoAlbumName: protectedProcedure
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
    }),

  deletePhotoAlbum: protectedProcedure
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
    }),
});

export type PhotoAlbumRouter = typeof photoAlbum_router;
