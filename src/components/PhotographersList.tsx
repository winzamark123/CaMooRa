import React from 'react';
import { trpc } from '@/lib/trpc/client';
import ProfileCard from './ProfileCard';

export default function PhotographersList() {
  //trpc handles caching itself
  //uses React Query under the hood (now TanStack Query)
  const {
    data: all_users,
    isLoading,
    error,
  } = trpc.user.getAllUsers.useQuery();

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
          <ProfileCard id={user.clerkId} />
        </div>
      ))}
    </main>
  );
}
