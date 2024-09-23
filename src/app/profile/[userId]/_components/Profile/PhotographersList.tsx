'use client';
import React from 'react';
import { trpc } from '@/lib/trpc/client';
import { HoverEffect } from '../../../../../components/ui/card-hover-effect';

export default function PhotographersList() {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <main>{all_users && <HoverEffect items={all_users} />}</main>;
}
