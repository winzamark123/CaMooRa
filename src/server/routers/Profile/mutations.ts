import { protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { profileSchema } from '@/server/routers/Schemas/schema';

export const updateProfile = protectedProcedure
  .input(profileSchema)
  .mutation(async ({ input, ctx }) => {
    if (ctx.user?.id !== input.clerkId) {
      throw new Error('You do not have permission to update this profile');
    }

    await prisma.profile.update({
      where: {
        clerkId: input.clerkId,
      },
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        profilePicId: input.profilePicId,
        additionalName: input.additionalName,
        equipment: input.equipment,
        bio: input.bio,
      },
    });
  });
