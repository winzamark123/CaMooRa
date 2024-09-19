import { router, publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { getPresignedURL } from './s3-post';
import { deletePhotoCommand } from './s3-delete';

export const images_router = router({
  getAllImages: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const images = await prisma.images.findMany({
        where: {
          clerkId: input.clerkId,
          // not associated with a profile (hence not a profile pic)
          Profile: {
            none: {},
          },
        },
      });

      const imageDetails = images.map((image) => ({
        url: image.url,
        id: image.id,
        imageWidth: image.imgWidth,
        imageHeight: image.imgHeight,
      }));
      return imageDetails;
    }),

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

  updateProfilePic: protectedProcedure
    .input(
      z.object({
        file_type: z.string(),
        size: z.number(),
        checksum: z.string(),
        imgWidth: z.number().optional(),
        imgHeight: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { success, error } = await getPresignedURL({
        file_type: input.file_type,
        size: input.size,
        checksum: input.checksum,
        clerkId: ctx.user.id,
        imgHeight: input.imgHeight,
        imgWidth: input.imgWidth,
      });

      if (error) {
        throw new Error(error);
      }

      // Update the profile to remove the reference to the previous profile picture
      await prisma.profile.update({
        where: { clerkId: ctx.user.id },
        data: { profilePicId: success?.image_id },
      });

      return { success, error };
    }),

  uploadImage: protectedProcedure
    .input(
      z.object({
        file_type: z.string(),
        size: z.number(),
        checksum: z.string(),
        imgWidth: z.number(),
        imgHeight: z.number(),
        photoAlbumId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { success, error } = await getPresignedURL({
        file_type: input.file_type,
        size: input.size,
        checksum: input.checksum,
        clerkId: ctx.user.id,
        imgHeight: input.imgHeight,
        imgWidth: input.imgWidth,
        photoAlbumId: input.photoAlbumId,
      });

      if (error) {
        throw new Error(error);
      }

      return { success, error };
    }),

  deleteImage: protectedProcedure
    .input(z.object({ imageId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const image = await prisma.images.findUnique({
        where: { id: input.imageId },
      });

      if (image?.clerkId !== ctx.user.id) {
        throw new Error('Unauthorized');
      }

      const { success, error } = await deletePhotoCommand({
        key: image?.key as string,
      });
      if (error) {
        throw new Error(error);
      }
      return { success, error };
    }),
});

export type ImageRouter = typeof images_router;
