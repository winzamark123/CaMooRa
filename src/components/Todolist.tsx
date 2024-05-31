'use client';
import { trpc } from '@/app/_trpc/client';

export default function Todolist() {
  const getUser = trpc.getUser.useQuery();
  return <main>Todolist</main>;
}
