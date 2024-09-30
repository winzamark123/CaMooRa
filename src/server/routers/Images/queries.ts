import { publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const getAllImages = publicProcedure
  .input(z.object({ clerkId: z.string() }))
  .query(async ({ input }) => {
    const images = await prisma.images.findMany({
      where: {
        clerkId: input.clerkId,
        // not associated with a profile (hence not a profile pic)
        Profile: {
          none: {},
        },
      },
    });

    const imageDetails = images.map((image) => ({
      url: image.url,
      id: image.id,
      imageWidth: image.imgWidth,
      imageHeight: image.imgHeight,
    }));
    return imageDetails;
  });
