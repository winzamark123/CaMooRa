// import EditPhotoAlbum from './EditPhotoAlbum';
import PhotoAlbum from '../PhotoAlbum/PhotoAlbum';
import { trpc } from '@/lib/trpc/client';
import { useEffect, useState, useRef } from 'react';
import { SelectedPhotoAlbumProps } from '../Projects';
import PhotoAlbumButton from '../PhotoAlbum/PhotoAlbumButton';
import CreateAlbumModal from '../PhotoAlbum/Create/CreateAlbumModal';

interface EditPhotoAlbumSectionProps {
  userId: string;
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditPhotoAlbumSection({
  userId,
  setIsEditing,
}: EditPhotoAlbumSectionProps) {
  // Get all Photo Albums for the User
  const {
    data: photoAlbums,
    isLoading: isLoadingSections,
    refetch: refetchPhotoAlbums,
  } = trpc.photoAlbum.getAllPhotoAlbums.useQuery({ userId });

  // Selected Album State and Refs

  const defaultSelectedAlbum = { photoAlbumId: '', photoAlbumIndex: 0 };
  const [selectedPhotoAlbum, setSelectedPhotoAlbum] =
    useState<SelectedPhotoAlbumProps>(defaultSelectedAlbum);
  const hasSetSelectedAlbumRef = useRef(false);

  // When Photo Albums are loaded for the first time
  useEffect(() => {
    if (photoAlbums?.length === 0) {
      resetSelectedAlbum();
    } else if (!hasSetSelectedAlbumRef.current && photoAlbums) {
      setSelectedPhotoAlbum({
        photoAlbumId: photoAlbums[0].id,
        photoAlbumIndex: 0,
      });
      hasSetSelectedAlbumRef.current = true;
    }
    console.log('Selected Album', selectedPhotoAlbum);
  }, [photoAlbums]);

  const resetSelectedAlbum = () => {
    hasSetSelectedAlbumRef.current = false;
    setSelectedPhotoAlbum(defaultSelectedAlbum);
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

      {/* Display Photo Albums */}
      <div className="mb-5 overflow-hidden">
        <div className="mb-2 flex justify-end">
          <CreateAlbumModal refetchPhotoAlbums={refetchPhotoAlbums} />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-nowrap gap-x-4 overflow-x-auto py-1">
            {/* Display All Photo Albums Buttons */}
            {photoAlbums &&
              photoAlbums.map((photoAlbum, index) => (
                <PhotoAlbumButton
                  key={photoAlbum.id}
                  photoAlbum={photoAlbum}
                  index={index}
                  selectedPhotoAlbum={
                    selectedPhotoAlbum as SelectedPhotoAlbumProps
                  }
                  setSelectedPhotoAlbum={setSelectedPhotoAlbum}
                  userId={userId}
                  refetchPhotoAlbums={refetchPhotoAlbums}
                  resetSelectedAlbum={resetSelectedAlbum}
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
