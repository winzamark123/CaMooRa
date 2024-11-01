import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageProp } from '@/server/routers/Images';
import { trpc } from '@/lib/trpc/client';

interface MasonryWrapperProps {
  images: ImageProp[];
  isEditing?: boolean;
}

// The number of columns change by resizing the window
export default function MasonryWrapper({
  images,
  isEditing = false,
}: MasonryWrapperProps) {
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
          <div key={image.id} className="group relative">
            <img className="rounded-sm" src={image.url} alt="Album Image" />
            {isEditing && (
              <button
                onClick={() => handleDeleteImage(image.id)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-colors hover:bg-red-600 group-hover:opacity-100"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
