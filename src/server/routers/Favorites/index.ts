import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';

export const favorite_router = router({
  getFavorite: queries.getFavorite,
  isFavorite: queries.isFavorite,
  removeFavorite: mutations.removeFavorite,
  saveFavorite: mutations.saveFavorite,
});

export type FavoriteRouter = typeof favorite_router;
