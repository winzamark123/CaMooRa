import { router, publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { getPresignedURL } from './s3-post';

export const images_router = router({
  getAllImages: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const images = await prisma.images.findMany({
        where: {
          clerkId: input.clerkId,
        },
      });

      const urls = images.map((image) => image.url);
      return urls;
    }),

  uploadImage: protectedProcedure
    .input(
      z.object({
        file_type: z.string(),
        size: z.number(),
        checksum: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { success, error } = await getPresignedURL({
        file_type: input.file_type,
        size: input.size,
        checksum: input.checksum,
        clerkId: ctx.user.id,
      });

      if (error) {
        throw new Error(error);
      }

      return { success, error };
    }),
});

export type ImageRouter = typeof images_router;
