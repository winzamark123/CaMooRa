import { initTRPC } from '@trpc/server';
import { Context } from '@/context';
import prisma from '@prisma/prisma';

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

    return opts.next({
      ctx: {
        // ✅ user value is known to be non-null now
        user: ctx.user,
      },
    });
  }
);

// New middleware for checking resource ownership
export const isOwner = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error('Not authenticated');
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: ctx.user.id },
  });

  if (!dbUser) {
    throw new Error('User not found');
  }

  return next({
    ctx: {
      ...ctx,
      dbUser,
    },
  });
});

// New protected procedure that includes user ownership check
export const protectedOwnerProcedure = protectedProcedure.use(isOwner);
