import { Mosaic, MosaicNode, getLeaves } from 'react-mosaic-component';
import { useState } from 'react';
import 'react-mosaic-component/react-mosaic-component.css';

export default function EditGallery() {
  type ViewId = 'a' | 'b' | 'c' | 'new';

  const TITLE_MAP: Record<ViewId, string> = {
    a: 'Left Window',
    b: 'Top Right Window',
    c: 'Bottom Right Window',
    new: 'New Window',
  };

  const INITIAL_LAYOUT: MosaicNode<ViewId> = {
    direction: 'row',
    first: 'a',
    second: {
      direction: 'column',
      first: 'b',
      second: 'c',
    },
  };
  const [currentNode, setCurrentNode] = useState<MosaicNode<ViewId> | null>(
    INITIAL_LAYOUT
  );
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  const onChange = (newNode: MosaicNode<ViewId> | null) => {
    setCurrentNode(newNode);
    // Optionally, save the layout to localStorage or send to an API
  };

  const onRelease = (newNode: MosaicNode<ViewId> | null) => {
    console.log('Mosaic layout released:', newNode);
    // Save the layout to localStorage or send to an API
  };

  const totalWindowCount = getLeaves(currentNode).length;

  return (
    <div className={`edit-gallery ${currentTheme}`}>
      <Mosaic<ViewId>
        renderTile={(id, path) => (
          <MosaicWindowComponent
            id={id}
            path={path}
            title={TITLE_MAP[id]}
            totalWindowCount={totalWindowCount}
          />
        )}
        value={currentNode}
        onChange={onChange}
        onRelease={onRelease}
        className={`mosaic-container ${currentTheme}`}
      />
    </div>
  );
}
