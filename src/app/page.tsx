import PhotographersList from './_components/PhotographersList';
import Landing from '@/app/_components/Landing/Landing';

export default async function Home() {
  return (
    <main className="flex w-full max-w-5xl flex-col items-center gap-4 overflow-hidden ">
      <div className="w-full p-10">
        <Landing />
      </div>
      <div className="sm:p-10">
        <PhotographersList />
      </div>
    </main>
  );
}
