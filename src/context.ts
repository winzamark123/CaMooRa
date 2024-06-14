import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
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
export async function createContext(opts: CreateNextContextOptions) {
  async function getUser() {
    const { userId } = auth();
    const user = userId ? await currentUser() : null;
    return user;
  }

  const user = await getUser();
  return await createContextInner({ user });
}

export type Context = Awaited<ReturnType<typeof createContext>>;
