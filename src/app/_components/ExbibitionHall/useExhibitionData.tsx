import { trpc } from '@/lib/trpc/client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export function useExhibitionData() {
  const { user } = useUser();
  const options = ['Default', 'Favorites'];
  const [dropdownText, setDropdownText] = useState(options[0]);

  const { data: all_users, isLoading } = trpc.user.getAllPhotographers.useQuery(
    undefined,
    {
      staleTime: 0,
      refetchOnMount: 'always',
      retry: 1,
    }
  );

  const { data: fav_users, isLoading: fav_users_loading } =
    trpc.favorites.getFavorite.useQuery(undefined, { enabled: !!user });

  return {
    isLoading: isLoading || fav_users_loading,
    all_users,
    fav_users,
    user,
    dropdownText,
    setDropdownText,
    options,
  };
}
