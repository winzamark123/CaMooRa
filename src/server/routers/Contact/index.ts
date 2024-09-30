import { router } from '@/lib/trpc/trpc';
import { getContact } from './queries';
import { updateContact } from './mutation';

export const contactRouter = router({
  getContact,
  updateContact,
});
