import React from 'react';
import Image from 'next/image';
import { ImageProp } from '@/server/routers/Images/index';

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
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="relative flex h-72 gap-4 p-4">
            <Image
              className="rounded-sm border border-black object-cover"
              src={image.url}
              alt="Photography Image"
              fill
            />
          </div>
        ))}
      </div>
    </main>
  );
}
