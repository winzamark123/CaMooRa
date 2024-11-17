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
import { useAlbumUpdate } from './useAlbumUpdate';

interface UpdateAlbumNameModalProps {
  photoAlbumName: string;
  photoAlbumId: string;
  userId: string;
}

export default function UpdateAlbumNameModal({
  photoAlbumName,
  photoAlbumId,
  userId,
}: UpdateAlbumNameModalProps) {
  const updateInputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [showCharCount, setShowCharCount] = useState(true);
  const [open, setOpen] = useState(false);
  const [updatedPhotoAlbumName, setUpdatedPhotoAlbumName] = useState('');

  // TRPC Hook for Updating Photo Album Name
  const { mutateAlbumName, setUpdatedPhotoAlbumNameId } = useAlbumUpdate({
    userId,
  });

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

  // Handle Input Change (Immediate UI validation)
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

    // If Validation Fails, show error
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
          <div className="relative flex flex-col space-y-1">
            <span
              className={`text-xs ${
                isError ? 'text-red-500' : 'text-gray-500'
              } w-[240px] break-words`}
            >
              {showCharCount
                ? `${updatedPhotoAlbumName.length}/25 characters`
                : error}
            </span>
            <Input
              ref={updateInputRef}
              className={`h-9 w-[240px] rounded-lg border ${
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
          </div>

          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={resetUpdatingState}
              aria-label="Close the modal without saving"
              className="h-9 sm:self-end "
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
            className="h-9 sm:self-end"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
