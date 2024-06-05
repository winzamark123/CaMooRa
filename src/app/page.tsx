'use client';
import PhotographersList from '@/components/PhotographersList';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="h-30 flex w-full flex-col ">
        <PhotographersList />
      </div>
    </main>
  );
}
