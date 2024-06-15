import { auth, currentUser } from '@clerk/nextjs/server';
import type { User } from '@clerk/backend';

interface UserProps {
  user: User | null;
}
export const createContextInner = async ({ user }: UserProps) => {
  return { user };
};

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */

export async function createContext() {
  async function getUser() {
    const { userId } = auth();
    if (!userId) {
      return null;
    }
    const user = userId ? await currentUser() : null;
    return user;
  }

  const user = await getUser();
  return await createContextInner({ user });
}

export type Context = Awaited<ReturnType<typeof createContext>>;
