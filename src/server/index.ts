import { router } from '../lib/trpc/trpc';
import { user_router } from './routers/User/user';
import { profileRouter } from './routers/Profile/profile'

export const appRouter = router({
  user: user_router,
  profile: profileRouter
  // Add more routers here
});

export type AppRouter = typeof appRouter;
