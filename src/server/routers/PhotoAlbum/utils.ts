import prisma from '@prisma/prisma';

interface createPhotoAlbumProp {
  clerkId: string;
  photoAlbumName: string;
}

const mockLayout = {
  direction: 'row',
  first: 1,
  second: {
    direction: 'column',
    first: 2,
    second: 3,
  },
};

export async function createPhotoAlbum({
  clerkId,
  photoAlbumName,
}: createPhotoAlbumProp) {
  try {
    await prisma.photoAlbum.create({
      data: {
        clerkId,
        photoAlbumName,
        layout: mockLayout,
      },
    });
    console.log('Created Photo Album');
  } catch (err) {
    console.error('ERROR CREATING PHOTO ALBUM' + err);
    throw new Error('ERROR CREATING PHOTO ALBUM');
  }
}
