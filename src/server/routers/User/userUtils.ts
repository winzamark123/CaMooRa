import prisma from '@prisma/prisma';
import { createContact } from '../Contact/contactUtils';
import { createProfile } from '../Profile/profileUtils';

interface createUserProp {
  clerkId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}

export async function createUser({
  clerkId,
  userFirstName,
  userLastName,
  userEmail,
}: createUserProp) {
  try {
    // Check if user already exists, might not need this in production
    // since its only called when user is created
    // but it's good to have it here for testing since we have many moving parts

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (existingUser) {
      console.log('User already exists');
      return;
    }

    const newUser = await prisma.user.create({
      data: { clerkId },
    });

    await createProfile({
      clerkId: newUser.clerkId,
      userFirstName,
      userLastName,
    });
    await createContact({ clerkId: newUser.clerkId, userEmail: userEmail });
  } catch (err) {
    console.error('ERROR CREATING USER' + err);
    throw new Error('ERROR CREATING USER');
  }
}
