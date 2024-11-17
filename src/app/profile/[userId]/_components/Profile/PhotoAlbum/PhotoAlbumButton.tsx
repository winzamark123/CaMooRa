import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteAlbumModal from './DeleteAlbumModal';
import UpdateAlbumNameModal from './UpdateAlbumNameModal';
import { Pencil } from 'lucide-react';

interface PhotoAlbumButtonProps {
  photoAlbum: {
    id: string;
    photoAlbumName: string;
    Images: any[];
  };
  index: number;
  selectedPhotoAlbumId?: string;
  setSelectedPhotoAlbum: (props: {
    photoAlbumId: string;
    photoAlbumIndex: number;
  }) => void;
  setUpdatedPhotoAlbumNameId: (id: string) => void;
  deletePhotoAlbum: (params: { photoAlbumName: string }) => void;
  mutateAlbumName: (params: {
    newPhotoAlbumName: string;
    oldPhotoAlbumName: string;
  }) => void;
}

export default function PhotoAlbumButton({
  photoAlbum,
  index,
  selectedPhotoAlbumId,
  setSelectedPhotoAlbum,
  setUpdatedPhotoAlbumNameId,
  deletePhotoAlbum,
  mutateAlbumName,
}: PhotoAlbumButtonProps) {
  return (
    <div className="flex shrink-0">
      <Button
        className={`h-9 w-32 rounded-none rounded-l-lg border-y border-l border-gray-400 bg-primary_blue p-2 text-white hover:contrast-75 active:contrast-75 ${
          selectedPhotoAlbumId === photoAlbum.id ? 'bg-[#56647E]' : ''
        }`}
        aria-label={`Photo Album ${photoAlbum.photoAlbumName} (${photoAlbum.Images.length} Images)`}
        onClick={() =>
          setSelectedPhotoAlbum({
            photoAlbumId: photoAlbum.id,
            photoAlbumIndex: index,
          })
        }
      >
        <span className="text-xs">{photoAlbum.photoAlbumName}</span>
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
        <DropdownMenuContent className="space-y-1">
          <DeleteAlbumModal
            photoAlbumName={photoAlbum.photoAlbumName}
            deletePhotoAlbum={deletePhotoAlbum}
          />
          <UpdateAlbumNameModal
            setUpdatedPhotoAlbumNameId={setUpdatedPhotoAlbumNameId}
            photoAlbumName={photoAlbum.photoAlbumName}
            photoAlbumId={photoAlbum.id}
            mutateAlbumName={mutateAlbumName}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
