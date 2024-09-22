import EditPhotoAlbum from './EditPhotoAlbum';
import { trpc } from '@/lib/trpc/client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SelectedPhotoAlbumProps } from '../Projects';

interface EditProjectSectionProps {
  clerkId: string;
}

export default function EditProjectSection({
  clerkId,
}: EditProjectSectionProps) {
  const { data: photoAlbums, isLoading: isLoadingSections } =
    trpc.photoAlbum.getAllPhotoAlbums.useQuery({
      clerkId,
    });

  const createPhotoAlbum = trpc.photoAlbum.createPhotoAlbum.useMutation({
    onSuccess: () => {
      console.log('Photo Album created successfully');
    },
    onError: (err) => {
      console.error('Error creating Photo Album', err);
    },
  });

  const [selectedPhotoAlbum, setSelectedPhotoAlbum] =
    useState<SelectedPhotoAlbumProps>();
  useEffect(() => {
    if (photoAlbums) {
      setSelectedPhotoAlbum({
        photoAlbumId: photoAlbums[0].id,
        photoAlbumIndex: 0,
      });
    }
  }, [photoAlbums]);

  if (isLoadingSections) {
    return <div>Loading Images...</div>;
  }

  return (
    <div>
      <h4 className="mb-5 border-b-2 pb-4 font-bold">
        Your Projects{' '}
        <span className="text-xs font-normal">
          (Please Add a Minimum of 3 Photos)
        </span>
      </h4>
      {/* TODO: Allow user to update their Photo Album names */}
      <div className="flex flex-row gap-x-4">
        {/* Display All Photo Albums */}
        {photoAlbums &&
          photoAlbums.map((photoAlbum, index) => (
            <Button
              key={photoAlbum.id}
              className="rounded-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
              aria-label={`Photo Album ${photoAlbum.photoAlbumName}`}
              onClick={() =>
                setSelectedPhotoAlbum({
                  photoAlbumId: photoAlbum.id,
                  photoAlbumIndex: index,
                })
              }
            >
              <p>{photoAlbum.photoAlbumName}</p>
            </Button>
          ))}
        <Button
          className="rounded-full"
          aria-label="Create a New Photo Album"
          onClick={() => {
            // User is allowed to create a new Photo Album
            // TODO: Allow users to name their Photo Albums
            photoAlbums &&
              createPhotoAlbum.mutate({
                photoAlbumName: `New Photo Album ${photoAlbums.length + 1}`,
              });
          }}
        >
          +
        </Button>
      </div>
      <p className="my-5 text-xs">Click to Add Photos</p>

      {selectedPhotoAlbum && (
        <EditPhotoAlbum
          images={
            (photoAlbums &&
              photoAlbums[selectedPhotoAlbum.photoAlbumIndex].Images) ||
            []
          }
          photoAlbumId={selectedPhotoAlbum.photoAlbumId}
        />
      )}
    </div>
  );
}