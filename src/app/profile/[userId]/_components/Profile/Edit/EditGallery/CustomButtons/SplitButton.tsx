import { useContext } from 'react';
import { MosaicWindowContext } from 'react-mosaic-component';
import { Columns } from 'lucide-react';

interface SplitButtonProps {
  createNode: () => any;
}

export default function SplitButton({ createNode }: SplitButtonProps) {
  const { mosaicWindowActions } = useContext(MosaicWindowContext);

  if (!createNode) {
    return null;
  }

  const split = () => {
    mosaicWindowActions.split(createNode());
  };

  return (
    <button
      onClick={split}
      title="Split Window"
      className="mosaic-default-control rounded p-2 hover:bg-gray-200"
    >
      <Columns />
    </button>
  );
}
