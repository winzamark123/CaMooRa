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
    .min(2, { message: 'First Name must be 2 characters or longer' })
    .refine((value) => /^([^0-9]*)$/.test(value), {
      message: 'First Name should not contain numbers',
    })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: 'Last Name must be 2 characters or longer' })
    .refine((value) => /^([^0-9]*)$/.test(value), {
      message: 'Last Name should not contain numbers',
    })
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
          profilePicURL: true,
        },
      });
    }),

  updateProfile: protectedProcedure
    .input(updateProfileObject)
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.id !== input.clerkId) {
        throw new Error('You do not have permission to update this profile');
      }

      const updateData: Record<string, any> = {};

      if (input.firstName) {
        console.log(input.firstName);
        updateData.firstName = input.firstName;
      }
      if (input.lastName) {
        updateData.lastName = input.lastName;
      }

      await prisma.profile.update({
        where: {
          clerkId: input.clerkId,
        },
        data: updateData,
      });
    }),
  // updateFirstName: protectedProcedure
  //   .input(
  //     z.object({
  //       clerkId: z.string(),
  //       firstName: z
  //         .string()
  //         .min(2, { message: 'First Name must be 2 characters or longer' })
  //         .refine((value) => !/^([^0-9]*)$/.test(value), {
  //           message: 'First Name should not contain numbers',
  //         }),
  //     })
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     if (ctx.user?.id !== input.clerkId) {
  //       throw new Error('You do not have permission to update this profile');
  //     }
  //     await prisma.profile.update({
  //       where: {
  //         clerkId: input.clerkId,
  //       },
  //       data: {
  //         firstName: input.firstName,
  //       },
  //     });
  //   }),

  // updateLastName: protectedProcedure
  //   .input(
  //     z.object({
  //       clerkId: z.string(),
  //       lastName: z
  //         .string()
  //         .min(2, { message: 'Last Name must be 2 characters or longer' })
  //         .refine((value) => !/^([^0-9]*)$/.test(value), {
  //           message: 'Last Name should not contain numbers',
  //         }),
  //     })
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     if (ctx.user?.id !== input.clerkId) {
  //       throw new Error('You do not have permission to update this profile');
  //     }
  //     await prisma.profile.update({
  //       where: {
  //         clerkId: input.clerkId,
  //       },
  //       data: {
  //         lastName: input.lastName,
  //       },
  //     });
  //   }),
  // TODO: Finish rest of Profile routes
});
