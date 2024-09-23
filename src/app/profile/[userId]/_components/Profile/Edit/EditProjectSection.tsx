import EditPhotoAlbum from './EditPhotoAlbum';
import { trpc } from '@/lib/trpc/client';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { SelectedPhotoAlbumProps } from '../Projects';

interface EditProjectSectionProps {
  clerkId: string;
}

export default function EditProjectSection({
  clerkId,
}: EditProjectSectionProps) {
  const {
    data: photoAlbums,
    isLoading: isLoadingSections,
    refetch: refetchPhotoAlbums,
  } = trpc.photoAlbum.getAllPhotoAlbums.useQuery({
    clerkId,
  });

  const createPhotoAlbum = trpc.photoAlbum.createPhotoAlbum.useMutation({
    onSuccess: () => {
      console.log('Photo Album created successfully');
      refetchPhotoAlbums();
    },
    onError: (err) => {
      console.error('Error creating Photo Album', err);
    },
  });

  const [newPhotoAlbumName, setNewPhotoAlbumName] = useState('');
  const [isCreatingPhotoAlbum, setIsCreatingPhotoAlbum] = useState(false);
  const [selectedPhotoAlbum, setSelectedPhotoAlbum] =
    useState<SelectedPhotoAlbumProps>();

  // Set the first Photo Album as the selected Photo Album
  useEffect(() => {
    if (photoAlbums) {
      setSelectedPhotoAlbum({
        photoAlbumId: photoAlbums[0].id,
        photoAlbumIndex: 0,
      });
    }
  }, [photoAlbums]);

  // Focus on the input field when creating a new Photo Album (Better accessibility)
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isCreatingPhotoAlbum && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreatingPhotoAlbum]);

  // Handle Enter and Escape key presses for the input field when creating a new Photo Album
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createPhotoAlbum.mutate({ photoAlbumName: newPhotoAlbumName });
      setIsCreatingPhotoAlbum(false);
    } else if (event.key === 'Escape') {
      setIsCreatingPhotoAlbum(false);
    }
  };

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
      <div className="flex flex-row flex-wrap gap-x-4">
        {/* Display All Photo Albums Buttons */}
        {photoAlbums &&
          photoAlbums.map((photoAlbum, index) => (
            <Button
              key={photoAlbum.id}
              className="rounded-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
              style={
                selectedPhotoAlbum?.photoAlbumId === photoAlbum.id
                  ? { backgroundColor: '#013C5A', color: 'white' }
                  : {}
              }
              aria-label={`Photo Album ${photoAlbum.photoAlbumName} (${photoAlbum.Images.length} Images)`}
              onClick={() =>
                setSelectedPhotoAlbum({
                  photoAlbumId: photoAlbum.id,
                  photoAlbumIndex: index,
                })
              }
            >
              <p>
                {photoAlbum.photoAlbumName} ({photoAlbum.Images.length})
              </p>
            </Button>
          ))}
        {isCreatingPhotoAlbum && (
          <>
            <input
              ref={inputRef}
              id="add-photo-album-name"
              className="rounded-full border-2 border-blue-700 bg-profile_button_bg text-center text-xs placeholder-slate-400"
              type="text"
              placeholder="Enter Album Name"
              title="Please enter a name for you new photo album"
              onKeyDown={handleKeyDown}
              value={newPhotoAlbumName}
              onChange={(e) => setNewPhotoAlbumName(e.target.value)}
            />
          </>
        )}
        <Button
          className="rounded-full"
          aria-label="Create a New Photo Album"
          onClick={() => {
            setIsCreatingPhotoAlbum(true);
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
