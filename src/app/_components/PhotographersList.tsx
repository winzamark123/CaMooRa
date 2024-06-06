'use client';
import React from 'react';
import { trpc } from '@/lib/trpc/client';
import ProfileCard from '@/components/ProfileCard';

interface PhotographersListProps {
  clerkId: string;
}

export default function PhotographersList({ clerkId }: PhotographersListProps) {
  //trpc handles caching itself
  //uses React Query under the hood (now TanStack Query)
  const {
    data: all_users,
    isLoading,
    error,
  } = trpc.user.getAllUsers.useQuery();
  const checkUser = trpc.user.checkUser.useQuery({ clerkId: clerkId });
  const addUser = trpc.user.addUser.useMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!checkUser.data) {
    addUser.mutate({ clerkId });
  }

  return (
    <main>
      {all_users?.map((user) => (
        <div key={user.id} className="">
          <ProfileCard id={user.clerkId} />
        </div>
      ))}
    </main>
  );
}
