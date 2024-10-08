import { MosaicWindow, MosaicBranch } from 'react-mosaic-component';
import CustomSplitButton from './CustomButtons/SplitButton';
import CustomRemoveButton from './CustomButtons/RemoveButton';

interface MosaicWindowComponentProps {
  id: number;
  path: MosaicBranch[];
  title: string;
  incrementNextId: () => number;
}

export default function MosaicWindowComponent({
  path,
  title,
  incrementNextId,
}: MosaicWindowComponentProps) {
  const createNode = () => {
    // Generate a unique ID for the new window
    const newId = incrementNextId();
    // Optionally update your title map or state
    return newId;
  };

  const renderToolbar = () => (
    <div className="flex w-full justify-between gap-2 border border-blue-200">
      <CustomSplitButton createNode={createNode} />
      <CustomRemoveButton />
    </div>
  );

  return (
    <MosaicWindow<number>
      path={path}
      title={title}
      createNode={createNode}
      renderToolbar={renderToolbar}
      draggable={true}
    >
      {/* Window content */}
      <div className="h-full w-full border border-blue-300">
        <h1>{title}</h1>
        {/* Additional content based on window ID */}
      </div>
    </MosaicWindow>
  );
}
