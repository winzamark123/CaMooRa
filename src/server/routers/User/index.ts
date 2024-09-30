import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';

export const user_router = router({
  
});

export type UserRouter = typeof user_router;
