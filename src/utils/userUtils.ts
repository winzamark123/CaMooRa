import { clerkClient } from "@clerk/nextjs/dist/types/server";
import prisma from "../../prisma/prisma";
import { User, Profile, Contact } from '../types/types'


// Passing down the first and last name is very repetitive (Will have to refactor a bit)
export async function findOrCreateUser(clerkId: string, firstName: string, lastName: string) {
    let user = await prisma.user.findUnique({
        where: { clerkId },
    });
    if (!user) {
        user = await prisma.user.create({
            data: { clerkId },
        });
        await createProfile(user.id, firstName, lastName)
    }
    return user as User;
}

async function createProfile(userId: string, firstName: string, lastName: string) {
    await prisma.profile.create({
        data: {
            userId,
            firstName,
            lastName
        }
    })
}