import { useState, useEffect } from 'react';
import { ImageProp } from '@/server/routers/Images';

const MIN_LOADING_TIME = 200;

export function useImageLoader(
  images: ImageProp[],
  isLoading?: boolean,
  isFetching?: boolean
) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loadingStartTime, setLoadingStartTime] = useState(0);
  const [imagesReady, setImagesReady] = useState<string[]>([]);

  useEffect(() => {
    if (isLoading || isFetching) {
      setLoadingStartTime(Date.now());
      setIsImageLoading(true);
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (!isLoading && !isFetching && images) {
      const timeElapsed = Date.now() - loadingStartTime;

      setImagesReady([]);

      images.forEach((image) => {
        const img = document.createElement('img') as HTMLImageElement;
        img.src = image.url;
        img.onload = () => {
          setImagesReady((prev) => [...prev, image.id]);
        };
      });

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

  return {
    isImageLoading,
    imagesReady,
    allImagesLoaded: imagesReady.length === images.length,
  };
}
