import prisma from '@prisma/prisma';

export async function createUser({
  clerkId,
  userFirstName,
  userLastName,
  userEmail,
}: {
  clerkId: string;
  userFirstName: string | null;
  userLastName: string | null;
  userEmail: string | null;
}) {
  const newUser = await prisma.user.create({
    data: { clerkId },
  });
  if (!clerkId || !userFirstName || !userLastName || !userEmail) {
    throw new Error('Invalid input values');
  }

  await createProfile({
    userId: newUser.id,
    userFirstName,
    userLastName,
  });
  await createContact({ userId: newUser.id, userEmail: userEmail });
}

async function createProfile({
  userId,
  userFirstName,
  userLastName,
}: {
  userId: string;
  userFirstName: string;
  userLastName: string;
}) {
  await prisma.profile.create({
    data: {
      userId,
      firstName: userFirstName,
      lastName: userLastName,
    },
  });
}

async function createContact({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  await prisma.contact.create({
    data: {
      userId,
      email: userEmail,
    },
  });
}
