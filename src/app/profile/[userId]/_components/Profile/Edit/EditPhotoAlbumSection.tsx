// import EditPhotoAlbum from './EditPhotoAlbum';
import PhotoAlbum from '../PhotoAlbum/PhotoAlbum';
import { trpc } from '@/lib/trpc/client';
import { useEffect, useState, useRef } from 'react';
import { SelectedPhotoAlbumProps } from '../Projects';
import PhotoAlbumButton from '../PhotoAlbum/PhotoAlbumButton';
import CreateAlbumModal from '../PhotoAlbum/CreateAlbumModal';

interface EditPhotoAlbumSectionProps {
  userId: string;
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditPhotoAlbumSection({
  userId,
  setIsEditing,
}: EditPhotoAlbumSectionProps) {
  const utils = trpc.useUtils();

  const {
    data: photoAlbums,
    isLoading: isLoadingSections,
    refetch: refetchPhotoAlbums,
  } = trpc.photoAlbum.getAllPhotoAlbums.useQuery({ userId });

  const createPhotoAlbum = trpc.photoAlbum.createPhotoAlbum.useMutation({
    onSuccess: () => {
      console.log('Photo Album created successfully');
      refetchPhotoAlbums();
    },
    onError: (err) => {
      console.error('Error creating Photo Album', err);
    },
  });

  const updatePhotoAlbumName = trpc.photoAlbum.updatePhotoAlbumName.useMutation(
    {
      onMutate: async (newAlbum) => {
        // Cancel any outgoing fetches
        await utils.photoAlbum.getAllPhotoAlbums.cancel();

        // Save current albums state (backup)
        const previousAlbums = utils.photoAlbum.getAllPhotoAlbums.getData({
          userId,
        });

        // Update UI immediately with new name
        utils.photoAlbum.getAllPhotoAlbums.setData({ userId }, (old) => {
          if (!old) return previousAlbums;
          return old.map((album) =>
            album.id === updatedPhotoAlbumNameId
              ? { ...album, photoAlbumName: newAlbum.newPhotoAlbumName }
              : album
          );
        });

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
        utils.photoAlbum.getAllPhotoAlbums.invalidate({ userId });
        console.log(photoAlbums);
      },
    }
  );

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

  // Update Photo Album Id (needed for optimistic update)
  const [updatedPhotoAlbumNameId, setUpdatedPhotoAlbumNameId] = useState('');

  // Selected Album State and Refs
  const [selectedPhotoAlbum, setSelectedPhotoAlbum] =
    useState<SelectedPhotoAlbumProps>();
  const hasSetSelectedAlbumRef = useRef(false);

  useEffect(() => {
    // When Photo Albums are loaded for the first time
    if (photoAlbums?.length === 0) {
      resetSelectedAlbum();
    } else if (!hasSetSelectedAlbumRef.current && photoAlbums) {
      setSelectedPhotoAlbum({
        photoAlbumId: photoAlbums[0].id,
        photoAlbumIndex: 0,
      });
      hasSetSelectedAlbumRef.current = true;
    }
  }, [photoAlbums]);

  const resetSelectedAlbum = () => {
    hasSetSelectedAlbumRef.current = false;
    setSelectedPhotoAlbum(undefined);
  };

  if (isLoadingSections) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden">
      <h4 className="mb-5 border-b-2 pb-4 font-bold">
        My Albums{' '}
        <span className="text-xs font-normal">
          (Please Add a Minimum of 3 Photos)
        </span>
      </h4>
      <p className="my-5 text-xs">
        Upload your photos. The first image will be used as the cover photo on
        feeds.
      </p>
      {/* TODO: Allow user to update their Photo Album names */}
      <div className="mb-5 overflow-hidden">
        <div className="mb-2 flex justify-end">
          <CreateAlbumModal createPhotoAlbum={createPhotoAlbum.mutate} />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-nowrap gap-x-4 overflow-x-auto py-1">
            {/* Display All Photo Albums Buttons */}
            {photoAlbums &&
              photoAlbums.map((photoAlbum, index) => (
                <PhotoAlbumButton
                  key={index}
                  photoAlbum={photoAlbum}
                  index={index}
                  selectedPhotoAlbumId={selectedPhotoAlbum?.photoAlbumId}
                  setSelectedPhotoAlbum={setSelectedPhotoAlbum}
                  setUpdatedPhotoAlbumNameId={setUpdatedPhotoAlbumNameId}
                  deletePhotoAlbum={deletePhotoAlbum.mutate}
                  mutateAlbumName={updatePhotoAlbumName.mutate}
                />
              ))}
          </div>
        </div>
      </div>

      {selectedPhotoAlbum && photoAlbums && (
        <PhotoAlbum
          photoAlbumId={selectedPhotoAlbum.photoAlbumId}
          userId={userId}
          isEditing={true}
          setIsEditing={setIsEditing}
        />
      )}
      {!selectedPhotoAlbum && <div>No Photo Albums Available</div>}
    </div>
  );
}
