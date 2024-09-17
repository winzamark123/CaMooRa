import prisma from '@prisma/prisma';

interface createImageSectionProp {
  clerkId: string;
  sectionName: string;
}

export async function createImageSection({
  clerkId,
  sectionName,
}: createImageSectionProp) {
  try {
    await prisma.image_section.create({
      data: {
        clerkId,
        sectionName,
      },
    });
    console.log('Created Image Section');
  } catch (err) {
    console.error('ERROR CREATING IMAGE SECTION' + err);
    throw new Error('ERROR CREATING IMAGE SECTION');
  }
}
