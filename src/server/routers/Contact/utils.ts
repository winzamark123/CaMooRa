import prisma from '@prisma/prisma';

interface createContactProp {
  userId: string;
  userEmail: string;
}

export async function createContact({ userId, userEmail }: createContactProp) {
  try {
    await prisma.contact.create({
      data: {
        userId,
        email: userEmail,
      },
    });
  } catch (err) {
    console.error('ERROR CREATING CONTACT' + err);
    throw new Error('ERROR CREATING CONTACT');
  }
}
