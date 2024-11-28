import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';
export const user_router = router({
  getAllPhotographers: queries.getAllPhotographers,
  getAllUsers: queries.getAllUsers,
  getUser: queries.getUser,
  getCurrentUser: queries.getCurrentUser,
  deleteUser: mutations.deleteUser,
  updateUser: mutations.updateUser,
  getIsNewUser: queries.getIsNewUser,
});

export type UserRouter = typeof user_router;
