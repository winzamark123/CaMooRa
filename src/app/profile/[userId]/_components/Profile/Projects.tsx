import React from 'react';
import { useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';
import { useState } from 'react';
import PhotoAlbum from './PhotoAlbum/PhotoAlbum';

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
    <main className="mt-20 flex flex-col">
      <div className="flex flex-row">
        {photoAlbums &&
          photoAlbums.map((photoAlbum, index) => (
            <button
              key={photoAlbum.id}
              className="rounded-t-2xl px-10 py-2.5 text-sm text-black shadow-md hover:contrast-75"
              style={
                selectedPhotoAlbum?.photoAlbumId === photoAlbum.id
                  ? { backgroundColor: '#F7F5EF' }
                  : { backgroundColor: '#E6E8E9' }
              }
              aria-label={`Photo Album ${photoAlbum.photoAlbumName}`}
              onClick={() =>
                setSelectedPhotoAlbum({
                  photoAlbumId: photoAlbum.id,
                  photoAlbumIndex: index,
                })
              }
            >
              {photoAlbum.photoAlbumName}
            </button>
          ))}
      </div>
      {selectedPhotoAlbum && (
        <PhotoAlbum
          clerkId={clerkId}
          photoAlbumId={selectedPhotoAlbum.photoAlbumId}
        />
      )}
      {!selectedPhotoAlbum && <div>No Photo Albums Available</div>}
    </main>
  );
}
