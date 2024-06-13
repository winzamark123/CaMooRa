import PhotographersList from '../components/Profile/PhotographersList';

export default async function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="h-30 flex w-full flex-col ">
        <PhotographersList />
      </div>
    </main>
  );
}
