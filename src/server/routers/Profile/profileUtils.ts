import prisma from '@prisma/prisma';

interface createProfileProp {
  clerkId: string;
  userFirstName: string;
  userLastName: string;
  userProfilePicURL: string;
}

export async function createProfile({
  clerkId,
  userFirstName,
  userLastName,
  userProfilePicURL,
}: createProfileProp) {
  try {
    await prisma.profile.create({
      data: {
        clerkId: clerkId,
        firstName: userFirstName,
        lastName: userLastName,
        profilePicURL: userProfilePicURL,
      },
    });
  } catch (err) {
    console.error('ERROR CREATING PROFILE' + err);
    throw new Error('ERROR CREATING PROFILE');
  }
}
