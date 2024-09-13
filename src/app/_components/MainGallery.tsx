'use client';
import React from 'react';
import { trpc } from '@/lib/trpc/client';
import { HoverEffect } from '../../components/ui/card-hover-effect';
import { useUser } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function MainGallery() {
  const { user } = useUser();

  //trpc handles caching itself
  //uses React Query under the hood (now TanStack Query)
  const {
    data: all_users,
    isLoading,
    error,
  } = trpc.user.getAllPhotographers.useQuery(undefined, {
    staleTime: 0, // Force the query to be treated as fresh
    refetchOnMount: 'always', // Ensure it refetches on mount
    retry: 1,
  });

  const {
    data: saved_users,
    isLoading: saved_isLoading,
    error: saved_error,
  } = trpc.user.getFavoritePhotographers.useQuery(
    { clerkId: user?.id as string },
    {
      enabled: !user, // only fetch if the user is logged in
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <div className="border border-white p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Default</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Favorites</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {user && <HoverEffect items={saved_users} />}
      {all_users && <HoverEffect items={all_users} />}
    </main>
  );
}
