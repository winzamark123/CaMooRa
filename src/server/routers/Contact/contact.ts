import { router, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '../../../../prisma/prisma';
export interface Contact {
  email?: string;
  discord?: string;
  instagram?: string;
  phone?: string;
  whatsApp?: string;
  isContactPublic: boolean;
  isPhotographer: boolean;
}

const contact_object = z.object({
  clerkId: z.string(),
  email: z.string().optional(),
  discord: z.string().optional(),
  instagram: z.string().optional(),
  phone: z.string().optional(),
  whatsApp: z.string().optional(),
  isContactPublic: z
    .boolean({ invalid_type_error: 'isContactPublic must be a boolean' })
    .optional(),
  isPhotographer: z
    .boolean({ invalid_type_error: 'isPhotographer must be a boolean' })
    .optional(),
});

export const contactRouter = router({
  getContact: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input, ctx }) => {
      console.log(ctx.user?.id);
      return await prisma.contact.findUnique({
        where: {
          clerkId: input.clerkId,
        },
        select: {
          email: true,
          discord: true,
          instagram: true,
          phone: true,
          whatsApp: true,
          isContactPublic: true,
          isPhotographer: true,
        },
      });
    }),

  updateContact: publicProcedure
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
          instagram: input.instagram,
          phone: input.phone,
          whatsApp: input.whatsApp,
          isContactPublic: input.isContactPublic,
          isPhotographer: input.isPhotographer,
        },
      });
    }),
});
