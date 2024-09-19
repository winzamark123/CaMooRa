import React from 'react';
import { useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '../ui/button';
import { useState } from 'react';
import PhotoAlbum from './PhotoAlbum';

export interface SelectedPhotoAlbumProps {
  photoAlbumId: string;
  photoAlbumIndex: number;
}
export default function Projects({ clerkId }: { clerkId: string }) {
  const { data: photoAlbums, isLoading: isLoadingSections } =
    trpc.images.getAllPhotoAlbums.useQuery({
      clerkId,
    });

  const [selectedPhotoAlbum, setSelectedPhotoAlbum] =
    useState<SelectedPhotoAlbumProps>();
  useEffect(() => {
    if (photoAlbums) {
      // console.log("It's rendering");
      setSelectedPhotoAlbum({
        photoAlbumId: photoAlbums[0].id,
        photoAlbumIndex: 0,
      });
    }
  }, [photoAlbums]);

  if (isLoadingSections) {
    return <div>Loading Images...</div>;
  }

  if (!photoAlbums) {
    return <div>No Images Available for this User</div>;
  }

  return (
    <main className="mt-10 flex flex-col gap-4">
      <h2 className="font-mono text-xl font-bold">Projects</h2>
      <div className="flex flex-row">
        {photoAlbums &&
          photoAlbums.map((photoAlbum, index) => (
            <Button
              key={photoAlbum.id}
              className="rounded-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
              onClick={() =>
                setSelectedPhotoAlbum({
                  photoAlbumId: photoAlbum.id,
                  photoAlbumIndex: index,
                })
              }
            >
              <p>{photoAlbum.photoAlbumName}</p>
            </Button>
          ))}
      </div>
      {selectedPhotoAlbum && (
        <PhotoAlbum
          photoAlbum={
            (photoAlbums &&
              photoAlbums[selectedPhotoAlbum.photoAlbumIndex].Images) ||
            []
          }
        />
      )}
    </main>
  );
}
