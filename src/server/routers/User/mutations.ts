import { protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { TRPCError } from '@trpc/server';
import { clerkClient } from '@clerk/nextjs/server';
import { deletePhotoCommand } from '../Images/s3-delete';

export const deleteUser = protectedProcedure.mutation(async ({ ctx }) => {
  try {
    // First get all images associated with the user
    const userImages = await prisma.images.findMany({
      where: { userId: ctx.user.id },
      select: { key: true },
    });

    // Delete from Clerk first
    await clerkClient.users.deleteUser(ctx.user.clerk.id);

    // Delete all images from S3
    await Promise.all(
      userImages.map((image) => deletePhotoCommand({ key: image.key }))
    );

    // Then delete from your database
    await prisma.user.delete({
      where: { clerkId: ctx.user.clerk.id },
    });
  } catch (error) {
    // Log the error for debugging (you might want to use your logging solution)
    console.error('Error deleting user:', error);

    // Throw a formatted error for the client
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to delete user account. Please try again later.',
    });
  }
});

export const updateUser = protectedProcedure.mutation(async ({ ctx }) => {
  const updatedUser = await prisma.user.update({
    where: { clerkId: ctx.user.clerk.id },
    data: { isNewUser: false },
    select: { isNewUser: true },
  });
  return updatedUser;
});
