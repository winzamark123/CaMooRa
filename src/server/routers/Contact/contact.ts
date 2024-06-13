import { router, publicProcedure } from '../../../lib/trpc/trpc';
import { z } from 'zod';
import prisma from '../../../../prisma/prisma';

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
});
