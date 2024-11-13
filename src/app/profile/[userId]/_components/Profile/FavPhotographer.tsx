import React, { useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface FavPhotographerProps {
  userId: string;
  photographerId: string;
}

export default function FavPhotographer({
  userId,
  photographerId,
}: FavPhotographerProps) {
  const isFavoriteQuery = trpc.favorites.isFavorite.useQuery({
    userId: userId,
    favoriteUserId: photographerId,
  });

  const [isFavorite, setIsFavorite] = useState(isFavoriteQuery.data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFavoriteQuery.data !== undefined) {
      setIsFavorite(isFavoriteQuery.data);
      setIsLoading(false);
    }
  }, [isFavoriteQuery.data]);

  const save_mutation = trpc.favorites.saveFavorite.useMutation({
    onSuccess: () => {
      console.log('Favorite Photographer saved successfully');
      setIsFavorite(true);
    },
    onError: (err) => {
      console.error('Error saving Favorite Photographer ', err);
    },
  });

  const remove_mutation = trpc.favorites.removeFavorite.useMutation({
    onSuccess: () => {
      console.log('Favorite Remove successfully');
      setIsFavorite(false);
    },
    onError: (err) => {
      console.error('Error removing Favorite Photographer', err);
    },
  });

  if (isLoading) {
    return <Skeleton className="h-4 w-4 rounded-full" />;
  }

  function toggleFavorite() {
    if (isFavorite) {
      remove_mutation.mutate({
        userId: userId,
        photographerId: photographerId,
      });
    } else {
      save_mutation.mutate({
        userId: userId,
        photographerId: photographerId,
      });
    }
  }

  return (
    <>
      <Button
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className="max-w-16"
        onClick={toggleFavorite}
        variant={'ghost'}
      >
        {!isFavorite && <Star />}
        {isFavorite && <Star fill="orange" />}
      </Button>
    </>
  );
}
