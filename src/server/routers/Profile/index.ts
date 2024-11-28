import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';

export interface Profile {
  userId: string;
  firstName: string;
  lastName: string;
  additionalName?: string;
  equipment?: string;
  profilePicURL?: string;
  bio?: string;
}
export const profileRouter = router({
  getMyProfile: queries.getMyProfile,
  getFullProfile: queries.getFullProfile,
  getProfileBasics: queries.getProfileBasics,
  updateProfile: mutations.updateProfile,
});
