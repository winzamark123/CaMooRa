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
    trpc.images.getAllPhotoAlbums.useQuery({
      clerkId,
    });

  const [selectedPhotoAlbum, setSelectedPhotoAlbum] =
    useState<SelectedPhotoAlbumProps>();
  useEffect(() => {
    if (photoAlbums) {
      // console.log("It's rendering");
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
      <div className="flex flex-row gap-x-4">
        {photoAlbums &&
          photoAlbums.map((photoAlbum, index) => (
            <Button
              key={photoAlbum.id}
              className="rounded-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
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
        {/* TODO: Finish allowing user to add more Photo Albums */}
        <Button className="rounded-full">+</Button>
      </div>
      <p className="my-5 text-xs">Click to Add Photos</p>

      {selectedPhotoAlbum && (
        <EditPhotoAlbum
          photoAlbum={
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
