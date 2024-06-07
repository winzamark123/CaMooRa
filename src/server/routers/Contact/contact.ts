import { router, publicProcedure } from '../../../lib/trpc/trpc';
import { z } from 'zod';
import prisma from '../../../../prisma/prisma';
import { Contact } from '../../../types/types';

export const contactRouter = router({
    getContact: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            const contact = await prisma.contact.findUnique({
                where: {
                    userId: input.userId
                }
            })
            return contact as Contact;
        }),
});