import { trpc } from '@/lib/trpc/client';

export default function tempUser() {
  const getUsers = trpc.user.getUsers.useQuery();
  return <main>{JSON.stringify(getUsers.data)}</main>;
}
