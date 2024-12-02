import { trpc } from '@/lib/trpc/client';
import { useToast } from '@/hooks/use-toast';

interface UseCoverImageSelectorProps {
  refetch?: () => void;
}

export function useCoverImageSelector({
  refetch,
}: UseCoverImageSelectorProps = {}) {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const { data: coverImageId, refetch: refetchCoverImage } =
    trpc.profile.getMyProfileCoverImage.useQuery();
  const updateCoverImage = trpc.profile.updateProfileCoverImage.useMutation({
    onSuccess: () => {
      utils.profile.getMyProfile.invalidate();
      utils.images.getImagesByAlbumId.invalidate();
      refetchCoverImage();
      refetch?.();
      toast({
        title: 'Cover Image Updated',
        description:
          'Your cover image has been updated successfully. Check it out on our homepage!',
      });
    },
  });

  const handleSelectCoverImage = async (imageId: string) => {
    try {
      await updateCoverImage.mutate({ imageId });
    } catch (error) {
      console.error('Failed to update cover image:', error);
    }
  };

  return {
    handleSelectCoverImage,
    isUpdating: updateCoverImage.isPending,
    coverImageId,
  };
}
