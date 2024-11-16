import React from 'react';
import MasonryWrapper from '@/components/Masonry/MasonryGrid';
import { trpc } from '@/lib/trpc/client';
import CreatePostForm from '../UploadImage/CreatePostForm';
import { Button } from '@/components/ui/button';

interface PhotoAlbumProps {
  userId: string;
  photoAlbumId: string;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
}

export default function PhotoAlbum({
  userId,
  photoAlbumId,
  isEditing = false,
  setIsEditing,
}: PhotoAlbumProps) {
  const {
    data: user_images,
    isLoading,
    isFetching,
    refetch,
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
      {isEditing && setIsEditing && (
        <div className="flex flex-col">
          <div className="flex justify-end">
            <Button onClick={() => setIsEditing(false)}>Preview</Button>
          </div>
          <div className="h-half-screen overflow-y-auto border-b-2">
            <CreatePostForm photoAlbumId={photoAlbumId} userId={userId} />
          </div>
        </div>
      )}
      {user_images && (
        <MasonryWrapper
          images={user_images}
          isEditing={isEditing}
          isLoading={isLoading}
          isFetching={isFetching}
          refetch={refetch}
        />
      )}
    </main>
  );
}
