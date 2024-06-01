import { publicProcedure, router } from '../lib/trpc/trpc';

export const appRouter = router({
  getUser: publicProcedure.query(async () => {
    return {
      id: 1,
      name: 'John Doe',
    };
  }),
});

export type AppRouter = typeof appRouter;
