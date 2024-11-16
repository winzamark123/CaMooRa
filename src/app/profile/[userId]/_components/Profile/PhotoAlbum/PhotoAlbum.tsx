import React from 'react';
import MasonryWrapper from '@/components/Masonry/MasonryGrid';
import { trpc } from '@/lib/trpc/client';
import CreatePostForm from '../UploadImage/CreatePostForm';

interface PhotoAlbumProps {
  userId: string;
  photoAlbumId: string;
  isEditing?: boolean;
}

export default function PhotoAlbum({
  userId,
  photoAlbumId,
  isEditing = false,
}: PhotoAlbumProps) {
  const {
    data: user_images,
    isLoading,
    isFetching,
    error,
  } = trpc.images.getImagesByAlbumId.useQuery({
    userId: userId,
    photoAlbumId: photoAlbumId,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isEditing && user_images && user_images.length === 0) {
    return (
      <div
        className="flex min-h-80 items-center justify-center rounded-b-xl rounded-tr-xl"
        style={{ backgroundColor: '#F7F5EF' }}
      >
        <p>No images under Photo Album</p>
      </div>
    );
  }

  return (
    <main
      className="flex flex-col gap-4 rounded-b-xl rounded-tr-xl p-10"
      style={{ backgroundColor: '#F7F5EF' }}
    >
      {isEditing && (
        <div className="h-half-screen overflow-y-auto border-b-2">
          <CreatePostForm photoAlbumId={photoAlbumId} userId={userId} />
        </div>
      )}
      {user_images && (
        <MasonryWrapper
          images={user_images}
          isEditing={isEditing}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </main>
  );
}
