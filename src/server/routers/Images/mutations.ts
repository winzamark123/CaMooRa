import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { getPresignedURL } from './s3-post';
import { deletePhotoCommand } from './s3-delete';

export const updateProfilePic = protectedProcedure
  .input(
    z.object({
      file_type: z.string(),
      size: z.number(),
      checksum: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { success, error } = await getPresignedURL({
      file_type: input.file_type,
      size: input.size,
      checksum: input.checksum,
      clerkId: ctx.user.id,
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
  });

export const uploadImage = protectedProcedure
  .input(
    z.object({
      file_type: z.string(),
      size: z.number(),
      checksum: z.string(),
      photoAlbumId: z.string(),
      width: z.number(),
      height: z.number(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { success, error } = await getPresignedURL({
      file_type: input.file_type,
      size: input.size,
      checksum: input.checksum,
      clerkId: ctx.user.id,
      photoAlbumId: input.photoAlbumId,
      width: input.width,
      height: input.height,
    });

    if (error) {
      throw new Error(error);
    }

    return { success, error };
  });

export const deleteImage = protectedProcedure
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
  });
