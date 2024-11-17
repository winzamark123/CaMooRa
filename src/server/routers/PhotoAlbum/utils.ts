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
  } catch (err) {
    console.error('ERROR CREATING PHOTO ALBUM' + err);
    throw new Error('ERROR CREATING PHOTO ALBUM');
  }
}

export const validateAlbumName = (name: string, currentName?: string) => {
  const trimmedName = name.trim();

  if (trimmedName === '') {
    return {
      isValid: false,
      error: 'Error: Name cannot be empty',
      showCharCount: false,
    };
  }

  if (name.length > 25) {
    return {
      isValid: false,
      error: 'Error: Name cannot be more than 25 characters',
      showCharCount: false,
    };
  }

  if (trimmedName === currentName) {
    return {
      isValid: false,
      error: 'Error: Name is same as the current name',
      showCharCount: false,
    };
  }

  return {
    isValid: true,
    error: '',
    showCharCount: true,
  };
};
