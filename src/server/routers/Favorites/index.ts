import { router } from '@/lib/trpc/trpc';
import { getFavorite, isFavorite } from './queries';
import { removeFavorite, saveFavorite } from './mutation';

export const favorite_router = router({
  getFavorite,
  isFavorite,
  removeFavorite,
  saveFavorite,
});

export type FavoriteRouter = typeof favorite_router;
