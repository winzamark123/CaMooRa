import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutation';

export const contactRouter = router({
  getContact: queries.getContact,
  updateContact: mutations.updateContact,
});
