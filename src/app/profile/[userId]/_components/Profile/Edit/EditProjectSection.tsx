import EditPhotoAlbum from './EditPhotoAlbum';
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
import { MoreHorizontal, Trash2, Pencil } from 'lucide-react';

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
            <div key={photoAlbum.id} className="flex items-stretch">
              <Button
                className="rounded-l-full border-y border-l border-gray-400 bg-profile_button_bg text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
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
                <span className="text-xs ">
                  {photoAlbum.photoAlbumName} ({photoAlbum.Images.length}){' '}
                </span>
                <span className="sr-only">{`Photo Album ${photoAlbum.photoAlbumName} (${photoAlbum.Images.length} Images)`}</span>
              </Button>
              <DropdownMenu>
                {/* Ellipsis Button (Open Pop-Up) */}
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    className="rounded-r-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white active:bg-primary_blue active:text-white"
                    aria-label={`Options for ${photoAlbum.photoAlbumName}`}
                  >
                    <MoreHorizontal className="h-4 w-4" />
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
                      className="flex w-full cursor-pointer space-x-2 bg-red-600 focus:bg-red-800 focus:text-slate-200"
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
                      className="flex w-full cursor-pointer space-x-2 bg-blue-600 focus:bg-blue-800 focus:text-slate-200"
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

      {selectedPhotoAlbum && photoAlbums && (
        <EditPhotoAlbum
          images={photoAlbums[selectedPhotoAlbum.photoAlbumIndex].Images || []}
          photoAlbumId={selectedPhotoAlbum.photoAlbumId}
        />
      )}
      {!selectedPhotoAlbum && <div>No Photo Albums Available</div>}
    </div>
  );
}
