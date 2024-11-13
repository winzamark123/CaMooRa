import { protectedOwnerProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { profileSchema } from '@/server/routers/Schemas/schema';

export const updateProfile = protectedOwnerProcedure
  .input(profileSchema)
  .mutation(async ({ input }) => {
    await prisma.profile.update({
      where: {
        userId: input.userId,
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
