import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';

export interface Profile {
  clerkId: string;
  firstName: string;
  lastName: string;
  additionalName?: string;
  equipment?: string;
  profilePicURL?: string;
  bio?: string;
}
export const profileRouter = router({
  getProfile: queries.getProfile,
  updateProfile: mutations.updateProfile,
});
