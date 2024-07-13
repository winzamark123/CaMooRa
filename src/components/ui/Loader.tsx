import { ring } from 'ldrs';

export default function Loader() {
  ring.register('l-ring');
  return (
    <main>
      <l-ring></l-ring>
    </main>
  );
}
