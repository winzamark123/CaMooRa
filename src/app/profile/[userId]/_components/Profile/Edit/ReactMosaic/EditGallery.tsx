import { Mosaic, MosaicNode } from 'react-mosaic-component';
import { useState, useRef } from 'react';
import MosaicWindowComponent from './MosaicWindowComponent';
import 'react-mosaic-component/react-mosaic-component.css';
import { trpc } from '@/lib/trpc/client';

interface EditGalleryProps {
  clerkId: string;
  photoAlbumId: string;
  initialLayout: MosaicNode<number>;
}
export default function EditGallery({
  clerkId,
  photoAlbumId,
  initialLayout,
}: EditGalleryProps) {
  const [currentNode, setCurrentNode] = useState<MosaicNode<number> | null>(
    initialLayout
  );
  const nextIdRef = useRef(4); // Starting from 4

  const editLayout = trpc.photoAlbum.editPhotoAlbumLayout.useMutation({
    onSuccess: () => {
      console.log('Gallery layout updated successfully');
    },
    onError: (err) => {
      console.error('Error updating Gallery layout', err);
    },
  });

  type ViewId = number;

  const TITLE_MAP: Record<ViewId, string> = {
    1: 'Left Window',
    2: 'Top Right Window',
    3: 'Bottom Right Window',
  };

  const incrementNextId = () => {
    const newId = nextIdRef.current++;
    TITLE_MAP[newId] = `Window_${newId}`;
    return newId;
  };

  const onChange = (newNode: MosaicNode<ViewId> | null) => {
    setCurrentNode(newNode);
  };

  const onRelease = (newNode: MosaicNode<ViewId> | null) => {
    console.log('Mosaic layout released:', newNode);

    if (!newNode) {
      return;
    }

    //save the layout to db
    //might make a save button to save the layout instead of mutating the db too
    editLayout.mutate({
      clerkId: clerkId,
      photoAlbumId: photoAlbumId,
      layout: newNode,
    });
  };

  return (
    <div className="h-full w-full ">
      <Mosaic<ViewId>
        renderTile={(id, path) => (
          <MosaicWindowComponent
            id={id}
            path={path}
            title={TITLE_MAP[id]}
            incrementNextId={incrementNextId}
          />
        )}
        value={currentNode}
        onChange={onChange}
        onRelease={onRelease}
        className="h-64 w-full border border-black"
      />
    </div>
  );
}
