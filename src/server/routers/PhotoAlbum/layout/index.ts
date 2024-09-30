import { router, protectedProcedure, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import prisma from '@prisma/prisma';

export const getLayout = protectedProcedure
  .input(z.object({ photoAlbumId: z.string() }))
  .query(async ({ input }) => {
    const layout = await prisma.photoAlbum.findUnique({
      where: { clerk },
    });
  });

// getAllPhotoAlbums: publicProcedure
// .input(z.object({ clerkId: z.string() }))
// .query(async ({ input }) => {
//   const photoAlbums = await prisma.photoAlbum.findMany({
//     where: { clerkId: input.clerkId },
//     select: {
//       id: true,
//       photoAlbumName: true,
//       Images: {
//         select: { id: true, url: true },
//       },
//     },
//   });

//   return photoAlbums;
// }),
//   createPhotoAlbum: protectedProcedure
//     .input(z.object({ photoAlbumName: z.string() }))
//     .mutation(async ({ input, ctx }) => {
//       // checking if the photo album exists (if it does, throw an error)
//       const existingPhotoAlbum = await prisma.photoAlbum.findUnique({
//         where: {
//           clerkId_photoAlbumName: {
//             clerkId: ctx.user.id,
//             photoAlbumName: input.photoAlbumName,
//           },
//         },
//       });

//       if (existingPhotoAlbum) {
//         throw new Error('PhotoAlbum name already exists');
//       }

//       // creating the photo album
//       await createPhotoAlbum({
//         clerkId: ctx.user.id,
//         photoAlbumName: input.photoAlbumName,
//       });
//     }),
