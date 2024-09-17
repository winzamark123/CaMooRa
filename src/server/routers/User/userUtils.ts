import prisma from '@prisma/prisma';
import { createContact } from '../Contact/contactUtils';
import { createProfile } from '../Profile/profileUtils';
import { createImageSection } from '../ImageSection/imageSectionUtils';

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
    // Check if user already exists, might not need this in production
    // since its only called when user is created
    // but it's good to have it here for testing since we have many moving parts

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
      data: { clerkId },
    });

    // create profile for the user
    await createProfile({
      clerkId: newUser.clerkId,
      userFirstName,
      userLastName,
      userProfilePicURL,
    });

    // create contact for the user
    await createContact({ clerkId: newUser.clerkId, userEmail: userEmail });

    // create default image section for the user
    await createImageSection({
      clerkId: newUser.clerkId,
      sectionName: 'Default',
    });
  } catch (err) {
    console.error('ERROR CREATING USER' + err);
    throw new Error('ERROR CREATING USER');
  }
}
