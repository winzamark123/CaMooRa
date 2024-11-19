import { trpc } from '@/lib/trpc/client';
import { SelectedPhotoAlbumProps } from '../../Projects';

interface useAlbumDeleteProps {
  refetchPhotoAlbums: () => Promise<{ data: any[] }>;
  setSelectedPhotoAlbum: (props: SelectedPhotoAlbumProps) => void;
  selectedPhotoAlbum: SelectedPhotoAlbumProps;
  resetSelectedAlbum: () => void;
}

export function useAlbumDelete({
  refetchPhotoAlbums,
  setSelectedPhotoAlbum,
  selectedPhotoAlbum,
  resetSelectedAlbum,
}: useAlbumDeleteProps) {
  const deletePhotoAlbum = trpc.photoAlbum.deletePhotoAlbum.useMutation({
    onSuccess: () => {
      console.log('Photo Album deleted successfully');
      refetchPhotoAlbums().then((refetchedData) => {
        if (
          selectedPhotoAlbum &&
          refetchedData.data &&
          refetchedData.data.length > 0
        ) {
          const newIndex =
            selectedPhotoAlbum.photoAlbumIndex > 0
              ? selectedPhotoAlbum.photoAlbumIndex - 1
              : 0;
          setSelectedPhotoAlbum({
            photoAlbumId: refetchedData.data[newIndex].id,
            photoAlbumIndex: newIndex,
          });
        } else {
          resetSelectedAlbum();
        }
      });
    },
    onError: (err) => {
      console.error('Error deleting Photo Album', err);
    },
  });

  return { deletePhotoAlbum: deletePhotoAlbum.mutate };
}
