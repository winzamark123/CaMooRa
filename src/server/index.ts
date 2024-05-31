import { publicProcedure, router } from './trpc';

export const appRouter = router({
  getUser: publicProcedure.query(async () => {
    return {
      id: 1,
      name: 'John Doe',
    };
  }),
});

export type AppRouter = typeof appRouter;
