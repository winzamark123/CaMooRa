import prisma from "../../../../prisma/prisma";
import { User } from '../../../types/types'

export async function findOrCreateUser({ clerkId, userFirstName, userLastName, userEmail }: { clerkId: string, userFirstName?: string | null, userLastName?: string | null, userEmail?: string | null }) {
    let user = await prisma.user.findUnique({
        where: { clerkId },
    });

    // User is not found in our DB
    if (!user) {
        user = await prisma.user.create({
            data: { clerkId },
        });

        // Ensure userFirstName, userLastName, and userEmail are not null before calling createProfile and CreateContact
        const validFirstName = userFirstName ?? "DefaultFirstName";
        const validLastName = userLastName ?? "DefaultLastName";
        const validEmail = userEmail ?? "DefaultEmail";

        await createProfile({ userId: user.id, userFirstName: validFirstName, userLastName: validLastName });
        await createContact({ userId: user.id, userEmail: validEmail })
    }
    return user as User;
};

async function createProfile({ userId, userFirstName, userLastName }: { userId: string, userFirstName: string, userLastName: string }) {
    await prisma.profile.create({
        data: {
            userId,
            firstName: userFirstName,
            lastName: userLastName
        }
    });
};

async function createContact({ userId, userEmail }: { userId: string, userEmail: string }) {
    await prisma.contact.create({
        data: {
            userId,
            email: userEmail
        }
    });
};
