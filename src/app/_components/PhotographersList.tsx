'use client';
import React from 'react';
import { trpc } from '@/lib/trpc/client';
import ProfileCard from '@/components/ProfileCard';

export interface PhotographersListProps {
  clerkId: string;
  firstName: string;
  lastName: string;
}

export default function PhotographersList({ clerkId, firstName, lastName }: PhotographersListProps) {
  //trpc handles caching itself
  //uses React Query under the hood (now TanStack Query)
  const {
    data: all_users,
    isLoading,
    error,
  } = trpc.user.getAllUsers.useQuery();
  const createUser = trpc.user.getUser.useQuery({ clerkId, firstName, lastName });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      {all_users?.map((user) => (
        <div key={user.id} className="">
          <ProfileCard id={user.id} />
        </div>
      ))}
    </main>
  );
}
