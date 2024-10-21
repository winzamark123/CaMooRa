import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageProp } from '@/server/routers/Images';

interface MasonryWrapperProps {
  images: ImageProp[];
}
// The number of columns change by resizing the window
export default function MasonryWrapper({ images }: MasonryWrapperProps) {
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
        {/* Children */}
      </Masonry>
    </ResponsiveMasonry>
  );
}
