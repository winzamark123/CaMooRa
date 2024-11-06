// import EditPhotoAlbum from './EditPhotoAlbum';
import PhotoAlbum from '../PhotoAlbum/PhotoAlbum';
import { trpc } from '@/lib/trpc/client';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { SelectedPhotoAlbumProps } from '../Projects';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Trash2, Pencil } from 'lucide-react';

interface EditProjectSectionProps {
  clerkId: string;
}

export default function EditProjectSection({
  clerkId,
}: EditProjectSectionProps) {
  // State and Refs
  const [newPhotoAlbumName, setNewPhotoAlbumName] = useState('');
  const [isCreatingPhotoAlbum, setIsCreatingPhotoAlbum] = useState(false);
  const [selectedPhotoAlbum, setSelectedPhotoAlbum] =
    useState<SelectedPhotoAlbumProps>();
  const hasSetSelectedAlbumRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // TRPC Queries and Mutations
  const {
    data: photoAlbums,
    isLoading: isLoadingSections,
    refetch: refetchPhotoAlbums,
  } = trpc.photoAlbum.getAllPhotoAlbums.useQuery({ clerkId });

  const createPhotoAlbum = trpc.photoAlbum.createPhotoAlbum.useMutation({
    onSuccess: () => {
      console.log('Photo Album created successfully');
      refetchPhotoAlbums();
    },
    onError: (err) => {
      console.error('Error creating Photo Album', err);
    },
  });

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

  // Utility Functions
  const resetCreatingState = () => {
    setIsCreatingPhotoAlbum(false);
    setNewPhotoAlbumName('');
  };

  const resetSelectedAlbum = () => {
    hasSetSelectedAlbumRef.current = false;
    setSelectedPhotoAlbum(undefined);
  };

  // When Photo Albums are loaded
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
  }, [photoAlbums]);

  // Focus on input when creating a new photo album (Accessibility)
  useEffect(() => {
    if (isCreatingPhotoAlbum && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreatingPhotoAlbum]);

  // Event Handlers
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createPhotoAlbum.mutate({ photoAlbumName: newPhotoAlbumName });
      resetCreatingState();
    } else if (event.key === 'Escape') {
      resetCreatingState();
    }
  };

  const handleDeletePhotoAlbum = (photoAlbumName: string) => {
    deletePhotoAlbum.mutate({ photoAlbumName });
  };

  // Render
  if (isLoadingSections) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <div className="mb-5 flex flex-row flex-wrap gap-x-4">
        {/* Display All Photo Albums Buttons */}
        {photoAlbums &&
          photoAlbums.map((photoAlbum, index) => (
            <div key={photoAlbum.id} className="flex">
              <Button
                className={` h-9 w-32 rounded-none rounded-l-lg border-y border-l border-gray-400 bg-primary_blue p-2 text-white hover:contrast-75  active:contrast-75 ${
                  selectedPhotoAlbum?.photoAlbumId === photoAlbum.id
                    ? 'bg-[#56647E]'
                    : ''
                }`}
                aria-label={`Photo Album ${photoAlbum.photoAlbumName} (${photoAlbum.Images.length} Images)`}
                onClick={() =>
                  setSelectedPhotoAlbum({
                    photoAlbumId: photoAlbum.id,
                    photoAlbumIndex: index,
                  })
                }
              >
                <span className="text-xs ">{photoAlbum.photoAlbumName}</span>
                <span className="sr-only">{`Photo Album ${photoAlbum.photoAlbumName} (${photoAlbum.Images.length} Images)`}</span>
              </Button>
              <DropdownMenu>
                {/* Edit Button (Open Pop-Up) */}
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    className="h-9 rounded-none rounded-r-lg border-y border-r border-gray-400 bg-[#C2C4C6] hover:bg-[#C2C4C6] "
                    aria-label={`Toggle Menu for ${photoAlbum.photoAlbumName}`}
                  >
                    <Pencil color="rgb(1,60,90)" className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-1">
                  {/* Delete Album Button */}
                  <DropdownMenuItem asChild>
                    <Button
                      onClick={() => {
                        handleDeletePhotoAlbum(photoAlbum.photoAlbumName);
                      }}
                      className="flex w-full cursor-pointer space-x-2 bg-white text-black focus:bg-red-600  focus:text-white"
                      aria-label={`Delete ${photoAlbum.photoAlbumName}`}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-xs">Delete Album</span>
                      <span className="sr-only">
                        Delete {photoAlbum.photoAlbumName}
                      </span>
                    </Button>
                  </DropdownMenuItem>
                  {/* Update Album Name Button */}
                  <DropdownMenuItem asChild>
                    <Button
                      className="flex w-full cursor-pointer space-x-2 bg-white text-black focus:bg-blue-600 focus:text-white"
                      aria-label={`Update Name for ${photoAlbum.photoAlbumName}`}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="text-xs">Update Name</span>
                      <span className="sr-only">
                        Update Name for {photoAlbum.photoAlbumName}
                      </span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
          className="rounded-lg border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue  focus:text-white"
          aria-label="Create a New Photo Album"
          onClick={() => {
            setIsCreatingPhotoAlbum(true);
          }}
        >
          +
        </Button>
        {/* TODO: Add functionality to Preview button */}
        <Button className="ml-auto w-32 border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue  focus:text-white">
          Preview
        </Button>
      </div>

      {selectedPhotoAlbum && photoAlbums && (
        // <EditPhotoAlbum
        //   images={photoAlbums[selectedPhotoAlbum.photoAlbumIndex].Images || []}
        //   photoAlbumId={selectedPhotoAlbum.photoAlbumId}
        // />
        <PhotoAlbum
          photoAlbumId={selectedPhotoAlbum.photoAlbumId}
          clerkId={clerkId}
          isEditing={true}
        />
      )}
      {!selectedPhotoAlbum && <div>No Photo Albums Available</div>}
    </div>
  );
}
