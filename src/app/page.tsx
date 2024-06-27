import PhotographersList from '../components/Profile/PhotographersList';
import Landing from '@/components/Landing/Landing';

export default async function Home() {
  return (
    <main className="flex w-full flex-col items-center gap-4 p-10">
      <div className="">
        <Landing />
      </div>
      <div className="flex w-full"></div>
      <div className="h-30 flex w-full max-w-5xl flex-col">
        <PhotographersList />
      </div>
    </main>
  );
}
