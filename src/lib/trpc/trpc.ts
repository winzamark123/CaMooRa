import { initTRPC } from '@trpc/server';
import { Context } from '@/context';

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
