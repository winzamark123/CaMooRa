import { router, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const images_router = router({
  getAllImages: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.images.findMany({
        where: {
          clerkId: input.clerkId,
        },
      });
    }),

  //need check if user has permission to upload images
  updateImages: publicProcedure
    .input(z.object({ clerkId: z.string(), image_name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.id !== input.clerkId) {
        throw new Error('You do not have permission to upload images');
      }

      await prisma.images.create({
        data: {
          clerkId: input.clerkId,
          imageName: input.image_name,
        },
      });
    }),
});

export type ImagesRouter = typeof images_router;
