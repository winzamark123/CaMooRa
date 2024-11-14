import prisma from '@prisma/prisma';
import { createContact } from '../Contact/utils';
import { createProfile } from '../Profile/utils';
import { createPhotoAlbum } from '../PhotoAlbum/utils';

interface createUserProp {
  clerkId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userProfilePicURL: string;
}

export async function createUser({
  clerkId,
  userFirstName,
  userLastName,
  userEmail,
  userProfilePicURL,
}: createUserProp) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (existingUser) {
      console.error('User already exists');
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId,
      },
    });

    // create profile for the user
    await createProfile({
      userId: newUser.id,
      userFirstName,
      userLastName,
      userProfilePicURL,
    });

    // create contact for the user
    await createContact({
      userId: newUser.id,
      userEmail: userEmail,
    });

    // create default photo album for the user
    await createPhotoAlbum({
      userId: newUser.id,
      photoAlbumName: 'Untitled Album',
    });
  } catch (err) {
    console.error('ERROR CREATING USER' + err);
    throw new Error('ERROR CREATING USER');
  }
}
