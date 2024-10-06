import { MosaicWindow, MosaicBranch } from 'react-mosaic-component';

interface MosaicWindowComponentProps {
  id: string;
  path: MosaicBranch[];
  title: string;
  totalWindowCount: number;
}

export default function MosaicWindowComponent({
  id,
  path,
  title,
  totalWindowCount,
}: MosaicWindowComponentProps) {
  return <main>MosaicWindowComponent</main>;
}
