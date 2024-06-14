import { router, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const images_router = router({
  getAllImages: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.images.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),

  //need check if user has permission to upload images
  updateImages: publicProcedure
    .input(z.object({ userId: z.string(), image_name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.id !== input.userId) {
        throw new Error('You do not have permission to upload images');
      }

      await prisma.images.create({
        data: {
          userId: input.userId,
        },
      });
    }),
});

export type ImagesRouter = typeof images_router;
