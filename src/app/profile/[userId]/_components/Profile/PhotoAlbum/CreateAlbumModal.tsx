import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { validateAlbumName } from '@/server/routers/PhotoAlbum/utils';

interface CreateAlbumModalProps {
  createPhotoAlbum: (params: { photoAlbumName: string }) => void;
}

export default function CreateAlbumModal({
  createPhotoAlbum,
}: CreateAlbumModalProps) {
  const [newPhotoAlbumName, setNewPhotoAlbumName] = useState('');
  const createInputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [showCharCount, setShowCharCount] = useState(true);
  const [open, setOpen] = useState(false);

  // Focus on input when creating a new photo album (Accessibility)
  useEffect(() => {
    createInputRef.current?.focus();
  }, []);

  const handleCreateAlbumKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      setOpen(false);
      resetCreatingState();
    }
  };

  // Handle Input Change (Immediate UI Update)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPhotoAlbumName(value);

    const validation = validateAlbumName(value);
    setIsError(!validation.isValid);
    setError(validation.error);
    setShowCharCount(validation.showCharCount);
  };

  // Handle Save Button Click
  const handleSave = () => {
    const validation = validateAlbumName(newPhotoAlbumName);

    if (!validation.isValid) {
      setIsError(true);
      setError(validation.error);
      setShowCharCount(validation.showCharCount);
      return;
    }
    // Create Photo Album via TRPC
    handleCreateNewAlbum();
  };

  const handleCreateNewAlbum = () => {
    createPhotoAlbum({ photoAlbumName: newPhotoAlbumName });
    resetCreatingState();
  };

  const resetCreatingState = () => {
    setNewPhotoAlbumName('');
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="shrink-0 rounded-lg border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue  focus:text-white"
          aria-label="Create a New Photo Album"
          onSelect={(e) => e.preventDefault()}
          tabIndex={0}
          role="menuitem"
          onClick={() => {
            setOpen(true);
          }}
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="create-album-modal-description"
        className="flex min-h-56 w-11/12 flex-col justify-between"
      >
        <DialogHeader>
          <DialogTitle>Creating a New Photo Album</DialogTitle>
          <DialogDescription>
            <small>* Name can't be more than 25 characters</small>
          </DialogDescription>
        </DialogHeader>
        {/* Input Field & Close & Save Buttons */}
        <div className="my-auto mt-8 flex flex-col gap-x-2 gap-y-4 self-center sm:mt-auto sm:flex-row sm:gap-y-0">
          {/* Photo Album Name Input Field */}
          <div className="relative flex flex-col">
            <Input
              ref={createInputRef}
              className={`h-9 w-full rounded-lg border ${
                isError ? 'border-red-500' : 'border-gray-400'
              } bg-profile_button_bg px-2 text-left text-xs placeholder-slate-400`}
              type="text"
              placeholder="Enter Album Name"
              title="Please enter a name for you new photo album"
              value={newPhotoAlbumName}
              onKeyDown={(event) => {
                handleCreateAlbumKeyDown(event);
              }}
              onChange={(e) => {
                setNewPhotoAlbumName(e.target.value);
                handleInputChange(e);
              }}
            />
            <span
              className={`absolute -top-5 text-xs sm:-bottom-5 sm:top-auto ${
                isError ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {showCharCount
                ? `${newPhotoAlbumName.length}/25 characters`
                : error}
            </span>
          </div>

          {/* Close & Save Buttons */}
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={resetCreatingState}
              aria-label="Cancel creating a new photo album"
              title="Cancel"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={isError}
            type="button"
            variant={'outline'}
            title="Create the new photo album with the name entered in the input field"
            aria-label="Create the new photo album"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
{
  /* <div className="shrink-0">
  <input
    ref={createInputRef}
    id="add-photo-album-name"
    className="h-9 rounded-full border-2 border-blue-700 bg-profile_button_bg text-center text-xs placeholder-slate-400"
    type="text"
    placeholder="Enter Album Name"
    title="Please enter a name for you new photo album"
    onKeyDown={handleCreateAlbumKeyDown}
    value={newPhotoAlbumName}
    onChange={(e) => setNewPhotoAlbumName(e.target.value)}
  />
  <Button
    className="h-9 w-9 rounded-lg border border-gray-400"
    onClick={resetCreatingState}
    title="Cancel"
    aria-label="Cancel creating a new photo album"
  >
    ✕
  </Button>
  <Button
    className="h-9 w-9 rounded-lg bg-primary_blue text-white"
    onClick={handleCreateNewAlbum}
    title="Save"
    aria-label="Save the new photo album with the name entered in the input field"
  >
    ✓
  </Button>
</div>; */
}
