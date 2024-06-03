import { router } from '../lib/trpc/trpc';
import { user_router } from './routers/User/user';

export const app_router = router({
  user: user_router,
  // Add more routers here
});

export type AppRouter = typeof app_router;
