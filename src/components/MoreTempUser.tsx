import { trpc } from '@/lib/trpc/client';

export default function MoreTempUser() {
  const get_users = trpc.user.getAllUsers.useQuery();
  return <main>{JSON.stringify(get_users.data)}</main>;
}
