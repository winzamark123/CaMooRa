import PhotographersList from '../components/Profile/PhotographersList';
import Landing from '@/components/Landing/Landing';

export default async function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="">
        <Landing></Landing>
      </div>
      <div className="h-30 flex w-full flex-col ">
        <PhotographersList />
      </div>
    </main>
  );
}
