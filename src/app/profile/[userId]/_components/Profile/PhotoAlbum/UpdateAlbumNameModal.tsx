import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { validateAlbumName } from '@/server/routers/PhotoAlbum/utils';

interface UpdateAlbumNameModalProps {
  photoAlbumName: string;
  photoAlbumId: string;
  setUpdatedPhotoAlbumNameId: (id: string) => void;
  mutateAlbumName: (params: {
    newPhotoAlbumName: string;
    oldPhotoAlbumName: string;
  }) => void;
}

export default function UpdateAlbumNameModal({
  photoAlbumName,
  photoAlbumId,
  setUpdatedPhotoAlbumNameId,
  mutateAlbumName,
}: UpdateAlbumNameModalProps) {
  const updateInputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [updatedPhotoAlbumName, setUpdatedPhotoAlbumName] = useState('');
  const [showCharCount, setShowCharCount] = useState(true);
  const [open, setOpen] = useState(false);

  // Focus on Input Field (when modal opens)
  useEffect(() => {
    updateInputRef.current?.focus();
  }, []);

  // Handle Keyboard Events
  const handleUpdateAlbumKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    oldPhotoAlbumName: string
  ) => {
    if (event.key === 'Enter') {
      handleSave(oldPhotoAlbumName);
    } else if (event.key === 'Escape') {
      setOpen(false);
      resetUpdatingState();
    }
  };

  // Handle Input Change (Immediate UI Update)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUpdatedPhotoAlbumName(value);

    const validation = validateAlbumName(value, photoAlbumName);
    setIsError(!validation.isValid);
    setError(validation.error);
    setShowCharCount(validation.showCharCount);
  };

  // Handle Save Button Click
  const handleSave = (oldPhotoAlbumName: string) => {
    const validation = validateAlbumName(
      updatedPhotoAlbumName,
      oldPhotoAlbumName
    );

    if (!validation.isValid) {
      setIsError(true);
      setError(validation.error);
      setShowCharCount(validation.showCharCount);
      return;
    }
    // Update Photo Album Name via TRPC
    mutateAlbumName({
      newPhotoAlbumName: updatedPhotoAlbumName,
      oldPhotoAlbumName,
    });
    resetUpdatingState();
  };

  // Reset states
  const resetUpdatingState = () => {
    setUpdatedPhotoAlbumName('');
    setUpdatedPhotoAlbumNameId('');
    setIsError(false);
    setError('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Dropdown Menu Item Trigger for Updating Photo Album Name */}
        <DropdownMenuItem
          className="flex w-full cursor-pointer space-x-2 bg-blue-600 text-white focus:bg-blue-600 focus:text-white lg:bg-white lg:text-black"
          aria-label={`Update Name for ${photoAlbumName}`}
          onSelect={(e) => e.preventDefault()}
          tabIndex={0}
          role="menuitem"
          onClick={() => {
            setOpen(true);
            setUpdatedPhotoAlbumNameId(photoAlbumId);
          }}
        >
          <Pencil className="h-4 w-4" />
          <span className="text-xs">Update Name</span>
          <span className="sr-only">Update Name for {photoAlbumName}</span>
        </DropdownMenuItem>
      </DialogTrigger>

      {/* Dialog Content (What's shown to the user) */}
      <DialogContent
        aria-describedby="update-album-name-modal-description"
        className="flex min-h-56 w-11/12 flex-col justify-between"
      >
        <DialogHeader>
          <DialogTitle>Updating Name for {photoAlbumName}</DialogTitle>
          <DialogDescription>
            <small>* Name can't be more than 25 characters</small>
          </DialogDescription>
        </DialogHeader>
        {/* Input Field & Close & Save Buttons */}
        <div className="my-auto mt-8 flex flex-col gap-x-2 gap-y-4 self-center sm:mt-auto sm:flex-row sm:gap-y-0">
          {/* Photo Album Name Input Field */}
          <div className="relative flex flex-col">
            <Input
              ref={updateInputRef}
              className={`h-9 w-full rounded-lg border ${
                isError ? 'border-red-500' : 'border-gray-400'
              } bg-profile_button_bg px-2 text-left text-xs placeholder-slate-400`}
              type="text"
              placeholder="Enter Album Name"
              value={updatedPhotoAlbumName}
              onKeyDown={(event) => {
                handleUpdateAlbumKeyDown(event, photoAlbumName);
              }}
              onChange={(e) => {
                handleInputChange(e);
                setUpdatedPhotoAlbumName(e.target.value);
              }}
            />
            <span
              className={`absolute -top-5 text-xs sm:-bottom-5 sm:top-auto ${
                isError ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {showCharCount
                ? `${updatedPhotoAlbumName.length}/25 characters`
                : error}
            </span>
          </div>

          {/* Close & Save Buttons */}
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={resetUpdatingState}
              aria-label="Close the modal without saving"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleSave(photoAlbumName)}
            disabled={isError}
            type="button"
            variant={'outline'}
            aria-label="Save the new photo album name"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
