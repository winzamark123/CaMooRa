import React from 'react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
      <Button onClick={toggleFavorite}>
        {!isFavorite && <div>Save</div>}
        {isFavorite && <div>Remove</div>}
      </Button>
    </main>
  );
}
