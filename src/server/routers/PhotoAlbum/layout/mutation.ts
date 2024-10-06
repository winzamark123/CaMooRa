import { protectedProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';
import { Prisma } from '@prisma/client';

// Define the schema for the node
const NodeSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.object({
    direction: z.enum(['row', 'column']),
    first: z.union([z.number(), NodeSchema]),
    second: z.union([z.number(), NodeSchema]),
    splitPercentage: z.number().optional(),
  })
);

// Define the schema for the entire layout
export const LayoutSchema: z.ZodType<Prisma.InputJsonValue> = z.object({
  currentNode: NodeSchema,
  currentTheme: z.string(),
});

// NOTE* Photo album has to be created beforehand to edit existing layout
export const editPhotoAlbumLayout = protectedProcedure
  .input(
    z.object({
      clerkId: z.string(),
      photoAlbumId: z.string(),
      layout: LayoutSchema,
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
          layout: input.layout,
        },
      });
    } else {
      return { status: 404, message: 'No existing album' };
    }

    return { status: 200, message: 'Layout saved successfully' };
  });
