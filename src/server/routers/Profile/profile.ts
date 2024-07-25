import { router, publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '../../../../prisma/prisma';
import { z } from 'zod';

export interface Profile {
  clerkId: string;
  firstName: string;
  lastName: string;
  profilePicURL?: string;
}

const updateProfileObject = z.object({
  clerkId: z.string(),
  firstName: z
    .string()
    .min(1, { message: 'First Name must be 1 character or longer' })
    .refine((value) => /^([^0-9]*)$/.test(value), {
      message: 'First Name should not contain numbers',
    })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name must be 1 character or longer' })
    .refine((value) => /^([^0-9]*)$/.test(value), {
      message: 'Last Name should not contain numbers',
    })
    .optional(),
  additionalName: z
    .string()
    .max(10, { message: 'Additional Name must be 10 characters or less' })
    .optional(),
  profilePicId: z.string().optional(),
  equipment: z
    .string()
    .max(60, { message: 'Equipment must be 60 characters or less' })
    .optional(),
  bio: z
    .string()
    .max(150, { message: 'Bio must be 150 characters or less' })
    .optional(),
});

export const profileRouter = router({
  getProfile: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.profile.findUnique({
        where: {
          clerkId: input.clerkId,
        },
        select: {
          firstName: true,
          lastName: true,
          profilePic: true,
          additionalName: true,
          equipment: true,
          bio: true,
        },
      });
    }),

  updateProfile: protectedProcedure
    .input(updateProfileObject)
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
    }),
});
