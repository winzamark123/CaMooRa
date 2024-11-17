import { trpc } from '@/lib/trpc/client';

export function useAlbumCreate({
  refetchPhotoAlbums,
}: {
  refetchPhotoAlbums: () => void;
}) {
  const createPhotoAlbum = trpc.photoAlbum.createPhotoAlbum.useMutation({
    onSuccess: () => {
      console.log('Photo Album created successfully');
      refetchPhotoAlbums();
    },
    onError: (err) => {
      console.error('Error creating Photo Album', err);
    },
  });

  return { createPhotoAlbum: createPhotoAlbum.mutate };
}
