import prisma from '@prisma/prisma';

interface createProfileProp {
  userId: string;
  userFirstName: string;
  userLastName: string;
}

export async function createProfile({
  userId,
  userFirstName,
  userLastName,
}: createProfileProp) {
  try {
    await prisma.profile.create({
      data: {
        userId,
        firstName: userFirstName,
        lastName: userLastName,
      },
    });
  } catch (err) {
    console.error('ERROR CREATING PROFILE' + err);
    throw new Error('ERROR CREATING PROFILE');
  }
}
