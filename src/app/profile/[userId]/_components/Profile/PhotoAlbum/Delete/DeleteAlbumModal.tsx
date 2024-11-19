import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SelectedPhotoAlbumProps } from '../../Projects';
import { useAlbumDelete } from './useAlbumDelete';

interface DeleteAlbumModalProps {
  photoAlbumName: string;
  // deletePhotoAlbum: (params: { photoAlbumName: string }) => void;
  refetchPhotoAlbums: () => Promise<{ data: any[] }>;
  resetSelectedAlbum: () => void;
  setSelectedPhotoAlbum: (props: SelectedPhotoAlbumProps) => void;
  selectedPhotoAlbum: SelectedPhotoAlbumProps;
}

export default function DeleteAlbumModal({
  photoAlbumName,
  refetchPhotoAlbums,
  resetSelectedAlbum,
  setSelectedPhotoAlbum,
  selectedPhotoAlbum,
  // deletePhotoAlbum,
}: DeleteAlbumModalProps) {
  const [open, setOpen] = useState(false);

  // TRPC Mutation Hook
  const { deletePhotoAlbum } = useAlbumDelete({
    refetchPhotoAlbums,
    resetSelectedAlbum,
    setSelectedPhotoAlbum,
    selectedPhotoAlbum,
  });

  const handleDeletePhotoAlbum = (photoAlbumName: string) => {
    deletePhotoAlbum({ photoAlbumName });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex w-full cursor-pointer space-x-2 bg-red-600 text-white focus:bg-red-600 focus:text-white lg:bg-white lg:text-black"
          aria-label={`Delete ${photoAlbumName}`}
          onSelect={(e) => e.preventDefault()}
          tabIndex={0}
          role="menuitem"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span className="text-xs">Delete Album</span>
          <span className="sr-only">Delete {photoAlbumName}</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent
        aria-describedby="delete-album-modal-description"
        className="flex min-h-56 w-11/12 flex-col justify-between"
      >
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete the {photoAlbumName} Album?
          </DialogTitle>
        </DialogHeader>

        {/* Close & Save Buttons */}
        <div className="my-auto mt-8 flex flex-col gap-x-2 gap-y-4 self-center sm:mt-auto sm:flex-row sm:gap-y-0">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
              aria-label="Cancel deleting a photo album"
              title="Cancel"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleDeletePhotoAlbum(photoAlbumName)}
            type="button"
            variant={'outline'}
            title="Delete the photo album"
            aria-label="Delete the photo album"
            className="bg-red-600 text-white hover:bg-red-700 hover:text-white"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
