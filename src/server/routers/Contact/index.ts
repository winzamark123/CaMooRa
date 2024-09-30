import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';
export interface Contact {
  email?: string;
  discord?: string;
  instagramTitle?: string;
  instagramLink?: string;
  phone?: string;
  portfolioTitle?: string;
  portfolioLink?: string;
  whatsApp?: string;
  isContactPublic: boolean;
  isPhotographer: boolean;
}

export const contactRouter = router({
  getContact: queries.getContact,
  updateContact: mutations.updateContact,
});
