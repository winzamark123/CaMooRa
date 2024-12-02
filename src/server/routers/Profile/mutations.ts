import { protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { profileEditSchema } from '@/server/routers/Schemas/schema';
import { z } from 'zod';

export const updateProfile = protectedProcedure
  .input(profileEditSchema)
  .mutation(async ({ input, ctx }) => {
    await prisma.profile.update({
      where: {
        userId: ctx.user.id,
      },
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        additionalName: input.additionalName,
        equipment: input.equipment,
        bio: input.bio,
        isContactPublic: input.isContactPublic,
        isPhotographer: input.isPhotographer,
      },
    });
  });

export const updateProfileCoverImage = protectedProcedure
  .input(z.object({ imageId: z.string() }))
  .mutation(async ({ input, ctx }) => {
    await prisma.profile.update({
      where: { userId: ctx.user.id },
      data: { coverImageId: input.imageId },
    });
  });
