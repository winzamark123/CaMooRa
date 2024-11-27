import { z } from 'zod';
import { publicProcedure } from '@/lib/trpc/trpc';
import prisma from '@prisma/prisma';

export const getContact = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    return await prisma.contact.findUnique({
      where: {
        userId: input.userId,
      },
      select: {
        email: true,
        discord: true,
        instagramTitle: true,
        instagramLink: true,
        phone: true,
        whatsApp: true,
        portfolioTitle: true,
        portfolioLink: true,
      },
    });
  });
