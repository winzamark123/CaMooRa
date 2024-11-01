import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageProp } from '@/server/routers/Images';
import { trpc } from '@/lib/trpc/client';
import { useState } from 'react';

interface MasonryWrapperProps {
  images: ImageProp[];
}
// The number of columns change by resizing the window
export default function MasonryWrapper({ images }: MasonryWrapperProps) {
  const deleteImage = trpc.images.deleteImage.useMutation();

  const handleDeleteImage = async (imageId: string) => {
    console.log('Image ID: ', imageId);
    const res = await deleteImage.mutate({ imageId: imageId });
    console.log(res);
    console.log('Deleted Image');
    // window.location.reload();
  };
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1240: 4 }}
    >
      <Masonry gutter="10px">
        {images.map((image: ImageProp) => (
          <img
            className="rounded-sm"
            src={image.url}
            alt="Album Image"
            key={image.id}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
