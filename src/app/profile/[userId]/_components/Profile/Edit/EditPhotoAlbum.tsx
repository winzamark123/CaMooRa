import React from 'react';
import { ImageProp } from '@/server/routers/Images/index';
import CreatePostForm from '../UploadImage/CreatePostForm';
import MasonryWrapper from '@/components/Masonry/MasonryGrid';

export default function EditPhotoAlbum({
  photoAlbumId,
  images,
}: {
  photoAlbumId: string;
  images: Array<ImageProp>;
}) {
  return (
    <main className="flex flex-col gap-4">
      <div className="h-half-screen">
        <CreatePostForm photoAlbumId={photoAlbumId} />
      </div>
      <MasonryWrapper images={images} />
    </main>
  );
}
