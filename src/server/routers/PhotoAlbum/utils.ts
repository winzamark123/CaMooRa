import prisma from '@prisma/prisma';

interface createPhotoAlbumProp {
  userId: string;
  photoAlbumName: string;
}

export async function createPhotoAlbum({
  userId,
  photoAlbumName,
}: createPhotoAlbumProp) {
  try {
    await prisma.photoAlbum.create({
      data: {
        userId,
        photoAlbumName,
      },
    });
    console.log('Created Photo Album');
  } catch (err) {
    console.error('ERROR CREATING PHOTO ALBUM' + err);
    throw new Error('ERROR CREATING PHOTO ALBUM');
  }
}
