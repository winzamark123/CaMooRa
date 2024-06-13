import { router, publicProcedure } from '../../../lib/trpc/trpc';
import { z } from 'zod';
import prisma from '../../../../prisma/prisma';
import { Contact } from '@/types/types';

const contact_object = z.object({
  userId: z.string(),
  email: z.string().optional(),
  discord: z.string().optional(),
  instagram: z.string().optional(),
  phone: z.string().optional(),
  whatsApp: z.string().optional(),
  isContactPublic: z.boolean().optional(),
  isPhotographer: z.boolean().optional(),
});

export const contactRouter = router({
  getContact: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.contact.findUnique({
        where: {
          userId: input.userId,
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
    .mutation(async ({ input }) => {
      const contact = await prisma.contact.update({
        where: {
          userId: input.userId,
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
      return contact as Contact;
    }),
});
