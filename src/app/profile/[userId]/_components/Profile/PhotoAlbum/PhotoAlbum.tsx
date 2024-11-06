import React from 'react';
import MasonryWrapper from '@/components/Masonry/MasonryGrid';
import { trpc } from '@/lib/trpc/client';
import SkeletonCard from '@/components/Loading/SkeletonCard';
import CreatePostForm from '../UploadImage/CreatePostForm';

interface PhotoAlbumProps {
  clerkId: string;
  photoAlbumId: string;
  isEditing?: boolean;
}

export default function PhotoAlbum({
  clerkId,
  photoAlbumId,
  isEditing = false,
}: PhotoAlbumProps) {
  const {
    data: user_images,
    isLoading,
    error,
  } = trpc.images.getImagesByAlbumId.useQuery({
    clerkId: clerkId,
    photoAlbumId: photoAlbumId,
  });

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user_images && user_images.length === 0) {
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
        <div className="h-half-screen">
          <CreatePostForm photoAlbumId={photoAlbumId} />
        </div>
      )}
      {user_images && (
        <MasonryWrapper images={user_images} isEditing={isEditing} />
      )}
    </main>
  );
}
