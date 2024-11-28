import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';

export const profileRouter = router({
  getMyProfile: queries.getMyProfile,
  getFullProfile: queries.getFullProfile,
  getProfileBasics: queries.getProfileBasics,
  updateProfile: mutations.updateProfile,
});
