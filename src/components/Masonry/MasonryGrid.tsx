import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageProp } from '@/server/routers/Images';

interface MasonryWrapperProps {
  images: ImageProp[];
}
// The number of columns change by resizing the window
export default function MasonryWrapper({ images }: MasonryWrapperProps) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>
        {images.map((image: ImageProp) => (
          <img
            className="rounded-sm border border-black object-cover"
            src={image.url}
            alt="Photography Image"
            key={image.id}
          />
        ))}
        {/* Children */}
      </Masonry>
    </ResponsiveMasonry>
  );
}
