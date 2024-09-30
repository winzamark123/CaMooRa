import { z } from 'zod';
import { publicProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';

const contact_object = z.object({
  clerkId: z.string(),
  email: z.string().optional(),
  discord: z.string().optional(),
  instagramTitle: z
    .string()
    .max(15, 'Instagram Title must be 15 characters or less')
    .optional(),
  instagramLink: z.string().optional(),
  phone: z.string().optional(),
  whatsApp: z.string().optional(),
  portfolioTitle: z
    .string()
    .max(15, 'Portfolio Title must be 15 characters or less')
    .optional(),
  portfolioLink: z.string().optional(),
  isContactPublic: z
    .boolean({ invalid_type_error: 'isContactPublic must be a boolean' })
    .optional(),
  isPhotographer: z
    .boolean({ invalid_type_error: 'isPhotographer must be a boolean' })
    .optional(),
});
export const updateContact = publicProcedure
  .input(contact_object)
  .mutation(async ({ input, ctx }) => {
    if (ctx.user?.id !== input.clerkId) {
      throw new Error('You do not have permission to update this contact');
    }
    console.log(input);
    await prisma.contact.update({
      where: {
        clerkId: input.clerkId,
      },
      data: {
        email: input.email,
        discord: input.discord,
        instagramTitle: input.instagramTitle,
        instagramLink: input.instagramLink,
        phone: input.phone,
        whatsApp: input.whatsApp,
        portfolioTitle: input.portfolioTitle,
        portfolioLink: input.portfolioLink,
        isContactPublic: input.isContactPublic,
        isPhotographer: input.isPhotographer,
      },
    });
  });
