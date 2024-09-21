import React from 'react';
import Image from 'next/image';
import { ImageProp } from '@/server/routers/Images/images';

export default function PhotoAlbum({ images }: { images: Array<ImageProp> }) {
  return (
    <main className="flex flex-col gap-4">
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
