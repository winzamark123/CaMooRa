import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageProp } from '@/server/routers/Images';
import Image from 'next/image';
import { AlbumLongPhotoSkeleton } from '../Skeletons/AlbumSkeleton';
import { useImageLoader } from './useImageLoader';
import { useImageDeletion } from './useImageDeletion';

interface MasonryWrapperProps {
  images: ImageProp[];
  isEditing?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch?: () => void;
}

export default function MasonryWrapper({
  images,
  isEditing = false,
  isLoading,
  isFetching,
  refetch,
}: MasonryWrapperProps) {
  const { isImageReady } = useImageLoader(images, isLoading, isFetching);
  const { handleDeleteImage, getVisibleImages } = useImageDeletion({ refetch });

  const visibleImages = getVisibleImages(images);

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1240: 4 }}
    >
      <Masonry gutter="10px">
        {visibleImages.map((image: ImageProp) => (
          <div key={image.id} className="group relative">
            {isImageReady(image.id) ? (
              <>
                <div className="relative">
                  <Image
                    className="rounded-sm transition-opacity duration-200"
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
                </div>
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
              </>
            ) : (
              <AlbumLongPhotoSkeleton />
            )}
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
