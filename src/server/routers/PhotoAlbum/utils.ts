import prisma from '@prisma/prisma';

interface createPhotoAlbumProp {
  clerkId: string;
  photoAlbumName: string;
}

export async function createPhotoAlbum({
  clerkId,
  photoAlbumName,
}: createPhotoAlbumProp) {
  try {
    await prisma.photoAlbum.create({
      data: {
        clerkId,
        photoAlbumName,
      },
    });
    console.log('Created Photo Album');
  } catch (err) {
    console.error('ERROR CREATING PHOTO ALBUM' + err);
    throw new Error('ERROR CREATING PHOTO ALBUM');
  }
}
