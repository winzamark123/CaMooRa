import React from 'react';
import { ImageProp } from '@/server/routers/Images/index';
import MasonryWrapper from '@/components/Masonry/MasonryGrid';

export default function PhotoAlbum({ images }: { images: Array<ImageProp> }) {
  if (images.length === 0) {
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
      <MasonryWrapper images={images} />
    </main>
  );
}
