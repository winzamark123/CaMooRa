import { useState } from 'react';
import { trpc } from '@/lib/trpc/client';

export function useAlbumUpdate({ userId }: { userId: string }) {
  const utils = trpc.useUtils();
  const [updatedPhotoAlbumNameId, setUpdatedPhotoAlbumNameId] = useState('');

  const updatePhotoAlbumName = trpc.photoAlbum.updatePhotoAlbumName.useMutation(
    {
      onMutate: async (newAlbum) => {
        // Cancel any outgoing fetches
        await utils.photoAlbum.getAllPhotoAlbums.cancel();

        // Save current albums state (backup)
        const previousAlbums = utils.photoAlbum.getAllPhotoAlbums.getData({
          userId,
        });

        // Update UI immediately with new name while preserving array order
        utils.photoAlbum.getAllPhotoAlbums.setData({ userId }, (old) => {
          if (!old) return previousAlbums;
          return old.map((album) => {
            if (album.id === updatedPhotoAlbumNameId) {
              return {
                ...album,
                photoAlbumName: newAlbum.newPhotoAlbumName,
              };
            }
            return album;
          });
        });

        console.log('Updating Photo Album Name', newAlbum);
        console.log('Previous Albums', previousAlbums);
        return { previousAlbums };
      },

      onSuccess: () => {
        console.log('Photo Album updated successfully');
      },

      // If Server Update fails, revert back to old names
      onError: (err, newAlbum, context) => {
        console.error('Error updating Photo Album', err);
        utils.photoAlbum.getAllPhotoAlbums.setData(
          { userId },
          context?.previousAlbums
        );
      },

      onSettled: () => {
        // Ensure data is synced with server
        const updatedAlbum = utils.photoAlbum.getAllPhotoAlbums.getData({
          userId,
        });

        console.log('Updated Albums', updatedAlbum);
        utils.photoAlbum.getAllPhotoAlbums.invalidate({ userId });
      },
    }
  );

  return {
    updatedPhotoAlbumNameId,
    setUpdatedPhotoAlbumNameId,
    mutateAlbumName: updatePhotoAlbumName.mutate,
  };
}
