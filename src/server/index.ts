import { router } from '../lib/trpc/trpc';
import { UserRouter } from './routers/User/user';

export const appRouter = router({
  user: UserRouter,
  // Add more routers here
});

export type AppRouter = typeof appRouter;
