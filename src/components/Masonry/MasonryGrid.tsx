'use client';
import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageProp } from '@/server/routers/Images';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';
import { AlbumPhotoSkeleton } from '../Loading/SkeletonCard';

interface MasonryWrapperProps {
  images: ImageProp[];
  isEditing?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
}

const MIN_LOADING_TIME = 200; // Minimum time to show loading state in milliseconds

export default function MasonryWrapper({
  images,
  isEditing = false,
  isLoading,
  isFetching,
}: MasonryWrapperProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loadingStartTime, setLoadingStartTime] = useState(0);
  const [imagesReady, setImagesReady] = useState<string[]>([]);

  const utils = trpc.useUtils();
  const deleteImage = trpc.images.deleteImage.useMutation({
    onSuccess: () => {
      utils.images.getImagesByAlbumId.invalidate();
    },
  });
  const handleDeleteImage = async (imageId: string) => {
    await deleteImage.mutate({ imageId: imageId });
  };

  useEffect(() => {
    if (isLoading || isFetching) {
      setLoadingStartTime(Date.now());
      setIsImageLoading(true);
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (!isLoading && !isFetching && images) {
      const timeElapsed = Date.now() - loadingStartTime;

      // Reset imagesReady state
      setImagesReady([]);

      // Preload images individually
      images.forEach((image) => {
        const img = document.createElement('img') as HTMLImageElement;
        img.src = image.url;
        img.onload = () => {
          setImagesReady((prev) => [...prev, image.id]);
        };
      });

      // Only hide loading state when minimum time has passed AND all images are loaded
      const checkAllImagesLoaded = setInterval(() => {
        if (
          timeElapsed >= MIN_LOADING_TIME &&
          imagesReady.length === images.length
        ) {
          setIsImageLoading(false);
          clearInterval(checkAllImagesLoaded);
        }
      }, 100);

      return () => clearInterval(checkAllImagesLoaded);
    }
  }, [isLoading, isFetching, images, loadingStartTime, imagesReady.length]);

  if (isImageLoading || imagesReady.length !== images.length) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <AlbumPhotoSkeleton />
        <AlbumPhotoSkeleton />
        <AlbumPhotoSkeleton />
        <AlbumPhotoSkeleton />
        <AlbumPhotoSkeleton />
        <AlbumPhotoSkeleton />
      </div>
    );
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1240: 4 }}
    >
      <Masonry gutter="10px">
        {images.map((image: ImageProp) => (
          <div key={image.id} className="group relative">
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
              loading="lazy"
            />
            {isEditing && (
              <div
                onClick={() => handleDeleteImage(image.id)}
                className="absolute inset-0 z-30 flex cursor-pointer items-center 
                          justify-center bg-black/50 
                          opacity-0 transition-opacity duration-300
                          ease-in-out group-hover:opacity-100"
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
