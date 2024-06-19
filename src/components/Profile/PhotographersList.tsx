'use client';
import React from 'react';
import { trpc } from '@/lib/trpc/client';
import ProfileCard from '@/components/ProfileCard';
import Link from 'next/link';

export default function PhotographersList() {
  //trpc handles caching itself
  //uses React Query under the hood (now TanStack Query)
  const {
    data: all_users,
    isLoading,
    error,
  } = trpc.user.getAllPhotographers.useQuery(undefined, {
    staleTime: 0, // Force the query to be treated as fresh
    refetchOnMount: true, // Ensure it refetches on mount
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <div className="flex flex-col gap-4">
        {all_users?.map((user) => (
          <div key={user.clerkId} className="">
            <Link href={`/profile/${user.clerkId}`}>
              <ProfileCard id={user.clerkId} />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
