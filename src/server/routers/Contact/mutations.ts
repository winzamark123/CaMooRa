import { protectedProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';
import { contactEditSchema } from '@/server/routers/Schemas/schema';

export const updateContact = protectedProcedure
  .input(contactEditSchema)
  .mutation(async ({ input, ctx }) => {
    await prisma.contact.update({
      where: {
        userId: ctx.user.id,
      },
      data: {
        discord: input.discord,
        instagramTitle: input.instagramTitle,
        instagramLink: input.instagramLink,
        phone: input.phone,
        whatsApp: input.whatsApp,
        portfolioTitle: input.portfolioTitle,
        portfolioLink: input.portfolioLink,
      },
    });
  });
