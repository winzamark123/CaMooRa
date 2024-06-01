'use client';
import { trpc } from '@/lib/trpc/client';

export default function Todolist() {
  const getUser = trpc.getUser.useQuery();
  return <main>{getUser.data?.name}</main>;
}
