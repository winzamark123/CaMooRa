import ExhibitionHall from './_components/ExhibitionHall';
import Landing from '@/app/_components/Landing/Landing';

export default async function Home() {
  return (
    <main className="flex w-full max-w-5xl flex-col items-center gap-4 overflow-hidden">
      <div className="w-full p-10">
        <Landing />
      </div>
      <div className="max-w-5xl sm:p-10">
        <ExhibitionHall />
      </div>
    </main>
  );
}
