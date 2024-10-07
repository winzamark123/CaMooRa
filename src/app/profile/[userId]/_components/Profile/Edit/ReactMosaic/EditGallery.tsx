import { Mosaic, MosaicNode } from 'react-mosaic-component';
import { useState, useRef } from 'react';
import MosaicWindowComponent from './MosaicWindowComponent';
import 'react-mosaic-component/react-mosaic-component.css';

export default function EditGallery() {
  type ViewId = number;

  const TITLE_MAP: Record<ViewId, string> = {
    1: 'Left Window',
    2: 'Top Right Window',
    3: 'Bottom Right Window',
  };

  const INITIAL_LAYOUT: MosaicNode<ViewId> = {
    direction: 'row',
    first: 1,
    second: {
      direction: 'column',
      first: 2,
      second: 3,
    },
  };
  const [currentNode, setCurrentNode] = useState<MosaicNode<ViewId> | null>(
    INITIAL_LAYOUT
  );

  const nextIdRef = useRef(4); // Starting from 4

  const incrementNextId = () => {
    const newId = nextIdRef.current++;
    TITLE_MAP[newId] = `Window ${newId}`;
    return newId;
  };

  const onChange = (newNode: MosaicNode<ViewId> | null) => {
    setCurrentNode(newNode);
    // Optionally, save the layout to localStorage or send to an API
  };

  const onRelease = (newNode: MosaicNode<ViewId> | null) => {
    console.log('Mosaic layout released:', newNode);
    // Save the layout to localStorage or send to an API
  };

  return (
    <div className="h-full w-full border border-red-300">
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
