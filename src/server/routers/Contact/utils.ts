import prisma from '@prisma/prisma';

interface createContactProp {
  clerkId: string;
  userEmail: string;
}
export async function createContact({ clerkId, userEmail }: createContactProp) {
  try {
    await prisma.contact.create({
      data: {
        clerkId: clerkId,
        email: userEmail,
      },
    });
  } catch (err) {
    console.error('ERROR CREATING CONTACT' + err);
    throw new Error('ERROR CREATING CONTACT');
  }
}
