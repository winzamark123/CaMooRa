import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageProp } from '@/server/routers/Images';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';
import SkeletonCard from '../Loading/SkeletonCard';

interface MasonryWrapperProps {
  images: ImageProp[];
  isEditing?: boolean;
}

// The number of columns change by resizing the window
export default function MasonryWrapper({
  images,
  isEditing = false,
}: MasonryWrapperProps) {
  const [loadingImages, setLoadingImages] = useState<string[]>([]);
  const deleteImage = trpc.images.deleteImage.useMutation();
  console.log('Test test');

  const handleDeleteImage = async (imageId: string) => {
    const res = await deleteImage.mutate({ imageId: imageId });
    console.log(res);
  };

  const handleImageLoad = (imageId: string) => {
    setLoadingImages((prev) => ({ ...prev, [imageId]: false }));
  };

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1240: 4 }}
    >
      <Masonry gutter="10px">
        {images.map((image: ImageProp) => (
          <div key={image.id} className="group relative">
            {/* <img className="rounded-sm" src={image.url} alt="Album Image" /> */}
            {/* Luckily this by using next/image, the image is loaded fast and also at a certain size
            which helps with the masonry. But this DOES NOT MEAN it is responsive. It just loads at that
            size which makes it seems responsive. Hacky solution for now.
            */}
            {loadingImages[image.id as any] && <SkeletonCard />}
            <Image
              className="rounded-sm"
              src={image.url}
              alt="Album Image"
              width={0}
              height={0}
              sizes="(max-width: 750px) 100vw,
                     (max-width: 900px) 50vw,
                     (max-width: 1240px) 33vw,
                     25vw"
              style={{ width: '100%', height: 'auto' }}
              priority={false}
              onLoad={() => handleImageLoad(image.id)}
            />
            {isEditing && (
              <div
                onClick={() => handleDeleteImage(image.id)}
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
