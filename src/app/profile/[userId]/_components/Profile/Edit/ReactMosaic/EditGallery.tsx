import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
interface ExampleWindowProps {
  count: number;
  path: MosaicBranch[];
  totalWindowCount: number;
}

export default function EditGallery() {
  type ViewId = 'a' | 'b' | 'c' | 'new';

  const TITLE_MAP: Record<ViewId, string> = {
    a: 'Left Window',
    b: 'Top Right Window',
    c: 'Bottom Right Window',
    new: 'New Window',
  };

  return (
    <Mosaic<ViewId>
      renderTile={(id, path) => (
        <MosaicWindow<number> path={path} title={TITLE_MAP[id]} toolbarControls>
          <h1>{TITLE_MAP[id]}</h1>
        </MosaicWindow>
      )}
      initialValue={{
        direction: 'row',
        first: 'a',
        second: {
          direction: 'column',
          first: 'b',
          second: 'c',
        },
      }}
    />
  );
}
