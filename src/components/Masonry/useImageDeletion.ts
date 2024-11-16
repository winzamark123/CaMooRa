import { useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import { ImageProp } from '@/server/routers/Images';

interface UseImageDeletionProps {
  refetch?: () => void;
}

export function useImageDeletion({ refetch }: UseImageDeletionProps) {
  const [deletingImages, setDeletingImages] = useState<Set<string>>(new Set());

  const utils = trpc.useUtils();
  const deleteImage = trpc.images.deleteImage.useMutation({
    onSuccess: () => {
      utils.images.getImagesByAlbumId.invalidate();
      refetch?.();
    },
  });

  const handleDeleteImage = async (imageId: string) => {
    if (deletingImages.has(imageId)) return;

    try {
      setDeletingImages((prev) => {
        const newSet = new Set(prev);
        newSet.add(imageId);
        return newSet;
      });
      await deleteImage.mutate({ imageId });
    } catch (error) {
      console.error('Failed to delete image:', error);
      setDeletingImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(imageId);
        return newSet;
      });
    }
  };

  const getVisibleImages = (images: ImageProp[]) =>
    images.filter((image) => !deletingImages.has(image.id));

  return {
    handleDeleteImage,
    getVisibleImages,
    isDeletingImage: (imageId: string) => deletingImages.has(imageId),
  };
}
