import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { Prisma } from '@prisma/client';
import { MosaicNode } from 'react-mosaic-component';

export const MosaicNodeSchema: z.ZodSchema<MosaicNode<number>> = z.lazy(() =>
  z.union([
    z.number(),
    z.object({
      direction: z.enum(['row', 'column']),
      first: MosaicNodeSchema,
      second: MosaicNodeSchema,
      splitPercentage: z.number().optional(),
    }),
  ])
);

// Define the schema for the node
export const NodeSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.number(),
    z.object({
      direction: z.enum(['row', 'column']),
      first: NodeSchema,
      second: NodeSchema,
      splitPercentage: z.number().optional(),
    }),
  ])
);

// NOTE* Photo album has to be created beforehand to edit existing layout
export const editPhotoAlbumLayout = protectedProcedure
  .input(
    z.object({
      clerkId: z.string(),
      photoAlbumId: z.string(),
      layout: MosaicNodeSchema,
    })
  )
  .mutation(async ({ input }) => {
    const existingLayout = await prisma.photoAlbum.findUnique({
      where: {
        clerkId: input.clerkId,
        id: input.photoAlbumId,
      },
      select: {
        layout: true,
      },
    });

    if (existingLayout) {
      await prisma.photoAlbum.update({
        where: {
          clerkId: input.clerkId,
          id: input.photoAlbumId,
        },
        data: {
          layout: input.layout as Prisma.InputJsonValue,
        },
      });
    } else {
      return { status: 404, message: 'No existing album' };
    }

    return { status: 200, message: 'Layout saved successfully' };
  });
