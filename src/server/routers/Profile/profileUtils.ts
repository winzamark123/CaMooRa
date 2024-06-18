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
    //create profile pic
    const profilePicId = await prisma.images.create({
      data: {
        clerkId: clerkId,
        url: userProfilePicURL,
      },
    });
    //create profile
    await prisma.profile.create({
      data: {
        clerkId: clerkId,
        firstName: userFirstName,
        lastName: userLastName,
        profilePicId: profilePicId.id,
      },
    });
  } catch (err) {
    console.error('ERROR CREATING PROFILE' + err);
    throw new Error('ERROR CREATING PROFILE');
  }
}
