import { router, publicProcedure } from "../../../lib/trpc/trpc";
import prisma from "../../../../prisma/prisma"
import { z } from "zod";

export const profileRouter = router({
    getProfile: publicProcedure
        // switched to UserId - because can't search profile with clerkId
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            const profile = await prisma.profile.findUnique({
                where: {
                    userId: input.userId
                }
            });
            return profile;
        })

    // TODO: Finish rest of Profile routes
})