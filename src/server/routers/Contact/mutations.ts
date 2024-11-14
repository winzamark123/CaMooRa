import { protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { contactSchema } from '@/server/routers/Schemas/schema';

export const updateContact = protectedProcedure
  .input(contactSchema)
  .mutation(async ({ input, ctx }) => {
    if (ctx.user.id !== input.userId) {
      throw new Error('You do not have permission to update this contact');
    }
    await prisma.contact.update({
      where: {
        userId: ctx.user.id,
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
