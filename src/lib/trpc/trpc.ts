import { initTRPC } from '@trpc/server';
import { Context } from '@/context';
import prisma from '@prisma/prisma';

// Define the shape we want for our user context
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// procedure that asserts that the user is logged in
export const protectedProcedure = t.procedure.use(
  async function isAuthed(opts) {
    const { ctx } = opts;
    // `ctx.user` is nullable
    if (!ctx.user) {
      throw new Error('Not authenticated');
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: ctx.user.id },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    return opts.next({
      ctx: {
        user: {
          id: dbUser.id,
          clerk: {
            id: ctx.user.id,
          },
        },
      },
    });
  }
);
