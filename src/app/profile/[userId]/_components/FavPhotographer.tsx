import React, { useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Star } from 'lucide-react';

interface FavPhotographerProps {
  userId: string;
  photographerId: string;
}

export default function FavPhotographer({
  userId,
  photographerId,
}: FavPhotographerProps) {
  const isFavoriteQuery = trpc.favorites.isFavorite.useQuery({
    clerkId: userId,
    favoriteClerkId: photographerId,
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
    return <div> Loading...</div>;
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
    <main>
      <Button onClick={toggleFavorite} variant={'ghost'}>
        {!isFavorite && <Star />}
        {isFavorite && <Star fill="orange" />}
      </Button>
    </main>
  );
}
