'use client';
import React from 'react';
import { useState } from 'react';
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

export default function ExhibitionHall() {
  const { user } = useUser();
  const options = ['Default', 'Favorites'];

  const [dropdownText, setDropdownText] = useState(options[0]);
  const otherOption = dropdownText === options[0] ? options[1] : options[0];

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
    data: fav_users,
    isLoading: fav_users_loading,
    error: fav_users_error,
  } = trpc.user.getFavoritePhotographers.useQuery(
    { clerkId: user?.id as string },
    {
      enabled: !!user, // only fetch if the user is logged in
    }
  );

  if (isLoading || fav_users_loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (fav_users_error) {
    return <div>Error: {fav_users_error.message}</div>;
  }

  console.log('FAV USERS', fav_users);

  return (
    <main className="flex flex-col border border-white">
      <div className="flex justify-end border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{dropdownText}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setDropdownText(otherOption)}>
              {otherOption}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="">
        {dropdownText === options[1] && user && fav_users && (
          <HoverEffect items={fav_users} />
        )}
        {dropdownText === options[0] && all_users && (
          <HoverEffect items={all_users} />
        )}
      </div>
    </main>
  );
}
