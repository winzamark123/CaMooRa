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
  const mutation = trpc.user.saveFavoritePhotographer.useMutation({
    onSuccess: () => {
      console.error('Favorite Photographer saved successfully');
    },
    onError: (err) => {
      console.error('Error saving Favorite Photographer ', err);
    },
  });

  function saveFavoritePhotographer() {
    mutation.mutate({
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
