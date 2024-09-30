import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';

export const user_router = router({
  getAllPhotographers: queries.getAllPhotographers,
  getAllUsers: queries.getAllUsers,
  getUser: queries.getUser,
});

export type UserRouter = typeof user_router;
