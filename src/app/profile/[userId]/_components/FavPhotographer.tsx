import React from 'react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';

interface FavPhotographerProps {
  userId: string;
  photographerId: string;
}

export default function FavPhotographer({
  userId,
  photographerId,
}: FavPhotographerProps) {
  const save_mutation = trpc.favorites.saveFavorite.useMutation({
    onSuccess: () => {
      console.log('Favorite Photographer saved successfully');
    },
    onError: (err) => {
      console.error('Error saving Favorite Photographer ', err);
    },
  });

  // const remove_mutation = trpc.favorites.removeFavorite.useMutation({
  //   onSuccess: () => {
  //     console.log('Favorite Remove successfully');
  //   },
  //   onError: (err) => {
  //     console.error('Error removing Favorite Photographer', err);
  //   },
  // });

  function saveFavoritePhotographer() {
    save_mutation.mutate({
      userId: userId,
      photographerId: photographerId,
    });
  }

  return (
    <main>
      <Button onClick={saveFavoritePhotographer}>
        <div>FavPhotographer</div>
      </Button>
    </main>
  );
}
