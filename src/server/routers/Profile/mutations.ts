import { protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { profileEditSchema } from '@/server/routers/Schemas/schema';

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
        profilePicId: input.profilePicId,
        additionalName: input.additionalName,
        equipment: input.equipment,
        bio: input.bio,
      },
    });
  });
