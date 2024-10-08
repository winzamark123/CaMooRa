import { MosaicWindowContext, MosaicContext } from 'react-mosaic-component';
import { useContext } from 'react';
import { X } from 'lucide-react';

export default function RemoveButton() {
  const { mosaicWindowActions } = useContext(MosaicWindowContext);
  const { mosaicActions } = useContext(MosaicContext);

  const remove = () => {
    const path = mosaicWindowActions.getPath();
    mosaicActions.remove(path);
  };

  return (
    <button
      onClick={remove}
      title="Close Window"
      className="mosaic-default-control rounded p-2 hover:bg-gray-200"
    >
      <X />
    </button>
  );
}
