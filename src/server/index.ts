import { router } from '../lib/trpc/trpc';
import { user_router } from './routers/User/user';
import { contactRouter } from './routers/Contact/contact';
import { profileRouter } from './routers/Profile/profile';
import { images_router } from './routers/Images/images';
import { favorite_router } from './routers/Favorites/favorite';

export const appRouter = router({
  user: user_router,
  profile: profileRouter,
  contact: contactRouter,
  images: images_router,
  favorites: favorite_router,
  // Add more routers here
});

export type AppRouter = typeof appRouter;
