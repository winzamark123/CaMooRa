import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteAlbumModal from './Delete/DeleteAlbumModal';
import UpdateAlbumNameModal from './Update/UpdateAlbumNameModal';
import { Pencil } from 'lucide-react';
import { SelectedPhotoAlbumProps } from '../Projects';

interface PhotoAlbumButtonProps {
  photoAlbum: {
    id: string;
    photoAlbumName: string;
    Images: any[];
  };
  index: number;
  selectedPhotoAlbum: SelectedPhotoAlbumProps;
  setSelectedPhotoAlbum: (props: SelectedPhotoAlbumProps) => void;
  refetchPhotoAlbums: () => Promise<any>;
  resetSelectedAlbum: () => void;
  userId: string;
}

export default function PhotoAlbumButton({
  photoAlbum,
  index,
  selectedPhotoAlbum,
  setSelectedPhotoAlbum,
  userId,
  refetchPhotoAlbums,
  resetSelectedAlbum,
}: PhotoAlbumButtonProps) {
  return (
    <div className="flex shrink-0">
      <Button
        className={`h-9 w-32 rounded-none rounded-l-lg border-y border-l border-gray-400 bg-primary_blue p-2 text-white hover:contrast-75 active:contrast-75 ${
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
        <span className="truncate text-xs">{photoAlbum.photoAlbumName}</span>
        <span className="sr-only">{`Photo Album ${photoAlbum.photoAlbumName} (${photoAlbum.Images.length} Images)`}</span>
      </Button>
      <DropdownMenu>
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
        {/* TODO: Fix accessibility issues (If user clicks "Escape" to leave the modal, it leaves the modal, but then the user can't click on anything else) */}
        <DropdownMenuContent className="space-y-1">
          <DeleteAlbumModal
            photoAlbumName={photoAlbum.photoAlbumName}
            refetchPhotoAlbums={refetchPhotoAlbums}
            resetSelectedAlbum={resetSelectedAlbum}
            setSelectedPhotoAlbum={setSelectedPhotoAlbum}
            selectedPhotoAlbum={selectedPhotoAlbum}
          />
          <UpdateAlbumNameModal
            photoAlbumName={photoAlbum.photoAlbumName}
            photoAlbumId={photoAlbum.id}
            userId={userId}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
