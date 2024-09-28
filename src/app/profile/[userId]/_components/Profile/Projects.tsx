import React from 'react';
import { useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PhotoAlbum from './PhotoAlbum';

export interface SelectedPhotoAlbumProps {
  photoAlbumId: string;
  photoAlbumIndex: number;
}
export default function Projects({ clerkId }: { clerkId: string }) {
  const { data: photoAlbums, isLoading } =
    trpc.photoAlbum.getAllPhotoAlbums.useQuery({
      clerkId,
    });

  const [selectedPhotoAlbum, setSelectedPhotoAlbum] =
    useState<SelectedPhotoAlbumProps>();
  useEffect(() => {
    if (photoAlbums && photoAlbums.length > 0) {
      setSelectedPhotoAlbum({
        photoAlbumId: photoAlbums[0].id,
        photoAlbumIndex: 0,
      });
    }
  }, [photoAlbums]);

  if (isLoading) {
    return <div>Loading Images...</div>;
  }

  return (
    <main className="mt-10 flex flex-col gap-4">
      <h2 className="font-mono text-xl font-bold">Projects</h2>
      <div className="flex flex-row gap-x-4">
        {photoAlbums &&
          photoAlbums.map((photoAlbum, index) => (
            <Button
              key={photoAlbum.id}
              className="rounded-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
              style={
                selectedPhotoAlbum?.photoAlbumId === photoAlbum.id
                  ? { backgroundColor: '#013C5A', color: 'white' }
                  : {}
              }
              aria-label={`Photo Album ${photoAlbum.photoAlbumName}`}
              onClick={() =>
                setSelectedPhotoAlbum({
                  photoAlbumId: photoAlbum.id,
                  photoAlbumIndex: index,
                })
              }
            >
              {photoAlbum.photoAlbumName} ({photoAlbum.Images.length})
            </Button>
          ))}
      </div>
      {selectedPhotoAlbum && (
        <PhotoAlbum
          images={
            (photoAlbums &&
              photoAlbums[selectedPhotoAlbum.photoAlbumIndex].Images) ||
            []
          }
        />
      )}
      {!selectedPhotoAlbum && <div>No Photo Albums Available</div>}
    </main>
  );
}
